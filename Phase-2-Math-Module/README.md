# Phase 2 — Module Mathématiques
**Studio Étoile | Phase 2**
**Niveau : 5e–6e année, Québec (Programme de formation de l'école québécoise)**
**Durée estimée : 3 semaines**

---

## Objectif de la Phase

Créer un module de mathématiques immersif où :
- Chaque problème est scénarisé dans l'univers beauté/mode
- La méthode PALETTE structure la résolution étape par étape
- La concentration est entraînée par des défis progressifs
- L'enfant comprend les questions grâce au contexte visuel et narratif

---

## Compétences Ciblées (Programme QC 5e–6e année)

### Arithmétique
| Compétence | Détail |
|-----------|--------|
| Fractions | Fractions équivalentes, additions, comparaisons |
| Décimaux | Opérations jusqu'aux centièmes |
| Pourcentages | Calcul simple de pourcentages (5e–6e) |
| Multiplication/Division | Tables jusqu'à 12, division à 2 chiffres |
| Nombres entiers | Opérations sur les entiers négatifs (6e) |

### Géométrie
| Compétence | Détail |
|-----------|--------|
| Périmètre et aire | Rectangles, triangles, cercles |
| Volumes | Solides simples (cube, prisme rectangulaire) |
| Transformations | Réflexion, rotation, translation |
| Angles | Mesure et classification |

### Mesure & Statistiques
| Compétence | Détail |
|-----------|--------|
| Mesures | Conversion unités (cm, m, km, g, kg, L, mL) |
| Temps | Calculs de durée, horaires |
| Données | Tableaux, diagrammes à barres, pictogrammes |
| Probabilités | Notions de base (probable, certain, impossible) |

### Algèbre (6e année)
| Compétence | Détail |
|-----------|--------|
| Suites | Régularités numériques et géométriques |
| Équations simples | Trouver la valeur inconnue |

---

## Méthode PALETTE — Guide d'Application

Chaque exercice suit 4 étapes codées par couleur :

```
BLEU    → Je lis la question (lecture attentive, 1 fois)
JAUNE   → Je surligne ce qui est important (données clés)
ROSE    → Je calcule (espace de travail)
VERT    → Je vérifie ma réponse (est-ce logique ?)
```

L'interface affiche une barre de progression PALETTE.
L'enfant ne peut pas passer à l'étape suivante sans confirmer la précédente.
Cela force la lecture complète et prévient les réponses impulsives.

---

## Scénarios Thématiques (Univers Beauté & Mode)

### Thème 1 : Le Salon de Manucure "Rose Étoile"
> Léa travaille dans un salon de manucure. Elle doit gérer les commandes de vernis,
> les rendez-vous et les mélanges de couleurs.

**Problèmes types :**
- Léa a commandé 3/4 de litre de vernis rouge et 1/2 litre de vernis rose.
  Combien de litre de vernis a-t-elle au total ?
- Elle prépare 5 bouteilles de 125 mL chacune. Combien de millilitres en tout ?
- Une manucure dure 45 minutes. Si elle commence à 14h15, à quelle heure finit-elle ?

### Thème 2 : Studio Maquillage "Glamour Academy"
> Sophie crée sa propre collection de maquillage. Elle mélange des couleurs,
> calcule des prix et organise ses produits.

**Problèmes types :**
- Sophie vend ses fards à 8,75 $ chacun. Elle en vend 12. Quel est son revenu total ?
- Elle mélange 2/5 de rouge avec 3/5 de blanc pour faire du rose. Quelle fraction est rose ?
- Son emballage est un rectangle de 8 cm × 5 cm. Quelle est son aire ?

### Thème 3 : Défilé de Mode "Collection Printemps"
> Emma organise un défilé de mode. Elle doit gérer les mesures des vêtements,
> les horaires et les statistiques du public.

**Problèmes types :**
- La scène du défilé mesure 12 m de long et 4 m de large. Quelle est sa superficie ?
- 240 personnes sont invitées. 75 % sont présentes. Combien de personnes sont là ?
- Emma a 3 h 20 min pour préparer 8 modèles. Combien de minutes par modèle ?

### Thème 4 : La Boutique de Mode "Couleurs du Monde"
> Clara gère une boutique. Elle fait des inventaires, calcule des rabais
> et organise les étalages géométriques.

**Problèmes types :**
- Un manteau coûte 85 $. Il est en solde à 20 % de rabais. Quel est le nouveau prix ?
- Clara a reçu 144 foulards à ranger en rangées de 12. Combien de rangées ?
- Elle dessine une vitrine triangulaire : base = 6 m, hauteur = 4 m. Quelle est l'aire ?

### Thème 5 : Atelier Nail Art "Créations"
> Jade crée des motifs de nail art géométriques. Elle utilise des formes,
> des symétries et des transformations.

**Problèmes types :**
- Jade dessine un motif avec une réflexion. Décris la transformation.
- Elle crée une suite : rouge, bleu, rouge, bleu... Quel est le 15e élément ?
- Son onglet carré a un côté de 2,5 cm. Quel est son périmètre ?

---

## Structure des Exercices (Format JSON)

Chaque problème est stocké en JSON avec les champs suivants :

```json
{
  "id": "math-p2-001",
  "phase": 2,
  "theme": "salon-manucure",
  "niveau": "5e-annee",
  "competence": "fractions",
  "difficulte": 1,
  "titre": "Les vernis de Léa",
  "contexte_image": "salon-manucure.png",
  "personnage": "Léa",
  "enonce": "Léa a commandé 3/4 de litre de vernis rouge et 1/2 litre de vernis rose. Combien de litres de vernis a-t-elle au total ?",
  "indices": [
    "Pense à transformer les fractions pour qu'elles aient le même dénominateur.",
    "3/4 = 6/8 et 1/2 = 4/8... continue !"
  ],
  "etapes_palette": {
    "bleu": "Lis bien la question : qu'est-ce qu'on cherche ?",
    "jaune": "Surligne les deux quantités de vernis.",
    "rose": "Additionne les deux fractions.",
    "vert": "Ta réponse est-elle plus grande que 1 litre ? C'est logique ?"
  },
  "reponse": "1 et 1/4 litre ou 5/4 litre",
  "recompense": "vernis-corail",
  "points": 15
}
```

---

## Défis Flash Focus (Concentration)

Séries de 5 micro-exercices chronométrés (3 minutes chacun) :

| Défi | Type | Durée | Récompense |
|------|------|-------|-----------|
| Calcul Express | Multiplication/addition rapide | 3 min | Paillette d'or |
| Mémoire Couleurs | Séquence à reproduire | 2 min | Sticker étoile |
| Vrai ou Faux Math | 10 affirmations à juger | 3 min | Badge concentration |
| Compléter la Suite | Régularités numériques | 3 min | Ruban de mode |
| Estimation Rapide | Arrondi et estimation | 2 min | Confettis |

---

## Progression et Difficulté Adaptative

```
Niveau 1 (Étoile de Début)   → Problèmes 1 étape, nombres entiers simples
Niveau 2 (Étoile Montante)   → 2 étapes, introduction fractions
Niveau 3 (Étoile Brillante)  → 3 étapes, fractions + décimaux
Niveau 4 (Étoile Dorée)      → Multi-étapes, pourcentages, géométrie
Niveau 5 (Super Étoile)      → Problèmes complexes, algèbre simple, 6e année
```

L'app ajuste automatiquement le niveau selon les 3 dernières réponses.

---

## Catalogue de Récompenses Math

| Récompense | Type | Déclencheur |
|-----------|------|------------|
| Vernis "Corail Coucher de Soleil" | Vernis avatar | 5 bonnes réponses consécutives |
| Rouge à Lèvres "Cerise" | Maquillage avatar | Terminer un thème complet |
| Mascara "Étoile Noire" | Maquillage avatar | 100 points en une session |
| Robe de Défilé "Rose Nacré" | Tenue avatar | Terminer phase 2 niveau 3 |
| Couronne de Mode | Accessoire avatar | Perfection (100%) sur un défi |
| Badge "Mathématicienne Étoile" | Badge profil | Compléter tous les thèmes |

---

## Critères de Complétion de la Phase 2

- [ ] 40 problèmes scénarisés créés (8 par thème)
- [ ] Méthode PALETTE implémentée dans l'interface
- [ ] 5 séries de Défis Flash Focus créées
- [ ] Système de difficulté adaptative fonctionnel
- [ ] Catalogue de récompenses lié au module math
- [ ] Tous les textes en français québécois validés
