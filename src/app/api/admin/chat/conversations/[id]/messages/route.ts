import { NextRequest, NextResponse } from "next/server";
import { getConversation, addMessage, updateConversation, logAuditEntry, kvAvailable } from "@/lib/kv-store";
import { authenticate } from "@/lib/admin-auth";

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
  if (!kvAvailable) {
    return NextResponse.json({ error: "KV not available" }, { status: 503 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const text = clean(body.text, MAX_TEXT);

    if (!text) {
      return NextResponse.json({ error: "Messaggio vuoto" }, { status: 400 });
    }

    const conv = await getConversation(id);
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
    const msg = await addMessage(id, {
      role: "admin",
      text,
      readAt: new Date().toISOString(),
    });
    if (!msg) {
      return NextResponse.json({ error: "Errore salvataggio" }, { status: 500 });
    }

    // Aggiorna conversazione
    await updateConversation(id, {
      lastMessageAt: new Date().toISOString(),
      status: "active",
      unreadByVisitor: conv.unreadByVisitor + 1,
    });

    await logAuditEntry("chat_reply", id, { textLength: text.length }, { headers: req.headers });

    return NextResponse.json({ message: msg });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
