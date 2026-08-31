import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Partner from "@/models/Partner";
import { fallbackPartners } from "@/lib/fallback-data";
import { saveImage } from "@/lib/upload";

export const dynamic = "force-dynamic";

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

    const logo = await saveImage(file);

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
