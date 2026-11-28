import { ExtensionSubjectModules } from './types';

/**
 * v19.0 — Approfondissements santé, numérique, ingénierie et territoires (25 matières).
 */
export const GROUP_C_SANTE_TECH: ExtensionSubjectModules = {
  sante_publique: [
    [
      'x19-surveillance-epidemiologique',
      'Surveillance épidémiologique et riposte aux épidémies',
      'Taux d’attaque, R0, seuil d’immunité collective et système d’alerte précoce',
      'Seuil d’immunité collective = 1 − 1/R0 pour une maladie à transmission homogène',
      'Confondre létalité (décès/cas) et mortalité (décès/population)',
      'Riposte à une épidémie de choléra dans un camp de déplacés',
    ],
  ],
  anatomie_physio: [
    [
      'x19-homeostasie',
      'Homéostasie, régulation neuro-endocrinienne et équilibre hydro-électrolytique',
      'Boucles de rétroaction, osmolarité et équilibre acido-basique',
      'Le pH artériel normal (7,38–7,42) est maintenu par les tampons, la respiration et le rein',
      'Interpréter un trouble respiratoire comme métabolique sans lire la PaCO₂',
      'Déshydratation sévère d’un enfant en période de forte chaleur',
    ],
  ],
  pharmacologie: [
    [
      'x19-pharmacocinetique',
      'Pharmacocinétique, interactions et bon usage du médicament',
      'ADME, demi-vie, biodisponibilité et index thérapeutique',
      'La concentration à l’équilibre est atteinte après environ 5 demi-vies',
      'Adapter une posologie sans tenir compte de la fonction rénale ou des interactions',
      'Adaptation d’un antibiotique chez un insuffisant rénal',
    ],
  ],
  medecine_clinique: [
    [
      'x19-raisonnement-diagnostique',
      'Raisonnement diagnostique, probabilités et erreurs médicales',
      'Sensibilité, spécificité, valeurs prédictives et diagnostic différentiel',
      'La valeur prédictive positive dépend de la prévalence : un test sensible ne suffit pas à confirmer',
      'Confondre sensibilité d’un examen et probabilité réelle de maladie',
      'Fièvre prolongée chez un patient revenu de zone d’endémie palustre',
    ],
  ],
  obstetrique_pediatrie: [
    [
      'x19-urgences-obstetricales',
      'Urgences obstétricales et soins essentiels du nouveau-né',
      'Hémorragie du post-partum, pré-éclampsie et score d’Apgar',
      'Une HPP se traite par utérotoniques, massage utérin et remplissage : chaque minute compte',
      'Attendre la confirmation biologique avant d’agir devant une pré-éclampsie sévère',
      'Prise en charge d’une hémorragie après accouchement à domicile',
    ],
  ],
  soins_infirmiers: [
    [
      'x19-qualite-soins',
      'Qualité et sécurité des soins, calculs de doses et hygiène',
      'Calcul de dose, dilution, précautions standard et check-list',
      'Dose = (concentration disponible × volume prescrit) / dose prescrite, contrôlée à deux soignants',
      'Négliger la double vérification lors d’un calcul de dose pédiatrique',
      'Préparation d’une perfusion d’antibiotique en pédiatrie',
    ],
  ],
  microbiologie_biomed: [
    [
      'x19-antibioresistance',
      'Antibiorésistance, antibiogramme et hygiène hospitalière',
      'CMI, mécanismes de résistance et précautions complémentaires',
      'Un antibiogramme se lit en CMI et en diamètre d’inhibition selon les recommandations CASFM',
      'Traiter une infection virale par antibiotique et favoriser l’émergence de résistances',
      'Épidémie d’infections nosocomiales en service de réanimation',
    ],
  ],
  chirurgie_traumatologie: [
    [
      'x19-traumatisme-grave',
      'Traumatisé grave, triage et Damage Control',
      'ABC du traumatisé, choc hémorragique et immobilisation rachidienne',
      'Priorité ABCDE : hémorragie exsanguinante contrôlée avant toute exploration diagnostique',
      'Réaliser une imagerie prolongée avant de stabiliser un patient instable',
      'Polytraumatisé après accident de la route',
    ],
  ],
  odontologie_stomato: [
    [
      'x19-prevention-bucco',
      'Prévention bucco-dentaire, parodontopathies et urgences',
      'Indice CAO, maladie parodontale et urgences infectieuses',
      'Le brossage au fluor et le scellement des sillons réduisent fortement la carie chez l’enfant',
      'Prescrire un antibiotique sans drainage en cas d’abcès dentaire',
      'Campagne de prévention dans une école primaire',
    ],
  ],
  sante_mentale_psychiatrie: [
    [
      'x19-crise-psychiatrique',
      'Crise psychiatrique, évaluation du risque et désinstitutionalisation',
      'Risque suicidaire, agitation, alliance thérapeutique et droits du patient',
      'Toute idéation suicidaire doit être évaluée en entretien structuré, sans banalisation',
      'Confondre souffrance réactionnelle et trouble psychotique sans évaluation longitudinale',
      'Accueil d’un adolescent en rupture scolaire avec idées noires',
    ],
  ],
  nutrition_sante: [
    [
      'x19-nutrition-communautaire',
      'Nutrition communautaire, malnutrition aiguë et sécurité alimentaire',
      'Indice de masse corporelle, PB/MUAC, protocoles PCIMA et fortification',
      'La malnutrition aiguë sévère se dépiste par le périmètre brachial et se traite par ATLU',
      'Confondre malnutrition aiguë et retard de croissance chronique (faible taille pour l’âge)',
      'Prise en charge de la malnutrition dans un centre nutritionnel',
    ],
  ],
  psychologie_cog: [
    [
      'x19-metacognition',
      'Métacognition, charge cognitive et motivation scolaire',
      'Charge cognitive, auto-efficacité et stratification des apprentissages',
      'La pratique de récupération (testing) est plus efficace que la relecture répétée',
      'Confondre familiarité (impression de savoir) et récupération effective en mémoire',
      'Atelier de méthode pour des élèves en difficulté en 3e',
    ],
  ],
  pedagogie: [
    [
      'x19-evaluation-competences',
      'Évaluation par compétences, différenciation et remédiation',
      'Référentiel de compétences, critères de réussite et évaluation formative',
      'Une évaluation par compétences exige des critères explicites et des niveaux de maîtrise',
      'Noter une production sans critères annoncés ni remédiation associée',
      'Conception d’une séquence APC en classe de 4e',
    ],
  ],
  cybersecurite: [
    [
      'x19-reponse-incident',
      'Réponse à incident, forensic et sécurité offensive éthique',
      'Cadre NIST, triage, confinement, chaîne de preuve et tests d’intrusion',
      'Un incident se traite dans l’ordre : identifier, contenir, éradiquer, restaurer, tirer les leçons',
      'Éteindre brutalement une machine compromise en détruisant les preuves volatiles',
      'Attaque par rançongiciel dans un service hospitalier',
    ],
  ],
  data_ia: [
    [
      'x19-ml-production',
      'Machine learning en production, dérive et éthique des modèles',
      'Validation croisée, sur-apprentissage, données déséquilibrées et MLOps',
      'Un modèle doit être évalué sur un jeu de test jamais utilisé, avec des métriques adaptées',
      'Optimiser l’exactitude sur des classes déséquilibrées au détriment du rappel',
      'Détection de fraude sur des transactions mobile money',
    ],
  ],
  bases_donnees_bigdata: [
    [
      'x19-optimisation-sql',
      'Optimisation SQL, indexation et entrepôts de données',
      'Plans d’exécution, index composites, partitionnement et modélisation en étoile',
      'Un index composite n’est utilisable que si la requête filtre sur son préfixe gauche',
      'Créer des index sans mesurer le coût d’écriture et d’espace',
      'Accélération d’un état de paie sur 8 millions de lignes',
    ],
  ],
  genie_logiciel_devops: [
    [
      'x19-architecture-resiliente',
      'Architecture résiliente, tests automatisés et déploiement continu',
      'Contrats d’API, tests unitaires/intégration, CI/CD et observabilité',
      'Une chaîne CI/CD saine bloque toute fusion si les tests ou l’analyse statique échouent',
      'Déployer sans sauvegarde ni stratégie de retour arrière',
      'Mise en production d’une plateforme de gestion scolaire',
    ],
  ],
  developpement_mobile_web: [
    [
      'x19-performance-pwa',
      'Performance web, accessibilité et hors-ligne avancé',
      'Core Web Vitals, service worker, IndexedDB et stratégies de cache',
      'Une PWA hors ligne fiable privilégie le cache-first pour les assets et le réseau pour les données',
      'Mettre tous les fichiers en cache-first, ce qui bloque toute mise à jour',
      'Portail de révision consultable sans réseau en zone rurale',
    ],
  ],
  design_ux_infographie: [
    [
      'x19-design-systeme',
      'Design system, tests utilisateurs et accessibilité',
      'Composants réutilisables, contraste, typographie et parcours utilisateur',
      'Un contraste texte/fond d’au moins 4,5:1 est requis pour l’accessibilité AA',
      'Choisir des couleurs esthétiques sans vérifier le contraste ni la lisibilité mobile',
      'Refonte de l’interface d’inscription d’une application éducative',
    ],
  ],
  iot_systemes_embarques: [
    [
      'x19-iot-securise',
      'IoT sécurisé, protocoles et gestion de l’énergie',
      'MQTT, LoRaWAN, chiffrement des échanges et budget énergétique',
      'Le cycle de service d’un capteur autonome est dominé par le temps de veille et le coût radio',
      'Exposer un broker MQTT sans authentification ni chiffrement',
      'Réseau de capteurs d’humidité des sols alimentés au solaire',
    ],
  ],
  reseaux_telecoms: [
    [
      'x19-ingenierie-reseau',
      'Ingénierie réseau, QoS et cybersécurité des infrastructures',
      'Adressage, routage, VLAN, QoS et bilan de liaison',
      'Le budget de liaison optique intègre pertes de connectique, épissures et marge de vieillissement',
      'Dimensionner une liaison sans marge de sécurité pour le vieillissement des fibres',
      'Interconnexion de deux campus en fibre optique',
    ],
  ],
  aeronautique_meteo: [
    [
      'x19-securite-vol',
      'Sécurité des vols, météorologie aéronautique et facteurs humains',
      'METAR/TAF, cisaillement, minimas et gestion de la fatigue',
      'Un aéronef ne décolle que si les minimas de visibilité et de plafond sont respectés',
      'Négliger le cisaillement de vent annoncé en approche finale',
      'Préparation d’un vol commercial pendant la saison des pluies',
    ],
  ],
  urbanisme_sig: [
    [
      'x19-planification-urbaine',
      'Planification urbaine, foncier et analyse spatiale',
      'Schéma directeur, coefficients d’occupation du sol et analyse multicritère SIG',
      'Le COS fixe la surface constructible : surface de plancher = COS × surface de la parcelle',
      'Produire une carte sans indiquer projection, échelle et source des données',
      'Élaboration d’un plan d’occupation des sols pour une ville secondaire',
    ],
  ],
  architecture_design: [
    [
      'x19-bioclimatisme',
      'Conception bioclimatique, confort thermique et matériaux locaux',
      'Inertie thermique, ventilation naturelle et protection solaire',
      'En climat chaud, l’orientation et les protections solaires priment sur la climatisation active',
      'Privilégier de grandes surfaces vitrées à l’ouest sans protection solaire',
      'Conception d’une école bioclimatique à N’Djamena',
    ],
  ],
  trading_marches: [
    [
      'x19-gestion-risque-quant',
      'Gestion quantitative du risque et psychologie du trader',
      'Taille de position, ratio risque/rendement et drawdown',
      'Taille de position = (capital × risque %) / distance au stop, jamais l’inverse',
      'Augmenter la taille après une perte pour « se refaire »',
      'Plan de trading sur les paires de devises CEMAC',
    ],
  ],
};
