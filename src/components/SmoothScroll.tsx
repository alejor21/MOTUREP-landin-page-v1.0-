import { useEffect, useRef } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    // Optimización: Throttle para mejor performance
    let isScrolling = false;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (!isScrolling) {
        isScrolling = true;

        // Optimización: usar requestAnimationFrame
        requestAnimationFrame(() => {
          const delta = e.deltaY;
          window.scrollBy({
            top: delta * 0.5,
            behavior: 'auto'
          });
          isScrolling = false;
        });
      }
    };

    // Only on desktop for better performance
    const isDesktop = window.innerWidth > 768;
    if (isDesktop) {
      window.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (isDesktop) {
        window.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  return null;
}
