import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Trophy, Star, Award, Zap, Heart, Target } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  trigger: number; // scroll position in pixels
}

const achievements: Achievement[] = [
  {
    id: 'explorer',
    title: '¡Explorador!',
    description: 'Descubriste el Hero',
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    trigger: 300,
  },
  {
    id: 'curious',
    title: '¡Curioso!',
    description: 'Viste las Funcionalidades',
    icon: Zap,
    color: 'from-cyan-400 to-blue-500',
    trigger: 1400,
  },
  {
    id: 'analyst',
    title: '¡Analista!',
    description: 'Revisaste las Estadísticas',
    icon: Target,
    color: 'from-purple-400 to-pink-500',
    trigger: 3000,
  },
  {
    id: 'social',
    title: '¡Social!',
    description: 'Leíste los Testimonios',
    icon: Heart,
    color: 'from-pink-400 to-red-500',
    trigger: 4000,
  },
  {
    id: 'champion',
    title: '¡Campeón!',
    description: 'Llegaste al CTA',
    icon: Trophy,
    color: 'from-green-400 to-emerald-500',
    trigger: 5400,
  },
  {
    id: 'master',
    title: '¡Maestro MOTUREP!',
    description: 'Completaste todo el recorrido',
    icon: Award,
    color: 'from-purple-500 via-pink-500 to-orange-500',
    trigger: 6200,
  },
];

export function AchievementBadges() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      achievements.forEach((achievement) => {
        if (
          scrollPosition >= achievement.trigger &&
          !unlockedAchievements.has(achievement.id)
        ) {
          setUnlockedAchievements((prev) => new Set(prev).add(achievement.id));
          setShowAchievement(achievement);

          // Hide after 4 seconds
          setTimeout(() => {
            setShowAchievement(null);
          }, 4000);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlockedAchievements]);

  return (
    <>
      {/* Achievement Popup - MUCHO MÁS PEQUEÑO */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-24 right-6 z-[10000] pointer-events-none"
          >
            <motion.div
              className="bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-2xl min-w-[200px]"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(115, 191, 196, 0.2)',
                  '0 0 30px rgba(255, 18, 239, 0.3)',
                  '0 0 20px rgba(141, 160, 206, 0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Header - Compacto */}
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${showAchievement.color} flex items-center justify-center`}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1, type: 'spring' }}
                >
                  <showAchievement.icon className="w-4 h-4 text-white" />
                </motion.div>

                <div>
                  <p className="text-white/50 text-[10px] font-medium">
                    ¡Logro!
                  </p>
                  <h3 className="text-sm font-bold text-white">
                    {showAchievement.title}
                  </h3>
                </div>
              </div>

              {/* Description - Más pequeña */}
              <p className="text-white/70 text-xs ml-10">
                {showAchievement.description}
              </p>

              {/* Progress - Compacto */}
              <div className="mt-2 flex gap-0.5">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`h-0.5 flex-1 rounded-full ${
                      unlockedAchievements.has(achievement.id)
                        ? `bg-gradient-to-r ${achievement.color}`
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Confetti particles - Más pequeños */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${showAchievement.color}`}
                  initial={{ 
                    x: 100,
                    y: 30,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: 100 + Math.cos((i * Math.PI * 2) / 8) * 60,
                    y: 30 + Math.sin((i * Math.PI * 2) / 8) * 60,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Counter (bottom right, subtle) */}
      {unlockedAchievements.size > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-28 right-8 z-[9998] bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5"
        >
          <Trophy className="w-3 h-3 text-yellow-400" />
          <span className="text-white text-xs font-medium">
            {unlockedAchievements.size}/{achievements.length}
          </span>
        </motion.div>
      )}
    </>
  );
}