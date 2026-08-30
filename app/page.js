import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Partner from "@/models/Partner";
import { fallbackPosts, fallbackPartners } from "@/lib/fallback-data";
import { formatDate } from "@/lib/utils";
import { heroImage } from "@/lib/site-content";
import {
  FaHeart,
  FaHandshake,
  FaHeartbeat,
  FaBookOpen,
  FaShieldAlt,
  FaUsers,
  FaTint,
  FaSeedling,
  FaGlobe,
  FaCalendarAlt,
} from "@/components/ui/Icons";


const programAreas = [
  {
    icon: FaHandshake,
    color: "#F39C12",
    title: "Youth Empowerment & Peace Building",
    desc: "Developing youth centers, life skills training, and recreational activities for peace.",
  },
  {
    icon: FaHeartbeat,
    color: "#E74C3C",
    title: "Healthcare & HIV Prevention",
    desc: "Community health centers, awareness campaigns, and mobile healthcare services.",
  },
  {
    icon: FaBookOpen,
    color: "#3498DB",
    title: "Education Programs",
    desc: "School construction, teacher training, vocational skills, and mobile schools.",
  },
  {
    icon: FaShieldAlt,
    color: "#2ECC71",
    title: "Child & Youth Protection",
    desc: "Child rights awareness, safe learning spaces, and leadership development.",
  },
  {
    icon: FaUsers,
    color: "#E91E63",
    title: "Women Empowerment",
    desc: "Building capacities, economic resources, and engaging with government.",
  },
  {
    icon: FaTint,
    color: "#00BCD4",
    title: "WASH & Infrastructure",
    desc: "Community latrines, water systems, and rural infrastructure development.",
  },
  {
    icon: FaSeedling,
    color: "#4CAF50",
    title: "Nutrition & Livelihood",
    desc: "Supporting farmers, modern techniques, and agro-business development.",
  },
];

const testimonials = [
  {
    quote:
      "VIDO's education program helped my daughter go to school for the first time. She's now excelling in her studies.",
    name: "Mary A.",
    role: "Beneficiary, Juba",
  },
  {
    quote:
      "The health awareness campaigns have transformed our community. We now understand how to prevent diseases.",
    name: "James K.",
    role: "Community Leader, Ruweng",
  },
  {
    quote:
      "As a young woman, VIDO's empowerment programs gave me the skills and confidence to start my own business.",
    name: "Sarah P.",
    role: "Entrepreneur, Juba",
  },
];

export default async function Home() {
  let latestPosts = [];
  let partners = [];
  try {
    await dbConnect();
    latestPosts = await Post.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean();
    partners = await Partner.find({}).sort({ createdAt: -1 }).lean();
  } catch (error) {
    // DB unavailable (e.g. dev/Atlas IP not whitelisted). Fall back to demo
    // content so the page still shows stories and partners.
    console.error("Failed to load posts:", error);
    latestPosts = fallbackPosts;
    partners = fallbackPartners;
  }

  return (
    <>
      <Header />
      {/* ========== HERO ========== */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(14,47,68,0.92), rgba(46,134,193,0.88)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-badge">An Agent for Development</span>
              <h1 className="hero-title">
                Empowering Youth for{" "}
                <span className="highlight">Sustainable Development</span>
              </h1>
              <p className="hero-text">
                Voice of Youth Development Organization works to build
                communities through education, health, and empowerment programs
                in South Sudan.
              </p>
              <div className="hero-buttons">
                <Link href="/about" className="btn btn-secondary">
                  Learn More
                </Link>
                <Link href="/donate" className="btn btn-outline-white">
                  Donate Now
                </Link>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-inner">
                <div className="hero-card-icon">
                  <FaGlobe className="w-12 h-12 text-secondary" />
                </div>
                <h3>Making a Difference</h3>
                <p>
                  Join us in creating positive change in communities across
                  South Sudan
                </p>
                <div className="hero-stats">
                  <div>
                    <span className="stat-number">7</span>
                    <span className="stat-label">Program Areas</span>
                  </div>
                  <div>
                    <span className="stat-number">10K+</span>
                    <span className="stat-label">Beneficiaries</span>
                  </div>
                  <div>
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">7</span>
              <span className="stat-label">Program Areas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Beneficiaries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROGRAMS ========== */}
      <section className="programs">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Thematic Programs</h2>
            <p className="section-subtitle">
              VIDO operates in seven key program areas to achieve our goals
            </p>
          </div>
          <div className="programs-grid">
            {programAreas.map((program) => (
              <div key={program.title} className="program-card">
                <div
                  className="program-icon"
                  style={{ color: program.color }}
                >
                  <program.icon className="w-10 h-10" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.desc}</p>
                <Link href="/programs" className="program-link">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Impact Stories</h2>
            <p className="section-subtitle">Hear from the communities we serve</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p>{t.quote}</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Partners</h2>
            <p className="section-subtitle">Together we create lasting impact in South Sudan</p>
          </div>
          <div className="partners-grid">
            {partners.length === 0 ? (
              <div className="no-partners">
                <FaUsers className="text-4xl text-gray-300 mb-3 block mx-auto" />
                Our partners will be listed here soon.
              </div>
            ) : (
              partners.map((partner) => (
                <div key={partner._id.toString()} className="partner-item">
                  <div className="partner-logo">
                    {partner.logo ? (
                      <img src={partner.logo} alt={partner.name} />
                    ) : (
                      <div className="logo-placeholder">
                        <FaUsers />
                      </div>
                    )}
                  </div>
                  <div className="partner-name">{partner.name}</div>
                  {partner.type && (
                    <div className="partner-type">{partner.type}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ========== BLOG ========== */}
      <section className="home-blog">
        <div className="container">
          <div className="section-header">
            <span className="home-blog-eyebrow">From the Blog</span>
            <h2 className="section-title">Latest Stories</h2>
            <p className="section-subtitle">
              News, updates, and insights from our work
            </p>
          </div>

          <div className="home-blog-grid">
            {latestPosts.length === 0 ? (
              <p className="home-blog-empty">
                No stories published yet. Check back soon.
              </p>
            ) : (
              latestPosts.map((post) => (
                <article key={post._id.toString()} className="home-blog-card">
                  <Link href={`/blog/${post.slug}`} className="home-blog-link">
                    <div className="home-blog-thumb">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="home-blog-placeholder">
                          <FaBookOpen />
                        </div>
                      )}
                    </div>
                    <div className="home-blog-body">
                      <span className="home-blog-category">
                        {post.category || "News"}
                      </span>
                      <h3>{post.title}</h3>
                      {post.excerpt && <p>{post.excerpt}</p>}
                      <div className="home-blog-meta">
                        <span>
                          <FaCalendarAlt className="home-blog-meta-icon" />
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                        <span className="home-blog-more">Read More →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>

          {latestPosts.length > 0 && (
            <div className="home-blog-footer">
              <Link href="/blog" className="btn btn-outline">
                View All Stories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>
              Join us in empowering youth and building sustainable communities
              in South Sudan.
            </p>
            <div className="cta-buttons">
              <Link href="/donate" className="btn btn-primary">
                <FaHeart className="w-5 h-5" />
                Donate Now
              </Link>
              <Link href="/contact" className="btn btn-outline-white">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
