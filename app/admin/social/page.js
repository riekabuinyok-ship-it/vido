"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaSave,
} from "react-icons/fa";

const defaultLinks = {
  linkedin: { url: "", active: false },
  whatsapp: { url: "", active: false },
  facebook: { url: "", active: false },
  twitter: { url: "", active: false },
  youtube: { url: "", active: false },
  tiktok: { url: "", active: false },
  instagram: { url: "", active: false },
};

const socialPlatforms = [
  { id: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn, color: "#0A66C2", placeholder: "https://linkedin.com/company/yourpage" },
  { id: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp, color: "#25D366", placeholder: "https://wa.me/yourphonenumber" },
  { id: "facebook", label: "Facebook", Icon: FaFacebookF, color: "#1877F2", placeholder: "https://facebook.com/yourpage" },
  { id: "twitter", label: "X (Twitter)", Icon: FaTwitter, color: "#000000", placeholder: "https://twitter.com/yourhandle" },
  { id: "youtube", label: "YouTube", Icon: FaYoutube, color: "#FF0000", placeholder: "https://youtube.com/@yourchannel" },
  { id: "tiktok", label: "TikTok", Icon: FaTiktok, color: "#000000", placeholder: "https://tiktok.com/@yourusername" },
  { id: "instagram", label: "Instagram", Icon: FaInstagram, color: "#E4405F", placeholder: "https://instagram.com/yourusername" },
];

export default function SocialLinksManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [socialLinks, setSocialLinks] = useState(defaultLinks);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }
    fetchSocialLinks();
  }, [status, router]);

  const fetchSocialLinks = async () => {
    try {
      const res = await fetch("/api/social");
      const data = await res.json();
      if (data && data.links) {
        setSocialLinks((prev) => ({ ...prev, ...data.links }));
      }
    } catch (error) {
      toast.error("Failed to load social links");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links: socialLinks }),
      });
      if (res.ok) {
        toast.success("Social links saved successfully!");
      } else {
        throw new Error("Failed to save social links");
      }
    } catch (error) {
      toast.error("Failed to save social links");
    } finally {
      setSaving(false);
    }
  };

  const updateSocialLink = (id, field, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const toggleActive = (id) => {
    setSocialLinks((prev) => ({
      ...prev,
      [id]: { ...prev[id], active: !prev[id].active },
    }));
  };

  const activeCount = socialPlatforms.filter(
    (p) => socialLinks[p.id]?.active && socialLinks[p.id]?.url
  ).length;

  if (status === "loading" || loading) {
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
          <h1 className="text-2xl font-bold text-primary">Social Links</h1>
          <p className="text-gray-500">Configure social media links displayed on the website</p>
        </div>
        <button
          type="submit"
          form="socialForm"
          disabled={saving}
          className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <FaSave />
              Save Changes
            </>
          )}
        </button>
      </div>

      <form id="socialForm" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialPlatforms.map((platform) => {
            const link = socialLinks[platform.id] || { url: "", active: false };
            return (
              <div key={platform.id} className="admin-card border-2 transition hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: platform.color }}
                    >
                      <platform.Icon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary text-sm">{platform.label}</h4>
                      <span className={`text-xs ${link.active ? "text-green-500" : "text-gray-400"}`}>
                        {link.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={link.active}
                      onChange={() => toggleActive(platform.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">URL</label>
                  <input
                    type="url"
                    value={link.url || ""}
                    onChange={(e) => updateSocialLink(platform.id, "url", e.target.value)}
                    placeholder={platform.placeholder}
                    className="form-input text-sm"
                    disabled={!link.active}
                  />
                  {!link.active && (
                    <p className="text-xs text-gray-400 mt-1">Enable to configure URL</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </form>

      <div className="mt-8 admin-card border-2 border-secondary">
        <h3 className="text-lg font-bold text-primary mb-4">Preview</h3>
        <p className="text-sm text-gray-500 mb-4">
          Only active social links will appear on the website ({activeCount} active)
        </p>
        <div className="flex flex-wrap gap-3">
          {socialPlatforms.map((platform) => {
            const link = socialLinks[platform.id];
            if (link.active && link.url) {
              return (
                <a
                  key={platform.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: platform.color }}
                >
                  <platform.Icon />
                </a>
              );
            }
            return null;
          })}
          {activeCount === 0 && (
            <p className="text-gray-400 text-sm">No active social links configured</p>
          )}
        </div>
      </div>
    </div>
  );
}
