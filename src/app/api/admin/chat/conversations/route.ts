import { NextRequest, NextResponse } from "next/server";
import { listConversations, kvAvailable } from "@/lib/kv-store";
import { authenticate } from "@/lib/admin-auth";

/**
 * GET /api/admin/chat/conversations
 * Lista tutte le conversazioni per il mini gestionale admin
 */
export async function GET(req: NextRequest) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!kvAvailable) {
    return NextResponse.json({ conversations: [] });
  }
  try {
    const status = req.nextUrl.searchParams.get("status") || undefined;
    const conversations = await listConversations(status ? { status } : undefined, 100);
    // Convert to format expected by frontend (with messages preview)
    const result = conversations.map((c) => ({
      ...c.conversation,
      messages: c.lastMessage ? [c.lastMessage] : [],
    }));
    return NextResponse.json({ conversations: result });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}
