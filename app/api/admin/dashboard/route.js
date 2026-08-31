import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [postCount, staffCount, viewsAgg, donationCount, recentPosts] =
      await Promise.all([
        prisma.post.count(),
        prisma.staff.count(),
        prisma.post.aggregate({ _sum: { views: true } }),
        prisma.donation.count(),
        prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { author: { select: { name: true } } },
        }),
      ]);

    return NextResponse.json({
      stats: {
        posts: postCount,
        staff: staffCount,
        views: viewsAgg._sum.views || 0,
        donations: donationCount,
      },
      recentPosts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        stats: { posts: 0, staff: 0, views: 0, donations: 0 },
        recentPosts: [],
      },
      { status: 200 }
    );
  }
}
