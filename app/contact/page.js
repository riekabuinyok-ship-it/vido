"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/site-content";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaMapPin,
  FaArrowRight,
  FaBuilding,
  FaBus,
  FaParking,
  FaHeart,
  FaHandsHelping,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "@/components/ui/Icons";

const infoCards = [
  {
    icon: FaMapMarkerAlt,
    title: "Visit Us",
    lines: ["Hai Referendum, Juba", "South Sudan"],
  },
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    links: [
      { href: `tel:${site.phone.replace(/\s/g, "")}`, text: site.phone },
      { href: `tel:${site.phone2.replace(/\s/g, "")}`, text: site.phone2 },
    ],
  },
  {
    icon: FaEnvelope,
    title: "Email Us",
    links: [
      { href: `mailto:${site.email}`, text: site.email },
      { href: `mailto:${site.email2}`, text: site.email2 },
    ],
  },
  {
    icon: FaClock,
    title: "Office Hours",
    lines: [`Mon - Fri: ${site.office.monFri}`, `Sat: ${site.office.saturday}`],
  },
];

const subjects = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General Inquiry" },
  { value: "donation", label: "Donation Support" },
  { value: "volunteer", label: "Volunteering" },
  { value: "partnership", label: "Partnership" },
  { value: "programs", label: "Programs Information" },
  { value: "media", label: "Media / Press" },
  { value: "other", label: "Other" },
];

const socialLinks = [
  { icon: FaFacebookF, cls: "facebook", label: "Facebook" },
  { icon: FaTwitter, cls: "twitter", label: "Twitter" },
  { icon: FaInstagram, cls: "instagram", label: "Instagram" },
  { icon: FaYoutube, cls: "youtube", label: "YouTube" },
  { icon: FaLinkedinIn, cls: "linkedin", label: "LinkedIn" },
  { icon: FaWhatsapp, cls: "whatsapp", label: "WhatsApp" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name";
    if (!form.email.trim()) next.email = "Please enter a valid email";
    else if (!emailRegex.test(form.email.trim()))
      next.email = "Please enter a valid email";
    if (!form.subject) next.subject = "Please select a subject";
    if (!form.message.trim()) next.message = "Please enter your message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      // Simulate a short send; wire to /api/contact when added
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
      setForm({ fullName: "", email: "", subject: "", message: "" });
      toast.success("Message sent! We'll get back to you soon.");
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const addErrorClass = (field) =>
    `form-group${errors[field] ? " has-error" : ""}`;

  return (
    <>
      <Header />

      {/* ===== CONTACT HEADER ===== */}
      <section className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Reach out to us anytime and we'll get
            back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ===== CONTACT MAIN ===== */}
      <section className="contact-main">
        <div className="container">
          {/* Contact Info Cards */}
          <div className="contact-info-grid">
            {infoCards.map((card) => (
              <div key={card.title} className="contact-info-card">
                <div className="icon-wrapper">
                  <card.icon />
                </div>
                <h3>{card.title}</h3>
                <p>
                  {card.links ? (
                    card.links.map((l) => (
                      <span key={l.href}>
                        <a href={l.href}>{l.text}</a>
                        <br />
                      </span>
                    ))
                  ) : (
                    card.lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <p className="form-subtitle">We'll respond within 24 hours</p>

              {success && (
                <div className="form-success show">
                  <FaCheckCircle />
                  Your message has been sent successfully! We'll get back to you
                  soon.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={addErrorClass("fullName")}>
                    <label htmlFor="fullName">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="error-message">{errors.fullName}</div>
                    )}
                  </div>
                  <div className={addErrorClass("email")}>
                    <label htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className={addErrorClass("subject")}>
                  <label htmlFor="subject">
                    Subject <span className="required">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <div className="error-message">{errors.subject}</div>
                  )}
                </div>

                <div className={addErrorClass("message")}>
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <div className="error-message">{errors.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <FaSpinner className="fa-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div>
              <div className="map-wrapper">
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31892.925786638762!2d31.5804784!3d4.859367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1775a10000000001%3A0x5d336d9e5c5f5b2!2sJuba%2C%20South%20Sudan!5e0!3m2!1sen!2s!4v1700000000000"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="map-details">
                  <h3>
                    <FaMapPin style={{ color: "var(--secondary)" }} /> Our
                    Location
                  </h3>
                  <p>Hai Referendum, Juba - South Sudan</p>
                  <a
                    href="https://maps.google.com/maps?q=Juba+South+Sudan"
                    target="_blank"
                    rel="noreferrer"
                    className="directions-btn"
                  >
                    Get Directions <FaArrowRight />
                  </a>

                  <div className="office-hours">
                    <span className="day">Monday - Friday:</span>
                    <span className="time">8:00 AM - 5:00 PM</span>
                    <span className="day">Saturday:</span>
                    <span className="time">9:00 AM - 1:00 PM</span>
                    <span className="day">Sunday:</span>
                    <span className="time">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== FIND US SECTION ===== */}
          <div className="find-us">
            <h2>Find Us</h2>
            <p className="find-us-subtitle">
              Get detailed directions to our office
            </p>

            <div className="find-us-grid">
              <div className="find-us-item">
                <div className="icon">
                  <FaBuilding />
                </div>
                <div>
                  <h4>Office Address</h4>
                  <p>
                    Hai Referendum
                    <br />
                    Juba, South Sudan
                    <br />
                    <strong>Landmark:</strong> Near the main market
                  </p>
                </div>
              </div>
              <div className="find-us-item">
                <div className="icon">
                  <FaBus />
                </div>
                <div>
                  <h4>Public Transport</h4>
                  <p>
                    Take any bus heading to Hai Referendum.
                    <br />
                    Alight at the market stop and walk 200m towards the VIDO
                    office.
                    <br />
                    <strong>Note:</strong> Buses run from 6 AM - 8 PM
                  </p>
                </div>
              </div>
              <div className="find-us-item">
                <div className="icon">
                  <FaParking />
                </div>
                <div>
                  <h4>Parking & Access</h4>
                  <p>
                    Free parking available onsite.
                    <br />
                    The office is wheelchair accessible.
                    <br />
                    <strong>Security:</strong> 24/7 security on premises
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SOCIAL CONNECT ===== */}
          <div className="social-connect">
            <h2>Connect With Us</h2>
            <p>Follow us on social media for the latest updates and news</p>
            <div className="social-icons">
              {socialLinks.map((s) => (
                <a key={s.label} href="#" className={s.cls} aria-label={s.label}>
                  <s.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="cta-content">
            <h2>Want to Make a Difference?</h2>
            <p>
              Support our work in empowering youth and communities across South
              Sudan.
            </p>
            <div className="cta-buttons">
              <Link href="/donate" className="btn btn-primary">
                <FaHeart /> Donate Now
              </Link>
              <Link href="/programs" className="btn btn-outline">
                <FaHandsHelping /> Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
