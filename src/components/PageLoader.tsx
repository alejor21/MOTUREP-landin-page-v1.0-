import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simular progreso de carga más rápido
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 200);
                    return 100;
                }
                return prev + 20;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
                >
                    {/* Logo animado */}
                    <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-8xl mb-8"
                    >
                        🏍️
                    </motion.div>

                    {/* Nombre */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        MOTUREP
                    </motion.h1>

                    {/* Barra de progreso */}
                    <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Texto de carga */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-white/60 text-sm"
                    >
                        Cargando experiencia... {progress}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
