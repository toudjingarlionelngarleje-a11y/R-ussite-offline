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

export const HORIZON_EXAMS: ExamTrack[] = [
  {
    id: 'concours-urbanisme-sig',
    name: 'Concours Urbanisme, Topographie & SIG',
    shortName: 'Urbanisme / SIG',
    category: 'Concours Technique',
    level: 'Bac / BTS / Licence Géomatique & Aménagement',
    description:
      'Cartographie, échelles, géodésie WGS84/UTM, couches raster/vecteur QGIS, cadastre, plan directeur d’urbanisme et aménagement durable.',
    badgeColor: '#0D9488',
    subjectIds: [
      'urbanisme_sig',
      'maths',
      'genie_civil_btp',
      'informatique',
      'agronomie_env',
      'gestion_projet',
    ],
  },
  {
    id: 'concours-sante-maternelle',
    name: 'Concours Sages-Femmes & Santé Maternelle (INFAS / ENASS)',
    shortName: 'Sages-Femmes / SMI',
    category: 'Concours Santé',
    level: 'Bac S/D / Licence Sciences de la Santé',
    description:
      'Suivi prénatal CPN, obstétrique de base, score d’Apgar, prévention du paludisme/anémie, calendrier vaccinal PEV et pédiatrie préventive.',
    badgeColor: '#E11D48',
    subjectIds: [
      'obstetrique_pediatrie',
      'anatomie_physio',
      'sante_publique',
      'nutrition_sante',
      'pharmacologie',
      'chimie_organique',
    ],
  },
  {
    id: 'concours-transit-maritime',
    name: 'Concours Transit, Douane Internationale & Transport Maritime',
    shortName: 'Transit / Maritime',
    category: 'Concours Commerce & Douane',
    level: 'Bac / BTS / Licence Logistique & Commerce International',
    description:
      'Incoterms 2020 (EXW, FOB, CIF, DDP), connaissement maritime Bill of Lading, valeur en douane OMC, crédit documentaire et corridors portuaires.',
    badgeColor: '#1D4ED8',
    subjectIds: [
      'commerce_maritime',
      'logistique_ci',
      'droit_ohada',
      'economie',
      'anglais',
      'comptabilite',
    ],
  },
  {
    id: 'certif-droit-numerique',
    name: 'Certification Droit Numérique, Données Personnelles & IA Responsable',
    shortName: 'Droit Numérique / RGPD',
    category: 'Certification Pro',
    level: 'Licence / Master / Cadres IT, Juristes & DPO',
    description:
      'Protection des données (RGPD, Convention de Malabo), bases légales, droits des citoyens, cybersécurité juridique, signature électronique et gouvernance IA.',
    badgeColor: '#4F46E5',
    subjectIds: [
      'droit_numerique',
      'cybersecurite',
      'droit',
      'data_ia',
      'ethique_gouvernance',
      'gestion_crises',
    ],
  },
];

export const HORIZON_SUBJECTS: Subject[] = [
  {
    id: 'urbanisme_sig',
    name: 'Urbanisme, Topographie & SIG',
    shortName: 'Urbanisme / SIG',
    icon: 'Map',
    color: '#0D9488',
    examIds: ['concours-urbanisme-sig', 'concours-genie-civil', 'concours-mines-petrole'],
    description:
      'Échelles cartographiques, courbes de niveau, géodésie WGS84/UTM, couches raster/vecteur, cadastre et aménagement urbain résilient.',
    sizeKb: 490,
  },
  {
    id: 'obstetrique_pediatrie',
    name: 'Santé Maternelle, Obstétrique & Pédiatrie',
    shortName: 'Obstétrique / SMI',
    icon: 'HeartHandshake',
    color: '#E11D48',
    examIds: [
      'concours-sante-maternelle',
      'concours-medecine',
      'concours-paramedical',
      'concours-nutrition',
    ],
    description:
      'Consultations prénatales (CPN), dépistage des signes de danger, score d’Apgar, allaitement exclusif et Programme Élargi de Vaccination (PEV).',
    sizeKb: 480,
  },
  {
    id: 'commerce_maritime',
    name: 'Commerce International, Transit & Incoterms',
    shortName: 'Transit / Maritime',
    icon: 'Ship',
    color: '#1D4ED8',
    examIds: [
      'concours-transit-maritime',
      'concours-police-douanes',
      'certif-supply-rh',
      'concours-finances-banque',
    ],
    description:
      'Incoterms 2020 maritimes et multimodaux, connaissement B/L, crédit documentaire (Credoc), conteneurisation EVP et valeur en douane.',
    sizeKb: 470,
  },
  {
    id: 'droit_numerique',
    name: 'Droit du Numérique & Protection des Données',
    shortName: 'Droit Numérique',
    icon: 'FileLock2',
    color: '#4F46E5',
    examIds: [
      'certif-droit-numerique',
      'concours-magistrature',
      'certif-data-ia',
      'certif-fintech-microfinance',
    ],
    description:
      'Principes RGPD et Convention de Malabo, licéité, minimisation, rôle du DPO, violation de données (72 h) et régulation de l’IA.',
    sizeKb: 460,
  },
  {
    id: 'chimie_organique',
    name: 'Chimie Organique & Biochimie Appliquée',
    shortName: 'Chimie Orga / Bio',
    icon: 'FlaskConical',
    color: '#7C3AED',
    examIds: [
      'bac-scientifique',
      'concours-medecine',
      'concours-sante-maternelle',
      'concours-veterinaire',
      'concours-agronomie',
    ],
    description:
      'Groupes fonctionnels (alcools, aldéhydes, acides, esters, amines), estérification/saponification, pH et biomolécules (glucides, lipides, protéines).',
    sizeKb: 500,
  },
  {
    id: 'gestion_crises',
    name: 'Gestion de Crise, Humanitaire & Sécurité Civile',
    shortName: 'Crises / Humanitaire',
    icon: 'LifeBuoy',
    color: '#EA580C',
    examIds: [
      'certif-droit-numerique',
      'concours-admin',
      'concours-diplomatie',
      'concours-police-douanes',
      'concours-urbanisme-sig',
    ],
    description:
      'Cycle de gestion des catastrophes (Sendai), principes humanitaires (humanité, neutralité, impartialité), normes Sphère WASH et triage d’urgence.',
    sizeKb: 450,
  },
];

export const HORIZON_CHAPTERS: Chapter[] = [
  {
    id: 'ch-sig-carto',
    subjectId: 'urbanisme_sig',
    title: 'Cartographie, échelles, géodésie WGS84 & couches SIG',
    order: 1,
    summary:
      'Calcul de distances à l’échelle, courbes de niveau, projection UTM et distinction données vecteur vs raster.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-sig-carto',
    ficheId: 'fiche-sig-carto',
  },
  {
    id: 'ch-sig-urba',
    subjectId: 'urbanisme_sig',
    title: 'Planification urbaine, cadastre & ville résiliente',
    order: 2,
    summary:
      'Zonage urbain, Coefficient d’Emprise au Sol (CES), assainissement pluvial, foncier et prévention des inondations.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-sig-urba',
    ficheId: 'fiche-sig-urba',
  },
  {
    id: 'ch-obs-cpn',
    subjectId: 'obstetrique_pediatrie',
    title: 'Suivi prénatal (CPN), dépistage & grossesse à risque',
    order: 1,
    summary:
      'Recommandations OMS des consultations prénatales, supplémentation fer-folates, TPI paludisme et signes d’alerte obstétricaux.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-obs-cpn',
    ficheId: 'fiche-obs-cpn',
  },
  {
    id: 'ch-obs-neonat',
    subjectId: 'obstetrique_pediatrie',
    title: 'Accueil du nouveau-né (Apgar), allaitement & calendrier PEV',
    order: 2,
    summary:
      'Évaluation immédiate par le score d’Apgar, prévention de l’hypothermie, allaitement exclusif 6 mois et vaccins BCG/Polio/Penta/Rougeole.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-obs-neonat',
    ficheId: 'fiche-obs-neonat',
  },
  {
    id: 'ch-mar-incoterms',
    subjectId: 'commerce_maritime',
    title: 'Incoterms 2020 & partage des risques et frais',
    order: 1,
    summary:
      'Règles multimodales (EXW, FCA, CPT, CIP, DAP, DPU, DDP) et règles maritimes exclusives (FAS, FOB, CFR, CIF).',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-mar-incoterms',
    ficheId: 'fiche-mar-incoterms',
  },
  {
    id: 'ch-mar-douane',
    subjectId: 'commerce_maritime',
    title: 'Connaissement maritime (B/L), Credoc & dédouanement',
    order: 2,
    summary:
      'Trois fonctions juridiques du Bill of Lading, crédit documentaire irrévocable, conteneurs 20’/40’ (EVP) et valeur en douane CIF.',
    estimatedMinutes: 35,
    difficulty: 'difficile',
    courseId: 'course-mar-douane',
    ficheId: 'fiche-mar-douane',
  },
  {
    id: 'ch-dnum-rgpd',
    subjectId: 'droit_numerique',
    title: 'Protection des données personnelles : RGPD & Malabo',
    order: 1,
    summary:
      '6 bases légales, minimisation, limitation de conservation, droits d’accès/effacement et notification de faille sous 72 h.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-dnum-rgpd',
    ficheId: 'fiche-dnum-rgpd',
  },
  {
    id: 'ch-dnum-ia',
    subjectId: 'droit_numerique',
    title: 'Preuve électronique, propriété intellectuelle & gouvernance IA',
    order: 2,
    summary:
      'Signature électronique qualifiée, droit d’auteur logiciel, approche par les risques de l’IA et responsabilité des plateformes.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-dnum-ia',
    ficheId: 'fiche-dnum-ia',
  },
  {
    id: 'ch-chim-fonctions',
    subjectId: 'chimie_organique',
    title: 'Groupes fonctionnels, estérification & saponification',
    order: 1,
    summary:
      'Reconnaître alcools, aldéhydes, cétones, acides carboxyliques, esters et amines ; maîtriser estérification équilibrée vs saponification totale.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-chim-fonctions',
    ficheId: 'fiche-chim-fonctions',
  },
  {
    id: 'ch-chim-bio',
    subjectId: 'chimie_organique',
    title: 'Biochimie structurale : glucides, lipides, protéines & enzymes',
    order: 2,
    summary:
      'Liaison peptidique, acides aminés essentiels, spécificité enzymatique (site actif) et rôle énergétique de l’ATP.',
    estimatedMinutes: 35,
    difficulty: 'difficile',
    courseId: 'course-chim-bio',
    ficheId: 'fiche-chim-bio',
  },
  {
    id: 'ch-cris-cycle',
    subjectId: 'gestion_crises',
    title: 'Cycle de gestion des catastrophes & alerte précoce',
    order: 1,
    summary:
      'Équation du risque (Aléa × Vulnérabilité / Capacités), 4 phases de Sendai, plans ORSEC et systèmes d’alerte précoce communautaires.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-cris-cycle',
    ficheId: 'fiche-cris-cycle',
  },
  {
    id: 'ch-cris-sphere',
    subjectId: 'gestion_crises',
    title: 'Principes humanitaires, normes Sphère & triage d’urgence',
    order: 2,
    summary:
      '4 principes humanitaires fondamentaux, standard minimal d’eau potable (15 L/pers/j), coordination Cluster ONU et triage START.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-cris-sphere',
    ficheId: 'fiche-cris-sphere',
  },
];

export const HORIZON_COURSES: Course[] = [
  {
    id: 'course-sig-carto',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-carto',
    title: 'Cartographie, échelles, géodésie WGS84 & couches SIG',
    durationMinutes: 35,
    sizeKb: 152,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-sig-1',
        heading: '1. Échelles cartographiques et topographie',
        content:
          'L’échelle E = d / D relie une distance mesurée sur la carte (d) à la distance réelle au sol (D), exprimées dans la même unité. Au 1/50 000, 1 cm sur la carte représente 50 000 cm = 500 m. Plus le dénominateur est petit (ex. 1/2 000), plus la carte est dite à grande échelle (très détaillée). Les courbes de niveau relient les points d’égale altitude : lorsqu’elles sont rapprochées, la pente est forte ; lorsqu’elles sont espacées, le terrain est doux.',
        keyTakeaway:
          '1/25 000 est une plus grande échelle que 1/100 000 ; des courbes de niveau serrées traduisent une pente raide.',
        formula: 'D_réelle = d_carte × Dénominateur  |  Pente (%) = (ΔH / D_horizontale) × 100',
      },
      {
        id: 'sec-sig-2',
        heading: '2. Données Vecteur vs Raster et référentiels (WGS84 / UTM)',
        content:
          'Un Système d’Information Géographique (SIG, comme QGIS) superpose des couches géoréférencées dans un même système de coordonnées. Le format vecteur modélise des objets discrets par points (forages), lignes (routes) et polygones (parcelles) associés à une table attributaire. Le format raster représente des phénomènes continus sous forme d’une grille de pixels (images satellites, Modèle Numérique de Terrain MNT). Le GPS utilise le référentiel mondial WGS84 (EPSG:4326) ; pour mesurer des surfaces ou longueurs en mètres avec précision, on projette en UTM.',
        keyTakeaway:
          'Vecteur = points/lignes/polygones (cadastre, réseaux) ; Raster = pixels (satellite, MNT) ; UTM permet des calculs métriques fiables.',
        diagramId: 'couches_sig',
      },
    ],
  },
  {
    id: 'course-sig-urba',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-urba',
    title: 'Planification urbaine, cadastre & ville résiliente',
    durationMinutes: 30,
    sizeKb: 138,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-urba-1',
        heading: '1. Documents d’urbanisme et Coefficient d’Emprise au Sol (CES)',
        content:
          'Le Schéma Directeur d’Aménagement et d’Urbanisme (SDAU) fixe les grandes orientations à 15–20 ans, tandis que le Plan d’Occupation des Sols (POS) ou PLU fixe les règles opposables à la parcelle (zones résidentielles, industrielles, naturelles inconstructibles). Le Coefficient d’Emprise au Sol (CES) limite la proportion de terrain couverte par la projection verticale du bâtiment afin de préserver des espaces libres et l’infiltration des eaux pluviales.',
        keyTakeaway:
          'CES = Surface bâtie au sol / Surface totale de la parcelle (ex. 240 m² sur 600 m² ⇒ CES = 0,40 soit 40 %).',
        formula: 'CES = S_emprise_bâtie / S_parcelle',
      },
      {
        id: 'sec-urba-2',
        heading: '2. Cadastre, drainage urbain et résilience climatique',
        content:
          'Le cadastre identifie géométriquement et fiscalement les parcelles foncières ; sa numérisation sécurise les titres fonciers et prévient les litiges. En zone urbaine sahélienne et tropicale, l’imperméabilisation excessive aggrave le ruissellement et les inondations : une ville résiliente combine bassins de rétention, trames vertes, interdiction de construire dans les lits majeurs et transports collectifs structurants.',
        keyTakeaway:
          'Construire en zone non aedificandi (lit majeur) expose aux crues ; la perméabilité des sols réduit le ruissellement urbain.',
      },
    ],
  },
  {
    id: 'course-obs-cpn',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-cpn',
    title: 'Suivi prénatal (CPN), dépistage & grossesse à risque',
    durationMinutes: 35,
    sizeKb: 148,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-cpn-1',
        heading: '1. Consultations prénatales recentrées et prévention OMS',
        content:
          'L’OMS recommande désormais au moins 8 contacts prénataux (et un minimum historique de 4 CPN recentrées) dès le 1er trimestre pour assurer une expérience positive de la grossesse. La prise en charge préventive comprend : supplémentation quotidienne en fer et acide folique (prévention de l’anémie et des anomalies du tube neural), Traitement Préventif Intermittent du paludisme (TPI à la Sulfadoxine-Pyriméthamine dès le 2e trimestre en zone d’endémie), moustiquaire imprégnée (MII), vaccination antitétanique et dépistage VIH/syphilis/hépatite B.',
        keyTakeaway:
          'Fer + acide folique dès le début, TPI paludisme à partir du 2e trimestre, dépistage PTME et suivi tension/protéinurie à chaque visite.',
        formula: 'Âge gestationnel en SA = Semaines écoulées depuis le 1er jour des dernières règles (DDR)',
      },
      {
        id: 'sec-cpn-2',
        heading: '2. Signes de danger obstétricaux et pré-éclampsie',
        content:
          'La pré-éclampsie associe après 20 semaines d’aménorrhée une hypertension artérielle (TA ≥ 140/90 mmHg) et une protéinurie significative ; non traitée, elle peut évoluer vers l’éclampsie (crises convulsives mettant en jeu le pronostic vital maternel et fœtal). Tout saignement vaginal, céphalée intense avec troubles visuels, fièvre élevée, perte de liquide amniotique ou diminution des mouvements actifs fœtaux impose une référence urgente vers une structure SONU (Soins Obstétricaux et Néonatals d’Urgence).',
        keyTakeaway:
          'Pré-éclampsie (> 20 SA) = HTA ≥ 140/90 mmHg + protéinurie ; l’éclampsie se traite en urgence par sulfate de magnésium et extraction.',
      },
    ],
  },
  {
    id: 'course-obs-neonat',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-neonat',
    title: 'Accueil du nouveau-né (Apgar), allaitement & calendrier PEV',
    durationMinutes: 30,
    sizeKb: 145,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-neonat-1',
        heading: '1. Score d’Apgar et soins essentiels du nouveau-né',
        content:
          'Évalué à 1 minute puis à 5 minutes de vie, le score d’Apgar note de 0 à 2 cinq critères vitaux (Apparence/coloration, Pouls, Grimace/réactivité, Activité/tonus, Respiration) pour un total sur 10. Un score ≥ 7 traduit une bonne adaptation extra-utérine ; un score ≤ 3 signale une détresse sévère nécessitant une réanimation néonatale immédiate (la « Minute d’Or »). Les soins essentiels incluent le séchage immédiat, le peau-à-peau pour éviter l’hypothermie, le clampage retardé du cordon et la mise au sein précoce dans la première heure.',
        keyTakeaway:
          'Apgar évalué à 1 min et 5 min sur 10 points ; ≥ 7 = bonne adaptation, ≤ 3 = réanimation urgente.',
        diagramId: 'score_apgar',
      },
      {
        id: 'sec-neonat-2',
        heading: '2. Allaitement maternel exclusif et Programme Élargi de Vaccination (PEV)',
        content:
          'L’OMS recommande l’allaitement maternel exclusif (sans eau, tisane ni bouillie) pendant les 6 premiers mois de vie, en commençant par le colostrum riche en anticorps, puis une alimentation complémentaire diversifiée tout en poursuivant l’allaitement jusqu’à 2 ans ou plus. Le PEV protège l’enfant dès la naissance : BCG (tuberculose) et Polio 0 à la naissance, puis Pentavalent (DTC-HepB-Hib), Pneumocoque et Rotavirus à 6, 10 et 14 semaines, et vaccin Rougeole-Rubéole + Fièvre jaune vers 9 mois.',
        keyTakeaway:
          'Allaitement exclusif = 0 à 6 mois (colostrum dès la 1re heure) ; BCG à la naissance et Penta à 6, 10 et 14 semaines.',
      },
    ],
  },
  {
    id: 'course-mar-incoterms',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-incoterms',
    title: 'Incoterms 2020 & partage des risques et frais',
    durationMinutes: 35,
    sizeKb: 150,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-mar-1',
        heading: '1. Structure des 11 Incoterms 2020 (CCI)',
        content:
          'Publiés par la Chambre de Commerce Internationale (CCI), les Incoterms 2020 précisent entre vendeur et acheteur qui paie le transport, l’assurance et les formalités douanières, et à quel point précis le risque de perte ou d’avarie est transféré (ils ne déterminent pas le transfert de propriété). Sept règles sont multimodales (EXW, FCA, CPT, CIP, DAP, DPU, DDP) et quatre sont réservées au transport maritime/fluvial conventionnel (FAS, FOB, CFR, CIF).',
        keyTakeaway:
          'EXW = obligation minimale du vendeur ; DDP = obligation maximale du vendeur (droits et taxes à l’import inclus).',
        diagramId: 'incoterms_chaine',
      },
      {
        id: 'sec-mar-2',
        heading: '2. Piège classique des concours : FOB vs CIF et transfert de risque',
        content:
          'En FOB (Free On Board), CFR et CIF (Cost, Insurance and Freight), le transfert du risque s’effectue au même endroit : dès que la marchandise est chargée à bord du navire au port d’embarquement. En CIF, le vendeur paie le fret principal et une assurance maritime minimale jusqu’au port de destination, mais la marchandise voyage aux risques de l’acheteur ! Pour le fret conteneurisé, la CCI recommande d’utiliser FCA, CPT ou CIP plutôt que FOB/CIF.',
        keyTakeaway:
          'En CIF, le vendeur paie fret + assurance jusqu’au port d’arrivée, mais le risque passe à l’acheteur dès la mise à bord au port de départ.',
        formula: 'Valeur CIF = Valeur FOB + Fret maritime international + Assurance transport',
      },
    ],
  },
  {
    id: 'course-mar-douane',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-douane',
    title: 'Connaissement maritime (B/L), Credoc & dédouanement',
    durationMinutes: 35,
    sizeKb: 154,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-douane-1',
        heading: '1. Le Connaissement maritime (Bill of Lading) et la conteneurisation',
        content:
          'Le connaissement maritime (B/L) remplit trois fonctions juridiques majeures : 1) reçu de prise en charge de la marchandise par le transporteur, 2) preuve du contrat de transport maritime, et 3) titre représentatif de la marchandise (négociable s’il est établi « à ordre »). À l’inverse, la lettre de transport aérien (LTA/AWB) n’est pas un titre négociable. Le trafic conteneurisé se mesure en EVP (Équivalent Vingt Pieds, ou TEU) : un conteneur de 40 pieds vaut 2 EVP.',
        keyTakeaway:
          'Le B/L à ordre est un titre négociable représentatif de la marchandise ; 1 conteneur 40’ = 2 EVP.',
      },
      {
        id: 'sec-douane-2',
        heading: '2. Crédit documentaire (Credoc) et valeur en douane',
        content:
          'Le crédit documentaire (régi par les RUU 600 de la CCI) est l’engagement irrévocable d’une banque (banque émettrice) de payer le vendeur sur présentation de documents strictement conformes (facture, B/L, liste de colisage, certificat d’origine). En Afrique francophone (zones CEMAC/UEMOA), la valeur en douane à l’importation est basée sur la valeur transactionnelle CIF (coût + assurance + fret jusqu’au port/frontière d’entrée), déclarée sur des systèmes comme SYDONIA.',
        keyTakeaway:
          'Le Credoc sécurise l’exportateur par un engagement bancaire basé sur la conformité documentaire ; la valeur en douane d’importation est calculée sur la base CIF.',
        formula: 'Droits de douane = Valeur en douane (CIF) × Taux du Tarif Extérieur Commun (TEC)',
      },
    ],
  },
  {
    id: 'course-dnum-rgpd',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-rgpd',
    title: 'Protection des données personnelles : RGPD & Malabo',
    durationMinutes: 35,
    sizeKb: 149,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-rgpd-1',
        heading: '1. Principes fondamentaux et bases légales du traitement',
        content:
          'Les cadres modernes de protection des données — RGPD européen, Convention de l’Union Africaine de Malabo (2014) et lois nationales francophones — reposent sur 6 piliers : licéité/loyauté/transparence, limitation des finalités, minimisation des données (ne collecter que le strict nécessaire), exactitude, limitation de la conservation et intégrité/confidentialité. Tout traitement exige une base légale : consentement libre et éclairé, exécution d’un contrat, obligation légale, sauvegarde des intérêts vitaux, mission d’intérêt public ou intérêt légitime.',
        keyTakeaway:
          'Le consentement n’est qu’une des 6 bases légales ; la minimisation interdit la collecte de données superflues.',
        diagramId: 'pyramide_normes',
      },
      {
        id: 'sec-rgpd-2',
        heading: '2. Droits des personnes, DPO et notification de violation (72 h)',
        content:
          'Toute personne dispose des droits d’accès, de rectification, d’effacement (« droit à l’oubli »), d’opposition, de limitation et de portabilité de ses données. Le Délégué à la Protection des Données (DPO) conseille et contrôle la conformité de façon indépendante. En cas de violation de données (fuite, ransomware) présentant un risque pour les droits et libertés, le responsable de traitement doit notifier l’autorité de contrôle dans les meilleurs délais et au plus tard sous 72 heures.',
        keyTakeaway:
          'Délai maximal de notification d’une violation de données à l’autorité de contrôle : 72 heures.',
      },
    ],
  },
  {
    id: 'course-dnum-ia',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-ia',
    title: 'Preuve électronique, propriété intellectuelle & gouvernance IA',
    durationMinutes: 30,
    sizeKb: 141,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-dnum-ia-1',
        heading: '1. Écrit et signature électronique, droit d’auteur numérique',
        content:
          'L’écrit électronique a la même force probante que l’écrit papier dès lors que l’auteur peut être dûment identifié et que l’intégrité du document est garantie (signature électronique qualifiée reposant sur la cryptographie asymétrique PKI et un certificat de tiers de confiance). En propriété intellectuelle, le code source d’un logiciel est protégé par le droit d’auteur (création originale), tandis que les algorithmes abstraits ou idées brutes ne sont pas appropriables en tant que tels.',
        keyTakeaway:
          'L’équivalence probatoire de l’écrit électronique repose sur deux piliers : identification de l’auteur + intégrité garantie.',
      },
      {
        id: 'sec-dnum-ia-2',
        heading: '2. Régulation de l’IA par les risques et transparence',
        content:
          'La régulation contemporaine de l’IA (modèle de l’AI Act et recommandations UNESCO) classe les systèmes selon 4 niveaux de risque : inacceptable (interdit, ex. notation sociale), haut risque (recrutement, crédit, diagnostic médical, justice : exige gouvernance des données, supervision humaine et auditabilité), risque limité (obligation de transparence : informer l’usager qu’il parle à un chatbot ou voit un deepfake) et risque minimal.',
        keyTakeaway:
          'Une IA à haut risque (santé, crédit, recrutement) impose une supervision humaine effective, une traçabilité et une lutte contre les biais.',
      },
    ],
  },
  {
    id: 'course-chim-fonctions',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-fonctions',
    title: 'Groupes fonctionnels, estérification & saponification',
    durationMinutes: 35,
    sizeKb: 152,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-chim-1',
        heading: '1. Reconnaître les grands groupes fonctionnels organiques',
        content:
          'La réactivité d’une molécule organique dépend de son groupe fonctionnel : hydroxyle –OH (alcool, suffixe –ol), carbonyle en bout de chaîne –CHO (aldéhyde, –al) ou en milieu de chaîne –CO– (cétone, –one), carboxyle –COOH (acide carboxylique), ester –COO– et amine –NH₂. L’oxydation ménagée d’un alcool primaire donne un aldéhyde puis un acide carboxylique ; celle d’un alcool secondaire donne une cétone ; un alcool tertiaire ne subit pas d’oxydation ménagée.',
        keyTakeaway:
          'Alcool primaire → aldéhyde → acide carboxylique ; alcool secondaire → cétone ; alcool tertiaire → pas d’oxydation ménagée.',
        diagramId: 'fonctions_chimie',
      },
      {
        id: 'sec-chim-2',
        heading: '2. Estérification (lente, limitée) vs Saponification (lente, totale)',
        content:
          'L’estérification fait réagir un acide carboxylique et un alcool pour former un ester et de l’eau : elle est lente, réversible (limitée à ~67 % pour un alcool primaire équimolaire) et athermique. À l’inverse, la saponification (hydrolyse basique d’un ester ou d’un triglycéride par la soude NaOH ou la potasse KOH) est lente mais TOTALE : elle produit un alcool (ou glycérol) et un ion carboxylate (le savon !).',
        keyTakeaway:
          'Estérification = lente et limitée (équilibrée) ; Saponification = lente et TOTALE (fabrication du savon).',
        formula: 'Acide + Alcool ⇌ Ester + H₂O   |   Ester + HO⁻ → Carboxylate (savon) + Alcool',
      },
    ],
  },
  {
    id: 'course-chim-bio',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-bio',
    title: 'Biochimie structurale : glucides, lipides, protéines & enzymes',
    durationMinutes: 35,
    sizeKb: 147,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-bio-1',
        heading: '1. Glucides, lipides et protéines (liaison peptidique)',
        content:
          'Les glucides (glucose C₆H₁₂O₆, amidon, glycogène) fournissent une énergie rapide (4 kcal/g). Les lipides (triglycérides, phospholipides membranaires) stockent l’énergie à haute densité (9 kcal/g) et structurent les membranes cellulaires. Les protéines sont des polymères d’acides aminés unis par des liaisons peptidiques (–CO–NH–) ; elles assurent des rôles structuraux, immunitaires (anticorps), de transport (hémoglobine) et catalytiques (enzymes).',
        keyTakeaway:
          'Liaison peptidique = condensation entre –COOH d’un acide aminé et –NH₂ du suivant avec libération d’une molécule d’eau.',
        formula: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + Énergie (≈ 30–32 ATP)',
      },
      {
        id: 'sec-bio-2',
        heading: '2. Catalyse enzymatique et monnaie énergétique ATP',
        content:
          'Une enzyme est un biocatalyseur (généralement protéique) qui accélère considérablement une réaction biochimique en abaissant son énergie d’activation, sans être consommée à la fin. Son site actif lui confère une double spécificité (de substrat et d’action) et une sensibilité au pH et à la température (dénaturation thermique au-delà d’un optimum). L’ATP (adénosine triphosphate) est la monnaie énergétique universelle de la cellule.',
        keyTakeaway:
          'Une enzyme abaisse l’énergie d’activation sans être consommée ; une chaleur excessive dénature sa structure 3D.',
      },
    ],
  },
  {
    id: 'course-cris-cycle',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-cycle',
    title: 'Cycle de gestion des catastrophes & alerte précoce',
    durationMinutes: 30,
    sizeKb: 140,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-cris-1',
        heading: '1. Équation du risque de catastrophe et Cadre de Sendai',
        content:
          'Une catastrophe n’est jamais purement « naturelle » : elle résulte de la rencontre entre un aléa (crue, sécheresse, séisme, épidémie) et une population vulnérable dont les capacités de réponse sont dépassées. Le Cadre de Sendai (2015–2030) organise l’action en 4 phases cycliques : Prévention/Mitigation (réduire les risques en amont), Préparation (alerte précoce, exercices, stocks), Réponse d’urgence (sauver des vies) et Relèvement (« Reconstruire en mieux » / Build Back Better).',
        keyTakeaway:
          'Réduire la vulnérabilité et renforcer les capacités diminue drastiquement le risque même si l’aléa reste identique.',
        formula: 'Risque = (Aléa × Exposition × Vulnérabilité) / Capacités de résilience',
        diagramId: 'cycle_crise',
      },
      {
        id: 'sec-cris-2',
        heading: '2. Systèmes d’alerte précoce (SAP) et plans ORSEC',
        content:
          'Un système d’alerte précoce efficace repose sur 4 piliers indissociables : connaissance des risques, surveillance/prévision technique, diffusion compréhensible de l’alerte jusqu’au dernier kilomètre (radio communautaire, SMS, sirènes) et capacité de réaction des communautés. Les plans ORSEC coordonnent sous un commandement unique les secours publics (protection civile, santé, armée, collectivités).',
        keyTakeaway:
          'Une prévision météo parfaite échoue sans diffusion compréhensible et plan d’évacuation communautaire préparé à l’avance.',
      },
    ],
  },
  {
    id: 'course-cris-sphere',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-sphere',
    title: 'Principes humanitaires, normes Sphère & triage d’urgence',
    durationMinutes: 30,
    sizeKb: 143,
    updatedAt: '2026-03-01',
    sections: [
      {
        id: 'sec-sph-1',
        heading: '1. Les 4 principes humanitaires fondamentaux et les Clusters ONU',
        content:
          'L’action humanitaire d’urgence est régie par 4 principes universels (Résolutions ONU et Croix-Rouge) : Humanité (soulager toute souffrance humaine), Neutralité (ne pas prendre parti dans les hostilités), Impartialité (aider uniquement selon l’urgence des besoins, sans discrimination) et Indépendance (autonomie vis-à-vis des objectifs politiques, économiques ou militaires). Sur le terrain, OCHA coordonne les secteurs via le système des Clusters (Santé/OMS, WASH/UNICEF, Sécurité alimentaire/PAM-FAO, Abris/HCR).',
        keyTakeaway:
          'Humanité, Neutralité, Impartialité, Indépendance : l’impartialité priorise selon les besoins, la neutralité interdit de prendre parti.',
      },
      {
        id: 'sec-sph-2',
        heading: '2. Normes minimales Sphère (WASH) et triage START',
        content:
          'Le manuel Sphère fixe des standards minimaux de dignité en situation d’urgence : au moins 15 litres d’eau potable par personne et par jour (boisson, cuisine, hygiène de base), un point d’eau à moins de 500 mètres et une latrine pour 20 personnes au maximum en camp stabilisé. Lors d’un afflux massif de blessés, le triage START classe les victimes par couleur : Rouge (urgence immédiate, pronostic vital engagé récupérable), Jaune (urgence différée), Vert (blessé léger marchant) et Noir (décédé/dépassé).',
        keyTakeaway:
          'Norme Sphère WASH : ≥ 15 L d’eau/pers/jour à ≤ 500 m ; Triage START : Rouge = priorité absolue de secours.',
      },
    ],
  },
];

export const HORIZON_FICHES: Fiche[] = [
  {
    id: 'fiche-sig-carto',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-carto',
    title: 'Cartographie, Échelles, Géodésie & SIG',
    subtitle: 'Calculs d’échelle, courbes de niveau, WGS84/UTM et couches Raster/Vecteur',
    sizeKb: 96,
    notionsEssentielles: [
      'L’échelle E = d_carte / D_réelle ; au 1/50 000, 1 cm = 500 m.',
      'Courbes de niveau serrées = pente forte ; espacées = relief doux.',
      'Vecteur = points, lignes et polygones ; Raster = grille de pixels (MNT, satellite).',
      'UTM projette en mètres pour des calculs précis de distances et surfaces.',
    ],
    definitions: [
      { terme: 'SIG', definition: 'Système d’Information Géographique permettant de stocker, analyser et superposer des couches géoréférencées.' },
      { terme: 'WGS84 (EPSG:4326)', definition: 'Système géodésique mondial en latitude/longitude utilisé par les GPS.' },
    ],
    formules: [
      { label: 'Distance réelle', formule: 'D_réelle = d_carte × Dénominateur', unite: 'cm / m / km' },
      { label: 'Pente topographique', formule: 'Pente (%) = (ΔH / D_horizontale) × 100', unite: '%' },
    ],
    datesReperes: [
      { repere: '1/25 000', detail: 'Grande échelle détaillée (1 cm = 250 m).' },
      { repere: '1/50 000', detail: 'Carte topographique standard (1 cm = 500 m).' },
    ],
    methodes: [
      'Convertir systématiquement les centimètres en mètres (÷ 100) puis en kilomètres (÷ 1 000).',
      'Reprojeter une couche WGS84 en zone UTM locale avant tout calcul de surface cadastrale.',
    ],
    erreursFrequentes: [
      'Confondre grande échelle (1/5 000, très détaillée) et petite échelle (1/1 000 000).',
      'Calculer des superficies directement en degrés décimaux.',
    ],
    exemples: [
      { titre: 'Distance au 1/25 000', contenu: '4 cm mesurés sur la carte correspondent à 4 × 25 000 cm = 100 000 cm = 1 km réel.' },
    ],
    resumeExpress:
      'D_réelle = d_carte × dénominateur ; Vecteur = points/lignes/polygones ; Raster = pixels (MNT, satellite) ; UTM pour mesurer en mètres.',
    tableauComparatif: {
      headers: ['Critère', 'Modèle Vecteur', 'Modèle Raster'],
      rows: [
        { critere: 'Géométrie', elementA: 'Points, lignes, polygones', elementB: 'Grille régulière de pixels' },
        { critere: 'Usages clés', elementA: 'Cadastre, routes, forages', elementB: 'Images satellites, MNT altitude' },
      ],
    },
    autoEvaluation: [
      { question: 'Que représente 6 cm sur une carte au 1/50 000 ?', reponse: '6 × 500 m = 3 000 m = 3 km.' },
      { question: 'Quel format représente un MNT ?', reponse: 'Le modèle Raster (matrice de pixels d’altitude).' },
    ],
  },
  {
    id: 'fiche-sig-urba',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-urba',
    title: 'Planification Urbaine, CES & Cadastre',
    subtitle: 'SDAU, POS/PLU, Coefficient d’Emprise au Sol et ville résiliente',
    sizeKb: 92,
    notionsEssentielles: [
      'Le SDAU fixe la vision stratégique à 15–20 ans ; le POS/PLU régit la parcelle.',
      'CES = Surface bâtie au sol / Surface de la parcelle.',
      'Le cadastre sécurise géométriquement et fiscalement la propriété foncière.',
      'Interdire la construction en lit majeur prévient les inondations urbaines.',
    ],
    definitions: [
      { terme: 'CES', definition: 'Coefficient d’Emprise au Sol : part maximale de la parcelle constructible au sol.' },
      { terme: 'Zone non aedificandi', definition: 'Zone strictement inconstructible (servitude, lit majeur inondable).' },
    ],
    formules: [{ label: 'Coefficient d’Emprise au Sol', formule: 'CES = S_bâtie_au_sol / S_parcelle', unite: 'ratio (0 à 1)' }],
    datesReperes: [
      { repere: 'SDAU', detail: 'Horizon stratégique de 15 à 20 ans à l’échelle de l’agglomération.' },
    ],
    methodes: [
      'Multiplier la surface totale du terrain par le CES maximal pour obtenir l’emprise bâtie autorisée.',
    ],
    erreursFrequentes: [
      'Confondre emprise au sol (CES) et surface totale cumulée des étages (COS).',
    ],
    exemples: [
      { titre: 'Calcul d’emprise', contenu: 'Parcelle de 500 m² avec CES max = 0,40 ⇒ emprise bâtie maximale = 200 m².' },
    ],
    resumeExpress:
      'SDAU = vision 20 ans ; POS/PLU = règles parcellaires ; CES = Surface bâtie / Surface parcelle ; préserver les zones inondables.',
    tableauComparatif: {
      headers: ['Critère', 'SDAU', 'POS / PLU'],
      rows: [
        { critere: 'Échelle', elementA: 'Agglomération / territoire', elementB: 'Commune / parcelle' },
        { critere: 'Portée', elementA: 'Orientations stratégiques', elementB: 'Règlement opposable au permis' },
      ],
    },
    autoEvaluation: [
      { question: 'Parcelle de 800 m², CES = 0,35 : emprise max ?', reponse: '800 × 0,35 = 280 m².' },
    ],
  },
  {
    id: 'fiche-obs-cpn',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-cpn',
    title: 'Suivi Prénatal (CPN) & Pré-éclampsie',
    subtitle: 'Recommandations OMS, fer-folates, TPI paludisme et urgences SONU',
    sizeKb: 95,
    notionsEssentielles: [
      'L’OMS recommande au moins 8 contacts prénataux dès le 1er trimestre.',
      'Acide folique (vitamine B9) prévient les anomalies du tube neural ; fer prévient l’anémie.',
      'TPI paludisme (Sulfadoxine-Pyriméthamine) débuté dès le 2e trimestre en zone d’endémie.',
      'Pré-éclampsie (> 20 SA) = HTA ≥ 140/90 mmHg + protéinurie significative.',
    ],
    definitions: [
      { terme: 'Pré-éclampsie', definition: 'Pathologie gravidique associant après 20 SA une HTA ≥ 140/90 mmHg et une protéinurie.' },
      { terme: 'Éclampsie', definition: 'Complication grave de la pré-éclampsie caractérisée par des crises convulsives tonicocloniques.' },
    ],
    formules: [
      { label: 'Seuil HTA gravidique', formule: 'TA ≥ 140 / 90 mmHg après 20 SA', unite: 'mmHg' },
    ],
    datesReperes: [
      { repere: '20 SA', detail: 'Seuil d’âge gestationnel pour la pré-éclampsie.' },
      { repere: '2e trimestre', detail: 'Début du Traitement Préventif Intermittent (TPI) contre le paludisme.' },
    ],
    methodes: [
      'À chaque CPN : mesurer tension artérielle, bandelette urinaire (protéinurie), hauteur utérine et bruits du cœur fœtal.',
      'Devant une éclampsie : sulfate de magnésium (MgSO₄) en urgence + référence SONU.',
    ],
    erreursFrequentes: [
      'Prescrire la Sulfadoxine-Pyriméthamine (TPI) dès le 1er trimestre (contre-indiquée avant le 2e trimestre).',
    ],
    exemples: [
      { titre: 'Alerte CPN', contenu: 'Gestante à 28 SA avec TA 150/100 mmHg et protéinurie ++ ⇒ pré-éclampsie, référence urgente.' },
    ],
    resumeExpress:
      'OMS : 8 contacts CPN ; Fer + acide folique ; TPI paludisme dès le 2e trimestre ; Pré-éclampsie (> 20 SA) = HTA ≥ 140/90 + protéinurie.',
    tableauComparatif: {
      headers: ['Critère', 'Pré-éclampsie', 'Éclampsie'],
      rows: [
        { critere: 'Signe majeur', elementA: 'HTA ≥ 140/90 + protéinurie', elementB: 'Crises convulsives sur pré-éclampsie' },
        { critere: 'Traitement clé', elementA: 'Surveillance / antihypertenseur / MgSO₄ si sévère', elementB: 'Sulfate de magnésium en urgence + extraction' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel anticonvulsivant est recommandé en 1re intention dans l’éclampsie ?', reponse: 'Le sulfate de magnésium (MgSO₄).' },
    ],
  },
  {
    id: 'fiche-obs-neonat',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-neonat',
    title: 'Score d’Apgar, Allaitement & Calendrier PEV',
    subtitle: 'Accueil du nouveau-né, allaitement exclusif 6 mois et vaccins essentiels',
    sizeKb: 94,
    notionsEssentielles: [
      'Score d’Apgar évalué à 1 min et 5 min sur 10 points (5 critères × 0 à 2).',
      'Apgar ≥ 7 = normal ; 4–6 = détresse modérée ; ≤ 3 = réanimation urgente.',
      'Allaitement maternel exclusif de 0 à 6 mois (colostrum dans la 1re heure, sans eau).',
      'PEV : BCG + Polio 0 à la naissance ; Pentavalent à 6, 10 et 14 semaines ; Rougeole à 9 mois.',
    ],
    definitions: [
      { terme: 'Score d’Apgar', definition: 'Cotation rapide de vitalité néonatale : Apparence, Pouls, Grimace, Activité, Respiration.' },
      { terme: 'Colostrum', definition: 'Premier lait maternel jaunâtre très riche en anticorps protégeant le nouveau-né.' },
    ],
    formules: [
      { label: 'Total Apgar', formule: 'Score = A + P + G + A + R (chaque critère ∈ {0, 1, 2})', unite: '/ 10' },
    ],
    datesReperes: [
      { repere: 'Naissance', detail: 'BCG + Polio 0, séchage immédiat, peau-à-peau et mise au sein < 1 h.' },
      { repere: '6, 10, 14 sem.', detail: '3 doses de Pentavalent (DTC-HepB-Hib), Pneumo et Polio.' },
    ],
    methodes: [
      'Retenir l’acrostiche APGAR : Apparence, Pouls, Grimace, Activité, Respiration.',
    ],
    erreursFrequentes: [
      'Donner de l’eau ou des tisanes au nourrisson allaité avant 6 mois (le lait maternel contient > 85 % d’eau).',
    ],
    exemples: [
      { titre: 'Cotation Apgar', contenu: 'Nouveau-né rose (2), pouls 130 bpm (2), cri vigoureux (2), tonique (2), réactif (2) ⇒ Apgar 10/10.' },
    ],
    resumeExpress:
      'Apgar (1 & 5 min) : Apparence, Pouls, Grimace, Activité, Respiration (/10) ; Allaitement exclusif 0–6 mois ; BCG à la naissance.',
    tableauComparatif: {
      headers: ['Score Apgar', 'Interprétation', 'Conduite immédiate'],
      rows: [
        { critere: '7 à 10', elementA: 'Bonne adaptation', elementB: 'Soins essentiels, peau-à-peau, sein' },
        { critere: '0 à 3', elementA: 'Détresse sévère', elementB: 'Réanimation néonatale immédiate (Minute d’Or)' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle est la durée recommandée de l’allaitement exclusif ?', reponse: 'Les 6 premiers mois de vie (sans eau ni autre aliment).' },
    ],
  },
  {
    id: 'fiche-mar-incoterms',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-incoterms',
    title: 'Incoterms 2020 — Risques & Frais',
    subtitle: '7 règles multimodales et 4 règles maritimes (FOB, CFR, CIF)',
    sizeKb: 96,
    notionsEssentielles: [
      'Les 11 Incoterms 2020 (CCI) fixent frais, risques et douane, jamais le transfert de propriété.',
      '4 règles maritimes exclusives : FAS, FOB, CFR, CIF ; 7 règles multimodales : EXW à DDP.',
      'EXW = obligation minimale du vendeur ; DDP = obligation maximale du vendeur.',
      'En CIF, le vendeur paie fret + assurance jusqu’au port d’arrivée, mais le risque passe à l’acheteur au port de départ.',
    ],
    definitions: [
      { terme: 'FOB', definition: 'Free On Board : risque et frais transférés dès la mise à bord du navire au port d’embarquement.' },
      { terme: 'CIF', definition: 'Cost, Insurance and Freight : vendeur paie fret et assurance jusqu’au port d’arrivée, risque transféré au port de départ.' },
    ],
    formules: [
      { label: 'Valeur CIF', formule: 'CIF = FOB + Fret maritime + Assurance transport', unite: 'FCFA / € / $' },
    ],
    datesReperes: [
      { repere: '2020', detail: 'Entrée en vigueur des Incoterms 2020 de la CCI (remplacement de DAT par DPU).' },
    ],
    methodes: [
      'Toujours poser deux questions séparées sur un Incoterm : qui paie quoi ? et où bascule le risque ?',
    ],
    erreursFrequentes: [
      'Croire qu’en CIF le vendeur supporte le risque d’avarie pendant la traversée maritime.',
    ],
    exemples: [
      { titre: 'Calcul CIF', contenu: 'FOB 40 000 € + Fret 4 500 € + Assurance 500 € = 45 000 € CIF.' },
    ],
    resumeExpress:
      '11 Incoterms : 7 multimodaux (EXW → DDP) + 4 maritimes (FAS, FOB, CFR, CIF). En CIF, risque transféré au port de départ !',
    tableauComparatif: {
      headers: ['Incoterm', 'Frais principaux payés par vendeur', 'Transfert du risque'],
      rows: [
        { critere: 'FOB', elementA: 'Jusqu’à la mise à bord au départ', elementB: 'Mise à bord au port de départ' },
        { critere: 'CIF', elementA: 'Fret + assurance jusqu’au port d’arrivée', elementB: 'Mise à bord au port de départ' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel Incoterm 2020 impose le maximum d’obligations au vendeur ?', reponse: 'DDP (Delivered Duty Paid — droits et taxes import acquittés).' },
    ],
  },
  {
    id: 'fiche-mar-douane',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-douane',
    title: 'Connaissement (B/L), Credoc & Valeur en Douane',
    subtitle: 'Titre négociable maritime, conteneurisation EVP et liquidation douanière',
    sizeKb: 95,
    notionsEssentielles: [
      'Le connaissement maritime (B/L) est reçu + contrat de transport + titre négociable (si « à ordre »).',
      'La LTA aérienne n’est pas un titre négociable.',
      '1 conteneur 20’ = 1 EVP (TEU) ; 1 conteneur 40’ = 2 EVP.',
      'La valeur en douane à l’importation (CEMAC/UEMOA) est calculée sur la base CIF.',
    ],
    definitions: [
      { terme: 'Bill of Lading (B/L)', definition: 'Document maritime représentant la marchandise et permettant sa réclamation au port d’arrivée.' },
      { terme: 'Crédit documentaire', definition: 'Engagement bancaire irrévocable de payer le vendeur contre documents conformes (RUU 600).' },
    ],
    formules: [
      { label: 'Droits de douane', formule: 'DD = Valeur en douane (CIF) × Taux TEC', unite: 'FCFA' },
    ],
    datesReperes: [
      { repere: 'RUU 600', detail: 'Règles et Usances Uniformes de la CCI régissant le crédit documentaire.' },
    ],
    methodes: [
      'Convertir les conteneurs 40’ en EVP en multipliant par 2 avant d’additionner avec les 20’.',
    ],
    erreursFrequentes: [
      'Calculer les droits de douane sur la seule valeur FOB en oubliant fret et assurance.',
    ],
    exemples: [
      { titre: 'Liquidation douanière', contenu: 'CIF = 14 000 000 FCFA avec TEC 10 % ⇒ Droits de douane = 1 400 000 FCFA.' },
    ],
    resumeExpress:
      'B/L = reçu + contrat + titre négociable ; 1 conteneur 40’ = 2 EVP ; Credoc = engagement bancaire ; Douane = base CIF.',
    tableauComparatif: {
      headers: ['Critère', 'Connaissement maritime (B/L)', 'Lettre de Transport Aérien (LTA)'],
      rows: [
        { critere: 'Mode', elementA: 'Transport maritime', elementB: 'Transport aérien' },
        { critere: 'Négociabilité', elementA: 'Oui (si établi « à ordre »)', elementB: 'Non négociable' },
      ],
    },
    autoEvaluation: [
      { question: '150 conteneurs de 20’ et 100 de 40’ font combien d’EVP ?', reponse: '150 × 1 + 100 × 2 = 350 EVP.' },
    ],
  },
  {
    id: 'fiche-dnum-rgpd',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-rgpd',
    title: 'Protection des Données : RGPD & Malabo',
    subtitle: 'Bases légales, minimisation, droits des citoyens, DPO et délai 72 h',
    sizeKb: 95,
    notionsEssentielles: [
      '6 principes : licéité/transparence, finalité, minimisation, exactitude, conservation limitée, sécurité.',
      '6 bases légales : consentement, contrat, obligation légale, intérêt vital, mission publique, intérêt légitime.',
      'Convention de Malabo (UA, 2014) : socle panafricain cybersécurité & données personnelles.',
      'Notification d’une violation de données à risque à l’autorité : délai maximal 72 heures.',
    ],
    definitions: [
      { terme: 'Minimisation', definition: 'Obligation de ne collecter que les données strictement nécessaires à la finalité déclarée.' },
      { terme: 'DPO', definition: 'Délégué à la Protection des Données, conseiller indépendant garant de la conformité.' },
    ],
    formules: [
      { label: 'Délai légal de notification de faille', formule: 'Notification à l’autorité ≤ 72 heures', unite: 'heures' },
    ],
    datesReperes: [
      { repere: '2014', detail: 'Adoption de la Convention de l’Union Africaine à Malabo.' },
      { repere: '2018', detail: 'Entrée en application du RGPD (25 mai 2018).' },
    ],
    methodes: [
      'Toujours vérifier si un traitement repose sur une des 6 bases légales avant la collecte.',
    ],
    erreursFrequentes: [
      'Penser que le consentement est l’unique base légale (ex. paie ou impôts = obligation légale/contrat).',
    ],
    exemples: [
      { titre: 'Violation de minimisation', contenu: 'Une app de révision demandant les opinions politiques viole le principe de minimisation.' },
    ],
    resumeExpress:
      '6 bases légales, minimisation des données, droits d’accès/effacement/portabilité, DPO indépendant et notification de faille sous 72 h.',
    tableauComparatif: {
      headers: ['Cadre', 'Portée géographique', 'Champ couvert'],
      rows: [
        { critere: 'RGPD', elementA: 'Union Européenne (+ extraterritorial)', elementB: 'Protection des données personnelles' },
        { critere: 'Convention de Malabo', elementA: 'Union Africaine (2014)', elementB: 'Données personnelles + cybersécurité + e-commerce' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel délai maximal pour notifier une fuite de données à risque ?', reponse: '72 heures.' },
    ],
  },
  {
    id: 'fiche-dnum-ia',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-ia',
    title: 'Preuve Électronique, Logiciel & Régulation IA',
    subtitle: 'Signature électronique, droit d’auteur logiciel et approche IA par les risques',
    sizeKb: 92,
    notionsEssentielles: [
      'Écrit électronique = même force probante que le papier si auteur identifié et intégrité garantie.',
      'Le code source d’un logiciel est protégé par le droit d’auteur.',
      'Régulation IA en 4 niveaux : inacceptable (interdit), haut risque, risque limité, minimal.',
      'L’IA à haut risque (santé, crédit, recrutement) exige supervision humaine et auditabilité.',
    ],
    definitions: [
      { terme: 'Signature qualifiée', definition: 'Signature électronique cryptographique reposant sur un certificat délivré par un tiers de confiance.' },
      { terme: 'IA à haut risque', definition: 'Système impactant les droits fondamentaux soumis à gouvernance des données et contrôle humain.' },
    ],
    formules: [
      { label: 'Équivalence probatoire', formule: 'Preuve électronique = Identification auteur + Intégrité garantie' },
    ],
    datesReperes: [
      { repere: '2024', detail: 'Adoption du Règlement européen sur l’IA (AI Act), référence internationale par les risques.' },
    ],
    methodes: [
      'Classer tout cas pratique IA selon son niveau d’impact sur la sécurité et les droits fondamentaux.',
    ],
    erreursFrequentes: [
      'Confondre un simple scan d’une signature manuscrite avec une signature électronique qualifiée.',
    ],
    exemples: [
      { titre: 'Obligation de transparence', contenu: 'Un chatbot administratif doit indiquer clairement à l’usager qu’il dialogue avec une IA.' },
    ],
    resumeExpress:
      'Signature qualifiée = identité + intégrité ; code logiciel = droit d’auteur ; IA régulée par 4 niveaux de risque avec contrôle humain.',
    tableauComparatif: {
      headers: ['Niveau de risque IA', 'Exemples', 'Exigence juridique'],
      rows: [
        { critere: 'Inacceptable', elementA: 'Notation sociale', elementB: 'Interdiction stricte' },
        { critere: 'Haut risque', elementA: 'Santé, crédit, recrutement', elementB: 'Audit, gouvernance données, supervision humaine' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelles sont les deux conditions de force probante d’un écrit électronique ?', reponse: 'Identification fiable de l’auteur et garantie d’intégrité du document.' },
    ],
  },
  {
    id: 'fiche-chim-fonctions',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-fonctions',
    title: 'Fonctions Organiques, Estérification & Saponification',
    subtitle: 'Groupes fonctionnels, oxydation des alcools et synthèse du savon',
    sizeKb: 96,
    notionsEssentielles: [
      'Groupes clés : –OH (alcool), –CHO (aldéhyde), –COOH (acide), –COO– (ester), –NH₂ (amine).',
      'Oxydation ménagée : alcool primaire → aldéhyde → acide ; secondaire → cétone ; tertiaire → rien.',
      'Estérification : lente, réversible/limitée (~67 % équimolaire) et athermique.',
      'Saponification (Ester + HO⁻) : lente mais TOTALE (fabrication du savon).',
    ],
    definitions: [
      { terme: 'Saponification', definition: 'Hydrolyse basique totale d’un ester ou triglycéride produisant un carboxylate (savon) et un alcool.' },
      { terme: 'Catalyseur', definition: 'Espèce chimique accélérant la vitesse d’atteinte de l’équilibre sans modifier le rendement final.' },
    ],
    formules: [
      { label: 'Estérification', formule: 'R–COOH + R’–OH ⇌ R–COO–R’ + H₂O' },
      { label: 'Saponification', formule: 'R–COO–R’ + HO⁻ → R–COO⁻ + R’–OH' },
    ],
    datesReperes: [
      { repere: '~67 %', detail: 'Rendement typique d’estérification équimolaire avec un alcool primaire.' },
    ],
    methodes: [
      'Identifier d’abord la classe de l’alcool (primaire, secondaire ou tertiaire) avant de prédire le produit d’oxydation.',
    ],
    erreursFrequentes: [
      'Affirmer qu’un catalyseur augmente le rendement final de l’estérification (il augmente seulement la vitesse).',
    ],
    exemples: [
      { titre: 'Synthèse d’ester', contenu: 'Acide éthanoïque + éthanol ⇌ éthanoate d’éthyle + eau.' },
    ],
    resumeExpress:
      '–OH alcool, –CHO aldéhyde, –COOH acide, –COO– ester, –NH₂ amine. Estérification = limitée ; Saponification = totale (savon).',
    tableauComparatif: {
      headers: ['Caractéristique', 'Estérification', 'Saponification'],
      rows: [
        { critere: 'Avancement', elementA: 'Limitée (réversible ⇌)', elementB: 'Totale (irréversible →)' },
        { critere: 'Produits', elementA: 'Ester + Eau', elementB: 'Ion carboxylate (savon) + Alcool' },
      ],
    },
    autoEvaluation: [
      { question: 'Que donne l’oxydation ménagée d’un alcool secondaire ?', reponse: 'Une cétone.' },
    ],
  },
  {
    id: 'fiche-chim-bio',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-bio',
    title: 'Biomolécules, Liaison Peptidique & Enzymes',
    subtitle: 'Glucides, lipides, protéines, catalyse enzymatique et ATP',
    sizeKb: 94,
    notionsEssentielles: [
      'Glucides et protéines = 4 kcal/g ; Lipides = 9 kcal/g.',
      'Les protéines sont des chaînes d’acides aminés unis par liaison peptidique (–CO–NH–).',
      'Une enzyme abaisse l’énergie d’activation et n’est pas consommée en fin de réaction.',
      'La chaleur excessive dénature irréversiblement la structure 3D d’une enzyme.',
    ],
    definitions: [
      { terme: 'Liaison peptidique', definition: 'Liaison covalente –CO–NH– formée entre deux acides aminés avec libération d’eau.' },
      { terme: 'ATP', definition: 'Adénosine triphosphate : molécule universelle de stockage et transfert d’énergie cellulaire.' },
    ],
    formules: [
      { label: 'Respiration cellulaire', formule: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + Énergie (ATP)' },
    ],
    datesReperes: [
      { repere: '37 °C', detail: 'Température optimale typique des enzymes humaines.' },
    ],
    methodes: [
      'Distinguer l’effet du froid (ralentissement réversible) de la chaleur excessive (dénaturation irréversible).',
    ],
    erreursFrequentes: [
      'Croire que l’enzyme est détruite à chaque cycle catalytique.',
    ],
    exemples: [
      { titre: 'Spécificité enzymatique', contenu: 'L’amylase hydrolyse spécifiquement l’amidon en maltose, mais n’agit pas sur les lipides.' },
    ],
    resumeExpress:
      'Protéines = acides aminés reliés par liaison peptidique ; Enzymes = biocatalyseurs spécifiques non consommés ; ATP = énergie cellulaire.',
    tableauComparatif: {
      headers: ['Critère', 'Glucides', 'Lipides'],
      rows: [
        { critere: 'Énergie', elementA: '4 kcal/g (énergie rapide)', elementB: '9 kcal/g (réserve dense)' },
        { critere: 'Rôle clé', elementA: 'Substrat respiratoire (glucose)', elementB: 'Membranes cellulaires & stockage' },
      ],
    },
    autoEvaluation: [
      { question: 'Comment une enzyme accélère-t-elle une réaction biochimique ?', reponse: 'En abaissant son énergie d’activation, sans être consommée.' },
    ],
  },
  {
    id: 'fiche-cris-cycle',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-cycle',
    title: 'Cycle des Catastrophes & Alerte Précoce',
    subtitle: 'Équation du risque, Cadre de Sendai et plans ORSEC',
    sizeKb: 91,
    notionsEssentielles: [
      'Risque = (Aléa × Exposition × Vulnérabilité) / Capacités de résilience.',
      '4 phases du cycle : Prévention/Mitigation → Préparation → Réponse → Relèvement.',
      '« Reconstruire en mieux » (Build Back Better) réduit la vulnérabilité future.',
      'Un SAP efficace relie prévision scientifique et diffusion communautaire jusqu’au dernier kilomètre.',
    ],
    definitions: [
      { terme: 'Aléa', definition: 'Phénomène potentiellement dangereux (crue, sécheresse, séisme, épidémie).' },
      { terme: 'Vulnérabilité', definition: 'Degré de fragilité d’une population ou d’infrastructures exposées à un aléa.' },
    ],
    formules: [
      { label: 'Équation du risque', formule: 'Risque = (Aléa × Exposition × Vulnérabilité) / Capacités' },
    ],
    datesReperes: [
      { repere: '2015–2030', detail: 'Cadre de Sendai de l’ONU pour la réduction des risques de catastrophe.' },
    ],
    methodes: [
      'Identifier si une action intervient avant (prévention/préparation), pendant (réponse) ou après la crise (relèvement).',
    ],
    erreursFrequentes: [
      'Confondre aléa (événement physique) et catastrophe (dépassement des capacités locales).',
    ],
    exemples: [
      { titre: 'Action de prévention', contenu: 'Construire une école sur terrain surélevé hors zone inondable relève de la prévention/mitigation.' },
    ],
    resumeExpress:
      'Risque = (Aléa × Vulnérabilité) / Capacités ; 4 phases : Prévention → Préparation → Réponse → Relèvement (Sendai).',
    tableauComparatif: {
      headers: ['Phase', 'Moment', 'Exemples concrets'],
      rows: [
        { critere: 'Préparation', elementA: 'Avant la crise', elementB: 'Exercices d’évacuation, stocks prépositionnés, SAP' },
        { critere: 'Réponse', elementA: 'Pendant l’urgence', elementB: 'Secours vitaux, abris, eau potable, soins' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelles sont les 4 phases du cycle de gestion des catastrophes ?', reponse: 'Prévention/Mitigation, Préparation, Réponse et Relèvement.' },
    ],
  },
  {
    id: 'fiche-cris-sphere',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-sphere',
    title: 'Principes Humanitaires, Sphère & Triage START',
    subtitle: 'Humanité/Neutralité/Impartialité/Indépendance, WASH 15 L/j et Clusters ONU',
    sizeKb: 93,
    notionsEssentielles: [
      '4 principes humanitaires : Humanité, Neutralité, Impartialité, Indépendance.',
      'Norme Sphère WASH : ≥ 15 L d’eau potable/personne/jour à ≤ 500 m.',
      'OCHA coordonne la réponse internationale via le système des Clusters.',
      'Triage START : Rouge (immédiat), Jaune (différé), Vert (léger), Noir (dépassé/décédé).',
    ],
    definitions: [
      { terme: 'Impartialité', definition: 'Fournir l’assistance selon la seule urgence des besoins, sans discrimination.' },
      { terme: 'Neutralité', definition: 'S’abstenir de prendre parti dans les hostilités ou controverses politiques.' },
    ],
    formules: [
      { label: 'Besoin minimal en eau (Sphère)', formule: 'Volume/jour = Nombre de personnes × 15 L', unite: 'litres/jour' },
    ],
    datesReperes: [
      { repere: '15 L/pers/j', detail: 'Standard minimal Sphère (boisson, cuisine et hygiène élémentaire).' },
    ],
    methodes: [
      'Calculer rapidement les besoins WASH d’un camp : Population × 15 L = besoin journalier minimal.',
    ],
    erreursFrequentes: [
      'Confondre neutralité (ne pas prendre parti) et impartialité (prioriser selon les besoins sans discrimination).',
    ],
    exemples: [
      { titre: 'Dimensionnement WASH', contenu: 'Site de 2 000 déplacés ⇒ besoin minimal = 2 000 × 15 L = 30 000 L (30 m³) par jour.' },
    ],
    resumeExpress:
      '4 principes : Humanité, Neutralité, Impartialité, Indépendance. Norme Sphère : ≥ 15 L eau/pers/j. Triage START : Rouge = priorité absolue.',
    tableauComparatif: {
      headers: ['Code START', 'Signification', 'Priorité d’évacuation'],
      rows: [
        { critere: 'Rouge', elementA: 'Détresse vitale récupérable', elementB: 'Priorité 1 (immédiate)' },
        { critere: 'Jaune', elementA: 'Blessure grave stable', elementB: 'Priorité 2 (différée)' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle agence ONU coordonne le système des Clusters humanitaires ?', reponse: 'OCHA.' },
    ],
  },
];

export const HORIZON_QUESTIONS: Question[] = [
  // URBANISME & SIG (5)
  {
    id: 'q-sig-1',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-carto',
    examIds: ['concours-urbanisme-sig', 'concours-genie-civil'],
    prompt:
      'Sur une carte topographique au 1/50 000, la distance mesurée entre deux carrefours est de 6 cm. Quelle est la distance réelle sur le terrain ?',
    options: ['300 m', '3 km', '30 km', '1,2 km'],
    correctIndex: 1,
    explanation:
      'Au 1/50 000, 1 cm représente 50 000 cm = 500 m. Donc 6 cm × 500 m = 3 000 m = 3 km.',
    steps: [
      '1 cm sur la carte = 50 000 cm = 500 m.',
      'D = 6 × 500 m = 3 000 m = 3 km.',
    ],
    notion: 'Calcul d’échelle cartographique',
    difficulty: 'facile',
    ficheId: 'fiche-sig-carto',
    source: 'Annale Concours Topographie-SIG 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-sig-2',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-carto',
    examIds: ['concours-urbanisme-sig', 'concours-mines-petrole'],
    prompt:
      'Dans un Système d’Information Géographique (QGIS), quel modèle de données représente le mieux une image satellite ou un Modèle Numérique de Terrain (MNT) ?',
    options: [
      'Le modèle Raster (grille de pixels)',
      'Le modèle Vecteur polygonal',
      'Une feuille de calcul sans géométrie',
      'Un fichier audio WAV',
    ],
    correctIndex: 0,
    explanation:
      'Les phénomènes continus (altitude MNT, température, imagerie satellite) sont stockés en mode Raster sous forme d’une matrice régulière de pixels géoréférencés.',
    steps: [
      'Vecteur = objets discrets (points, lignes, polygones).',
      'Raster = grille de pixels pour surfaces continues (MNT, satellite).',
    ],
    notion: 'SIG : Raster vs Vecteur',
    difficulty: 'facile',
    ficheId: 'fiche-sig-carto',
    source: 'Concours Géomatique & SIG 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-sig-3',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-carto',
    examIds: ['concours-urbanisme-sig', 'concours-mines-petrole'],
    prompt:
      'Sur une carte topographique, que signifie un fort rapprochement des courbes de niveau ?',
    options: [
      'Une zone parfaitement plate',
      'Une pente raide / un relief escarpé',
      'La présence certaine d’un lac',
      'Une erreur de projection GPS',
    ],
    correctIndex: 1,
    explanation:
      'À équidistance constante, plus les courbes de niveau sont proches horizontalement, plus le dénivelé varie vite sur une courte distance : la pente est forte.',
    steps: ['Pente = ΔH / D_horizontale : si D diminue pour un même ΔH, la pente augmente.'],
    notion: 'Lecture des courbes de niveau',
    difficulty: 'facile',
    ficheId: 'fiche-sig-carto',
    source: 'Annale Topographie 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-sig-4',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-urba',
    examIds: ['concours-urbanisme-sig', 'concours-genie-civil'],
    prompt:
      'Une parcelle urbaine mesure 800 m². Le règlement d’urbanisme impose un Coefficient d’Emprise au Sol (CES) maximal de 0,35. Quelle est la surface maximale constructible au sol ?',
    options: ['240 m²', '280 m²', '350 m²', '520 m²'],
    correctIndex: 1,
    explanation: 'S_emprise_max = S_parcelle × CES = 800 × 0,35 = 280 m².',
    steps: ['Appliquer CES = S_bâtie / S_parcelle.', 'S_bâtie = 800 × 0,35 = 280 m².'],
    notion: 'Coefficient d’Emprise au Sol (CES)',
    difficulty: 'moyen',
    ficheId: 'fiche-sig-urba',
    source: 'Concours Urbanisme & Aménagement 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-sig-5',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-urba',
    examIds: ['concours-urbanisme-sig'],
    prompt:
      'Pourquoi recommande-t-on de projeter des couches géographiques en UTM plutôt qu’en coordonnées géographiques WGS84 (degrés) pour calculer la superficie exacte d’une parcelle cadastrale ?',
    options: [
      'Parce que la projection UTM utilise le mètre comme unité métrique plane locale',
      'Parce que le système WGS84 ne fonctionne pas en Afrique',
      'Parce que l’UTM supprime le besoin de table attributaire',
      'Parce que l’UTM convertit automatiquement les données en image JPEG',
    ],
    correctIndex: 0,
    explanation:
      'WGS84 (EPSG:4326) exprime les positions en degrés d’angle dont la longueur en mètres varie avec la latitude ; la projection UTM offre un repère cartésien en mètres précis par fuseau.',
    steps: ['Calculs de distances et surfaces fiables ⇒ système de coordonnées projeté métrique (UTM).'],
    notion: 'Projections géodésiques WGS84 / UTM',
    difficulty: 'moyen',
    ficheId: 'fiche-sig-carto',
    source: 'Concours Géomatique 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },

  // SANTÉ MATERNELLE, OBSTÉTRIQUE & PÉDIATRIE (5)
  {
    id: 'q-obs-1',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-cpn',
    examIds: ['concours-sante-maternelle', 'concours-medecine', 'concours-paramedical'],
    prompt:
      'Quels sont les deux signes clés définissant la pré-éclampsie survenant après 20 semaines d’aménorrhée ?',
    options: [
      'Fièvre modérée et toux sèche',
      'Hypertension artérielle (≥ 140/90 mmHg) et protéinurie significative',
      'Hypotension artérielle et hypoglycémie',
      'Anémie légère isolée sans autre symptôme',
    ],
    correctIndex: 1,
    explanation:
      'La pré-éclampsie associe après 20 SA une HTA ≥ 140/90 mmHg et une protéinurie (≥ 0,3 g/24 h), exposant au risque vital d’éclampsie.',
    steps: ['Critère temporel : > 20 SA.', 'Critères clinico-biologiques : TA ≥ 140/90 mmHg + protéinurie.'],
    notion: 'Diagnostic de la pré-éclampsie',
    difficulty: 'facile',
    ficheId: 'fiche-obs-cpn',
    source: 'Annale INFAS Sages-Femmes 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-obs-2',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-cpn',
    examIds: ['concours-sante-maternelle', 'concours-paramedical'],
    prompt:
      'Quel médicament est recommandé en première intention pour prévenir et traiter les crises convulsives de l’éclampsie ?',
    options: [
      'Le paracétamol',
      'Le sulfate de magnésium (MgSO₄)',
      'L’amoxicilline orale',
      'La vitamine C',
    ],
    correctIndex: 1,
    explanation:
      'Le sulfate de magnésium (MgSO₄) est le traitement anticonvulsivant de référence mondiale (OMS) dans l’éclampsie et la pré-éclampsie sévère.',
    steps: ['Protocole OMS SONU : Sulfate de magnésium + antihypertenseur + extraction obstétricale.'],
    notion: 'Urgence éclampsie (SONU)',
    difficulty: 'moyen',
    ficheId: 'fiche-obs-cpn',
    source: 'Annale ENASS / INFAS 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-obs-3',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-neonat',
    examIds: ['concours-sante-maternelle', 'concours-medecine'],
    prompt:
      'À 1 minute de vie, un nouveau-né présente un score d’Apgar égal à 9/10. Comment interpréter ce résultat ?',
    options: [
      'État critique exigeant une réanimation cardiaque immédiate',
      'Bonne adaptation extra-utérine du nouveau-né',
      'Signe formel d’infection néonatale sévère',
      'Score impossible car le maximum est 5',
    ],
    correctIndex: 1,
    explanation:
      'Le score d’Apgar est noté sur 10 (5 critères × 2 points). Un score ≥ 7 (ici 9/10) témoigne d’une excellente adaptation à la vie extra-utérine.',
    steps: ['Seuils Apgar : ≥ 7 normal ; 4–6 modéré ; ≤ 3 détresse sévère.'],
    notion: 'Interprétation du score d’Apgar',
    difficulty: 'facile',
    ficheId: 'fiche-obs-neonat',
    source: 'Annale Sages-Femmes 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-obs-4',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-neonat',
    examIds: ['concours-sante-maternelle', 'concours-nutrition'],
    prompt:
      'Selon les recommandations de l’OMS, quelle est la durée recommandée de l’allaitement maternel exclusif (sans eau ni autre aliment) ?',
    options: [
      'Les 2 premiers mois',
      'Les 6 premiers mois',
      'Uniquement la première semaine',
      'Les 18 premiers mois sans aucun aliment solide',
    ],
    correctIndex: 1,
    explanation:
      'L’OMS recommande l’allaitement maternel exclusif durant les 6 premiers mois (0–6 mois), puis une diversification progressive tout en poursuivant l’allaitement jusqu’à 2 ans ou plus.',
    steps: ['0–6 mois : lait maternel exclusif (y compris colostrum dès la 1re heure).'],
    notion: 'Allaitement maternel exclusif OMS',
    difficulty: 'facile',
    ficheId: 'fiche-obs-neonat',
    source: 'Annale Santé Maternelle & Nutrition 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-obs-5',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-cpn',
    examIds: ['concours-sante-maternelle', 'concours-medecine'],
    prompt:
      'Pourquoi la supplémentation précoce en acide folique (vitamine B9) est-elle essentielle en début de grossesse ?',
    options: [
      'Pour prévenir les anomalies de fermeture du tube neural chez le fœtus (ex. spina bifida)',
      'Pour remplacer totalement la vaccination antitétanique',
      'Pour provoquer le déclenchement de l’accouchement',
      'Pour guérir la tuberculose pulmonaire',
    ],
    correctIndex: 0,
    explanation:
      'L’acide folique (vitamine B9), idéalement débuté en périconceptionnel et au 1er trimestre, réduit fortement le risque de malformations du tube neural et d’anémie mégaloblastique.',
    steps: ['Vitamine B9 (folates) = fermeture du tube neural + érythropoïèse.'],
    notion: 'Supplémentation prénatale fer-folates',
    difficulty: 'moyen',
    ficheId: 'fiche-obs-cpn',
    source: 'Annale INFAS 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // COMMERCE INTERNATIONAL, TRANSIT & INCOTERMS (5)
  {
    id: 'q-mar-1',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-incoterms',
    examIds: ['concours-transit-maritime', 'concours-police-douanes', 'certif-supply-rh'],
    prompt:
      'Dans un contrat conclu sous l’Incoterm 2020 CIF Douala, à quel moment précis le risque de perte ou d’avarie de la marchandise est-il transféré du vendeur à l’acheteur ?',
    options: [
      'À l’arrivée du navire au port de Douala',
      'Dès que la marchandise est chargée à bord du navire au port d’embarquement',
      'Dans l’entrepôt final de l’acheteur après dédouanement',
      'Au moment de la signature du devis commercial',
    ],
    correctIndex: 1,
    explanation:
      'Piège classique ! En CIF, le vendeur paie le fret et une assurance minimale jusqu’au port de destination, mais le transfert du risque intervient dès la mise à bord au port d’embarquement.',
    steps: [
      'Distinguer transfert des frais (port de destination en CIF) et transfert des risques (mise à bord au port de départ).',
    ],
    notion: 'Transfert des risques en Incoterm CIF',
    difficulty: 'difficile',
    ficheId: 'fiche-mar-incoterms',
    source: 'Annale Douane & Transit International 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-mar-2',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-incoterms',
    examIds: ['concours-transit-maritime', 'certif-supply-rh'],
    prompt:
      'Quel Incoterm 2020 impose l’obligation maximale au vendeur, incluant le dédouanement à l’importation et le paiement des droits et taxes dans le pays de destination ?',
    options: ['EXW', 'FCA', 'FOB', 'DDP'],
    correctIndex: 3,
    explanation:
      'DDP (Delivered Duty Paid — Rendu Droits Acquittés) représente l’engagement maximal du vendeur, à l’opposé exact d’EXW.',
    steps: ['Échelle des obligations vendeur : EXW (minimum) → … → DDP (maximum, droits import payés).'],
    notion: 'Incoterm DDP vs EXW',
    difficulty: 'facile',
    ficheId: 'fiche-mar-incoterms',
    source: 'Annale Commerce International 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-mar-3',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-douane',
    examIds: ['concours-transit-maritime', 'concours-police-douanes'],
    prompt:
      'Quelle caractéristique juridique distingue le connaissement maritime « à ordre » (Bill of Lading) de la Lettre de Transport Aérien (LTA) ?',
    options: [
      'Le connaissement maritime est un titre représentatif négociable de la marchandise',
      'Le connaissement maritime ne mentionne jamais la nature de la marchandise',
      'La LTA est réservée aux navires pétroliers',
      'Le connaissement maritime dispense totalement de déclaration en douane',
    ],
    correctIndex: 0,
    explanation:
      'Le Bill of Lading établi « à ordre » est endossable et confère le droit de réclamer la marchandise au port d’arrivée ; la LTA aérienne n’est pas un titre négociable.',
    steps: ['3 fonctions du B/L : reçu + contrat de transport + titre représentatif négociable.'],
    notion: 'Connaissement maritime (Bill of Lading)',
    difficulty: 'moyen',
    ficheId: 'fiche-mar-douane',
    source: 'Annale Transit Maritime 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-mar-4',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-douane',
    examIds: ['concours-transit-maritime', 'concours-police-douanes'],
    prompt:
      'Une marchandise importée a une valeur FOB de 12 000 000 FCFA, un fret maritime de 1 500 000 FCFA et une assurance de 500 000 FCFA. Si le taux de droit de douane (TEC) est de 10 % sur la valeur CIF, quel est le montant des droits de douane ?',
    options: ['1 200 000 FCFA', '1 350 000 FCFA', '1 400 000 FCFA', '2 000 000 FCFA'],
    correctIndex: 2,
    explanation:
      'Valeur CIF = 12 000 000 + 1 500 000 + 500 000 = 14 000 000 FCFA. Droits de douane = 10 % × 14 000 000 = 1 400 000 FCFA.',
    steps: [
      'Calculer CIF = FOB + Fret + Assurance = 14 000 000 FCFA.',
      'Appliquer 10 % : 14 000 000 × 0,10 = 1 400 000 FCFA.',
    ],
    notion: 'Calcul de la valeur en douane CIF',
    difficulty: 'moyen',
    ficheId: 'fiche-mar-douane',
    source: 'Annale Douanes CEMAC/UEMOA 2026',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-mar-5',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-douane',
    examIds: ['concours-transit-maritime', 'certif-supply-rh'],
    prompt:
      'Un porte-conteneurs décharge 150 conteneurs de 20 pieds et 100 conteneurs de 40 pieds. Quel volume total cela représente-t-il en EVP (Équivalent Vingt Pieds) ?',
    options: ['250 EVP', '300 EVP', '350 EVP', '400 EVP'],
    correctIndex: 2,
    explanation:
      'Un conteneur de 20’ = 1 EVP et un conteneur de 40’ = 2 EVP. Total = 150 × 1 + 100 × 2 = 350 EVP.',
    steps: ['150 × 1 = 150 EVP.', '100 × 2 = 200 EVP.', 'Total = 150 + 200 = 350 EVP.'],
    notion: 'Conteneurisation et unité EVP (TEU)',
    difficulty: 'facile',
    ficheId: 'fiche-mar-douane',
    source: 'Concours Logistique Portuaire 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // DROIT NUMÉRIQUE & PROTECTION DES DONNÉES (5)
  {
    id: 'q-dnum-1',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-rgpd',
    examIds: ['certif-droit-numerique', 'concours-magistrature', 'certif-fintech-microfinance'],
    prompt:
      'Dans le cadre du RGPD, quel est le délai maximal pour notifier une violation de données personnelles à risque à l’autorité de contrôle après en avoir pris connaissance ?',
    options: ['24 heures', '72 heures', '15 jours', '3 mois'],
    correctIndex: 1,
    explanation:
      'L’article 33 du RGPD impose une notification à l’autorité de contrôle dans les meilleurs délais et au plus tard 72 heures après la prise de connaissance.',
    steps: ['Délai réglementaire standard de notification de faille = 72 heures.'],
    notion: 'Notification de violation de données (72 h)',
    difficulty: 'facile',
    ficheId: 'fiche-dnum-rgpd',
    source: 'Certification DPO & RGPD 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-dnum-2',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-rgpd',
    examIds: ['certif-droit-numerique', 'certif-data-ia'],
    prompt:
      'Quel principe de protection des données interdit à une application scolaire d’exiger des informations sans lien avec la finalité (ex. groupe sanguin ou opinions politiques) ?',
    options: [
      'Le principe de minimisation des données',
      'Le principe de duplication illimitée',
      'Le principe de libre revente commerciale',
      'Le principe d’anonymat fiscal',
    ],
    correctIndex: 0,
    explanation:
      'Le principe de minimisation impose de ne collecter que les données adéquates, pertinentes et strictement limitées à ce qui est nécessaire au regard des finalités poursuivies.',
    steps: ['Finalité précise ⇒ collecte strictement limitée au nécessaire (minimisation).'],
    notion: 'Principe de minimisation des données',
    difficulty: 'facile',
    ficheId: 'fiche-dnum-rgpd',
    source: 'Certification Droit Numérique 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-dnum-3',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-rgpd',
    examIds: ['certif-droit-numerique', 'concours-magistrature'],
    prompt:
      'Quel traité continental adopté par l’Union Africaine en 2014 encadre à la fois la cybersécurité et la protection des données à caractère personnel en Afrique ?',
    options: [
      'La Convention de Malabo',
      'Le Traité de Kyoto',
      'La Charte de Vienne sur les océans',
      'Les Accords de Bretton Woods',
    ],
    correctIndex: 0,
    explanation:
      'La Convention de l’Union Africaine sur la cybersécurité et la protection des données à caractère personnel, adoptée à Malabo (Guinée équatoriale) en juin 2014, constitue le cadre panafricain de référence.',
    steps: ['UA 2014 cybersécurité + données personnelles = Convention de Malabo.'],
    notion: 'Convention de Malabo (UA)',
    difficulty: 'moyen',
    ficheId: 'fiche-dnum-rgpd',
    source: 'Annale Droit du Numérique Africain 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-dnum-4',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-ia',
    examIds: ['certif-droit-numerique', 'concours-magistrature'],
    prompt:
      'À quelles deux conditions cumulatives un écrit électronique dispose-t-il de la même force probante qu’un écrit sur support papier ?',
    options: [
      'Être imprimé en couleur et envoyé par messagerie sociale',
      'Identifier dûment la personne dont il émane et être conservé dans des conditions garantissant son intégrité',
      'Contenir moins de 200 mots et être rédigé en anglais',
      'Être stocké uniquement sur une clé USB non chiffrée',
    ],
    correctIndex: 1,
    explanation:
      'Le droit de la preuve électronique reconnaît l’équivalence avec le papier si deux conditions sont réunies : identification fiable de l’auteur et garantie d’intégrité du document.',
    steps: ['Deux piliers de la preuve électronique : Identité + Intégrité.'],
    notion: 'Force probante de l’écrit électronique',
    difficulty: 'moyen',
    ficheId: 'fiche-dnum-ia',
    source: 'Annale Magistrature & Cyberdroit 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-dnum-5',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-ia',
    examIds: ['certif-droit-numerique', 'certif-data-ia'],
    prompt:
      'Dans l’approche réglementaire par les risques de l’IA (modèle AI Act), quelle obligation clé s’impose aux systèmes d’IA classés « à haut risque » (recrutement, octroi de crédit, santé) ?',
    options: [
      'Aucune règle particulière tant que le modèle est payant',
      'Gouvernance rigoureuse des données, transparence, auditabilité et supervision humaine effective',
      'Interdiction totale d’utiliser un ordinateur',
      'Publication publique des mots de passe des utilisateurs',
    ],
    correctIndex: 1,
    explanation:
      'Les systèmes d’IA à haut risque impactant les droits fondamentaux doivent garantir la qualité des données d’entraînement, la traçabilité, la gestion des biais et un contrôle humain effectif.',
    steps: ['IA à haut risque = exigences strictes : données gouvernées + audit + supervision humaine.'],
    notion: 'Gouvernance et régulation de l’IA',
    difficulty: 'moyen',
    ficheId: 'fiche-dnum-ia',
    source: 'Certification IA Responsable 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },

  // CHIMIE ORGANIQUE & BIOCHIMIE (5)
  {
    id: 'q-chim-1',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-fonctions',
    examIds: ['bac-scientifique', 'concours-medecine', 'concours-sante-maternelle'],
    prompt:
      'Quel groupe fonctionnel caractérise un acide carboxylique (comme l’acide éthanoïque) ?',
    options: ['–OH', '–CHO', '–COOH', '–NH₂'],
    correctIndex: 2,
    explanation:
      'Le groupe carboxyle –COOH caractérise les acides carboxyliques ; –OH correspond aux alcools, –CHO aux aldéhydes et –NH₂ aux amines.',
    steps: ['Acide carboxylique = groupe carboxyle –COOH.'],
    notion: 'Groupes fonctionnels organiques',
    difficulty: 'facile',
    ficheId: 'fiche-chim-fonctions',
    source: 'Annale Bac S / Concours Médecine 2025',
    isOfficial: true,
    estimatedSeconds: 20,
  },
  {
    id: 'q-chim-2',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-fonctions',
    examIds: ['bac-scientifique', 'concours-medecine', 'concours-agronomie'],
    prompt:
      'Quelle est la différence fondamentale entre une réaction d’estérification directe et une réaction de saponification ?',
    options: [
      'L’estérification est limitée (réversible), tandis que la saponification est totale',
      'L’estérification produit du savon, tandis que la saponification produit un acide',
      'La saponification est instantanée à 0 °C',
      'L’estérification ne nécessite aucun alcool',
    ],
    correctIndex: 0,
    explanation:
      'L’estérification (Acide + Alcool ⇌ Ester + Eau) est lente et limitée, alors que la saponification (Ester + HO⁻ → Carboxylate + Alcool) est lente mais TOTALE.',
    steps: ['Estérification : ⇌ (limitée).', 'Saponification : → (totale, fabrique le savon).'],
    notion: 'Estérification vs Saponification',
    difficulty: 'moyen',
    ficheId: 'fiche-chim-fonctions',
    source: 'Annale Bac Scientifique 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-chim-3',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-fonctions',
    examIds: ['bac-scientifique', 'concours-medecine'],
    prompt:
      'L’oxydation ménagée d’un alcool secondaire (ex. propan-2-ol) par un oxydant en milieu acide conduit à :',
    options: ['Un aldéhyde puis un acide', 'Une cétone', 'Aucune réaction', 'Un alcane gazeux'],
    correctIndex: 1,
    explanation:
      'Un alcool secondaire possède un seul hydrogène sur le carbone fonctionnel : son oxydation ménagée forme une cétone (ex. propanone) qui ne s’oxyde pas davantage de façon ménagée.',
    steps: ['Alcool primaire → aldéhyde → acide ; Alcool secondaire → cétone ; Alcool tertiaire → rien.'],
    notion: 'Oxydation ménagée des alcools',
    difficulty: 'moyen',
    ficheId: 'fiche-chim-fonctions',
    source: 'Annale Bac S 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-chim-4',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-bio',
    examIds: ['concours-medecine', 'concours-sante-maternelle', 'concours-veterinaire'],
    prompt:
      'Quelle liaison covalente relie deux acides aminés successifs au sein d’une chaîne protéique ?',
    options: [
      'La liaison peptidique (–CO–NH–)',
      'La liaison ionique saline',
      'La liaison métallique',
      'La liaison glycosidique',
    ],
    correctIndex: 0,
    explanation:
      'La condensation du groupe carboxyle –COOH d’un acide aminé avec le groupe amine –NH₂ du suivant forme une liaison amide appelée liaison peptidique (–CO–NH–).',
    steps: ['Protéines = polymères d’acides aminés unis par liaisons peptidiques.'],
    notion: 'Structure des protéines (liaison peptidique)',
    difficulty: 'facile',
    ficheId: 'fiche-chim-bio',
    source: 'Annale Biochimie Médecine/Vétérinaire 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-chim-5',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-bio',
    examIds: ['concours-medecine', 'concours-veterinaire', 'concours-agronomie'],
    prompt:
      'Comment agit une enzyme sur une réaction biochimique dans la cellule ?',
    options: [
      'Elle abaisse l’énergie d’activation pour accélérer la réaction, sans être consommée',
      'Elle est définitivement détruite à chaque molécule de substrat transformée',
      'Elle modifie la loi de conservation de la masse',
      'Elle fonctionne mieux à 100 °C qu’à 37 °C',
    ],
    correctIndex: 0,
    explanation:
      'En tant que biocatalyseur, l’enzyme abaisse la barrière d’énergie d’activation et accélère la réaction tout en étant régénérée intacte à la fin.',
    steps: ['Catalyseur biologique = abaisse E_a + spécifique + régénéré en fin de réaction.'],
    notion: 'Catalyse enzymatique',
    difficulty: 'moyen',
    ficheId: 'fiche-chim-bio',
    source: 'Annale Concours Santé 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // GESTION DE CRISE, HUMANITAIRE & SÉCURITÉ CIVILE (5)
  {
    id: 'q-cris-1',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-cycle',
    examIds: ['concours-admin', 'concours-urbanisme-sig', 'concours-police-douanes'],
    prompt:
      'Dans le cycle de gestion des catastrophes (Cadre de Sendai), quelle est la séquence logique des 4 grandes phases ?',
    options: [
      'Réponse → Prévention → Oubli → Sanctions',
      'Prévention/Mitigation → Préparation → Réponse d’urgence → Relèvement',
      'Relèvement → Alerte → Construction → Sinistre',
      'Achat → Distribution → Fermeture → Archive',
    ],
    correctIndex: 1,
    explanation:
      'Le cycle continu articule la Prévention (réduire les risques), la Préparation (alerte et plans), la Réponse (secours immédiats) et le Relèvement (reconstruire en mieux).',
    steps: ['Ordre chronologique : Avant (Prévention + Préparation) → Pendant (Réponse) → Après (Relèvement).'],
    notion: 'Cycle de gestion des catastrophes',
    difficulty: 'facile',
    ficheId: 'fiche-cris-cycle',
    source: 'Annale ENAM & Sécurité Civile 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-cris-2',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-sphere',
    examIds: ['concours-diplomatie', 'concours-admin'],
    prompt:
      'Quel principe humanitaire impose de fournir l’assistance uniquement en fonction de l’urgence des besoins, sans aucune discrimination de nationalité, d’ethnie, de religion ou d’opinion ?',
    options: ['L’impartialité', 'La rentabilité', 'La réciprocité commerciale', 'La souveraineté fiscale'],
    correctIndex: 0,
    explanation:
      'L’impartialité exige d’aider les victimes selon les seuls besoins vitaux, sans discrimination. La neutralité interdit de prendre parti dans un conflit.',
    steps: ['Besoin uniquement, zéro discrimination = Impartialité.', 'Ne pas prendre parti = Neutralité.'],
    notion: 'Principes humanitaires fondamentaux',
    difficulty: 'facile',
    ficheId: 'fiche-cris-sphere',
    source: 'Annale Diplomatie & Action Humanitaire 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-cris-3',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-sphere',
    examIds: ['concours-admin', 'concours-diplomatie'],
    prompt:
      'Selon les standards minimaux du manuel Sphère en situation d’urgence humanitaire, quelle est la quantité minimale d’eau potable recommandée par personne et par jour (boisson, cuisine et hygiène de base) ?',
    options: ['2 litres', '5 litres', '15 litres', '120 litres'],
    correctIndex: 2,
    explanation:
      'La norme Sphère WASH fixe un minimum vital de 15 litres d’eau potable par personne et par jour (avec un point d’eau à ≤ 500 m).',
    steps: ['Repère Sphère WASH à mémoriser : ≥ 15 L/pers/jour.'],
    notion: 'Normes minimales Sphère (WASH)',
    difficulty: 'moyen',
    ficheId: 'fiche-cris-sphere',
    source: 'Annale Coordination Humanitaire 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-cris-4',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-sphere',
    examIds: ['concours-police-douanes', 'concours-admin'],
    prompt:
      'Lors d’un triage médical de masse (protocole START), quelle couleur est attribuée à une victime présentant une détresse vitale immédiate mais sauvable par une prise en charge rapide ?',
    options: ['Vert', 'Jaune', 'Rouge', 'Noir'],
    correctIndex: 2,
    explanation:
      'Dans le triage START, le code Rouge désigne l’urgence absolue prioritaire ; Jaune = urgence différée ; Vert = blessé léger marchant ; Noir = décédé ou dépassé.',
    steps: ['Rouge = priorité vitale immédiate ; Jaune = différé ; Vert = léger ; Noir = décédé.'],
    notion: 'Triage d’urgence START',
    difficulty: 'facile',
    ficheId: 'fiche-cris-sphere',
    source: 'Annale Sécurité Civile & Secours 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-cris-5',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-cycle',
    examIds: ['concours-admin', 'concours-urbanisme-sig', 'certif-droit-numerique'],
    prompt:
      'Selon l’équation fondamentale de la gestion des risques de catastrophes, comment évolue le risque pour un même aléa si l’on réduit la vulnérabilité et qu’on renforce les capacités locales ?',
    options: [
      'Le risque diminue nettement',
      'Le risque double automatiquement',
      'Le risque reste strictement inchangé',
      'L’aléa météorologique disparaît définitivement',
    ],
    correctIndex: 0,
    explanation:
      'Risque = (Aléa × Exposition × Vulnérabilité) / Capacités : baisser le numérateur (vulnérabilité) et augmenter le dénominateur (capacités) réduit fortement le risque de catastrophe.',
    steps: ['Analyser la fraction Risque = (A × E × V) / C : V↓ et C↑ ⇒ Risque↓.'],
    notion: 'Équation du risque de catastrophe',
    difficulty: 'moyen',
    ficheId: 'fiche-cris-cycle',
    source: 'Annale Gestion des Risques 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },
];

export const HORIZON_ANNALES: Annale[] = [
  {
    id: 'ann-sig-2026',
    examId: 'concours-urbanisme-sig',
    subjectId: 'urbanisme_sig',
    chapterIds: ['ch-sig-carto', 'ch-sig-urba'],
    year: 2026,
    countryOrZone: 'Afrique Francophone',
    title: 'Concours Urbanisme & Géomatique — Cartographie, SIG & CES (2026)',
    durationMinutes: 45,
    difficulty: 'moyen',
    questionIds: ['q-sig-1', 'q-sig-2', 'q-sig-3', 'q-sig-4', 'q-sig-5'],
    examType: 'Concours Technique',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 148,
    shareable: true,
    instructions: 'Calculatrice simple autorisée. Convertissez toujours les échelles en mètres.',
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-sig-gc-2025',
    examId: 'concours-urbanisme-sig',
    subjectId: 'genie_civil_btp',
    chapterIds: ['ch-sig-carto', 'ch-sig-urba'],
    year: 2025,
    countryOrZone: 'CEMAC / UEMOA',
    title: 'Épreuve Combinée Aménagement, Topographie & Ouvrages BTP (2025)',
    durationMinutes: 45,
    difficulty: 'moyen',
    questionIds: ['q-sig-1', 'q-sig-4', 'q-gc-1', 'q-gc-3', 'q-gc-4'],
    examType: 'Concours Ingénieur / BTP',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 145,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-obs-2026',
    examId: 'concours-sante-maternelle',
    subjectId: 'obstetrique_pediatrie',
    chapterIds: ['ch-obs-cpn', 'ch-obs-neonat'],
    year: 2026,
    countryOrZone: 'INFAS / ENASS',
    title: 'Concours Sages-Femmes — CPN, Pré-éclampsie, Apgar & PEV (2026)',
    durationMinutes: 45,
    difficulty: 'moyen',
    questionIds: ['q-obs-1', 'q-obs-2', 'q-obs-3', 'q-obs-4', 'q-obs-5'],
    examType: 'Concours Santé',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 142,
    shareable: true,
    instructions: 'Répondez selon les protocoles cliniques OMS / SONU en vigueur.',
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-obs-nutri-2025',
    examId: 'concours-sante-maternelle',
    subjectId: 'nutrition_sante',
    chapterIds: ['ch-obs-neonat'],
    year: 2025,
    countryOrZone: 'Sahel / OMS',
    title: 'Épreuve Santé Maternelle, Allaitement & Nutrition Infantile (2025)',
    durationMinutes: 40,
    difficulty: 'facile',
    questionIds: ['q-obs-3', 'q-obs-4', 'q-nut-1', 'q-nut-3', 'q-nut-4'],
    examType: 'Concours Santé',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 138,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-mar-2026',
    examId: 'concours-transit-maritime',
    subjectId: 'commerce_maritime',
    chapterIds: ['ch-mar-incoterms', 'ch-mar-douane'],
    year: 2026,
    countryOrZone: 'Corridors Douala / Abidjan / Dakar',
    title: 'Concours Transit & Douane — Incoterms 2020, B/L & Valeur CIF (2026)',
    durationMinutes: 50,
    difficulty: 'difficile',
    questionIds: ['q-mar-1', 'q-mar-2', 'q-mar-3', 'q-mar-4', 'q-mar-5'],
    examType: 'Concours Douane & Transit',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 156,
    shareable: true,
    instructions: 'Distinguez rigoureusement transfert des frais et transfert des risques.',
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-mar-log-2025',
    examId: 'concours-transit-maritime',
    subjectId: 'logistique_ci',
    chapterIds: ['ch-mar-incoterms', 'ch-mar-douane'],
    year: 2025,
    countryOrZone: 'UEMOA / CEMAC',
    title: 'Épreuve Chaîne Portuaire, EVP & Supply Chain Internationale (2025)',
    durationMinutes: 45,
    difficulty: 'moyen',
    questionIds: ['q-mar-1', 'q-mar-2', 'q-mar-5', 'q-log-1', 'q-log-3'],
    examType: 'Concours Logistique',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 146,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-dnum-2026',
    examId: 'certif-droit-numerique',
    subjectId: 'droit_numerique',
    chapterIds: ['ch-dnum-rgpd', 'ch-dnum-ia'],
    year: 2026,
    countryOrZone: 'International / UA',
    title: 'Certification DPO — RGPD, Malabo, Preuve Électronique & IA (2026)',
    durationMinutes: 45,
    difficulty: 'moyen',
    questionIds: ['q-dnum-1', 'q-dnum-2', 'q-dnum-3', 'q-dnum-4', 'q-dnum-5'],
    examType: 'Certification Professionnelle',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 149,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-dnum-cyber-2025',
    examId: 'certif-droit-numerique',
    subjectId: 'cybersecurite',
    chapterIds: ['ch-dnum-rgpd', 'ch-dnum-ia'],
    year: 2025,
    countryOrZone: 'Francophonie',
    title: 'Cas Pratique Cybersécurité, Violation 72 h & Conformité IA (2025)',
    durationMinutes: 40,
    difficulty: 'moyen',
    questionIds: ['q-dnum-1', 'q-dnum-4', 'q-dnum-5', 'q-cy-1', 'q-cy-2'],
    examType: 'Certification DPO / Cyber',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 140,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-chim-2026',
    examId: 'bac-scientifique',
    subjectId: 'chimie_organique',
    chapterIds: ['ch-chim-fonctions', 'ch-chim-bio'],
    year: 2026,
    countryOrZone: 'Bac S / D',
    title: 'Annale Bac Scientifique — Chimie Organique & Biochimie (2026)',
    durationMinutes: 50,
    difficulty: 'moyen',
    questionIds: ['q-chim-1', 'q-chim-2', 'q-chim-3', 'q-chim-4', 'q-chim-5'],
    examType: 'Baccalauréat',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 152,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-chim-med-2025',
    examId: 'concours-medecine',
    subjectId: 'chimie_organique',
    chapterIds: ['ch-chim-fonctions', 'ch-chim-bio'],
    year: 2025,
    countryOrZone: 'Facultés de Médecine',
    title: 'Concours Médecine — Fonctions Organiques, Protéines & Enzymes (2025)',
    durationMinutes: 45,
    difficulty: 'difficile',
    questionIds: ['q-chim-1', 'q-chim-2', 'q-chim-4', 'q-chim-5', 'q-anat-1'],
    examType: 'Concours Médecine',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 148,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-cris-2026',
    examId: 'concours-admin',
    subjectId: 'gestion_crises',
    chapterIds: ['ch-cris-cycle', 'ch-cris-sphere'],
    year: 2026,
    countryOrZone: 'ENAM / Protection Civile',
    title: 'Épreuve Gestion de Crise, Sendai, Normes Sphère & Triage (2026)',
    durationMinutes: 45,
    difficulty: 'moyen',
    questionIds: ['q-cris-1', 'q-cris-2', 'q-cris-3', 'q-cris-4', 'q-cris-5'],
    examType: 'Concours Administratif',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 144,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-cris-diplo-2025',
    examId: 'concours-diplomatie',
    subjectId: 'gestion_crises',
    chapterIds: ['ch-cris-cycle', 'ch-cris-sphere'],
    year: 2025,
    countryOrZone: 'ONU / Francophonie',
    title: 'Concours Diplomatie — Principes Humanitaires & Coordination ONU (2025)',
    durationMinutes: 45,
    difficulty: 'moyen',
    questionIds: ['q-cris-1', 'q-cris-2', 'q-cris-3', 'q-ri-1', 'q-ri-3'],
    examType: 'Concours Diplomatie',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 142,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-douane-mar-2026',
    examId: 'concours-police-douanes',
    subjectId: 'commerce_maritime',
    chapterIds: ['ch-mar-incoterms', 'ch-mar-douane'],
    year: 2026,
    countryOrZone: 'Douanes Nationales',
    title: 'Concours Inspecteur des Douanes — Valeur CIF, B/L & Incoterms (2026)',
    durationMinutes: 45,
    difficulty: 'difficile',
    questionIds: ['q-mar-1', 'q-mar-3', 'q-mar-4', 'q-fp-1', 'q-eth-1'],
    examType: 'Concours Douanes',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 150,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
  {
    id: 'ann-magis-dnum-2026',
    examId: 'concours-magistrature',
    subjectId: 'droit_numerique',
    chapterIds: ['ch-dnum-rgpd', 'ch-dnum-ia'],
    year: 2026,
    countryOrZone: 'ENAM / Magistrature',
    title: 'Concours Magistrature — Preuve Électronique, Malabo & RGPD (2026)',
    durationMinutes: 45,
    difficulty: 'difficile',
    questionIds: ['q-dnum-1', 'q-dnum-3', 'q-dnum-4', 'q-d-1', 'q-eth-3'],
    examType: 'Concours Magistrature',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 151,
    shareable: true,
    bareme: '4 points par question — 20 points',
  },
];

export const HORIZON_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-sig-1',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-carto',
    question: 'Quelle distance réelle représente 1 cm sur une carte au 1/50 000 ?',
    answer: '50 000 cm = 500 mètres (0,5 km).',
    formula: 'D_réelle = d_carte × Dénominateur',
    example: '6 cm au 1/50 000 = 3 km.',
  },
  {
    id: 'fc-sig-2',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-carto',
    question: 'Quelle est la différence entre une couche Vecteur et une couche Raster en SIG ?',
    answer: 'Vecteur = points, lignes et polygones (cadastre, routes). Raster = grille de pixels (MNT, images satellites).',
    diagramId: 'couches_sig',
  },
  {
    id: 'fc-sig-3',
    subjectId: 'urbanisme_sig',
    chapterId: 'ch-sig-urba',
    question: 'Formule du Coefficient d’Emprise au Sol (CES) en urbanisme ?',
    answer: 'CES = Surface bâtie au sol / Surface totale de la parcelle.',
    formula: 'CES = S_bâtie / S_parcelle',
    example: '280 m² sur 800 m² ⇒ CES = 0,35.',
  },
  {
    id: 'fc-obs-1',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-cpn',
    question: 'Quels sont les 2 critères définissant une pré-éclampsie après 20 SA ?',
    answer: 'Hypertension artérielle ≥ 140/90 mmHg + protéinurie significative (≥ 0,3 g/24 h).',
    definition: 'Pathologie gravidique exposant au risque d’éclampsie.',
  },
  {
    id: 'fc-obs-2',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-neonat',
    question: 'Que signifient les 5 lettres du score d’Apgar ?',
    answer: 'Apparence (coloration), Pouls, Grimace (réactivité), Activité (tonus), Respiration (notés de 0 à 2 chacun = /10).',
    diagramId: 'score_apgar',
  },
  {
    id: 'fc-obs-3',
    subjectId: 'obstetrique_pediatrie',
    chapterId: 'ch-obs-neonat',
    question: 'Quel est le médicament de référence contre les convulsions de l’éclampsie ?',
    answer: 'Le sulfate de magnésium (MgSO₄).',
    definition: 'Protocole OMS SONU de 1re intention.',
  },
  {
    id: 'fc-mar-1',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-incoterms',
    question: 'En Incoterm 2020 CIF, où s’opère le transfert des risques entre vendeur et acheteur ?',
    answer: 'Dès la mise à bord du navire au port d’embarquement (même si le vendeur paie le fret et l’assurance jusqu’à destination).',
    diagramId: 'incoterms_chaine',
  },
  {
    id: 'fc-mar-2',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-douane',
    question: 'Quelles sont les 3 fonctions juridiques du connaissement maritime (Bill of Lading) ?',
    answer: '1) Reçu de la marchandise, 2) Preuve du contrat de transport, 3) Titre représentatif négociable (si établi « à ordre »).',
    definition: 'Contrairement à la LTA aérienne, le B/L à ordre est endossable.',
  },
  {
    id: 'fc-mar-3',
    subjectId: 'commerce_maritime',
    chapterId: 'ch-mar-douane',
    question: 'Combien d’EVP (TEU) vaut un conteneur maritime standard de 40 pieds ?',
    answer: '2 EVP (1 EVP = 1 conteneur de 20 pieds).',
    example: '150 × 20’ + 100 × 40’ = 350 EVP.',
  },
  {
    id: 'fc-dnum-1',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-rgpd',
    question: 'Quel est le délai maximal RGPD pour notifier une violation de données à risque à l’autorité ?',
    answer: '72 heures après la prise de connaissance de la violation.',
    definition: 'Article 33 du RGPD.',
  },
  {
    id: 'fc-dnum-2',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-rgpd',
    question: 'Quel texte de l’Union Africaine (2014) encadre cybersécurité et protection des données ?',
    answer: 'La Convention de Malabo.',
    definition: 'Socle panafricain de confiance numérique.',
  },
  {
    id: 'fc-dnum-3',
    subjectId: 'droit_numerique',
    chapterId: 'ch-dnum-ia',
    question: 'Quelles sont les 2 conditions d’équivalence probatoire de l’écrit électronique avec le papier ?',
    answer: '1) Identification fiable de l’auteur, 2) Garantie de l’intégrité du document dans le temps.',
  },
  {
    id: 'fc-chim-1',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-fonctions',
    question: 'Estérification vs Saponification : laquelle est totale et laquelle est limitée ?',
    answer: 'Estérification = lente et limitée (équilibrée) ; Saponification = lente et TOTALE (fabrication du savon).',
    diagramId: 'fonctions_chimie',
  },
  {
    id: 'fc-chim-2',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-fonctions',
    question: 'Que donne l’oxydation ménagée d’un alcool primaire, secondaire et tertiaire ?',
    answer: 'Primaire → aldéhyde puis acide carboxylique ; Secondaire → cétone ; Tertiaire → aucune réaction.',
  },
  {
    id: 'fc-chim-3',
    subjectId: 'chimie_organique',
    chapterId: 'ch-chim-bio',
    question: 'Comment appelle-t-on la liaison reliant deux acides aminés dans une protéine ?',
    answer: 'La liaison peptidique (–CO–NH–).',
    definition: 'Formée par condensation avec libération d’une molécule d’eau.',
  },
  {
    id: 'fc-cris-1',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-cycle',
    question: 'Quelles sont les 4 phases du cycle de gestion des catastrophes (Sendai) ?',
    answer: '1) Prévention/Mitigation, 2) Préparation, 3) Réponse d’urgence, 4) Relèvement (Build Back Better).',
    diagramId: 'cycle_crise',
  },
  {
    id: 'fc-cris-2',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-sphere',
    question: 'Quels sont les 4 principes humanitaires fondamentaux ?',
    answer: 'Humanité, Neutralité, Impartialité et Indépendance.',
  },
  {
    id: 'fc-cris-3',
    subjectId: 'gestion_crises',
    chapterId: 'ch-cris-sphere',
    question: 'Quel est le standard minimal Sphère en eau potable par personne et par jour en urgence ?',
    answer: 'Au moins 15 litres par personne et par jour (point d’eau à ≤ 500 m).',
    example: '2 000 personnes ⇒ au moins 30 000 L (30 m³)/jour.',
  },
];
