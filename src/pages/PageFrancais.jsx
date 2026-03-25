import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BoutonPrincipal from '../components/ui/BoutonPrincipal'

const SECTIONS = [
  { id: 'lecture',    titre: 'Lecture',             emoji: '📖', couleur: 'bg-lavande-light border-lavande', desc: '20 textes beauté & mode à lire' },
  { id: 'journal',   titre: 'Mon Journal de Beauté',emoji: '✍️', couleur: 'bg-rose-light border-rose',       desc: 'Écris comme une vraie chroniqueuse !' },
  { id: 'grammaire', titre: 'Grammaire',             emoji: '📝', couleur: 'bg-perle border-gray-200',        desc: 'Fiches de révision contextualisées' },
]

export default function PageFrancais() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-porcelaine">
      <header className="bg-white border-b border-rose-light px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-rose text-xl">←</button>
          <div>
            <h1 className="font-nunito font-bold text-xl text-gray-800">✍️ Français</h1>
            <p className="text-xs text-gray-400">Lis, écris et brille en français !</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`carte border-2 cursor-pointer flex items-center gap-4 ${s.couleur}`}
          >
            <span className="text-4xl">{s.emoji}</span>
            <div className="flex-1">
              <h2 className="font-nunito font-bold text-gray-800">{s.titre}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
            </div>
            <span className="text-gray-400 text-lg">→</span>
          </motion.div>
        ))}

        {/* Aperçu du Journal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="carte border-2 border-rose bg-rose-light"
        >
          <p className="text-xs font-bold text-rose-dark uppercase tracking-wide mb-2">
            Sujet du jour ✨
          </p>
          <h3 className="font-nunito font-bold text-gray-800 text-base">
            Décris ton vernis préféré et pourquoi tu l'aimes
          </h3>
          <p className="text-xs text-gray-500 mt-1 mb-4">
            3 à 5 phrases minimum — Ton éditrice t'attend !
          </p>
          <BoutonPrincipal variante="principal" taille="sm">
            ✍️ Commencer à écrire
          </BoutonPrincipal>
        </motion.div>
      </main>
    </div>
  )
}
