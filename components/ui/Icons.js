"use client";

const Svg = ({
  children,
  className,
  style,
  strokeWidth = 2,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    style={style}
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const Circle = ({ cx = 12, cy = 12, r = 10, ...p }) => (
  <circle cx={cx} cy={cy} r={r} {...p} />
);
const Path = ({ d, ...p }) => <path d={d} {...p} />;
const Rect = ({ x = 3, y = 3, w = 18, h = 18, rx = 2, ...p }) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} {...p} />
);
const Line = ({ x1, y1, x2, y2, ...p }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} {...p} />
);

export const FaHeart = (p) => (
  <Svg {...p}>
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);
export const FaHeartbeat = (p) => (
  <Svg {...p}>
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    <Path d="M3 12h4l2 4 3-8 2 4h4" />
  </Svg>
);
export const FaGlobe = (p) => (
  <Svg {...p}>
    <Circle />
    <Line x1="2" y1="12" x2="22" y2="12" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);
export const FaGlobeAfrica = (p) => (
  <Svg {...p}>
    <Circle />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <Path d="M2 12h20" />
  </Svg>
);
export const FaUsers = (p) => (
  <Svg {...p}>
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);
export const FaUsersCog = (p) => (
  <Svg {...p}>
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M21 13.5a2 2 0 0 0-1-1.73 2 2 0 0 0-2 0 2 2 0 0 0-1 1.73" />
    <Path d="M21 13.5v4a2 2 0 0 0 1 1.73" />
  </Svg>
);
export const FaBook = (p) => (
  <Svg {...p}>
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </Svg>
);
export const FaBookOpen = (p) => (
  <Svg {...p}>
    <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </Svg>
);
export const FaBriefcase = (p) => (
  <Svg {...p}>
    <Rect x="2" y="7" w="20" h="14" rx="2" />
    <Path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Svg>
);
export const FaGraduationCap = (p) => (
  <Svg {...p}>
    <Path d="M21.42 10.92a1 1 0 0 0 0-1.84l-8.17-3.91a2 2 0 0 0-1.5 0L3.58 9.08a1 1 0 0 0 0 1.84l8.17 3.91a2 2 0 0 0 1.5 0z" />
    <Path d="M22 10v6" />
    <Path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </Svg>
);
export const FaBuilding = (p) => (
  <Svg {...p}>
    <Rect x="4" y="2" w="16" h="20" rx="2" />
    <Path d="M9 22v-4h6v4" />
    <Path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
  </Svg>
);
export const FaBus = (p) => (
  <Svg {...p}>
    <Path d="M8 6v6" />
    <Path d="M16 6v6" />
    <Path d="M2 12h20" />
    <Path d="M18 18h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1" />
    <Path d="M6 21a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1z" />
    <Path d="M4 12V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
  </Svg>
);
export const FaCalendarAlt = (p) => (
  <Svg {...p}>
    <Rect x="3" y="4" w="18" h="18" rx="2" />
    <Line x1="16" y1="2" x2="16" y2="6" />
    <Line x1="8" y1="2" x2="8" y2="6" />
    <Line x1="3" y1="10" x2="21" y2="10" />
  </Svg>
);
export const FaCertificate = (p) => (
  <Svg {...p}>
    <Circle cx="12" cy="9" r="6" />
    <Path d="M9 14.5 7.5 21l4.5-2 4.5 2L15 14.5" />
  </Svg>
);
export const FaChartLine = (p) => (
  <Svg {...p}>
    <Path d="M3 3v18h18" />
    <Path d="m7 14 4-4 4 3 5-6" />
  </Svg>
);
export const FaCheckCircle = (p) => (
  <Svg {...p}>
    <Circle />
    <Path d="m9 12 2 2 4-4" />
  </Svg>
);
export const FaChevronLeft = (p) => (
  <Svg {...p}>
    <Path d="m15 18-6-6 6-6" />
  </Svg>
);
export const FaChevronRight = (p) => (
  <Svg {...p}>
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);
export const FaFacebookF = (p) => (
  <Svg {...p}>
    <Path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Svg>
);
export const FaInstagram = (p) => (
  <Svg {...p}>
    <Rect x="2" y="2" w="20" h="20" rx="5" />
    <Path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <Line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </Svg>
);
export const FaLinkedinIn = (p) => (
  <Svg {...p}>
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <Rect x="2" y="9" w="4" h="12" />
    <Circle cx="4" cy="4" r="2" />
  </Svg>
);
export const FaTwitter = (p) => (
  <Svg {...p}>
    <Path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </Svg>
);
export const FaWhatsapp = (p) => (
  <Svg {...p}>
    <Path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5z" />
    <Path d="M9 10c.5 2 2 3.5 4 4l1-1.5" />
  </Svg>
);
export const FaYoutube = (p) => (
  <Svg {...p}>
    <Path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <Path d="m9.75 15.02 5.75-3.27-5.75-3.27z" />
  </Svg>
);
export const FaUser = (p) => (
  <Svg {...p}>
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);
export const FaUserCircle = (p) => (
  <Svg {...p}>
    <Circle />
    <Circle cx="12" cy="10" r="3" />
    <Path d="M6.168 18.849a4 4 0 0 1 3.832-2.849h4a4 4 0 0 1 3.832 2.849" />
  </Svg>
);
export const FaHandshake = (p) => (
  <Svg {...p}>
    <Path d="M11 17 8 14 3 11V5a1 1 0 0 1 1-1h5l8 8" />
    <Path d="m21 7-6 6-2 2" />
    <Path d="M3 11l7 7 3-1 2 2" />
  </Svg>
);
export const FaHandHoldingHeart = (p) => (
  <Svg {...p}>
    <Path d="M11 17V9a5 5 0 0 1 10 0" />
    <Path d="M11 17 21 7" />
    <Path d="M3 12l8-8a5 5 0 0 1 7 7" />
  </Svg>
);
export const FaHandsHelping = (p) => (
  <Svg {...p}>
    <Path d="M12 3v18" />
    <Path d="M3 12h18" />
    <Path d="M7.5 7.5 9 9l3-3 3 3 1.5-1.5" />
  </Svg>
);
export const FaEnvelope = (p) => (
  <Svg {...p}>
    <Rect x="2" y="4" w="20" h="16" rx="2" />
    <Path d="m22 7-10 5L2 7" />
  </Svg>
);
export const FaMapMarkerAlt = (p) => (
  <Svg {...p}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);
export const FaMapPin = (p) => (
  <Svg {...p}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
  </Svg>
);
export const FaPaperPlane = (p) => (
  <Svg {...p}>
    <Path d="M22 2 11 13" />
    <Path d="M22 2 15 22l-4-9-9-4z" />
  </Svg>
);
export const FaTimes = (p) => (
  <Svg {...p}>
    <Line x1="18" y1="6" x2="6" y2="18" />
    <Line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);
export const FaSpinner = (p) => (
  <Svg {...p}>
    <Path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Svg>
);
export const FaPlus = (p) => (
  <Svg {...p}>
    <Line x1="12" y1="5" x2="12" y2="19" />
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);
export const FaSearch = (p) => (
  <Svg {...p}>
    <Circle cx="11" cy="11" r="8" />
    <Line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Svg>
);
export const FaHome = (p) => (
  <Svg {...p}>
    <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <Path d="M9 22V12h6v10" />
  </Svg>
);
export const FaStar = (p) => (
  <Svg {...p}>
    <Path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
  </Svg>
);
export const FaTag = (p) => (
  <Svg {...p}>
    <Path d="M20.59 13.41 12 5 3 5v9l9 9 8.59-8.59z" />
    <Circle cx="7.5" cy="8.5" r="1" />
  </Svg>
);
export const FaArrowLeft = (p) => (
  <Svg {...p}>
    <Line x1="19" y1="12" x2="5" y2="12" />
    <Path d="m12 19-7-7 7-7" />
  </Svg>
);
export const FaArrowRight = (p) => (
  <Svg {...p}>
    <Line x1="5" y1="12" x2="19" y2="12" />
    <Path d="m12 5 7 7-7 7" />
  </Svg>
);
export const FaPhoneAlt = (p) => (
  <Svg {...p}>
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);
export const FaCreditCard = (p) => (
  <Svg {...p}>
    <Rect x="1" y="4" w="22" h="16" rx="2" />
    <Line x1="1" y1="10" x2="23" y2="10" />
  </Svg>
);
export const FaUniversity = (p) => (
  <Svg {...p}>
    <Path d="M22 10 12 5 2 10l10 5 10-5z" />
    <Path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    <Line x1="22" y1="10" x2="22" y2="18" />
  </Svg>
);
export const FaShieldAlt = (p) => (
  <Svg {...p}>
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Svg>
);
export const FaShieldVirus = (p) => (
  <Svg {...p}>
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <Circle cx="12" cy="12" r="2.5" />
    <Path d="M12 9.5V7M12 5h.01M12 17v2M12 19h.01M9.5 10.5 8 9M6.5 7.5h.01M14.5 10.5 16 9M17.5 7.5h.01M9.5 13.5 8 15M9 15h.01M14.5 13.5 16 15M15.75 16.5h.01" />
  </Svg>
);
export const FaTint = (p) => (
  <Svg {...p}>
    <Path d="M12 2.69 5.66 9.13a8 8 0 1 0 12.68 0z" />
  </Svg>
);
export const FaWater = (p) => (
  <Svg {...p}>
    <Path d="M12 2s6 6 6 10a6 6 0 0 1-12 0c0-4 6-10 6-10z" />
    <Path d="M8 13a4 4 0 0 0 2 3" />
  </Svg>
);
export const FaSeedling = (p) => (
  <Svg {...p}>
    <Path d="M12 22V8" />
    <Path d="M12 8c-4 0-8 2-8 8 4 0 8-2 8-8z" />
    <Path d="M12 10c0-5 3-8 8-8 0 5-3 8-8 8z" />
  </Svg>
);
export const FaRecycle = (p) => (
  <Svg {...p}>
    <Path d="M7 19H4.82C3.82 19 3 18.18 3 17.18 3 16.6 3.28 16 3.74 15.5L7 11" />
    <Path d="M9 6.5 10.5 4c.7-.8 2-.8 2.7 0" />
    <Path d="m17 8.5 2.26 1.5c.92.6.92 1.8 0 2.4L19 12.5" />
    <Path d="M7 19h6" />
    <Path d="m13 16 3 3-3 3" />
    <Path d="m21 15-2-3 3 1" />
  </Svg>
);
export const FaRoad = (p) => (
  <Svg {...p}>
    <Path d="M4 21 9 3" />
    <Path d="M20 21 15 3" />
    <Path d="M12 3v18" />
  </Svg>
);
export const FaSchool = (p) => (
  <Svg {...p}>
    <Path d="M2 21h20" />
    <Path d="M4 21V7l8-4 8 4v14" />
    <Path d="M12 9v8" />
  </Svg>
);
export const FaTools = (p) => (
  <Svg {...p}>
    <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </Svg>
);
export const FaMobileAlt = (p) => (
  <Svg {...p}>
    <Rect x="5" y="2" w="14" h="20" rx="2" />
    <Line x1="12" y1="18" x2="12.01" y2="18" />
  </Svg>
);
export const FaAppleAlt = (p) => (
  <Svg {...p}>
    <Path d="M12 8c.5-2 2-3 3.5-3" />
    <Path d="M12 8c-.5-2-2-3-3.5-3" />
    <Path d="M12 8c-2 0-4 2-4 5 0 3 2 7 4 7 1.5 0 2-1 4-1s2.5 1 4 1" />
  </Svg>
);
export const FaBaby = (p) => (
  <Svg {...p}>
    <Circle cx="9" cy="9" r="1" />
    <Circle cx="15" cy="9" r="1" />
    <Path d="M9 14c1 1 5 1 6 0" />
    <Path d="M12 5a7 7 0 0 0-7 7c0 4 3 7 7 7s7-3 7-7a7 7 0 0 0-7-7z" />
  </Svg>
);
export const FaChild = (p) => (
  <Svg {...p}>
    <Circle cx="12" cy="5" r="2.5" />
    <Path d="M12 8v8" />
    <Path d="M8 10h8" />
    <Path d="M9 20l3-4 3 4" />
  </Svg>
);
export const FaFistRaised = (p) => (
  <Svg {...p}>
    <Path d="M8 12V5a1 1 0 0 1 2 0v4" />
    <Path d="M10 7V4a1 1 0 0 1 2 0v6" />
    <Path d="M12 7V3.5a1 1 0 0 1 2 0V9" />
    <Path d="M14 7a1 1 0 0 1 2 0v5.5" />
    <Path d="M8 12a4 4 0 0 1 8 0v1a4 4 0 0 1-8 0z" />
  </Svg>
);
export const FaVenus = (p) => (
  <Svg {...p}>
    <Circle cx="12" cy="10" r="5" />
    <Path d="M12 15v7" />
    <Path d="M9 19h6" />
    <Path d="M8 5 5 2M12 2 9 5M16 5l3-3" />
  </Svg>
);
export const FaGavel = (p) => (
  <Svg {...p}>
    <Path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L11 10" />
    <Path d="m16 16 6-6" />
    <Path d="m8 8 6-6" />
    <Path d="m9 7 8 8" />
    <Path d="m21 11-8-8" />
  </Svg>
);
export const FaAmbulance = (p) => (
  <Svg {...p}>
    <Path d="M6 18a2 2 0 0 0 2 2h.5" />
    <Path d="M15 18a2 2 0 0 0 2 2h.5" />
    <Path d="M2 15V7h12v10" />
    <Path d="M14 9h4l3 3v4" />
    <Path d="M18 12v3h3" />
  </Svg>
);
export const FaHospital = (p) => (
  <Svg {...p}>
    <Path d="M4 21V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v17" />
    <Path d="M12 7v8" />
    <Path d="M8 11h8" />
    <Path d="M3 21h18" />
  </Svg>
);
export const FaGamepad = (p) => (
  <Svg {...p}>
    <Path d="M6 11h4M8 9v4" />
    <Path d="M15.5 11h.01" />
    <Path d="M18 9h.01" />
    <Path d="M6 7h12a3 3 0 0 1 3 3v3a4 4 0 0 1-7 2l-1-1h-2l-1 1a4 4 0 0 1-7-2v-3a3 3 0 0 1 3-3z" />
  </Svg>
);
export const FaVirus = (p) => (
  <Svg {...p}>
    <Circle cx="12" cy="12" r="4" />
    <Path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
  </Svg>
);
export const FaFish = (p) => (
  <Svg {...p}>
    <Path d="M6.5 12c2.5-4 5.5-6 9-6a12 12 0 0 1 4 2l1 2-1 2a12 12 0 0 1-4 2c-3.5 0-6.5-2-9-6z" />
    <Path d="M6.5 12a8 8 0 0 1-3.5 2c0-4 1-6 3.5-8" />
    <Path d="M19 12h.01" />
  </Svg>
);
export const FaPaw = (p) => (
  <Svg {...p}>
    <Circle cx="9" cy="6" r="1.6" />
    <Circle cx="15" cy="6" r="1.6" />
    <Path d="M5.5 10a1.9 1.9 0 0 1 2.6 0l-1.3 3.2z" />
    <Path d="M18.5 10a1.9 1.9 0 0 0-2.6 0l1.3 3.2z" />
    <Path d="M12 10c-3 0-5.5 2.5-5.5 5 0 2 1 3.5 3 3.5 1 0 1.7-1 2.5-1s1.5 1 2.5 1c2 0 3-1.5 3-3.5 0-2.5-2.5-5-5.5-5z" />
  </Svg>
);
export const FaTractor = (p) => (
  <Svg {...p}>
    <Circle cx="7" cy="17" r="2.5" />
    <Path d="M9.5 17V8" />
    <Path d="M9.5 8h4l5 5" />
    <Path d="M18.5 13v2" />
    <Circle cx="18" cy="17.5" r="2" />
    <Path d="M2 17h2.5M21 13h-4" />
  </Svg>
);
export const FaToilet = (p) => (
  <Svg {...p}>
    <Path d="M6 3h12a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2" />
    <Path d="M2 10h20" />
    <Path d="M4 10V5a2 2 0 0 1 2-2" />
    <Path d="M12 21V13" />
    <Path d="M9 21h6" />
  </Svg>
);
export const FaChalkboardTeacher = (p) => (
  <Svg {...p}>
    <Path d="M3 3h18" />
    <Rect x="3" y="4" w="18" h="13" rx="1" />
    <Path d="m10 13 2 2 4-4" />
    <Path d="M15 17 12 21" />
    <Path d="M9 21h3" />
  </Svg>
);
export const FaBullseye = (p) => (
  <Svg {...p}>
    <Circle />
    <Circle cx="12" cy="12" r="6" />
    <Circle cx="12" cy="12" r="2" />
  </Svg>
);
export const FaGem = (p) => (
  <Svg {...p}>
    <Path d="M6 3h12l3 6-9 12L3 9z" />
    <Path d="M3 9h18" />
    <Path d="M12 21 8 9 10 3" />
    <Path d="M12 21 16 9 14 3" />
  </Svg>
);
export const FaComments = (p) => (
  <Svg {...p}>
    <Path d="M21 11a8 8 0 0 1-8 8 8.06 8.06 0 0 1-3.2-.65L3 21l1.65-6.5A8 8 0 1 1 21 11z" />
    <Path d="M8 9h8M8 13h5" />
  </Svg>
);
export const FaLock = (p) => (
  <Svg {...p}>
    <Rect x="3" y="11" w="18" h="11" rx="2" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);
export const FaTrophy = (p) => (
  <Svg {...p}>
    <Path d="M8 21h8" />
    <Path d="M12 17v4" />
    <Path d="M7 4h10v6a5 5 0 0 1-10 0z" />
    <Path d="M17 6h3a0 0 0 0 0 0 0v1a4 4 0 0 1-3 3" />
    <Path d="M7 6H4v1a4 4 0 0 0 3 3" />
  </Svg>
);
export const FaParking = (p) => (
  <Svg {...p}>
    <Rect x="3" y="3" w="18" h="18" rx="2" />
    <Path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
  </Svg>
);
export const FaClock = (p) => (
  <Svg {...p}>
    <Circle />
    <Path d="M12 6v6l4 2" />
  </Svg>
);
export const FaEye = (p) => (
  <Svg {...p}>
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);
