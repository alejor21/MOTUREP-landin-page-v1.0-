import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useMemo, useCallback } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'MOTUREP ha transformado completamente mi experiencia como mensajero. La tranquilidad que me da es invaluable.',
    author: 'Carlos Rodríguez',
    role: 'Mensajero en Pasto',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    quote: 'Las alertas de Pico y Placa son increíblemente útiles. Ya no me preocupo por multas innecesarias.',
    author: 'Andrea Gómez',
    role: 'Estudiante',
    rating: 5,
    avatar: '👩‍🎓',
  },
  {
    quote: 'La comunidad de motociclistas es activa y solidaria. He hecho grandes amigos gracias a la app.',
    author: 'Miguel Torres',
    role: 'Emprendedor',
    rating: 5,
    avatar: '👨‍💻',
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = useCallback((index: number) => {
    setExpandedIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section ref={ref} className="py-32 px-6">
      <motion.div
        style={{ y, willChange: 'transform' }}
        className="max-w-6xl mx-auto"
      >
        {/* HEADER CENTRADO */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl mb-6 font-bold text-white"
          >
            Testimonios
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/80"
          >
            Lo que dicen nuestros usuarios
          </motion.p>
        </div>

        {/* GRID CENTRADO */}
        <div className="grid md:grid-cols-3 gap-8 w-full mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, rotateY: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.2,
                duration: 0.8,
                type: "spring",
              }}
              whileHover={{
                y: -15,
                scale: expandedIndex === i ? 1.05 : 1.05,
                rotateY: 5,
                boxShadow: '0 30px 60px rgba(255, 18, 239, 0.3)',
              }}
              onClick={() => handleCardClick(i)}
              className="bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-10 relative overflow-hidden text-center md:text-left cursor-pointer"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
            >
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.2, type: "spring" }}
                className="text-6xl mb-4 flex justify-center md:justify-start"
              >
                {item.avatar}
              </motion.div>

              {/* Rating Stars */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3 }}
                className="flex gap-1 mb-4 justify-center md:justify-start"
              >
                {[...Array(item.rating)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </motion.div>

              {/* Quote mark */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, type: "spring" }}
                className="text-6xl text-white/20 mb-4"
              >
                "
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.4 }}
                className="text-lg text-white/90 mb-8 leading-relaxed"
              >
                {item.quote}
              </motion.p>

              {/* Expanded content */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === i ? 'auto' : 0,
                  opacity: expandedIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/20 pt-4 mb-4">
                  <p className="text-white/70 text-sm">
                    Verificado • Usuario activo desde 2024
                  </p>
                </div>
              </motion.div>

              <div className="text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.5 }}
                  className="text-white font-semibold mb-1"
                >
                  {item.author}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.6 }}
                  className="text-sm text-white/60"
                >
                  {item.role}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}