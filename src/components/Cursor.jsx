import React from 'react';
import { useCustomCursor } from '../hooks/useCustomCursor';
import { clsx } from 'clsx';

const Cursor = () => {
  const { dotX, dotY, ringX, ringY, cursorState } = useCustomCursor();
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  if (prefersReducedMotion) return null;

  return (
    <>
      <div 
        className={clsx(
          "fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out",
          cursorState === 'hover' ? "scale-[0.5] opacity-50" : "scale-100",
          cursorState === 'click' ? "scale-[0.3]" : ""
        )}
        style={{
          left: `${dotX}px`,
          top: `${dotY}px`,
          backgroundColor: '#00F5D4'
        }}
      />
      <div 
        className={clsx(
          "fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border-[1.5px] border-theme-accent border-opacity-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out",
          cursorState === 'default' ? "w-9 h-9" : "",
          cursorState === 'hover' ? "w-[60px] h-[60px] border-theme-accent2 border-opacity-70 mix-blend-screen" : "",
          cursorState === 'click' ? "w-[24px] h-[24px] border-theme-accent2 border-opacity-100" : ""
        )}
        style={{
          left: `${ringX}px`,
          top: `${ringY}px`,
        }}
      />
    </>
  );
};

export default Cursor;
