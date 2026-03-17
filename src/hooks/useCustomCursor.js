import { useState, useEffect } from 'react';

export function useCustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default'); // default, hover, click

  // Check reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setCursorState('click');
    const handleMouseUp = () => setCursorState('default');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Global event delegation for hover states
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorState('hover');
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorState('default');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let requestRef;
    
    // Animation loop for ring following cursor
    const animate = () => {
      setRingPos((prevRingPos) => {
        const dx = mousePos.x - prevRingPos.x;
        const dy = mousePos.y - prevRingPos.y;
        
        // Lerp factor
        const ease = 0.12;
        
        return {
          x: prevRingPos.x + dx * ease,
          y: prevRingPos.y + dy * ease
        };
      });
      requestRef = requestAnimationFrame(animate);
    };
    
    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, [mousePos, prefersReducedMotion]);

  return {
    dotX: mousePos.x,
    dotY: mousePos.y,
    ringX: ringPos.x,
    ringY: ringPos.y,
    cursorState,
    setCursorState
  };
}
