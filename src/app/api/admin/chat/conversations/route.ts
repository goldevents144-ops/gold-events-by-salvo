import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";

/**
 * GET /api/admin/chat/conversations
 * Lista tutte le conversazioni per il mini gestionale admin
 * Filtri: ?status=active|waiting|closed
 */
export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const status = req.nextUrl.searchParams.get("status");
    const where = status ? { status } : undefined;

    const conversations = await db.chatConversation.findMany({
      where,
      orderBy: { lastMessageAt: "desc" },
      take: 100,
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1, // Solo ultimo messaggio per preview
        },
      },
    });

    return NextResponse.json({ conversations });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "DB error" },
      { status: 500 },
    );
  }
}
