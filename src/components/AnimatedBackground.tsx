import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useMemo, useCallback } from 'react';

export function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = useMemo(() => ({ damping: 25, stiffness: 150 }), []);
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle updates for better performance
    requestAnimationFrame(() => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    });
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient - Estático */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black" />

      {/* Animated blob único - Ultra simplificado */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-12"
      />
    </div>
  );
}
