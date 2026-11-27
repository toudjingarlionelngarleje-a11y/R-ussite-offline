import { ExtensionSubjectModules } from './types';

/**
 * v23.0 — Quatrième vague, pôle droit, économie et gestion (32 matières).
 */
export const GROUP_B_DROIT_ECO: ExtensionSubjectModules = {
  droit: [
    [
      'x23-droit-societes',
      'Droit des sociétés et gouvernance',
      'SARL et SA, organes sociaux, responsabilité des dirigeants, assemblées',
      'La société jouit d’une personnalité morale distincte de celle de ses associés',
      'Confondre l’associé (propriétaire de parts) et le dirigeant (mandataire révocable)',
      'Constitution d’une SARL et répartition des pouvoirs entre gérant et associés',
    ],
  ],
  economie: [
    [
      'x23-economie-monetaire',
      'Monnaie, banques et politique monétaire',
      'Masse monétaire, création monétaire, taux directeur, transmission à l’inflation',
      'La banque centrale agit sur les taux directeurs pour influencer crédit, demande et inflation',
      'Confondre taux directeur et taux d’intérêt débiteur appliqué au client',
      'Effet d’une hausse du taux directeur sur le crédit des PME',
    ],
  ],
  gestion_projet: [
    [
      'x23-risques-projet',
      'Gestion des risques projet',
      'Identification, matrice probabilité/impact, plan de réponse, réserve',
      'Chaque risque retenu reçoit un responsable, une parade et un indicateur de suivi',
      'Lister les risques sans les hiérarchiser ni prévoir de réserve budgétaire',
      'Plan de réponse aux risques d’un projet de forage d’eau',
    ],
  ],
  comptabilite: [
    [
      'x23-analyse-financiere',
      'Analyse financière et ratios',
      'Bilan fonctionnel, liquidité, rentabilité, endettement, fonds de roulement',
      'Le fonds de roulement finance le besoin en fonds de roulement ; l’écart révèle l’équilibre',
      'Interpréter un ratio isolé sans le comparer au secteur ni à l’exercice précédent',
      'Diagnostic financier d’une PME de transformation agroalimentaire',
    ],
  ],
  finances_publiques: [
    [
      'x23-dette-publique',
      'Dette publique et soutenabilité budgétaire',
      'Encours, service de la dette, déficit primaire, ratio dette/PIB',
      'La dette est soutenable si la croissance et l’excédent primaire stabilisent le ratio',
      'Comparer des encours de dette sans normaliser par le PIB',
      'Analyse du ratio dette/PIB d’un pays de la CEMAC',
    ],
  ],
  droit_ohada: [
    [
      'x23-suretes-recouvrement',
      'Sûretés et recouvrement OHADA',
      'Cautionnement, hypothèque, gage, procédures simplifiées de recouvrement',
      'L’injonction de payer suppose une créance certaine, liquide et exigible',
      'Engager une procédure sans vérifier la nature certaine et exigible de la créance',
      'Recouvrement d’une facture impayée par injonction de payer',
    ],
  ],
  relations_inter: [
    [
      'x23-negociations-climat',
      'Négociations multilatérales et accords climat',
      'COP, contributions déterminées au niveau national, financement climat',
      'L’accord de Paris repose sur des contributions volontaires révisables à la hausse',
      'Confondre engagements contraignants et contributions volontaires',
      'Préparation d’une position nationale avant une COP',
    ],
  ],
  logistique_ci: [
    [
      'x23-transport-multimodal',
      'Transport multimodal et passage en douane',
      'Chaîne multimodale, incoterms, documents douaniers, transbordement',
      'Le connaissement engage le transporteur maritime ; l’incoterm répartit coûts et risques',
      'Confondre transfert de risques et transfert de propriété',
      'Acheminement conteneurisé mer-route vers un marché intérieur',
    ],
  ],
  grh_travail: [
    [
      'x23-recrutement-talents',
      'Recrutement et gestion des talents',
      'Fiche de poste, sourcing, entretien structuré, intégration, plan de succession',
      'Un entretien structuré, fondé sur des critères identiques, réduit les biais de recrutement',
      'Recruter sur l’impression générale sans grille d’évaluation commune',
      'Processus de recrutement d’un chef d’équipe logistique',
    ],
  ],
  marketing_entrep: [
    [
      'x23-etude-marche',
      'Étude de marché, segmentation et positionnement',
      'Échantillon, questionnaire, segments, positionnement, marketing mix',
      'Un bon positionnement découle d’un segment choisi et d’un avantage différenciant clair',
      'Segmenter sur des critères non mesurables ou non accessibles',
      'Étude de marché pour un service de livraison à vélo en ville',
    ],
  ],
  droit_penal_proc: [
    [
      'x23-procedure-penale',
      'Procédure pénale et droits de la défense',
      'Garde à vue, instruction, présomption d’innocence, nullités',
      'Toute personne poursuivie est présumée innocente jusqu’à condamnation définitive',
      'Confondre mise en examen et condamnation',
      'Chronologie procédurale d’une affaire correctionnelle',
    ],
  ],
  droit_fiscal_douanes: [
    [
      'x23-tva-contentieux',
      'TVA et contentieux fiscal',
      'TVA collectée et déductible, crédit de TVA, contrôle et recours',
      'TVA due = TVA collectée − TVA déductible ; le crédit se reporte ou se rembourse',
      'Déduire une TVA sans facture conforme ou hors délai',
      'Contrôle de TVA d’un commerçant et rédaction d’un recours',
    ],
  ],
  droit_foncier_environnement: [
    [
      'x23-droit-environnement',
      'Droit de l’environnement et études d’impact',
      'Principe pollueur-payeur, étude d’impact, autorisation environnementale',
      'Tout projet susceptible d’impacts doit faire l’objet d’une étude d’impact préalable',
      'Confondre étude d’impact et simple note d’information',
      'Instruction d’une étude d’impact pour une carrière de granulats',
    ],
  ],
  droit_international_public: [
    [
      'x23-droit-traites',
      'Droit des traités et responsabilité internationale',
      'Négociation, signature, ratification, entrée en vigueur, responsabilité de l’État',
      'Un traité n’engage l’État qu’après ratification selon sa procédure interne',
      'Confondre signature et engagement définitif',
      'Ratification d’un accord commercial régional',
    ],
  ],
  criminologie_securite: [
    [
      'x23-prevention-situationnelle',
      'Prévention situationnelle et sécurité urbaine',
      'Espaces défendables, éclairage, vidéoprotection, approche par le problème',
      'La prévention situationnelle agit sur l’occasion et l’environnement, pas sur la personne',
      'Confondre prévention situationnelle et répression',
      'Diagnostic de sécurité d’un marché urbain',
    ],
  ],
  droit_assurances_cima: [
    [
      'x23-assurance-sante',
      'Assurance santé et règlement des sinistres',
      'Contrat, garanties, franchise, tiers payant, déclaration de sinistre',
      'L’indemnité couvre le préjudice dans la limite des garanties, franchise déduite',
      'Oublier le délai de déclaration ou la franchise dans l’évaluation',
      'Traitement d’un dossier d’hospitalisation en assurance santé',
    ],
  ],
  audit_controle_interne: [
    [
      'x23-fraude-echantillonnage',
      'Fraude et échantillonnage en audit',
      'Sondage statistique, seuil de signification, indices de fraude, documentation',
      'L’échantillon doit être représentatif et la conclusion reste probabiliste',
      'Généraliser un résultat d’échantillon sans marge ni test complémentaire',
      'Audit des achats d’une entreprise présentant des doubles factures',
    ],
  ],
  econometrie_prevision: [
    [
      'x23-var-prevision',
      'Modèles VAR et prévision macroéconomique',
      'Variables endogènes, causalité de Granger, réponse impulsionnelle, stationnarité',
      'Un VAR doit être estimé sur des séries stationnaires ou cointégrées',
      'Régression sur séries non stationnaires sans test préalable (régressions fallacieuses)',
      'Prévision conjointe inflation-croissance pour une banque centrale',
    ],
  ],
  economie_developpement: [
    [
      'x23-migrations-transferts',
      'Migrations et transferts de fonds',
      'Causes migratoires, transferts, coûts de transaction, effets de développement',
      'Les transferts soutiennent la consommation mais ne remplacent pas l’investissement productif',
      'Confondre transferts (revenus) et investissements directs',
      'Étude d’impact des transferts de la diaspora sur les ménages ruraux',
    ],
  ],
  negociation_commerce_b2b: [
    [
      'x23-appels-offres',
      'Appels d’offres et contrats commerciaux',
      'Cahier des charges, critères d’évaluation, clauses, garanties',
      'La conformité technique se vérifie avant le prix : une offre non conforme est écartée',
      'Répondre sur le prix en négligeant une exigence éliminatoire du cahier des charges',
      'Réponse à un appel d’offres de fourniture de matériel informatique',
    ],
  ],
  qualite_hse_iso: [
    [
      'x23-iso-45001',
      'Santé et sécurité au travail (ISO 45001)',
      'Danger, risque, évaluation, EPI, plan de prévention',
      'Le risque s’évalue par la gravité et la probabilité, avant toute action de réduction',
      'Distribuer des EPI sans évaluer le risque à la source',
      'Mise en place d’un plan de prévention sur un chantier',
    ],
  ],
  finance_marches_banque: [
    [
      'x23-gestion-portefeuille',
      'Gestion de portefeuille et mesure du risque',
      'Diversification, volatilité, bêta, VaR, allocation d’actifs',
      'La diversification réduit le risque spécifique, pas le risque de marché',
      'Confondre volatilité (risque) et rendement espéré',
      'Allocation d’un portefeuille obligataire pour une caisse de retraite',
    ],
  ],
  fintech_microfinance: [
    [
      'x23-scoring-credit',
      'Scoring de crédit et inclusion financière',
      'Données alternatives, score, seuil, taux de défaut, biais de sélection',
      'Un score se juge sur sa capacité de discrimination et sa stabilité dans le temps',
      'Fixer un seuil sans analyser le coût des faux positifs et faux négatifs',
      'Scoring de microcrédits pour des commerçantes non bancarisées',
    ],
  ],
  trading_marches: [
    [
      'x23-analyse-technique',
      'Analyse technique et gestion du risque',
      'Tendances, supports et résistances, indicateurs, taille de position',
      'La taille de position se déduit du risque accepté et de la distance au stop',
      'Trader sans stop ou augmenter la taille après une perte',
      'Plan de trading avec stop et objectif sur une devise',
    ],
  ],
  commerce_maritime: [
    [
      'x23-chaine-portuaire',
      'Chaîne portuaire et manutention',
      'Terminal, grue, productivité, escale, surestaries',
      'La productivité d’un terminal se mesure en mouvements par heure de navire à quai',
      'Confondre surestaries (pénalité) et frais de stockage',
      'Organisation de l’escale d’un porte-conteneurs',
    ],
  ],
  gestion_crises: [
    [
      'x23-continuite-activite',
      'Plan de continuité et exercices de crise',
      'Analyse d’impact, RTO/RPO, cellule de crise, exercice de simulation',
      'Le plan de continuité se construit sur les activités critiques et leurs délais de reprise',
      'Écrire un plan sans le tester par un exercice de crise',
      'Exercice de simulation d’une coupure électrique prolongée',
    ],
  ],
  ethique_gouvernance: [
    [
      'x23-transparence',
      'Transparence et reddition de comptes',
      'Publication, conflits d’intérêts, audit indépendant, redevabilité',
      'La redevabilité suppose des informations vérifiables et un contrôle indépendant',
      'Publier des données sans mécanisme de vérification',
      'Rapport annuel d’une régie publique de l’eau',
    ],
  ],
  sciences_politiques: [
    [
      'x23-regimes-compares',
      'Régimes politiques comparés',
      'Régimes parlementaire, présidentiel, semi-présidentiel, séparation des pouvoirs',
      'Le régime se caractérise par la responsabilité politique de l’exécutif devant le législatif',
      'Confondre élection du président et régime présidentiel',
      'Comparaison de deux constitutions africaines',
    ],
  ],
  educ_civique: [
    [
      'x23-participation-citoyenne',
      'Institutions et participation citoyenne',
      'Décentralisation, conseil municipal, budget participatif, société civile',
      'La participation citoyenne s’exerce dans les cadres institutionnels prévus par la loi',
      'Confondre démocratie participative et consultation facultative',
      'Budget participatif d’une commune',
    ],
  ],
  culture_gen: [
    [
      'x23-histoire-sciences',
      'Grandes découvertes et histoire des sciences',
      'Révolutions scientifiques, méthode expérimentale, diffusion des savoirs',
      'Une découverte scientifique se valide par la reproduction et la critique par les pairs',
      'Attribuer une découverte à un seul savant en ignorant les travaux antérieurs',
      'Récit de la découverte de la vaccination',
    ],
  ],
  methodo_redaction: [
    [
      'x23-note-synthese',
      'Note de synthèse et synthèse de documents',
      'Corpus documentaire, plan de synthèse, reformulation, neutralité',
      'La note de synthèse reformule sans citer ni ajouter d’idée extérieure au corpus',
      'Recopier des passages ou introduire un avis personnel',
      'Synthèse de trois rapports sur la gestion des déchets',
    ],
  ],
  psychotechnique: [
    [
      'x23-tests-spatiaux',
      'Tests spatiaux et raisonnement abstrait',
      'Rotations mentales, pliages, matrices, suites logiques',
      'Repérer la transformation élémentaire (rotation, symétrie, ajout) avant de répondre',
      'Répondre à l’intuition sans vérifier la règle de transformation',
      'Batterie de tests d’un concours administratif',
    ],
  ],
};
