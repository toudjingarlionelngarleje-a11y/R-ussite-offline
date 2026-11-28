import React from 'react';
import { CourseSection } from '../types';

/**
 * v25.0 — Vingt nouvelles illustrations pédagogiques SVG, 100 % hors ligne.
 * Aucune image distante : les schémas restent nets à tout zoom et fonctionnent
 * sans réseau. Chaque illustration est doublée d'une légende lisible.
 */

export type V25DiagramId =
  | 'budget_repartition'
  | 'business_model_canvas'
  | 'scene_forensique'
  | 'transmission_orale'
  | 'reseau_neurones'
  | 'roue_autonomie'
  | 'pyramide_ages'
  | 'financement_sante'
  | 'couches_peau'
  | 'perimetres_surete'
  | 'chaine_deplacement'
  | 'quadrant_langagier'
  | 'cycle_traduction'
  | 'plan_classification'
  | 'mediation_triangle'
  | 'boucle_circulaire'
  | 'chaine_risque_climat'
  | 'accessibilite_universelle'
  | 'arts_composition'
  | 'planning_organisation';

const V25_IDS: V25DiagramId[] = [
  'budget_repartition',
  'business_model_canvas',
  'scene_forensique',
  'transmission_orale',
  'reseau_neurones',
  'roue_autonomie',
  'pyramide_ages',
  'financement_sante',
  'couches_peau',
  'perimetres_surete',
  'chaine_deplacement',
  'quadrant_langagier',
  'cycle_traduction',
  'plan_classification',
  'mediation_triangle',
  'boucle_circulaire',
  'chaine_risque_climat',
  'accessibilite_universelle',
  'arts_composition',
  'planning_organisation',
];

export function isV25Diagram(id: NonNullable<CourseSection['diagramId']>): boolean {
  return (V25_IDS as string[]).includes(id);
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

export const PedagogicalDiagramV25: React.FC<{ diagramId: V25DiagramId }> = ({ diagramId }) => {
  if (diagramId === 'budget_repartition') {
    return (
      <Frame label="Répartition d’un budget mensuel en quatre postes" caption="Schéma : budget = revenus − charges, avec une part d’épargne toujours préservée.">
        <circle cx="92" cy="85" r="58" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2" />
        <path d="M92 85 L92 27 A58 58 0 0 1 150 85 Z" fill="#0369A1" />
        <path d="M92 85 L150 85 A58 58 0 0 1 92 143 Z" fill="#0EA5E9" />
        <path d="M92 85 L92 143 A58 58 0 0 1 40 60 Z" fill="#7DD3FC" />
        <Tx x={112} y={62} size={9} fill="#FFFFFF" bold>Logement 30 %</Tx>
        <Tx x={104} y={120} size={9} fill="#082F49" bold>Vie courante 25 %</Tx>
        <Tx x={30} y={100} size={9} fill="#075985" bold>Épargne 15 %</Tx>
        <Tx x={196} y={40} size={11} fill="#0F172A" bold>Budget mensuel</Tx>
        <Tx x={196} y={60}>Revenus 100 %</Tx>
        <Tx x={196} y={80}>Charges fixes + variables</Tx>
        <Tx x={196} y={100}>Solde ≥ 0 obligatoire</Tx>
        <Tx x={196} y={120} fill="#0369A1" bold>Réserve : 3 à 6 mois</Tx>
        <line x1="196" y1="130" x2="330" y2="130" stroke="#CBD5E1" strokeDasharray="3 3" />
        <Tx x={196} y={150} size={9} fill="#64748B">Chaque poste est plafonné</Tx>
      </Frame>
    );
  }

  if (diagramId === 'business_model_canvas') {
    return (
      <Frame label="Business model canvas simplifié en neuf blocs" caption="Schéma : le modèle économique relie clients, offre, ressources et coûts.">
        <rect x="10" y="15" width="90" height="140" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.6" />
        <rect x="104" y="15" width="90" height="140" rx="6" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.6" />
        <rect x="198" y="15" width="90" height="140" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.6" />
        <rect x="292" y="15" width="58" height="140" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.6" />
        <Tx x={55} y={34} anchor="middle" bold fill="#9A3412">Partenaires</Tx>
        <Tx x={55} y={52} anchor="middle" size={9}>fournisseurs</Tx>
        <Tx x={149} y={34} anchor="middle" bold fill="#9A3412">Activités</Tx>
        <Tx x={149} y={52} anchor="middle" size={9}>production</Tx>
        <Tx x={243} y={34} anchor="middle" bold fill="#9A3412">Offre</Tx>
        <Tx x={243} y={52} anchor="middle" size={9}>valeur</Tx>
        <Tx x={243} y={74} anchor="middle" bold fill="#9A3412">Clients</Tx>
        <Tx x={243} y={92} anchor="middle" size={9}>segments</Tx>
        <Tx x={321} y={34} anchor="middle" bold fill="#92400E">Revenus</Tx>
        <Tx x={321} y={54} anchor="middle" size={9}>prix</Tx>
        <Tx x={321} y={96} anchor="middle" bold fill="#92400E">Coûts</Tx>
        <Tx x={321} y={116} anchor="middle" size={9}>charges</Tx>
        <Tx x={55} y={132} anchor="middle" size={9}>ressources clés</Tx>
        <Tx x={149} y={132} anchor="middle" size={9}>canaux</Tx>
        <Tx x={243} y={132} anchor="middle" size={9}>relation</Tx>
      </Frame>
    );
  }

  if (diagramId === 'scene_forensique') {
    return (
      <Frame label="Scène de crime protégée avec zones et prélèvements numérotés" caption="Schéma : périmètre, traces repérées, prélèvements documentés avant tout déplacement.">
        <rect x="28" y="18" width="220" height="136" rx="10" fill="#F8FAFC" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />
        <rect x="52" y="38" width="172" height="96" rx="8" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
        <circle cx="104" cy="76" r="9" fill="#DC2626" opacity="0.85" />
        <circle cx="168" cy="102" r="7" fill="#DC2626" opacity="0.85" />
        <rect x="126" y="52" width="26" height="14" rx="3" fill="#1D4ED8" opacity="0.8" />
        <Tx x={95} y={62} size={9} bold fill="#991B1B">1</Tx>
        <Tx x={179} y={92} size={9} bold fill="#991B1B">2</Tx>
        <Tx x={156} y={48} size={9} bold fill="#1E3A8A">3</Tx>
        <Tx x={262} y={40} size={11} bold fill="#0F172A">Scène</Tx>
        <Tx x={262} y={60} size={9}>périmètre balisé</Tx>
        <Tx x={262} y={78} size={9}>1 trace papillaire</Tx>
        <Tx x={262} y={96} size={9}>2 trace biologique</Tx>
        <Tx x={262} y={114} size={9}>3 objet déplacé</Tx>
        <Tx x={262} y={136} size={9} fill="#DC2626" bold>Chaîne de custody</Tx>
      </Frame>
    );
  }

  if (diagramId === 'transmission_orale') {
    return (
      <Frame label="Transmission orale du conte : du griot au public" caption="Schéma : la performance orale transmet le récit, le rythme et les variantes locales.">
        <circle cx="62" cy="80" r="20" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
        <Tx x={62} y={84} anchor="middle" size={9} bold fill="#78350F">Griot</Tx>
        <path d="M92 66 Q116 52 136 62" fill="none" stroke="#B45309" strokeWidth="2" />
        <path d="M92 80 Q118 80 138 80" fill="none" stroke="#B45309" strokeWidth="2" />
        <path d="M92 94 Q116 108 136 98" fill="none" stroke="#B45309" strokeWidth="2" />
        <circle cx="164" cy="62" r="9" fill="#F59E0B" />
        <circle cx="170" cy="80" r="9" fill="#F59E0B" />
        <circle cx="164" cy="98" r="9" fill="#F59E0B" />
        <circle cx="212" cy="80" r="14" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
        <Tx x={212} y={84} anchor="middle" size={8} bold fill="#78350F">Public</Tx>
        <Tx x={240} y={40} size={11} bold fill="#0F172A">Transmission</Tx>
        <Tx x={240} y={60} size={9}>récit + rythme</Tx>
        <Tx x={240} y={78} size={9}>répétitions</Tx>
        <Tx x={240} y={96} size={9}>variantes locales</Tx>
        <Tx x={240} y={118} size={9} fill="#B45309" bold>Mémoire collective</Tx>
        <Tx x={240} y={140} size={9} fill="#64748B">Transcription fidèle</Tx>
      </Frame>
    );
  }

  if (diagramId === 'reseau_neurones') {
    return (
      <Frame label="Réseau de neurones à trois couches" caption="Schéma : entrées → couches cachées → sortie, avec poids ajustés pendant l’apprentissage.">
        {[45, 78, 111].map((y) => (
          <circle key={`i${y}`} cx="46" cy={y} r="10" fill="#C7D2FE" stroke="#4F46E5" strokeWidth="1.6" />
        ))}
        {[36, 68, 100, 132].map((y) => (
          <circle key={`h${y}`} cx="150" cy={y} r="10" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.6" />
        ))}
        {[60, 104].map((y) => (
          <circle key={`h2${y}`} cx="244" cy={y} r="10" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.6" />
        ))}
        <circle cx="320" cy="82" r="11" fill="#4F46E5" />
        {[36, 68, 100, 132].map((y) =>
          [45, 78, 111].map((yy) => (
            <line key={`l${y}-${yy}`} x1="56" y1={yy} x2="140" y2={y} stroke="#A5B4FC" strokeWidth="0.8" />
          ))
        )}
        {[60, 104].map((y) =>
          [36, 68, 100, 132].map((yy) => (
            <line key={`m${y}-${yy}`} x1="160" y1={yy} x2="234" y2={y} stroke="#A5B4FC" strokeWidth="0.8" />
          ))
        )}
        {[60, 104].map((y) => (
          <line key={`o${y}`} x1="254" y1={y} x2="309" y2={82} stroke="#6366F1" strokeWidth="1.2" />
        ))}
        <Tx x={18} y={150} size={9} bold fill="#3730A3">Entrées</Tx>
        <Tx x={132} y={150} size={9} bold fill="#3730A3">Couches cachées</Tx>
        <Tx x={296} y={150} size={9} bold fill="#3730A3">Sortie</Tx>
        <Tx x={18} y={163} size={8} fill="#64748B">données normalisées</Tx>
      </Frame>
    );
  }

  if (diagramId === 'roue_autonomie') {
    return (
      <Frame label="Roue de l’autonomie de la personne âgée en six domaines" caption="Schéma : l’autonomie se lit par domaine, pas par âge chronologique.">
        <circle cx="110" cy="85" r="58" fill="#FFF1F2" stroke="#9D174D" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((a, i) => {
          const rad = ((a - 90) * Math.PI) / 180;
          return (
            <line key={a} x1="110" y1="85" x2={110 + Math.cos(rad) * 58} y2={85 + Math.sin(rad) * 58} stroke="#F43F5E" strokeWidth="1.4" opacity={0.5 + i * 0.07} />
          );
        })}
        <circle cx="110" cy="85" r="9" fill="#9D174D" />
        <Tx x={110} y={89} anchor="middle" size={8} fill="#FFFFFF" bold>Moi</Tx>
        <Tx x={186} y={34} size={11} bold fill="#0F172A">Six domaines</Tx>
        <Tx x={186} y={54} size={9}>se déplacer</Tx>
        <Tx x={186} y={72} size={9}>se nourrir</Tx>
        <Tx x={186} y={90} size={9}>se laver</Tx>
        <Tx x={186} y={108} size={9}>s’orienter</Tx>
        <Tx x={186} y={126} size={9}>se soigner</Tx>
        <Tx x={186} y={144} size={9}>vie sociale</Tx>
      </Frame>
    );
  }

  if (diagramId === 'pyramide_ages') {
    return (
      <Frame label="Pyramide des âges avec barres masculines et féminines" caption="Schéma : la forme de la pyramide révèle fécondité, mortalité et vieillissement.">
        <line x1="180" y1="14" x2="180" y2="150" stroke="#0F766E" strokeWidth="2" />
        {[
          { y: 24, m: 18, f: 20 },
          { y: 44, m: 34, f: 36 },
          { y: 64, m: 48, f: 46 },
          { y: 84, m: 42, f: 44 },
          { y: 104, m: 30, f: 34 },
          { y: 124, m: 18, f: 24 },
        ].map((row) => (
          <React.Fragment key={row.y}>
            <rect x={178 - row.m} y={row.y} width={row.m} height="14" fill="#0D9488" rx="2" />
            <rect x="182" y={row.y} width={row.f} height="14" fill="#14B8A6" rx="2" />
          </React.Fragment>
        ))}
        <Tx x={300} y={20} size={11} bold fill="#0F172A">Lecture</Tx>
        <Tx x={300} y={38} size={9}>sommet = âges élevés</Tx>
        <Tx x={300} y={56} size={9}>base = jeunes générations</Tx>
        <Tx x={300} y={74} size={9}>creux = crises</Tx>
        <Tx x={300} y={96} size={9} bold fill="#0D9488">Hommes | Femmes</Tx>
        <Tx x={300} y={118} size={9}>ISF, espérance de vie</Tx>
        <Tx x={300} y={140} size={9} fill="#64748B">Projections scolaires</Tx>
      </Frame>
    );
  }

  if (diagramId === 'financement_sante') {
    return (
      <Frame label="Circuit de financement d’un système de santé" caption="Schéma : ménages, employeurs et État financent la mutualisation, qui paie les soins.">
        <rect x="14" y="20" width="82" height="34" rx="6" fill="#FEE2E2" stroke="#BE123C" strokeWidth="1.5" />
        <Tx x={55} y={42} anchor="middle" size={10} bold fill="#9F1239">Ménages</Tx>
        <rect x="14" y="62" width="82" height="34" rx="6" fill="#FEE2E2" stroke="#BE123C" strokeWidth="1.5" />
        <Tx x={55} y={84} anchor="middle" size={10} bold fill="#9F1239">Employeurs</Tx>
        <rect x="14" y="104" width="82" height="34" rx="6" fill="#FEE2E2" stroke="#BE123C" strokeWidth="1.5" />
        <Tx x={55} y={126} anchor="middle" size={10} bold fill="#9F1239">État</Tx>
        <rect x="132" y="52" width="88" height="56" rx="8" fill="#FFF1F2" stroke="#BE123C" strokeWidth="2" />
        <Tx x={176} y={76} anchor="middle" size={10} bold fill="#9F1239">Assurance</Tx>
        <Tx x={176} y={92} anchor="middle" size={8} fill="#881337">mutualisation</Tx>
        <rect x="252" y="52" width="94" height="56" rx="8" fill="#FFF1F2" stroke="#BE123C" strokeWidth="2" />
        <Tx x={299} y={76} anchor="middle" size={10} bold fill="#9F1239">Offre de soins</Tx>
        <Tx x={299} y={92} anchor="middle" size={8} fill="#881337">hôpitaux, soins primaires</Tx>
        {[37, 79, 121].map((y) => (
          <line key={y} x1="96" y1={y} x2="132" y2={80} stroke="#F43F5E" strokeWidth="1.4" />
        ))}
        <line x1="220" y1="80" x2="252" y2="80" stroke="#BE123C" strokeWidth="2.5" />
        <Tx x={236} y={72} size={8} bold fill="#9F1239">paiement</Tx>
        <Tx x={132} y={132} size={9} fill="#64748B">Reste à charge = frein d’accès</Tx>
        <Tx x={132} y={150} size={9} fill="#64748B">Panier de soins défini</Tx>
      </Frame>
    );
  }

  if (diagramId === 'couches_peau') {
    return (
      <Frame label="Coupe de la peau : épiderme, derme, hypoderme" caption="Schéma : chaque actif cosmétique agit sur une couche précise de la peau.">
        <rect x="34" y="26" width="220" height="26" fill="#FDE7D2" stroke="#C2410C" strokeWidth="1.5" />
        <rect x="34" y="52" width="220" height="46" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.5" />
        <rect x="34" y="98" width="220" height="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
        <path d="M34 26 q11 -12 22 0 q11 -12 22 0 q11 -12 22 0" fill="none" stroke="#C2410C" strokeWidth="1.4" />
        <Tx x={264} y={44} size={10} bold fill="#9A3412">Épiderme</Tx>
        <Tx x={264} y={62} size={8}>barrière, kératine</Tx>
        <Tx x={264} y={84} size={10} bold fill="#9D174D">Derme</Tx>
        <Tx x={264} y={100} size={8}>collagène, élastine</Tx>
        <Tx x={264} y={126} size={10} bold fill="#92400E">Hypoderme</Tx>
        <Tx x={264} y={142} size={8}>graisse, isolation</Tx>
        <circle cx="108" cy="72" r="4" fill="#BE185D" />
        <circle cx="150" cy="80" r="4" fill="#BE185D" />
        <Tx x={40} y={20} size={9} fill="#64748B">Surface cutanée</Tx>
      </Frame>
    );
  }

  if (diagramId === 'perimetres_surete') {
    return (
      <Frame label="Périmètres de sûreté d’un site protégé" caption="Schéma : chaque périmètre ajoute un contrôle proportionné au niveau de risque.">
        <rect x="20" y="18" width="290" height="140" rx="10" fill="#F1F5F9" stroke="#334155" strokeWidth="1.6" />
        <rect x="52" y="40" width="226" height="96" rx="8" fill="#E2E8F0" stroke="#475569" strokeWidth="1.4" strokeDasharray="5 4" />
        <rect x="92" y="64" width="146" height="52" rx="6" fill="#CBD5E1" stroke="#334155" strokeWidth="1.4" />
        <rect x="132" y="80" width="70" height="24" rx="4" fill="#334155" />
        <Tx x={167} y={96} anchor="middle" size={9} fill="#FFFFFF" bold>Site</Tx>
        <Tx x={30} y={34} size={9} bold fill="#334155">Périmètre 1 : voie publique</Tx>
        <Tx x={64} y={56} size={9} bold fill="#334155">Périmètre 2 : enceinte</Tx>
        <Tx x={104} y={130} size={9} bold fill="#334155">Périmètre 3 : zone sensible</Tx>
        <Tx x={228} y={146} size={9} fill="#DC2626" bold>Badge + registre</Tx>
        <Tx x={228} y={158} size={8} fill="#64748B">Vidéosurveillance</Tx>
      </Frame>
    );
  }

  if (diagramId === 'chaine_deplacement') {
    return (
      <Frame label="Chaîne de déplacement quotidien : origine, modes, destination" caption="Schéma : la chaîne de déplacement se mesure porte à porte, correspondances incluses.">
        <rect x="14" y="66" width="58" height="40" rx="6" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
        <Tx x={43} y={90} anchor="middle" size={9} bold fill="#1E3A8A">Origine</Tx>
        <rect x="150" y="40" width="66" height="30" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.4" />
        <Tx x={183} y={59} anchor="middle" size={8} bold fill="#1E3A8A">Marche</Tx>
        <rect x="150" y="76" width="66" height="30" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.4" />
        <Tx x={183} y={95} anchor="middle" size={8} bold fill="#1E3A8A">Bus / train</Tx>
        <rect x="150" y="112" width="66" height="30" rx="6" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.4" />
        <Tx x={183} y={131} anchor="middle" size={8} bold fill="#1E3A8A">Vélo</Tx>
        <rect x="274" y="66" width="70" height="40" rx="6" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
        <Tx x={309} y={90} anchor="middle" size={9} bold fill="#1E3A8A">Destination</Tx>
        <line x1="72" y1="86" x2="150" y2="55" stroke="#1D4ED8" strokeWidth="1.6" />
        <line x1="72" y1="86" x2="150" y2="91" stroke="#1D4ED8" strokeWidth="1.6" />
        <line x1="72" y1="86" x2="150" y2="127" stroke="#1D4ED8" strokeWidth="1.6" />
        <line x1="216" y1="86" x2="274" y2="86" stroke="#1D4ED8" strokeWidth="1.8" />
        <Tx x={183} y={24} size={9} fill="#64748B">Temps porte à porte</Tx>
        <Tx x={183} y={158} size={9} fill="#64748B">Parts modales mesurées</Tx>
      </Frame>
    );
  }

  if (diagramId === 'quadrant_langagier') {
    return (
      <Frame label="Quadrant des quatre compétences langagières" caption="Schéma : oral/écrit croisés avec réception/production définissent quatre compétences.">
        <rect x="58" y="18" width="132" height="64" rx="6" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
        <rect x="194" y="18" width="132" height="64" rx="6" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" />
        <rect x="58" y="86" width="132" height="64" rx="6" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" />
        <rect x="194" y="86" width="132" height="64" rx="6" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="1.5" />
        <Tx x={124} y={48} anchor="middle" size={10} bold fill="#4C1D95">Compréhension orale</Tx>
        <Tx x={124} y={66} anchor="middle" size={8} fill="#5B21B6">écouter un document</Tx>
        <Tx x={260} y={48} anchor="middle" size={10} bold fill="#4C1D95">Production orale</Tx>
        <Tx x={260} y={66} anchor="middle" size={8} fill="#5B21B6">parler en interaction</Tx>
        <Tx x={124} y={116} anchor="middle" size={10} bold fill="#4C1D95">Compréhension écrite</Tx>
        <Tx x={124} y={134} anchor="middle" size={8} fill="#5B21B6">lire et repérer</Tx>
        <Tx x={260} y={116} anchor="middle" size={10} bold fill="#4C1D95">Production écrite</Tx>
        <Tx x={260} y={134} anchor="middle" size={8} fill="#5B21B6">rédiger une tâche</Tx>
        <Tx x={10} y={54} size={9} bold fill="#5B21B6">Recevoir</Tx>
        <Tx x={10} y={124} size={9} bold fill="#5B21B6">Produire</Tx>
      </Frame>
    );
  }

  if (diagramId === 'cycle_traduction') {
    return (
      <Frame label="Cycle professionnel de traduction en cinq étapes" caption="Schéma : analyse, terminologie, traduction, révision et livraison forment un cycle qualité.">
        {[
          { x: 62, y: 40, label: '1. Analyse' },
          { x: 176, y: 30, label: '2. Terminologie' },
          { x: 274, y: 74, label: '3. Traduction' },
          { x: 196, y: 126, label: '4. Révision' },
          { x: 78, y: 112, label: '5. Livraison' },
        ].map((s) => (
          <React.Fragment key={s.label}>
            <circle cx={s.x} cy={s.y} r="26" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2" />
            <Tx x={s.x} y={s.y + 4} anchor="middle" size={8} bold fill="#075985">{s.label}</Tx>
          </React.Fragment>
        ))}
        <path d="M88 42 Q128 20 150 30" fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
        <path d="M202 40 Q248 40 260 60" fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
        <path d="M268 100 Q248 128 222 130" fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
        <path d="M170 132 Q120 140 96 130" fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
        <path d="M60 86 Q58 60 62 66" fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
        <Tx x={300} y={140} size={9} fill="#64748B">Traçabilité</Tx>
        <Tx x={300} y={156} size={9} fill="#64748B">Glossaire</Tx>
      </Frame>
    );
  }

  if (diagramId === 'plan_classification') {
    return (
      <Frame label="Rayonnage classé par indices de classification" caption="Schéma : une cote associe un indice de sujet et un identifiant d’ouvrage.">
        <rect x="26" y="30" width="286" height="12" fill="#B45309" />
        <rect x="26" y="82" width="286" height="12" fill="#B45309" />
        <rect x="26" y="134" width="286" height="12" fill="#B45309" />
        {[34, 44, 54, 64, 74].map((x, i) => (
          <rect key={`a${x}`} x={x} y={48 + (i % 2) * 4} width="8" height="34" fill={i % 2 ? '#FCD34D' : '#FDBA74'} stroke="#92400E" strokeWidth="0.8" />
        ))}
        {[212, 222, 232, 242, 252, 262, 272].map((x, i) => (
          <rect key={`b${x}`} x={x} y={98 + (i % 2) * 4} width="8" height="36" fill={i % 2 ? '#A7F3D0' : '#6EE7B7'} stroke="#065F46" strokeWidth="0.8" />
        ))}
        <Tx x={34} y={24} size={9} bold fill="#78350F">000 → 500 Sciences</Tx>
        <Tx x={212} y={94} size={9} bold fill="#065F46">800 Littérature</Tx>
        <Tx x={34} y={162} size={9} fill="#64748B">Cote = indice + trois lettres d’auteur</Tx>
        <Tx x={212} y={162} size={9} fill="#64748B">Indexation matière</Tx>
      </Frame>
    );
  }

  if (diagramId === 'mediation_triangle') {
    return (
      <Frame label="Triangle positions, intérêts et besoins en médiation" caption="Schéma : derrière chaque position se cachent des intérêts et des besoins négociables.">
        <polygon points="120,26 214,146 26,146" fill="#FAF5FF" stroke="#7E22CE" strokeWidth="2" />
        <Tx x={120} y={22} anchor="middle" size={10} bold fill="#6B21A8">Positions</Tx>
        <Tx x={214} y={162} anchor="middle" size={10} bold fill="#6B21A8">Intérêts</Tx>
        <Tx x={26} y={162} anchor="middle" size={10} bold fill="#6B21A8">Besoins</Tx>
        <circle cx="120" cy="86" r="9" fill="#7E22CE" />
        <Tx x={120} y={90} anchor="middle" size={8} fill="#FFFFFF" bold>Médiateur</Tx>
        <Tx x={248} y={44} size={11} bold fill="#0F172A">Démarche</Tx>
        <Tx x={248} y={64} size={9}>1. écouter</Tx>
        <Tx x={248} y={82} size={9}>2. reformuler</Tx>
        <Tx x={248} y={100} size={9}>3. distinguer</Tx>
        <Tx x={248} y={118} size={9}>4. options</Tx>
        <Tx x={248} y={140} size={9} fill="#7E22CE" bold>Accord écrit</Tx>
      </Frame>
    );
  }

  if (diagramId === 'boucle_circulaire') {
    return (
      <Frame label="Boucle de l’économie circulaire en cinq étapes" caption="Schéma : réduire, réemployer, réparer, recycler puis valoriser la matière.">
        <circle cx="112" cy="86" r="54" fill="none" stroke="#65A30D" strokeWidth="2" strokeDasharray="8 6" />
        {[
          { x: 112, y: 32, label: 'Réduire' },
          { x: 164, y: 60, label: 'Réemployer' },
          { x: 164, y: 112, label: 'Réparer' },
          { x: 112, y: 140, label: 'Recycler' },
          { x: 60, y: 112, label: 'Valoriser' },
        ].map((s) => (
          <React.Fragment key={s.label}>
            <circle cx={s.x} cy={s.y} r="19" fill="#ECFCCB" stroke="#4D7C0F" strokeWidth="1.6" />
            <Tx x={s.x} y={s.y + 3} anchor="middle" size={7.5} bold fill="#365314">{s.label}</Tx>
          </React.Fragment>
        ))}
        <Tx x={86} y={82} size={9} bold fill="#3F6212">Matière</Tx>
        <Tx x={86} y={98} size={9} bold fill="#3F6212">Usage</Tx>
        <Tx x={228} y={40} size={11} bold fill="#0F172A">Priorités</Tx>
        <Tx x={228} y={60} size={9}>1 prévention</Tx>
        <Tx x={228} y={78} size={9}>2 réemploi</Tx>
        <Tx x={228} y={96} size={9}>3 recyclage</Tx>
        <Tx x={228} y={114} size={9}>4 valorisation</Tx>
        <Tx x={228} y={136} size={9} fill="#4D7C0F" bold>Déchets ultimes</Tx>
      </Frame>
    );
  }

  if (diagramId === 'chaine_risque_climat') {
    return (
      <Frame label="Chaîne du risque climatique : aléa, enjeu et vulnérabilité" caption="Schéma : risque = aléa × enjeu × vulnérabilité, réduit par l’adaptation.">
        <rect x="14" y="48" width="78" height="56" rx="7" fill="#DCFCE7" stroke="#059669" strokeWidth="1.6" />
        <Tx x={53} y={72} anchor="middle" size={10} bold fill="#065F46">Aléa</Tx>
        <Tx x={53} y={88} anchor="middle" size={8} fill="#047857">pluie extrême</Tx>
        <rect x="112" y="48" width="78" height="56" rx="7" fill="#DCFCE7" stroke="#059669" strokeWidth="1.6" />
        <Tx x={151} y={72} anchor="middle" size={10} bold fill="#065F46">Enjeu</Tx>
        <Tx x={151} y={88} anchor="middle" size={8} fill="#047857">habitants, bâti</Tx>
        <rect x="210" y="48" width="86" height="56" rx="7" fill="#DCFCE7" stroke="#059669" strokeWidth="1.6" />
        <Tx x={253} y={72} anchor="middle" size={10} bold fill="#065F46">Vulnérabilité</Tx>
        <Tx x={253} y={88} anchor="middle" size={8} fill="#047857">fragilité, exposition</Tx>
        <line x1="92" y1="76" x2="112" y2="76" stroke="#059669" strokeWidth="2.2" />
        <line x1="190" y1="76" x2="210" y2="76" stroke="#059669" strokeWidth="2.2" />
        <rect x="112" y="118" width="150" height="30" rx="6" fill="#065F46" />
        <Tx x={187} y={138} anchor="middle" size={10} bold fill="#FFFFFF">Risque = aléa × enjeu × vulnérabilité</Tx>
        <Tx x={14} y={24} size={9} fill="#64748B">Aléa climatique mesuré (probabilité, intensité)</Tx>
        <Tx x={14} y={166} size={9} fill="#047857">Adaptation = réduire l’exposition et la vulnérabilité</Tx>
      </Frame>
    );
  }

  if (diagramId === 'accessibilite_universelle') {
    return (
      <Frame label="Accessibilité universelle : rampe, contraste et alternative textuelle" caption="Schéma : l’accessibilité profite à tous et se vérifie à chaque étape du parcours.">
        <rect x="20" y="100" width="150" height="46" rx="6" fill="#E0F2FE" stroke="#0891B2" strokeWidth="1.6" />
        <path d="M20 146 L170 100 L170 146 Z" fill="#A5F3FC" />
        <Tx x={70} y={138} size={9} bold fill="#155E75">Rampe 5 %</Tx>
        <circle cx="222" cy="74" r="17" fill="#0891B2" />
        <Tx x={222} y={78} anchor="middle" size={10} fill="#FFFFFF" bold>AA</Tx>
        <rect x="252" y="52" width="90" height="44" rx="6" fill="#F1F5F9" stroke="#0891B2" strokeWidth="1.5" />
        <Tx x={297} y={70} anchor="middle" size={8} bold fill="#155E75">Contraste 4.5:1</Tx>
        <Tx x={297} y={84} anchor="middle" size={8} fill="#155E75">Texte alternatif</Tx>
        <Tx x={20} y={32} size={11} bold fill="#0F172A">Trois conditions</Tx>
        <Tx x={20} y={52} size={9}>1. cheminement sans obstacle</Tx>
        <Tx x={20} y={68} size={9}>2. information perceptible</Tx>
        <Tx x={20} y={84} size={9}>3. usage autonome</Tx>
        <Tx x={222} y={116} size={9} fill="#64748B">Bénéficiaires :</Tx>
        <Tx x={222} y={132} size={9} fill="#64748B">tous les usagers</Tx>
      </Frame>
    );
  }

  if (diagramId === 'arts_composition') {
    return (
      <Frame label="Cercle chromatique et grille de composition" caption="Schéma : couleurs complémentaires et lignes de force structurent une composition.">
        <circle cx="96" cy="86" r="46" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
        {['#DC2626', '#F59E0B', '#84CC16', '#06B6D4', '#3B82F6', '#7C3AED'].map((c, i) => {
          const rad = ((i * 60 - 90) * Math.PI) / 180;
          return <circle key={c} cx={96 + Math.cos(rad) * 46} cy={86 + Math.sin(rad) * 46} r="11" fill={c} />;
        })}
        <Tx x={96} y={90} anchor="middle" size={8} fill="#334155">Cercle</Tx>
        <rect x="188" y="30" width="150" height="112" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
        <line x1="188" y1="30" x2="338" y2="142" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="338" y1="30" x2="188" y2="142" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="263" cy="70" r="15" fill="#F59E0B" opacity="0.9" />
        <rect x="216" y="96" width="44" height="26" fill="#3B82F6" opacity="0.85" />
        <path d="M296 122 l16 -30 l16 30 Z" fill="#DC2626" opacity="0.85" />
        <Tx x={188} y={158} size={9} fill="#64748B">Lignes de force et équilibre des masses</Tx>
      </Frame>
    );
  }

  return (
    <Frame label="Planning d’organisation hebdomadaire" caption="Schéma : blocs de travail courts, répétés et priorisés, avec récupération planifiée.">
      <rect x="26" y="26" width="300" height="112" rx="8" fill="#F8FAFC" stroke="#334155" strokeWidth="1.5" />
      {[2, 3, 4, 5, 6, 7].map((d, i) => (
        <line key={d} x1={26 + (i + 1) * 42.8} y1="26" x2={26 + (i + 1) * 42.8} y2="138" stroke="#E2E8F0" strokeWidth="1" />
      ))}
      <rect x="34" y="40" width="34" height="16" rx="3" fill="#1D4ED8" />
      <rect x="34" y="62" width="34" height="16" rx="3" fill="#1D4ED8" />
      <rect x="77" y="98" width="34" height="16" rx="3" fill="#059669" />
      <rect x="120" y="40" width="34" height="16" rx="3" fill="#1D4ED8" />
      <rect x="163" y="62" width="34" height="16" rx="3" fill="#F59E0B" />
      <rect x="206" y="40" width="34" height="16" rx="3" fill="#1D4ED8" />
      <rect x="249" y="98" width="34" height="16" rx="3" fill="#059669" />
      <Tx x={44} y={32} size={8} fill="#475569">L</Tx>
      <Tx x={87} y={32} size={8} fill="#475569">M</Tx>
      <Tx x={130} y={32} size={8} fill="#475569">M</Tx>
      <Tx x={173} y={32} size={8} fill="#475569">J</Tx>
      <Tx x={216} y={32} size={8} fill="#475569">V</Tx>
      <Tx x={259} y={32} size={8} fill="#475569">S</Tx>
      <Tx x={294} y={32} size={8} fill="#475569">D</Tx>
      <Tx x={26} y={156} size={9} fill="#1D4ED8" bold>Travail profond</Tx>
      <Tx x={120} y={156} size={9} fill="#B45309" bold>Révision</Tx>
      <Tx x={200} y={156} size={9} fill="#047857" bold>Récupération</Tx>
    </Frame>
  );
};
