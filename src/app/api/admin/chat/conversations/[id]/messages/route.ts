import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";

const MAX_TEXT = 2000;

function clean(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max).replace(/[<>]/g, "");
}

/**
 * POST /api/admin/chat/conversations/[id]/messages
 * Salvo risponde al visitatore nella chat
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const text = clean(body.text, MAX_TEXT);

    if (!text) {
      return NextResponse.json({ error: "Messaggio vuoto" }, { status: 400 });
    }

    const conv = await db.chatConversation.findUnique({ where: { id } });
    if (!conv) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (conv.status === "closed") {
      return NextResponse.json(
        { error: "Conversazione chiusa" },
        { status: 400 },
      );
    }

    // Crea il messaggio admin
    const msg = await db.chatMessage.create({
      data: {
        conversationId: id,
        role: "admin",
        text,
        readAt: new Date(), // Admin ha ovviamente letto
      },
    });

    // Aggiorna conversazione
    await db.chatConversation.update({
      where: { id },
      data: {
        lastMessageAt: new Date(),
        status: "active", // Torna ad active quando Salvo risponde
        unreadByVisitor: { increment: 1 },
      },
    });

    await logAudit("chat_reply", id, { textLength: text.length }, req);

    return NextResponse.json({ message: msg });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "DB error" },
      { status: 500 },
    );
  }
}
