import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState, useCallback, useMemo } from 'react';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = useMemo(() => ({ damping: 30, stiffness: 250 }), []);
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const checkMobile = useCallback(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;
    setIsMobile(isMobileDevice);
    return isMobileDevice;
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    });
  }, [cursorX, cursorY]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a')
    ) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    const mobile = checkMobile();
    setMounted(true);

    if (mobile) return;

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, [moveCursor, handleMouseOver, checkMobile]);

  // Don't render on mobile or before mount
  if (!mounted || isMobile) return null;

  return (
    <>
      {/* Outer ring - Large and visible */}
      <motion.div
        className="fixed pointer-events-none z-[10001] mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 50,
            height: isHovering ? 80 : 50,
            opacity: isHovering ? 0.8 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="border-2 border-purple-400 rounded-full"
        />
      </motion.div>

      {/* Center dot - Bright and visible */}
      <motion.div
        className="fixed pointer-events-none z-[10002]"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.3 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="w-2 h-2 rounded-full bg-white"
        />
      </motion.div>
    </>
  );
}