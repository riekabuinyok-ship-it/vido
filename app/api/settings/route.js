import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Settings from "@/models/Settings";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const settings = await Settings.find({}).lean();
  const flat = {};
  settings.forEach((setting) => {
    flat[setting.key] = setting.value;
  });
  return NextResponse.json(flat);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const updates = Object.entries(body).map(([key, value]) =>
      Settings.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true })
    );
    await Promise.all(updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
