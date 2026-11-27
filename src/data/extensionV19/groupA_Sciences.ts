import { ExtensionSubjectModules } from './types';

/**
 * v19.0 — Approfondissements scientifiques et scolaires (27 matières).
 * Un module curaté par matière, décliné en 10 chapitres par le moteur v19.
 */
export const GROUP_A_SCIENCES: ExtensionSubjectModules = {
  maths: [
    [
      'x19-optimisation',
      'Optimisation, modélisation et méthodes numériques',
      'Fonction objectif, contraintes, convexité et algorithme de descente de gradient',
      'Sous contraintes d’égalité, le lagrangien L = f + λ·g s’annule en gradient : ∇f = λ·∇g',
      'Confondre maximum local et maximum global sur un domaine non convexe',
      'Dimensionnement d’un réservoir cylindrique de volume imposé à coût minimal',
    ],
  ],
  physique: [
    [
      'x19-physique-experimentale',
      'Mesures, incertitudes et exploitation de données expérimentales',
      'Incertitude-type, propagation des erreurs et régression linéaire par moindres carrés',
      'Pour u = a·x + b·y : (Δu/u)² = (Δx/x)² + (Δy/y)² pour des variables indépendantes',
      'Additionner les incertitudes absolues sans tenir compte des unités et des coefficients',
      'Étalonnage d’un capteur de température avec calcul de la droite de régression',
    ],
  ],
  svt: [
    [
      'x19-ecologie-agrosystemes',
      'Écologie fonctionnelle, cycles biogéochimiques et agrosystèmes du Sahel',
      'Flux de matière et d’énergie, productivité primaire nette et résilience des écosystèmes',
      'PPN = PPB − respiration ; un agrosystème exporte de la biomasse et exige des intrants compensatoires',
      'Confondre production brute et production nette dans un bilan de matière',
      'Bilan azoté d’une parcelle de mil avec légumineuses en rotation',
    ],
  ],
  chimie_bio: [
    [
      'x19-thermodynamique-bioenergetique',
      'Bioénergétique, cinétique enzymatique et couplage ATP',
      'Énergie libre de Gibbs, constante d’équilibre et modèle de Michaelis-Menten',
      'ΔG = ΔG°′ + R·T·ln(Q) ; réaction spontanée si ΔG < 0 à température donnée',
      'Confondre vitesse de réaction et constante d’équilibre dans un système enzymatique',
      'Effet d’un inhibiteur compétitif sur le Km apparent d’une déshydrogénase',
    ],
  ],
  chimie_organique: [
    [
      'x19-retrosynthese',
      'Rétrosynthèse, stratégie de synthèse et protection de fonctions',
      'Analyse rétrosynthétique, groupements protecteurs et chimiosélectivité',
      'Une synthèse multi-étapes se planifie à rebours en privilégiant les réactions à haut rendement',
      'Oublier de protéger une fonction amine avant une acylation ou une alkylation',
      'Synthèse d’un dipeptide protégé par stratégie Fmoc/tBu',
    ],
  ],
  informatique: [
    [
      'x19-complexite-algorithmes',
      'Complexité algorithmique, structures de données et preuve de correction',
      'Notations O, Θ et Ω, récurrences maîtresses et invariants de boucle',
      'T(n) = a·T(n/b) + f(n) se résout par le théorème maître selon la croissance de f',
      'Confondre complexité amortie et complexité dans le pire cas',
      'Comparaison d’un tri par insertion O(n²) et d’un tri fusion O(n log n) sur 10⁶ lignes',
    ],
  ],
  statistiques: [
    [
      'x19-inference-tests',
      'Inférence statistique, tests d’hypothèses et intervalles de confiance',
      'Hypothèse nulle, risque α, puissance et théorème central limite',
      'Rejet de H₀ si |T_observé| > seuil critique au risque α ; IC à 95 % : x̄ ± 1,96·σ/√n',
      'Interpréter un p non significatif comme preuve de l’égalité des moyennes',
      'Test de comparaison de deux méthodes pédagogiques sur des groupes appariés',
    ],
  ],
  genetique_biotech: [
    [
      'x19-edition-genomique',
      'Édition génomique, séquençage et bioéthique',
      'CRISPR-Cas9, séquençage haut débit et variants de signification inconnue',
      'Un guide ARN de 20 nucléotides dirige la coupure en amont d’un motif PAM NGG',
      'Négliger les effets hors cible et le consentement éclairé dans un projet d’édition',
      'Détection d’une mutation drépanocytaire par séquençage ciblé',
    ],
  ],
  astronomie_spatial: [
    [
      'x19-astrophysique-observation',
      'Photométrie, spectroscopie et mécanique orbitale appliquée',
      'Loi de Wien, décalage vers le rouge et paramètres orbitaux képlériens',
      'λ_max·T = 2,898×10⁻³ m·K ; v_rad = c·z pour de faibles décalages spectraux',
      'Confondre magnitude apparente et magnitude absolue dans un calcul de distance',
      'Estimation de la température de surface d’une étoile à partir de son spectre',
    ],
  ],
  sciences_ingenieur: [
    [
      'x19-ingenierie-systeme',
      'Ingénierie système, sûreté de fonctionnement et cycle de vie produit',
      'Analyse fonctionnelle SysML, exigences, criticité et sûreté (AMDEC, arbres de défaillance)',
      'Un système est validé si chaque exigence est tracée et vérifiée par un test mesurable',
      'Confondre exigence fonctionnelle et contrainte de conception non traçable',
      'Conception d’un système d’arrosage automatique à énergie solaire',
    ],
  ],
  technologie_college: [
    [
      'x19-objets-techniques-cycles',
      'Analyse du cycle de vie et matériaux des objets techniques',
      'Fonction d’usage, fonction d’estime, contraintes et choix des matériaux',
      'Un matériau se choisit par un compromis masse, résistance, coût et recyclabilité',
      'Choisir un matériau uniquement selon son prix sans vérifier sa tenue mécanique',
      'Choix des matériaux d’une brouette robuste pour un usage agricole',
    ],
  ],
  technologie_robotique: [
    [
      'x19-robotique-capteurs-actionneurs',
      'Capteurs, actionneurs et programmation d’un robot autonome',
      'Chaîne d’information, chaîne d’énergie et asservissement en position',
      'Boucle fermée : erreur = consigne − mesure, puis commande proportionnelle Kp·erreur',
      'Programmer des actions en boucle ouverte sans vérifier le retour capteur',
      'Robot suiveur de ligne pour un atelier scolaire tunisien',
    ],
  ],
  electronique_electrotech: [
    [
      'x19-conversion-energie',
      'Électronique de puissance, variateurs et qualité de l’énergie',
      'Redresseurs, hacheurs, onduleurs MLI et facteur de puissance',
      'Valeur moyenne d’un hacheur série : Vs = α·Ve avec α le rapport cyclique',
      'Négliger le taux d’harmoniques et le facteur de puissance dans un bilan de consommation',
      'Variation de vitesse d’un moteur asynchrone de pompage solaire',
    ],
  ],
  genie_civil_btp: [
    [
      'x19-structures-beton',
      'Béton armé, descente de charges et dimensionnement parasismique',
      'Ferraillage, enrobage, effort tranchant et ductilité des zones critiques',
      'Section d’acier As = Mu / (z·fyd) avec z ≈ 0,9·d pour une poutre fléchie',
      'Oublier les dispositions constructives minimales de ferraillage exigées par le zonage sismique',
      'Dimensionnement d’une poutre de bâtiment scolaire à N’Djamena',
    ],
  ],
  genie_mecanique: [
    [
      'x19-maintenance-conditionnelle',
      'Maintenance conditionnelle, analyse vibratoire et tolérancement GPS',
      'Signature fréquentielle des défauts, pronostic de durée de vie et chaînes de cotes',
      'Un défaut de roulement apparaît aux fréquences caractéristiques BPFO/BPFI, pas à la fréquence de rotation',
      'Confondre défaut de balourd (1×) et défaut de roulement (fréquences non synchrones)',
      'Diagnostic d’un ventilateur industriel avant arrêt de production',
    ],
  ],
  thermodynamique_froid: [
    [
      'x19-efficacite-energetique',
      'Efficacité énergétique, récupération de chaleur et froid solaire',
      'Bilan exergétique, pincement thermique et couplage solaire-froid',
      'Le rendement exergétique compare le travail utile au travail maximal récupérable, pas à l’énergie fournie',
      'Améliorer le COP sans réduire la charge thermique réelle du bâtiment',
      'Optimisation d’une chambre froide maraîchère à énergie photovoltaïque',
    ],
  ],
  genie_chimique_procedes: [
    [
      'x19-securite-procedes',
      'Sécurité des procédés, HAZOP et dimensionnement des réacteurs',
      'Temps de séjour, nombre de mélangeurs idéaux et analyse de dangers HAZOP',
      'Pour un réacteur piston : τ = V/Q et conversion calculée par intégration sur τ',
      'Négliger l’emballement thermique et les pertes de charge dans un réacteur agité',
      'HAZOP d’une unité de stockage d’ammoniac',
    ],
  ],
  science_materiaux: [
    [
      'x19-materiaux-avances',
      'Matériaux composites, traitements de surface et durabilité',
      'Anisotropie des composites, corrosion galvanique et essais normalisés',
      'La règle des mélanges E_c ≈ V_f·E_f + V_m·E_m donne un majorant de rigidité',
      'Traiter un composite comme un métal isotrope dans un calcul de flexion',
      'Choix d’un composite pour une pièce de pompe en milieu salin',
    ],
  ],
  automatique_controle: [
    [
      'x19-regulation-avancee',
      'Régulation PID, stabilité et commande numérique des procédés',
      'Fonction de transfert, marge de phase et discrétisation d’un correcteur',
      'Stabilité en boucle fermée si le gain statique et les marges de phase/Gain sont positifs et suffisants',
      'Augmenter excessivement le gain proportionnel jusqu’à provoquer une oscillation entretenue',
      'Réglage d’un PID de niveau d’eau dans un château d’eau',
    ],
  ],
  energies_renouv: [
    [
      'x19-dimensionnement-pv-stockage',
      'Dimensionnement photovoltaïque, stockage et mini-réseaux',
      'Irradiation, productible, rendement de conversion et profondeur de décharge des batteries',
      'Énergie produite E = P_crête × irradiation × PR ; autonomie = capacité utile / consommation journalière',
      'Dimensionner un champ PV sans tenir compte du rendement global (PR ≈ 0,75) et de la température',
      'Électrification d’un dispensaire isolé avec stockage lithium',
    ],
  ],
  geologie_mines: [
    [
      'x19-exploration-miniere',
      'Exploration minière, géostatistique et exploitation responsable',
      'Indices géochimiques, teneur de coupure et estimation des ressources',
      'La teneur de coupure optimise la valeur nette : revenu = teneur × prix × récupération − coûts',
      'Confondre ressources inférées et réserves prouvées dans un rapport technique',
      'Estimation des réserves d’un gisement aurifère par krigeage',
    ],
  ],
  hydrologie_eau_climat: [
    [
      'x19-gestion-bassins',
      'Gestion intégrée des bassins versants et adaptation climatique',
      'Courbe hypsométrique, temps de concentration et bilan hydrologique annuel',
      'Bilan : P = ETR + R + ΔS ; le ruissellement augmente avec l’imperméabilisation',
      'Négliger les pertes par évaporation dans un bilan en zone sahélienne',
      'Plan de gestion du bassin du lac Tchad face aux sécheresses',
    ],
  ],
  agronomie_env: [
    [
      'x19-fertilite-sols',
      'Fertilité des sols, fertilisation raisonnée et agroécologie',
      'CEC, pH, carences minérales et bilan prévisionnel azoté',
      'Dose N = besoins de la culture − fournitures du sol − reliquats, corrigée du coefficient d’efficience',
      'Appliquer une fumure uniforme sans analyse de sol ni reliquats de campagne',
      'Itinéraire technique du sorgho sur sol ferrugineux appauvri',
    ],
  ],
  foresterie_biodiversite: [
    [
      'x19-amenagement-forestier',
      'Aménagement forestier, carbone et aires protégées',
      'Inventaire forestier, croissance annuelle et stocks de carbone',
      'Stock de carbone = biomasse sèche × 0,47 ; la biomasse aérienne suit des équations allométriques',
      'Extrapoler un inventaire sans corriger le plan d’échantillonnage',
      'Plan d’aménagement d’une forêt communautaire de 5 000 ha',
    ],
  ],
  peche_aquaculture: [
    [
      'x19-pisciculture-durable',
      'Pisciculture, qualité des eaux et économie bleue',
      'Taux de charge, oxygène dissous, indice de conversion alimentaire',
      'IC = aliment distribué / gain de biomasse ; un IC > 2 signale un surcoût et une pollution',
      'Surdensifier un bassin sans mesurer l’oxygène dissous et l’ammoniac',
      'Élevage de tilapias en cages flottantes sur le fleuve Niger',
    ],
  ],
  agroalimentaire_transformation: [
    [
      'x19-conservation-haccp',
      'HACCP, conservation et valorisation des produits locaux',
      'Points critiques de maîtrise, activité de l’eau et barrières technologiques',
      'Un CCP se définit par un seuil mesurable (aw, pH, température) et un plan de surveillance',
      'Confondre contrôle qualité final et maîtrise des dangers en cours de procédé',
      'Conditionnement de la pâte d’arachide pour une PME tchadienne',
    ],
  ],
  veterinaire_elevage: [
    [
      'x19-sante-troupeau',
      'Santé du troupeau, biosécurité et prophylaxie',
      'Épidémiologie, taux d’attaque, quarantaine et calendrier vaccinal',
      'L’immunité de troupeau exige une couverture vaccinale suffisante pour bloquer la transmission',
      'Vacciner sans respecter la chaîne du froid ni le calendrier d’administration',
      'Plan de prophylaxie d’un élevage bovin transhumant',
    ],
  ],
};
