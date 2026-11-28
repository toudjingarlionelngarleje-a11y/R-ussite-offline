import { ExtensionSubjectModules } from '../extensionV23/types';

/**
 * v30.0 — Deux modules « méthode et pratique » inédits par matière
 * (141 matières × 2 modules × 10 étapes), soit 2 820 nouveaux chapitres complets.
 */
export const X30_BOOST_MODULES: ExtensionSubjectModules = {
  maths: [
    ['x30-fonctions-derivation', 'Fonctions et dérivation', 'Limites, dérivée, variations, extremum', 'Le signe de la dérivée donne le sens de variation', 'Étudier une fonction sans tableau de signes', 'Optimisation d’une aire'],
    ['x30-matrices-determinants', 'Matrices et déterminants', 'Opérations, inverse, déterminant, systèmes', 'Un système admet une solution unique si le déterminant est non nul', 'Inverser une matrice sans vérifier le déterminant', 'Résolution d’un système 3 × 3'],
  ],
  physique: [
    ['x30-ondes-acoustique', 'Ondes et acoustique', 'Période, fréquence, longueur d’onde, intensité', 'La fréquence est conservée au changement de milieu, pas la vitesse', 'Confondre fréquence et longueur d’onde', 'Réglage d’une salle de classe'],
    ['x30-thermodynamique-chaleur', 'Thermodynamique et chaleur', 'Chaleur, travail, énergie interne, rendement', 'Le premier principe relie chaleur, travail et énergie interne', 'Compter la chaleur sans signe', 'Cycle d’un moteur thermique'],
  ],
  svt: [
    ['x30-reproduction-developpement', 'Reproduction sexuée et cycles de vie', 'Gamètes, fécondation, embryogenèse, hormones', 'Le développement dépend d’un programme génétique et hormonal', 'Confondre mitose et méiose', 'Cycle de reproduction d’un mammifère'],
    ['x30-systeme-endocrinien', 'Système endocrinien', 'Glandes, hormones, boucles de régulation, récepteurs', 'Une hormone agit à faible dose sur une cible spécifique', 'Croire qu’une hormone agit partout', 'Régulation de la glycémie'],
  ],
  philo: [
    ['x30-morale-devoir', 'Philosophie morale et devoir', 'Devoir, bonheur, vertu, impératif catégorique', 'Un devoir moral vaut indépendamment des conséquences', 'Confondre morale et coutume', 'Cas du mensonge utile'],
    ['x30-metaphysique-existence', 'Métaphysique et existence', 'Être, temps, liberté, contingence', 'Une question métaphysique porte sur les conditions de l’expérience', 'Répondre par une opinion personnelle', 'Le temps existe-t-il ?'],
  ],
  droit: [
    ['x30-droit-commercial', 'Droit commercial général', 'Commerçant, actes de commerce, registre, fonds de commerce', 'La qualité de commerçant s’acquiert par l’exercice habituel d’actes de commerce', 'Confondre artisan et commerçant', 'Immatriculation d’une boutique'],
    ['x30-droit-administratif-biens', 'Droit administratif des biens', 'Domaine public, occupation, travaux publics, expropriation', 'Le domaine public est inaliénable et imprescriptible', 'Vendre une parcelle du domaine public', 'Occupation d’un marché'],
  ],
  culture_gen: [
    ['x30-religions-croyances', 'Grandes religions et croyances', 'Textes fondateurs, rites, familles spirituelles', 'Un fait religieux s’étudie par ses textes et ses pratiques', 'Réduire une religion à un cliché', 'Exposé sur les fêtes'],
    ['x30-institutions-decentralisation', 'Institutions et décentralisation', 'Collectivités, compétences, budget local, tutelle', 'La décentralisation transfère des compétences, pas la souveraineté', 'Confondre déconcentration et décentralisation', 'Conseil régional'],
  ],
  economie: [
    ['x30-croissance-developpement', 'Croissance et développement', 'PIB, productivité, indicateurs sociaux, développement', 'La croissance mesure une production, pas le bien-être', 'Confondre croissance et développement', 'Comparaison de deux pays'],
    ['x30-marches-concurrence', 'Marchés et concurrence', 'Offre, demande, élasticité, monopole, régulation', 'La structure du marché détermine le pouvoir de fixation des prix', 'Analyser un monopole comme une concurrence pure', 'Marché du carburant'],
  ],
  gestion_projet: [
    ['x30-planification-ordonnancement', 'Planification et ordonnancement', 'WBS, Gantt, chemin critique, marges', 'Le chemin critique détermine la durée minimale du projet', 'Planifier sans identifier les dépendances', 'Chantier de rénovation'],
    ['x30-qualite-livraison', 'Qualité et livraison projet', 'Recette, critères d’acceptation, documentation, transfert', 'Une livraison se juge sur des critères acceptés à l’avance', 'Livrer sans procès-verbal de recette', 'Mise en service d’un logiciel'],
  ],
  cybersecurite: [
    ['x30-securite-reseaux', 'Sécurité des réseaux', 'Pare-feu, segmentation, IDS, VPN', 'La segmentation limite la propagation d’une attaque', 'Tout laisser sur un seul réseau plat', 'Réseau d’une PME'],
    ['x30-audit-conformite', 'Audit et conformité', 'Référentiel, contrôle, preuve, plan d’action', 'Un audit conclut sur des preuves, pas sur des déclarations', 'Auditer sans collecter de preuves', 'Audit RGPD'],
  ],
  francais: [
    ['x30-roman-recit', 'Roman et récit', 'Narrateur, focalisation, temps, personnage', 'Le point de vue du narrateur oriente toute la lecture', 'Confondre auteur et narrateur', 'Analyse d’un incipit'],
    ['x30-grammaire-syntaxe', 'Grammaire et syntaxe', 'Fonctions, propositions, concordance, ponctuation', 'La fonction d’un mot dépend de sa place dans la phrase', 'Analyser selon la nature et non la fonction', 'Correction d’une phrase complexe'],
  ],
  histoire_geo: [
    ['x30-guerres-memoires', 'Guerres mondiales et mémoires', 'Totalisation, génocide, résistance, mémoire', 'La mémoire d’une guerre est un objet d’histoire', 'Confondre histoire et commémoration', 'Étude d’un mémorial'],
    ['x30-ressources-territoires', 'Ressources et territoires', 'Ressources, rente, conflits, développement local', 'Une ressource ne crée de richesse que si elle est transformée localement', 'Confondre extraction et développement', 'Bassin minier'],
  ],
  anglais: [
    ['x30-reading-strategies', 'Reading comprehension strategies', 'Skimming, scanning, inference, vocabulary in context', 'Un mot inconnu se déduit souvent de son contexte', 'Traduire chaque mot isolément', 'Article de presse'],
    ['x30-listening-pronunciation', 'Listening and pronunciation', 'Stress, linking, minimal pairs, accents', 'L’accent tonique porte le sens du mot anglais', 'Prononcer chaque syllabe à égalité', 'Dialogue enregistré'],
  ],
  informatique: [
    ['x30-bases-donnees-sql', 'Bases de données et SQL', 'Tables, clés, jointures, requêtes, intégrité', 'Une jointure combine des tables par une clé commune', 'Joindre sans condition sur la clé', 'Requête de résultats'],
    ['x30-programmation-web', 'Programmation web', 'HTML, CSS, JavaScript, DOM, événements', 'Le DOM représente la page que le script peut modifier', 'Mélanger structure et style', 'Formulaire interactif'],
  ],
  comptabilite: [
    ['x30-comptabilite-analytique', 'Comptabilité analytique', 'Centres de coût, charges indirectes, coût de revient', 'Le coût de revient agrège charges directes et indirectes', 'Imputer les charges fixes au prorata des ventes', 'Coût d’un produit'],
    ['x30-gestion-tresorerie', 'Gestion de trésorerie', 'Encaissements, décaissements, plan de trésorerie, délais', 'Un bénéfice ne garantit pas la trésorerie', 'Confondre résultat et trésorerie', 'Échéancier de PME'],
  ],
  chimie_bio: [
    ['x30-chimie-solutions-ph', 'Chimie des solutions et pH', 'Acides, bases, pH, tampons, titrage', 'Le pH dépend de la concentration en ions oxonium', 'Utiliser un indicateur hors de sa zone de virage', 'Titrage d’un vinaigre'],
    ['x30-biochimie-structurale', 'Biochimie structurale', 'Acides aminés, protéines, liaisons, conformations', 'La structure d’une protéine détermine sa fonction', 'Négliger la dénaturation', 'Étude d’une enzyme'],
  ],
  psychotechnique: [
    ['x30-logique-spatiale', 'Tests de logique spatiale', 'Rotations, pliages, vues, patrons', 'Un pliage se vérifie en suivant les arêtes', 'Deviner sans reconstruire le solide', 'Patron de cube'],
    ['x30-temps-tests', 'Gestion du temps aux tests', 'Barème, impasse, ordre, relance', 'Une question coûteuse se saute et se reprend', 'S’acharner sur une question unique', 'Concours à 60 questions'],
  ],
  statistiques: [
    ['x30-probabilites-variables', 'Probabilités et variables aléatoires', 'Univers, probabilité, espérance, variance', 'La somme des probabilités d’un univers complet vaut 1', 'Additionner des probabilités non disjointes', 'Jeu de dés'],
    ['x30-statistiques-descriptives', 'Statistiques descriptives', 'Moyenne, médiane, quartiles, écart-type', 'La médiane résiste mieux aux valeurs extrêmes que la moyenne', 'Conclure avec la moyenne seule', 'Salaires d’une entreprise'],
  ],
  pedagogie: [
    ['x30-planification-cours', 'Planification de cours', 'Objectifs, prérequis, séquence, évaluation', 'Un objectif pédagogique s’énonce en verbe observable', 'Planifier sans vérifier les prérequis', 'Séquence de trois séances'],
    ['x30-evaluation-feedback', 'Évaluation et feedback', 'Formative, sommative, critères, remédiation', 'Le feedback efficace dit ce qui est réussi et quoi corriger', 'Noter sans commentaire utile', 'Retour sur un devoir'],
  ],
  marketing_entrep: [
    ['x30-marketing-contenu', 'Marketing digital et contenu', 'Ciblage, contenu, référencement, mesure', 'Un contenu utile attire mieux qu’une publicité insistante', 'Publier sans objectif mesurable', 'Page d’une marque'],
    ['x30-pitch-investisseurs', 'Pitch et présentation investisseurs', 'Problème, solution, marché, traction, demande', 'Un pitch convainc par la preuve de traction', 'Présenter une idée sans preuve de demande', 'Concours de startups'],
  ],
  educ_civique: [
    ['x30-institutions-citoyennete', 'Vie démocratique et participation', 'Constitution, suffrage, séparation des pouvoirs', 'Le citoyen participe par le vote et le contrôle', 'Confondre pouvoir et administration', 'Élection locale'],
    ['x30-environnement-durabilite', 'Environnement et développement durable', 'Pollution, ressources, climat, responsabilité', 'Le développement durable concilie besoins présents et futurs', 'Opposer systématiquement économie et écologie', 'Projet de reboisement'],
  ],
  espagnol: [
    ['x30-comprehension-orale', 'Compréhension orale', 'Accents, débit, mots-clés, prise de notes', 'On comprend d’abord le thème, puis les détails', 'Vouloir tout traduire à l’écoute', 'Bulletin d’information'],
    ['x30-expression-ecrite', 'Expression écrite', 'Plan, connecteurs, registre, relecture', 'Un texte espagnol s’organise par paragraphes reliés', 'Traduire du français mot à mot', 'Lettre de motivation'],
  ],
  anatomie_physio: [
    ['x30-appareil-cardiovasculaire', 'Appareil cardiovasculaire', 'Cœur, circulation, pression, débit', 'Le débit cardiaque dépend de la fréquence et du volume d’éjection', 'Confondre pression artérielle et débit', 'Effort physique'],
    ['x30-appareil-respiratoire', 'Appareil respiratoire', 'Voies aériennes, alvéoles, échanges, volumes', 'Les échanges gazeux se font par diffusion alvéolo-capillaire', 'Confondre ventilation et respiration cellulaire', 'Spirométrie'],
  ],
  sante_publique: [
    ['x30-epidemiologie-descriptive', 'Épidémiologie descriptive', 'Taux, incidence, prévalence, standardisation', 'L’incidence mesure les nouveaux cas, la prévalence tous les cas', 'Confondre incidence et prévalence', 'Rapport annuel'],
    ['x30-sante-communautaire', 'Santé communautaire', 'Diagnostic local, participation, agents de santé', 'Un diagnostic communautaire associe les habitants', 'Décider sans consulter la population', 'Projet de quartier'],
  ],
  finances_publiques: [
    ['x30-dette-financement', 'Dette et financement public', 'Emprunt, intérêts, soutenabilité, titres', 'La soutenabilité dépend de la croissance et du taux d’intérêt', 'Comparer dette et PIB sans taux', 'Émission obligataire'],
    ['x30-fiscalite-locale', 'Fiscalité locale', 'Taxes locales, base, taux, recouvrement', 'Une taxe locale se juge à son taux de recouvrement', 'Voter un taux sans base recouvrable', 'Budget communal'],
  ],
  droit_ohada: [
    ['x30-societes-ohada', 'Droit des sociétés OHADA', 'SARL, SA, capital, gérance, assemblées', 'La responsabilité des associés dépend de la forme sociale', 'Confondre SARL et SA', 'Constitution d’une SARL'],
    ['x30-contrats-commerciaux', 'Contrats commerciaux OHADA', 'Vente, distribution, bail, clause pénale', 'Un contrat commercial se prouve par écrit en pratique', 'Conclure sans clause de résiliation', 'Contrat de distribution'],
  ],
  data_ia: [
    ['x30-statistiques-data', 'Statistiques pour la data', 'Distribution, corrélation, échantillonnage, tests', 'On nettoie et explore avant de modéliser', 'Modéliser des données non nettoyées', 'Préparation d’un jeu de données'],
    ['x30-gouvernance-donnees', 'Éthique et gouvernance des données', 'Consentement, anonymisation, traçabilité, biais', 'Une donnée personnelle exige une base légale et un usage limité', 'Réutiliser des données sans finalité', 'Registre de traitement'],
  ],
  arabe: [
    ['x30-comprehension-texte-arabe', 'Compréhension de texte arabe', 'Titre, idée directrice, connecteurs, lexique', 'L’idée directrice se dégage des reprises et des connecteurs', 'Traduire mot à mot sans idée générale', 'Article de presse'],
    ['x30-expression-ecrite-arabe', 'Expression écrite arabe', 'Plan, style, connecteurs, calligraphie', 'Un texte arabe se relit à voix haute pour l’harmonie', 'Écrire sans vérifier les accords', 'Rédaction d’un essai'],
  ],
  relations_inter: [
    ['x30-diplomatie-negociation', 'Diplomatie et négociation', 'Intérêts, options, médiation, compromis', 'Une négociation diplomatique part des intérêts, pas des positions', 'Négocier sur des positions figées', 'Négociation multilatérale'],
    ['x30-conflits-mediation', 'Conflits et médiation', 'Escalade, médiation, maintien de la paix, reconstruction', 'La médiation exige un médiateur accepté par les parties', 'Imposer un médiateur', 'Médiation régionale'],
  ],
  agronomie_env: [
    ['x30-semences-cultures', 'Semences et cultures', 'Variété, germination, densité, calendrier', 'La qualité de la semence conditionne le rendement', 'Semer sans test de germination', 'Champ de mil'],
    ['x30-elevage-agroforesterie', 'Élevage et agroforesterie', 'Fourrage, arbres, ombrage, complémentarité', 'L’agroforesterie associe arbres et cultures sur la même parcelle', 'Planter sans penser à la concurrence racinaire', 'Parcelle agroforestière'],
  ],
  energies_renouv: [
    ['x30-eolien-hydraulique', 'Éolien et hydraulique', 'Vent, pale, débit, turbine, site', 'La production éolienne varie au cube de la vitesse du vent', 'Dimensionner un site sans mesure de vent', 'Parc éolien'],
    ['x30-efficacite-energetique', 'Efficacité énergétique', 'Isolation, appareils, consommation, audits', 'L’énergie la moins chère est celle qui n’est pas consommée', 'Changer les lampes sans traiter l’enveloppe', 'Audit d’un bâtiment'],
  ],
  pharmacologie: [
    ['x30-pharmacologie-cardiovasculaire', 'Traitements de l’hypertension et du cœur', 'Antihypertenseurs, diurétiques, bêtabloquants', 'Chaque classe agit sur une cible physiologique précise', 'Associer deux molécules de même cible', 'Hypertension artérielle'],
    ['x30-toxicologie-antidotes', 'Toxicologie et antidotes', 'Toxiques, dose, antidote, délai', 'L’antidote n’est utile que dans un délai connu', 'Attendre les symptômes pour traiter', 'Intoxication au pesticide'],
  ],
  logistique_ci: [
    ['x30-entrepots-manutention', 'Entrepôts et manutention', 'Implantation, flux, picking, sécurité', 'L’implantation d’un entrepôt suit les flux dominants', 'Stocker sans cartographie des flux', 'Plateforme logistique'],
    ['x30-chaine-approvisionnement', 'Chaîne d’approvisionnement', 'Fournisseurs, délais, aléas, plan de continuité', 'Un maillon faible suffit à rompre la chaîne', 'Dépendre d’un fournisseur unique', 'Rupture d’un composant'],
  ],
  grh_travail: [
    ['x30-formation-competences', 'Formation et compétences', 'Besoins, plan de formation, évaluation, tutorat', 'Un plan de formation découle d’un écart de compétences constaté', 'Former sans évaluer le besoin', 'Plan annuel de formation'],
    ['x30-sante-securite-travail', 'Santé et sécurité au travail', 'Risques, prévention, EPI, accident', 'Le risque professionnel s’évalue avant de choisir la protection', 'Distribuer des EPI sans former', 'Atelier bruyant'],
  ],
  reseaux_telecoms: [
    ['x30-securite-telecoms', 'Sécurité des réseaux télécoms', 'Chiffrement, authentification, supervision, fraude', 'La supervision détecte la fraude avant la facture', 'Ignorer les alarmes de trafic anormal', 'Fraude à la carte SIM'],
    ['x30-services-mobiles-roaming', 'Services mobiles et itinérance', 'Roaming, QoS, facturation, couverture', 'L’itinérance dépend d’accords entre opérateurs', 'Facturer sans accord d’itinérance', 'Voyageur à l’étranger'],
  ],
  genie_civil_btp: [
    ['x30-fondations-sols', 'Fondations et sols', 'Portance, essais, semelles, pieux', 'Le type de fondation dépend de la portance du sol', 'Fonder sans étude géotechnique', 'Immeuble sur sol argileux'],
    ['x30-routes-assainissement', 'Routes et assainissement urbain', 'Chaussée, pente, caniveau, drainage', 'Une route se protège par son drainage', 'Poser la chaussée sans évacuer les eaux', 'Voirie de quartier'],
  ],
  journalisme_comm: [
    ['x30-interview-reportage', 'Interview et reportage', 'Préparation, questions ouvertes, terrain, montage', 'Une interview se prépare par des questions ciblées', 'Poser des questions fermées en chaîne', 'Reportage de quartier'],
    ['x30-communication-publique', 'Communication publique', 'Message, publics, canaux, évaluation', 'La communication publique informe avant de convaincre', 'Communiquer sans évaluer la réception', 'Campagne institutionnelle'],
  ],
  nutrition_sante: [
    ['x30-nutrition-enfant', 'Nutrition de l’enfant', 'Allaitement, diversification, croissance, carences', 'La diversification suit le développement de l’enfant', 'Donner du solide trop tôt', 'Suivi du nourrisson'],
    ['x30-dietetique-therapeutique', 'Diététique thérapeutique', 'Régimes, pathologies, adaptation, suivi', 'Un régime thérapeutique s’individualise selon la pathologie', 'Appliquer un régime standard à tous', 'Patient diabétique'],
  ],
  tourisme_hotel: [
    ['x30-restauration-service', 'Restauration et service', 'Carte, brigade, service, hygiène', 'Le service se prépare avant l’arrivée du client', 'Improviser le service en salle', 'Dîner de groupe'],
    ['x30-marketing-touristique', 'Marketing touristique', 'Segments, saisonnalité, canaux, fidélisation', 'La saisonnalité impose une tarification adaptée', 'Vendre au même prix toute l’année', 'Hôtel de bord de mer'],
  ],
  methodo_redaction: [
    ['x30-resume-texte', 'Résumé de texte', 'Idée directrice, reformulation, quota, ordre', 'Un résumé conserve les idées, pas les mots', 'Recopier des phrases entières', 'Résumé en 200 mots'],
    ['x30-compte-rendu-reunion', 'Compte rendu de réunion', 'Ordre du jour, décisions, actions, responsable', 'Un compte rendu distingue décisions et discussions', 'Mélanger débat et décision', 'Réunion de service'],
  ],
  aeronautique_meteo: [
    ['x30-securite-facteurs-humains', 'Sécurité aérienne et facteurs humains', 'Charge de travail, fatigue, communication, CRM', 'Les facteurs humains expliquent la majorité des incidents', 'Attribuer l’incident à une seule erreur', 'Briefing d’équipage'],
    ['x30-trafic-aerien', 'Gestion du trafic aérien', 'Séparation, pistes, tours, flux', 'La séparation des aéronefs garantit l’anticollision', 'Réduire la séparation pour gagner du temps', 'Approche d’un aéroport'],
  ],
  geologie_mines: [
    ['x30-tectonique-risques', 'Tectonique et risques', 'Failles, séismes, glissements, aléa', 'Un séisme se localise aux limites de plaques', 'Confondre magnitude et intensité', 'Carte sismique'],
    ['x30-ressources-petrolieres', 'Ressources pétrolières', 'Roche mère, piège, forage, récupération', 'Un gisement exige roche mère, réservoir et piège', 'Forer sans identification du piège', 'Prospection pétrolière'],
  ],
  veterinaire_elevage: [
    ['x30-sante-publique-veterinaire', 'Santé publique vétérinaire', 'Zoonoses, inspection, hygiène, abattage', 'Une zoonose se prévient à l’interface animal-homme', 'Négliger le contrôle à l’abattage', 'Inspection d’un abattoir'],
    ['x30-zootechnie-rations', 'Zootechnie et rations', 'Besoins, fourrages, conversion, croissance', 'Une ration se calcule sur les besoins et la qualité du fourrage', 'Distribuer une ration sans analyse', 'Engraissement bovin'],
  ],
  fintech_microfinance: [
    ['x30-regulation-fintech', 'Régulation fintech', 'Agrément, LCB-FT, protection du client, reporting', 'Un service financier numérique exige un agrément', 'Lancer un service de paiement sans agrément', 'Demande d’agrément'],
    ['x30-education-financiere-clients', 'Éducation financière des clients', 'Budget, taux, surendettement, confiance', 'Un client informé rembourse mieux', 'Vendre un crédit sans expliquer le coût total', 'Atelier clientèle'],
  ],
  psychologie_cog: [
    ['x30-motivation-engagement', 'Déclencheurs et persévérance dans l’effort', 'Intrinsèque, extrinsèque, but, persévérance', 'La motivation intrinsèque soutient l’effort durable', 'Punir pour motiver durablement', 'Préparation d’un concours'],
    ['x30-emotions-apprentissage', 'Émotions et apprentissage', 'Stress, anxiété, plaisir, régulation', 'Un stress modéré peut aider, un stress fort bloque', 'Ignorer l’état émotionnel de l’élève', 'Passage d’un oral'],
  ],
  ethique_gouvernance: [
    ['x30-transparence-budgetaire', 'Redevabilité et contrôle des fonds publics', 'Publication, contrôle, participation, redevabilité', 'La transparence rend le budget contestable par les citoyens', 'Publier des chiffres illisibles', 'Budget participatif'],
    ['x30-integritye-controle-citoyen', 'Intégrité et contrôle citoyen', 'Signalement, lanceur d’alerte, contrôle, sanction', 'Le contrôle citoyen suppose une protection des signalements', 'Exposer un lanceur d’alerte', 'Veille citoyenne'],
  ],
  urbanisme_sig: [
    ['x30-planification-urbaine', 'Planification urbaine', 'Schéma directeur, zonage, densité, équipements', 'Un document d’urbanisme fixe des règles opposables', 'Construire hors zonage', 'Plan d’occupation des sols'],
    ['x30-espaces-publics-vegetalisation', 'Espaces publics et végétalisation', 'Fraîcheur, ombrage, usage, entretien', 'La végétalisation réduit l’îlot de chaleur urbain', 'Planter sans prévoir l’arrosage', 'Place de quartier'],
  ],
  obstetrique_pediatrie: [
    ['x30-post-partum-allaitement', 'Post-partum et allaitement', 'Involution, lactation, dépistage, contraception', 'Le post-partum fait l’objet d’une surveillance rapprochée', 'Négliger la visite postnatale', 'Consultation du 6e jour'],
    ['x30-croissance-enfant', 'Suivi pondéral et étapes du nourrisson', 'Courbes, étapes, alimentation, vaccination', 'Une courbe s’interprète par sa dynamique, pas par un point', 'Comparer un enfant à une seule moyenne', 'Suivi mensuel'],
  ],
  commerce_maritime: [
    ['x30-logistique-portuaire', 'Logistique portuaire', 'Terminal, manutention, escale, pré-acheminement', 'Le temps d’escale conditionne la compétitivité du port', 'Planifier sans temps de manutention', 'Escale conteneurs'],
    ['x30-assurance-maritime', 'Assurance maritime', 'Avaries, police, risque, indemnisation', 'L’assurance maritime couvre les avaries selon la police', 'Naviguer sans police d’assurance', 'Avarie de cargaison'],
  ],
  droit_numerique: [
    ['x30-contrats-numeriques', 'Contrats numériques', 'Consentement, preuve, licence, responsabilité', 'Un contrat en ligne exige un consentement éclairé', 'Valider par défaut des cases précochées', 'Abonnement en ligne'],
    ['x30-ia-responsabilite', 'Intelligence artificielle et responsabilité', 'Décision automatisée, explicabilité, recours', 'Une décision automatisée doit pouvoir être contestée', 'Décider sans possibilité de recours', 'Refus automatique de crédit'],
  ],
  chimie_organique: [
    ['x30-synthese-organique', 'Synthèse organique', 'Réactifs, rendement, purification, sécurité', 'Le rendement se calcule sur le réactif limitant', 'Peser sans identifier le limitant', 'Synthèse d’un ester'],
    ['x30-polymeres-materiaux', 'Polymères et matériaux', 'Monomère, polymérisation, thermoplastique, recyclage', 'La structure du polymère détermine ses propriétés', 'Confondre thermodurcissable et thermoplastique', 'Fabrication d’une bouteille'],
  ],
  gestion_crises: [
    ['x30-preparation-catastrophes', 'Préparation aux catastrophes', 'Scénarios, exercices, stocks, plan de contingence', 'Un plan de crise se teste avant la crise', 'Découvrir le plan le jour de la crise', 'Exercice d’évacuation'],
    ['x30-communication-crise-humanitaire', 'Communication de crise humanitaire', 'Faits, vulnérabilités, canaux, rumeurs', 'Une communication de crise protège les victimes avant l’image', 'Diffuser des chiffres non vérifiés', 'Séisme et rumeurs'],
  ],
  technologie_robotique: [
    ['x30-conception-mecanique', 'Conception mécanique du robot', 'Châssis, transmission, moteur, charge', 'Le couple moteur se dimensionne avec la charge et la vitesse', 'Choisir un moteur au hasard', 'Robot porteur'],
    ['x30-energie-autonomie-robots', 'Énergie et autonomie des robots', 'Batterie, consommation, recharge, secours', 'L’autonomie dépend du profil de consommation', 'Compter la consommation moyenne seule', 'Robot de surveillance'],
  ],
  allemand: [
    ['x30-comprehension-orale-allemande', 'Compréhension orale allemande', 'Accents, mots-clés, contexte, notes', 'L’allemand oral contracte beaucoup de formes écrites', 'Vouloir traduire chaque syllabe', 'Interview radiophonique'],
    ['x30-expression-ecrite-allemande', 'Expression écrite allemande', 'Structure, connecteurs, cas, registre', 'La place du verbe structure la phrase allemande', 'Traduire l’ordre des mots français', 'Lettre formelle'],
  ],
  astronomie_spatial: [
    ['x30-observation-ciel', 'Observation du ciel', 'Repères, saisons, instruments, pollution lumineuse', 'La voûte céleste change avec la saison et la latitude', 'Observer sans repère d’orientation', 'Nuit d’observation'],
    ['x30-missions-spatiales', 'Missions spatiales', 'Orbite, lanceur, charge utile, retour', 'Une mission se définit par son orbite et sa charge utile', 'Choisir une orbite sans contrainte', 'Satellite d’observation'],
  ],
  sociologie_anthropo: [
    ['x30-famille-parente', 'Famille et parenté', 'Filiation, alliance, résidence, transmission', 'La parenté organise les droits et les devoirs', 'Confondre famille biologique et sociale', 'Enquête de village'],
    ['x30-travail-organisations', 'Travail et organisations', 'Division du travail, hiérarchie, culture d’entreprise', 'Une organisation produit des normes implicites', 'Réduire le travail à l’organigramme', 'Observation d’atelier'],
  ],
  arts_musique_patrimoine: [
    ['x30-patrimoine-musees', 'Patrimoine et musées', 'Collection, conservation, médiation, restitution', 'Un musée conserve et interprète ses collections', 'Exposer sans médiation', 'Projet d’exposition'],
    ['x30-cinema-montage', 'Cinéma et montage', 'Plan, séquence, raccord, rythme', 'Le montage construit le sens et le rythme', 'Enchaîner sans logique de regard', 'Scène de dialogue'],
  ],
  eps_sciences_sport: [
    ['x30-apprentissage-moteur', 'Motricité et apprentissage moteur', 'Schéma corporel, coordination, feedback, répétition', 'Un geste s’apprend par répétition et feedback', 'Répéter sans corriger', 'Apprentissage du saut'],
    ['x30-sante-activite-physique', 'Santé et activité physique', 'Charge, récupération, prévention, bienfaits', 'L’activité physique régulière prévient les maladies chroniques', 'Reprendre à intensité maximale', 'Programme de remise en forme'],
  ],
  genetique_biotech: [
    ['x30-genetique-humaine-conseil', 'Génétique humaine et conseil', 'Arbre généalogique, risque, dépistage, éthique', 'Le conseil génétique évalue un risque, pas une certitude', 'Annoncer un diagnostic sans accompagnement', 'Consultation prénatale'],
    ['x30-biotechnologies-industrielles', 'Biotechnologies industrielles', 'Fermenteur, souche, rendement, biosécurité', 'Le rendement dépend de la souche et des conditions de culture', 'Fermenter sans contrôle du pH', 'Production d’enzymes'],
  ],
  droit_penal_proc: [
    ['x30-droit-penal-special', 'Droit pénal spécial', 'Vol, escroquerie, abus de confiance, violences', 'Chaque infraction exige ses éléments constitutifs', 'Confondre vol et escroquerie', 'Plainte pour escroquerie'],
    ['x30-peines-execution', 'Peines et exécution', 'Peines, sursis, aménagement, réinsertion', 'L’exécution des peines vise aussi la réinsertion', 'Confondre prononcé et exécution', 'Suivi d’un condamné'],
  ],
  linguistique_oralite: [
    ['x30-sociolinguistique', 'Sociolinguistique', 'Registres, variétés, prestige, insécurité linguistique', 'Une variété linguistique n’est jamais « incorrecte » en soi', 'Hiérarchiser les parlers sans analyse', 'Enquête de terrain'],
    ['x30-langues-contact', 'Langues en contact', 'Bilinguisme, emprunt, alternance, créolisation', 'Le contact entre langues produit emprunts et alternances', 'Attribuer tout écart à une faute', 'Marché plurilingue'],
  ],
  electronique_electrotech: [
    ['x30-microcontroleurs', 'Systèmes embarqués et microcontrôleurs', 'Entrées-sorties, timer, interruption, programme', 'Une interruption doit rester courte', 'Bloquer le processeur dans une attente', 'Commande d’un moteur'],
    ['x30-distribution-electrique', 'Distribution électrique', 'Transformateur, protections, section, mise à la terre', 'La section du conducteur dépend du courant et de la chute de tension', 'Négliger la mise à la terre', 'Tableau d’un atelier'],
  ],
  architecture_design: [
    ['x30-conception-architecturale', 'Conception architecturale', 'Programme, plan, lumière, circulation', 'Le plan traduit un programme d’usages', 'Dessiner sans programme', 'Maison de ville'],
    ['x30-patrimoine-rehabilitation', 'Patrimoine bâti et réhabilitation', 'Diagnostic, matériaux, structure, usage', 'Réhabiliter exige un diagnostic structurel préalable', 'Moderniser sans étude de structure', 'Bâtiment ancien'],
  ],
  medecine_clinique: [
    ['x30-cardiologie-clinique', 'Souffle, douleur thoracique et ECG', 'Douleur thoracique, ECG, souffle, insuffisance', 'Un ECG s’interprète par étapes systématiques', 'Lire l’ECG sans méthode', 'Douleur thoracique aiguë'],
    ['x30-infectiologie-clinique', 'Infectiologie clinique', 'Fièvre, foyer, prélèvements, antibiothérapie', 'Le foyer infectieux se recherche avant de traiter', 'Traiter une fièvre sans examen', 'Fièvre prolongée'],
  ],
  sciences_politiques: [
    ['x30-partis-elections', 'Partis et élections', 'Systèmes électoraux, partis, coalitions, participation', 'Le mode de scrutin transforme les voix en sièges', 'Confondre voix et sièges', 'Élection législative'],
    ['x30-administration-publique', 'Administration publique', 'Bureaucratie, services, réforme, usagers', 'Une administration se juge à son service à l’usager', 'Réformer sans mesurer le service rendu', 'Guichet unique'],
  ],
  hydrologie_eau_climat: [
    ['x30-hydrologie-bassins', 'Hydrologie des bassins', 'Bassin versant, pluie, ruissellement, débit', 'Le bassin versant collecte toutes les eaux d’un même exutoire', 'Dimensionner sans pluviométrie locale', 'Crue d’un cours d’eau'],
    ['x30-eau-changement-climatique', 'Eau et changement climatique', 'Sécheresse, recharge, qualité, adaptation', 'La recharge des nappes dépend des pluies efficaces', 'Pomper sans suivre le niveau de nappe', 'Forage en zone sèche'],
  ],
  finance_marches_banque: [
    ['x30-instruments-financiers', 'Marchés et instruments financiers', 'Actions, obligations, taux, liquidité', 'Le prix d’une obligation varie à l’inverse des taux', 'Confondre rendement et coupon', 'Achat d’obligations'],
    ['x30-gestion-portefeuille', 'Gestion de portefeuille', 'Diversification, risque, rendement, horizon', 'La diversification réduit le risque spécifique', 'Concentrer sans mesurer le risque', 'Portefeuille d’épargnant'],
  ],
  genie_mecanique: [
    ['x30-transmissions-mecaniques', 'Transmissions mécaniques', 'Engrenages, courroies, rapports, rendement', 'Le rapport de transmission relie les vitesses et les couples', 'Confondre vitesse et couple', 'Réducteur d’un convoyeur'],
    ['x30-hydraulique-pneumatique', 'Hydraulique et pneumatique', 'Pression, débit, vérin, distributeur', 'La force d’un vérin dépend de la pression et de la section', 'Dimensionner sans pertes de charge', 'Presse hydraulique'],
  ],
  thermodynamique_froid: [
    ['x30-bilans-thermiques-batiment', 'Bilans thermiques du bâtiment', 'Déperditions, apports, isolation, inertie', 'Les déperditions se calculent par paroi et par renouvellement d’air', 'Estimer sans coefficients de transmission', 'Diagnostic énergétique'],
    ['x30-froid-industriel', 'Froid industriel', 'Compresseur, évaporateur, fluide, sécurité', 'Le choix du fluide frigorigène engage la performance et la sécurité', 'Recharger sans traiter la fuite', 'Entrepôt frigorifique'],
  ],
  genie_chimique_procedes: [
    ['x30-distillation-separation', 'Distillation et séparation', 'Équilibre liquide-vapeur, colonne, reflux, pureté', 'Le nombre de plateaux dépend de la pureté visée', 'Distiller sans connaître l’équilibre', 'Raffinerie pilote'],
    ['x30-catalyse-reacteurs', 'Catalyse et réacteurs', 'Catalyseur, sélectivité, température, durée de vie', 'Un catalyseur accélère sans modifier l’équilibre', 'Chauffer au-delà de la stabilité du catalyseur', 'Réacteur de synthèse'],
  ],
  science_materiaux: [
    ['x30-materiaux-composites', 'Matériaux composites', 'Fibre, matrice, anisotropie, délaminage', 'Un composite est anisotrope : ses propriétés dépendent de l’orientation', 'Concevoir comme un métal isotrope', 'Pale d’éolienne'],
    ['x30-metallurgie-extractive', 'Métallurgie extractive', 'Minerai, grillage, réduction, affinage', 'Le procédé dépend de la nature chimique du minerai', 'Traiter un oxyde comme un sulfure', 'Production d’aluminium'],
  ],
  automatique_controle: [
    ['x30-systemes-asservis', 'Systèmes asservis', 'Boucle ouverte, boucle fermée, stabilité, précision', 'Un asservissement corrige l’écart mesuré en continu', 'Régler sans mesurer la stabilité', 'Bras positionneur'],
    ['x30-robotique-industrielle', 'Robotique industrielle', 'Trajectoire, repère, sécurité, cycle', 'Une trajectoire se définit dans un repère et avec des limites', 'Programmer sans limites de sécurité', 'Ligne d’assemblage'],
  ],
  genie_logiciel_devops: [
    ['x30-architecture-logicielle', 'Architecture logicielle', 'Couches, modules, interfaces, couplage', 'Un faible couplage rend le logiciel modifiable', 'Tout centraliser dans un seul module', 'Refonte d’une application'],
    ['x30-securite-applicative', 'Sécurité applicative', 'Injection, authentification, droits, journalisation', 'Toute entrée utilisateur est validée côté serveur', 'Faire confiance au formulaire client', 'Formulaire de connexion'],
  ],
  bases_donnees_bigdata: [
    ['x30-sql-avance', 'SQL avancé et optimisation', 'Index, plans, agrégats, sous-requêtes', 'Un index accélère la lecture mais ralentit l’écriture', 'Indexer toutes les colonnes', 'Requête lente'],
    ['x30-big-data-distribue', 'Big data et traitement distribué', 'Partition, MapReduce, spark, tolérance aux pannes', 'Le traitement distribué découpe les données en partitions', 'Traiter en mémoire sans surveiller la taille', 'Analyse de logs'],
  ],
  developpement_mobile_web: [
    ['x30-front-end-frameworks', 'Front-end et frameworks', 'Composants, état, rendu, événements', 'L’état de l’interface doit rester la source unique de vérité', 'Dupliquer l’état entre composants', 'Liste interactive'],
    ['x30-back-end-api', 'Back-end et API', 'Routes, validation, authentification, erreurs', 'Une API répond avec des codes et des messages explicites', 'Renvoyer 200 sur une erreur', 'API de commandes'],
  ],
  design_ux_infographie: [
    ['x30-prototypage-tests', 'Prototypage et tests', 'Wireframe, prototype, scénario, mesure', 'Un prototype se teste sur des tâches réelles', 'Tester sans scénario', 'Refonte d’un site'],
    ['x30-motion-video', 'Motion design et vidéo', 'Timing, transition, storyboard, export', 'Le mouvement guide l’attention, il ne la distrait pas', 'Animer chaque élément', 'Générique animé'],
  ],
  iot_systemes_embarques: [
    ['x30-domotique-batiment', 'Domotique et bâtiment intelligent', 'Capteurs, scénarios, chauffage, sécurité', 'Un scénario domotique doit rester utilisable sans réseau', 'Dépendre entièrement du cloud', 'Maison connectée'],
    ['x30-securite-iot', 'Sécurité IoT', 'Mots de passe, mises à jour, chiffrement, réseau invité', 'Un objet connecté non mis à jour devient une porte d’entrée', 'Laisser les identifiants par défaut', 'Caméra connectée'],
  ],
  soins_infirmiers: [
    ['x30-soins-techniques', 'Soins techniques et surveillance', 'Pansement, injection, paramètres, alerte', 'Tout soin technique se documente et se surveille', 'Réaliser sans tracer', 'Pose de perfusion'],
    ['x30-education-therapeutique', 'Éducation thérapeutique', 'Diagnostic éducatif, objectifs, ateliers, suivi', 'L’éducation thérapeutique part du vécu du patient', 'Donner des consignes sans vérifier la compréhension', 'Patient asthmatique'],
  ],
  microbiologie_biomed: [
    ['x30-virologie-medicale', 'Diagnostic des infections virales', 'Virus, PCR, sérologie, charge virale', 'La PCR détecte le génome, la sérologie la réponse immunitaire', 'Confondre PCR et sérologie', 'Diagnostic grippal'],
    ['x30-mycologie-parasitologie', 'Mycologie et parasitologie', 'Champignons, parasites, prélèvements, traitement', 'Le diagnostic mycologique exige un prélèvement adapté', 'Traiter sans prélèvement', 'Mycose cutanée'],
  ],
  chirurgie_traumatologie: [
    ['x30-chirurgie-viscerale', 'Chirurgie viscérale', 'Abdomen, suture, drainage, surveillance', 'Toute douleur abdominale aiguë se surveille avant d’opérer', 'Opérer sans bilan', 'Appendicite'],
    ['x30-secourisme-urgence', 'Secourisme et gestes d’urgence', 'Protection, alerte, PLS, massage', 'L’ordre protéger, alerter, secourir est intangible', 'Déplacer un blessé sans nécessité', 'Accident de la route'],
  ],
  odontologie_stomato: [
    ['x30-protheses-dentaires', 'Réhabilitation prothétique et occlusion', 'Empreinte, occlusion, couronne, bridge', 'Une prothèse s’équilibre sur l’occlusion du patient', 'Poser sans contrôle de l’occlusion', 'Couronne molaire'],
    ['x30-urgences-bucco-dentaires', 'Urgences bucco-dentaires', 'Douleur, abcès, traumatisme, avulsion', 'Une dent avulsée se conserve dans un milieu adapté', 'Nettoyer la racine à sec', 'Chute d’un enfant'],
  ],
  sante_mentale_psychiatrie: [
    ['x30-troubles-humeur', 'Troubles de l’humeur', 'Dépression, bipolarité, symptômes, suivi', 'La dépression se diagnostique sur une durée, pas un jour', 'Confondre tristesse et dépression', 'Épisode dépressif'],
    ['x30-addictions-prevention', 'Addictions et prévention', 'Dépendance, sevrage, réduction des risques', 'La réduction des risques précède l’abstinence', 'Exiger l’abstinence immédiate', 'Accompagnement tabac'],
  ],
  droit_fiscal_douanes: [
    ['x30-contentieux-fiscal', 'Contentieux fiscal', 'Réclamation, preuve, commission, recours', 'Le contribuable conteste par une réclamation motivée', 'Saisir le juge sans réclamation préalable', 'Redressement contesté'],
    ['x30-fiscalite-internationale-cemac', 'Fiscalité internationale CEMAC', 'Conventions, prix de transfert, retenue à la source', 'Une convention fiscale évite la double imposition', 'Appliquer deux fiscalités sans convention', 'Prestataire étranger'],
  ],
  droit_foncier_environnement: [
    ['x30-expropriation-indemnisation', 'Expropriation et indemnisation', 'Utilité publique, procédure, indemnité, recours', 'L’expropriation exige une utilité publique déclarée', 'Occuper sans titre ni indemnisation', 'Route traversant un terrain'],
    ['x30-mines-communautes', 'Mines et communautés locales', 'Permis, redevance, consultation, réhabilitation', 'L’exploitation minière doit consulter et indemniser les riverains', 'Exploiter sans consultation', 'Mine et village'],
  ],
  droit_international_public: [
    ['x30-droit-humanitaire', 'Droit humanitaire', 'Conflit armé, protection, proportionnalité, neutralité', 'Le droit humanitaire protège même en temps de guerre', 'Confondre droit de la guerre et droits humains', 'Convoi humanitaire'],
    ['x30-refugies-asile', 'Réfugiés et asile', 'Statut, non-refoulement, demande, protection', 'Le principe de non-refoulement interdit le retour au danger', 'Reconduire sans examen de la demande', 'Demande d’asile'],
  ],
  criminologie_securite: [
    ['x30-criminalite-organisee', 'Criminalité organisée', 'Réseaux, blanchiment, traite, enquête', 'Le blanchiment se détecte par les flux financiers', 'Enquêter sans analyse financière', 'Réseau transnational'],
    ['x30-prevention-situationnelle', 'Réduction des occasions de délit', 'Aménagement, surveillance, cible, opportunité', 'La prévention situationnelle réduit l’opportunité de passage à l’acte', 'Compter sur la seule répression', 'Parking public'],
  ],
  droit_assurances_cima: [
    ['x30-assurance-transport', 'Assurance transport', 'Cargaison, avarie, garanties, recours', 'La garantie transport dépend de l’emballage et du trajet', 'Assurer sans inventaire de cargaison', 'Conteneur endommagé'],
    ['x30-assurance-vie-epargne', 'Contrats d’épargne et clauses bénéficiaires', 'Contrat, bénéficiaire, rachat, rendement', 'La clause bénéficiaire se rédige avec précision', 'Omettre de désigner un bénéficiaire', 'Contrat d’épargne'],
  ],
  audit_controle_interne: [
    ['x30-audit-interne-risques', 'Audit interne et risques', 'Référentiel, plan d’audit, constat, recommandation', 'Une recommandation d’audit est mesurable et datée', 'Formuler des recommandations vagues', 'Plan d’audit annuel'],
    ['x30-fraude-detection', 'Fraude et détection', 'Red flags, séparation des tâches, piste d’audit', 'La séparation des tâches prévient la fraude interne', 'Confier encaissement et comptabilisation à la même personne', 'Caisse d’une association'],
  ],
  econometrie_prevision: [
    ['x30-econometrie-appliquee', 'Modélisation économétrique appliquée', 'Variables, endogénéité, moindres carrés, diagnostic', 'Un modèle se valide par ses résidus et sa stabilité', 'Interpréter sans tester les résidus', 'Demande de transport'],
    ['x30-prevision-scenarios', 'Prévision et scénarios', 'Tendance, scénarios, incertitude, révision', 'Une prévision s’accompagne d’un intervalle et d’hypothèses', 'Présenter une prévision ponctuelle', 'Budget prévisionnel'],
  ],
  economie_developpement: [
    ['x30-economie-informelle', 'Économie informelle', 'Activités non enregistrées, emploi, fiscalité, mesure', 'L’informel échappe aux statistiques et à la protection sociale', 'Mesurer l’emploi par les seules déclarations', 'Marché urbain'],
    ['x30-odd-developpement-durable', 'Développement durable et ODD', 'Objectifs, indicateurs, financement, suivi', 'Un ODD se suit par des indicateurs comparables', 'Annoncer un objectif sans indicateur', 'Rapport national'],
  ],
  negociation_commerce_b2b: [
    ['x30-vente-relationnelle', 'Vente relationnelle', 'Écoute, besoin, confiance, fidélisation', 'La vente relationnelle s’appuie sur le besoin exprimé', 'Vendre sans écouter', 'Client grand compte'],
    ['x30-ecommerce-paiement', 'E-commerce et paiement', 'Catalogue, panier, paiement, logistique', 'Le taux d’abandon se réduit par un parcours court', 'Multiplier les étapes de commande', 'Boutique en ligne'],
  ],
  qualite_hse_iso: [
    ['x30-iso-14001', 'Environnement et ISO 14001', 'Aspects, impacts, conformité, amélioration', 'Un aspect environnemental se hiérarchise par son impact', 'Déclarer sans mesure', 'Certification environnementale'],
    ['x30-securite-incendie', 'Risque incendie et plans d’évacuation', 'Départ de feu, désenfumage, extincteurs, évacuation', 'L’évacuation se prépare par des exercices', 'Bloquer les issues de secours', 'Exercice d’évacuation'],
  ],
  portugais_lusophone: [
    ['x30-expression-orale-portugaise', 'Expression orale portugaise', 'Prononciation, rythme, registre, exposé', 'Le portugais brésilien et européen diffèrent à l’oral', 'Mélanger les deux normes', 'Exposé en classe'],
    ['x30-litterature-lusophone', 'Œuvres et auteurs lusophones', 'Auteurs, courants, contexte, analyse', 'Une œuvre lusophone se situe dans son contexte national', 'Lire sans contexte historique', 'Commentaire d’un poème'],
  ],
  chinois_mandarin: [
    ['x30-conversation-chinoise', 'Conversation chinoise', 'Salutations, tons, politesse, situations', 'La politesse chinoise privilégie la relation avant la demande', 'Aller droit au but sans formule', 'Rencontre professionnelle'],
    ['x30-ecriture-lecture-chinoise', 'Écriture et lecture', 'Radicaux, traits, lecture, dictionnaire', 'Un caractère inconnu se cherche par son radical', 'Deviner la prononciation par la forme', 'Lecture d’un menu'],
  ],
  litterature_africaine: [
    ['x30-poesie-africaine', 'Poésie africaine', 'Négritude, rythme, image, engagement', 'La poésie africaine mêle rythme oral et écriture', 'Lire sans entendre le rythme', 'Commentaire d’un poème'],
    ['x30-critique-reception', 'Critique et réception', 'Contexte, réception, censure, canon', 'La réception d’une œuvre varie selon les époques', 'Juger sans situer la réception', 'Débat littéraire'],
  ],
  archeologie_histoire_afrique: [
    ['x30-art-rupestre', 'Art rupestre et patrimoine', 'Peintures, gravures, datation, conservation', 'L’art rupestre se date par le contexte et les pigments', 'Interpréter sans analyse technique', 'Site pariétal'],
    ['x30-esclavage-traites', 'Esclavage et traites', 'Traite atlantique, traite saharienne, mémoire, sources', 'Les traites se documentent par des sources croisées', 'Confondre mémoire et source', 'Étude d’un fort'],
  ],
  geographie_amenagement: [
    ['x30-villes-metropolisation', 'Villes et métropolisation', 'Croissance urbaine, centralité, étalement, inégalités', 'La métropolisation concentre les fonctions de commandement', 'Confondre croissance démographique et métropolisation', 'Capitale africaine'],
    ['x30-frontieres-espaces', 'Frontières et espaces', 'Frontière, échange, contrôle, coopération', 'Une frontière est autant un passage qu’une limite', 'Réduire la frontière à un tracé', 'Poste frontière'],
  ],
  foresterie_biodiversite: [
    ['x30-produits-forestiers', 'Valorisation des produits de la forêt', 'Miel, noix, écorces, filières, durabilité', 'La valorisation des produits non ligneux finance la conservation', 'Prélever sans plan de renouvellement', 'Coopérative forestière'],
    ['x30-restauration-ecologique', 'Restauration écologique', 'Espèces locales, sol, suivi, résilience', 'La restauration privilégie les espèces locales', 'Planter des espèces exotiques envahissantes', 'Zone dégradée'],
  ],
  agroalimentaire_transformation: [
    ['x30-transformation-cereales', 'Transformation des céréales', 'Mouture, panification, fermentation, rendement', 'Le taux d’extraction conditionne la qualité de la farine', 'Moudre sans contrôler l’humidité', 'Minoterie'],
    ['x30-emballage-froid', 'Emballage et logistique du froid', 'Barrière, conditionnement, température, durée', 'L’emballage protège autant de l’humidité que des chocs', 'Emballer sans test de conservation', 'Produit laitier'],
  ],
  peche_aquaculture: [
    ['x30-aquaculture-durable', 'Aquaculture durable', 'Densité, eau, aliment, rejets', 'Une densité excessive dégrade l’eau et la croissance', 'Surdensifier sans renouvellement d’eau', 'Ferme piscicole'],
    ['x30-transformation-poisson', 'Transformation du poisson', 'Fumage, séchage, salage, chaîne du froid', 'Le fumage associe séchage et antiseptique naturel', 'Fumer sans contrôler l’humidité', 'Unité de fumage'],
  ],
  audiovisuel_cinema_podcast: [
    ['x30-son-podcast', 'Son et podcast', 'Micro, niveau, montage sonore, habillage', 'Le niveau d’enregistrement se règle avant de monter', 'Corriger une saturation en post-production', 'Épisode de podcast'],
    ['x30-production-diffusion', 'Production et diffusion', 'Budget, planning, droits, plateformes', 'Les droits de diffusion se règlent avant la publication', 'Publier une musique sans licence', 'Diffusion d’un film'],
  ],
  trading_marches: [
    ['x30-produits-derives', 'Produits dérivés', 'Contrats à terme, options, levier, marge', 'Le levier amplifie gains et pertes', 'Trader avec un levier non maîtrisé', 'Couverture de change'],
    ['x30-psychologie-trading', 'Psychologie du trading', 'Discipline, biais, journal, plan', 'Un journal de trades révèle les erreurs répétées', 'Trader pour se refaire', 'Série de pertes'],
  ],
  latin_grec: [
    ['x30-civilisation-romaine', 'Civilisation romaine', 'Institutions, cité, droit, vie quotidienne', 'La citoyenneté romaine était un statut juridique évolutif', 'Confondre Empire et République', 'Inscription latine'],
    ['x30-theatre-antique', 'Théâtre antique', 'Tragédie, comédie, chœur, masque', 'Le chœur commente l’action tragique', 'Lire une tragédie comme un roman', 'Extrait d’une tragédie'],
  ],
  technologie_college: [
    ['x30-conception-objets', 'Conception d’objets', 'Besoin, cahier des charges, croquis, maquette', 'Un objet se conçoit à partir d’un cahier des charges', 'Fabriquer sans définir le besoin', 'Porte-clés imprimé'],
    ['x30-programmation-automatismes', 'Programmation et automatismes', 'Capteur, actionneur, algorithme, boucle', 'Un automatisme relie mesure, décision et action', 'Programmer sans test des capteurs', 'Feu tricolore'],
  ],
  arts_plastiques: [
    ['x30-dessin-croquis', 'Dessin et croquis', 'Observation, proportion, ligne, valeur', 'Le croquis se construit par les grandes masses avant les détails', 'Détailler avant de proportionner', 'Croquis d’un visage'],
    ['x30-sculpture-volume', 'Modelage et travail du volume', 'Masse, volume, matériau, assemblage', 'La sculpture s’organise dans l’espace réel', 'Dessiner un volume sans le tourner', 'Modelage en argile'],
  ],
  methodes_travail: [
    ['x30-memorisation-active', 'Mémorisation active', 'Rappel, espacement, cartes mentales, test', 'Se tester mémorise mieux que relire', 'Relire passivement', 'Révision d’une leçon'],
    ['x30-stress-examen', 'Gestion du stress d’examen', 'Respiration, préparation, sommeil, routine', 'La préparation logistique réduit le stress', 'Réviser toute la nuit', 'Jour d’examen'],
  ],
  sciences_ingenieur: [
    ['x30-cinematique-mecanismes', 'Cinématique et mécanismes', 'Trajectoire, vitesse, liaison, degré de liberté', 'Un mécanisme se décrit par ses liaisons', 'Confondre mouvement et déformation', 'Bras de robot'],
    ['x30-electricite-automatismes', 'Électricité et automatismes', 'Alimentation, capteur, relais, programme', 'Un automatisme se protège et se teste hors charge', 'Câbler sous tension', 'Portail automatique'],
  ],
  preparation_bac: [
    ['x30-epreuve-ecrite', 'Épreuve écrite', 'Sujet, plan, gestion du temps, relecture', 'Disposer le plan au brouillon avant de rédiger', 'Rédiger sans plan', 'Épreuve de philosophie'],
    ['x30-grand-oral', 'Grand oral', 'Problématique, argumentation, questions, tenue', 'L’oral se prépare par une question et une démonstration', 'Réciter un exposé appris par cœur', 'Passage du grand oral'],
  ],
  education_financiere: [
    ['x30-assurance-protection', 'Assurance et protection', 'Risque, prime, garantie, sinistre', 'L’assurance transfère un risque contre une prime', 'Assurer un risque déjà certain', 'Assurance habitation'],
    ['x30-investissement-long-terme', 'Investissement et épargne longue', 'Intérêts composés, horizon, risque, frais', 'Les frais réduisent fortement le rendement composé', 'Ignorer les frais dans un calcul', 'Plan d’épargne'],
  ],
  entrepreneuriat: [
    ['x30-etude-faisabilite', 'Étude de faisabilité', 'Technique, financière, commerciale, juridique', 'Une faisabilité s’évalue sur les quatre volets', 'Lancer sur une seule intuition', 'Ouverture d’un atelier'],
    ['x30-gestion-croissance', 'Gestion de la croissance', 'Trésorerie, recrutement, process, qualité', 'La croissance consomme de la trésorerie', 'Croître sans financer le besoin en fonds de roulement', 'Passage à 20 salariés'],
  ],
  sciences_forensiques: [
    ['x30-balistique-armes', 'Balistique et armes', 'Trajectoire, rayures, résidus, comparaison', 'Une arme se compare par les stries laissées sur l’étui', 'Conclure sans comparaison balistique', 'Examen d’une douille'],
    ['x30-documents-faux', 'Documents et faux', 'Écriture, encre, support, expertise', 'Un faux se prouve par l’examen du support et de l’encre', 'Conclure à l’œil nu', 'Contrat suspect'],
  ],
  mediation_conflits: [
    ['x30-mediation-interculturelle', 'Conflits de normes et médiation', 'Normes, valeurs, interprétation, confiance', 'Un conflit interculturel se lit d’abord par les normes en présence', 'Imposer sa propre grille de lecture', 'Conflit en entreprise'],
    ['x30-negociation-raisonnee', 'Négociation sur intérêts et critères', 'Intérêts, critères objectifs, options, accord', 'La négociation raisonnée s’appuie sur des critères objectifs', 'Négocier par rapport de force seul', 'Litige de voisinage'],
  ],
  langues_nationales: [
    ['x30-grammaire-comparee', 'Grammaire comparée', 'Classes de mots, tons, ordre, comparaison', 'Comparer deux langues révèle leurs structures propres', 'Traduire une structure sans l’adapter', 'Étude d’une phrase'],
    ['x30-proverbes-sagesse', 'Proverbes et sagesse', 'Proverbe, morale, contexte, transmission', 'Un proverbe tire son sens de la situation où il est prononcé', 'Traduire un proverbe littéralement', 'Veillée de proverbes'],
  ],
  inclusion_handicap: [
    ['x30-troubles-apprentissages', 'Troubles spécifiques des apprentissages', 'Dyslexie, dyscalculie, dysgraphie, compensation', 'Un trouble spécifique n’affecte pas l’intelligence globale', 'Confondre trouble et manque de travail', 'Élève dyscalculique'],
    ['x30-accessibilite-numerique', 'Accessibilité numérique', 'Contraste, clavier, lecteur d’écran, sous-titres', 'Une interface accessible se teste au clavier', 'Publier sans alternative textuelle', 'Site administratif'],
  ],
  ia_societe: [
    ['x30-ia-sante', 'IA et santé', 'Aide au diagnostic, données sensibles, validation, responsabilité', 'Un outil d’IA ne remplace pas la décision du clinicien', 'Valider sans essai clinique', 'Dépistage assisté'],
    ['x30-democratie-algorithmes', 'Démocratie et algorithmes', 'Transparence, manipulation, modération, débat', 'Un algorithme opaque influence le débat public', 'Ignorer les effets de recommandation', 'Débat en ligne'],
  ],
  climat_adaptation: [
    ['x30-risques-climatiques-extremes', 'Risques climatiques extrêmes', 'Sécheresse, inondation, canicule, alerte', 'Un risque extrême se gère par anticipation et alerte', 'Réagir seulement après la catastrophe', 'Alerte inondation'],
    ['x30-villes-resilientes', 'Villes résilientes', 'Drainage, fraîcheur, services, continuité', 'Une ville résiliente maintient ses services essentiels', 'Construire sans plan de continuité', 'Capitale exposée'],
  ],
  economie_circulaire: [
    ['x30-economie-reparation', 'Économie de la réparation', 'Réparabilité, pièces, coût, formation', 'La réparation prolonge la vie du produit et crée de l’emploi', 'Jeter un appareil réparable', 'Atelier de réparation'],
    ['x30-dechets-valorisation', 'Déchets et valorisation', 'Tri, compost, énergie, filière', 'Le tri à la source conditionne la valorisation', 'Mélanger les déchets valorisables', 'Centre de tri'],
  ],
  gerontologie: [
    ['x30-politiques-grand-age', 'Politiques du grand âge', 'Autonomie, allocation, établissement, domicile', 'Une politique du grand âge articule domicile et établissement', 'Offrir une seule réponse à tous', 'Plan gérontologique'],
    ['x30-fin-de-vie', 'Accompagnement de fin de vie', 'Soins palliatifs, douleur, famille, dignité', 'Les soins palliatifs traitent la douleur et l’accompagnement', 'Abandonner les soins de confort', 'Accompagnement familial'],
  ],
  bibliotheconomie: [
    ['x30-mediation-culturelle', 'Médiation culturelle', 'Animation, publics, lecture, partenariat', 'La médiation culturelle relie un fonds et un public', 'Attendre le public sans aller vers lui', 'Heure du conte'],
    ['x30-transition-numerique-bibliotheques', 'Transition numérique des bibliothèques', 'Catalogue en ligne, ressources numériques, accès', 'Le catalogue numérique doit rester accessible hors les murs', 'Numériser sans métadonnées', 'Portail documentaire'],
  ],
  demographie: [
    ['x30-mortalite-sante', 'Mortalité et santé', 'Taux, causes, espérance de vie, inégalités', 'L’espérance de vie à la naissance résume les conditions sanitaires', 'Comparer sans standardiser les âges', 'Table de mortalité'],
    ['x30-projections-politiques', 'Projections et politiques', 'Hypothèses, fécondité, migrations, besoins', 'Une projection dépend entièrement de ses hypothèses', 'Présenter une projection comme une certitude', 'Besoins scolaires'],
  ],
  economie_sante: [
    ['x30-medicaments-prix', 'Médicaments et prix', 'Brevet, générique, prix, remboursement', 'Le générique abaisse le prix à brevet expiré', 'Ignorer le coût des traitements', 'Politique du médicament'],
    ['x30-prevention-couts-evites', 'Prévention et coûts évités', 'Dépistage, vaccination, coût-efficacité', 'La prévention se juge sur les cas évités', 'Financer sans évaluer l’effet', 'Campagne de dépistage'],
  ],
  esthetique_cosmetologie: [
    ['x30-manucure-soins-mains', 'Beauté des mains et prothésie ongulaire', 'Ongle, cuticule, désinfection, pose', 'Le matériel se désinfecte entre deux clientes', 'Réutiliser un matériel non stérilisé', 'Pose de vernis'],
    ['x30-epilation-soins-corps', 'Techniques d’épilation et soins corporels', 'Techniques, peau, contre-indications, soin', 'Chaque technique d’épilation a ses contre-indications', 'Épilier une peau lésée', 'Cabine de soins'],
  ],
  securite_privee: [
    ['x30-crise-evenements', 'Gestion de crise et événements', 'Foule, plan, évacuation, coordination', 'Un événement se sécurise par un plan validé en amont', 'Improviser le jour de l’événement', 'Concert de plein air'],
    ['x30-droit-securite-privee', 'Droit de la sécurité privée', 'Agrément, légitime défense, saisie, responsabilité', 'L’agent privé n’a pas les pouvoirs de la police', 'Retenir une personne sans cadre légal', 'Contrôle à l’entrée'],
  ],
  mobilite_urbaine: [
    ['x30-marche-velo', 'Marche et vélo', 'Trottoir, piste, partage, sécurité', 'Un aménagement cyclable continu encourage le vélo', 'Peindre une piste sans continuité', 'Aménagement de boulevard'],
    ['x30-securite-routiere', 'Sécurité routière', 'Vitesse, alcool, ceinture, carrefours', 'La vitesse réduit le temps de réaction disponible', 'Analyser un accident par la seul faute', 'Carrefour accidentogène'],
  ],
  fle_didactique: [
    ['x30-enseignement-grammaire', 'Enseignement de la grammaire', 'Notion, corpus, induction, réemploi', 'Une règle de grammaire se construit à partir d’exemples', 'Donner la règle sans corpus', 'Séance sur le passé composé'],
    ['x30-evaluation-fle', 'Évaluation en FLE', 'Grille, niveaux, tâche, fiabilité', 'Une évaluation communicative porte sur une tâche', 'Évaluer uniquement la grammaire', 'Test de niveau'],
  ],
  traduction_professionnelle: [
    ['x30-traduction-technique', 'Traduction technique', 'Terminologie, documentation, cohérence', 'Un terme technique se traduit avec la documentation du domaine', 'Improviser un terme technique', 'Notice d’utilisation'],
    ['x30-localisation-outils', 'Localisation et outils', 'Mémoire de traduction, balises, formats', 'La localisation adapte formats, dates et unités', 'Traduire des balises sans les vérifier', 'Site web multilingue'],
  ],
  droit_notarial: [
    ['x30-contrats-notaries', 'Contrats notariés', 'Vente, donation, hypothèque, publicité', 'Un acte notarié doit être publié pour être opposable', 'Signer sans publicité foncière', 'Vente d’un terrain'],
    ['x30-fiscalite-notariale', 'Fiscalité notariale', 'Droits, assiette, exonérations, déclaration', 'Les droits de mutation se calculent sur la valeur réelle', 'Déclarer une valeur sous-évaluée', 'Achat immobilier'],
  ],
  kinesitherapie_reeducation: [
    ['x30-reeducation-neurologique', 'Rééducation neurologique', 'Hémiplégie, plasticité, transfert, équilibre', 'La plasticité cérébrale soutient la récupération fonctionnelle', 'Attendre la récupération spontanée', 'Après un AVC'],
    ['x30-prevention-blessures', 'Prévention des blessures', 'Échauffement, charge, récupération, geste', 'Une charge progressive prévient la blessure', 'Reprendre à pleine intensité', 'Reprise sportive'],
  ],
  immobilier_transaction: [
    ['x30-gestion-locative', 'Gestion locative', 'Bail, loyer, état des lieux, impayé', 'Un état des lieux contradictoire protège les deux parties', 'Remettre les clés sans état des lieux', 'Location d’un studio'],
    ['x30-promotion-immobiliere', 'Promotion immobilière', 'Foncier, permis, financement, commercialisation', 'Un programme se lance après sécurisation du foncier', 'Commercialiser sans permis', 'Programme de logements'],
  ],
  blockchain_actifs_numeriques: [
    ['x30-smart-contracts', 'Smart contracts', 'Code, conditions, audit, exécution', 'Un contrat automatique s’exécute tel qu’il est écrit', 'Déployer sans audit de code', 'Paiement conditionnel'],
    ['x30-tokenisation-defi', 'Tokenisation et finance décentralisée', 'Jeton, liquidité, protocole, risque', 'La tokenisation transfère un droit sous forme numérique', 'Confondre jeton et action', 'Plateforme de prêt'],
  ],
  orthophonie_langage: [
    ['x30-begaiement-fluence', 'Bégaiement et fluence', 'Fluence, évitement, guidance, famille', 'La prise en charge du bégaiement agit sur l’environnement', 'Corriger en demandant de parler plus lentement', 'Entretien familial'],
    ['x30-troubles-voix', 'Troubles de la voix', 'Dysphonie, souffle, rééducation, hygiène vocale', 'La voix se rééduque par le souffle et la posture', 'Forcer la voix en cas de dysphonie', 'Enseignant enroué'],
  ],
  horticulture_paysage: [
    ['x30-gazon-pelouses', 'Gazon et pelouses', 'Semis, tonte, arrosage, désherbage', 'La hauteur de tonte influence la résistance du gazon', 'Tondre trop ras en saison sèche', 'Pelouse de stade'],
    ['x30-eau-jardin', 'Gestion de l’eau au jardin', 'Arrosage, paillage, récupération, besoins', 'Le paillage réduit l’évaporation du sol', 'Arroser en plein soleil sans paillage', 'Jardin en climat sec'],
  ],
  menuiserie_ebenisterie: [
    ['x30-mobilier-sur-mesure', 'Mobilier sur mesure', 'Relevé, plan, débit, montage', 'Un meuble sur mesure se construit après relevé précis', 'Débiter sans relevé', 'Bibliothèque encastrée'],
    ['x30-reparation-restauration', 'Réparation et restauration', 'Diagnostic, colle, teinte, finition', 'La restauration respecte le matériau d’origine', 'Poncer une pièce ancienne sans diagnostic', 'Chaise ancienne'],
  ],
  jeu_video_esport: [
    ['x30-narration-univers', 'Narration et univers', 'Lore, personnage, quête, cohérence', 'Un univers de jeu tient par sa cohérence interne', 'Multiplier les éléments sans lien', 'Jeu d’aventure'],
    ['x30-communaute-streaming', 'Communauté et streaming', 'Diffusion, modération, communauté, revenus', 'Une communauté se construit par la régularité', 'Diffuser sans modération', 'Chaîne de jeu'],
  ],
  coiffure_barbier: [
    ['x30-soins-capillaires', 'Soins capillaires', 'Diagnostic, cuir chevelu, masque, protection', 'Un soin se choisit d’après le diagnostic du cuir chevelu', 'Appliquer un soin unique à tous', 'Cheveux secs et cassants'],
    ['x30-gestion-salon', 'Gestion du salon', 'Planning, stocks, hygiène, clientèle', 'Le planning conditionne la rentabilité du salon', 'Prendre des rendez-vous sans marge', 'Salon de quartier'],
  ],
  plomberie_sanitaire: [
    ['x30-chauffe-eau', 'Chauffe-eau et eau chaude', 'Ballon, puissance, sécurité, entretien', 'Le groupe de sécurité protège le ballon de la surpression', 'Supprimer le groupe de sécurité', 'Installation d’un ballon'],
    ['x30-travaux-devis', 'Travaux et devis', 'Métré, fournitures, main-d’œuvre, délais', 'Un devis détaille fournitures et main-d’œuvre', 'Facturer sans devis signé', 'Rénovation de salle de bain'],
  ],
  maintenance_automobile: [
    ['x30-freinage-securite', 'Freinage et sécurité', 'Plaquettes, disques, liquide, ABS', 'Le liquide de frein se contrôle et se remplace périodiquement', 'Ignorer l’usure du liquide', 'Contrôle avant voyage'],
    ['x30-climatisation-auto', 'Climatisation automobile', 'Fluide, compresseur, fuite, recharge', 'Une recharge sans recherche de fuite est inutile', 'Recharger sans tester l’étanchéité', 'Climatisation faible'],
  ],
  soudage_chaudronnerie: [
    ['x30-securite-controle-qualite', 'Sécurité et contrôle qualité', 'EPI, fumées, contrôle, ressuage', 'Un cordon se contrôle avant d’être validé', 'Souder sans contrôle visuel', 'Contrôle d’une soudure'],
    ['x30-structures-metalliques', 'Structures métalliques', 'Assemblage, contreventement, charge, protection', 'Le contreventement stabilise une structure métallique', 'Assembler sans triangulation', 'Charpente métallique'],
  ],
  apiculture_ruche: [
    ['x30-produits-ruche', 'Produits de la ruche', 'Miel, cire, propolis, gelée, conditionnement', 'Chaque produit exige un conditionnement adapté', 'Conditionner sans contrôle d’humidité', 'Pot de miel'],
    ['x30-gestion-rucher', 'Gestion du rucher', 'Emplacement, transhumance, essaimage, prédation', 'Un rucher se déplace selon les floraisons', 'Déplacer sans préparation des ruches', 'Transhumance'],
  ],
  viticulture_oenologie: [
    ['x30-vendanges-vinification', 'Vendanges et vinification', 'Maturité, tri, éraflage, fermentation', 'La date de vendange fixe l’équilibre du vin', 'Vendanger sans contrôle de maturité', 'Récolte de cépage blanc'],
    ['x30-degustation-sensorielle', 'Analyse sensorielle des vins', 'Robe, nez, bouche, équilibre', 'La dégustation se conduit dans un ordre constant', 'Goûter sans ordre ni référence', 'Dégustation comparative'],
  ],
  gemmologie_joaillerie: [
    ['x30-metaux-precieux', 'Métaux précieux', 'Or, argent, platine, titrage, alliage', 'Le titrage garantit la teneur en métal précieux', 'Vendre sans poinçon', 'Alliage d’or 18 carats'],
    ['x30-commerce-estimation', 'Commerce et estimation', 'Expertise, certificat, marge, marché', 'Une estimation s’appuie sur un certificat gemmologique', 'Estimer sans expertise', 'Vente d’un diamant'],
  ],
  protocole_diplomatique: [
    ['x30-correspondance-diplomatique', 'Correspondance diplomatique', 'Note verbale, lettre, formule, ton', 'Chaque type de note a une forme et un ton codifiés', 'Mélanger note verbale et lettre personnelle', 'Note d’invitation'],
    ['x30-reunions-internationales', 'Organisations et réunions internationales', 'Ordre du jour, présidence, quorum, résolution', 'Une réunion internationale suit un règlement intérieur', 'Improviser l’ordre de parole', 'Sommet régional'],
  ],
};
