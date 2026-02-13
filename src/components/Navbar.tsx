import { motion, AnimatePresence } from 'motion/react';
import { Download, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isDark, setIsDark] = useState(true);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 px-6 py-4 z-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Liquid Glass Container */}
        <motion.div
          animate={{
            boxShadow: [
              '0 8px 32px rgba(115, 191, 196, 0.1)',
              '0 8px 32px rgba(255, 18, 239, 0.15)',
              '0 8px 32px rgba(141, 160, 206, 0.1)',
              '0 8px 32px rgba(115, 191, 196, 0.1)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative bg-black/20 backdrop-blur-3xl border-2 border-white/20 rounded-full px-8 py-4 flex items-center justify-between shadow-xl overflow-hidden"
        >
          {/* Animated gradient overlay */}
          <motion.div
            animate={{
              background: [
                'linear-gradient(90deg, transparent, rgba(115, 191, 196, 0.1), transparent)',
                'linear-gradient(180deg, transparent, rgba(255, 18, 239, 0.1), transparent)',
                'linear-gradient(270deg, transparent, rgba(141, 160, 206, 0.1), transparent)',
                'linear-gradient(90deg, transparent, rgba(115, 191, 196, 0.1), transparent)',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0"
          />

          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between w-full">
            {/* Logo with Icon */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-xl font-bold text-white"
            >
              {/* Moto Icon */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl"
              >
                🏍️
              </motion.div>

              {/* Logo Text */}
              <div className="flex">
                {'MOTUREP'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    whileHover={{
                      scale: 1.3,
                      y: -5,
                      background: 'linear-gradient(to right, #73bfc4, #ff12ef)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                    className="inline-block cursor-pointer"
                    style={{
                      background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
              {['Funcionalidades', 'Estadísticas', 'Comunidad'].map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ 
                    scale: 1.05,
                  }}
                  className="transition-colors cursor-pointer hover:text-purple-400"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <motion.button
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-14 h-14 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full flex items-center justify-center overflow-hidden group"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={20} className="text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={20} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>

              {/* Download button */}
              <motion.a
                href="https://play.google.com/store/apps/moturep"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-white/90 transition-all relative overflow-hidden group"
              >
                {/* Shimmer on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Download size={16} />
                </motion.div>
                <span className="relative z-10">Descargar</span>
              </motion.a>
            </div>
          </div>

          {/* Glass reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none" />
        </motion.div>
      </div>
    </motion.nav>
  );
}