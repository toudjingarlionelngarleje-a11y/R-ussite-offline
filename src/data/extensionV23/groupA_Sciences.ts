import { ExtensionSubjectModules } from './types';

/**
 * v23.0 — Quatrième vague, pôle sciences fondamentales et ingénierie (27 matières).
 */
export const GROUP_A_SCIENCES: ExtensionSubjectModules = {
  maths: [
    [
      'x23-transformations-geometriques',
      'Transformations du plan et de l’espace',
      'Translations, rotations, symétries et homothéties, composées et invariants',
      'Une isométrie conserve les distances et les angles ; la composée de deux symétries axiales est une rotation',
      'Confondre symétrie axiale et symétrie centrale, et oublier de préciser l’axe ou le centre',
      'Construction d’un motif de pavage par répétition d’une rotation de 90°',
    ],
  ],
  physique: [
    [
      'x23-induction-electromagnetique',
      'Induction électromagnétique et lois de Maxwell',
      'Flux magnétique, loi de Faraday-Lenz, force électromotrice induite',
      'e = −dΦ/dt : la f.é.m. induite s’oppose à la variation du flux qui l’a créée',
      'Oublier le signe de Lenz ou le nombre de spires dans le calcul de la f.é.m.',
      'Alternateur d’un barrage : conversion du mouvement en courant alternatif',
    ],
  ],
  svt: [
    [
      'x23-ecosystemes-cycles',
      'Écosystèmes, cycles biogéochimiques et services écosystémiques',
      'Chaînes trophiques, cycle du carbone et de l’azote, productivité primaire',
      'L’énergie se perd d’un niveau trophique au suivant (rendement ≈ 10 %), la matière se recycle',
      'Confondre cycle de la matière (bouclé) et flux d’énergie (à sens unique)',
      'Suivi du carbone dans une forêt communautaire protégée',
    ],
  ],
  chimie_bio: [
    [
      'x23-enzymologie',
      'Enzymologie et cinétique enzymatique',
      'Site actif, constante de Michaelis Km, vitesse maximale Vmax, inhibition',
      'v = Vmax·[S]/(Km + [S]) : Km mesure l’affinité, Vmax la capacité catalytique',
      'Confondre Km et Vmax, ou conclure sur l’affinité sans comparer les Km',
      'Dosage de la lactase et explication de l’intolérance au lactose',
    ],
  ],
  chimie_organique: [
    [
      'x23-synthese-organique',
      'Stratégie de synthèse organique et protection de groupes',
      'Analyse rétrosynthétique, groupes protecteurs, rendement global',
      'Le rendement global est le produit des rendements de chaque étape',
      'Oublier la déprotection finale ou additionner les rendements au lieu de les multiplier',
      'Synthèse multi-étapes d’un arôme alimentaire à partir d’un alcool simple',
    ],
  ],
  informatique: [
    [
      'x23-graphes-algorithmes',
      'Graphes et algorithmes de parcours',
      'Graphes orientés et pondérés, parcours BFS/DFS, plus court chemin de Dijkstra',
      'BFS donne le plus court chemin en nombre d’arêtes ; Dijkstra gère les poids positifs',
      'Appliquer BFS à un graphe pondéré en croyant obtenir le trajet le moins coûteux',
      'Calcul d’itinéraire dans un réseau de transport urbain',
    ],
  ],
  statistiques: [
    [
      'x23-series-temporelles',
      'Séries temporelles et prévision',
      'Tendance, saisonnalité, résidu, lissage exponentiel',
      'Décomposer la série (Y = T + S + R ou Y = T×S×R) avant toute prévision',
      'Prévoir sans traiter la saisonnalité et interpréter le résidu comme du bruit pur',
      'Prévision des ventes mensuelles d’une coopérative agricole',
    ],
  ],
  genetique_biotech: [
    [
      'x23-genetique-populations',
      'Génétique des populations et évolution',
      'Fréquences alléliques et génotypiques, équilibre de Hardy-Weinberg, dérive',
      'À l’équilibre Hardy-Weinberg : p² + 2pq + q² = 1 et les fréquences restent stables',
      'Utiliser Hardy-Weinberg sans vérifier panmixie, absence de sélection et grande population',
      'Fréquence de la drépanocytose et avantage de l’hétérozygote en zone endémique',
    ],
  ],
  astronomie_spatial: [
    [
      'x23-systeme-solaire',
      'Système solaire et exploration spatiale',
      'Orbites, planètes telluriques et gazeuses, ceintures, missions spatiales',
      'Troisième loi de Kepler : T²/a³ est constant pour tous les corps orbitant autour du Soleil',
      'Confondre période de rotation (sur soi) et période de révolution (autour du Soleil)',
      'Mise en orbite d’un satellite d’observation météorologique',
    ],
  ],
  sciences_ingenieur: [
    [
      'x23-materiaux-prototypage',
      'Matériaux et prototypage rapide',
      'Propriétés mécaniques, choix de matériau, impression 3D et contrôle dimensionnel',
      'Choisir un matériau selon un cahier des charges : contrainte admissible, masse, coût, aptitude',
      'Retenir un matériau sans vérifier la contrainte admissible ni la température de service',
      'Prototypage d’une pièce de pompe avant série',
    ],
  ],
  technologie_college: [
    [
      'x23-energie-habitat',
      'Énergie et habitat',
      'Sources d’énergie, puissance, consommation, isolation et économies d’énergie',
      'Énergie (kWh) = puissance (kW) × durée (h)',
      'Confondre puissance en watts et énergie en wattheures',
      'Lecture et comparaison de deux factures d’électricité domestiques',
    ],
  ],
  technologie_robotique: [
    [
      'x23-capteurs-actionneurs',
      'Capteurs, actionneurs et asservissement',
      'Capteurs analogiques et numériques, servomoteurs, boucle ouverte et fermée',
      'L’erreur d’asservissement vaut consigne − mesure et pilote la commande',
      'Confondre boucle ouverte (sans retour) et boucle fermée (avec capteur)',
      'Réglage d’un robot suiveur de ligne sur un parcours',
    ],
  ],
  electronique_electrotech: [
    [
      'x23-machines-electriques',
      'Machines électriques et variateurs de vitesse',
      'Moteur asynchrone, couple, glissement, variateur de fréquence',
      'Vitesse de synchronisme n_s = 60f/p ; le glissement explique l’écart réel',
      'Négliger le glissement et supposer une vitesse rigoureusement égale au synchronisme',
      'Dimensionnement d’un moteur de convoyeur pour une ligne de conditionnement',
    ],
  ],
  genie_civil_btp: [
    [
      'x23-beton-arme',
      'Béton armé et calcul de structures',
      'Flexion simple, section d’acier, enrobage, durabilité',
      'Le dimensionnement équilibre le moment résistant de l’acier et le moment appliqué',
      'Oublier l’enrobage et les conditions de durabilité dans le calcul de section',
      'Vérification de la poutre d’un bâtiment scolaire',
    ],
  ],
  genie_mecanique: [
    [
      'x23-usinage-fabrication',
      'Usinage et fabrication mécanique',
      'Tournage, fraisage, tolérances, état de surface',
      'Vitesse de coupe Vc = π·D·n ; elle se traduit en vitesse de rotation selon le diamètre',
      'Confondre avance par tour et profondeur de passe',
      'Fabrication d’un arbre de transmission aux tolérances imposées',
    ],
  ],
  thermodynamique_froid: [
    [
      'x23-production-froid',
      'Production de froid et climatisation',
      'Cycle frigorifique, COP, fluides frigorigènes, détente',
      'COP = Q_froid / W_compresseur : le froid n’est pas un rendement mais un coefficient',
      'Présenter le COP comme un rendement inférieur à 1 alors qu’il dépasse souvent 3',
      'Dimensionnement de la chambre froide d’un marché de gros',
    ],
  ],
  genie_chimique_procedes: [
    [
      'x23-securite-procedes',
      'Sécurité des procédés et analyse HAZOP',
      'Analyse HAZOP, emballement thermique, soupapes et sécurités',
      'HAZOP explore les déviations systématiques (plus, moins, inverse, autre) d’un paramètre',
      'Se limiter à la panne évidente et ignorer les déviations combinées',
      'HAZOP d’un réacteur exothermique de fabrication d’engrais',
    ],
  ],
  science_materiaux: [
    [
      'x23-metallurgie',
      'Métallurgie et traitements thermiques',
      'Diagramme fer-carbone, trempe, revenu, dureté et ténacité',
      'La trempe durcit mais fragilise ; le revenu restaure la ténacité',
      'Confondre dureté (résistance au rayage) et ténacité (résistance à la rupture)',
      'Choix de traitement pour une lame d’outil agricole',
    ],
  ],
  automatique_controle: [
    [
      'x23-pid',
      'Régulation PID et stabilité',
      'Action proportionnelle, intégrale, dérivée, erreur statique, oscillations',
      'P corrige l’écart, I annule l’erreur statique, D anticipe la tendance',
      'Augmenter Kp sans limite et provoquer des oscillations ou l’instabilité',
      'Régulation de température d’un four de boulangerie',
    ],
  ],
  energies_renouv: [
    [
      'x23-stockage-batteries',
      'Stockage d’énergie et batteries',
      'Capacité, tension, profondeur de décharge, rendement de charge',
      'Énergie stockée (Wh) = capacité (Ah) × tension (V)',
      'Confondre kW (puissance) et kWh (énergie) dans le dimensionnement',
      'Dimensionnement d’une installation solaire avec batterie pour un dispensaire',
    ],
  ],
  geologie_mines: [
    [
      'x23-exploration-miniere',
      'Exploration minière et géophysique',
      'Anomalies géophysiques, forages, carottage, estimation des teneurs',
      'La démarche va de l’indice à l’anomalie, puis au sondage et à l’estimation',
      'Confondre ressource (potentielle) et réserve (économiquement exploitable)',
      'Campagne d’exploration aurifère dans un permis de recherche',
    ],
  ],
  hydrologie_eau_climat: [
    [
      'x23-qualite-eau',
      'Qualité de l’eau et potabilisation',
      'Turbidité, DBO/DCO, filière de traitement, désinfection',
      'Filière type : dégrillage, décantation, filtration, désinfection',
      'Confondre DBO (biodégradable) et DCO (totale) dans le diagnostic de pollution',
      'Station de traitement d’une petite ville sahélienne',
    ],
  ],
  agronomie_env: [
    [
      'x23-fertilite-sols',
      'Fertilité des sols et fertilisation raisonnée',
      'pH, humus, azote-phosphore-potassium, bilan fertilisant',
      'Le bilan fertilisant compare les exportations de la culture aux apports du sol',
      'Surfertiliser sans analyse de sol et déséquilibrer le pH',
      'Plan de fertilisation d’une parcelle de maïs après analyse de sol',
    ],
  ],
  foresterie_biodiversite: [
    [
      'x23-inventaires-forestiers',
      'Inventaires forestiers et aménagement',
      'Placettes, diamètre, surface terrière, plan d’aménagement',
      'Surface terrière G = Σ π·d²/4 par hectare, estimée sur placettes',
      'Extrapoler un inventaire sans plan d’échantillonnage représentatif',
      'Plan d’aménagement d’une forêt communale classée',
    ],
  ],
  peche_aquaculture: [
    [
      'x23-pisciculture',
      'Pisciculture et qualité des eaux',
      'Étang, densité de mise en charge, ration, oxygène dissous',
      'Biomasse = densité × poids moyen ; la ration se calcule en % de la biomasse',
      'Surdensifier sans surveiller l’oxygène dissous et provoquer une mortalité',
      'Conduite d’un élevage de tilapias en étangs associés',
    ],
  ],
  agroalimentaire_transformation: [
    [
      'x23-conservation-laitiere',
      'Conservation et procédés laitiers',
      'Pasteurisation, fermentation, HACCP, chaîne du froid',
      'Le barème temps/température garantit l’efficacité du traitement thermique',
      'Rupture de la chaîne du froid ou barème non respecté : risque microbien',
      'Fabrication de fromage artisanal dans une laiterie locale',
    ],
  ],
  veterinaire_elevage: [
    [
      'x23-ruminants-alimentation',
      'Alimentation et santé des ruminants',
      'Rumen, fourrage, concentré, équilibre énergie/azote, transition alimentaire',
      'La ration doit équilibrer énergie et azote, avec une transition progressive',
      'Changer brutalement la ration et provoquer une acidose ruminale',
      'Ration d’un troupeau bovin laitier en saison sèche',
    ],
  ],
};
