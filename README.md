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
