import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export function SectionTransition({ children, delay = 0 }: SectionTransitionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      initial={{ opacity: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
