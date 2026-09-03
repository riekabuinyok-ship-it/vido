import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveImage } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const role = formData.get("role");
    const capacity = formData.get("capacity");
    const education = formData.get("education");
    const experience = formData.get("experience");
    const bio = formData.get("bio");
    const file = formData.get("photo");

    const data = {
      name,
      role,
      capacity: capacity || null,
      education: education || null,
      experience: experience || null,
      bio: bio || "",
    };

    if (file && file.name) {
      data.photo = await saveImage(file);
    }

    const member = await prisma.staff.update({
      where: { id: params.id },
      data,
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
