import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be at least 1"],
  },
  currency: {
    type: String,
    default: "USD",
  },
  method: {
    type: String,
    enum: ["stripe", "bank"],
    default: "stripe",
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  reference: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Donation ||
  mongoose.model("Donation", DonationSchema);
