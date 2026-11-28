import { ExtensionSubjectModules } from './types';

/**
 * v21.0 — Troisième vague santé, numérique, ingénierie et territoires (25 matières).
 */
export const GROUP_C_SANTE_TECH: ExtensionSubjectModules = {
  sante_publique: [
    [
      'x21-hygiene-assainissement',
      'Hygiène, eau et assainissement en santé publique',
      'Eau potable, latrines, lavage des mains et maladies hydriques',
      'La séparation des eaux usées et de l’eau de boisson est la première barrière sanitaire',
      'Stocker l’eau potable dans un récipient non couvert',
      'Programme WASH dans un village de 2 000 habitants',
    ],
  ],
  anatomie_physio: [
    [
      'x21-appareil-locomoteur',
      'Appareil locomoteur et biomécanique',
      'Os, articulations, muscles et leviers',
      'Un muscle exerce une force de traction : il ne pousse jamais',
      'Décrire un mouvement sans préciser l’articulation et le muscle agoniste',
      'Analyse biomécanique de la marche',
    ],
  ],
  pharmacologie: [
    [
      'x21-medicaments-essentiels',
      'Médicaments essentiels et politique pharmaceutique',
      'Liste nationale, chaîne d’approvisionnement et bon usage',
      'Un médicament essentiel répond à un besoin prioritaire de santé publique',
      'Recommander une molécule hors liste sans justification clinique',
      'Gestion des ruptures de stock d’antipaludiques',
    ],
  ],
  medecine_clinique: [
    [
      'x21-paludisme',
      'Infectiologie tropicale et paludisme',
      'Cycle du plasmodium, diagnostic et traitement du paludisme grave',
      'Tout accès fébrile en zone d’endémie doit être testé avant traitement',
      'Traiter à l’aveugle sans test de diagnostic rapide ni frottis',
      'Prise en charge d’un paludisme grave chez l’enfant',
    ],
  ],
  obstetrique_pediatrie: [
    [
      'x21-neonatologie',
      'Néonatologie et soins du nouveau-né',
      'Adaptation à la vie extra-utérine, allaitement et soins kangourou',
      'Le peau-à-peau immédiat réduit l’hypothermie et la mortalité néonatale',
      'Séparer le nouveau-né de sa mère sans nécessité médicale',
      'Soins d’un nouveau-né de faible poids',
    ],
  ],
  soins_infirmiers: [
    [
      'x21-plaies-pansements',
      'Plaies, pansements et prévention des infections',
      'Cicatrisation, type de pansement et asepsie',
      'Un pansement se choisit selon le stade de cicatrisation et l’exsudat',
      'Réutiliser un pansement ou changer de type sans réévaluer la plaie',
      'Soin d’une plaie chronique chez un diabétique',
    ],
  ],
  microbiologie_biomed: [
    [
      'x21-parasitologie',
      'Parasitologie et maladies tropicales négligées',
      'Plasmodium, helminthes, diagnostic et prévention',
      'La recherche de parasites dépend du cycle : heure de prélèvement et nature du specimen',
      'Conclure sur un seul examen négatif pour un parasite à cycle intermittent',
      'Diagnostic d’une bilharziose chez un écolier',
    ],
  ],
  chirurgie_traumatologie: [
    [
      'x21-anesthesie-reanimation',
      'Anesthésie, réanimation et gestion de la douleur',
      'Pré-anesthésie, jeûne, monitoring et réveil',
      'L’évaluation pré-anesthésique conditionne le choix de la technique',
      'Opérer sans consultation pré-anesthésique documentée',
      'Prise en charge péri-opératoire d’une urgence abdominale',
    ],
  ],
  odontologie_stomato: [
    [
      'x21-orthodontie',
      'Orthodontie et croissance maxillo-faciale',
      'Classe d’Angle, croissance, appareils et rétention',
      'Le traitement orthodontique doit tenir compte de la croissance résiduelle du patient',
      'Poser un appareil sans analyse de la croissance',
      'Traitement d’un encombrement dentaire chez l’adolescent',
    ],
  ],
  sante_mentale_psychiatrie: [
    [
      'x21-psychopathologie-enfant',
      'Psychopathologie de l’enfant et de l’adolescent',
      'Troubles du développement, anxiété et conduites à risque',
      'Un symptôme chez l’enfant s’interprète toujours dans son contexte familial et scolaire',
      'Poser un diagnostic lourd sur un seul entretien',
      'Évaluation d’un enfant en échec scolaire',
    ],
  ],
  nutrition_sante: [
    [
      'x21-maladies-chroniques',
      'Alimentation et maladies chroniques',
      'Diabète, hypertension, obésité et éducation nutritionnelle',
      'La réduction des sucres libres et du sel améliore le contrôle des maladies chroniques',
      'Interdire brutalement un aliment sans proposition de remplacement',
      'Accompagnement nutritionnel d’un patient diabétique',
    ],
  ],
  psychologie_cog: [
    [
      'x21-psychologie-sociale',
      'Psychologie sociale et dynamique de groupe',
      'Conformisme, influence, leadership et conflits',
      'Le conformisme augmente avec l’unanimité apparente du groupe',
      'Confondre obéissance à l’autorité et adhésion personnelle',
      'Analyse d’un conflit dans une équipe pédagogique',
    ],
  ],
  pedagogie: [
    [
      'x21-tice-classe',
      'Intégration des TICE en classe',
      'Scénarisation, outils, fracture numérique et évaluation',
      'Un outil numérique n’améliore l’apprentissage que s’il sert un objectif pédagogique précis',
      'Introduire une application sans scénario ni retour d’évaluation',
      'Séquence de géométrie avec tablette hors ligne',
    ],
  ],
  cybersecurite: [
    [
      'x21-iam-cloud',
      'Gestion des identités et sécurité du cloud',
      'Authentification forte, moindre privilège, IAM et chiffrement',
      'Le principe du moindre privilège limite chaque compte au strict nécessaire',
      'Accorder un accès administrateur global pour aller plus vite',
      'Refonte des accès d’une plateforme éducative',
    ],
  ],
  data_ia: [
    [
      'x21-pipelines-bigdata',
      'Big data et pipelines de données',
      'Ingestion, traitement distribué, qualité et orchestration',
      'Un pipeline fiable valide les schémas et alerte sur les ruptures de volume',
      'Traiter des données sans contrôle de qualité ni versionnage',
      'Pipeline quotidien de données scolaires',
    ],
  ],
  bases_donnees_bigdata: [
    [
      'x21-admin-securite-bdd',
      'Administration et sécurité des bases de données',
      'Rôles, sauvegardes, chiffrement et journalisation',
      'Une sauvegarde n’est valide qu’après un test de restauration documenté',
      'Sauvegarder sans jamais tester la restauration',
      'Plan de reprise d’une base de 500 Go',
    ],
  ],
  genie_logiciel_devops: [
    [
      'x21-sre-observabilite',
      'Observabilité et fiabilité (SRE)',
      'SLI, SLO, budgets d’erreur et post-mortem',
      'Un budget d’erreur se consomme : il arbitre entre vitesse et stabilité',
      'Ignorer les incidents récurrents faute d’alerte exploitable',
      'Objectifs de fiabilité d’une API de paiement',
    ],
  ],
  developpement_mobile_web: [
    [
      'x21-securite-front',
      'Sécurité front, CSP et bonnes pratiques',
      'XSS, CSP, stockage local et dépendances',
      'Une CSP restrictive réduit fortement la surface d’attaque XSS',
      'Stocker un jeton d’authentification en clair dans le localStorage',
      'Audit d’une PWA de messagerie',
    ],
  ],
  design_ux_infographie: [
    [
      'x21-accessibilite-design',
      'Accessibilité numérique et design inclusif',
      'WCAG, lecteurs d’écran, contrastes et navigation clavier',
      'Un contenu doit être perceptible, utilisable, compréhensible et robuste (WCAG)',
      'Utiliser la couleur seule pour transmettre une information',
      'Mise en accessibilité d’un formulaire d’inscription',
    ],
  ],
  iot_systemes_embarques: [
    [
      'x21-lora-terrain',
      'Réseaux LoRa et déploiement terrain',
      'LoRaWAN, budget de liaison, duty cycle et portée',
      'La portée LoRa dépend du gain d’antenne, de la hauteur et des obstacles',
      'Dépasser le duty cycle réglementaire en augmentant la fréquence d’envoi',
      'Réseau de capteurs agricoles sur 20 km',
    ],
  ],
  reseaux_telecoms: [
    [
      'x21-securite-reseau',
      'Sécurité réseau et pare-feux',
      'Segmentation, DMZ, VPN, IDS et durcissement',
      'Une segmentation réseau limite la propagation d’un incident',
      'Exposer un serveur d’administration directement sur Internet',
      'Durcissement d’un réseau d’établissement scolaire',
    ],
  ],
  aeronautique_meteo: [
    [
      'x21-meteo-tropicale',
      'Météorologie tropicale et saison des pluies',
      'Convection, orages, harmattan et visibilité',
      'Un orage tropical se développe vite : la cellule orageuse doit être contournée largement',
      'Traverser un cumulonimbus en pensant gagner du temps',
      'Préparation d’un vol pendant l’harmattan',
    ],
  ],
  urbanisme_sig: [
    [
      'x21-dechets-urbains',
      'Assainissement urbain et gestion des déchets',
      'Collecte, décharge, valorisation et plan de propreté',
      'Le tri à la source conditionne la valorisation : sans tri, pas de recyclage rentable',
      'Ouvrir une décharge sans étude d’impact ni gestion du lixiviat',
      'Plan de gestion des déchets d’une ville de 500 000 habitants',
    ],
  ],
  architecture_design: [
    [
      'x21-restauration-patrimoine',
      'Restauration du patrimoine bâti',
      'Diagnostic, matériaux compatibles et réversibilité',
      'La restauration privilégie des matériaux compatibles et des interventions réversibles',
      'Rejointoyer à la chaux un mur ancien avec du ciment étanche',
      'Réhabilitation d’un bâtiment colonial en terre',
    ],
  ],
  trading_marches: [
    [
      'x21-backtesting',
      'Algorithmes de trading et backtesting',
      'Sur-optimisation, coûts de transaction et robustesse',
      'Un backtest sans coûts de transaction ni données hors échantillon est illusoire',
      'Optimiser les paramètres sur tout l’historique disponible',
      'Validation d’une stratégie de suivi de tendance',
    ],
  ],
};
