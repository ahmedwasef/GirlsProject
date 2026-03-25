# Phase 1 — Fondation & Système de Design
**Studio Étoile | Phase 1**
**Durée estimée : 2 semaines**

---

## Objectif de la Phase

Établir les bases solides de l'application :
- Identité visuelle complète
- Système de composants réutilisables
- Architecture technique
- Contenu textuel en français québécois

---

## Livrables

| # | Livrable | Fichier |
|---|---------|---------|
| 1 | Système de design (couleurs, typographie, icônes) | `design-system.md` |
| 2 | Stack technique et architecture | `tech-stack.md` |
| 3 | Composants UI de base | `ui-components.md` |
| 4 | Charte linguistique (ton, vocabulaire) | `charte-langue.md` |

---

## Identité Visuelle

### Palette de Couleurs Principale

| Nom | Hex | Usage |
|-----|-----|-------|
| Rose Nacré | `#FFB6C1` | Couleur principale, boutons |
| Rouge Rubis | `#E8003D` | Accent, alertes positives |
| Corail Chaud | `#FF6B6B` | Secondaire, highlights |
| Lavande Douce | `#C8A2C8` | Fond des modules |
| Or Étoile | `#FFD700` | Récompenses, étoiles |
| Blanc Porcelaine | `#FFF8F8` | Fond principal |
| Gris Perle | `#F0EBF4` | Cartes, zones de texte |

### Typographie

| Usage | Police | Raison |
|-------|--------|--------|
| Titres | Nunito Bold | Ronde, douce, lisible pour enfants |
| Corps | Nunito Regular | Cohérence, très lisible |
| Nombres / Math | Nunito SemiBold | Clarté des chiffres |
| Accent / Mode | Playfair Display (titres uniquement) | Touche mode/élégance |

---

## Composants UI à Construire

### Composants de Base
- `BoutonPrincipal` — bouton rose avec animation au clic
- `CartéExercice` — carte d'un exercice avec icône et difficulté
- `BarreProgression` — barre de progression colorée animée
- `ÉtoileRécompense` — animation d'étoile dorée à la réussite
- `Minuterie` — sablier animé pour les défis flash
- `AvatarEnfant` — avatar personnalisable (tenues, maquillage)

### Composants Math
- `ProblèmeScénarisé` — zone de lecture d'un problème avec image
- `ZoneCálcul` — espace de travail avec étapes colorées (méthode PALETTE)
- `ClavierMath` — clavier numérique adapté enfant
- `IndiceVisuel` — bouton d'aide avec animation

### Composants Français
- `ZoneLecture` — texte formaté avec surlignage interactif
- `ÉditeurJournal` — éditeur simple pour le Journal de Beauté
- `CorrectionDouce` — affichage des corrections sans rouge agressif

---

## Architecture de l'Application

```
src/
├── components/
│   ├── ui/              ← Composants génériques
│   ├── math/            ← Composants module math
│   └── french/          ← Composants module français
├── modules/
│   ├── math/            ← Logique et données math
│   └── french/          ← Logique et données français
├── gamification/        ← Moteur de récompenses
├── data/
│   ├── exercices-math/  ← JSON des problèmes math
│   └── exercices-fr/    ← JSON des exercices français
├── assets/
│   ├── images/          ← Illustrations beauté/mode
│   ├── sounds/          ← Sons de récompense
│   └── avatars/         ← Pièces d'avatar
├── i18n/
│   └── fr-CA.json       ← Toutes les chaînes en français canadien
└── App.jsx
```

---

## Charte Linguistique (Résumé)

- Langue : **Français québécois**, registre soutenu mais accessible (pas d'argot)
- S'adresser à l'enfant avec **"tu"** (jamais "vous")
- Messages d'encouragement positifs : jamais "faux", toujours "essaie encore"
- Consignes courtes : **maximum 2 phrases** par instruction
- Éviter les termes abstraits sans illustration visuelle

### Exemples de Ton

| Situation | À ÉVITER | À UTILISER |
|-----------|----------|-----------|
| Mauvaise réponse | "C'est faux !" | "Presque ! Essaie encore, tu es capable !" |
| Réussite | "Correct." | "Bravo ! Tu as gagné un vernis Corail !" |
| Consigne | "Effectuez les calculs suivants" | "Résous ce problème pour Léa !" |

---

## Critères de Complétion de la Phase 1

- [ ] Système de design documenté avec swatches visuels
- [ ] Stack technique validé et projet initialisé
- [ ] 8+ composants UI de base construits et fonctionnels
- [ ] Charte linguistique approuvée
- [ ] Architecture de dossiers créée
- [ ] 5 illustrations de personnages/décors créées ou sourcées
