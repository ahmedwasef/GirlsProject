import { motion } from 'framer-motion'

const ETAPES = [
  { cle: 'bleu',  couleur: 'bg-blue-100  border-blue-400  text-blue-800',  icone: '👁️',  label: 'Je lis attentivement'        },
  { cle: 'jaune', couleur: 'bg-yellow-100 border-yellow-400 text-yellow-800', icone: '🖊️', label: 'Je surligne les données'      },
  { cle: 'rose',  couleur: 'bg-rose-light border-rose text-rose-dark',      icone: '🔢',  label: 'Je calcule'                  },
  { cle: 'vert',  couleur: 'bg-emerald-100 border-emerald-400 text-emerald-800', icone: '✅', label: 'Je vérifie ma réponse'   },
]

/**
 * PalettePasAPas — barre d'étapes colorées de la méthode PALETTE
 * Props:
 *   etapeActive : 'bleu' | 'jaune' | 'rose' | 'vert'
 *   onEtape     : fn(cle) — appelé quand l'enfant clique pour confirmer l'étape
 *   etapesOk    : string[] — étapes déjà confirmées
 */
export default function PalettePasAPas({ etapeActive = 'bleu', onEtape, etapesOk = [] }) {
  const indexActif = ETAPES.findIndex((e) => e.cle === etapeActive)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-1">
        {ETAPES.map((etape, i) => {
          const estOk     = etapesOk.includes(etape.cle)
          const estActif  = etape.cle === etapeActive
          const estFuture = i > indexActif && !estOk

          return (
            <motion.div
              key={etape.cle}
              className={`
                flex-1 rounded-2xl border-2 px-2 py-2 flex flex-col items-center gap-1
                font-nunito font-bold text-xs text-center select-none
                transition-all duration-300
                ${estOk
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                  : estActif
                    ? etape.couleur + ' shadow-card'
                    : 'bg-gray-50 border-gray-200 text-gray-400'}
                ${estActif && !estOk ? 'cursor-pointer' : ''}
              `}
              animate={estActif && !estOk ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={{ repeat: estActif && !estOk ? Infinity : 0, duration: 1.5 }}
              onClick={() => estActif && !estOk && onEtape?.(etape.cle)}
            >
              <span className="text-lg">{estOk ? '✅' : estFuture ? '🔒' : etape.icone}</span>
              <span className="leading-tight">{etape.label}</span>
            </motion.div>
          )
        })}
      </div>
      {/* Barre de connecteur */}
      <div className="mt-2 h-1.5 bg-perle rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-300 via-yellow-300 via-rose to-emerald-400 rounded-full"
          animate={{ width: `${((indexActif + 1) / ETAPES.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
