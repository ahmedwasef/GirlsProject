import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BoutonPrincipal from '../components/ui/BoutonPrincipal'
import Minuterie from '../components/ui/Minuterie'
import { useProgression } from '../gamification/useProgression'

// Défis Flash Focus
const DEFIS = [
  {
    id: 'calcul-rapide',
    nom: 'Calcul Express',
    description: 'Addition et multiplication rapide',
    duree: 180, // 3 minutes
    type: 'calcul',
    questions: [
      { question: '12 + 8 = ?', reponse: '20' },
      { question: '15 × 3 = ?', reponse: '45' },
      { question: '27 + 19 = ?', reponse: '46' },
      { question: '7 × 9 = ?', reponse: '63' },
      { question: '34 + 26 = ?', reponse: '60' },
      { question: '11 × 4 = ?', reponse: '44' },
      { question: '48 + 17 = ?', reponse: '65' },
      { question: '6 × 8 = ?', reponse: '48' },
      { question: '29 + 31 = ?', reponse: '60' },
      { question: '9 × 5 = ?', reponse: '45' }
    ]
  },
  {
    id: 'couleurs-memoire',
    nom: 'Mémoire Couleurs',
    description: 'Retrouve les paires de vernis',
    duree: 120, // 2 minutes
    type: 'memoire',
    paires: [
      { id: 1, nom: 'Rose Princesse', couleur: '#FFB3BA' },
      { id: 2, nom: 'Corail Coucher', couleur: '#FF6B6B' },
      { id: 3, nom: 'Lavande Rêve', couleur: '#C8A2C8' },
      { id: 4, nom: 'Or Paillette', couleur: '#FFD700' },
      { id: 5, nom: 'Bleu Nuit', couleur: '#191970' },
      { id: 6, nom: 'Vert Émeraude', couleur: '#50C878' }
    ]
  },
  {
    id: 'vrai-faux-math',
    nom: 'Vrai ou Faux Math',
    description: 'Juge 10 affirmations mathématiques',
    duree: 180, // 3 minutes
    type: 'vrai-faux',
    questions: [
      { affirmation: '12 + 8 = 20', vrai: true },
      { affirmation: '15 × 3 = 40', vrai: false },
      { affirmation: '27 + 19 = 46', vrai: true },
      { affirmation: '7 × 9 = 63', vrai: true },
      { affirmation: '34 + 26 = 60', vrai: true },
      { affirmation: '11 × 4 = 44', vrai: true },
      { affirmation: '48 + 17 = 65', vrai: true },
      { affirmation: '6 × 8 = 56', vrai: false },
      { affirmation: '29 + 31 = 60', vrai: true },
      { affirmation: '9 × 5 = 45', vrai: true }
    ]
  }
]

export default function PageDefis() {
  const navigate = useNavigate()
  const { ajouterPoints, debloquerRecompense } = useProgression()

  const [defiActif, setDefiActif] = useState(null)
  const [tempsRestant, setTempsRestant] = useState(0)
  const [score, setScore] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [reponse, setReponse] = useState('')
  const [cartesRetournees, setCartesRetournees] = useState([])
  const [cartesTrouvees, setCartesTrouvees] = useState([])
  const [defiTermine, setDefiTermine] = useState(false)

  // Minuterie
  useEffect(() => {
    if (tempsRestant > 0 && !defiTermine) {
      const timer = setTimeout(() => setTempsRestant(t => t - 1), 1000)
      return () => clearTimeout(timer)
    } else if (tempsRestant === 0 && defiActif && !defiTermine) {
      terminerDefi()
    }
  }, [tempsRestant, defiActif, defiTermine])

  function lancerDefi(defi) {
    setDefiActif(defi)
    setTempsRestant(defi.duree)
    setScore(0)
    setQuestionIndex(0)
    setReponse('')
    setCartesRetournees([])
    setCartesTrouvees([])
    setDefiTermine(false)
  }

  function terminerDefi() {
    setDefiTermine(true)
    const points = Math.floor(score * 2) // 2 points par bonne réponse
    ajouterPoints(points, `defi-${defiActif.id}`)

    // Récompenses selon le score
    if (score >= 8) debloquerRecompense('vernis-holographique')
    else if (score >= 6) debloquerRecompense('or-paillette')
    else if (score >= 4) debloquerRecompense('vernis-rose-princesse')
  }

  // Gestion des défis calcul
  function validerCalcul() {
    if (!defiActif || defiActif.type !== 'calcul') return

    const question = defiActif.questions[questionIndex]
    if (reponse.trim() === question.reponse) {
      setScore(s => s + 1)
    }

    if (questionIndex < defiActif.questions.length - 1) {
      setQuestionIndex(i => i + 1)
      setReponse('')
    } else {
      terminerDefi()
    }
  }

  // Gestion des défis vrai/faux
  function repondreVraiFaux(reponseJoueur) {
    if (!defiActif || defiActif.type !== 'vrai-faux') return

    const question = defiActif.questions[questionIndex]
    if (reponseJoueur === question.vrai) {
      setScore(s => s + 1)
    }

    if (questionIndex < defiActif.questions.length - 1) {
      setQuestionIndex(i => i + 1)
    } else {
      terminerDefi()
    }
  }

  // Gestion du jeu de mémoire
  function retournerCarte(index) {
    if (cartesRetournees.length === 2 || cartesRetournees.includes(index) || cartesTrouvees.includes(index)) return

    const nouvellesRetournees = [...cartesRetournees, index]
    setCartesRetournees(nouvellesRetournees)

    if (nouvellesRetournees.length === 2) {
      const [i1, i2] = nouvellesRetournees
      const carte1 = defiActif.paires[Math.floor(i1 / 2)]
      const carte2 = defiActif.paires[Math.floor(i2 / 2)]

      if (carte1.id === carte2.id) {
        // Paire trouvée
        setTimeout(() => {
          setCartesTrouvees(t => [...t, i1, i2])
          setCartesRetournees([])
          setScore(s => s + 1)

          if (cartesTrouvees.length + 2 === defiActif.paires.length * 2) {
            terminerDefi()
          }
        }, 1000)
      } else {
        // Pas de paire
        setTimeout(() => setCartesRetournees([]), 1500)
      }
    }
  }

  // Vue menu des défis
  if (!defiActif) {
    return (
      <div className="min-h-screen bg-porcelaine">
        <header className="bg-white border-b border-rose-light px-6 py-4">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-rose text-xl">←</button>
            <div>
              <h1 className="font-nunito font-bold text-xl text-gray-800">⏱️ Défis Flash Focus</h1>
              <p className="text-xs text-gray-400">3 minutes pour briller !</p>
            </div>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 py-6 space-y-4">
          {DEFIS.map((defi, i) => (
            <motion.div
              key={defi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="carte border-2 border-or bg-or-light"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⚡</span>
                <div className="flex-1">
                  <h3 className="font-nunito font-bold text-gray-800">{defi.nom}</h3>
                  <p className="text-xs text-gray-600">{defi.description}</p>
                  <p className="text-xs text-or-dark font-bold">⏱️ {Math.floor(defi.duree / 60)} min • 💎 20 pts max</p>
                </div>
              </div>
              <BoutonPrincipal
                variante="principal"
                taille="sm"
                onClick={() => lancerDefi(defi)}
              >
                🚀 Lancer le défi
              </BoutonPrincipal>
            </motion.div>
          ))}
        </main>
      </div>
    )
  }

  // Vue défi terminé
  if (defiTermine) {
    const pointsGagnes = Math.floor(score * 2)
    return (
      <div className="min-h-screen bg-porcelaine flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="carte border-2 border-or bg-or-light text-center max-w-sm"
        >
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="font-nunito font-bold text-2xl text-gray-800 mb-2">Défi terminé !</h2>
          <p className="text-gray-600 mb-4">Score : {score} / {defiActif.type === 'memoire' ? defiActif.paires.length : defiActif.questions.length}</p>
          <p className="text-or-dark font-bold text-lg mb-6">+{pointsGagnes} points ✨</p>
          <div className="space-y-2">
            <BoutonPrincipal
              variante="principal"
              onClick={() => setDefiActif(null)}
            >
              🎯 Autre défi
            </BoutonPrincipal>
            <BoutonPrincipal
              variante="secondaire"
              onClick={() => navigate('/')}
            >
              🏠 Retour à l'accueil
            </BoutonPrincipal>
          </div>
        </motion.div>
      </div>
    )
  }

  // Vue défi en cours
  return (
    <div className="min-h-screen bg-porcelaine">
      <header className="bg-white border-b border-rose-light px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setDefiActif(null)} className="text-rose text-xl">←</button>
            <div>
              <h1 className="font-nunito font-bold text-lg text-gray-800">{defiActif.nom}</h1>
              <p className="text-xs text-gray-400">Score: {score}</p>
            </div>
          </div>
          <Minuterie secondes={tempsRestant} />
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Défi Calcul */}
        {defiActif.type === 'calcul' && (
          <div className="text-center space-y-6">
            <div className="text-6xl font-bold text-or-dark">
              {defiActif.questions[questionIndex].question}
            </div>
            <input
              type="text"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && validerCalcul()}
              placeholder="Ta réponse..."
              className="w-full font-nunito font-bold text-3xl text-center text-gray-800
                         bg-perle border-2 border-rose-light rounded-2xl
                         px-6 py-4 outline-none
                         focus:border-rose"
              autoFocus
            />
            <BoutonPrincipal onClick={validerCalcul} variante="principal" taille="lg">
              ✅ Valider
            </BoutonPrincipal>
          </div>
        )}

        {/* Défi Vrai/Faux */}
        {defiActif.type === 'vrai-faux' && (
          <div className="text-center space-y-6">
            <div className="text-xl font-bold text-gray-800 bg-perle p-6 rounded-2xl">
              {defiActif.questions[questionIndex].affirmation}
            </div>
            <div className="flex gap-4">
              <BoutonPrincipal
                onClick={() => repondreVraiFaux(true)}
                variante="principal"
                taille="lg"
                className="flex-1"
              >
                ✅ Vrai
              </BoutonPrincipal>
              <BoutonPrincipal
                onClick={() => repondreVraiFaux(false)}
                variante="danger"
                taille="lg"
                className="flex-1"
              >
                ❌ Faux
              </BoutonPrincipal>
            </div>
          </div>
        )}

        {/* Défi Mémoire */}
        {defiActif.type === 'memoire' && (
          <div className="space-y-4">
            <p className="text-center text-gray-600">Retrouve les paires de vernis !</p>
            <div className="grid grid-cols-4 gap-3">
              {defiActif.paires.flatMap((paire, i) => [
                { index: i * 2, paire },
                { index: i * 2 + 1, paire }
              ]).map((carte, index) => {
                const estRetourne = cartesRetournees.includes(index)
                const estTrouve = cartesTrouvees.includes(index)

                return (
                  <motion.div
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => retournerCarte(index)}
                    className={`
                      aspect-square rounded-xl border-2 cursor-pointer
                      flex items-center justify-center text-2xl
                      ${estTrouve
                        ? 'bg-emerald-100 border-emerald-400'
                        : estRetourne
                          ? 'bg-white border-rose'
                          : 'bg-rose-light border-rose hover:bg-rose'
                      }
                      transition-all duration-300
                    `}
                    style={estRetourne || estTrouve ? { backgroundColor: carte.paire.couleur } : {}}
                  >
                    {estTrouve ? '✅' : estRetourne ? carte.paire.nom : '?'}
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}