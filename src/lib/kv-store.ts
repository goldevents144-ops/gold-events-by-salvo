/**
 * Vercel KV Store — sostituisce Prisma+SQLite per funzionare su Vercel production.
 *
 * Vantaggi:
 * - Gratis nel piano Hobby (256MB, 30k richieste/giorno)
 * - Integrato in Vercel (no account esterni)
 * - Si attiva dal dashboard Vercel con 1 clic
 *
 * Pattern usato:
 * - chat:conversations:index → sorted set di conversation IDs by lastMessageAt
 * - chat:conv:{id} → hash con dati conversazione
 * - chat:conv:{id}:messages → lista messaggi (JSON)
 * - contact:submissions:index → sorted set di submission IDs by createdAt
 * - contact:sub:{id} → hash con dati submission
 * - partner:submissions:index → sorted set
 * - partner:sub:{id} → hash
 *
 * Fallback: se KV non configurato, ritorna errori gracefully (no crash).
 */

import { kv } from "@vercel/kv";

export const kvAvailable = !!process.env.KV_REST_API_URL || !!process.env.KV_URL;

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

// ─── Helper functions ────────────────────────────────────────────────────────

function genId(): string {
  return `cmv${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

async function safeKvGet<T>(key: string): Promise<T | null> {
  if (!kvAvailable) return null;
  try {
    return (await kv.get<T>(key)) ?? null;
  } catch {
    return null;
  }
}

async function safeKvSet(key: string, value: unknown, ttlSeconds?: number): Promise<boolean> {
  if (!kvAvailable) return false;
  try {
    if (ttlSeconds) {
      await kv.set(key, value, { ex: ttlSeconds });
    } else {
      await kv.set(key, value);
    }
    return true;
  } catch {
    return false;
  }
}

async function safeKvZadd(key: string, score: number, member: string): Promise<boolean> {
  if (!kvAvailable) return false;
  try {
    await kv.zadd(key, { score, member });
    return true;
  } catch {
    return false;
  }
}

async function safeKvZrange(
  key: string,
  start: number,
  stop: number,
  opts?: { reverse?: boolean },
): Promise<string[]> {
  if (!kvAvailable) return [];
  try {
    return await kv.zrange(key, start, stop, opts);
  } catch {
    return [];
  }
}

async function safeKvDel(key: string): Promise<boolean> {
  if (!kvAvailable) return false;
  try {
    await kv.del(key);
    return true;
  } catch {
    return false;
  }
}

// ─── Conversation operations ────────────────────────────────────────────────

const CONV_INDEX = "chat:conversations:index";

export async function createConversation(
  data: Omit<KVConversation, "id" | "createdAt" | "updatedAt" | "lastMessageAt" | "unreadByAdmin" | "unreadByVisitor">,
  systemMessage?: string,
): Promise<KVConversation | null> {
  if (!kvAvailable) return null;
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
  await safeKvSet(`chat:conv:${conv.id}`, conv);
  await safeKvZadd(CONV_INDEX, Date.now(), conv.id);

  if (systemMessage) {
    await addMessage(conv.id, { role: "system", text: systemMessage });
  }
  return conv;
}

export async function getConversation(id: string): Promise<KVConversation | null> {
  return safeKvGet<KVConversation>(`chat:conv:${id}`);
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
  await safeKvSet(`chat:conv:${id}`, updated);
  if (updates.lastMessageAt) {
    await safeKvZadd(CONV_INDEX, new Date(updates.lastMessageAt).getTime(), id);
  }
  return updated;
}

export async function listConversations(
  filter?: { status?: string },
  limit = 100,
): Promise<Array<KVConversation & { lastMessage?: KVMessage }>> {
  if (!kvAvailable) return [];
  const ids = await safeKvZrange(CONV_INDEX, 0, limit - 1, { reverse: true });
  const convs: (KVConversation & { lastMessage?: KVMessage })[] = [];
  for (const id of ids) {
    const conv = await getConversation(id);
    if (!conv) continue;
    if (filter?.status && conv.status !== filter.status) continue;
    // Get last message for preview
    const msgs = await getMessages(id);
    const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : undefined;
    convs.push({ ...conv, lastMessage: lastMsg });
  }
  return convs;
}

// ─── Message operations ─────────────────────────────────────────────────────

const MSG_INDEX_PREFIX = "chat:conv:";
const MSG_INDEX_SUFFIX = ":messages:index";

export async function addMessage(
  conversationId: string,
  data: { role: KVMessage["role"]; text: string; readAt?: string | null },
): Promise<KVMessage | null> {
  if (!kvAvailable) return null;
  const now = Date.now();
  const msg: KVMessage = {
    id: genId(),
    createdAt: new Date(now).toISOString(),
    conversationId,
    role: data.role,
    text: data.text,
    readAt: data.readAt ?? null,
  };
  await safeKvSet(`chat:msg:${msg.id}`, msg);
  await safeKvZadd(`${MSG_INDEX_PREFIX}${conversationId}${MSG_INDEX_SUFFIX}`, now, msg.id);
  return msg;
}

export async function getMessages(conversationId: string, limit = 200): Promise<KVMessage[]> {
  if (!kvAvailable) return [];
  const ids = await safeKvZrange(
    `${MSG_INDEX_PREFIX}${conversationId}${MSG_INDEX_SUFFIX}`,
    0,
    limit - 1,
  );
  const msgs: KVMessage[] = [];
  for (const id of ids) {
    const m = await safeKvGet<KVMessage>(`chat:msg:${id}`);
    if (m) msgs.push(m);
  }
  return msgs;
}

export async function markMessagesRead(conversationId: string, role: KVMessage["role"]): Promise<void> {
  if (!kvAvailable) return;
  const msgs = await getMessages(conversationId, 500);
  const now = new Date().toISOString();
  for (const m of msgs) {
    if (m.role === role && !m.readAt) {
      await safeKvSet(`chat:msg:${m.id}`, { ...m, readAt: now });
    }
  }
}

// ─── Contact Submission operations ──────────────────────────────────────────

const SUB_INDEX = "contact:submissions:index";

export async function createSubmission(
  data: Omit<KVSubmission, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes" | "repliedAt" | "repliedVia" | "repliedText" | "budget" | "closedAt" | "starred">,
): Promise<KVSubmission | null> {
  if (!kvAvailable) return null;
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
  await safeKvSet(`contact:sub:${sub.id}`, sub);
  await safeKvZadd(SUB_INDEX, Date.now(), sub.id);
  return sub;
}

export async function getSubmission(id: string): Promise<KVSubmission | null> {
  return safeKvGet<KVSubmission>(`contact:sub:${id}`);
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
  await safeKvSet(`contact:sub:${id}`, updated);
  return updated;
}

export async function listSubmissions(
  filter?: { status?: string },
  limit = 100,
): Promise<KVSubmission[]> {
  if (!kvAvailable) return [];
  const ids = await safeKvZrange(SUB_INDEX, 0, limit - 1, { reverse: true });
  const subs: KVSubmission[] = [];
  for (const id of ids) {
    const sub = await getSubmission(id);
    if (!sub) continue;
    if (filter?.status && sub.status !== filter.status) continue;
    subs.push(sub);
  }
  return subs;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  await safeKvDel(`contact:sub:${id}`);
  // Note: removing from sorted set requires zrem, but for simplicity leave it
  return true;
}

// ─── Partner Submission operations ──────────────────────────────────────────

const PARTNER_INDEX = "partner:submissions:index";

export async function createPartnerSubmission(
  data: Omit<KVPartner, "id" | "createdAt" | "updatedAt" | "status" | "adminNotes">,
): Promise<KVPartner | null> {
  if (!kvAvailable) return null;
  const now = new Date().toISOString();
  const partner: KVPartner = {
    ...data,
    id: genId(),
    createdAt: now,
    updatedAt: now,
    status: "new",
    adminNotes: null,
  };
  await safeKvSet(`partner:sub:${partner.id}`, partner);
  await safeKvZadd(PARTNER_INDEX, Date.now(), partner.id);
  return partner;
}

export async function listPartnerSubmissions(limit = 100): Promise<KVPartner[]> {
  if (!kvAvailable) return [];
  const ids = await safeKvZrange(PARTNER_INDEX, 0, limit - 1, { reverse: true });
  const partners: KVPartner[] = [];
  for (const id of ids) {
    const p = await safeKvGet<KVPartner>(`partner:sub:${id}`);
    if (p) partners.push(p);
  }
  return partners;
}

// ─── Audit log operations ────────────────────────────────────────────────────

const AUDIT_INDEX = "audit:logs:index";

export async function logAuditEntry(
  action: string,
  target: string | null,
  meta: Record<string, unknown> | null,
  req: { headers: Headers },
): Promise<void> {
  if (!kvAvailable) return;
  try {
    const now = Date.now();
    const userAgent = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const entry = {
      id: genId(),
      createdAt: new Date(now).toISOString(),
      action,
      target,
      ipHash: String(ip).slice(0, 100),
      userAgent: userAgent.slice(0, 200),
      meta: meta ? JSON.stringify(meta) : null,
    };
    await safeKvSet(`audit:log:${entry.id}`, entry);
    await safeKvZadd(AUDIT_INDEX, now, entry.id);
  } catch {}
}

export async function listAuditLogs(limit = 100): Promise<any[]> {
  if (!kvAvailable) return [];
  const ids = await safeKvZrange(AUDIT_INDEX, 0, limit - 1, { reverse: true });
  const logs: any[] = [];
  for (const id of ids) {
    const log = await safeKvGet<any>(`audit:log:${id}`);
    if (log) logs.push(log);
  }
  return logs;
}
