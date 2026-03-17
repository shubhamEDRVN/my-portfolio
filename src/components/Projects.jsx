import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Friday (Virtual Assistant)",
    tech: ["Python", "OpenAI API", "Gemini", "OS Control"],
    desc: "Python voice-AI assistant leveraging OpenAI, Gemini, OS control, YouTube, Google, and News APIs for a JARVIS-style personal assistant experience.",
    github: "#",
    live: "#",
    color: "#00F5D4"
  },
  {
    title: "Book My Show Clone",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    desc: "Full MERN-stack event ticketing platform with MongoDB backend, real-time seat selection, and booking flow mirroring production-grade architecture.",
    github: "#",
    live: "#",
    color: "#BF5AF2"
  },
  {
    title: "Eye-Controlled Mouse",
    tech: ["Python", "OpenCV", "PyAutoGUI"],
    desc: "Python-based desktop automation using computer vision to control mouse cursor via real-time eye-tracking through webcam input.",
    github: "#",
    live: "#",
    color: "#FF6B35"
  },
  {
    title: "Employee Management",
    tech: ["React.js", "JSON"],
    desc: "React-based dynamic task manager with JSON data storage, drag-and-drop task assignment, and role-based employee views.",
    github: "#",
    live: "#",
    color: "#00F5D4"
  },
  {
    title: "Hotel Booking System",
    tech: ["Java Swing", "Hibernate ORM", "SQL"],
    desc: "Java Swing application with Hibernate ORM for real-time room availability, booking operations, and persistent database-backed hotel management.",
    github: "#",
    live: "#",
    color: "#BF5AF2"
  },
  {
    title: "Online Backup Planner",
    tech: ["Struts", "Hibernate", "SQL", "JavaBeans"],
    desc: "Full-stack platform using the Struts framework with Hibernate ORM and SQL DB for automated backup planning and database operations.",
    github: "#",
    live: "#",
    color: "#FF6B35"
  },
  {
    title: "MoonHack Platform",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "Tech chapter hub built during a 24-hour hackathon as Frontend Dev and Team Lead. Live event platform for student participation.",
    github: "#",
    live: "#",
    color: "#00F5D4"
  },
  {
    title: "WhatsApp Chatbot",
    tech: ["Python", "Selenium"],
    desc: "Automation bot using Selenium to monitor WhatsApp messages and generate intelligent context-aware auto-replies.",
    github: "#",
    live: "#",
    color: "#BF5AF2"
  }
];

const Projects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card-v2');
      
      // Staggered reveal animation for each card
      gsap.fromTo(cards,
        { 
          y: 80, 
          opacity: 0,
          scale: 0.92
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            refreshPriority: 1,
          }
        }
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative py-32 px-6 lg:px-24 overflow-hidden bg-theme-bg">
      
      {/* Neo-Fluid Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-theme-accent/5 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-theme-accent2/5 rounded-full blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-[1400px] mx-auto mb-20">
        <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-theme-text1">
          <span className="text-theme-text2 text-sm font-mono block mb-2">03 //</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent2">Featured</span><br/>
          Systems
        </h2>
      </div>

      {/* Vertical Grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projectsData.map((project, idx) => (
          <div 
            key={idx} 
            className="project-card-v2 flex flex-col justify-between bg-theme-surface/30 backdrop-blur-xl rounded-sm border-[1px] border-theme-border relative overflow-hidden group transition-all duration-500 hover:-translate-y-3 hover:border-theme-accent/40 hover:shadow-glow-cyan p-8 cursor-default"
          >
            {/* Top Color Accent Bar */}
            <div 
              className="absolute top-0 left-0 w-full h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300" 
              style={{ backgroundColor: project.color, boxShadow: `0 0 15px ${project.color}` }} 
            />
            
            {/* Large BG Number (Watermark) */}
            <div className="absolute -bottom-12 -right-4 font-display text-[160px] font-black text-white/[0.02] leading-none pointer-events-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:text-white/[0.04]">
              {(idx + 1).toString().padStart(2, '0')}
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="font-display text-2xl font-bold text-theme-text1 mb-5 leading-tight group-hover:text-theme-accent transition-colors duration-300">
                {project.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map(t => (
                  <span key={t} className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-sm bg-theme-bg border-[1px] border-theme-border text-theme-text2 group-hover:border-theme-accent/30 transition-colors duration-300">
                    {t}
                  </span>
                ))}
              </div>
              
              <p className="font-display text-sm text-theme-text2 leading-relaxed font-light">
                {project.desc}
              </p>
            </div>

            {/* Action Links */}
            <div className="flex gap-8 relative z-10 mt-8 pt-6 border-t-[1px] border-theme-border/50 group-hover:border-theme-accent/30 transition-colors duration-300">
              <a 
                href={project.github}
                className="font-mono text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 text-theme-text2 hover:text-theme-accent transition-colors duration-300"
              >
                [ VIEW_CODE ]
              </a>
              <a 
                href={project.live}
                className="font-mono text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 text-theme-text2 hover:text-theme-accent2 transition-colors duration-300"
              >
                [ EXECUTE ]
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
