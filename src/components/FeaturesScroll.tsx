import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useMemo } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

export function FeaturesScroll() {
  const containerRef = useRef(null);

  // Optimización: Memoizar features
  const specialFeatures = useMemo(() => [
    {
      title: 'Mapas Interactivos',
      description: 'Navegación fluida y precisa con Flutter Maps',
      icon: '🗺️',
      color: 'from-red-400 via-pink-500 to-purple-600',
    },
    {
      title: 'Alertas Inteligentes',
      description: 'Notificaciones de pico y placa automáticas',
      icon: '🔔',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
    },
    {
      title: 'Clima en Tiempo Real',
      description: 'Condiciones meteorológicas actualizadas',
      icon: '⛈️',
      color: 'from-green-400 via-emerald-500 to-teal-600',
    },
    {
      title: 'Comunidad Activa',
      description: 'Conecta con motociclistas de Pasto',
      icon: '👥',
      color: 'from-orange-400 via-red-500 to-pink-600',
    },
  ], []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Optimización: Memoizar transforms
  const x1 = useTransform(scrollYProgress, [0, 1], [-200, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [200, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Características Principales
          </h2>
          <p className="text-2xl text-white/80">
            Lo que nos hace únicos
          </p>
        </motion.div>

        {/* Feature Cards with Scroll Effect */}
        <div className="relative min-h-[600px] flex flex-col gap-12">
          {specialFeatures.map((feature, i) => (
            <motion.div
              key={i}
              style={{
                x: i === 0 ? x1 : x2,
                opacity,
                scale,
                willChange: 'transform, opacity',
              }}
              className="w-full"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                className="relative max-w-4xl mx-auto"
              >
                {/* Liquid Glass Card */}
                <div className={`relative bg-gradient-to-br ${feature.color} p-1 rounded-3xl overflow-hidden`}>
                  {/* Inner card */}
                  <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-12 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <motion.div
                      animate={{
                        background: [
                          'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                          'linear-gradient(225deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                          'linear-gradient(315deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                          'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0"
                    />

                    {/* Shimmer */}
                    <motion.div
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      {/* Icon Section */}
                      <div className="flex-shrink-0">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className={`w-32 h-32 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center text-6xl shadow-2xl relative`}
                        >
                          {feature.icon}

                          {/* Glow */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-2xl opacity-50 -z-10`} />
                        </motion.div>
                      </div>

                      {/* Text Section */}
                      <div className="flex-1 text-center md:text-left">
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                          {feature.title.split('').map((char, idx) => (
                            <motion.span
                              key={idx}
                              whileHover={{
                                scale: 1.2,
                                color: '#73bfc4',
                                display: 'inline-block',
                              }}
                              className="inline-block"
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                          ))}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="text-xl text-white/90 leading-relaxed"
                        >
                          {feature.description}
                        </motion.p>
                      </div>
                    </div>

                    {/* Glass reflection */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none" />
                  </div>
                </div>

                {/* Outer Glow */}
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-3xl opacity-20 -z-10 rounded-3xl`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}