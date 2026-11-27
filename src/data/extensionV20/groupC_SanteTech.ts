import { ExtensionSubjectModules } from './types';

/**
 * v20.0 — Deuxième vague santé, numérique, ingénierie et territoires (25 matières).
 */
export const GROUP_C_SANTE_TECH: ExtensionSubjectModules = {
  sante_publique: [
    [
      'x20-sante-maternelle',
      'Santé maternelle, planification familiale et nutrition',
      'Consultations prénatales, planning familial et mortalité maternelle',
      'Quatre consultations prénatales de qualité réduisent nettement la mortalité maternelle',
      'Confondre couverture contraceptive et taux de natalité',
      'Programme de santé maternelle dans un district rural',
    ],
  ],
  anatomie_physio: [
    [
      'x20-systeme-nerveux',
      'Système nerveux et organes des sens',
      'Neurone, synapse, voies nerveuses et transduction sensorielle',
      'Le potentiel d’action obéit à la loi du tout ou rien, contrairement au potentiel gradué',
      'Confondre système nerveux somatique et autonome dans l’explication d’un réflexe',
      'Exploration d’une perte de sensibilité après traumatisme',
    ],
  ],
  pharmacologie: [
    [
      'x20-pharmacovigilance',
      'Pharmacovigilance et prévention des erreurs médicamenteuses',
      'Effets indésirables, notification, interactions et erreurs de prescription',
      'Tout effet indésirable grave doit être notifié, même s’il est déjà connu',
      'Arrêter un traitement sans notifier ni documenter l’effet indésirable',
      'Déclaration d’une réaction cutanée sévère aux sulfamides',
    ],
  ],
  medecine_clinique: [
    [
      'x20-geriatrie',
      'Gériatrie, polypathologie et soins chroniques',
      'Fragilité, iatrogénie, évaluation gériatrique et autonomie',
      'Chez la personne âgée, la chute révèle souvent une cause multiple et non un simple accident',
      'Attribuer une confusion aiguë à la vieillesse sans rechercher une cause curable',
      'Prise en charge d’une personne âgée polymédiquée',
    ],
  ],
  obstetrique_pediatrie: [
    [
      'x20-suivi-prenatal',
      'Suivi prénatal, dépistage et préparation à la naissance',
      'Calendrier des consultations, échographies et dépistage des infections',
      'Le dépistage du VIH, de la syphilis et de l’hépatite B s’intègre au suivi prénatal',
      'Prescrire un traitement tératogène sans vérifier la grossesse',
      'Consultation prénatale du premier trimestre',
    ],
  ],
  soins_infirmiers: [
    [
      'x20-soins-palliatifs',
      'Soins palliatifs, douleur et accompagnement',
      'Évaluation de la douleur, paliers antalgiques et soins de confort',
      'La douleur s’évalue avec une échelle validée et se réévalue après chaque traitement',
      'Sous-doser la douleur par crainte de la dépendance chez un patient en fin de vie',
      'Accompagnement d’un patient en soins palliatifs',
    ],
  ],
  microbiologie_biomed: [
    [
      'x20-tuberculose',
      'Mycobactéries, tuberculose et diagnostic de laboratoire',
      'BK, microscopie, GeneXpert et culture',
      'La recherche de BAAR exige trois expectorations de qualité avant de conclure',
      'Conclure à l’absence de tuberculose sur un seul échantillon',
      'Diagnostic d’une toux persistante chez un adulte',
    ],
  ],
  chirurgie_traumatologie: [
    [
      'x20-bloc-asepsie',
      'Bloc opératoire, asepsie et sécurité chirurgicale',
      'Chaîne d’asepsie, check-list, antibioprophylaxie et gestion des implants',
      'La check-list au bloc réduit les erreurs de site et les infections du site opératoire',
      'Ouvrir un bloc sans vérification de la stérilisation des instruments',
      'Organisation d’un programme opératoire hebdomadaire',
    ],
  ],
  odontologie_stomato: [
    [
      'x20-protheses',
      'Réhabilitation prothétique et implantologie',
      'Empreinte, occlusion, prothèse fixe/amovible et ostéo-intégration',
      'Une prothèse stable exige un équilibre occlusal vérifié avant la pose définitive',
      'Poser une prothèse sans contrôle de l’occlusion controlatérale',
      'Réhabilitation d’un patient édenté partiel',
    ],
  ],
  sante_mentale_psychiatrie: [
    [
      'x20-addictologie',
      'Addictologie et accompagnement psychosocial',
      'Dépendance, sevrage, entretien motivationnel et réduction des risques',
      'L’entretien motivationnel accompagne le changement sans confrontation frontale',
      'Imposer une abstinence immédiate sans prise en charge du sevrage',
      'Accompagnement d’un jeune consommateur de substances',
    ],
  ],
  nutrition_sante: [
    [
      'x20-nutrition-nourrisson',
      'Nutrition du nourrisson, allaitement et diversification',
      'Allaitement maternel exclusif, diversification et carences',
      'L’allaitement exclusif est recommandé jusqu’à 6 mois, puis diversification progressive',
      'Débuter la diversification avant 4 mois ou retarder après 6 mois',
      'Conseil nutritionnel en consultation du nourrisson',
    ],
  ],
  psychologie_cog: [
    [
      'x20-developpement-enfant',
      'Développement de l’enfant et de l’adolescent',
      'Stades du développement, attachement et crise adolescente',
      'Le développement suit des séquences mais à des rythmes individuels très variables',
      'Interpréter un retard isolé comme une pathologie sans évaluation globale',
      'Accompagnement d’un adolescent en difficulté scolaire',
    ],
  ],
  pedagogie: [
    [
      'x20-gestion-classe',
      'Gestion de classe et motivation des élèves',
      'Règles explicites, rituels, différenciation et feedback',
      'Un feedback précis et rapide améliore les résultats plus qu’une note globale',
      'Sanctionner sans avoir explicité la règle ni le comportement attendu',
      'Classe de 65 élèves en début d’année',
    ],
  ],
  cybersecurite: [
    [
      'x20-owasp-web',
      'Sécurité des applications web (OWASP)',
      'Injections, XSS, contrôle d’accès, authentification et en-têtes de sécurité',
      'Toute entrée utilisateur doit être validée côté serveur, jamais uniquement côté client',
      'Se reposer sur la validation JavaScript du navigateur pour la sécurité',
      'Audit d’un portail de paiement en ligne',
    ],
  ],
  data_ia: [
    [
      'x20-visualisation-donnees',
      'Visualisation et narration des données',
      'Encodages graphiques, échelles, tableaux de bord et biais de perception',
      'Un graphique honnête commence son axe à zéro pour des grandeurs absolues',
      'Tronquer l’axe vertical pour exagérer une variation',
      'Tableau de bord des indicateurs d’une ONG',
    ],
  ],
  bases_donnees_bigdata: [
    [
      'x20-nosql-distribue',
      'NoSQL, réplication et bases distribuées',
      'Clé-valeur, document, cohérence éventuelle et théorème CAP',
      'En cas de partition réseau, un système distribué choisit entre cohérence et disponibilité',
      'Choisir NoSQL sans analyser les besoins de transactions et de cohérence',
      'Stockage de traces d’usage d’une plateforme mobile',
    ],
  ],
  genie_logiciel_devops: [
    [
      'x20-conteneurs-k8s',
      'Conteneurs, orchestration et infrastructure as code',
      'Images, Kubernetes, secrets, autoscaling et IaC',
      'Une image conteneur doit être reproductible, minimale et sans secrets intégrés',
      'Stocker des secrets dans l’image ou dans un dépôt Git public',
      'Déploiement d’une API scolaire sur un cluster',
    ],
  ],
  developpement_mobile_web: [
    [
      'x20-tests-front',
      'Tests end-to-end, accessibilité et qualité front',
      'Tests E2E, tests de composants, contrastes et navigation clavier',
      'Un test end-to-end doit vérifier un parcours utilisateur réel, pas une implémentation interne',
      'Tester uniquement les composants isolés sans jamais tester les parcours',
      'Validation du parcours d’inscription d’une PWA',
    ],
  ],
  design_ux_infographie: [
    [
      'x20-recherche-utilisateur',
      'Recherche utilisateur et prototypage rapide',
      'Personas, entretiens, tests d’utilisabilité et prototypes cliquables',
      'Cinq utilisateurs suffisent à révéler l’essentiel des problèmes d’un parcours simple',
      'Concevoir à partir de ses propres préférences sans observer d’utilisateurs',
      'Refonte du parcours de révision hors ligne',
    ],
  ],
  iot_systemes_embarques: [
    [
      'x20-edge-domotique',
      'Edge computing et domotique solaire',
      'Traitement local, passerelles, protocoles et gestion de l’énergie',
      'Traiter les données au plus près du capteur réduit la consommation radio et la latence',
      'Envoyer chaque mesure au cloud sans agrégation ni seuil',
      'Domotique solaire d’un centre de formation',
    ],
  ],
  reseaux_telecoms: [
    [
      'x20-5g-ftth',
      'Réseaux mobiles 5G et fibre FTTH',
      'Architecture radio, bandes, débits, GPON et qualité de service',
      'Le débit réel dépend du partage de bande et du nombre d’utilisateurs actifs par cellule',
      'Promettre un débit nominal sans tenir compte du dimensionnement radio',
      'Déploiement FTTH dans un quartier périurbain',
    ],
  ],
  aeronautique_meteo: [
    [
      'x20-gestion-trafic',
      'Navigation aérienne et gestion du trafic',
      'Plan de vol, séparations, procédures d’approche et facteurs humains',
      'La séparation réglementaire entre aéronefs prime sur toute optimisation de trajectoire',
      'Réduire une séparation pour gagner du temps sans autorisation du contrôle',
      'Régulation du trafic d’un aéroport régional',
    ],
  ],
  urbanisme_sig: [
    [
      'x20-mobilite-urbaine',
      'Mobilité urbaine et transports collectifs',
      'Parts modales, capacité, intermodalité et plans de déplacement',
      'La capacité d’une ligne se mesure en voyageurs/heure/direction, pas en nombre de véhicules',
      'Dimensionner un bus articulé sans calcul de charge à l’heure de pointe',
      'Plan de mobilité d’une capitale sahélienne',
    ],
  ],
  architecture_design: [
    [
      'x20-bim',
      'BIM, maquette numérique et coordination de chantier',
      'Niveaux de détail, clash detection, quantités et cycle de vie',
      'Une maquette BIM n’a de valeur que si les données sont structurées et à jour',
      'Produire une maquette esthétique sans données techniques exploitables',
      'Coordination des lots d’un bâtiment scolaire',
    ],
  ],
  trading_marches: [
    [
      'x20-analyse-fondamentale',
      'Analyse fondamentale et macroéconomie des marchés',
      'Taux directeurs, inflation, résultats et corrélations inter-marchés',
      'Une hausse des taux directeurs pèse généralement sur les valorisations obligataires',
      'Trader une annonce macroéconomique sans connaître l’heure de publication',
      'Réaction d’un indice aux décisions de politique monétaire',
    ],
  ],
};
