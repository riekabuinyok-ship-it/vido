import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { blogImages } from "../lib/site-content.js";

dotenv.config({ path: ".env.local" });

process.env.DATABASE_URL = process.env.DIRECT_URL || process.env.DATABASE_URL;

const prisma = new PrismaClient();

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
  const posts = await prisma.post.findMany({ where: { status: "published" } });
  console.log(`Found ${posts.length} published posts`);

  let updated = 0;
  for (const post of posts) {
    const want = imageFor(post);
    if (post.featuredImage !== want) {
      await prisma.post.update({
        where: { id: post.id },
        data: { featuredImage: want },
      });
      updated++;
      console.log(`  Updated "${post.title}" -> ${want}`);
    }
  }

  console.log(`\nUpdated ${updated} posts`);
  process.exit(0);
}

main()
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
