import { useEffect, useRef } from "react";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const MOBILE_SCALE_FACTOR = 0.4; // Adjust this value to control mobile sensitivity

export function useScrollingHook() {
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(performance.now());
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = performance.now();
      const timeDiff = currentTime - lastScrollTime.current;

      if (timeDiff > 16) { // ~60fps
        const currentScrollY = window.scrollY;
        let velocity = (currentScrollY - lastScrollY.current) / timeDiff;
        
        // Scale down velocity on mobile devices
        if (isMobile) {
          velocity *= MOBILE_SCALE_FACTOR;
        }
        
        scrollVelocity.current = velocity;
        lastScrollY.current = currentScrollY;
        lastScrollTime.current = currentTime;

        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          scrollVelocity.current = 0;
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return scrollVelocity;
}