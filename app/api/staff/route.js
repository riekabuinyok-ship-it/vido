import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { password, email, name, role, bio } = body;

    if (email && password) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: { name, email, password: hashedPassword, role },
      });
    }

    const member = await prisma.staff.create({
      data: { name, role, email: email || null, bio: bio || "" },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
