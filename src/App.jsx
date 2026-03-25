import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from './hooks/useLenis';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import SplineBackground from './components/SplineBackground';
import Hero from './components/Hero';
import Skills from './components/Skills';
import SolarSystemProjects from './components/SolarSystemProjects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Boundary Caught:", error, errorInfo); }
  render() {
    if (this.state.hasError) return this.props.fallback || null;
    return this.props.children;
  }
}

function App() {
  useLenis();
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Global loading screen — waits for fonts, images, and heavy components
    let progress = 0;
    const targetProgress = 100;
    const startTime = Date.now();
    const MIN_DURATION = 2500;  // minimum 2.5s loader for component init

    const ticker = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const naturalProgress = Math.min((elapsed / MIN_DURATION) * 100, 95);
      progress = Math.max(progress, naturalProgress);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress / 100})`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(progress)}%`;
      }

      if (progress >= 95 && document.readyState === 'complete') {
        progress = targetProgress;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(1)`;
        }
        if (percentRef.current) {
          percentRef.current.textContent = '100%';
        }
        clearInterval(ticker);

        // Fade out after bar hits 100%
        setTimeout(() => {
          const ctx = gsap.context(() => {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: 'power3.inOut',
              onComplete: () => {
                if (loaderRef.current) loaderRef.current.style.display = 'none';
                setReady(true);
              }
            });
          });
          return () => ctx.revert();
        }, 400);
      }
    }, 50);

    // Fallback: force hide after 6s max
    const fallback = setTimeout(() => {
      clearInterval(ticker);
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          opacity: 0, duration: 0.5,
          onComplete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
            setReady(true);
          }
        });
      }
    }, 6000);

    return () => {
      clearInterval(ticker);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <ErrorBoundary fallback={<div className="fixed inset-0 bg-black z-0" />}>
        <SplineBackground />
      </ErrorBoundary>
      
      <div className="bg-transparent min-h-screen text-theme-text1 overflow-x-hidden w-full relative pointer-events-none">
        {/* ─── GLOBAL LOADING SCREEN ─── */}
        <div 
          ref={loaderRef} 
          className="fixed inset-0 z-[99999] bg-[#030305] flex flex-col items-center justify-center pointer-events-all"
        >
          <div className="font-display text-5xl font-bold tracking-widest flex items-center gap-2 text-white mb-8">
            S<span className="w-3 h-3 rounded-full bg-[#00F5D4] animate-pulse"></span>M
          </div>
          <div className="text-white/30 text-sm tracking-[0.3em] uppercase mb-6 font-display">
            Loading Portfolio
          </div>
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#00F5D4] to-[#BF5AF2] origin-left transition-transform duration-100"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div ref={percentRef} className="text-white/40 text-xs font-mono tracking-widest">0%</div>
        </div>
        
        <Cursor />
        <div className="pointer-events-auto"><Navbar /></div>
        
        <main className="relative z-10 pointer-events-none">
          <div className="pointer-events-auto"><Hero /></div>
          <div className="pointer-events-none"><Skills /></div>
          <ErrorBoundary fallback={<div className="h-[600px] flex items-center justify-center text-white/20 uppercase tracking-widest">Solar System Offline</div>}>
            <div className="pointer-events-auto opacity-100 relative z-20"><SolarSystemProjects /></div>
          </ErrorBoundary>
          <div className="pointer-events-auto"><Experience /></div>
          <div className="pointer-events-auto"><Contact /></div>
        </main>
        <div className="pointer-events-auto"><Footer /></div>
      </div>
    </>
  );
}

export default App;
