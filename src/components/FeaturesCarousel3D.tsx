import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Users, MessageSquare, TrendingUp, AlertTriangle } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Protección 24/7',
    description: 'Sistema de seguridad activo que te protege en cada viaje',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
  },
  {
    icon: Award,
    title: 'Recompensas',
    description: 'Gana puntos y premios por conducción responsable',
    gradient: 'from-yellow-400 via-orange-500 to-red-600',
  },
  {
    icon: Users,
    title: 'Red de Moteros',
    description: 'Conecta con miles de motociclistas en Pasto',
    gradient: 'from-purple-400 via-pink-500 to-rose-600',
  },
  {
    icon: AlertTriangle,
    title: 'Alertas Inteligentes',
    description: 'Notificaciones en tiempo real de tráfico y peligros',
    gradient: 'from-red-400 via-orange-500 to-yellow-600',
  },
  {
    icon: TrendingUp,
    title: 'Progreso Personal',
    description: 'Mejora tus habilidades con estadísticas detalladas',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación',
    description: 'Chat grupal y coordinación de rodadas',
    gradient: 'from-blue-400 via-indigo-500 to-purple-600',
  },
];

export function FeaturesCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Optimización: Memoizar constantes
  const { radius, verticalSpacing } = useMemo(() => ({
    radius: 450,
    verticalSpacing: 80
  }), []);

  // Optimización: Memoizar features
  const features = useMemo(() => [
    {
      icon: Shield,
      title: 'Protección 24/7',
      description: 'Sistema de seguridad activo que te protege en cada viaje',
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
    },
    {
      icon: Award,
      title: 'Recompensas',
      description: 'Gana puntos y premios por conducción responsable',
      gradient: 'from-yellow-400 via-orange-500 to-red-600',
    },
    {
      icon: Users,
      title: 'Red de Moteros',
      description: 'Conecta con miles de motociclistas en Pasto',
      gradient: 'from-purple-400 via-pink-500 to-rose-600',
    },
    {
      icon: AlertTriangle,
      title: 'Alertas Inteligentes',
      description: 'Notificaciones en tiempo real de tráfico y peligros',
      gradient: 'from-red-400 via-orange-500 to-yellow-600',
    },
    {
      icon: TrendingUp,
      title: 'Progreso Personal',
      description: 'Mejora tus habilidades con estadísticas detalladas',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    },
    {
      icon: MessageSquare,
      title: 'Comunicación',
      description: 'Chat grupal y coordinación de rodadas',
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
    },
  ], []);

  // Optimización: useCallback para evitar re-creación de funciones
  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl mb-4 font-bold"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #fff, #73bfc4, #ff12ef, #8da0ce, #fff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Características Destacadas
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Todo lo que necesitas en una sola aplicación
          </motion.p>
        </div>

        {/* Helix 3D Carousel */}
        <div className="relative h-[700px] flex items-center justify-center">
          <div className="relative w-full h-full" style={{ perspective: '1500px' }}>
            <div className="relative w-full h-full flex items-center justify-center">
              {features.map((feature, index) => {
                // Optimización: Memoizar cálculos complejos
                const angle = ((index - currentIndex) * 360) / features.length;
                const angleRad = (angle * Math.PI) / 180;

                const x = Math.sin(angleRad) * radius;
                const z = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad * 2) * verticalSpacing;

                const isCenter = index === currentIndex;
                const scale = z > 0 ? 1 : 0.75;
                const opacity = z > 0 ? 1 : Math.max(0.4, 1 - Math.abs(z) / 600);
                const blurAmount = z > 0 ? 0 : Math.abs(z) / 200;

                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer"
                    animate={{
                      x: x,
                      y: y,
                      z: z,
                      rotateY: isCenter ? 0 : angle,
                      scale: scale,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 25,
                    }}
                    onClick={() => goToIndex(index)}
                    style={{
                      transformStyle: 'preserve-3d',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-175px',
                      marginTop: '-200px',
                      zIndex: Math.round(z),
                      filter: `blur(${blurAmount}px)`,
                      opacity: opacity,
                      willChange: 'transform, filter, opacity',
                    }}
                  >
                    <motion.div
                      whileHover={isCenter ? {
                        scale: 1.05,
                        rotateZ: 3,
                      } : {}}
                      className="w-[350px] h-[400px] relative group"
                    >
                      {/* Card Glow */}
                      <motion.div
                        animate={isCenter ? {
                          opacity: [0.4, 0.7, 0.4],
                          scale: [1, 1.05, 1],
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-3xl rounded-3xl opacity-40`}
                      />

                      {/* Glass Card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/30 rounded-3xl overflow-hidden shadow-2xl">

                        {/* Shimmer Effect */}
                        <motion.div
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: index * 0.3,
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                          {/* Icon Container with 3D effect */}
                          <motion.div
                            animate={isCenter ? {
                              rotateY: [0, 360],
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{
                              rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
                              scale: { duration: 2, repeat: Infinity },
                            }}
                            className="relative mb-6"
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-2xl`}>
                              <feature.icon className="w-16 h-16 text-white" strokeWidth={2} />
                            </div>

                            {/* Icon Shadow/Reflection */}
                            <motion.div
                              animate={isCenter ? {
                                opacity: [0.3, 0.6, 0.3],
                              } : {}}
                              transition={{ duration: 2, repeat: Infinity }}
                              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl opacity-50`}
                            />
                          </motion.div>

                          {/* Title */}
                          <h3 className="text-3xl font-bold mb-3 text-white">
                            {feature.title}
                          </h3>

                          {/* Description */}
                          <p className="text-white/80 text-lg leading-relaxed">
                            {feature.description}
                          </p>

                          {/* Decorative Elements */}
                          <motion.div
                            animate={isCenter ? {
                              scale: [0, 1, 0],
                              rotate: [0, 180, 360],
                            } : {}}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-6 right-6 w-4 h-4 bg-white/60 rounded-full"
                          />
                          <motion.div
                            animate={isCenter ? {
                              scale: [0, 1, 0],
                              rotate: [360, 180, 0],
                            } : {}}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            className="absolute bottom-6 left-6 w-3 h-3 bg-white/60 rounded-full"
                          />
                        </div>

                        {/* Glass Reflection */}
                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-16">
          {features.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToIndex(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <div className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/30 hover:bg-white/50'
                }`} />
              {index === currentIndex && (
                <motion.div
                  layoutId="activeFeatureDot"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-sm"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
      />
    </section>
  );
}
