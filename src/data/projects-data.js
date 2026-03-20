export const PROJECTS = [
  {
    id: "proj-1",
    name: "Friday (Virtual Assistant)",
    category: "AI & Automation",
    role: "Lead Developer",
    year: "2024",
    subtitle: "Python voice-AI assistant leveraging OpenAI and Gemini.",
    desc: "A JARVIS-style personal assistant that integrates OpenAI, Gemini, OS control, YouTube, Google, and News APIs to provide a seamless voice-controlled environment.",
    color: "#00F5D4", // Project Cyan
    radius: 22,
    orbitR: 160,
    speed: 0.0008,
    tech: ["Python", "OpenAI API", "Gemini", "OS Control"],
    stats: [
      { v: "50+", k: "Voice Commands" },
      { v: "200ms", k: "P99 latency" },
      { v: "98%", k: "Accuracy" }
    ],
    moons: [
      { name: "Voice Engine", color: "#69F0AE" },
      { name: "API Hub", color: "#B9F6CA" }
    ],
    imgs: ["mic", "zap", "bot", "activity"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-2",
    name: "Book My Show Clone",
    category: "Full Stack · MERN",
    role: "Full Stack Developer",
    year: "2024",
    subtitle: "Real-time event ticketing platform.",
    desc: "A comprehensive MERN-stack platform with a MongoDB backend, real-time seat selection, and a production-grade booking flow including payment integration simulation.",
    color: "#BF5AF2", // Project Purple
    radius: 26,
    orbitR: 260,
    speed: 0.0006,
    tech: ["MongoDB", "Express", "React", "Node.js"],
    stats: [
      { v: "10K+", k: "Simulated Users" },
      { v: "100ms", k: "DB Query" },
      { v: "100%", k: "Test Coverage" }
    ],
    moons: [
      { name: "Seat Engine", color: "#E040FB" },
      { name: "Payment Gateway", color: "#EA80FC" }
    ],
    imgs: ["ticket", "database", "credit-card", "users"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-3",
    name: "Eye-Controlled Mouse",
    category: "Computer Vision",
    role: "Solo Developer",
    year: "2024",
    subtitle: "Webcam-based cursor control via eye tracking.",
    desc: "Leverages Python and OpenCV to map eye movements from a standard webcam to cursor movements on the desktop, enabling hands-free interaction.",
    color: "#FF6B35", // Project Orange
    radius: 18,
    orbitR: 350,
    speed: 0.0005,
    tech: ["Python", "OpenCV", "PyAutoGUI"],
    stats: [
      { v: "30fps", k: "Tracking" },
      { v: "5px", k: "Precision" },
      { v: "Low", k: "CPU Usage" }
    ],
    moons: [
      { name: "Tracking Core", color: "#FF9E80" }
    ],
    imgs: ["eye", "camera", "mouse-pointer", "target"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-4",
    name: "Employee Management",
    category: "Web Application",
    role: "Frontend Developer",
    year: "2024",
    subtitle: "Dynamic task manager with role-based views.",
    desc: "A React-based dashboard for team management featuring drag-and-drop task assignment, persistent data via JSON, and distinct views for admins and employees.",
    color: "#00F5D4",
    radius: 20,
    orbitR: 440,
    speed: 0.0004,
    tech: ["React.js", "JSON", "Tailwind"],
    stats: [
      { v: "Admin", k: "Roles" },
      { v: "60ms", k: "UI Response" },
      { v: "Clean", k: "Architecture" }
    ],
    moons: [
      { name: "Dashboard", color: "#82B1FF" },
      { name: "Task Logic", color: "#448AFF" }
    ],
    imgs: ["layout", "clipboard-list", "users", "bar-chart"],
    liveUrl: "#",
    githubUrl: "#",
  }
];

export const COMETS = [
  { name: "Freelance: Branding", color: "#ffe0b2", speed: 0.002, semiMajor: 500, semiMinor: 150, angle: Math.PI / 4 },
  { name: "Contract: API Opt", color: "#b2dfdb", speed: 0.003, semiMajor: 600, semiMinor: 200, angle: -Math.PI / 6 },
];
