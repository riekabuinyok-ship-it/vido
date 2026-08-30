import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  await dbConnect();
  const post = await Post.findById(params.id)
    .populate("authorId", "name email")
    .lean();
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  try {
    const post = await Post.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const post = await Post.findByIdAndDelete(params.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
