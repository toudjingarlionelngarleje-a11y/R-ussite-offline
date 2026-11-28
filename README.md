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

## Catalogue — extensions v19.0 à v31.0 (43 nouvelles matières illustrées + 120 chapitres par matière), v28.0 (un schéma par chapitre) et v22.0 (6 parcours, 24 annales, Coach enrichi)

- **+18 880 chapitres** : **150 matières** au total, dont **43 nouvelles matières** créées en v24.0 (10), v25.0 (8), v26.0 (8), v27.0 (8) et v31.0 (9), chacune avec 120 chapitres dédiés, et **130 chapitres supplémentaires** dans chacune des 107 matières historiques (treize vagues de 10 en v19.0 à v31.0), soit **30 300 chapitres** (11 420 en v18.0).
- **Chaque nouveau chapitre est complet** : cours en 4 sections, fiche synthétique, QCM corrigé à 4 options, flashcards et rattachement aux annales — soit **30 300 cours, 30 300 fiches, 30 445 QCM, 29 375 flashcards et 4 918 annales**.
- **Nouvelles matières v31.0** : Imagerie médicale & radiologie ; Optique professionnelle & optométrie ; Appareillage orthopédique & prothèses ; Pharmacie d’officine & galénique ; Mode, couture & stylisme ; Arts culinaires & cuisine professionnelle ; Machinisme agricole & motoculture ; Industries graphiques & imprimerie ; Bureautique, secrétariat & assistance de direction — chacune rattachée à des examens réels et à ses niveaux.
- **Nouvelles matières v27.0** : Coiffure & barbier professionnel ; Plomberie, sanitaires & réseaux ; Maintenance automobile & diagnostic ; Soudage & chaudronnerie ; Apiculture & produits de la ruche ; Viticulture & œnologie ; Gemmologie & joaillerie ; Protocole & cérémonial diplomatique — chacune rattachée à des examens réels et à ses niveaux.
- **Nouvelles matières v26.0** : Droit notarial & actes authentiques ; Kinésithérapie & rééducation fonctionnelle ; Gestion immobilière & transaction ; Blockchain & actifs numériques ; Orthophonie & troubles du langage ; Horticulture & aménagement paysager ; Menuiserie, ébénisterie & agencement ; Conception de jeux vidéo & e-sport — chacune rattachée à des examens réels et à ses niveaux.
- **Nouvelles matières v25.0** : Bibliothéconomie & sciences de l’information ; Démographie & études de population ; Économie de la santé & systèmes de soins ; Esthétique & cosmétologie ; Sécurité privée & sûreté des sites ; Mobilité urbaine & transports publics ; Français langue étrangère & didactique ; Traduction & interprétation professionnelles — chacune rattachée à des examens réels et à ses niveaux.
- **Nouvelles matières v24.0** : Éducation financière & budget personnel ; Entrepreneuriat & création d’entreprise ; Sciences forensiques & criminalistique ; Médiation & résolution des conflits ; Langues nationales & patrimoine oral ; Éducation inclusive & langue des signes ; Intelligence artificielle, éthique & société ; Climat & adaptation des territoires ; Économie circulaire & gestion des ressources ; Gérontologie & accompagnement du grand âge — chacune rattachée à des examens et concours réels et à ses niveaux d’enseignement.
- **Vague v19.0 — approfondissement** : diagnostic, fondements, cadre normatif, méthode experte, exercice guidé, étude de cas, pièges, fiche mémo, entraînement chronométré, synthèse transversale.
- **Vague v20.0 — consolidation** : prérequis croisés, modélisation, boîte à outils, atelier pratique, protocole, cas de terrain, remédiation, mémo express, concours blanc, ouverture.
- **Vague v21.0 — professionnalisation** : mise en situation, concepts clés, démonstration, application immédiate, atelier corrigé, contexte professionnel et normes, auto-évaluation, consolidation, épreuve type et barème, bilan et transfert.
- **Modules rédigés matière par matière** dans `src/data/extensionV19/` à `extensionV27/` : un thème différent par vague (ex. maths : optimisation → équations différentielles → géométrie vectorielle → modélisation → démonstrations → suites → analyse numérique).
- **Vague v23.0 — ouverture & transfert** : rappels express, carte mentale, vocabulaire et unités, règle d’or, exemple commenté, erreurs et parades, exercices progressifs, cas de terrain, synthèse en une page, défi final.
- **Vague v24.0 — nouvelles matières** : diagnostic de départ, objectifs et contrat d’apprentissage, méthode guidée, exemple résolu, atelier pratique, erreurs et remédiation, évaluation formative, projet de terrain, présentation orale, portfolio.
- **Vague v24.0 — consolidation (toutes matières)** : leçon essentielle, démonstration guidée, entraînement guidé, exercices autonomes, remédiation ciblée, étude de cas complète, défi chronométré, fiche mémo durable, transfert, bilan de consolidation.
- **Vague v25.0 — nouvelles matières illustrées** : ouverture et situation déclencheuse, repères clés, méthode pas à pas, exemple guidé, atelier illustré, obstacles et remédiation, quiz formatif, cas réel documenté, exposé structuré, ancrage personnel.
- **Vague v25.0 — approfondissement (toutes matières)** : flash notion, schéma clé illustré, application directe, série graduée, erreur type, cas complet, épreuve chronométrée, mémo actif, transposition, vérification finale.
- **Vague v26.0 — nouvelles matières illustrées** : déclencheur et situation problème, boîte à notions, protocole de travail, démonstration raisonnée, atelier pratique, points de vigilance, test éclair, dossier de terrain, soutenance orale, capitalisation personnelle.
- **Vague v26.0 — approfondissement (toutes matières)** : l’essentiel en 5 minutes, carte-schéma, le bon réflexe, batterie d’entraînement, erreur fréquente et parade, mission complète, contre-la-montre, fiche active, transfert à un autre contexte, auto-contrôle final.
- **Vague v27.0 — nouvelles matières illustrées** : observation guidée du réel, lexique du métier, gestes de base, modèle commenté, chantier école, sécurité et prévention, vérification rapide, dossier client, présentation du livrable, plan de progression.
- **Vague v27.0 — approfondissement (toutes matières)** : idée clé, schéma muet à compléter, automatisme, entraînement ciblé, piège classique, mission longue, chrono examen, fiche express, cas voisin, bilan de maîtrise.
- **Illustrations SVG v27.0** : 8 nouveaux schémas vectoriels 100 % hors ligne (structure du cheveu, réseau de plomberie, démarche de diagnostic automobile, assemblage soudé, ruche et cadres, vinification, taille en brillant, ordre protocolaire), soit **36 illustrations** au total (acte authentique, progression de rééducation, cycle d’une transaction immobilière, chaîne de blocs, appareil phonatoire, plan paysager, assemblages bois, boucle de gameplay), en plus des 20 illustrations v25.0 (budget, business model canvas, scène forensique, transmission orale, réseau de neurones, roue de l’autonomie, pyramide des âges, financement de la santé, couches de la peau, périmètres de sûreté, chaîne de déplacement, quadrant des compétences, cycle de traduction, plan de classification, triangle de médiation, boucle circulaire, chaîne du risque climatique, accessibilité universelle, cercle chromatique, planning d’organisation). Chaque nouveau chapitre et chaque flashcard de la vague s’ouvre sur son illustration, et les 141 matières disposent désormais d’une galerie de schémas (aucune ressource distante, aucune image téléchargée).
- **v31.0 — neuf nouvelles matières professionnelles** : 120 chapitres chacune, soit **1 080 chapitres** — 8 modules × 10 étapes de professionnalisation (découverte du métier, terminologie, matériel et sécurité, geste technique guidé, protocole du métier, cas client commenté, contrôle qualité, économie de l’activité, cadre réglementaire, progression dans le métier) puis 20 chapitres d’approfondissement v29.0 et 20 chapitres de méthode v30.0. Chaque chapitre reste complet (cours en 4 sections, fiche, QCM corrigé, flashcards) et illustré ; **9 nouvelles galeries de schémas** sont rattachées aux matières créées. Le catalogue atteint **150 matières**, **30 300 chapitres**, **30 445 QCM**, **29 375 flashcards** et **4 918 annales**.
- **v30.0 — 2 820 chapitres de méthode et de pratique** : deux modules inédits par matière (282 au total) déclinés en 10 étapes concrètes — exemple vécu, mini-projet, étude de document, analyse d’erreur, débat argumenté, défi chronométré, fiche de révision, question orale, schéma bilan, grille de réussite. Le catalogue atteint **29 220 chapitres**, **29 365 QCM**, **28 295 flashcards** et **4 837 annales**.
- **v29.0 — deux modules inédits dans chaque matière** : **282 modules** (2 par matière) déclinés en 10 étapes nouvelles — fiche méthode, carte mentale, exercice corrigé, question de cours, contresens à éviter, mots-clés, lien avec le programme, sujet type, prise de parole, auto-correction — soit **2 820 chapitres supplémentaires**, chacun avec cours en 4 sections, fiche, QCM corrigé, flashcards et illustration. Le catalogue passe à **26 400 chapitres** et **26 545 QCM**.
- **v28.0 — un schéma pratique pour chaque chapitre** : les **29 220 cours** et les **28 295 flashcards** s’ouvrent désormais sur une illustration SVG choisie dans la galerie de la matière (sélection déterministe par empreinte du chapitre, donc stable d’une session à l’autre). Six **illustrations pratiques transversales** ont été ajoutées — démarche en 4 temps, diagramme causes → effets, frise chronologique, comparaison sur critères, carte de notions, liste de vérification avant remise — et chaque matière dispose d’**au moins 3 illustrations distinctes** (galeries mesurées : 134 matières à 3, 4 à 4, 2 à 5, 1 à 6). Le catalogue compte plus de **80 schémas** mobilisables, tous dessinés en SVG embarqué.
- **Numérotation continue** : 120 chapitres pour les nouvelles matières v31.0, 130 pour celles de v27.0 (140 pour celles de v26.0, 150 pour celles de v25.0, 160 pour celles de v24.0), 220 à 280 pour les matières historiques ; le volume annoncé dans chaque description est recalculé depuis les données réelles à chaque vague.
- **Nouveautés v22.0 — 6 parcours d’examen inédits** : Eaux, Forêts, Climat & Environnement ; Statistique publique, Démographie & Prévision ; Transports, Logistique & Commerce International ; Hôtellerie, Restauration & Tourisme Durable ; Cybersécurité Industrielle & Systèmes OT ; Éducation Physique, Sport & Santé — soit **77 examens & concours** au total, chacun rattaché à 6 matières existantes (aucune matière créée).
- **24 annales v22.0** (6 parcours × 4 sessions 2023-2026) assemblées à partir des questions du catalogue, avec durées, barèmes, consignes et format d’épreuve propres — **2 020 annales** au total.
- **Aucune ressource externe** : packs embarqués (chunks `data-x19` à `data-x27`, `data-x29`, `data-x30` et `data-x31`) et cache PWA `secure-v29`.

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
> **v25.0** : **8 nouvelles matières illustrées** (80 chapitres chacune), **1 250 chapitres d’approfondissement** (10 par matière sur 125) et **20 illustrations SVG** intégrées aux cours et flashcards, soit **19 560 chapitres / cours / fiches**, 19 705 QCM, 3 121 annales et 18 635 flashcards ; cache PWA `secure-v23`.
> **v26.0** : **8 nouvelles matières professionnelles illustrées** (80 chapitres chacune), **1 330 chapitres d’approfondissement** (10 par matière sur 133) et **8 nouvelles illustrations SVG**, soit **21 530 chapitres / cours / fiches**, 21 675 QCM, 3 544 annales et 20 605 flashcards ; cache PWA `secure-v24`.
> **v27.0** : **8 nouvelles matières de métiers et de protocole** (80 chapitres chacune), **1 410 chapitres d’approfondissement** (10 par matière sur 141) et **8 nouvelles illustrations SVG**, soit **23 580 chapitres / cours / fiches**, 23 725 QCM, 3 991 annales et 22 655 flashcards ; cache PWA `secure-v25`.
> **v31.0** : **9 nouvelles matières professionnelles** (120 chapitres chacune, 9 nouvelles galeries de schémas), soit **150 matières** et **30 300 chapitres / cours / fiches**, 30 445 QCM, 4 918 annales et 29 375 flashcards ; cache PWA `secure-v29`.
> **v30.0** : **2 820 chapitres de méthode et de pratique** (2 modules × 10 étapes dans les 141 matières), soit **29 220 chapitres / cours / fiches**, 29 365 QCM, 4 837 annales et 28 295 flashcards ; cache PWA `secure-v28`.
> **v29.0** : **2 820 nouveaux chapitres** (2 modules × 10 étapes dans chacune des 141 matières), soit **26 400 chapitres / cours / fiches**, 26 545 QCM, 4 414 annales et 25 475 flashcards ; cache PWA `secure-v27`.
> **v28.0** : **chaque chapitre illustré** — 23 580 cours et 22 655 flashcards ouverts sur un schéma SVG, **6 illustrations pratiques transversales** inédites et **au moins 3 illustrations par matière** ; volumes de données inchangés (141 matières, 23 580 chapitres / cours / fiches, 23 725 QCM, 3 991 annales, 22 655 flashcards) ; cache PWA `secure-v26`.
