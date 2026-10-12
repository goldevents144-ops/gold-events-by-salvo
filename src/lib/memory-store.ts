/**
 * In-memory store per Vercel serverless functions.
 *
 * NOTA BENE: Questo è un fallback SENZA database esterno.
 * I dati persistono finché la serverless function è "calda" (5-15 min).
 * Dopo l'inattività, i dati si resettano.
 *
 * Per uso production con dati critici, configurare Vercel Blob/KV/Postgres.
 * Per ora, questo è sufficiente per:
 * - Demo live del mini-gestionale
 * - Eventi con traffico costante
 * - Conversazioni chat in tempo reale durante sessioni attive
 *
 * Vantaggi:
 * - ZERO configurazione esterna
 * - Zero costi
 * - Funziona immediatamente
 * - Tutte le API già pronte
 */

import { logAuditEntry } from "./kv-store";

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

// ─── In-memory storage (persiste finché la funzione è calda) ────────────────

// ATTENZIONE: usa globalThis per preservare lo stato tra hot reload in dev
// e tra invocazioni della stessa istanza serverless in production.
const globalForStore = globalThis as unknown as {
  __conversations?: Map<string, KVConversation>;
  __messages?: Map<string, KVMessage[]>;
  __submissions?: Map<string, KVSubmission>;
  __partners?: Map<string, KVPartner>;
  __auditLogs?: AuditLogEntry[];
  __convIndex?: string[]; // ordered conversation IDs by lastMessageAt
};

if (!globalForStore.__conversations) {
  globalForStore.__conversations = new Map();
  globalForStore.__messages = new Map();
  globalForStore.__submissions = new Map();
  globalForStore.__partners = new Map();
  globalForStore.__auditLogs = [];
  globalForStore.__convIndex = [];
}

const conversations = globalForStore.__conversations!;
const messages = globalForStore.__messages!;
const submissions = globalForStore.__submissions!;
const partners = globalForStore.__partners!;
const auditLogs = globalForStore.__auditLogs!;
const convIndex = globalForStore.__convIndex!;

// ─── Helper ─────────────────────────────────────────────────────────────────

function genId(): string {
  return `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function now(): string {
  return new Date().toISOString();
}

// ─── Conversation operations ────────────────────────────────────────────────

export async function createConversation(
  data: Omit<KVConversation, "id" | "createdAt" | "updatedAt" | "lastMessageAt" | "unreadByAdmin" | "unreadByVisitor">,
  systemMessage?: string,
): Promise<KVConversation | null> {
  const ts = now();
  const conv: KVConversation = {
    ...data,
    id: genId(),
    createdAt: ts,
    updatedAt: ts,
    lastMessageAt: ts,
    unreadByAdmin: 0,
    unreadByVisitor: 0,
  };
  conversations.set(conv.id, conv);
  messages.set(conv.id, []);
  convIndex.unshift(conv.id); // newest first

  if (systemMessage) {
    await addMessage(conv.id, { role: "system", text: systemMessage });
  }
  return conv;
}

export async function getConversation(id: string): Promise<KVConversation | null> {
  return conversations.get(id) ?? null;
}

export async function getConversationWithMessages(id: string): Promise<{
  conversation: KVConversation;
  messages: KVMessage[];
} | null> {
  const conv = conversations.get(id);
  if (!conv) return null;
  return { conversation: conv, messages: messages.get(id) ?? [] };
}

export async function updateConversation(
  id: string,
  updates: Partial<KVConversation>,
): Promise<KVConversation | null> {
  const conv = conversations.get(id);
  if (!conv) return null;
  const updated: KVConversation = { ...conv, ...updates, updatedAt: now() };
  conversations.set(id, updated);

  // Riordina l'indice per lastMessageAt
  if (updates.lastMessageAt) {
    const idx = convIndex.indexOf(id);
    if (idx >= 0) convIndex.splice(idx, 1);
    convIndex.unshift(id);
  }
  return updated;
}

export async function listConversations(
  filter?: { status?: string },
  limit = 100,
): Promise<Array<{ conversation: KVConversation; lastMessage?: KVMessage }>> {
  const result: Array<{ conversation: KVConversation; lastMessage?: KVMessage }> = [];
  for (const id of convIndex) {
    const conv = conversations.get(id);
    if (!conv) continue;
    if (filter?.status && conv.status !== filter.status) continue;
    const msgs = messages.get(id) ?? [];
    const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : undefined;
    result.push({ conversation: conv, lastMessage: lastMsg });
    if (result.length >= limit) break;
  }
  return result;
}

// ─── Message operations ─────────────────────────────────────────────────────

export async function addMessage(
  conversationId: string,
  data: { role: KVMessage["role"]; text: string; readAt?: string | null },
): Promise<KVMessage | null> {
  const conv = conversations.get(conversationId);
  if (!conv) return null;

  const msg: KVMessage = {
    id: genId(),
    createdAt: now(),
    conversationId,
    role: data.role,
    text: data.text,
    readAt: data.readAt ?? null,
  };
  const msgs = messages.get(conversationId) ?? [];
  msgs.push(msg);
  messages.set(conversationId, msgs);
  return msg;
}

export async function getMessages(conversationId: string, limit = 200): Promise<KVMessage[]> {
  const msgs = messages.get(conversationId) ?? [];
  return msgs.slice(-limit);
}

export async function markMessagesRead(conversationId: string, role: KVMessage["role"]): Promise<void> {
  const msgs = messages.get(conversationId) ?? [];
  const ts = now();
  let changed = false;
  for (const m of msgs) {
    if (m.role === role && !m.readAt) {
      m.readAt = ts;
      changed = true;
    }
  }
  if (changed) {
    messages.set(conversationId, msgs);
  }
}

// ─── Contact Submission operations ──────────────────────────────────────────

export async function createSubmission(
  data: Omit<KVSubmission, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes" | "repliedAt" | "repliedVia" | "repliedText" | "budget" | "closedAt" | "starred">,
): Promise<KVSubmission | null> {
  const ts = now();
  const sub: KVSubmission = {
    ...data,
    id: genId(),
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
  submissions.set(sub.id, sub);
  return sub;
}

export async function getSubmission(id: string): Promise<KVSubmission | null> {
  return submissions.get(id) ?? null;
}

export async function updateSubmission(
  id: string,
  updates: Partial<KVSubmission>,
): Promise<KVSubmission | null> {
  const sub = submissions.get(id);
  if (!sub) return null;
  const updated: KVSubmission = { ...sub, ...updates, updatedAt: now() };
  submissions.set(id, updated);
  return updated;
}

export async function listSubmissions(
  filter?: { status?: string },
  limit = 100,
): Promise<KVSubmission[]> {
  const all = Array.from(submissions.values());
  // Sort by createdAt desc
  all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return all
    .filter((s) => (filter?.status ? s.status === filter.status : true))
    .slice(0, limit);
}

export async function deleteSubmission(id: string): Promise<boolean> {
  return submissions.delete(id);
}

// ─── Partner Submission operations ──────────────────────────────────────────

export async function createPartnerSubmission(
  data: Omit<KVPartner, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes">,
): Promise<KVPartner | null> {
  const ts = now();
  const partner: KVPartner = {
    ...data,
    id: genId(),
    createdAt: ts,
    updatedAt: ts,
    status: "new",
    adminNotes: null,
  };
  partners.set(partner.id, partner);
  return partner;
}

export async function listPartnerSubmissions(limit = 100): Promise<KVPartner[]> {
  const all = Array.from(partners.values());
  all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return all.slice(0, limit);
}

// ─── Audit log operations ────────────────────────────────────────────────────

export async function memLogAuditEntry(
  action: string,
  target: string | null,
  meta: Record<string, unknown> | null,
  req: { headers: Headers },
): Promise<void> {
  const userAgent = req.headers.get("user-agent") || "";
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
  const entry: AuditLogEntry = {
    id: genId(),
    createdAt: now(),
    action,
    target,
    ipHash: String(ip).slice(0, 100),
    userAgent: userAgent.slice(0, 200),
    meta: meta ? JSON.stringify(meta) : null,
  };
  auditLogs.push(entry);
  // Mantieni solo gli ultimi 500 log
  if (auditLogs.length > 500) {
    auditLogs.splice(0, auditLogs.length - 500);
  }
}

export async function memListAuditLogs(limit = 100): Promise<AuditLogEntry[]> {
  return auditLogs.slice(-limit).reverse();
}

// ─── Stats per dashboard ─────────────────────────────────────────────────────

export async function getStats() {
  const allSubs = Array.from(submissions.values());
  const allConvs = Array.from(conversations.values());
  const allPartners = Array.from(partners.values());

  return {
    totalSubmissions: allSubs.length,
    newSubmissions: allSubs.filter((s) => s.status === "new").length,
    totalConversations: allConvs.length,
    waitingConversations: allConvs.filter((c) => c.status === "waiting").length,
    totalPartners: allPartners.length,
    newPartners: allPartners.filter((p) => p.status === "new").length,
  };
}
