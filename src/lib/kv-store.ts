/**
 * Vercel Blob Store — storage persistente per Vercel production.
 *
 * Vantaggi:
 * - Gratis nel piano Hobby (1GB storage, 10GB bandwidth, 1000 writes/giorno)
 * - Nativo Vercel (no account esterni)
 * - Scrivibile dal codice (a differenza di Edge Config)
 * - SDK semplice: put/get/head/list/del
 *
 * Pattern:
 * - Salvo ogni record come file JSON nel blob
 * - Path: chat/conversations/index.json (lista IDs), chat/conv/{id}.json, etc.
 * - Per ordinamento uso timestamp nel filename + sorting lato client
 */

import { put, head, list, del } from "@vercel/blob";

export const blobAvailable = !!process.env.BLOB_READ_WRITE_TOKEN;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface KVConversation {
  id: string;
  createdAt: string;
  updatedAt: string;
  visitorName: string | null;
  visitorEmail: string | null;
  visitorPhone: string | null;
  visitorIp: string | null;
  userAgent: string | null;
  status: "active" | "waiting" | "closed";
  lastMessageAt: string;
  unreadByAdmin: number;
  unreadByVisitor: number;
}

export interface KVMessage {
  id: string;
  createdAt: string;
  conversationId: string;
  role: "visitor" | "admin" | "system";
  text: string;
  readAt: string | null;
}

export interface KVSubmission {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  eventType: string;
  eventDate: string;
  location: string;
  guests: number;
  services: string;
  notes: string | null;
  status: "new" | "read" | "contacted" | "archived";
  adminNotes: string | null;
  repliedAt: string | null;
  repliedVia: string | null;
  repliedText: string | null;
  budget: string | null;
  closedAt: string | null;
  starred: boolean;
}

export interface KVPartner {
  id: string;
  createdAt: string;
  updatedAt: string;
  businessName: string;
  activityType: string;
  location: string;
  referentName: string;
  referentPhone: string;
  referentEmail: string;
  capacity: string | null;
  hasPower: string;
  b2bRates: string | null;
  status: string;
  adminNotes: string | null;
}

interface AuditLogEntry {
  id: string;
  createdAt: string;
  action: string;
  target: string | null;
  ipHash: string | null;
  userAgent: string | null;
  meta: string | null;
}

// ─── Helper functions ────────────────────────────────────────────────────────

function genId(): string {
  return `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

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
    const result = await head(pathname);
    if (!result) return null;
    // Fetch the actual content
    const res = await fetch(result.url);
    if (!res.ok) return null;
    const text = await res.text();
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
  if (!blobAvailable) return null;
  const now = new Date().toISOString();
  const conv: KVConversation = {
    ...data,
    id: genId(),
    createdAt: now,
    updatedAt: now,
    lastMessageAt: now,
    unreadByAdmin: 0,
    unreadByVisitor: 0,
  };
  await safePut(`chat/conv/${conv.id}.json`, conv);

  if (systemMessage) {
    await addMessage(conv.id, { role: "system", text: systemMessage });
  }
  return conv;
}

export async function getConversation(id: string): Promise<KVConversation | null> {
  return safeGet<KVConversation>(`chat/conv/${id}.json`);
}

export async function getConversationWithMessages(id: string): Promise<{
  conversation: KVConversation;
  messages: KVMessage[];
} | null> {
  const conv = await getConversation(id);
  if (!conv) return null;
  const messages = await getMessages(id);
  return { conversation: conv, messages };
}

export async function updateConversation(
  id: string,
  updates: Partial<KVConversation>,
): Promise<KVConversation | null> {
  const conv = await getConversation(id);
  if (!conv) return null;
  const updated: KVConversation = {
    ...conv,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await safePut(`chat/conv/${id}.json`, updated);
  return updated;
}

export async function listConversations(
  filter?: { status?: string },
  limit = 100,
): Promise<Array<{ conversation: KVConversation; lastMessage?: KVMessage }>> {
  if (!blobAvailable) return [];
  const paths = await safeList("chat/conv/");
  const convs: Array<{ conversation: KVConversation; lastMessage?: KVMessage }> = [];

  // Filter out .messages.json paths (those are message lists, not conversations)
  const convPaths = paths.filter((p) => p.endsWith(".json") && !p.includes(".messages.json"));

  // Get each conversation
  for (const p of convPaths.slice(0, limit)) {
    const conv = await safeGet<KVConversation>(p);
    if (!conv) continue;
    if (filter?.status && conv.status !== filter.status) continue;
    const messages = await getMessages(conv.id, 1);
    convs.push({
      conversation: conv,
      lastMessage: messages.length > 0 ? messages[messages.length - 1] : undefined,
    });
  }

  // Sort by lastMessageAt desc
  convs.sort((a, b) => {
    const aTime = new Date(a.conversation.lastMessageAt).getTime();
    const bTime = new Date(b.conversation.lastMessageAt).getTime();
    return bTime - aTime;
  });

  return convs;
}

// ─── Message operations ─────────────────────────────────────────────────────

export async function addMessage(
  conversationId: string,
  data: { role: KVMessage["role"]; text: string; readAt?: string | null },
): Promise<KVMessage | null> {
  if (!blobAvailable) return null;
  const now = new Date().toISOString();
  const msg: KVMessage = {
    id: genId(),
    createdAt: now,
    conversationId,
    role: data.role,
    text: data.text,
    readAt: data.readAt ?? null,
  };
  // Append to conversation's message list
  const existing = await getMessages(conversationId, 500);
  existing.push(msg);
  await safePut(`chat/conv/${conversationId}.messages.json`, existing);
  return msg;
}

export async function getMessages(conversationId: string, limit = 200): Promise<KVMessage[]> {
  if (!blobAvailable) return [];
  const msgs = await safeGet<KVMessage[]>(`chat/conv/${conversationId}.messages.json`);
  if (!msgs) return [];
  // Return oldest first, slice to limit
  return msgs.slice(-limit);
}

export async function markMessagesRead(conversationId: string, role: KVMessage["role"]): Promise<void> {
  if (!blobAvailable) return;
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
  }
}

// ─── Contact Submission operations ──────────────────────────────────────────

export async function createSubmission(
  data: Omit<KVSubmission, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes" | "repliedAt" | "repliedVia" | "repliedText" | "budget" | "closedAt" | "starred">,
): Promise<KVSubmission | null> {
  if (!blobAvailable) return null;
  const now = new Date().toISOString();
  const sub: KVSubmission = {
    ...data,
    id: genId(),
    createdAt: now,
    updatedAt: now,
    status: "new",
    adminNotes: null,
    repliedAt: null,
    repliedVia: null,
    repliedText: null,
    budget: null,
    closedAt: null,
    starred: false,
  };
  await safePut(`contact/sub/${sub.id}.json`, sub);
  return sub;
}

export async function getSubmission(id: string): Promise<KVSubmission | null> {
  return safeGet<KVSubmission>(`contact/sub/${id}.json`);
}

export async function updateSubmission(
  id: string,
  updates: Partial<KVSubmission>,
): Promise<KVSubmission | null> {
  const sub = await getSubmission(id);
  if (!sub) return null;
  const updated: KVSubmission = {
    ...sub,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await safePut(`contact/sub/${id}.json`, updated);
  return updated;
}

export async function listSubmissions(
  filter?: { status?: string },
  limit = 100,
): Promise<KVSubmission[]> {
  if (!blobAvailable) return [];
  const paths = await safeList("contact/sub/");
  const subs: KVSubmission[] = [];
  for (const p of paths.slice(0, limit)) {
    const sub = await safeGet<KVSubmission>(p);
    if (!sub) continue;
    if (filter?.status && sub.status !== filter.status) continue;
    subs.push(sub);
  }
  // Sort by createdAt desc
  subs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return subs;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  return safeDel(`contact/sub/${id}.json`);
}

// ─── Partner Submission operations ──────────────────────────────────────────

export async function createPartnerSubmission(
  data: Omit<KVPartner, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes">,
): Promise<KVPartner | null> {
  if (!blobAvailable) return null;
  const now = new Date().toISOString();
  const partner: KVPartner = {
    ...data,
    id: genId(),
    createdAt: now,
    updatedAt: now,
    status: "new",
    adminNotes: null,
  };
  await safePut(`partner/sub/${partner.id}.json`, partner);
  return partner;
}

export async function listPartnerSubmissions(limit = 100): Promise<KVPartner[]> {
  if (!blobAvailable) return [];
  const paths = await safeList("partner/sub/");
  const partners: KVPartner[] = [];
  for (const p of paths.slice(0, limit)) {
    const partner = await safeGet<KVPartner>(p);
    if (partner) partners.push(partner);
  }
  // Sort by createdAt desc
  partners.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return partners;
}

// ─── Audit log operations ────────────────────────────────────────────────────

export async function logAuditEntry(
  action: string,
  target: string | null,
  meta: Record<string, unknown> | null,
  req: { headers: Headers },
): Promise<void> {
  if (!blobAvailable) return;
  try {
    const now = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const entry: AuditLogEntry = {
      id: genId(),
      createdAt: now,
      action,
      target,
      ipHash: String(ip).slice(0, 100),
      userAgent: userAgent.slice(0, 200),
      meta: meta ? JSON.stringify(meta) : null,
    };
    await safePut(`audit/log/${entry.id}.json`, entry);
  } catch {}
}

export async function listAuditLogs(limit = 100): Promise<AuditLogEntry[]> {
  if (!blobAvailable) return [];
  const paths = await safeList("audit/log/");
  const logs: AuditLogEntry[] = [];
  for (const p of paths.slice(0, limit)) {
    const log = await safeGet<AuditLogEntry>(p);
    if (log) logs.push(log);
  }
  logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return logs;
}

// ─── Backwards compatibility exports (legacy) ──────────────────────────────
// Per non rompere API che usano kvAvailable / dbAvailable
export const kvAvailable = blobAvailable;
