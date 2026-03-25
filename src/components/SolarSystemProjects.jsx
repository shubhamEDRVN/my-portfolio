import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Server, Zap, ShieldCheck, Activity, Cpu, Bot, Network, Settings,
  Palette, Ticket, Camera, MessageSquare, Tv, Search, Star, Database,
  Moon, Sun, X, ExternalLink, Github, Sparkles, Send,
  Cloud, Code, Layers, Globe, Lock, Smartphone, Terminal, Wifi, Eye,
  Mic, BarChart, DollarSign, Brain, CreditCard, Users, Home, MapPin,
  Calendar, BookOpen, Clock, Mail, MousePointer, Grid3x3, Play, Building
} from './LucideIcons.jsx';

const GEMINI_API_KEY = "AIzaSyAXUFhTW6r_NvPQOWY3y01uROCxel4hYWY";

const IconMap = {
  "server": Server, "zap": Zap, "shield-check": ShieldCheck, "activity": Activity,
  "cpu": Cpu, "bot": Bot, "network": Network, "settings": Settings,
  "palette": Palette, "ticket": Ticket, "camera": Camera, "message-square": MessageSquare,
  "tv": Tv, "search": Search, "star": Star, "database": Database,
  "cloud": Cloud, "code": Code, "layers": Layers, "globe": Globe,
  "lock": Lock, "smartphone": Smartphone, "terminal": Terminal, "wifi": Wifi, "eye": Eye,
  "mic": Mic, "bar-chart": BarChart, "dollar-sign": DollarSign, "brain": Brain,
  "credit-card": CreditCard, "users": Users, "home": Home, "map-pin": MapPin,
  "calendar": Calendar, "book-open": BookOpen, "clock": Clock, "mail": Mail,
  "mouse-pointer": MousePointer, "grid-3x3": Grid3x3, "play": Play, "building": Building,
};

const PROJECTS = [
  {
    id: "seva-ai", name: "SevaAI", category: "AI · Voice Assistant",
    role: "Lead Developer", year: "2025", subtitle: "Voice-based AI for Municipal Corporation — bridging citizens & government.",
    desc: "A real-time intelligent voice assistant built for municipal corporations to solve citizen issues. Uses MERN stack + Gemini AI to provide smart, instant responses, bridging the gap between people and government services.",
    color: "#00E5FF", radius: 26, orbitR: 190, speed: 0.0010,
    tech: ["MongoDB", "Express", "React", "Node.js", "Gemini AI", "WebSockets"],
    stats: [{ v: "Real-Time", k: "Voice AI" }, { v: "Gemini", k: "Integration" }, { v: "MERN", k: "Stack" }],
    moons: [{ name: "Voice Engine", color: "#80DEEA" }, { name: "Gemini Core", color: "#4DD0E1" }, { name: "Gov Gateway", color: "#00BCD4" }],
    imgs: ["mic", "zap", "bot", "globe"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/SevaAi", hasRing: false
  },
  {
    id: "profitpaybook", name: "ProfitPaybook Pro", category: "Freelance · SaaS",
    role: "Full Stack Developer", year: "2025", subtitle: "Business estimation & learning platform for a real client.",
    desc: "A freelance project built for a client to manage business estimations, track profits, and provide a structured learning platform. MERN stack with Gemini AI integration for smart business insights.",
    color: "#FFEB3B", radius: 22, orbitR: 280, speed: 0.0008,
    tech: ["MongoDB", "Express", "React", "Node.js", "Gemini AI"],
    stats: [{ v: "Live", k: "Client Project" }, { v: "AI", k: "Powered" }, { v: "SaaS", k: "Platform" }],
    moons: [{ name: "Estimator", color: "#FFF176" }, { name: "Learning Hub", color: "#FFD54F" }],
    imgs: ["bar-chart", "dollar-sign", "brain", "layers"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/ClientProject", hasRing: false
  },
  {
    id: "bookmyshow", name: "BookMyShow Clone", category: "Full Stack · MERN",
    role: "Full Stack Developer", year: "2024", subtitle: "Real-time event & ticket booking platform.",
    desc: "A full MERN-stack clone of BookMyShow with real-time seat selection, payment simulation, event management, and a production-grade booking flow with MongoDB backend.",
    color: "#BF5AF2", radius: 28, orbitR: 370, speed: 0.0006,
    tech: ["MongoDB", "Express", "React", "Node.js"],
    stats: [{ v: "10K+", k: "Simulated Users" }, { v: "Real-Time", k: "Seat Select" }, { v: "Full", k: "Booking Flow" }],
    moons: [{ name: "Seat Engine", color: "#E040FB" }, { name: "Payment Gate", color: "#EA80FC" }, { name: "Event DB", color: "#CE93D8" }],
    imgs: ["ticket", "database", "credit-card", "users"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/BookMyShowClone", hasRing: true
  },
  {
    id: "propdeals", name: "PropDeals", category: "Java · Web App",
    role: "Backend Developer", year: "2024", subtitle: "Buy & sell property platform built in Java.",
    desc: "A property buying and selling platform built using Java, JSP, and Java Beans with a structured MVC architecture. Features property listings, search, and user management.",
    color: "#FF7043", radius: 20, orbitR: 460, speed: 0.00045,
    tech: ["Java", "JSP", "Java Beans", "MySQL", "HTML/CSS"],
    stats: [{ v: "MVC", k: "Architecture" }, { v: "Java EE", k: "Stack" }, { v: "Full CRUD", k: "Listings" }],
    moons: [{ name: "Listing Engine", color: "#FF8A65" }, { name: "Search Module", color: "#FFAB91" }],
    imgs: ["home", "search", "database", "map-pin"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/Portfolio", hasRing: false
  },
  {
    id: "backup-planner", name: "Online Backup Planner", category: "Java · Education",
    role: "Full Stack Developer", year: "2024", subtitle: "Student platform for catching up on missed lectures.",
    desc: "A student backup platform for missed lectures built using Java, Struts framework, Hibernate ORM, with HTML/CSS frontend. Allows students to schedule catch-up sessions and access missed content.",
    color: "#66BB6A", radius: 18, orbitR: 550, speed: 0.00035,
    tech: ["Java", "Struts", "Hibernate", "HTML", "CSS", "MySQL"],
    stats: [{ v: "Struts", k: "MVC" }, { v: "Hibernate", k: "ORM" }, { v: "Student", k: "Focused" }],
    moons: [{ name: "Schedule Engine", color: "#81C784" }, { name: "Content Store", color: "#A5D6A7" }],
    imgs: ["calendar", "book-open", "users", "clock"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/OnlinebackupPlanner", hasRing: false
  },
  {
    id: "jarvis", name: "JARVIS", category: "Python · AI",
    role: "Solo Developer", year: "2024", subtitle: "Personal voice-controlled AI assistant.",
    desc: "A JARVIS-style personal assistant built with Python libraries. Operates entirely via voice control — performs tasks, answers questions, writes notes, sends emails, and even shuts down the PC.",
    color: "#29B6F6", radius: 22, orbitR: 640, speed: 0.00028,
    tech: ["Python", "SpeechRecognition", "pyttsx3", "smtplib", "OpenAI"],
    stats: [{ v: "Voice", k: "Controlled" }, { v: "50+", k: "Commands" }, { v: "Full", k: "OS Control" }],
    moons: [{ name: "Voice Engine", color: "#4FC3F7" }, { name: "Mail Module", color: "#81D4FA" }, { name: "Task Runner", color: "#B3E5FC" }],
    imgs: ["mic", "terminal", "mail", "cpu"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/Friday", hasRing: false
  },
  {
    id: "chess3d", name: "Chess 3D", category: "3D · Game Dev",
    role: "Solo Developer", year: "2024", subtitle: "Fully functional chess game with 3D frontend.",
    desc: "A fully functional chess application with a stunning 3D frontend and a backend powered by EJS. Features complete chess rules, piece animations, and multiplayer support.",
    color: "#EC407A", radius: 24, orbitR: 740, speed: 0.00022,
    tech: ["Three.js", "JavaScript", "EJS", "Node.js", "Express"],
    stats: [{ v: "3D", k: "Frontend" }, { v: "Full Rules", k: "Engine" }, { v: "EJS", k: "Backend" }],
    moons: [{ name: "3D Renderer", color: "#F48FB1" }, { name: "Rules Engine", color: "#F06292" }, { name: "Move AI", color: "#AD1457" }],
    imgs: ["layers", "cpu", "grid-3x3", "play"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/chess-frontend", hasRing: true
  },
  {
    id: "hotel-mgmt", name: "Hotel Booking Manager", category: "Java · Desktop",
    role: "Solo Developer", year: "2023", subtitle: "Desktop software for hotel booking management.",
    desc: "A Java-based desktop application for managing hotel bookings, room allocation, guest management, and billing. Built for practical use with a clean Swing/AWT interface.",
    color: "#FFA726", radius: 16, orbitR: 850, speed: 0.00018,
    tech: ["Java", "Swing", "AWT", "MySQL", "JDBC"],
    stats: [{ v: "Desktop", k: "App" }, { v: "Java", k: "Powered" }, { v: "Full", k: "Booking Flow" }],
    moons: [{ name: "Room Manager", color: "#FFB74D" }, { name: "Billing Module", color: "#FFD54F" }],
    imgs: ["building", "calendar", "users", "dollar-sign"],
    liveUrl: "#", githubUrl: "https://github.com/shubhamEDRVN/HotelBoookingSoftware", hasRing: false
  },
  {
    id: "eye-mouse", name: "Eye-Controlled Mouse", category: "Python · Computer Vision",
    role: "Solo Developer", year: "2024", subtitle: "Control your mouse with just your right eye.",
    desc: "A Python-based accessibility tool that uses computer vision to track eye movements via webcam and translate them into mouse cursor movements — hands-free interaction powered by OpenCV.",
    color: "#AB47BC", radius: 18, orbitR: 940, speed: 0.00015,
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    stats: [{ v: "30fps", k: "Tracking" }, { v: "Eye-Only", k: "Control" }, { v: "Webcam", k: "Powered" }],
    moons: [{ name: "Vision Core", color: "#CE93D8" }, { name: "Input Bridge", color: "#BA68C8" }],
    imgs: ["eye", "camera", "mouse-pointer", "zap"],
    liveUrl: "#", githubUrl: "#", hasRing: false
  },
];

const METEORS = [
  {
    name: "AWS Student Website", subtitle: "Club management platform with team features",
    color: "#FF9900", glowColor: "#FFB74D", speed: 0.0018,
    semiMajor: 980, semiMinor: 240, angle: Math.PI / 4,
    githubUrl: "https://github.com/shubhamEDRVN/AWS-Website", tech: ["React", "Node.js", "AWS"],
  },
  {
    name: "SCD 2025", subtitle: "Student Community Day official website",
    color: "#00E5FF", glowColor: "#80DEEA", speed: 0.0025,
    semiMajor: 1050, semiMinor: 280, angle: -Math.PI / 5,
    githubUrl: "#", tech: ["React", "Tailwind", "Vite"],
  },
];

const SKILLS_LIST = [
  "React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind",
  "Node.js", "Express", "Java", "Python", "Spring Boot", "Struts", "Hibernate",
  "MongoDB", "MySQL", "SQL",
  "Gemini AI", "OpenAI", "OpenCV", "MediaPipe",
  "Git", "GitHub", "Postman", "VS Code",
  "EJS", "JSP", "Three.js", "GSAP", "Framer Motion", "Bootstrap",
];

const SKILL_COLORS = {
  "React": "#61DAFB", "Next.js": "#FFFFFF", "TypeScript": "#3178C6", "JavaScript": "#F7DF1E",
  "HTML": "#E34F26", "CSS": "#1572B6", "Tailwind": "#06B6D4",
  "Node.js": "#339933", "Express": "#FFFFFF", "Java": "#ED8B00", "Python": "#3776AB",
  "Spring Boot": "#6DB33F", "Struts": "#FF5722", "Hibernate": "#59666C",
  "MongoDB": "#47A248", "MySQL": "#4479A1", "SQL": "#CC2927",
  "Gemini AI": "#8E75FF", "OpenAI": "#00A67E", "OpenCV": "#5C3EE8", "MediaPipe": "#0097A7",
  "Git": "#F05032", "GitHub": "#FFFFFF", "Postman": "#FF6C37", "VS Code": "#007ACC",
  "EJS": "#B4CA65", "JSP": "#007396", "Three.js": "#000000",
  "GSAP": "#88CE02", "Framer Motion": "#0055FF", "Bootstrap": "#7952B3",
};

const ASTEROID_COUNT = 300;
const ASTEROID_BELT_INNER = 330;
const ASTEROID_BELT_OUTER = 410;

/* =========================================================================
   HOVER INFO CARD (Canvas)
   ========================================================================= */
function drawHoverCard(ctx, planet, cardTargetX, cardTargetY, alpha, currentTheme) {
  if (alpha < 0.02) return;
  const cardW = 290, cardH = 165, padding = 16, r = 14;

  let cardX = cardTargetX;
  let cardY = cardTargetY;

  // Keep in bounds
  if (cardX + cardW > window.innerWidth - 20) cardX = cardTargetX - cardW - planet.radius * 2 - 40;
  if (cardX < 20) cardX = 20;
  if (cardY < 20) cardY = 20;
  if (cardY + cardH > window.innerHeight - 20) cardY = window.innerHeight - cardH - 20;

  // Round to prevent sub-pixel jitter
  cardX = Math.round(cardX);
  cardY = Math.round(cardY);

  ctx.save();
  ctx.globalAlpha = alpha;

  // Rounded rect background
  ctx.beginPath();
  ctx.moveTo(cardX + r, cardY);
  ctx.lineTo(cardX + cardW - r, cardY);
  ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + r);
  ctx.lineTo(cardX + cardW, cardY + cardH - r);
  ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - r, cardY + cardH);
  ctx.lineTo(cardX + r, cardY + cardH);
  ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - r);
  ctx.lineTo(cardX, cardY + r);
  ctx.quadraticCurveTo(cardX, cardY, cardX + r, cardY);
  ctx.closePath();

  ctx.fillStyle = currentTheme === 'dark' ? 'rgba(6, 6, 14, 0.94)' : 'rgba(255, 255, 255, 0.96)';
  ctx.fill();
  ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Top accent bar
  ctx.beginPath();
  ctx.moveTo(cardX + r, cardY);
  ctx.lineTo(cardX + cardW - r, cardY);
  ctx.strokeStyle = planet.color;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const textColor = currentTheme === 'dark' ? '#f3f4f6' : '#0f172a';
  const subColor = currentTheme === 'dark' ? '#9ca3af' : '#64748b';
  let ty = cardY + padding + 4;

  // Dot + name
  ctx.beginPath();
  ctx.arc(cardX + padding + 5, ty + 4, 5, 0, Math.PI * 2);
  ctx.fillStyle = planet.color;
  ctx.fill();

  ctx.fillStyle = textColor;
  ctx.font = '700 15px "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(planet.name, cardX + padding + 16, ty + 8);
  ty += 24;

  ctx.fillStyle = subColor;
  ctx.font = '500 11px "Inter", sans-serif';
  ctx.fillText(`${planet.role}  \u00B7  ${planet.category}  \u00B7  ${planet.year}`, cardX + padding, ty + 4);
  ty += 22;

  // Divider
  ctx.beginPath();
  ctx.moveTo(cardX + padding, ty);
  ctx.lineTo(cardX + cardW - padding, ty);
  ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ty += 14;

  // Stats
  const statsW = (cardW - padding * 2) / planet.stats.length;
  planet.stats.forEach((s, i) => {
    const sx = cardX + padding + (i * statsW);
    ctx.fillStyle = planet.color;
    ctx.font = '700 14px "Space Grotesk", sans-serif';
    ctx.fillText(s.v, sx, ty + 4);
    ctx.fillStyle = subColor;
    ctx.font = '500 9px "Inter", sans-serif';
    ctx.fillText(s.k, sx, ty + 18);
  });
  ty += 34;

  // Tech tags
  ctx.font = '500 9px "Inter", sans-serif';
  let tagX = cardX + padding;
  planet.tech.forEach((t) => {
    const tw = ctx.measureText(t).width + 14;
    if (tagX + tw > cardX + cardW - padding) return;
    ctx.beginPath();
    ctx.roundRect(tagX, ty, tw, 18, 4);
    ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = textColor;
    ctx.fillText(t, tagX + 7, ty + 12);
    tagX += tw + 6;
  });

  // Click hint
  ctx.fillStyle = subColor;
  ctx.font = '500 9px "Inter", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Click to explore \u2192', cardX + cardW - padding, cardY + cardH - 12);
  ctx.textAlign = 'left';

  ctx.restore();
}

/* =========================================================================
   ASTEROID TOOLTIP (Canvas)
   ========================================================================= */
function drawAsteroidTooltip(ctx, skill, ax, ay, alpha, currentTheme) {
  if (alpha < 0.02) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = '600 10px "Space Grotesk", sans-serif';
  const tw = ctx.measureText(skill).width + 16;
  const th = 24;
  const tx = Math.round(ax - tw / 2);
  const ty = Math.round(ay - 20);

  ctx.beginPath();
  ctx.roundRect(tx, ty, tw, th, 6);
  ctx.fillStyle = currentTheme === 'dark' ? 'rgba(6,6,14,0.9)' : 'rgba(255,255,255,0.95)';
  ctx.fill();
  ctx.strokeStyle = SKILL_COLORS[skill] || (currentTheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)');
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = SKILL_COLORS[skill] || (currentTheme === 'dark' ? '#f3f4f6' : '#0f172a');
  ctx.textAlign = 'center';
  ctx.fillText(skill, tx + tw / 2, ty + 16);
  ctx.textAlign = 'left';
  ctx.restore();
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */
const SolarSystemProjects = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [aiMode, setAiMode] = useState('idle');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const canvasRef = useRef(null);
  const requestRef = useRef();
  const timeRef = useRef(0);
  const sunScaleRef = useRef(1);
  const mouseRef = useRef({ x: -1000, y: -1000, rx: 0, ry: 0 });
  const starsRef = useRef([]);
  const asteroidsRef = useRef([]);
  const ripplesRef = useRef([]);
  const planetStatesRef = useRef({});
  const isMobileRef = useRef(false);
  const canvasRectRef = useRef(null);
  const isIntersectingRef = useRef(true); // PERFORMANCE FIX

  // Smoothed hover state refs
  const hoverAlphaRef = useRef(0);
  const cardPosRef = useRef({ x: 0, y: 0 });
  const hoveredAsteroidRef = useRef(null);
  const asteroidAlphaRef = useRef(0);

  const themeRef = useRef(theme);
  const isPanelOpenRef = useRef(isPanelOpen);
  const selectedProjectRef = useRef(selectedProject);
  const hoveredPlanetRef = useRef(null);

  useEffect(() => { themeRef.current = theme; }, [theme]);
  useEffect(() => { isPanelOpenRef.current = isPanelOpen; }, [isPanelOpen]);
  useEffect(() => { selectedProjectRef.current = selectedProject; }, [selectedProject]);
  useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(t); }, []);

  const initStars = useCallback((w, h) => {
    const stars = [];
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * w * 1.5 - w * 0.25,
        y: Math.random() * h * 1.5 - h * 0.25,
        size: Math.random() * 1.5 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        depth: Math.random() * 0.8 + 0.2,
        ix: 0, iy: 0
      });
    }
    starsRef.current = stars;
  }, []);

  const initAsteroids = useCallback(() => {
    const a = [];
    for (let i = 0; i < ASTEROID_COUNT; i++) {
      a.push({
        angle: Math.random() * Math.PI * 2,
        dist: ASTEROID_BELT_INNER + Math.random() * (ASTEROID_BELT_OUTER - ASTEROID_BELT_INNER),
        size: Math.random() * 2.5 + 0.6,
        speed: (Math.random() * 0.00015 + 0.00008) * (Math.random() > 0.5 ? 1 : -1),
        brightness: Math.random() * 0.5 + 0.3,
        skill: SKILLS_LIST[i % SKILLS_LIST.length],
        // Cached position for hover detection
        sx: 0, sy: 0,
      });
    }
    asteroidsRef.current = a;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    PROJECTS.forEach(p => {
      planetStatesRef.current[p.id] = { pulse: 1, glowAlpha: 0 };
    });

    // BUG FIX #1: Canvas rect tracking
    const updateRect = () => {
      canvasRectRef.current = canvas.getBoundingClientRect();
    };

    const handleResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      isMobileRef.current = w <= 768;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars(w, h);
      initAsteroids();
      updateRect();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateRect);
    handleResize();

    // PERFORMANCE FIX: Only render when visible
    const observer = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    if (canvasRef.current) observer.observe(canvasRef.current);

    // BUG FIX #1: Use canvas-local coordinates
    const getCanvasLocalCoords = (e) => {
      const rect = canvasRectRef.current || canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseMove = (e) => {
      const { x, y } = getCanvasLocalCoords(e);
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.rx = ((x / window.innerWidth) - 0.5) * 36;
      mouseRef.current.ry = ((y / window.innerHeight) - 0.5) * 36;
    };

    let lastTap = 0;
    const onTouchStart = (e) => {
      const { x, y } = getCanvasLocalCoords(e.touches[0]);
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      const now = Date.now(), d = now - lastTap;
      if (d < 300 && d > 0) handleCanvasClick();
      lastTap = now;
    };

    // BUG FIX #3: Recompute closest planet at click time
    const handleCanvasClick = () => {
      const mouse = mouseRef.current;
      const isMobile = isMobileRef.current;
      const width = window.innerWidth, height = window.innerHeight;
      const fitScale = (height * 0.45) / 680;
      const scale = isMobile ? Math.min(0.55, fitScale) : Math.min(1.2, fitScale);
      const cx = width / 2, cy = height / 2;
      const parallaxScale = isMobile ? 1 : 2;
      const sysX = Math.round(cx - mouse.rx * parallaxScale);
      const sysY = Math.round(cy - mouse.ry * parallaxScale);
      const time = timeRef.current;

      let clicked = null;
      let minDist = Infinity;
      PROJECTS.forEach((p, i) => {
        const orbitRadius = p.orbitR * scale;
        const angle = time * p.speed + (i * Math.PI * 2 / PROJECTS.length);
        const px = sysX + Math.cos(angle) * orbitRadius;
        const py = sysY + Math.sin(angle) * orbitRadius;
        const dx = mouse.x - px, dy = mouse.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const scaledRadius = p.radius * scale * 2.4;
        const hitR = scaledRadius + (isMobile ? 22 : 16);
        if (dist < hitR && dist < minDist) {
          minDist = dist;
          clicked = p;
        }
      });

      if (clicked) {
        planetStatesRef.current[clicked.id].pulse = 1.5;
        setSelectedProject(clicked);
        setIsPanelOpen(true);
        setAiMode('idle');
      } else {
        // Check meteors
        let clickedMeteor = null;
        METEORS.forEach((m, i) => {
          const cTime = time * m.speed + (i * 100);
          const a = m.semiMajor * scale, b = m.semiMinor * scale;
          const ex = Math.cos(cTime) * a, ey = Math.sin(cTime) * b;
          const mx = sysX + ex * Math.cos(m.angle) - ey * Math.sin(m.angle);
          const my = sysY + ex * Math.sin(m.angle) + ey * Math.cos(m.angle);
          const dx = mouse.x - mx, dy = mouse.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 25) clickedMeteor = m;
        });

        if (clickedMeteor && clickedMeteor.githubUrl && clickedMeteor.githubUrl !== '#') {
          window.open(clickedMeteor.githubUrl, '_blank');
        } else {
          setIsPanelOpen(false);
          setSelectedProject(null);
          ripplesRef.current.push({ x: mouse.x, y: mouse.y, radius: 0, alpha: 1 });
        }
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('click', handleCanvasClick);

    /* ==================== ANIMATION LOOP ==================== */
    const animate = () => {
      if (!isIntersectingRef.current) {
        requestRef.current = requestAnimationFrame(animate);
        return; // Skip heavy canvas drawing when off-screen
      }
      const width = window.innerWidth, height = window.innerHeight;
      const cx = width / 2, cy = height / 2;
      const isMobile = isMobileRef.current;
      const mouse = mouseRef.current;
      const currentTheme = themeRef.current;
      const fitScale = (height * 0.45) / 680;
      const scale = isMobile ? Math.min(0.55, fitScale) : Math.min(1.2, fitScale);

      const colors = currentTheme === 'dark'
        ? { bg: '#030305', star: 'rgba(255,255,255,', orbit: 'rgba(255,255,255,0.04)', orbitHover: 'rgba(255,255,255,0.14)' }
        : { bg: '#f8fafc', star: 'rgba(15,23,42,', orbit: 'rgba(15,23,42,0.06)', orbitHover: 'rgba(15,23,42,0.14)' };

      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);

      // Time
      const targetSpeed = isPanelOpenRef.current ? 0.2 : 1.0;
      sunScaleRef.current += (targetSpeed - sunScaleRef.current) * 0.05;
      timeRef.current += sunScaleRef.current;
      const time = timeRef.current;
      const parallaxScale = isMobile ? 1 : 2;
      const sysX = Math.round(cx - mouse.rx * parallaxScale);
      const sysY = Math.round(cy - mouse.ry * parallaxScale);

      // ─── STARS ───
      starsRef.current.forEach(s => {
        s.twinkle += s.speed;
        let alpha = (Math.sin(s.twinkle) + 1) / 2 * 0.8 + 0.2;
        let sx = s.x - (mouse.rx * s.depth * 2);
        let sy = s.y - (mouse.ry * s.depth * 2);
        const dx = mouse.x - sx, dy = mouse.y - sy;
        const distSq = dx * dx + dy * dy;
        const ir = isMobile ? 80 : 150;
        const irSq = ir * ir;

        if (distSq < irSq) {
          const dist = Math.sqrt(distSq);
          const f = (ir - dist) / ir;
          s.ix -= (dx / dist) * f * 1.5;
          s.iy -= (dy / dist) * f * 1.5;
          alpha = 1;
          if (f > 0.2 && !isPanelOpenRef.current) {
            ctx.beginPath();
            ctx.moveTo(sx + s.ix, sy + s.iy);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = colors.star + (f * 0.4) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        s.ix *= 0.92;
        s.iy *= 0.92;
        sx += s.ix;
        sy += s.iy;
        ctx.fillStyle = colors.star + alpha + ')';
        ctx.beginPath();
        ctx.arc(Math.round(sx), Math.round(sy), s.size + (distSq < irSq ? 1 : 0), 0, Math.PI * 2);
        ctx.fill();
      });

      // ─── RIPPLES ───
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 4;
        r.alpha -= 0.03;
        if (r.alpha <= 0) { ripplesRef.current.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = currentTheme === 'dark' ? `rgba(255,255,255,${r.alpha * 0.2})` : `rgba(15,23,42,${r.alpha * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ─── ASTEROIDS ───
      let currentAsteroidHover = null;
      asteroidsRef.current.forEach(a => {
        a.angle += a.speed * sunScaleRef.current;
        const ax = Math.round(sysX + Math.cos(a.angle) * a.dist * scale);
        const ay = Math.round(sysY + Math.sin(a.angle) * a.dist * scale);
        a.sx = ax; a.sy = ay;

        const skillColor = SKILL_COLORS[a.skill];
        const baseColor = skillColor
          ? skillColor
          : (currentTheme === 'dark' ? `rgba(255,255,255,${a.brightness * 0.5})` : `rgba(15,23,42,${a.brightness * 0.5})`);

        // Check hover (squared distance, no sqrt)
        const adx = mouse.x - ax, ady = mouse.y - ay;
        const adistSq = adx * adx + ady * ady;
        const hitR = isMobile ? 20 : 14;
        if (adistSq < hitR * hitR && !isPanelOpenRef.current) {
          currentAsteroidHover = a;
          // Draw larger glowing asteroid when hovered
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = skillColor || '#fff';
          ctx.beginPath();
          ctx.arc(ax, ay, a.size * scale + 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.fillStyle = baseColor;
        ctx.globalAlpha = skillColor ? 0.6 : a.brightness * 0.4;
        ctx.beginPath();
        ctx.arc(ax, ay, a.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      hoveredAsteroidRef.current = currentAsteroidHover;

      // ─── COMETS / METEORS — BUG FIX #4: Blinking glow + labels ───
      METEORS.forEach((c, i) => {
        const cTime = time * c.speed + (i * 100);
        const a = c.semiMajor * scale, b = c.semiMinor * scale;
        const ex = Math.cos(cTime) * a, ey = Math.sin(cTime) * b;
        const cxp = Math.round(sysX + ex * Math.cos(c.angle) - ey * Math.sin(c.angle));
        const cyp = Math.round(sysY + ex * Math.sin(c.angle) + ey * Math.cos(c.angle));

        // Tail
        ctx.beginPath();
        for (let j = 0; j < 25; j++) {
          const pt = cTime - (j * 0.02);
          const pex = Math.cos(pt) * a, pey = Math.sin(pt) * b;
          const px2 = Math.round(sysX + pex * Math.cos(c.angle) - pey * Math.sin(c.angle));
          const py2 = Math.round(sysY + pex * Math.sin(c.angle) + pey * Math.cos(c.angle));
          if (j === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
        }
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        // Blink effect
        const blink = (Math.sin(time * 0.06 + i * 1.7) + 1) / 2;
        const coreAlpha = 0.5 + blink * 0.5;
        const glowRadius = 12 + blink * 14;

        // Glow aura
        const glowGrad = ctx.createRadialGradient(cxp, cyp, 0, cxp, cyp, glowRadius);
        glowGrad.addColorStop(0, c.glowColor + 'CC');
        glowGrad.addColorStop(0.5, c.color + '66');
        glowGrad.addColorStop(1, 'transparent');
        ctx.globalAlpha = coreAlpha * 0.5;
        ctx.fillStyle = glowGrad;
        ctx.beginPath(); ctx.arc(cxp, cyp, glowRadius, 0, Math.PI * 2); ctx.fill();

        // Core dot
        ctx.globalAlpha = coreAlpha;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(cxp, cyp, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = c.color;
        ctx.beginPath(); ctx.arc(cxp, cyp, 5, 0, Math.PI * 2); ctx.fill();

        // Label
        ctx.globalAlpha = 0.7 + blink * 0.3;
        ctx.fillStyle = c.color;
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(c.name, cxp + 12, cyp + 4);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '400 9px "Inter", sans-serif';
        ctx.fillText(c.subtitle, cxp + 12, cyp + 16);

        ctx.globalAlpha = 1;
      });

      // ─── PLANETS ───
      let currentlyHovered = null;
      PROJECTS.forEach((p, i) => {
        const orbitRadius = p.orbitR * scale;
        const direction = i % 2 === 0 ? 1 : -1; // Alternating orbit direction
        const angle = time * p.speed * direction + (i * Math.PI * 2 / PROJECTS.length);
        const px = Math.round(sysX + Math.cos(angle) * orbitRadius);
        const py = Math.round(sysY + Math.sin(angle) * orbitRadius);
        const state = planetStatesRef.current[p.id] || { pulse: 1, glowAlpha: 0 };

        // BUG FIX #2: Scaled hit radius
        const dx = mouse.x - px, dy = mouse.y - py;
        const distSq = dx * dx + dy * dy;
        const scaledRadius = p.radius * scale * 2.4;
        const hitPadding = isMobile ? 22 : 16;
        const hitR = scaledRadius + hitPadding;
        const isHovered = distSq < (hitR * hitR) && !isPanelOpenRef.current;
        if (isHovered) currentlyHovered = { data: p, x: px, y: py };

        // Orbit
        ctx.beginPath();
        ctx.arc(sysX, sysY, orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? colors.orbitHover : colors.orbit;
        ctx.lineWidth = isHovered ? 1.5 : 1;
        ctx.stroke();

        // Smooth state transitions
        const targetGlow = (isHovered || selectedProjectRef.current?.id === p.id) ? 1 : 0;
        state.glowAlpha += (targetGlow - state.glowAlpha) * 0.12;
        if (state.pulse > 1) state.pulse = Math.max(1, state.pulse - 0.04);
        const currentRadius = p.radius * state.pulse;

        // Glow
        if (state.glowAlpha > 0.01) {
          const glowGrad = ctx.createRadialGradient(px, py, currentRadius, px, py, currentRadius + 28);
          glowGrad.addColorStop(0, p.color);
          glowGrad.addColorStop(1, 'transparent');
          ctx.globalAlpha = state.glowAlpha * 0.35;
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(px, py, currentRadius + 28, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Saturn rings
        if (p.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, 0.35);
          ctx.globalAlpha = 0.25;
          ctx.beginPath(); ctx.arc(0, 0, currentRadius + 14, 0, Math.PI * 2);
          ctx.strokeStyle = p.color; ctx.lineWidth = 3; ctx.stroke();
          ctx.globalAlpha = 0.12;
          ctx.beginPath(); ctx.arc(0, 0, currentRadius + 20, 0, Math.PI * 2);
          ctx.lineWidth = 2; ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        // Planet body
        const grad = ctx.createRadialGradient(px - currentRadius * 0.3, py - currentRadius * 0.3, 0, px, py, currentRadius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.2, p.color);
        grad.addColorStop(1, '#000000');
        ctx.beginPath();
        ctx.arc(px, py, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Texture bands
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, currentRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(px - currentRadius, py - currentRadius * 0.45, currentRadius * 2, currentRadius * 0.12);
        ctx.fillRect(px - currentRadius, py + currentRadius * 0.15, currentRadius * 2, currentRadius * 0.2);
        ctx.restore();

        // Moons
        if (p.moons) {
          p.moons.forEach((m, mi) => {
            const mOrbit = currentRadius + 18 + (mi * 14);
            const mDirection = mi % 2 === 0 ? 1 : -1;
            const mAngle = (time * p.speed * 3.5 * mDirection) + (mi * (Math.PI * 2 / p.moons.length));
            const mx = Math.round(px + Math.cos(mAngle) * mOrbit);
            const my = Math.round(py + Math.sin(mAngle) * mOrbit);
            ctx.beginPath();
            ctx.setLineDash([2, 4]);
            ctx.arc(px, py, mOrbit, 0, Math.PI * 2);
            ctx.strokeStyle = currentTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = m.color;
            ctx.fill();

            // Moon label (desktop only)
            if (!isMobile) {
              ctx.shadowColor = m.color;
              ctx.shadowBlur = 6;
              ctx.fillStyle = m.color;
              ctx.font = '500 8px "Inter", sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText(m.name, mx + 6, my + 3);
              ctx.shadowBlur = 0;
            }
          });
        }

        // Glowing planet label
        if (!isHovered && !isMobile) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12;
          ctx.fillStyle = p.color;
          ctx.font = '700 11px "Space Grotesk", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(p.name, px, py + currentRadius + 18);
          ctx.shadowBlur = 0;
        }
      });

      hoveredPlanetRef.current = currentlyHovered;

      // ─── HOVER CARD (smoothed) ───
      const targetAlpha = currentlyHovered ? 1 : 0;
      hoverAlphaRef.current += (targetAlpha - hoverAlphaRef.current) * 0.18;

      if (currentlyHovered) {
        const targetCX = currentlyHovered.x + currentlyHovered.data.radius + 22;
        const targetCY = currentlyHovered.y - 82;
        cardPosRef.current.x += (targetCX - cardPosRef.current.x) * 0.2;
        cardPosRef.current.y += (targetCY - cardPosRef.current.y) * 0.2;
      }

      if (hoverAlphaRef.current > 0.02 && currentlyHovered) {
        // Connection line from planet to card
        ctx.save();
        ctx.globalAlpha = hoverAlphaRef.current * 0.3;
        ctx.beginPath();
        ctx.moveTo(currentlyHovered.x, currentlyHovered.y);
        ctx.lineTo(Math.round(cardPosRef.current.x), Math.round(cardPosRef.current.y + 82));
        ctx.strokeStyle = currentlyHovered.data.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        drawHoverCard(ctx, currentlyHovered.data, Math.round(cardPosRef.current.x), Math.round(cardPosRef.current.y), hoverAlphaRef.current, currentTheme);
      }

      // ─── ASTEROID TOOLTIP ───
      const aTarget = hoveredAsteroidRef.current ? 1 : 0;
      asteroidAlphaRef.current += (aTarget - asteroidAlphaRef.current) * 0.2;
      if (hoveredAsteroidRef.current && asteroidAlphaRef.current > 0.02) {
        drawAsteroidTooltip(ctx, hoveredAsteroidRef.current.skill, hoveredAsteroidRef.current.sx, hoveredAsteroidRef.current.sy, asteroidAlphaRef.current, currentTheme);
      }

      // ─── SUN ───
      const baseSr = isMobile ? 30 : 45;
      const pulseScale = 1 + Math.sin(time * 0.05) * 0.12;
      const glowRadius = baseSr * 3.5 * pulseScale;

      // Outer corona
      const corona = ctx.createRadialGradient(sysX, sysY, baseSr, sysX, sysY, glowRadius * 1.3);
      corona.addColorStop(0, 'rgba(255, 80, 0, 0.06)');
      corona.addColorStop(1, 'rgba(255, 80, 0, 0)');
      ctx.fillStyle = corona;
      ctx.beginPath(); ctx.arc(sysX, sysY, glowRadius * 1.3, 0, Math.PI * 2); ctx.fill();

      const glow = ctx.createRadialGradient(sysX, sysY, baseSr, sysX, sysY, glowRadius);
      glow.addColorStop(0, 'rgba(255, 140, 0, 0.35)');
      glow.addColorStop(1, 'rgba(255, 140, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(sysX, sysY, glowRadius, 0, Math.PI * 2); ctx.fill();

      const core = ctx.createRadialGradient(sysX - baseSr * 0.2, sysY - baseSr * 0.2, 0, sysX, sysY, baseSr);
      core.addColorStop(0, '#FFFFFF');
      core.addColorStop(0.3, '#FFD700');
      core.addColorStop(0.8, '#FF8C00');
      core.addColorStop(1, '#CC4400');
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(sysX, sysY, baseSr, 0, Math.PI * 2); ctx.fill();

      // Sun text
      ctx.textAlign = 'center';
      ctx.fillStyle = currentTheme === 'dark' ? '#FFF' : '#000';
      ctx.font = '700 ' + (isMobile ? '10px' : '13px') + ' "Space Grotesk"';
      ctx.fillText('SHUBHAM MEHTA', sysX, sysY + baseSr + 24);
      ctx.font = '500 ' + (isMobile ? '8px' : '10px') + ' "Inter"';
      ctx.fillStyle = currentTheme === 'dark' ? '#9ca3af' : '#64748b';
      ctx.fillText('Creative Technologist', sysX, sysY + baseSr + 38);
      ctx.font = '400 ' + (isMobile ? '7px' : '9px') + ' "Inter"';
      ctx.fillStyle = currentTheme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)';
      ctx.fillText('// EXPLORE MY PROJECTS', sysX, sysY + baseSr + 52);

      canvas.style.cursor = (currentlyHovered || currentAsteroidHover) && !isMobile ? 'pointer' : 'crosshair';
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateRect);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(requestRef.current);
      if (canvasRef.current) observer.unobserve(canvasRef.current);
      observer.disconnect();
    };
  }, []);

  /* ==================== AI ==================== */
  const handleAskAI = async () => {
    if (!aiInput.trim() || !selectedProject) return;
    setAiMode('loading'); setAiResponse('');
    const project = selectedProject;
    const prompt = `You are a technical architect assistant for Shubham Mehta's portfolio. Answer questions about "${project.name}" (Role: ${project.role}, Category: ${project.category}). Tech: ${project.tech.join(", ")}. Desc: ${project.desc}. Concise (2-3 sentences). User: ${aiInput}`;
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_KEY_HERE") throw new Error("missing");
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      if (!resp.ok) throw new Error("fail");
      const data = await resp.json();
      const text = data.candidates[0].content.parts[0].text;
      setAiMode('streaming'); let i = 0;
      const interval = setInterval(() => {
        setAiResponse(prev => prev + text.charAt(i)); i++;
        if (i >= text.length) { clearInterval(interval); setAiMode('complete'); setAiInput(''); }
      }, 25);
    } catch (err) {
      console.error(err);
      setAiResponse(`Comms relay interference. ${project.name} is a cornerstone of Shubham's ${project.category} expertise!`);
      setAiMode('complete');
    }
  };

  /* ==================== RENDER ==================== */
  return (
    <div className="relative w-full h-screen overflow-hidden antialiased selection:bg-purple-500/30 project-section" id="projects">
      <style>{`
        :root { --bg-color:#030305; --panel-bg:rgba(9,9,14,0.75); --text-primary:#f3f4f6; --text-secondary:#9ca3af; --border-color:rgba(255,255,255,0.08); --input-bg:rgba(255,255,255,0.03); --panel-shadow:-10px 0 40px rgba(0,0,0,0.8); --accent-glow:rgba(255,255,255,0.1); }
        [data-theme="light"] { --bg-color:#f8fafc; --panel-bg:rgba(255,255,255,0.85); --text-primary:#0f172a; --text-secondary:#64748b; --border-color:rgba(15,23,42,0.08); --input-bg:rgba(15,23,42,0.03); --panel-shadow:-10px 0 40px rgba(0,0,0,0.05); --accent-glow:rgba(15,23,42,0.05); }
        .project-section { background-color:var(--bg-color); color:var(--text-primary); }
        .font-display { font-family:'Space Grotesk',sans-serif; } .font-mono { font-family:'JetBrains Mono',monospace; }
        .blink { animation:blink 1s step-end infinite; } @keyframes blink { 50% { opacity:0; } }
      `}</style>

      {/* ─── PROJECTS HEADING ─── */}
      <div className="absolute top-12 left-10 md:left-16 z-[100] flex flex-col items-start pointer-events-none">
        <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tight font-display opacity-90" style={{ textShadow: '0 0 40px rgba(191,90,242,0.3), 0 4px 20px rgba(0,0,0,0.5)' }}>PROJECTS</h2>
        <p className="text-white/30 text-sm tracking-[0.3em] uppercase mt-2 font-display">(click a planet to explore)</p>
      </div>

      <div className={`absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-color)] transition-opacity duration-700 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h1 className="text-[var(--text-primary)] text-xl font-medium tracking-widest uppercase font-display mb-6 animate-pulse">Calibrating System</h1>
        <div className="w-60 h-0.5 bg-[var(--border-color)] overflow-hidden">
          <div className="h-full bg-[var(--text-primary)] w-full origin-left animate-[loadBar_1.5s_cubic-bezier(0.85,0,0.15,1)_forwards]" style={{ transform: loading ? 'scaleX(0)' : 'scaleX(1)' }} />
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair opacity-0 animate-[fadeIn_1s_ease-out_forwards_1s]" style={{ willChange: 'transform', touchAction: 'none' }} />

      <aside className={`fixed z-[200] bg-[var(--panel-bg)] backdrop-blur-xl border-l border-[var(--border-color)] shadow-[var(--panel-shadow)] flex flex-col overflow-y-auto bottom-[-100vh] left-0 w-full h-[80vh] rounded-t-3xl p-6 md:p-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:bottom-auto md:top-0 md:left-auto md:-right-[540px] md:w-[480px] md:h-screen md:rounded-none ${isPanelOpen ? '!bottom-0 md:!right-0' : ''}`}>
        <div className="w-12 h-1 bg-[var(--border-color)] rounded-full mx-auto mb-6 md:hidden" />
        <button onClick={() => { setIsPanelOpen(false); setSelectedProject(null); }} className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] flex items-center justify-center transition-all hover:text-[var(--text-primary)] hover:bg-[var(--border-color)] hover:scale-105">
          <X size={18} />
        </button>
        {selectedProject && (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3.5 mb-3 mt-4">
              <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: selectedProject.color, boxShadow: `0 0 16px ${selectedProject.color}` }} />
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight">{selectedProject.name}</h2>
            </div>
            <div className="text-[var(--text-secondary)] text-sm font-display font-medium mb-8">{selectedProject.category} · {selectedProject.year}</div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {selectedProject.imgs.map((iconName, idx) => {
                const Icon = IconMap[iconName] || Star;
                return (<div key={idx} className="h-28 rounded-xl flex items-center justify-center border border-[var(--border-color)] transition-all hover:-translate-y-1 hover:border-[var(--accent-glow)] group" style={{ background: 'linear-gradient(135deg, var(--input-bg), transparent)' }}>
                  <Icon size={32} className="opacity-80 stroke-[1.5px] transition-transform group-hover:scale-110" style={{ color: selectedProject.color }} />
                </div>);
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {selectedProject.stats.map((s, idx) => (
                <div key={idx} className="flex-1 bg-[var(--input-bg)] p-4 rounded-xl border border-[var(--border-color)]">
                  <div className="font-display font-bold text-xl mb-1" style={{ color: selectedProject.color }}>{s.v}</div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider">{s.k}</div>
                </div>
              ))}
            </div>
            <p className="leading-relaxed mb-8 text-[0.95rem] text-[var(--text-secondary)]">{selectedProject.desc}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tech.map((t, idx) => (
                <span key={idx} className="text-xs font-medium px-3 py-1.5 rounded-full bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] tracking-wide">{t}</span>
              ))}
            </div>
            {selectedProject.moons.length > 0 && (
              <div className="mb-8 bg-[var(--input-bg)] p-5 rounded-xl border border-[var(--border-color)]">
                <h4 className="font-display text-xs mb-4 text-[var(--text-primary)] uppercase tracking-wider">System Components ({selectedProject.moons.length})</h4>
                <div className="flex flex-col gap-2.5">
                  {selectedProject.moons.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color, boxShadow: `0 0 10px ${m.color}` }} />{m.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3 mb-10 mt-auto">
              <a href={selectedProject.liveUrl} className="flex-1 py-3.5 rounded-lg font-display font-medium text-sm flex justify-center items-center gap-2 transition-all bg-[var(--text-primary)] text-[var(--bg-color)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_var(--accent-glow)]">View Live <ExternalLink size={16} /></a>
              <a href={selectedProject.githubUrl} className="flex-1 py-3.5 rounded-lg font-display font-medium text-sm flex justify-center items-center gap-2 transition-all bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--border-color)]">GitHub <Github size={16} /></a>
            </div>
            <div className="border-t border-[var(--border-color)] pt-8 pb-4">
              {aiMode === 'idle' ? (
                <button onClick={() => setAiMode('input')} className="w-full flex justify-center items-center gap-2 p-3.5 rounded-lg font-display font-medium transition-all text-[#c4a7e7] border border-[rgba(138,43,226,0.2)] hover:border-[rgba(138,43,226,0.4)] hover:shadow-[0_0_20px_rgba(138,43,226,0.1)]" style={{ background: 'linear-gradient(to right, rgba(138,43,226,0.05), rgba(138,43,226,0.1))' }}>
                  <Sparkles size={16} /> Consult AI Architect
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input type="text" value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAskAI()} placeholder="Ask the AI architect..." className="flex-1 bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-primary)] py-3 px-4 rounded-lg text-sm outline-none transition-colors focus:border-[rgba(138,43,226,0.5)]" disabled={aiMode === 'loading' || aiMode === 'streaming'} />
                    <button onClick={handleAskAI} disabled={aiMode === 'loading' || aiMode === 'streaming' || !aiInput.trim()} className="px-4 rounded-lg flex items-center justify-center transition-all disabled:opacity-50" style={{ backgroundColor: (aiMode === 'loading' || aiMode === 'streaming') ? selectedProject.color : 'var(--input-bg)', color: (aiMode === 'loading' || aiMode === 'streaming') ? '#fff' : 'var(--text-primary)' }}>
                      <Send size={16} />
                    </button>
                  </div>
                  {aiMode !== 'input' && (
                    <div className="font-mono text-sm text-[var(--text-secondary)] leading-relaxed min-h-[60px] p-4 rounded-lg bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.03)]">
                      {aiMode === 'loading' && <span>Initializing AI agent...<span className="blink ml-1">{'\u2588'}</span></span>}
                      {aiMode === 'streaming' && <span>{aiResponse}<span className="blink ml-1">{'\u2588'}</span></span>}
                      {aiMode === 'complete' && <span>{aiResponse}</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </aside>

      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes loadBar { from { transform:scaleX(0); } to { transform:scaleX(1); } }
      `}</style>
    </div>
  );
};

export default SolarSystemProjects;
