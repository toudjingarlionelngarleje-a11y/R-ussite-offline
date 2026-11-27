import { ExtensionSubjectModules } from './types';

/**
 * v20.0 — Deuxième vague scientifique et scolaire (27 matières).
 */
export const GROUP_A_SCIENCES: ExtensionSubjectModules = {
  maths: [
    [
      'x20-equations-differentielles',
      'Équations différentielles et modélisation dynamique',
      'Équations différentielles linéaires, conditions initiales et schémas numériques (Euler, Runge-Kutta)',
      'La solution générale de y′ = a·y + b est y = C·e^(a·x) − b/a, C fixée par la condition initiale',
      'Oublier la condition initiale ou discrétiser avec un pas trop grand qui rend le schéma instable',
      'Modélisation de la décroissance d’un médicament dans le sang',
    ],
  ],
  physique: [
    [
      'x20-induction-machines',
      'Induction électromagnétique et machines tournantes',
      'Flux magnétique, loi de Faraday-Lenz et force électromotrice induite',
      'e = −dΦ/dt : le signe négatif traduit l’opposition de l’induction à la cause qui lui donne naissance',
      'Oublier le signe de Lenz ou confondre flux et champ magnétique',
      'Fonctionnement d’un alternateur de barrage hydroélectrique',
    ],
  ],
  svt: [
    [
      'x20-immunologie',
      'Immunologie et défenses de l’organisme',
      'Immunité innée/acquise, antigènes, anticorps et mémoire immunitaire',
      'La réponse secondaire est plus rapide et plus intense grâce aux cellules mémoire',
      'Confondre séropositivité et immunité protectrice sans distinguer les classes d’anticorps',
      'Suivi sérologique après vaccination contre la rougeole',
    ],
  ],
  chimie_bio: [
    [
      'x20-metabolisme-cellulaire',
      'Métabolisme cellulaire et régulation hormonale',
      'Glycolyse, cycle de Krebs, phosphorylation oxydative et régulation hormonale',
      'Le rendement théorique de l’oxydation complète du glucose est d’environ 30 à 32 ATP',
      'Additionner les ATP sans tenir compte des navettes mitochondriales',
      'Effet de l’insuline sur la glycémie après un repas riche',
    ],
  ],
  chimie_organique: [
    [
      'x20-spectroscopie',
      'Spectroscopie IR, RMN et détermination structurale',
      'Bandes IR caractéristiques, déplacements chimiques et couplage spin-spin',
      'Le nombre de signaux RMN ¹H renseigne sur le nombre de groupes de protons équivalents',
      'Attribuer un spectre sans vérifier la cohérence entre IR, RMN et formule brute',
      'Identification d’un ester inconnu à partir de ses spectres',
    ],
  ],
  informatique: [
    [
      'x20-poo-patrons',
      'Programmation orientée objet et patrons de conception',
      'Encapsulation, héritage, polymorphisme et patrons (Factory, Observer, Repository)',
      'Un patron de conception résout un problème récurrent de structure, pas un besoin métier isolé',
      'Hériter pour réutiliser du code au lieu de composer, ce qui fige l’architecture',
      'Refonte orientée objet d’un logiciel de gestion de notes scolaires',
    ],
  ],
  statistiques: [
    [
      'x20-sondages',
      'Sondages, échantillonnage et redressement',
      'Plan de sondage, biais de sélection, marge d’erreur et pondération',
      'La marge d’erreur à 95 % vaut environ 1/√n pour une proportion proche de 0,5',
      'Extrapoler un échantillon de convenance à toute la population sans redressement',
      'Enquête nationale sur l’accès à l’eau potable',
    ],
  ],
  genetique_biotech: [
    [
      'x20-genetique-populations',
      'Génétique des populations et hérédité',
      'Fréquences alléliques, loi de Hardy-Weinberg et dérive génétique',
      'À l’équilibre de Hardy-Weinberg : p² + 2pq + q² = 1 avec p + q = 1',
      'Appliquer Hardy-Weinberg à une population soumise à sélection ou consanguinité',
      'Étude de la drépanocytose dans une population sahélienne',
    ],
  ],
  astronomie_spatial: [
    [
      'x20-systeme-solaire',
      'Système solaire, exoplanètes et exploration spatiale',
      'Lois de Kepler, zones habitables et méthodes de détection (transit, vitesse radiale)',
      'La méthode des transits détecte une exoplanète par la baisse périodique de luminosité de l’étoile',
      'Confondre rayon planétaire et rayon orbital dans les calculs d’habitabilité',
      'Analyse d’une courbe de lumière du satellite TESS',
    ],
  ],
  sciences_ingenieur: [
    [
      'x20-chaine-energie',
      'Chaîne d’énergie, motorisation et rendement global',
      'Conversion, transmission, rendement en cascade et choix d’actionneurs',
      'Le rendement global est le produit des rendements partiels : η = η₁ × η₂ × …',
      'Additionner les rendements au lieu de les multiplier',
      'Motorisation d’un convoyeur de sacs dans une unité agroalimentaire',
    ],
  ],
  technologie_college: [
    [
      'x20-programmation-automatismes',
      'Programmation et automatismes simples',
      'Capteurs, actionneurs, algorithme et structures conditionnelles',
      'Un automatisme fiable teste sa condition d’arrêt avant chaque action',
      'Programmer une action continue sans condition d’arrêt ni sécurité',
      'Éclairage automatique d’une salle de classe',
    ],
  ],
  technologie_robotique: [
    [
      'x20-vision-ia-robot',
      'Vision par ordinateur et intelligence embarquée',
      'Traitement d’image, seuillage, reconnaissance de formes et apprentissage embarqué',
      'Une chaîne de vision se règle dans l’ordre : éclairage, contraste, seuillage, morphologie',
      'Changer le modèle de détection sans vérifier la qualité de l’éclairage',
      'Robot trieur de déchets plastiques et métalliques',
    ],
  ],
  electronique_electrotech: [
    [
      'x20-microcontroleurs',
      'Microcontrôleurs, capteurs et systèmes embarqués',
      'Architecture MCU, GPIO, ADC, PWM, interruptions et bus I²C/SPI',
      'Un convertisseur analogique-numérique de 10 bits sur 5 V a une résolution de 4,9 mV',
      'Négliger le rebond des contacts et la consommation en veille',
      'Station météo autonome à microcontrôleur solaire',
    ],
  ],
  genie_civil_btp: [
    [
      'x20-geotechnique',
      'Géotechnique, fondations et stabilité des sols',
      'Essais pressiométriques, portance, tassement et fondations profondes',
      'La contrainte admissible d’un sol se déduit d’essais in situ, jamais d’un seul profil supposé',
      'Dimensionner une semelle sans tenir compte du tassement différentiel',
      'Fondations d’un pont sur sol argileux gonflant',
    ],
  ],
  genie_mecanique: [
    [
      'x20-fabrication-additive',
      'Fabrication additive, prototypage et post-traitement',
      'Procédés FDM/SLS, orientation des couches, tolérances et post-traitement',
      'L’orientation d’impression détermine l’anisotropie mécanique de la pièce',
      'Comparer un prototype imprimé à une pièce usinée sans corriger les tolérances',
      'Pièce de rechange imprimée pour une motopompe',
    ],
  ],
  thermodynamique_froid: [
    [
      'x20-combustion-chaudieres',
      'Combustion, chaudières et rendement de production de vapeur',
      'Pouvoir calorifique, excès d’air, fumées et rendement de chaudière',
      'Le rendement d’une chaudière se calcule par la méthode des pertes : η = 100 − pertes (%)',
      'Confondre PCI et PCS dans un calcul de consommation',
      'Audit d’une chaudière à vapeur d’une blanchisserie industrielle',
    ],
  ],
  genie_chimique_procedes: [
    [
      'x20-catalyse-reacteurs',
      'Catalyse hétérogène et génie de la réaction',
      'Cinétique catalytique, diffusion interne, lit fixe et désactivation',
      'Au-delà d’une taille de grain critique, la diffusion interne limite la vitesse apparente',
      'Augmenter la température sans tenir compte de la désactivation du catalyseur',
      'Dimensionnement d’un réacteur de reformage',
    ],
  ],
  science_materiaux: [
    [
      'x20-corrosion',
      'Corrosion et protection des métaux',
      'Corrosion galvanique, passivation, protection cathodique et revêtements',
      'Deux métaux différents en contact dans un électrolyte forment une pile : le moins noble se corrode',
      'Associer acier et cuivre dans une installation humide sans joint isolant',
      'Protection d’une conduite enterrée en milieu salin',
    ],
  ],
  automatique_controle: [
    [
      'x20-supervision-scada',
      'Supervision SCADA et réseaux industriels',
      'Automates programmables, bus de terrain, alarmes et historisation',
      'Une supervision efficace hiérarchise les alarmes pour éviter la surcharge cognitive de l’opérateur',
      'Multiplier les alarmes sans priorisation ni acquittement traçable',
      'Supervision d’une station de pompage d’eau potable',
    ],
  ],
  energies_renouv: [
    [
      'x20-eolien-hybride',
      'Énergie éolienne et systèmes hybrides',
      'Courbe de puissance, facteur de charge et couplage éolien-PV-batterie',
      'La production éolienne varie au cube de la vitesse du vent : P ∝ v³',
      'Dimensionner un aérogénérateur à partir de la vitesse moyenne sans loi de distribution',
      'Hybridation éolien-solaire d’un site isolé',
    ],
  ],
  geologie_mines: [
    [
      'x20-cartographie-forages',
      'Cartographie géologique, forages et échantillonnage',
      'Logs de forage, carottes, pendage et coupes géologiques',
      'Un log de forage se décrit par lithologie, profondeur, récupération et altération',
      'Interpréter une coupe sans contrôle de pendage ni continuité latérale',
      'Implantation de forages sur un permis minier',
    ],
  ],
  hydrologie_eau_climat: [
    [
      'x20-traitement-eaux',
      'Traitement des eaux et assainissement urbain',
      'Coagulation-floculation, décantation, filtration et désinfection',
      'La turbidité doit être abaissée avant désinfection pour que le chlore reste efficace',
      'Chlorer une eau très turbide sans clarification préalable',
      'Potabilisation d’une prise d’eau de fleuve en saison des pluies',
    ],
  ],
  agronomie_env: [
    [
      'x20-protection-cultures',
      'Protection des cultures et lutte intégrée',
      'Seuils d’intervention, ennemis naturels, résistance et rotation',
      'La lutte intégrée traite au seuil économique de nuisibilité, pas dès la première apparition',
      'Traiter systématiquement au calendrier et favoriser les résistances',
      'Gestion des chenilles légionnaires sur le maïs',
    ],
  ],
  foresterie_biodiversite: [
    [
      'x20-agroforesterie',
      'Agroforesterie et restauration des sols dégradés',
      'Association arbres-cultures, fertilité, ombrage et séquestration du carbone',
      'Les ligneux fixateurs améliorent l’azote du sol mais concurrencent l’eau en zone sèche',
      'Planter sans tenir compte de la profondeur racinaire et de la concurrence hydrique',
      'Parcelle agroforestière de karité et mil',
    ],
  ],
  peche_aquaculture: [
    [
      'x20-valorisation-halieutique',
      'Transformation et valorisation des produits halieutiques',
      'Fumage, séchage, chaîne du froid et normes sanitaires',
      'La teneur en eau conditionne la conservation : un séchage insuffisant favorise les moisissures',
      'Vendre un poisson fumé sans contrôle de la teneur en eau ni de l’emballage',
      'Unité de fumage artisanal de capitaines',
    ],
  ],
  agroalimentaire_transformation: [
    [
      'x20-analyse-laboratoire',
      'Contrôle qualité et analyses de laboratoire',
      'Analyses physico-chimiques, microbiologiques et plans d’échantillonnage',
      'Un résultat d’analyse n’a de valeur que si l’échantillon est représentatif et traçable',
      'Analyser un seul prélèvement pour conclure sur un lot entier',
      'Contrôle d’un lot de farine infantile',
    ],
  ],
  veterinaire_elevage: [
    [
      'x20-reproduction-elevage',
      'Reproduction, insémination et amélioration génétique',
      'Cycles sexuels, détection des chaleurs et insémination artificielle',
      'La fécondation réussit si l’insémination est réalisée au bon moment du cycle, avant l’ovulation',
      'Inséminer sans détection fiable des chaleurs ni suivi de fertilité',
      'Amélioration d’un troupeau laitier par insémination',
    ],
  ],
};
