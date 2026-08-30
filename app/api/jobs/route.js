import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import { fallbackJobs } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

function defaultDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function GET() {
  try {
    await dbConnect();
    const jobs = await Job.find({}).sort({ createdAt: -1 }).lean();
    const mapped = jobs.map((job) => ({
      ...job,
      id: job._id.toString(),
      date: job.date || defaultDate(),
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    // DB unavailable - return demo listings so the careers page still loads.
    return NextResponse.json(fallbackJobs);
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { title, location, type, email, description } = body;

    if (!title || !title.trim() || !location || !description) {
      return NextResponse.json(
        { error: "Title, location and description are required" },
        { status: 400 }
      );
    }

    const job = await Job.create({
      title: title.trim(),
      location: location.trim(),
      type: type || "full-time",
      email: email || "vido2024@gmail.com",
      description,
      date: defaultDate(),
    });

    return NextResponse.json(
      { ...job.toObject(), id: job._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
