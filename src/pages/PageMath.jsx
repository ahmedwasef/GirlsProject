import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import CarteExercice from '../components/ui/CarteExercice'
import BoutonPrincipal from '../components/ui/BoutonPrincipal'
import PalettePasAPas from '../components/ui/PalettePasAPas'
import MessageFeedback from '../components/ui/MessageFeedback'
import EtoileRecompense from '../components/ui/EtoileRecompense'
import { useProgression } from '../gamification/useProgression'

// Exercices de démonstration — Phase 2 en fournira les vrais JSON
const EXERCICES_DEMO = [
  {
    id: 'math-001',
    titre: 'Les vernis de Léa',
    theme: 'manucure',
    difficulte: 1,
    points: 15,
    enonce: 'Léa a commandé 3/4 de litre de vernis rouge et 1/2 litre de vernis rose. Combien de litres de vernis a-t-elle au total ?',
    indices: [
      "Pense à transformer les fractions pour qu'elles aient le même dénominateur.",
      '3/4 = 6/8 et 1/2 = 4/8... continue !',
    ],
    reponse: '5/4',
    reponsesAcceptees: ['5/4', '1 1/4', '1,25', '1.25'],
    recompense: 'vernis-corail',
  },
  {
    id: 'math-002',
    titre: 'La vente de Sophie',
    theme: 'maquillage',
    difficulte: 2,
    points: 20,
    enonce: 'Sophie vend ses fards à paupières 8,75 $ chacun. Elle en vend 12 en une journée. Quel est son revenu total ?',
    indices: [
      "C'est une multiplication : 8,75 × 12",
      '8,75 × 12 = 8 × 12 + 0,75 × 12...',
    ],
    reponse: '105',
    reponsesAcceptees: ['105', '105$', '105,00', '105.00'],
    recompense: 'rouge-levres-cerise',
  },
  {
    id: 'math-003',
    titre: 'La scène du défilé',
    theme: 'defile',
    difficulte: 2,
    points: 20,
    enonce: 'La scène du défilé mesure 12 m de long et 4 m de large. Quelle est sa superficie en mètres carrés ?',
    indices: [
      "L'aire d'un rectangle = longueur × largeur",
      '12 × 4 = ?',
    ],
    reponse: '48',
    reponsesAcceptees: ['48', '48 m²', '48m2'],
    recompense: 'robe-defile',
  },
]

export default function PageMath() {
  const navigate = useNavigate()
  const { ajouterPoints, debloquerRecompense, estComplete } = useProgression()

  const [exerciceActif, setExerciceActif] = useState(null)
  const [reponse, setReponse] = useState('')
  const [etapeActive, setEtapeActive] = useState('bleu')
  const [etapesOk, setEtapesOk] = useState([])
  const [indiceIndex, setIndiceIndex] = useState(0)
  const [tentatives, setTentatives] = useState(0)
  const [feedback, setFeedback] = useState({ visible: false, type: 'bien', message: '' })
  const [recompense, setRecompense] = useState({ visible: false, points: 0, message: '' })

  const ORDRE_ETAPES = ['bleu', 'jaune', 'rose', 'vert']

  function confirmerEtape(cle) {
    setEtapesOk((prev) => [...prev, cle])
    const suivant = ORDRE_ETAPES[ORDRE_ETAPES.indexOf(cle) + 1]
    if (suivant) setEtapeActive(suivant)
  }

  function validerReponse() {
    if (!exerciceActif) return
    const reponsePropre = reponse.trim().toLowerCase().replace(/\s/g, '')
    const correct = exerciceActif.reponsesAcceptees.some(
      (r) => r.toLowerCase().replace(/\s/g, '') === reponsePropre
    )

    if (correct) {
      const pts = tentatives === 0 ? exerciceActif.points : tentatives === 1 ? 10 : 5
      ajouterPoints(pts, exerciceActif.id)
      debloquerRecompense(exerciceActif.recompense)
      setFeedback({ visible: true, type: 'parfait', message: 'Parfait ! Tu as tout compris ! ✨' })
      setRecompense({ visible: true, points: pts, message: 'Excellent travail !' })
    } else {
      setTentatives((t) => t + 1)
      if (tentatives === 0) {
        setFeedback({ visible: true, type: 'presque', message: 'Presque ! Relis bien la question et réessaie.' })
      } else {
        setFeedback({ visible: true, type: 'courage', message: "Courage ! Utilise un indice pour t'aider." })
      }
    }
  }

  function afficherIndice() {
    const idx = Math.min(indiceIndex, exerciceActif.indices.length - 1)
    setFeedback({
      visible: true,
      type: 'indice',
      message: '💡 ' + exerciceActif.indices[idx],
    })
    setIndiceIndex((i) => Math.min(i + 1, exerciceActif.indices.length - 1))
  }

  function ouvrirExercice(ex) {
    setExerciceActif(ex)
    setReponse('')
    setEtapeActive('bleu')
    setEtapesOk([])
    setIndiceIndex(0)
    setTentatives(0)
    setFeedback({ visible: false, type: 'bien', message: '' })
  }

  function fermerExercice() {
    setExerciceActif(null)
    setFeedback({ visible: false, type: 'bien', message: '' })
  }

  // Vue liste
  if (!exerciceActif) {
    return (
      <div className="min-h-screen bg-porcelaine">
        <header className="bg-white border-b border-rose-light px-6 py-4">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-rose text-xl">←</button>
            <div>
              <h1 className="font-nunito font-bold text-xl text-gray-800">💅 Mathématiques</h1>
              <p className="text-xs text-gray-400">Résous des problèmes et débloque des récompenses !</p>
            </div>
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 py-6 space-y-4">
          <h2 className="font-nunito font-bold text-gray-600 text-sm uppercase tracking-wide">
            Exercices disponibles
          </h2>
          {EXERCICES_DEMO.map((ex) => (
            <CarteExercice
              key={ex.id}
              titre={ex.titre}
              theme={ex.theme}
              difficulte={ex.difficulte}
              points={ex.points}
              complete={estComplete(ex.id)}
              onClick={() => ouvrirExercice(ex)}
            />
          ))}
        </main>
      </div>
    )
  }

  // Vue exercice actif
  return (
    <div className="min-h-screen bg-porcelaine">
      <EtoileRecompense
        visible={recompense.visible}
        points={recompense.points}
        message={recompense.message}
        onFin={() => {
          setRecompense({ visible: false, points: 0, message: '' })
          fermerExercice()
        }}
      />

      <header className="bg-white border-b border-rose-light px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={fermerExercice} className="text-rose text-xl">←</button>
          <h1 className="font-nunito font-bold text-xl text-gray-800">{exerciceActif.titre}</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* Barre PALETTE */}
        <PalettePasAPas
          etapeActive={etapeActive}
          etapesOk={etapesOk}
          onEtape={confirmerEtape}
        />

        {/* Énoncé */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="carte border-2 border-rose"
        >
          <p className="text-xs font-bold text-rose-dark uppercase mb-2">
            Problème — {exerciceActif.theme}
          </p>
          <p className="font-nunito text-gray-800 text-base leading-relaxed">
            {exerciceActif.enonce}
          </p>
        </motion.div>

        {/* Zone de réponse — visible seulement à l'étape rose */}
        {(etapesOk.includes('jaune') || etapeActive === 'rose' || etapeActive === 'vert') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="carte border-2 border-rose-light"
          >
            <label className="block text-sm font-bold text-rose-dark mb-2">
              🔢 Ta réponse :
            </label>
            <input
              type="text"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && validerReponse()}
              placeholder="Écris ta réponse ici..."
              className="w-full font-nunito font-bold text-lg text-gray-800
                         bg-perle border-2 border-rose-light rounded-2xl
                         px-4 py-3 outline-none
                         focus:border-rose transition-colors"
            />
          </motion.div>
        )}

        {/* Feedback */}
        <MessageFeedback
          visible={feedback.visible}
          type={feedback.type}
          message={feedback.message}
        />

        {/* Boutons d'action */}
        <div className="flex flex-col gap-3">
          {etapesOk.includes('jaune') && (
            <BoutonPrincipal onClick={validerReponse} variante="principal" taille="lg">
              ✅ Valider ma réponse
            </BoutonPrincipal>
          )}
          {tentatives >= 1 && (
            <BoutonPrincipal onClick={afficherIndice} variante="secondaire" taille="md">
              💡 Voir un indice
            </BoutonPrincipal>
          )}
        </div>
      </main>
    </div>
  )
}
