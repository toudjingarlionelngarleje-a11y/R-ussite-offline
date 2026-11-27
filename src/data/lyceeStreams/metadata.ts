import { ExamTrack } from '../../types';

/**
 * v17.8 — Quatre parcours d'examen dédiés aux filières de Seconde et de
 * Terminale, désormais scindées en voie scientifique et voie littéraire.
 * Porte le catalogue de 67 à 71 examens / concours / certifications.
 */
export const LYCEE_NEW_EXAMS: ExamTrack[] = [
  {
    id: 'seconde-scientifique',
    name: 'Seconde Scientifique (Séries C) — Contrôle continu & orientation',
    shortName: '2nde S — Sciences',
    category: 'Lycée — Seconde',
    description:
      'Parcours complet de Seconde scientifique : mathématiques (fonctions, équations, statistiques, géométrie repérée), physique (mouvement, forces, électricité, optique), SVT (cellule, photosynthèse, digestion, écosystèmes), chimie (atome, mole, solutions, réactions) et informatique (algorithmique, Python, tableur, réseaux) — avec le tronc commun (français, histoire-géographie, langues).',
    level: 'Seconde (2nde S / C)',
    subjectIds: ['maths', 'physique', 'svt', 'chimie_bio', 'informatique', 'francais', 'histoire_geo', 'anglais', 'eps_sciences_sport'],
    classLevels: ['2nde-s'],
    badgeColor: '#0369a1',
  },
  {
    id: 'seconde-litteraire',
    name: 'Seconde Littéraire (Séries A) — Contrôle continu & orientation',
    shortName: '2nde L — Lettres',
    category: 'Lycée — Seconde',
    description:
      'Parcours complet de Seconde littéraire : français (commentaire, dissertation, figures de style, grammaire), littérature africaine (oralité, roman, poésie, théâtre), histoire-géographie (civilisations, traite atlantique, climats, cartographie), anglais renforcé et culture générale (institutions, médias, arts, méthodologie) — avec le tronc commun scientifique.',
    level: 'Seconde (2nde L / A)',
    subjectIds: ['francais', 'litterature_africaine', 'histoire_geo', 'anglais', 'culture_gen', 'maths', 'svt', 'eps_sciences_sport'],
    classLevels: ['2nde-l'],
    badgeColor: '#0891b2',
  },
  {
    id: 'terminale-scientifique',
    name: 'Terminale Scientifique (Séries C, D & E) — Baccalauréat',
    shortName: 'Tle S — Sciences',
    category: 'Lycée — Terminale',
    description:
      'Parcours complet de Terminale scientifique : mathématiques (limites, dérivation, intégrales, probabilités), physique (ondes, radioactivité, dipôle RC, lois de Newton), SVT (génétique, immunologie, tectonique, reproduction), chimie (acides-bases, oxydoréduction, cinétique, chimie organique) et informatique (SQL, algorithmes, réseaux, cybersécurité) — préparation intensive du Baccalauréat C, D et E.',
    level: 'Terminale (Tle S / C / D / E)',
    subjectIds: ['maths', 'physique', 'svt', 'chimie_bio', 'informatique', 'francais', 'philo', 'histoire_geo', 'anglais', 'eps_sciences_sport'],
    classLevels: ['terminale-s'],
    badgeColor: '#1e40af',
  },
  {
    id: 'terminale-litteraire',
    name: 'Terminale Littéraire (Séries A, B & G) — Baccalauréat',
    shortName: 'Tle L — Lettres',
    category: 'Lycée — Terminale',
    description:
      'Parcours complet de Terminale littéraire : philosophie (conscience, vérité, liberté, État et justice), français (dissertation, commentaire composé, résumé, oral), histoire-géographie (guerres mondiales, décolonisation, mondialisation, Afrique dans le monde), littérature africaine (négritude, roman postcolonial, théâtre engagé, poésie moderne) et anglais renforcé — préparation intensive du Baccalauréat A, B et G.',
    level: 'Terminale (Tle L / A / B / G)',
    subjectIds: ['philo', 'francais', 'histoire_geo', 'litterature_africaine', 'anglais', 'maths', 'svt', 'eps_sciences_sport'],
    classLevels: ['terminale-l'],
    badgeColor: '#6d28d9',
  },
];
