import { CoachNotion } from './types';

/**
 * v18.0 — Notions de méthodologie, d’organisation et d’orientation.
 * C’est la partie « coach » du coach : comment apprendre, mémoriser et choisir.
 */
export const COACH_NOTIONS_METHODE: CoachNotion[] = [
  {
    id: 'courbe-oubli',
    term: 'Courbe de l’oubli',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['courbe de l oubli', 'ebbinghaus', 'oubli', 'memoire a long terme'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale', 'l1'],
    definition:
      'Hermann Ebbinghaus a montré que l’on oublie environ 50 % d’une information nouvelle en 24 heures et près de 80 % en une semaine si on ne la révise pas. Chaque réactivation ralentit la chute.',
    formula: 'révision à J+1, J+3, J+7, J+21 → rétention durable',
    keys: [
      'L’oubli est massif juste après l’apprentissage : la première révision doit être rapide.',
      'Chaque rappel actif aplatit la courbe.',
      'Réviser en se testant est plus efficace que relire.',
    ],
    example:
      'Un chapitre lu lundi est retenu à environ 50 % mardi ; une révision active mardi puis vendredi le stabilise.',
    pitfall:
      'Tout réviser la veille (le cerveau n’a pas le temps de consolider) et relire passivement en croyant mémoriser.',
    mnemonic: '« 1 jour, 3 jours, 7 jours, 21 jours » : les quatre rendez-vous de la mémoire.',
    related: ['repetition-espacee', 'feynman'],
  },
  {
    id: 'repetition-espacee',
    term: 'Répétition espacée',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['repetition espacee', 'espacement', 'sm2', 'flashcards', 'réviser regulierement'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    definition:
      'La répétition espacée consiste à répartir les révisions dans le temps, à intervalles croissants, plutôt qu’à les masser. L’effort de rappel juste avant l’oubli est le plus efficace.',
    formula: 'intervalles croissants : 1 j → 3 j → 7 j → 16 j → 35 j',
    keys: [
      'Cinq séances courtes espacées valent mieux qu’une séance longue.',
      'Une carte réussie revient plus tard ; une carte ratée revient le lendemain.',
      'La difficulté du rappel est le signal d’un apprentissage actif.',
    ],
    example:
      'Un jeu de 30 flashcards travaillé 10 min par jour pendant cinq jours est mieux retenu qu’en 50 min d’affilée.',
    pitfall:
      'Espacer trop (tout oublier entre deux séances) ou réviser uniquement ce qui est déjà su.',
    related: ['courbe-oubli', 'feynman', 'pomodoro'],
  },
  {
    id: 'feynman',
    term: 'Technique Feynman',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['feynman', 'expliquer simplement', 'methode feynman', 'auto explication'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    definition:
      'La technique Feynman consiste à expliquer une notion avec des mots simples, comme à un enfant, pour révéler les zones floues de sa compréhension, puis à combler ces lacunes.',
    keys: [
      '1) Choisir la notion. 2) L’expliquer sans notes. 3) Repérer les blocages. 4) Simplifier et reformuler.',
      'Si l’explication devient confuse, la compréhension est incomplète.',
      'Utiliser un exemple concret et une analogie pour ancrer.',
    ],
    example:
      'Expliquer le théorème de Pythagore avec une échelle appuyée contre un mur révèle vite si l’on confond hypoténuse et côté de l’angle droit.',
    pitfall:
      'Réciter une définition apprise par cœur sans reformuler : c’est de la reconnaissance, pas de la compréhension.',
    related: ['repetition-espacee', 'courbe-oubli'],
  },
  {
    id: 'pomodoro',
    term: 'Pomodoro et concentration',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['pomodoro', 'concentration', '25 minutes', 'pause', 'travail fractionne'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale', 'l1'],
    definition:
      'La méthode Pomodoro alterne des périodes de travail focalisé de 25 minutes et des pauses de 5 minutes, avec une pause longue toutes les quatre séances.',
    formula: '25 min de travail + 5 min de pause × 4 → pause longue de 15-20 min',
    keys: [
      'Une seule tâche par pomodoro, sans téléphone.',
      'Noter les interruptions sur une feuille pour les traiter après.',
      'Adapter la durée (20 à 45 min) à son attention réelle.',
    ],
    example:
      'Deux heures de révision deviennent quatre pomodoros de 25 min avec trois pauses courtes et une pause longue.',
    pitfall:
      'Enchaîner les pomodoros sans pause et utiliser le téléphone pendant les pauses (fatigue décisionnelle).',
    related: ['repetition-espacee', 'sommeil-memoire'],
  },
  {
    id: 'prise-notes-cornell',
    term: 'Prise de notes Cornell',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['cornell', 'prise de notes', 'fiche de revision', 'notes structurees'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    definition:
      'La méthode Cornell divise la page en trois zones : une colonne d’indices/questions, une zone de notes pendant le cours et un résumé en bas de page.',
    keys: [
      'La colonne de gauche sert à se tester : questions plutôt que mots isolés.',
      'Le résumé du bas oblige à synthétiser en 3-4 phrases.',
      'Les notes doivent être relues et complétées dans les 24 h.',
    ],
    example:
      'Sur une page consacrée aux suites, la colonne de gauche porte « Quelle est la formule de uₙ ? » et le résumé « arithmétique = + r, géométrique = × q ».',
    pitfall:
      'Recopier le cours mot à mot sans structurer ni synthétiser, et ne jamais relire les notes.',
    related: ['feynman', 'repetition-espacee'],
  },
  {
    id: 'sommeil-memoire',
    term: 'Sommeil et mémorisation',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['sommeil', 'memorisation', 'consolidation', 'fatigue', 'nuit'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    definition:
      'Le sommeil consolide les apprentissages : les phases de sommeil profond et paradoxal transfèrent les informations de la mémoire à court terme vers la mémoire à long terme.',
    formula: '7 à 9 heures par nuit pour un adolescent ; régularité > quantité ponctuelle',
    keys: [
      'Réviser juste avant de dormir favorise la consolidation.',
      'La privation de sommeil dégrade l’attention et la récupération en mémoire.',
      'Les écrans avant le coucher retardent l’endormissement.',
    ],
    example:
      'Un élève qui révise 20 min puis dort 8 h retient mieux qu’un élève qui révise 2 h jusqu’à 2 h du matin.',
    pitfall:
      'Sacrifier le sommeil pour réviser davantage : le gain de révision est annulé par la perte de consolidation.',
    related: ['pomodoro', 'stress-examen'],
  },
  {
    id: 'stress-examen',
    term: 'Gestion du stress d’examen',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['stress', 'anxiete', 'trac', 'respiration', 'gestion des emotions'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    definition:
      'Le stress est une réaction normale face à un enjeu. Un niveau modéré améliore la performance ; un stress excessif la dégrade. La respiration et la préparation le régulent.',
    formula: 'respiration 4-6 : inspirer 4 s, expirer 6 s, pendant 2 minutes',
    keys: [
      'Reconnaître les signes : cœur rapide, mains moites, pensées négatives.',
      'La respiration lente active le système parasympathique.',
      'Se préparer sur des conditions réelles réduit l’incertitude, donc l’anxiété.',
    ],
    example:
      'Avant une épreuve, trois cycles de respiration 4-6 et une relecture du plan calment la physiologie en deux minutes.',
    pitfall:
      'Vouloir supprimer totalement le stress et ressasser une erreur passée au lieu de revenir à la tâche présente.',
    mnemonic: '« Nommer, respirer, agir » : trois étapes en cas de panique.',
    related: ['sommeil-memoire', 'gestion-temps-epreuve'],
  },
  {
    id: 'gestion-temps-epreuve',
    term: 'Gestion du temps d’épreuve',
    subjectId: 'preparation_bac',
    domain: 'methodologie',
    aliases: ['gestion du temps', 'temps d epreuve', 'planning d epreuve', 'repartition'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'Répartir le temps d’une épreuve consiste à fixer un budget par partie, en réservant 10 % pour la relecture, et à le respecter même si une question résiste.',
    formula: 'temps par question ≈ durée totale × (points de la question / total des points)',
    keys: [
      'Lire l’énoncé entier 3 minutes avant de commencer.',
      'Commencer par les questions maîtrisées pour sécuriser les points.',
      'Garder 10 % du temps pour la relecture.',
    ],
    example:
      'Sur une épreuve de 3 h notée sur 20, une question sur 4 points mérite environ 30 minutes, relecture incluse.',
    pitfall:
      'S’acharner sur une question difficile et terminer sans avoir traité les questions faciles.',
    related: ['stress-examen', 'strategie-qcm'],
  },
  {
    id: 'brouillon',
    term: 'Brouillon efficace',
    subjectId: 'methodes_travail',
    domain: 'methodologie',
    aliases: ['brouillon', 'plan au brouillon', 'organisation copie', 'redaction'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale', 'l1'],
    definition:
      'Le brouillon sert à structurer avant de rédiger : plan, calculs, arguments, citations. Il doit rester lisible et organisé par zones pour être réutilisé.',
    keys: [
      'Séparer une zone « plan », une zone « calculs » et une zone « vérifications ».',
      'Écrire les formules et données avant de calculer.',
      'Ne pas recopier le brouillon intégralement : rédiger directement au propre après validation.',
    ],
    example:
      'Pour une dissertation, le brouillon contient la problématique, deux ou trois axes et les exemples associés avant toute rédaction.',
    pitfall:
      'Rédiger directement au propre sans plan et surcharger le brouillon de ratures illisibles.',
    related: ['gestion-temps-epreuve', 'dissertation'],
  },
  {
    id: 'orientation-post-bac',
    term: 'Orientation post-bac',
    subjectId: 'methodes_travail',
    domain: 'orientation',
    aliases: ['orientation', 'apres le bac', 'choix de filiere', 'parcours', 'metier'],
    classLevels: ['1ere', 'terminale', 'l1'],
    definition:
      'L’orientation post-bac consiste à confronter ses intérêts, ses résultats et les exigences des formations pour construire un projet réaliste et progressif, avec des vœux de sécurité.',
    formula: 'projet = intérêts + résultats + débouchés + contraintes (finances, mobilité)',
    keys: [
      'Se renseigner tôt sur les prérequis et les procédures d’admission.',
      'Prévoir des vœux ambitieux, réalistes et de secours.',
      'Tester son intérêt par des immersions, lectures ou échanges avec des professionnels.',
    ],
    example:
      'Un élève attiré par la santé vérifie les attendus en biologie et prévoit une licence scientifique en vœu de sécurité.',
    pitfall:
      'Choisir une filière uniquement par prestige ou par influence familiale, sans vérifier les prérequis.',
    related: ['feynman', 'stress-examen'],
  },
];
