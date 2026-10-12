import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getConversation, addMessage, updateConversation, kvAvailable } from "@/lib/kv-store";

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

    const conv = await getConversation(id);
    if (!conv || conv.status === "closed") {
      return NextResponse.json(
        { error: "Conversazione chiusa o non trovata" },
        { status: 400 },
      );
    }

    // Aggiorna metadati visitatore se forniti (su primo messaggio reale)
    const updates: Record<string, unknown> = {
      lastMessageAt: new Date().toISOString(),
      unreadByAdmin: conv.unreadByAdmin + 1,
    };
    if (body.visitorName && !conv.visitorName) {
      updates.visitorName = clean(body.visitorName, 100);
    }
    if (body.visitorEmail && !conv.visitorEmail) {
      updates.visitorEmail = clean(body.visitorEmail, 200);
    }
    if (body.visitorPhone && !conv.visitorPhone) {
      updates.visitorPhone = clean(body.visitorPhone, 50);
    }
    // Primo messaggio del visitatore - marca come "waiting" per Salvo
    if (conv.status === "active" && conv.unreadByAdmin === 0) {
      updates.status = "waiting";
    }

    await updateConversation(id, updates);

    // Crea il messaggio
    const msg = await addMessage(id, { role: "visitor", text });
    if (!msg) {
      return NextResponse.json({ error: "Errore salvataggio" }, { status: 500 });
    }

    return NextResponse.json({ message: msg });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
