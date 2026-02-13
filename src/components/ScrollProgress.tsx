import { motion, useScroll, useSpring } from 'motion/react';
import { useMemo } from 'react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Optimización: Memoizar config del spring
  const springConfig = useMemo(() => ({
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  }), []);

  const scaleX = useSpring(scrollYProgress, springConfig);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-[10000]"
        style={{ scaleX, willChange: 'transform' }}
      />

      {/* Animated Glow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none"
        style={{ scaleX, willChange: 'transform' }}
      >
        <motion.div
          className="absolute right-0 top-0 h-4 w-32 bg-gradient-to-l from-white/50 to-transparent blur-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: 'opacity' }}
        />
      </motion.div>
    </>
  );
}