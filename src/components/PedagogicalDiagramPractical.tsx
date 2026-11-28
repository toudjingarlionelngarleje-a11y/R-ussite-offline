import React from 'react';
import { CourseSection } from '../types';

/**
 * v28.0 — Six illustrations pratiques et transversales, utilisables par toutes
 * les matières : démarche, causes/effets, frise, comparaison, carte de notions
 * et liste de vérification. 100 % hors ligne, aucune image distante.
 */

export type PracticalDiagramId =
  | 'demarche_methodologique'
  | 'schema_cause_effet'
  | 'frise_chronologique'
  | 'comparaison_criteres'
  | 'carte_notions'
  | 'checklist_validation';

const PRACTICAL_IDS: PracticalDiagramId[] = [
  'demarche_methodologique',
  'schema_cause_effet',
  'frise_chronologique',
  'comparaison_criteres',
  'carte_notions',
  'checklist_validation',
];

export function isPracticalDiagram(id: NonNullable<CourseSection['diagramId']>): boolean {
  return (PRACTICAL_IDS as string[]).includes(id);
}

const Frame: React.FC<{ label: string; caption: string; children: React.ReactNode }> = ({ label, caption, children }) => (
  <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
    <svg viewBox="0 0 360 170" className="mx-auto h-40 w-full max-w-md" role="img" aria-label={label}>
      {children}
    </svg>
    <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">{caption}</figcaption>
  </figure>
);

const Tx: React.FC<{ x: number; y: number; children: React.ReactNode; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; bold?: boolean }> = ({
  x,
  y,
  children,
  size = 10,
  fill = '#334155',
  anchor = 'start',
  bold = false,
}) => (
  <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={bold ? 'bold' : 'normal'}>
    {children}
  </text>
);

export const PedagogicalDiagramPractical: React.FC<{ diagramId: PracticalDiagramId }> = ({ diagramId }) => {
  if (diagramId === 'demarche_methodologique') {
    return (
      <Frame label="Démarche méthodologique en quatre temps" caption="Schéma : observer, analyser, agir puis vérifier — la boucle de toute méthode de travail.">
        <line x1="40" y1="92" x2="320" y2="92" stroke="#CBD5E1" strokeWidth="2" />
        {[
          { x: 66, label: '1. Observer', color: '#0369A1' },
          { x: 138, label: '2. Analyser', color: '#0D9488' },
          { x: 210, label: '3. Agir', color: '#D97706' },
          { x: 282, label: '4. Vérifier', color: '#15803D' },
        ].map((s) => (
          <g key={s.label}>
            <circle cx={s.x} cy={92} r="13" fill={s.color} />
            <Tx x={s.x} y={74} anchor="middle" size={8} bold fill="#334155">{s.label}</Tx>
          </g>
        ))}
        <path d="M300 112 Q300 140 180 140 Q60 140 60 112" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 3" />
        <Tx x={180} y={156} anchor="middle" size={8} fill="#64748B">Boucle d’amélioration continue</Tx>
        <rect x="40" y="26" width="280" height="30" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
        <Tx x={52} y={45} size={8} fill="#475569">Une seule étape à la fois, avec une trace écrite</Tx>
      </Frame>
    );
  }

  if (diagramId === 'schema_cause_effet') {
    return (
      <Frame label="Diagramme causes-effets" caption="Schéma : le problème se décompose en familles de causes (matière, matériel, méthode, main-d’œuvre, milieu).">
        <line x1="40" y1="88" x2="290" y2="88" stroke="#1E293B" strokeWidth="2.5" />
        <rect x="290" y="70" width="60" height="36" rx="5" fill="#FEE2E2" stroke="#B91C1C" strokeWidth="1.5" />
        <Tx x={320} y={92} anchor="middle" size={8} bold fill="#7F1D1D">problème</Tx>
        {[
          { x: 86, label: 'Matière' },
          { x: 148, label: 'Matériel' },
          { x: 210, label: 'Méthode' },
          { x: 268, label: 'Milieu' },
        ].map((c, i) => (
          <g key={c.label}>
            <line x1={c.x} y1={88} x2={c.x - 14} y2={58} stroke="#64748B" strokeWidth="1.5" />
            <line x1={c.x} y1={88} x2={c.x + 14} y2={118} stroke="#64748B" strokeWidth="1.5" />
            <Tx x={c.x} y={54} anchor="middle" size={7} fill="#334155">{c.label}</Tx>
            {i === 0 && <Tx x={c.x} y={132} anchor="middle" size={7} fill="#64748B">main-d’œuvre</Tx>}
          </g>
        ))}
        <Tx x={40} y={160} size={8} fill="#475569">On remonte aux causes racines, pas au coupable</Tx>
      </Frame>
    );
  }

  if (diagramId === 'frise_chronologique') {
    return (
      <Frame label="Frise chronologique" caption="Schéma : chaque étape datée est placée sur la frise, avec sa durée et son jalon.">
        <line x1="30" y1="90" x2="330" y2="90" stroke="#334155" strokeWidth="2" />
        <path d="M330 90 L320 85 L320 95 Z" fill="#334155" />
        {[
          { x: 70, label: 'Étape 1', sub: 'départ' },
          { x: 140, label: 'Étape 2', sub: 'jalon' },
          { x: 212, label: 'Étape 3', sub: 'jalon' },
          { x: 286, label: 'Fin', sub: 'bilan' },
        ].map((s, i) => (
          <g key={s.label}>
            <line x1={s.x} y1={90} x2={s.x} y2={i % 2 === 0 ? 64 : 116} stroke="#94A3B8" strokeWidth="1.2" />
            <circle cx={s.x} cy={90} r="5" fill="#0369A1" />
            <Tx x={s.x} y={i % 2 === 0 ? 58 : 128} anchor="middle" size={8} bold fill="#334155">{s.label}</Tx>
            <Tx x={s.x} y={i % 2 === 0 ? 46 : 140} anchor="middle" size={7} fill="#64748B">{s.sub}</Tx>
          </g>
        ))}
        <rect x="30" y="26" width="300" height="16" rx="3" fill="#E0F2FE" stroke="#0369A1" strokeWidth="1" />
        <Tx x={38} y={38} size={7} fill="#075985">Chaque durée se mesure sur l’échelle de temps</Tx>
      </Frame>
    );
  }

  if (diagramId === 'comparaison_criteres') {
    return (
      <Frame label="Tableau de comparaison de deux solutions" caption="Schéma : les options se comparent sur des critères pondérés, pas sur une impression.">
        <rect x="30" y="34" width="300" height="28" rx="4" fill="#E2E8F0" stroke="#334155" strokeWidth="1.2" />
        <Tx x={130} y={53} anchor="middle" size={8} bold fill="#1E293B">Option A</Tx>
        <Tx x={260} y={53} anchor="middle" size={8} bold fill="#1E293B">Option B</Tx>
        <Tx x={40} y={53} size={8} bold fill="#334155">Critères</Tx>
        {[
          { y: 74, label: 'Coût' },
          { y: 96, label: 'Délai' },
          { y: 118, label: 'Qualité' },
          { y: 140, label: 'Risque' },
        ].map((r) => (
          <g key={r.label}>
            <line x1="30" y1={r.y} x2="330" y2={r.y} stroke="#E2E8F0" strokeWidth="1" />
            <Tx x={40} y={r.y + 14} size={8} fill="#475569">{r.label}</Tx>
            <circle cx="130" cy={r.y + 10} r="5" fill="#15803D" />
            <circle cx="260" cy={r.y + 10} r="5" fill="#D97706" />
          </g>
        ))}
        <Tx x={30} y={162} size={8} fill="#64748B">Pondérer les critères avant de comparer</Tx>
      </Frame>
    );
  }

  if (diagramId === 'carte_notions') {
    return (
      <Frame label="Carte de notions" caption="Schéma : une notion centrale et ses branches, hiérarchisées par importance.">
        <circle cx="180" cy="88" r="30" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="1.8" />
        <Tx x={180} y={92} anchor="middle" size={9} bold fill="#4C1D95">Notion</Tx>
        {[
          { x: 80, y: 48, label: 'Définition' },
          { x: 80, y: 128, label: 'Exemple' },
          { x: 280, y: 48, label: 'Méthode' },
          { x: 280, y: 128, label: 'Limites' },
        ].map((b) => (
          <g key={b.label}>
            <line x1={180} y1={88} x2={b.x} y2={b.y} stroke="#A78BFA" strokeWidth="1.5" />
            <rect x={b.x - 44} y={b.y - 12} width="88" height="24" rx="12" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1.2" />
            <Tx x={b.x} y={b.y + 4} anchor="middle" size={8} fill="#4C1D95">{b.label}</Tx>
          </g>
        ))}
      </Frame>
    );
  }

  return (
    <Frame label="Liste de vérification avant validation" caption="Schéma : une liste de contrôle coche les points essentiels avant de rendre.">
      <rect x="50" y="30" width="260" height="112" rx="6" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
      {['Consigne comprise', 'Données vérifiées', 'Calculs contrôlés', 'Unité et conclusion', 'Relecture finale'].map((item, i) => (
        <g key={item}>
          <rect x="66" y={42 + i * 20} width="13" height="13" rx="3" fill="none" stroke="#475569" strokeWidth="1.4" />
          <path d={`M${69} ${48 + i * 20} l3 3 l7 -7`} fill="none" stroke="#15803D" strokeWidth="1.8" />
          <Tx x={88} y={53 + i * 20} size={8} fill="#334155">{item}</Tx>
        </g>
      ))}
      <Tx x={50} y={158} size={8} fill="#64748B">Un point non coché = un risque d’erreur</Tx>
    </Frame>
  );
};
