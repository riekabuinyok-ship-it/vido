"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { logoFooter } from "@/lib/site-content";
import {
  FaHome,
  FaNewspaper,
  FaUsers,
  FaPlus,
  FaCog,
  FaSignOutAlt,
  FaDonate,
  FaHandshake,
  FaBriefcase,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: FaHome },
  { name: "All Posts", href: "/admin/posts", icon: FaNewspaper },
  { name: "New Post", href: "/admin/posts/new", icon: FaPlus },
  { name: "Staff", href: "/admin/staff", icon: FaUsers },
  { name: "Donations", href: "/admin/donations", icon: FaDonate },
  { name: "Jobs", href: "/admin/jobs", icon: FaBriefcase },
  { name: "Partners", href: "/admin/partners", icon: FaHandshake },
  { name: "Settings", href: "/admin/settings", icon: FaCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-white shadow-xl">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <img src={logoFooter} alt="VIDO logo" className="w-12 h-12 object-contain" />
          <div>
            <span className="font-bold text-lg block">VIDO Admin</span>
            <span className="text-xs text-white/50">Dashboard</span>
          </div>
        </Link>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-secondary text-primary"
                  : "text-white/70 hover:bg-primary-light hover:text-white"
              }`}
            >
              <item.icon />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-400 hover:bg-red-500/10 w-full mt-4"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
