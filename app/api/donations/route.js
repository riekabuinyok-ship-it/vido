import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Donation from "@/models/Donation";

export const dynamic = "force-dynamic";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const { donorName, email, amount, method, reference } = body;

    if (!donorName || !email || !amount) {
      return NextResponse.json(
        { error: "Donor name, email and amount are required" },
        { status: 400 }
      );
    }

    const donation = await Donation.create({
      donorName,
      email,
      amount: Number(amount),
      currency: "USD",
      method: method === "bank" ? "bank" : "stripe",
      status: "pending",
      reference: reference || null,
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const donations = await Donation.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(donations);
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    if (id) {
      const donation = await Donation.findByIdAndDelete(id);
      if (!donation) {
        return NextResponse.json({ error: "Donation not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }
    await Donation.deleteMany({ email: "donor@example.com" });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
