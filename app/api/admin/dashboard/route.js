import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Staff from "@/models/Staff";
import Donation from "@/models/Donation";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const [postCount, staffCount, totalViews, donationCount, recentPosts] =
    await Promise.all([
      Post.countDocuments(),
      Staff.countDocuments(),
      Post.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      Donation.countDocuments(),
      Post.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

  return NextResponse.json({
    stats: {
      posts: postCount,
      staff: staffCount,
      views: totalViews[0]?.total || 0,
      donations: donationCount,
    },
    recentPosts,
  });
}
