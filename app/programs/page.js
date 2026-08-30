"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaHandsHelping,
  FaHeartbeat,
  FaBook,
  FaBookOpen,
  FaShieldAlt,
  FaFistRaised,
  FaWater,
  FaSeedling,
  FaUsers,
  FaUser,
  FaHandshake,
  FaHome,
  FaGamepad,
  FaHospital,
  FaAmbulance,
  FaBaby,
  FaVirus,
  FaSchool,
  FaChalkboardTeacher,
  FaTools,
  FaMobileAlt,
  FaChild,
  FaShieldVirus,
  FaStar,
  FaHandHoldingHeart,
  FaVenus,
  FaChartLine,
  FaUsersCog,
  FaGavel,
  FaToilet,
  FaTint,
  FaRoad,
  FaRecycle,
  FaAppleAlt,
  FaTractor,
  FaFish,
  FaPaw,
  FaArrowRight,
  FaCheckCircle,
  FaHeart,
  FaEnvelope,
  FaTimes,
} from "@/components/ui/Icons";

const programs = [
  {
    id: "youth",
    icon: FaHandsHelping,
    cls: "youth",
    title: "Youth Empowerment & Peace Building",
    subtitle: "Theme 1",
    desc: "Mobilizing funds to support youth development programs, establishing youth centers, and creating recreational activities that promote togetherness and peace.",
    details: [
      { icon: FaUsers, text: "Youth Development" },
      { icon: FaHandshake, text: "Peace Building" },
      { icon: FaHome, text: "Youth Centers" },
      { icon: FaGamepad, text: "Recreation" },
    ],
    tags: ["Youth", "Peace", "Skills"],
    modalIcon: FaHandshake,
    modalDesc:
      "VIDO mobilizes funds to support youth development programs across South Sudan. We develop youth centers where young people can meet, build social networks, and access life skills training. Our recreational activities promote youth togetherness and peace building within communities and neighboring societies.",
    modalList: [
      "Developing youth centers for community gatherings",
      "Life skills training and capacity building",
      "Recreational activities for peace building",
      "Social network development for youth",
      "Conflict resolution and peace education",
    ],
  },
  {
    id: "health",
    icon: FaHeartbeat,
    cls: "health",
    title: "Healthcare & HIV Prevention",
    subtitle: "Theme 2",
    desc: "Establishing community health centers in remote areas, developing awareness campaigns for HIV prevention and reproductive health, and mobile healthcare for vulnerable groups.",
    details: [
      { icon: FaHospital, text: "Health Centers" },
      { icon: FaAmbulance, text: "Mobile Healthcare" },
      { icon: FaBaby, text: "Maternal Health" },
      { icon: FaVirus, text: "HIV Prevention" },
    ],
    tags: ["Health", "HIV", "Maternal"],
    modalIcon: FaHeart,
    modalDesc:
      "VIDO supports the establishment of community health centers in remote areas where people lack access to health facilities. We design awareness campaigns for HIV prevention and reproductive health. Our mobile healthcare services target children, people with special needs, and pregnant mothers in remote areas of South Sudan.",
    modalList: [
      "Community health centers in remote areas",
      "HIV prevention and awareness campaigns",
      "Reproductive health education",
      "Mobile healthcare services",
      "Maternal and child health programs",
    ],
  },
  {
    id: "education",
    icon: FaBook,
    cls: "education",
    title: "Education Programs",
    subtitle: "Theme 3",
    desc: "Advocating for the right to education, increasing enrollment in remote areas, constructing classrooms, and supporting mobile schools and vocational training.",
    details: [
      { icon: FaSchool, text: "School Construction" },
      { icon: FaChalkboardTeacher, text: "Teacher Training" },
      { icon: FaTools, text: "Vocational Skills" },
      { icon: FaMobileAlt, text: "Mobile Schools" },
    ],
    tags: ["Education", "Vocational", "Children"],
    modalIcon: FaBookOpen,
    modalDesc:
      "VIDO advocates for the right to education for all children, both boys and girls. We mobilize funds to increase enrollment in remote areas and improve existing education facilities through classroom construction and teacher payment. Our mobile schools ensure children of all capacities can access basic education. We also provide vocational training to fight youth unemployment.",
    modalList: [
      "Advocating for children's right to education",
      "Construction and renovation of classrooms",
      "Mobile schools for remote communities",
      "Vocational skills training (plumbing, masonry, tailoring)",
      "Teacher training and support programs",
    ],
  },
  {
    id: "protection",
    icon: FaShieldAlt,
    cls: "protection",
    title: "Child & Youth Protection",
    subtitle: "Theme 4",
    desc: "Focusing on holistic development of human rights with focus on child rights, safe learning places, confidence building programs, and leadership development.",
    details: [
      { icon: FaChild, text: "Child Rights" },
      { icon: FaShieldVirus, text: "Protection" },
      { icon: FaStar, text: "Leadership" },
      { icon: FaHandHoldingHeart, text: "Safe Spaces" },
    ],
    tags: ["Child Rights", "Protection", "Safety"],
    modalIcon: FaShieldAlt,
    modalDesc:
      "VIDO focuses on holistic development of human rights with special attention to child rights and protection. We implement child rights awareness programs at various levels, develop safe learning places in schools and community centers, and build confidence through leadership development programs.",
    modalList: [
      "Child rights awareness and education",
      "Safe learning environments",
      "Confidence building programs",
      "Leadership development for youth",
      "Protection against abuse and exploitation",
    ],
  },
  {
    id: "women",
    icon: FaFistRaised,
    cls: "women",
    title: "Women Empowerment",
    subtitle: "Theme 5",
    desc: "Promoting women to take leadership roles in democratic norms, building capacities, strengthening women groups, and ensuring access to economic resources.",
    details: [
      { icon: FaVenus, text: "Women Leadership" },
      { icon: FaChartLine, text: "Economic Empowerment" },
      { icon: FaUsersCog, text: "Capacity Building" },
      { icon: FaGavel, text: "Rights Advocacy" },
    ],
    tags: ["Women", "Leadership", "Economic"],
    modalIcon: FaUser,
    modalDesc:
      "VIDO promotes women to take leadership roles in democratic norms and culture. We build capacities of women and communities to engage effectively with government and stakeholders for their economic and social rights. We also strengthen women groups for better access to economic resources.",
    modalList: [
      "Women leadership development",
      "Capacity building and training",
      "Economic empowerment programs",
      "Engagement with government and stakeholders",
      "Strengthening women groups and networks",
    ],
  },
  {
    id: "wash",
    icon: FaWater,
    cls: "wash",
    title: "WASH & Community Infrastructure",
    subtitle: "Theme 6",
    desc: "Construction and rehabilitation of rural infrastructure schemes including community latrines, water course lining, tube wells, and brick pavement in villages.",
    details: [
      { icon: FaToilet, text: "Community Latrines" },
      { icon: FaTint, text: "Clean Water" },
      { icon: FaRoad, text: "Infrastructure" },
      { icon: FaRecycle, text: "Sanitation" },
    ],
    tags: ["WASH", "Infrastructure", "Sanitation"],
    modalIcon: FaTint,
    modalDesc:
      "VIDO implements community-based infrastructure development through construction and rehabilitation of rural infrastructure schemes. We involve community participation in building latrines, water course lining, tube wells, and brick pavement. We also provide building materials to the most vulnerable households.",
    modalList: [
      "Community latrine construction",
      "Water course lining and management",
      "Tube well installation",
      "Brick pavement in villages",
      "Building materials for vulnerable households",
    ],
  },
  {
    id: "nutrition",
    icon: FaSeedling,
    cls: "nutrition",
    title: "Nutrition, Agriculture & Livelihood",
    subtitle: "Theme 7",
    desc: "Supporting children and lactating mothers with nutrition, training local farmers on modern techniques, and promoting agro-business and sustainable farming.",
    details: [
      { icon: FaAppleAlt, text: "Nutrition" },
      { icon: FaTractor, text: "Modern Farming" },
      { icon: FaFish, text: "Fish Farming" },
      { icon: FaPaw, text: "Poultry & Livestock" },
    ],
    tags: ["Nutrition", "Agriculture", "Livelihood"],
    modalIcon: FaSeedling,
    modalDesc:
      "VIDO supports children and lactating mothers with nutrition programs. We train and support local farmers, especially the elderly and widows, in modern farming techniques. We promote agro-business and sustainable farming practices including fish farming, bee keeping, livestock, and poultry farming in remote areas.",
    modalList: [
      "Nutrition support for children and mothers",
      "Modern farming techniques training",
      "Agro-business promotion",
      "Fish farming and bee keeping",
      "Livestock and poultry farming support",
    ],
  },
];

const stats = [
  { number: "7", label: "Thematic Programs" },
  { number: "10K+", label: "Beneficiaries Reached" },
  { number: "5+", label: "Years of Impact" },
  { number: "100+", label: "Projects Completed" },
];

const involved = [
  {
    icon: FaHeart,
    title: "Donate",
    desc: "Your financial support helps us reach more communities and expand our programs.",
    href: "/donate",
    label: "Donate Now",
  },
  {
    icon: FaHandsHelping,
    title: "Volunteer",
    desc: "Join our team of dedicated volunteers and contribute your skills to make a difference.",
    href: "/contact",
    label: "Volunteer",
  },
  {
    icon: FaHandshake,
    title: "Partner",
    desc: "Partner with us to create sustainable change and amplify our impact together.",
    href: "/contact",
    label: "Partner With Us",
  },
];

export default function ProgramsPage() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  return (
    <>
      <Header />

      {/* ===== PROGRAMS HEADER ===== */}
      <section className="programs-header">
        <div className="container">
          <h1>Our Programs</h1>
          <p>
            Making a difference through 7 key thematic areas focused on
            sustainable community development
          </p>
        </div>
      </section>

      {/* ===== MISSION BANNER ===== */}
      <section className="mission-banner">
        <div className="container">
          <div className="mission-content">
            <div className="mission-icon"></div>
            <h2>Our Mission in Action</h2>
            <p>
              VIDO aims to contribute to improving the living standard of
              vulnerable communities in South Sudan and Africa as a whole
              through community mobilization, capacity building, advocacy, and
              strengthening of institutions at the grass root level.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS GRID ===== */}
      <section className="programs-main">
        <div className="container">
          <div className="programs-grid">
            {programs.map((program) => (
              <div key={program.id} className="program-card-large">
                <div className="program-card-header">
                  <div className={`program-icon-large ${program.cls}`}>
                    <program.icon />
                  </div>
                  <div className="program-title-group">
                    <h3>{program.title}</h3>
                    <span className="program-subtitle">{program.subtitle}</span>
                  </div>
                </div>
                <div className="program-card-body">
                  <p>{program.desc}</p>
                  <div className="program-details">
                    {program.details.map((d) => (
                      <span key={d.text}>
                        <d.icon /> {d.text}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="program-card-footer">
                  <button
                    className="btn-learn"
                    onClick={() => setModal(program)}
                  >
                    Learn More <FaArrowRight />
                  </button>
                  <div className="program-tags">
                    {program.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="impact-stats">
        <div className="container">
          <div className="impact-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="impact-item">
                <span className="number">{stat.number}</span>
                <span className="label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GET INVOLVED ===== */}
      <section className="get-involved">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get Involved</h2>
            <p className="section-subtitle">
              Support our programs and make a lasting difference in communities
            </p>
          </div>
          <div className="involved-grid">
            {involved.map((card) => (
              <div key={card.title} className="involved-card">
                <div className="icon">
                  <card.icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <Link
                  href={card.href}
                  className="btn btn-primary"
                  style={{ display: "inline-block", padding: "10px 24px", fontSize: 14 }}
                >
                  {card.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAM DETAIL MODAL ===== */}
      {modal && (
        <div className="program-modal active" onClick={() => setModal(null)}>
          <div
            className="program-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="program-modal-close"
              onClick={() => setModal(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="modal-icon"><modal.modalIcon /></div>
            <h2>{modal.title}</h2>
            <p className="modal-subtitle">{modal.subtitle}</p>

            <p>{modal.modalDesc}</p>

            <ul className="modal-list">
              {modal.modalList.map((item) => (
                <li key={item}>
                  <FaCheckCircle /> {item}
                </li>
              ))}
            </ul>

            <div className="modal-actions">
              <Link href="/donate" className="btn btn-primary">
                <FaHeart /> Support This Program
              </Link>
              <Link href="/contact" className="btn btn-outline">
                <FaEnvelope /> Learn More
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
