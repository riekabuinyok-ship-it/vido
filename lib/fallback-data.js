// Demo/placeholder content shown when the database is unreachable,
// so the site stays usable offline. Replace when a live DB is connected.

const u = (file) => `/uploads/${encodeURIComponent(file)}`;

export const fallbackPosts = [
  {
    _id: "fb-post-1",
    id: "fb-post-1",
    title: "Empowering Youth Through Education",
    slug: "empowering-youth-through-education",
    excerpt:
      "VIDO's education program is helping children in remote areas access quality learning and build a brighter future.",
    category: "Education",
    featuredImage: u("Blog - Education.jpg"),
    publishedAt: new Date("2026-08-10"),
    createdAt: new Date("2026-08-10"),
    author: "VIDO Staff",
  },
  {
    _id: "fb-post-2",
    id: "fb-post-2",
    title: "Community Health Outreach in Ruweng",
    slug: "community-health-outreach-ruweng",
    excerpt:
      "Mobile health teams brought lifesaving services and awareness to underserved communities last month.",
    category: "Health",
    featuredImage: u("Blog - Health.jpg"),
    publishedAt: new Date("2026-07-28"),
    createdAt: new Date("2026-07-28"),
    author: "VIDO Staff",
  },
  {
    _id: "fb-post-3",
    id: "fb-post-3",
    title: "Women's Empowerment Project Marks New Milestone",
    slug: "womens-empowerment-milestone",
    excerpt:
      "More than 200 women completed vocational training and launched small businesses across our programme areas.",
    category: "Women",
    featuredImage: u("Blog - Women.jpg"),
    publishedAt: new Date("2026-07-15"),
    createdAt: new Date("2026-07-15"),
    author: "VIDO Staff",
  },
];

export const fallbackPartners = [  {
    _id: "fb-partner-1",
    id: "fb-partner-1",
    name: "Ministry of Education",
    type: "Government",
    website: "",
    logo: null,
  },
  {
    _id: "fb-partner-2",
    id: "fb-partner-2",
    name: "Community Health Alliance",
    type: "NGO",
    website: "",
    logo: null,
  },
  {
    _id: "fb-partner-3",
    id: "fb-partner-3",
    name: "WASH Coalition",
    type: "NGO",
    website: "",
    logo: null,
  },
  {
    _id: "fb-partner-4",
    id: "fb-partner-4",
    name: "Youth Empowerment Network",
    type: "Foundation",
    website: "",
    logo: null,
  },
  {
    _id: "fb-partner-5",
    id: "fb-partner-5",
    name: "Agricultural Support Group",
    type: "NGO",
    website: "",
    logo: null,
  },
  {
    _id: "fb-partner-6",
    id: "fb-partner-6",
    name: "Rights & Protection Council",
    type: "UN Agency",
    website: "",
    logo: null,
  },
];

export const fallbackJobs = [
  {
    id: "fb-job-1",
    title: "Program Manager",
    location: "Juba, South Sudan",
    type: "full-time",
    date: "Mar 15, 2026",
    email: "vido2024@gmail.com",
    description:
      "<p>We are looking for an experienced Program Manager to oversee our youth empowerment programs in South Sudan.</p><h4>Key Responsibilities:</h4><ul><li>Lead program planning and implementation</li><li>Manage program budgets and resources</li><li>Coordinate with stakeholders and partners</li><li>Monitor and evaluate program impact</li></ul><h4>Requirements:</h4><ul><li>5+ years of experience in program management</li><li>Experience working in South Sudan or similar context</li><li>Strong leadership and communication skills</li><li>Bachelor's degree in relevant field</li></ul>",
  },
  {
    id: "fb-job-2",
    title: "Field Officer",
    location: "Ruweng, South Sudan",
    type: "full-time",
    date: "Mar 12, 2026",
    email: "vido2024@gmail.com",
    description:
      "<p>We are seeking a dedicated Field Officer to implement our community programs in Ruweng.</p><h4>Key Responsibilities:</h4><ul><li>Implement program activities in the field</li><li>Engage with community members and stakeholders</li><li>Monitor program progress and report</li><li>Coordinate with local partners</li></ul><h4>Requirements:</h4><ul><li>3+ years of field experience</li><li>Knowledge of South Sudan context</li><li>Strong community engagement skills</li><li>Bachelor's degree in relevant field</li></ul>",
  },
  {
    id: "fb-job-3",
    title: "Communications Officer",
    location: "Juba, South Sudan",
    type: "part-time",
    date: "Mar 10, 2026",
    email: "vido2024@gmail.com",
    description:
      "<p>We are looking for a Communications Officer to manage our media and communications activities.</p><h4>Key Responsibilities:</h4><ul><li>Manage social media platforms</li><li>Create content for website and newsletters</li><li>Design communication materials</li><li>Media engagement and press releases</li></ul><h4>Requirements:</h4><ul><li>2+ years of communications experience</li><li>Strong writing and editing skills</li><li>Experience with social media management</li><li>Bachelor's degree in Communications or related</li></ul>",
  },
];

export default { fallbackPosts, fallbackPartners, fallbackJobs };
