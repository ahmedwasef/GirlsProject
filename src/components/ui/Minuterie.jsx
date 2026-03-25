import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Minuterie — sablier animé pour les Défis Flash Focus
 * Props:
 *   dureeSecondes : number — durée du compte à rebours
 *   onFin         : fn — appelé quand le temps est écoulé
 *   actif         : bool — démarre/arrête le timer
 */
export default function Minuterie({ dureeSecondes = 180, onFin, actif = false }) {
  const [restant, setRestant] = useState(dureeSecondes)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (actif && restant > 0) {
      intervalRef.current = setInterval(() => {
        setRestant((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            onFin?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [actif, restant, onFin])

  useEffect(() => {
    setRestant(dureeSecondes)
  }, [dureeSecondes])

  const minutes = Math.floor(restant / 60)
  const secondes = restant % 60
  const pct = (restant / dureeSecondes) * 100

  // Couleur selon le temps restant
  const couleurBarre =
    pct > 50 ? 'bg-rose' : pct > 20 ? 'bg-or' : 'bg-corail'

  const couleurTexte =
    pct > 50 ? 'text-rose-dark' : pct > 20 ? 'text-or-dark' : 'text-corail-dark'

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Affichage temps */}
      <motion.div
        className={`font-nunito font-bold text-2xl tabular-nums ${couleurTexte}`}
        animate={restant <= 10 && actif ? { scale: [1, 1.15, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        {String(minutes).padStart(2, '0')}:{String(secondes).padStart(2, '0')}
      </motion.div>

      {/* Barre de progression circulaire simplifiée */}
      <div className="w-full h-3 bg-perle rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${couleurBarre}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {restant === 0 && (
        <motion.p
          className="font-bold text-corail text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ⏰ Temps écoulé !
        </motion.p>
      )}
    </div>
  )
}
