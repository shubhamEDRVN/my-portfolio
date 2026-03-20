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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none';
          setLoading(false);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ErrorBoundary fallback={<div className="fixed inset-0 bg-black z-0" />}>
        <SplineBackground />
      </ErrorBoundary>
      
      <div className="bg-transparent min-h-screen text-theme-text1 overflow-x-hidden w-full relative pointer-events-none">
        <div 
          ref={loaderRef} 
          className="fixed inset-0 z-[99999] bg-theme-bg flex items-center justify-center pointer-events-none"
        >
          <div className="font-display text-4xl font-bold tracking-widest flex items-center gap-2 text-theme-text1">
            S<span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse-glow"></span>M
          </div>
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
