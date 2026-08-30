import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/db";
import Partner from "@/models/Partner";
import { fallbackPartners } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

async function saveLogo(file) {
  if (!file || !file.name) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name).toLowerCase() || ".png";
  const safeName =
    path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9-_]/g, "-") || "logo";
  const filename = `${Date.now()}-${safeName}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

export async function GET() {
  try {
    await dbConnect();
    const partners = await Partner.find({}).sort({ createdAt: -1 }).lean();
    const mapped = partners.map((p) => ({ ...p, id: p._id.toString() }));
    return NextResponse.json(mapped);
  } catch (error) {
    // DB unavailable - return demo partners so the homepage section still loads.
    return NextResponse.json(fallbackPartners);
  }
}

export async function POST(req) {
  await dbConnect();
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

    const logo = await saveLogo(file);

    const partner = await Partner.create({
      name: name.trim(),
      type: type || undefined,
      website: website || undefined,
      logo,
    });

    return NextResponse.json(
      { ...partner.toObject(), id: partner._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
