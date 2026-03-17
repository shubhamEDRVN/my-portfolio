import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const hintRef = useRef(null);

  // GSAP entrance animation + pin
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
      gsap.fromTo(hintRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      // Pin the skills section so keyboard stays while user scrolls
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(10, 14, 26, 0.5) 0%, transparent 60%)',
      }}
    >
      {/* Starry Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Static stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {/* Subtle nebula glow */}
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-theme-accent/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-theme-accent2/3 rounded-full blur-[120px]" />
      </div>

      {/* Top Header */}
      <div className="relative z-20 text-center mt-24 mb-6 px-6">
        <h2 ref={headingRef} className="font-display text-6xl md:text-8xl font-black uppercase tracking-tight">
          <span className="text-theme-text1">SKILLS</span>
        </h2>
        <p ref={hintRef} className="font-mono text-sm text-theme-text2/50 tracking-widest mt-4">
          (hint: hover a key)
        </p>
      </div>

      {/* CSS for twinkle animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
