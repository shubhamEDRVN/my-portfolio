import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

export function useLenis() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.08, // Custom lerp for heavy, premium scroll feel
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP ticker with Lenis
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
    };
  }, []);

  return lenis;
}
