import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const flat = {};
    settings.forEach((setting) => {
      flat[setting.key] = setting.value;
    });
    return NextResponse.json(flat);
  } catch (error) {
    return NextResponse.json({});
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const entries = Object.entries(body).map(([key, value]) => ({
      key,
      value: value === undefined ? null : value,
    }));

    await Promise.all(
      entries.map((entry) =>
        prisma.setting.upsert({
          where: { key: entry.key },
          create: entry,
          update: { value: entry.value },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
