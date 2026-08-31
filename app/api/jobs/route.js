import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
    const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
    const mapped = jobs.map((job) => ({
      ...job,
      date: job.date || defaultDate(),
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json(fallbackJobs);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, location, type, email, description } = body;

    if (!title || !title.trim() || !location || !description) {
      return NextResponse.json(
        { error: "Title, location and description are required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title: title.trim(),
        location: location.trim(),
        type: type || "full-time",
        email: email || "vido2024@gmail.com",
        description,
        date: defaultDate(),
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
