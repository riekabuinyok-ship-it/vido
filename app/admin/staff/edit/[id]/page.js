"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ROLES } from "@/lib/roles";

export default function EditStaffPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    bio: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/staff/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name ?? "",
          role: data.role ?? "",
          email: data.email ?? "",
          bio: data.bio ?? "",
          photo: data.photo ?? "",
        });
      })
      .catch(() => {
        toast.error("Failed to load staff member");
        router.push("/admin/staff");
      });
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update staff");
      toast.success("Staff member updated!");
      router.push("/admin/staff");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Edit Staff</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label className="field-label">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="admin-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="field-label">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="admin-input"
            required
          >
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="field-label">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="admin-input"
          />
        </div>
        <div className="form-group">
          <label className="field-label">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="admin-input"
            rows={4}
          />
        </div>
        <div className="form-group">
          <label className="field-label">Photo URL</label>
          <input
            name="photo"
            type="url"
            value={form.photo}
            onChange={handleChange}
            className="admin-input"
            placeholder="https://res.cloudinary.com/... (shown on the About page)"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
