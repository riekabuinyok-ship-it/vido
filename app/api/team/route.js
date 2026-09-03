import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveImage } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const members = await prisma.staff.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const role = formData.get("role");
    const capacity = formData.get("capacity");
    const education = formData.get("education");
    const experience = formData.get("experience");
    const bio = formData.get("bio");
    const file = formData.get("photo");

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required" },
        { status: 400 }
      );
    }

    const photo = await saveImage(file);

    const member = await prisma.staff.create({
      data: {
        name,
        role,
        capacity: capacity || null,
        education: education || null,
        experience: experience || null,
        bio: bio || "",
        photo: photo || "",
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
