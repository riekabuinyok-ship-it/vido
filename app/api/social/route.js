import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_LINKS = {
  linkedin: { url: "", active: false },
  whatsapp: { url: "", active: false },
  facebook: { url: "", active: false },
  twitter: { url: "", active: false },
  youtube: { url: "", active: false },
  tiktok: { url: "", active: false },
  instagram: { url: "", active: false },
};

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let socialLinks = await prisma.socialLinks.findFirst();

    if (!socialLinks) {
      socialLinks = await prisma.socialLinks.create({
        data: { links: DEFAULT_LINKS },
      });
    }

    return NextResponse.json(socialLinks);
  } catch (error) {
    return NextResponse.json({ links: DEFAULT_LINKS });
  }
}

export async function POST(request) {
  try {
    const { links } = await request.json();
    const next = links || DEFAULT_LINKS;

    const existing = await prisma.socialLinks.findFirst();
    let socialLinks;
    if (existing) {
      socialLinks = await prisma.socialLinks.update({
        where: { id: existing.id },
        data: { links: next },
      });
    } else {
      socialLinks = await prisma.socialLinks.create({
        data: { links: next },
      });
    }

    return NextResponse.json({ success: true, links: socialLinks.links });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
