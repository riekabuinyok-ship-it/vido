import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (cached.failedAt && Date.now() - cached.failedAt < 15000) {
    throw new Error(
      "Cannot connect to the database. Check MongoDB Atlas Network Access (allow 0.0.0.0/0) and MONGODB_URI."
    );
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    cached.failedAt = Date.now();
    throw new Error(
      "Cannot connect to the database. Check MongoDB Atlas Network Access (allow 0.0.0.0/0) and MONGODB_URI."
    );
  }
}

export default dbConnect;
