# Phase 5 — Évaluation & Tableau de Bord Parents
**Studio Étoile | Phase 5**
**Durée estimée : 2 semaines**

---

## Objectif de la Phase

Donner aux parents et aux enseignants une vue claire de la progression de l'enfant,
sans transformer l'app en outil de pression ou de surveillance.

Principes directeurs :
- **Positif avant tout** : On montre les forces, pas seulement les lacunes
- **Concret** : Les données sont traduites en observations pratiques
- **Actionnable** : Chaque rapport suggère une prochaine étape
- **Privé** : Les données restent locales, jamais partagées sans consentement

---

## Données Collectées (Côté Enfant — Invisible)

L'app enregistre silencieusement :

| Donnée | Utilité |
|--------|---------|
| Temps par exercice | Détecter les blocages (trop lent = difficulté, trop rapide = impulsivité) |
| Nombre de tentatives par question | Identifier les concepts non acquis |
| Utilisation des indices | Mesurer l'autonomie |
| Heure de connexion | Repérer les habitudes d'étude |
| Durée de session | Vérifier la concentration |
| Progression par compétence | Vue macro des forces et faiblesses |
| Questions abandonnées | Frustration, bloqueuses |

---

## Interface Parent — Vue Principale

### Section 1 : Résumé de la Semaine
```
┌─────────────────────────────────────────┐
│  Semaine du 25 mars au 1er avril 2026   │
│                                         │
│  Sessions complétées :  5 / 7 jours     │
│  Points gagnés :        320 pts         │
│  Rang actuel :          Créatrice ★★★   │
│  Temps d'étude :        1h 45min        │
│                                         │
│  "Superbe semaine ! Elle a amélioré     │
│   sa compréhension des fractions !"    │
└─────────────────────────────────────────┘
```

### Section 2 : Carte des Compétences

Affichage visuel des compétences sur une grille colorée :

| Compétence | Niveau | Tendance |
|-----------|--------|----------|
| Fractions | 68% | En hausse |
| Décimaux | 55% | Stable |
| Géométrie | 72% | En hausse |
| Problèmes textes | 40% | À travailler |
| Lecture/Compréhension | 60% | En hausse |
| Rédaction | 48% | À travailler |
| Grammaire | 55% | Stable |

Chaque case est colorée : Vert (>70%), Jaune (50–70%), Corail (<50%).

### Section 3 : Points Forts de la Semaine
```
Ce que votre enfant maîtrise bien :
✓ Multiplication à 2 chiffres
✓ Accord sujet-verbe au présent
✓ Lecture de textes narratifs

Points d'attention :
→ Les problèmes de mots avec plusieurs étapes
→ Les fractions avec dénominateurs différents
→ Utilisation des connecteurs dans les textes
```

### Section 4 : Suggestions pour la Maison

L'app génère des conseils pratiques pour les parents :

```
Suggestions d'activités pour cette semaine :

MATHÉMATIQUES
→ Cuisinez ensemble ! Demandez-lui de doubler une recette
  (x2 des ingrédients) — les fractions en contexte réel.
→ Au magasin, demandez-lui d'estimer le total avant de payer.

FRANÇAIS
→ Lisez ensemble 10 minutes par soir. Posez-lui des questions
  sur ce qu'elle a lu (Qui ? Quoi ? Pourquoi ?).
→ Encouragez-la à décrire sa journée par écrit, même brièvement.

CONCENTRATION
→ Sessions de 20 minutes maximum, puis une vraie pause.
→ Espace calme, sans écrans en fond.
```

---

## Rapport PDF Mensuel

Un rapport PDF est généré automatiquement chaque mois.

### Structure du Rapport

```
PAGE 1 — Résumé de progression du mois
  → Points clés, temps d'étude, rang atteint

PAGE 2 — Détail Mathématiques
  → Compétences abordées, exercices complétés
  → Graphique de progression sur 4 semaines
  → 3 exercices types réussis et 2 à renforcer

PAGE 3 — Détail Français
  → Textes lus, entrées de journal
  → Extrait (avec permission) de la meilleure entrée du journal
  → Points de grammaire acquis

PAGE 4 — Analyse de la Concentration
  → Durée moyenne de session
  → Heures de travail les plus productives
  → Évolution du temps par exercice

PAGE 5 — Recommandations
  → 3 priorités pour le mois suivant
  → Ressources complémentaires suggérées
  → Prochain palier de rang à atteindre
```

---

## Mode Enseignant (Optionnel)

Si l'app est utilisée en contexte scolaire, un mode enseignant permet :

| Fonctionnalité | Description |
|---------------|-------------|
| Vue classe | Progression anonymisée de tous les élèves |
| Assignation | L'enseignant assigne des exercices spécifiques |
| Objectif | Lier les exercices aux compétences du bulletin QC |
| Export | Export CSV des données pour le dossier scolaire |
| Notes enseignant | Zone de commentaires sur les observations |

---

## Auto-Évaluation de l'Enfant

À la fin de chaque session, l'enfant répond à 2 questions rapides :

```
Comment tu te sens après cette session ?
[🌸 Super bien]  [🌷 Bien]  [🌻 Correct]  [🌧 Difficile]

Qu'est-ce que tu as trouvé le plus dur aujourd'hui ?
[Les mathématiques]  [Le français]  [La concentration]  [Rien !]
```

Ces données enrichissent le rapport parent et guident l'adaptation du contenu.

---

## Paramètres de Confidentialité

| Paramètre | Valeur par défaut | Modifiable |
|-----------|-----------------|-----------|
| Stockage des données | Local uniquement | Non |
| Partage avec école | Désactivé | Oui |
| Export de données | Manuel (par parent) | Oui |
| Rapport par courriel | Désactivé | Oui |
| Rétention des données | Indéfinie localement | Oui |

**Aucune donnée de l'enfant n'est envoyée à des serveurs tiers sans consentement explicite.**

---

## Critères de Complétion de la Phase 5

- [ ] Interface parent complète (résumé, carte des compétences, suggestions)
- [ ] Rapport PDF mensuel généré automatiquement
- [ ] Auto-évaluation de l'enfant fonctionnelle
- [ ] Graphiques de progression sur 4 semaines
- [ ] Mode enseignant (fonctionnalités de base)
- [ ] Paramètres de confidentialité configurables
- [ ] Documentation parent / guide d'utilisation (en français)
