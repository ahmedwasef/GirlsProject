import { motion } from 'framer-motion'

const COULEURS_THEME = {
  'manucure':   { bg: 'bg-rose-light',   bord: 'border-rose',   emoji: '💅' },
  'maquillage': { bg: 'bg-corail-light', bord: 'border-corail', emoji: '💄' },
  'defile':     { bg: 'bg-lavande-light',bord: 'border-lavande',emoji: '👗' },
  'boutique':   { bg: 'bg-or-light',     bord: 'border-or',     emoji: '🛍️' },
  'nailart':    { bg: 'bg-rose-light',   bord: 'border-rubis',  emoji: '🌸' },
  'lecture':    { bg: 'bg-lavande-light',bord: 'border-lavande',emoji: '📖' },
  'journal':    { bg: 'bg-rose-light',   bord: 'border-rose',   emoji: '✍️' },
}

const ETOILES_DIFFICULTE = (n) => '⭐'.repeat(n) + '☆'.repeat(3 - n)

/**
 * CarteExercice — carte cliquable pour un exercice
 * Props:
 *   titre      : string
 *   theme      : string (clé de COULEURS_THEME)
 *   difficulte : 1 | 2 | 3
 *   points     : number
 *   complete   : bool
 *   verrouille : bool
 *   onClick    : fn
 */
export default function CarteExercice({
  titre,
  theme = 'manucure',
  difficulte = 1,
  points = 15,
  complete = false,
  verrouille = false,
  onClick,
}) {
  const couleur = COULEURS_THEME[theme] ?? COULEURS_THEME['manucure']

  return (
    <motion.div
      whileHover={verrouille ? {} : { scale: 1.03, y: -4 }}
      whileTap={verrouille ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={verrouille ? undefined : onClick}
      className={`
        relative carte border-2 cursor-pointer select-none
        ${couleur.bg} ${couleur.bord}
        ${verrouille ? 'opacity-60 cursor-not-allowed' : ''}
        ${complete ? 'ring-2 ring-or ring-offset-2' : ''}
      `}
    >
      {/* Badge complet */}
      {complete && (
        <span className="absolute -top-3 -right-3 bg-or text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-or-glow">
          ✓
        </span>
      )}

      {/* Badge verrouillé */}
      {verrouille && (
        <span className="absolute top-3 right-3 text-xl">🔒</span>
      )}

      <div className="flex items-start gap-3">
        <span className="text-3xl">{couleur.emoji}</span>
        <div className="flex-1">
          <h3 className="font-nunito font-bold text-gray-800 text-base leading-tight mb-1">
            {titre}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm">{ETOILES_DIFFICULTE(difficulte)}</span>
            <span className="etiquette bg-or-light text-or-dark">
              +{points} pts
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
