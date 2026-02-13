import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, useEffect, useState, useMemo } from 'react';

const stats = [
  { value: 950, label: 'Kilómetros Mapeados', suffix: '+' },
  { value: 1200, label: 'Rutas Registradas', suffix: '+' },
  { value: 450, label: 'Puntos de Interés', suffix: '+' },
];

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background blobs - MORADOS UNIFICADOS */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        style={{ y, willChange: 'transform' }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* GRID MINIMALISTA - SIN CÍRCULOS */}
        <div className="grid md:grid-cols-3 gap-16 text-center w-full mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="flex flex-col items-center justify-center relative group"
            >
              {/* Número con efecto liquid glass */}
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
              >
                {/* Contenedor con liquid glass */}
                <motion.div
                  className="relative px-8 py-6 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(75, 0, 130, 0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{
                    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* Reflejo superior */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                    }}
                  />

                  {/* Número */}
                  <div className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    <Counter value={stat.value} />
                    {stat.suffix}
                  </div>
                </motion.div>
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3 }}
                className="text-xl text-white/80 text-center"
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
