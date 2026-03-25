import { useState, useCallback } from 'react'

// Points requis pour chaque rang
const SEUILS_RANG = [0, 100, 300, 600, 1000, 1500]

function calculerRang(points) {
  let rang = 1
  for (let i = SEUILS_RANG.length - 1; i >= 0; i--) {
    if (points >= SEUILS_RANG[i]) {
      rang = i + 1
      break
    }
  }
  return Math.min(rang, 6)
}

function chargerEtat() {
  try {
    const sauvegarde = localStorage.getItem('studioEtoile_progression')
    if (sauvegarde) return JSON.parse(sauvegarde)
  } catch {}
  return {
    points: 0,
    rang: 1,
    exercicesCompletes: [],
    recompensesDebloquees: [],
    joursConsecutifs: 0,
    derniereConnexion: null,
    sessionAujourdhui: 0,
  }
}

function sauvegarderEtat(etat) {
  try {
    localStorage.setItem('studioEtoile_progression', JSON.stringify(etat))
  } catch {}
}

/**
 * Hook principal de progression — gère les points, rang, récompenses
 */
export function useProgression() {
  const [etat, setEtat] = useState(() => chargerEtat())

  const ajouterPoints = useCallback((pts, idExercice = null) => {
    setEtat((prev) => {
      const nouveauxPoints = prev.points + pts
      const nouveauRang = calculerRang(nouveauxPoints)
      const monteeRang = nouveauRang > prev.rang

      const nouvelEtat = {
        ...prev,
        points: nouveauxPoints,
        rang: nouveauRang,
        exercicesCompletes: idExercice
          ? [...new Set([...prev.exercicesCompletes, idExercice])]
          : prev.exercicesCompletes,
        sessionAujourdhui: prev.sessionAujourdhui + pts,
      }
      sauvegarderEtat(nouvelEtat)
      return { ...nouvelEtat, _monteeRang: monteeRang, _nouveauRang: nouveauRang }
    })
  }, [])

  const debloquerRecompense = useCallback((idRecompense) => {
    setEtat((prev) => {
      if (prev.recompensesDebloquees.includes(idRecompense)) return prev
      const nouvelEtat = {
        ...prev,
        recompensesDebloquees: [...prev.recompensesDebloquees, idRecompense],
      }
      sauvegarderEtat(nouvelEtat)
      return nouvelEtat
    })
  }, [])

  const pointsVersSuivant =
    SEUILS_RANG[Math.min(etat.rang, 5)] - etat.points

  const pctVersRangSuivant = etat.rang < 6
    ? Math.round(
        ((etat.points - SEUILS_RANG[etat.rang - 1]) /
          (SEUILS_RANG[etat.rang] - SEUILS_RANG[etat.rang - 1])) * 100
      )
    : 100

  return {
    points: etat.points,
    rang: etat.rang,
    exercicesCompletes: etat.exercicesCompletes,
    recompensesDebloquees: etat.recompensesDebloquees,
    joursConsecutifs: etat.joursConsecutifs,
    pointsVersSuivant,
    pctVersRangSuivant: Math.min(100, Math.max(0, pctVersRangSuivant)),
    ajouterPoints,
    debloquerRecompense,
    estComplete: (id) => etat.exercicesCompletes.includes(id),
    aRecompense: (id) => etat.recompensesDebloquees.includes(id),
  }
}
