import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Award, Users2, Navigation, BarChart3, MessageCircle, Shield, Pause, Play } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

const features = [
  {
    title: 'Mapa Interactivo',
    description: 'Visualiza alertas en tiempo real con precisión',
    icon: Navigation,
    color: 'from-cyan-400 via-blue-500 to-indigo-500',
    emoji: '🗺️',
    phoneType: 'map' as const,
    phoneBg: 'from-cyan-900 via-teal-900 to-blue-900',
  },
  {
    title: 'Sistema de Logros',
    description: 'Gamificación por conducción segura',
    icon: Award,
    color: 'from-yellow-400 via-orange-500 to-red-500',
    emoji: '🏆',
    phoneType: 'achievements' as const,
    phoneBg: 'from-yellow-900 via-orange-900 to-amber-900',
  },
  {
    title: 'Comunidad Activa',
    description: 'Rodadas y eventos grupales',
    icon: Users2,
    color: 'from-purple-400 via-pink-500 to-rose-500',
    emoji: '👥',
    phoneType: 'community' as const,
    phoneBg: 'from-purple-900 via-violet-900 to-fuchsia-900',
  },
  {
    title: 'Seguridad Total',
    description: 'Protección y alertas inteligentes',
    icon: Shield,
    color: 'from-green-400 via-emerald-500 to-teal-500',
    emoji: '🛡️',
    phoneType: 'security' as const,
    phoneBg: 'from-green-900 via-emerald-900 to-teal-900',
  },
  {
    title: 'Análisis de Datos',
    description: 'Estadísticas detalladas de conducción',
    icon: BarChart3,
    color: 'from-green-400 via-teal-500 to-cyan-500',
    emoji: '📊',
    phoneType: 'analytics' as const,
    phoneBg: 'from-blue-900 via-indigo-900 to-cyan-900',
  },
  {
    title: 'Chat en Vivo',
    description: 'Comunícate con otros motociclistas',
    icon: MessageCircle,
    color: 'from-blue-400 via-indigo-500 to-purple-500',
    emoji: '💬',
    phoneType: 'chat' as const,
    phoneBg: 'from-indigo-900 via-purple-900 to-blue-900',
  },
];

export function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const radius = useMemo(() => 500, []);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const rotateLeft = useCallback(() => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  }, []);

  const rotateRight = useCallback(() => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev + 1) % features.length);
  }, []);

  const goToIndex = useCallback((index: number) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
  }, []);

  const handleDragEnd = useCallback((event: any, info: any) => {
    const dragThreshold = 50;
    if (info.offset.x > dragThreshold) {
      rotateLeft();
    } else if (info.offset.x < -dragThreshold) {
      rotateRight();
    }
    setDragOffset(0);
  }, [rotateLeft, rotateRight]);

  // Auto-rotate functionality
  useEffect(() => {
    if (!isAutoRotating || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        rotateLeft();
      } else if (e.key === 'ArrowRight') {
        rotateRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rotateLeft, rotateRight]);

  return (
    <section ref={sectionRef} className="py-40 relative overflow-visible">
      <motion.div style={{ y, opacity, willChange: 'transform, opacity' }} className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl mb-6 font-bold text-white"
          >
            Funcionalidades
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl text-white/90 max-w-3xl mx-auto"
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9), #73bfc4, #ff12ef, rgba(255,255,255,0.9))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Mira la app en acción - Click para interactuar
            </motion.span>
          </motion.p>
        </div>        {/* 3D Carousel with Phone Mockups */}
        <div
          className="relative h-[850px] flex items-center justify-center mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative w-full h-full max-w-5xl mx-auto"
            style={{ perspective: '2000px' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {features.map((feature, index) => {
                const angle = ((index - currentIndex) * 360) / features.length;
                const angleRad = (angle * Math.PI) / 180;
                const x = Math.sin(angleRad) * radius;
                const z = Math.cos(angleRad) * radius;
                const isFront = Math.abs(angle) < 60 || Math.abs(angle) > 300;
                const isCenter = index === currentIndex;

                // Simplificar blur - solo en los lados
                const blurAmount = z > 0 ? 0 : Math.min(8, Math.abs(z) / 60);
                const opacity = z > 0 ? 1 : Math.max(0.4, 1 - Math.abs(z) / 500);

                return (
                  <div key={index}>
                    {/* Main Card */}
                    <motion.div
                      className="absolute cursor-pointer"
                      animate={{
                        x: x,
                        z: z,
                        scale: z < -200 ? 0.7 : z < 0 ? 0.85 : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      onClick={() => goToIndex(index)}
                      style={{
                        transformStyle: 'preserve-3d',
                        left: '50%',
                        top: '30%',
                        marginLeft: '-180px',
                        marginTop: '-200px',
                        zIndex: Math.round(z),
                        filter: `blur(${blurAmount}px)`,
                        opacity: opacity,
                      }}
                    >
                      <motion.div
                        whileHover={isFront ? {
                          scale: 1.02,
                          y: -8,
                        } : {}}
                        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                        className="w-[360px] h-[500px] relative group"
                      >
                        {/* Shadow - Estático para mejor performance */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-2xl rounded-3xl opacity-20`}
                        />

                        {/* Liquid Glass Card */}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent backdrop-blur-xl border-2 border-white/30 rounded-3xl overflow-hidden shadow-2xl"
                        >
                          {/* Content */}
                          <div className="relative z-10 p-6 h-full flex flex-col items-center">
                            {/* Phone Mockup */}
                            <div className="mb-6 mt-4">
                              <PhoneMockup
                                type={feature.phoneType}
                                isActive={isCenter}
                                scheme={{ bg: feature.phoneBg }}
                              />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-2 text-white text-center">
                              {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-white/90 leading-relaxed text-center px-2">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={rotateLeft}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-2xl border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-50 text-white shadow-xl"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={rotateRight}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-2xl border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-50 text-white shadow-xl"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Auto-rotate toggle */}
          <motion.button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-2xl border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-50 text-white"
          >
            <AnimatePresence mode="wait">
              {isAutoRotating ? (
                <motion.div
                  key="pause"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Pause size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-2xl border-2 border-white/30 rounded-full px-6 py-2 text-white font-semibold"
          >
            {currentIndex + 1} / {features.length}
          </motion.div>
        </div>

        {/* Dots Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {features.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative h-3 rounded-full transition-all ${index === currentIndex ? 'w-12 bg-white' : 'w-3 bg-white/30'
                }`}
            >
              {index === currentIndex && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 text-lg mb-2">
            👈 Arrastra, usa flechas o teclado para navegar 👉
          </p>
          <p className="text-white/60 text-sm">
            Click en cualquier tarjeta para centrarla • Mueve el mouse sobre la tarjeta central
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}