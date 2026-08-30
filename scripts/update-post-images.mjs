import dotenv from "dotenv";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import { blogImages } from "../lib/site-content.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

// Map each category (or fallback by title keyword) to a local image.
function imageFor(post) {
  const cat = (post.category || "").toLowerCase();
  const title = (post.title || "").toLowerCase();

  if (cat.includes("health") || title.includes("health")) return blogImages.health;
  if (cat.includes("edu") || title.includes("school") || title.includes("learn") || title.includes("education"))
    return blogImages.education;
  if (cat.includes("women") || title.includes("women") || title.includes("entrepreneur"))
    return blogImages.women;
  if (cat.includes("wash") || cat.includes("water") || title.includes("water") || title.includes("sanitation"))
    return blogImages.wash;
  if (title.includes("youth") || cat.includes("youth")) return blogImages.youth;
  return blogImages.community;
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const posts = await Post.find({ status: "published" }).lean();
  console.log(`Found ${posts.length} published posts`);

  let updated = 0;
  for (const post of posts) {
    const want = imageFor(post);
    if (post.featuredImage !== want) {
      await Post.updateOne({ _id: post._id }, { $set: { featuredImage: want } });
      updated++;
      console.log(`  Updated "${post.title}" -> ${want}`);
    }
  }

  console.log(`\nUpdated ${updated} posts`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
