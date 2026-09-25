import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate, logAudit } from "@/lib/admin-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const sub = await db.contactSubmission.findUnique({ where: { id } });
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
  const { id } = await params;
  const body = await req.json();
  const { status, adminNotes } = body as {
    status?: string;
    adminNotes?: string;
  };

  const updated = await db.contactSubmission.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(adminNotes !== undefined ? { adminNotes } : {}),
    },
  });

  await logAudit("update_submission", id, { status }, req);

  return NextResponse.json({ submission: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await db.contactSubmission.delete({ where: { id } });
  await logAudit("delete_submission", id, undefined, req);
  return NextResponse.json({ ok: true });
}
