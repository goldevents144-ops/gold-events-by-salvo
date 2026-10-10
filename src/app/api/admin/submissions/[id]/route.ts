import { NextRequest, NextResponse } from "next/server";
import {
  getSubmission,
  updateSubmission,
  deleteSubmission,
  logAuditEntry,
  kvAvailable,
} from "@/lib/kv-store";
import { authenticate } from "@/lib/admin-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!kvAvailable) {
    return NextResponse.json({ submission: null });
  }
  const { id } = await params;
  const sub = await getSubmission(id);
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ submission: sub });
}

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
  const { id } = await params;
  const body = await req.json();
  const updates: Record<string, unknown> = {};

  if (body.status !== undefined) updates.status = body.status;
  if (body.adminNotes !== undefined) updates.adminNotes = body.adminNotes;
  if (body.starred !== undefined) updates.starred = body.starred;
  if (body.budget !== undefined) updates.budget = body.budget;
  if (body.email !== undefined) updates.email = body.email;
  if (body.phone !== undefined) updates.phone = body.phone;

  // Handle reply tracking
  if (body.repliedVia !== undefined) {
    updates.repliedVia = body.repliedVia;
    updates.repliedAt = new Date().toISOString();
    if (body.repliedText !== undefined) updates.repliedText = body.repliedText;
    // Auto-update status to "contacted" when reply is sent
    if (body.status === undefined) updates.status = "contacted";
  }

  const updated = await updateSubmission(id, updates);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await logAuditEntry("update_submission", id, {
    status: body.status,
    starred: body.starred,
    repliedVia: body.repliedVia,
    budget: body.budget,
  }, { headers: req.headers });

  return NextResponse.json({ submission: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!kvAvailable) {
    return NextResponse.json({ error: "KV not available" }, { status: 503 });
  }
  const { id } = await params;
  await deleteSubmission(id);
  await logAuditEntry("delete_submission", id, null, { headers: req.headers });
  return NextResponse.json({ ok: true });
}
