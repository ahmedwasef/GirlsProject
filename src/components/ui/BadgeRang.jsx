import { motion } from 'framer-motion'

const RANGS = {
  1: { titre: 'Apprentie Styliste',       emoji: '🌸', couleur: 'bg-rose-light   text-rose-dark   border-rose'   },
  2: { titre: 'Styliste Junior',           emoji: '💅', couleur: 'bg-corail-light text-corail-dark border-corail' },
  3: { titre: 'Créatrice de Tendances',    emoji: '💄', couleur: 'bg-lavande-light text-lavande-dark border-lavande'},
  4: { titre: 'Designer Étoile',           emoji: '👗', couleur: 'bg-or-light     text-or-dark     border-or'     },
  5: { titre: 'Artiste de Mode',           emoji: '✨', couleur: 'bg-rose-light   text-rubis-dark  border-rubis'  },
  6: { titre: 'Légende du Studio',         emoji: '👑', couleur: 'bg-or-light     text-or-dark     border-or shadow-or-glow' },
}

/**
 * BadgeRang — affiche le rang actuel de l'enfant
 * Props:
 *   rang    : 1–6
 *   compact : bool — version petite pour la nav
 */
export default function BadgeRang({ rang = 1, compact = false }) {
  const info = RANGS[rang] ?? RANGS[1]

  if (compact) {
    return (
      <div className={`badge-rang border ${info.couleur}`}>
        <span>{info.emoji}</span>
        <span className="text-xs">{info.titre}</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        flex items-center gap-3 rounded-2xl border-2 px-5 py-3
        font-nunito font-bold ${info.couleur}
      `}
    >
      <motion.span
        className="text-3xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {info.emoji}
      </motion.span>
      <div>
        <p className="text-xs font-semibold opacity-70 uppercase tracking-wide">Ton rang</p>
        <p className="text-base font-bold leading-tight">{info.titre}</p>
      </div>
    </motion.div>
  )
}
