import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Job from "@/models/Job";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  await dbConnect();
  const job = await Job.findById(params.id).lean();
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json({ ...job, id: params.id });
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const updates = {
      title: body.title,
      location: body.location,
      type: body.type,
      email: body.email,
      description: body.description,
    };

    const job = await Job.findByIdAndUpdate(params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ ...job.toObject(), id: job._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const job = await Job.findByIdAndDelete(params.id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
