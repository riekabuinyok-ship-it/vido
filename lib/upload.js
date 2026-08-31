import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

// Saves an uploaded image. On Vercel (serverless, read-only filesystem) it
// stores in Vercel Blob and returns the public URL. Locally it writes to
// /public/uploads and returns a /uploads path.
export async function saveImage(file) {
  if (!file || !file.name) return null;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name).toLowerCase() || ".png";
  const safeName =
    path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9-_]/g, "-") || "logo";
  const filename = `${Date.now()}-${safeName}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    // Serverless (Vercel) filesystem is read-only and no Blob token is set.
    // Embed the image as a data URL so it still saves and displays.
    console.warn("Could not store uploaded file to disk; embedding as data URL:", error.message);
    return `data:${file.type || "image/png"};base64,${buffer.toString("base64")}`;
  }
}

export default saveImage;
