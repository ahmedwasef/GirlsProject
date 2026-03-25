import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BadgeRang from '../components/ui/BadgeRang'
import BarreProgression from '../components/ui/BarreProgression'
import BoutonPrincipal from '../components/ui/BoutonPrincipal'
import { useProgression } from '../gamification/useProgression'

const MODULES = [
  {
    id: 'math',
    titre: 'Mathématiques',
    soustitre: 'Résous des problèmes et gagne des vernis !',
    emoji: '💅',
    couleurBg: 'bg-rose-light',
    couleurBord: 'border-rose',
    route: '/mathematiques',
  },
  {
    id: 'francais',
    titre: 'Français',
    soustitre: 'Lis des histoires et écris dans ton journal !',
    emoji: '✍️',
    couleurBg: 'bg-lavande-light',
    couleurBord: 'border-lavande',
    route: '/francais',
  },
  {
    id: 'defis',
    titre: 'Défis Flash Focus',
    soustitre: '3 minutes pour briller !',
    emoji: '⏱️',
    couleurBg: 'bg-or-light',
    couleurBord: 'border-or',
    route: '/defis',
  },
  {
    id: 'studio',
    titre: 'Mon Studio',
    soustitre: 'Personnalise ton avatar et ton armoire !',
    emoji: '👗',
    couleurBg: 'bg-corail-light',
    couleurBord: 'border-corail',
    route: '/mon-studio',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

export default function Accueil() {
  const navigate = useNavigate()
  const { points, rang, pctVersRangSuivant, pointsVersSuivant } = useProgression()

  return (
    <div className="min-h-screen bg-porcelaine">
      {/* En-tête */}
      <header className="bg-white border-b border-rose-light px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl text-rose-dark leading-none">Studio Étoile</h1>
            <p className="text-xs text-gray-400 font-nunito mt-0.5">Apprends. Brille. Crée.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-gray-400">Points</p>
              <p className="font-bold text-or-dark text-lg leading-none">{points} ✨</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Rang et progression */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="carte"
        >
          <BadgeRang rang={rang} />
          <div className="mt-4">
            <BarreProgression
              valeur={pctVersRangSuivant}
              couleur="rose"
              label="Vers le prochain rang"
              afficherPct
            />
            {pointsVersSuivant > 0 && rang < 6 && (
              <p className="text-xs text-gray-400 mt-1 text-right font-nunito">
                Encore {pointsVersSuivant} points !
              </p>
            )}
          </div>
        </motion.div>

        {/* Message de bienvenue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="font-nunito font-bold text-2xl text-gray-800">
            Bonjour ! 🌸
          </h2>
          <p className="text-gray-500 text-sm mt-1">Que veux-tu apprendre aujourd'hui ?</p>
        </motion.div>

        {/* Grille des modules */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4"
        >
          {MODULES.map((module) => (
            <motion.div
              key={module.id}
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(module.route)}
              className={`
                carte border-2 cursor-pointer
                ${module.couleurBg} ${module.couleurBord}
                flex flex-col items-center text-center gap-2 py-5
              `}
            >
              <span className="text-4xl">{module.emoji}</span>
              <h3 className="font-nunito font-bold text-sm text-gray-800 leading-tight">
                {module.titre}
              </h3>
              <p className="text-xs text-gray-500 leading-tight">{module.soustitre}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Défi du jour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="carte border-2 border-or bg-or-light"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌟</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-or-dark uppercase tracking-wide">Défi du jour</p>
              <h3 className="font-nunito font-bold text-gray-800">
                Les vernis de Léa — Fractions
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">+20 pts de bonus aujourd'hui !</p>
            </div>
            <BoutonPrincipal
              variante="principal"
              taille="sm"
              onClick={() => navigate('/mathematiques')}
            >
              Jouer →
            </BoutonPrincipal>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
