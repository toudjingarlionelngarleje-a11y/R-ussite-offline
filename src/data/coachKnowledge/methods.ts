import { CoachMethod } from './types';

/**
 * v18.0 — Méthodes d’épreuve et routines de travail.
 * Le coach les propose quand l’élève demande « comment faire » plutôt que « qu’est-ce que ».
 */
export const COACH_METHODS: CoachMethod[] = [
  {
    id: 'dissertation',
    title: 'Méthode de la dissertation',
    kind: 'epreuve',
    aliases: ['dissertation', 'disserte', 'sujet de reflexion', 'plan dialectique', 'problematique'],
    summary:
      'Construire une réponse argumentée à une question, avec une problématique claire et une progression logique en trois temps.',
    durationHint: '20 min de préparation, 2 h de rédaction (épreuve de 4 h)',
    steps: [
      'Analyser chaque mot du sujet et repérer la thèse qu’il présuppose.',
      'Formuler une problématique : la tension que le sujet met en jeu.',
      'Bâtir un plan (thèse / antithèse / dépassement, ou analytique en trois axes).',
      'Rédiger une introduction : accroche, définition des termes, problématique, annonce du plan.',
      'Développer chaque partie : idée directrice, argument, exemple précis, mini-conclusion.',
      'Conclure par une réponse nette à la problématique, sans introduire d’idée nouvelle.',
    ],
    errors: [
      'Réciter le cours sans répondre à la question posée.',
      'Des parties juxtaposées sans lien logique ni transitions.',
      'Des exemples vagues (« depuis toujours ») au lieu de références précises.',
    ],
    checklist: [
      'La problématique figure explicitement dans l’introduction.',
      'Chaque paragraphe contient une idée, un argument et un exemple.',
      'La conclusion répond à la question et non à une autre.',
    ],
  },
  {
    id: 'commentaire-compose',
    title: 'Méthode du commentaire composé',
    kind: 'epreuve',
    aliases: ['commentaire compose', 'commentaire de texte', 'analyse litteraire', 'axe de lecture'],
    summary:
      'Expliquer un texte littéraire en dégageant des axes de lecture appuyés sur des procédés précis et leurs effets.',
    durationHint: '30 min d’analyse, 1 h 30 de rédaction',
    steps: [
      'Lire deux fois le texte en notant les impressions et les procédés repérés.',
      'Repérer le genre, le registre, l’énonciation et la structure du passage.',
      'Regrouper les procédés en deux ou trois axes de lecture cohérents.',
      'Formuler une problématique liée à l’effet produit par le texte.',
      'Rédiger en citant précisément entre guillemets et en analysant chaque procédé.',
      'Relier chaque axe à l’interprétation d’ensemble.',
    ],
    errors: [
      'Faire un catalogue de figures de style sans interprétation.',
      'Paraphraser le texte au lieu de l’analyser.',
      'Oublier de citer entre guillemets avec la ligne ou la page.',
    ],
    checklist: [
      'Chaque citation est courte, exacte et suivie d’une analyse.',
      'Les axes répondent à une problématique annoncée.',
      'Le vocabulaire technique est employé à bon escient.',
    ],
  },
  {
    id: 'etude-de-document',
    title: 'Étude de document (histoire-géographie)',
    kind: 'epreuve',
    aliases: ['etude de document', 'analyse de document', 'source historique', 'critique du document'],
    summary:
      'Analyser un document en identifiant sa nature, son contexte, son auteur, son message et ses limites, puis le confronter à ses connaissances.',
    durationHint: '15 min d’analyse, 30 min de rédaction',
    steps: [
      'Présenter la nature, l’auteur, la date, la source et le destinataire.',
      'Dégager le thème et l’idée principale du document.',
      'Relever deux ou trois éléments précis (citation, chiffre, symbole) et les expliquer.',
      'Apporter des connaissances extérieures pour éclairer et nuancer.',
      'Évaluer la portée et les limites de la source (subjectivité, silence, contexte).',
    ],
    errors: [
      'Recopier le document sans l’expliquer.',
      'Oublier de présenter la source et le contexte.',
      'Prendre le document pour une vérité objective sans critique.',
    ],
    checklist: [
      'Nature, auteur, date et source sont identifiés.',
      'Chaque élément relevé est expliqué avec ses connaissances.',
      'Les limites du document sont discutées.',
    ],
  },
  {
    id: 'resolution-probleme-maths',
    title: 'Résolution d’un problème de mathématiques',
    kind: 'epreuve',
    aliases: ['probleme de maths', 'resolution', 'methode mathematiques', 'demarche'],
    summary:
      'Démarche en quatre temps : comprendre, modéliser, calculer, vérifier — en rédigeant les étapes qui rapportent des points.',
    durationHint: '5 min de lecture, calculs, 5 min de vérification',
    steps: [
      'Lister les données, l’inconnue et la question exacte.',
      'Traduire l’énoncé en équations, en fonction ou en probabilités.',
      'Résoudre en écrivant chaque étape et en justifiant les théorèmes utilisés.',
      'Vérifier l’homogénéité des unités et la vraisemblance du résultat.',
      'Conclure par une phrase réponse avec l’unité.',
    ],
    errors: [
      'Donner un résultat sans justification ni calcul intermédiaire.',
      'Oublier les unités ou confondre les échelles.',
      'Ne pas vérifier le résultat (racine négative, probabilité > 1).',
    ],
    checklist: [
      'Les données et l’inconnue sont explicitées.',
      'Chaque théorème utilisé est nommé.',
      'Le résultat est vérifié et conclu par une phrase.',
    ],
  },
  {
    id: 'exercice-physique-chimie',
    title: 'Exercice de physique-chimie',
    kind: 'epreuve',
    aliases: ['exercice de physique', 'exercice de chimie', 'protocole', 'calcul physique'],
    summary:
      'Méthode scientifique : schéma, données, loi, calcul littéral, application numérique, unité et critique du résultat.',
    durationHint: '8 min par question de calcul',
    steps: [
      'Faire un schéma avec les grandeurs et le sens du mouvement ou du courant.',
      'Lister les données avec leurs unités et convertir si nécessaire.',
      'Écrire la loi ou la relation du cours avant tout calcul.',
      'Faire le calcul littéral, puis l’application numérique.',
      'Donner le résultat avec unité et chiffres significatifs adaptés.',
      'Critiquer la vraisemblance (ordre de grandeur, sens physique).',
    ],
    errors: [
      'Mélanger les unités (cm/m, g/kg, min/s).',
      'Écrire directement le résultat numérique sans relation littérale.',
      'Donner un résultat sans unité ni critique.',
    ],
    checklist: [
      'Le schéma est présent et annoté.',
      'La relation littérale précède le calcul.',
      'L’unité et l’ordre de grandeur sont cohérents.',
    ],
  },
  {
    id: 'strategie-qcm',
    title: 'Stratégie QCM',
    kind: 'epreuve',
    aliases: ['qcm', 'choix multiple', 'strategie qcm', 'pieges qcm'],
    summary:
      'Maximiser ses points en QCM : lire toutes les propositions, éliminer, repérer les mots absolus et gérer le temps.',
    durationHint: '1 min par question, 10 % du temps en relecture',
    steps: [
      'Lire la question en entier et souligner le mot-clé (sauf, toujours, jamais).',
      'Éliminer d’abord les propositions manifestement fausses.',
      'Comparer les propositions restantes terme à terme.',
      'Se méfier des réponses absolues et des unités incohérentes.',
      'Cocher, puis revenir seulement si le temps le permet.',
    ],
    errors: [
      'Répondre au hasard sans éliminer.',
      'Se fier à la longueur ou à la forme de la réponse.',
      'Changer une réponse par stress sans raison mathématique.',
    ],
    checklist: [
      'Les mots absolus de l’énoncé sont repérés.',
      'Aucune question n’est laissée sans réponse.',
      'Le temps de relecture est respecté.',
    ],
  },
  {
    id: 'oral-examen',
    title: 'Préparer et réussir un oral',
    kind: 'epreuve',
    aliases: ['oral', 'expose', 'presentation', 'grand oral', 'soutenance'],
    summary:
      'Structurer une prise de parole courte, la répéter et gérer le trac pour convaincre un jury.',
    durationHint: '5 à 10 min d’exposé + 10 min d’entretien',
    steps: [
      'Construire un plan en trois temps : accroche, développement, conclusion.',
      'Écrire des notes-mots (pas un texte intégral) et des transitions.',
      'Préparer deux questions probables du jury et leurs réponses.',
      'Chronométrer deux répétitions, dont une devant un tiers.',
      'Soigner l’entrée, le regard et le débit (ni trop vite, ni trop lent).',
    ],
    errors: [
      'Lire ses notes mot à mot.',
      'Dépasser le temps imparti sans avoir traité l’essentiel.',
      'Ignorer les questions du jury ou se braquer.',
    ],
    checklist: [
      'Le plan tient sur une page de notes-mots.',
      'Le temps est respecté à 30 secondes près.',
      'Deux questions probables ont été préparées.',
    ],
  },
  {
    id: 'analyse-courbe-tableau',
    title: 'Lire une courbe ou un tableau',
    kind: 'epreuve',
    aliases: ['analyse de courbe', 'graphique', 'tableau de donnees', 'lire un graphique'],
    summary:
      'Décrire, interpréter et critiquer des données chiffrées sans se contenter de lire les valeurs.',
    durationHint: '5 à 8 min par document',
    steps: [
      'Identifier les axes, les unités, la source et la période.',
      'Décrire la tendance générale (hausse, baisse, stabilisation, rupture).',
      'Repérer les points remarquables (maximum, minimum, seuil).',
      'Proposer une explication causale en mobilisant le cours.',
      'Signaler les limites des données (échelle trompeuse, source partielle).',
    ],
    errors: [
      'Lire seulement la première et la dernière valeur.',
      'Confondre corrélation et causalité.',
      'Oublier les unités et l’échelle des axes.',
    ],
    checklist: [
      'Axes, unités et source sont cités.',
      'Une tendance générale est dégagée.',
      'Une explication et une limite sont proposées.',
    ],
  },
  {
    id: 'plan-revision-7-jours',
    title: 'Plan de révision à 7 jours',
    kind: 'organisation',
    aliases: ['plan de revision', 'reviser en 7 jours', 'programme', 'planning de revision', 'organiser mes revisions', 'semaine de revision', 'planning'],
    summary:
      'Organiser une semaine de révision efficace avec alternance des matières, rappels actifs et repos planifié.',
    durationHint: 'J-7 à J-1',
    steps: [
      'Lister les chapitres à revoir et les classer par priorité (coefficient, difficulté).',
      'Placer deux créneaux par jour : un de découverte/révision, un de rappel actif.',
      'Alterner les matières pour éviter la fatigue cognitive.',
      'Réserver J-2 et J-1 aux fiches, aux erreurs et aux sujets d’entraînement.',
      'Prévoir une demi-journée de repos complet avant l’épreuve.',
    ],
    errors: [
      'Planifier 10 h par jour sans pause ni sommeil.',
      'Réviser uniquement ce que l’on aime déjà.',
      'Découvrir de nouveaux chapitres à J-1.',
    ],
    checklist: [
      'Chaque jour a un objectif mesurable.',
      'Les erreurs passées figurent dans le planning.',
      'Le sommeil est préservé (7 à 9 h).',
    ],
  },
  {
    id: 'veille-examen',
    title: 'La veille de l’examen',
    kind: 'organisation',
    aliases: ['veille d examen', 'j-1', 'avant l epreuve', 'checklist examen'],
    summary:
      'Réduire l’incertitude matérielle et préserver l’énergie mentale pour le jour J.',
    durationHint: 'J-1, 1 h maximum',
    steps: [
      'Préparer la convocation, la pièce d’identité, les stylos, la calculatrice et l’eau.',
      'Relire uniquement les fiches synthétiques et la liste de ses erreurs.',
      'Repérer le trajet et l’heure de départ.',
      'Fixer une heure de coucher et couper les écrans 1 h avant.',
    ],
    errors: [
      'Réviser un chapitre entièrement nouveau la veille.',
      'Veiller tard pour « tout revoir ».',
      'Oublier la convocation ou le matériel obligatoire.',
    ],
    checklist: [
      'Le sac est prêt et vérifié.',
      'Le trajet et l’heure de réveil sont fixés.',
      'Le coucher est planifié avant 22 h 30.',
    ],
  },
  {
    id: 'fiche-revision',
    title: 'Créer une fiche de révision efficace',
    kind: 'revision',
    aliases: ['fiche de revision', 'faire une fiche', 'synthese', 'resume de cours'],
    summary:
      'Transformer un cours en fiche synthétique qui sert réellement à réviser : structurée, active et courte.',
    durationHint: '20 à 30 min par chapitre',
    steps: [
      'Dégager 3 à 5 idées essentielles du chapitre.',
      'Écrire les définitions, formules et dates avec leurs conditions d’application.',
      'Ajouter une colonne « pièges » issue des erreurs commises.',
      'Terminer par 3 questions auxquelles la fiche doit permettre de répondre.',
      'Relire et réduire la fiche de 20 % une semaine plus tard.',
    ],
    errors: [
      'Recopier le cours intégralement.',
      'Faire des fiches sans jamais les relire.',
      'Oublier les pièges et les conditions d’application.',
    ],
    checklist: [
      'La fiche tient sur une page.',
      'Elle contient définitions, formules et pièges.',
      'Trois questions de test y figurent.',
    ],
  },
  {
    id: 'revision-flashcards',
    title: 'Réviser avec des flashcards',
    kind: 'revision',
    aliases: ['flashcards', 'cartes de revision', 'recto verso', 'test actif', 'reviser', 'revision', 'comment reviser', 'memoriser'],
    summary:
      'Utiliser le rappel actif : une question courte au recto, une réponse vérifiable au verso, revue à intervalles croissants.',
    durationHint: '10 à 15 min par jour',
    steps: [
      'Écrire une seule question par carte, sans indice superflu.',
      'Répondre de mémoire avant de retourner la carte.',
      'Auto-évaluer honnêtement : su, hésité, raté.',
      'Renvoyer les cartes ratées au lendemain, les sues à une semaine.',
      'Reformuler les cartes trop faciles ou ambiguës.',
    ],
    errors: [
      'Mettre plusieurs questions sur une carte.',
      'Retourner la carte trop vite sans chercher.',
      'Tout réviser chaque jour au lieu d’espacer.',
    ],
    checklist: [
      'Une carte = une question.',
      'La réponse est vérifiable et sans ambiguïté.',
      'Les cartes ratées reviennent le lendemain.',
    ],
  },
  {
    id: 'calcul-mental',
    title: 'Calcul mental et estimation',
    kind: 'revision',
    aliases: ['calcul mental', 'astuce de calcul', 'estimation', 'ordre de grandeur'],
    summary:
      'Calculer vite et vérifier un ordre de grandeur pour éviter les erreurs de calcul et gagner du temps.',
    durationHint: '5 min par jour',
    steps: [
      'Décomposer : 47 × 6 = (40 × 6) + (7 × 6) = 240 + 42.',
      'Utiliser les carrés remarquables : (a + b)², (a − b)(a + b).',
      'Arrondir pour estimer, puis calculer exactement.',
      'Vérifier la vraisemblance avec un ordre de grandeur.',
    ],
    errors: [
      'Poser tous les calculs élémentaires au brouillon (perte de temps).',
      'Oublier de vérifier l’ordre de grandeur.',
      'Confondre signe et priorité des opérations.',
    ],
    checklist: [
      'Une estimation précède le calcul exact.',
      'Les priorités opératoires sont respectées.',
      'Le résultat est cohérent avec l’estimation.',
    ],
  },
  {
    id: 'relecture-copie',
    title: 'Relecture de copie',
    kind: 'epreuve',
    aliases: ['relecture', 'verifier sa copie', 'relire', 'fautes'],
    summary:
      'Contrôler méthodiquement sa copie en cinq passes pour récupérer des points sans tout relire au hasard.',
    durationHint: '10 % du temps total',
    steps: [
      'Vérifier que toutes les questions ont été traitées.',
      'Contrôler les unités, les signes et les calculs clés.',
      'Traquer les fautes d’accord et de conjugaison.',
      'Vérifier les transitions et la numérotation des parties.',
      'Corriger proprement, sans surcharger la copie.',
    ],
    errors: [
      'Relire uniquement le début de la copie.',
      'Négliger les unités et les signes.',
      'Raturer massivement et rendre une copie illisible.',
    ],
    checklist: [
      'Toutes les questions ont une réponse.',
      'Les unités et signes sont vérifiés.',
      'La copie est lisible et numérotée.',
    ],
  },
  {
    id: 'reponse-argumentee',
    title: 'Réponse argumentée à une question',
    kind: 'epreuve',
    aliases: ['question a developpement', 'reponse argumentee', 'paragraphe argumente', 'aei'],
    summary:
      'Répondre à une question ouverte en un ou plusieurs paragraphes structurés selon le schéma affirmation – explication – illustration.',
    durationHint: '10 à 15 min par question',
    steps: [
      'Repérer le verbe de consigne (analyser, expliquer, montrer, comparer).',
      'Formuler une réponse directe en première phrase.',
      'Développer une idée par paragraphe : affirmation, explication, exemple.',
      'Utiliser les connecteurs logiques pour enchaîner.',
      'Conclure par une phrase de synthèse qui répond à la consigne.',
    ],
    errors: [
      'Répondre par une liste de mots-clés.',
      'Oublier d’illustrer par un exemple ou un chiffre.',
      'Répondre à côté du verbe de consigne.',
    ],
    checklist: [
      'La première phrase répond directement.',
      'Chaque idée est expliquée et illustrée.',
      'Le verbe de consigne est respecté.',
    ],
  },
];
