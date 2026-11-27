import { ExtensionSubjectModules } from './types';

/**
 * v23.0 — Quatrième vague, pôle santé, numérique et technologies (25 matières).
 */
export const GROUP_C_SANTE_TECH: ExtensionSubjectModules = {
  sante_publique: [
    [
      'x23-epidemiologie',
      'Épidémiologie et surveillance des maladies',
      'Incidence, prévalence, taux d’attaque, dépistage, surveillance sentinelle',
      'L’incidence mesure les nouveaux cas ; la prévalence compte tous les cas à un instant donné',
      'Confondre incidence et prévalence dans l’interprétation d’une épidémie',
      'Investigation d’une flambée de rougeole dans un camp',
    ],
  ],
  anatomie_physio: [
    [
      'x23-systeme-endocrinien',
      'Système endocrinien et régulation hormonale',
      'Glandes, hormones, axe hypothalamo-hypophysaire, rétrocontrôle',
      'La sécrétion hormonale est régulée par un rétrocontrôle négatif sur l’axe central',
      'Confondre hormone (messager) et enzyme (catalyseur) dans l’analyse d’un bilan',
      'Interprétation d’un bilan thyroïdien perturbé',
    ],
  ],
  pharmacologie: [
    [
      'x23-interactions-medicamenteuses',
      'Interactions médicamenteuses et iatrogénie',
      'Inducteurs et inhibiteurs enzymatiques, effets additifs, marge thérapeutique',
      'Deux médicaments à marge étroite exposent à une interaction cliniquement majeure',
      'Additionner les effets sans vérifier le métabolisme hépatique commun',
      'Ordonnance d’un patient sous anticoagulant et antibiotique',
    ],
  ],
  medecine_clinique: [
    [
      'x23-insuffisance-cardiaque',
      'Insuffisance cardiaque et urgences cardiologiques',
      'Dyspnée, œdèmes, fraction d’éjection, diurétiques, signes de gravité',
      'Le diagnostic repose sur les symptômes, l’examen et la confirmation par échocardiographie',
      'Traiter un œdème sans rechercher le signe de gravité respiratoire',
      'Prise en charge initiale d’une décompensation cardiaque',
    ],
  ],
  obstetrique_pediatrie: [
    [
      'x23-suivi-grossesse',
      'Suivi de grossesse et dépistage prénatal',
      'Calendrier des consultations, échographies, sérologies, facteurs de risque',
      'Trois échographies sont recommandées aux premier, deuxième et troisième trimestres',
      'Omettre la datation échographique précoce et fausser le terme',
      'Programme de suivi d’une primigeste en zone rurale',
    ],
  ],
  soins_infirmiers: [
    [
      'x23-soins-palliatifs',
      'Soins palliatifs et prise en charge de la douleur',
      'Évaluation de la douleur, paliers analgésiques, soins de confort, accompagnement',
      'La douleur s’évalue avec une échelle adaptée et se réévalue après chaque traitement',
      'Sous-évaluer la douleur faute d’échelle ou de réévaluation',
      'Plan de soins d’un patient en phase palliative à domicile',
    ],
  ],
  microbiologie_biomed: [
    [
      'x23-bacteriologie',
      'Bactériologie et antibiorésistance',
      'Coloration de Gram, culture, antibiogramme, résistances',
      'L’antibiogramme oriente le choix de l’antibiotique et limite l’émergence de résistances',
      'Prescrire un antibiotique à large spectre sans prélèvement préalable',
      'Interprétation d’un antibiogramme d’une infection urinaire',
    ],
  ],
  chirurgie_traumatologie: [
    [
      'x23-fractures-immobilisation',
      'Fractures et immobilisation',
      'Mécanisme, signes de fracture, immobilisation, complications',
      'Toute suspicion de fracture impose immobilisation et contrôle radiologique',
      'Négliger la recherche de complication vasculo-nerveuse',
      'Immobilisation d’une fracture de l’avant-bras aux urgences',
    ],
  ],
  odontologie_stomato: [
    [
      'x23-carie-soins',
      'Carie et soins conservateurs',
      'Lésions carieuses, déminéralisation, amalgame/composite, prévention fluorée',
      'La carie se traite d’autant plus simplement qu’elle est détectée tôt',
      'Attendre la douleur pour traiter une lésion encore réversible',
      'Programme de prévention bucco-dentaire en école primaire',
    ],
  ],
  sante_mentale_psychiatrie: [
    [
      'x23-troubles-anxieux',
      'Troubles anxieux et addictions',
      'Anxiété généralisée, attaque de panique, dépendance, sevrage',
      'L’addiction associe dépendance physique, psychique et perte de contrôle',
      'Confondre usage nocif et dépendance avérée',
      'Accompagnement d’un jeune adulte en sevrage tabagique',
    ],
  ],
  nutrition_sante: [
    [
      'x23-nutrition-mere-enfant',
      'Nutrition de la mère et du jeune enfant',
      'Allaitement, diversification, besoins nutritionnels, supplémentation',
      'L’allaitement exclusif est recommandé jusqu’à six mois, puis la diversification',
      'Diversifier trop tôt ou trop tard sans tenir compte des signes de maturité',
      'Conseil nutritionnel en consultation prénatale',
    ],
  ],
  psychologie_cog: [
    [
      'x23-memoire-attention',
      'Mémoire, attention et apprentissage',
      'Mémoire de travail, attention sélective, consolidation, oubli',
      'La récupération active en espacement consolide mieux que la relecture',
      'Confondre reconnaissance (facile) et rappel (exigeant)',
      'Protocole de révision pour des élèves de terminale',
    ],
  ],
  pedagogie: [
    [
      'x23-evaluation-formation',
      'Évaluation formative et différenciation',
      'Objectifs, critères de réussite, feedback, différenciation pédagogique',
      'Une évaluation formative sert à réguler l’apprentissage, pas à classer',
      'Confondre évaluation formative et sommative dans la note finale',
      'Grille d’évaluation critériée d’un exposé',
    ],
  ],
  cybersecurite: [
    [
      'x23-cryptographie-pki',
      'Cryptographie appliquée et PKI',
      'Chiffrement symétrique/asymétrique, certificats, AC, signature',
      'La cryptographie asymétrique échange la clé ; la symétrique chiffre les données en volume',
      'Confondre signature (authenticité) et chiffrement (confidentialité)',
      'Déploiement d’une PKI interne pour un intranet',
    ],
  ],
  data_ia: [
    [
      'x23-apprentissage-supervise',
      'Apprentissage supervisé et évaluation des modèles',
      'Jeu d’entraînement/test, surapprentissage, précision/rappel, validation croisée',
      'Un modèle s’évalue sur des données non vues, jamais sur son jeu d’entraînement',
      'Choisir un modèle sur la seule exactitude en cas de classes déséquilibrées',
      'Modèle de détection de fraude sur transactions mobiles',
    ],
  ],
  bases_donnees_bigdata: [
    [
      'x23-optimisation-sql',
      'Modélisation et optimisation SQL',
      'Clés, index, plans d’exécution, jointures, normalisation',
      'Un index accélère la lecture mais ralentit les écritures : il se choisit selon l’usage',
      'Créer des index sans examiner le plan d’exécution',
      'Optimisation d’une requête de gestion des notes scolaires',
    ],
  ],
  genie_logiciel_devops: [
    [
      'x23-tests-qualite',
      'Tests logiciels et qualité',
      'Tests unitaires, intégration, non-régression, couverture, revue de code',
      'La pyramide des tests privilégie de nombreux tests unitaires rapides',
      'Confondre couverture de code et absence de bugs',
      'Stratégie de tests d’une application de gestion de stock',
    ],
  ],
  developpement_mobile_web: [
    [
      'x23-pwa-hors-ligne',
      'PWA et stockage hors ligne',
      'Service worker, cache, IndexedDB, synchronisation différée',
      'Le service worker intercepte les requêtes et sert le cache lorsque le réseau manque',
      'Mettre en cache sans stratégie de mise à jour ni versionnement',
      'Application de terrain fonctionnant sans réseau',
    ],
  ],
  design_ux_infographie: [
    [
      'x23-prototypage-utilisateur',
      'Prototypage et tests utilisateurs',
      'Wireframe, prototype, test à cinq utilisateurs, itération',
      'Cinq utilisateurs suffisent à révéler la majorité des problèmes d’usage majeurs',
      'Tester sur des collègues experts au lieu des utilisateurs cibles',
      'Test d’un parcours d’inscription mobile',
    ],
  ],
  reseaux_telecoms: [
    [
      'x23-reseaux-mobiles',
      'Réseaux mobiles 4G/5G et radio',
      'Cellules, fréquences, handover, débit, couverture',
      'La couverture dépend de la fréquence : basse fréquence = portée, haute = débit',
      'Confondre débit théorique et débit utile réel',
      'Dimensionnement radio d’une zone périurbaine',
    ],
  ],
  aeronautique_meteo: [
    [
      'x23-navigation-securite-vols',
      'Navigation aérienne et sécurité des vols',
      'Cap, route, dérive, procédures, minimums météo',
      'La route vraie tient compte de la dérive due au vent',
      'Confondre cap et route dans le calcul de navigation',
      'Préparation d’un vol régional avec vent traversier',
    ],
  ],
  urbanisme_sig: [
    [
      'x23-foncier-urbain',
      'Foncier urbain et aménagement opérationnel',
      'Titres fonciers, lotissement, viabilisation, densification',
      'Aucune construction ne précède la viabilisation et la sécurisation du titre foncier',
      'Délivrer un permis sur un terrain non titré ou non viabilisé',
      'Montage d’un lotissement communal de 200 parcelles',
    ],
  ],
  architecture_design: [
    [
      'x23-conception-bioclimatique',
      'Conception bioclimatique et matériaux',
      'Orientation, inertie thermique, ventilation naturelle, matériaux locaux',
      'L’orientation et la ventilation naturelle priment sur la climatisation active',
      'Concevoir sans tenir compte de l’ensoleillement et des vents dominants',
      'Esquisse d’une école bioclimatique en zone sahélienne',
    ],
  ],
  iot_systemes_embarques: [
    [
      'x23-temps-reel-rtos',
      'Systèmes temps réel et RTOS',
      'Ordonnancement, latence, priorités, interblocage',
      'Un système temps réel garantit une échéance, pas nécessairement une vitesse élevée',
      'Confondre rapidité moyenne et respect des échéances critiques',
      'Commande d’un système d’arrosage automatique',
    ],
  ],
  droit_numerique: [
    [
      'x23-donnees-personnelles',
      'Protection des données personnelles',
      'Données personnelles, base légale, consentement, droits des personnes, responsable de traitement',
      'Tout traitement de données personnelles exige une base légale et une finalité déterminée',
      'Collecter des données sans finalité ni durée de conservation définies',
      'Mise en conformité d’un fichier d’élèves',
    ],
  ],
};
