import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUp, Rocket } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        isScrolling.current = false;
      });
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-8 right-8 z-[9999] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-1 rounded-full shadow-2xl cursor-pointer group"
          style={{ willChange: 'transform, opacity' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-full p-4 relative overflow-hidden">
            {/* Icon Switcher */}
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.div
                  key="rocket"
                  initial={{ y: 20, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Rocket className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="arrow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <ArrowUp className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
