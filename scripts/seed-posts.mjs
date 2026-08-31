import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { blogImages } from "../lib/site-content.js";

dotenv.config({ path: ".env.local" });

process.env.DATABASE_URL = process.env.DIRECT_URL || process.env.DATABASE_URL;

const prisma = new PrismaClient();

const demoPosts = [
  {
    title: "New Learning Centers Open in Juba",
    slug: "new-learning-centers-open-in-juba",
    excerpt:
      "We're thrilled to announce the opening of two new youth learning centers, bringing education and skills training to hundreds of young people.",
    content:
      "<p>This month, VIDO opened two new youth learning centers in Juba, expanding access to education and vocational training for hundreds of young people.</p><p>The centers offer computer literacy, life skills, and mentorship programs led by trained facilitators. We believe every young person deserves a chance to learn and grow.</p>",
    category: "Education",
    tags: ["education", "juba", "youth"],
    featuredImage: blogImages.education,
    status: "published",
    views: 1240,
    publishedAt: new Date("2026-08-20"),
  },
  {
    title: "Community Health Awareness Campaign",
    slug: "community-health-awareness-campaign",
    excerpt:
      "Our mobile health teams reached over 3,000 people this quarter with vital health screenings and HIV awareness.",
    content:
      "<p>Our mobile healthcare teams have reached over 3,000 people this quarter, offering vital screenings, health education, and HIV prevention awareness.</p><p>Community health is at the heart of our mission. We work alongside local leaders to make sure no one is left behind.</p>",
    category: "Healthcare",
    tags: ["health", "hiv", "community"],
    featuredImage: blogImages.health,
    status: "published",
    views: 980,
    publishedAt: new Date("2026-08-10"),
  },
  {
    title: "Women Empowerment: Building Futures",
    slug: "women-empowerment-building-futures",
    excerpt:
      "Meet the young women who completed our entrepreneurship training and launched their own businesses.",
    content:
      "<p>Sixteen young women recently completed our entrepreneurship and leadership training, and several have already launched their own small businesses.</p><p>Empowering women strengthens entire communities. We're proud to support their journey toward independence.</p>",
    category: "Youth Empowerment",
    tags: ["women", "empowerment", "business"],
    featuredImage: blogImages.women,
    status: "published",
    views: 1567,
    publishedAt: new Date("2026-07-28"),
  },
  {
    title: "Clean Water Access for Rural Villages",
    slug: "clean-water-access-for-rural-villages",
    excerpt:
      "A look at how our WASH program is bringing clean water and proper sanitation to rural communities.",
    content:
      "<p>Our WASH program continues to improve lives by installing water systems and building community latrines in rural areas.</p><p>Access to clean water reduces disease and frees up time for education and work. Here's how we're making it happen.</p>",
    category: "WASH",
    tags: ["water", "sanitation", "wash"],
    featuredImage: blogImages.wash,
    status: "published",
    views: 720,
    publishedAt: new Date("2026-07-15"),
  },
];

async function seed() {
  const admin = await prisma.user.findFirst({ where: { role: "admin" } });
  if (!admin) {
    console.error(
      "No admin user found. Run `npm run seed` first to create the admin account."
    );
    process.exit(1);
  }

  const existingCount = await prisma.post.count({ where: { status: "published" } });
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} published posts. Skipping.`);
    process.exit(0);
  }

  const created = await Promise.all(
    demoPosts.map((post) =>
      prisma.post.create({ data: { ...post, authorId: admin.id } })
    )
  );

  console.log(`Created ${created.length} demo posts`);
  process.exit(0);
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
