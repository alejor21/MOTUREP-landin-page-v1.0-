import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const items = [
  { title: 'Mapas Interactivos', desc: 'Navegación fluida con Flutter Maps', span: 'md:col-span-2', emoji: '🗺️' },
  { title: 'Pico y Placa', desc: 'Alertas automáticas de restricciones', span: 'md:col-span-1', emoji: '🚦' },
  { title: 'Contactos SOS', desc: 'Comparte ubicación en tiempo real', span: 'md:col-span-1', emoji: '🆘' },
  { title: 'Rutas Seguras', desc: 'Navegación inteligente y segura', span: 'md:col-span-2', emoji: '🛣️' },
  { title: 'Alertas Meteorológicas', desc: 'Clima en tiempo real', span: 'md:col-span-1', emoji: '⛈️' },
  { title: 'Comunidad Activa', desc: 'Red de motociclistas en Pasto', span: 'md:col-span-1', emoji: '👥' },
];

export function BentoGrid() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      <motion.div 
        style={{ y }}
        className="max-w-6xl mx-auto"
      >
        {/* GRID CENTRADO */}
        <div className="grid md:grid-cols-3 gap-6 w-full mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: i * 0.15,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                boxShadow: '0 30px 60px rgba(138, 43, 226, 0.4)',
              }}
              className={`${item.span} relative overflow-hidden group`}
              style={{
                background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '24px',
                padding: '40px',
                minHeight: '240px',
              }}
            >
              {/* Liquid glass effect - shimmer */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Glass reflection top */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)',
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                }}
              />

              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 100%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 0%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 0% 0%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Border glow on hover */}
              <motion.div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.5), rgba(255, 255, 255, 0.2), rgba(138, 43, 226, 0.5))',
                  filter: 'blur(8px)',
                  zIndex: -1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Emoji */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, type: "spring" }}
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="text-5xl mb-4 relative z-10 text-center md:text-left"
              >
                {item.emoji}
              </motion.div>

              <h3 className="text-3xl mb-3 font-bold relative z-10 text-white text-center md:text-left">
                {item.title}
              </h3>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.5 }}
                className="text-lg text-white/80 relative z-10 text-center md:text-left"
              >
                {item.desc}
              </motion.p>

              {/* Hover glow effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}