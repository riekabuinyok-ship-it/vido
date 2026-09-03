"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaUsers,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaClock,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const emptyForm = {
  name: "",
  role: "",
  capacity: "",
  education: "",
  experience: "",
  bio: "",
  photo: null,
  photoPreview: "",
};

export default function TeamManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }
    fetchMembers();
  }, [status, router]);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    body.append("name", formData.name);
    body.append("role", formData.role);
    body.append("capacity", formData.capacity);
    body.append("education", formData.education);
    body.append("experience", formData.experience);
    body.append("bio", formData.bio || "");
    if (formData.photo) body.append("photo", formData.photo);

    try {
      const url = editingMember ? `/api/team/${editingMember.id}` : "/api/team";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, { method, body });
      if (res.ok) {
        toast.success(editingMember ? "Team member updated!" : "Team member added!");
        resetForm();
        fetchMembers();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to save team member");
      }
    } catch (error) {
      toast.error("Failed to save team member");
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Team member deleted");
        fetchMembers();
      }
    } catch (error) {
      toast.error("Failed to delete team member");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: file, photoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const editMember = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      capacity: member.capacity || "",
      education: member.education || "",
      experience: member.experience || "",
      bio: member.bio || "",
      photo: null,
      photoPreview: member.photo || "",
    });
    setShowForm(true);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Team Members</h1>
          <p className="text-gray-500">Manage team members displayed on the site</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingMember(null);
            setFormData(emptyForm);
          }}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FaPlus />
          Add Team Member
        </button>
      </div>

      {showForm && (
        <div className="admin-card mb-6 border-2 border-secondary">
          <h3 className="text-lg font-bold text-primary mb-4">
            {editingMember ? "Edit Team Member" : "Add New Team Member"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="e.g., John Deng"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Role/Position <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Executive Director"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Capacity <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Project Management, Community Development"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Education <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="form-input"
                  placeholder="e.g., MSc in Social Work"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Years of Experience <span className="required">*</span>
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="form-input"
                  placeholder="e.g., 5"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="form-label">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-input"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 400x400px PNG or JPG
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="form-input"
                rows="3"
                placeholder="Brief description about the team member..."
              />
            </div>

            {formData.photoPreview && (
              <div className="mt-4">
                <label className="form-label">Photo Preview</label>
                <img
                  src={formData.photoPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button type="submit" disabled={loading} className="btn-primary px-6 py-2">
                {loading ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading && !showForm ? (
          <div className="text-center py-8 text-gray-500">Loading team members...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-8">
            <FaUsers className="text-4xl text-gray-300 mb-4 block mx-auto" />
            <p className="text-gray-500">
              No team members added yet. Click "Add Team Member" to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-secondary transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl flex-shrink-0 overflow-hidden">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-primary">{member.name}</h4>
                    <p className="text-sm text-secondary font-medium">{member.role}</p>
                    {member.capacity && (
                      <p className="text-xs text-gray-500 mt-1">
                        <FaBriefcase className="mr-1 inline" /> {member.capacity}
                      </p>
                    )}
                    {member.education && (
                      <p className="text-xs text-gray-500">
                        <FaGraduationCap className="mr-1 inline" /> {member.education}
                      </p>
                    )}
                    {member.experience && (
                      <p className="text-xs text-gray-500">
                        <FaClock className="mr-1 inline" /> {member.experience} years experience
                      </p>
                    )}
                  </div>
                </div>
                {member.bio && (
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">{member.bio}</p>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => editMember(member)}
                    className="text-green-500 hover:text-green-700 text-sm"
                  >
                    <FaEdit className="mr-1 inline" /> Edit
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    <FaTrash className="mr-1 inline" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
