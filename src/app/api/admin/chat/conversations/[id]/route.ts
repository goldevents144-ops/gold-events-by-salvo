import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";

/**
 * GET /api/admin/chat/conversations/[id]
 * Dettaglio conversazione con tutti i messaggi
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const conv = await db.chatConversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 500,
        },
      },
    });
    if (!conv) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Marca messaggi visitatore come letti dall'admin
    if (conv.unreadByAdmin > 0) {
      await db.chatConversation.update({
        where: { id },
        data: { unreadByAdmin: 0 },
      });
      await db.chatMessage.updateMany({
        where: {
          conversationId: id,
          role: "visitor",
          readAt: null,
        },
        data: { readAt: new Date() },
      });
    }

    return NextResponse.json({ conversation: conv });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "DB error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/admin/chat/conversations/[id]
 * Aggiorna status conversazione (active/waiting/closed) o metadati visitatore
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.status !== undefined) data.status = body.status;
    if (body.visitorName !== undefined) data.visitorName = body.visitorName;
    if (body.visitorEmail !== undefined) data.visitorEmail = body.visitorEmail;
    if (body.visitorPhone !== undefined) data.visitorPhone = body.visitorPhone;

    const updated = await db.chatConversation.update({
      where: { id },
      data,
    });

    await logAudit("update_chat_conversation", id, data, req);

    return NextResponse.json({ conversation: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "DB error" },
      { status: 500 },
    );
  }
}
