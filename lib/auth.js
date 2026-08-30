import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function findUserByEmail(email) {
  await dbConnect();
  return User.findOne({ email });
}

export async function createUser(userData) {
  await dbConnect();
  return User.create(userData);
}

export async function verifyPassword(user, password) {
  const bcrypt = (await import("bcryptjs")).default;
  return bcrypt.compare(password, user.password);
}
