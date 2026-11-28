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

export const ZENITH_EXAMS: ExamTrack[] = [
  {
    id: 'concours-telecoms',
    name: 'Concours Télécoms, Réseaux, Fibre & Cloud (ESMT / SUP’PTIC / CCNA)',
    shortName: 'Télécoms & Réseaux',
    category: 'Concours télécoms & réseaux',
    description:
      'Préparation aux écoles de télécommunications et certifications réseaux : modèle OSI, IPv4/CIDR, fibre optique, 4G/5G, cybersécurité et électrotechnique.',
    level: 'Bac S / BTS / Licence',
    subjectIds: [
      'reseaux_telecoms',
      'informatique',
      'cybersecurite',
      'energies_renouv',
      'maths',
      'anglais',
    ],
    badgeColor: '#0369A1',
  },
  {
    id: 'concours-genie-civil',
    name: 'Concours Génie Civil, Architecture & Travaux Publics (EAMAU / ENSTP)',
    shortName: 'Génie Civil / BTP',
    category: 'Concours architecture & BTP',
    description:
      'Entrée en écoles d’architecture et travaux publics : résistance des matériaux (RDM), béton armé, topographie, métrés, maths, physique et gestion de projet.',
    level: 'Bac S / Bac+2',
    subjectIds: [
      'genie_civil_btp',
      'maths',
      'physique',
      'energies_renouv',
      'gestion_projet',
    ],
    badgeColor: '#9A3412',
  },
  {
    id: 'concours-journalisme',
    name: 'Concours Journalisme, Communication & Médias (ESSTIC / CESTI)',
    shortName: 'Journalisme / Comm.',
    category: 'Concours médias & communication',
    description:
      'Préparation aux écoles de journalisme et communication : pyramide inversée, fact-checking, rédaction administrative/note de synthèse, français, géopolitique et culture générale.',
    level: 'Bac à Master',
    subjectIds: [
      'journalisme_comm',
      'methodo_redaction',
      'francais',
      'culture_gen',
      'relations_inter',
      'anglais',
    ],
    badgeColor: '#7E22CE',
  },
  {
    id: 'concours-nutrition',
    name: 'Concours Nutrition, Diététique & Sécurité Alimentaire (Santé / PAM / OMS)',
    shortName: 'Nutrition & Santé',
    category: 'Concours santé & sécurité alimentaire',
    description:
      'Formation aux métiers de la nutrition clinique et humanitaire : macronutriments, IMC, dépistage de la malnutrition aiguë (MUAC), HACCP, santé publique et agronomie.',
    level: 'Bac S / Licence Santé',
    subjectIds: [
      'nutrition_sante',
      'sante_publique',
      'anatomie_physio',
      'agronomie_env',
      'svt',
      'statistiques',
    ],
    badgeColor: '#15803D',
  },
];

export const ZENITH_SUBJECTS: Subject[] = [
  {
    id: 'reseaux_telecoms',
    name: 'Réseaux, Télécoms, Fibre & 5G',
    shortName: 'Réseaux & Télécoms',
    examIds: ['concours-telecoms', 'bts-compta-info', 'concours-ingenieur', 'certif-data-ia'],
    color: '#0284C7',
    icon: 'Network',
    description:
      'Modèle OSI en 7 couches, TCP vs UDP, adressage IPv4/CIDR, routage, fibre optique, réseaux mobiles 4G/5G et qualité de service (QoS).',
    sizeKb: 465,
  },
  {
    id: 'genie_civil_btp',
    name: 'Génie Civil, BTP & Résistance des Matériaux',
    shortName: 'Génie Civil / RDM',
    examIds: ['concours-genie-civil', 'concours-energie-btp', 'concours-ingenieur'],
    color: '#C2410C',
    icon: 'HardHat',
    description:
      'Statique des poutres en flexion (M_max = P·L/4), béton armé (compression/traction), topographie, nivellement, métrés et sécurité chantier.',
    sizeKb: 450,
  },
  {
    id: 'journalisme_comm',
    name: 'Journalisme, Médias & Communication',
    shortName: 'Journalisme / Comm.',
    examIds: ['concours-journalisme', 'bac-litteraire', 'concours-diplomatie'],
    color: '#7E22CE',
    icon: 'Newspaper',
    description:
      'Règle des 5W, pyramide inversée, recoupement des sources, fact-checking, déontologie (Charte de Munich) et communication de crise.',
    sizeKb: 410,
  },
  {
    id: 'nutrition_sante',
    name: 'Nutrition, Diététique & Sécurité Alimentaire',
    shortName: 'Nutrition & HACCP',
    examIds: ['concours-nutrition', 'concours-paramedical', 'concours-medecine'],
    color: '#16A34A',
    icon: 'Apple',
    description:
      'Macronutriments (4-9-4 kcal/g), calcul IMC, dépistage malnutrition aiguë (périmètre brachial MUAC), méthode HACCP et chaîne du froid.',
    sizeKb: 430,
  },
  {
    id: 'tourisme_hotel',
    name: 'Tourisme, Hôtellerie & Patrimoine Durable',
    shortName: 'Tourisme & Hôtell.',
    examIds: ['certif-entrepreneuriat', 'certif-supply-rh', 'concours-diplomatie'],
    color: '#0891B2',
    icon: 'Compass',
    description:
      'Écotourisme, valorisation du patrimoine UNESCO (Ennedi, Lacs d’Ounianga, Zakouma), taux d’occupation (TO), prix moyen et RevPAR.',
    sizeKb: 395,
  },
  {
    id: 'methodo_redaction',
    name: 'Rédaction Administrative & Note de Synthèse',
    shortName: 'Rédaction Admin.',
    examIds: [
      'concours-admin',
      'concours-magistrature',
      'concours-journalisme',
      'concours-police-douanes',
      'concours-finances-banque',
    ],
    color: '#334155',
    icon: 'FileText',
    description:
      'Note de synthèse sur dossier, note administrative, rapport, procès-verbal vs compte rendu, style officiel et épreuve orale de concours.',
    sizeKb: 405,
  },
];

export const ZENITH_CHAPTERS: Chapter[] = [
  // Réseaux & Télécoms
  {
    id: 'ch-net-osi',
    subjectId: 'reseaux_telecoms',
    title: 'Modèle OSI, TCP/UDP & Adressage IPv4 / CIDR',
    order: 1,
    summary:
      'Les 7 couches OSI, encapsulation, différence TCP/UDP, masques de sous-réseau (/24, /26) et routage IP.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-net-osi',
    ficheId: 'fiche-net-osi',
  },
  {
    id: 'ch-net-fibre',
    subjectId: 'reseaux_telecoms',
    title: 'Fibre optique, Réseaux mobiles 4G/5G & Qualité de service',
    order: 2,
    summary:
      'Fibre monomode vs multimode, atténuation en dB, latence, bande passante, spectre radio 5G et QoS.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-net-fibre',
    ficheId: 'fiche-net-fibre',
  },
  // Génie Civil & BTP
  {
    id: 'ch-gc-rdm',
    subjectId: 'genie_civil_btp',
    title: 'Statique, Flexion des poutres & Béton armé',
    order: 1,
    summary:
      'Équilibre statique, réactions d’appuis, moment fléchissant maximal (PL/4, qL²/8), rôle complémentaire béton (compression) + acier (traction).',
    estimatedMinutes: 30,
    difficulty: 'difficile',
    courseId: 'course-gc-rdm',
    ficheId: 'fiche-gc-rdm',
  },
  {
    id: 'ch-gc-topo',
    subjectId: 'genie_civil_btp',
    title: 'Topographie, Métrés, Dosage béton & Sécurité chantier',
    order: 2,
    summary:
      'Nivellement direct (lecture arrière/avant), dosage ciment (350 kg/m³), rapport Eau/Ciment, devis quantitatif estimatif (DQE) et EPI.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-gc-topo',
    ficheId: 'fiche-gc-topo',
  },
  // Journalisme & Communication
  {
    id: 'ch-jour-redac',
    subjectId: 'journalisme_comm',
    title: 'Pyramide inversée, 5W, Fact-checking & Déontologie',
    order: 1,
    summary:
      'Hiérarchisation de l’information (5W), genres journalistiques, double recoupement des sources et Charte de Munich.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-jour-redac',
    ficheId: 'fiche-jour-redac',
  },
  {
    id: 'ch-jour-crise',
    subjectId: 'journalisme_comm',
    title: 'Communication stratégique, Digitale & Gestion de crise',
    order: 2,
    summary:
      'Plan de communication, ciblage, communication institutionnelle, lutte contre la désinformation et cellule de crise.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-jour-crise',
    ficheId: 'fiche-jour-crise',
  },
  // Nutrition & Santé
  {
    id: 'ch-nut-macro',
    subjectId: 'nutrition_sante',
    title: 'Macronutriments, Besoins énergétiques & Calcul IMC',
    order: 1,
    summary:
      'Densité calorique (4-9-4 kcal/g), équilibre glucides/lipides/protéines, interprétation de l’IMC (OMS) et micronutriments clés.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-nut-macro',
    ficheId: 'fiche-nut-macro',
  },
  {
    id: 'ch-nut-haccp',
    subjectId: 'nutrition_sante',
    title: 'Malnutrition aiguë (MUAC), Sécurité alimentaire & HACCP',
    order: 2,
    summary:
      'Seuils du périmètre brachial (MUAC < 115 mm MAS), aliments thérapeutiques prêts à l’emploi (ATPE) et les 7 principes HACCP.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-nut-haccp',
    ficheId: 'fiche-nut-haccp',
  },
  // Tourisme & Hôtellerie
  {
    id: 'ch-tour-eco',
    subjectId: 'tourisme_hotel',
    title: 'Écotourisme, Patrimoine UNESCO & Développement local',
    order: 1,
    summary:
      'Tourisme durable, sites emblématiques (Massif de l’Ennedi, Lacs d’Ounianga, Parc de Zakouma), capacité de charge et retombées locales.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-tour-eco',
    ficheId: 'fiche-tour-eco',
  },
  {
    id: 'ch-tour-yield',
    subjectId: 'tourisme_hotel',
    title: 'Indicateurs hôteliers (TO, PMC, RevPAR) & Yield Management',
    order: 2,
    summary:
      'Calcul du Taux d’Occupation, Prix Moyen par Chambre, RevPAR = TO × PMC et tarification dynamique selon la saisonnalité.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-tour-yield',
    ficheId: 'fiche-tour-yield',
  },
  // Rédaction Administrative & Note de Synthèse
  {
    id: 'ch-red-note',
    subjectId: 'methodo_redaction',
    title: 'Note de synthèse, Rapport, Compte rendu & Procès-verbal',
    order: 1,
    summary:
      'Neutralité de la note de synthèse, distinctions juridiques PV vs CR, structure officielle (timbre, objet, référence, signature).',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-red-note',
    ficheId: 'fiche-red-note',
  },
  {
    id: 'ch-red-oral',
    subjectId: 'methodo_redaction',
    title: 'Réussir l’oral de concours & la prise de parole structurée',
    order: 2,
    summary:
      'Présentation en 2 minutes, gestion des questions pièges du jury, posture professionnelle et méthode STAR.',
    estimatedMinutes: 20,
    difficulty: 'facile',
    courseId: 'course-red-oral',
    ficheId: 'fiche-red-oral',
  },
];

export const ZENITH_COURSES: Course[] = [
  // Réseaux & Télécoms
  {
    id: 'course-net-osi',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-osi',
    title: 'Modèle OSI, TCP/UDP & Adressage IPv4 / CIDR',
    durationMinutes: 30,
    sizeKb: 235,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-net-o1',
        heading: '1. Les 7 couches du modèle OSI et les protocoles clés',
        content:
          'Le modèle OSI décompose la communication réseau en 7 couches : 1 Physique (bits, câbles, fibre, ondes), 2 Liaison de données (trames, adresses MAC, Switch Ethernet/Wi-Fi), 3 Réseau (paquets, adresses IP, Routeur), 4 Transport (segments, ports TCP fiable orienté connexion vs UDP rapide sans connexion), 5 Session, 6 Présentation (chiffrement TLS, compression), 7 Application (HTTP/HTTPS, DNS, SMTP, SSH).',
        keyTakeaway:
          'Switch = Couche 2 (adresses MAC) ; Routeur = Couche 3 (adresses IP) ; TCP/UDP = Couche 4 (ports).',
        diagramId: 'modele_osi',
      },
      {
        id: 'sec-net-o2',
        heading: '2. Adressage IPv4 et calcul rapide de sous-réseaux CIDR',
        content:
          'Une adresse IPv4 comporte 32 bits (4 octets). En notation CIDR `/n`, `n` bits identifient le réseau et `(32 − n)` bits identifient les hôtes. Le nombre d’adresses IP utilisables pour des machines vaut `2^(32−n) − 2` (on retire l’adresse réseau et l’adresse de diffusion broadcast). Exemple : un réseau `/24` (masque 255.255.255.0) offre 2⁸ − 2 = 254 hôtes utilisables.',
        keyTakeaway:
          'Retenir `/24` → 254 hôtes, `/25` → 126 hôtes, `/26` → 62 hôtes, `/30` → 2 hôtes (liaison point-à-point).',
        formula: 'Hôtes utilisables IPv4 = 2^(32 − n) − 2',
      },
    ],
  },
  {
    id: 'course-net-fibre',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-fibre',
    title: 'Fibre optique, Réseaux mobiles 4G/5G & Qualité de service',
    durationMinutes: 25,
    sizeKb: 215,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-net-f1',
        heading: '1. Fibre optique monomode vs multimode et bilan de liaison',
        content:
          'La fibre optique transporte l’information par impulsions lumineuses (réflexion totale interne dans le cœur de silice), insensible aux perturbations électromagnétiques. La fibre monomode (cœur très fin ≈ 9 µm, laser) couvre des dizaines de kilomètres (dorsales nationales, liaisons interurbaines), tandis que la fibre multimode (cœur 50/62,5 µm, LED) est économique sur courtes distances (campus, datacenter < 500 m).',
        keyTakeaway:
          'Longue distance (backbones, FTTH) = Monomode (9 µm) ; Courte distance (bâtiment/LAN) = Multimode (50 µm).',
        formula: 'Gain/Perte en dB : G_dB = 10 · log₁₀(P_sortie / P_entrée)   |   −3 dB = puissance divisée par 2',
      },
      {
        id: 'sec-net-f2',
        heading: '2. Évolution 4G → 5G et indicateurs QoS',
        content:
          'La qualité de service (QoS) d’un réseau s’évalue par 4 métriques : le débit (bps), la latence (délai aller-retour RTT en ms), la gigue (variation de latence critique en VoIP/visio) et le taux de perte de paquets. La 5G vise trois usages : très haut débit mobile (eMBB), latence ultra-faible (< 1–5 ms, URLLC pour télémédecine/industrie) et IoT massif (mMTC).',
        keyTakeaway:
          'Une faible latence et une faible gigue sont plus cruciales pour un appel vocal/visio que le débit brut maximal.',
      },
    ],
  },
  // Génie Civil & BTP
  {
    id: 'course-gc-rdm',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-rdm',
    title: 'Statique, Flexion des poutres & Béton armé',
    durationMinutes: 30,
    sizeKb: 230,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-gc-r1',
        heading: '1. Équilibre statique et moment fléchissant d’une poutre',
        content:
          'Une poutre isostatique sur deux appuis simples de portée L soumise à une charge concentrée P en son milieu présente deux réactions d’appuis égales R_A = R_B = P/2 et un moment fléchissant maximal au centre M_max = (P · L) / 4. Sous une charge uniformément répartie q (en kN/m), les réactions valent q·L/2 et le moment maximal au milieu vaut M_max = (q · L²) / 8.',
        keyTakeaway:
          'Deux formules incontournables en RDM : charge ponctuelle au centre → M_max = P·L/4 ; charge répartie → M_max = q·L²/8.',
        formula: 'M_max (ponctuelle) = P·L / 4   |   M_max (répartie) = q·L² / 8   |   σ = N / S',
        diagramId: 'poutre_flexion',
      },
      {
        id: 'sec-gc-r2',
        heading: '2. Principe fondamental du béton armé',
        content:
          'Le béton résiste remarquablement à la compression mais très mal à la traction (≈ 10 fois moins). En plaçant des armatures d’acier haute adhérence dans les zones tendues (en partie inférieure d’une poutre sur deux appuis simples, ou en partie supérieure d’un porte-à-faux/balcon), l’acier reprend les efforts de traction et le béton reprend la compression. Un enrobage minimal de béton protège les aciers contre la corrosion.',
        keyTakeaway:
          'Poutre sur 2 appuis : aciers principaux tendus en BAS ; Balcon en porte-à-faux : aciers principaux tendus en HAUT !',
      },
    ],
  },
  {
    id: 'course-gc-topo',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-topo',
    title: 'Topographie, Métrés, Dosage béton & Sécurité chantier',
    durationMinutes: 25,
    sizeKb: 215,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-gc-t1',
        heading: '1. Nivellement topographique et dosage du béton',
        content:
          'En nivellement direct au niveau optique, la dénivelée entre un point connu A et un point B vaut ΔZ_AB = Lecture Arrière (L_A) − Lecture Avant (L_B), d’où l’altitude Z_B = Z_A + L_A − L_B. Sur chantier, un béton courant de structure (poteaux, poutres, dalles) est généralement dosé à 350 kg de ciment par m³ de béton. Un excès d’eau (rapport E/C trop élevé) augmente la porosité et chute drastiquement la résistance mécanique.',
        keyTakeaway:
          'Altitude Z_B = Z_A + Lecture Arrière − Lecture Avant ; plus le rapport Eau/Ciment est maîtrisé (≈ 0,45–0,55), plus le béton est résistant.',
        formula: 'Z_B = Z_A + L_arrière − L_avant   |   Béton armé courant : 350 kg ciment / m³',
      },
      {
        id: 'sec-gc-t2',
        heading: '2. DQE, métrés et sécurité sur chantier',
        content:
          'Le Devis Quantitatif Estimatif (DQE) multiplie les quantités mesurées (m³, m², ml, kg) par les prix unitaires pour établir le budget prévisionnel des travaux. La prévention sur chantier privilégie toujours les protections collectives (garde-corps, échafaudages conformes, blindage de tranchées) avant les Équipements de Protection Individuelle (casque, chaussures de sécurité, harnais antichute).',
        keyTakeaway:
          'Hiérarchie sécurité BTP : Protection Collective (EPC) toujours prioritaire sur la Protection Individuelle (EPI).',
      },
    ],
  },
  // Journalisme & Communication
  {
    id: 'course-jour-redac',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-redac',
    title: 'Pyramide inversée, 5W, Fact-checking & Déontologie',
    durationMinutes: 25,
    sizeKb: 210,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-jr-r1',
        heading: '1. Pyramide inversée et règle des 5W',
        content:
          'Contrairement au récit littéraire qui garde la chute pour la fin, l’article d’information obéit à la pyramide inversée : l’essentiel (les 5W : Who/Qui, What/Quoi, Where/Où, When/Quand, Why/Pourquoi + How/Comment) figure dès le titre et le chapô/premier paragraphe. Les détails secondaires et le contexte viennent ensuite par ordre décroissant d’importance.',
        keyTakeaway:
          'Un lecteur pressé qui ne lit que les 5 premières lignes doit connaître immédiatement l’essentiel du fait d’actualité.',
        diagramId: 'pyramide_inversee',
      },
      {
        id: 'sec-jr-r2',
        heading: '2. Recoupement, fact-checking et Charte de Munich',
        content:
          'La crédibilité journalistique repose sur la règle du recoupement (au moins deux sources indépendantes concordantes), la séparation stricte entre faits vérifiés et commentaires, le droit de réponse et la protection des sources (Charte de Munich, 1971). En vérification numérique (fact-checking), on vérifie l’origine d’une image (recherche inversée), la date réelle, la localisation et l’identité de la source primaire.',
        keyTakeaway:
          'Une information non recoupée reste une rumeur ; la vérification prime toujours sur la vitesse de publication.',
      },
    ],
  },
  {
    id: 'course-jour-crise',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-crise',
    title: 'Communication stratégique, Digitale & Gestion de crise',
    durationMinutes: 25,
    sizeKb: 200,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-jr-c1',
        heading: '1. Construire un plan de communication efficace',
        content:
          'Un plan de communication suit une logique rigoureuse : diagnostic/audit, objectifs SMART (cognitifs, affectifs, conatifs), identification des cibles (cœur de cible, relais d’opinion), message clé, choix des canaux (radio locale, presse, réseaux sociaux, terrain), calendrier, budget et indicateurs d’évaluation (KPI).',
        keyTakeaway:
          'En Afrique francophone, combiner radio communautaire/nationale + mobile/WhatsApp + presse écrite maximise la portée réelle.',
      },
      {
        id: 'sec-jr-c2',
        heading: '2. Réflexes d’une communication de crise réussie',
        content:
          'Face à une crise (sanitaire, industrielle, réputationnelle), le silence laisse place aux rumeurs. Les 4 règles d’or sont : réagir vite (cellule de crise activée), dire la vérité vérifiée (ne jamais mentir), montrer de l’empathie envers les personnes touchées et désigner un porte-parole unique délivrant un message cohérent et factuel.',
        keyTakeaway:
          'Crise = Rapidité + Transparence factuelle + Empathie + Porte-parole unique.',
      },
    ],
  },
  // Nutrition & Santé
  {
    id: 'course-nut-macro',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-macro',
    title: 'Macronutriments, Besoins énergétiques & Calcul IMC',
    durationMinutes: 25,
    sizeKb: 215,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-nu-m1',
        heading: '1. Valeur énergétique des macronutriments et équilibre',
        content:
          'Les macronutriments fournissent l’énergie : 1 g de glucides apporte 4 kcal, 1 g de protéines apporte 4 kcal et 1 g de lipides apporte 9 kcal (soit plus du double). L’équilibre nutritionnel recommandé chez l’adulte vise 50–55 % d’énergie issue des glucides complexes, 30–35 % des lipides et 12–15 % des protéines, complétés par l’eau, les fibres, vitamines (A, C, D, B9) et minéraux (fer, iode, zinc).',
        keyTakeaway:
          'Mémo calorique 4-9-4 : Glucides = 4 kcal/g · Lipides = 9 kcal/g · Protéines = 4 kcal/g.',
        formula: '1 g Glucides = 4 kcal   |   1 g Lipides = 9 kcal   |   1 g Protéines = 4 kcal',
        diagramId: 'pyramide_alimentaire',
      },
      {
        id: 'sec-nu-m2',
        heading: '2. Indice de Masse Corporelle (IMC) selon l’OMS',
        content:
          'Chez l’adulte, l’IMC se calcule en divisant le poids (kg) par le carré de la taille (en mètres) : IMC = Poids / Taille². Selon les seuils OMS : < 18,5 = insuffisance pondérale (maigreur), 18,5 à 24,9 = corpulence normale, 25,0 à 29,9 = surpoids, ≥ 30,0 = obésité.',
        keyTakeaway:
          'Toujours convertir la taille en mètres avant de la mettre au carré (ex. 175 cm → 1,75 m).',
        formula: 'IMC = Poids (kg) / [Taille (m)]²   (Normal OMS : 18,5 – 24,9 kg/m²)',
      },
    ],
  },
  {
    id: 'course-nut-haccp',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-haccp',
    title: 'Malnutrition aiguë (MUAC), Sécurité alimentaire & HACCP',
    durationMinutes: 30,
    sizeKb: 220,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-nu-h1',
        heading: '1. Dépistage de la malnutrition aiguë chez l’enfant (6–59 mois)',
        content:
          'En nutrition humanitaire et pédiatrique, le ruban de Shakir mesure le périmètre brachial (PB / MUAC) chez les enfants de 6 à 59 mois : < 115 mm (zone rouge) = Malnutrition Aiguë Sévère (MAS), 115 à 124 mm (zone jaune) = Malnutrition Aiguë Modérée (MAM), ≥ 125 mm (zone verte) = statut normal. Les œdèmes bilatéraux des pieds signent immédiatement une MAS (kwashiorkor) nécessitant une prise en charge urgente.',
        keyTakeaway:
          'Seuils MUAC (6–59 mois) : Rouge < 115 mm (MAS) · Jaune 115–124 mm (MAM) · Vert ≥ 125 mm (Normal).',
        formula: 'MUAC < 115 mm ou œdèmes bilatéraux = MAS (Urgence nutritionnelle)',
      },
      {
        id: 'sec-nu-h2',
        heading: '2. Sécurité sanitaire des aliments : méthode HACCP',
        content:
          'La méthode HACCP (Hazard Analysis Critical Control Point) prévient les toxi-infections alimentaires en identifiant les dangers biologiques, chimiques et physiques, puis en maîtrisant les Points Critiques (CCP) comme le respect de la chaîne du froid (≤ +4 °C pour produits frais, ≤ −18 °C pour surgelés), la cuisson à cœur (> +63 °C) et la marche en avant en cuisine.',
        keyTakeaway:
          'Zone de danger bactérien rapide : entre +4 °C et +63 °C — ne jamais laisser un plat cuisiné tiédir longtemps à température ambiante.',
      },
    ],
  },
  // Tourisme & Hôtellerie
  {
    id: 'course-tour-eco',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-eco',
    title: 'Écotourisme, Patrimoine UNESCO & Développement local',
    durationMinutes: 25,
    sizeKb: 195,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-tr-e1',
        heading: '1. Principes du tourisme durable et de l’écotourisme',
        content:
          'L’écotourisme associe découverte de milieux naturels ou culturels remarquables, préservation active de la biodiversité, respect de la capacité de charge des sites et retombées économiques directes pour les communautés locales. Le Tchad possède un patrimoine exceptionnel classé UNESCO : les Lacs d’Ounianga (2012) et le Massif de l’Ennedi (2016, site mixte naturel et culturel), ainsi que le Parc national de Zakouma.',
        keyTakeaway:
          'Tourisme durable = 3 piliers indissociables : préservation environnementale + équité sociale locale + viabilité économique.',
      },
      {
        id: 'sec-tr-e2',
        heading: '2. Qualité d’accueil et valorisation culturelle',
        content:
          'L’expérience visiteur repose sur la chaîne d’accueil (information avant voyage, transfert sécurisé, hébergement propre, guides formés, artisanat authentique et suivi post-séjour). La satisfaction client se mesure notamment par le Net Promoter Score (NPS) et le taux de recommandation.',
        keyTakeaway:
          'Un accueil professionnel et l’authenticité culturelle créent un bouche-à-oreille durable bien supérieur à la publicité seule.',
      },
    ],
  },
  {
    id: 'course-tour-yield',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-yield',
    title: 'Indicateurs hôteliers (TO, PMC, RevPAR) & Yield Management',
    durationMinutes: 25,
    sizeKb: 205,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-tr-y1',
        heading: '1. Taux d’occupation (TO), Prix moyen (PMC) et RevPAR',
        content:
          'Le pilotage d’un hôtel ou d’un écolodge repose sur trois indicateurs universels : le Taux d’Occupation TO = (Chambres vendues / Chambres disponibles) × 100, le Prix Moyen par Chambre louée PMC (ADR) = CA Hébergement / Chambres vendues, et le RevPAR (Revenu par chambre disponible) = CA Hébergement / Chambres disponibles = TO × PMC.',
        keyTakeaway:
          'Le RevPAR est l’indicateur roi car il combine à la fois le remplissage (TO) et le prix de vente (PMC).',
        formula: 'TO = Vendues / Disponibles   |   PMC = CA / Vendues   |   RevPAR = TO × PMC = CA / Disponibles',
      },
      {
        id: 'sec-tr-y2',
        heading: '2. Yield Management (Gestion du revenu)',
        content:
          'Une chambre d’hôtel non vendue ce soir est un revenu définitivement perdu (service périssable à capacité fixe). Le Yield Management ajuste dynamiquement les tarifs en fonction de la demande, de la saisonnalité et du délai de réservation (early booking vs dernière minute) pour maximiser le RevPAR global.',
        keyTakeaway:
          'Vendre la bonne chambre au bon client, au bon moment et au meilleur prix : c’est le cœur du Yield Management.',
      },
    ],
  },
  // Rédaction Administrative & Note de Synthèse
  {
    id: 'course-red-note',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    title: 'Note de synthèse, Rapport, Compte rendu & Procès-verbal',
    durationMinutes: 30,
    sizeKb: 210,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-rd-n1',
        heading: '1. Règles d’or de la note de synthèse de concours',
        content:
          'La note de synthèse résume de façon structurée, objective et fidèle un dossier documentaire volumineux (textes juridiques, rapports, presse) sans jamais ajouter de connaissances extérieures ni d’opinion personnelle. Elle comporte : timbre, date, destinataire, objet, introduction (accroche, problématique, annonce du plan en 2 parties / 2 sous-parties) et développement clair sans conclusion personnelle (sauf si une note avec propositions est expressément demandée).',
        keyTakeaway:
          'Note de synthèse = 100 % issue du dossier, 0 % d’opinion personnelle, plan binaire apparent et neutre.',
      },
      {
        id: 'sec-rd-n2',
        heading: '2. Distinguer Compte rendu (CR), Procès-verbal (PV) et Rapport',
        content:
          'Le compte rendu relate fidèlement les faits ou débats d’une réunion sans caractère probant officiel. Le procès-verbal (PV) est un acte officiel dressé par une autorité habilitée (OPJ, secrétaire de séance, conseil d’administration) faisant foi jusqu’à preuve contraire et signé par les participants requis. Le rapport, plus approfondi, analyse une situation et se termine obligatoirement par des propositions de décision soumises au supérieur hiérarchique.',
        keyTakeaway:
          'Compte rendu = récit informatif ; Procès-verbal = valeur juridique probante ; Rapport = analyse + propositions de décision.',
      },
    ],
  },
  {
    id: 'course-red-oral',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-oral',
    title: 'Réussir l’oral de concours & la prise de parole structurée',
    durationMinutes: 20,
    sizeKb: 185,
    updatedAt: '2026-04-12',
    sections: [
      {
        id: 'sec-rd-o1',
        heading: '1. La présentation en 2 minutes et la méthode STAR',
        content:
          'L’exposé liminaire (2 à 3 min) suit un fil conducteur : parcours académique/professionnel, compétences clés illustrées par des résultats concrets, puis motivation précise pour le corps ou l’école visée. Pour répondre aux questions comportementales du jury (« Parlez d’un défi que vous avez résolu »), appliquez la méthode STAR : Situation → Tâche → Action personnelle → Résultat mesurable.',
        keyTakeaway:
          'Méthode STAR = réponses concrètes, crédibles et mémorables face à tout jury de concours ou d’entretien.',
        formula: 'STAR : Situation → Tâche → Action → Résultat',
      },
      {
        id: 'sec-rd-o2',
        heading: '2. Gérer les questions déstabilisantes avec sang-froid',
        content:
          'Un jury teste votre posture de futur cadre autant que vos connaissances. Si vous ignorez un chiffre précis, ne bluffez jamais : reconnaissez-le calmement et montrez comment vous raisonneriez ou vérifieriez la source. Respirez lentement (cohérence cardiaque 4 s inspiration / 6 s expiration), regardez tous les membres du jury et reformulez une question ambiguë avant d’y répondre.',
        keyTakeaway:
          'Honnêteté + sang-froid + esprit de synthèse valent toujours mieux qu’une réponse improvisée inexacte.',
      },
    ],
  },
];

export const ZENITH_FICHES: Fiche[] = [
  // Réseaux & Télécoms
  {
    id: 'fiche-net-osi',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-osi',
    title: 'Modèle OSI, TCP/UDP & IPv4 / CIDR',
    subtitle: '7 couches, ports et calcul de sous-réseaux',
    sizeKb: 72,
    notionsEssentielles: [
      '7 couches OSI : Physique, Liaison, Réseau, Transport, Session, Présentation, Application.',
      'Switch = Couche 2 (MAC) ; Routeur = Couche 3 (IP) ; TCP/UDP = Couche 4 (Ports).',
      'TCP = fiable (accusés de réception, 3-way handshake) ; UDP = rapide sans connexion (VoIP, DNS, streaming).',
      'Nombre d’hôtes IPv4 = 2^(32 − n) − 2.',
    ],
    definitions: [
      { terme: 'CIDR', definition: 'Classless Inter-Domain Routing : notation `/n` indiquant le nombre de bits dédiés au préfixe réseau.' },
      { terme: '3-Way Handshake', definition: 'Poignée de main TCP en 3 étapes (SYN → SYN-ACK → ACK) établissant une session fiable.' },
    ],
    formules: [
      { label: 'Hôtes utilisables IPv4', formule: 'N = 2^(32 − n) − 2', unite: 'machines' },
    ],
    datesReperes: [
      { repere: '1984 — ISO 7498', detail: 'Normalisation internationale du modèle OSI en 7 couches.' },
    ],
    methodes: [
      'Pour `/26` : 32 − 26 = 6 bits hôtes → 2⁶ − 2 = 64 − 2 = 62 adresses utilisables.',
    ],
    erreursFrequentes: [
      'Oublier de retrancher 2 (adresse réseau + adresse broadcast) lors du calcul du nombre d’hôtes IPv4.',
    ],
    exemples: [
      { titre: 'Ports bien connus', contenu: 'HTTP = 80 · HTTPS = 443 · SSH = 22 · DNS = 53 · SMTP = 25.' },
    ],
    resumeExpress:
      'Le modèle OSI structure les réseaux en 7 couches ; TCP garantit la fiabilité, UDP privilégie la vitesse et `/n` donne 2^(32−n)−2 hôtes IPv4.',
    tableauComparatif: {
      headers: ['Critère', 'TCP (Couche 4)', 'UDP (Couche 4)'],
      rows: [
        { critere: 'Mode', elementA: 'Orienté connexion (SYN/ACK)', elementB: 'Sans connexion' },
        { critere: 'Fiabilité', elementA: 'Contrôle d’erreurs & réémission', elementB: 'Best-effort (pas de réémission)' },
        { critere: 'Usages types', elementA: 'Web (HTTPS), e-mail, fichiers', elementB: 'VoIP, visioconférence, DNS, jeux' },
      ],
    },
    autoEvaluation: [
      { question: 'Combien d’adresses IP d’hôtes utilisables offre un sous-réseau IPv4 `/26` ?', reponse: '2⁶ − 2 = 62 hôtes.' },
    ],
  },
  {
    id: 'fiche-net-fibre',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-fibre',
    title: 'Fibre optique, 4G/5G & QoS',
    subtitle: 'Monomode, décibels (dB) et latence',
    sizeKb: 68,
    notionsEssentielles: [
      'Fibre monomode (9 µm, laser) = longues distances ; multimode (50 µm, LED) = courtes distances.',
      'En décibels : −3 dB = puissance divisée par 2 ; +3 dB = puissance doublée.',
      '4 critères QoS : débit, latence (RTT), gigue (jitter) et perte de paquets.',
      '5G : eMBB (très haut débit), URLLC (latence ultra-faible), mMTC (IoT massif).',
    ],
    definitions: [
      { terme: 'Gigue (Jitter)', definition: 'Variation de la latence entre paquets successifs, pénalisante pour la voix et la vidéo en direct.' },
    ],
    formules: [
      { label: 'Rapport en décibels', formule: 'G_dB = 10 · log₁₀(P₂ / P₁)', unite: 'dB' },
    ],
    datesReperes: [
      { repere: '1966 — Charles Kao (Prix Nobel)', detail: 'Démonstration théorique de la transmission longue distance sur fibre de silice.' },
    ],
    methodes: [
      'Retenir les valeurs clés en dB : +3 dB (×2), +10 dB (×10), −3 dB (÷2), −10 dB (÷10).',
    ],
    erreursFrequentes: [
      'Confondre fibre multimode (courte portée) et monomode (longue portée interurbaine).',
    ],
    exemples: [
      { titre: 'Affaiblissement fibre', contenu: 'Une perte de 10 dB signifie que la puissance lumineuse reçue est divisée par 10 (10 % restante).' },
    ],
    resumeExpress:
      'La fibre monomode porte les dorsales haut débit sans interférences ; la QoS (latence, gigue, perte) conditionne l’expérience temps réel en 4G/5G.',
    tableauComparatif: {
      headers: ['Critère', 'Fibre Monomode (SMF)', 'Fibre Multimode (MMF)'],
      rows: [
        { critere: 'Diamètre du cœur', elementA: '≈ 9 µm', elementB: '50 µm ou 62,5 µm' },
        { critere: 'Source lumineuse', elementA: 'Diode Laser', elementB: 'LED / VCSEL' },
        { critere: 'Portée typique', elementA: 'Dizaines de km (WAN / FTTH)', elementB: 'Jusqu’à ~500 m (LAN / campus)' },
      ],
    },
    autoEvaluation: [
      { question: 'Que représente une atténuation de −3 dB sur un signal optique ou radio ?', reponse: 'La puissance du signal est divisée par 2.' },
    ],
  },
  // Génie Civil & BTP
  {
    id: 'fiche-gc-rdm',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-rdm',
    title: 'RDM — Flexion des poutres & Béton armé',
    subtitle: 'Moments fléchissants et position des armatures',
    sizeKb: 72,
    notionsEssentielles: [
      'Poutre sur 2 appuis + charge ponctuelle P au milieu : R_A = R_B = P/2 et M_max = P·L / 4.',
      'Poutre sur 2 appuis + charge répartie q : R_A = R_B = q·L/2 et M_max = q·L² / 8.',
      'Béton = excelle en compression ; Acier = reprend la traction.',
      'Zone tendue : en BAS sur une travée simple, en HAUT sur un porte-à-faux (balcon).',
    ],
    definitions: [
      { terme: 'Contrainte normale (σ)', definition: 'Effort normal rapporté à la section : σ = N / S (exprimée en MPa = N/mm²).' },
    ],
    formules: [
      { label: 'Moment max (ponctuelle milieu)', formule: 'M_max = (P · L) / 4', unite: 'kN·m' },
      { label: 'Moment max (répartie uniforme)', formule: 'M_max = (q · L²) / 8', unite: 'kN·m' },
    ],
    datesReperes: [
      { repere: '1 MPa = 1 N/mm²', detail: 'Conversion universelle en Résistance des Matériaux (béton C25/30 → 25 MPa).' },
    ],
    methodes: [
      'Toujours dessiner la déformée de la poutre : la face qui s’allonge (tendue) est celle où l’on place les aciers principaux.',
    ],
    erreursFrequentes: [
      'Placer les aciers principaux d’un balcon en porte-à-faux en partie basse (risque d’effondrement !).',
    ],
    exemples: [
      { titre: 'Calcul M_max', contenu: 'Poutre L = 6 m, charge P = 20 kN au milieu → M_max = (20 × 6) / 4 = 30 kN·m.' },
    ],
    resumeExpress:
      'En flexion simple, retenir PL/4 (ponctuelle), qL²/8 (répartie) et placer l’acier dans les fibres tendues du béton armé.',
    tableauComparatif: {
      headers: ['Élément', 'Effort repris principalement', 'Position en travée simple'],
      rows: [
        { critere: 'Béton', elementA: 'Compression', elementB: 'Zone supérieure (comprimée)' },
        { critere: 'Acier (HA)', elementA: 'Traction', elementB: 'Zone inférieure (tendue)' },
        { critere: 'Cadres / Étriers', elementA: 'Effort tranchant (cisaillement)', elementB: 'Rapprochés près des appuis' },
      ],
    },
    autoEvaluation: [
      { question: 'Où se situent les armatures principales tendues d’un balcon en porte-à-faux ?', reponse: 'En partie supérieure (nappe haute).' },
    ],
  },
  {
    id: 'fiche-gc-topo',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-topo',
    title: 'Topographie, Béton & Sécurité Chantier',
    subtitle: 'Nivellement, dosage 350 kg/m³ et hiérarchie EPC/EPI',
    sizeKb: 68,
    notionsEssentielles: [
      'Nivellement direct : Z_B = Z_A + Lecture Arrière − Lecture Avant.',
      'Béton de structure courant : 350 kg de ciment / m³ (7 sacs de 50 kg).',
      'Un excès d’eau (E/C élevé) affaiblit durablement la résistance du béton.',
      'Sécurité chantier : Protection Collective (EPC) prioritaire sur Protection Individuelle (EPI).',
    ],
    definitions: [
      { terme: 'DQE', definition: 'Devis Quantitatif Estimatif : document chiffrant quantités et prix unitaires d’un chantier.' },
    ],
    formules: [
      { label: 'Altitude en nivellement', formule: 'Z_B = Z_A + L_ar − L_av', unite: 'm' },
    ],
    datesReperes: [
      { repere: '28 jours', detail: 'Âge conventionnel de référence pour mesurer la résistance caractéristique à la compression du béton (f_ck).' },
    ],
    methodes: [
      'Contrôler la cohérence du nivellement : si L_av < L_ar, le terrain monte (Z_B > Z_A).',
    ],
    erreursFrequentes: [
      'Inverser Lecture Arrière et Lecture Avant dans le calcul d’altitude.',
    ],
    exemples: [
      { titre: 'Calcul d’altitude', contenu: 'Z_A = 295,00 m, L_ar = 1,45 m, L_av = 0,95 m → Z_B = 295,00 + 1,45 − 0,95 = 295,50 m.' },
    ],
    resumeExpress:
      'Nivellement Z_B = Z_A + L_ar − L_av, béton dosé à 350 kg/m³ sans excès d’eau, et priorité absolue aux protections collectives.',
    tableauComparatif: {
      headers: ['Type', 'Exemples chantier', 'Priorité réglementaire'],
      rows: [
        { critere: 'EPC (Collectif)', elementA: 'Garde-corps, blindage de fouille, filets', elementB: 'Priorité n°1 (obligatoire d’abord)' },
        { critere: 'EPI (Individuel)', elementA: 'Casque, harnais, chaussures S3, gants', elementB: 'Complément indispensable' },
        { critere: 'Signalisation', elementA: 'Balisage, plan de circulation', elementB: 'Prévention permanente' },
      ],
    },
    autoEvaluation: [
      { question: 'Combien de sacs de ciment de 50 kg faut-il pour 1 m³ de béton dosé à 350 kg/m³ ?', reponse: '350 / 50 = 7 sacs.' },
    ],
  },
  // Journalisme & Communication
  {
    id: 'fiche-jour-redac',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-redac',
    title: 'Pyramide inversée, 5W & Déontologie',
    subtitle: 'Écriture journalistique et vérification des sources',
    sizeKb: 68,
    notionsEssentielles: [
      'Pyramide inversée : l’essentiel dès le chapô et le premier paragraphe.',
      '5W : Qui (Who), Quoi (What), Où (Where), Quand (When), Pourquoi (Why) + Comment.',
      'Double recoupement des sources indispensable avant toute publication.',
      'Charte de Munich (1971) : 10 devoirs et 5 droits fondamentaux du journaliste.',
    ],
    definitions: [
      { terme: 'Chapô', definition: 'Court texte placé sous le titre résumant l’angle et donnant envie de lire l’article.' },
      { terme: 'Fact-checking', definition: 'Vérification méthodique et sourcée d’une déclaration publique ou d’un contenu viral.' },
    ],
    formules: [
      { label: 'Règle de base', formule: '1 fait vérifié + ≥ 2 sources indépendantes + 5W en tête', unite: 'méthode' },
    ],
    datesReperes: [
      { repere: '24 novembre 1971', detail: 'Adoption de la Déclaration des devoirs et des droits des journalistes (Charte de Munich).' },
    ],
    methodes: [
      'Toujours distinguer clairement un article factuel (reportage, brève) d’un genre d’opinion (éditorial, chronique).',
    ],
    erreursFrequentes: [
      'Publier une image virale des réseaux sociaux sans vérifier sa date et son lieu d’origine par recherche inversée.',
    ],
    exemples: [
      { titre: 'Angle précis', contenu: 'Au lieu de « L’éducation au Tchad », choisir un angle concret : « Comment les écoles rurales utilisent le solaire pour les cours du soir ».' },
    ],
    resumeExpress:
      'Informer avec rigueur exige la pyramide inversée (5W en tête), le double recoupement et le respect strict de la déontologie.',
    tableauComparatif: {
      headers: ['Genre', 'Objectif principal', 'Subjectivité admise'],
      rows: [
        { critere: 'Brève / Compte rendu', elementA: 'Relater un fait nu', elementB: 'Aucune (neutralité stricte)' },
        { critere: 'Reportage', elementA: 'Faire voir et entendre le terrain', elementB: 'Regard incarné mais factuel' },
        { critere: 'Éditorial', elementA: 'Prendre position au nom du média', elementB: 'Assumée et clairement identifiée' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle charte européenne de 1971 codifie les 10 devoirs et 5 droits du journaliste ?', reponse: 'La Charte de Munich (1971).' },
    ],
  },
  {
    id: 'fiche-jour-crise',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-crise',
    title: 'Plan de Communication & Gestion de Crise',
    subtitle: 'Objectifs SMART, cibles et réflexes de crise',
    sizeKb: 65,
    notionsEssentielles: [
      'Plan de communication : diagnostic → objectifs SMART → cibles → messages → canaux → KPI.',
      '3 niveaux d’objectifs : cognitif (faire connaître), affectif (faire aimer), conatif (faire agir).',
      'Crise : ne jamais laisser le vide informationnel ni mentir.',
      '4 piliers de crise : rapidité, transparence factuelle, empathie, porte-parole unique.',
    ],
    definitions: [
      { terme: 'Objectif conatif', definition: 'Objectif visant à déclencher un comportement concret (s’inscrire, se faire vacciner, acheter).' },
    ],
    formules: [
      { label: 'Équation de crise', formule: 'Cellule de crise + Porte-parole unique + Faits vérifiés + Empathie', unite: 'protocole' },
    ],
    datesReperes: [
      { repere: 'Règle de la Golden Hour', detail: 'Prendre la parole dans la première heure d’une crise évite que la rumeur ne fixe le récit.' },
    ],
    methodes: [
      'Préparer un Q&A (questions-réponses sensibles) et un communiqué factuel court dès le déclenchement de la crise.',
    ],
    erreursFrequentes: [
      'Multiplier les porte-paroles donnant des chiffres contradictoires aux médias.',
    ],
    exemples: [
      { titre: 'Campagne de santé publique', contenu: 'Objectif cognitif (informer dates vaccination) + conatif (amener l’enfant au centre de santé).' },
    ],
    resumeExpress:
      'Une communication stratégique aligne cibles, canaux et KPI ; en crise, la transparence rapide portée par une voix unique protège la confiance.',
    tableauComparatif: {
      headers: ['Réflexe', 'Bonne pratique de crise', 'Erreur fatale'],
      rows: [
        { critere: 'Délai', elementA: 'Accuser réception vite avec faits établis', elementB: 'Silence prolongé (« No comment »)' },
        { critere: 'Ton', elementA: 'Empathique, responsable et factuel', elementB: 'Déni ou rejet de faute sur autrui' },
        { critere: 'Voix', elementA: 'Porte-parole unique mandaté', elementB: 'Déclarations contradictoires' },
      ],
    },
    autoEvaluation: [
      { question: 'Que vise un objectif « conatif » en communication ?', reponse: 'Déclencher un passage à l’action concret chez la cible.' },
    ],
  },
  // Nutrition & Santé
  {
    id: 'fiche-nut-macro',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-macro',
    title: 'Macronutriments & Calcul de l’IMC',
    subtitle: 'Règle 4-9-4 kcal/g et seuils OMS',
    sizeKb: 68,
    notionsEssentielles: [
      'Glucides = 4 kcal/g (50–55 %) ; Lipides = 9 kcal/g (30–35 %) ; Protéines = 4 kcal/g (12–15 %).',
      'IMC = Poids (kg) / Taille² (m²).',
      'Seuils OMS adulte : < 18,5 maigreur ; 18,5–24,9 normal ; 25–29,9 surpoids ; ≥ 30 obésité.',
      'Carences micronutritionnelles majeures : fer (anémie), iode (goitre), vitamine A (vue/immunité).',
    ],
    definitions: [
      { terme: 'IMC', definition: 'Indice de Masse Corporelle évaluant la corpulence d’un adulte.' },
    ],
    formules: [
      { label: 'IMC', formule: 'IMC = Poids (kg) / [Taille (m)]²', unite: 'kg/m²' },
      { label: 'Apport énergétique', formule: 'E = 4·G + 9·L + 4·P', unite: 'kcal' },
    ],
    datesReperes: [
      { repere: '1832 — Adolphe Quetelet', detail: 'Invention de l’indice Poids / Taille² (indice de Quetelet / IMC).' },
    ],
    methodes: [
      'Calculer d’abord Taille² (ex. 1,60² = 2,56), puis diviser le poids par ce carré.',
    ],
    erreursFrequentes: [
      'Oublier de convertir la taille de cm en m ou multiplier les lipides par 4 au lieu de 9 kcal/g.',
    ],
    exemples: [
      { titre: 'Calcul IMC', contenu: 'Adulte de 64 kg pour 1,60 m → IMC = 64 / 2,56 = 25,0 kg/m² (seuil du surpoids).' },
    ],
    resumeExpress:
      'Retenir 4-9-4 kcal/g (G-L-P), l’équilibre 55/30/15 % et la formule IMC = Poids/Taille² avec ses seuils OMS.',
    tableauComparatif: {
      headers: ['Classe IMC OMS', 'Intervalle (kg/m²)', 'Interprétation'],
      rows: [
        { critere: 'Insuffisance pondérale', elementA: '< 18,5', elementB: 'Maigreur / risque dénutrition' },
        { critere: 'Corpulence normale', elementA: '18,5 à 24,9', elementB: 'Zone de référence santé' },
        { critere: 'Surpoids / Obésité', elementA: '25–29,9 / ≥ 30', elementB: 'Risque cardio-métabolique accru' },
      ],
    },
    autoEvaluation: [
      { question: 'Combien de kcal apportent 20 g de lipides ?', reponse: '20 × 9 = 180 kcal.' },
    ],
  },
  {
    id: 'fiche-nut-haccp',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-haccp',
    title: 'Malnutrition aiguë (MUAC) & HACCP',
    subtitle: 'Seuils périmètre brachial et hygiène alimentaire',
    sizeKb: 70,
    notionsEssentielles: [
      'MUAC (6–59 mois) : < 115 mm = MAS (rouge) ; 115–124 mm = MAM (jaune) ; ≥ 125 mm = normal (vert).',
      'Œdèmes bilatéraux des pieds = MAS immédiate quelle que soit la mesure MUAC.',
      'HACCP : démarche préventive en 7 principes basée sur les Points Critiques (CCP).',
      'Chaîne du froid : frais ≤ +4 °C, surgelés ≤ −18 °C ; zone dangereuse : +4 °C à +63 °C.',
    ],
    definitions: [
      { terme: 'ATPE', definition: 'Aliment Thérapeutique Prêt à l’Emploi (ex. pâte nutritive enrichie) utilisé sans eau pour traiter la MAS sans complications.' },
      { terme: 'CCP (HACCP)', definition: 'Critical Control Point : étape où une maîtrise est essentielle pour éliminer ou réduire un danger alimentaire.' },
    ],
    formules: [
      { label: 'Seuils MUAC (6–59 mois)', formule: 'MAS < 115 mm  |  MAM : 115–124 mm  |  Normal ≥ 125 mm', unite: 'mm' },
    ],
    datesReperes: [
      { repere: '1960s — NASA / Pillsbury', detail: 'Création initiale de la méthode HACCP pour garantir la sécurité des aliments des astronautes.' },
    ],
    methodes: [
      'Mesurer le MUAC toujours au bras gauche relâché, exactement à mi-distance entre l’épaule (acromion) et le coude (olécrane).',
    ],
    erreursFrequentes: [
      'Recongeler un produit déjà décongelé (prolifération bactérienne massive !).',
    ],
    exemples: [
      { titre: 'Dépistage rapide', contenu: 'Enfant de 24 mois avec MUAC = 110 mm → zone rouge → Malnutrition Aiguë Sévère (MAS) à orienter immédiatement.' },
    ],
    resumeExpress:
      'Le dépistage MUAC (< 115 mm = MAS) sauve les enfants malnutris et la méthode HACCP maîtrise les dangers alimentaires de la ferme à l’assiette.',
    tableauComparatif: {
      headers: ['Code Ruban MUAC', 'Mesure (6–59 mois)', 'Diagnostic & Action'],
      rows: [
        { critere: 'Rouge', elementA: '< 115 mm (ou œdèmes)', elementB: 'MAS — Prise en charge thérapeutique urgente' },
        { critere: 'Jaune', elementA: '115 à 124 mm', elementB: 'MAM — Supplémentation nutritionnelle' },
        { critere: 'Vert', elementA: '≥ 125 mm', elementB: 'Statut nutritionnel satisfaisant' },
      ],
    },
    autoEvaluation: [
      { question: 'En dessous de quel seuil de périmètre brachial (MUAC) diagnostique-t-on une MAS chez l’enfant de 6 à 59 mois ?', reponse: 'En dessous de 115 mm.' },
    ],
  },
  // Tourisme & Hôtellerie
  {
    id: 'fiche-tour-eco',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-eco',
    title: 'Écotourisme & Patrimoine Durable',
    subtitle: 'Sites UNESCO, capacité de charge et retombées locales',
    sizeKb: 65,
    notionsEssentielles: [
      '3 piliers du tourisme durable : environnement, communautés locales, économie.',
      'Patrimoine mondial UNESCO au Tchad : Lacs d’Ounianga (2012) et Massif de l’Ennedi (2016).',
      'Parc national de Zakouma : référence africaine de conservation de la faune.',
      'Capacité de charge = seuil maximal de visiteurs sans dégrader le site ni l’expérience.',
    ],
    definitions: [
      { terme: 'Capacité de charge', definition: 'Nombre maximal de visiteurs qu’un site peut accueillir sans dommages écologiques ou culturels.' },
    ],
    formules: [
      { label: 'Écotourisme', formule: 'Nature/Culture + Conservation + Bénéfice Communautés Locales', unite: '3 piliers' },
    ],
    datesReperes: [
      { repere: '2012 & 2016 — UNESCO', detail: 'Inscriptions des Lacs d’Ounianga (2012) et du Massif de l’Ennedi (2016) au patrimoine mondial.' },
    ],
    methodes: [
      'Toujours associer les guides et artisans locaux pour ancrer la valeur ajoutée sur le territoire.',
    ],
    erreursFrequentes: [
      'Confondre tourisme de masse (volume à bas coût) et écotourisme (faible impact, haute valeur ajoutée).',
    ],
    exemples: [
      { titre: 'Site mixte Ennedi', contenu: 'Reconnu à la fois pour ses arches géologiques naturelles et son art rupestre millénaire.' },
    ],
    resumeExpress:
      'L’écotourisme valorise durablement des joyaux uniques (Ounianga, Ennedi, Zakouma) en respectant la capacité de charge et les populations locales.',
    tableauComparatif: {
      headers: ['Critère', 'Tourisme de masse', 'Écotourisme durable'],
      rows: [
        { critere: 'Volume', elementA: 'Très élevé, standardisé', elementB: 'Maîtrisé (capacité de charge)' },
        { critere: 'Impact écologique', elementA: 'Fort', elementB: 'Minimal + financement conservation' },
        { critere: 'Retombées locales', elementA: 'Souvent captées hors territoire', elementB: 'Directement redistribuées localement' },
      ],
    },
    autoEvaluation: [
      { question: 'Quels sont les deux sites tchadiens inscrits au patrimoine mondial de l’UNESCO ?', reponse: 'Les Lacs d’Ounianga (2012) et le Massif de l’Ennedi (2016).' },
    ],
  },
  {
    id: 'fiche-tour-yield',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-yield',
    title: 'TO, PMC, RevPAR & Yield Management',
    subtitle: 'Indicateurs clés de performance hôtelière',
    sizeKb: 68,
    notionsEssentielles: [
      'Taux d’Occupation (TO) = (Chambres vendues / Chambres disponibles) × 100.',
      'Prix Moyen Chambre (PMC / ADR) = CA Hébergement / Chambres vendues.',
      'RevPAR = CA Hébergement / Chambres disponibles = TO × PMC.',
      'Yield Management : tarification dynamique d’une capacité fixe et périssable.',
    ],
    definitions: [
      { terme: 'RevPAR', definition: 'Revenue Per Available Room : revenu moyen généré par chaque chambre disponible (louée ou non).' },
    ],
    formules: [
      { label: 'RevPAR', formule: 'RevPAR = TO × PMC = CA Hébergement / Chambres disponibles', unite: 'FCFA / €' },
    ],
    datesReperes: [
      { repere: 'Années 1980 — Aéronautique & Hôtellerie', detail: 'Développement du Yield Management pour optimiser les capacités périssables.' },
    ],
    methodes: [
      'Pour calculer RevPAR = TO × PMC, exprimer TO en décimal (ex. 80 % = 0,80).',
    ],
    erreursFrequentes: [
      'Diviser le CA par les chambres disponibles au lieu des chambres vendues pour calculer le PMC (ça donne le RevPAR !).',
    ],
    exemples: [
      { titre: 'Calcul RevPAR', contenu: 'TO = 75 % (0,75) et PMC = 40 000 FCFA → RevPAR = 0,75 × 40 000 = 30 000 FCFA.' },
    ],
    resumeExpress:
      'Le RevPAR (= TO × PMC) synthétise la performance hôtelière ; le Yield Management l’optimise par une tarification dynamique.',
    tableauComparatif: {
      headers: ['Indicateur', 'Formule', 'Ce qu’il mesure'],
      rows: [
        { critere: 'TO', elementA: 'Vendues / Disponibles', elementB: 'Performance de remplissage' },
        { critere: 'PMC (ADR)', elementA: 'CA / Vendues', elementB: 'Positionnement tarifaire réel' },
        { critere: 'RevPAR', elementA: 'CA / Disponibles (= TO × PMC)', elementB: 'Performance économique globale' },
      ],
    },
    autoEvaluation: [
      { question: 'Que vaut le RevPAR d’un hôtel affichant 60 % de TO et un PMC de 50 000 FCFA ?', reponse: '0,60 × 50 000 = 30 000 FCFA.' },
    ],
  },
  // Rédaction Administrative
  {
    id: 'fiche-red-note',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    title: 'Note de Synthèse, PV, Compte Rendu & Rapport',
    subtitle: 'Codes officiels de la rédaction administrative',
    sizeKb: 70,
    notionsEssentielles: [
      'Note de synthèse : 100 % issue du dossier, neutre, objective, plan en 2 parties / 2 sous-parties.',
      'Compte rendu = récit informatif ; Procès-verbal = acte juridique faisant foi ; Rapport = analyse + propositions.',
      'Style administratif : dignité, objectivité, clarté, courtoisie, responsabilité (« J’ai l’honneur de… »).',
      'Mentions obligatoires : timbre, lieu/date, destinataire (sous couvert de), objet, référence, signature.',
    ],
    definitions: [
      { terme: 'Sous couvert (S/C)', definition: 'Mention indiquant le respect de la voie hiérarchique lors de la transmission d’un courrier.' },
    ],
    formules: [
      { label: 'Plan note de synthèse', formule: 'Intro (Accroche + Problématique + Plan) → I (A/B) → II (A/B)', unite: 'structure' },
    ],
    datesReperes: [
      { repere: 'Gestion du temps (épreuve 4 h)', detail: '1 h 30 lecture/prise de notes · 30 min plan détaillé · 1 h 45 rédaction · 15 min relecture.' },
    ],
    methodes: [
      'Commencer la lecture du dossier par le sommaire et les documents les plus récents/synthétiques.',
    ],
    erreursFrequentes: [
      'Ajouter des connaissances personnelles hors dossier ou rédiger une conclusion donnant son avis personnel dans une note de synthèse pure.',
    ],
    exemples: [
      { titre: 'Formule descendante vs ascendante', contenu: 'Supérieur → subordonné : « Je vous prie de vouloir bien… » ; Subordonné → supérieur : « J’ai l’honneur de vous soumettre… ».' },
    ],
    resumeExpress:
      'Maîtriser la neutralité de la note de synthèse, la voie hiérarchique (S/C) et la frontière CR / PV / Rapport fait gagner des points décisifs aux concours.',
    tableauComparatif: {
      headers: ['Document', 'Portée juridique', 'Propositions incluses ?'],
      rows: [
        { critere: 'Compte rendu', elementA: 'Informative (non probante)', elementB: 'Non (relatation fidèle)' },
        { critere: 'Procès-verbal', elementA: 'Probante (fait foi officiellement)', elementB: 'Non (constat / décisions actées)' },
        { critere: 'Rapport', elementA: 'Aide à la décision hiérarchique', elementB: 'Oui (obligatoires en fin de rapport)' },
      ],
    },
    autoEvaluation: [
      { question: 'Peut-on introduire des connaissances personnelles extérieures au dossier dans une note de synthèse ?', reponse: 'Non, jamais : la note de synthèse s’appuie exclusivement sur les pièces du dossier.' },
    ],
  },
  {
    id: 'fiche-red-oral',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-oral',
    title: 'Oral de Concours & Méthode STAR',
    subtitle: 'Présentation efficace et posture face au jury',
    sizeKb: 64,
    notionsEssentielles: [
      'Exposé liminaire de 2–3 min : Parcours → Compétences/Preuves → Projet & Motivation.',
      'Méthode STAR : Situation, Tâche, Action personnelle, Résultat chiffré.',
      'Ne jamais bluffer sur une question technique : reconnaître la limite et proposer une démarche.',
      'Contact visuel circulaire avec tout le jury et respiration posée.',
    ],
    definitions: [
      { terme: 'Méthode STAR', definition: 'Trame structurée permettant de prouver une compétence par une expérience concrète et son résultat.' },
    ],
    formules: [
      { label: 'Structure STAR', formule: 'Situation → Tâche → Action → Résultat', unite: '4 étapes' },
    ],
    datesReperes: [
      { repere: 'Les 30 premières secondes', detail: 'Salutation sobre, posture droite, voix posée : installent immédiatement votre crédibilité.' },
    ],
    methodes: [
      'Chronométrer sa présentation à voix haute au moins 5 fois avant le jour J.',
    ],
    erreursFrequentes: [
      'Réciter son CV dans l’ordre chronologique sans lien avec le poste ou le concours visé.',
    ],
    exemples: [
      { titre: 'Réponse STAR', contenu: 'Situation (retard logistique) → Tâche (livrer à temps) → Action (réorganisation itinéraire) → Résultat (100 % livré dans les délais).' },
    ],
    resumeExpress:
      'Un oral réussi marie présentation ciblée, réponses concrètes en STAR, honnêteté intellectuelle et maîtrise du stress.',
    tableauComparatif: {
      headers: ['Aspect', 'Attitude gagnante', 'Piège à éviter'],
      rows: [
        { critere: 'Question inconnue', elementA: 'Dire « Je ne dispose pas du chiffre exact, mais… »', elementB: 'Inventer une donnée fausse' },
        { critere: 'Regard', elementA: 'Balayer tous les membres du jury', elementB: 'Regarder ses notes ou un seul juré' },
        { critere: 'Exemples', elementA: 'Concrets et mesurés (STAR)', elementB: 'Généralités vagues' },
      ],
    },
    autoEvaluation: [
      { question: 'Que signifie chacune des 4 lettres de la méthode STAR ?', reponse: 'Situation, Tâche, Action, Résultat.' },
    ],
  },
];

export const ZENITH_QUESTIONS: Question[] = [
  // ===== RÉSEAUX & TÉLÉCOMS (5) =====
  {
    id: 'q-net-1',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-osi',
    examIds: ['concours-telecoms', 'bts-compta-info', 'concours-ingenieur'],
    prompt: 'À quelle couche du modèle OSI opère principalement un routeur IP qui achemine des paquets entre différents réseaux ?',
    options: [
      'Couche 1 — Physique',
      'Couche 2 — Liaison de données',
      'Couche 3 — Réseau',
      'Couche 7 — Application',
    ],
    correctIndex: 2,
    explanation: 'Le routeur analyse les adresses IP (paquets) et consulte sa table de routage : il opère à la Couche 3 (Réseau) du modèle OSI, tandis que le switch Ethernet opère à la Couche 2 (adresses MAC).',
    steps: [
      'Couche 2 = Switch / adresses MAC ; Couche 3 = Routeur / adresses IP.',
    ],
    notion: 'Modèle OSI — Couches & Équipements',
    difficulty: 'facile',
    ficheId: 'fiche-net-osi',
    source: 'Concours ESMT / SUP’PTIC 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-net-2',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-osi',
    examIds: ['concours-telecoms', 'bts-compta-info'],
    prompt: 'Combien d’adresses IP d’hôtes utilisables offre un sous-réseau IPv4 en notation CIDR `/26` (masque 255.255.255.192) ?',
    options: ['30', '62', '64', '126'],
    correctIndex: 1,
    explanation: 'Il reste 32 − 26 = 6 bits pour les hôtes. Le nombre d’adresses utilisables vaut 2⁶ − 2 = 64 − 2 = 62 hôtes.',
    steps: [
      'Calculer les bits hôtes : 32 − 26 = 6.',
      'Appliquer 2⁶ − 2 = 64 − 2 = 62 (en retirant adresse réseau et broadcast).',
    ],
    notion: 'Sous-réseaux IPv4 / CIDR',
    difficulty: 'moyen',
    ficheId: 'fiche-net-osi',
    source: 'Certification Réseaux / CCNA 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-net-3',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-osi',
    examIds: ['concours-telecoms', 'certif-data-ia'],
    prompt: 'Quel protocole de couche 4 privilégie-t-on pour la téléphonie sur IP (VoIP) ou la visioconférence en temps réel afin de minimiser la latence ?',
    options: ['TCP', 'UDP', 'SMTP', 'ARP'],
    correctIndex: 1,
    explanation: 'UDP fonctionne sans établissement de connexion ni réémission de paquets perdus, ce qui évite les délais bloquants sur un flux audio/vidéo en direct.',
    steps: [
      'VoIP / temps réel : mieux vaut ignorer un micro-paquet perdu que figer la conversation → UDP.',
    ],
    notion: 'TCP vs UDP',
    difficulty: 'facile',
    ficheId: 'fiche-net-osi',
    source: 'Concours Télécoms 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-net-4',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-fibre',
    examIds: ['concours-telecoms', 'concours-ingenieur'],
    prompt: 'Quel type de fibre optique utilise-t-on pour relier deux villes distantes de 40 km avec une très faible atténuation ?',
    options: [
      'Fibre multimode à saut d’indice',
      'Fibre monomode (cœur ≈ 9 µm avec source laser)',
      'Câble coaxial TV standard',
      'Paire torsadée RJ45 Cat5e sans répéteur',
    ],
    correctIndex: 1,
    explanation: 'La fibre optique monomode (cœur ≈ 9 µm, source laser) élimine la dispersion modale et autorise des liaisons de plusieurs dizaines de kilomètres.',
    steps: [
      'Longue distance (40 km) → Fibre monomode (SMF).',
    ],
    notion: 'Fibre monomode vs multimode',
    difficulty: 'facile',
    ficheId: 'fiche-net-fibre',
    source: 'Concours SUP’PTIC / Télécoms 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-net-5',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-fibre',
    examIds: ['concours-telecoms', 'concours-ingenieur'],
    prompt: 'En télécommunications, que signifie une atténuation de −3 dB sur la puissance d’un signal ?',
    options: [
      'La puissance est réduite de 3 %',
      'La puissance est divisée par 2',
      'La puissance est divisée par 10',
      'La puissance est multipliée par 3',
    ],
    correctIndex: 1,
    explanation: 'Comme 10 · log₁₀(1/2) ≈ −3,01 dB, une perte de 3 dB correspond toujours à une division par 2 de la puissance du signal.',
    steps: [
      'Retenir le repère décibel : −3 dB → ÷2 ; −10 dB → ÷10.',
    ],
    notion: 'Calcul en décibels (dB)',
    difficulty: 'moyen',
    ficheId: 'fiche-net-fibre',
    source: 'Annale Télécoms & 5G 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },

  // ===== GÉNIE CIVIL & BTP (5) =====
  {
    id: 'q-gc-1',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-rdm',
    examIds: ['concours-genie-civil', 'concours-energie-btp', 'concours-ingenieur'],
    prompt: 'Une poutre isostatique sur deux appuis simples de portée L = 8 m supporte une charge ponctuelle P = 20 kN en son milieu. Que vaut le moment fléchissant maximal M_max ?',
    options: ['20 kN·m', '40 kN·m', '80 kN·m', '160 kN·m'],
    correctIndex: 1,
    explanation: 'M_max = (P · L) / 4 = (20 × 8) / 4 = 160 / 4 = 40 kN·m au milieu de la travée.',
    steps: [
      'Formule poutre sur 2 appuis avec charge centrée : M_max = P·L / 4.',
      'Calcul : (20 × 8) / 4 = 40 kN·m.',
    ],
    notion: 'Moment fléchissant maximal (PL/4)',
    difficulty: 'moyen',
    ficheId: 'fiche-gc-rdm',
    source: 'Concours ENSTP / EAMAU 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-gc-2',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-rdm',
    examIds: ['concours-genie-civil', 'concours-ingenieur'],
    prompt: 'Dans un balcon en béton armé encastré d’un seul côté (porte-à-faux), où doit-on placer les armatures d’acier principales reprenant la traction ?',
    options: [
      'En partie inférieure uniquement',
      'En partie supérieure (nappe haute)',
      'Uniquement au centre géométrique (axe neutre)',
      'Aucun acier n’est nécessaire',
    ],
    correctIndex: 1,
    explanation: 'Sous son poids propre, un balcon en porte-à-faux fléchit vers le bas : ses fibres supérieures s’allongent (traction) et ses fibres inférieures se compriment. Les aciers principaux doivent donc impérativement être en partie haute.',
    steps: [
      'Visualiser la déformée du balcon : le dessus s’étire (zone tendue).',
      'L’acier reprend la traction → placement en partie supérieure.',
    ],
    notion: 'Position des aciers en béton armé',
    difficulty: 'moyen',
    ficheId: 'fiche-gc-rdm',
    source: 'Concours Génie Civil & Architecture 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-gc-3',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-rdm',
    examIds: ['concours-genie-civil'],
    prompt: 'Quelle propriété mécanique rend l’association béton + acier si performante en construction ?',
    options: [
      'Le béton résiste très bien à la traction et l’acier uniquement à la compression',
      'Le béton résiste bien à la compression tandis que l’acier reprend les efforts de traction',
      'Le béton et l’acier ont exactement la même masse volumique',
      'L’acier remplace complètement l’eau de gâchage',
    ],
    correctIndex: 1,
    explanation: 'Le béton excelle en compression mais fissure vite en traction ; l’acier compense cette faiblesse en reprenant les efforts de traction, avec un coefficient de dilatation thermique très proche.',
    steps: [
      'Béton = compression ; Acier = traction.',
    ],
    notion: 'Principe du béton armé',
    difficulty: 'facile',
    ficheId: 'fiche-gc-rdm',
    source: 'Annale Génie Civil BTP 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-gc-4',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-topo',
    examIds: ['concours-genie-civil', 'concours-energie-btp'],
    prompt: 'En nivellement topographique direct, le point A a une altitude Z_A = 300,00 m. On lit L_arrière = 1,80 m sur A et L_avant = 1,20 m sur B. Quelle est l’altitude Z_B ?',
    options: ['299,40 m', '300,60 m', '301,80 m', '303,00 m'],
    correctIndex: 1,
    explanation: 'Z_B = Z_A + L_arrière − L_avant = 300,00 + 1,80 − 1,20 = 300,60 m.',
    steps: [
      'Calculer la dénivelée ΔZ = 1,80 − 1,20 = +0,60 m.',
      'Ajouter à Z_A : 300,00 + 0,60 = 300,60 m.',
    ],
    notion: 'Nivellement topographique direct',
    difficulty: 'moyen',
    ficheId: 'fiche-gc-topo',
    source: 'Concours Travaux Publics / Topographie 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-gc-5',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-topo',
    examIds: ['concours-genie-civil'],
    prompt: 'Combien de sacs de ciment de 50 kg faut-il approvisionner pour couler 2 m³ de béton armé courant dosé à 350 kg/m³ ?',
    options: ['7 sacs', '10 sacs', '14 sacs', '20 sacs'],
    correctIndex: 2,
    explanation: 'Quantité de ciment = 2 m³ × 350 kg/m³ = 700 kg. En sacs de 50 kg : 700 / 50 = 14 sacs.',
    steps: [
      'Masse totale de ciment : 2 × 350 = 700 kg.',
      'Nombre de sacs : 700 / 50 = 14 sacs.',
    ],
    notion: 'Dosage béton & métrés chantier',
    difficulty: 'facile',
    ficheId: 'fiche-gc-topo',
    source: 'Concours BTP / Conduite de Travaux 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },

  // ===== JOURNALISME & COMMUNICATION (5) =====
  {
    id: 'q-jr-1',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-redac',
    examIds: ['concours-journalisme', 'bac-litteraire'],
    prompt: 'Dans la règle rédactionnelle de la « pyramide inversée », où place-t-on l’information la plus importante (les 5W) ?',
    options: [
      'Tout à la fin pour ménager le suspense',
      'Dès le début de l’article (titre, chapô et premier paragraphe)',
      'Uniquement dans la légende de la dernière photo',
      'Dans une note de bas de page',
    ],
    correctIndex: 1,
    explanation: 'La pyramide inversée place immédiatement l’essentiel (Qui, Quoi, Où, Quand, Pourquoi) en tête d’article, puis développe les détails par ordre décroissant d’importance.',
    steps: [
      'Pyramide inversée = base large en haut (l’essentiel d’abord).',
    ],
    notion: 'Pyramide inversée & 5W',
    difficulty: 'facile',
    ficheId: 'fiche-jour-redac',
    source: 'Concours ESSTIC / CESTI 2025',
    isOfficial: true,
    estimatedSeconds: 25,
  },
  {
    id: 'q-jr-2',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-redac',
    examIds: ['concours-journalisme', 'concours-diplomatie'],
    prompt: 'Quelle est la règle déontologique minimale de vérification avant de publier une information sensible obtenue d’un informateur ?',
    options: [
      'Publier immédiatement pour être le premier, quitte à corriger le lendemain',
      'Recouper l’information auprès d’au moins deux sources indépendantes concordantes',
      'Demander l’avis des commentaires anonymes sur un réseau social',
      'Transformer la rumeur en affirmation sans citer de précaution',
    ],
    correctIndex: 1,
    explanation: 'Le double recoupement indépendant est le socle de la fiabilité journalistique inscrit dans la Charte de Munich (1971).',
    steps: [
      'Fiabilité > rapidité : toujours recouper par au moins 2 sources indépendantes.',
    ],
    notion: 'Recoupement & Déontologie',
    difficulty: 'facile',
    ficheId: 'fiche-jour-redac',
    source: 'Concours Journalisme 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-jr-3',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-redac',
    examIds: ['concours-journalisme'],
    prompt: 'Parmi ces genres journalistiques, lequel est explicitement un genre d’OPINION engageant la ligne éditoriale du média ?',
    options: ['La brève', 'Le compte rendu factuel', 'L’éditorial', 'La dépêche d’agence'],
    correctIndex: 2,
    explanation: 'L’éditorial exprime la prise de position assumée de la rédaction sur un sujet d’actualité, à la différence de la brève ou de la dépêche qui restent strictement factuelles.',
    steps: [
      'Séparer faits (brève, dépêche, CR) et opinion clairement identifiée (éditorial, chronique).',
    ],
    notion: 'Genres journalistiques',
    difficulty: 'facile',
    ficheId: 'fiche-jour-redac',
    source: 'Annale Écoles de Journalisme 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-jr-4',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-crise',
    examIds: ['concours-journalisme', 'concours-diplomatie'],
    prompt: 'En communication stratégique, que désigne un objectif « conatif » ?',
    options: [
      'Faire connaître une marque ou une réforme',
      'Améliorer la sympathie ou l’image perçue',
      'Déclencher un comportement ou une action concrète chez le public cible',
      'Réduire le nombre de journalistes invités',
    ],
    correctIndex: 2,
    explanation: 'On distingue l’objectif cognitif (faire savoir), affectif (faire aimer) et conatif (faire agir : s’inscrire, voter, se faire vacciner, acheter).',
    steps: [
      'Cognitif = savoir ; Affectif = aimer ; Conatif = agir.',
    ],
    notion: 'Objectifs cognitif / affectif / conatif',
    difficulty: 'moyen',
    ficheId: 'fiche-jour-crise',
    source: 'Concours Communication 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-jr-5',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-crise',
    examIds: ['concours-journalisme', 'concours-admin'],
    prompt: 'Lors d’une crise médiatique majeure, quelle attitude est recommandée par les principes de communication de crise ?',
    options: [
      'Garder un silence total pendant plusieurs jours',
      'Désigner un porte-parole unique délivrant rapidement des faits vérifiés avec empathie',
      'Laisser chaque service communiquer des chiffres différents',
      'Nier les faits même lorsqu’ils sont documentés',
    ],
    correctIndex: 1,
    explanation: 'La communication de crise repose sur la réactivité, la cohérence (porte-parole unique), la transparence factuelle et l’empathie.',
    steps: [
      'Éviter le vide informationnel, le mensonge et la cacophonie.',
    ],
    notion: 'Principes de communication de crise',
    difficulty: 'facile',
    ficheId: 'fiche-jour-crise',
    source: 'Concours Communication Institutionnelle 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== NUTRITION & DIÉTÉTIQUE (5) =====
  {
    id: 'q-nut-1',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-macro',
    examIds: ['concours-nutrition', 'concours-paramedical', 'concours-medecine'],
    prompt: 'Un aliment contient 10 g de glucides, 5 g de lipides et 10 g de protéines. Quelle énergie totale apporte-t-il ?',
    options: ['100 kcal', '125 kcal', '150 kcal', '225 kcal'],
    correctIndex: 1,
    explanation: 'Énergie = (10 × 4) + (5 × 9) + (10 × 4) = 40 + 45 + 40 = 125 kcal.',
    steps: [
      'Glucides : 10 × 4 = 40 kcal ; Protéines : 10 × 4 = 40 kcal.',
      'Lipides : 5 × 9 = 45 kcal. Total = 40 + 45 + 40 = 125 kcal.',
    ],
    notion: 'Calcul énergétique (4-9-4 kcal/g)',
    difficulty: 'moyen',
    ficheId: 'fiche-nut-macro',
    source: 'Concours Nutrition & Diététique 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-nut-2',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-macro',
    examIds: ['concours-nutrition', 'concours-paramedical'],
    prompt: 'Un adulte pèse 72 kg et mesure 1,80 m. Quel est son Indice de Masse Corporelle (IMC) et sa catégorie OMS ?',
    options: [
      'IMC = 18,0 — Insuffisance pondérale',
      'IMC ≈ 22,2 — Corpulence normale',
      'IMC = 27,5 — Surpoids',
      'IMC = 32,0 — Obésité',
    ],
    correctIndex: 1,
    explanation: 'IMC = 72 / (1,80²) = 72 / 3,24 ≈ 22,22 kg/m², situé dans la fourchette normale OMS (18,5 à 24,9).',
    steps: [
      'Calculer 1,80² = 3,24.',
      'Diviser 72 / 3,24 ≈ 22,2 → compris entre 18,5 et 24,9 (corpulence normale).',
    ],
    notion: 'Calcul et interprétation IMC',
    difficulty: 'moyen',
    ficheId: 'fiche-nut-macro',
    source: 'Concours Santé & Nutrition 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-nut-3',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-haccp',
    examIds: ['concours-nutrition', 'concours-paramedical'],
    prompt: 'Lors d’un dépistage nutritionnel chez un enfant âgé de 18 mois, le ruban de Shakir indique un périmètre brachial (MUAC) de 112 mm (zone rouge). Quel est le diagnostic ?',
    options: [
      'Statut nutritionnel normal',
      'Malnutrition Aiguë Modérée (MAM)',
      'Malnutrition Aiguë Sévère (MAS)',
      'Surpoids infantile',
    ],
    correctIndex: 2,
    explanation: 'Chez l’enfant de 6 à 59 mois, un périmètre brachial MUAC strictement inférieur à 115 mm correspond à une Malnutrition Aiguë Sévère (MAS) nécessitant une prise en charge thérapeutique.',
    steps: [
      'Comparer 112 mm au seuil OMS de 115 mm : 112 < 115 → MAS (zone rouge).',
    ],
    notion: 'Seuils MUAC (Malnutrition aiguë)',
    difficulty: 'facile',
    ficheId: 'fiche-nut-haccp',
    source: 'Concours Nutrition Humanitaire OMS / PAM 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-nut-4',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-haccp',
    examIds: ['concours-nutrition'],
    prompt: 'Dans la méthode HACCP de sécurité sanitaire des aliments, quelle plage de température constitue la « zone de danger » de multiplication bactérienne rapide ?',
    options: [
      'Entre −25 °C et −18 °C',
      'Entre +4 °C et +63 °C',
      'Entre +85 °C et +100 °C',
      'Au-dessus de +120 °C',
    ],
    correctIndex: 1,
    explanation: 'La majorité des bactéries pathogènes alimentaires prolifèrent rapidement entre +4 °C et +63 °C : les aliments doivent donc être conservés au froid (≤ +4 °C) ou maintenus bien chauds (≥ +63 °C).',
    steps: [
      'Froid sûr ≤ +4 °C ; Chaud sûr ≥ +63 °C → Zone à risque entre +4 °C et +63 °C.',
    ],
    notion: 'Sécurité alimentaire & HACCP',
    difficulty: 'facile',
    ficheId: 'fiche-nut-haccp',
    source: 'Certification Hygiène & HACCP 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-nut-5',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-macro',
    examIds: ['concours-nutrition', 'concours-medecine'],
    prompt: 'Une carence sévère en FER dans l’alimentation provoque principalement quelle pathologie très fréquente chez la femme enceinte et le jeune enfant ?',
    options: [
      'L’anémie ferriprive',
      'Le rachitisme par manque de soleil uniquement',
      'La myopie',
      'L’hypertension artérielle aiguë',
    ],
    correctIndex: 0,
    explanation: 'Le fer est indispensable à la synthèse de l’hémoglobine des globules rouges ; sa carence entraîne une anémie ferriprive (fatigue, pâleur, risque obstétrical).',
    steps: [
      'Fer → Hémoglobine → carence = Anémie ferriprive.',
    ],
    notion: 'Carences en micronutriments',
    difficulty: 'facile',
    ficheId: 'fiche-nut-macro',
    source: 'Concours Nutrition Clinique 2026',
    isOfficial: true,
    estimatedSeconds: 30,
  },

  // ===== TOURISME & HÔTELLERIE (5) =====
  {
    id: 'q-tour-1',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-eco',
    examIds: ['certif-entrepreneuriat', 'concours-diplomatie'],
    prompt: 'Quels deux sites tchadiens d’exception sont inscrits sur la liste du patrimoine mondial de l’UNESCO ?',
    options: [
      'Les Lacs d’Ounianga et le Massif de l’Ennedi',
      'Le Mont Kilimandjaro et les Chutes Victoria',
      'Le Delta du Saloum et l’Île de Gorée',
      'Le Parc de la Pendjari et Tombouctou',
    ],
    correctIndex: 0,
    explanation: 'Les Lacs d’Ounianga (inscrits en 2012, bien naturel) et le Massif de l’Ennedi (inscrit en 2016, bien mixte naturel et culturel) sont les deux sites du Tchad classés au patrimoine mondial de l’UNESCO.',
    steps: [
      'Ounianga (2012) + Ennedi (2016) = patrimoine mondial UNESCO au Tchad.',
    ],
    notion: 'Patrimoine mondial UNESCO',
    difficulty: 'facile',
    ficheId: 'fiche-tour-eco',
    source: 'Concours Tourisme & Culture Générale 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-tour-2',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-eco',
    examIds: ['certif-entrepreneuriat'],
    prompt: 'En écotourisme, que désigne la « capacité de charge » d’un parc naturel ou d’un site culturel ?',
    options: [
      'Le poids maximal des bagages dans l’avion',
      'Le nombre maximal de visiteurs pouvant être accueillis sans dégrader l’écosystème ni la qualité de visite',
      'Le nombre total d’étoiles d’un hôtel',
      'Le montant de la taxe aéroportuaire',
    ],
    correctIndex: 1,
    explanation: 'La capacité de charge fixe le seuil soutenable de fréquentation touristique au-delà duquel le milieu naturel, le patrimoine ou l’accueil local se détériorent.',
    steps: [
      'Capacité de charge = limite de fréquentation durable d’un site.',
    ],
    notion: 'Tourisme durable & Capacité de charge',
    difficulty: 'facile',
    ficheId: 'fiche-tour-eco',
    source: 'Certification Tourisme Durable 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-tour-3',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-yield',
    examIds: ['certif-entrepreneuriat', 'certif-supply-rh'],
    prompt: 'Un hôtel dispose de 50 chambres. Ce soir, 40 chambres sont louées à un prix moyen (PMC) de 30 000 FCFA. Quel est le RevPAR ?',
    options: ['20 000 FCFA', '24 000 FCFA', '30 000 FCFA', '37 500 FCFA'],
    correctIndex: 1,
    explanation: 'TO = 40 / 50 = 0,80 (80 %). RevPAR = TO × PMC = 0,80 × 30 000 = 24 000 FCFA (ou CA 1 200 000 / 50 = 24 000 FCFA).',
    steps: [
      'Calculer TO = 40 / 50 = 0,80.',
      'Multiplier par PMC : RevPAR = 0,80 × 30 000 = 24 000 FCFA.',
    ],
    notion: 'Calcul du RevPAR hôtelier',
    difficulty: 'moyen',
    ficheId: 'fiche-tour-yield',
    source: 'Gestion Hôtelière & Yield 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-tour-4',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-yield',
    examIds: ['certif-entrepreneuriat'],
    prompt: 'Quel est l’objectif principal du Yield Management (gestion du revenu) dans l’hôtellerie et le transport aérien ?',
    options: [
      'Maintenir un tarif fixe identique toute l’année même en basse saison',
      'Ajuster dynamiquement les prix selon la demande pour maximiser le revenu d’une capacité fixe et périssable',
      'Fermer l’établissement en haute saison',
      'Supprimer les réservations en ligne',
    ],
    correctIndex: 1,
    explanation: 'Comme une chambre ou un siège d’avion non vendu ne se stocke pas, le Yield Management module les tarifs en temps réel selon la demande et l’anticipation.',
    steps: [
      'Capacité fixe + service périssable → tarification dynamique pour maximiser le RevPAR.',
    ],
    notion: 'Principe du Yield Management',
    difficulty: 'facile',
    ficheId: 'fiche-tour-yield',
    source: 'Certification Hôtellerie 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-tour-5',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-yield',
    examIds: ['certif-entrepreneuriat'],
    prompt: 'Un écolodge réalise 900 000 FCFA de chiffre d’affaires hébergement en vendant 18 nuitées sur 30 disponibles. Quel est son Prix Moyen par Chambre louée (PMC) ?',
    options: ['30 000 FCFA', '45 000 FCFA', '50 000 FCFA', '60 000 FCFA'],
    correctIndex: 2,
    explanation: 'PMC = CA Hébergement / Chambres vendues = 900 000 / 18 = 50 000 FCFA (tandis que le RevPAR vaut 900 000 / 30 = 30 000 FCFA).',
    steps: [
      'Ne pas confondre dénominateur PMC (chambres vendues = 18) et RevPAR (disponibles = 30).',
      'PMC = 900 000 / 18 = 50 000 FCFA.',
    ],
    notion: 'Distinction PMC vs RevPAR',
    difficulty: 'moyen',
    ficheId: 'fiche-tour-yield',
    source: 'Annale Management Hôtelier 2026',
    isOfficial: true,
    estimatedSeconds: 40,
  },

  // ===== RÉDACTION ADMINISTRATIVE & ORAL (5) =====
  {
    id: 'q-red-1',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    examIds: ['concours-admin', 'concours-magistrature', 'concours-finances-banque'],
    prompt: 'Quelle règle est IMPÉRATIVE dans une épreuve de « note de synthèse » pure aux concours administratifs ?',
    options: [
      'Défendre vigoureusement son opinion politique personnelle',
      'S’appuyer exclusivement sur les documents du dossier avec objectivité et neutralité',
      'Recopier intégralement le premier document sans plan',
      'Citer de longs passages de livres extérieurs au dossier',
    ],
    correctIndex: 1,
    explanation: 'La note de synthèse restitue fidèlement, clairement et sans parti pris les informations contenues uniquement dans le dossier fourni, selon un plan structuré.',
    steps: [
      'Note de synthèse pure = 100 % dossier, 0 % avis personnel ni connaissances extérieures.',
    ],
    notion: 'Règles de la note de synthèse',
    difficulty: 'facile',
    ficheId: 'fiche-red-note',
    source: 'Concours ENAM — Méthodologie 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-red-2',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    examIds: ['concours-admin', 'concours-magistrature', 'concours-police-douanes'],
    prompt: 'Quel document administratif se distingue du simple compte rendu par sa force probante officielle (il fait foi jusqu’à preuve du contraire) ?',
    options: [
      'La note de service',
      'Le procès-verbal (PV)',
      'Le dépliant publicitaire',
      'Le mémo informel',
    ],
    correctIndex: 1,
    explanation: 'Le procès-verbal est établi par une personne habilitée (OPJ, secrétaire de séance, conseil) et constitue une preuve juridique faisant foi jusqu’à preuve contraire.',
    steps: [
      'Compte rendu = informatif ; Procès-verbal = force probante officielle.',
    ],
    notion: 'Procès-verbal vs Compte rendu',
    difficulty: 'facile',
    ficheId: 'fiche-red-note',
    source: 'Concours Fonction Publique & Police 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-red-3',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    examIds: ['concours-admin', 'concours-finances-banque'],
    prompt: 'Dans une correspondance administrative adressée à une haute autorité, que signifie la mention « S/C » (Sous couvert de) ?',
    options: [
      'Sans copie',
      'Respect de la voie hiérarchique en transmettant le courrier par l’intermédiaire du supérieur direct',
      'Secret confidentiel absolu',
      'Service comptable uniquement',
    ],
    correctIndex: 1,
    explanation: 'La mention « S/C » (Sous couvert de) matérialise le respect de la voie hiérarchique : la lettre passe par les supérieurs intermédiaires avant d’atteindre le destinataire final.',
    steps: [
      'S/C = Sous couvert de → respect du circuit hiérarchique.',
    ],
    notion: 'Voie hiérarchique (S/C)',
    difficulty: 'facile',
    ficheId: 'fiche-red-note',
    source: 'Annale Rédaction Administrative ENAM 2025',
    isOfficial: true,
    estimatedSeconds: 30,
  },
  {
    id: 'q-red-4',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    examIds: ['concours-admin', 'concours-journalisme'],
    prompt: 'Par quoi se termine obligatoirement un « rapport administratif » adressé à un supérieur hiérarchique ?',
    options: [
      'Par une anecdote personnelle',
      'Par des propositions concrètes soumises à la décision du supérieur',
      'Par un silence sans conclusion',
      'Par une sanction directe infligée au supérieur',
    ],
    correctIndex: 1,
    explanation: 'Contrairement au compte rendu qui se borne à relater des faits, le rapport analyse un problème en profondeur et formule des propositions précises d’action soumises à l’arbitrage du décideur.',
    steps: [
      'Rapport = Constat + Analyse + Propositions de décision.',
    ],
    notion: 'Structure du rapport administratif',
    difficulty: 'moyen',
    ficheId: 'fiche-red-note',
    source: 'Concours Attaché d’Administration 2026',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-red-5',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-oral',
    examIds: ['concours-admin', 'concours-journalisme', 'concours-magistrature'],
    prompt: 'En entretien ou oral de concours, que représentent les 4 lettres de la méthode STAR pour illustrer une expérience réussie ?',
    options: [
      'Sujet, Théorie, Argument, Résumé',
      'Situation, Tâche, Action, Résultat',
      'Statut, Travail, Avenir, Rémunération',
      'Stratégie, Temps, Accord, Règle',
    ],
    correctIndex: 1,
    explanation: 'La méthode STAR (Situation, Tâche, Action personnelle, Résultat mesurable) permet de répondre avec précision et crédibilité aux questions comportementales d’un jury.',
    steps: [
      'S = Situation · T = Tâche · A = Action · R = Résultat.',
    ],
    notion: 'Oral de concours — Méthode STAR',
    difficulty: 'facile',
    ficheId: 'fiche-red-oral',
    source: 'Prépa Grand Oral de Concours 2026',
    isOfficial: true,
    estimatedSeconds: 25,
  },
];

export const ZENITH_ANNALES: Annale[] = [
  // Télécoms & Réseaux
  {
    id: 'ann-tel-osi-2025',
    title: 'Concours Télécoms (ESMT / SUP’PTIC) 2025 — Modèle OSI, IPv4/CIDR & Fibre Optique',
    examId: 'concours-telecoms',
    subjectId: 'reseaux_telecoms',
    chapterIds: ['ch-net-osi', 'ch-net-fibre'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-net-1', 'q-net-2', 'q-net-3', 'q-net-4', 'q-net-5'],
    examType: 'Épreuve Réseaux & Télécoms',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'Afrique francophone / International',
    instructions: 'Calculez les puissances de 2 sans calculatrice pour l’adressage CIDR.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-tel-secu-2026',
    title: 'Concours Réseaux, Cloud & Cybersécurité 2026 — OSI, SQL & Sécurité',
    examId: 'concours-telecoms',
    subjectId: 'reseaux_telecoms',
    chapterIds: ['ch-net-osi', 'ch-net-fibre'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-net-1', 'q-net-2', 'q-net-5', 'q-cy-1', 'q-info-1'],
    examType: 'Épreuve technique complète',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'Écoles Télécoms / CCNA',
    instructions: 'Combinez routage réseau, SQL et fondamentaux cybersécurité.',
    bareme: '20 points',
  },
  // Génie Civil & BTP
  {
    id: 'ann-gc-rdm-2025',
    title: 'Concours Génie Civil & Architecture (EAMAU / ENSTP) 2025 — RDM, Béton Armé & Topo',
    examId: 'concours-genie-civil',
    subjectId: 'genie_civil_btp',
    chapterIds: ['ch-gc-rdm', 'ch-gc-topo'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 40,
    questionIds: ['q-gc-1', 'q-gc-2', 'q-gc-3', 'q-gc-4', 'q-gc-5'],
    examType: 'Épreuve Construction & RDM',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'EAMAU Lomé / ENSTP / Afrique',
    instructions: 'Vérifiez systématiquement les signes de dénivelée et les unités (kN·m, kg/m³).',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-gc-mix-2026',
    title: 'Concours Travaux Publics & Énergie 2026 — RDM, Physique & Maths',
    examId: 'concours-genie-civil',
    subjectId: 'genie_civil_btp',
    chapterIds: ['ch-gc-rdm', 'ch-gc-topo'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 45,
    questionIds: ['q-gc-1', 'q-gc-4', 'q-gc-5', 'q-p-1', 'q-m-1'],
    examType: 'Épreuve scientifique BTP',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 170,
    shareable: true,
    countryOrZone: 'Écoles d’Ingénieurs & BTP',
    instructions: 'Raisonnez sur la statique avant de valider chaque valeur numérique.',
    bareme: '20 points',
  },
  // Journalisme & Communication
  {
    id: 'ann-jour-2025',
    title: 'Concours Journalisme (ESSTIC / CESTI) 2025 — Pyramide inversée, Déontologie & Crise',
    examId: 'concours-journalisme',
    subjectId: 'journalisme_comm',
    chapterIds: ['ch-jour-redac', 'ch-jour-crise'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 30,
    questionIds: ['q-jr-1', 'q-jr-2', 'q-jr-3', 'q-jr-4', 'q-jr-5'],
    examType: 'Épreuve Médias & Communication',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 145,
    shareable: true,
    countryOrZone: 'Yaoundé (ESSTIC) / Dakar (CESTI) / Tchad',
    instructions: 'Distinguez rigoureusement genres factuels et genres d’opinion.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-jour-mix-2026',
    title: 'Concours Journalisme & Diplomatie 2026 — Médias, Français, ONU & Oral',
    examId: 'concours-journalisme',
    subjectId: 'journalisme_comm',
    chapterIds: ['ch-jour-redac', 'ch-jour-crise'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-jr-1', 'q-jr-2', 'q-fr-1', 'q-ri-1', 'q-red-5'],
    examType: 'Épreuve de culture médiatique et générale',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 150,
    shareable: true,
    countryOrZone: 'Afrique francophone',
    instructions: 'Épreuve rapide de 35 min couvrant médias, langue et actualité internationale.',
    bareme: '20 points',
  },
  // Nutrition & Sécurité Alimentaire
  {
    id: 'ann-nut-2025',
    title: 'Concours Nutrition & Sécurité Alimentaire (OMS / PAM) 2025 — Calories, IMC, MUAC & HACCP',
    examId: 'concours-nutrition',
    subjectId: 'nutrition_sante',
    chapterIds: ['ch-nut-macro', 'ch-nut-haccp'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-nut-1', 'q-nut-2', 'q-nut-3', 'q-nut-4', 'q-nut-5'],
    examType: 'Épreuve Nutrition Clinique & Humanitaire',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'Sahel / OMS / PAM / UNICEF',
    instructions: 'Appliquez la règle 4-9-4 kcal/g et les seuils MUAC OMS.',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-nut-sante-2026',
    title: 'Concours Santé & Sécurité Alimentaire 2026 — Nutrition, Épidémiologie & Agronomie',
    examId: 'concours-nutrition',
    subjectId: 'nutrition_sante',
    chapterIds: ['ch-nut-macro', 'ch-nut-haccp'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 40,
    questionIds: ['q-nut-1', 'q-nut-3', 'q-nut-4', 'q-sp-1', 'q-agro-2'],
    examType: 'Étude de cas One Health / Sécurité alimentaire',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'Sahel / Afrique centrale & ouest',
    instructions: 'Approche transversale nutrition, santé publique et production agricole.',
    bareme: '20 points',
  },
  // Rédaction Administrative & Concours phares 2026
  {
    id: 'ann-enam-redac-2025',
    title: 'Concours ENAM 2025 — Rédaction Administrative, Note de Synthèse & Oral',
    examId: 'concours-admin',
    subjectId: 'methodo_redaction',
    chapterIds: ['ch-red-note', 'ch-red-oral'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 30,
    questionIds: ['q-red-1', 'q-red-2', 'q-red-3', 'q-red-4', 'q-red-5'],
    examType: 'Épreuve Méthodologie Administrative',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 145,
    shareable: true,
    countryOrZone: 'Tchad / ENA / ENAM francophones',
    instructions: 'Vérifiez chaque règle formelle (S/C, PV vs CR, neutralité de la note).',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-mag-redac-2026',
    title: 'Concours Magistrature & Police 2026 — Procès-verbal, Note de Synthèse & Droit Public',
    examId: 'concours-magistrature',
    subjectId: 'methodo_redaction',
    chapterIds: ['ch-red-note', 'ch-red-oral'],
    year: 2026,
    difficulty: 'difficile',
    durationMinutes: 35,
    questionIds: ['q-red-1', 'q-red-2', 'q-red-3', 'q-d-1', 'q-fp-1'],
    examType: 'Épreuve d’admissibilité juridique & administrative',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 150,
    shareable: true,
    countryOrZone: 'ENM / Écoles de Police',
    instructions: 'Rigueur terminologique exigée sur la portée probante des actes.',
    bareme: '20 points',
  },
  // Tourisme & Entrepreneuriat
  {
    id: 'ann-tour-2025',
    title: 'Certification Tourisme Durable & Hôtellerie 2025 — UNESCO, RevPAR & Yield Management',
    examId: 'certif-entrepreneuriat',
    subjectId: 'tourisme_hotel',
    chapterIds: ['ch-tour-eco', 'ch-tour-yield'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-tour-1', 'q-tour-2', 'q-tour-3', 'q-tour-4', 'q-tour-5'],
    examType: 'Étude de cas Hôtellerie & Écotourisme',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'Tchad / Afrique / International',
    instructions: 'Distinguez bien le calcul du PMC (chambres vendues) et du RevPAR (disponibles).',
    bareme: '5 questions × 4 pts = 20 pts',
  },
  {
    id: 'ann-tour-dip-2026',
    title: 'Concours Diplomatie Culturelle & Tourisme 2026 — Patrimoine UNESCO, Marketing & Crise',
    examId: 'concours-diplomatie',
    subjectId: 'tourisme_hotel',
    chapterIds: ['ch-tour-eco', 'ch-tour-yield'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-tour-1', 'q-tour-2', 'q-jr-5', 'q-mkt-1', 'q-ri-4'],
    examType: 'Épreuve Diplomatie Culturelle',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 150,
    shareable: true,
    countryOrZone: 'UNESCO / UA / CBLT',
    instructions: 'Rayonnement culturel, patrimoine mondial et communication institutionnelle.',
    bareme: '20 points',
  },
  // BTS & Concours Paramédical 2026
  {
    id: 'ann-bts-net-2026',
    title: 'BTS Informatique & Réseaux 2026 — Modèle OSI, CIDR, SQL & Fibre Optique',
    examId: 'bts-compta-info',
    subjectId: 'reseaux_telecoms',
    chapterIds: ['ch-net-osi', 'ch-net-fibre'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 40,
    questionIds: ['q-net-1', 'q-net-2', 'q-net-3', 'q-net-4', 'q-info-1'],
    examType: 'Examen national BTS',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 160,
    shareable: true,
    countryOrZone: 'BTS / DUT francophones',
    instructions: 'Épreuve technique réseaux et bases de données — Session 2026.',
    bareme: '20 points',
  },
  {
    id: 'ann-ide-nut-2026',
    title: 'Concours Paramédical & IDE 2026 — Nutrition Pédiatrique (MUAC), IMC & Pharmacologie',
    examId: 'concours-paramedical',
    subjectId: 'nutrition_sante',
    chapterIds: ['ch-nut-macro', 'ch-nut-haccp'],
    year: 2026,
    difficulty: 'moyen',
    durationMinutes: 35,
    questionIds: ['q-nut-2', 'q-nut-3', 'q-nut-5', 'q-pharm-3', 'q-sp-1'],
    examType: 'Épreuve clinique intégrée',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 155,
    shareable: true,
    countryOrZone: 'ENASS / Écoles Infirmiers',
    instructions: 'Maîtrise conjointe des calculs cliniques (IMC, MUAC, posologie pédiatrique).',
    bareme: '20 points',
  },
];

export const ZENITH_FLASHCARDS: Flashcard[] = [
  // Réseaux & Télécoms (3)
  {
    id: 'fc-net-1',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-osi',
    question: 'À quelles couches OSI correspondent respectivement le Switch Ethernet, le Routeur IP et les ports TCP/UDP ?',
    answer: 'Switch = Couche 2 (Liaison / MAC) ; Routeur = Couche 3 (Réseau / IP) ; TCP/UDP = Couche 4 (Transport / Ports).',
  },
  {
    id: 'fc-net-2',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-osi',
    question: 'Comment calcule-t-on le nombre d’adresses d’hôtes IPv4 utilisables pour un préfixe `/n` ?',
    answer: '2^(32 − n) − 2 (on retire l’adresse réseau et l’adresse broadcast).',
    formula: 'N = 2^(32 − n) − 2',
    example: 'Pour /24 → 2⁸ − 2 = 254 hôtes.',
  },
  {
    id: 'fc-net-3',
    subjectId: 'reseaux_telecoms',
    chapterId: 'ch-net-fibre',
    question: 'Que signifie une variation de −3 dB et de −10 dB en télécommunications ?',
    answer: '−3 dB = puissance divisée par 2 ; −10 dB = puissance divisée par 10.',
  },
  // Génie Civil & BTP (3)
  {
    id: 'fc-gc-1',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-rdm',
    question: 'Quelles sont les formules du moment fléchissant maximal d’une poutre sur 2 appuis simples sous charge ponctuelle centrée P puis sous charge répartie q ?',
    answer: 'Charge ponctuelle centrée : M_max = P·L / 4 ; Charge uniformément répartie : M_max = q·L² / 8.',
    formula: 'PL/4  |  qL²/8',
  },
  {
    id: 'fc-gc-2',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-rdm',
    question: 'Où place-t-on les armatures d’acier principales dans une poutre sur 2 appuis vs un balcon en porte-à-faux ?',
    answer: 'Poutre sur 2 appuis : en BAS (zone tendue) ; Balcon en porte-à-faux : en HAUT (zone tendue).',
  },
  {
    id: 'fc-gc-3',
    subjectId: 'genie_civil_btp',
    chapterId: 'ch-gc-topo',
    question: 'Quelle formule donne l’altitude Z_B en nivellement topographique direct à partir de Z_A ?',
    answer: 'Z_B = Z_A + Lecture Arrière − Lecture Avant.',
    formula: 'Z_B = Z_A + L_ar − L_av',
  },
  // Journalisme & Communication (3)
  {
    id: 'fc-jr-1',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-redac',
    question: 'Que sont les 5W à placer dès le début d’un article selon la pyramide inversée ?',
    answer: 'Who (Qui), What (Quoi), Where (Où), When (Quand) et Why (Pourquoi) + How (Comment).',
  },
  {
    id: 'fc-jr-2',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-crise',
    question: 'Quels sont les 3 grands types d’objectifs d’un plan de communication ?',
    answer: 'Cognitif (faire savoir), Affectif (faire aimer) et Conatif (faire agir).',
  },
  {
    id: 'fc-jr-3',
    subjectId: 'journalisme_comm',
    chapterId: 'ch-jour-crise',
    question: 'Quels sont les 4 réflexes clés d’une bonne communication de crise ?',
    answer: 'Rapidité, transparence factuelle, empathie et porte-parole unique.',
  },
  // Nutrition & Santé (3)
  {
    id: 'fc-nut-1',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-macro',
    question: 'Combien de kilocalories (kcal) apporte 1 gramme de glucides, de lipides et de protéines ?',
    answer: 'Glucides = 4 kcal/g ; Lipides = 9 kcal/g ; Protéines = 4 kcal/g (mémo 4-9-4).',
    formula: '4 · 9 · 4 kcal/g',
  },
  {
    id: 'fc-nut-2',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-haccp',
    question: 'Quels sont les seuils OMS du périmètre brachial (MUAC) chez l’enfant de 6 à 59 mois ?',
    answer: 'MAS (rouge) < 115 mm ; MAM (jaune) 115–124 mm ; Normal (vert) ≥ 125 mm.',
  },
  {
    id: 'fc-nut-3',
    subjectId: 'nutrition_sante',
    chapterId: 'ch-nut-haccp',
    question: 'Quelle est la zone de température à risque bactérien rapide en hygiène alimentaire HACCP ?',
    answer: 'Entre +4 °C et +63 °C (froid sûr ≤ +4 °C ; chaud sûr ≥ +63 °C).',
  },
  // Tourisme & Hôtellerie (3)
  {
    id: 'fc-tour-1',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-eco',
    question: 'Quels sont les deux sites tchadiens classés au patrimoine mondial de l’UNESCO ?',
    answer: 'Les Lacs d’Ounianga (2012) et le Massif de l’Ennedi (2016, site mixte naturel et culturel).',
  },
  {
    id: 'fc-tour-2',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-yield',
    question: 'Comment calcule-t-on le RevPAR en hôtellerie ?',
    answer: 'RevPAR = Taux d’Occupation (TO) × Prix Moyen par Chambre (PMC) = CA Hébergement / Chambres disponibles.',
    formula: 'RevPAR = TO × PMC',
  },
  {
    id: 'fc-tour-3',
    subjectId: 'tourisme_hotel',
    chapterId: 'ch-tour-yield',
    question: 'Pourquoi le Yield Management est-il essentiel dans l’hôtellerie et l’aérien ?',
    answer: 'Parce que la capacité est fixe et le service est périssable : une chambre non vendue ce soir est définitivement perdue.',
  },
  // Rédaction Administrative & Oral (3)
  {
    id: 'fc-red-1',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    question: 'Quelle différence juridique essentielle oppose le procès-verbal (PV) au compte rendu (CR) ?',
    answer: 'Le PV est un acte officiel à force probante (fait foi jusqu’à preuve contraire) ; le CR est un récit informatif sans portée probante.',
  },
  {
    id: 'fc-red-2',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-note',
    question: 'Que signifie la mention « S/C » sur un courrier administratif ?',
    answer: '« Sous couvert de » : matérialise le respect de la voie hiérarchique.',
  },
  {
    id: 'fc-red-3',
    subjectId: 'methodo_redaction',
    chapterId: 'ch-red-oral',
    question: 'Que signifie l’acronyme STAR pour structurer une réponse à l’oral de concours ?',
    answer: 'Situation → Tâche → Action personnelle → Résultat mesurable.',
  },
];
