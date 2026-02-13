import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', name: 'Inicio', offset: 0 },
  { id: 'carousel', name: 'Funcionalidades', offset: 1000 },
  { id: 'stats', name: 'Estadísticas', offset: 2600 },
  { id: 'testimonios', name: 'Testimonios', offset: 3600 },
  { id: 'cta', name: 'Descarga', offset: 5000 },
];

export function SectionIndicators() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offset) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[9999] hidden lg:flex flex-col gap-6 pointer-events-none">
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          className="relative flex items-center gap-3"
        >
          {/* Vertical line connecting dots */}
          {index < sections.length - 1 && (
            <motion.div
              className="absolute top-6 left-1 w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          )}

          {/* Dot */}
          <motion.div
            className="relative"
            animate={{
              scale: activeSection === index ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Outer glow for active */}
            {activeSection === index && (
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-md"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
            
            {/* Main dot */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all relative z-10 ${
                activeSection === index
                  ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 shadow-lg'
                  : 'bg-white/40'
              }`}
            />
          </motion.div>

          {/* Section name - always visible for active section */}
          {activeSection === index && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.8 }}
              className="absolute right-6 bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-xl border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-medium whitespace-nowrap shadow-xl"
            >
              {section.name}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}