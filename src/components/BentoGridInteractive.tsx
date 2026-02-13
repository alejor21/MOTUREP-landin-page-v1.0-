import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo, useCallback } from 'react';
import {
  Shield,
  MapPin,
  Users,
  Bell,
  TrendingUp,
  Clock,
  X,
  Smartphone,
  Zap
} from 'lucide-react';

export function BentoGridInteractive() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Optimización: Memoizar items
  const bentoItems = useMemo(() => [
    {
      id: 1,
      title: 'Alertas en Tiempo Real',
      description: 'Recibe notificaciones instantáneas sobre accidentes, controles y condiciones viales',
      icon: Bell,
      color: 'from-cyan-500 to-blue-500',
      details: 'Sistema de alertas inteligente que te mantiene informado sobre:\n• Accidentes reportados por la comunidad\n• Controles de tránsito en tu ruta\n• Condiciones climáticas adversas\n• Cierres de vías y desvíos',
      stats: '300+ alertas diarias',
    },
    {
      id: 2,
      title: 'Mapa Inteligente',
      description: 'Navega por Pasto con información actualizada de rutas y puntos de interés',
      icon: MapPin,
      color: 'from-purple-500 to-pink-500',
      details: 'Navegación optimizada para motociclistas:\n• Rutas recomendadas según tráfico\n• Puntos de interés para moteros\n• Estaciones de servicio cercanas\n• Zonas seguras de parqueo',
      stats: '950+ km mapeados',
    },
    {
      id: 3,
      title: 'Comunidad Activa',
      description: 'Conecta con más de 500 motociclistas en Pasto',
      icon: Users,
      color: 'from-pink-500 to-orange-500',
      details: 'Red social para motociclistas:\n• Comparte rutas y experiencias\n• Organiza rodadas grupales\n• Sistema de reputación por ayudas\n• Chat comunitario en tiempo real',
      stats: 'Red local activa',
    },
    {
      id: 4,
      title: 'Protección Total',
      description: 'Tu seguridad es nuestra prioridad con múltiples capas de protección',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      details: 'Funciones de seguridad avanzadas:\n• Botón de emergencia SOS\n• Compartir ubicación en vivo\n• Detección de caídas automática\n• Contactos de emergencia',
      stats: '99.9% uptime',
    },
    {
      id: 5,
      title: 'Estadísticas',
      description: 'Analiza tus rutas, distancias y patrones de conducción',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-500',
      details: 'Dashboard completo de análisis:\n• Kilómetros recorridos\n• Velocidad promedio\n• Rutas más frecuentes\n• Consumo de combustible estimado',
      stats: 'Análisis detallado',
    },
    {
      id: 6,
      title: 'Historial',
      description: 'Guarda y revisa todas tus rutas y reportes anteriores',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      details: 'Registro completo de actividad:\n• Historial de rutas guardadas\n• Reportes enviados\n• Alertas recibidas\n• Exportación de datos',
      stats: 'Datos ilimitados',
    },
  ], []);

  // Optimización: useCallback para handlers
  const handleCardClick = useCallback((itemId: number) => {
    setExpandedCard(prev => prev === itemId ? null : itemId);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedCard(null);
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
          Todo lo que necesitas
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Descubre todas las funcionalidades diseñadas para mejorar tu experiencia en moto
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedCard === item.id;

            return (
              <motion.div
                key={item.id}
                layoutId={`card-${item.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative cursor-pointer ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                  }`}
                onClick={() => handleCardClick(item.id)}
              >
                <motion.div
                  className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full overflow-hidden group"
                  whileHover={{ scale: isExpanded ? 1 : 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}
                      animate={
                        isExpanded
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: isExpanded ? Infinity : 0 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 mb-4">
                      {item.description}
                    </p>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-white/10"
                        >
                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Details */}
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-4">
                                Características:
                              </h4>
                              <p className="text-white/80 whitespace-pre-line">
                                {item.details}
                              </p>
                            </div>

                            {/* Stats & CTA */}
                            <div className="flex flex-col justify-between">
                              <div>
                                <div className={`inline-block bg-gradient-to-r ${item.color} px-4 py-2 rounded-full text-white font-semibold mb-6`}>
                                  {item.stats}
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1 bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
                                >
                                  <Smartphone className="w-5 h-5" />
                                  Probar ahora
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose();
                                  }}
                                  className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center"
                                >
                                  <X className="w-5 h-5" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Click indicator */}
                    {!isExpanded && (
                      <motion.div
                        className="mt-4 flex items-center gap-2 text-white/50 text-sm"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="w-4 h-4" />
                        Click para expandir
                      </motion.div>
                    )}
                  </div>

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={{ translateX: ['100%', '100%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background blur */}
      <AnimatePresence>
        {expandedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1]"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}