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
    const setting = await prisma.setting.findUnique({
      where: { key: "socialLinks" },
    });
    const links = setting?.value?.links || DEFAULT_LINKS;
    return NextResponse.json({ links });
  } catch (error) {
    return NextResponse.json({ links: DEFAULT_LINKS });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const links = body.links || DEFAULT_LINKS;
    await prisma.setting.upsert({
      where: { key: "socialLinks" },
      create: { key: "socialLinks", value: { links } },
      update: { value: { links } },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
