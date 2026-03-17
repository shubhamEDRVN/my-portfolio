import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function useMouseMagnetic(ref, strength = 0.3) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    
    const node = ref.current;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate target transform
      const x = distanceX * strength;
      const y = distanceY * strength;
      
      setPosition({ x, y });
      
      gsap.to(node, {
        x,
        y,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      gsap.to(node, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);

  return position;
}
