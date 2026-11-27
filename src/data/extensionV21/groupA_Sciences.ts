import { ExtensionSubjectModules } from './types';

/**
 * v21.0 — Troisième vague scientifique et scolaire (27 matières).
 */
export const GROUP_A_SCIENCES: ExtensionSubjectModules = {
  maths: [
    [
      'x21-geometrie-espace',
      'Géométrie vectorielle dans l’espace et produit vectoriel',
      'Vecteurs de l’espace, plans, droites et produit vectoriel',
      'Le produit vectoriel u ∧ v est orthogonal à u et v ; sa norme vaut ‖u‖·‖v‖·sin(θ)',
      'Confondre colinéarité (déterminant nul) et orthogonalité (produit scalaire nul)',
      'Calcul de la distance d’un point à un plan de l’espace',
    ],
  ],
  physique: [
    [
      'x21-optique-instruments',
      'Optique géométrique et instruments d’optique',
      'Lois de Snell-Descartes, lentilles minces et formation des images',
      '1/f = 1/OA′ − 1/OA et grandissement γ = A′B′/AB = OA′/OA',
      'Oublier la convention algébrique des distances dans la relation de conjugaison',
      'Réglage d’un microscope optique de laboratoire',
    ],
  ],
  svt: [
    [
      'x21-reproduction-sante',
      'Reproduction humaine et santé de la reproduction',
      'Cycles hormonaux, gamétogenèse et contraception',
      'L’ovulation survient sous le pic de LH, environ 14 jours avant le cycle suivant',
      'Confondre les rôles de la FSH et de la LH dans le cycle ovarien',
      'Explication du mode d’action d’une contraception hormonale',
    ],
  ],
  chimie_bio: [
    [
      'x21-acides-nucleiques',
      'Acides nucléiques et expression génétique',
      'ADN, ARN, transcription, traduction et code génétique',
      'La traduction lit les codons trois par trois, selon un cadre de lecture unique',
      'Oublier que plusieurs codons codent le même acide aminé (code dégénéré)',
      'Traduction d’un ARNm muté et conséquence sur la protéine',
    ],
  ],
  chimie_organique: [
    [
      'x21-polymeres',
      'Chimie des polymères et matériaux organiques',
      'Polyaddition, polycondensation, masse molaire et recyclage',
      'Le degré de polymérisation relie la masse molaire du polymère à celle du monomère',
      'Confondre thermoplastique (recyclable par fusion) et thermodurcissable',
      'Fabrication d’un bioplastique à partir d’amidon',
    ],
  ],
  informatique: [
    [
      'x21-securite-applicative',
      'Sécurité applicative et cryptographie de base',
      'Hachage, chiffrement symétrique/asymétrique et injections',
      'Un mot de passe se stocke haché avec sel, jamais chiffré de façon réversible',
      'Utiliser MD5 ou SHA-1 pour protéger des mots de passe',
      'Sécurisation d’une API de gestion scolaire',
    ],
  ],
  statistiques: [
    [
      'x21-anova-plans',
      'Analyse de variance et plans d’expérience',
      'ANOVA à un facteur, variance intra/inter et tests post-hoc',
      'Si F observé dépasse la valeur critique, au moins une moyenne diffère significativement',
      'Multiplier les tests t sans correction du risque d’erreur de première espèce',
      'Comparaison de trois méthodes d’engrais sur le rendement',
    ],
  ],
  genetique_biotech: [
    [
      'x21-biotech-vegetales',
      'Biotechnologies végétales, OGM et biosécurité',
      'Transgenèse, sélection assistée par marqueurs et protocole de Cartagena',
      'Un OGM doit être évalué par une analyse de risque avant toute dissémination',
      'Confondre sélection classique et modification génétique dans un débat réglementaire',
      'Évaluation d’une variété de riz tolérante à la sécheresse',
    ],
  ],
  astronomie_spatial: [
    [
      'x21-cosmologie',
      'Cosmologie, expansion de l’Univers et distances',
      'Loi de Hubble, décalage spectral et distance de luminosité',
      'v = H₀·d relie la vitesse de fuite des galaxies à leur distance',
      'Confondre année-lumière (distance) et année (durée) dans les calculs',
      'Estimation de la distance d’une galaxie lointaine',
    ],
  ],
  sciences_ingenieur: [
    [
      'x21-eco-conception',
      'Éco-conception et analyse du cycle de vie',
      'Analyse de cycle de vie, unité fonctionnelle, empreinte carbone',
      'Un bilan ACV se raisonne sur une unité fonctionnelle, jamais sur un seul produit',
      'Comparer deux solutions sans périmètre ni unité fonctionnelle identiques',
      'Éco-conception d’un chauffe-eau solaire',
    ],
  ],
  technologie_college: [
    [
      'x21-objets-connectes',
      'Objets connectés et communication sans fil',
      'Capteurs, Wi-Fi/Bluetooth, protocoles et confidentialité',
      'Un objet connecté transmet des données : il faut choisir ce qui est collecté et protégé',
      'Connecter un objet avec un mot de passe par défaut',
      'Station connectée de mesure de la qualité de l’air',
    ],
  ],
  technologie_robotique: [
    [
      'x21-drones-robotique-mobile',
      'Drones et robotique mobile',
      'Navigation, télémétrie, contrôle de vol et sécurité',
      'Un drone se stabilise par une boucle d’asservissement rapide sur les centrales inertielles',
      'Voler sans vérifier l’autonomie restante et la zone réglementée',
      'Drone de cartographie d’une parcelle agricole',
    ],
  ],
  electronique_electrotech: [
    [
      'x21-amplificateurs-filtres',
      'Électronique analogique : amplificateurs et filtres',
      'Transistor, AOP, gain, bande passante et filtres RC',
      'Le gain en décibels vaut 20·log₁₀(Vs/Ve) pour une tension',
      'Confondre gain en tension et gain en puissance dans le calcul en dB',
      'Filtre anti-repliement avant conversion analogique-numérique',
    ],
  ],
  genie_civil_btp: [
    [
      'x21-routes-ouvrages-art',
      'Routes, terrassement et ouvrages d’art',
      'Profil en long, compactage, dimensionnement de chaussée et appuis de pont',
      'Le module de portance d’une chaussée dépend du trafic cumulé sur la durée de vie',
      'Dimensionner une chaussée sans étude de trafic ni de sol support',
      'Réhabilitation d’une route rurale de 30 km',
    ],
  ],
  genie_mecanique: [
    [
      'x21-metrologie-controle',
      'Métrologie dimensionnelle et contrôle qualité',
      'Incertitude de mesure, calibrage, calibres et tolérances ISO',
      'Une mesure n’a de sens qu’avec son incertitude et un instrument étalonné',
      'Déclarer une pièce conforme sans incertitude de mesure associée',
      'Contrôle d’un arbre usiné aux tolérances H7/g6',
    ],
  ],
  thermodynamique_froid: [
    [
      'x21-sechage-conservation',
      'Séchage et conservation thermique des produits',
      'Courbe de séchage, humidité relative d’équilibre et activité de l’eau',
      'La teneur en eau d’équilibre dépend de l’humidité relative et de la température',
      'Sécher trop vite en surface, ce qui croûte le produit et piège l’humidité interne',
      'Séchage solaire de mangues pour une coopérative',
    ],
  ],
  genie_chimique_procedes: [
    [
      'x21-operations-unitaires',
      'Opérations unitaires : distillation, extraction et séchage',
      'Équilibres liquide-vapeur, plateaux théoriques et rendement d’extraction',
      'Le nombre de plateaux théoriques se déduit des équilibres successifs ou de McCabe-Thiele',
      'Confondre plateaux réels et plateaux théoriques (rendement d’émulsion)',
      'Distillation d’un mélange éthanol-eau',
    ],
  ],
  science_materiaux: [
    [
      'x21-ceramiques-verres',
      'Céramiques, verres et matériaux de construction',
      'Traitement thermique, porosité, vitrification et conductivité',
      'La porosité d’une céramique dégrade sa résistance mécanique et sa durabilité',
      'Comparer des matériaux sans tenir compte de leur mise en œuvre',
      'Choix d’une tuile pour un climat sahélien',
    ],
  ],
  automatique_controle: [
    [
      'x21-robotique-industrielle',
      'Robotique industrielle et programmation d’automates',
      'Cinématique du robot, repères, sécurités et langage automate',
      'Un programme automate fiable gère explicitement les modes dégradés et l’arrêt d’urgence',
      'Programmer un cycle sans gestion de l’arrêt d’urgence ni des capteurs de sécurité',
      'Cellule robotisée de palettisation',
    ],
  ],
  energies_renouv: [
    [
      'x21-biomasse-biogaz',
      'Biomasse, biogaz et valorisation des déchets',
      'Méthanisation, pouvoir calorifique et digestat',
      'La méthanisation produit du biogaz (~60 % CH₄) et un digestat fertilisant',
      'Négliger le rapport carbone/azote dans un digesteur anaérobie',
      'Méthanisation des déchets d’un abattoir',
    ],
  ],
  geologie_mines: [
    [
      'x21-risques-geologiques',
      'Risques géologiques et géotechnique minière',
      'Glissements, affaissements, drainage minier acide',
      'Le drainage minier acide se prévient par la gestion des stériles et le confinement',
      'Ignorer la stabilité des pentes dans un plan d’exploitation',
      'Plan de gestion des stériles d’une mine d’or',
    ],
  ],
  hydrologie_eau_climat: [
    [
      'x21-irrigation-pompage',
      'Irrigation, pompage solaire et gestion agricole de l’eau',
      'Besoins en eau des cultures, ETP, efficience d’irrigation et pompage',
      'Le besoin net d’irrigation = ETP × Kc − pluies efficaces',
      'Dimensionner une pompe sur le débit nominal sans tenir compte de la hauteur manométrique',
      'Installation de pompage solaire pour 5 hectares',
    ],
  ],
  agronomie_env: [
    [
      'x21-semences-varietes',
      'Semences, variétés et multiplication',
      'Variétés améliorées, vigueur germinative et multiplication paysanne',
      'Le taux de germination s’évalue sur un échantillon de 100 graines en conditions contrôlées',
      'Utiliser des semences non certifiées sans contrôle germinatif',
      'Multiplication de semences de mil en coopérative',
    ],
  ],
  foresterie_biodiversite: [
    [
      'x21-produits-forestiers',
      'Produits forestiers non ligneux et filière bois-énergie',
      'Inventaire, rotation, charbon durable et PFNL',
      'Une rotation de coupe supérieure à la croissance annuelle garantit le renouvellement',
      'Exploiter au-delà de l’accroissement annuel de la forêt',
      'Plan d’aménagement du bois-énergie d’une ville',
    ],
  ],
  peche_aquaculture: [
    [
      'x21-economie-peche',
      'Économie de la pêche et gestion des stocks',
      'Effort de pêche, maximum durable et rentabilité des unités',
      'Le rendement maximal durable s’obtient en maintenant le stock à environ la moitié de sa capacité',
      'Augmenter l’effort de pêche quand les captures par unité d’effort baissent',
      'Gestion d’une pêcherie de capitaines sur un lac',
    ],
  ],
  agroalimentaire_transformation: [
    [
      'x21-emballage-tracabilite',
      'Emballage, étiquetage et traçabilité',
      'Barrière à l’oxygène, étiquetage réglementaire et lots',
      'Un étiquetage conforme mentionne ingrédients, allergènes, date et origine',
      'Omettre la traçabilité des lots, ce qui bloque tout rappel produit',
      'Étiquetage d’un jus de bissap conditionné',
    ],
  ],
  veterinaire_elevage: [
    [
      'x21-zoonoses',
      'Zoonoses et santé publique vétérinaire',
      'Rage, brucellose, tuberculose bovine et surveillance',
      'Une zoonose se maîtrise par la surveillance conjointe des animaux et des humains',
      'Confondre portage asymptomatique et absence d’infection',
      'Campagne de vaccination antirabique des chiens',
    ],
  ],
};
