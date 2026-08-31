import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Partner from "@/models/Partner";
import { saveImage } from "@/lib/upload";

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
      updates.logo = await saveImage(file);
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
