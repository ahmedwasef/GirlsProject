import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BoutonPrincipal from '../components/ui/BoutonPrincipal'
import BarreProgression from '../components/ui/BarreProgression'
import { useProgression } from '../gamification/useProgression'

// Données de progression simulées pour le rapport
const genererRapportHebdomadaire = (progression) => {
  const joursCetteSemaine = 5 // simulation
  const pointsCetteSemaine = 320 // simulation
  const exercicesCetteSemaine = 15 // simulation

  return {
    periode: '25 mars au 1er avril 2026',
    sessions: joursCetteSemaine,
    points: pointsCetteSemaine,
    exercices: exercicesCetteSemaine,
    temps: '1h 45min',
    message: 'Superbe semaine ! Elle a amélioré sa compréhension des fractions !'
  }
}

const COMPETENCES = [
  { nom: 'Fractions', niveau: 68, tendance: 'hausse', couleur: 'rose' },
  { nom: 'Décimaux', niveau: 55, tendance: 'stable', couleur: 'lavande' },
  { nom: 'Géométrie', niveau: 72, tendance: 'hausse', couleur: 'or' },
  { nom: 'Problèmes textes', niveau: 40, tendance: 'baisse', couleur: 'corail' },
  { nom: 'Lecture/Compréhension', niveau: 60, tendance: 'hausse', couleur: 'rose' },
  { nom: 'Rédaction', niveau: 48, tendance: 'stable', couleur: 'lavande' },
  { nom: 'Grammaire', niveau: 55, tendance: 'hausse', couleur: 'or' }
]

export default function TableauBordParent() {
  const navigate = useNavigate()
  const { points, rang, pctVersRangSuivant, exercicesCompletes } = useProgression()
  const [vueActive, setVueActive] = useState('semaine')
  const [rapport, setRapport] = useState(null)

  useEffect(() => {
    // Générer le rapport au chargement
    const rapportGenere = genererRapportHebdomadaire({ points, exercicesCompletes })
    setRapport(rapportGenere)
  }, [points, exercicesCompletes])

  const vues = [
    { id: 'semaine', nom: 'Cette semaine', emoji: '📅' },
    { id: 'mois', nom: 'Ce mois-ci', emoji: '📊' },
    { id: 'tout', nom: 'Depuis le début', emoji: '🏆' }
  ]

  return (
    <div className="min-h-screen bg-porcelaine">
      <header className="bg-white border-b border-rose-light px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-rose text-xl">←</button>
          <div>
            <h1 className="font-nunito font-bold text-xl text-gray-800">👨‍👩‍👧‍👦 Tableau de Bord</h1>
            <p className="text-xs text-gray-400">Suivez sa progression</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Sélecteur de période */}
        <div className="flex bg-perle rounded-2xl p-1">
          {vues.map((vue) => (
            <button
              key={vue.id}
              onClick={() => setVueActive(vue.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl
                font-nunito font-bold text-sm transition-all
                ${vueActive === vue.id
                  ? 'bg-white text-rose shadow-card'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <span>{vue.emoji}</span>
              <span>{vue.nom}</span>
            </button>
          ))}
        </div>

        {/* Résumé de la semaine */}
        {vueActive === 'semaine' && rapport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="carte border-2 border-rose bg-rose-light"
          >
            <div className="text-center space-y-4">
              <div>
                <p className="text-xs font-bold text-rose-dark uppercase tracking-wide">
                  {rapport.periode}
                </p>
                <h2 className="font-nunito font-bold text-2xl text-gray-800">
                  Résumé hebdomadaire
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-bold text-rose">{rapport.sessions}</p>
                  <p className="text-xs text-gray-500">Jours d'étude</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-bold text-or">{rapport.points}</p>
                  <p className="text-xs text-gray-500">Points gagnés</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-bold text-lavande">{rapport.exercices}</p>
                  <p className="text-xs text-gray-500">Exercices</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-bold text-corail">{rapport.temps}</p>
                  <p className="text-xs text-gray-500">Temps d'étude</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-700 italic">💡 {rapport.message}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Carte des compétences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="carte"
        >
          <h3 className="font-nunito font-bold text-gray-800 mb-4">📊 Ses Compétences</h3>
          <div className="space-y-3">
            {COMPETENCES.map((comp, i) => (
              <motion.div
                key={comp.nom}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3"
              >
                <div className="w-16 text-xs font-bold text-gray-600">{comp.nom}</div>
                <div className="flex-1">
                  <BarreProgression
                    valeur={comp.niveau}
                    couleur={comp.couleur}
                    afficherPct
                    taille="sm"
                  />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                  comp.tendance === 'hausse' ? 'bg-emerald-100 text-emerald-700' :
                  comp.tendance === 'baisse' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {comp.tendance === 'hausse' ? '↗️' : comp.tendance === 'baisse' ? '↘️' : '→'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Points forts et suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="carte border-2 border-emerald-200 bg-emerald-50">
            <h3 className="font-nunito font-bold text-emerald-800 mb-3">✅ Points forts</h3>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li>• Multiplication à 2 chiffres</li>
              <li>• Accord sujet-verbe au présent</li>
              <li>• Lecture de textes narratifs</li>
            </ul>
          </div>

          <div className="carte border-2 border-amber-200 bg-amber-50">
            <h3 className="font-nunito font-bold text-amber-800 mb-3">💡 À travailler</h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• Problèmes de mots avec plusieurs étapes</li>
              <li>• Fractions avec dénominateurs différents</li>
              <li>• Utilisation des connecteurs dans les textes</li>
            </ul>
          </div>

          <div className="carte border-2 border-blue-200 bg-blue-50">
            <h3 className="font-nunito font-bold text-blue-800 mb-3">🏠 Suggestions pour la maison</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Cuisinez ensemble ! Demandez-lui de doubler une recette</li>
              <li>• Au magasin, demandez-lui d'estimer le total avant de payer</li>
              <li>• Lisez 10 minutes par soir et posez-lui des questions</li>
              <li>• Encouragez-la à décrire sa journée par écrit</li>
            </ul>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <BoutonPrincipal variante="principal" taille="lg">
            📄 Générer le rapport PDF
          </BoutonPrincipal>
          <BoutonPrincipal variante="secondaire" taille="md">
            📧 Recevoir par courriel
          </BoutonPrincipal>
        </motion.div>

        {/* Pied de page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-gray-400"
        >
          <p>Données stockées localement • Confidentialité garantie</p>
          <p className="mt-1">Dernière mise à jour: {new Date().toLocaleDateString('fr-CA')}</p>
        </motion.div>
      </main>
    </div>
  )
}