import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BoutonPrincipal from '../components/ui/BoutonPrincipal'
import MessageFeedback from '../components/ui/MessageFeedback'
import EtoileRecompense from '../components/ui/EtoileRecompense'
import { useProgression } from '../gamification/useProgression'

// ─── LECTURE ────────────────────────────────────────────────────────────────
const TEXTES_LECTURE = [
  {
    id: 'lect-001',
    titre: 'Le vernis de Sofia',
    texte: `Sofia adore les lundis parce qu'elle choisit son vernis à ongles pour toute la semaine. Ce matin, elle hésite entre le rose nacré et le corail lumineux. Elle ouvre son tiroir et compte ses flacons : vingt-trois au total, tous rangés par famille de couleurs.

Sa mère entre dans la chambre. « Sofia, tu vas être en retard à l'école ! » Sofia attrape rapidement le corail lumineux. Ce vernis lui rappelle les couchers de soleil en vacances. Elle sourit et descend l'escalier en courant, son sac sur l'épaule.`,
    questions: [
      { question: 'Quel jour Sofia choisit-elle son vernis ?', reponses: ['Le lundi', 'Le vendredi', 'Le dimanche', 'Le mercredi'], bonne: 0 },
      { question: 'Combien de flacons de vernis Sofia possède-t-elle ?', reponses: ['Dix', 'Vingt', 'Vingt-trois', 'Trente'], bonne: 2 },
      { question: 'Quel vernis Sofia choisit-elle finalement ?', reponses: ['Le rose nacré', 'Le bleu marine', 'Le corail lumineux', 'Le violet lavande'], bonne: 2 },
    ],
    points: 15,
    recompense: 'vernis-rose-princesse',
  },
  {
    id: 'lect-002',
    titre: 'Une journée au salon',
    texte: `Le salon de beauté de Madame Dubois sentait la rose et la vanille. Camille, douze ans, accompagnait sa grand-mère pour la première fois. Elle regardait partout avec des yeux émerveillés : les miroirs encadrés de lumières dorées, les flacons alignés comme des soldats colorés, et les esthéticiennes aux gestes précis et doux.

« C'est ici que je viens depuis trente ans, » dit grand-mère en souriant. Camille s'assit dans le grand fauteuil rose et décida ce jour-là qu'elle voulait, elle aussi, rendre les gens beaux et heureux.`,
    questions: [
      { question: 'Quelle odeur régnait dans le salon ?', reponses: ['Citron et menthe', 'Rose et vanille', 'Lavande et eucalyptus', 'Chocolat et café'], bonne: 1 },
      { question: 'Depuis combien d\'années grand-mère fréquente-t-elle ce salon ?', reponses: ['Dix ans', 'Vingt ans', 'Trente ans', 'Quarante ans'], bonne: 2 },
      { question: 'Qu\'est-ce que Camille décide ce jour-là ?', reponses: ['D\'ouvrir une boutique', 'D\'apprendre la cuisine', 'De rendre les gens beaux et heureux', 'De devenir médecin'], bonne: 2 },
    ],
    points: 15,
    recompense: 'or-paillette',
  },
]

// ─── GRAMMAIRE ───────────────────────────────────────────────────────────────
const EXERCICES_GRAMMAIRE = [
  {
    id: 'gram-001',
    titre: 'Les adjectifs de couleur',
    consigne: 'Choisis le bon accord pour l\'adjectif de couleur.',
    questions: [
      { enonce: 'Elle porte une robe _____.', reponses: ['rose', 'roses', 'rosé', 'rosée'], bonne: 0, explication: 'Les noms de couleurs simples s\'accordent en genre et en nombre : une robe rose (féminin singulier).' },
      { enonce: 'Ses ongles sont _____.', reponses: ['coraux', 'corail', 'coraille', 'corails'], bonne: 1, explication: 'Corail est invariable quand il désigne une couleur : des ongles corail.' },
      { enonce: 'Elle a les yeux _____.', reponses: ['marrons', 'marron', 'marronne', 'marrones'], bonne: 1, explication: 'Marron est invariable en tant que couleur : des yeux marron.' },
      { enonce: 'Ses lèvres _____ brillent sous la lumière.', reponses: ['dorés', 'doré', 'dorée', 'dorées'], bonne: 3, explication: 'Doré s\'accorde : lèvres est féminin pluriel → dorées.' },
    ],
    points: 20,
    recompense: 'vernis-holographique',
  },
  {
    id: 'gram-002',
    titre: 'Le présent de l\'indicatif',
    consigne: 'Conjugue le verbe entre parenthèses au présent.',
    questions: [
      { enonce: 'Sofia (choisir) son vernis chaque matin.', reponses: ['choisi', 'choisit', 'choisissent', 'choisie'], bonne: 1, explication: 'Choisir → elle choisit (présent, 3e personne du singulier).' },
      { enonce: 'Nous (apprendre) les règles de grammaire.', reponses: ['apprenons', 'apprendons', 'apprennons', 'apprénons'], bonne: 0, explication: 'Apprendre → nous apprenons.' },
      { enonce: 'Tu (être) une vraie artiste !', reponses: ['es', 'est', 'êtes', 'ais'], bonne: 0, explication: 'Être → tu es.' },
      { enonce: 'Elles (avoir) de belles couleurs.', reponses: ['ont', 'a', 'avons', 'as'], bonne: 0, explication: 'Avoir → elles ont.' },
    ],
    points: 20,
    recompense: 'rouge-levres-cerise',
  },
]

// ─── JOURNAL ─────────────────────────────────────────────────────────────────
const SUJETS_JOURNAL = [
  'Décris ton vernis préféré et pourquoi tu l\'aimes.',
  'Raconte une journée parfaite dans un salon de beauté.',
  'Invente un nouveau produit de beauté et décris-le.',
  'Décris le style vestimentaire de ta meilleure amie.',
]

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
export default function PageFrancais() {
  const navigate = useNavigate()
  const { ajouterPoints, debloquerRecompense, estComplete } = useProgression()

  const [section, setSection] = useState(null) // null | 'lecture' | 'journal' | 'grammaire'

  // Lecture state
  const [texteActif, setTexteActif] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [reponseChoisie, setReponseChoisie] = useState(null)
  const [feedbackLecture, setFeedbackLecture] = useState({ visible: false, type: 'bien', message: '' })
  const [lectureTerminee, setLectureTerminee] = useState(false)

  // Grammaire state
  const [exerciceGram, setExerciceGram] = useState(null)
  const [indexGram, setIndexGram] = useState(0)
  const [scoreGram, setScoreGram] = useState(0)
  const [reponseGram, setReponseGram] = useState(null)
  const [feedbackGram, setFeedbackGram] = useState({ visible: false, type: 'bien', message: '' })
  const [gramTermine, setGramTermine] = useState(false)

  // Journal state
  const [sujetIndex] = useState(() => Math.floor(Math.random() * SUJETS_JOURNAL.length))
  const [texteJournal, setTexteJournal] = useState('')
  const [journalSoumis, setJournalSoumis] = useState(false)

  // Récompense partagée
  const [recompense, setRecompense] = useState({ visible: false, points: 0, message: '' })

  // ── Lecture ──
  function ouvrirTexte(texte) {
    setTexteActif(texte)
    setQuestionIndex(0)
    setScore(0)
    setReponseChoisie(null)
    setFeedbackLecture({ visible: false, type: 'bien', message: '' })
    setLectureTerminee(false)
  }

  function repondreQuestion(indexReponse) {
    if (reponseChoisie !== null) return
    setReponseChoisie(indexReponse)
    const bonne = texteActif.questions[questionIndex].bonne === indexReponse
    if (bonne) {
      setScore(s => s + 1)
      setFeedbackLecture({ visible: true, type: 'parfait', message: 'Bonne réponse ! ✨' })
    } else {
      setFeedbackLecture({ visible: true, type: 'presque', message: `Pas tout à fait... La bonne réponse était : ${texteActif.questions[questionIndex].reponses[texteActif.questions[questionIndex].bonne]}` })
    }
  }

  function questionSuivante() {
    if (questionIndex < texteActif.questions.length - 1) {
      setQuestionIndex(i => i + 1)
      setReponseChoisie(null)
      setFeedbackLecture({ visible: false, type: 'bien', message: '' })
    } else {
      setLectureTerminee(true)
      const pts = score * 5
      ajouterPoints(pts, texteActif.id)
      if (score === texteActif.questions.length) debloquerRecompense(texteActif.recompense)
      setRecompense({ visible: true, points: pts, message: `${score}/${texteActif.questions.length} bonnes réponses !` })
    }
  }

  // ── Grammaire ──
  function ouvrirExerciceGram(ex) {
    setExerciceGram(ex)
    setIndexGram(0)
    setScoreGram(0)
    setReponseGram(null)
    setFeedbackGram({ visible: false, type: 'bien', message: '' })
    setGramTermine(false)
  }

  function repondreGram(index) {
    if (reponseGram !== null) return
    setReponseGram(index)
    const q = exerciceGram.questions[indexGram]
    const bonne = q.bonne === index
    if (bonne) {
      setScoreGram(s => s + 1)
      setFeedbackGram({ visible: true, type: 'parfait', message: `Correct ! ${q.explication}` })
    } else {
      setFeedbackGram({ visible: true, type: 'presque', message: `Pas tout à fait. ${q.explication}` })
    }
  }

  function questionGramSuivante() {
    if (indexGram < exerciceGram.questions.length - 1) {
      setIndexGram(i => i + 1)
      setReponseGram(null)
      setFeedbackGram({ visible: false, type: 'bien', message: '' })
    } else {
      setGramTermine(true)
      const pts = scoreGram * 5
      ajouterPoints(pts, exerciceGram.id)
      if (scoreGram === exerciceGram.questions.length) debloquerRecompense(exerciceGram.recompense)
      setRecompense({ visible: true, points: pts, message: `${scoreGram}/${exerciceGram.questions.length} bonnes réponses !` })
    }
  }

  // ── Journal ──
  function soumettreJournal() {
    if (texteJournal.trim().split(/\s+/).length < 10) return
    setJournalSoumis(true)
    ajouterPoints(25, 'journal-beaute')
    debloquerRecompense('vernis-rose-princesse')
    setRecompense({ visible: true, points: 25, message: 'Bravo pour ton texte ! ✍️' })
  }

  // ── Vues ──────────────────────────────────────────────────────────────────

  // Menu principal
  if (!section) {
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
          {[
            { id: 'lecture',    titre: 'Lecture',              emoji: '📖', couleur: 'bg-lavande-light border-lavande', desc: '20 textes beauté & mode à lire' },
            { id: 'journal',   titre: 'Mon Journal de Beauté', emoji: '✍️', couleur: 'bg-rose-light border-rose',       desc: 'Écris comme une vraie chroniqueuse !' },
            { id: 'grammaire', titre: 'Grammaire',             emoji: '📝', couleur: 'bg-perle border-gray-200',        desc: 'Fiches de révision contextualisées' },
          ].map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSection(s.id)}
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="carte border-2 border-rose bg-rose-light"
          >
            <p className="text-xs font-bold text-rose-dark uppercase tracking-wide mb-2">Sujet du jour ✨</p>
            <h3 className="font-nunito font-bold text-gray-800 text-base">
              {SUJETS_JOURNAL[sujetIndex]}
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">3 à 5 phrases minimum — Ton éditrice t'attend !</p>
            <BoutonPrincipal variante="principal" taille="sm" onClick={() => setSection('journal')}>
              ✍️ Commencer à écrire
            </BoutonPrincipal>
          </motion.div>
        </main>
      </div>
    )
  }

  // ── Section LECTURE ────────────────────────────────────────────────────────
  if (section === 'lecture') {
    // Texte ouvert → questions
    if (texteActif && !lectureTerminee) {
      const q = texteActif.questions[questionIndex]
      return (
        <div className="min-h-screen bg-porcelaine">
          <EtoileRecompense
            visible={recompense.visible}
            points={recompense.points}
            message={recompense.message}
            onFin={() => { setRecompense({ visible: false, points: 0, message: '' }); setTexteActif(null) }}
          />
          <header className="bg-white border-b border-lavande px-6 py-4">
            <div className="max-w-md mx-auto flex items-center gap-3">
              <button onClick={() => setTexteActif(null)} className="text-rose text-xl">←</button>
              <div>
                <h1 className="font-nunito font-bold text-lg text-gray-800">{texteActif.titre}</h1>
                <p className="text-xs text-gray-400">Question {questionIndex + 1} / {texteActif.questions.length}</p>
              </div>
            </div>
          </header>
          <main className="max-w-md mx-auto px-4 py-6 space-y-5">
            {/* Texte */}
            <div className="carte border-2 border-lavande bg-lavande-light text-sm leading-relaxed text-gray-700 whitespace-pre-line">
              {texteActif.texte}
            </div>
            {/* Question */}
            <div className="carte border-2 border-rose">
              <p className="font-nunito font-bold text-gray-800 mb-4">{q.question}</p>
              <div className="space-y-2">
                {q.reponses.map((r, i) => {
                  let style = 'border-2 border-gray-200 bg-perle hover:border-rose hover:bg-rose-light'
                  if (reponseChoisie !== null) {
                    if (i === q.bonne) style = 'border-2 border-emerald-400 bg-emerald-50'
                    else if (i === reponseChoisie) style = 'border-2 border-red-300 bg-red-50'
                    else style = 'border-2 border-gray-100 bg-gray-50 opacity-60'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => repondreQuestion(i)}
                      className={`w-full text-left px-4 py-3 rounded-2xl font-nunito text-sm text-gray-800 transition-all ${style}`}
                    >
                      {r}
                    </button>
                  )
                })}
              </div>
            </div>
            <MessageFeedback visible={feedbackLecture.visible} type={feedbackLecture.type} message={feedbackLecture.message} />
            {reponseChoisie !== null && (
              <BoutonPrincipal onClick={questionSuivante} variante="principal" taille="lg">
                {questionIndex < texteActif.questions.length - 1 ? '→ Question suivante' : '🎉 Voir mon score'}
              </BoutonPrincipal>
            )}
          </main>
        </div>
      )
    }

    // Liste des textes
    return (
      <div className="min-h-screen bg-porcelaine">
        <header className="bg-white border-b border-lavande px-6 py-4">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <button onClick={() => setSection(null)} className="text-rose text-xl">←</button>
            <div>
              <h1 className="font-nunito font-bold text-xl text-gray-800">📖 Lecture</h1>
              <p className="text-xs text-gray-400">Textes beauté & mode</p>
            </div>
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 py-6 space-y-4">
          {TEXTES_LECTURE.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="carte border-2 border-lavande bg-lavande-light cursor-pointer"
              onClick={() => ouvrirTexte(t)}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <div className="flex-1">
                  <h3 className="font-nunito font-bold text-gray-800">{t.titre}</h3>
                  <p className="text-xs text-gray-500">{t.questions.length} questions • {t.points} pts</p>
                </div>
                {estComplete(t.id) && <span className="text-emerald-500 text-xl">✅</span>}
              </div>
            </motion.div>
          ))}
        </main>
      </div>
    )
  }

  // ── Section GRAMMAIRE ──────────────────────────────────────────────────────
  if (section === 'grammaire') {
    if (exerciceGram && !gramTermine) {
      const q = exerciceGram.questions[indexGram]
      return (
        <div className="min-h-screen bg-porcelaine">
          <EtoileRecompense
            visible={recompense.visible}
            points={recompense.points}
            message={recompense.message}
            onFin={() => { setRecompense({ visible: false, points: 0, message: '' }); setExerciceGram(null) }}
          />
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-md mx-auto flex items-center gap-3">
              <button onClick={() => setExerciceGram(null)} className="text-rose text-xl">←</button>
              <div>
                <h1 className="font-nunito font-bold text-lg text-gray-800">{exerciceGram.titre}</h1>
                <p className="text-xs text-gray-400">Question {indexGram + 1} / {exerciceGram.questions.length}</p>
              </div>
            </div>
          </header>
          <main className="max-w-md mx-auto px-4 py-6 space-y-5">
            <div className="carte border-2 border-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{exerciceGram.consigne}</p>
              <p className="font-nunito font-bold text-gray-800 text-base">{q.enonce}</p>
            </div>
            <div className="space-y-2">
              {q.reponses.map((r, i) => {
                let style = 'border-2 border-gray-200 bg-perle hover:border-lavande hover:bg-lavande-light'
                if (reponseGram !== null) {
                  if (i === q.bonne) style = 'border-2 border-emerald-400 bg-emerald-50'
                  else if (i === reponseGram) style = 'border-2 border-red-300 bg-red-50'
                  else style = 'border-2 border-gray-100 bg-gray-50 opacity-60'
                }
                return (
                  <button
                    key={i}
                    onClick={() => repondreGram(i)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-nunito text-sm text-gray-800 transition-all ${style}`}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
            <MessageFeedback visible={feedbackGram.visible} type={feedbackGram.type} message={feedbackGram.message} />
            {reponseGram !== null && (
              <BoutonPrincipal onClick={questionGramSuivante} variante="principal" taille="lg">
                {indexGram < exerciceGram.questions.length - 1 ? '→ Question suivante' : '🎉 Voir mon score'}
              </BoutonPrincipal>
            )}
          </main>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-porcelaine">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <button onClick={() => setSection(null)} className="text-rose text-xl">←</button>
            <div>
              <h1 className="font-nunito font-bold text-xl text-gray-800">📝 Grammaire</h1>
              <p className="text-xs text-gray-400">Fiches de révision contextualisées</p>
            </div>
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 py-6 space-y-4">
          {EXERCICES_GRAMMAIRE.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="carte border-2 border-gray-200 bg-perle cursor-pointer"
              onClick={() => ouvrirExerciceGram(ex)}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">📝</span>
                <div className="flex-1">
                  <h3 className="font-nunito font-bold text-gray-800">{ex.titre}</h3>
                  <p className="text-xs text-gray-500">{ex.questions.length} questions • {ex.points} pts</p>
                </div>
                {estComplete(ex.id) && <span className="text-emerald-500 text-xl">✅</span>}
              </div>
            </motion.div>
          ))}
        </main>
      </div>
    )
  }

  // ── Section JOURNAL ────────────────────────────────────────────────────────
  if (section === 'journal') {
    const mots = texteJournal.trim() === '' ? 0 : texteJournal.trim().split(/\s+/).length

    if (journalSoumis) {
      return (
        <div className="min-h-screen bg-porcelaine flex items-center justify-center px-4">
          <EtoileRecompense
            visible={recompense.visible}
            points={recompense.points}
            message={recompense.message}
            onFin={() => { setRecompense({ visible: false, points: 0, message: '' }); setSection(null); setJournalSoumis(false); setTexteJournal('') }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="carte border-2 border-rose bg-rose-light text-center max-w-sm"
          >
            <span className="text-6xl mb-4 block">🌸</span>
            <h2 className="font-nunito font-bold text-2xl text-gray-800 mb-2">Bravo, chroniqueuse !</h2>
            <p className="text-gray-600 mb-6">Ton texte a été enregistré dans ton journal. +25 points ✨</p>
            <BoutonPrincipal variante="principal" onClick={() => { setSection(null); setJournalSoumis(false); setTexteJournal('') }}>
              🏠 Retour au menu
            </BoutonPrincipal>
          </motion.div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-porcelaine">
        <EtoileRecompense
          visible={recompense.visible}
          points={recompense.points}
          message={recompense.message}
          onFin={() => setRecompense({ visible: false, points: 0, message: '' })}
        />
        <header className="bg-white border-b border-rose-light px-6 py-4">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <button onClick={() => setSection(null)} className="text-rose text-xl">←</button>
            <div>
              <h1 className="font-nunito font-bold text-xl text-gray-800">✍️ Mon Journal de Beauté</h1>
              <p className="text-xs text-gray-400">Écris comme une vraie chroniqueuse !</p>
            </div>
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 py-6 space-y-4">
          <div className="carte border-2 border-rose bg-rose-light">
            <p className="text-xs font-bold text-rose-dark uppercase tracking-wide mb-1">Sujet du jour ✨</p>
            <p className="font-nunito font-bold text-gray-800">{SUJETS_JOURNAL[sujetIndex]}</p>
            <p className="text-xs text-gray-500 mt-1">3 à 5 phrases minimum</p>
          </div>

          <div className="carte border-2 border-rose-light">
            <textarea
              value={texteJournal}
              onChange={e => setTexteJournal(e.target.value)}
              placeholder="Commence à écrire ici..."
              rows={8}
              className="w-full font-nunito text-gray-800 text-sm bg-transparent outline-none resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-rose-light">
              <p className={`text-xs font-bold ${mots >= 15 ? 'text-emerald-500' : 'text-gray-400'}`}>
                {mots} mot{mots !== 1 ? 's' : ''} {mots >= 15 ? '✅' : `(minimum 15)`}
              </p>
            </div>
          </div>

          <BoutonPrincipal
            variante="principal"
            taille="lg"
            onClick={soumettreJournal}
          >
            ✍️ Soumettre mon texte
          </BoutonPrincipal>
        </main>
      </div>
    )
  }

  return null
}
