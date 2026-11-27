# Réussite Offline — Préparateur d’examens et de concours hors ligne

Application web et mobile **offline-first (PWA)** conçue pour les lycéens, étudiants, candidats aux concours administratifs et professionnels préparant un examen ou une certification, même avec une connexion Internet faible, instable ou inexistante.

## Points forts techniques & pédagogiques

- **Approche 100 % Offline-First** :
  - Stockage persistant dans **IndexedDB** (`reussite-offline-db`) avec repli automatique `localStorage`.
  - **Service Worker** (`public/sw.js`) et **Manifest PWA** (`public/manifest.webmanifest`) pour fonctionner sans connexion.
  - Gestion des 5 états de synchronisation (`Synchronisé`, `En attente de synchronisation`, `Téléchargement en cours`, `Mode hors ligne`, `Erreur de synchronisation`), simulateur hors ligne intégré et option **Wi-Fi uniquement**.
- **25 écrans complets et navigables** :
  1. Accueil
  2. Inscription & Connexion (hachage SHA-256 local + multi-profil appareil partagé)
  3. Choix de l’examen / concours (pays, niveau, matières)
  4. Configuration du niveau et des objectifs (date d’épreuve, temps quotidien, jours de repos, score cible)
  5. Tableau de bord pédagogique
  6. Bibliothèque de contenus
  7. Détail d’une matière
  8. Liste des chapitres
  9. Banque d’annales et de sujets (filtres multi-critères, recherche, favoris, reprise, partage)
  10. Téléchargement hors ligne (packs par matière, annales, fiches, cours, zéro doublon)
  11. Lecteur de cours hors ligne (schémas SVG, audio Web Speech API, surlignage, notes, synthèse IA responsable)
  12. Fiches synthétiques en **6 formats** (Détaillée, Express 60s, Tableau, Cartes mémoire, Imprimable/PDF, Audio)
  13. Flashcards avec **répétition espacée SM-2** hors ligne (4 niveaux de maîtrise)
  14. Session d’entraînement (Révision rapide, Entraînement libre, Défi quotidien)
  15. Examen blanc chronométré (compte à rebours/progressif, alertes mi-parcours & 10/5/1 min, focus lock, navigation contrôlée)
  16. Correction détaillée (analytique de temps, étapes officielles, fiche liée, questions similaires, assistant IA responsable)
  17. Révision des erreurs
  18. Programme de révision personnalisé et adaptatif (déplacement de sessions, durées, jours de repos, objectifs personnels, rappels locaux)
  19. Statistiques de progression (graphiques SVG légers, chapitres maîtrisés/faibles, historique)
  20. Favoris
  21. Notes personnelles & surlignages
  22. Gestion du stockage sur l’appareil
  23. Centre de synchronisation
  24. Espace Enseignant (création QCM/fiches, import, checklist qualité anti-doublon/erreurs avant publication hors ligne, stats anonymisées)
  25. Paramètres de confidentialité, sécurité & accessibilité (mode sombre, contraste élevé, taille de police, économie batterie, export JSON, suppression du compte)

## Démarrage rapide

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
npm run preview
```

## Catalogue — extensions v19.0 à v24.0 (10 nouvelles matières + 50 chapitres par matière) et v22.0 (6 parcours, 24 annales, Coach enrichi)

- **+6 250 chapitres** : **117 matières** au total, dont **10 nouvelles matières** créées en v24.0 (80 chapitres chacune) et **50 chapitres supplémentaires** dans chacune des 107 matières historiques (quatre vagues de 10 en v19.0 à v23.0 + 10 en v24.0), soit **17 670 chapitres** (11 420 en v18.0).
- **Chaque nouveau chapitre est complet** : cours en 4 sections, fiche synthétique, QCM corrigé à 4 options, flashcards et rattachement aux annales — soit **17 670 cours, 17 670 fiches, 17 815 QCM, 16 745 flashcards et 2 722 annales**.
- **Nouvelles matières v24.0** : Éducation financière & budget personnel ; Entrepreneuriat & création d’entreprise ; Sciences forensiques & criminalistique ; Médiation & résolution des conflits ; Langues nationales & patrimoine oral ; Éducation inclusive & langue des signes ; Intelligence artificielle, éthique & société ; Climat & adaptation des territoires ; Économie circulaire & gestion des ressources ; Gérontologie & accompagnement du grand âge — chacune rattachée à des examens et concours réels et à ses niveaux d’enseignement.
- **Vague v19.0 — approfondissement** : diagnostic, fondements, cadre normatif, méthode experte, exercice guidé, étude de cas, pièges, fiche mémo, entraînement chronométré, synthèse transversale.
- **Vague v20.0 — consolidation** : prérequis croisés, modélisation, boîte à outils, atelier pratique, protocole, cas de terrain, remédiation, mémo express, concours blanc, ouverture.
- **Vague v21.0 — professionnalisation** : mise en situation, concepts clés, démonstration, application immédiate, atelier corrigé, contexte professionnel et normes, auto-évaluation, consolidation, épreuve type et barème, bilan et transfert.
- **Modules rédigés matière par matière** dans `src/data/extensionV19/`, `extensionV20/`, `extensionV21/`, `extensionV23/` et `extensionV24/` : un thème différent par vague (ex. maths : optimisation → équations différentielles → géométrie vectorielle de l’espace → modélisation mathématique).
- **Vague v23.0 — ouverture & transfert** : rappels express, carte mentale, vocabulaire et unités, règle d’or, exemple commenté, erreurs et parades, exercices progressifs, cas de terrain, synthèse en une page, défi final.
- **Vague v24.0 — nouvelles matières** : diagnostic de départ, objectifs et contrat d’apprentissage, méthode guidée, exemple résolu, atelier pratique, erreurs et remédiation, évaluation formative, projet de terrain, présentation orale, portfolio.
- **Vague v24.0 — consolidation (toutes matières)** : leçon essentielle, démonstration guidée, entraînement guidé, exercices autonomes, remédiation ciblée, étude de cas complète, défi chronométré, fiche mémo durable, transfert, bilan de consolidation.
- **Numérotation continue** : 90 chapitres pour les nouvelles matières, 150 à 210 pour les matières historiques ; les descriptions affichent leur volume réel.
- **Nouveautés v22.0 — 6 parcours d’examen inédits** : Eaux, Forêts, Climat & Environnement ; Statistique publique, Démographie & Prévision ; Transports, Logistique & Commerce International ; Hôtellerie, Restauration & Tourisme Durable ; Cybersécurité Industrielle & Systèmes OT ; Éducation Physique, Sport & Santé — soit **77 examens & concours** au total, chacun rattaché à 6 matières existantes (aucune matière créée).
- **24 annales v22.0** (6 parcours × 4 sessions 2023-2026) assemblées à partir des questions du catalogue, avec durées, barèmes, consignes et format d’épreuve propres — **2 020 annales** au total.
- **Aucune ressource externe** : packs embarqués (chunks `data-x19`, `data-x20`, `data-x21`, `data-x22`, `data-x23`, `data-x24`) et cache PWA `secure-v22`.

## Coach IA — base de connaissances hors ligne (v18.0)

Le coach pédagogique s’appuie sur une base de connaissances embarquée, sans aucun appel réseau :

- **192 notions** structurées (définition, formule, 3 à 4 points clés, exemple, piège classique, astuce mémoire) couvrant 16 domaines et 31 matières, du collège au supérieur (40 notions ajoutées en v22.0 : dérivées partielles, cycle de Krebs, cogito, traite atlantique, ISO 9001, SQ3R…).
- **20 méthodes d’épreuve et routines de travail** (dissertation, commentaire composé, étude de document, résolution de problème, QCM, oral, plan à 7 jours, veille d’examen, flashcards, relecture, préparation orale express, gestion du trac, plan final J-7, auto-correction de copie, routine de la veille…).
- **Moteur de recherche local** (`src/lib/coachEngine.ts`) : insensible aux accents et à la casse, tolérant aux pluriels, enrichi de 821 synonymes, détection d’intention (définition, formule, exemple, piège, méthode, quiz, plan, orientation, motivation) et prise en compte du niveau et de la filière de l’élève.
- **Personnalisation** : notions à consolider issues des erreurs et du test de positionnement, compte à rebours avant l’épreuve, suggestions contextuelles, quiz et mini-sessions ciblés sur une notion.
- **Transparence** : chaque réponse affiche son niveau de fiabilité et renvoie vers la fiche ou le cours associé ; les contenus restent des compléments pédagogiques et ne remplacent jamais la correction officielle.

Fichiers : `src/data/coachKnowledge/` (données) et `src/lib/coachEngine.ts` (moteur).

> **v18.0.1** : 3 notions d’orientation ajoutées (admission post-bac, métiers & secteurs, alternance) et tous les libellés de volume dérivés de `COACH_KNOWLEDGE_STATS`.
> **v18.0.2** : les compteurs de l’accueil et de l’inscription affichent les volumes réels du catalogue (11 420 chapitres, 11 420 cours & fiches) au lieu de l’estimation « 107 × 100 ».
> **v19.0** : 1 070 nouveaux chapitres d’approfondissement (10 par matière sur les 107), soit 12 490 chapitres / cours / fiches au total ; cache PWA `secure-v17`.
> **v20.0** : deuxième vague de 1 070 chapitres (10 par matière), soit **13 560 chapitres / cours / fiches**, 13 705 QCM, 12 635 flashcards et 1 675 annales ; cache PWA `secure-v18`.
> **v21.0** : troisième vague de 1 070 chapitres (10 par matière), soit **14 630 chapitres / cours / fiches**, 14 775 QCM, 13 705 flashcards et 1 996 annales ; cache PWA `secure-v19`.
> **v22.0** : 6 nouveaux parcours d’examen (77 au total), **24 annales inédites** et Coach IA porté à **192 notions / 20 méthodes** (821 synonymes) ; volumes de chapitres inchangés, cache PWA `secure-v20`.
> **v23.0** : quatrième vague de **1 070 chapitres** (10 par matière), soit **15 700 chapitres / cours / fiches**, 15 845 QCM, 2 341 annales et 14 775 flashcards ; cache PWA `secure-v21`.
> **v24.0** : **10 nouvelles matières** (80 chapitres chacune) et **1 170 chapitres de consolidation** (10 par matière sur 117), soit **17 670 chapitres / cours / fiches**, 17 815 QCM, 2 722 annales et 16 745 flashcards ; cache PWA `secure-v22`.
