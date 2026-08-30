import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import "@/models/User";
import { slugify } from "@/lib/utils";
import { fallbackPosts } from "@/lib/fallback-data";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const filter = status ? { status } : {};
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate("authorId", "name email")
      .lean();
    const mapped = posts.map((p) => ({
      ...p,
      id: p._id.toString(),
      author: p.authorId || null,
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    // DB unavailable - return demo stories so the blog still loads.
    return NextResponse.json(fallbackPosts);
  }
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    let { title, slug, status, ...rest } = body;
    if (!slug && title) slug = slugify(title);

    const post = await Post.create({
      ...rest,
      title,
      slug,
      status: status || "draft",
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
