import { motion, useScroll, useTransform } from 'motion/react';
import { Download } from 'lucide-react';
import { useRef } from 'react';
import { MagneticButton } from './MagneticButton';

export function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      <motion.div 
        style={{ scale, opacity }}
        className="max-w-5xl mx-auto text-center"
      >
        {/* TITULO CENTRADO */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl mb-8 font-bold text-white text-center"
        >
          Descarga MOTUREP hoy
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl text-white/80 mb-16 max-w-3xl mx-auto text-center"
        >
          Únete a cientos de motociclistas en Pasto que ya disfrutan de una movilidad más segura e inteligente
        </motion.p>

        {/* BOTON CENTRADO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 20px 60px rgba(115, 191, 196, 0.3)',
                '0 20px 60px rgba(255, 18, 239, 0.3)',
                '0 20px 60px rgba(141, 160, 206, 0.3)',
                '0 20px 60px rgba(115, 191, 196, 0.3)',
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="rounded-full"
          >
            <MagneticButton
              href="https://play.google.com/store/apps/moturep"
              strength={0.4}
              className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full text-xl font-semibold hover:bg-white/90 transition-all"
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Download size={28} />
              </motion.div>
              Descargar para Android
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* FEATURES CENTRADAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-base text-white/70"
        >
          {['✓ Gratis para siempre', '✓ Sin anuncios', '✓ Android 8.0+'].map((text, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
            >
              {text}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}