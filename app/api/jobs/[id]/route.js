import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const job = await prisma.job.findUnique({ where: { id: params.id } });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const job = await prisma.job.update({
      where: { id: params.id },
      data: {
        title: body.title,
        location: body.location,
        type: body.type,
        email: body.email,
        description: body.description,
        deadline: body.deadline ? new Date(body.deadline) : null,
      },
    });
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const job = await prisma.job.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, id: job.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
