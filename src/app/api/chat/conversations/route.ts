import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const MAX_TEXT = 2000;

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

    // IP hash per sicurezza (no PII grezza)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "";

    const cookieStore = await cookies();
    const existingConvId = cookieStore.get("chat_conv_id")?.value;

    // Se ha già una conversazione, restituiscila
    if (existingConvId) {
      try {
        const conv = await db.chatConversation.findUnique({
          where: { id: existingConvId },
          include: { messages: { orderBy: { createdAt: "asc" }, take: 100 } },
        });
        if (conv && conv.status !== "closed") {
          return NextResponse.json({ conversation: conv });
        }
      } catch {}
    }

    // Crea nuova conversazione
    const conv = await db.chatConversation.create({
      data: {
        visitorName: visitorName || null,
        visitorEmail: visitorEmail || null,
        visitorPhone: visitorPhone || null,
        visitorIp: String(ip).slice(0, 100),
        userAgent: userAgent.slice(0, 200),
        status: "active",
        lastMessageAt: new Date(),
        unreadByAdmin: 0,
        unreadByVisitor: 0,
        messages: {
          create: {
            role: "system",
            text: "Conversazione iniziata. Salvo ti risponderà appena possibile.",
          },
        },
      },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    const res = NextResponse.json({ conversation: conv });
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
    const conv = await db.chatConversation.findUnique({
      where: { id: convId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 200,
        },
      },
    });
    if (!conv) {
      return NextResponse.json({ conversation: null });
    }

    // Reset unreadByVisitor quando il visitatore legge
    if (conv.unreadByVisitor > 0) {
      await db.chatConversation.update({
        where: { id: conv.id },
        data: { unreadByVisitor: 0 },
      });
      // Marca messaggi admin come letti
      await db.chatMessage.updateMany({
        where: {
          conversationId: conv.id,
          role: "admin",
          readAt: null,
        },
        data: { readAt: new Date() },
      });
    }

    return NextResponse.json({ conversation: conv });
  } catch {
    return NextResponse.json({ conversation: null });
  }
}
