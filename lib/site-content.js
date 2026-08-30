// Central place for all site imagery, icons and theme accents.
// Update values here to change images across the whole site.

// Local uploaded images live in /public/uploads and are served at /uploads/...
const u = (file) => `/uploads/${encodeURIComponent(file)}`;

// ---- Brand / theme colors (mirrors CSS variables) ----
export const colors = {
  primary: "#1A5276",
  primaryLight: "#2E86C1",
  primaryDark: "#0E2F44",
  secondary: "#F39C12",
  secondaryDark: "#D68910",
  accent: "#2ECC71",
};

// ---- Hero / mission imagery ----
export const heroImage = u("hero-section.jpeg");
export const missionImage = u("About.jpg");
export const aboutImage = u("About.jpg");
export const donateHero = u("hero-section.jpeg");

// ---- Team (About page) default avatars ----
export const teamFallbackAvatar = u("main logo.png");

// ---- Logo files ----
export const logoMain = u("main logo.png");
export const logoFooter = u("Footer- logo.png");

// ---- Blog demo post images ----
export const blogImages = {
  education: u("Blog - Education.jpg"),
  health: u("Blog - Health.jpg"),
  women: u("Blog - Women.jpg"),
  wash: u("Blog - WASH.jpg"),
  youth: u("Blog - Youth.jpg"),
  community: u("About.jpg"),
};

// ---- Thematic program icon + accent color mapping (Programs page) ----
export const programThemes = {
  youth: { color: "#F39C12" },
  health: { color: "#E74C3C" },
  education: { color: "#3498DB" },
  protection: { color: "#2ECC71" },
  women: { color: "#E91E63" },
  wash: { color: "#00BCD4" },
  nutrition: { color: "#4CAF50" },
};

// ---- Site contact details ----
export const site = {
  name: "VIDO",
  fullName: "Voice of Youth Development Organization",
  email: "vido2024@gmail.com",
  email2: "wuorial120@gmail.com",
  phone: "+211 927 777 285",
  phone2: "+211 917 813 317",
  address: "Hai Referendum, Juba - South Sudan",
  office: {
    monFri: "8:00 AM - 5:00 PM",
    saturday: "9:00 AM - 1:00 PM",
    sunday: "Closed",
  },
};

// ---- Social links ----
export const socials = [
  { name: "Facebook", url: "#", brand: "facebook" },
  { name: "Twitter", url: "#", brand: "twitter" },
  { name: "Instagram", url: "#", brand: "instagram" },
  { name: "YouTube", url: "#", brand: "youtube" },
  { name: "LinkedIn", url: "#", brand: "linkedin" },
  { name: "WhatsApp", url: "#", brand: "whatsapp" },
];

// ---- Motivational stats (Home + Programs) ----
export const stats = [
  { number: "7", label: "Program Areas" },
  { number: "10K+", label: "Beneficiaries" },
  { number: "5+", label: "Years Active" },
  { number: "100+", label: "Projects" },
];

export default {
  colors,
  heroImage,
  missionImage,
  aboutImage,
  donateHero,
  teamFallbackAvatar,
  logoMain,
  logoFooter,
  blogImages,
  programThemes,
  site,
  socials,
  stats,
};
