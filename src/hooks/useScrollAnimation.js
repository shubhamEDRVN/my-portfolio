import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(ref, animationConfig, scrollTriggerConfig) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...animationConfig,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          onEnter: () => setIsInView(true),
          ...scrollTriggerConfig,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, animationConfig, scrollTriggerConfig]);

  return { isInView };
}
