import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const post = await prisma.post.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const post = await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, id: post.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
