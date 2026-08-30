import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import "@/models/User";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaEye,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

function readingTime(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug, status: "published" })
    .populate("authorId", "name")
    .lean();
  if (!post) notFound();

  const [related, allPosts] = await Promise.all([
    Post.find({
      _id: { $ne: post._id },
      status: "published",
      category: post.category,
    })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean(),
    Post.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean(),
  ]);

  const relatedPosts =
    related.length > 0 ? related : allPosts.filter((p) => p._id.toString() !== post._id.toString()).slice(0, 3);

  const categories = {};
  allPosts.forEach((p) => {
    const cat = p.category || "News";
    categories[cat] = (categories[cat] || 0) + 1;
  });
  const categoryEntries = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  const authorName = post.authorId?.name || "Admin";
  const title = post.title;
  const url = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/blog/${post.slug}`;
  const minutes = readingTime(post.content || "");

  const shareLinks = [
    { icon: FaFacebookF, cls: "facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { icon: FaTwitter, cls: "twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { icon: FaWhatsapp, cls: "whatsapp", href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}` },
    { icon: FaLinkedinIn, cls: "linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { icon: FaEnvelope, cls: "email", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("Check out this article:\n\n" + title + "\n\n" + url)}` },
  ];

  return (
    <>
      <Header />

      {/* ===== POST HEADER ===== */}
      <section className="post-header">
        <div className="container">
          <Link href="/blog" className="back-to-blog">
            <FaArrowLeft /> Back to Blog
          </Link>

          <div className="featured-image">
            {post.featuredImage ? (
              <img src={post.featuredImage} alt={post.title} />
            ) : (
              <span style={{ fontSize: 120, opacity: 0.3 }}>📰</span>
            )}
            <div className="image-overlay">
              <div className="post-meta-top">
                <span>
                  <FaCalendarAlt /> {formatDate(post.publishedAt || post.createdAt)}
                </span>
                <span className="category-badge">{post.category || "News"}</span>
              </div>
              <h1>{post.title}</h1>
              <div className="post-meta-bottom">
                <span>
                  <FaUser /> By {authorName}
                </span>
                <span>
                  <FaEye /> {(post.views || 0).toLocaleString()} views
                </span>
                <span>
                  <FaClock /> {minutes} min read
                </span>
              </div>
            </div>
          </div>

          {/* Content Layout */}
          <div className="post-content-wrapper">
            {/* ===== MAIN CONTENT ===== */}
            <div className="post-content">
              <div
                className="content-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog`}>
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Author Box */}
              <div className="author-box">
                <div className="author-avatar">
                  <FaUser />
                </div>
                <div className="author-info">
                  <h4>{authorName}</h4>
                  <span className="author-role">VIDO Team</span>
                  <p>
                    The VIDO team is dedicated to empowering youth and building
                    sustainable communities across South Sudan. We share stories
                    of impact and hope from our programs.
                  </p>
                </div>
              </div>

              {/* Share Buttons */}
              <div style={{ marginTop: 16 }}>
                <span className="share-label">Share this post:</span>
                <div className="share-buttons">
                  {shareLinks.map((s) => (
                    <a
                      key={s.cls}
                      href={s.href}
                      className={s.cls}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.cls}
                    >
                      <s.icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>You Might Also Like</h3>
                  <div className="related-grid">
                    {relatedPosts.map((rp) => (
                      <div key={rp._id.toString()} className="related-card">
                        <div className="related-image">
                          {rp.featuredImage ? (
                            <img src={rp.featuredImage} alt={rp.title} />
                          ) : (
                            <FaCalendarAlt style={{ fontSize: 32 }} />
                          )}
                        </div>
                        <div className="related-content">
                          <span className="related-category">
                            {rp.category || "News"}
                          </span>
                          <h4>
                            <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                          </h4>
                          <span className="related-date">
                            {formatDate(rp.publishedAt || rp.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ===== SIDEBAR ===== */}
            <aside className="sidebar post-sidebar">
              {/* About Author */}
              <div className="sidebar-widget author-sidebar">
                <h3>About the Author</h3>
                <div className="author-avatar">
                  <FaUser />
                </div>
                <h4 style={{ marginBottom: 2 }}>{authorName}</h4>
                <p style={{ fontSize: 13, color: "var(--secondary)", fontWeight: 500 }}>
                  VIDO Team
                </p>
                <p style={{ fontSize: 14, color: "var(--gray-600)", marginTop: 8 }}>
                  Sharing stories of impact and hope from VIDO's programs.
                </p>
              </div>

              {/* Categories */}
              {categoryEntries.length > 0 && (
                <div className="sidebar-widget">
                  <h3>Categories</h3>
                  <div className="category-list">
                    {categoryEntries.map(([cat, count]) => (
                      <Link key={cat} href={`/blog`}>
                        {cat} <span className="count">{count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Posts */}
              <div className="sidebar-widget">
                <h3>Recent Posts</h3>
                {allPosts.filter((p) => p._id.toString() !== post._id.toString()).slice(0, 3).map((rp) => (
                  <div key={rp._id.toString()} className="recent-post">
                    <div className="rp-thumb">
                      {rp.featuredImage ? (
                        <img src={rp.featuredImage} alt={rp.title} />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    <div className="rp-content">
                      <h4>
                        <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                      </h4>
                      <span className="rp-date">
                        {formatDate(rp.publishedAt || rp.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget">
                <h3>Newsletter</h3>
                <p style={{ fontSize: 14, color: "var(--gray-600)", marginBottom: 12 }}>
                  Subscribe for the latest updates from VIDO
                </p>
                <form className="newsletter-form" action="#">
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit">
                    <FaEnvelope /> Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
