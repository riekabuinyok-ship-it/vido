import { prisma } from "@/lib/prisma";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(userData) {
  return prisma.user.create({ data: userData });
}

export async function verifyPassword(user, password) {
  const bcrypt = (await import("bcryptjs")).default;
  return bcrypt.compare(password, user.password);
}
