import Link from "next/link";
import { site, logoFooter } from "@/lib/site-content";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "@/components/ui/Icons";

export default function Footer() {
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
                <a href="#" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
              <a
                href="tel:0924440899"
                className="footer-credit"
              >
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
