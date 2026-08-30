import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "uploads");
const backupDir = path.join(__dirname, "..", "public", "uploads-original");

const WIDTH = 1200;
const QUALITY = 82;

async function optimize() {
  mkdirSync(backupDir, { recursive: true });

  const files = readdirSync(dir).filter(
    (f) => /\.(jpe?g|png|webp|gif)$/i.test(f) && f !== ".gitkeep"
  );

  let saved = 0;
  for (const file of files) {
    const full = path.join(dir, file);
    const before = statSync(full).size;

    // Back up original once
    const backup = path.join(backupDir, file);
    if (!existsSync(backup)) {
      copyFileSync(full, backup);
    }

    const ext = path.extname(file).toLowerCase();
    const format = ext === ".png" ? "png" : ext === ".webp" ? "webp" : "jpeg";
    const tmp = path.join(dir, `.${file}.tmp`);

    await sharp(full)
      .resize({ width: WIDTH, withoutEnlargement: true })
      .toFormat(format, { quality: QUALITY })
      .toFile(tmp);

    const { renameSync } = await import("fs");
    renameSync(tmp, full);

    const after = statSync(full).size;
    saved += before - after;
    console.log(
      `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
    );
  }

  console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Originals backed up in public/uploads-original`);
}

optimize().catch((e) => {
  console.error("Optimize failed:", e.message);
  process.exit(1);
});
