import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const MAX_TEXT = 2000;

function clean(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max).replace(/[<>]/g, "");
}

/**
 * POST /api/chat/conversations/[id]/messages
 * Invia un messaggio del visitatore
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const text = clean(body.text, MAX_TEXT);

    if (!text) {
      return NextResponse.json({ error: "Messaggio vuoto" }, { status: 400 });
    }

    // Verifica che la conversazione appartenga al visitatore (via cookie)
    const cookieStore = await cookies();
    const cookieConvId = cookieStore.get("chat_conv_id")?.value;
    if (cookieConvId !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Verifica che la conversazione sia attiva
    const conv = await db.chatConversation.findUnique({ where: { id } });
    if (!conv || conv.status === "closed") {
      return NextResponse.json(
        { error: "Conversazione chiusa" },
        { status: 400 },
      );
    }

    // Aggiorna metadati visitatore se forniti (su primo messaggio reale)
    const updateData: Record<string, unknown> = {
      lastMessageAt: new Date(),
      unreadByAdmin: { increment: 1 },
    };
    if (body.visitorName && !conv.visitorName) {
      updateData.visitorName = clean(body.visitorName, 100);
    }
    if (body.visitorEmail && !conv.visitorEmail) {
      updateData.visitorEmail = clean(body.visitorEmail, 200);
    }
    if (body.visitorPhone && !conv.visitorPhone) {
      updateData.visitorPhone = clean(body.visitorPhone, 50);
    }
    if (conv.status === "active" && conv.unreadByAdmin === 0) {
      // Primo messaggio del visitatore - marca come "waiting" per Salvo
      updateData.status = "waiting";
    }

    await db.chatConversation.update({ where: { id }, data: updateData });

    // Crea il messaggio
    const msg = await db.chatMessage.create({
      data: {
        conversationId: id,
        role: "visitor",
        text,
      },
    });

    return NextResponse.json({ message: msg });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
