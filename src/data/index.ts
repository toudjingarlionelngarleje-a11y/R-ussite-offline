import {
  CHAPTERS as BASE_CHAPTERS,
  COUNTRIES,
  COURSES as BASE_COURSES,
  EXAMS as BASE_EXAMS,
  STUDY_LEVELS as BASE_STUDY_LEVELS,
  SUBJECTS as BASE_SUBJECTS,
  USER_CATEGORIES,
} from './metadata';
import { ANNALES as BASE_ANNALES, QUESTIONS as BASE_QUESTIONS } from './questions';
import { FICHES as BASE_FICHES, FLASHCARDS as BASE_FLASHCARDS } from './fichesAndCards';
import {
  EXTRA_CHAPTERS,
  EXTRA_COURSES,
  EXTRA_EXAMS,
  EXTRA_SUBJECTS,
} from './extendedMetadata';
import {
  EXTRA_ANNALES,
  EXTRA_FICHES,
  EXTRA_FLASHCARDS,
  EXTRA_QUESTIONS,
} from './extendedContent';
import {
  MEGA_ANNALES,
  MEGA_CHAPTERS,
  MEGA_COURSES,
  MEGA_EXAMS,
  MEGA_FICHES,
  MEGA_FLASHCARDS,
  MEGA_QUESTIONS,
  MEGA_SUBJECTS,
} from './megaCatalog';
import {
  ULTRA_ANNALES,
  ULTRA_CHAPTERS,
  ULTRA_COURSES,
  ULTRA_EXAMS,
  ULTRA_FICHES,
  ULTRA_FLASHCARDS,
  ULTRA_QUESTIONS,
  ULTRA_SUBJECTS,
} from './ultraCatalog';
import {
  APEX_ANNALES,
  APEX_CHAPTERS,
  APEX_COURSES,
  APEX_EXAMS,
  APEX_FICHES,
  APEX_FLASHCARDS,
  APEX_QUESTIONS,
  APEX_SUBJECTS,
} from './apexCatalog';
import {
  ZENITH_ANNALES,
  ZENITH_CHAPTERS,
  ZENITH_COURSES,
  ZENITH_EXAMS,
  ZENITH_FICHES,
  ZENITH_FLASHCARDS,
  ZENITH_QUESTIONS,
  ZENITH_SUBJECTS,
} from './zenithCatalog';
import {
  SUMMIT_ANNALES,
  SUMMIT_CHAPTERS,
  SUMMIT_COURSES,
  SUMMIT_EXAMS,
  SUMMIT_FICHES,
  SUMMIT_FLASHCARDS,
  SUMMIT_QUESTIONS,
  SUMMIT_SUBJECTS,
} from './summitCatalog';

export { COUNTRIES, USER_CATEGORIES };

export const STUDY_LEVELS: string[] = [
  'Troisième / 3e (BEPC / Brevet)',
  ...BASE_STUDY_LEVELS,
];

export const EXAMS = [
  ...BASE_EXAMS,
  ...EXTRA_EXAMS,
  ...MEGA_EXAMS,
  ...ULTRA_EXAMS,
  ...APEX_EXAMS,
  ...ZENITH_EXAMS,
  ...SUMMIT_EXAMS,
];

const EXTRA_EXAM_LINKS: Record<string, string[]> = {
  maths: [
    'bepc',
    'concours-medecine',
    'concours-ingenieur',
    'concours-ens-enseignement',
    'concours-energie-btp',
    'concours-telecoms',
    'concours-genie-civil',
    'concours-aeronautique',
    'concours-mines-petrole',
  ],
  physique: [
    'concours-medecine',
    'concours-ingenieur',
    'concours-paramedical',
    'concours-agronomie',
    'concours-energie-btp',
    'concours-genie-civil',
    'concours-aeronautique',
    'concours-mines-petrole',
  ],
  svt: [
    'bepc',
    'concours-medecine',
    'concours-paramedical',
    'concours-agronomie',
    'concours-nutrition',
    'concours-veterinaire',
  ],
  philo: ['bac-litteraire'],
  droit: [
    'bts-compta-info',
    'concours-police-douanes',
    'concours-magistrature',
    'concours-diplomatie',
  ],
  culture_gen: [
    'concours-police-douanes',
    'concours-magistrature',
    'concours-diplomatie',
    'concours-journalisme',
  ],
  economie: [
    'bac-litteraire',
    'bts-compta-info',
    'concours-finances-banque',
    'concours-diplomatie',
  ],
  gestion_projet: [
    'certif-entrepreneuriat',
    'concours-energie-btp',
    'certif-supply-rh',
    'concours-genie-civil',
  ],
  cybersecurite: [
    'certif-entrepreneuriat',
    'certif-data-ia',
    'concours-telecoms',
    'certif-fintech-microfinance',
  ],
  francais: [
    'concours-police-douanes',
    'concours-ens-enseignement',
    'concours-magistrature',
    'concours-paramedical',
    'concours-journalisme',
  ],
  histoire_geo: ['concours-ens-enseignement'],
  anglais: [
    'concours-ingenieur',
    'certif-data-ia',
    'concours-diplomatie',
    'concours-energie-btp',
    'concours-telecoms',
    'concours-journalisme',
    'concours-aeronautique',
  ],
  informatique: [
    'concours-ingenieur',
    'certif-entrepreneuriat',
    'certif-data-ia',
    'concours-energie-btp',
    'concours-telecoms',
  ],
  comptabilite: [
    'certif-entrepreneuriat',
    'concours-finances-banque',
    'certif-supply-rh',
    'certif-fintech-microfinance',
  ],
  psychotechnique: ['concours-magistrature', 'concours-paramedical', 'concours-finances-banque'],
  statistiques: [
    'certif-data-ia',
    'concours-finances-banque',
    'concours-agronomie',
    'concours-nutrition',
  ],
  educ_civique: ['concours-agronomie'],
  marketing_entrep: ['certif-supply-rh'],
  droit_ohada: ['certif-supply-rh', 'certif-fintech-microfinance'],
  finances_publiques: ['certif-fintech-microfinance'],
  arabe: ['concours-diplomatie'],
  energies_renouv: ['concours-telecoms', 'concours-genie-civil', 'concours-mines-petrole'],
  relations_inter: ['concours-journalisme'],
  sante_publique: ['concours-nutrition'],
  anatomie_physio: ['concours-nutrition', 'concours-veterinaire'],
  pharmacologie: ['concours-veterinaire'],
  agronomie_env: ['concours-nutrition', 'concours-mines-petrole', 'concours-veterinaire'],
  nutrition_sante: ['concours-veterinaire'],
  reseaux_telecoms: ['concours-aeronautique'],
};

export const SUBJECTS = [
  ...BASE_SUBJECTS,
  ...EXTRA_SUBJECTS,
  ...MEGA_SUBJECTS,
  ...ULTRA_SUBJECTS,
  ...APEX_SUBJECTS,
  ...ZENITH_SUBJECTS,
  ...SUMMIT_SUBJECTS,
].map((s) => ({
  ...s,
  examIds: Array.from(new Set([...s.examIds, ...(EXTRA_EXAM_LINKS[s.id] ?? [])])),
}));

export const CHAPTERS = [
  ...BASE_CHAPTERS,
  ...EXTRA_CHAPTERS,
  ...MEGA_CHAPTERS,
  ...ULTRA_CHAPTERS,
  ...APEX_CHAPTERS,
  ...ZENITH_CHAPTERS,
  ...SUMMIT_CHAPTERS,
];
export const COURSES = [
  ...BASE_COURSES,
  ...EXTRA_COURSES,
  ...MEGA_COURSES,
  ...ULTRA_COURSES,
  ...APEX_COURSES,
  ...ZENITH_COURSES,
  ...SUMMIT_COURSES,
];
export const QUESTIONS = [
  ...BASE_QUESTIONS,
  ...EXTRA_QUESTIONS,
  ...MEGA_QUESTIONS,
  ...ULTRA_QUESTIONS,
  ...APEX_QUESTIONS,
  ...ZENITH_QUESTIONS,
  ...SUMMIT_QUESTIONS,
];
export const ANNALES = [
  ...BASE_ANNALES,
  ...EXTRA_ANNALES,
  ...MEGA_ANNALES,
  ...ULTRA_ANNALES,
  ...APEX_ANNALES,
  ...ZENITH_ANNALES,
  ...SUMMIT_ANNALES,
];
export const FICHES = [
  ...BASE_FICHES,
  ...EXTRA_FICHES,
  ...MEGA_FICHES,
  ...ULTRA_FICHES,
  ...APEX_FICHES,
  ...ZENITH_FICHES,
  ...SUMMIT_FICHES,
];
export const FLASHCARDS = [
  ...BASE_FLASHCARDS,
  ...EXTRA_FLASHCARDS,
  ...MEGA_FLASHCARDS,
  ...ULTRA_FLASHCARDS,
  ...APEX_FLASHCARDS,
  ...ZENITH_FLASHCARDS,
  ...SUMMIT_FLASHCARDS,
];
