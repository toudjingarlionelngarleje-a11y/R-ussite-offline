import React from 'react';
import { CourseSection } from '../types';

/**
 * v27.0 — Huit nouvelles illustrations pédagogiques SVG, 100 % hors ligne.
 * Aucune image distante : les schémas restent nets à tout zoom et fonctionnent
 * sans réseau. Chaque illustration est doublée d'une légende lisible.
 */

export type V27DiagramId =
  | 'coupe_cheveu'
  | 'reseau_plomberie'
  | 'diagnostic_auto'
  | 'soudure_assemblage'
  | 'ruche_cadres'
  | 'vinification'
  | 'taille_gemme'
  | 'rang_protocole';

const V27_IDS: V27DiagramId[] = [
  'coupe_cheveu',
  'reseau_plomberie',
  'diagnostic_auto',
  'soudure_assemblage',
  'ruche_cadres',
  'vinification',
  'taille_gemme',
  'rang_protocole',
];

export function isV27Diagram(id: NonNullable<CourseSection['diagramId']>): boolean {
  return (V27_IDS as string[]).includes(id);
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

export const PedagogicalDiagramV27: React.FC<{ diagramId: V27DiagramId }> = ({ diagramId }) => {
  if (diagramId === 'coupe_cheveu') {
    return (
      <Frame label="Structure du cheveu et sections de coupe" caption="Schéma : le cheveu se lit en trois couches, la coupe se construit par sections.">
        <rect x="30" y="30" width="120" height="112" rx="8" fill="#FCE7F3" stroke="#9D174D" strokeWidth="1.5" />
        <ellipse cx="90" cy="86" rx="30" ry="42" fill="#F9A8D4" stroke="#9D174D" strokeWidth="1.5" />
        <ellipse cx="90" cy="86" rx="18" ry="30" fill="#FBCFE8" stroke="#9D174D" strokeWidth="1.2" />
        <ellipse cx="90" cy="86" rx="7" ry="16" fill="#FDF2F8" stroke="#9D174D" strokeWidth="1.2" />
        <Tx x={90} y={40} anchor="middle" size={8} fill="#831843">cuticule</Tx>
        <Tx x={90} y={128} anchor="middle" size={8} fill="#831843">cortex / médulla</Tx>
        <rect x="176" y="30" width="158" height="112" rx="8" fill="#F5F3FF" stroke="#6D28D9" strokeWidth="1.5" />
        <line x1="176" y1="58" x2="334" y2="58" stroke="#A78BFA" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="176" y1="86" x2="334" y2="86" stroke="#A78BFA" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="176" y1="114" x2="334" y2="114" stroke="#A78BFA" strokeWidth="1" strokeDasharray="4 3" />
        <Tx x={186} y={52} size={8} fill="#4C1D95">section 1 · nuque</Tx>
        <Tx x={186} y={80} size={8} fill="#4C1D95">section 2 · côtés</Tx>
        <Tx x={186} y={108} size={8} fill="#4C1D95">section 3 · sommet</Tx>
        <Tx x={30} y={158} size={9} fill="#475569">Ligne de référence tracée avant de couper</Tx>
      </Frame>
    );
  }

  if (diagramId === 'reseau_plomberie') {
    return (
      <Frame label="Réseau de plomberie : alimentation et évacuation" caption="Schéma : l’eau froide et l’eau chaude alimentent les appareils, l’évacuation descend avec une pente.">
        <rect x="24" y="30" width="60" height="50" rx="5" fill="#E0F2FE" stroke="#0369A1" strokeWidth="1.5" />
        <Tx x={54} y={60} anchor="middle" size={8} bold fill="#075985">compteur</Tx>
        <line x1="84" y1="48" x2="176" y2="48" stroke="#0369A1" strokeWidth="2.5" />
        <line x1="84" y1="66" x2="176" y2="66" stroke="#DC2626" strokeWidth="2.5" />
        <Tx x={130} y={42} size={7} fill="#0369A1">eau froide</Tx>
        <Tx x={130} y={80} size={7} fill="#B91C1C">eau chaude</Tx>
        <rect x="176" y="34" width="54" height="46" rx="5" fill="#F1F5F9" stroke="#334155" strokeWidth="1.5" />
        <Tx x={203} y={54} anchor="middle" size={8} fill="#334155">mitigeur</Tx>
        <Tx x={203} y={70} anchor="middle" size={7} fill="#64748B">lavabo</Tx>
        <line x1="230" y1="70" x2="270" y2="70" stroke="#94A3B8" strokeWidth="2.5" />
        <line x1="270" y1="70" x2="332" y2="112" stroke="#94A3B8" strokeWidth="3" />
        <circle cx="270" cy="70" r="6" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
        <Tx x={262} y={92} size={7} fill="#475569">pente 2 cm/m</Tx>
        <rect x="24" y="112" width="180" height="30" rx="5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.2" />
        <Tx x={34} y={131} size={8} fill="#7C2D12">Réducteur de pression</Tx>
        <Tx x={24} y={158} size={9} fill="#475569">Alimentation au-dessus, évacuation en pente constante</Tx>
      </Frame>
    );
  }

  if (diagramId === 'diagnostic_auto') {
    return (
      <Frame label="Démarche de diagnostic automobile" caption="Schéma : symptôme, mesure, lecture des données puis contrôle après réparation.">
        {[
          { x: 26, label: 'Symptôme', sub: 'plainte client' },
          { x: 108, label: 'Mesure', sub: 'tension / pression' },
          { x: 190, label: 'Données OBD', sub: 'codes + valeurs' },
          { x: 272, label: 'Contrôle', sub: 'après réparation' },
        ].map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y={46} width={72} height={56} rx={6} fill={i === 3 ? '#DCFCE7' : '#FEE2E2'} stroke={i === 3 ? '#15803D' : '#B91C1C'} strokeWidth="1.5" />
            <Tx x={s.x + 36} y={68} anchor="middle" size={8} bold fill={i === 3 ? '#14532D' : '#7F1D1D'}>{s.label}</Tx>
            <Tx x={s.x + 36} y={84} anchor="middle" size={7} fill="#7F1D1D">{s.sub}</Tx>
            {i < 3 && <line x1={s.x + 72} y1={74} x2={s.x + 80} y2={74} stroke="#94A3B8" strokeWidth="1.5" />}
          </g>
        ))}
        <rect x="26" y="118" width="318" height="28" rx="5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        <Tx x={36} y={136} size={8} fill="#475569">Un code défaut désigne une chaîne : on mesure avant de remplacer</Tx>
      </Frame>
    );
  }

  if (diagramId === 'soudure_assemblage') {
    return (
      <Frame label="Assemblage soudé : chanfrein, cordon et zone affectée" caption="Schéma : la préparation des bords et le cordon déterminent la résistance de l’assemblage.">
        <path d="M28 110 L96 110 L96 60 L28 60 Z" fill="#E5E7EB" stroke="#4B5563" strokeWidth="1.5" />
        <path d="M148 110 L216 110 L216 60 L148 60 Z" fill="#E5E7EB" stroke="#4B5563" strokeWidth="1.5" />
        <path d="M96 60 L104 60 L148 60 L148 110 L96 110 Z" fill="#D1D5DB" stroke="#4B5563" strokeWidth="1" />
        <path d="M104 60 L122 86 L104 110 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        <Tx x={62} y={52} anchor="middle" size={8} bold fill="#374151">pièce 1</Tx>
        <Tx x={182} y={52} anchor="middle" size={8} bold fill="#374151">pièce 2</Tx>
        <Tx x={113} y={128} anchor="middle" size={7} fill="#92400E">cordon</Tx>
        <Tx x={136} y={80} size={7} fill="#475569">chanfrein</Tx>
        <rect x="236" y="40" width="100" height="76" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
        <Tx x={244} y={58} size={8} bold fill="#334155">Contrôles</Tx>
        <Tx x={244} y={74} size={7} fill="#475569">· visuel</Tx>
        <Tx x={244} y={88} size={7} fill="#475569">· ressuage</Tx>
        <Tx x={244} y={102} size={7} fill="#475569">· radiographie</Tx>
        <Tx x={28} y={158} size={9} fill="#475569">Le métal se prépare avant de fondre : chanfrein + dégraissage</Tx>
      </Frame>
    );
  }

  if (diagramId === 'ruche_cadres') {
    return (
      <Frame label="Ruche et cadres : hausse, corps et plateau" caption="Schéma : la colonie occupe le corps, la hausse reçoit le miel, le plateau assure l’assise.">
        <rect x="120" y="28" width="120" height="34" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
        <Tx x={180} y={49} anchor="middle" size={8} bold fill="#78350F">hausse (miel)</Tx>
        <rect x="120" y="66" width="120" height="46" rx="4" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
        <Tx x={180} y={88} anchor="middle" size={8} bold fill="#78350F">corps (couvain)</Tx>
        <rect x="112" y="116" width="136" height="16" rx="3" fill="#D6D3D1" stroke="#78716C" strokeWidth="1.5" />
        <Tx x={180} y={128} anchor="middle" size={7} fill="#44403C">plateau + grille à reine</Tx>
        <Tx x={180} y={146} anchor="middle" size={8} fill="#78716C">toit / couvre-cadres en haut</Tx>
        <rect x="266" y="40" width="70" height="76" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
        <Tx x={274} y={58} size={8} bold fill="#334155">Visite</Tx>
        <Tx x={274} y={74} size={7} fill="#475569">· enfumoir</Tx>
        <Tx x={274} y={88} size={7} fill="#475569">· lève-cadre</Tx>
        <Tx x={274} y={102} size={7} fill="#475569">· grille</Tx>
        <Tx x={22} y={158} size={9} fill="#475569">On ouvre par le côté, jamais au-dessus de la colonie</Tx>
      </Frame>
    );
  }

  if (diagramId === 'vinification') {
    return (
      <Frame label="Étapes de la vinification en rouge" caption="Schéma : vendange, macération, fermentation, élevage puis mise en bouteille.">
        <line x1="30" y1="116" x2="330" y2="116" stroke="#CBD5E1" strokeWidth="2" />
        {[
          { x: 54, label: 'Vendange', color: '#7E22CE' },
          { x: 124, label: 'Macération', color: '#9333EA' },
          { x: 194, label: 'Fermentation', color: '#C026D3' },
          { x: 264, label: 'Élevage', color: '#A16207' },
          { x: 318, label: 'Bouteille', color: '#15803D' },
        ].map((s) => (
          <g key={s.label}>
            <circle cx={s.x} cy={116} r={9} fill={s.color} />
            <Tx x={s.x} y={96} anchor="middle" size={7} bold fill="#334155">{s.label}</Tx>
          </g>
        ))}
        <rect x="30" y="30" width="300" height="46" rx="6" fill="#FAF5FF" stroke="#7E22CE" strokeWidth="1.5" />
        <Tx x={42} y={50} size={9} bold fill="#581C87">Sucre + levures → alcool + CO₂ + chaleur</Tx>
        <Tx x={42} y={66} size={8} fill="#6B21A8">La température et l’oxygène pilotent la fermentation.</Tx>
        <Tx x={30} y={146} size={9} fill="#475569">Chaque étape se mesure : densité, température, acidité</Tx>
      </Frame>
    );
  }

  if (diagramId === 'taille_gemme') {
    return (
      <Frame label="Taille en brillant : couronne, pavillon et facettes" caption="Schéma : les proportions de la taille déterminent le feu et l’éclat de la pierre.">
        <polygon points="120,40 190,40 210,74 120,74 90,74" fill="#E0F2FE" stroke="#0F766E" strokeWidth="1.5" />
        <path d="M90 74 L120 74 L210 74 L150 132 Z" fill="#CCFBF1" stroke="#0F766E" strokeWidth="1.5" />
        <Tx x={150} y={34} anchor="middle" size={8} bold fill="#134E4A">table</Tx>
        <Tx x={150} y={62} anchor="middle" size={7} fill="#115E59">couronne</Tx>
        <Tx x={150} y={112} anchor="middle" size={7} fill="#115E59">pavillon</Tx>
        <Tx x={150} y={150} anchor="middle" size={7} fill="#134E4A">culet</Tx>
        <rect x="238" y="40" width="98" height="76" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
        <Tx x={246} y={58} size={8} bold fill="#334155">Critères</Tx>
        <Tx x={246} y={74} size={7} fill="#475569">· proportions</Tx>
        <Tx x={246} y={88} size={7} fill="#475569">· symétrie</Tx>
        <Tx x={246} y={102} size={7} fill="#475569">· poli</Tx>
      </Frame>
    );
  }

  return (
    <Frame label="Ordre protocolaire et préséance" caption="Schéma : la préséance ordonne les rangs selon la fonction, l’ancienneté et l’ordre alphabétique en multilatéral.">
      <line x1="30" y1="118" x2="330" y2="118" stroke="#CBD5E1" strokeWidth="2" />
      {[
        { x: 58, label: '1', sub: 'Chef d’État' },
        { x: 130, label: '2', sub: 'Chef de gouvernement' },
        { x: 214, label: '3', sub: 'Ministre' },
        { x: 296, label: '4', sub: 'Ambassadeur' },
      ].map((s, i) => (
        <g key={s.label}>
          <rect x={s.x - 26} y={74} width={52} height={44} rx={5} fill={i === 0 ? '#1E3A8A' : '#DBEAFE'} stroke="#1E3A8A" strokeWidth="1.5" />
          <Tx x={s.x} y={96} anchor="middle" size={11} bold fill={i === 0 ? '#FFFFFF' : '#1E3A8A'}>{s.label}</Tx>
          <Tx x={s.x} y={140} anchor="middle" size={7} fill="#334155">{s.sub}</Tx>
        </g>
      ))}
      <rect x="30" y="26" width="300" height="34" rx="5" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.2" />
      <Tx x={42} y={47} size={8} fill="#1E3A8A">Bilatéral : fonction puis ancienneté · Multilatéral : ordre alphabétique</Tx>
    </Frame>
  );
};
