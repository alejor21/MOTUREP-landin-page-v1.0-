import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function EasterEggs() {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newCode = [...konamiCode, e.key].slice(-10);
      setKonamiCode(newCode);

      // Check if konami code is complete
      if (JSON.stringify(newCode) === JSON.stringify(konami)) {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 5000);
        setKonamiCode([]);
      }
    };

    const handleClick = () => {
      const now = Date.now();
      
      // Reset if more than 1 second between clicks
      if (now - lastClickTime > 1000) {
        setClickCount(1);
      } else {
        setClickCount(prev => prev + 1);
      }
      
      setLastClickTime(now);

      // Triple click triggers confetti
      if (clickCount >= 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        setClickCount(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [konamiCode, clickCount, lastClickTime]);

  return (
    <>
      {/* Confetti on Triple Click */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[10000]">
            {[...Array(100)].map((_, i) => {
              const x = Math.random() * window.innerWidth;
              const y = -50;
              const rotation = Math.random() * 360;
              const colors = ['#73bfc4', '#ff12ef', '#8da0ce', '#ffffff'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: x,
                    top: y,
                    backgroundColor: color,
                  }}
                  initial={{ 
                    y: y,
                    x: x,
                    opacity: 1,
                    rotate: rotation,
                  }}
                  animate={{
                    y: window.innerHeight + 100,
                    x: x + (Math.random() - 0.5) * 200,
                    opacity: 0,
                    rotate: rotation + 360,
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    ease: 'easeIn',
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Konami Code Secret */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] pointer-events-none"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 p-1 rounded-3xl">
              <div className="bg-black/90 backdrop-blur-xl p-12 rounded-3xl text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  🏍️
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  ¡Código Secreto Desbloqueado!
                </h2>
                <p className="text-xl text-white/80">
                  Eres un verdadero motociclista de élite 🚀
                </p>
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mt-6 text-2xl font-bold"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #73bfc4, #ff12ef, #8da0ce, #73bfc4)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  MOTUREP POWER 💜
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Counter Hint */}
      {clickCount > 0 && clickCount < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-full px-6 py-2 text-white text-sm">
            {clickCount}/3 clicks... 🎉
          </div>
        </motion.div>
      )}
    </>
  );
}
