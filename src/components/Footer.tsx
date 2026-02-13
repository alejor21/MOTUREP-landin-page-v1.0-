import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const socialIcons = [
    { Icon: Instagram, color: 'from-pink-500 to-purple-500' },
    { Icon: Facebook, color: 'from-blue-500 to-cyan-500' },
    { Icon: Twitter, color: 'from-cyan-500 to-blue-500' },
    { Icon: Mail, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <footer className="relative border-t-2 border-white/20 py-20 px-6 overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(115, 191, 196, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 18, 239, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(141, 160, 206, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(115, 191, 196, 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Liquid Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-3xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />

          {/* Content */}
          <div className="relative z-10 grid md:grid-cols-4 gap-16 mb-16 text-center md:text-left">
            {/* Logo section */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-3xl mb-4 font-bold text-white"
              >
                {'MOTUREP'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    whileHover={{
                      scale: 1.3,
                      color: '#73bfc4',
                      textShadow: '0 0 20px rgba(115, 191, 196, 0.8)',
                      display: 'inline-block',
                    }}
                    className="inline-block cursor-pointer"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/80 leading-relaxed max-w-md"
              >
                {'Movilidad inteligente y segura para motociclistas en Pasto, Nariño, Colombia.'.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    whileHover={{
                      color: '#ff12ef',
                      display: 'inline-block',
                    }}
                    className="inline-block mr-1 cursor-default"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            {/* Legal section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="text-sm mb-6 text-white/70 font-semibold">
                {'Legal'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    whileHover={{
                      scale: 1.2,
                      color: '#73bfc4',
                      display: 'inline-block',
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <ul className="space-y-3 text-white/70">
                {['Privacidad', 'Términos', 'Contacto'].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="hover:text-white transition-colors">
                      {item.split('').map((char, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{
                            color: '#ff12ef',
                            display: 'inline-block',
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="text-sm mb-6 text-white/70 font-semibold">
                {'Síguenos'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    whileHover={{
                      scale: 1.2,
                      color: '#73bfc4',
                      display: 'inline-block',
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-4 justify-center md:justify-start">
                {socialIcons.map(({ Icon, color }, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-11 h-11 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full flex items-center justify-center group overflow-hidden"
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity`}
                    />
                    
                    <Icon size={20} className="text-white relative z-10" />

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${color} blur-xl opacity-0 group-hover:opacity-50 -z-10`}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Glass reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl pointer-events-none" />
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-10 text-center text-white/70"
        >
          <p>
            {'© 2025 MOTUREP. Desarrollado con ❤️ en Pasto, Nariño.'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                whileHover={{
                  color: '#ff12ef',
                  scale: 1.1,
                  display: 'inline-block',
                }}
                className="inline-block mr-1 cursor-default"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
