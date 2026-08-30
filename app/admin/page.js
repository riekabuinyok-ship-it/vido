"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaNewspaper, FaUsers, FaEye, FaHeart } from "react-icons/fa";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    posts: 0,
    staff: 0,
    views: 0,
    donations: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setStats(data.stats);
      setRecentPosts(data.recentPosts || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const statItems = [
    { icon: FaNewspaper, label: "Total Posts", value: stats.posts, color: "text-secondary" },
    { icon: FaUsers, label: "Staff Members", value: stats.staff, color: "text-blue-500" },
    { icon: FaEye, label: "Total Views", value: stats.views, color: "text-green-500" },
    { icon: FaHeart, label: "Donations", value: stats.donations, color: "text-red-500" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {session?.user?.name}!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {statItems.map((stat, index) => (
          <div key={index} className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </div>
              <div className={`text-3xl ${stat.color}`}>
                <stat.icon />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {recentPosts.length === 0 ? (
            <div className="admin-card text-center py-8 text-gray-500">
              No posts yet. Create your first post!
            </div>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="admin-card flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-primary">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()} •{" "}
                    {post.category || "Uncategorized"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    post.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
