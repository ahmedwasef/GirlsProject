import { motion } from 'framer-motion'

const COULEURS = {
  rose:    'bg-rose',
  or:      'bg-or',
  corail:  'bg-corail',
  lavande: 'bg-lavande',
  vert:    'bg-emerald-400',
}

/**
 * BarreProgression — barre de progression animée
 * Props:
 *   valeur    : number (0–100)
 *   couleur   : 'rose' | 'or' | 'corail' | 'lavande' | 'vert'
 *   label     : string (optionnel)
 *   afficherPct: bool
 */
export default function BarreProgression({
  valeur = 0,
  couleur = 'rose',
  label = '',
  afficherPct = false,
}) {
  const pct = Math.min(100, Math.max(0, valeur))
  const coul = COULEURS[couleur] ?? COULEURS['rose']

  return (
    <div className="w-full">
      {(label || afficherPct) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-semibold text-gray-600">{label}</span>
          )}
          {afficherPct && (
            <span className="text-sm font-bold text-gray-700">{pct}%</span>
          )}
        </div>
      )}
      <div className="barre-progress">
        <motion.div
          className={`barre-progress-fill ${coul}`}
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
