import { motion, AnimatePresence } from 'framer-motion'

const TYPES = {
  parfait:    { bg: 'bg-emerald-50',  bord: 'border-emerald-300', texte: 'text-emerald-700', emoji: '🌟' },
  tresBien:   { bg: 'bg-rose-light',  bord: 'border-rose',        texte: 'text-rose-dark',   emoji: '✨' },
  bien:       { bg: 'bg-or-light',    bord: 'border-or',          texte: 'text-or-dark',     emoji: '⭐' },
  presque:    { bg: 'bg-lavande-light', bord: 'border-lavande',   texte: 'text-lavande-dark',emoji: '💜' },
  courage:    { bg: 'bg-corail-light', bord: 'border-corail',     texte: 'text-corail-dark', emoji: '💪' },
  indice:     { bg: 'bg-perle',        bord: 'border-lavande',    texte: 'text-gray-700',    emoji: '💡' },
}

/**
 * MessageFeedback — message de retour après une réponse
 * Props:
 *   visible : bool
 *   type    : 'parfait' | 'tresBien' | 'bien' | 'presque' | 'courage' | 'indice'
 *   message : string
 */
export default function MessageFeedback({ visible, type = 'bien', message }) {
  const style = TYPES[type] ?? TYPES['bien']

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`
            flex items-start gap-3 rounded-2xl border-2 px-4 py-3
            font-nunito ${style.bg} ${style.bord} ${style.texte}
          `}
        >
          <span className="text-2xl flex-shrink-0">{style.emoji}</span>
          <p className="font-semibold text-sm leading-snug">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
