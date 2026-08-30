"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaStripe, FaUniversity } from "react-icons/fa";

export default function Settings() {
  const [settings, setSettings] = useState({
    stripePublishableKey: "",
    stripeSecretKey: "",
    enableStripe: true,
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
    bankSwiftCode: "",
    enableBank: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Settings saved successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Donation Settings</h1>
      <p className="text-gray-500 mb-8">Configure Stripe and Bank transfer payment methods</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Stripe Settings */}
        <div className="admin-card">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <FaStripe className="text-secondary" />
            Stripe Configuration
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableStripe"
                checked={settings.enableStripe}
                onChange={(e) =>
                  setSettings({ ...settings, enableStripe: e.target.checked })
                }
                className="w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
              />
              <label htmlFor="enableStripe" className="ml-2 text-sm font-medium">
                Enable Stripe Payments
              </label>
            </div>

            <div>
              <label className="form-label">Publishable Key</label>
              <input
                type="text"
                value={settings.stripePublishableKey}
                onChange={(e) =>
                  setSettings({ ...settings, stripePublishableKey: e.target.value })
                }
                className="form-input"
                placeholder="pk_test_..."
              />
            </div>

            <div>
              <label className="form-label">Secret Key</label>
              <input
                type="password"
                value={settings.stripeSecretKey}
                onChange={(e) =>
                  setSettings({ ...settings, stripeSecretKey: e.target.value })
                }
                className="form-input"
                placeholder="sk_test_..."
              />
              <p className="text-xs text-gray-500 mt-1">This key is encrypted</p>
            </div>
          </div>
        </div>

        {/* Bank Settings */}
        <div className="admin-card">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <FaUniversity className="text-secondary" />
            Bank Transfer Configuration
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableBank"
                checked={settings.enableBank}
                onChange={(e) =>
                  setSettings({ ...settings, enableBank: e.target.checked })
                }
                className="w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
              />
              <label htmlFor="enableBank" className="ml-2 text-sm font-medium">
                Enable Bank Transfers
              </label>
            </div>

            <div>
              <label className="form-label">Bank Name</label>
              <input
                type="text"
                value={settings.bankName}
                onChange={(e) =>
                  setSettings({ ...settings, bankName: e.target.value })
                }
                className="form-input"
                placeholder="e.g., Equity Bank"
              />
            </div>

            <div>
              <label className="form-label">Account Name</label>
              <input
                type="text"
                value={settings.bankAccountName}
                onChange={(e) =>
                  setSettings({ ...settings, bankAccountName: e.target.value })
                }
                className="form-input"
                placeholder="e.g., VIDO"
              />
            </div>

            <div>
              <label className="form-label">Account Number</label>
              <input
                type="text"
                value={settings.bankAccountNumber}
                onChange={(e) =>
                  setSettings({ ...settings, bankAccountNumber: e.target.value })
                }
                className="form-input"
                placeholder="Enter account number"
              />
            </div>

            <div>
              <label className="form-label">Routing Number</label>
              <input
                type="text"
                value={settings.bankRoutingNumber}
                onChange={(e) =>
                  setSettings({ ...settings, bankRoutingNumber: e.target.value })
                }
                className="form-input"
                placeholder="Enter routing number"
              />
            </div>

            <div>
              <label className="form-label">SWIFT/BIC Code</label>
              <input
                type="text"
                value={settings.bankSwiftCode}
                onChange={(e) =>
                  setSettings({ ...settings, bankSwiftCode: e.target.value })
                }
                className="form-input"
                placeholder="e.g., EQBLXXXX"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
