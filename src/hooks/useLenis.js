import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Ultra-responsive Lenis configuration
    const lenisInstance = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy Expo easing
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1.5,
      touchMultiplier: 2.0,
    });

    setLenis(lenisInstance);

    // Single animation loop — prevents double-raf jitter
    lenisInstance.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return lenis;
}
