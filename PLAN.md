# 🎨 Studio Étoile — Plan Directeur du Projet
**Projet : (10yo Study)**
**Date de création : 25 mars 2026**
**Cible : Fille, 10 ans, cycle 3 québécois (5e–6e année)**
**Langue : Français (francophone, commission scolaire francophone)**

---

## Vision du Projet

**Studio Étoile** est une application éducative personnalisée et immersive pour les enfants de 10 ans
qui éprouvent des difficultés de concentration, de compréhension en mathématiques et d'expression
écrite en français.

Le concept central : transformer chaque leçon en expérience dans un **salon de beauté / studio
de mode** où la petite apprend, gagne des récompenses visuelles (vernis, maquillage, tenues),
et progresse à son rythme grâce à la gamification.

**Principe fondateur :** Apprendre par ce qu'on aime.

---

## Nom du Projet

| Nom | Signification |
|-----|---------------|
| **Studio Étoile** | Studio = lieu de création / Étoile = brillance, réussite |
| Sous-titre | *Apprends. Brille. Crée.* |
| Code projet | `10yo-Study` |

---

## Profil de l'Utilisatrice

| Critère | Détail |
|---------|--------|
| Âge | 10 ans |
| Niveau scolaire | 5e année → 6e année (Québec) |
| Langue | Français (tout le contenu) |
| Difficultés ciblées | Concentration, compréhension de problèmes math, lecture/rédaction français |
| Centres d'intérêt | Couleurs, maquillage, vernis, mode, rouge à lèvres |
| Style d'apprentissage | Visuel, narratif, interactif |

---

## Approches Pédagogiques Innovantes

### 1. Méthode SCÈNE (Scénario Contextualisé pour l'Engagement Naturel de l'Enfant)
> Chaque problème mathématique est raconté comme une histoire dans un salon de beauté.
> "Léa prépare 3 teintes de rouge à lèvres..." — l'enfant résout en vivant le scénario.

### 2. Technique PALETTE (Palier d'Apprentissage par Étapes Tracées et Teintées)
> Chaque étape d'un problème est assignée à une couleur.
> Bleu = je lis / Jaune = je comprends / Rose = je calcule / Vert = je vérifie.
> Cela entraîne la séquence de pensée et combat l'impulsivité.

### 3. Journal de Beauté (Rédaction Narrative)
> Remplace les "exercices de rédaction" par un vrai journal de mode.
> L'enfant écrit comme une chroniqueuse beauté. Les correcteurs sont des "éditrices".

### 4. Manucure Mentale (Mémorisation par Association Sensorielle)
> Chaque table de multiplication / règle de grammaire est liée à une couleur de vernis.
> Le 7×8 = "Vernis Corail Coucher de Soleil" — l'association sensorielle renforce la mémoire.

### 5. Défi Flash Focus (Micro-tâches de 3 minutes)
> Entraîner la concentration par petites sessions courtes avec minuterie visuelle (sablier animé).
> Basé sur la technique Pomodoro adaptée pour enfants (3–5 minutes max par défi).

### 6. Système d'Étoiles et de Rang
> Pas de notes. Des **rangs de beauté** :
> Apprentie Styliste → Styliste → Créatrice → Designer → Artiste Étoile

---

## Structure du Projet — Phases

```
10yo-Study/
├── PLAN.md                          ← Ce fichier
├── Phase-1-Foundation/              ← Design, architecture, langue
├── Phase-2-Math-Module/             ← Mathématiques 5e–6e année QC
├── Phase-3-French-Module/           ← Lecture, rédaction, grammaire
├── Phase-4-Gamification/            ← Récompenses, niveaux, mini-jeux
└── Phase-5-Assessment-Parents/      ← Suivi, rapports, tableau de bord
```

---

## Vue d'Ensemble des Phases

| Phase | Titre | Livrable Principal | Priorité |
|-------|-------|-------------------|----------|
| 1 | Foundation & Design | Système de design + Stack technique | CRITIQUE |
| 2 | Module Math | 40+ problèmes scénarisés QC 5e–6e | HAUTE |
| 3 | Module Français | Exercices lecture + ateliers rédaction | HAUTE |
| 4 | Gamification | Moteur de récompenses + mini-jeux | MOYENNE |
| 5 | Évaluation & Parents | Dashboard + rapports de progression | MOYENNE |

---

## Stack Technique Recommandé

| Couche | Choix | Raison |
|--------|-------|--------|
| Frontend | React + Tailwind CSS | Animations fluides, composants réutilisables |
| Animations | Framer Motion | Transitions engageantes pour les enfants |
| Audio | Howler.js | Sons de récompense, lecture de consignes |
| Stockage local | LocalStorage / IndexedDB | Pas besoin de compte pour commencer |
| Backend (optionnel) | Supabase | Auth simple, sauvegarde de progression |
| Langue | i18n français exclusif | Tout le contenu en français québécois |

---

## Livrables Finaux Attendus

1. Application web responsive (mobile + tablette priorité)
2. 40+ problèmes de mathématiques scénarisés (thème beauté)
3. 20+ exercices de lecture/rédaction en français
4. Système de récompenses visuelles (avatar + items beauté débloquables)
5. Tableau de bord parent avec rapports PDF
6. Guide pédagogique pour parent/enseignant

---

## Métriques de Succès

- Taux de complétion des exercices > 80%
- Sessions moyennes > 15 minutes (sans forçage)
- Amélioration mesurable en 4 semaines (auto-évaluation + quiz)
- L'enfant demande à utiliser l'app de son propre chef ✓

---

*Toute l'interface, tout le contenu et tous les messages de l'application sont en français québécois.*
