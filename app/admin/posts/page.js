"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

export default function PostsManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Post deleted successfully");
        fetchPosts();
      }
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">All Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FaPlus />
          New Post
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Author</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">Loading...</td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">No posts found</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{post.title}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                      {post.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{post.author?.name || "Unknown"}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/admin/posts/edit/${post.id}`}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
