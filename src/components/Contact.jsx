import React, { useRef, useState, useEffect, useCallback } from 'react';
import { animate } from 'animejs';
import { useMouseMagnetic } from '../hooks/useMouseMagnetic';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const btnRef = useRef(null);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef();
  const isIntersectingRef = useRef(true);

  useMouseMagnetic(btnRef, 0.2);

  // Canvas Starfield
  const initStars = useCallback((w, h) => {
    const stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.3 + 0.4,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005,
        ix: 0, iy: 0,
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const handleResize = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
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
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const anim = () => {
      if (!isIntersectingRef.current) {
        requestRef.current = requestAnimationFrame(anim);
        return; // Skip heavy canvas rendering
      }
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, w, h);

      starsRef.current.forEach(s => {
        s.twinkle += s.speed;
        let alpha = (Math.sin(s.twinkle) + 1) / 2 * 0.6 + 0.1;
        let sx = s.x, sy = s.y;
        const dx = mouse.x - sx, dy = mouse.y - sy;
        const distSq = dx * dx + dy * dy;
        const ir = 120, irSq = ir * ir;

        if (distSq < irSq) {
          const dist = Math.sqrt(distSq);
          const f = (ir - dist) / ir;
          s.ix -= (dx / dist) * f * 0.8;
          s.iy -= (dy / dist) * f * 0.8;
          alpha = Math.min(1, alpha + f * 0.4);
          if (f > 0.2) {
            ctx.beginPath();
            ctx.moveTo(sx + s.ix, sy + s.iy);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${f * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        s.ix *= 0.93; s.iy *= 0.93;
        sx += s.ix; sy += s.iy;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(Math.round(sx), Math.round(sy), s.size + (distSq < irSq ? 0.5 : 0), 0, Math.PI * 2);
        ctx.fill();
      });
      requestRef.current = requestAnimationFrame(anim);
    };
    requestRef.current = requestAnimationFrame(anim);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      animate('.form-input', {
        translateX: [{ to: -10, duration: 50 }, { to: 10, duration: 50 }, { to: -10, duration: 50 }, { to: 0, duration: 50 }],
        ease: 'linear'
      });
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      animate(btnRef.current, { scale: [1, 1.05, 1], duration: 800, ease: 'outElastic(1, .5)' });
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const charCount = formState.message.length;
  const maxChars = 500;

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden w-full min-h-[110vh] flex items-center" style={{ background: 'transparent' }}>

      {/* Canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" style={{ willChange: 'transform' }} />

      {/* Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-accent rounded-full blur-[150px] opacity-10 animate-float translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-theme-accent2 rounded-full blur-[150px] opacity-10 animate-pulse-glow -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mt-12 mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column */}
          <div className="flex flex-col justify-start gap-16 pointer-events-auto">

            {/* Info */}
            <div className="flex flex-col justify-center">
              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="font-mono text-xs text-green-400 uppercase tracking-widest">Available for work</span>
              </div>

              <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                Let's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent2">Connect</span>
              </h2>
              <p className="font-body text-theme-text2 text-lg mb-12 max-w-md">
                Whether you have a specific project in mind, need a full-stack architect, or just want to discuss the future of AI. My inbox is always open.
              </p>

              <div className="space-y-4">
                {[
                  { icon: 'MAIL', label: 'Email', value: 'mehtashubham0070@gmail.com', href: 'mailto:mehtashubham0070@gmail.com' },
                  { icon: 'LINK', label: 'LinkedIn', value: 'linkedin.com/in/shubhammehta', href: 'https://linkedin.com/in/shubhammehta' },
                  { icon: 'GIT', label: 'GitHub', value: 'github.com/shubhamEDRVN', href: 'https://github.com/shubhamEDRVN' }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-5 rounded-xl bg-theme-surface/80 border border-theme-border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-theme-accent/50 hover:shadow-[0_10px_30px_rgba(0,245,212,0.08)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-[2px] h-0 bg-theme-accent transition-all duration-300 group-hover:h-full" />
                    <span className="font-mono text-[10px] text-theme-text2/60 tracking-widest uppercase mb-1.5">// {item.icon}</span>
                    <div className="font-display text-base text-theme-text1 group-hover:text-theme-accent transition-colors">{item.value}</div>
                  </a>
                ))}
              </div>

              {/* Social Links Row */}
              <div className="flex gap-3 mt-8">
                {[
                  { name: 'Twitter', href: '#', icon: 'X' },
                  { name: 'Instagram', href: '#', icon: 'IG' },
                  { name: 'Dribbble', href: '#', icon: 'DR' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-theme-surface/80 border border-theme-border flex items-center justify-center font-mono text-[10px] text-theme-text2 uppercase tracking-wider transition-all duration-300 hover:border-theme-accent/50 hover:text-theme-accent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,245,212,0.1)]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="bg-theme-surface/50 border border-theme-border rounded-2xl p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-theme-accent/20 blur-[60px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-theme-accent2/10 blur-[40px] pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="form-input block w-full bg-transparent border-0 border-b-2 border-theme-border text-theme-text1 font-mono py-3 px-1 focus:outline-none focus:ring-0 focus:border-theme-accent transition-all peer"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="absolute text-sm text-theme-text2 font-mono duration-300 transform -translate-y-6 scale-90 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-theme-accent">
                      NAME
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-theme-accent to-theme-accent2 transition-all duration-300 peer-focus:w-full" />
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="form-input block w-full bg-transparent border-0 border-b-2 border-theme-border text-theme-text1 font-mono py-3 px-1 focus:outline-none focus:ring-0 focus:border-theme-accent transition-all peer"
                      placeholder=" "
                    />
                    <label htmlFor="email" className="absolute text-sm text-theme-text2 font-mono duration-300 transform -translate-y-6 scale-90 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-theme-accent">
                      EMAIL
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-theme-accent to-theme-accent2 transition-all duration-300 peer-focus:w-full" />
                  </div>

                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      maxLength={maxChars}
                      value={formState.message}
                      onChange={handleChange}
                      className="form-input block w-full bg-transparent border-0 border-b-2 border-theme-border text-theme-text1 font-mono py-3 px-1 focus:outline-none focus:ring-0 focus:border-theme-accent transition-all peer resize-none"
                      placeholder=" "
                    ></textarea>
                    <label htmlFor="message" className="absolute text-sm text-theme-text2 font-mono duration-300 transform -translate-y-6 scale-90 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-theme-accent">
                      MESSAGE
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-theme-accent to-theme-accent2 transition-all duration-300 peer-focus:w-full" />
                    <div className="absolute bottom-[-20px] right-0 font-mono text-[10px] text-theme-text2/40 tracking-wider">
                      {charCount}/{maxChars}
                    </div>
                  </div>

                  <button
                    ref={btnRef}
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-theme-accent to-theme-accent2 text-theme-bg font-display font-bold text-lg tracking-wider uppercase py-4 rounded-lg mt-4 shadow-[0_0_20px_rgba(0,245,212,0.15)] hover:shadow-[0_0_40px_rgba(191,90,242,0.3)] transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed group hover:-translate-y-0.5"
                  >
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full skew-x-12 bg-white/20 group-hover:animate-[gradient-shift_1.5s_ease-out_infinite] z-0" />
                    <span className="relative z-10">
                      {status === 'idle' ? '[ TRANSMIT ]' : status === 'sending' ? 'TRANSMITTING...' : 'MESSAGE SENT \u2713'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column spacer */}
          <div className="hidden lg:block pointer-events-none relative" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
