import dotenv from "dotenv";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env.local" });

// Scripts connect directly (no pooler) for reliability.
process.env.DATABASE_URL = process.env.DIRECT_URL || process.env.DATABASE_URL;

const prisma = new PrismaClient();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set (needed to read source data)");
  process.exit(1);
}

const log = (msg) => console.log("[migrate] " + msg);

async function main() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  log("Connected to MongoDB source");

  const db = mongoose.connection.db;

  // --- Users (map mongo _id -> prisma id) ---
  const userMap = {};
  const mongoUsers = await db.collection("users").find({}).toArray();
  for (const u of mongoUsers) {
    const key = u.email?.toLowerCase().trim();
    if (!key) continue;
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    const data = {
      name: u.name || "Admin",
      email: u.email,
      password: u.password,
      role: u.role || "editor",
      isActive: u.isActive !== false,
    };
    let user;
    if (existing) {
      user = existing;
    } else {
      user = await prisma.user.create({ data });
    }
    userMap[String(u._id)] = user.id;
    log(`user synced: ${u.email}`);
  }
  const firstUserId = Object.values(userMap)[0] || null;

  // --- Posts ---
  const mongoPosts = await db.collection("posts").find({}).toArray();
  for (const p of mongoPosts) {
    if (!p.slug) continue;
    const exists = await prisma.post.findUnique({ where: { slug: p.slug } });
    if (exists) continue;
    const authorId = (p.authorId && userMap[String(p.authorId)]) || firstUserId;
    if (!authorId) {
      log(`post skipped (no author): ${p.slug}`);
      continue;
    }
    await prisma.post.create({
      data: {
        title: p.title,
        slug: p.slug,
        content: p.content || "",
        excerpt: p.excerpt || null,
        category: p.category || null,
        tags: p.tags || [],
        featuredImage: p.featuredImage || null,
        status: p.status || "draft",
        views: p.views || 0,
        authorId,
        publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
      },
    });
    log(`post synced: ${p.slug}`);
  }

  // --- Staff ---
  const mongoStaff = await db.collection("staffs").find({}).toArray();
  if (mongoStaff.length) {
    await prisma.staff.createMany({
      data: mongoStaff.map((s) => ({
        name: s.name,
        role: s.role || "",
        email: s.email || null,
        photo: s.photo || "",
        bio: s.bio || "",
        order: s.order || 0,
      })),
      skipDuplicates: true,
    });
    log(`staff synced: ${mongoStaff.length}`);
  }

  // --- Partners ---
  const mongoPartners = await db.collection("partners").find({}).toArray();
  if (mongoPartners.length) {
    await prisma.partner.createMany({
      data: mongoPartners.map((p) => ({
        name: p.name,
        type: p.type || null,
        website: p.website || null,
        logo: p.logo || null,
        displayOrder: p.displayOrder || 0,
      })),
      skipDuplicates: true,
    });
    log(`partners synced: ${mongoPartners.length}`);
  }

  // --- Jobs ---
  const mongoJobs = await db.collection("jobs").find({}).toArray();
  if (mongoJobs.length) {
    await prisma.job.createMany({
      data: mongoJobs.map((j) => ({
        title: j.title,
        location: j.location,
        type: j.type || "full-time",
        email: j.email || "vido2024@gmail.com",
        description: j.description,
        date: j.date || "",
      })),
      skipDuplicates: true,
    });
    log(`jobs synced: ${mongoJobs.length}`);
  }

  // --- Donations ---
  const mongoDonations = await db.collection("donations").find({}).toArray();
  if (mongoDonations.length) {
    await prisma.donation.createMany({
      data: mongoDonations.map((d) => ({
        donorName: d.donorName,
        email: d.email,
        amount: Number(d.amount) || 0,
        currency: d.currency || "USD",
        method: d.method || "stripe",
        status: d.status || "pending",
        reference: d.reference || null,
      })),
      skipDuplicates: true,
    });
    log(`donations synced: ${mongoDonations.length}`);
  }

  // --- Settings ---
  const mongoSettings = await db.collection("settings").find({}).toArray();
  for (const s of mongoSettings) {
    if (!s.key) continue;
    const value = s.value === undefined ? null : s.value;
    await prisma.setting.upsert({
      where: { key: s.key },
      create: { key: s.key, value: value === null ? null : String(value) },
      update: { value: value === null ? null : String(value) },
    });
    log(`setting synced: ${s.key}`);
  }

  log("Migration complete.");
  await mongoose.disconnect();
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("Migration failed:", err.message);
  await prisma.$disconnect().catch(() => {});
  process.exit(1);
});
