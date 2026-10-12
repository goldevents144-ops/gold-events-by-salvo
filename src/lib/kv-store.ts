/**
 * Unified store: tries Vercel Blob first (persistent), falls back to in-memory (per-instance).
 *
 * - If BLOB_READ_WRITE_TOKEN is set: uses Vercel Blob (persistent, production-grade)
 * - Otherwise: uses in-memory store (works while serverless function is warm)
 *
 * The in-memory store is sufficient for:
 * - Live demo of mini-gestionale
 * - Active chat sessions during visitor's browsing
 * - Test/preview deployments
 *
 * For production with critical data, configure Vercel Blob.
 */

import { put, head, get, list, del } from "@vercel/blob";

// Re-export types from memory-store (for type-only consumers)
// memory-store exports its types with the same names, we use type aliases here
import type {
  KVConversation as _MemConv,
  KVMessage as _MemMsg,
  KVSubmission as _MemSub,
  KVPartner as _MemPartner,
} from "./memory-store";

import * as memStore from "./memory-store";

export const blobAvailable = !!process.env.BLOB_READ_WRITE_TOKEN;
// kvAvailable = true se abbiamo Blob OR memory store (sempre true perché memory store è sempre disponibile)
export const kvAvailable = true;

// ─── Types ───────────────────────────────────────────────────────────────────

export type KVConversation = memStore.KVConversation;
export type KVMessage = memStore.KVMessage;
export type KVSubmission = memStore.KVSubmission;
export type KVPartner = memStore.KVPartner;

// ─── Helper functions (Blob) ─────────────────────────────────────────────────

async function safePut<T>(pathname: string, data: T): Promise<boolean> {
  if (!blobAvailable) return false;
  try {
    await put(pathname, JSON.stringify(data), {
      contentType: "application/json",
      access: "public",
      allowOverwrite: true,
    });
    return true;
  } catch (e) {
    console.warn(`Blob put failed for ${pathname}:`, e);
    return false;
  }
}

async function safeGet<T>(pathname: string): Promise<T | null> {
  if (!blobAvailable) return null;
  try {
    const result = await get(pathname);
    if (!result) return null;
    const text = await result.text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function safeList(prefix: string): Promise<string[]> {
  if (!blobAvailable) return [];
  try {
    const result = await list({ prefix, limit: 1000 });
    return result.blobs.map((b) => b.pathname);
  } catch {
    return [];
  }
}

async function safeDel(pathname: string): Promise<boolean> {
  if (!blobAvailable) return false;
  try {
    await del(pathname);
    return true;
  } catch {
    return false;
  }
}

// ─── Conversation operations ────────────────────────────────────────────────

export async function createConversation(
  data: Omit<KVConversation, "id" | "createdAt" | "updatedAt" | "lastMessageAt" | "unreadByAdmin" | "unreadByVisitor">,
  systemMessage?: string,
): Promise<KVConversation | null> {
  // Try Blob first
  if (blobAvailable) {
    const ts = new Date().toISOString();
    const id = `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    const conv: KVConversation = {
      ...data,
      id,
      createdAt: ts,
      updatedAt: ts,
      lastMessageAt: ts,
      unreadByAdmin: 0,
      unreadByVisitor: 0,
    };
    if (await safePut(`chat/conv/${conv.id}.json`, conv)) {
      if (systemMessage) {
        await addMessage(conv.id, { role: "system", text: systemMessage });
      }
      return conv;
    }
  }
  // Fallback to memory
  return memStore.createConversation(data, systemMessage);
}

export async function getConversation(id: string): Promise<KVConversation | null> {
  if (blobAvailable) {
    const result = await safeGet<KVConversation>(`chat/conv/${id}.json`);
    if (result) return result;
  }
  return memStore.getConversation(id);
}

export async function getConversationWithMessages(id: string): Promise<{
  conversation: KVConversation;
  messages: KVMessage[];
} | null> {
  if (blobAvailable) {
    const conv = await getConversation(id);
    if (conv) {
      const messages = await getMessages(id);
      return { conversation: conv, messages };
    }
  }
  return memStore.getConversationWithMessages(id);
}

export async function updateConversation(
  id: string,
  updates: Partial<KVConversation>,
): Promise<KVConversation | null> {
  if (blobAvailable) {
    const conv = await getConversation(id);
    if (conv) {
      const updated: KVConversation = {
        ...conv,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      if (await safePut(`chat/conv/${id}.json`, updated)) {
        return updated;
      }
    }
  }
  return memStore.updateConversation(id, updates);
}

export async function listConversations(
  filter?: { status?: string },
  limit = 100,
): Promise<Array<{ conversation: KVConversation; lastMessage?: KVMessage }>> {
  if (blobAvailable) {
    const paths = await safeList("chat/conv/");
    if (paths.length > 0) {
      const convPaths = paths.filter((p) => p.endsWith(".json") && !p.includes(".messages.json"));
      const result: Array<{ conversation: KVConversation; lastMessage?: KVMessage }> = [];
      for (const p of convPaths.slice(0, limit)) {
        const conv = await safeGet<KVConversation>(p);
        if (!conv) continue;
        if (filter?.status && conv.status !== filter.status) continue;
        const messages = await getMessages(conv.id, 1);
        result.push({ conversation: conv, lastMessage: messages.length > 0 ? messages[messages.length - 1] : undefined });
      }
      result.sort((a, b) => new Date(b.conversation.lastMessageAt).getTime() - new Date(a.conversation.lastMessageAt).getTime());
      return result;
    }
  }
  return memStore.listConversations(filter, limit);
}

// ─── Message operations ─────────────────────────────────────────────────────

export async function addMessage(
  conversationId: string,
  data: { role: KVMessage["role"]; text: string; readAt?: string | null },
): Promise<KVMessage | null> {
  if (blobAvailable) {
    const existing = await getMessages(conversationId, 500);
    const msg: KVMessage = {
      id: `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`,
      createdAt: new Date().toISOString(),
      conversationId,
      role: data.role,
      text: data.text,
      readAt: data.readAt ?? null,
    };
    existing.push(msg);
    if (await safePut(`chat/conv/${conversationId}.messages.json`, existing)) {
      return msg;
    }
  }
  return memStore.addMessage(conversationId, data);
}

export async function getMessages(conversationId: string, limit = 200): Promise<KVMessage[]> {
  if (blobAvailable) {
    const msgs = await safeGet<KVMessage[]>(`chat/conv/${conversationId}.messages.json`);
    if (msgs) return msgs.slice(-limit);
  }
  return memStore.getMessages(conversationId, limit);
}

export async function markMessagesRead(conversationId: string, role: KVMessage["role"]): Promise<void> {
  if (blobAvailable) {
    const msgs = await getMessages(conversationId, 500);
    const now = new Date().toISOString();
    let changed = false;
    for (const m of msgs) {
      if (m.role === role && !m.readAt) {
        m.readAt = now;
        changed = true;
      }
    }
    if (changed) {
      await safePut(`chat/conv/${conversationId}.messages.json`, msgs);
      return;
    }
  }
  return memStore.markMessagesRead(conversationId, role);
}

// ─── Contact Submission operations ──────────────────────────────────────────

export async function createSubmission(
  data: Omit<KVSubmission, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes" | "repliedAt" | "repliedVia" | "repliedText" | "budget" | "closedAt" | "starred">,
): Promise<KVSubmission | null> {
  if (blobAvailable) {
    const ts = new Date().toISOString();
    const id = `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    const sub: KVSubmission = {
      ...data,
      id,
      createdAt: ts,
      updatedAt: ts,
      status: "new",
      adminNotes: null,
      repliedAt: null,
      repliedVia: null,
      repliedText: null,
      budget: null,
      closedAt: null,
      starred: false,
    };
    if (await safePut(`contact/sub/${sub.id}.json`, sub)) {
      return sub;
    }
  }
  return memStore.createSubmission(data);
}

export async function getSubmission(id: string): Promise<KVSubmission | null> {
  if (blobAvailable) {
    const result = await safeGet<KVSubmission>(`contact/sub/${id}.json`);
    if (result) return result;
  }
  return memStore.getSubmission(id);
}

export async function updateSubmission(
  id: string,
  updates: Partial<KVSubmission>,
): Promise<KVSubmission | null> {
  if (blobAvailable) {
    const sub = await getSubmission(id);
    if (sub) {
      const updated: KVSubmission = { ...sub, ...updates, updatedAt: new Date().toISOString() };
      if (await safePut(`contact/sub/${id}.json`, updated)) {
        return updated;
      }
    }
  }
  return memStore.updateSubmission(id, updates);
}

export async function listSubmissions(
  filter?: { status?: string },
  limit = 100,
): Promise<KVSubmission[]> {
  if (blobAvailable) {
    const paths = await safeList("contact/sub/");
    if (paths.length > 0) {
      const subs: KVSubmission[] = [];
      for (const p of paths.slice(0, limit)) {
        const sub = await safeGet<KVSubmission>(p);
        if (sub) subs.push(sub);
      }
      subs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return subs.filter((s) => (filter?.status ? s.status === filter.status : true));
    }
  }
  return memStore.listSubmissions(filter, limit);
}

export async function deleteSubmission(id: string): Promise<boolean> {
  if (blobAvailable) {
    return safeDel(`contact/sub/${id}.json`);
  }
  return memStore.deleteSubmission(id);
}

// ─── Partner Submission operations ──────────────────────────────────────────

export async function createPartnerSubmission(
  data: Omit<KVPartner, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes">,
): Promise<KVPartner | null> {
  if (blobAvailable) {
    const ts = new Date().toISOString();
    const id = `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    const partner: KVPartner = {
      ...data,
      id,
      createdAt: ts,
      updatedAt: ts,
      status: "new",
      adminNotes: null,
    };
    if (await safePut(`partner/sub/${partner.id}.json`, partner)) {
      return partner;
    }
  }
  return memStore.createPartnerSubmission(data);
}

export async function listPartnerSubmissions(limit = 100): Promise<KVPartner[]> {
  if (blobAvailable) {
    const paths = await safeList("partner/sub/");
    if (paths.length > 0) {
      const partners: KVPartner[] = [];
      for (const p of paths.slice(0, limit)) {
        const partner = await safeGet<KVPartner>(p);
        if (partner) partners.push(partner);
      }
      partners.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return partners;
    }
  }
  return memStore.listPartnerSubmissions(limit);
}

// ─── Audit log operations ────────────────────────────────────────────────────

export async function logAuditEntry(
  action: string,
  target: string | null,
  meta: Record<string, unknown> | null,
  req: { headers: Headers },
): Promise<void> {
  if (blobAvailable) {
    const ts = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const id = `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    const entry = {
      id,
      createdAt: ts,
      action,
      target,
      ipHash: String(ip).slice(0, 100),
      userAgent: userAgent.slice(0, 200),
      meta: meta ? JSON.stringify(meta) : null,
    };
    await safePut(`audit/log/${entry.id}.json`, entry);
    return;
  }
  return memStore.memLogAuditEntry(action, target, meta, req);
}

export async function listAuditLogs(limit = 100): Promise<any[]> {
  if (blobAvailable) {
    const paths = await safeList("audit/log/");
    if (paths.length > 0) {
      const logs: any[] = [];
      for (const p of paths.slice(0, limit)) {
        const log = await safeGet<any>(p);
        if (log) logs.push(log);
      }
      logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return logs;
    }
  }
  return memStore.memListAuditLogs(limit);
}

// ─── Stats per dashboard ────────────────────────────────────────────────────

export async function getStats() {
  return memStore.getStats();
}
