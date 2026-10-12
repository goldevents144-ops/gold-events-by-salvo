import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createConversation,
  getConversationWithMessages,
  getMessages,
  updateConversation,
  markMessagesRead,
  kvAvailable,
} from "@/lib/kv-store";

function clean(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max).replace(/[<>]/g, "");
}

/**
 * POST /api/chat/conversations
 * Crea una nuova conversazione per il visitatore (o restituisce quella esistente via cookie)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const visitorName = clean(body.visitorName, 100);
    const visitorEmail = clean(body.visitorEmail, 200);
    const visitorPhone = clean(body.visitorPhone, 50);

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "";

    const cookieStore = await cookies();
    const existingConvId = cookieStore.get("chat_conv_id")?.value;

    // Se ha già una conversazione attiva, restituiscila
    if (existingConvId) {
      const existing = await getConversationWithMessages(existingConvId);
      if (existing && existing.conversation.status !== "closed") {
        return NextResponse.json({ conversation: existing.conversation, messages: existing.messages });
      }
    }

    // Crea nuova conversazione
    const conv = await createConversation(
      {
        visitorName: visitorName || null,
        visitorEmail: visitorEmail || null,
        visitorPhone: visitorPhone || null,
        visitorIp: String(ip).slice(0, 100),
        userAgent: userAgent.slice(0, 200),
        status: "active",
      },
      "Conversazione iniziata. Salvo ti risponderà appena possibile.",
    );

    if (!conv) {
      return NextResponse.json({ error: "Errore creazione conversazione" }, { status: 500 });
    }

    const messages = await getMessages(conv.id);

    const res = NextResponse.json({ conversation: conv, messages });
    res.cookies.set("chat_conv_id", conv.id, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 giorni
      path: "/",
    });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}

/**
 * GET /api/chat/conversations
 * Recupera la conversazione del visitatore (via cookie)
 */
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const convId = cookieStore.get("chat_conv_id")?.value;
    if (!convId) {
      return NextResponse.json({ conversation: null });
    }
    const result = await getConversationWithMessages(convId);
    if (!result) {
      return NextResponse.json({ conversation: null });
    }

    // Reset unreadByVisitor quando il visitatore legge
    if (result.conversation.unreadByVisitor > 0) {
      await updateConversation(convId, { unreadByVisitor: 0 });
      await markMessagesRead(convId, "admin");
    }

    return NextResponse.json({
      conversation: result.conversation,
      messages: result.messages,
    });
  } catch {
    return NextResponse.json({ conversation: null });
  }
}
