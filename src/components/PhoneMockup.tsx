import { motion } from 'motion/react';
import { MapPin, Award, Users, Shield, TrendingUp, MessageSquare, Star, Bell } from 'lucide-react';

interface PhoneMockupProps {
  type: 'map' | 'achievements' | 'community' | 'security' | 'analytics' | 'chat';
  isActive: boolean;
  scheme: { bg: string };
}

export function PhoneMockup({ type, isActive, scheme }: PhoneMockupProps) {
  return (
    <motion.div
      animate={{
        scale: isActive ? [1, 1.02, 1] : 1,
      }}
      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
      className="relative w-[200px] h-[400px] mx-auto"
    >
      {/* iPhone Frame */}
      <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black rounded-[2.5rem] border-[6px] border-zinc-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-3xl z-30 flex items-center justify-center gap-2">
          <div className="w-12 h-2.5 bg-zinc-900 rounded-full" />
          <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />
        </div>

        {/* Screen Content */}
        <div className={`w-full h-full bg-gradient-to-br ${scheme.bg} relative overflow-hidden`}>
          
          {/* Map Screen */}
          {type === 'map' && (
            <div className="w-full h-full relative">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20">
                {/* Grid Lines */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-white/20" style={{ top: `${i * 12.5}%` }} />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute h-full w-px bg-white/20" style={{ left: `${i * 16.6}%` }} />
                  ))}
                </div>
              </div>

              {/* Animated Markers */}
              {isActive && (
                <>
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="absolute top-1/4 left-1/3"
                  >
                    <div className="relative">
                      <MapPin className="text-red-500 w-6 h-6 drop-shadow-lg" fill="red" />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-red-500 rounded-full blur-md"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="absolute top-1/2 left-2/3"
                  >
                    <div className="relative">
                      <MapPin className="text-yellow-500 w-6 h-6 drop-shadow-lg" fill="yellow" />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="absolute inset-0 bg-yellow-500 rounded-full blur-md"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                    className="absolute bottom-1/4 left-1/2"
                  >
                    <div className="relative">
                      <MapPin className="text-green-500 w-6 h-6 drop-shadow-lg" fill="green" />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute inset-0 bg-green-500 rounded-full blur-md"
                      />
                    </div>
                  </motion.div>
                </>
              )}

              {/* Top Bar */}
              <div className="absolute top-8 left-0 right-0 px-4">
                <div className="bg-black/60 backdrop-blur-xl rounded-2xl px-4 py-2 text-white text-xs flex items-center gap-2">
                  <MapPin size={14} className="text-cyan-400" />
                  <span>Pasto, Nariño</span>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Screen */}
          {type === 'achievements' && (
            <div className="w-full h-full relative flex flex-col items-center justify-center p-6">
              {/* Title */}
              <div className="absolute top-8 left-0 right-0 text-center">
                <h3 className="text-white text-sm font-bold">Logros</h3>
              </div>

              {/* Medals */}
              <div className="grid grid-cols-2 gap-4">
                {isActive && (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                        <Award className="text-white w-8 h-8" />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="absolute -top-2 -right-2"
                      >
                        <Star className="text-yellow-400 w-5 h-5" fill="gold" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: 'spring' }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                        <Shield className="text-white w-8 h-8" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6, type: 'spring' }}
                      className="relative"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                        <TrendingUp className="text-white w-8 h-8" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8, type: 'spring' }}
                      className="relative opacity-40"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-xl">
                        <Award className="text-white w-8 h-8" />
                      </div>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-12 left-0 right-0 px-6">
                <div className="bg-black/60 backdrop-blur-xl rounded-full p-2">
                  <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={isActive ? { width: '75%' } : {}}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    />
                  </div>
                  <p className="text-white text-xs text-center mt-2">Nivel 5 - 75%</p>
                </div>
              </div>
            </div>
          )}

          {/* Community Screen */}
          {type === 'community' && (
            <div className="w-full h-full relative p-4">
              <div className="absolute top-8 left-0 right-0 text-center">
                <h3 className="text-white text-sm font-bold">Comunidad</h3>
              </div>

              <div className="flex flex-col gap-3 mt-16">
                {isActive && (
                  <>
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-black/60 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-white/30 rounded w-20 mb-1" />
                          <div className="h-1.5 bg-white/20 rounded w-16" />
                        </div>
                        <Users className="text-purple-400 w-4 h-4" />
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Security Screen */}
          {type === 'security' && (
            <div className="w-full h-full relative flex flex-col items-center justify-center">
              <motion.div
                animate={isActive ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Shield className="text-white w-12 h-12" />
                </div>
                {isActive && (
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-green-400 rounded-full blur-xl"
                  />
                )}
              </motion.div>

              <p className="text-white text-xs mt-6 font-bold">Protegido</p>

              {/* Alert Notifications */}
              {isActive && (
                <>
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-16 left-4 right-4 bg-red-500/90 backdrop-blur-xl rounded-xl p-2 flex items-center gap-2"
                  >
                    <Bell className="text-white w-4 h-4" />
                    <span className="text-white text-xs">Alerta de tráfico</span>
                  </motion.div>

                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute top-28 left-4 right-4 bg-yellow-500/90 backdrop-blur-xl rounded-xl p-2 flex items-center gap-2"
                  >
                    <Bell className="text-white w-4 h-4" />
                    <span className="text-white text-xs">Pico y placa</span>
                  </motion.div>
                </>
              )}
            </div>
          )}

          {/* Analytics Screen */}
          {type === 'analytics' && (
            <div className="w-full h-full relative p-4">
              <div className="absolute top-8 left-0 right-0 text-center">
                <h3 className="text-white text-sm font-bold">Estadísticas</h3>
              </div>

              <div className="flex flex-col gap-4 mt-16">
                {/* Bar Chart */}
                <div className="flex items-end gap-2 h-32 px-4">
                  {isActive && [60, 80, 45, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: i * 0.2, type: 'spring' }}
                      className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg"
                    />
                  ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-2">
                  {isActive && (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="bg-black/60 backdrop-blur-xl rounded-xl p-2 text-center"
                      >
                        <p className="text-cyan-400 text-lg font-bold">1.2K</p>
                        <p className="text-white text-xs">km</p>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.4 }}
                        className="bg-black/60 backdrop-blur-xl rounded-xl p-2 text-center"
                      >
                        <p className="text-green-400 text-lg font-bold">45</p>
                        <p className="text-white text-xs">Viajes</p>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Chat Screen */}
          {type === 'chat' && (
            <div className="w-full h-full relative p-4 flex flex-col">
              <div className="absolute top-8 left-0 right-0 text-center">
                <h3 className="text-white text-sm font-bold">Chat Comunidad</h3>
              </div>

              <div className="flex-1 flex flex-col gap-2 mt-16 overflow-hidden">
                {isActive && (
                  <>
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="self-start max-w-[70%]"
                    >
                      <div className="bg-white/20 backdrop-blur-xl rounded-2xl rounded-tl-none px-3 py-2">
                        <p className="text-white text-xs">¡Hola moteros! 🏍️</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="self-end max-w-[70%]"
                    >
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rounded-tr-none px-3 py-2">
                        <p className="text-white text-xs">¿Rodada hoy? 🚦</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="self-start max-w-[70%]"
                    >
                      <div className="bg-white/20 backdrop-blur-xl rounded-2xl rounded-tl-none px-3 py-2">
                        <p className="text-white text-xs">¡Claro! A las 5pm 👍</p>
                      </div>
                    </motion.div>

                    {/* Typing indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="self-start"
                    >
                      <div className="bg-white/20 backdrop-blur-xl rounded-2xl px-3 py-2 flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Screen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Status Bar */}
        <div className="absolute top-2 left-0 right-0 px-8 flex justify-between items-center text-white text-xs z-20">
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <div className="w-3 h-2 border border-white rounded-sm" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Phone Shadow */}
      <motion.div
        animate={isActive ? {
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl -z-10 rounded-[2.5rem]"
      />
    </motion.div>
  );
}