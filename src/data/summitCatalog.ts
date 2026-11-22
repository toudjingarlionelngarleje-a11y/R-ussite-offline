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

export const SUMMIT_EXAMS: ExamTrack[] = [
  {
    id: 'concours-aeronautique',
    name: 'Concours Aviation Civile & Navigation Aérienne (ASECNA / EAMAC / ENAC)',
    shortName: 'ASECNA / EAMAC',
    category: 'Concours aéronautiques & météo',
    description:
      'Préparation aux concours de contrôle aérien, exploitation aéronautique et météorologie (EAMAC Niamey / ASECNA) : mécanique du vol, météo, maths, physique, réseaux et anglais.',
    level: 'Bac S / Bac+2',
    subjectIds: [
      'aeronautique_meteo',
      'maths',
      'physique',
      'reseaux_telecoms',
      'anglais',
    ],
    badgeColor: '#0284C7',
  },
  {
    id: 'concours-mines-petrole',
    name: 'Concours Géologie, Mines, Pétrole & Hydrogéologie (ENSPM / ESTM)',
    shortName: 'Mines & Pétrole',
    category: 'Concours géosciences & hydrocarbures',
    description:
      'Préparation aux filières géosciences, exploitation pétrolière et hydrogéologie : systèmes pétroliers, nappes aquifères, physique-chimie, maths et environnement.',
    level: 'Bac S / Licence',
    subjectIds: [
      'geologie_mines',
      'physique',
      'maths',
      'energies_renouv',
      'agronomie_env',
    ],
    badgeColor: '#78350F',
  },
  {
    id: 'concours-veterinaire',
    name: 'Concours Sciences Vétérinaires, Élevage & Zootechnie (EISMV / IUSTA)',
    shortName: 'Vétérinaire / Élevage',
    category: 'Concours santé animale & élevage',
    description:
      'Entrée en écoles vétérinaires et d’élevage (EISMV Dakar, IUSTA) : santé animale, zoonoses One Health, zootechnie, SVT, anatomie, pharmacologie et nutrition.',
    level: 'Bac S / Bac+1',
    subjectIds: [
      'veterinaire_elevage',
      'svt',
      'anatomie_physio',
      'pharmacologie',
      'agronomie_env',
      'nutrition_sante',
    ],
    badgeColor: '#166534',
  },
  {
    id: 'certif-fintech-microfinance',
    name: 'Certification FinTech, Mobile Money & Microfinance (COBAC / UEMOA)',
    shortName: 'FinTech & Microfin.',
    category: 'Certifications finance digitale',
    description:
      'Inclusion financière et banque digitale : Mobile Money, interopérabilité GIMAC/BCEAO, KYC/LBC-FT, PAR 30, comptabilité SYSCOHADA, droit OHADA et cybersécurité.',
    level: 'Étudiants & Professionnels',
    subjectIds: [
      'fintech_microfinance',
      'comptabilite',
      'droit_ohada',
      'finances_publiques',
      'cybersecurite',
      'ethique_gouvernance',
    ],
    isPremium: true,
    badgeColor: '#4F46E5',
  },
];

export const SUMMIT_SUBJECTS: Subject[] = [
  {
    id: 'aeronautique_meteo',
    name: 'Aéronautique, Navigation & Météorologie (ASECNA)',
    shortName: 'Aéro. & Météo',
    examIds: ['concours-aeronautique', 'concours-ingenieur'],
    color: '#0369A1',
    icon: 'Plane',
    description:
      'Mécanique du vol (4 forces, Bernoulli, unités nœuds/pieds), altimétrie QNH/QFE, nuages dangereux (cumulonimbus) et messages METAR/TAF.',
    sizeKb: 455,
  },
  {
    id: 'geologie_mines',
    name: 'Géologie, Mines, Pétrole & Hydrogéologie',
    shortName: 'Géologie & Mines',
    examIds: ['concours-mines-petrole', 'concours-genie-civil', 'concours-agronomie'],
    color: '#92400E',
    icon: 'Mountain',
    description:
      'Cycle des roches, système pétrolier (roche mère, réservoir, couverture), hydrogéologie des nappes captives/libres et réhabilitation minière.',
    sizeKb: 440,
  },
  {
    id: 'veterinaire_elevage',
    name: 'Sciences Vétérinaires, Élevage & Zootechnie',
    shortName: 'Vétérinaire & Élev.',
    examIds: ['concours-veterinaire', 'concours-agronomie', 'concours-nutrition'],
    color: '#15803D',
    icon: 'HeartHandshake',
    description:
      'Approche One Health, zoonoses majeures (rage, charbon bactéridien, brucellose), prophylaxie vaccinale, rationnement et filières bétail-viande.',
    sizeKb: 430,
  },
  {
    id: 'fintech_microfinance',
    name: 'FinTech, Mobile Money & Microfinance',
    shortName: 'FinTech & Microfin.',
    examIds: ['certif-fintech-microfinance', 'concours-finances-banque', 'certif-entrepreneuriat'],
    color: '#4338CA',
    icon: 'Smartphone',
    description:
      'Monnaie électronique, compte de cantonnement, KYC / lutte anti-blanchiment (LBC-FT), interopérabilité GIMAC, PAR 30 et gouvernance EMF.',
    sizeKb: 445,
  },
  {
    id: 'psychologie_cog',
    name: 'Psychologie Cognitive, Apprentissage & Motivation',
    shortName: 'Psychologie Cog.',
    examIds: ['concours-ens-enseignement', 'concours-paramedical', 'certif-supply-rh'],
    color: '#9333EA',
    icon: 'Brain',
    description:
      'Mémoire de travail vs long terme, courbe de l’oubli d’Ebbinghaus, pyramide de Maslow, biais cognitifs et intelligence émotionnelle.',
    sizeKb: 400,
  },
  {
    id: 'ethique_gouvernance',
    name: 'Éthique Publique, Marchés Publics & Anti-Corruption',
    shortName: 'Éthique & Marchés',
    examIds: [
      'concours-admin',
      'concours-magistrature',
      'concours-finances-banque',
      'certif-fintech-microfinance',
      'concours-diplomatie',
    ],
    color: '#0F766E',
    icon: 'ShieldCheck',
    description:
      'Déontologie publique, prévention des conflits d’intérêts, principes des marchés publics (liberté, égalité, transparence) et RSE / ISO 26000.',
    sizeKb: 410,
  },
];

export const SUMMIT_CHAPTERS: Chapter[] = [
  // Aéronautique & Météorologie
  {
    id: 'ch-aero-vol',
    subjectId: 'aeronautique_meteo',
    title: 'Mécanique du vol, 4 forces & Unités aéronautiques',
    order: 1,
    summary:
      'Portance, Poids, Traction, Traînée, angle d’incidence et décrochage, conversion nœuds (kt), milles nautiques (NM) et pieds (ft).',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-aero-vol',
    ficheId: 'fiche-aero-vol',
  },
  {
    id: 'ch-aero-meteo',
    subjectId: 'aeronautique_meteo',
    title: 'Météorologie aéronautique, Altimétrie (QNH/QFE) & METAR',
    order: 2,
    summary:
      'Atmosphère standard ISA (1013,25 hPa, −6,5 °C/1000 m), calages QNH/QFE/1013, cumulonimbus (CB) et lecture rapide d’un METAR.',
    estimatedMinutes: 25,
    difficulty: 'difficile',
    courseId: 'course-aero-meteo',
    ficheId: 'fiche-aero-meteo',
  },
  // Géologie & Mines
  {
    id: 'ch-geo-petrole',
    subjectId: 'geologie_mines',
    title: 'Cycle des roches & Système pétrolier (Pièges)',
    order: 1,
    summary:
      'Roches magmatiques, sédimentaires et métamorphiques ; formation des hydrocarbures (roche mère, migration, réservoir, couverture).',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-geo-petrole',
    ficheId: 'fiche-geo-petrole',
  },
  {
    id: 'ch-geo-hydro',
    subjectId: 'geologie_mines',
    title: 'Hydrogéologie, Aquifères & Responsabilité minière',
    order: 2,
    summary:
      'Porosité vs perméabilité, nappe libre vs nappe captive (artésianisme), loi de Darcy et étude d’impact environnemental (EIE).',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-geo-hydro',
    ficheId: 'fiche-geo-hydro',
  },
  // Sciences Vétérinaires & Élevage
  {
    id: 'ch-vet-zoonoses',
    subjectId: 'veterinaire_elevage',
    title: 'Santé animale, Zoonoses & Approche « One Health »',
    order: 1,
    summary:
      'Définition des zoonoses (rage, charbon bactéridien, brucellose, fièvre de la Vallée du Rift), vaccination et biosécurité en élevage.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-vet-zoonoses',
    ficheId: 'fiche-vet-zoonoses',
  },
  {
    id: 'ch-vet-zootech',
    subjectId: 'veterinaire_elevage',
    title: 'Zootechnie, Alimentation du cheptel & Chaîne de valeur',
    order: 2,
    summary:
      'Digestion des ruminants (rumen), complémentation en saison sèche, indice de consommation (IC) et amélioration génétique.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-vet-zootech',
    ficheId: 'fiche-vet-zootech',
  },
  // FinTech & Microfinance
  {
    id: 'ch-fin-mobile',
    subjectId: 'fintech_microfinance',
    title: 'Mobile Money, Interopérabilité & Conformité KYC / LBC-FT',
    order: 1,
    summary:
      'Émission de monnaie électronique, compte de cantonnement 100 %, KYC, lutte anti-blanchiment et interopérabilité GIMAC/BCEAO.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-fin-mobile',
    ficheId: 'fiche-fin-mobile',
  },
  {
    id: 'ch-fin-micro',
    subjectId: 'fintech_microfinance',
    title: 'Microfinance, PAR 30 & Inclusion financière durable',
    order: 2,
    summary:
      'Portefeuille à risque (PAR 30), épargne de proximité, crédit solidaire, prévention du surendettement et ratios prudentiels.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-fin-micro',
    ficheId: 'fiche-fin-micro',
  },
  // Psychologie Cognitive
  {
    id: 'ch-psy-memoire',
    subjectId: 'psychologie_cog',
    title: 'Mémoire, Courbe de l’oubli (Ebbinghaus) & Motivation (Maslow)',
    order: 1,
    summary:
      'Mémoire de travail limitée, consolidation par répétition espacée et rappel actif, pyramide des besoins de Maslow.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-psy-memoire',
    ficheId: 'fiche-psy-memoire',
  },
  {
    id: 'ch-psy-biais',
    subjectId: 'psychologie_cog',
    title: 'Biais cognitifs, Esprit critique & Intelligence émotionnelle',
    order: 2,
    summary:
      'Biais de confirmation, effet d’ancrage, effet Dunning-Kruger, régulation émotionnelle et prise de décision rationnelle.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-psy-biais',
    ficheId: 'fiche-psy-biais',
  },
  // Éthique & Marchés Publics
  {
    id: 'ch-eth-marches',
    subjectId: 'ethique_gouvernance',
    title: 'Marchés publics, Déontologie & Conflits d’intérêts',
    order: 1,
    summary:
      'Les 3 grands principes de la commande publique, appel d’offres ouvert vs gré à gré, prévention des conflits d’intérêts et intégrité.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-eth-marches',
    ficheId: 'fiche-eth-marches',
  },
  {
    id: 'ch-eth-rse',
    subjectId: 'ethique_gouvernance',
    title: 'Gouvernance, RSE (ISO 26000) & Lutte Anti-Corruption',
    order: 2,
    summary:
      'Critères ESG, responsabilité sociétale ISO 26000, protection des lanceurs d’alerte et reddition des comptes publics.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-eth-rse',
    ficheId: 'fiche-eth-rse',
  },
];

export const SUMMIT_COURSES: Course[] = [
  // Aéronautique & Météo
  {
    id: 'course-aero-vol',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-vol',
    title: 'Mécanique du vol, 4 forces & Unités aéronautiques',
    durationMinutes: 30,
    sizeKb: 225,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-ae-v1',
        heading: '1. Équilibre des 4 forces et décrochage aérodynamique',
        content:
          'En vol rectiligne horizontal uniforme, un aéronef est soumis à 4 forces qui s’équilibrent deux à deux : la Portance (L, dirigée vers le haut, générée par la dépression sur l’extrados de l’aile) égale le Poids (mg), et la Traction (T) égale la Traînée (D). La portance augmente avec la densité de l’air, la surface alaire, le carré de la vitesse (V²) et l’angle d’incidence α — jusqu’à l’incidence critique (≈ 15–18°) où les filets d’air se décollent : c’est le décrochage.',
        keyTakeaway:
          'Le décrochage dépend toujours de l’angle d’incidence critique, quelle que soit la vitesse ou l’assiette de l’avion.',
        formula: 'L = ½ · ρ · V² · S · C_z   |   Vol uniforme : L = mg et T = D',
        diagramId: 'forces_vol',
      },
      {
        id: 'sec-ae-v2',
        heading: '2. Unités internationales OACI (ASECNA / EAMAC)',
        content:
          'En navigation aérienne internationale (OACI), les distances horizontales s’expriment en milles nautiques (1 NM = 1 852 m), les vitesses en nœuds (1 kt = 1 NM/h = 1,852 km/h) et les altitudes en pieds (1 ft = 0,3048 m, soit 1 000 ft ≈ 305 m). Un niveau de vol FL300 correspond à une altitude-pression de 30 000 pieds calée sur la pression standard 1013,25 hPa.',
        keyTakeaway:
          'Conversions clés : 1 NM = 1,852 km · 1 kt = 1,852 km/h · 1 ft ≈ 0,305 m · FL250 = 25 000 ft.',
        formula: '1 NM = 1 852 m   |   1 kt = 1,852 km/h   |   1 ft = 0,3048 m',
      },
    ],
  },
  {
    id: 'course-aero-meteo',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-meteo',
    title: 'Météorologie aéronautique, Altimétrie (QNH/QFE) & METAR',
    durationMinutes: 25,
    sizeKb: 215,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-ae-m1',
        heading: '1. Atmosphère standard ISA et calages altimétriques',
        content:
          'L’atmosphère standard OACI (ISA) au niveau moyen de la mer fixe T₀ = +15 °C et P₀ = 1013,25 hPa, avec une décroissance thermique de 6,5 °C par 1 000 m dans la troposphère (≈ 2 °C / 1 000 ft). Le calage QNH (pression ramenée au niveau de la mer) donne l’altitude (AMSL) ; le calage QFE (pression au terrain) indique 0 au sol (hauteur AGL) ; le calage 1013,25 hPa est utilisé en croisière pour les niveaux de vol (FL).',
        keyTakeaway:
          'QNH → Altitude par rapport à la mer ; QFE → Hauteur par rapport à la piste (0 au sol) ; 1013 hPa → Niveaux de vol (FL).',
        formula: 'ISA mer : 15 °C & 1013,25 hPa   |   Gradient T : −6,5 °C / km',
      },
      {
        id: 'sec-ae-m2',
        heading: '2. Phénomènes dangereux (CB, Harmattan) et METAR',
        content:
          'Le cumulonimbus (CB) est le nuage le plus redouté en aviation : turbulences sévères, cisaillement de vent (windshear), grêle, givrage et foudre. En zone sahélienne (N’Djamena, Niamey), les vents de sable / brume sèche d’Harmattan réduisent fortement la visibilité horizontale (indiquée en mètres dans les messages METAR, ex. « CAVOK » signifie visibilité ≥ 10 km et aucun nuage significatif sous 5 000 ft).',
        keyTakeaway:
          'METAR = observation météo actuelle d’un aérodrome ; TAF = prévision météo aérodrome ; CB = danger maximal à contourner.',
      },
    ],
  },
  // Géologie & Mines
  {
    id: 'course-geo-petrole',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-petrole',
    title: 'Cycle des roches & Système pétrolier (Pièges)',
    durationMinutes: 30,
    sizeKb: 225,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-ge-p1',
        heading: '1. Les 3 grandes familles de roches et la géologie des hydrocarbures',
        content:
          'Les roches se répartissent en 3 familles : magmatiques (cristallisation du magma : granite, basalte), sédimentaires (dépôt et compaction : grès, calcaire, argile — où se forment les hydrocarbures) et métamorphiques (transformation par pression et température sans fusion : marbre, gneiss). Un gisement pétrolier exige 4 éléments : une roche mère organique enfouie dans la « fenêtre à huile » (60–120 °C), une migration, une roche réservoir poreuse et perméable (grès/calcaire) et une roche couverture imperméable (argile, sel) formant un piège (souvent anticlinal).',
        keyTakeaway:
          'Dans un piège pétrolier, les fluides se classent par densité croissante de haut en bas : Gaz → Pétrole → Eau.',
        diagramId: 'couches_geologiques',
      },
      {
        id: 'sec-ge-p2',
        heading: '2. Exploration et unités pétrolières',
        content:
          'L’exploration s’appuie sur la sismique réflexion (imagerie des couches profondes) avant tout forage exploratoire. La production pétrolière s’exprime en barils (1 baril bbl ≈ 159 litres). La qualité d’un brut dépend notamment de sa densité API (plus le degré API est élevé, plus le brut est léger) et de sa teneur en soufre.',
        keyTakeaway:
          '1 baril de pétrole (bbl) = 159 litres ; plus le °API est élevé, plus le pétrole est léger et facile à raffiner.',
        formula: '1 baril (bbl) ≈ 159 L   |   Fenêtre à huile ≈ 60 °C à 120 °C',
      },
    ],
  },
  {
    id: 'course-geo-hydro',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-hydro',
    title: 'Hydrogéologie, Aquifères & Responsabilité minière',
    durationMinutes: 25,
    sizeKb: 210,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-ge-h1',
        heading: '1. Porosité, perméabilité et types de nappes souterraines',
        content:
          'Un aquifère est une formation géologique capable de stocker l’eau (porosité) et de la laisser circuler (perméabilité — loi de Darcy). Une argile est poreuse mais presque imperméable : ce n’est pas un bon aquifère. On distingue la nappe libre (phréatique, surface à pression atmosphérique, vulnérable aux pollutions de surface) de la nappe captive (emprisonnée sous un toit imperméable, souvent sous pression pouvant jaillir en puits artésien).',
        keyTakeaway:
          'Bon aquifère (sables, grès, graviers) = forte porosité + forte perméabilité ; l’argile bloque l’écoulement.',
        formula: 'Loi de Darcy : Q = K · A · (Δh / L)',
      },
      {
        id: 'sec-ge-h2',
        heading: '2. Étude d’Impact Environnemental (EIE) et mines responsables',
        content:
          'Tout projet minier ou pétrolier moderne exige au préalable une Étude d’Impact Environnemental et Social (EIES) et un Plan de Gestion Environnementale et Sociale (PGES) couvrant la protection des nappes, le traitement des résidus (interdiction du mercure/cyanure non maîtrisé en orpaillage) et la remise en état du site après fermeture.',
        keyTakeaway:
          'L’EIES précède toujours le démarrage des travaux et intègre la consultation des communautés riveraines.',
      },
    ],
  },
  // Sciences Vétérinaires & Élevage
  {
    id: 'course-vet-zoonoses',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zoonoses',
    title: 'Santé animale, Zoonoses & Approche « One Health »',
    durationMinutes: 30,
    sizeKb: 220,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-vt-z1',
        heading: '1. Zoonoses majeures et concept « Une Seule Santé » (One Health)',
        content:
          'Une zoonose est une maladie infectieuse naturellement transmissible entre les animaux vertébrés et l’être humain (environ 60 % des maladies infectieuses humaines connues). Parmi les priorités en Afrique sahélienne : la rage (virale, 100 % mortelle une fois déclarée, évitable par vaccination canine et prophylaxie post-exposition), le charbon bactéridien (Bacillus anthracis — ne jamais ouvrir un cadavre suspect !), la brucellose (lait cru non pasteurisé) et la fièvre de la Vallée du Rift.',
        keyTakeaway:
          'Approche One Health = santé humaine + santé animale + santé des écosystèmes indissociables.',
      },
      {
        id: 'sec-vt-z2',
        heading: '2. Prophylaxie, vaccination du cheptel et quarantaine',
        content:
          'La prophylaxie sanitaire (quarantaine des nouveaux animaux, désinfection, abattage contrôlé, inspection des viandes en abattoir) complète la prophylaxie médicale (campagnes annuelles de vaccination contre la PPCB, la PPR des petits ruminants et la dermatose nodulaire). L’éradication mondiale de la peste bovine en 2011 reste le plus grand triomphe historique de la médecine vétérinaire.',
        keyTakeaway:
          'La peste bovine (éradiquée en 2011) est la seule maladie animale totalement éradiquée de la planète grâce à la vaccination.',
      },
    ],
  },
  {
    id: 'course-vet-zootech',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zootech',
    title: 'Zootechnie, Alimentation du cheptel & Chaîne de valeur',
    durationMinutes: 25,
    sizeKb: 205,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-vt-t1',
        heading: '1. Digestion des ruminants et gestion de la saison sèche',
        content:
          'Les ruminants (bovins, ovins, caprins, dromadaires) possèdent un estomac pluriloculaire (rumen, réseau, feuillet, caillette) dont la flore microbienne du rumen digère la cellulose des fourrages. En saison sèche sahélienne, la complémentation stratégique (fanes de niébé/arachide, tourteaux de coton, blocs multinutritionnels et eau propre) évite les pertes de poids et maintient la production laitière.',
        keyTakeaway:
          'Les 4 compartiments des ruminants : Rumen (panse) → Réseau (bonnet) → Feuillet → Caillette (estomac vrai).',
      },
      {
        id: 'sec-vt-t2',
        heading: '2. Indice de consommation (IC) et performance d’élevage',
        content:
          'En zootechnie (aviculture, embouche bovine/ovine), l’Indice de Consommation (IC) mesure la quantité d’aliment consommée (en kg) pour produire 1 kg de gain de poids vif : plus l’IC est faible, plus l’élevage est rentable (ex. poulet de chair performant : IC ≈ 1,7 à 2,0).',
        keyTakeaway:
          'Plus l’Indice de Consommation (IC = Aliment consommé / Gain de poids) est bas, meilleure est l’efficacité alimentaire.',
        formula: 'IC = Masse d’aliment consommée (kg) / Gain de poids vif (kg)',
      },
    ],
  },
  // FinTech & Microfinance
  {
    id: 'course-fin-mobile',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-mobile',
    title: 'Mobile Money, Interopérabilité & Conformité KYC / LBC-FT',
    durationMinutes: 30,
    sizeKb: 225,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-fi-m1',
        heading: '1. Monnaie électronique, cantonnement et interopérabilité',
        content:
          'En zone CEMAC (règlement COBAC/BEAC) et UEMOA (BCEAO), chaque franc CFA émis en monnaie électronique (Mobile Money) doit être intégralement adossé à 100 % à des fonds déposés sur un compte bancaire de cantonnement (trust account) protégé contre toute faillite de l’opérateur. L’interopérabilité (ex. GIMACPAY en CEMAC) permet de transférer instantanément de l’argent entre différents opérateurs mobiles et banques.',
        keyTakeaway:
          'Règle d’or prudentielle Mobile Money : 100 % des encours clients garantis sur un compte de cantonnement bancaire.',
        diagramId: 'flux_fintech',
      },
      {
        id: 'sec-fi-m2',
        heading: '2. KYC (Know Your Customer) et lutte anti-blanchiment (LBC-FT)',
        content:
          'Le KYC impose d’identifier et vérifier l’identité de chaque client (pièce officielle, plafonds progressifs selon le niveau KYC) afin de prévenir l’usurpation, la fraude et le blanchiment de capitaux ou le financement du terrorisme (LBC-FT). Toute opération atypique ou suspecte fait l’objet d’une déclaration de soupçon confidentielle à la cellule de renseignement financier nationale (ANIF / CENTIF).',
        keyTakeaway:
          'KYC proportionné (paliers de plafonds) concilie inclusion financière rapide et sécurité LBC-FT.',
      },
    ],
  },
  {
    id: 'course-fin-micro',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-micro',
    title: 'Microfinance, PAR 30 & Inclusion financière durable',
    durationMinutes: 25,
    sizeKb: 210,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-fi-c1',
        heading: '1. Qualité du portefeuille : l’indicateur PAR 30',
        content:
          'Dans un Établissement de Microfinance (EMF / SFD), le Portefeuille à Risque à 30 jours (PAR 30) mesure le capital restant dû de TOUS les prêts ayant au moins une échéance en retard de plus de 30 jours, rapporté à l’encours total de crédit. C’est un indicateur bien plus prudent que le simple montant des échéances impayées. Les standards internationaux visent un PAR 30 inférieur à 5 %.',
        keyTakeaway:
          'PAR 30 < 5 % = portefeuille sain ; au-delà, le risque de crise de liquidité et de solvabilité augmente fortement.',
        formula: 'PAR 30 = (Encours total des prêts en retard > 30 j / Encours total brut) × 100',
      },
      {
        id: 'sec-fi-c2',
        heading: '2. Protection du client et viabilité financière',
        content:
          'La microfinance responsable combine pérennité financière (couverture des charges par les produits, autosuffisance opérationnelle OSS > 100 %) et protection du client : transparence du Taux Effectif Global (TEG), évaluation rigoureuse de la capacité de remboursement pour éviter le surendettement, et mobilisation de l’épargne locale.',
        keyTakeaway:
          'OSS (Autosuffisance Opérationnelle) > 100 % signifie que l’institution couvre ses coûts sans dépendre de subventions.',
      },
    ],
  },
  // Psychologie Cognitive
  {
    id: 'course-psy-memoire',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-memoire',
    title: 'Mémoire, Courbe de l’oubli (Ebbinghaus) & Motivation (Maslow)',
    durationMinutes: 25,
    sizeKb: 205,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-ps-m1',
        heading: '1. Mémoire de travail, Ebbinghaus et rappel actif',
        content:
          'La mémoire de travail a une capacité très limitée (environ 4 à 7 éléments simultanés), ce qui explique pourquoi la surcharge d’informations bloque la compréhension. Hermann Ebbinghaus (1885) a montré que sans révision, l’oubli est exponentiel dans les premières 24 à 48 heures. Deux techniques validées par les neurosciences démultiplient la rétention en mémoire à long terme : le rappel actif (se tester sans regarder le cours, via flashcards/QCM) et la répétition espacée (algorithme SM-2).',
        keyTakeaway:
          'Relire passivement crée une « illusion de maîtrise » ; se tester activement à intervalles espacés ancre durablement le savoir.',
      },
      {
        id: 'sec-ps-m2',
        heading: '2. Pyramide de Maslow et motivation intrinsèque',
        content:
          'Abraham Maslow (1943) hiérarchise les besoins humains sur 5 niveaux : 1 physiologiques (sommeil, alimentation), 2 sécurité, 3 appartenance sociale, 4 estime de soi et 5 accomplissement de soi. En pédagogie et management, la motivation intrinsèque (sens, autonomie, progression visible) produit un engagement nettement plus durable que la seule récompense externe.',
        keyTakeaway:
          'Le sommeil (besoin physiologique de base) consolide activement la mémoire : réviser toute la nuit avant un examen est contre-productif.',
        diagramId: 'pyramide_maslow',
      },
    ],
  },
  {
    id: 'course-psy-biais',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-biais',
    title: 'Biais cognitifs, Esprit critique & Intelligence émotionnelle',
    durationMinutes: 25,
    sizeKb: 200,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-ps-b1',
        heading: '1. Les grands biais cognitifs à déjouer',
        content:
          'Nos jugements rapides (Système 1 de Daniel Kahneman) sont exposés à des biais systématiques : le biais de confirmation (chercher uniquement les preuves qui confirment notre croyance initiale), l’effet d’ancrage (se laisser influencer par le premier chiffre entendu) et l’effet Dunning-Kruger (surestimer sa compétence quand on débute dans un domaine complexe).',
        keyTakeaway:
          'Combattre le biais de confirmation : chercher activement un contre-exemple ou un avis contradictoire sourcé.',
      },
      {
        id: 'sec-ps-b2',
        heading: '2. Intelligence émotionnelle (Daniel Goleman)',
        content:
          'L’intelligence émotionnelle regroupe 4 piliers pratiques : conscience de ses propres émotions, maîtrise de soi (gestion du stress/impulsivité), conscience sociale (empathie) et gestion constructive des relations. Elle est déterminante dans le leadership, les métiers du soin, l’enseignement et les oraux de concours.',
        keyTakeaway:
          'Nommer précisément une émotion (« je ressens du trac ») active le cortex préfrontal et réduit immédiatement son intensité.',
      },
    ],
  },
  // Éthique & Marchés Publics
  {
    id: 'course-eth-marches',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-marches',
    title: 'Marchés publics, Déontologie & Conflits d’intérêts',
    durationMinutes: 30,
    sizeKb: 215,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-et-m1',
        heading: '1. Les 3 principes fondamentaux de la commande publique',
        content:
          'La passation des marchés publics obéit universellement à 3 principes cardinaux : 1) Liberté d’accès à la commande publique (publicité préalable), 2) Égalité de traitement des candidats (mêmes délais, mêmes critères objectifs) et 3) Transparence des procédures (traçabilité, publication de l’attribution, droit de recours). L’appel d’offres ouvert est la règle de droit commun ; l’entente directe (gré à gré) est strictement exceptionnelle et motivée.',
        keyTakeaway:
          'Triptyque sacré des marchés publics : Liberté d’accès + Égalité de traitement + Transparence des procédures.',
        formula: 'Commande publique = Liberté d’accès + Égalité + Transparence',
      },
      {
        id: 'sec-et-m2',
        heading: '2. Prévention des conflits d’intérêts et déontologie publique',
        content:
          'Un conflit d’intérêts existe dès qu’un intérêt personnel, familial ou financier d’un agent public est de nature à influencer ou paraître influencer l’exercice indépendant et impartial de ses fonctions. Le réflexe déontologique obligatoire est le déport immédiat : déclarer le lien à son supérieur et s’abstenir de participer à la décision ou à la commission d’attribution.',
        keyTakeaway:
          'Face à un conflit d’intérêts : transparence immédiate + déport (ne pas siéger ni décider).',
      },
    ],
  },
  {
    id: 'course-eth-rse',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-rse',
    title: 'Gouvernance, RSE (ISO 26000) & Lutte Anti-Corruption',
    durationMinutes: 25,
    sizeKb: 200,
    updatedAt: '2026-04-16',
    sections: [
      {
        id: 'sec-et-r1',
        heading: '1. RSE, norme ISO 26000 et critères ESG',
        content:
          'La Responsabilité Sociétale des Organisations (RSE, définie par la norme internationale volontaire ISO 26000) intègre les préoccupations sociales, environnementales et éthiques dans les activités quotidiennes. Les investisseurs évaluent cette performance extra-financière à travers les trois critères ESG : Environnement (climat, eau, déchets), Social (droits humains, santé-sécurité, formation) et Gouvernance (transparence, indépendance du conseil, lutte anti-corruption).',
        keyTakeaway:
          'ISO 26000 est une norme de lignes directrices (non certifiable au sens strict) structurée autour de 7 questions centrales.',
      },
      {
        id: 'sec-et-r2',
        heading: '2. Dispositifs anti-corruption et reddition des comptes',
        content:
          'La Convention des Nations Unies contre la corruption (Mérida, 2003) promeut la prévention : déclaration de patrimoine, dématérialisation des procédures fiscales et douanières, audits indépendants (Cour des comptes) et protection juridique des lanceurs d’alerte agissant de bonne foi.',
        keyTakeaway:
          'La digitalisation transparente des services publics réduit directement les opportunités de corruption de guichet.',
      },
    ],
  },
];

export const SUMMIT_FICHES: Fiche[] = [
  // Aéronautique & Météo
  {
    id: 'fiche-aero-vol',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-vol',
    title: 'Mécanique du Vol & Unités OACI',
    subtitle: '4 forces, décrochage et conversions nœuds/pieds',
    sizeKb: 72,
    notionsEssentielles: [
      'Vol rectiligne uniforme : Portance = Poids et Traction = Traînée.',
      'Le décrochage survient au dépassement de l’angle d’incidence critique (≈ 15–18°).',
      '1 NM = 1 852 m · 1 kt = 1,852 km/h · 1 ft = 0,3048 m.',
      'FL300 = 30 000 pieds au calage standard 1013,25 hPa.',
    ],
    definitions: [
      { terme: 'Angle d’incidence (α)', definition: 'Angle formé entre la corde du profil de l’aile et la direction du vent relatif.' },
    ],
    formules: [
      { label: 'Portance aérodynamique', formule: 'L = ½ · ρ · V² · S · C_z', unite: 'N' },
      { label: 'Conversions OACI', formule: '1 kt = 1,852 km/h  |  1 NM = 1 852 m  |  1 ft = 0,3048 m', unite: 'OACI' },
    ],
    datesReperes: [
      { repere: '12 décembre 1959', detail: 'Signature de la Convention de Saint-Louis créant l’ASECNA (siège à Dakar, école EAMAC à Niamey).' },
    ],
    methodes: [
      'Pour convertir rapidement des nœuds en km/h de tête : multiplier par 2 puis retrancher ≈ 7,5 %.',
    ],
    erreursFrequentes: [
      'Croire que le décrochage arrive uniquement à très basse vitesse (un avion peut décrocher à haute vitesse sous fort facteur de charge !).',
    ],
    exemples: [
      { titre: 'Conversion vitesse', contenu: '100 kt = 185,2 km/h ; 200 NM = 370,4 km.' },
    ],
    resumeExpress:
      'En vol uniforme L = mg et T = D ; maîtriser l’incidence de décrochage et les conversions OACI (NM, kt, ft) est indispensable aux concours ASECNA.',
    tableauComparatif: {
      headers: ['Grandeur', 'Unité OACI', 'Équivalent SI'],
      rows: [
        { critere: 'Distance', elementA: 'Mille nautique (NM)', elementB: '1 852 m' },
        { critere: 'Vitesse', elementA: 'Nœud (kt)', elementB: '1,852 km/h' },
        { critere: 'Altitude', elementA: 'Pied (ft)', elementB: '0,3048 m' },
      ],
    },
    autoEvaluation: [
      { question: 'À quelle vitesse en km/h correspondent 100 nœuds (kt) ?', reponse: '185,2 km/h.' },
    ],
  },
  {
    id: 'fiche-aero-meteo',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-meteo',
    title: 'Météorologie Aéro, QNH/QFE & METAR',
    subtitle: 'ISA 1013,25 hPa, calages altimétriques et cumulonimbus',
    sizeKb: 68,
    notionsEssentielles: [
      'Atmosphère ISA mer : T = +15 °C, P = 1013,25 hPa, gradient −6,5 °C / 1 000 m.',
      'QNH → altitude AMSL ; QFE → hauteur AGL (0 au sol) ; 1013 hPa → niveaux FL.',
      'Cumulonimbus (CB) = nuage le plus dangereux (turbulences, cisaillement, grêle, foudre).',
      'METAR = observation aérodrome ; TAF = prévision aérodrome ; CAVOK = météo dégagée ≥ 10 km.',
    ],
    definitions: [
      { terme: 'QNH', definition: 'Pression atmosphérique réduite au niveau moyen de la mer selon l’ISA ; affiche l’altitude du terrain au sol.' },
    ],
    formules: [
      { label: 'Gradient thermique ISA', formule: '−6,5 °C par 1 000 m (≈ −2 °C / 1 000 ft)', unite: '°C/km' },
    ],
    datesReperes: [
      { repere: '1944 — Convention de Chicago', detail: 'Création de l’Organisation de l’Aviation Civile Internationale (OACI).' },
    ],
    methodes: [
      'Retenir : QFE → « F » comme Field (0 sur le terrain) ; QNH → altitude mer.',
    ],
    erreursFrequentes: [
      'Confondre METAR (observation réelle) et TAF (prévision future).',
    ],
    exemples: [
      { titre: 'Température ISA à 4 000 m', contenu: '15 − (4 × 6,5) = 15 − 26 = −11 °C.' },
    ],
    resumeExpress:
      'ISA (15 °C / 1013,25 hPa / −6,5 °C/km), distinction QNH/QFE/FL et évitement absolu des cumulonimbus (CB) forment la base météo ASECNA.',
    tableauComparatif: {
      headers: ['Calage', 'Référence', 'Indication au sol'],
      rows: [
        { critere: 'QFE', elementA: 'Pression de l’aérodrome', elementB: '0 pied (hauteur AGL)' },
        { critere: 'QNH', elementA: 'Niveau moyen de la mer', elementB: 'Altitude officielle du terrain (AMSL)' },
        { critere: '1013,25 hPa', elementA: 'Pression standard ISA', elementB: 'Niveaux de vol (FL) en croisière' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel calage altimétrique affiche 0 pied lorsque l’avion est posé sur la piste ?', reponse: 'Le QFE.' },
    ],
  },
  // Géologie & Mines
  {
    id: 'fiche-geo-petrole',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-petrole',
    title: 'Roches & Système Pétrolier',
    subtitle: 'Roche mère, réservoir, couverture et pièges',
    sizeKb: 70,
    notionsEssentielles: [
      '3 familles : magmatiques, sédimentaires (hydrocarbures), métamorphiques.',
      'Système pétrolier : Roche mère → Migration → Roche réservoir poreuse → Roche couverture imperméable.',
      'Dans le piège : Gaz au sommet, Pétrole au milieu, Eau en bas (par densité croissante).',
      '1 baril (bbl) ≈ 159 litres ; fenêtre à huile ≈ 60–120 °C.',
    ],
    definitions: [
      { terme: 'Roche couverture', definition: 'Couche géologique imperméable (argile, évaporite/sel) empêchant les hydrocarbures de remonter en surface.' },
    ],
    formules: [
      { label: 'Unité pétrolière', formule: '1 baril (bbl) = 159 litres', unite: 'L' },
    ],
    datesReperes: [
      { repere: '2003 — Bassin de Doba', detail: 'Mise en production pétrolière du bassin de Doba (pipeline Tchad–Cameroun vers Kribi).' },
    ],
    methodes: [
      'Toujours classer les fluides d’un réservoir par densité : Gaz (léger) < Pétrole < Eau (lourde).',
    ],
    erreursFrequentes: [
      'Croire que le pétrole se trouve dans des « cavernes souterraines vides » (il imprègne les pores microscopiques d’une roche réservoir !).',
    ],
    exemples: [
      { titre: 'Piège structural', contenu: 'Un pli anticlinal coiffé d’une couche d’argile retient le gaz et le pétrole dans le grès sous-jacent.' },
    ],
    resumeExpress:
      'Un gisement pétrolier exige roche mère, migration, réservoir poreux/perméable et couverture imperméable piégeant Gaz, Pétrole puis Eau.',
    tableauComparatif: {
      headers: ['Famille de roche', 'Mode de formation', 'Exemples'],
      rows: [
        { critere: 'Magmatique', elementA: 'Refroidissement d’un magma', elementB: 'Granite, Basalte' },
        { critere: 'Sédimentaire', elementA: 'Dépôt, compaction, cimentation', elementB: 'Grès, Calcaire, Argile' },
        { critere: 'Métamorphique', elementA: 'Pression & température (sans fusion)', elementB: 'Gneiss, Marbre, Schiste' },
      ],
    },
    autoEvaluation: [
      { question: 'Dans quel ordre (de haut en bas) se disposent l’eau, le gaz et le pétrole dans un piège anticlinal ?', reponse: 'Gaz en haut, pétrole au milieu, eau en bas.' },
    ],
  },
  {
    id: 'fiche-geo-hydro',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-hydro',
    title: 'Hydrogéologie & EIES Minière',
    subtitle: 'Aquifères libres/captifs, loi de Darcy et environnement',
    sizeKb: 66,
    notionsEssentielles: [
      'Un bon aquifère combine porosité (stockage) et perméabilité (circulation).',
      'L’argile est poreuse mais imperméable (rôle d’écran/toit).',
      'Nappe libre (surface libre, vulnérable) vs Nappe captive (sous pression, artésianisme possible).',
      'EIES + PGES obligatoires avant tout projet extractif ou forage majeur.',
    ],
    definitions: [
      { terme: 'Puits artésien', definition: 'Forage atteignant une nappe captive sous pression où l’eau remonte spontanément.' },
    ],
    formules: [
      { label: 'Loi de Darcy', formule: 'Q = K · A · (Δh / L)', unite: 'm³/s' },
    ],
    datesReperes: [
      { repere: '1856 — Henry Darcy', detail: 'Formulation de la loi expérimentale d’écoulement de l’eau en milieu poreux.' },
    ],
    methodes: [
      'Distinguer porosité (volume de vides) et perméabilité (capacité de ces vides à laisser passer l’eau).',
    ],
    erreursFrequentes: [
      'Confondre nappe phréatique (libre, proche surface) et nappe captive profonde.',
    ],
    exemples: [
      { titre: 'Bassin du Lac Tchad', contenu: 'Système multicouche combinant nappe phréatique quaternaire et nappes profondes captives.' },
    ],
    resumeExpress:
      'L’hydrogéologie caractérise les aquifères par porosité/perméabilité (Darcy) et protège durablement les nappes via les EIES.',
    tableauComparatif: {
      headers: ['Critère', 'Nappe libre (phréatique)', 'Nappe captive'],
      rows: [
        { critere: 'Toit imperméable', elementA: 'Non (en contact avec l’air du sol)', elementB: 'Oui (couche imperméable au-dessus)' },
        { critere: 'Vulnérabilité pollution', elementA: 'Élevée', elementB: 'Mieux protégée naturellement' },
        { critere: 'Pression', elementA: 'Atmosphérique', elementB: 'Sous pression (artésianisme possible)' },
      ],
    },
    autoEvaluation: [
      { question: 'Pourquoi l’argile ne constitue-t-elle pas un bon aquifère exploitable malgré sa porosité ?', reponse: 'Parce que ses pores microscopiques la rendent quasiment imperméable (l’eau ne circule pas).' },
    ],
  },
  // Vétérinaire & Élevage
  {
    id: 'fiche-vet-zoonoses',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zoonoses',
    title: 'Zoonoses & Approche « One Health »',
    subtitle: 'Rage, charbon bactéridien, brucellose et prophylaxie',
    sizeKb: 68,
    notionsEssentielles: [
      'Zoonose = maladie infectieuse transmissible entre animaux vertébrés et humains (~60 % des infections humaines).',
      'One Health unit santé humaine, santé animale et santé environnementale.',
      'Charbon bactéridien : ne JAMAIS ouvrir un cadavre suspect (formation de spores très résistantes).',
      'Peste bovine : seule maladie animale totalement éradiquée mondialement (2011).',
    ],
    definitions: [
      { terme: 'Prophylaxie', definition: 'Ensemble des mesures sanitaires et médicales (vaccination) visant à prévenir les maladies.' },
    ],
    formules: [
      { label: 'Triptyque One Health', formule: 'Santé Humaine + Santé Animale + Santé des Écosystèmes', unite: 'OMS / OMSA / FAO' },
    ],
    datesReperes: [
      { repere: '2011 — OMSA / FAO', detail: 'Déclaration officielle de l’éradication mondiale de la peste bovine.' },
    ],
    methodes: [
      'Face à une morsure de chien suspect de rage : lavage immédiat à l’eau et au savon 15 min + orientation urgente pour vaccination post-exposition.',
    ],
    erreursFrequentes: [
      'Consommer du lait cru non bouilli/non pasteurisé (risque élevé de brucellose et tuberculose bovine).',
    ],
    exemples: [
      { titre: 'Prévention brucellose', contenu: 'Pasteurisation / ébullition du lait + vaccination et dépistage du troupeau.' },
    ],
    resumeExpress:
      'Protéger la santé animale (vaccination, hygiène, inspection) protège directement la santé humaine contre les zoonoses (approche One Health).',
    tableauComparatif: {
      headers: ['Zoonose', 'Agent', 'Prévention clé'],
      rows: [
        { critere: 'Rage', elementA: 'Virus (Lyssavirus)', elementB: 'Vaccination canine + lavage/vaccin post-morsure' },
        { critere: 'Charbon bactéridien', elementA: 'Bactérie (Bacillus anthracis)', elementB: 'Vaccination cheptel + ne jamais ouvrir le cadavre' },
        { critere: 'Brucellose', elementA: 'Bactérie (Brucella)', elementB: 'Pasteurisation du lait + contrôle sanitaire' },
      ],
    },
    autoEvaluation: [
      { question: 'Pourquoi ne faut-il jamais ouvrir un cadavre d’animal suspect de charbon bactéridien ?', reponse: 'Au contact de l’oxygène de l’air, la bactérie forme des spores extrêmement résistantes qui contaminent durablement le sol.' },
    ],
  },
  {
    id: 'fiche-vet-zootech',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zootech',
    title: 'Zootechnie, Ruminants & Indice de Consommation',
    subtitle: '4 compartiments gastriques et performance d’élevage',
    sizeKb: 65,
    notionsEssentielles: [
      '4 compartiments du ruminant : Rumen, Réseau, Feuillet, Caillette.',
      'Flore microbienne du rumen digère la cellulose des fourrages.',
      'Indice de Consommation (IC) = kg d’aliment consommé / kg de gain de poids vif.',
      'Plus l’IC est faible, meilleure est la rentabilité de l’élevage.',
    ],
    definitions: [
      { terme: 'Indice de consommation (IC)', definition: 'Indicateur d’efficacité alimentaire mesurant le poids d’aliment nécessaire pour 1 kg de croissance.' },
    ],
    formules: [
      { label: 'Indice de Consommation', formule: 'IC = Aliment consommé (kg) / Gain de poids (kg)', unite: 'sans unité' },
    ],
    datesReperes: [
      { repere: 'Repère aviculture', detail: 'Un lot performant de poulets de chair affiche un IC entre 1,7 et 2,0.' },
    ],
    methodes: [
      'Calculer le gain de poids = Poids final − Poids initial avant de diviser la masse d’aliment.',
    ],
    erreursFrequentes: [
      'Penser qu’un IC élevé est préférable (au contraire, un IC élevé signifie qu’il faut plus d’aliments coûteux pour le même poids !).',
    ],
    exemples: [
      { titre: 'Calcul IC', contenu: 'Un mouton consomme 40 kg d’aliment et gagne 8 kg de poids vif → IC = 40 / 8 = 5,0.' },
    ],
    resumeExpress:
      'Connaître la physiologie des ruminants (rumen → caillette) et optimiser l’Indice de Consommation sécurisent la productivité de l’élevage.',
    tableauComparatif: {
      headers: ['Compartiment', 'Nom courant', 'Rôle principal'],
      rows: [
        { critere: 'Rumen', elementA: 'Panse', elementB: 'Fermentation microbienne de la cellulose' },
        { critere: 'Réseau / Feuillet', elementA: 'Bonnet / Livre', elementB: 'Triage, rumination, absorption eau' },
        { critere: 'Caillette', elementA: 'Estomac vrai', elementB: 'Digestion acide et enzymatique' },
      ],
    },
    autoEvaluation: [
      { question: 'Si un lot de volailles consomme 360 kg d’aliment pour gagner 200 kg de poids vif, que vaut l’IC ?', reponse: '360 / 200 = 1,8.' },
    ],
  },
  // FinTech & Microfinance
  {
    id: 'fiche-fin-mobile',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-mobile',
    title: 'Mobile Money, Cantonnement & KYC / LBC-FT',
    subtitle: 'Régulation COBAC / BCEAO et paiements sécurisés',
    sizeKb: 70,
    notionsEssentielles: [
      'Compte de cantonnement bancaire : 100 % des fonds clients protégés séparément.',
      'Interopérabilité (ex. GIMACPAY) : transferts fluides entre opérateurs et banques.',
      'KYC (Know Your Customer) : vérification d’identité par paliers de plafonds.',
      'LBC-FT : déclaration de soupçon confidentielle auprès de l’ANIF / CENTIF.',
    ],
    definitions: [
      { terme: 'Compte de cantonnement', definition: 'Compte bancaire dédié garantissant à 100 % la contrepartie de la monnaie électronique émise.' },
    ],
    formules: [
      { label: 'Équilibre prudentiel', formule: 'Solde Compte de Cantonnement ≥ 100 % Encours Monnaie Électronique', unite: 'règle BEAC/BCEAO' },
    ],
    datesReperes: [
      { repere: 'GIMACPAY (CEMAC)', detail: 'Plateforme d’interopérabilité régionale des paiements par carte et Mobile Money.' },
    ],
    methodes: [
      'Ne jamais informer un client faisant l’objet d’une déclaration de soupçon LBC-FT (strictement confidentiel).',
    ],
    erreursFrequentes: [
      'Penser qu’un émetteur de monnaie électronique peut prêter librement les fonds clients du compte de cantonnement (strictement interdit !).',
    ],
    exemples: [
      { titre: 'Plafonds KYC', contenu: 'KYC niveau 1 (inscription simplifiée) = plafonds réduits ; KYC complet (pièce vérifiée) = plafonds étendus.' },
    ],
    resumeExpress:
      'La confiance dans le Mobile Money repose sur le cantonnement à 100 %, l’interopérabilité régionale et la rigueur KYC / LBC-FT.',
    tableauComparatif: {
      headers: ['Critère', 'Établissement de Monnaie Électronique', 'Banque commerciale'],
      rows: [
        { critere: 'Collecte fonds', elementA: 'Monnaie électronique cantonnée 100 %', elementB: 'Dépôts bancaires classiques' },
        { critere: 'Octroi de crédit sur fonds', elementA: 'Interdit sur les fonds cantonnés', elementB: 'Autorisé (intermédiation financière)' },
        { critere: 'Distribution', elementA: 'Réseau d’agents de proximité / USSD / App', elementB: 'Agences + banque digitale' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel pourcentage de la monnaie électronique en circulation doit être garanti sur un compte de cantonnement ?', reponse: '100 % (couverture intégrale).' },
    ],
  },
  {
    id: 'fiche-fin-micro',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-micro',
    title: 'Microfinance, PAR 30 & Viabilité (OSS)',
    subtitle: 'Risque crédit et inclusion financière responsable',
    sizeKb: 68,
    notionsEssentielles: [
      'PAR 30 = Encours total des prêts ayant > 30 jours de retard / Encours brut total.',
      'Seuil de santé international : PAR 30 < 5 %.',
      'OSS (Autosuffisance Opérationnelle) > 100 % = institution rentable sans subventions.',
      'Protection client : affichage transparent du TEG et prévention du surendettement.',
    ],
    definitions: [
      { terme: 'PAR 30', definition: 'Portefeuille à Risque à 30 jours : mesure prudente de la dégradation d’un portefeuille de crédits.' },
    ],
    formules: [
      { label: 'PAR 30', formule: '(Capital restant dû des prêts en retard > 30 j / Encours total) × 100', unite: '%' },
    ],
    datesReperes: [
      { repere: '2006 — Muhammad Yunus (Prix Nobel)', detail: 'Reconnaissance mondiale du rôle de la microfinance (Grameen Bank) dans la lutte contre la pauvreté.' },
    ],
    methodes: [
      'Attention : le numérateur du PAR 30 inclut TOUT le capital restant dû du prêt en retard, pas seulement la mensualité impayée !',
    ],
    erreursFrequentes: [
      'Ne compter que l’échéance échue impayée dans le PAR 30 (ce qui masque gravement le risque réel).',
    ],
    exemples: [
      { titre: 'Calcul PAR 30', contenu: 'Encours total = 500 M FCFA ; capital restant dû des crédits > 30 j retard = 20 M FCFA → PAR 30 = 4 % (sain).' },
    ],
    resumeExpress:
      'Une microfinance durable maintient un PAR 30 < 5 %, un OSS > 100 % et protège ses emprunteurs contre le surendettement.',
    tableauComparatif: {
      headers: ['Indicateur', 'Seuil sain', 'Signification'],
      rows: [
        { critere: 'PAR 30', elementA: '< 5 %', elementB: 'Maîtrise du risque de défaut crédit' },
        { critere: 'OSS', elementA: '> 100 %', elementB: 'Couverture autonome des charges' },
        { critere: 'TEG', elementA: 'Inférieur au taux d’usure légal', elementB: 'Coût total transparent du crédit' },
      ],
    },
    autoEvaluation: [
      { question: 'En dessous de quel seuil un PAR 30 est-il généralement considéré comme maîtrisé en microfinance ?', reponse: 'En dessous de 5 %.' },
    ],
  },
  // Psychologie Cognitive
  {
    id: 'fiche-psy-memoire',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-memoire',
    title: 'Mémoire, Ebbinghaus & Pyramide de Maslow',
    subtitle: 'Sciences cognitives appliquées à l’apprentissage',
    sizeKb: 68,
    notionsEssentielles: [
      'Mémoire de travail limitée (~4 à 7 éléments) → découper les révisions en blocs courts.',
      'Courbe d’Ebbinghaus (1885) : oubli rapide sans réactivation espacée.',
      'Rappel actif (QCM/Flashcards) + répétition espacée (SM-2) = méthodes les plus efficaces.',
      'Pyramide de Maslow : Physiologique → Sécurité → Appartenance → Estime → Accomplissement.',
    ],
    definitions: [
      { terme: 'Rappel actif', definition: 'Effort volontaire de récupération en mémoire sans regarder la réponse, renforçant les traces neuronales.' },
    ],
    formules: [
      { label: 'Équation mémorisation', formule: 'Rappel actif + Répétition espacée + Sommeil = Rétention longue', unite: 'cognition' },
    ],
    datesReperes: [
      { repere: '1885 — Hermann Ebbinghaus', detail: 'Découverte expérimentale de la courbe de l’oubli et de l’effet d’espacement.' },
      { repere: '1943 — Abraham Maslow', detail: 'Publication de la théorie hiérarchique des 5 besoins.' },
    ],
    methodes: [
      'Fermer le cours après 10 minutes de lecture et réciter ou répondre à 3 questions de mémoire.',
    ],
    erreursFrequentes: [
      'Surligner passivement un cours 5 fois la veille (faible rétention comparé au test actif espacé).',
    ],
    exemples: [
      { titre: 'Effet sommeil', contenu: '7 à 8 heures de sommeil consolident les souvenirs de la journée dans le néocortex.' },
    ],
    resumeExpress:
      'Pour apprendre vite et retenir longtemps : fractionner (mémoire de travail), pratiquer le rappel actif espacé (Ebbinghaus) et respecter son sommeil (Maslow).',
    tableauComparatif: {
      headers: ['Stratégie', 'Efficacité prouvée', 'Effort perçu'],
      rows: [
        { critere: 'Relecture / Surlignage', elementA: 'Faible (illusion de maîtrise)', elementB: 'Faible' },
        { critere: 'Rappel actif (Flashcards / QCM)', elementA: 'Très élevée', elementB: 'Modéré (effort utile)' },
        { critere: 'Répétition espacée (SM-2)', elementA: 'Très élevée sur le long terme', elementB: 'Court mais régulier' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel niveau forme la base (niveau 1) de la pyramide de Maslow ?', reponse: 'Les besoins physiologiques (respirer, boire, manger, dormir).' },
    ],
  },
  {
    id: 'fiche-psy-biais',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-biais',
    title: 'Biais Cognitifs & Intelligence Émotionnelle',
    subtitle: 'Esprit critique et maîtrise de soi',
    sizeKb: 65,
    notionsEssentielles: [
      'Biais de confirmation : ne retenir que les informations validant son idée initiale.',
      'Effet d’ancrage : se fier excessivement à la première information ou chiffre reçu.',
      'Effet Dunning-Kruger : surestimation de ses compétences quand on maîtrise peu un sujet.',
      '4 piliers de l’intelligence émotionnelle (Goleman) : conscience de soi, maîtrise de soi, empathie, gestion des relations.',
    ],
    definitions: [
      { terme: 'Biais de confirmation', definition: 'Tendance cognitive à rechercher et privilégier les éléments qui confirment nos croyances préexistantes.' },
    ],
    formules: [
      { label: 'Double système (Kahneman)', formule: 'Système 1 (rapide/intuitif) vs Système 2 (lent/analytique)', unite: 'cognition' },
    ],
    datesReperes: [
      { repere: '1995 — Daniel Goleman', detail: 'Popularisation scientifique et managériale de l’intelligence émotionnelle.' },
    ],
    methodes: [
      'En QCM, lire l’ensemble des 4 choix avant de conclure pour déjouer le biais de confirmation sur la première option séduisante.',
    ],
    erreursFrequentes: [
      'Croire que l’on est personnellement immunisé contre les biais cognitifs (biais de la tache aveugle).',
    ],
    exemples: [
      { titre: 'Effet d’ancrage en négociation', contenu: 'Un prix affiché barré très élevé rend le prix final artificiellement attractif.' },
    ],
    resumeExpress:
      'Identifier ses biais cognitifs (confirmation, ancrage, Dunning-Kruger) et cultiver son intelligence émotionnelle améliore nettement ses décisions.',
    tableauComparatif: {
      headers: ['Biais', 'Mécanisme', 'Antidote'],
      rows: [
        { critere: 'Confirmation', elementA: 'Ne voir que ce qui donne raison', elementB: 'Chercher activement une preuve contraire' },
        { critere: 'Ancrage', elementA: 'Rester fixé au premier chiffre', elementB: 'Recalculer à partir de données objectives' },
        { critere: 'Dunning-Kruger', elementA: 'Excès de confiance du débutant', elementB: 'S’évaluer par des tests objectifs (diagnostic)' },
      ],
    },
    autoEvaluation: [
      { question: 'Comment s’appelle la tendance à ne retenir que les faits qui confirment notre opinion de départ ?', reponse: 'Le biais de confirmation.' },
    ],
  },
  // Éthique & Marchés Publics
  {
    id: 'fiche-eth-marches',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-marches',
    title: 'Marchés Publics & Conflits d’Intérêts',
    subtitle: 'Les 3 principes cardinaux et le réflexe de déport',
    sizeKb: 68,
    notionsEssentielles: [
      '3 principes des marchés publics : Liberté d’accès, Égalité de traitement, Transparence.',
      'L’appel d’offres ouvert est la règle ; le gré à gré est strictement exceptionnel.',
      'Conflit d’intérêts = intérêt privé pouvant influencer l’impartialité d’une décision publique.',
      'Réflexe obligatoire : déclaration + déport (s’abstenir de siéger/décider).',
    ],
    definitions: [
      { terme: 'Déport', definition: 'Abstention volontaire et obligatoire d’un agent ou décideur lorsqu’il se trouve en situation de conflit d’intérêts.' },
    ],
    formules: [
      { label: 'Commande publique', formule: 'Liberté d’accès + Égalité de traitement + Transparence', unite: '3 principes' },
    ],
    datesReperes: [
      { repere: '2003 — Convention de Mérida (ONU)', detail: 'Premier instrument juridique universel contraignant de lutte contre la corruption.' },
    ],
    methodes: [
      'En cas pratique de concours ENAM, vérifier d’abord s’il existe un lien familial/financier avec un soumissionnaire → conclure immédiatement au déport.',
    ],
    erreursFrequentes: [
      'Croire que l’urgence dispense totalement de justifier un marché de gré à gré.',
    ],
    exemples: [
      { titre: 'Commission d’appel d’offres', contenu: 'Un membre dont le frère dirige une entreprise candidate doit déclarer ce lien et quitter la séance.' },
    ],
    resumeExpress:
      'Liberté, égalité, transparence gouvernent la commande publique ; tout conflit d’intérêts impose transparence et déport immédiat.',
    tableauComparatif: {
      headers: ['Procédure', 'Usage réglementaire', 'Niveau de concurrence'],
      rows: [
        { critere: 'Appel d’offres ouvert', elementA: 'Règle de droit commun', elementB: 'Maximale (tout candidat éligible)' },
        { critere: 'Appel d’offres restreint', elementA: 'Prestations très spécialisées', elementB: 'Sélection préalable encadrée' },
        { critere: 'Entente directe (gré à gré)', elementA: 'Strictement exceptionnelle & motivée', elementB: 'Nulle (contrôle renforcé)' },
      ],
    },
    autoEvaluation: [
      { question: 'Quels sont les 3 grands principes fondamentaux de la passation des marchés publics ?', reponse: 'Liberté d’accès, égalité de traitement des candidats et transparence des procédures.' },
    ],
  },
  {
    id: 'fiche-eth-rse',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-rse',
    title: 'Gouvernance, RSE (ISO 26000) & ESG',
    subtitle: 'Performance extra-financière et anti-corruption',
    sizeKb: 64,
    notionsEssentielles: [
      'ESG = Environnement, Social, Gouvernance.',
      'ISO 26000 : norme internationale de lignes directrices sur la RSE (volontaire, 7 questions centrales).',
      'Lanceur d’alerte de bonne foi : doit bénéficier d’une protection contre les représailles.',
      'Dématérialisation + audits indépendants = leviers majeurs d’intégrité.',
    ],
    definitions: [
      { terme: 'RSE', definition: 'Intégration volontaire des enjeux sociaux, environnementaux et éthiques dans la stratégie d’une organisation.' },
    ],
    formules: [
      { label: 'Critères ESG', formule: 'E (Environnement) + S (Social) + G (Gouvernance)', unite: '3 piliers' },
    ],
    datesReperes: [
      { repere: '2010 — Publication ISO 26000', detail: 'Référentiel mondial consensuel de la Responsabilité Sociétale des Organisations.' },
    ],
    methodes: [
      'Distinguer ISO 9001 (qualité, certifiable), ISO 14001 (environnement, certifiable) et ISO 26000 (RSE, lignes directrices).',
    ],
    erreursFrequentes: [
      'Réduire la RSE à de la simple communication (« greenwashing ») sans actions mesurables.',
    ],
    exemples: [
      { titre: 'Critère G (Gouvernance)', contenu: 'Publication des comptes audités, parité au conseil, charte anti-corruption.' },
    ],
    resumeExpress:
      'La gouvernance responsable (ESG, ISO 26000, protection des lanceurs d’alerte et audits) bâtit la confiance durable des citoyens et investisseurs.',
    tableauComparatif: {
      headers: ['Pilier ESG', 'Exemples d’indicateurs', 'Enjeu majeur'],
      rows: [
        { critere: 'Environnement (E)', elementA: 'Émissions CO₂, gestion eau & déchets', elementB: 'Transition écologique' },
        { critere: 'Social (S)', elementA: 'Santé-sécurité, formation, égalité', elementB: 'Capital humain & droits' },
        { critere: 'Gouvernance (G)', elementA: 'Audit, anti-corruption, éthique', elementB: 'Intégrité & transparence' },
      ],
    },
    autoEvaluation: [
      { question: 'Que signifie l’acronyme ESG ?', reponse: 'Environnement, Social et Gouvernance.' },
    ],
  },
];

export const SUMMIT_QUESTIONS: Question[] = [
  // ===== AÉRONAUTIQUE & MÉTÉO (5) =====
  {
    id: 'q-aero-1',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-vol',
    examIds: ['concours-aeronautique', 'concours-ingenieur'],
    prompt: 'En vol rectiligne horizontal à vitesse constante, quelles égalités lient les 4 forces aérodynamiques agissant sur un avion ?',
    options: [
      'Portance = Traînée et Traction = Poids',
      'Portance = Poids et Traction = Traînée',
      'Portance = 0 et Traction = 2 × Poids',
      'Traînée = Poids et Portance = Traction',
    ],
    correctIndex: 1,
    explanation: 'Selon la première loi de Newton (équilibre des forces), en vol rectiligne uniforme, la Portance équilibre le Poids (axe vertical) et la Traction équilibre la Traînée (axe horizontal).',
    steps: [
      'Axe vertical : Portance (haut) = Poids (bas).',
      'Axe horizontal : Traction (avant) = Traînée (arrière).',
    ],
    notion: 'Équilibre des 4 forces du vol',
    difficulty: 'facile',
    ficheId: 'fiche-aero-vol',
    source: 'Concours ASECNA / EAMAC 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-aero-2',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-vol',
    examIds: ['concours-aeronautique'],
    prompt: 'Un aéronef vole à une vitesse propre de 200 nœuds (kt). À quelle vitesse approximative en km/h cela correspond-il ?',
    options: ['200 km/h', '320 km/h', '370,4 km/h', '500 km/h'],
    correctIndex: 2,
    explanation: '1 nœud (kt) = 1,852 km/h, donc 200 kt = 200 × 1,852 = 370,4 km/h.',
    steps: [
      'Rappeler 1 kt = 1,852 km/h.',
      'Calculer 200 × 1,852 = 370,4 km/h.',
    ],
    notion: 'Conversions OACI (nœuds ↔ km/h)',
    difficulty: 'moyen',
    ficheId: 'fiche-aero-vol',
    source: 'Annale EAMAC Niamey 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-aero-3',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-vol',
    examIds: ['concours-aeronautique'],
    prompt: 'Quel paramètre aérodynamique déclenche directement le décrochage d’une aile lorsqu’il dépasse sa valeur critique ?',
    options: [
      'La couleur du fuselage',
      'L’angle d’incidence (angle entre la corde de l’aile et le vent relatif)',
      'La pression des pneus',
      'La fréquence radio VHF',
    ],
    correctIndex: 1,
    explanation: 'Le décrochage survient dès que l’angle d’incidence α dépasse l’incidence critique (≈ 15–18°), provoquant le décollement des filets d’air sur l’extrados et une chute brutale de portance.',
    steps: [
      'Décrochage = dépassement de l’angle d’incidence critique (et non une vitesse fixe unique).',
    ],
    notion: 'Incidence critique & Décrochage',
    difficulty: 'moyen',
    ficheId: 'fiche-aero-vol',
    source: 'Concours Contrôle Aérien ASECNA 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-aero-4',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-meteo',
    examIds: ['concours-aeronautique'],
    prompt: 'En atmosphère standard OACI (ISA : +15 °C au niveau de la mer, gradient −6,5 °C / 1 000 m), quelle est la température théorique à 2 000 m d’altitude ?',
    options: ['+8,5 °C', '+2,0 °C', '−5,0 °C', '+28,0 °C'],
    correctIndex: 1,
    explanation: 'T(2 000 m) = 15 − (2 × 6,5) = 15 − 13 = +2,0 °C.',
    steps: [
      'Décroissance sur 2 km : 2 × 6,5 = 13 °C.',
      'Température : 15 − 13 = +2,0 °C.',
    ],
    notion: 'Atmosphère standard ISA',
    difficulty: 'moyen',
    ficheId: 'fiche-aero-meteo',
    source: 'Concours Météorologie EAMAC 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-aero-5',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-meteo',
    examIds: ['concours-aeronautique'],
    prompt: 'Quel type de nuage à fort développement vertical constitue le danger météorologique majeur en aviation (turbulences sévères, cisaillement, grêle, foudre) ?',
    options: ['Le Cirrus (CI)', 'Le Stratus (ST)', 'Le Cumulonimbus (CB)', 'L’Altostratus (AS)'],
    correctIndex: 2,
    explanation: 'Le Cumulonimbus (CB) concentre les pires phénomènes convectifs (courants ascendants/descendants violents, givrage, grêle, foudre) et doit impérativement être contourné.',
    steps: [
      'Code météo CB = Cumulonimbus = orage convectif dangereux.',
    ],
    notion: 'Dangers météo — Cumulonimbus (CB)',
    difficulty: 'facile',
    ficheId: 'fiche-aero-meteo',
    source: 'Concours ASECNA 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },

  // ===== GÉOLOGIE, MINES & HYDROCARBURES (5) =====
  {
    id: 'q-geo-1',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-petrole',
    examIds: ['concours-mines-petrole', 'concours-genie-civil'],
    prompt: 'Dans un piège pétrolier anticlinal contenant de l’eau, du pétrole et du gaz naturel, dans quel ordre (de HAUT en BAS) ces fluides se répartissent-ils ?',
    options: [
      'Eau → Pétrole → Gaz',
      'Gaz → Pétrole → Eau',
      'Pétrole → Eau → Gaz',
      'Gaz → Eau → Pétrole',
    ],
    correctIndex: 1,
    explanation: 'Sous l’effet de la gravité et de leurs densités respectives, le gaz (le moins dense) occupe le sommet du piège, le pétrole la couche intermédiaire et l’eau (la plus dense) la base.',
    steps: [
      'Classer par densité croissante : Gaz < Pétrole < Eau → de haut en bas : Gaz, Pétrole, Eau.',
    ],
    notion: 'Structure d’un piège pétrolier',
    difficulty: 'facile',
    ficheId: 'fiche-geo-petrole',
    source: 'Concours Mines & Pétrole (ENSPM) 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-geo-2',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-petrole',
    examIds: ['concours-mines-petrole'],
    prompt: 'Quel rôle joue la « roche couverture » (ex. argile ou sel) dans la constitution d’un gisement d’hydrocarbures ?',
    options: [
      'Elle produit la matière organique initiale',
      'Étant imperméable, elle bloque la remontée des hydrocarbures vers la surface',
      'Elle dissout totalement le pétrole dans l’air',
      'Elle augmente la porosité du granite',
    ],
    correctIndex: 1,
    explanation: 'Sans roche couverture imperméable coiffant la roche réservoir poreuse, le pétrole et le gaz continueraient leur migration jusqu’à la surface où ils se dégraderaient.',
    steps: [
      'Roche mère = génère ; Roche réservoir = stocke ; Roche couverture = scelle (imperméable).',
    ],
    notion: 'Rôle de la roche couverture',
    difficulty: 'facile',
    ficheId: 'fiche-geo-petrole',
    source: 'Concours Hydrocarbures 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-geo-3',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-petrole',
    examIds: ['concours-mines-petrole'],
    prompt: 'À quel volume approximatif en litres correspond 1 baril standard de pétrole brut (1 bbl) ?',
    options: ['42 litres', '100 litres', '159 litres', '500 litres'],
    correctIndex: 2,
    explanation: 'Un baril américain standard (42 US gallons) équivaut exactement à 158,987 litres, soit environ 159 litres.',
    steps: [
      'Retenir 1 baril (bbl) = 42 gallons US ≈ 159 litres.',
    ],
    notion: 'Unités pétrolières (baril)',
    difficulty: 'facile',
    ficheId: 'fiche-geo-petrole',
    source: 'Concours Génie Pétrolier 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-geo-4',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-hydro',
    examIds: ['concours-mines-petrole', 'concours-agronomie'],
    prompt: 'Quelle caractéristique distingue principalement une nappe souterraine CAPTIVE d’une nappe libre (phréatique) ?',
    options: [
      'La nappe captive est recouverte d’une couche géologique imperméable et se trouve généralement sous pression',
      'La nappe captive ne contient jamais d’eau douce',
      'La nappe libre est toujours située à plus de 5 000 m de profondeur',
      'La nappe captive s’évapore directement au soleil',
    ],
    correctIndex: 0,
    explanation: 'Une nappe captive est confinée sous un toit imperméable (ex. argile) ; sa pression piézométrique peut même faire jaillir l’eau spontanément dans un puits artésien.',
    steps: [
      'Nappe captive = toit imperméable + eau sous pression (artésianisme possible).',
    ],
    notion: 'Aquifères — Nappe libre vs captive',
    difficulty: 'moyen',
    ficheId: 'fiche-geo-hydro',
    source: 'Concours Hydrogéologie & Eau 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-geo-5',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-hydro',
    examIds: ['concours-mines-petrole', 'concours-genie-civil'],
    prompt: 'Quelle loi physique régit l’écoulement de l’eau souterraine à travers un milieu poreux perméable (aquifère) ?',
    options: ['La loi de Boyle-Mariotte', 'La loi de Darcy', 'La loi de Joule', 'La loi de Snell-Descartes'],
    correctIndex: 1,
    explanation: 'La loi de Darcy (Q = K · A · Δh/L) relie le débit d’écoulement dans un aquifère à sa conductivité hydraulique K, sa section A et le gradient hydraulique.',
    steps: [
      'Hydrogéologie / écoulement en milieu poreux → Loi de Darcy (1856).',
    ],
    notion: 'Loi de Darcy (Hydrogéologie)',
    difficulty: 'moyen',
    ficheId: 'fiche-geo-hydro',
    source: 'Annale Géosciences 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== SCIENCES VÉTÉRINAIRES & ÉLEVAGE (5) =====
  {
    id: 'q-vet-1',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zoonoses',
    examIds: ['concours-veterinaire', 'concours-agronomie'],
    prompt: 'Qu’est-ce qu’une zoonose dans l’approche « One Health » (Une Seule Santé) ?',
    options: [
      'Une maladie qui affecte exclusivement les plantes céréalières',
      'Une maladie infectieuse naturellement transmissible entre les animaux vertébrés et l’être humain',
      'Un vaccin réservé aux parcs zoologiques',
      'Une carence en vitamine C chez l’adulte',
    ],
    correctIndex: 1,
    explanation: 'Les zoonoses (rage, brucellose, charbon bactéridien, fièvre de la Vallée du Rift) circulent entre animaux et humains et représentent environ 60 % des maladies infectieuses humaines.',
    steps: [
      'Zoo- (animal) + -nose (maladie) : transmission bidirectionnelle animal ↔ humain.',
    ],
    notion: 'Définition des zoonoses & One Health',
    difficulty: 'facile',
    ficheId: 'fiche-vet-zoonoses',
    source: 'Concours EISMV Dakar / IUSTA 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-vet-2',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zoonoses',
    examIds: ['concours-veterinaire'],
    prompt: 'Quelle mesure de biosécurité est IMPÉRATIVE face à un cadavre de bovin suspect d’être mort du charbon bactéridien (anthrax) ?',
    options: [
      'Ouvrir immédiatement le cadavre pour prélever des organes à main nue',
      'Ne JAMAIS ouvrir le cadavre et alerter les services vétérinaires pour incinération ou enfouissement profond sécurisé',
      'Vendre la viande après simple séchage au soleil',
      'Jeter la carcasse dans le cours d’eau voisin',
    ],
    correctIndex: 1,
    explanation: 'À l’ouverture du cadavre, le contact avec l’oxygène déclenche la sporulation de Bacillus anthracis : les spores contaminent durablement les pâturages pendant des décennies et exposent les humains.',
    steps: [
      'Charbon bactéridien = interdiction absolue d’ouvrir le cadavre (sporulation à l’air).',
    ],
    notion: 'Biosécurité — Charbon bactéridien',
    difficulty: 'moyen',
    ficheId: 'fiche-vet-zoonoses',
    source: 'Concours Sciences Vétérinaires 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-vet-3',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zoonoses',
    examIds: ['concours-veterinaire', 'concours-nutrition'],
    prompt: 'Quelle mesure simple de transformation alimentaire prévient efficacement la transmission à l’homme de la brucellose et de la tuberculose bovine par le lait ?',
    options: [
      'Laisser le lait tiédir 12 heures au soleil',
      'La pasteurisation ou l’ébullition du lait avant consommation',
      'Ajouter de l’eau froide non filtrée',
      'Conserver le lait cru dans un récipient ouvert',
    ],
    correctIndex: 1,
    explanation: 'La pasteurisation (ou l’ébullition) détruit les bactéries pathogènes comme Brucella et Mycobacterium bovis tout en préservant l’essentiel de la valeur nutritive du lait.',
    steps: [
      'Lait cru = vecteur classique de brucellose → pasteurisation/ébullition.',
    ],
    notion: 'Hygiène du lait & Brucellose',
    difficulty: 'facile',
    ficheId: 'fiche-vet-zoonoses',
    source: 'Concours Élevage & Santé 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-vet-4',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zootech',
    examIds: ['concours-veterinaire', 'concours-agronomie'],
    prompt: 'Dans quel compartiment de l’estomac des ruminants la flore microbienne assure-t-elle principalement la fermentation de la cellulose des fourrages ?',
    options: ['Le rumen (panse)', 'La trachée', 'L’œsophage', 'Le pancréas'],
    correctIndex: 0,
    explanation: 'Le rumen (panse) est une vaste cuve de fermentation où bactéries et protozoaires dégradent la cellulose en acides gras volatils assimilables par le ruminant.',
    steps: [
      'Les 4 poches : Rumen (fermentation), Réseau, Feuillet, Caillette (digestion acide).',
    ],
    notion: 'Physiologie digestive des ruminants',
    difficulty: 'facile',
    ficheId: 'fiche-vet-zootech',
    source: 'Concours Zootechnie 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-vet-5',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zootech',
    examIds: ['concours-veterinaire'],
    prompt: 'En élevage avicole, un lot de poulets de chair consomme 400 kg d’aliment pour produire un gain de poids vif total de 200 kg. Quel est son Indice de Consommation (IC) ?',
    options: ['0,5', '1,5', '2,0', '4,0'],
    correctIndex: 2,
    explanation: 'IC = Masse d’aliment consommée / Gain de poids vif = 400 / 200 = 2,0 (très bonne performance technique).',
    steps: [
      'Diviser aliment (400 kg) par gain de poids (200 kg) → IC = 2,0.',
    ],
    notion: 'Calcul de l’Indice de Consommation (IC)',
    difficulty: 'facile',
    ficheId: 'fiche-vet-zootech',
    source: 'Concours Élevage & Productions Animales 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },

  // ===== FINTECH & MICROFINANCE (5) =====
  {
    id: 'q-fin-1',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-mobile',
    examIds: ['certif-fintech-microfinance', 'concours-finances-banque'],
    prompt: 'Dans la réglementation CEMAC / UEMOA du Mobile Money, quelle est la fonction du « compte de cantonnement » ouvert dans une banque ?',
    options: [
      'Financer les campagnes publicitaires de l’opérateur télécom',
      'Garantir à 100 % la contrepartie des fonds de monnaie électronique appartenant aux clients',
      'Distribuer des dividendes aux actionnaires chaque semaine',
      'Supprimer l’obligation d’identifier les clients (KYC)',
    ],
    correctIndex: 1,
    explanation: 'Le compte de cantonnement protège intégralement (100 %) les fonds des utilisateurs de monnaie électronique : ces sommes ne peuvent être ni prêtées ni saisies en cas de difficulté de l’émetteur.',
    steps: [
      'Règle prudentielle BEAC/BCEAO : 1 FCFA de Mobile Money émis = 1 FCFA cantonné en banque.',
    ],
    notion: 'Compte de cantonnement Mobile Money',
    difficulty: 'facile',
    ficheId: 'fiche-fin-mobile',
    source: 'Certification FinTech & COBAC 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-fin-2',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-mobile',
    examIds: ['certif-fintech-microfinance', 'concours-finances-banque'],
    prompt: 'Que permet concrètement l’interopérabilité des paiements mobiles (telle que GIMACPAY en zone CEMAC) ?',
    options: [
      'D’obliger chaque client à posséder 5 cartes SIM différentes',
      'De transférer et payer directement entre comptes Mobile Money d’opérateurs différents et comptes bancaires',
      'De supprimer tout chiffrement réseau',
      'D’interdire les paiements marchands',
    ],
    correctIndex: 1,
    explanation: 'L’interopérabilité connecte les banques et émetteurs de monnaie électronique via un commutateur commun afin qu’un client puisse envoyer ou payer vers n’importe quel autre portefeuille ou compte.',
    steps: [
      'Interopérabilité = fin des silos entre opérateurs mobiles et banques.',
    ],
    notion: 'Interopérabilité GIMAC / FinTech',
    difficulty: 'facile',
    ficheId: 'fiche-fin-mobile',
    source: 'Certification Paiements Digitaux 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-fin-3',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-mobile',
    examIds: ['certif-fintech-microfinance', 'concours-finances-banque'],
    prompt: 'En conformité bancaire et FinTech, que signifie l’acronyme KYC ?',
    options: [
      'Keep Your Cash',
      'Know Your Customer (Connaissance et vérification de l’identité du client)',
      'Key Yield Calculation',
      'Kilobyte Yearly Control',
    ],
    correctIndex: 1,
    explanation: 'KYC (Know Your Customer) désigne les procédures d’identification et de vérification de l’identité des clients indispensables à la lutte contre la fraude et le blanchiment (LBC-FT).',
    steps: [
      'K = Know · Y = Your · C = Customer.',
    ],
    notion: 'Conformité KYC / LBC-FT',
    difficulty: 'facile',
    ficheId: 'fiche-fin-mobile',
    source: 'Certification FinTech & Conformité 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-fin-4',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-micro',
    examIds: ['certif-fintech-microfinance', 'concours-finances-banque'],
    prompt: 'Une institution de microfinance dispose d’un encours total de crédits de 200 millions FCFA. Les crédits présentant un retard supérieur à 30 jours représentent 8 millions FCFA de capital restant dû. Quel est le PAR 30 ?',
    options: ['2 %', '4 %', '8 %', '16 %'],
    correctIndex: 1,
    explanation: 'PAR 30 = (8 000 000 / 200 000 000) × 100 = 0,04 × 100 = 4 % (portefeuille sain car inférieur au repère de 5 %).',
    steps: [
      'Diviser 8 par 200 : 8 / 200 = 0,04.',
      'Multiplier par 100 : 4 % (< 5 %).',
    ],
    notion: 'Calcul et analyse du PAR 30',
    difficulty: 'moyen',
    ficheId: 'fiche-fin-micro',
    source: 'Certification Microfinance 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-fin-5',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-micro',
    examIds: ['certif-fintech-microfinance'],
    prompt: 'Que signifie un ratio d’Autosuffisance Opérationnelle (OSS) supérieur à 100 % pour un établissement de microfinance ?',
    options: [
      'L’institution perd de l’argent sur chaque prêt',
      'Les produits opérationnels couvrent intégralement toutes les charges (fonctionnement, financement, provisions) sans subventions',
      '100 % des clients sont en défaut de paiement',
      'L’institution ne collecte aucune épargne',
    ],
    correctIndex: 1,
    explanation: 'Un OSS > 100 % démontre la viabilité financière autonome de l’institution de microfinance.',
    steps: [
      'OSS = Produits opérationnels / (Charges financières + provisions + charges d’exploitation) > 100 %.',
    ],
    notion: 'Viabilité en microfinance (OSS)',
    difficulty: 'moyen',
    ficheId: 'fiche-fin-micro',
    source: 'Annale Microfinance & Inclusion 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },

  // ===== PSYCHOLOGIE COGNITIVE (5) =====
  {
    id: 'q-psyc-1',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-memoire',
    examIds: ['concours-ens-enseignement', 'concours-paramedical'],
    prompt: 'Quelles deux techniques d’apprentissage issues des sciences cognitives sont démontrées comme les plus efficaces pour contrer la courbe de l’oubli d’Ebbinghaus ?',
    options: [
      'Surligner tout le manuel et relire passivement la veille au soir',
      'Le rappel actif (se tester) combiné à la répétition espacée',
      'Écouter trois vidéos différentes en même temps sans dormir',
      'Recopier mécaniquement le cours sans jamais se poser de questions',
    ],
    correctIndex: 1,
    explanation: 'Le rappel actif (forcer son cerveau à retrouver l’information) couplé à la répétition espacée (revoir juste avant l’oubli, comme SM-2) maximise la consolidation à long terme.',
    steps: [
      'Relecture passive = illusion de maîtrise ; Rappel actif + espacement = consolidation durable.',
    ],
    notion: 'Courbe d’Ebbinghaus & Rappel actif',
    difficulty: 'facile',
    ficheId: 'fiche-psy-memoire',
    source: 'Concours ENS / Sciences de l’Éducation 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-psyc-2',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-memoire',
    examIds: ['concours-ens-enseignement', 'certif-supply-rh'],
    prompt: 'Dans la pyramide des besoins d’Abraham Maslow, quel niveau se situe tout au SOMMET (niveau 5) ?',
    options: [
      'Les besoins physiologiques',
      'Le besoin de sécurité',
      'Le besoin d’appartenance',
      'Le besoin d’accomplissement de soi',
    ],
    correctIndex: 3,
    explanation: 'La pyramide de Maslow s’élève des besoins physiologiques (1), sécurité (2), appartenance (3), estime (4) jusqu’à l’accomplissement de soi (5).',
    steps: [
      'Base = Physiologiques ; Sommet = Accomplissement de soi.',
    ],
    notion: 'Pyramide de Maslow',
    difficulty: 'facile',
    ficheId: 'fiche-psy-memoire',
    source: 'Concours Psychopédagogie / RH 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-psyc-3',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-biais',
    examIds: ['concours-ens-enseignement', 'certif-supply-rh'],
    prompt: 'Un recruteur se fait une première impression positive d’un candidat dès les 10 premières secondes puis ne prête attention qu’aux réponses qui confirment cette impression initiale. Quel biais cognitif agit ici ?',
    options: [
      'Le biais de confirmation',
      'La mémoire procédurale',
      'L’effet placebo pur',
      'La synesthésie',
    ],
    correctIndex: 0,
    explanation: 'Le biais de confirmation pousse à sélectionner et interpréter les informations ultérieures de manière à valider son hypothèse de départ.',
    steps: [
      'Chercher uniquement ce qui valide une opinion préalable = biais de confirmation.',
    ],
    notion: 'Biais de confirmation',
    difficulty: 'facile',
    ficheId: 'fiche-psy-biais',
    source: 'Certification Psychologie & Recrutement 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-psyc-4',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-biais',
    examIds: ['concours-ens-enseignement', 'concours-paramedical'],
    prompt: 'Que décrit l’effet Dunning-Kruger en psychologie cognitive ?',
    options: [
      'Le fait d’oublier un numéro de téléphone après 10 secondes',
      'La tendance des personnes les moins qualifiées dans un domaine à surestimer leurs propres compétences',
      'L’amélioration automatique du QI grâce au café',
      'La peur irrationnelle des hauteurs',
    ],
    correctIndex: 1,
    explanation: 'L’effet Dunning-Kruger montre qu’un manque de maîtrise empêche souvent d’identifier ses propres lacunes, générant un excès de confiance que seuls des tests objectifs corrigent.',
    steps: [
      'Faible maîtrise → difficulté à évaluer sa propre erreur → surestimation (Dunning-Kruger).',
    ],
    notion: 'Effet Dunning-Kruger',
    difficulty: 'moyen',
    ficheId: 'fiche-psy-biais',
    source: 'Concours ENS / Psychologie 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-psyc-5',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-biais',
    examIds: ['concours-paramedical', 'certif-supply-rh'],
    prompt: 'Parmi ces 4 dimensions, laquelle fait partie intégrante de l’intelligence émotionnelle selon Daniel Goleman ?',
    options: [
      'La vitesse de frappe au clavier',
      'L’empathie et la maîtrise de soi face aux émotions',
      'La mémorisation par cœur des départements',
      'La force musculaire',
    ],
    correctIndex: 1,
    explanation: 'Daniel Goleman définit 4 composantes majeures : conscience de soi, maîtrise de soi, conscience sociale (empathie) et gestion des relations.',
    steps: [
      'Intelligence émotionnelle = comprendre et réguler ses émotions + empathie relationnelle.',
    ],
    notion: 'Intelligence émotionnelle (Goleman)',
    difficulty: 'facile',
    ficheId: 'fiche-psy-biais',
    source: 'Annale Management & Soins 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },

  // ===== ÉTHIQUE & MARCHÉS PUBLICS (5) =====
  {
    id: 'q-eth-1',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-marches',
    examIds: ['concours-admin', 'concours-magistrature', 'concours-finances-banque'],
    prompt: 'Quels sont les trois principes cardinaux qui régissent toute procédure de passation de marchés publics ?',
    options: [
      'Rapidité, secret absolu et préférence familiale',
      'Liberté d’accès, égalité de traitement des candidats et transparence des procédures',
      'Gratuité, tirage au sort et absence de contrat écrit',
      'Monopole permanent, entente directe et prix libre',
    ],
    correctIndex: 1,
    explanation: 'Tout code des marchés publics moderne repose sur le triptyque : liberté d’accès à la commande publique, égalité de traitement des candidats et transparence des procédures.',
    steps: [
      'Vérifier les 3 piliers : Liberté d’accès + Égalité de traitement + Transparence.',
    ],
    notion: 'Principes des marchés publics',
    difficulty: 'facile',
    ficheId: 'fiche-eth-marches',
    source: 'Concours ENAM — Marchés Publics 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-eth-2',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-marches',
    examIds: ['concours-admin', 'concours-magistrature', 'concours-finances-banque'],
    prompt: 'Un fonctionnaire siégeant en commission d’attribution d’un marché public découvre que l’entreprise dirigée par son beau-frère a déposé une offre. Quelle conduite déontologique doit-il adopter ?',
    options: [
      'Rester silencieux et voter discrètement en sa faveur',
      'Déclarer immédiatement le conflit d’intérêts et se déporter (s’abstenir de siéger et de décider)',
      'Éliminer toutes les autres entreprises sans motif',
      'Demander une commission financière pour compenser',
    ],
    correctIndex: 1,
    explanation: 'La prévention des conflits d’intérêts impose la déclaration immédiate et le déport complet afin de garantir l’impartialité objective et apparente de la décision publique.',
    steps: [
      'Lien familial avec un soumissionnaire = conflit d’intérêts → déclaration + déport obligatoire.',
    ],
    notion: 'Conflit d’intérêts & Déport',
    difficulty: 'facile',
    ficheId: 'fiche-eth-marches',
    source: 'Concours Fonction Publique & Magistrature 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-eth-3',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-marches',
    examIds: ['concours-admin', 'concours-finances-banque'],
    prompt: 'Quelle procédure constitue la règle de droit commun pour attribuer un marché public dépassant le seuil réglementaire ?',
    options: [
      'L’entente directe (gré à gré) sans justification',
      'L’appel d’offres ouvert avec publicité et mise en concurrence préalable',
      'L’accord verbal téléphonique',
      'La reconduction tacite illimitée',
    ],
    correctIndex: 1,
    explanation: 'L’appel d’offres ouvert garantit la concurrence la plus large et l’utilisation optimale des deniers publics ; le gré à gré reste strictement encadré et exceptionnel.',
    steps: [
      'Règle générale = appel d’offres ouvert ; Exception = gré à gré motivé.',
    ],
    notion: 'Appel d’offres ouvert vs gré à gré',
    difficulty: 'facile',
    ficheId: 'fiche-eth-marches',
    source: 'Annale Commande Publique 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-eth-4',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-rse',
    examIds: ['certif-fintech-microfinance', 'certif-entrepreneuriat', 'concours-diplomatie'],
    prompt: 'Que recouvre la lettre « G » dans les critères d’évaluation extra-financière ESG ?',
    options: ['Géographie', 'Gouvernance (transparence, éthique, indépendance et anti-corruption)', 'Gratuité', 'Garantie bancaire'],
    correctIndex: 1,
    explanation: 'ESG signifie Environnement (E), Social (S) et Gouvernance (G : intégrité des dirigeants, transparence financière, lutte anti-corruption).',
    steps: [
      'E = Environnement · S = Social · G = Gouvernance.',
    ],
    notion: 'Critères ESG & RSE',
    difficulty: 'facile',
    ficheId: 'fiche-eth-rse',
    source: 'Certification Gouvernance & RSE 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-eth-5',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-rse',
    examIds: ['concours-admin', 'concours-diplomatie', 'certif-fintech-microfinance'],
    prompt: 'Quelle norme internationale publiée en 2010 fournit des lignes directrices volontaires sur la Responsabilité Sociétale des Organisations (RSE) ?',
    options: ['ISO 9001', 'ISO 26000', 'TCP/IP', 'IEEE 802.11'],
    correctIndex: 1,
    explanation: 'ISO 26000 est le référentiel international de lignes directrices dédié à la RSE (gouvernance, droits de l’homme, loyauté des pratiques, environnement, communautés).',
    steps: [
      'ISO 9001 = Qualité ; ISO 14001 = Environnement ; ISO 26000 = RSE.',
    ],
    notion: 'Norme RSE ISO 26000',
    difficulty: 'moyen',
    ficheId: 'fiche-eth-rse',
    source: 'Concours Gouvernance & Audit 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },
];

export const SUMMIT_ANNALES: Annale[] = [
  // Aéronautique & ASECNA
  {
    id: 'ann-aero-eamac-2025',
    title: 'Concours ASECNA / EAMAC (Niamey) 2025 — Mécanique du Vol, OACI & Météorologie',
    examId: 'concours-aeronautique',
    subjectId: 'aeronautique_meteo',
    chapterIds: ['ch-aero-vol', 'ch-aero-meteo'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-aero-1', 'q-aero-2', 'q-aero-3', 'q-aero-4', 'q-aero-5'],
    examType: 'Épreuve Aéronautique & Météo',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'Espace ASECNA (Tchad / Afrique)',
    instructions: 'Maîtrisez les conversions kt/km/h et le gradient ISA −6,5 °C/km sans calculatrice.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-aero-mix-2026',
    title: 'Concours Contrôle Aérien ASECNA 2026 — Vol, Réseaux, Maths & Anglais',
    examId: 'concours-aeronautique',
    subjectId: 'aeronautique_meteo',
    chapterIds: ['ch-aero-vol', 'ch-aero-meteo'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 45,
    questionIds: ['q-aero-2', 'q-aero-4', 'q-net-1', 'q-m-1', 'q-en-1'],
    examType: 'Épreuve pluridisciplinaire Contrôleur Aérien',
    language: 'Français / Anglais',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 170,
    shareable: true,
    countryOrZone: 'ASECNA / EAMAC / ENAC',
    instructions: 'Session 2026 combinant navigation, télécoms, maths et anglais.',
    bareme: '20 points',
  },
  // Mines & Pétrole
  {
    id: 'ann-geo-pet-2025',
    title: 'Concours Mines & Pétrole (ENSPM) 2025 — Pièges Pétroliers & Hydrogéologie',
    examId: 'concours-mines-petrole',
    subjectId: 'geologie_mines',
    chapterIds: ['ch-geo-petrole', 'ch-geo-hydro'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-geo-1', 'q-geo-2', 'q-geo-3', 'q-geo-4', 'q-geo-5'],
    examType: 'Épreuve Géosciences & Ressources',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'Tchad / CEMAC / Afrique',
    instructions: 'Reliez les propriétés physiques des roches (porosité, perméabilité, densité) aux gisements.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-geo-env-2026',
    title: 'Concours Hydrogéologie & Énergie 2026 — Aquifères, Solaire & Chimie',
    examId: 'concours-mines-petrole',
    subjectId: 'geologie_mines',
    chapterIds: ['ch-geo-petrole', 'ch-geo-hydro'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-geo-1', 'q-geo-4', 'q-geo-5', 'q-enr-1', 'q-agro-5'],
    examType: 'Étude de cas Ressources Eau & Énergie',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'Bassin du Lac Tchad / Sahel',
    instructions: 'Analyse intégrée : forage en nappe captive + pompage solaire PV + irrigation.',
    bareme: '20 points',
  },
  // Sciences Vétérinaires & Élevage
  {
    id: 'ann-vet-eismv-2025',
    title: 'Concours Vétérinaire (EISMV Dakar / IUSTA) 2025 — Zoonoses One Health & Zootechnie',
    examId: 'concours-veterinaire',
    subjectId: 'veterinaire_elevage',
    chapterIds: ['ch-vet-zoonoses', 'ch-vet-zootech'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-vet-1', 'q-vet-2', 'q-vet-3', 'q-vet-4', 'q-vet-5'],
    examType: 'Épreuve Santé Animale & Zootechnie',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'EISMV Dakar / Tchad / Sahel',
    instructions: 'Respect strict des règles de biosécurité face aux zoonoses majeures.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-vet-onehealth-2026',
    title: 'Concours One Health & Élevage 2026 — Zoonoses, Pharmacologie & Sécurité Alimentaire',
    examId: 'concours-veterinaire',
    subjectId: 'veterinaire_elevage',
    chapterIds: ['ch-vet-zoonoses', 'ch-vet-zootech'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-vet-1', 'q-vet-2', 'q-vet-5', 'q-pharm-5', 'q-nut-4'],
    examType: 'Épreuve intégrée One Health',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'OMSA / FAO / OMS',
    instructions: 'Lien direct entre santé animale, antibiorésistance et hygiène HACCP.',
    bareme: '20 points',
  },
  // FinTech & Microfinance
  {
    id: 'ann-fintech-2025',
    title: 'Certification FinTech & Microfinance (COBAC / UEMOA) 2025 — Mobile Money, KYC & PAR 30',
    examId: 'certif-fintech-microfinance',
    subjectId: 'fintech_microfinance',
    chapterIds: ['ch-fin-mobile', 'ch-fin-micro'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-fin-1', 'q-fin-2', 'q-fin-3', 'q-fin-4', 'q-fin-5'],
    examType: 'Examen de certification FinTech',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 160,
    isPremium: true,
    shareable: true,
    countryOrZone: 'Zone CEMAC / UEMOA',
    instructions: 'Score minimum de certification : 75 %.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-fintech-secu-2026',
    title: 'Certification Banque Digitale 2026 — Mobile Money, Cybersécurité, OHADA & ESG',
    examId: 'certif-fintech-microfinance',
    subjectId: 'fintech_microfinance',
    chapterIds: ['ch-fin-mobile', 'ch-fin-micro'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-fin-1', 'q-fin-4', 'q-cy-1', 'q-ohada-1', 'q-eth-4'],
    examType: 'Étude de cas Direction Conformité',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 165,
    isPremium: true,
    shareable: true,
    countryOrZone: 'Afrique francophone',
    instructions: 'Conformité réglementaire, protection des fonds clients et gouvernance ESG.',
    bareme: '20 points',
  },
  // Psychologie Cognitive & Enseignement
  {
    id: 'ann-ens-psyc-2025',
    title: 'Concours ENS / CAFOP 2025 — Psychologie Cognitive, Mémoire, Maslow & Biais',
    examId: 'concours-ens-enseignement',
    subjectId: 'psychologie_cog',
    chapterIds: ['ch-psy-memoire', 'ch-psy-biais'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 30,
    questionIds: ['q-psyc-1', 'q-psyc-2', 'q-psyc-3', 'q-psyc-4', 'q-psyc-5'],
    examType: 'Épreuve Psychopédagogie',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 145,
    shareable: true,
    countryOrZone: 'ENS / ENI francophones',
    instructions: 'Reliez chaque concept cognitif à une pratique concrète de classe.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-rh-psyc-2026',
    title: 'Certification RH & Leadership 2026 — Biais en Recrutement, Maslow & Droit Social',
    examId: 'certif-supply-rh',
    subjectId: 'psychologie_cog',
    chapterIds: ['ch-psy-memoire', 'ch-psy-biais'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-psyc-2', 'q-psyc-3', 'q-psyc-5', 'q-grh-1', 'q-grh-5'],
    examType: 'Épreuve Management des Talents',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 150,
    isPremium: true,
    shareable: true,
    countryOrZone: 'International',
    instructions: 'Recrutement objectif sans biais cognitifs et motivation durable.',
    bareme: '20 points',
  },
  // Éthique, Gouvernance & Marchés Publics
  {
    id: 'ann-enam-eth-2025',
    title: 'Concours ENAM 2025 — Marchés Publics, Conflits d’Intérêts & Gouvernance',
    examId: 'concours-admin',
    subjectId: 'ethique_gouvernance',
    chapterIds: ['ch-eth-marches', 'ch-eth-rse'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-eth-1', 'q-eth-2', 'q-eth-3', 'q-eth-4', 'q-eth-5'],
    examType: 'Épreuve Déontologie & Commande Publique',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 150,
    shareable: true,
    countryOrZone: 'Tchad / ENA / ENAM',
    instructions: 'Appliquez les 3 principes des marchés publics et le réflexe de déport.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-fin-marches-2026',
    title: 'Concours Finances, Impôts & Trésor 2026 — Marchés Publics, ELOP & TVA',
    examId: 'concours-finances-banque',
    subjectId: 'ethique_gouvernance',
    chapterIds: ['ch-eth-marches', 'ch-eth-rse'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-eth-1', 'q-eth-2', 'q-eth-3', 'q-fp-1', 'q-fp-3'],
    examType: 'Épreuve Contrôle Financier & Audit',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'CEMAC / UEMOA',
    instructions: 'Régularité de la commande publique et de l’exécution budgétaire.',
    bareme: '20 points',
  },
  // Sujets transversaux 2026 supplémentaires
  {
    id: 'ann-mag-eth-2026',
    title: 'Concours Magistrature 2026 — Déontologie, Anti-Corruption & Droit OHADA',
    examId: 'concours-magistrature',
    subjectId: 'ethique_gouvernance',
    chapterIds: ['ch-eth-marches', 'ch-eth-rse'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-eth-1', 'q-eth-2', 'q-eth-5', 'q-ohada-1', 'q-red-2'],
    examType: 'Épreuve Éthique Judiciaire',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'ENM / Espace OHADA',
    instructions: 'Impartialité, déport et force probante des actes officiels.',
    bareme: '20 points',
  },
  {
    id: 'ann-agro-vet-2026',
    title: 'Concours Agro-Sylvo-Pastoral 2026 — Élevage Sahélien, Sols & Hydrogéologie',
    examId: 'concours-agronomie',
    subjectId: 'veterinaire_elevage',
    chapterIds: ['ch-vet-zoonoses', 'ch-vet-zootech'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 40,
    questionIds: ['q-vet-4', 'q-vet-5', 'q-agro-1', 'q-agro-4', 'q-geo-4'],
    examType: 'Épreuve Développement Rural Intégré',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'Sahel / Afrique Centrale',
    instructions: 'Articulation agriculture-élevage et gestion durable des points d’eau pastoraux.',
    bareme: '20 points',
  },
];

export const SUMMIT_FLASHCARDS: Flashcard[] = [
  // Aéronautique & Météo (3)
  {
    id: 'fc-aero-1',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-vol',
    question: 'Quelles sont les valeurs de conversion OACI de 1 NM, 1 kt et 1 ft ?',
    answer: '1 NM = 1 852 m · 1 kt = 1,852 km/h · 1 ft = 0,3048 m.',
    formula: '1 NM = 1 852 m | 1 kt = 1,852 km/h',
  },
  {
    id: 'fc-aero-2',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-meteo',
    question: 'Quelle différence entre les calages altimétriques QNH, QFE et 1013,25 hPa ?',
    answer: 'QNH donne l’altitude (mer), QFE donne la hauteur au-dessus de la piste (0 au sol) et 1013,25 hPa sert aux niveaux de vol (FL).',
  },
  {
    id: 'fc-aero-3',
    subjectId: 'aeronautique_meteo',
    chapterId: 'ch-aero-meteo',
    question: 'Quelles sont les valeurs de référence ISA au niveau de la mer et le gradient thermique troposphérique ?',
    answer: 'T₀ = +15 °C, P₀ = 1013,25 hPa, et décroissance de −6,5 °C par 1 000 m.',
  },
  // Géologie & Mines (3)
  {
    id: 'fc-geo-1',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-petrole',
    question: 'Quels sont les 3 types de roches nécessaires à un système pétrolier complet ?',
    answer: '1) Roche mère (source organique), 2) Roche réservoir (poreuse et perméable), 3) Roche couverture (imperméable, ex. argile/sel).',
  },
  {
    id: 'fc-geo-2',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-petrole',
    question: 'Dans quel ordre (de haut en bas) se disposent l’eau, le gaz et le pétrole dans un piège anticlinal ?',
    answer: 'Gaz en haut, Pétrole au milieu, Eau en bas (par densité croissante).',
  },
  {
    id: 'fc-geo-3',
    subjectId: 'geologie_mines',
    chapterId: 'ch-geo-hydro',
    question: 'Quelle formule exprime la loi de Darcy en hydrogéologie ?',
    answer: 'Q = K · A · (Δh / L), reliant débit souterrain, conductivité hydraulique et gradient hydraulique.',
    formula: 'Q = K · A · (Δh / L)',
  },
  // Vétérinaire & Élevage (3)
  {
    id: 'fc-vet-1',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zoonoses',
    question: 'Quels sont les trois piliers de l’approche « One Health » (Une Seule Santé) ?',
    answer: 'La santé humaine, la santé animale et la santé des écosystèmes/environnement.',
  },
  {
    id: 'fc-vet-2',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zootech',
    question: 'Quels sont dans l’ordre les 4 compartiments gastriques d’un ruminant ?',
    answer: 'Rumen (panse) → Réseau (bonnet) → Feuillet → Caillette (estomac vrai).',
  },
  {
    id: 'fc-vet-3',
    subjectId: 'veterinaire_elevage',
    chapterId: 'ch-vet-zootech',
    question: 'Comment interprète-t-on l’Indice de Consommation (IC) en élevage ?',
    answer: 'IC = Aliment consommé (kg) / Gain de poids vif (kg) : plus l’IC est BAS, plus l’élevage est efficace et rentable.',
    formula: 'IC = Aliment / Gain de poids',
  },
  // FinTech & Microfinance (3)
  {
    id: 'fc-fin-1',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-mobile',
    question: 'À quoi sert le compte de cantonnement dans les services de Mobile Money ?',
    answer: 'Il garantit à 100 % la contrepartie bancaire de toute la monnaie électronique en circulation, protégée pour les clients.',
  },
  {
    id: 'fc-fin-2',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-micro',
    question: 'Que mesure le PAR 30 en microfinance et quel seuil indique un portefeuille sain ?',
    answer: 'La part du capital restant dû des prêts ayant plus de 30 jours de retard rapportée à l’encours total ; seuil sain : PAR 30 < 5 %.',
  },
  {
    id: 'fc-fin-3',
    subjectId: 'fintech_microfinance',
    chapterId: 'ch-fin-mobile',
    question: 'Que signifient les sigles KYC et LBC-FT en finance digitale ?',
    answer: 'KYC = Know Your Customer (vérification identité client) ; LBC-FT = Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme.',
  },
  // Psychologie Cognitive (3)
  {
    id: 'fc-psyc-1',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-memoire',
    question: 'Quels sont les 5 niveaux de la pyramide de Maslow de la base au sommet ?',
    answer: '1) Physiologiques, 2) Sécurité, 3) Appartenance, 4) Estime, 5) Accomplissement de soi.',
  },
  {
    id: 'fc-psyc-2',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-biais',
    question: 'Quelle différence entre le biais de confirmation et l’effet d’ancrage ?',
    answer: 'Confirmation = privilégier les preuves qui valident notre opinion initiale ; Ancrage = rester excessivement influencé par le premier chiffre ou repère reçu.',
  },
  {
    id: 'fc-psyc-3',
    subjectId: 'psychologie_cog',
    chapterId: 'ch-psy-memoire',
    question: 'Pourquoi le rappel actif surpasse-t-il largement la relecture passive ?',
    answer: 'L’effort de récupération en mémoire renforce directement les connexions neuronales et révèle immédiatement les lacunes réelles.',
  },
  // Éthique & Marchés Publics (3)
  {
    id: 'fc-eth-1',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-marches',
    question: 'Quels sont les 3 grands principes de la commande publique (marchés publics) ?',
    answer: 'Liberté d’accès, égalité de traitement des candidats et transparence des procédures.',
  },
  {
    id: 'fc-eth-2',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-marches',
    question: 'Quelle est la conduite obligatoire d’un agent public confronté à un conflit d’intérêts ?',
    answer: 'Déclarer immédiatement le lien concerné à sa hiérarchie et se déporter (s’abstenir de participer à la décision).',
  },
  {
    id: 'fc-eth-3',
    subjectId: 'ethique_gouvernance',
    chapterId: 'ch-eth-rse',
    question: 'Que recouvrent les 3 lettres ESG et quelle norme internationale encadre la RSE ?',
    answer: 'ESG = Environnement, Social, Gouvernance ; la norme RSE de référence est ISO 26000.',
  },
];
