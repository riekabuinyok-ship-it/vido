"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, logoFooter } from "@/lib/site-content";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaMusic,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "@/components/ui/Icons";

const platformIcons = {
  linkedin: { Icon: FaLinkedinIn, label: "LinkedIn" },
  whatsapp: { Icon: FaWhatsapp, label: "WhatsApp" },
  facebook: { Icon: FaFacebookF, label: "Facebook" },
  twitter: { Icon: FaTwitter, label: "X (Twitter)" },
  youtube: { Icon: FaYoutube, label: "YouTube" },
  tiktok: { Icon: FaMusic, label: "TikTok" },
  instagram: { Icon: FaInstagram, label: "Instagram" },
};

const fallbackSocials = [
  { id: "facebook", url: "#", Icon: FaFacebookF, label: "Facebook" },
  { id: "twitter", url: "#", Icon: FaTwitter, label: "Twitter" },
  { id: "instagram", url: "#", Icon: FaInstagram, label: "Instagram" },
  { id: "youtube", url: "#", Icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState(null);

  useEffect(() => {
    fetch("/api/social")
      .then((res) => res.json())
      .then((data) => data?.links && setSocialLinks(data.links))
      .catch(() => {});
  }, []);

  const activeSocials = socialLinks
    ? Object.entries(socialLinks)
        .filter(([, v]) => v && v.active && v.url)
        .map(([id, v]) => ({
          id,
          url: v.url,
          Icon: platformIcons[id]?.Icon,
          label: platformIcons[id]?.label || id,
        }))
        .filter((s) => s.Icon)
    : [];

  const socials = activeSocials.length ? activeSocials : fallbackSocials;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About VIDO */}
          <div className="footer-about">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <img src={logoFooter} alt={site.name} />
              </div>
            </div>
            <p>
              {site.fullName} works for youth development in South Sudan and
              Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/programs">Programs</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3>Contact</h3>
            <ul className="footer-contact">
              <li>
                <span className="icon"><FaMapMarkerAlt /></span>
                {site.address}
              </li>
              <li>
                <span className="icon"><FaPhoneAlt /></span>
                {site.phone}
              </li>
              <li>
                <span className="icon"><FaEnvelope /></span>
                {site.email}
              </li>
            </ul>
          </div>

          {/* Subscribe + Social */}
          <div>
            <h3>Subscribe</h3>
            <p className="footer-subscribe-text">
              Get the latest updates from {site.name}
            </p>
            <form className="footer-newsletter" action="#">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">
                <FaPaperPlane />
              </button>
            </form>
            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="social-links">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <s.Icon />
                  </a>
                ))}
              </div>
              <a href="tel:0924440899" className="footer-credit">
                Developed By <strong>Juba Tech</strong>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.fullName} ({site.name}). All
            rights reserved.
          </p>
          <p className="footer-tagline">
            <span className="arabic">منظمة صوت الشباب للتنمية</span>
            <span className="separator">|</span>
            <span>An Agent for Development</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
