import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackPartners } from "@/lib/fallback-data";
import { saveImage } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json(fallbackPartners);
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const type = formData.get("type");
    const website = formData.get("website");
    const file = formData.get("logo");

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Partner name is required" },
        { status: 400 }
      );
    }

    const logo = await saveImage(file);

    const partner = await prisma.partner.create({
      data: {
        name: name.trim(),
        type: type || null,
        website: website || null,
        logo,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
