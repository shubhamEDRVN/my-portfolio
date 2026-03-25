import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useHeroTimeline = (
  containerRef,
  canvasRef,
  leftTextRef,
  rightTextRef,
  imagesRef,
  totalFrames,
  imagesLoaded,
  cyclingPhrasesRef
) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !imagesLoaded || imagesRef.current.length === 0) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      // Create the main pinned ScrollTrigger
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.5, // Gentle interpolation for canvas flipbook
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          refreshPriority: 10,
        }
      });

      const tl = timelineRef.current;
      const frameObj = { frame: 0 };

      // Render function for the canvas
      const render = () => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        const img = imagesRef.current[Math.round(frameObj.frame)];
        if (img) {
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';
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

      // Ensure first frame is drawn
      render();

      // 0 - 100% of scroll: Animate frame sequence uniformly
      tl.to(frameObj, {
        frame: totalFrames - 1,
        ease: "none",
        onUpdate: render,
        duration: 10
      }, 0);

      // 0 - 40%: Scale up canvas smoothly from its starting position (right side)
      // Canvas starts visible at right side (set via CSS/initial gsap.set in Hero.jsx)
      tl.to(canvasRef.current, {
        x: 0,
        scale: 1.05,
        duration: 4,
        ease: "power2.out"
      }, 0);

      // 10% - 30%: Shrink text slightly & add subtle motion as canvas takes over
      if (leftTextRef.current) {
        tl.to(leftTextRef.current, {
          x: -80,
          opacity: 0.3,
          duration: 3,
          ease: "power2.inOut"
        }, 1);
      }
      if (rightTextRef.current) {
        tl.to(rightTextRef.current, {
          x: 80,
          opacity: 0.3,
          duration: 3,
          ease: "power2.inOut"
        }, 1);
      }

      // 60% - 80%: Fade texts out completely
      if (leftTextRef.current) tl.to(leftTextRef.current, { opacity: 0, x: -120, duration: 2, ease: "power2.in" }, 6);
      if (rightTextRef.current) tl.to(rightTextRef.current, { opacity: 0, x: 120, duration: 2, ease: "power2.in" }, 6);

      // 80% - 100%: Fade the canvas out smoothly before handoff to Skills section
      tl.to(canvasRef.current, {
        opacity: 0,
        filter: 'blur(12px)',
        scale: 1.2,
        duration: 2,
        ease: "power2.in"
      }, 8);

      // Distribute cycling phrases evenly across the timeline duration (0 to 10)
      if (cyclingPhrasesRef?.current) {
        const phrases = cyclingPhrasesRef.current.querySelectorAll('.cycling-phrase');
        if (phrases.length) {
          const slotDuration = 10 / phrases.length;
          phrases.forEach((phrase, i) => {
            const start = i * slotDuration;
            // Fade in over the first 30% of its slot
            tl.fromTo(phrase, 
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: slotDuration * 0.3, ease: 'power2.out' },
              start
            );
            // Fade out over the last 30% of its slot
            tl.to(phrase,
              { opacity: 0, y: -30, duration: slotDuration * 0.3, ease: 'power2.in' },
              start + slotDuration * 0.7
            );
          });
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, canvasRef, leftTextRef, rightTextRef, imagesRef, totalFrames, imagesLoaded, cyclingPhrasesRef]);

  return timelineRef;
};
