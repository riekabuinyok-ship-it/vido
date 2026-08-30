import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Donation from "../models/Donation.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const demoSlugs = [
  "new-learning-centers-open-in-juba",
  "community-health-awareness-campaign",
  "women-empowerment-building-futures",
  "clean-water-access-for-rural-villages",
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const removed = await Post.deleteMany({ slug: { $in: demoSlugs } });
  console.log(`Removed ${removed.deletedCount} demo posts`);

  // Optional cleanup of any test donations
  const donations = await Donation.countDocuments();
  console.log(`There are ${donations} donation records (kept)`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Cleanup failed:", err);
  process.exit(1);
});
