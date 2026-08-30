"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ROLES } from "@/lib/roles";

export default function AddStaff() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
    bio: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Staff member added successfully!");
        router.push("/admin/staff");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to add staff");
      }
    } catch (error) {
      toast.error("Failed to add staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Add Staff Member</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="form-label">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-input"
            placeholder="Enter email address"
            required
          />
        </div>

        <div>
          <label className="form-label">Password *</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="form-input"
            placeholder="Create a password"
            required
            minLength={8}
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
        </div>

        <div>
          <label className="form-label">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="form-input"
          >
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {ROLES.find((r) => r.value === formData.role)?.description}
          </p>
        </div>

        <div>
          <label className="form-label">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="form-input"
            rows="4"
            placeholder="Brief description about the staff member"
          />
        </div>

        <div>
          <label className="form-label">Photo URL</label>
          <input
            type="url"
            value={formData.photo}
            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
            className="form-input"
            placeholder="https://res.cloudinary.com/... (shown on the About page)"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3"
          >
            {loading ? "Adding..." : "Add Staff Member"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/staff")}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
