import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { fallbackPosts } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const where = status ? { status } : {};

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(fallbackPosts);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    let { title, slug, status, ...rest } = body;
    if (!slug && title) slug = slugify(title);

    const post = await prisma.post.create({
      data: {
        ...rest,
        title,
        slug,
        status: status || "draft",
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
