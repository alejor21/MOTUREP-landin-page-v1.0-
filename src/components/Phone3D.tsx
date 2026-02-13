import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, useCallback, useMemo } from 'react';

export function Phone3D() {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = useMemo(() => ({
    stiffness: 200,
    damping: 40,
  }), []);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    requestAnimationFrame(() => {
      x.set(xPct);
      y.set(yPct);
    });
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
          willChange: 'transform',
        }}
        className="relative cursor-pointer"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          {/* Phone body */}
          <motion.div
            className="relative w-[320px] h-[640px] bg-gradient-to-br from-zinc-900 via-zinc-800 to-black rounded-[3.5rem] border-[10px] border-zinc-800 shadow-2xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: isHovered
                ? '0 30px 60px rgba(0, 0, 0, 0.7)'
                : '0 20px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20 flex items-center justify-center gap-2">
              <div className="w-14 h-3 bg-zinc-900 rounded-full" />
              <div className="w-3 h-3 bg-zinc-900 rounded-full" />
            </div>

            {/* Screen content */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(115, 191, 196, 0.3), rgba(141, 160, 206, 0.3))',
                  'linear-gradient(135deg, rgba(255, 18, 239, 0.3), rgba(115, 191, 196, 0.3))',
                  'linear-gradient(135deg, rgba(141, 160, 206, 0.3), rgba(255, 18, 239, 0.3))',
                  'linear-gradient(135deg, rgba(115, 191, 196, 0.3), rgba(141, 160, 206, 0.3))',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="w-full h-full flex flex-col items-center justify-center relative"
              style={{ willChange: 'background' }}
            >
              {/* App icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-8xl mb-6"
                style={{ willChange: 'transform' }}
              >
                🏍️
              </motion.div>

              {/* App name */}
              <motion.div
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold text-white mb-2"
                style={{ willChange: 'opacity' }}
              >
                MOTUREP
              </motion.div>

              <div className="text-sm text-white/60">Seguridad Vial</div>

              {/* Floating UI elements */}
              <motion.div
                style={{ transform: 'translateZ(30px)', willChange: 'transform, opacity' }}
                className="absolute top-20 left-6 bg-purple-900/60 backdrop-blur-xl px-4 py-2 rounded-full text-sm text-white/90 border border-purple-500/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                🗺️ Mapa activo
              </motion.div>

              {/* Badge 2 */}
              <motion.div
                className="absolute top-32 right-6 bg-purple-900/60 backdrop-blur-xl px-4 py-2 rounded-full text-sm text-white/90 border border-purple-500/30"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ willChange: 'opacity' }}
              >
                ⚡ En vivo
              </motion.div>

              <motion.div
                style={{ transform: 'translateZ(30px)', willChange: 'transform' }}
                className="absolute bottom-32 left-12 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-2xl text-white text-sm border border-white/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏆 Nivel 5
              </motion.div>
            </motion.div>

            {/* Reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />
          </motion.div>

          {/* Glow effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.6 : 0.3,
              scale: isHovered ? 1.1 : 1,
            }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[3.5rem] blur-3xl -z-10"
            style={{ willChange: isHovered ? 'opacity, transform' : 'auto' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}