import {
  Annale,
  Chapter,
  Course,
  ExamTrack,
  Fiche,
  Flashcard,
  Question,
  Subject,
} from '../types';

export const APEX_EXAMS: ExamTrack[] = [
  {
    id: 'concours-diplomatie',
    name: 'Concours Diplomatie, Relations Internationales & Organisations (ONU / UA)',
    shortName: 'Diplomatie / RI',
    category: 'Concours diplomatiques & internationaux',
    description:
      'Préparation aux concours des Affaires étrangères, de l’Union Africaine, de la CEMAC et des agences de l’ONU : géopolitique, droit international, économie et langues.',
    level: 'Licence / Master',
    subjectIds: [
      'relations_inter',
      'droit',
      'economie',
      'anglais',
      'arabe',
      'culture_gen',
    ],
    badgeColor: '#1E40AF',
  },
  {
    id: 'concours-agronomie',
    name: 'Concours Agronomie, Eaux & Forêts et Environnement (ENATE / IUT Agro)',
    shortName: 'Agronomie & Env.',
    category: 'Concours agro-environnementaux',
    description:
      'Entrée en écoles d’agronomie, génie rural et environnement : pédologie, agroécologie, gestion de l’eau, adaptation climatique, SVT et statistiques.',
    level: 'Bac S / Bac+2',
    subjectIds: [
      'agronomie_env',
      'svt',
      'physique',
      'statistiques',
      'energies_renouv',
      'educ_civique',
    ],
    badgeColor: '#15803D',
  },
  {
    id: 'concours-energie-btp',
    name: 'Concours Énergies Renouvelables, Génie Civil & Électrotechnique',
    shortName: 'Énergie & Génie',
    category: 'Concours techniques & ingénierie',
    description:
      'Préparation ciblée aux filières énergie solaire, électrotechnique, mines et infrastructures : dimensionnement PV, circuits de puissance, maths, physique et gestion de projet.',
    level: 'Bac Scientifique / BTS / Licence',
    subjectIds: [
      'energies_renouv',
      'maths',
      'physique',
      'informatique',
      'gestion_projet',
      'anglais',
    ],
    badgeColor: '#B45309',
  },
  {
    id: 'certif-supply-rh',
    name: 'Certification Supply Chain, Transit-Douanes & Ressources Humaines',
    shortName: 'Logistique & RH',
    category: 'Certifications gestion & commerce',
    description:
      'Double compétence prisée par les entreprises et ONG : Incoterms 2020, gestion des stocks, dédouanement, droit du travail, GPEC et droit OHADA.',
    level: 'Étudiants & Professionnels',
    subjectIds: [
      'logistique_ci',
      'grh_travail',
      'droit_ohada',
      'comptabilite',
      'gestion_projet',
      'marketing_entrep',
    ],
    isPremium: true,
    badgeColor: '#0369A1',
  },
];

export const APEX_SUBJECTS: Subject[] = [
  {
    id: 'relations_inter',
    name: 'Relations Internationales & Géopolitique',
    shortName: 'Rel. Internat.',
    examIds: ['concours-diplomatie', 'concours-admin', 'concours-magistrature'],
    color: '#1D4ED8',
    icon: 'Globe2',
    description:
      'Charte de l’ONU, Conseil de sécurité, Union Africaine, intégration CEMAC/CEDEAO, ZLECAf et géopolitique contemporaine.',
    sizeKb: 430,
  },
  {
    id: 'agronomie_env',
    name: 'Agronomie, Sols & Changement Climatique',
    shortName: 'Agronomie & Env.',
    examIds: ['concours-agronomie', 'bac-scientifique'],
    color: '#15803D',
    icon: 'Sprout',
    description:
      'Pédologie, cycle biologique de l’azote, agroécologie, gestion durable de l’eau, séquestration carbone et résilience sahélienne.',
    sizeKb: 425,
  },
  {
    id: 'energies_renouv',
    name: 'Énergies Renouvelables & Électrotechnique',
    shortName: 'Énergies & Élec.',
    examIds: ['concours-energie-btp', 'concours-ingenieur', 'concours-agronomie'],
    color: '#D97706',
    icon: 'Sun',
    description:
      'Dimensionnement solaire photovoltaïque autonome (MPPT, batteries, onduleur), puissance active/apparente, cos φ et sécurité électrique.',
    sizeKb: 455,
  },
  {
    id: 'pharmacologie',
    name: 'Pharmacologie & Toxicologie Clinique',
    shortName: 'Pharmacologie',
    examIds: ['concours-medecine', 'concours-paramedical'],
    color: '#9333EA',
    icon: 'Pill',
    description:
      'Pharmacocinétique ADME, biodisponibilité, demi-vie plasmatique, posologie, antibiotiques, antipaludéens (CTA) et antibiorésistance.',
    sizeKb: 445,
  },
  {
    id: 'logistique_ci',
    name: 'Logistique, Transit & Commerce International',
    shortName: 'Logistique & CI',
    examIds: ['certif-supply-rh', 'concours-police-douanes', 'certif-entrepreneuriat'],
    color: '#0284C7',
    icon: 'Ship',
    description:
      'Incoterms® 2020 (EXW, FOB, CIF, DDP), valeur en douane, gestion optimale des stocks (Wilson, ABC) et chaîne logistique humanitaire/commerciale.',
    sizeKb: 435,
  },
  {
    id: 'grh_travail',
    name: 'Ressources Humaines & Droit du Travail',
    shortName: 'GRH & Travail',
    examIds: ['certif-supply-rh', 'concours-admin', 'certif-entrepreneuriat'],
    color: '#BE185D',
    icon: 'Users',
    description:
      'Contrats de travail (CDI, CDD), période d’essai, rupture, dialogue social, recrutement structuré, GPEC et indicateurs RH.',
    sizeKb: 415,
  },
];

export const APEX_CHAPTERS: Chapter[] = [
  // Relations Internationales
  {
    id: 'ch-ri-onu',
    subjectId: 'relations_inter',
    title: 'Système onusien, Union Africaine & Intégration régionale',
    order: 1,
    summary:
      'Organes principaux de l’ONU (AG, Conseil de sécurité, CIJ), droit de veto, Union Africaine (Agenda 2063) et ZLECAf.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-ri-onu',
    ficheId: 'fiche-ri-onu',
  },
  {
    id: 'ch-ri-geopol',
    subjectId: 'relations_inter',
    title: 'Géopolitique de l’eau, du Sahel et des ressources stratégiques',
    order: 2,
    summary:
      'Bassin du Lac Tchad, hydro-diplomatie (Nil, Niger, Chari-Logone), sécurité collective et diplomatie climatique (COP).',
    estimatedMinutes: 25,
    difficulty: 'difficile',
    courseId: 'course-ri-geopol',
    ficheId: 'fiche-ri-geopol',
  },
  // Agronomie & Environnement
  {
    id: 'ch-agro-sols',
    subjectId: 'agronomie_env',
    title: 'Fertilité des sols, Cycle de l’azote & Agroécologie',
    order: 1,
    summary:
      'Complexe argilo-humique (CAH), pH du sol, fixation symbiotique de l’azote (légumineuses/Rhizobium) et rotation culturale.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-agro-sols',
    ficheId: 'fiche-agro-sols',
  },
  {
    id: 'ch-agro-climat',
    subjectId: 'agronomie_env',
    title: 'Adaptation climatique, Eau & Lutte contre la désertification',
    order: 2,
    summary:
      'Techniques de conservation des eaux et sols (zaï, demi-lunes), Grande Muraille Verte, irrigation goutte-à-goutte et bilan carbone.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-agro-climat',
    ficheId: 'fiche-agro-climat',
  },
  // Énergies Renouvelables
  {
    id: 'ch-enr-solaire',
    subjectId: 'energies_renouv',
    title: 'Dimensionnement d’une installation solaire photovoltaïque',
    order: 1,
    summary:
      'Irradiation solaire, puissance crête (Wc), régulateur MPPT, autonomie batterie (DoD) et rendement de conversion DC/AC.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-enr-solaire',
    ficheId: 'fiche-enr-solaire',
  },
  {
    id: 'ch-enr-elec',
    subjectId: 'energies_renouv',
    title: 'Puissances électriques (P, Q, S), Facteur de puissance & Sécurité',
    order: 2,
    summary:
      'Régime sinusoïdal monophasé/triphasé, triangle des puissances (P = U·I·cos φ), disjoncteur différentiel 30 mA et mise à la terre.',
    estimatedMinutes: 30,
    difficulty: 'difficile',
    courseId: 'course-enr-elec',
    ficheId: 'fiche-enr-elec',
  },
  // Pharmacologie
  {
    id: 'ch-pharm-adme',
    subjectId: 'pharmacologie',
    title: 'Pharmacocinétique (ADME), Biodisponibilité & Posologie',
    order: 1,
    summary:
      'Absorption, Distribution, Métabolisme hépatique (CYP450), Élimination rénale, demi-vie T₁/₂ et calculs de doses pédiatriques.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-pharm-adme',
    ficheId: 'fiche-pharm-adme',
  },
  {
    id: 'ch-pharm-therap',
    subjectId: 'pharmacologie',
    title: 'Antibiotiques, Antipaludéens (CTA) & Bon usage du médicament',
    order: 2,
    summary:
      'Spectre bactérien, prévention de l’antibiorésistance, combinaisons thérapeutiques à base d’artémisinine (CTA) et pharmacovigilance.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-pharm-therap',
    ficheId: 'fiche-pharm-therap',
  },
  // Logistique & Commerce International
  {
    id: 'ch-log-incoterms',
    subjectId: 'logistique_ci',
    title: 'Incoterms® 2020, Transport multimodal & Dédouanement',
    order: 1,
    summary:
      'Règles multimodales (EXW, FCA, CPT, CIP, DAP, DPU, DDP) vs maritimes (FAS, FOB, CFR, CIF) et valeur en douane.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-log-incoterms',
    ficheId: 'fiche-log-incoterms',
  },
  {
    id: 'ch-log-stocks',
    subjectId: 'logistique_ci',
    title: 'Gestion des stocks, Méthode ABC & Formule de Wilson',
    order: 2,
    summary:
      'Classification Pareto (20/80), stock d’alerte, stock de sécurité, FIFO/FEFO (chaîne du froid) et quantité économique de commande.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-log-stocks',
    ficheId: 'fiche-log-stocks',
  },
  // GRH & Droit du Travail
  {
    id: 'ch-grh-droit',
    subjectId: 'grh_travail',
    title: 'Contrat de travail (CDI, CDD), Lien de subordination & Rupture',
    order: 1,
    summary:
      'Trois éléments constitutifs du contrat de travail, période d’essai, licenciement pour motif personnel/économique et inspection du travail.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-grh-droit',
    ficheId: 'fiche-grh-droit',
  },
  {
    id: 'ch-grh-gpec',
    subjectId: 'grh_travail',
    title: 'Recrutement, GPEC, Indicateurs RH & Dialogue social',
    order: 2,
    summary:
      'Gestion prévisionnelle des emplois et compétences, taux de turnover, absentéisme, entretien annuel et négociation collective.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-grh-gpec',
    ficheId: 'fiche-grh-gpec',
  },
];

export const APEX_COURSES: Course[] = [
  // Relations Internationales
  {
    id: 'course-ri-onu',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-onu',
    title: 'Système onusien, Union Africaine & Intégration régionale',
    durationMinutes: 30,
    sizeKb: 220,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-ri-o1',
        heading: '1. Architecture de l’ONU et maintien de la paix',
        content:
          'Fondée par la Charte de San Francisco (26 juin 1945), l’ONU s’articule autour de grands organes : l’Assemblée générale (193 États membres, 1 État = 1 voix, résolutions à portée recommandatoire), le Conseil de sécurité (15 membres dont 5 permanents — Chine, États-Unis, France, Royaume-Uni, Russie — disposant du droit de veto et adoptant des résolutions contraignantes), la Cour internationale de Justice (La Haye) et le Secrétariat général.',
        keyTakeaway:
          'Seul le Conseil de sécurité de l’ONU peut adopter des résolutions juridiquement contraignantes en matière de paix et sécurité internationales (Chapitre VII).',
      },
      {
        id: 'sec-ri-o2',
        heading: '2. Union Africaine, CEMAC/UEMOA et ZLECAf',
        content:
          'Succédant à l’OUA en 2002 (siège à Addis-Abeba), l’Union Africaine porte l’Agenda 2063 et la Zone de Libre-Échange Continentale Africaine (ZLECAf, secrétariat à Accra), entrée en vigueur en 2019 pour créer le plus grand marché unique par nombre d’États au monde. À l’échelle sous-régionale, la CEMAC (6 États d’Afrique centrale, monnaie FCFA émise par la BEAC) et la CEDEAO/UEMOA approfondissent la libre circulation et la convergence économique.',
        keyTakeaway:
          'Sièges clés à connaître : ONU (New York), CIJ (La Haye), UA (Addis-Abeba), ZLECAf (Accra), Commission CEMAC (Bangui), BEAC (Yaoundé).',
      },
    ],
  },
  {
    id: 'course-ri-geopol',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-geopol',
    title: 'Géopolitique de l’eau, du Sahel et des ressources stratégiques',
    durationMinutes: 25,
    sizeKb: 205,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-ri-g1',
        heading: '1. Hydro-diplomatie et bassin du Lac Tchad',
        content:
          'Les bassins hydrographiques transfrontaliers constituent un enjeu diplomatique et sécuritaire majeur. La Commission du Bassin du Lac Tchad (CBLT, siège à N’Djamena, créée en 1964) coordonne la gestion durable des eaux du Chari-Logone et du Lac Tchad entre les États riverains face à la pression démographique et climatique. De même, la gestion partagée du Nil (GERD) ou du fleuve Niger (ABN) illustre l’importance des traités de coopération hydrique.',
        keyTakeaway:
          'L’hydro-diplomatie transforme une ressource rare partagée en levier de coopération régionale plutôt qu’en source de conflit.',
      },
      {
        id: 'sec-ri-g2',
        heading: '2. Diplomatie climatique et Accord de Paris',
        content:
          'Adopté lors de la COP21 en décembre 2015, l’Accord de Paris vise à maintenir le réchauffement climatique nettement en dessous de 2 °C (en poursuivant les efforts pour 1,5 °C) par rapport aux niveaux préindustriels. Les pays africains, qui représentent moins de 4 % des émissions historiques de gaz à effet de serre mais subissent de plein fouet les chocs climatiques, plaident pour la finance climatique (adaptation, fonds Pertes & Préjudices).',
        keyTakeaway:
          'Accord de Paris (2015) : objectif < 2 °C (idéalement 1,5 °C) + Contributions Déterminées au niveau National (CDN) révisées tous les 5 ans.',
      },
    ],
  },
  // Agronomie & Environnement
  {
    id: 'course-agro-sols',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-sols',
    title: 'Fertilité des sols, Cycle de l’azote & Agroécologie',
    durationMinutes: 30,
    sizeKb: 220,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-ag-s1',
        heading: '1. Complexe argilo-humique (CAH) et fertilité minérale',
        content:
          'La fertilité d’un sol repose sur le complexe argilo-humique (CAH), association d’argiles et d’humus chargée négativement qui retient les cations nutritifs (Ca²⁺, Mg²⁺, K⁺, NH₄⁺) et limite leur lessivage par les pluies. Les trois macronutriments primaires des plantes sont l’azote (N, croissance foliaire), le phosphore (P, enracinement et floraison) et le potassium (K, résistance hydrique et qualité des fruits).',
        keyTakeaway:
          'Le CAH est chargé négativement : il retient les cations (K⁺, Ca²⁺, NH₄⁺) mais ne retient pas les nitrates (NO₃⁻), facilement lessivés.',
        diagramId: 'cycle_azote',
      },
      {
        id: 'sec-ag-s2',
        heading: '2. Fixation biologique de l’azote et rotation agroécologique',
        content:
          'Les légumineuses (niébé, arachide, soja, luzerne, Acacia albida / Faidherbia) vivent en symbiose avec des bactéries du genre Rhizobium logées dans leurs nodosités racinaires : elles transforment l’azote atmosphérique N₂ en azote assimilable. Associer ou faire tourner céréales (mil, sorgho, maïs) et légumineuses enrichit naturellement le sol tout en brisant les cycles des ravageurs.',
        keyTakeaway:
          'Rotation Céréales ↔ Légumineuses = fertilisation azotée naturelle gratuite + meilleure structure du sol.',
      },
    ],
  },
  {
    id: 'course-agro-climat',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-climat',
    title: 'Adaptation climatique, Eau & Lutte contre la désertification',
    durationMinutes: 25,
    sizeKb: 205,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-ag-c1',
        heading: '1. Techniques CES/DRS en zones arides et semi-arides',
        content:
          'En zone sahélienne, la conservation des eaux et des sols (CES) restaure les terres encroûtées grâce au zaï (micro-cuvettes enrichies en compost qui concentrent l’eau de pluie et la matière organique au pied du plant), aux demi-lunes anti-érosives, aux cordons pierreux suivant les courbes de niveau et à la Régénération Naturelle Assistée (RNA) des arbres fertilitaires.',
        keyTakeaway:
          'Zaï + cordons pierreux + RNA peuvent doubler les rendements céréaliers tout en rechargeant la nappe phréatique locale.',
      },
      {
        id: 'sec-ag-c2',
        heading: '2. Irrigation efficiente et Grande Muraille Verte',
        content:
          'L’irrigation goutte-à-goutte délivre l’eau directement à la zone racinaire avec une efficience de 85 à 95 % (contre 40 à 55 % en irrigation gravitaire à la raie), limitant l’évaporation et la salinisation. L’initiative de la Grande Muraille Verte (lancée par l’UA en 2007 de Dakar à Djibouti, traversant le Tchad) combine reboisement, agroforesterie et emplois verts ruraux.',
        keyTakeaway:
          'Efficience hydrique : Goutte-à-goutte (85–95 %) > Aspersion (70–80 %) > Gravitaire (40–55 %).',
      },
    ],
  },
  // Énergies Renouvelables
  {
    id: 'course-enr-solaire',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-solaire',
    title: 'Dimensionnement d’une installation solaire photovoltaïque',
    durationMinutes: 30,
    sizeKb: 230,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-enr-s1',
        heading: '1. Chaîne PV autonome et calcul de la puissance crête',
        content:
          'Une installation photovoltaïque autonome associe des modules PV (courant continu DC), un régulateur MPPT (qui suit le point de puissance maximale et protège la batterie), un parc batteries (stockage pour la nuit et les jours couverts) et un onduleur (conversion DC → 230 V AC). La puissance crête requise se calcule à partir du besoin énergétique journalier E_j (Wh/j), de l’ensoleillement équivalent H_s (heures de soleil pic/j, souvent 5 à 6 h au Sahel) et du rendement global k (≈ 0,65 à 0,75).',
        keyTakeaway:
          'Un régulateur MPPT extrait 15 à 30 % d’énergie en plus qu’un régulateur PWM classique.',
        formula: 'P_c (Wc) = E_j / (H_s × k)',
        diagramId: 'photovoltaique',
      },
      {
        id: 'sec-enr-s2',
        heading: '2. Dimensionnement du parc batteries (autonomie & DoD)',
        content:
          'La capacité de stockage C (en Ah) dépend du besoin journalier E_j, du nombre de jours d’autonomie N, de la tension du parc U (12 V, 24 V ou 48 V) et de la profondeur de décharge maximale admise DoD (0,50 pour du plomb-acide AGM/Gel afin de préserver sa durée de vie ; jusqu’à 0,80–0,90 pour du Lithium LiFePO₄).',
        keyTakeaway:
          'Ne jamais décharger une batterie plomb-acide à 100 % : limiter la profondeur de décharge (DoD) à 50 % multiplie sa durée de vie.',
        formula: 'C (Ah) = (E_j × N) / (U × DoD × η_ond)',
      },
    ],
  },
  {
    id: 'course-enr-elec',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-elec',
    title: 'Puissances électriques (P, Q, S), Facteur de puissance & Sécurité',
    durationMinutes: 30,
    sizeKb: 225,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-enr-e1',
        heading: '1. Puissance active P, réactive Q et apparente S',
        content:
          'En courant alternatif sinusoïdal monophasé, la puissance active utile vaut P = U · I · cos φ (en Watts, W), la puissance réactive vaut Q = U · I · sin φ (en VAR) et la puissance apparente vaut S = U · I (en VA), liées par le théorème de Pythagore S² = P² + Q². Un facteur de puissance cos φ faible (< 0,85, causé par des moteurs inductifs) augmente le courant en ligne et les pertes par effet Joule (R·I²) : on le relève en ajoutant une batterie de condensateurs.',
        keyTakeaway:
          'Ajouter des condensateurs en parallèle d’une charge inductive améliore cos φ et réduit les pertes en ligne.',
        formula: 'P = U·I·cos φ (W)   |   S = U·I (VA)   |   S² = P² + Q²',
      },
      {
        id: 'sec-enr-e2',
        heading: '2. Protection des personnes et des installations',
        content:
          'La protection contre les surintensités (surcharges et courts-circuits) est assurée par le disjoncteur magnétothermique ou les fusibles. La protection des personnes contre les contacts indirects et directs repose sur l’association d’une prise de terre et d’un dispositif différentiel haute sensibilité (DDR 30 mA), qui coupe le circuit dès qu’un courant de fuite dépasse 30 mA.',
        keyTakeaway:
          'Disjoncteur magnétothermique = protège les câbles/appareils ; Différentiel 30 mA + Terre = protège les vies humaines.',
      },
    ],
  },
  // Pharmacologie
  {
    id: 'course-pharm-adme',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-adme',
    title: 'Pharmacocinétique (ADME), Biodisponibilité & Posologie',
    durationMinutes: 30,
    sizeKb: 225,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-ph-a1',
        heading: '1. Les 4 étapes ADME et l’effet de premier passage hépatique',
        content:
          'La pharmacocinétique étudie le devenir du médicament dans l’organisme selon 4 phases (ADME) : Absorption (passage dans la circulation sanguine), Distribution (diffusion vers les tissus), Métabolisme (biotransformation principalement hépatique via les enzymes CYP450) et Élimination (principalement rénale ou biliaire). La biodisponibilité (F) est égale à 100 % par voie intraveineuse (IV), mais peut être réduite par voie orale en raison de l’effet de premier passage hépatique.',
        keyTakeaway:
          'Biodisponibilité par voie intraveineuse (IV) = toujours 100 % (pas de barrière d’absorption ni de premier passage).',
        diagramId: 'pharmacocinetique',
      },
      {
        id: 'sec-ph-a2',
        heading: '2. Demi-vie plasmatique (T₁/₂) et calculs de posologie',
        content:
          'La demi-vie T₁/₂ est le temps nécessaire pour que la concentration plasmatique d’un médicament diminue de moitié. Après 5 demi-vies (5 × T₁/₂), plus de 97 % du médicament est éliminé (et l’état d’équilibre est atteint après 5 demi-vies lors d’administrations répétées). En pédiatrie, la posologie se calcule rigoureusement au poids corporel (mg/kg/jour), sans jamais dépasser la dose maximale adulte.',
        keyTakeaway:
          'Règle des 5 demi-vies : à t = 5 · T₁/₂, on atteint ≈ 97 % d’élimination (ou 97 % de l’état d’équilibre).',
        formula: 'Dose journalière = Posologie (mg/kg/j) × Poids (kg)   |   Équilibre ≈ 5 × T₁/₂',
      },
    ],
  },
  {
    id: 'course-pharm-therap',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-therap',
    title: 'Antibiotiques, Antipaludéens (CTA) & Bon usage du médicament',
    durationMinutes: 25,
    sizeKb: 215,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-ph-t1',
        heading: '1. Antibiotiques et lutte contre l’antibiorésistance',
        content:
          'Les antibiotiques agissent exclusivement sur les bactéries (jamais sur les virus comme la grippe ou le rhume banal). On distingue les bactéricides (tuent les bactéries, ex. bêta-lactamines/amoxicilline) des bactériostatiques (stoppent leur multiplication, ex. macrolides, tétracyclines). L’automédication, le sous-dosage et l’arrêt prématuré du traitement sélectionnent des bactéries multirésistantes (BMR), menace majeure de santé mondiale.',
        keyTakeaway:
          'Antibiotiques = inefficaces contre les virus ; toujours respecter la dose, l’intervalle et la durée prescrits.',
      },
      {
        id: 'sec-ph-t2',
        heading: '2. Prise en charge du paludisme (recommandations OMS)',
        content:
          'Conformément aux directives de l’OMS, tout paludisme suspecté doit être confirmé par un test de diagnostic rapide (TDR) ou une goutte épaisse avant traitement. Le paludisme simple à Plasmodium falciparum se traite par une Combinaison Thérapeutique à base d’Artémisinine (CTA, ex. Artéméther-Luméfantrine) afin de prévenir les résistances ; le paludisme grave est une urgence hospitalière traitée en première intention par Artésunate injectable (IV/IM).',
        keyTakeaway:
          'Paludisme simple → CTA orale ; Paludisme grave → Artésunate injectable (IV/IM) en urgence.',
      },
    ],
  },
  // Logistique & Commerce International
  {
    id: 'course-log-incoterms',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-incoterms',
    title: 'Incoterms® 2020, Transport multimodal & Dédouanement',
    durationMinutes: 30,
    sizeKb: 225,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-log-i1',
        heading: '1. Les 11 Incoterms® 2020 : frais, risques et modes de transport',
        content:
          'Publiés par la Chambre de Commerce Internationale (CCI), les Incoterms® 2020 définissent le partage des frais, des formalités douanières et du point de transfert des risques (mais PAS le transfert de propriété !). Sept règles sont multimodales (EXW, FCA, CPT, CIP, DAP, DPU, DDP) et quatre sont strictement réservées au transport maritime/fluvial (FAS, FOB, CFR, CIF). EXW impose le minimum d’obligations au vendeur ; DDP lui impose le maximum (jusqu’au dédouanement import inclus).',
        keyTakeaway:
          'Les Incoterms règlent le transfert des FRAIS et des RISQUES, jamais le transfert de propriété ni le mode de paiement.',
        diagramId: 'incoterms_chaine',
      },
      {
        id: 'sec-log-i2',
        heading: '2. Valeur en douane et particularité des pays enclavés',
        content:
          'À l’importation, les droits de douane dans l’espace CEMAC/UEMOA sont calculés sur la valeur transactionnelle CAF (Coût + Assurance + Fret) au point d’entrée. Pour un pays enclavé (comme le Tchad desservi par les corridors Douala–N’Djamena ou Kribi), le transit douanier international (acquit-à-caution, suivi GPS) et le choix entre FCA, CIP ou DAP sécurisent le transport terrestre post-portuaire.',
        keyTakeaway:
          'Pour le transport conteneurisé multimodal, la CCI recommande FCA / CPT / CIP plutôt que FOB / CIF.',
        formula: 'Valeur en douane (base CAF/CIF) = Valeur FOB + Fret principal + Assurance',
      },
    ],
  },
  {
    id: 'course-log-stocks',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-stocks',
    title: 'Gestion des stocks, Méthode ABC & Formule de Wilson',
    durationMinutes: 25,
    sizeKb: 210,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-log-s1',
        heading: '1. Classification ABC (Pareto) et règles FIFO / FEFO',
        content:
          'La méthode ABC applique la loi de Pareto (20/80) aux stocks : la classe A (~20 % des références représentant ~80 % de la valeur) fait l’objet d’un suivi très rigoureux, la classe B (~30 % des références / ~15 % valeur) d’un suivi intermédiaire, et la classe C (~50 % des références / ~5 % valeur) d’un suivi simplifié. Pour les produits périssables ou pharmaceutiques, la règle FEFO (First Expired, First Out) prime sur FIFO (First In, First Out).',
        keyTakeaway:
          'Produits de santé / alimentaires : toujours appliquer FEFO (premier périmé, premier sorti) pour zéro perte.',
      },
      {
        id: 'sec-log-s2',
        heading: '2. Stock d’alerte et quantité économique de Wilson',
        content:
          'Le stock d’alerte (point de commande) correspond à la consommation moyenne pendant le délai d’approvisionnement majorée du stock de sécurité. La formule de Wilson détermine la quantité optimale Q* à commander pour minimiser la somme du coût de passation des commandes et du coût de possession du stock.',
        keyTakeaway:
          'Point de commande = (Consommation journalière × Délai de livraison) + Stock de sécurité.',
        formula: 'Q* = √( 2 · D · C_c / C_p )   |   Stock d’alerte = (c × d) + SS',
      },
    ],
  },
  // GRH & Droit du Travail
  {
    id: 'course-grh-droit',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-droit',
    title: 'Contrat de travail (CDI, CDD), Lien de subordination & Rupture',
    durationMinutes: 25,
    sizeKb: 205,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-grh-d1',
        heading: '1. Définition du contrat de travail et types de contrats',
        content:
          'Le contrat de travail existe dès que trois éléments cumulatifs sont réunis : une prestation de travail, une rémunération (salaire) et un lien de subordination juridique (pouvoir de direction, de contrôle et de sanction de l’employeur). Le CDI (Contrat à Durée Indéterminée) est la forme normale et générale de la relation de travail ; le CDD est strictement encadré (écrit obligatoire, durée et renouvellements plafonnés, sinon requalifié en CDI).',
        keyTakeaway:
          'Le lien de subordination juridique est le critère décisif qui distingue le salarié du prestataire indépendant.',
        formula: 'Contrat de travail = Prestation + Rémunération + Subordination juridique',
      },
      {
        id: 'sec-grh-d2',
        heading: '2. Période d’essai et rupture du contrat',
        content:
          'La période d’essai permet à l’employeur d’évaluer les compétences du salarié et au salarié d’apprécier le poste ; elle doit être expressément prévue par écrit. Au-delà, tout licenciement doit reposer sur un motif légitime (faute, insuffisance professionnelle ou motif économique) et respecter la procédure légale (entretien préalable, notification motivée, préavis sauf faute lourde/grave).',
        keyTakeaway:
          'Sans motif réel et sérieux ou sans respect de la procédure, le licenciement est jugé abusif et ouvre droit à des dommages-intérêts.',
      },
    ],
  },
  {
    id: 'course-grh-gpec',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-gpec',
    title: 'Recrutement, GPEC, Indicateurs RH & Dialogue social',
    durationMinutes: 25,
    sizeKb: 205,
    updatedAt: '2026-04-08',
    sections: [
      {
        id: 'sec-grh-g1',
        heading: '1. GPEC et pilotage stratégique des compétences',
        content:
          'La Gestion Prévisionnelle des Emplois et des Compétences (GPEC) vise à anticiper les écarts entre les ressources humaines actuelles et les besoins futurs de l’organisation (évolutions technologiques, départs à la retraite, croissance). Elle mobilise quatre leviers : recrutement ciblé, formation continue, mobilité interne et reconversion.',
        keyTakeaway:
          'GPEC = passer d’une gestion administrative subie à une anticipation stratégique des métiers et compétences.',
      },
      {
        id: 'sec-grh-g2',
        heading: '2. Indicateurs clés du tableau de bord RH',
        content:
          'Le contrôle de gestion sociale suit le taux de turnover (rotation du personnel), le taux d’absentéisme (heures d’absence / heures théoriques travaillées) et la masse salariale. Un turnover élevé (> 15 % selon le secteur) signale souvent un problème d’intégration (onboarding), de management ou de compétitivité salariale.',
        keyTakeaway:
          'Taux de turnover = [((Entrées + Départs) / 2) / Effectif moyen] × 100 (ou Départs / Effectif initial selon la convention).',
        formula: 'Taux d’absentéisme = (Jours ou heures d’absence / Jours ou heures théoriques) × 100',
      },
    ],
  },
];

export const APEX_FICHES: Fiche[] = [
  // Relations Internationales
  {
    id: 'fiche-ri-onu',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-onu',
    title: 'ONU, Union Africaine & ZLECAf',
    subtitle: 'Institutions internationales et intégration africaine',
    sizeKb: 72,
    notionsEssentielles: [
      'Charte de l’ONU signée le 26 juin 1945 à San Francisco.',
      'Conseil de sécurité : 15 membres dont 5 permanents avec droit de veto (P5).',
      'Union Africaine (2002, Addis-Abeba) porte l’Agenda 2063 et la ZLECAf (Accra).',
      'CEMAC : 6 États membres, Commission à Bangui, BEAC à Yaoundé.',
    ],
    definitions: [
      { terme: 'Droit de veto', definition: 'Prérogative des 5 membres permanents du Conseil de sécurité permettant de bloquer une résolution de fond.' },
      { terme: 'ZLECAf', definition: 'Zone de Libre-Échange Continentale Africaine visant la suppression progressive des droits de douane intra-africains.' },
    ],
    formules: [
      { label: 'P5 Conseil de sécurité', formule: 'Chine · États-Unis · France · Royaume-Uni · Russie', unite: '5 membres' },
    ],
    datesReperes: [
      { repere: '26 juin 1945', detail: 'Signature de la Charte des Nations Unies à San Francisco.' },
      { repere: '9 juillet 2002', detail: 'Lancement officiel de l’Union Africaine (succédant à l’OUA de 1963).' },
      { repere: '30 mai 2019', detail: 'Entrée en vigueur de l’accord portant création de la ZLECAf.' },
    ],
    methodes: [
      'Toujours distinguer la portée juridique des résolutions de l’Assemblée générale (recommandations) de celles du Conseil de sécurité (contraignantes sous Chapitre VII).',
    ],
    erreursFrequentes: [
      'Confondre la Cour Internationale de Justice (CIJ — litiges entre États) et la Cour Pénale Internationale (CPI — crimes commis par des individus).',
    ],
    exemples: [
      { titre: 'Cas pratique CIJ vs CPI', contenu: 'Différend frontalier entre deux États → CIJ (La Haye).' },
    ],
    resumeExpress:
      'Le système multilatéral articule ONU (paix/sécurité), Union Africaine (Agenda 2063, ZLECAf) et communautés économiques régionales (CEMAC, CEDEAO).',
    tableauComparatif: {
      headers: ['Critère', 'CIJ (Cour Internationale de Justice)', 'CPI (Cour Pénale Internationale)'],
      rows: [
        { critere: 'Statut ONU', elementA: 'Organe judiciaire principal de l’ONU', elementB: 'Juridiction indépendante (Statut de Rome 1998)' },
        { critere: 'Justiciables', elementA: 'Uniquement les États', elementB: 'Les individus (génocide, crimes de guerre...)' },
        { critere: 'Siège', elementA: 'La Haye (Pays-Bas)', elementB: 'La Haye (Pays-Bas)' },
      ],
    },
    autoEvaluation: [
      { question: 'Combien de membres permanents siègent au Conseil de sécurité de l’ONU ?', reponse: '5 (Chine, États-Unis, France, Royaume-Uni, Russie).' },
    ],
  },
  {
    id: 'fiche-ri-geopol',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-geopol',
    title: 'Hydro-diplomatie, Sahel & Climat',
    subtitle: 'CBLT, bassins transfrontaliers et Accord de Paris',
    sizeKb: 68,
    notionsEssentielles: [
      'CBLT (Commission du Bassin du Lac Tchad) créée en 1964, siège à N’Djamena.',
      'Chari-Logone fournit l’essentiel des apports hydriques du Lac Tchad.',
      'Accord de Paris (COP21, 2015) : contenir le réchauffement bien en dessous de 2 °C (1,5 °C).',
      'Afrique : < 4 % des émissions mondiales de GES mais forte vulnérabilité climatique.',
    ],
    definitions: [
      { terme: 'Hydro-diplomatie', definition: 'Gestion diplomatique concertée des ressources en eau transfrontalières.' },
      { terme: 'CDN', definition: 'Contributions Déterminées au niveau National : engagements climatiques de chaque État.' },
    ],
    formules: [
      { label: 'Objectif Accord de Paris', formule: 'ΔT < +2 °C (cible ambitieuse +1,5 °C)', unite: 'vs ère préindustrielle' },
    ],
    datesReperes: [
      { repere: '22 mai 1964', detail: 'Création de la Commission du Bassin du Lac Tchad (CBLT).' },
      { repere: '12 décembre 2015', detail: 'Adoption de l’Accord de Paris sur le climat (COP21).' },
    ],
    methodes: [
      'En dissertation de géopolitique, croiser 3 échelles : locale (populations), régionale (CBLT/UA) et mondiale (COP/ONU).',
    ],
    erreursFrequentes: [
      'Réduire la crise du Lac Tchad au seul climat sans intégrer la croissance démographique et les enjeux de gouvernance/sécurité.',
    ],
    exemples: [
      { titre: 'Coopération CBLT', contenu: 'Force Multinationale Mixte (FMM) + programmes de sauvegarde hydrologique du Lac Tchad.' },
    ],
    resumeExpress:
      'L’eau partagée (CBLT, Nil, Niger) et la justice climatique (Accord de Paris, finance adaptation) sont au cœur de la diplomatie africaine contemporaine.',
    tableauComparatif: {
      headers: ['Enjeu', 'Atténuation (Mitigation)', 'Adaptation'],
      rows: [
        { critere: 'Objectif', elementA: 'Réduire les émissions de GES', elementB: 'Réduire la vulnérabilité aux effets déjà présents' },
        { critere: 'Exemple', elementA: 'Solaire PV, sobriété énergétique', elementB: 'Semences tolérantes à la sécheresse, digues, zaï' },
        { critere: 'Priorité Afrique', elementA: 'Transition propre directe', elementB: 'Priorité vitale immédiate' },
      ],
    },
    autoEvaluation: [
      { question: 'Dans quelle ville siège la Commission du Bassin du Lac Tchad (CBLT) ?', reponse: 'N’Djamena (Tchad).' },
    ],
  },
  // Agronomie
  {
    id: 'fiche-agro-sols',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-sols',
    title: 'Fertilité des sols & Cycle de l’azote',
    subtitle: 'CAH, NPK, Rhizobium et rotations agroécologiques',
    sizeKb: 70,
    notionsEssentielles: [
      'CAH (complexe argilo-humique) : chargé négativement, fixe les cations (Ca²⁺, Mg²⁺, K⁺, NH₄⁺).',
      'Nitrates (NO₃⁻) chargés négativement : non retenus par le CAH → risque de lessivage.',
      'NPK : N (feuillage), P (racines/fleurs), K (fruits/résistance sécheresse).',
      'Symbiose Légumineuses + bactéries Rhizobium = fixation de N₂ atmosphérique.',
    ],
    definitions: [
      { terme: 'Complexe argilo-humique', definition: 'Association colloïdale d’argiles et d’humus formant le réservoir nutritif du sol.' },
      { terme: 'Nitrification', definition: 'Oxydation bactérienne de l’ammonium (NH₄⁺) en nitrites puis nitrates (NO₃⁻) assimilables.' },
    ],
    formules: [
      { label: 'Chaîne azotée du sol', formule: 'N₂ → (Fixation) → NH₄⁺ → (Nitrification) → NO₃⁻', unite: 'cycle N' },
    ],
    datesReperes: [
      { repere: '1888 — Hellriegel & Wilfarth', detail: 'Mise en évidence de la fixation symbiotique de l’azote par les légumineuses.' },
    ],
    methodes: [
      'Retenir les signes électriques : CAH (−) attire cations (+) et repousse anions (−) comme NO₃⁻.',
    ],
    erreursFrequentes: [
      'Affirmer que le CAH retient directement les ions nitrates NO₃⁻.',
    ],
    exemples: [
      { titre: 'Association mil / niébé', contenu: 'Le niébé (légumineuse) enrichit le sol en azote au bénéfice de la céréale suivante.' },
    ],
    resumeExpress:
      'Un sol vivant et fertile associe un CAH riche en humus, une couverture organique et des légumineuses fixatrices d’azote.',
    tableauComparatif: {
      headers: ['Élément', 'Rôle physiologique majeur', 'Symptôme de carence'],
      rows: [
        { critere: 'Azote (N)', elementA: 'Croissance végétative / chlorophylle', elementB: 'Jaunissement (chlorose) des vieilles feuilles' },
        { critere: 'Phosphore (P)', elementA: 'Enracinement, transfert d’énergie (ATP)', elementB: 'Croissance ralentie, teinte violacée' },
        { critere: 'Potassium (K)', elementA: 'Régulation hydrique, qualité fruits', elementB: 'Nécrose des bords de feuilles' },
      ],
    },
    autoEvaluation: [
      { question: 'Pourquoi les nitrates NO₃⁻ sont-ils facilement lessivés par les pluies ?', reponse: 'Parce que NO₃⁻ et le complexe argilo-humique sont tous deux chargés négativement (répulsion électrostatique).' },
    ],
  },
  {
    id: 'fiche-agro-climat',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-climat',
    title: 'Eau, CES/DRS & Résilience climatique',
    subtitle: 'Zaï, demi-lunes, goutte-à-goutte et Grande Muraille Verte',
    sizeKb: 66,
    notionsEssentielles: [
      'Zaï : poquets enrichis en compost piégeant les eaux de ruissellement.',
      'Cordons pierreux et demi-lunes : freinent l’érosion hydrique et favorisent l’infiltration.',
      'Irrigation goutte-à-goutte : efficience hydrique de 85 à 95 %.',
      'RNA (Régénération Naturelle Assistée) & Grande Muraille Verte (UA, 2007).',
    ],
    definitions: [
      { terme: 'Zaï', definition: 'Technique traditionnelle sahélienne de micro-cuvettes fertilisées permettant de réhabiliter des sols dégradés.' },
      { terme: 'RNA', definition: 'Protection et taille sélective des jeunes pousses d’arbres utiles directement dans les champs cultivés.' },
    ],
    formules: [
      { label: 'Efficience goutte-à-goutte', formule: '85 % à 95 % (vs 40–55 % en gravitaire)', unite: '%' },
    ],
    datesReperes: [
      { repere: '2007 — Union Africaine', detail: 'Lancement de l’initiative panafricaine de la Grande Muraille Verte.' },
    ],
    methodes: [
      'Toujours implanter les cordons pierreux perpendiculairement à la pente (le long des courbes de niveau).',
    ],
    erreursFrequentes: [
      'Aligner les sillons dans le sens de la pente (ce qui accélère le ravinement et l’érosion !).',
    ],
    exemples: [
      { titre: 'Agroforesterie à Faidherbia albida', contenu: 'Arbre à phénologie inversée (perd ses feuilles en saison des pluies → ombre en saison sèche, fertilisation en culture).' },
    ],
    resumeExpress:
      'En zone semi-aride, zaï, cordons pierreux, RNA et goutte-à-goutte maximisent chaque goutte de pluie et restaurent durablement les sols.',
    tableauComparatif: {
      headers: ['Technique', 'Efficience eau', 'Atout principal'],
      rows: [
        { critere: 'Gravitaire', elementA: '40 – 55 %', elementB: 'Faible investissement initial' },
        { critere: 'Aspersion', elementA: '70 – 80 %', elementB: 'Adaptée aux grandes parcelles' },
        { critere: 'Goutte-à-goutte', elementA: '85 – 95 %', elementB: 'Économie maximale d’eau et fertigation' },
      ],
    },
    autoEvaluation: [
      { question: 'Comment doit-on orienter des cordons pierreux anti-érosifs ?', reponse: 'Perpendiculairement à la pente, en suivant les courbes de niveau.' },
    ],
  },
  // Énergies Renouvelables
  {
    id: 'fiche-enr-solaire',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-solaire',
    title: 'Dimensionnement Solaire Photovoltaïque',
    subtitle: 'Puissance crête (Wc), MPPT, batteries et onduleur',
    sizeKb: 72,
    notionsEssentielles: [
      'Chaîne autonome : Panneaux PV → Régulateur MPPT → Batteries → Onduleur → Charges AC.',
      'Puissance crête P_c = E_j / (H_s × k) avec k ≈ 0,65–0,75.',
      'Capacité batterie C (Ah) = (E_j × N) / (U × DoD × η_ond).',
      'DoD max conseillé : 50 % (plomb-acide) vs 80–90 % (Lithium LiFePO₄).',
    ],
    definitions: [
      { terme: 'Watt-crête (Wc)', definition: 'Puissance électrique maximale délivrée par un panneau en conditions standard (1000 W/m², 25 °C, AM 1,5).' },
      { terme: 'MPPT', definition: 'Maximum Power Point Tracking : algorithme optimisant en continu tension/courant du panneau.' },
    ],
    formules: [
      { label: 'Puissance crête PV', formule: 'P_c = E_j / (H_s × k)', unite: 'Wc' },
      { label: 'Capacité batterie', formule: 'C = (E_j × N) / (U × DoD × η)', unite: 'Ah' },
    ],
    datesReperes: [
      { repere: '1839 — Edmond Becquerel', detail: 'Découverte de l’effet photovoltaïque.' },
    ],
    methodes: [
      'Commencer toujours par établir le bilan énergétique journalier E_j = Σ (Puissance × Durée d’utilisation) en Wh/j.',
    ],
    erreursFrequentes: [
      'Oublier les pertes globales k (température, câbles, batterie, onduleur) et sous-dimensionner les panneaux de 30 %.',
    ],
    exemples: [
      { titre: 'Exemple rapide PV', contenu: 'E_j = 2 100 Wh/j, H_s = 5 h/j, k = 0,70 → P_c = 2 100 / (5 × 0,70) = 600 Wc.' },
    ],
    resumeExpress:
      'Pour dimensionner un système solaire fiable : 1) bilan Wh/j, 2) P_c = E_j/(H_s·k), 3) batterie avec DoD adapté, 4) MPPT + onduleur pur sinus.',
    tableauComparatif: {
      headers: ['Critère', 'Batterie Plomb-Gel / AGM', 'Batterie Lithium LiFePO₄'],
      rows: [
        { critere: 'Profondeur décharge (DoD)', elementA: '50 % recommandée', elementB: '80 % à 90 %' },
        { critere: 'Nombre de cycles', elementA: '600 – 1 200 cycles', elementB: '3 000 – 6 000 cycles' },
        { critere: 'Coût initial / Durée vie', elementA: 'Plus bas / 3–5 ans', elementB: 'Plus élevé / 10+ ans' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle puissance crête faut-il pour E_j = 3 500 Wh/j avec H_s = 5 h et k = 0,7 ?', reponse: 'P_c = 3 500 / 3,5 = 1 000 Wc (1 kWc).' },
    ],
  },
  {
    id: 'fiche-enr-elec',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-elec',
    title: 'Puissances AC & Sécurité Électrique',
    subtitle: 'Triangle P-Q-S, cos φ et protection différentielle 30 mA',
    sizeKb: 70,
    notionsEssentielles: [
      'Monophasé : P = U·I·cos φ (W), Q = U·I·sin φ (VAR), S = U·I (VA).',
      'Relation fondamentale : S² = P² + Q² et cos φ = P / S.',
      'Relèvement du cos φ par batterie de condensateurs en parallèle.',
      'Différentiel 30 mA + mise à la terre = protection vitale des personnes.',
    ],
    definitions: [
      { terme: 'Facteur de puissance (cos φ)', definition: 'Rapport de la puissance active P sur la puissance apparente S (compris entre 0 et 1).' },
      { terme: 'DDR 30 mA', definition: 'Dispositif Différentiel Résiduel ouvrant le circuit dès 30 mA de fuite vers la terre.' },
    ],
    formules: [
      { label: 'Puissance active monophasée', formule: 'P = U · I · cos φ', unite: 'W' },
      { label: 'Puissance active triphasée', formule: 'P = √3 · U · I · cos φ', unite: 'W' },
    ],
    datesReperes: [
      { repere: 'Seuil fibrillation cardiaque', detail: 'Un courant alternatif > 30–50 mA traversant le thorax est mortel.' },
    ],
    methodes: [
      'Toujours vérifier les unités : W (active), VAR (réactive), VA (apparente).',
    ],
    erreursFrequentes: [
      'Confondre un disjoncteur magnétothermique (protège les câbles) avec un différentiel 30 mA (protège les personnes).',
    ],
    exemples: [
      { titre: 'Calcul de puissance active', contenu: 'U = 230 V, I = 10 A, cos φ = 0,8 → S = 2 300 VA et P = 1 840 W.' },
    ],
    resumeExpress:
      'Maîtriser P = U·I·cos φ, le relèvement de cos φ par condensateurs et la séparation protection matérielle / protection humaine (30 mA + terre).',
    tableauComparatif: {
      headers: ['Protection', 'Appareil', 'Défaut couvert'],
      rows: [
        { critere: 'Câbles & machines', elementA: 'Disjoncteur magnétothermique', elementB: 'Surcharges & courts-circuits' },
        { critere: 'Personnes', elementA: 'Différentiel 30 mA + Terre', elementB: 'Courants de fuite / électrocution' },
        { critere: 'Surtensions', elementA: 'Parafoudre', elementB: 'Foudre et pics réseau' },
      ],
    },
    autoEvaluation: [
      { question: 'Que vaut S si P = 800 W et Q = 600 VAR ?', reponse: 'S = √(800² + 600²) = 1 000 VA (donc cos φ = 0,8).' },
    ],
  },
  // Pharmacologie
  {
    id: 'fiche-pharm-adme',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-adme',
    title: 'Pharmacocinétique ADME & Posologie',
    subtitle: 'Biodisponibilité, CYP450, demi-vie et calcul de dose',
    sizeKb: 72,
    notionsEssentielles: [
      'ADME : Absorption, Distribution, Métabolisme (foie CYP450), Élimination (reins/bile).',
      'Biodisponibilité (F) = 100 % par voie intraveineuse (IV).',
      'Après 5 demi-vies (5 × T₁/₂), ~97 % du médicament est éliminé.',
      'Posologie pédiatrique calculée en mg/kg/jour.',
    ],
    definitions: [
      { terme: 'Biodisponibilité (F)', definition: 'Fraction de la dose administrée atteignant la circulation systémique sous forme inchangée.' },
      { terme: 'Demi-vie (T₁/₂)', definition: 'Temps nécessaire pour diviser par deux la concentration plasmatique.' },
    ],
    formules: [
      { label: 'Élimination / Équilibre', formule: '≈ 97 % atteints au bout de 5 × T₁/₂', unite: 'heures' },
      { label: 'Dose enfant', formule: 'Dose/j = Posologie (mg/kg/j) × Poids (kg)', unite: 'mg/j' },
    ],
    datesReperes: [
      { repere: 'Règle des 5 T₁/₂', detail: 'Après 1 T₁/₂ : 50 % restant · 2 T₁/₂ : 25 % · 3 T₁/₂ : 12,5 % · 5 T₁/₂ : 3,1 %.' },
    ],
    methodes: [
      'Pour un calcul de dose par prise : calculer d’abord la dose journalière totale puis diviser par le nombre de prises/24 h.',
    ],
    erreursFrequentes: [
      'Oublier de diviser la dose journalière par le nombre de prises (risque de surdosage majeur !).',
    ],
    exemples: [
      { titre: 'Calcul pédiatrique', contenu: 'Enfant de 15 kg, paracétamol 60 mg/kg/j en 4 prises → 900 mg/j soit 225 mg par prise.' },
    ],
    resumeExpress:
      'ADME décrit le trajet du médicament ; la voie IV a F = 100 %, l’élimination quasi complète prend 5 demi-vies et la posologie pédiatrique dépend du poids.',
    tableauComparatif: {
      headers: ['Voie', 'Biodisponibilité F', 'Premier passage hépatique'],
      rows: [
        { critere: 'Intraveineuse (IV)', elementA: '100 % (immédiate)', elementB: 'Aucun' },
        { critere: 'Orale (per os)', elementA: 'Variable (< 100 %)', elementB: 'Oui (veine porte → foie)' },
        { critere: 'Sublinguale', elementA: 'Élevée & rapide', elementB: 'Évité' },
      ],
    },
    autoEvaluation: [
      { question: 'Si T₁/₂ = 6 heures, au bout de combien de temps ≈ 97 % du médicament est-il éliminé ?', reponse: '5 × 6 h = 30 heures.' },
    ],
  },
  {
    id: 'fiche-pharm-therap',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-therap',
    title: 'Antibiotiques, Antipaludéens (CTA) & Bon usage',
    subtitle: 'Bactéricides, antibiorésistance et protocole paludisme OMS',
    sizeKb: 68,
    notionsEssentielles: [
      'Antibiotiques : actifs uniquement sur les bactéries, jamais sur les virus.',
      'Bactéricide (tue) vs Bactériostatique (bloque la croissance).',
      'Paludisme simple : confirmation TDR/goutte épaisse puis CTA orale.',
      'Paludisme grave : Artésunate injectable (IV/IM) en urgence.',
    ],
    definitions: [
      { terme: 'CTA', definition: 'Combinaison Thérapeutique à base d’Artémisinine, traitement de référence OMS du paludisme simple.' },
      { terme: 'Pharmacovigilance', definition: 'Surveillance, détection et prévention des effets indésirables des médicaments.' },
    ],
    formules: [
      { label: 'Protocole paludisme OMS', formule: 'Test (TDR/GE) → Simple : CTA orale | Grave : Artésunate IV/IM', unite: 'clinique' },
    ],
    datesReperes: [
      { repere: '1928 — Alexander Fleming', detail: 'Découverte de la pénicilline, premier antibiotique moderne.' },
      { repere: '2015 — Tu Youyou (Prix Nobel)', detail: 'Découverte de l’artémisinine contre le paludisme.' },
    ],
    methodes: [
      'Toujours vérifier les contre-indications majeures : grossesse, allergie connue, insuffisance rénale/hépatique.',
    ],
    erreursFrequentes: [
      'Prescrire un antibiotique pour une rhinopharyngite virale ou traiter un paludisme en monothérapie d’artémisinine.',
    ],
    exemples: [
      { titre: 'Bon usage CTA', contenu: 'Prendre Artéméther-Luméfantrine avec un repas légèrement gras améliore l’absorption de la luméfantrine.' },
    ],
    resumeExpress:
      'Zéro antibiotique contre les virus, respect strict des durées contre l’antibiorésistance, et protocole OMS TDR + CTA (simple) / Artésunate IV (grave).',
    tableauComparatif: {
      headers: ['Situation paludisme', 'Traitement 1re intention OMS', 'Voie d’administration'],
      rows: [
        { critere: 'Paludisme simple', elementA: 'CTA (ex. Artéméther-Luméfantrine)', elementB: 'Orale (3 jours)' },
        { critere: 'Paludisme grave', elementA: 'Artésunate injectable', elementB: 'Intraveineuse / IM (urgence)' },
        { critere: 'Prévention grossesse', elementA: 'TPIg (Sulfadoxine-Pyriméthamine)', elementB: 'Orale dès le 2e trimestre' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel est le traitement de 1re intention OMS du paludisme grave ?', reponse: 'L’Artésunate injectable (IV ou IM).' },
    ],
  },
  // Logistique & Commerce International
  {
    id: 'fiche-log-incoterms',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-incoterms',
    title: 'Incoterms® 2020 & Dédouanement',
    subtitle: '11 règles CCI, frais, risques et valeur en douane CAF',
    sizeKb: 72,
    notionsEssentielles: [
      '7 Incoterms multimodaux : EXW, FCA, CPT, CIP, DAP, DPU, DDP.',
      '4 Incoterms maritimes uniquement : FAS, FOB, CFR, CIF.',
      'EXW = obligation minimale du vendeur ; DDP = obligation maximale du vendeur.',
      'Les Incoterms ne traitent PAS du transfert de propriété.',
    ],
    definitions: [
      { terme: 'FOB (Free On Board)', definition: 'Maritime uniquement : transfert des risques lorsque la marchandise est à bord du navire au port d’embarquement.' },
      { terme: 'DDP (Delivered Duty Paid)', definition: 'Le vendeur assume tous les frais, risques et le dédouanement import jusqu’au lieu convenu.' },
    ],
    formules: [
      { label: 'Valeur CAF / CIF (base douane)', formule: 'CIF = FOB + Fret principal + Assurance transport', unite: 'FCFA / € / $' },
    ],
    datesReperes: [
      { repere: '1er janvier 2020', detail: 'Entrée en vigueur des Incoterms® 2020 (DAT remplacé par DPU).' },
    ],
    methodes: [
      'Vérifier d’abord le mode de transport : si avion, route ou conteneur multimodal, exclure FAS/FOB/CFR/CIF.',
    ],
    erreursFrequentes: [
      'Croire que sous CIF les risques sont transférés au port d’arrivée (faux : les risques passent dès l’embarquement à bord du navire, seuls le fret et l’assurance sont payés jusqu’à destination !).',
    ],
    exemples: [
      { titre: 'Calcul valeur CIF', contenu: 'FOB = 10 000 000 FCFA, Fret = 1 200 000 FCFA, Assurance = 150 000 FCFA → CIF = 11 350 000 FCFA.' },
    ],
    resumeExpress:
      'Les 11 Incoterms® 2020 répartissent frais, risques et douane de EXW à DDP ; la valeur CIF/CAF sert de base aux droits de douane à l’importation.',
    tableauComparatif: {
      headers: ['Critère', 'EXW (Ex Works)', 'DDP (Delivered Duty Paid)'],
      rows: [
        { critere: 'Douane export', elementA: 'Acheteur', elementB: 'Vendeur' },
        { critere: 'Transport principal', elementA: 'Acheteur', elementB: 'Vendeur' },
        { critere: 'Douane import & taxes', elementA: 'Acheteur', elementB: 'Vendeur' },
      ],
    },
    autoEvaluation: [
      { question: 'Lequel des deux — FCA ou FOB — doit être utilisé pour du fret aérien ou conteneurisé ?', reponse: 'FCA (règle multimodale) ; FOB est réservé au maritime conventionnel.' },
    ],
  },
  {
    id: 'fiche-log-stocks',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-stocks',
    title: 'Gestion des stocks, ABC & Wilson',
    subtitle: 'Pareto 20/80, stock d’alerte, FEFO et lot économique',
    sizeKb: 68,
    notionsEssentielles: [
      'Méthode ABC : Classe A = ~20 % des articles / ~80 % de la valeur.',
      'Stock d’alerte = (Consommation moyenne × Délai) + Stock de sécurité.',
      'FEFO (First Expired, First Out) obligatoire en pharmacie et agroalimentaire.',
      'Wilson Q* = √(2 · D · C_c / C_p) équilibre coût de commande et coût de stockage.',
    ],
    definitions: [
      { terme: 'Stock de sécurité', definition: 'Tampon destiné à absorber les aléas de demande ou les retards de livraison.' },
      { terme: 'FEFO', definition: 'Méthode de sortie de stock faisant sortir en priorité les lots dont la date de péremption est la plus proche.' },
    ],
    formules: [
      { label: 'Point de commande (Stock d’alerte)', formule: 'SA = (c × d) + SS', unite: 'unités' },
      { label: 'Quantité économique (Wilson)', formule: 'Q* = √( 2 · D · C_c / C_p )', unite: 'unités' },
    ],
    datesReperes: [
      { repere: '1913 — Ford W. Harris / R. H. Wilson', detail: 'Formulation du modèle EOQ / formule de Wilson.' },
    ],
    methodes: [
      'Toujours exprimer consommation et délai dans la même unité de temps (jours avec jours, mois avec mois).',
    ],
    erreursFrequentes: [
      'Confondre stock de sécurité (tampon contre aléas) et stock d’alerte (seuil de déclenchement de commande).',
    ],
    exemples: [
      { titre: 'Point de commande', contenu: 'Conso = 20 unités/jour, Délai = 5 jours, SS = 30 unités → SA = (20 × 5) + 30 = 130 unités.' },
    ],
    resumeExpress:
      'Optimiser ses stocks : concentrer le contrôle sur la classe A (Pareto), déclencher les commandes au stock d’alerte et appliquer FEFO aux produits périssables.',
    tableauComparatif: {
      headers: ['Règle de sortie', 'Principe', 'Domaine prioritaire'],
      rows: [
        { critere: 'FIFO', elementA: 'Premier entré, premier sorti', elementB: 'Biens standards / pièces détachées' },
        { critere: 'FEFO', elementA: 'Premier périmé, premier sorti', elementB: 'Médicaments, vaccins, agroalimentaire' },
        { critere: 'LIFO', elementA: 'Dernier entré, premier sorti', elementB: 'Matériaux en vrac (sable, gravier)' },
      ],
    },
    autoEvaluation: [
      { question: 'Si conso = 10/jour, délai = 6 jours et stock de sécurité = 25, quel est le stock d’alerte ?', reponse: '(10 × 6) + 25 = 85 unités.' },
    ],
  },
  // GRH & Droit du Travail
  {
    id: 'fiche-grh-droit',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-droit',
    title: 'Contrat de travail & Rupture',
    subtitle: 'Lien de subordination, CDI/CDD, essai et licenciement',
    sizeKb: 68,
    notionsEssentielles: [
      '3 éléments du contrat de travail : prestation, rémunération, subordination juridique.',
      'Le CDI est le contrat de droit commun ; le CDD exige un écrit et un cadre légal.',
      'Période d’essai : doit être stipulée expressément par écrit.',
      'Tout licenciement nécessite un motif légitime et une procédure régulière.',
    ],
    definitions: [
      { terme: 'Lien de subordination', definition: 'Exécution d’un travail sous l’autorité d’un employeur ayant pouvoir de direction, contrôle et sanction.' },
      { terme: 'Requalification', definition: 'Transformation par le juge d’un CDD irrégulier ou d’une prestation déguisée en CDI.' },
    ],
    formules: [
      { label: 'Qualification salarié', formule: 'Prestation + Salaire + Subordination = Contrat de travail', unite: '3 critères' },
    ],
    datesReperes: [
      { repere: '1919 — Création de l’OIT', detail: 'Organisation Internationale du Travail (conventions fondamentales du travail).' },
    ],
    methodes: [
      'Pour qualifier un contrat litigieux, le juge regarde toujours les conditions réelles d’exécution (principe de réalité), pas seulement le titre écrit sur le papier.',
    ],
    erreursFrequentes: [
      'Penser qu’un CDD peut être conclu verbalement sans écrit (un CDD sans écrit est présumé CDI).',
    ],
    exemples: [
      { titre: 'Poursuite après terme d’un CDD', contenu: 'Si le salarié continue de travailler après la fin prévue sans nouveau contrat, le CDD devient automatiquement un CDI.' },
    ],
    resumeExpress:
      'La subordination juridique définit le salariat ; le CDI est la norme, le CDD est strictement encadré par écrit et toute rupture doit respecter fond et forme.',
    tableauComparatif: {
      headers: ['Critère', 'CDI', 'CDD'],
      rows: [
        { critere: 'Écrit obligatoire', elementA: 'Recommandé (preuve), verbal possible', elementB: 'Obligatoire (sinon requalifié CDI)' },
        { critere: 'Terme fixé à l’avance', elementA: 'Non', elementB: 'Oui (date précise ou fin d’objet)' },
        { critere: 'Usage', elementA: 'Activité normale et permanente', elementB: 'Tâche précise et temporaire' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel critère distingue principalement un salarié d’un consultant indépendant ?', reponse: 'L’existence d’un lien de subordination juridique.' },
    ],
  },
  {
    id: 'fiche-grh-gpec',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-gpec',
    title: 'GPEC, Recrutement & Indicateurs RH',
    subtitle: 'Anticipation des compétences, turnover et absentéisme',
    sizeKb: 68,
    notionsEssentielles: [
      'GPEC : anticiper les besoins futurs en emplois et compétences (formation, mobilité, recrutement).',
      'Processus de recrutement : besoin → fiche de poste → sourcing → sélection → intégration (onboarding).',
      'Indicateurs sociaux clés : turnover, absentéisme, pyramide des âges, masse salariale.',
      'Dialogue social : représentants du personnel, syndicats, conventions collectives.',
    ],
    definitions: [
      { terme: 'GPEC', definition: 'Gestion Prévisionnelle des Emplois et des Compétences adaptée à la stratégie de l’organisation.' },
      { terme: 'Turnover', definition: 'Taux de rotation mesurant le rythme de renouvellement des effectifs sur une période.' },
    ],
    formules: [
      { label: 'Taux d’absentéisme', formule: '(Heures d’absence / Heures théoriques) × 100', unite: '%' },
      { label: 'Turnover moyen', formule: '[((Entrées + Départs) / 2) / Effectif moyen] × 100', unite: '%' },
    ],
    datesReperes: [
      { repere: 'Onboarding (90 premiers jours)', detail: 'Période critique conditionnant la rétention durable d’une nouvelle recrue.' },
    ],
    methodes: [
      'Un recrutement ne s’arrête pas à la signature du contrat : l’intégration (onboarding) en est l’étape décisive.',
    ],
    erreursFrequentes: [
      'Confondre fiche de poste (missions et compétences requises) et contrat de travail (engagement juridique).',
    ],
    exemples: [
      { titre: 'Calcul d’absentéisme', contenu: '100 heures d’absence sur 2 000 heures théoriques → taux d’absentéisme = 5 %.' },
    ],
    resumeExpress:
      'Une GRH moderne anticipe les compétences via la GPEC, sécurise l’intégration des recrues et pilote le climat social avec des indicateurs chiffrés.',
    tableauComparatif: {
      headers: ['Dimension', 'Administration du personnel', 'GRH Stratégique (GPEC)'],
      rows: [
        { critere: 'Horizon', elementA: 'Court terme (paie, contrats, congés)', elementB: 'Moyen/long terme (3 à 5 ans)' },
        { critere: 'Vision du salarié', elementA: 'Coût à contrôler', elementB: 'Capital humain à développer' },
        { critere: 'Outils clés', elementA: 'Logiciel de paie, registre personnel', elementB: 'Référentiel compétences, plan formation' },
      ],
    },
    autoEvaluation: [
      { question: 'Quels sont les 4 grands leviers d’ajustement d’une démarche GPEC ?', reponse: 'Recrutement, formation, mobilité interne et reconversion.' },
    ],
  },
];

export const APEX_QUESTIONS: Question[] = [
  // ===== RELATIONS INTERNATIONALES (5) =====
  {
    id: 'q-ri-1',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-onu',
    examIds: ['concours-diplomatie', 'concours-admin', 'concours-magistrature'],
    prompt: 'Quel organe principal de l’ONU dispose du pouvoir d’adopter des résolutions juridiquement contraignantes en matière de maintien de la paix et de la sécurité internationales ?',
    options: [
      'L’Assemblée générale',
      'Le Conseil de sécurité',
      'Le Conseil économique et social (ECOSOC)',
      'L’UNESCO',
    ],
    correctIndex: 1,
    explanation: 'En vertu de la Charte des Nations Unies (notamment le Chapitre VII), seul le Conseil de sécurité adopte des résolutions contraignantes pour le maintien de la paix.',
    steps: [
      'L’Assemblée générale émet des recommandations non contraignantes.',
      'Le Conseil de sécurité (15 membres, dont 5 permanents) détient la responsabilité principale de la paix et peut imposer sanctions ou opérations.',
    ],
    notion: 'Organes de l’ONU',
    difficulty: 'facile',
    ficheId: 'fiche-ri-onu',
    source: 'Concours Diplomatie & Affaires Étrangères 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-ri-2',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-onu',
    examIds: ['concours-diplomatie', 'concours-admin'],
    prompt: 'Quelle juridiction internationale tranche les différends juridiques opposant exclusivement des ÉTATS (ex. litige frontalier) ?',
    options: [
      'La Cour Pénale Internationale (CPI)',
      'La Cour Internationale de Justice (CIJ)',
      'Le Tribunal de commerce',
      'Le Conseil des droits de l’homme',
    ],
    correctIndex: 1,
    explanation: 'La Cour Internationale de Justice (CIJ, siège à La Haye) est l’organe judiciaire principal de l’ONU compétent pour les différends entre États, alors que la CPI juge des individus.',
    steps: [
      'Différend entre États = CIJ ; responsabilité pénale d’individus = CPI.',
    ],
    notion: 'CIJ vs CPI',
    difficulty: 'moyen',
    ficheId: 'fiche-ri-onu',
    source: 'Concours Diplomatie / ENAM 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-ri-3',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-onu',
    examIds: ['concours-diplomatie', 'concours-admin'],
    prompt: 'Dans quelle ville siège le Secrétariat de la Zone de Libre-Échange Continentale Africaine (ZLECAf) ?',
    options: ['Addis-Abeba', 'Accra', 'Nairobi', 'Abuja'],
    correctIndex: 1,
    explanation: 'Le siège de l’Union Africaine est à Addis-Abeba (Éthiopie), tandis que le Secrétariat de la ZLECAf siège à Accra (Ghana).',
    steps: [
      'UA = Addis-Abeba ; ZLECAf = Accra ; PNUE = Nairobi ; CEDEAO = Abuja.',
    ],
    notion: 'Intégration africaine & ZLECAf',
    difficulty: 'moyen',
    ficheId: 'fiche-ri-onu',
    source: 'Concours Affaires Étrangères 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-ri-4',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-geopol',
    examIds: ['concours-diplomatie', 'concours-admin'],
    prompt: 'Dans quelle capitale se trouve le siège de la Commission du Bassin du Lac Tchad (CBLT), créée en 1964 ?',
    options: ['Yaoundé', 'N’Djamena', 'Niamey', 'Bangui'],
    correctIndex: 1,
    explanation: 'La Commission du Bassin du Lac Tchad (CBLT) a son siège à N’Djamena (Tchad) et coordonne la gestion durable des eaux du bassin.',
    steps: [
      'CBLT (1964) = N’Djamena ; Commission CEMAC = Bangui ; BEAC = Yaoundé.',
    ],
    notion: 'Hydro-diplomatie & CBLT',
    difficulty: 'facile',
    ficheId: 'fiche-ri-geopol',
    source: 'Concours Diplomatie / Culture Générale 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-ri-5',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-geopol',
    examIds: ['concours-diplomatie', 'concours-agronomie'],
    prompt: 'Quel est l’objectif de température inscrit dans l’Accord de Paris sur le climat adopté lors de la COP21 en 2015 ?',
    options: [
      'Limiter le réchauffement à +4 °C d’ici 2100',
      'Maintenir le réchauffement nettement en dessous de 2 °C et poursuivre les efforts pour le limiter à 1,5 °C',
      'Stabiliser la température à 0 °C en Europe',
      'Réduire uniquement le niveau des océans de 10 mètres',
    ],
    correctIndex: 1,
    explanation: 'L’article 2 de l’Accord de Paris (2015) fixe l’objectif de maintenir l’élévation de la température moyenne mondiale nettement en dessous de 2 °C (en visant 1,5 °C) par rapport aux niveaux préindustriels.',
    steps: [
      'Retenir le double repère COP21 (2015) : nettement < 2 °C et cible 1,5 °C.',
    ],
    notion: 'Accord de Paris (COP21)',
    difficulty: 'facile',
    ficheId: 'fiche-ri-geopol',
    source: 'Annale Relations Internationales 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== AGRONOMIE & ENVIRONNEMENT (5) =====
  {
    id: 'q-agro-1',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-sols',
    examIds: ['concours-agronomie', 'bac-scientifique'],
    prompt: 'Pourquoi les ions nitrates (NO₃⁻) sont-ils facilement entraînés en profondeur par lessivage lors de fortes pluies ?',
    options: [
      'Parce qu’ils sont trop lourds pour rester en surface',
      'Parce que le complexe argilo-humique (CAH) et les nitrates sont tous deux chargés négativement et se repoussent',
      'Parce que les plantes n’absorbent jamais d’azote',
      'Parce que le sable les transforme en dioxygène',
    ],
    correctIndex: 1,
    explanation: 'Le complexe argilo-humique (CAH) porte des charges négatives : il fixe bien les cations (Ca²⁺, K⁺, NH₄⁺) mais repousse les anions comme NO₃⁻, qui restent libres dans la solution du sol.',
    steps: [
      'CAH = charge négative (−) ; NO₃⁻ = charge négative (−).',
      'Deux charges de même signe se repoussent → pas de rétention → lessivage.',
    ],
    notion: 'Complexe argilo-humique & Lessivage',
    difficulty: 'moyen',
    ficheId: 'fiche-agro-sols',
    source: 'Concours Agronomie (ENATE / IUT) 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-agro-2',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-sols',
    examIds: ['concours-agronomie', 'bac-scientifique'],
    prompt: 'Quelle famille de plantes enrichit naturellement le sol en azote grâce à une symbiose racinaire avec les bactéries Rhizobium ?',
    options: [
      'Les céréales (mil, maïs)',
      'Les légumineuses (niébé, arachide, soja)',
      'Les cucurbitacées (pastèque, courge)',
      'Les conifères',
    ],
    correctIndex: 1,
    explanation: 'Les légumineuses forment des nodosités hébergeant des bactéries Rhizobium capables de fixer l’azote atmosphérique N₂ sous forme assimilable.',
    steps: [
      'Associer Rhizobium + nodosités racinaires → Légumineuses (niébé, arachide, soja).',
    ],
    notion: 'Fixation symbiotique de l’azote',
    difficulty: 'facile',
    ficheId: 'fiche-agro-sols',
    source: 'Concours Agronomie & Eaux-Forêts 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-agro-3',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-sols',
    examIds: ['concours-agronomie'],
    prompt: 'Parmi les trois macronutriments N, P, K, lequel est directement indispensable à la synthèse de la chlorophylle et à la croissance foliaire ?',
    options: ['L’azote (N)', 'Le potassium (K)', 'Le calcium (Ca)', 'Le silicium (Si)'],
    correctIndex: 0,
    explanation: 'L’azote (N) est un constituant majeur des acides aminés, protéines et de la chlorophylle : sa carence provoque un jaunissement (chlorose) des feuilles.',
    steps: [
      'N = feuillage/chlorophylle ; P = racines/énergie ; K = fruits/régulation hydrique.',
    ],
    notion: 'Rôle des éléments NPK',
    difficulty: 'facile',
    ficheId: 'fiche-agro-sols',
    source: 'Annale Agronomie 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-agro-4',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-climat',
    examIds: ['concours-agronomie'],
    prompt: 'En zone sahélienne, en quoi consiste la technique agroécologique traditionnelle du « zaï » ?',
    options: [
      'Labourer profondément dans le sens de la pente',
      'Creuser des micro-cuvettes enrichies en compost pour concentrer l’eau de pluie et les nutriments au pied des plants',
      'Brûler systématiquement tous les résidus de récolte',
      'Inonder totalement la parcelle toute l’année',
    ],
    correctIndex: 1,
    explanation: 'Le zaï consiste à creuser de petites cuvettes garnies de fumier/compost avant la saison des pluies afin de piéger l’eau de ruissellement, attirer les termites qui aèrent le sol et réhabiliter des terres dégradées.',
    steps: [
      'Zaï = micro-cuvettes + compost + concentration de l’eau de pluie.',
    ],
    notion: 'Conservation des eaux et sols (Zaï)',
    difficulty: 'facile',
    ficheId: 'fiche-agro-climat',
    source: 'Concours Eaux & Forêts / Sahel 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-agro-5',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-climat',
    examIds: ['concours-agronomie'],
    prompt: 'Quel système d’irrigation offre l’efficience hydrique la plus élevée (85 % à 95 %) en limitant les pertes par évaporation ?',
    options: [
      'L’irrigation gravitaire par submersion',
      'L’irrigation goutte-à-goutte (localisée)',
      'L’arrosage par canon à grande portée en plein midi',
      'Le ruissellement libre sans canal',
    ],
    correctIndex: 1,
    explanation: 'L’irrigation localisée goutte-à-goutte apporte de faibles doses d’eau directement au système racinaire, atteignant 85 à 95 % d’efficience hydrique.',
    steps: [
      'Comparer : Goutte-à-goutte (85–95 %) > Aspersion (70–80 %) > Gravitaire (40–55 %).',
    ],
    notion: 'Efficience de l’irrigation',
    difficulty: 'facile',
    ficheId: 'fiche-agro-climat',
    source: 'Concours Génie Rural 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== ÉNERGIES RENOUVELABLES & ÉLECTROTECHNIQUE (5) =====
  {
    id: 'q-enr-1',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-solaire',
    examIds: ['concours-energie-btp', 'concours-ingenieur'],
    prompt: 'Une clinique rurale consomme E_j = 3 500 Wh/jour. Avec un ensoleillement de H_s = 5 h/jour et un facteur de rendement global k = 0,70, quelle puissance crête PV minimale P_c faut-il installer ?',
    options: ['500 Wc', '700 Wc', '1 000 Wc', '1 400 Wc'],
    correctIndex: 2,
    explanation: 'P_c = E_j / (H_s × k) = 3 500 / (5 × 0,70) = 3 500 / 3,5 = 1 000 Wc (soit 1 kWc).',
    steps: [
      'Calculer le dénominateur H_s × k = 5 × 0,70 = 3,5.',
      'Diviser E_j par 3,5 : 3 500 / 3,5 = 1 000 Wc.',
    ],
    notion: 'Dimensionnement puissance crête PV',
    difficulty: 'moyen',
    ficheId: 'fiche-enr-solaire',
    source: 'Concours Énergies Renouvelables 2025',
    isOfficial: true,
    estimatedSeconds: 50,
  },
  {
    id: 'q-enr-2',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-solaire',
    examIds: ['concours-energie-btp', 'concours-ingenieur'],
    prompt: 'Dans une installation photovoltaïque autonome, quel est le rôle principal de l’onduleur ?',
    options: [
      'Stocker l’énergie chimique pour la nuit',
      'Convertir le courant continu (DC) en courant alternatif (AC, ex. 230 V / 50 Hz)',
      'Refroidir les cellules de silicium',
      'Mesurer la vitesse du vent',
    ],
    correctIndex: 1,
    explanation: 'L’onduleur assure la conversion DC → AC (idéalement onde sinusoïdale pure 230 V / 50 Hz) pour alimenter les équipements électroménagers ou médicaux standards.',
    steps: [
      'Panneaux & batteries fonctionnent en DC ; les prises domestiques demandent de l’AC → rôle de l’onduleur.',
    ],
    notion: 'Chaîne solaire photovoltaïque',
    difficulty: 'facile',
    ficheId: 'fiche-enr-solaire',
    source: 'Concours Génie Électrique 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-enr-3',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-solaire',
    examIds: ['concours-energie-btp'],
    prompt: 'Quelle profondeur de décharge maximale (DoD) recommande-t-on généralement de ne pas dépasser pour préserver la durée de vie d’une batterie solaire plomb-acide (AGM/Gel) ?',
    options: ['10 %', '50 %', '95 %', '100 %'],
    correctIndex: 1,
    explanation: 'Limiter la profondeur de décharge à 50 % sur une batterie plomb-acide évite la sulfatation rapide des plaques et multiplie le nombre de cycles utiles.',
    steps: [
      'Plomb-acide (AGM/Gel) : DoD ≤ 50 % ; Lithium LiFePO₄ : DoD jusqu’à 80–90 %.',
    ],
    notion: 'Stockage batterie & DoD',
    difficulty: 'moyen',
    ficheId: 'fiche-enr-solaire',
    source: 'Certification Solaire PV 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-enr-4',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-elec',
    examIds: ['concours-energie-btp', 'concours-ingenieur'],
    prompt: 'Un récepteur monophasé alimenté sous U = 230 V absorbe un courant I = 10 A avec un facteur de puissance cos φ = 0,80. Quelle est sa puissance active P ?',
    options: ['1 840 W', '2 300 W', '2 875 W', '1 380 W'],
    correctIndex: 0,
    explanation: 'P = U · I · cos φ = 230 × 10 × 0,80 = 2 300 × 0,80 = 1 840 W (sa puissance apparente S vaut 2 300 VA).',
    steps: [
      'Calculer S = U × I = 230 × 10 = 2 300 VA.',
      'Multiplier par cos φ = 0,80 : P = 2 300 × 0,80 = 1 840 W.',
    ],
    notion: 'Puissance active en régime sinusoïdal',
    difficulty: 'moyen',
    ficheId: 'fiche-enr-elec',
    source: 'Concours Électrotechnique / Ingénieur 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-enr-5',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-elec',
    examIds: ['concours-energie-btp'],
    prompt: 'Quel dispositif de protection, associé à une prise de terre, protège directement les personnes contre l’électrocution par courant de fuite ?',
    options: [
      'Un simple fusible de 32 A',
      'Un dispositif différentiel haute sensibilité (30 mA)',
      'Un transformateur d’intensité seul',
      'Un condensateur de démarrage',
    ],
    correctIndex: 1,
    explanation: 'Le dispositif différentiel résiduel (DDR) de sensibilité 30 mA détecte la différence de courant entre phase et neutre due à une fuite vers la terre et coupe l’alimentation en quelques millisecondes.',
    steps: [
      'Seuil de protection des personnes = 30 mA (DDR + liaison à la terre).',
    ],
    notion: 'Sécurité électrique (DDR 30 mA)',
    difficulty: 'facile',
    ficheId: 'fiche-enr-elec',
    source: 'Concours Génie Électrique & BTP 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== PHARMACOLOGIE (5) =====
  {
    id: 'q-pharm-1',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-adme',
    examIds: ['concours-medecine', 'concours-paramedical'],
    prompt: 'Par quelle voie d’administration la biodisponibilité (F) d’un médicament est-elle par définition toujours égale à 100 % ?',
    options: [
      'La voie orale (per os)',
      'La voie intraveineuse (IV)',
      'La voie rectale',
      'La voie cutanée',
    ],
    correctIndex: 1,
    explanation: 'En injection intraveineuse (IV), 100 % de la dose administrée entre directement dans la circulation systémique sans étape d’absorption ni effet de premier passage hépatique.',
    steps: [
      'Voie IV = directement dans le sang veineux → F = 1 (100 %).',
    ],
    notion: 'Biodisponibilité & Voies d’administration',
    difficulty: 'facile',
    ficheId: 'fiche-pharm-adme',
    source: 'Concours Pharmacie & Médecine 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-pharm-2',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-adme',
    examIds: ['concours-medecine', 'concours-paramedical'],
    prompt: 'Un médicament possède une demi-vie plasmatique T₁/₂ = 4 heures. Après combien de temps environ 97 % du médicament sera-t-il éliminé après une prise unique ?',
    options: ['4 heures', '8 heures', '12 heures', '20 heures'],
    correctIndex: 3,
    explanation: 'Selon la règle pharmacocinétique des 5 demi-vies, ~97 % du médicament est éliminé après 5 × T₁/₂ = 5 × 4 h = 20 heures.',
    steps: [
      'Appliquer la règle des 5 demi-vies : t = 5 × T₁/₂.',
      'Calculer 5 × 4 h = 20 heures.',
    ],
    notion: 'Demi-vie plasmatique (règle des 5 T₁/₂)',
    difficulty: 'moyen',
    ficheId: 'fiche-pharm-adme',
    source: 'Annale Pharmacologie Clinique 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-pharm-3',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-adme',
    examIds: ['concours-paramedical', 'concours-medecine'],
    prompt: 'Un enfant pèse 12 kg. La posologie prescrite d’un antibiotique est de 50 mg/kg/jour à répartir en 2 prises égales. Quelle dose doit-il recevoir à CHAQUE prise ?',
    options: ['150 mg', '300 mg', '600 mg', '1 200 mg'],
    correctIndex: 1,
    explanation: 'Dose journalière totale = 50 mg/kg/j × 12 kg = 600 mg/jour. Répartie en 2 prises égales : 600 / 2 = 300 mg par prise.',
    steps: [
      'Calculer la dose sur 24 h : 50 × 12 = 600 mg/j.',
      'Diviser par le nombre de prises (2) : 600 / 2 = 300 mg par prise.',
    ],
    notion: 'Calcul de posologie pédiatrique',
    difficulty: 'moyen',
    ficheId: 'fiche-pharm-adme',
    source: 'Concours Infirmiers (IDE) — Calcul de doses 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-pharm-4',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-therap',
    examIds: ['concours-medecine', 'concours-paramedical'],
    prompt: 'Selon les recommandations de l’OMS, quel est le traitement de première intention du paludisme GRAVE à Plasmodium falciparum ?',
    options: [
      'La chloroquine par voie orale',
      'L’Artésunate injectable (IV ou IM)',
      'L’amoxicilline en sirop',
      'Le paracétamol seul',
    ],
    correctIndex: 1,
    explanation: 'L’Artésunate injectable (IV ou IM) est le traitement de référence mondial du paludisme grave, supérieur à la quinine en termes de réduction de mortalité.',
    steps: [
      'Paludisme simple → CTA orale ; Paludisme grave → Artésunate injectable (IV/IM) en urgence.',
    ],
    notion: 'Traitement du paludisme (OMS)',
    difficulty: 'facile',
    ficheId: 'fiche-pharm-therap',
    source: 'Concours Santé & Pharmacie 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-pharm-5',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-therap',
    examIds: ['concours-medecine', 'concours-paramedical'],
    prompt: 'Quelle affirmation est EXACTE concernant l’utilisation des antibiotiques ?',
    options: [
      'Ils détruisent aussi efficacement les virus que les bactéries',
      'Ils n’agissent que sur les bactéries et leur mauvais usage favorise l’antibiorésistance',
      'On doit les arrêter dès que la fièvre baisse au bout de 24 heures',
      'Ils remplacent la vaccination',
    ],
    correctIndex: 1,
    explanation: 'Les antibiotiques ciblent uniquement les bactéries (jamais les virus) ; respecter la posologie et la durée prescrite est vital pour freiner l’émergence de bactéries résistantes.',
    steps: [
      'Éliminer les idées reçues : inactifs sur les virus et ne jamais interrompre trop tôt.',
    ],
    notion: 'Bon usage des antibiotiques',
    difficulty: 'facile',
    ficheId: 'fiche-pharm-therap',
    source: 'Annale Pharmacologie & Santé Publique 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== LOGISTIQUE & COMMERCE INTERNATIONAL (5) =====
  {
    id: 'q-log-1',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-incoterms',
    examIds: ['certif-supply-rh', 'concours-police-douanes', 'certif-entrepreneuriat'],
    prompt: 'Parmi les Incoterms® 2020 suivants, lequel impose le MAXIMUM d’obligations, de frais et de risques au vendeur (y compris le dédouanement import) ?',
    options: ['EXW', 'FOB', 'CIF', 'DDP'],
    correctIndex: 3,
    explanation: 'DDP (Delivered Duty Paid — Rendu droits acquittés) met à la charge du vendeur la quasi-totalité des frais, risques et formalités douanières export ET import.',
    steps: [
      'Échelle croissante des obligations vendeur : EXW (minimum) → … → DDP (maximum).',
    ],
    notion: 'Incoterms® 2020 (EXW à DDP)',
    difficulty: 'facile',
    ficheId: 'fiche-log-incoterms',
    source: 'Certification Supply Chain & Douanes 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-log-2',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-incoterms',
    examIds: ['certif-supply-rh', 'concours-police-douanes'],
    prompt: 'Une cargaison a une valeur FOB de 12 000 000 FCFA, un fret principal de 1 800 000 FCFA et une assurance transport de 200 000 FCFA. Quelle est sa valeur en douane (base CIF/CAF) ?',
    options: [
      '12 000 000 FCFA',
      '13 800 000 FCFA',
      '14 000 000 FCFA',
      '10 000 000 FCFA',
    ],
    correctIndex: 2,
    explanation: 'Valeur CIF/CAF = Valeur FOB + Fret principal + Assurance = 12 000 000 + 1 800 000 + 200 000 = 14 000 000 FCFA.',
    steps: [
      'Additionner les trois composantes : 12 000 000 + 1 800 000 + 200 000.',
      'Total base imposable douane = 14 000 000 FCFA.',
    ],
    notion: 'Calcul de la valeur en douane (CAF/CIF)',
    difficulty: 'facile',
    ficheId: 'fiche-log-incoterms',
    source: 'Concours Douanes & Transit 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-log-3',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-incoterms',
    examIds: ['certif-supply-rh', 'concours-police-douanes'],
    prompt: 'Que NE règlent PAS les Incoterms® 2020 dans un contrat de vente internationale ?',
    options: [
      'Le lieu de livraison et le transfert des risques',
      'La répartition des frais de transport et d’assurance',
      'Le transfert de propriété de la marchandise et les modalités de paiement',
      'La charge des formalités douanières export/import',
    ],
    correctIndex: 2,
    explanation: 'Les Incoterms règlent la livraison, les risques, les frais et la douane, mais jamais le transfert de propriété (régi par la clause de réserve de propriété du contrat) ni le mode de paiement.',
    steps: [
      'Vérifier les 3 objets des Incoterms : Frais, Risques, Formalités douanières.',
      'Le transfert de propriété est hors champ des Incoterms.',
    ],
    notion: 'Limites juridiques des Incoterms',
    difficulty: 'moyen',
    ficheId: 'fiche-log-incoterms',
    source: 'Certification Commerce International 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-log-4',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-stocks',
    examIds: ['certif-supply-rh', 'certif-entrepreneuriat'],
    prompt: 'Un entrepôt consomme en moyenne 30 cartons/jour, le délai fournisseur est de 6 jours et le stock de sécurité est fixé à 40 cartons. Quel est le stock d’alerte (point de commande) ?',
    options: ['180 cartons', '220 cartons', '140 cartons', '250 cartons'],
    correctIndex: 1,
    explanation: 'Stock d’alerte = (Consommation journalière × Délai) + Stock de sécurité = (30 × 6) + 40 = 180 + 40 = 220 cartons.',
    steps: [
      'Consommation durant le délai : 30 × 6 = 180 cartons.',
      'Ajouter le stock de sécurité : 180 + 40 = 220 cartons.',
    ],
    notion: 'Calcul du stock d’alerte',
    difficulty: 'facile',
    ficheId: 'fiche-log-stocks',
    source: 'Certification Supply Chain 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-log-5',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-stocks',
    examIds: ['certif-supply-rh', 'concours-paramedical'],
    prompt: 'Dans un entrepôt stockant des vaccins et médicaments ayant des dates de péremption différentes, quelle règle de sortie de stock doit impérativement être appliquée ?',
    options: ['LIFO', 'FEFO (First Expired, First Out)', 'Tirage au sort', 'Stock mort'],
    correctIndex: 1,
    explanation: 'La règle FEFO (Premier périmé, premier sorti) garantit que les lots dont la date d’expiration est la plus proche sont distribués en premier, évitant tout gaspillage.',
    steps: [
      'FEFO = First Expired, First Out (priorité à la date de péremption la plus courte).',
    ],
    notion: 'Gestion FEFO des produits périssables',
    difficulty: 'facile',
    ficheId: 'fiche-log-stocks',
    source: 'Certification Logistique Humanitaire & Santé 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== GRH & DROIT DU TRAVAIL (5) =====
  {
    id: 'q-grh-1',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-droit',
    examIds: ['certif-supply-rh', 'concours-admin', 'certif-entrepreneuriat'],
    prompt: 'Quel est le critère juridique décisif permettant de distinguer un contrat de travail (salariat) d’une prestation de services indépendante ?',
    options: [
      'Le port d’un uniforme',
      'L’existence d’un lien de subordination juridique',
      'Le paiement par virement bancaire',
      'L’ancienneté supérieure à 10 ans',
    ],
    correctIndex: 1,
    explanation: 'Le contrat de travail suppose prestation + rémunération + lien de subordination juridique (pouvoir de direction, de contrôle et de sanction de l’employeur).',
    steps: [
      'Un indépendant fournit aussi une prestation contre rémunération, mais sans subordination juridique.',
    ],
    notion: 'Lien de subordination juridique',
    difficulty: 'facile',
    ficheId: 'fiche-grh-droit',
    source: 'Concours Inspection du Travail / RH 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-grh-2',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-droit',
    examIds: ['certif-supply-rh', 'concours-admin'],
    prompt: 'Que risque un employeur qui conclut un Contrat à Durée Déterminée (CDD) sans rédiger d’écrit ou qui laisse le salarié travailler après le terme sans nouveau contrat ?',
    options: [
      'Aucune conséquence juridique',
      'La requalification automatique du contrat en CDI',
      'La suppression définitive du salaire',
      'L’annulation rétroactive de tous les bulletins de paie',
    ],
    correctIndex: 1,
    explanation: 'Le CDD est un contrat d’exception exigeant un écrit et un terme respecté ; à défaut, il est réputé conclu pour une durée indéterminée (CDI).',
    steps: [
      'CDI = contrat de droit commun ; tout CDD irrégulier est requalifié en CDI.',
    ],
    notion: 'Encadrement et requalification du CDD',
    difficulty: 'facile',
    ficheId: 'fiche-grh-droit',
    source: 'Annale Droit du Travail 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-grh-3',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-gpec',
    examIds: ['certif-supply-rh', 'certif-entrepreneuriat'],
    prompt: 'Que signifie l’acronyme GPEC en gestion des ressources humaines ?',
    options: [
      'Gestion Politique des Échanges Commerciaux',
      'Gestion Prévisionnelle des Emplois et des Compétences',
      'Garantie Publique d’Épargne Collective',
      'Grille Permanente d’Évaluation Comptable',
    ],
    correctIndex: 1,
    explanation: 'La GPEC (Gestion Prévisionnelle des Emplois et des Compétences) anticipe l’évolution des métiers et réduit les écarts de compétences par la formation, la mobilité et le recrutement.',
    steps: [
      'G = Gestion · P = Prévisionnelle · E = Emplois · C = Compétences.',
    ],
    notion: 'Définition de la GPEC',
    difficulty: 'facile',
    ficheId: 'fiche-grh-gpec',
    source: 'Certification GRH 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-grh-4',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-gpec',
    examIds: ['certif-supply-rh', 'concours-admin'],
    prompt: 'Sur un mois comptant 4 000 heures théoriques travaillées dans une entreprise, on enregistre 240 heures d’absence. Quel est le taux d’absentéisme ?',
    options: ['4 %', '6 %', '8 %', '12 %'],
    correctIndex: 1,
    explanation: 'Taux d’absentéisme = (240 / 4 000) × 100 = 0,06 × 100 = 6 %.',
    steps: [
      'Diviser les heures d’absence par les heures théoriques : 240 / 4 000 = 0,06.',
      'Multiplier par 100 : 6 %.',
    ],
    notion: 'Calcul du taux d’absentéisme',
    difficulty: 'moyen',
    ficheId: 'fiche-grh-gpec',
    source: 'Contrôle de Gestion Sociale 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-grh-5',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-gpec',
    examIds: ['certif-supply-rh'],
    prompt: 'Quelle étape du processus de recrutement est la plus déterminante durant les 90 premiers jours pour fidéliser un nouveau collaborateur et éviter une rupture précoce de période d’essai ?',
    options: [
      'La suppression de la fiche de poste',
      'L’intégration structurée (onboarding, tutorat et objectifs clairs)',
      'L’absence de tout retour managérial',
      'La réduction immédiate du salaire convenu',
    ],
    correctIndex: 1,
    explanation: 'Un parcours d’intégration structuré (onboarding : accueil, parrainage, outils prêts, points d’étape à 30/60/90 jours) réduit drastiquement les départs précoces.',
    steps: [
      'Relier les 90 premiers jours à la réussite de l’onboarding et à la rétention.',
    ],
    notion: 'Recrutement & Onboarding',
    difficulty: 'facile',
    ficheId: 'fiche-grh-gpec',
    source: 'Certification Management RH 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },
];

export const APEX_ANNALES: Annale[] = [
  // Diplomatie
  {
    id: 'ann-dip-ri-2025',
    title: 'Concours Diplomatie & Affaires Étrangères 2025 — ONU, UA & Géopolitique',
    examId: 'concours-diplomatie',
    subjectId: 'relations_inter',
    chapterIds: ['ch-ri-onu', 'ch-ri-geopol'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-ri-1', 'q-ri-2', 'q-ri-3', 'q-ri-4', 'q-ri-5'],
    examType: 'Épreuve écrite Relations Internationales',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'Tchad / Union Africaine / ONU',
    instructions: 'Précisez mentalement les sièges et dates clés des organisations avant de répondre.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-dip-mix-2026',
    title: 'Concours Organisations Internationales (ONU / UA) 2026 — Synthèse Diplomatie, Droit & Langues',
    examId: 'concours-diplomatie',
    subjectId: 'relations_inter',
    chapterIds: ['ch-ri-onu', 'ch-ri-geopol'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 45,
    questionIds: ['q-ri-1', 'q-ri-3', 'q-ri-4', 'q-en-1', 'q-ar-1'],
    examType: 'Épreuve multilingue & multilatérale',
    language: 'Français / Anglais / Arabe',
    responseFormat: 'QCM',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'International / Afrique',
    instructions: 'Épreuve transversale : institutions internationales + anglais + arabe.',
    bareme: '20 points',
  },
  // Agronomie
  {
    id: 'ann-agro-sols-2025',
    title: 'Concours Agronomie & Eaux-Forêts (ENATE) 2025 — Sols, Azote & Agroécologie',
    examId: 'concours-agronomie',
    subjectId: 'agronomie_env',
    chapterIds: ['ch-agro-sols', 'ch-agro-climat'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-agro-1', 'q-agro-2', 'q-agro-3', 'q-agro-4', 'q-agro-5'],
    examType: 'Épreuve Sciences Agronomiques',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'Zone Sahélienne / Afrique francophone',
    instructions: 'Vérifiez les mécanismes ioniques du CAH et les techniques CES/DRS.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-agro-env-2026',
    title: 'Concours Environnement & Climat 2026 — Agroécologie, Solaire Rural & Climat',
    examId: 'concours-agronomie',
    subjectId: 'agronomie_env',
    chapterIds: ['ch-agro-sols', 'ch-agro-climat'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 40,
    questionIds: ['q-agro-2', 'q-agro-4', 'q-agro-5', 'q-enr-1', 'q-ri-5'],
    examType: 'Étude de cas Développement Durable',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'Sahel / Afrique centrale & ouest',
    instructions: 'Approche intégrée : eau, sol, pompage solaire et Accord de Paris.',
    bareme: '20 points',
  },
  // Énergies Renouvelables & BTP
  {
    id: 'ann-enr-pv-2025',
    title: 'Concours Énergies Renouvelables & Électrotechnique 2025 — Solaire PV & Puissances AC',
    examId: 'concours-energie-btp',
    subjectId: 'energies_renouv',
    chapterIds: ['ch-enr-solaire', 'ch-enr-elec'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-enr-1', 'q-enr-2', 'q-enr-3', 'q-enr-4', 'q-enr-5'],
    examType: 'Épreuve technique d’ingénierie',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'Écoles d’Ingénieurs / 2iE / BTS',
    instructions: 'Attention aux unités (Wc, Wh, VA, W, mA).',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-enr-ing-2026',
    title: 'Concours Génie Électrique & Ingénieurs 2026 — Solaire, Physique & Mathématiques',
    examId: 'concours-energie-btp',
    subjectId: 'energies_renouv',
    chapterIds: ['ch-enr-solaire', 'ch-enr-elec'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 45,
    questionIds: ['q-enr-1', 'q-enr-4', 'q-enr-5', 'q-p-1', 'q-m-1'],
    examType: 'Épreuve scientifique polyvalente',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 170,
    shareable: true,
    countryOrZone: 'Afrique francophone / International',
    instructions: 'Calculatrice scientifique non programmable autorisée.',
    bareme: '20 points',
  },
  // Pharmacologie (Médecine & Paramédical)
  {
    id: 'ann-pharm-med-2025',
    title: 'Concours Pharmacie & Médecine 2025 — Pharmacocinétique ADME & Thérapeutique',
    examId: 'concours-medecine',
    subjectId: 'pharmacologie',
    chapterIds: ['ch-pharm-adme', 'ch-pharm-therap'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 35,
    questionIds: ['q-pharm-1', 'q-pharm-2', 'q-pharm-3', 'q-pharm-4', 'q-pharm-5'],
    examType: 'Épreuve Pharmacologie Clinique',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'Facultés de Pharmacie & Médecine',
    instructions: 'Relisez attentivement chaque énoncé de calcul de dose pédiatrique.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-ide-pharm-2026',
    title: 'Concours Infirmiers & Sages-Femmes 2026 — Calcul de Doses, Paludisme & Hygiène',
    examId: 'concours-paramedical',
    subjectId: 'pharmacologie',
    chapterIds: ['ch-pharm-adme', 'ch-pharm-therap'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-pharm-1', 'q-pharm-3', 'q-pharm-4', 'q-sp-4', 'q-anat-1'],
    examType: 'Épreuve professionnelle de soins',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'ENASS / Écoles de Santé',
    instructions: 'Toute erreur d’un facteur 10 sur une posologie est éliminatoire en pratique.',
    bareme: '20 points',
  },
  // Logistique & Supply Chain + Douanes
  {
    id: 'ann-log-ci-2025',
    title: 'Certification Supply Chain 2025 — Incoterms® 2020, Douane & Gestion des Stocks',
    examId: 'certif-supply-rh',
    subjectId: 'logistique_ci',
    chapterIds: ['ch-log-incoterms', 'ch-log-stocks'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-log-1', 'q-log-2', 'q-log-3', 'q-log-4', 'q-log-5'],
    examType: 'Examen de certification Supply Chain',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 160,
    isPremium: true,
    shareable: true,
    countryOrZone: 'Corridors CEMAC / International',
    instructions: 'Score minimal de validation : 75 %.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-douanes-2026',
    title: 'Concours Douanes & Transit 2026 — Valeur CAF, Incoterms & Droit OHADA',
    examId: 'concours-police-douanes',
    subjectId: 'logistique_ci',
    chapterIds: ['ch-log-incoterms', 'ch-log-stocks'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-log-1', 'q-log-2', 'q-log-3', 'q-ohada-1', 'q-fp-3'],
    examType: 'Épreuve technique Inspecteur des Douanes',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'Zone CEMAC / UEMOA',
    instructions: 'Appliquez la base CAF/CIF et le taux de TVA standard 18 %.',
    bareme: '20 points',
  },
  // GRH & Droit du Travail
  {
    id: 'ann-grh-2025',
    title: 'Certification RH & Droit du Travail 2025 — Contrats, GPEC & Indicateurs Sociaux',
    examId: 'certif-supply-rh',
    subjectId: 'grh_travail',
    chapterIds: ['ch-grh-droit', 'ch-grh-gpec'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 30,
    questionIds: ['q-grh-1', 'q-grh-2', 'q-grh-3', 'q-grh-4', 'q-grh-5'],
    examType: 'Examen professionnel GRH',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 150,
    isPremium: true,
    shareable: true,
    countryOrZone: 'Afrique francophone / International',
    instructions: 'Vérifiez les critères de requalification et les formules RH.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-enam-travail-2026',
    title: 'Concours ENAM / Inspection du Travail 2026 — Droit Social, Diplomatie & Finances',
    examId: 'concours-admin',
    subjectId: 'grh_travail',
    chapterIds: ['ch-grh-droit', 'ch-grh-gpec'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-grh-1', 'q-grh-2', 'q-grh-4', 'q-ri-4', 'q-fp-1'],
    examType: 'Concours Cycle A — Administration & Travail',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'Tchad / Afrique francophone',
    instructions: 'Épreuve pluridisciplinaire Administration du Travail — Session 2026.',
    bareme: '20 points',
  },
  // Sujets transversaux 2026 supplémentaires
  {
    id: 'ann-ing-enr-2026',
    title: 'Concours Grandes Écoles d’Ingénieurs 2026 — Transition Énergétique & IA',
    examId: 'concours-ingenieur',
    subjectId: 'energies_renouv',
    chapterIds: ['ch-enr-solaire', 'ch-enr-elec'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-enr-1', 'q-enr-4', 'q-ia-1', 'q-ia-2', 'q-st-1'],
    examType: 'Épreuve d’ingénierie moderne',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'Polytechnique / INP-HB / 2iE',
    instructions: 'Sujet combiné énergie solaire + science des données.',
    bareme: '20 points',
  },
  {
    id: 'ann-entrep-rh-2026',
    title: 'Certification Entrepreneuriat & PME 2026 — Recrutement RH, Stocks & Supply Chain',
    examId: 'certif-entrepreneuriat',
    subjectId: 'grh_travail',
    chapterIds: ['ch-grh-droit', 'ch-grh-gpec'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-grh-1', 'q-grh-3', 'q-grh-5', 'q-log-1', 'q-log-4'],
    examType: 'Cas pratique Dirigeant PME',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'Espace OHADA / Afrique',
    instructions: 'Gérer la croissance opérationnelle d’une PME : équipe et stocks.',
    bareme: '20 points',
  },
];

export const APEX_FLASHCARDS: Flashcard[] = [
  // Relations Internationales (3)
  {
    id: 'fc-ri-1',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-onu',
    question: 'Quels sont les 5 membres permanents du Conseil de sécurité de l’ONU disposant du droit de veto ?',
    answer: 'Chine, États-Unis, France, Royaume-Uni et Russie (le « P5 »).',
  },
  {
    id: 'fc-ri-2',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-onu',
    question: 'Quelle est la différence de compétence entre la CIJ et la CPI ?',
    answer: 'La CIJ (organe de l’ONU) juge les différends entre États ; la CPI juge la responsabilité pénale d’individus.',
  },
  {
    id: 'fc-ri-3',
    subjectId: 'relations_inter',
    chapterId: 'ch-ri-geopol',
    question: 'Où siègent l’Union Africaine, la ZLECAf et la CBLT ?',
    answer: 'UA : Addis-Abeba ; ZLECAf : Accra ; CBLT (Commission du Bassin du Lac Tchad) : N’Djamena.',
  },
  // Agronomie (3)
  {
    id: 'fc-agro-1',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-sols',
    question: 'Quelle est la charge électrique du complexe argilo-humique (CAH) et quelles conséquences cela a-t-il sur les nitrates NO₃⁻ ?',
    answer: 'Le CAH est chargé négativement : il retient les cations (Ca²⁺, K⁺, NH₄⁺) mais repousse les nitrates (NO₃⁻), qui sont facilement lessivés.',
  },
  {
    id: 'fc-agro-2',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-sols',
    question: 'Quel duo biologique réalise la fixation symbiotique de l’azote atmosphérique N₂ ?',
    answer: 'Les légumineuses (niébé, arachide, soja) associées aux bactéries Rhizobium dans leurs nodosités racinaires.',
  },
  {
    id: 'fc-agro-3',
    subjectId: 'agronomie_env',
    chapterId: 'ch-agro-climat',
    question: 'Quelle est l’efficience hydrique moyenne de l’irrigation goutte-à-goutte comparée à l’irrigation gravitaire ?',
    answer: '85 à 95 % pour le goutte-à-goutte contre seulement 40 à 55 % en gravitaire.',
  },
  // Énergies Renouvelables (3)
  {
    id: 'fc-enr-1',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-solaire',
    question: 'Quelle formule permet de calculer la puissance crête PV P_c d’une installation autonome ?',
    answer: 'P_c (Wc) = E_j / (H_s × k), avec E_j en Wh/j, H_s en heures d’ensoleillement pic et k ≈ 0,65–0,75.',
    formula: 'P_c = E_j / (H_s × k)',
  },
  {
    id: 'fc-enr-2',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-elec',
    question: 'Comment relie-t-on les puissances active P (W), réactive Q (VAR) et apparente S (VA) ?',
    answer: 'S² = P² + Q² et P = U · I · cos φ = S · cos φ.',
    formula: 'S² = P² + Q²  |  P = U·I·cos φ',
  },
  {
    id: 'fc-enr-3',
    subjectId: 'energies_renouv',
    chapterId: 'ch-enr-elec',
    question: 'Quelle différence entre un disjoncteur magnétothermique et un interrupteur différentiel 30 mA ?',
    answer: 'Le magnétothermique protège les câbles contre surcharges/courts-circuits ; le différentiel 30 mA (+ terre) protège les personnes contre l’électrocution.',
  },
  // Pharmacologie (3)
  {
    id: 'fc-pharm-1',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-adme',
    question: 'Que signifie l’acronyme ADME en pharmacocinétique ?',
    answer: 'Absorption, Distribution, Métabolisme (foie / CYP450) et Élimination (reins / bile).',
  },
  {
    id: 'fc-pharm-2',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-adme',
    question: 'Quelle fraction d’un médicament est éliminée après 5 demi-vies (5 × T₁/₂) ?',
    answer: 'Environ 97 % (il reste 1/2⁵ = 1/32 ≈ 3,1 % dans le plasma).',
    formula: '5 × T₁/₂ ≈ 97 % d’élimination',
  },
  {
    id: 'fc-pharm-3',
    subjectId: 'pharmacologie',
    chapterId: 'ch-pharm-therap',
    question: 'Quels sont les traitements de 1re intention OMS pour le paludisme simple vs le paludisme grave ?',
    answer: 'Paludisme simple : CTA par voie orale ; Paludisme grave : Artésunate injectable (IV ou IM) en urgence.',
  },
  // Logistique & Commerce International (3)
  {
    id: 'fc-log-1',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-incoterms',
    question: 'Quels sont les 4 seuls Incoterms® 2020 réservés exclusivement au transport maritime et fluvial ?',
    answer: 'FAS, FOB, CFR et CIF (les 7 autres — EXW, FCA, CPT, CIP, DAP, DPU, DDP — sont multimodaux).',
  },
  {
    id: 'fc-log-2',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-stocks',
    question: 'Quelle formule donne le stock d’alerte (point de commande) ?',
    answer: 'Stock d’alerte = (Consommation moyenne × Délai de livraison) + Stock de sécurité.',
    formula: 'SA = (c × d) + SS',
  },
  {
    id: 'fc-log-3',
    subjectId: 'logistique_ci',
    chapterId: 'ch-log-stocks',
    question: 'Pourquoi privilégie-t-on FEFO plutôt que FIFO pour les vaccins et médicaments ?',
    answer: 'FEFO (First Expired, First Out) fait sortir en priorité les lots dont la date de péremption est la plus proche, même s’ils sont arrivés après d’autres.',
  },
  // GRH & Droit du Travail (3)
  {
    id: 'fc-grh-1',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-droit',
    question: 'Quels sont les 3 éléments constitutifs d’un contrat de travail ?',
    answer: '1) Une prestation de travail, 2) une rémunération (salaire), 3) un lien de subordination juridique.',
  },
  {
    id: 'fc-grh-2',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-gpec',
    question: 'Quelle est la formule du taux d’absentéisme en RH ?',
    answer: '(Nombre d’heures ou de jours d’absence / Nombre d’heures ou de jours théoriques travaillés) × 100.',
    formula: 'Absentéisme = (Absences / Théorique) × 100',
  },
  {
    id: 'fc-grh-3',
    subjectId: 'grh_travail',
    chapterId: 'ch-grh-gpec',
    question: 'Quel est l’objectif central de la GPEC ?',
    answer: 'Anticiper l’évolution des métiers et ajuster les compétences internes (formation, mobilité, recrutement) aux besoins futurs de l’organisation.',
  },
];
