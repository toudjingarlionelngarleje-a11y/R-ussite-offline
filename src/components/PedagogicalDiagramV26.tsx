import React from 'react';
import { CourseSection } from '../types';

/**
 * v26.0 — Huit nouvelles illustrations pédagogiques SVG, 100 % hors ligne.
 * Aucune image distante : les schémas restent nets à tout zoom et fonctionnent
 * sans réseau. Chaque illustration est doublée d'une légende lisible.
 */

export type V26DiagramId =
  | 'acte_authentique'
  | 'reeducation_mouvement'
  | 'marche_immobilier'
  | 'chaine_blocs'
  | 'appareil_phonatoire'
  | 'plan_paysager'
  | 'assemblage_bois'
  | 'boucle_gameplay';

const V26_IDS: V26DiagramId[] = [
  'acte_authentique',
  'reeducation_mouvement',
  'marche_immobilier',
  'chaine_blocs',
  'appareil_phonatoire',
  'plan_paysager',
  'assemblage_bois',
  'boucle_gameplay',
];

export function isV26Diagram(id: NonNullable<CourseSection['diagramId']>): boolean {
  return (V26_IDS as string[]).includes(id);
}

const Frame: React.FC<{ label: string; caption: string; height?: string; children: React.ReactNode }> = ({
  label,
  caption,
  height = 'h-40',
  children,
}) => (
  <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
    <svg viewBox="0 0 360 170" className={`mx-auto ${height} w-full max-w-md`} role="img" aria-label={label}>
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

export const PedagogicalDiagramV26: React.FC<{ diagramId: V26DiagramId }> = ({ diagramId }) => {
  if (diagramId === 'acte_authentique') {
    return (
      <Frame label="Acte authentique et chaîne de validation" caption="Schéma : les parties, le notaire et la publicité foncière rendent l’acte opposable.">
        <rect x="20" y="30" width="88" height="52" rx="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
        <Tx x={64} y={50} anchor="middle" size={9} bold fill="#7C2D12">Parties</Tx>
        <Tx x={64} y={66} anchor="middle" size={8} fill="#92400E">identité + consentement</Tx>
        <line x1="108" y1="56" x2="140" y2="56" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrow26)" />
        <rect x="140" y="30" width="90" height="52" rx="6" fill="#E0F2FE" stroke="#0369A1" strokeWidth="1.5" />
        <Tx x={185} y={50} anchor="middle" size={9} bold fill="#075985">Notaire</Tx>
        <Tx x={185} y={66} anchor="middle" size={8} fill="#0C4A6E">contrôle + signature</Tx>
        <line x1="230" y1="56" x2="262" y2="56" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="262" y="30" width="80" height="52" rx="6" fill="#DCFCE7" stroke="#15803D" strokeWidth="1.5" />
        <Tx x={302} y={50} anchor="middle" size={9} bold fill="#14532D">Publication</Tx>
        <Tx x={302} y={66} anchor="middle" size={8} fill="#166534">opposable aux tiers</Tx>
        <rect x="20" y="102" width="322" height="40" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <Tx x={32} y={120} size={9} bold>Minute conservée chez le notaire</Tx>
        <Tx x={32} y={134} size={8} fill="#64748B">Expédition = copie exécutoire remise aux parties</Tx>
        <defs>
          <marker id="arrow26" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#94A3B8" />
          </marker>
        </defs>
      </Frame>
    );
  }

  if (diagramId === 'reeducation_mouvement') {
    return (
      <Frame label="Progression d’une rééducation fonctionnelle" caption="Schéma : bilan, objectif mesurable, progression de charge et critères de reprise.">
        <line x1="40" y1="120" x2="320" y2="120" stroke="#CBD5E1" strokeWidth="2" />
        {[
          { x: 60, label: 'Bilan', color: '#0D9488' },
          { x: 132, label: 'Objectif', color: '#0EA5A4' },
          { x: 204, label: 'Charge', color: '#F59E0B' },
          { x: 276, label: 'Reprise', color: '#15803D' },
        ].map((step, i) => (
          <g key={step.label}>
            <circle cx={step.x} cy={120} r={i === 3 ? 12 : 9} fill={step.color} />
            <Tx x={step.x} y={100} anchor="middle" size={9} bold fill="#334155">{step.label}</Tx>
            <Tx x={step.x} y={144} anchor="middle" size={8} fill="#64748B">{i === 0 ? 'mesures' : i === 1 ? 'critère' : i === 2 ? 'progression' : 'tests'}</Tx>
          </g>
        ))}
        <rect x="30" y="26" width="300" height="46" rx="6" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" />
        <Tx x={42} y={45} size={9} bold fill="#115E59">Douleur, amplitude et force se mesurent</Tx>
        <Tx x={42} y={61} size={8} fill="#134E4A">La progression suit la qualité du mouvement, jamais la douleur seule.</Tx>
      </Frame>
    );
  }

  if (diagramId === 'marche_immobilier') {
    return (
      <Frame label="Cycle d’une transaction immobilière" caption="Schéma : estimation, mandat, dossier, financement puis acte authentique.">
        {[
          { x: 24, label: 'Estimation', sub: 'comparables' },
          { x: 110, label: 'Mandat', sub: 'écrit + durée' },
          { x: 196, label: 'Dossier', sub: 'titre + diagnostics' },
          { x: 282, label: 'Acte', sub: 'financement + notaire' },
        ].map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y={54} width={76} height={54} rx={6} fill={i === 3 ? '#DCFCE7' : '#FEF3C7'} stroke={i === 3 ? '#15803D' : '#B45309'} strokeWidth="1.5" />
            <Tx x={s.x + 38} y={76} anchor="middle" size={9} bold fill={i === 3 ? '#14532D' : '#7C2D12'}>{s.label}</Tx>
            <Tx x={s.x + 38} y={92} anchor="middle" size={8} fill="#78716C">{s.sub}</Tx>
            {i < 3 && <line x1={s.x + 76} y1={81} x2={s.x + 86} y2={81} stroke="#94A3B8" strokeWidth="1.5" />}
          </g>
        ))}
        <rect x="24" y="124" width="334" height="26" rx="5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        <Tx x={34} y={141} size={9} fill="#475569">Prix au m² comparé à des transactions réellement conclues</Tx>
      </Frame>
    );
  }

  if (diagramId === 'chaine_blocs') {
    return (
      <Frame label="Chaîne de blocs et validation par consensus" caption="Schéma : chaque bloc référence le hachage du précédent, ce qui rend la chaîne infalsifiable.">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={22 + i * 84} y={46} width={66} height={62} rx={5} fill={i === 3 ? '#E0E7FF' : '#EEF2FF'} stroke="#4338CA" strokeWidth="1.5" />
            <Tx x={55 + i * 84} y={66} anchor="middle" size={9} bold fill="#312E81">Bloc {i + 1}</Tx>
            <Tx x={55 + i * 84} y={82} anchor="middle" size={7} fill="#4338CA">hash #{i + 1}</Tx>
            <Tx x={55 + i * 84} y={96} anchor="middle" size={7} fill="#6366F1">prev #{i}</Tx>
            {i < 3 && (
              <line x1={88 + i * 84} y1={77} x2={100 + i * 84} y2={77} stroke="#4338CA" strokeWidth="1.5" markerEnd="url(#arrow26b)" />
            )}
          </g>
        ))}
        <rect x="22" y="122" width="316" height="28" rx="5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        <Tx x={32} y={140} size={9} fill="#475569">Consensus : la majorité des nœuds valide chaque bloc</Tx>
        <defs>
          <marker id="arrow26b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#4338CA" />
          </marker>
        </defs>
      </Frame>
    );
  }

  if (diagramId === 'appareil_phonatoire') {
    return (
      <Frame label="Appareil phonatoire et production de la parole" caption="Schéma : souffle pulmonaire, vibration laryngée et résonance bucco-nasale.">
        <path d="M40 130 L40 70 Q40 40 78 40 L108 40 Q140 40 140 74 L140 130 Z" fill="#FCE7F3" stroke="#BE185D" strokeWidth="1.5" />
        <Tx x={90} y={62} anchor="middle" size={9} bold fill="#831843">Poumons</Tx>
        <Tx x={90} y={78} anchor="middle" size={8} fill="#9D174D">souffle</Tx>
        <rect x="74" y="24" width="34" height="16" rx="4" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1.2" />
        <Tx x={91} y={36} anchor="middle" size={7} fill="#831843">larynx</Tx>
        <line x1="140" y1="70" x2="196" y2="70" stroke="#BE185D" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M196 56 Q236 56 246 84 Q250 106 214 106 Q196 104 196 84 Z" fill="#FDF2F8" stroke="#BE185D" strokeWidth="1.5" />
        <Tx x={222} y={76} anchor="middle" size={8} bold fill="#831843">Cavité buccale</Tx>
        <Tx x={222} y={90} anchor="middle" size={7} fill="#9D174D">résonance</Tx>
        <path d="M246 66 Q268 60 286 76 Q298 96 272 106" fill="none" stroke="#DB2777" strokeWidth="1.5" />
        <Tx x={276} y={128} size={8} fill="#9D174D">nasalité</Tx>
        <Tx x={22} y={156} size={9} fill="#64748B">Phonation = souffle + vibration + articulation</Tx>
      </Frame>
    );
  }

  if (diagramId === 'plan_paysager') {
    return (
      <Frame label="Plan paysager et zonage d’un jardin" caption="Schéma : zones d’usage, circulation et palette végétale organisent l’espace.">
        <rect x="26" y="24" width="308" height="118" rx="6" fill="#F0FDF4" stroke="#15803D" strokeWidth="1.5" />
        <path d="M26 100 Q120 84 180 100 T334 92" fill="none" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 4" />
        <circle cx="86" cy="62" r="22" fill="#86EFAC" stroke="#15803D" strokeWidth="1.2" />
        <circle cx="140" cy="52" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="1.2" />
        <rect x="206" y="40" width="60" height="38" rx="4" fill="#FDE68A" stroke="#A16207" strokeWidth="1.2" />
        <Tx x={236} y={62} anchor="middle" size={8} fill="#78350F">terrasse</Tx>
        <circle cx="292" cy="112" r="16" fill="#A7F3D0" stroke="#15803D" strokeWidth="1.2" />
        <Tx x={292} y={116} anchor="middle" size={7} fill="#14532D">bassin</Tx>
        <Tx x={34} y={136} size={8} fill="#166534">Cheminement</Tx>
        <Tx x={180} y={136} size={8} fill="#166534">Massifs + pelouse</Tx>
        <Tx x={26} y={158} size={9} fill="#475569">Usages → circulation → palette végétale → plan de plantation</Tx>
      </Frame>
    );
  }

  if (diagramId === 'assemblage_bois') {
    return (
      <Frame label="Assemblages bois : tenon-mortaise et queue d’aronde" caption="Schéma : l’assemblage adapte sa géométrie à l’effort qu’il doit reprendre.">
        <rect x="34" y="46" width="128" height="34" fill="#FDE68A" stroke="#A16207" strokeWidth="1.5" />
        <rect x="106" y="86" width="34" height="52" fill="#FDE68A" stroke="#A16207" strokeWidth="1.5" />
        <rect x="150" y="80" width="34" height="30" fill="#FCD34D" stroke="#92400E" strokeWidth="1.5" />
        <Tx x={98} y={42} size={8} bold fill="#78350F">tenon</Tx>
        <Tx x={146} y={128} size={8} bold fill="#78350F">mortaise</Tx>
        <rect x="212" y="52" width="52" height="44" fill="#FDE68A" stroke="#A16207" strokeWidth="1.5" />
        <path d="M264 52 L292 64 L292 84 L264 96 Z" fill="#FCD34D" stroke="#92400E" strokeWidth="1.5" />
        <path d="M292 64 L310 70 L310 78 L292 84 Z" fill="#FDE68A" stroke="#92400E" strokeWidth="1.5" />
        <Tx x={266} y={122} size={8} bold fill="#78350F">queue d’aronde</Tx>
        <Tx x={32} y={154} size={9} fill="#475569">Ajuster, coller, cheviller : l’assemblage porte l’effort</Tx>
      </Frame>
    );
  }

  return (
    <Frame label="Boucle de gameplay et itération" caption="Schéma : action, récompense, progression, puis retour au joueur et nouvel équilibrage.">
      <circle cx="120" cy="86" r="52" fill="#F5F3FF" stroke="#6D28D9" strokeWidth="1.5" />
      <path d="M120 34 A52 52 0 0 1 166 60" fill="none" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#arrow26c)" />
      <path d="M166 110 A52 52 0 0 1 120 138" fill="none" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#arrow26c)" />
      <path d="M74 110 A52 52 0 0 1 74 62" fill="none" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#arrow26c)" />
      <Tx x={120} y={70} anchor="middle" size={9} bold fill="#4C1D95">Action</Tx>
      <Tx x={120} y={86} anchor="middle" size={9} bold fill="#4C1D95">Récompense</Tx>
      <Tx x={120} y={102} anchor="middle" size={9} bold fill="#4C1D95">Progression</Tx>
      <rect x="206" y="36" width="130" height="52" rx="6" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="1.5" />
      <Tx x={216} y={56} size={9} bold fill="#4C1D95">Playtest</Tx>
      <Tx x={216} y={72} size={8} fill="#5B21B6">observer sans guider</Tx>
      <line x1="206" y1="102" x2="336" y2="102" stroke="#6D28D9" strokeWidth="1.5" />
      <Tx x={216} y={120} size={9} bold fill="#4C1D95">Itération</Tx>
      <Tx x={216} y={134} size={8} fill="#5B21B6">ajuster une variable à la fois</Tx>
      <defs>
        <marker id="arrow26c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#7C3AED" />
        </marker>
      </defs>
    </Frame>
  );
};
