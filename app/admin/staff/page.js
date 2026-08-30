"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { getRoleLabel } from "@/lib/roles";

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/staff");
      const data = await res.json();
      setStaff(data);
    } catch (error) {
      toast.error("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  const deleteStaff = async (id) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;

    try {
      const res = await fetch(`/api/staff/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Staff member deleted");
        fetchStaff();
      }
    } catch (error) {
      toast.error("Failed to delete staff");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Staff Management</h1>
        <Link
          href="/admin/staff/add"
          className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <FaPlus />
          Add Staff
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">Loading...</div>
        ) : staff.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No staff members added yet
          </div>
        ) : (
          staff.map((member) => (
            <div key={member.id} className="admin-card hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FaUser className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{member.name}</h3>
                    <p className="text-sm text-gray-500">{getRoleLabel(member.role)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/staff/edit/${member.id}`}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deleteStaff(member.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{member.email}</p>
              {member.bio && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{member.bio}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
