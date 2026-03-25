import { motion, AnimatePresence } from 'framer-motion'

/**
 * EtoileRecompense — animation d'étoile dorée à la réussite
 * Props:
 *   visible  : bool  — déclenche l'animation
 *   message  : string — message affiché sous l'étoile
 *   points   : number — points à afficher
 *   onFin    : fn — appelé après l'animation
 */
export default function EtoileRecompense({ visible, message, points, onFin }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setTimeout(() => onFin?.(), 1800)
          }}
        >
          {/* Fond semi-transparent */}
          <motion.div
            className="absolute inset-0 bg-white/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Étoile centrale */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <motion.span
              className="text-8xl drop-shadow-lg etoile-animee select-none"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⭐
            </motion.span>

            {points && (
              <motion.div
                className="bg-or text-white font-bold text-2xl rounded-full px-6 py-2 shadow-or-glow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                +{points} pts !
              </motion.div>
            )}

            {message && (
              <motion.p
                className="font-nunito font-bold text-xl text-gray-800 text-center px-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {message}
              </motion.p>
            )}

            {/* Confettis */}
            {[...Array(12)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl pointer-events-none select-none"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 12) * 2 * Math.PI) * 120,
                  y: Math.sin((i / 12) * 2 * Math.PI) * 120,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              >
                {['✨', '💫', '🌸', '💖', '⭐', '🌟'][i % 6]}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
