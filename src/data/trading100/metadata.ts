import { ExamTrack, Subject } from '../../types';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';

/**
 * v17.4 — Nouveau parcours d'examen dédié au Trading & aux Marchés Financiers.
 * Porte le catalogue de 64 à 65 examens / concours / certifications.
 */
export const TRADING_NEW_EXAMS: ExamTrack[] = [
  {
    id: 'certification-trading-marches',
    name: 'Certification Trading, Analyse Technique & Gestion des Risques (Marchés / Bourse / Forex / Crypto)',
    shortName: 'Trading & Marchés',
    category: 'Finance & Marchés',
    description:
      'Parcours complet de trading : microstructure des marchés, analyse technique (chandeliers, figures, supports-résistances, indicateurs), price action, gestion du risque et du capital, psychologie, journal de trading, backtesting et stratégies avancées (forex, crypto, matières premières).',
    level: '1ère → Master / Certification professionnelle',
    subjectIds: [
      'trading_marches',
      'finance_marches_banque',
      'statistiques',
      'economie',
      'psychologie_cog',
      'fintech_microfinance',
    ],
    classLevels: ['1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    badgeColor: '#0f766e',
  },
];

/**
 * 101e matière du catalogue : 100 chapitres détaillés + exercices pratiques.
 */
export const TRADING_NEW_SUBJECTS: Subject[] = [
  {
    id: 'trading_marches',
    name: 'Trading & Marchés Financiers — Analyse Technique & Gestion du Risque',
    shortName: 'Trading',
    examIds: [
      'certification-trading-marches',
      'concours-sciencespo-banque-eau',
      'concours-finances-banque',
      'certif-fintech-microfinance',
    ],
    classLevels: getSubjectClassLevels('trading_marches'),
    color: '#0f766e',
    icon: 'TrendingUp',
    description:
      '160 chapitres : marchés & microstructure, chandeliers japonais, figures chartistes, supports/résistances, tendances & moyennes mobiles, RSI/MACD, volatilité & ATR, volume et carnet d’ordres, Fibonacci & Elliott, price action (BOS/CHoCH), multi-timeframes, gestion du risque et taille de position, stop-loss & trailing, psychologie, journal de trading, plan de trading, forex/crypto/matières premières et stratégies avancées — avec exercices corrigés détaillés.',
    sizeKb: 1640,
  },
];
