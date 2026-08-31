import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const member = await prisma.staff.findUnique({ where: { id: params.id } });
    if (!member) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const member = await prisma.staff.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const member = await prisma.staff.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, id: member.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
