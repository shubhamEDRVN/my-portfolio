import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const expData = [
  {
    org: "Agarwal Packers & Movers",
    date: "Remote",
    role: "Full Stack Dev Intern",
    desc: [
      "Developed enterprise modules using Spring, DAO, and Hibernate",
      "Optimized performance, integrated backend services, enhanced team collaboration"
    ]
  },
  {
    org: "AWS Cloud Clubs, Medicaps",
    date: "2025–2026",
    role: "Technical Head",
    desc: [
      "Led a team of 10 members over one year",
      "Directed major events: SCD and Career Catalyst",
      "Ensured efficient team performance and successful event execution"
    ]
  },
  {
    org: "Techno Clubs, Medicaps",
    date: "2024–2025",
    role: "Technical Executive",
    desc: [
      "Led tech and execution for MoonHack (24hr hackathon)",
      "Campus-wide technical event management"
    ]
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const spineRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      // Draw Spine Animation
      gsap.fromTo(spineRef.current,
        { strokeDashoffset: '1000' },
        {
          strokeDashoffset: '0',
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          }
        }
      );

      // Node and Card Animation
      const cards = gsap.utils.toArray('.exp-card');
      const nodes = gsap.utils.toArray('.exp-node');

      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            // Anime.js node scale and glow — guard against missing node
            if (nodes[i]) {
              animate(nodes[i], {
                scale: [0, 1],
                backgroundColor: ['#050508', '#00F5D4'],
                boxShadow: ['0 0 0 rgba(0,245,212,0)', '0 0 20px rgba(0,245,212,0.6)'],
                duration: 800,
                ease: 'outElastic(1, .5)'
              });
            }

            // GSAP card slide in
            gsap.fromTo(card,
              { x: isLeft ? -50 : 50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: "easeOutCubic" }
            );
          },
          once: true
        });
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 relative overflow-hidden bg-theme-bg w-full">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        
        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-center mb-24">
          Journey & <span className="text-theme-accent">Experience</span>
        </h2>

        <div className="relative">
          {/* Animated Spine SVG */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] transform md:-translate-x-1/2">
            <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg">
              <line 
                ref={spineRef}
                x1="1" y1="0" x2="1" y2="100%" 
                stroke="#00F5D4" fill="none" 
                strokeWidth="2" 
                strokeDasharray="1000" 
                className="opacity-40"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-12 sm:gap-24 relative z-10">
            {expData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="flex flex-col md:flex-row items-start md:items-center relative w-full">
                  
                  {/* Timeline Node */}
                  <div className="exp-node absolute left-5 md:left-1/2 w-4 h-4 rounded-full border-2 border-theme-accent bg-theme-bg z-20 transform -translate-x-1/2 mt-6 md:mt-0" />

                  {/* Desktop Layout Alternate Content */}
                  <div className={`hidden md:block w-1/2 px-12 ${isEven ? 'text-right' : 'order-1 text-left'}`}>
                    {isEven ? (
                      <>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-theme-text1">{item.org}</h3>
                        <p className="font-mono text-theme-accent text-sm mt-2">{item.date}</p>
                      </>
                    ) : (
                      <div className="exp-card relative">
                        <h4 className="font-display text-xl text-theme-accent2 mb-4 drop-shadow-[0_0_10px_rgba(191,90,242,0.3)]">{item.role}</h4>
                        <ul className="space-y-3 font-body text-theme-text2 text-sm">
                          {item.desc.map((d, i) => (
                            <li key={i} className="flex relative items-start gap-3">
                              <span className="text-theme-accent mt-1 text-xs">▹</span>
                              <span className="leading-relaxed">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className={`hidden md:block w-1/2 px-12 ${isEven ? 'order-1 text-left' : 'text-right'}`}>
                    {isEven ? (
                      <div className="exp-card relative">
                        <h4 className="font-display text-xl text-theme-accent2 mb-4 drop-shadow-[0_0_10px_rgba(191,90,242,0.3)]">{item.role}</h4>
                        <ul className="space-y-3 font-body text-theme-text2 text-sm">
                          {item.desc.map((d, i) => (
                            <li key={i} className="flex relative items-start gap-3">
                              <span className="text-theme-accent mt-1 text-xs">▹</span>
                              <span className="leading-relaxed text-left">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-theme-text1">{item.org}</h3>
                        <p className="font-mono text-theme-accent text-sm mt-2">{item.date}</p>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout (Stacked) */}
                  <div className="md:hidden flex flex-col w-full pl-14 pt-2">
                    <h3 className="font-display text-xl font-bold text-theme-text1">{item.org}</h3>
                    <p className="font-mono text-theme-accent text-sm mt-1">{item.date}</p>
                    <div className="exp-card mt-4 bg-theme-surface p-6 rounded-xl border border-theme-border shadow-lg">
                      <h4 className="font-display text-[17px] text-theme-accent2 mb-3 drop-shadow-[0_0_10px_rgba(191,90,242,0.3)]">{item.role}</h4>
                      <ul className="space-y-2 font-body text-theme-text2 text-sm">
                        {item.desc.map((d, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-theme-accent mt-1 text-xs">▹</span>
                            <span className="leading-relaxed">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
