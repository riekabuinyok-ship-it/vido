"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max size is 5MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="form-label">{label}</label>

      {value ? (
        <div className="upload-preview">
          <img src={value} alt="preview" />
          <button
            type="button"
            className="upload-remove"
            onClick={() => onChange("")}
            aria-label="Remove image"
          >
            <FaTimes />
          </button>
          <div className="upload-actions">
            <button
              type="button"
              className="upload-replace"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Replace image"}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="upload-dropzone"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <FaCloudUploadAlt />
          <span>{uploading ? "Uploading..." : "Click to upload from device"}</span>
          <small>JPG, PNG, WebP or GIF · max 5MB</small>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      {uploading && <div className="upload-progress">Uploading…</div>}

      {/* Only offer paste-a-URL as an alternative when no image is set yet */}
      {!value && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-input"
          style={{ marginTop: 12 }}
          placeholder="…or paste an image URL"
        />
      )}
    </div>
  );
}
