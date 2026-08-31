"use client";

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";

const TYPES = ["full-time", "part-time", "contract"];

const emptyForm = {
  title: "",
  location: "",
  type: "full-time",
  email: "vido2024@gmail.com",
  description: "",
};

export default function JobsManagement() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbDown, setDbDown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (Array.isArray(data)) {
        setJobs(data);
        setDbDown(
          data.length > 0 && data.every((j) => String(j.id).startsWith("fb-"))
        );
      }
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const resetForm = () => {
    setShowForm(false);
    setEditingJob(null);
    setForm(emptyForm);
  };

  const openNew = () => {
    setEditingJob(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      location: job.location,
      type: job.type,
      email: job.email || "vido2024@gmail.com",
      description: job.description,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.description.trim()) {
      toast.error("Please fill in title, location and description.");
      return;
    }

    setSaving(true);
    try {
      const url = editingJob ? `/api/jobs/${editingJob.id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(editingJob ? "Job updated!" : "Job added!");
        resetForm();
        fetchJobs();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save job");
      }
    } catch (error) {
      toast.error("Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  const deleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Job deleted");
        fetchJobs();
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const typeLabel = (type) => (type || "")
    .charAt(0)
    .toUpperCase()
    .concat((type || "").slice(1));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Job Listings</h1>
          <p className="text-gray-500">Manage job openings shown on the Careers page</p>
        </div>
        <button
          onClick={openNew}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FaPlus />
          Add Job
        </button>
      </div>

      {showForm && (
        <div className="admin-card mb-6 border-2 border-secondary">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <FaBriefcase className="text-secondary" />
            {editingJob ? "Edit Job Listing" : "Add New Job"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Job Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Program Manager"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Location <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Juba, South Sudan"
                  required
                />
              </div>
              <div>
                <label className="form-label">Job Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="form-input"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {typeLabel(t)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Application Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-input"
                  placeholder="hr@vido.org"
                />
              </div>
            </div>
            <div>
              <label className="form-label">
                Job Description <span className="required">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="form-input"
                rows={6}
                placeholder="Describe the role, responsibilities and requirements..."
                required
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary px-6 py-2">
                <FaSave className="mr-1" />
                {saving ? "Saving..." : editingJob ? "Update Job" : "Add Job"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
              >
                <FaTimes className="text-gray-400" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {dbDown && (
        <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
          <strong>Database not connected.</strong> This is demo data — editing and
          deleting are disabled. Add this server to{" "}
          <strong>MongoDB Atlas → Network Access (allow 0.0.0.0/0)</strong> and
          reload.
        </div>
      )}

      <div className="admin-card">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8">
            <FaBriefcase className="text-4xl text-gray-300 mb-4 block mx-auto" />
            <p className="text-gray-500">
              No job openings yet. Click "Add Job" to create one.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-secondary transition flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-primary text-lg">{job.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(job)}
                      disabled={String(job.id).startsWith("fb-")}
                      className="text-green-500 hover:text-green-700 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      disabled={String(job.id).startsWith("fb-")}
                      className="text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="mt-1 space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-secondary" />
                    {job.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-secondary" />
                    {typeLabel(job.type)}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-secondary" />
                    {job.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingJob(job);
                    setForm({
                      title: job.title,
                      location: job.location,
                      type: job.type,
                      email: job.email || "vido2024@gmail.com",
                      description: job.description,
                    });
                    setShowForm(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={String(job.id).startsWith("fb-")}
                  className="mt-3 text-left text-sm text-primary hover:text-secondary transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Edit details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
