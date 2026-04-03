import React, { useRef, useEffect, useState } from 'react';
import { useHeroTimeline } from '../animations/useHeroTimeline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

const CYCLING_PHRASES = [
  "Building the Future",
  "Crafting Experiences",
  "Shipping Products",
  "Solving Problems",
  "Designing Systems",
  "Pushing Boundaries",
];

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const cyclingRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload Image Sequence
  useEffect(() => {
    let loadedCount = 0;
    const urls = new Array(TOTAL_FRAMES).fill(0).map((_, i) => 
      `/assets/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
    );
    
    urls.forEach((url, idx) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setImagesLoaded(true);
      };
      imagesRef.current[idx] = img;
    });
  }, []);

  // Force ScrollTrigger refresh once all images load
  useEffect(() => {
    if (imagesLoaded) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [imagesLoaded]);

  // Set canvas dimensions and draw initial frame when loaded
  useEffect(() => {
    const initCanvas = () => {
      if (canvasRef.current && imagesLoaded && imagesRef.current[0]) {
        canvasRef.current.width = 800;
        canvasRef.current.height = 800;
        
        const context = canvasRef.current.getContext('2d');
        const img = imagesRef.current[0];
        
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const hRatio = canvasRef.current.width / img.width;
        const vRatio = canvasRef.current.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const drawW = img.width * ratio;
        const drawH = img.height * ratio;
        const dx = (canvasRef.current.width - drawW) / 2;
        const dy = (canvasRef.current.height - drawH) / 2;
        
        context.drawImage(img, dx, dy, drawW, drawH);
      }
    };
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [imagesLoaded]);

  // Set initial GSAP state so canvas starts on the right side, visible
  useEffect(() => {
    if (canvasRef.current) {
      gsap.set(canvasRef.current, { x: '20vw', scale: 0.75, opacity: 1 });
    }
  }, [imagesLoaded]);

  // Initialize the complex GSAP ScrollTrigger timeline
  useHeroTimeline(
    containerRef, 
    canvasRef, 
    leftTextRef, 
    rightTextRef, 
    imagesRef,
    TOTAL_FRAMES,
    imagesLoaded,
    cyclingRef
  );

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-theme-bg bg-noise"
    >
      {/* Subtle Starry Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-theme-text1 animate-pulse" />
        <div className="absolute top-[60%] left-[80%] w-1 h-1 bg-theme-text1 animate-pulse scale-75" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[80%] left-[25%] w-1.5 h-1.5 bg-theme-accent animate-pulse scale-50" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1600px] w-full px-6 md:px-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between z-10 relative h-[100vh] pt-24 lg:pt-0 gap-6 lg:gap-0">
        
        {/* Left Text Block */}
        <div ref={leftTextRef} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 z-20 w-full lg:w-[35%]">
           <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-theme-text1 leading-tight">
             Welcome to<br/>Shubham<br/>Mehta's<br/>Portfolio
           </h1>
           <div className="w-16 h-[2px] bg-theme-accent" />
           <p className="font-mono text-xs md:text-sm text-theme-text2 uppercase tracking-widest leading-relaxed">
             // Software Developer
           </p>
        </div>

        {/* Center Canvas Element */}
        <div className="flex-1 flex justify-center items-center z-10 relative pointer-events-none w-full lg:w-auto my-4 lg:my-0">
           <canvas 
             ref={canvasRef} 
             className="rounded-full shadow-glow-cyan"
             style={{ 
               width: 'min(50vw, 500px)', 
               aspectRatio: '1/1',
               maskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)'
             }} 
           />
           {!imagesLoaded && (
             <div className="absolute inset-0 flex items-center justify-center font-mono text-theme-accent animate-pulse text-xs tracking-widest">
               [ LOADING_SEQUENCE ]
             </div>
           )}
        </div>

        {/* Right Text Block */}
        <div ref={rightTextRef} className="flex flex-col items-center lg:items-end text-center lg:text-right gap-3 z-20 w-full lg:w-[35%]">
           <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-theme-accent to-theme-accent2 leading-tight">
             Develop<br/>Design<br/>Create<br/>Analyze
           </h1>
           <div className="w-16 h-[2px] bg-theme-accent2" />
        </div>

      </div>

      {/* Cycling Phrases Overlay - centered at bottom, fades in/out on scroll */}
      <div 
        ref={cyclingRef}
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-20 w-full text-center pointer-events-none"
      >
        {CYCLING_PHRASES.map((phrase, i) => (
          <span
            key={i}
            className="cycling-phrase absolute left-1/2 -translate-x-1/2 font-mono text-sm md:text-base tracking-[0.25em] uppercase text-theme-accent/70 whitespace-nowrap"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            — {phrase} —
          </span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
