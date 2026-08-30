import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Staff from "@/models/Staff";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  await dbConnect();
  const member = await Staff.findById(params.id).lean();
  if (!member) {
    return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
  }
  return NextResponse.json({ ...member, id: member._id.toString() });
}

export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  try {
    const member = await Staff.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const member = await Staff.findByIdAndDelete(params.id);
    if (!member) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
