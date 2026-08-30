import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dbConnect from "@/lib/db";
import Staff from "@/models/Staff";
import { aboutImage } from "@/lib/site-content";
import {
  FaMapMarkerAlt,
  FaGlobeAfrica,
  FaUsers,
  FaHandHoldingHeart,
  FaUserCircle,
  FaLinkedinIn,
  FaTwitter,
  FaCertificate,
  FaBuilding,
  FaHandshake,
  FaEnvelope,
  FaHeart,
  FaEye,
  FaStar,
  FaBullseye,
  FaGem,
  FaComments,
  FaLock,
  FaTrophy,
} from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

const highlights = [
  { icon: FaMapMarkerAlt, text: "Based in Juba, South Sudan" },
  { icon: FaGlobeAfrica, text: "Working Across Africa" },
  { icon: FaUsers, text: "Focus on Vulnerable Communities" },
  { icon: FaHandHoldingHeart, text: "Nonprofit & Independent" },
];

const mvCards = [
  {
    icon: FaBullseye,
    title: "Our Mission",
    desc: "Build our communities through educating communities to help themselves create a better world where they feel self-fulfillment as individuals and groups, and play a constructive role in society.",
  },
  {
    icon: FaEye,
    title: "Our Vision",
    desc: "An enabling constructive environment for our target groups through effective contributions to community sustainable development and the realization of both social and economic freedoms.",
  },
  {
    icon: FaStar,
    title: "Core Values",
    desc: "Outspokenness, Compassion, Integrity, Transparency, and Competence guide everything we do as we work to empower communities across South Sudan.",
  },
  {
    icon: FaGem,
    title: "Our Goal",
    desc: "Contribute to improving the living standards of vulnerable communities through community mobilization, capacity building, advocacy, and strengthening institutions at the grass root level.",
  },
];

const coreValues = [
  { icon: FaComments, title: "Outspokenness", desc: "Speaking up for the voiceless and advocating for change" },
  { icon: FaHeart, title: "Compassion", desc: "Showing empathy and care for those we serve" },
  { icon: FaLock, title: "Integrity", desc: "Acting with honesty and moral principles" },
  { icon: FaEye, title: "Transparency", desc: "Being open and accountable in all our actions" },
  { icon: FaTrophy, title: "Competence", desc: "Delivering excellence through expertise and skill" },
];

const principles = [
  { letter: "T", title: "TRUE", desc: "Ensuring transparency at all levels of our work" },
  { letter: "P", title: "PROFICIENCY", desc: "Providing creative expertise and strong commitment" },
  { letter: "S", title: "SOLIDARITY", desc: "Within our NGO and with the people we aim to support" },
  { letter: "J", title: "JUSTICE", desc: "Within our NGO as well as in society" },
  { letter: "I", title: "INTEGRITY", desc: "To act according to the values we wish to promote" },
  { letter: "F", title: "FLEXIBILITY", desc: "Showing our willingness to change and learn" },
];

const certificates = [
  {
    icon: FaCertificate,
    title: "Registration Certificate",
    desc: "Registered as an independent NGO in South Sudan",
    badge: "Verified",
  },
  {
    icon: FaBuilding,
    title: "Operating License",
    desc: "Authorized to operate in all states of South Sudan",
    badge: "Active",
  },
  {
    icon: FaHandshake,
    title: "Partnership Recognition",
    desc: "Recognized by UN agencies and government bodies",
    badge: "Accredited",
  },
];

const fallbackTeam = [
  {
    name: "John Deng",
    role: "Executive Director",
    bio: "Leading VIDO's strategic direction and overall operations",
  },
  {
    name: "Sarah Konyi",
    role: "Programs Director",
    bio: "Overseeing all thematic programs and project implementation",
  },
  {
    name: "Peter Malual",
    role: "Finance Manager",
    bio: "Managing financial resources and ensuring accountability",
  },
  {
    name: "Mary Akol",
    role: "Community Engagement Lead",
    bio: "Building relationships with communities and stakeholders",
  },
];

export default async function AboutPage() {
  let team = [];
  try {
    await dbConnect();
    const staff = await Staff.find({}).sort({ order: 1 }).lean();
    team = staff.map((s) => ({
      name: s.name,
      role: s.role,
      bio: s.bio,
      photo: s.photo,
    }));
  } catch {
    team = [];
  }
  const teamMembers = team.length > 0 ? team : fallbackTeam;

  return (
    <>
      <Header />

      {/* ===== ABOUT HEADER ===== */}
      <section className="about-header">
        <div className="container">
          <h1>About VIDO</h1>
          <p>Empowering Youth for Sustainable Development in South Sudan and Africa</p>
          <span className="motto">An Agent for Development</span>
        </div>
      </section>

      {/* ===== ABOUT MAIN ===== */}
      <section className="about-main">
        <div className="container">
          {/* ===== WHO WE ARE ===== */}
          <div className="who-we-are">
            <div className="grid-2">
              <div>
                <h2>Who We Are</h2>
                <div className="about-text">
                  <p>
                    <strong>Voice of Youth Development Organization (VIDO)</strong>{" "}
                    is a registered independent non-governmental and nonprofit
                    organization based in Juba, the capital of the Republic of
                    South Sudan.
                  </p>
                  <p>
                    Our main operational office is in Ruweng Administrative Area
                    (Panrieng), with an aim to extend to other states within
                    South Sudan and to other African countries. We work primarily
                    for the poorest of the poor in rural areas, focusing on
                    youth, children (orphans), women (widows), and men living in
                    miserable conditions.
                  </p>
                  <p>
                    Beyond rural communities, we also focus on urban populations
                    living in slums and low-income areas. Our targeted groups
                    include health workers, paramedics, teachers, students,
                    environmentalists, and stakeholders in health, education,
                    and environmental fields.
                  </p>
                </div>
                <div className="about-highlights">
                  {highlights.map((h) => (
                    <div key={h.text} className="highlight-item">
                      <h.icon />
                      <span>{h.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-image">
                <div className="image-placeholder" style={{ backgroundImage: `url(${aboutImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <span style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", fontWeight: 600, opacity: 0.85 }}>
                    An Agent for Development
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== MISSION, VISION, VALUES, GOAL ===== */}
          <div className="mv-grid">
            {mvCards.map((card) => (
              <div key={card.title} className="mv-card">
                  <div className="mv-icon"><card.icon /></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* ===== CORE VALUES ===== */}
          <div className="core-values-section">
            <h2>Our Core Values</h2>
            <p className="section-sub">
              The principles that define who we are and how we work
            </p>
            <div className="core-values-grid">
              {coreValues.map((v) => (
                <div key={v.title} className="core-value-item">
                  <div className="cv-icon"><v.icon /></div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== GUIDING PRINCIPLES ===== */}
          <div className="principles-section">
            <h2>Our Guiding Principles</h2>
            <p className="section-sub">
              The foundation of our organizational culture and approach
            </p>
            <div className="principles-grid">
              {principles.map((p) => (
                <div key={p.title} className="principle-item">
                  <span className="principle-letter">{p.letter}</span>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== OUR TEAM ===== */}
          <div className="team-section">
            <h2>Our Team</h2>
            <p className="section-sub">
              Meet the dedicated individuals driving our mission forward
            </p>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.name} className="team-member">
                  <div className="member-avatar">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} />
                    ) : (
                      <FaUserCircle />
                    )}
                  </div>
                  <h4>{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  {member.bio && <p className="member-bio">{member.bio}</p>}
                  <div className="member-social">
                    <a href="#" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </a>
                    <a href="#" aria-label="Twitter">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== LEGAL & CERTIFICATES ===== */}
          <div className="certificates-section">
            <h2>Legal & Certificates</h2>
            <p className="section-sub">
              VIDO is a legally registered organization in the Republic of South
              Sudan
            </p>
            <div className="certificates-grid">
              {certificates.map((cert) => (
                <div key={cert.title} className="certificate-item">
                  <div className="cert-icon">
                    <cert.icon />
                  </div>
                  <h4>{cert.title}</h4>
                  <p>{cert.desc}</p>
                  <span className="cert-badge">{cert.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Us in Making a Difference</h2>
            <p>
              Together we can empower youth and build sustainable communities in
              South Sudan.
            </p>
            <div className="cta-buttons">
              <Link href="/donate" className="btn btn-primary">
                <FaHeart /> Support Us
              </Link>
              <Link href="/contact" className="btn btn-outline">
                <FaEnvelope /> Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
