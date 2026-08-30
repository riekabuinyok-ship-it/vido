import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/db";
import Partner from "@/models/Partner";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const partner = await Partner.findById(params.id).lean();
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({ ...partner, id: params.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const name = formData.get("name");
    const type = formData.get("type");
    const website = formData.get("website");
    const file = formData.get("logo");

    const updates = {
      name: name?.trim() || undefined,
      type: type || undefined,
      website: website || undefined,
    };

    if (file && file.name) {
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
      updates.logo = `/uploads/${filename}`;
    }

    const partner = await Partner.findByIdAndUpdate(params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...partner.toObject(),
      id: partner._id.toString(),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const partner = await Partner.findByIdAndDelete(params.id);
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
