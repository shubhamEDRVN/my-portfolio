import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const hintRef = useRef(null);
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ tx: -1000, ty: -1000, cx: -1000, cy: -1000 });
  const requestRef = useRef();
  const isIntersectingRef = useRef(true);

  const initStars = useCallback((w, h) => {
    const stars = [];
    for (let i = 0; i < 250; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        depth: Math.random() * 0.8 + 0.2,
        ix: 0, iy: 0,
        baseX: Math.random() * w,
        baseY: Math.random() * h
      });
    }
    starsRef.current = stars;
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const handleResize = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      initStars(rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // PERFORMANCE FIX: Pause rendering when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    const onMouseMove = (e) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      if (!isIntersectingRef.current) {
        requestRef.current = requestAnimationFrame(animate);
        return; // Skip heavy canvas rendering
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const mouse = mouseRef.current;
      
      const rect = canvas.getBoundingClientRect();
      
      // Interpolate mouse for fluid tracking
      if (mouse.ty >= rect.top && mouse.ty <= rect.bottom) {
        const targetX = mouse.tx - rect.left;
        const targetY = mouse.ty - rect.top;
        if (mouse.cx === -1000) { mouse.cx = targetX; mouse.cy = targetY; }
        mouse.cx += (targetX - mouse.cx) * 0.15; // Smooth trailing mouse
        mouse.cy += (targetY - mouse.cy) * 0.15;
      } else {
        mouse.cx = -1000;
        mouse.cy = -1000;
      }

      ctx.clearRect(0, 0, w, h);

      starsRef.current.forEach(s => {
        s.twinkle += s.speed;
        let alpha = (Math.sin(s.twinkle) + 1) / 2 * 0.7 + 0.15;
        let sx = s.baseX + s.ix, sy = s.baseY + s.iy;

        const dx = mouse.cx - sx;
        const dy = mouse.cy - sy;
        const distSq = dx * dx + dy * dy;
        const ir = 180; // slightly larger interaction radius
        const irSq = ir * ir;

        if (distSq < irSq && mouse.cx !== -1000) {
          const dist = Math.sqrt(distSq);
          const f = (ir - dist) / ir;
          // Apply repulsion force away from mouse
          s.ix -= (dx / dist) * f * 3.5;
          s.iy -= (dy / dist) * f * 3.5;
          alpha = Math.min(1, alpha + f * 0.8);

          // Draw connection lines
          if (f > 0.1) {
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(mouse.cx, mouse.cy);
            ctx.strokeStyle = `rgba(255, 255, 255, ${f * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Spring back to original position
        s.ix *= 0.88; // friction
        s.iy *= 0.88;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(Math.round(sx), Math.round(sy), s.size + (distSq < irSq && mouse.cx !== -1000 ? 1.0 : 0), 0, Math.PI * 2);
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      observer.disconnect();
    };
  }, []);

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
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // FIXED: Reduced from 150% for faster scroll-through
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
      {/* Interactive Canvas Starfield */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Subtle nebula glow */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-theme-accent/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-theme-accent2/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 text-center mt-24 mb-6 px-6 pointer-events-none">
        <h2 ref={headingRef} className="font-display text-6xl md:text-8xl font-black uppercase tracking-tight">
          <span className="text-theme-text1">SKILLS</span>
        </h2>
        <p ref={hintRef} className="font-mono text-sm text-theme-text2/50 tracking-widest mt-4">
          (hint: hover the stars)
        </p>
      </div>
      {/* Bottom fade for seamless transition into Projects */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #030305)' }} />
    </section>
  );
};

export default Skills;
