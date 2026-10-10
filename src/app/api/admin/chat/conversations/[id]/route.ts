import { NextRequest, NextResponse } from "next/server";
import {
  getConversation,
  getMessages,
  updateConversation,
  markMessagesRead,
  logAuditEntry,
  kvAvailable,
} from "@/lib/kv-store";
import { authenticate } from "@/lib/admin-auth";

/**
 * GET /api/admin/chat/conversations/[id]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!kvAvailable) {
    return NextResponse.json({ conversation: null });
  }
  try {
    const { id } = await params;
    const conv = await getConversation(id);
    if (!conv) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const messages = await getMessages(id, 500);

    // Marca messaggi visitatore come letti dall'admin
    if (conv.unreadByAdmin > 0) {
      await updateConversation(id, { unreadByAdmin: 0 });
      await markMessagesRead(id, "visitor");
    }

    return NextResponse.json({
      conversation: { ...conv, unreadByAdmin: 0 },
      messages,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/admin/chat/conversations/[id]
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!kvAvailable) {
    return NextResponse.json({ error: "KV not available" }, { status: 503 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const updates: Record<string, unknown> = {};
    if (body.status !== undefined) updates.status = body.status;
    if (body.visitorName !== undefined) updates.visitorName = body.visitorName;
    if (body.visitorEmail !== undefined) updates.visitorEmail = body.visitorEmail;
    if (body.visitorPhone !== undefined) updates.visitorPhone = body.visitorPhone;

    const updated = await updateConversation(id, updates);
    await logAuditEntry("update_chat_conversation", id, updates, { headers: req.headers });

    return NextResponse.json({ conversation: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
