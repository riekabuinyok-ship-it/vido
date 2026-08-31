"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUploader from "@/components/admin/ImageUploader";

export default function PostEditor({ post }) {
  const router = useRouter();
  const isEdit = Boolean(post?.id);
  const {
    title = "",
    excerpt = "",
    content = "",
    featuredImage = "",
    category = "",
    status = "draft",
  } = post || {};
  const [form, setForm] = useState({
    title,
    excerpt,
    content,
    featuredImage,
    category,
    status,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit ? `/api/posts/${post.id}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save post");
      toast.success(isEdit ? "Post updated!" : "Post created!");
      router.push("/admin/posts");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-group">
        <label className="field-label">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="admin-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="field-label">Excerpt</label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="admin-input"
          rows={3}
        />
      </div>
      <div className="form-group">
        <label className="field-label">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="admin-input"
          rows={12}
          required
        />
      </div>
      <div className="form-group">
        <label className="field-label">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="admin-input"
        />
      </div>
      <div className="form-group">
        <ImageUploader
          label="Featured Image (thumbnail)"
          value={form.featuredImage}
          onChange={(url) => setForm((prev) => ({ ...prev, featuredImage: url }))}
        />
      </div>
      <div className="form-group">
        <label className="field-label">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="admin-input"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
