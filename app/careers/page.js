"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaEnvelope,
  FaBriefcase,
  FaTimes,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaHeart,
  FaHandsHelping,
  FaGlobe,
  FaChartLine,
  FaHandshake,
} from "@/components/ui/Icons";

const whyCards = [
  {
    icon: FaGlobe,
    title: "Meaningful Work",
    text: "Every day, you'll contribute to empowering youth and building sustainable communities in South Sudan.",
  },
  {
    icon: FaChartLine,
    title: "Professional Growth",
    text: "We invest in our team through training, mentorship, and opportunities for career advancement.",
  },
  {
    icon: FaHandshake,
    title: "Impact-Driven Culture",
    text: "Join a passionate team committed to making a lasting difference in the lives of vulnerable communities.",
  },
];

const initialJobs = [
  {
    id: 1,
    title: "Program Manager",
    location: "Juba, South Sudan",
    type: "full-time",
    date: "Mar 15, 2026",
    email: "vido2024@gmail.com",
    description:
      "<p>We are looking for an experienced Program Manager to oversee our youth empowerment programs in South Sudan.</p><h4>Key Responsibilities:</h4><ul><li>Lead program planning and implementation</li><li>Manage program budgets and resources</li><li>Coordinate with stakeholders and partners</li><li>Monitor and evaluate program impact</li></ul><h4>Requirements:</h4><ul><li>5+ years of experience in program management</li><li>Experience working in South Sudan or similar context</li><li>Strong leadership and communication skills</li><li>Bachelor's degree in relevant field</li></ul>",
  },
  {
    id: 2,
    title: "Field Officer",
    location: "Ruweng, South Sudan",
    type: "full-time",
    date: "Mar 12, 2026",
    email: "vido2024@gmail.com",
    description:
      "<p>We are seeking a dedicated Field Officer to implement our community programs in Ruweng.</p><h4>Key Responsibilities:</h4><ul><li>Implement program activities in the field</li><li>Engage with community members and stakeholders</li><li>Monitor program progress and report</li><li>Coordinate with local partners</li></ul><h4>Requirements:</h4><ul><li>3+ years of field experience</li><li>Knowledge of South Sudan context</li><li>Strong community engagement skills</li><li>Bachelor's degree in relevant field</li></ul>",
  },
  {
    id: 3,
    title: "Communications Officer",
    location: "Juba, South Sudan",
    type: "part-time",
    date: "Mar 10, 2026",
    email: "vido2024@gmail.com",
    description:
      "<p>We are looking for a Communications Officer to manage our media and communications activities.</p><h4>Key Responsibilities:</h4><ul><li>Manage social media platforms</li><li>Create content for website and newsletters</li><li>Design communication materials</li><li>Media engagement and press releases</li></ul><h4>Requirements:</h4><ul><li>2+ years of communications experience</li><li>Strong writing and editing skills</li><li>Experience with social media management</li><li>Bachelor's degree in Communications or related</li></ul>",
  },
];

const typeLabel = (type) => type.charAt(0).toUpperCase() + type.slice(1);

export default function CareersPage() {
  const [jobs, setJobs] = useState(initialJobs);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setJobs(data);
      })
      .catch(() => {});
  }, []);

  const [selectedJob, setSelectedJob] = useState(null);

  const [applyPosition, setApplyPosition] = useState("");
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    cover: "",
  });
  const [applyErrors, setApplyErrors] = useState({});
  const [applyFile, setApplyFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const applySectionRef = useRef(null);

  const positions = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.title))),
    [jobs]
  );

  const disabledModalScroll = (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  };

  const openDetails = (job) => {
    setSelectedJob(job);
    disabledModalScroll(true);
  };

  const closeDetails = () => {
    setSelectedJob(null);
    disabledModalScroll(false);
  };

  const openApplyForm = (position) => {
    setApplyPosition(position);
    if (applySectionRef.current) {
      applySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeModalAndApply = () => {
    const title = selectedJob?.title || "";
    closeDetails();
    setTimeout(() => openApplyForm(title), 250);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateApply = () => {
    const next = {};
    if (!applyForm.name.trim()) next.name = "Please enter your full name";
    if (!applyForm.email.trim()) next.email = "Please enter a valid email";
    else if (!emailRegex.test(applyForm.email.trim()))
      next.email = "Please enter a valid email";
    if (!applyForm.phone.trim()) next.phone = "Please enter your phone number";
    if (!applyPosition) next.position = "Please select a position";
    if (!applyForm.cover.trim()) next.cover = "Please write a cover letter";
    if (!applyFile) next.resume = "Please upload your resume";
    setApplyErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!validateApply()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSending(true);
    try {
      const job = jobs.find((j) => j.title === applyPosition);
      const jobEmail = job ? job.email : "vido2024@gmail.com";

      // Simulate sending; wire to a server endpoint (e.g. /api/apply) when added
      await new Promise((r) => setTimeout(r, 1500));

      console.log("Application sent to:", jobEmail, {
        name: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone,
        position: applyPosition,
        cover: applyForm.cover,
        resume: applyFile?.name,
      });

      setApplySuccess(true);
      setApplyForm({ name: "", email: "", phone: "", cover: "" });
      setApplyFile(null);
      setApplyPosition("");
      e.target.reset();
      toast.success("Application sent! We'll review it and get back to you soon.");
      setTimeout(() => setApplySuccess(false), 6000);
    } catch {
      toast.error("Failed to send application.");
    } finally {
      setSending(false);
    }
  };

  const applyErrorClass = (field) =>
    `form-group${applyErrors[field] ? " has-error" : ""}`;

  return (
    <>
      <Header />

      {/* ===== CAREERS HEADER ===== */}
      <section className="careers-header">
        <div className="container">
          <h1>Careers at VIDO</h1>
          <p>
            Join our team and make a difference in the lives of youth and
            communities across South Sudan
          </p>
        </div>
      </section>

      {/* ===== WHY WORK WITH US ===== */}
      <section className="why-work">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Work With Us?</h2>
            <p className="section-subtitle">
              Be part of a team that&apos;s creating real change
            </p>
          </div>
          <div className="why-grid">
            {whyCards.map((card) => (
              <div className="why-card" key={card.title}>
                <div className="why-icon">
                  <card.icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOB LISTINGS ===== */}
      <section className="job-listings">
        <div className="container">
          <div className="job-listings-header">
            <h2>Current Openings</h2>
          </div>

          {jobs.length === 0 ? (
            <div className="no-jobs">
              <FaBriefcase style={{ fontSize: 48, color: "var(--gray-400)" }} />
              <h3>No Jobs Available</h3>
              <p>Check back later for new opportunities.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span className="job-meta-item">
                      <FaMapMarkerAlt /> {job.location}
                    </span>
                    <span className={`job-type ${job.type}`}>
                      <FaClock /> {typeLabel(job.type)}
                    </span>
                    <span className="job-meta-item">
                      <FaCalendarAlt /> Posted: {job.date}
                    </span>
                    <span className="job-meta-item">
                      <FaEnvelope /> {job.email}
                    </span>
                  </div>
                </div>
                <div className="job-actions">
                  <button
                    className="btn-apply"
                    onClick={() => openApplyForm(job.title)}
                  >
                    Apply Now
                  </button>
                  <button className="btn-details" onClick={() => openDetails(job)}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section className="application-form-section" ref={applySectionRef}>
        <div className="container">
          <div className="application-form-wrapper">
            <h2>Apply for a Position</h2>
            <p className="form-subtitle">
              Fill out the form below and we&apos;ll get back to you soon
            </p>

            {applySuccess && (
              <div className="form-success show">
                <FaCheckCircle />
                Your application has been sent successfully! We&apos;ll review it
                and get back to you soon.
              </div>
            )}

            <form onSubmit={handleApplySubmit} noValidate>
              <div className="form-row">
                <div className={applyErrorClass("name")}>
                  <label>
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={applyForm.name}
                    onChange={(e) =>
                      setApplyForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Enter your full name"
                  />
                  {applyErrors.name && (
                    <div className="error-message">{applyErrors.name}</div>
                  )}
                </div>
                <div className={applyErrorClass("email")}>
                  <label>
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    value={applyForm.email}
                    onChange={(e) =>
                      setApplyForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="Enter your email"
                  />
                  {applyErrors.email && (
                    <div className="error-message">{applyErrors.email}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className={applyErrorClass("phone")}>
                  <label>
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    value={applyForm.phone}
                    onChange={(e) =>
                      setApplyForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+211 900 000 000"
                  />
                  {applyErrors.phone && (
                    <div className="error-message">{applyErrors.phone}</div>
                  )}
                </div>
                <div className={applyErrorClass("position")}>
                  <label>
                    Position Applying For <span className="required">*</span>
                  </label>
                  <select
                    value={applyPosition}
                    onChange={(e) => setApplyPosition(e.target.value)}
                  >
                    <option value="">Select a position</option>
                    {positions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {applyErrors.position && (
                    <div className="error-message">{applyErrors.position}</div>
                  )}
                </div>
              </div>

              <div className={applyErrorClass("cover")}>
                <label>
                  Cover Letter <span className="required">*</span>
                </label>
                <textarea
                  value={applyForm.cover}
                  onChange={(e) =>
                    setApplyForm((f) => ({ ...f, cover: e.target.value }))
                  }
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                />
                {applyErrors.cover && (
                  <div className="error-message">{applyErrors.cover}</div>
                )}
              </div>

              <div className={applyErrorClass("resume")}>
                <label>
                  Upload Resume/CV <span className="required">*</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setApplyFile(e.target.files[0] || null)}
                />
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 4 }}>
                  Accepted: PDF, DOC, DOCX (Max 5MB)
                </p>
                {applyErrors.resume && (
                  <div className="error-message">{applyErrors.resume}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn-submit-application"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <FaSpinner className="fa-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== JOB DETAIL MODAL ===== */}
      {selectedJob && (
        <div className="job-modal active" onClick={closeDetails}>
          <div className="job-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="job-modal-close" onClick={closeDetails} aria-label="Close">
              <FaTimes />
            </button>
            <h2>{selectedJob.title}</h2>
            <div className="modal-meta">
              <span>
                <FaMapMarkerAlt /> {selectedJob.location}
              </span>
              <span>
                <FaClock /> {typeLabel(selectedJob.type)}
              </span>
              <span>
                <FaCalendarAlt /> {selectedJob.date}
              </span>
            </div>
            <div
              className="modal-description"
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />
            <div className="modal-actions">
              <button
                className="btn-apply"
                onClick={closeModalAndApply}
                style={{ padding: "12px 32px" }}
              >
                <FaPaperPlane /> Apply Now
              </button>
              <button className="btn btn-secondary" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
