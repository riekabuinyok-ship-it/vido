import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env.local" });

process.env.DATABASE_URL = process.env.DIRECT_URL || process.env.DATABASE_URL;

const prisma = new PrismaClient();

const demoSlugs = [
  "new-learning-centers-open-in-juba",
  "community-health-awareness-campaign",
  "women-empowerment-building-futures",
  "clean-water-access-for-rural-villages",
];

async function main() {
  const removed = await prisma.post.deleteMany({
    where: { slug: { in: demoSlugs } },
  });
  console.log(`Removed ${removed.count} demo posts`);

  const donations = await prisma.donation.count();
  console.log(`There are ${donations} donation records (kept)`);

  process.exit(0);
}

main()
  .catch((err) => {
    console.error("Cleanup failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
