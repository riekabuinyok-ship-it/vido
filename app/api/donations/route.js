import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { donorName, email, amount, method, reference } = body;

    if (!donorName || !email || !amount) {
      return NextResponse.json(
        { error: "Donor name, email and amount are required" },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        donorName,
        email,
        amount: Number(amount),
        currency: "USD",
        method: method === "bank" ? "bank" : "stripe",
        status: "pending",
        reference: reference || null,
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(donations);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const donation = await prisma.donation.delete({ where: { id } });
      return NextResponse.json({ success: true, id: donation.id });
    }
    const result = await prisma.donation.deleteMany({
      where: { email: "donor@example.com" },
    });
    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
