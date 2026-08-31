"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { logoMain } from "@/lib/site-content";
import { FaHeart, FaUser } from "@/components/ui/Icons";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <nav className="navbar">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <img src={logoMain} alt="VIDO logo" />
            </div>
          </Link>

          <ul
            className={`nav-menu${isOpen ? " active" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              {session ? (
                <Link href="/admin" className="btn-login-nav" onClick={() => setIsOpen(false)}>
                  <FaUser className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <Link href="/admin/login" className="btn-login-nav" onClick={() => setIsOpen(false)}>
                  <FaUser className="w-4 h-4" />
                  Login
                </Link>
              )}
            </li>
            <li>
              <Link
                href="/donate"
                className="btn-donate-nav"
                onClick={() => setIsOpen(false)}
              >
                <FaHeart className="w-4 h-4" />
                Donate Now
              </Link>
            </li>
          </ul>

          <Link
            href="/donate"
            className="btn-donate-mobile"
            onClick={() => setIsOpen(false)}
          >
            <FaHeart className="w-4 h-4" />
            Donate
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? "\u00d7" : "\u2630"}
          </button>
        </nav>

        {isOpen && (
          <div
            className="nav-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}
