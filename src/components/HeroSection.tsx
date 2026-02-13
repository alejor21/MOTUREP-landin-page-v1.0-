import { motion, useScroll, useTransform } from 'motion/react';
import { Download, Play } from 'lucide-react';
import { useRef, useMemo } from 'react';
import { Phone3D } from './Phone3D';
import { MagneticButton } from './MagneticButton';

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Optimización: Memoizar variants
  const letterVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  }), []);

  const title = useMemo(() => "MOTUREP".split(""), []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24">
      <motion.div
        style={{ y, opacity, scale, willChange: 'transform, opacity' }}
        className="w-full max-w-6xl mx-auto text-center"
      >
        {/* Badge - CENTRADO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full text-sm text-white">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            Disponible en Pasto, Colombia
          </div>
        </motion.div>

        {/* Animated Title - CENTRADO */}
        <div className="text-8xl md:text-[10rem] mb-8 font-extrabold flex justify-center gap-1"
          style={{ letterSpacing: '-0.03em', lineHeight: '0.9' }}
        >
          {title.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              whileHover={{
                scale: 1.1,
                color: '#73bfc4',
              }}
              className="inline-block cursor-pointer text-white"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Animated Subtitle - CENTRADO */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-5xl mb-6 font-light text-center mx-auto"
        >
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffffff, #73bfc4, #ff12ef, #8da0ce, #ffffff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Movilidad inteligente para motociclistas
          </motion.span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed text-center"
        >
          Navegación inteligente, comunidad activa y seguridad vial en una sola aplicación
        </motion.p>

        {/* Buttons - CENTRADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
        >
          <MagneticButton
            href="https://play.google.com/store/apps/moturep"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/90 transition-all shadow-2xl"
          >
            <Download size={24} />
            Descargar ahora
          </MagneticButton>

          <MagneticButton
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/30 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white/20 transition-all"
          >
            <Play size={24} />
            Ver demo
          </MagneticButton>
        </motion.div>

        {/* Phone 3D - CENTRADO */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <Phone3D />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/60 text-sm">Scroll para explorar</span>
            <svg
              className="w-6 h-10 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}