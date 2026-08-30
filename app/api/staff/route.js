import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Staff from "@/models/Staff";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const staff = await Staff.find({}).sort({ order: 1 }).lean();
  const mapped = staff.map((m) => ({ ...m, id: m._id.toString() }));
  return NextResponse.json(mapped);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const { password, email, name, role, bio } = body;

    if (email && password) {
      const existing = await User.findOne({ email });
      if (existing) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
    }

    const member = await Staff.create({ name, role, email, bio });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
