"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaHandshake,
} from "react-icons/fa";

export default function PartnersManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    website: "",
    logo: null,
    logoPreview: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }
    fetchPartners();
  }, [status, router]);

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (error) {
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("website", formData.website);
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    try {
      const url = editingPartner
        ? `/api/partners/${editingPartner.id}`
        : "/api/partners";
      const method = editingPartner ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (res.ok) {
        toast.success(editingPartner ? "Partner updated!" : "Partner added!");
        setShowForm(false);
        setEditingPartner(null);
        setFormData({ name: "", type: "", website: "", logo: null, logoPreview: "" });
        fetchPartners();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to save partner");
      }
    } catch (error) {
      toast.error("Failed to save partner");
    } finally {
      setLoading(false);
    }
  };

  const deletePartner = async (id) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;

    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Partner deleted");
        fetchPartners();
      }
    } catch (error) {
      toast.error("Failed to delete partner");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: file,
          logoPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const editPartner = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      type: partner.type || "",
      website: partner.website || "",
      logo: null,
      logoPreview: partner.logo || "",
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
          <h1 className="text-2xl font-bold text-primary">Partners</h1>
          <p className="text-gray-500">Manage partner logos displayed on the homepage</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingPartner(null);
            setFormData({ name: "", type: "", website: "", logo: null, logoPreview: "" });
          }}
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FaPlus />
          Add Partner
        </button>
      </div>

      {showForm && (
        <div className="admin-card mb-6 border-2 border-secondary">
          <h3 className="text-lg font-bold text-primary mb-4">
            {editingPartner ? "Edit Partner" : "Add New Partner"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Partner Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="e.g., UNICEF"
                  required
                />
              </div>
              <div>
                <label className="form-label">Partner Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="form-input"
                >
                  <option value="">Select type</option>
                  <option value="UN Agency">UN Agency</option>
                  <option value="NGO">NGO</option>
                  <option value="Government">Government</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="form-input"
                  placeholder="https://www.example.org"
                />
              </div>
              <div>
                <label className="form-label">Partner Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-input"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 200x150px PNG with transparency
                </p>
              </div>
            </div>

            {formData.logoPreview && (
              <div className="mt-4">
                <label className="form-label">Logo Preview</label>
                <div className="partner-preview">
                  <img src={formData.logoPreview} alt="Partner logo preview" />
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-2"
              >
                {loading ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPartner(null);
                  setFormData({ name: "", type: "", website: "", logo: null, logoPreview: "" });
                }}
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
          <div className="text-center py-8 text-gray-500">Loading partners...</div>
        ) : partners.length === 0 ? (
          <div className="text-center py-8">
            <FaHandshake className="text-4xl text-gray-300 mb-4 block mx-auto" />
            <p className="text-gray-500">
              No partners added yet. Click "Add Partner" to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-secondary transition"
              >
                <div className="flex flex-col items-center">
                  <div className="w-full h-16 flex items-center justify-center mb-2">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-14 max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-14 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-2xl">
                        <FaBuilding />
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-sm text-center text-primary">
                    {partner.name}
                  </p>
                  {partner.type && (
                    <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full mt-1">
                      {partner.type}
                    </span>
                  )}
                  <div className="flex gap-2 mt-3">
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        aria-label="Visit website"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    <button
                      onClick={() => editPartner(partner)}
                      className="text-green-500 hover:text-green-700"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deletePartner(partner.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
