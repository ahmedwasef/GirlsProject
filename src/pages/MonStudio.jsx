import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BadgeRang from '../components/ui/BadgeRang'
import BarreProgression from '../components/ui/BarreProgression'
import { useProgression } from '../gamification/useProgression'

const VERNIS_CATALOGUE = [
  { id: 'vernis-rose-princesse',   nom: 'Rose Princesse',   couleur: '#FFB3BA', pts: 0    },
  { id: 'vernis-corail',           nom: 'Corail Coucher',   couleur: '#FF6B6B', pts: 75   },
  { id: 'rouge-levres-cerise',     nom: 'Rouge Cerise',     couleur: '#E8003D', pts: 100  },
  { id: 'vernis-lavande',          nom: 'Lavande Rêve',     couleur: '#C8A2C8', pts: 50   },
  { id: 'or-paillette',            nom: 'Or Paillette',     couleur: '#FFD700', pts: 150  },
  { id: 'vernis-bleu-nuit',        nom: 'Bleu Nuit',        couleur: '#191970', pts: 300  },
  { id: 'vernis-vert-emeraude',    nom: 'Vert Émeraude',    couleur: '#50C878', pts: 200  },
  { id: 'vernis-nude',             nom: 'Nude Beige',       couleur: '#D4A574', pts: 120  },
  { id: 'vernis-noir',             nom: 'Noir Velours',     couleur: '#1C1C1C', pts: 600  },
  { id: 'vernis-holographique',    nom: 'Rose Holo ✨',     couleur: 'linear-gradient(135deg,#ff9a9e,#fad0c4,#a18cd1)', pts: 1000 },
]

export default function MonStudio() {
  const navigate = useNavigate()
  const { points, rang, pctVersRangSuivant, aRecompense } = useProgression()

  return (
    <div className="min-h-screen bg-porcelaine">
      <header className="bg-white border-b border-rose-light px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-rose text-xl">←</button>
          <div>
            <h1 className="font-nunito font-bold text-xl text-gray-800">👗 Mon Studio</h1>
            <p className="text-xs text-gray-400">Ton espace créatif personnel</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Rang et points */}
        <div className="carte space-y-4">
          <BadgeRang rang={rang} />
          <BarreProgression
            valeur={pctVersRangSuivant}
            couleur="or"
            label="Progression vers le rang suivant"
            afficherPct
          />
          <p className="text-center font-bold text-or-dark text-lg">{points} ✨ points</p>
        </div>

        {/* Collection Vernis */}
        <div>
          <h2 className="font-nunito font-bold text-gray-700 mb-3">
            💅 Collection Vernis ({VERNIS_CATALOGUE.filter(v => aRecompense(v.id) || v.pts === 0).length}/{VERNIS_CATALOGUE.length})
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {VERNIS_CATALOGUE.map((vernis) => {
              const debloque = aRecompense(vernis.id) || vernis.pts === 0
              return (
                <motion.div
                  key={vernis.id}
                  whileHover={debloque ? { scale: 1.1 } : {}}
                  className="flex flex-col items-center gap-1"
                  title={debloque ? vernis.nom : `Verrouillé — ${vernis.pts} pts`}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 shadow-card
                      ${debloque ? 'border-rose opacity-100' : 'border-gray-200 opacity-40 grayscale'}`}
                    style={{ background: vernis.couleur }}
                  />
                  <span className="text-xs text-center text-gray-500 leading-tight font-nunito" style={{ fontSize: '9px' }}>
                    {debloque ? vernis.nom : '🔒'}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Succès */}
        <div className="carte border-2 border-or-light">
          <h2 className="font-nunito font-bold text-gray-700 mb-3">🏆 Mes Succès</h2>
          <div className="space-y-2">
            {[
              { id: 'premiere-etoile', titre: 'Première Étoile',   emoji: '⭐', desc: 'Terminer le 1er exercice' },
              { id: 'semaine-beaute',  titre: 'Semaine de Beauté', emoji: '📅', desc: '7 jours consécutifs' },
              { id: 'perfectionniste', titre: 'Perfectionniste',   emoji: '💎', desc: 'Score 100% × 3' },
            ].map((s) => (
              <div key={s.id} className={`flex items-center gap-3 p-2 rounded-xl ${aRecompense(s.id) ? 'bg-or-light' : 'bg-perle opacity-50'}`}>
                <span className="text-2xl">{s.emoji}</span>
                <div>
                  <p className="font-bold text-sm text-gray-800">{s.titre}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
                {aRecompense(s.id) && <span className="ml-auto text-or font-bold">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
