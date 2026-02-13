import { motion } from 'motion/react';
import { useMemo } from 'react';

export function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 2 + 3,
      delay: Math.random() * 1.5,
      startX: Math.random() * 80 - 40,
      endX: Math.random() * 80 - 40,
      startY: Math.random() * 80 - 40,
      endY: Math.random() * 80 - 40,
      colorIndex: i % 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => {
        const { id, size, duration, delay, startX, endX, startY, endY, colorIndex } = particle;

        return (
          <motion.div
            key={id}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: '50%',
              top: '50%',
              background: colorIndex === 0
                ? 'radial-gradient(circle, rgba(115, 191, 196, 0.8), transparent)'
                : colorIndex === 1
                  ? 'radial-gradient(circle, rgba(255, 18, 239, 0.8), transparent)'
                  : 'radial-gradient(circle, rgba(141, 160, 206, 0.8), transparent)',
              willChange: 'transform, opacity',
            }}
            animate={{
              x: [startX, endX, startX],
              y: [startY, endY, startY],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}
