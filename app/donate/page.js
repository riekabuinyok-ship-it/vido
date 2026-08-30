"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaHeart, FaShieldAlt, FaUniversity, FaCreditCard } from "@/components/ui/Icons";
import toast from "react-hot-toast";

const amounts = ["10", "25", "50", "100", "500"];

export default function DonatePage() {
  const [method, setMethod] = useState("stripe");
  const [selectedAmount, setSelectedAmount] = useState("10");
  const [showCustom, setShowCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [settings, setSettings] = useState({
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
    bankSwiftCode: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
    enableStripe: false,
    enableBank: true,
  });

  const stripeConfigured = Boolean(
    settings.stripePublishableKey && settings.stripePublishableKey.trim()
  );
  const stripeEnabled = settings.enableStripe && stripeConfigured;
  const bankEnabled = settings.enableBank;

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!stripeEnabled && bankEnabled && method === "stripe") {
      setMethod("bank");
    }
  }, [stripeEnabled, bankEnabled, method]);

  const handleAmount = (amount) => {
    setSelectedAmount(amount);
    if (amount === "custom") {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setCustomAmount("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = showCustom ? customAmount : selectedAmount;

    if (!name || !email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    if (showCustom && !customAmount) {
      toast.error("Please enter a donation amount.");
      return;
    }

    const submitting = toast.loading("Processing donation...");
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: name,
          email,
          amount: Number(amount),
          method,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to process donation");
      }

      toast.success(
        `Thank you for your donation of $${amount}, ${name}! We will send a confirmation to ${email}.`,
        { id: submitting }
      );
      setCustomAmount("");
    } catch (err) {
      toast.error(err.message || "Failed to process donation", {
        id: submitting,
      });
    }
  };

  return (
    <>
      <Header />

      <section className="donate-section">
      <div className="container">
        <div className="donate-container">
          <div className="donate-header">
            <h1>Support Our Work</h1>
            <p>Your donation helps us empower youth in South Sudan</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Payment Method */}
            <label className="field-label">Payment Method</label>
            <div className="payment-methods">
              {stripeEnabled && (
                <button
                  type="button"
                  className={`payment-method${method === "stripe" ? " active" : ""}`}
                  onClick={() => setMethod("stripe")}
                >
                  <FaCreditCard size={20} />
                  Credit Card
                </button>
              )}
              {bankEnabled && (
                <button
                  type="button"
                  className={`payment-method${method === "bank" ? " active" : ""}`}
                  onClick={() => setMethod("bank")}
                >
                  <FaUniversity size={20} />
                  Bank Transfer
                </button>
              )}
            </div>

            {/* Donation Amount */}
            <label className="field-label">Donation Amount</label>
            <div className="amount-grid">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`amount-btn${
                    selectedAmount === amount && !showCustom ? " active" : ""
                  }`}
                  onClick={() => handleAmount(amount)}
                >
                  ${amount}
                </button>
              ))}
              <button
                type="button"
                className={`amount-btn${showCustom ? " active" : ""}`}
                onClick={() => handleAmount("custom")}
              >
                Custom
              </button>
            </div>

            {showCustom && (
              <div className="custom-amount">
                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
            )}

            {/* Donor Info */}
            <div className="form-group">
              <label htmlFor="donorName">Full Name</label>
              <input
                type="text"
                id="donorName"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="donorEmail">Email Address</label>
              <input
                type="email"
                id="donorEmail"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Bank Details */}
            {method === "bank" && (
              <div className="bank-details">
                <h4>Bank Transfer Details</h4>
                <p>
                  <strong>Bank:</strong> {settings.bankName || "Equity Bank"}
                </p>
                <p>
                  <strong>Account Name:</strong>{" "}
                  {settings.bankAccountName || "VIDO"}
                </p>
                <p>
                  <strong>Account Number:</strong>{" "}
                  {settings.bankAccountNumber || "1234567890"}
                </p>
                {settings.bankSwiftCode && (
                  <p>
                    <strong>SWIFT/BIC:</strong> {settings.bankSwiftCode}
                  </p>
                )}
                <p>
                  <strong>Reference:</strong> Your Name
                </p>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn btn-primary btn-donate-submit">
              <FaHeart className="w-5 h-5" />
              Donate Now
            </button>
          </form>

          <div className="secure-badge">
            <FaShieldAlt className="inline w-4 h-4 mr-1" />
            {stripeEnabled
              ? "Secured by Stripe. Your information is safe."
              : "Your information is safe."}
          </div>
        </div>
      </div>
      </section>

      <Footer />
    </>
  );
}
