"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaHeart,
  FaBookOpen,
  FaUsers,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaPaperPlane,
} from "@/components/ui/Icons";
import { formatDate } from "@/lib/utils";

const PER_PAGE = 6;
const filterTabs = [
  { label: "All", value: "all" },
  { label: "Youth", value: "Youth Empowerment" },
  { label: "Health", value: "Healthcare" },
  { label: "Education", value: "Education" },
  { label: "Women", value: "Women Empowerment" },
  { label: "WASH", value: "WASH" },
];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/posts?status=published`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => toast.error("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const map = {};
    posts.forEach((p) => {
      const cat = p.category || "News";
      map[cat] = (map[cat] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const tags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 12);
  }, [posts]);

  const filtered = useMemo(() => {
    let list = posts;
    if (activeFilter !== "all") {
      list = list.filter((p) => (p.category || "News") === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const excerpt = (p.excerpt || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        return (
          title.includes(q) || excerpt.includes(q) || cat.includes(q)
        );
      });
    }
    return list;
  }, [posts, activeFilter, search]);

  const featured = filtered[0];
  const gridPosts = filtered.slice(1);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = gridPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeFilter, search]);

  const handleFilter = (value) => setActiveFilter(value);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    toast.success(`Thanks for subscribing! Updates will go to ${email}`);
    e.target.reset();
  };

  return (
    <>
      <Header />

      {/* ===== BLOG HEADER ===== */}
      <section className="blog-header">
        <div className="container">
          <h1>News &amp; Activities</h1>
          <p>
            Stay updated with the latest stories, events, and impact from our
            communities across South Sudan
          </p>
        </div>
      </section>

      {/* ===== BLOG MAIN ===== */}
      <section className="blog-main">
        <div className="container">
          <div className="blog-layout">
            <div className="blog-content">
              {/* Search & Filters */}
              <div className="blog-filters">
                <div className="blog-search">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="filter-tabs">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.value}
                      className={`filter-tab${
                        activeFilter === tab.value ? " active" : ""
                      }`}
                      onClick={() => handleFilter(tab.value)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="blog-empty">Loading stories...</div>
              ) : filtered.length === 0 ? (
                <div className="blog-empty">
                  No articles match your search.
                </div>
              ) : (
                <>
                  {/* Featured Post */}
                  {featured && (
                    <article className="featured-post">
                      <div className="featured-post-image">
                        {featured.featuredImage ? (
                          <img
                            src={featured.featuredImage}
                            alt={featured.title}
                          />
                        ) : (
                          <FaUsers />
                        )}
                        <div className="overlay">
                          <span className="badge">Featured Story</span>
                        </div>
                      </div>
                      <div className="featured-post-content">
                        <div className="post-meta">
                          <span>
                            <FaCalendarAlt />
                            {formatDate(featured.publishedAt || featured.createdAt)}
                          </span>
                          <span>
                            <FaTag /> {featured.category || "News"}
                          </span>
                          <span>
                            <FaUser /> By {featured.author?.name || "Admin"}
                          </span>
                        </div>
                        <h2>
                          <Link href={`/blog/${featured.slug}`}>
                            {featured.title}
                          </Link>
                        </h2>
                        <p>{featured.excerpt}</p>
                        <div className="post-footer">
                          <Link
                            href={`/blog/${featured.slug}`}
                            className="read-more"
                          >
                            Read Full Story <FaArrowRight />
                          </Link>
                          <div className="post-stats">
                            <span>
                              <FaHeart /> {featured.views || 0} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* Posts Grid */}
                  <div className="posts-grid">
                    {paged.length === 0 && gridPosts.length > 0 ? (
                      <div className="blog-empty">
                        No more stories on this page.
                      </div>
                    ) : (
                      paged.map((post) => (
                        <article
                          key={post.id}
                          className="post-card"
                          data-category={post.category}
                        >
                          <div className="post-card-image">
                            {post.featuredImage ? (
                              <img
                                src={post.featuredImage}
                                alt={post.title}
                              />
                            ) : (
                              <FaBookOpen />
                            )}
                          </div>
                          <div className="post-card-content">
                            <span className="post-category">
                              {post.category || "News"}
                            </span>
                            <h3>
                              <Link href={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h3>
                            <div className="post-meta">
                              <FaCalendarAlt />
                              {formatDate(post.publishedAt || post.createdAt)}
                              <span style={{ marginLeft: 12 }}>
                                <FaUser /> {post.author?.name || "Admin"}
                              </span>
                            </div>
                            <p>{post.excerpt}</p>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="read-more-sm"
                            >
                              Read More <FaArrowRight />
                            </Link>
                          </div>
                        </article>
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="pagination">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="prev-next"
                      >
                        <FaChevronLeft /> Prev
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (n) => (
                          <button
                            key={n}
                            className={n === page ? "active" : ""}
                            onClick={() => setPage(n)}
                          >
                            {n}
                          </button>
                        )
                      )}
                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="prev-next"
                      >
                        Next <FaChevronRight />
                      </button>
                    </nav>
                  )}
                </>
              )}
            </div>

            {/* ===== SIDEBAR ===== */}
            <aside className="sidebar">
              {/* Categories */}
              <div className="sidebar-widget">
                <h3>Categories</h3>
                <div className="category-list">
                  <button onClick={() => handleFilter("all")}>
                    All Articles
                    <span className="count">{posts.length}</span>
                  </button>
                  {categories.map(([cat, count]) => (
                    <button
                      key={cat}
                      onClick={() =>
                        handleFilter(cat === activeFilter ? "all" : cat)
                      }
                    >
                      {cat}
                      <span className="count">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="sidebar-widget">
                <h3>Recent Posts</h3>
                {posts.slice(0, 4).map((post) => (
                  <div key={post.id} className="recent-post">
                    <div className="rp-thumb">
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} />
                      ) : (
                        <FaBookOpen />
                      )}
                    </div>
                    <div className="rp-content">
                      <h4>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <span className="rp-date">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget">
                <h3>Newsletter</h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--gray-600)",
                    marginBottom: 12,
                  }}
                >
                  Subscribe to get the latest updates from VIDO
                </p>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit">
                    <FaPaperPlane /> Subscribe
                  </button>
                </form>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="sidebar-widget">
                  <h3>Tags</h3>
                  <div className="tag-cloud">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearch(tag.toLowerCase())}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
