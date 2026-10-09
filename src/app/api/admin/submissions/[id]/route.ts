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
  try {
    const sub = await db.contactSubmission.findUnique({ where: { id } });
    if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ submission: sub });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
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
  const {
    status,
    adminNotes,
    starred,
    budget,
    repliedVia,
    repliedText,
    email,
    phone,
  } = body as {
    status?: string;
    adminNotes?: string;
    starred?: boolean;
    budget?: string;
    repliedVia?: string;
    repliedText?: string;
    email?: string;
    phone?: string;
  };

  try {
    const data: Record<string, unknown> = {};
    if (status !== undefined) data.status = status;
    if (adminNotes !== undefined) data.adminNotes = adminNotes;
    if (starred !== undefined) data.starred = starred;
    if (budget !== undefined) data.budget = budget;
    if (email !== undefined) data.email = email;
    if (phone !== undefined) data.phone = phone;

    // Handle reply tracking
    if (repliedVia !== undefined) {
      data.repliedVia = repliedVia;
      data.repliedAt = new Date();
      if (repliedText !== undefined) data.repliedText = repliedText;
      // Auto-update status to "contacted" when reply is sent
      if (status === undefined) data.status = "contacted";
    }

    const updated = await db.contactSubmission.update({
      where: { id },
      data,
    });

    await logAudit(
      "update_submission",
      id,
      {
        status,
        starred,
        repliedVia,
        budget,
      },
      req,
    );

    return NextResponse.json({ submission: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "DB error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await authenticate(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await db.contactSubmission.delete({ where: { id } });
    await logAudit("delete_submission", id, undefined, req);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
