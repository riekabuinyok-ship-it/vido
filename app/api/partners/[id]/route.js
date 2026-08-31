import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveImage } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const partner = await prisma.partner.findUnique({
      where: { id: params.id },
    });
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const type = formData.get("type");
    const website = formData.get("website");
    const file = formData.get("logo");

    const data = {
      name: name?.trim() || undefined,
      type: type || null,
      website: website || null,
    };

    if (file && file.name) {
      data.logo = await saveImage(file);
    }

    const partner = await prisma.partner.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const partner = await prisma.partner.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, id: partner.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
