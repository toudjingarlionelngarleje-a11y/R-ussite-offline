import { ExamTrack } from '../../types';

/**
 * v17.7 — Deux parcours d'examen dédiés à la Première, désormais scindée en
 * filière scientifique (séries C & D) et filière littéraire (séries A4 & A5).
 * Porte le catalogue de 65 à 67 examens / concours / certifications.
 */
export const PREMIERE_NEW_EXAMS: ExamTrack[] = [
  {
    id: 'premiere-scientifique',
    name: 'Première Scientifique (Séries C & D) — Contrôle continu & préparation anticipée du Bac',
    shortName: '1ère S — Sciences',
    category: 'Lycée — Première',
    description:
      'Parcours complet de Première scientifique : maths (second degré, suites, dérivation, trigonométrie et produit scalaire), physique (ondes, champs, mécanique, courant alternatif), SVT (génétique, immunologie, reproduction, géologie), chimie (atome, acides-bases, oxydoréduction, chimie organique) et informatique (algorithmique Python, données, réseaux, SQL) — avec le tronc commun (français, histoire-géographie, langues).',
    level: 'Première (1ère S / C / D)',
    subjectIds: [
      'maths',
      'physique',
      'svt',
      'chimie_bio',
      'informatique',
      'francais',
      'histoire_geo',
      'anglais',
      'eps_sciences_sport',
    ],
    classLevels: ['1ere-s'],
    badgeColor: '#1d4ed8',
  },
  {
    id: 'premiere-litteraire',
    name: 'Première Littéraire (Séries A4 & A5) — Contrôle continu & préparation anticipée du Bac',
    shortName: '1ère L — Lettres',
    category: 'Lycée — Première',
    description:
      'Parcours complet de Première littéraire : français et littérature (théâtre, roman, poésie, littérature d’idées), philosophie (conscience, liberté, vérité, art et technique), histoire-géographie (révolutions, colonisation, guerres mondiales, mondialisation), littérature africaine (négritude, roman, oralité, théâtre et poésie) et anglais renforcé (compréhension, expression, grammaire, civilisation) — avec le tronc commun scientifique (mathématiques, sciences).',
    level: 'Première (1ère L / A4 / A5)',
    subjectIds: [
      'francais',
      'philo',
      'histoire_geo',
      'litterature_africaine',
      'anglais',
      'maths',
      'svt',
      'eps_sciences_sport',
    ],
    classLevels: ['1ere-l'],
    badgeColor: '#7c3aed',
  },
];
