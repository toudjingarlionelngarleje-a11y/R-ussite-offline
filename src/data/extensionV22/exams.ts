import { Annale, ExamTrack, Question } from '../../types';

/**
 * v22.0 — Six nouveaux parcours d’examen, sans recouvrement avec les 71
 * existants : environnement, statistique publique, transport-logistique,
 * hôtellerie-restauration, cybersécurité industrielle et sport-éducation.
 */
export const V22_EXAMS: ExamTrack[] = [
  {
    id: 'concours-eaux-forets-environnement',
    name: 'Concours Eaux, Forêts, Climat & Environnement',
    shortName: 'Eaux & Forêts',
    category: 'Concours administratif',
    description:
      'Hydrologie et gestion de l’eau, foresterie-biodiversité, agronomie durable, géologie minière, énergies renouvelables et normes HSE.',
    level: 'Bac+2 / Licence / Master',
    subjectIds: [
      'hydrologie_eau_climat',
      'foresterie_biodiversite',
      'agronomie_env',
      'geologie_mines',
      'energies_renouv',
      'qualite_hse_iso',
    ],
    badgeColor: '#15803D',
  },
  {
    id: 'concours-statistique-publique',
    name: 'Concours Statistique Publique, Démographie & Prévision',
    shortName: 'Statistique publique',
    category: 'Concours administratif',
    description:
      'Statistiques descriptives et inférentielles, économétrie-prévision, sociologie et démographie, aménagement du territoire, data et IA.',
    level: 'Licence / Master',
    subjectIds: [
      'statistiques',
      'econometrie_prevision',
      'sociologie_anthropo',
      'geographie_amenagement',
      'data_ia',
      'economie',
    ],
    badgeColor: '#0F766E',
  },
  {
    id: 'concours-transports-logistique',
    name: 'Concours Transports, Logistique & Commerce International',
    shortName: 'Transport & Logistique',
    category: 'Concours professionnel',
    description:
      'Chaîne logistique et entrepôts, commerce maritime et affrètement, douanes et fiscalité, gestion de projet et relations internationales.',
    level: 'Bac+2 / Licence',
    subjectIds: [
      'logistique_ci',
      'commerce_maritime',
      'droit_fiscal_douanes',
      'gestion_projet',
      'economie',
      'relations_inter',
    ],
    badgeColor: '#B45309',
  },
  {
    id: 'concours-restauration-hotellerie',
    name: 'Concours Hôtellerie, Restauration & Tourisme Durable',
    shortName: 'Hôtellerie-Restauration',
    category: 'Concours professionnel',
    description:
      'Management hôtelier et écotourisme, nutrition et hygiène alimentaire, marketing, ressources humaines, gestion comptable et qualité.',
    level: 'Bac / Bac+2 / Licence',
    subjectIds: [
      'tourisme_hotel',
      'nutrition_sante',
      'marketing_entrep',
      'grh_travail',
      'comptabilite',
      'qualite_hse_iso',
    ],
    badgeColor: '#C2410C',
  },
  {
    id: 'certif-cybersecurite-ot',
    name: 'Certification Cybersécurité Industrielle & Systèmes OT',
    shortName: 'Cyber OT',
    category: 'Certification professionnelle',
    description:
      'Sécurité des systèmes industriels, automatique et supervision, objets connectés, réseaux télécoms, sûreté de fonctionnement et droit numérique.',
    level: 'Professionnel / Ingénieur',
    subjectIds: [
      'cybersecurite',
      'automatique_controle',
      'iot_systemes_embarques',
      'reseaux_telecoms',
      'sciences_ingenieur',
      'droit_numerique',
    ],
    badgeColor: '#1D4ED8',
  },
  {
    id: 'concours-education-physique-sport',
    name: 'Concours Éducation Physique, Sport & Santé',
    shortName: 'EPS & Sport',
    category: 'Concours administratif',
    description:
      'Sciences du sport et planification de l’entraînement, santé publique, psychologie cognitive, pédagogie, anatomie et nutrition.',
    level: 'Licence / Master',
    subjectIds: [
      'eps_sciences_sport',
      'sante_publique',
      'psychologie_cog',
      'pedagogie',
      'anatomie_physio',
      'nutrition_sante',
    ],
    badgeColor: '#BE185D',
  },
];

/** Rattachement des nouveaux parcours aux matières existantes (aucune matière créée). */
export const V22_EXAM_LINKS: Record<string, string[]> = {
  hydrologie_eau_climat: ['concours-eaux-forets-environnement'],
  foresterie_biodiversite: ['concours-eaux-forets-environnement'],
  agronomie_env: ['concours-eaux-forets-environnement'],
  geologie_mines: ['concours-eaux-forets-environnement'],
  energies_renouv: ['concours-eaux-forets-environnement'],
  qualite_hse_iso: ['concours-eaux-forets-environnement', 'concours-restauration-hotellerie'],
  statistiques: ['concours-statistique-publique'],
  econometrie_prevision: ['concours-statistique-publique'],
  sociologie_anthropo: ['concours-statistique-publique'],
  geographie_amenagement: ['concours-statistique-publique'],
  data_ia: ['concours-statistique-publique'],
  economie: ['concours-statistique-publique', 'concours-transports-logistique'],
  logistique_ci: ['concours-transports-logistique'],
  commerce_maritime: ['concours-transports-logistique'],
  droit_fiscal_douanes: ['concours-transports-logistique'],
  gestion_projet: ['concours-transports-logistique'],
  relations_inter: ['concours-transports-logistique'],
  tourisme_hotel: ['concours-restauration-hotellerie'],
  nutrition_sante: ['concours-restauration-hotellerie', 'concours-education-physique-sport'],
  marketing_entrep: ['concours-restauration-hotellerie'],
  grh_travail: ['concours-restauration-hotellerie'],
  comptabilite: ['concours-restauration-hotellerie'],
  cybersecurite: ['certif-cybersecurite-ot'],
  automatique_controle: ['certif-cybersecurite-ot'],
  iot_systemes_embarques: ['certif-cybersecurite-ot'],
  reseaux_telecoms: ['certif-cybersecurite-ot'],
  sciences_ingenieur: ['certif-cybersecurite-ot'],
  droit_numerique: ['certif-cybersecurite-ot'],
  eps_sciences_sport: ['concours-education-physique-sport'],
  sante_publique: ['concours-education-physique-sport'],
  psychologie_cog: ['concours-education-physique-sport'],
  pedagogie: ['concours-education-physique-sport'],
  anatomie_physio: ['concours-education-physique-sport'],
};

const SESSIONS: Array<{ year: number; session: string; difficulty: Annale['difficulty']; duration: number }> = [
  { year: 2026, session: 'Session principale', difficulty: 'difficile', duration: 180 },
  { year: 2025, session: 'Session de rattrapage', difficulty: 'moyen', duration: 150 },
  { year: 2024, session: 'Session principale', difficulty: 'moyen', duration: 150 },
  { year: 2023, session: 'Session unique', difficulty: 'facile', duration: 120 },
];

const QUESTIONS_PER_PAPER = 12;

/**
 * Construit 24 annales inédites (6 parcours × 4 sessions) en puisant dans les
 * questions déjà présentes dans le catalogue : aucune question n’est dupliquée,
 * seuls les assemblages et les barèmes sont nouveaux.
 */
export function buildAnnalesV22(questions: Question[]): Annale[] {
  const bySubject = new Map<string, Question[]>();
  questions.forEach((q) => {
    if (!q.chapterId) return;
    const bucket = bySubject.get(q.subjectId);
    if (bucket) bucket.push(q);
    else bySubject.set(q.subjectId, [q]);
  });

  const annales: Annale[] = [];
  V22_EXAMS.forEach((exam) => {
    const pool: Question[] = [];
    exam.subjectIds.forEach((subjectId) => {
      pool.push(...(bySubject.get(subjectId) ?? []));
    });
    if (pool.length === 0) return;
    SESSIONS.forEach((cfg, sessionIndex) => {
      const picked: Question[] = [];
      const step = Math.max(1, Math.floor(pool.length / QUESTIONS_PER_PAPER));
      for (let i = 0; i < QUESTIONS_PER_PAPER; i += 1) {
        const start = (sessionIndex * 37 + i * step) % pool.length;
        let candidate = pool[start];
        let guard = 0;
        while (picked.some((p) => p.id === candidate.id) && guard < pool.length) {
          candidate = pool[(start + guard + 1) % pool.length];
          guard += 1;
        }
        picked.push(candidate);
      }
      const chapterIds = Array.from(new Set(picked.map((q) => q.chapterId).filter(Boolean)));
      const points = (20 / picked.length).toFixed(1).replace('.0', '');
      annales.push({
        id: `annale-v22-${exam.id}-${cfg.year}`,
        title: `${exam.shortName} — Épreuve ${cfg.year} (${cfg.session})`,
        examId: exam.id,
        subjectId: picked[0].subjectId,
        chapterIds,
        year: cfg.year,
        difficulty: cfg.difficulty,
        durationMinutes: cfg.duration,
        questionIds: picked.map((q) => q.id),
        examType: exam.shortName,
        language: 'Français',
        responseFormat: cfg.duration >= 180 ? 'Étude de cas' : 'QCM & Problèmes',
        sizeKb: 30,
        shareable: true,
        countryOrZone: 'Afrique francophone / CEMAC-UEMOA',
        instructions: `Traitez les ${picked.length} questions en ${cfg.duration} minutes. Justifiez chaque réponse et gérez votre temps : ${points} point(s) par question.`,
        bareme: `20 points (${points} pt par question ; aucune pénalité en entraînement, −0,25 pt optionnel en simulation concours).`,
      });
    });
  });
  return annales;
}
