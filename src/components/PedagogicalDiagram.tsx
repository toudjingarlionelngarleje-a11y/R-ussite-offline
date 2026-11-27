import React from 'react';
import { CourseSection } from '../types';
import { PedagogicalDiagramV25, isV25Diagram, V25DiagramId } from './PedagogicalDiagramV25';

/**
 * Cadre SVG commun à tous les schémas (v17.4) : garantit un rendu homogène,
 * accessible (role="img" + aria-label) et 100 % hors ligne.
 */
const DiagramFrame: React.FC<{
  viewBox: string;
  ariaLabel: string;
  caption: string;
  heightClass?: string;
  children: React.ReactNode;
}> = ({ viewBox, ariaLabel, caption, heightClass = 'h-auto', children }) => (
  <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
    <svg
      viewBox={viewBox}
      className={`mx-auto ${heightClass} w-full max-w-md`}
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </svg>
    <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
      {caption}
    </figcaption>
  </figure>
);

export const PedagogicalDiagram: React.FC<{
  diagramId: NonNullable<CourseSection['diagramId']>;
}> = ({ diagramId }) => {
  // v25.0 — les illustrations des nouvelles matières vivent dans leur propre module
  if (isV25Diagram(diagramId)) {
    return <PedagogicalDiagramV25 diagramId={diagramId as V25DiagramId} />;
  }

  if (diagramId === 'parabole') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 175" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Parabole du second degré avec racines x1 et x2 et sommet S">
          <line x1="25" y1="115" x2="335" y2="115" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="180" y1="15" x2="180" y2="160" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 65 25 Q 180 230 295 25" fill="none" stroke="#1D4ED8" strokeWidth="3" />
          <circle cx="112" cy="115" r="5" fill="#059669" />
          <circle cx="248" cy="115" r="5" fill="#059669" />
          <circle cx="180" cy="127" r="5" fill="#D97706" />
          <text x="95" y="136" fontSize="12" fill="#059669" fontWeight="bold">x₁</text>
          <text x="252" y="136" fontSize="12" fill="#059669" fontWeight="bold">x₂</text>
          <text x="188" y="148" fontSize="12" fill="#D97706" fontWeight="bold">Sommet S(α; β)</text>
          <text x="28" y="45" fontSize="11" fill="#1D4ED8">a &gt; 0 et Δ &gt; 0</text>
          <text x="155" y="96" fontSize="11" fill="#DC2626">Signe de −a</text>
          <text x="315" y="110" fontSize="11" fill="#64748B">x</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : courbe d’un trinôme f(x) = ax² + bx + c (cas a &gt; 0, Δ &gt; 0).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'circuit_rc') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 165" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Courbe de charge du condensateur uC(t) avec constante de temps tau">
          <line x1="40" y1="140" x2="335" y2="140" stroke="#64748B" strokeWidth="1.5" />
          <line x1="40" y1="20" x2="40" y2="140" stroke="#64748B" strokeWidth="1.5" />
          <line x1="40" y1="35" x2="330" y2="35" stroke="#94A3B8" strokeDasharray="5 4" strokeWidth="1.5" />
          <path d="M 40 140 C 75 70, 140 38, 325 36" fill="none" stroke="#0284C7" strokeWidth="3" />
          <line x1="40" y1="140" x2="115" y2="35" stroke="#D97706" strokeDasharray="4 3" strokeWidth="2" />
          <line x1="115" y1="35" x2="115" y2="140" stroke="#D97706" strokeDasharray="3 3" strokeWidth="1.5" />
          <circle cx="115" cy="74" r="4.5" fill="#059669" />
          <text x="15" y="39" fontSize="12" fill="#475569" fontWeight="bold">E</text>
          <text x="5" y="78" fontSize="10" fill="#059669" fontWeight="bold">0,63E</text>
          <text x="111" y="156" fontSize="12" fill="#D97706" fontWeight="bold">τ = RC</text>
          <text x="275" y="156" fontSize="11" fill="#475569">5τ (99%)</text>
          <text x="145" y="25" fontSize="11" fill="#0284C7" fontWeight="bold">u_C(t) = E(1 − e⁻ᵗ/ᵀ)</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : charge exponentielle d’un dipôle RC et détermination graphique de τ.
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'separation_pouvoirs') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 155" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Schéma des trois pouvoirs : Législatif, Exécutif, Judiciaire">
          <rect x="110" y="10" width="140" height="36" rx="8" fill="#1D4ED8" />
          <text x="180" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">CONSTITUTION</text>
          <line x1="180" y1="46" x2="65" y2="80" stroke="#94A3B8" strokeWidth="2" />
          <line x1="180" y1="46" x2="180" y2="80" stroke="#94A3B8" strokeWidth="2" />
          <line x1="180" y1="46" x2="295" y2="80" stroke="#94A3B8" strokeWidth="2" />
          <rect x="12" y="80" width="106" height="58" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.5" />
          <text x="65" y="103" textAnchor="middle" fill="#1E3A8A" fontSize="11" fontWeight="bold">LÉGISLATIF</text>
          <text x="65" y="122" textAnchor="middle" fill="#475569" fontSize="10">Vote la loi</text>
          <rect x="127" y="80" width="106" height="58" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
          <text x="180" y="103" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="bold">EXÉCUTIF</text>
          <text x="180" y="122" textAnchor="middle" fill="#475569" fontSize="10">Applique la loi</text>
          <rect x="242" y="80" width="106" height="58" rx="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          <text x="295" y="103" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="bold">JUDICIAIRE</text>
          <text x="295" y="122" textAnchor="middle" fill="#475569" fontSize="10">Tranche les litiges</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : séparation des pouvoirs et suprématie constitutionnelle.
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'mitose') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 130" className="mx-auto h-32 w-full max-w-md" role="img" aria-label="Les 4 étapes de la mitose : Prophase, Métaphase, Anaphase, Télophase">
          {[
            { x: 45, title: '1. Prophase', desc: 'Condensation', color: '#2563EB' },
            { x: 135, title: '2. Métaphase', desc: 'Alignement', color: '#059669' },
            { x: 225, title: '3. Anaphase', desc: 'Séparation', color: '#D97706' },
            { x: 315, title: '4. Télophase', desc: '2 noyaux (2n)', color: '#7C3AED' },
          ].map((step, i) => (
            <g key={step.title}>
              <circle cx={step.x} cy="48" r="28" fill="#F8FAFC" stroke={step.color} strokeWidth="2.5" />
              <text x={step.x} y="52" textAnchor="middle" fontSize="13" fontWeight="bold" fill={step.color}>
                {['P', 'M', 'A', 'T'][i]}
              </text>
              <text x={step.x} y="95" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">
                {step.title}
              </text>
              <text x={step.x} y="110" textAnchor="middle" fontSize="9.5" fill="#64748B">
                {step.desc}
              </text>
              {i < 3 && <line x1={step.x + 30} y1="48" x2={step.x + 60} y2="48" stroke="#94A3B8" strokeWidth="2" />}
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : mémo PMAT pour les 4 étapes de la mitose.
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'offre_demande') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 165" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Courbes d'offre et de demande avec prix d'équilibre">
          <line x1="45" y1="140" x2="325" y2="140" stroke="#64748B" strokeWidth="1.5" />
          <line x1="45" y1="20" x2="45" y2="140" stroke="#64748B" strokeWidth="1.5" />
          <line x1="70" y1="30" x2="290" y2="128" stroke="#DC2626" strokeWidth="3" />
          <line x1="70" y1="128" x2="290" y2="30" stroke="#059669" strokeWidth="3" />
          <circle cx="180" cy="79" r="5.5" fill="#1D4ED8" />
          <line x1="45" y1="79" x2="180" y2="79" stroke="#1D4ED8" strokeDasharray="4 3" />
          <line x1="180" y1="79" x2="180" y2="140" stroke="#1D4ED8" strokeDasharray="4 3" />
          <text x="20" y="83" fontSize="11" fontWeight="bold" fill="#1D4ED8">P*</text>
          <text x="174" y="156" fontSize="11" fontWeight="bold" fill="#1D4ED8">Q*</text>
          <text x="275" y="25" fontSize="11" fontWeight="bold" fill="#059669">Offre</text>
          <text x="265" y="122" fontSize="11" fontWeight="bold" fill="#DC2626">Demande</text>
          <text x="15" y="28" fontSize="11" fill="#475569">Prix</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : équilibre de marché (P*, Q*). Sous P*, la demande dépasse l’offre (pénurie).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'sql_relations') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 140" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Relation 1-N entre table Etudiants et table Notes via clé étrangère">
          <rect x="16" y="20" width="128" height="96" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
          <rect x="16" y="20" width="128" height="26" rx="8" fill="#1D4ED8" />
          <text x="80" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">ETUDIANTS</text>
          <text x="26" y="64" fontSize="10" fontWeight="bold" fill="#1E3A8A">PK id_etudiant</text>
          <text x="26" y="82" fontSize="10" fill="#334155">nom, prenom</text>
          <text x="26" y="100" fontSize="10" fill="#334155">filiere</text>

          <line x1="144" y1="68" x2="216" y2="68" stroke="#059669" strokeWidth="2.5" />
          <text x="150" y="60" fontSize="10" fontWeight="bold" fill="#059669">1</text>
          <text x="200" y="60" fontSize="10" fontWeight="bold" fill="#059669">0..N</text>

          <rect x="216" y="20" width="128" height="96" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <rect x="216" y="20" width="128" height="26" rx="8" fill="#059669" />
          <text x="280" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">NOTES</text>
          <text x="226" y="64" fontSize="10" fontWeight="bold" fill="#065F46">PK id_note</text>
          <text x="226" y="82" fontSize="10" fontWeight="bold" fill="#D97706">FK id_etudiant</text>
          <text x="226" y="100" fontSize="10" fill="#334155">matiere, valeur</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : relation 1 à N (PK = Clé primaire, FK = Clé étrangère) pour les jointures SQL.
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'bilan_syscohada') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 145" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Équilibre du Bilan comptable SYSCOHADA : Actif égal Passif">
          <rect x="18" y="16" width="154" height="112" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
          <rect x="18" y="16" width="154" height="26" rx="8" fill="#1D4ED8" />
          <text x="95" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">ACTIF (Emplois)</text>
          <text x="28" y="60" fontSize="10" fill="#1E3A8A" fontWeight="bold">Actif immobilisé (Cl. 2)</text>
          <text x="28" y="80" fontSize="10" fill="#334155">Actif circulant &amp; Stocks (Cl. 3-4)</text>
          <text x="28" y="100" fontSize="10" fill="#334155">Trésorerie-Actif (Cl. 5)</text>
          <text x="95" y="121" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1D4ED8">Total Actif</text>

          <text x="180" y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#059669">=</text>

          <rect x="188" y="16" width="154" height="112" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <rect x="188" y="16" width="154" height="26" rx="8" fill="#059669" />
          <text x="265" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">PASSIF (Ressources)</text>
          <text x="198" y="60" fontSize="10" fill="#065F46" fontWeight="bold">Capitaux propres (Cl. 1)</text>
          <text x="198" y="80" fontSize="10" fill="#334155">Dettes financières &amp; fournisseurs</text>
          <text x="198" y="100" fontSize="10" fill="#334155">Trésorerie-Passif (Cl. 5)</text>
          <text x="265" y="121" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#059669">Total Passif</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : équilibre fondamental du Bilan SYSCOHADA (Total Actif = Total Passif).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'reaction_chimique') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 120" className="mx-auto h-28 w-full max-w-md" role="img" aria-label="Équilibre d'estérification : Acide carboxylique plus Alcool donne Ester plus Eau">
          <rect x="8" y="34" width="92" height="44" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" />
          <text x="54" y="53" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991B1B">Acide</text>
          <text x="54" y="68" textAnchor="middle" fontSize="9.5" fill="#7F1D1D">R-COOH</text>
          <text x="109" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">+</text>
          <rect x="118" y="34" width="76" height="44" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
          <text x="156" y="53" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E3A8A">Alcool</text>
          <text x="156" y="68" textAnchor="middle" fontSize="9.5" fill="#1E40AF">R’-OH</text>

          <text x="213" y="52" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#059669">⇌</text>
          <text x="213" y="70" textAnchor="middle" fontSize="8.5" fill="#475569">Lente / limitée</text>

          <rect x="234" y="34" width="66" height="44" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
          <text x="267" y="53" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065F46">Ester</text>
          <text x="267" y="68" textAnchor="middle" fontSize="9" fill="#047857">R-COO-R’</text>
          <text x="308" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">+</text>
          <rect x="316" y="34" width="38" height="44" rx="8" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.8" />
          <text x="335" y="60" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">H₂O</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : équilibre d’estérification / hydrolyse (rendement ≈ 67 % pour un alcool primaire).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'loi_normale') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 165" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Courbe de Gauss de la loi normale avec intervalles 68%, 95% et 99,7%">
          <line x1="20" y1="132" x2="340" y2="132" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 30 130 C 90 130, 125 25, 180 25 C 235 25, 270 130, 330 130" fill="#DBEAFE" fillOpacity="0.45" stroke="#1D4ED8" strokeWidth="2.8" />
          <line x1="180" y1="22" x2="180" y2="132" stroke="#1E3A8A" strokeDasharray="4 3" strokeWidth="1.5" />
          <line x1="130" y1="58" x2="130" y2="132" stroke="#059669" strokeDasharray="3 3" strokeWidth="1.4" />
          <line x1="230" y1="58" x2="230" y2="132" stroke="#059669" strokeDasharray="3 3" strokeWidth="1.4" />
          <line x1="85" y1="110" x2="85" y2="132" stroke="#D97706" strokeDasharray="3 3" strokeWidth="1.4" />
          <line x1="275" y1="110" x2="275" y2="132" stroke="#D97706" strokeDasharray="3 3" strokeWidth="1.4" />
          <text x="180" y="90" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#065F46">68,3 %</text>
          <text x="180" y="108" textAnchor="middle" fontSize="10" fill="#B45309">95,4 % (±2σ)</text>
          <text x="180" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E3A8A">μ</text>
          <text x="130" y="148" textAnchor="middle" fontSize="10" fill="#059669">μ−σ</text>
          <text x="230" y="148" textAnchor="middle" fontSize="10" fill="#059669">μ+σ</text>
          <text x="85" y="148" textAnchor="middle" fontSize="9.5" fill="#D97706">μ−2σ</text>
          <text x="275" y="148" textAnchor="middle" fontSize="9.5" fill="#D97706">μ+2σ</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : règle empirique de la loi normale N(μ, σ²) — 68 % dans [μ−σ ; μ+σ], 95 % dans [μ−2σ ; μ+2σ].
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'cycle_cardiaque') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 165" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Double circulation sanguine : petite circulation pulmonaire et grande circulation systémique">
          <rect x="130" y="8" width="100" height="34" rx="8" fill="#EFF6FF" stroke="#0284C7" strokeWidth="2" />
          <text x="180" y="29" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369A1">POUMONS (O₂)</text>
          <rect x="36" y="64" width="112" height="44" rx="8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
          <text x="92" y="83" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1E3A8A">Cœur Droit</text>
          <text x="92" y="98" textAnchor="middle" fontSize="9" fill="#1E40AF">Sang pauvre en O₂</text>
          <rect x="212" y="64" width="112" height="44" rx="8" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <text x="268" y="83" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#991B1B">Cœur Gauche</text>
          <text x="268" y="98" textAnchor="middle" fontSize="9" fill="#B91C1C">Sang riche en O₂</text>
          <rect x="122" y="126" width="116" height="32" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <text x="180" y="146" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#065F46">ORGANES &amp; TISSUS</text>
          <path d="M 92 64 L 130 28" stroke="#2563EB" strokeWidth="2" fill="none" />
          <path d="M 230 28 L 268 64" stroke="#DC2626" strokeWidth="2" fill="none" />
          <path d="M 268 108 L 238 140" stroke="#DC2626" strokeWidth="2" fill="none" />
          <path d="M 122 140 L 92 108" stroke="#2563EB" strokeWidth="2" fill="none" />
          <text x="64" y="42" fontSize="9" fill="#1D4ED8">Artère pulm.</text>
          <text x="255" y="42" fontSize="9" fill="#DC2626">Veines pulm.</text>
          <text x="264" y="132" fontSize="9" fill="#DC2626">Aorte</text>
          <text x="48" y="132" fontSize="9" fill="#1D4ED8">Veines caves</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : double circulation sanguine (petite circulation pulmonaire + grande circulation systémique).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'architecture_ia') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 128" className="mx-auto h-32 w-full max-w-md" role="img" aria-label="Pipeline Machine Learning : Données, Features, Entraînement, Évaluation, Inférence">
          {[
            { x: 10, label: '1. Données', sub: 'Nettoyage', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
            { x: 96, label: '2. Split', sub: 'Train / Test', fill: '#F5F3FF', stroke: '#7C3AED', text: '#5B21B6' },
            { x: 182, label: '3. Modèle', sub: 'Apprentissage', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
            { x: 268, label: '4. Inférence', sub: 'F1 / Suivi', fill: '#FFFBEB', stroke: '#D97706', text: '#92400E' },
          ].map((box, i) => (
            <g key={box.label}>
              <rect x={box.x} y="34" width="76" height="54" rx="8" fill={box.fill} stroke={box.stroke} strokeWidth="1.8" />
              <text x={box.x + 38} y="57" textAnchor="middle" fontSize="10" fontWeight="bold" fill={box.text}>
                {box.label}
              </text>
              <text x={box.x + 38} y="73" textAnchor="middle" fontSize="9" fill="#475569">
                {box.sub}
              </text>
              {i < 3 && <line x1={box.x + 76} y1="61" x2={box.x + 86} y2="61" stroke="#64748B" strokeWidth="2" />}
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : cycle de vie d’un projet Machine Learning (de la donnée brute à la mise en production).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'pyramide_normes') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 165" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Pyramide de Kelsen : Constitution, Traités et Actes uniformes OHADA, Lois, Règlements">
          <polygon points="180,10 120,46 240,46" fill="#1D4ED8" />
          <text x="180" y="37" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">CONSTITUTION</text>
          <polygon points="116,50 244,50 274,84 86,84" fill="#0284C7" />
          <text x="180" y="71" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">TRAITÉS &amp; ACTES UNIFORMES OHADA</text>
          <polygon points="82,88 278,88 308,122 52,122" fill="#059669" />
          <text x="180" y="109" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">LOIS ORGANIQUES &amp; ORDINAIRES</text>
          <polygon points="48,126 312,126 340,156 20,156" fill="#D97706" />
          <text x="180" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">DÉCRETS, ARRÊTÉS &amp; ACTES ADMINISTRATIFS</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : hiérarchie des normes (Pyramide de Kelsen &amp; supranationalité des Actes uniformes OHADA).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'photovoltaique') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 132" className="mx-auto h-32 w-full max-w-md" role="img" aria-label="Chaîne photovoltaïque autonome : Panneau solaire, Régulateur MPPT, Batterie, Onduleur, Charges AC">
          {[
            { x: 6, label: 'Panneaux PV', sub: 'DC variable', fill: '#FEF3C7', stroke: '#D97706', text: '#92400E' },
            { x: 94, label: 'MPPT', sub: 'Régulateur', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
            { x: 182, label: 'Batterie', sub: 'Stockage DC', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
            { x: 270, label: 'Onduleur', sub: 'DC → 230V AC', fill: '#F5F3FF', stroke: '#7C3AED', text: '#5B21B6' },
          ].map((b, i) => (
            <g key={b.label}>
              <rect x={b.x} y="34" width="80" height="54" rx="8" fill={b.fill} stroke={b.stroke} strokeWidth="1.8" />
              <text x={b.x + 40} y="57" textAnchor="middle" fontSize="10" fontWeight="bold" fill={b.text}>
                {b.label}
              </text>
              <text x={b.x + 40} y="73" textAnchor="middle" fontSize="8.8" fill="#475569">
                {b.sub}
              </text>
              {i < 3 && <line x1={b.x + 80} y1="61" x2={b.x + 88} y2="61" stroke="#64748B" strokeWidth="2" />}
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : architecture d’une installation solaire photovoltaïque autonome (site isolé).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'cycle_azote') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 155" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Cycle biologique de l'azote : N2 atmosphérique, Fixation, Nitrification, Assimilation végétale">
          <rect x="112" y="8" width="136" height="32" rx="8" fill="#EFF6FF" stroke="#0284C7" strokeWidth="2" />
          <text x="180" y="28" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0369A1">Azote atmosphérique (N₂)</text>
          <rect x="16" y="64" width="102" height="38" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
          <text x="67" y="81" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#065F46">Fixation (Rhizobium)</text>
          <text x="67" y="94" textAnchor="middle" fontSize="8.5" fill="#047857">N₂ → NH₄⁺</text>
          <rect x="130" y="112" width="100" height="34" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.8" />
          <text x="180" y="128" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400E">Nitrification</text>
          <text x="180" y="140" textAnchor="middle" fontSize="8.5" fill="#B45309">NH₄⁺ → NO₃⁻</text>
          <rect x="242" y="64" width="102" height="38" rx="8" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.8" />
          <text x="293" y="81" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#166534">Assimilation</text>
          <text x="293" y="94" textAnchor="middle" fontSize="8.5" fill="#15803D">Plantes &amp; Protéines</text>
          <path d="M 118 32 L 72 64" stroke="#0284C7" strokeWidth="1.8" fill="none" />
          <path d="M 92 102 L 130 124" stroke="#059669" strokeWidth="1.8" fill="none" />
          <path d="M 230 124 L 270 102" stroke="#D97706" strokeWidth="1.8" fill="none" />
          <path d="M 286 64 L 240 32" stroke="#64748B" strokeDasharray="4 3" strokeWidth="1.6" fill="none" />
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : cycle de l’azote dans les agrosystèmes (rôle clé des légumineuses et bactéries du sol).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'pharmacocinetique') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 128" className="mx-auto h-32 w-full max-w-md" role="img" aria-label="Phases ADME de la pharmacocinétique : Absorption, Distribution, Métabolisme, Élimination">
          {[
            { x: 10, letter: 'A', label: 'Absorption', sub: 'Tube digestif', color: '#2563EB', fill: '#EFF6FF' },
            { x: 96, letter: 'D', label: 'Distribution', sub: 'Sang & tissus', color: '#059669', fill: '#ECFDF5' },
            { x: 182, letter: 'M', label: 'Métabolisme', sub: 'Foie (CYP450)', color: '#D97706', fill: '#FFFBEB' },
            { x: 268, letter: 'E', label: 'Élimination', sub: 'Reins / Bile', color: '#DC2626', fill: '#FEF2F2' },
          ].map((s, i) => (
            <g key={s.letter}>
              <rect x={s.x} y="24" width="76" height="72" rx="10" fill={s.fill} stroke={s.color} strokeWidth="2" />
              <text x={s.x + 38} y="47" textAnchor="middle" fontSize="15" fontWeight="bold" fill={s.color}>{s.letter}</text>
              <text x={s.x + 38} y="66" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1E293B">{s.label}</text>
              <text x={s.x + 38} y="82" textAnchor="middle" fontSize="8.5" fill="#64748B">{s.sub}</text>
              {i < 3 && <line x1={s.x + 76} y1="60" x2={s.x + 86} y2="60" stroke="#94A3B8" strokeWidth="2" />}
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : les 4 étapes ADME de la pharmacocinétique (devenir du médicament dans l’organisme).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'incoterms_chaine') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 135" className="mx-auto h-32 w-full max-w-md" role="img" aria-label="Transfert progressif des frais et risques selon les Incoterms 2020 : EXW, FOB, CIF, DDP">
          <line x1="25" y1="68" x2="335" y2="68" stroke="#1D4ED8" strokeWidth="3" />
          {[
            { x: 35, code: 'EXW', desc: 'Usine vendeur', color: '#059669' },
            { x: 130, code: 'FOB', desc: 'Bord navire', color: '#0284C7' },
            { x: 225, code: 'CIF', desc: 'Port arrivée', color: '#D97706' },
            { x: 320, code: 'DDP', desc: 'Livré dédouané', color: '#DC2626' },
          ].map((p) => (
            <g key={p.code}>
              <circle cx={p.x} cy="68" r="10" fill={p.color} />
              <text x={p.x} y="42" textAnchor="middle" fontSize="11" fontWeight="bold" fill={p.color}>{p.code}</text>
              <text x={p.x} y="96" textAnchor="middle" fontSize="9" fill="#475569">{p.desc}</text>
            </g>
          ))}
          <text x="180" y="122" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1E3A8A">
            Obligations &amp; frais du Vendeur → croissants de EXW à DDP
          </text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : gradation des obligations vendeur/acheteur selon les Incoterms® 2020.
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'modele_osi') {
    const layers = [
      { n: 7, name: '7. Application (HTTP, DNS, SMTP)', color: '#1D4ED8' },
      { n: 6, name: '6. Présentation (TLS, encodage)', color: '#2563EB' },
      { n: 5, name: '5. Session (contrôle dialogue)', color: '#0284C7' },
      { n: 4, name: '4. Transport (TCP / UDP — Ports)', color: '#059669' },
      { n: 3, name: '3. Réseau (IP, Routage — Paquets)', color: '#D97706' },
      { n: 2, name: '2. Liaison (Ethernet, Wi-Fi — MAC)', color: '#EA580C' },
      { n: 1, name: '1. Physique (Fibre, Ondes, Bits)', color: '#DC2626' },
    ];
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 185" className="mx-auto h-44 w-full max-w-md" role="img" aria-label="Les 7 couches du modèle OSI de la couche Physique 1 à la couche Application 7">
          {layers.map((l, idx) => (
            <g key={l.n}>
              <rect x="30" y={6 + idx * 25} width="300" height="21" rx="5" fill={l.color} />
              <text x="180" y={20 + idx * 25} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">
                {l.name}
              </text>
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : pile des 7 couches du modèle OSI (du signal physique aux applications réseau).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'poutre_flexion') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 155" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Poutre isostatique sur appuis simples avec charge concentrée P au milieu et moment maximal PL sur 4">
          <line x1="180" y1="16" x2="180" y2="62" stroke="#DC2626" strokeWidth="3" />
          <polygon points="180,68 173,56 187,56" fill="#DC2626" />
          <text x="192" y="34" fontSize="11" fontWeight="bold" fill="#DC2626">Charge P</text>
          <rect x="40" y="70" width="280" height="14" rx="3" fill="#CBD5E1" stroke="#334155" strokeWidth="1.8" />
          <polygon points="48,84 36,104 60,104" fill="#1D4ED8" />
          <polygon points="312,84 300,104 324,104" fill="#059669" />
          <text x="48" y="120" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E3A8A">R_A = P/2</text>
          <text x="312" y="120" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065F46">R_B = P/2</text>
          <line x1="48" y1="136" x2="312" y2="136" stroke="#64748B" strokeWidth="1.5" />
          <text x="180" y="132" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A">Portée L  |  M_max = (P · L) / 4 au centre</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : poutre isostatique chargée au milieu (réactions d’appuis P/2 et moment fléchissant maximal).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'pyramide_alimentaire') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 155" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Répartition équilibrée des apports énergétiques : Glucides 50-55%, Lipides 30-35%, Protéines 12-15%">
          <rect x="24" y="22" width="312" height="28" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.8" />
          <text x="180" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400E">Glucides complexes : 50 % à 55 % (4 kcal/g)</text>
          <rect x="52" y="60" width="256" height="28" rx="6" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.8" />
          <text x="180" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E3A8A">Lipides (acides gras insaturés) : 30 % à 35 % (9 kcal/g)</text>
          <rect x="82" y="98" width="196" height="28" rx="6" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
          <text x="180" y="116" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065F46">Protéines : 12 % à 15 % (4 kcal/g)</text>
          <text x="180" y="144" textAnchor="middle" fontSize="9.5" fill="#475569">+ Eau potable (1,5–2 L/j), fibres, vitamines &amp; minéraux</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : repères nutritionnels recommandés (équilibre énergétique des macronutriments).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'pyramide_inversee') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 155" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Pyramide inversée journalistique : Essentiel 5W en tête, détails importants au milieu, contexte en bas">
          <polygon points="24,14 336,14 294,54 66,54" fill="#1D4ED8" />
          <text x="180" y="38" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#FFFFFF">1. ATTAQUE / CHAPÔ : 5W (Qui, Quoi, Où, Quand, Pourquoi)</text>
          <polygon points="72,60 288,60 248,100 112,100" fill="#0284C7" />
          <text x="180" y="84" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">2. DÉTAILS &amp; CITATIONS VÉRIFIÉES</text>
          <polygon points="118,106 242,106 180,146" fill="#059669" />
          <text x="180" y="124" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">3. CONTEXTE</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : règle journalistique de la pyramide inversée (l’information essentielle dès le premier paragraphe).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'forces_vol') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 165" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Les 4 forces aérodynamiques en vol rectiligne uniforme : Portance, Poids, Traction et Traînée">
          <ellipse cx="180" cy="82" rx="48" ry="14" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
          <text x="180" y="86" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E3A8A">AVION</text>
          <line x1="180" y1="68" x2="180" y2="20" stroke="#059669" strokeWidth="3" />
          <polygon points="180,14 174,25 186,25" fill="#059669" />
          <text x="192" y="30" fontSize="10.5" fontWeight="bold" fill="#059669">Portance (L)</text>
          <line x1="180" y1="96" x2="180" y2="144" stroke="#DC2626" strokeWidth="3" />
          <polygon points="180,150 174,139 186,139" fill="#DC2626" />
          <text x="192" y="144" fontSize="10.5" fontWeight="bold" fill="#DC2626">Poids (mg)</text>
          <line x1="228" y1="82" x2="315" y2="82" stroke="#2563EB" strokeWidth="3" />
          <polygon points="322,82 311,76 311,88" fill="#2563EB" />
          <text x="275" y="72" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1D4ED8">Traction (T)</text>
          <line x1="132" y1="82" x2="45" y2="82" stroke="#D97706" strokeWidth="3" />
          <polygon points="38,82 49,76 49,88" fill="#D97706" />
          <text x="85" y="72" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">Traînée (D)</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : équilibre des 4 forces en vol rectiligne uniforme (Portance = Poids ; Traction = Traînée).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'couches_geologiques') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 155" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Piège pétrolier anticlinal : roche couverture imperméable, gaz, pétrole, eau dans roche réservoir, roche mère">
          <path d="M 20 55 Q 180 5 340 55 L 340 80 Q 180 30 20 80 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
          <text x="180" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">Roche couverture imperméable (Argile / Sel)</text>
          <path d="M 20 80 Q 180 30 340 80 L 340 118 Q 180 68 20 118 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <text x="180" y="74" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#92400E">Roche réservoir poreuse : Gaz → Pétrole → Eau</text>
          <rect x="20" y="118" width="320" height="30" rx="4" fill="#334155" />
          <text x="180" y="137" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#F8FAFC">Roche mère riche en matière organique (kérogène)</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : système pétrolier anticlinal (Roche mère → Migration → Roche réservoir → Roche couverture).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'pyramide_maslow') {
    const levels = [
      { y: 12, x1: 145, x2: 215, label: '5. Accomplissement', color: '#7C3AED' },
      { y: 40, x1: 118, x2: 242, label: '4. Estime', color: '#2563EB' },
      { y: 68, x1: 90, x2: 270, label: '3. Appartenance', color: '#0284C7' },
      { y: 96, x1: 62, x2: 298, label: '2. Sécurité', color: '#059669' },
      { y: 124, x1: 34, x2: 326, label: '1. Besoins physiologiques', color: '#D97706' },
    ];
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 160" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Pyramide des 5 besoins de Maslow de la base physiologique au sommet accomplissement">
          {levels.map((lv) => (
            <g key={lv.label}>
              <rect x={lv.x1} y={lv.y} width={lv.x2 - lv.x1} height="24" rx="5" fill={lv.color} />
              <text x="180" y={lv.y + 16} textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#FFFFFF">
                {lv.label}
              </text>
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : hiérarchie des besoins humains selon Abraham Maslow (1943).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'flux_fintech') {
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 128" className="mx-auto h-32 w-full max-w-md" role="img" aria-label="Architecture d'un paiement Mobile Money sécurisé : Wallet KYC, API TLS, Switch GIMAC/BCEAO, Compte de cantonnement">
          {[
            { x: 8, label: 'Wallet KYC', sub: 'PIN / OTP', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
            { x: 96, label: 'API TLS', sub: 'Anti-fraude', fill: '#F5F3FF', stroke: '#7C3AED', text: '#5B21B6' },
            { x: 184, label: 'Switch', sub: 'Interopérable', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
            { x: 272, label: 'Banque', sub: 'Cantonnement', fill: '#FEF3C7', stroke: '#D97706', text: '#92400E' },
          ].map((n, i) => (
            <g key={n.label}>
              <rect x={n.x} y="32" width="78" height="56" rx="8" fill={n.fill} stroke={n.stroke} strokeWidth="1.8" />
              <text x={n.x + 39} y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill={n.text}>{n.label}</text>
              <text x={n.x + 39} y="72" textAnchor="middle" fontSize="8.8" fill="#475569">{n.sub}</text>
              {i < 3 && <line x1={n.x + 78} y1="60" x2={n.x + 88} y2="60" stroke="#64748B" strokeWidth="2" />}
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : flux sécurisé d’un paiement Mobile Money (KYC, chiffrement TLS, interopérabilité et cantonnement).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'couches_sig') {
    const layers = [
      { y: 18, label: 'Couche 4 — Cadastre & Bâti (Polygones)', fill: '#FEF3C7', stroke: '#D97706', text: '#92400E' },
      { y: 50, label: 'Couche 3 — Réseau routier (Lignes / Vecteur)', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
      { y: 82, label: 'Couche 2 — Hydrographie & Forages (Points/Lignes)', fill: '#ECFEFF', stroke: '#0891B2', text: '#155E75' },
      { y: 114, label: 'Couche 1 — Relief MNT / Image satellite (Raster)', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
    ];
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 162" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Superposition des couches SIG raster et vecteur géoréférencées en WGS84">
          {layers.map((l) => (
            <g key={l.label}>
              <rect x="30" y={l.y} width="300" height="25" rx="6" fill={l.fill} stroke={l.stroke} strokeWidth="1.6" />
              <text x="180" y={l.y + 16} textAnchor="middle" fontSize="9.8" fontWeight="bold" fill={l.text}>{l.label}</text>
            </g>
          ))}
          <text x="180" y="153" textAnchor="middle" fontSize="9.2" fill="#475569">Référentiel commun : WGS84 / Projection UTM → Carte thématique</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : principe d’empilement des couches raster et vecteur dans un Système d’Information Géographique (SIG).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'score_apgar') {
    const items = [
      { letter: 'A', name: 'Apparence (Coloration)', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
      { letter: 'P', name: 'Pouls (Fréq. cardiaque)', fill: '#FEF2F2', stroke: '#DC2626', text: '#991B1B' },
      { letter: 'G', name: 'Grimace (Réactivité)', fill: '#FFFBEB', stroke: '#D97706', text: '#92400E' },
      { letter: 'A', name: 'Activité (Tonus)', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
      { letter: 'R', name: 'Respiration (Cri)', fill: '#F5F3FF', stroke: '#7C3AED', text: '#5B21B6' },
    ];
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 165" className="mx-auto h-40 w-full max-w-md" role="img" aria-label="Score d'Apgar néonatal évalué à 1, 5 et 10 minutes sur 10 points">
          {items.map((it, idx) => (
            <g key={it.name}>
              <rect x="24" y={10 + idx * 27} width="32" height="22" rx="5" fill={it.stroke} />
              <text x="40" y={25 + idx * 27} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">{it.letter}</text>
              <rect x="64" y={10 + idx * 27} width="206" height="22" rx="5" fill={it.fill} stroke={it.stroke} strokeWidth="1.2" />
              <text x="74" y={25 + idx * 27} fontSize="10" fontWeight="bold" fill={it.text}>{it.name}</text>
              <rect x="278" y={10 + idx * 27} width="58" height="22" rx="5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
              <text x="307" y={25 + idx * 27} textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#334155">0 – 2 pts</text>
            </g>
          ))}
          <text x="180" y="156" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0F172A">Évalué à 1 min &amp; 5 min : ≥ 7 Normal | 4–6 Modéré | ≤ 3 Urgence réanimation</text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : grille mnémotechnique du score d’Apgar pour l’évaluation immédiate du nouveau-né.
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'cycle_crise') {
    const phases = [
      { x: 24, y: 18, title: '1. Prévention', sub: 'Réduction risques', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
      { x: 196, y: 18, title: '2. Préparation', sub: 'Alerte & stocks', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
      { x: 196, y: 92, title: '3. Réponse', sub: 'Secours & Sphère', fill: '#FEF2F2', stroke: '#DC2626', text: '#991B1B' },
      { x: 24, y: 92, title: '4. Relèvement', sub: 'Reconstruire mieux', fill: '#FFFBEB', stroke: '#D97706', text: '#92400E' },
    ];
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 156" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Cycle en 4 phases de gestion des crises et catastrophes">
          {phases.map((p) => (
            <g key={p.title}>
              <rect x={p.x} y={p.y} width="140" height="46" rx="8" fill={p.fill} stroke={p.stroke} strokeWidth="1.8" />
              <text x={p.x + 70} y={p.y + 20} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={p.text}>{p.title}</text>
              <text x={p.x + 70} y={p.y + 36} textAnchor="middle" fontSize="9.2" fill="#475569">{p.sub}</text>
            </g>
          ))}
          <line x1="164" y1="41" x2="194" y2="41" stroke="#64748B" strokeWidth="2" />
          <line x1="266" y1="64" x2="266" y2="90" stroke="#64748B" strokeWidth="2" />
          <line x1="194" y1="115" x2="164" y2="115" stroke="#64748B" strokeWidth="2" />
          <line x1="94" y1="90" x2="94" y2="64" stroke="#64748B" strokeWidth="2" />
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : cycle continu de gestion des catastrophes (Cadre de Sendai — prévention, préparation, réponse, relèvement).
        </figcaption>
      </figure>
    );
  }

  if (diagramId === 'fonctions_chimie') {
    const groups = [
      { y: 12, name: 'Alcool', group: 'R–OH', suffix: '–ol (ex. éthanol)', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
      { y: 40, name: 'Aldéhyde', group: 'R–CHO', suffix: '–al (ex. éthanal)', fill: '#ECFEFF', stroke: '#0891B2', text: '#155E75' },
      { y: 68, name: 'Acide carb.', group: 'R–COOH', suffix: 'acide …–oïque', fill: '#FEF2F2', stroke: '#DC2626', text: '#991B1B' },
      { y: 96, name: 'Ester', group: 'R–COO–R’', suffix: '…–oate de …–yle', fill: '#FFFBEB', stroke: '#D97706', text: '#92400E' },
      { y: 124, name: 'Amine', group: 'R–NH₂', suffix: '…–amine', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
    ];
    return (
      <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <svg viewBox="0 0 360 156" className="mx-auto h-36 w-full max-w-md" role="img" aria-label="Principales familles fonctionnelles en chimie organique : alcool, aldéhyde, acide carboxylique, ester, amine">
          {groups.map((g) => (
            <g key={g.name}>
              <rect x="18" y={g.y} width="90" height="22" rx="5" fill={g.fill} stroke={g.stroke} strokeWidth="1.4" />
              <text x="63" y={g.y + 15} textAnchor="middle" fontSize="9.8" fontWeight="bold" fill={g.text}>{g.name}</text>
              <rect x="116" y={g.y} width="84" height="22" rx="5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
              <text x="158" y={g.y + 15} textAnchor="middle" fontSize="9.8" fontWeight="bold" fill="#0F172A">{g.group}</text>
              <rect x="208" y={g.y} width="134" height="22" rx="5" fill={g.fill} stroke={g.stroke} strokeWidth="1.1" />
              <text x="275" y={g.y + 15} textAnchor="middle" fontSize="9.5" fill={g.text}>{g.suffix}</text>
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
          Schéma hors ligne : mémento visuel des 5 groupes fonctionnels majeurs en chimie organique.
        </figcaption>
      </figure>
    );
  }

  /* ==================== v17.4 — ANATOMIE & BIOLOGIE ==================== */

  if (diagramId === 'corps_humain') {
    const labels = [
      { label: 'Cerveau', side: 'right' as const, y: 30, from: 195, to: 276 },
      { label: 'Cœur', side: 'right' as const, y: 96, from: 190, to: 276 },
      { label: 'Estomac', side: 'right' as const, y: 120, from: 209, to: 276 },
      { label: 'Intestins', side: 'right' as const, y: 152, from: 199, to: 276 },
      { label: 'Poumons', side: 'left' as const, y: 88, from: 159, to: 78 },
      { label: 'Foie', side: 'left' as const, y: 116, from: 151, to: 78 },
      { label: 'Reins', side: 'left' as const, y: 134, from: 151, to: 78 },
    ];
    return (
      <DiagramFrame
        viewBox="0 0 360 300"
        ariaLabel="Schéma du corps humain : silhouette avec cerveau, poumons, cœur, foie, estomac, reins et intestins légendés"
        caption="Schéma hors ligne : organisation des principaux organes internes du corps humain (vue de face)."
      >
        <g stroke="#94A3B8" fill="#F1F5F9" strokeWidth="1.5">
          <circle cx="180" cy="34" r="19" />
          <rect x="175" y="50" width="10" height="12" rx="4" />
          <path d="M152 60 Q180 52 208 60 L212 116 Q210 148 205 166 L155 166 Q150 148 148 116 Z" />
          <polyline points="152,66 130,112 136,146" fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="208,66 230,112 224,146" fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="136" cy="150" r="5" />
          <circle cx="224" cy="150" r="5" />
          <polyline points="168,164 163,212 165,250" fill="none" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="192,164 197,212 195,250" fill="none" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="165" y1="252" x2="152" y2="258" strokeWidth="7" strokeLinecap="round" />
          <line x1="195" y1="252" x2="208" y2="258" strokeWidth="7" strokeLinecap="round" />
        </g>

        <ellipse cx="180" cy="30" rx="12" ry="9" fill="#F9A8D4" stroke="#DB2777" strokeWidth="1.2" />
        <ellipse cx="170" cy="92" rx="10" ry="15" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.2" />
        <ellipse cx="192" cy="92" rx="10" ry="15" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.2" />
        <circle cx="181" cy="98" r="7" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.2" />
        <path d="M151 108 Q166 104 176 116 Q164 126 152 120 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="1.2" />
        <ellipse cx="199" cy="120" rx="9" ry="7" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.2" />
        <ellipse cx="157" cy="130" rx="5.5" ry="7.5" fill="#C4B5FD" stroke="#6D28D9" strokeWidth="1.1" />
        <ellipse cx="202" cy="130" rx="5.5" ry="7.5" fill="#C4B5FD" stroke="#6D28D9" strokeWidth="1.1" />
        <rect x="163" y="138" width="34" height="24" rx="10" fill="#FDE68A" stroke="#A16207" strokeWidth="1.2" />
        <path d="M168 145 q5.5 5.5 11 0 q5.5 5.5 11 0 M168 156 q5.5 5.5 11 0 q5.5 5.5 11 0" fill="none" stroke="#A16207" strokeWidth="1" />

        {labels.map((o) => (
          <g key={o.label}>
            <line x1={o.from} y1={o.y} x2={o.to} y2={o.y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx={o.from} cy={o.y} r="1.8" fill="#475569" />
            <text
              x={o.side === 'right' ? o.to + 3 : o.to - 3}
              y={o.y + 3}
              textAnchor={o.side === 'right' ? 'start' : 'end'}
              fontSize="9"
              fontWeight="bold"
              fill="#334155"
            >
              {o.label}
            </text>
          </g>
        ))}
        <text x="24" y="290" fontSize="8" fill="#64748B">
          Vue schématique simplifiée — repères d’anatomie de surface.
        </text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'appareil_digestif') {
    const steps = [
      { label: '1. Bouche', detail: 'Mastication + amylase salivaire (début de la digestion de l’amidon)', fill: '#EFF6FF', stroke: '#2563EB', text: '#1E3A8A' },
      { label: '2. Œsophage', detail: 'Péristaltisme : descente du bol alimentaire en une dizaine de secondes', fill: '#ECFEFF', stroke: '#0891B2', text: '#155E75' },
      { label: '3. Estomac', detail: 'HCl + pepsine — pH 1,5 à 3, brassage mécanique', fill: '#FEF2F2', stroke: '#DC2626', text: '#991B1B' },
      { label: '4. Duodénum', detail: 'Bile du foie + enzymes du pancréas (lipase, trypsine)', fill: '#FEFCE8', stroke: '#CA8A04', text: '#854D0E' },
      { label: '5. Intestin grêle', detail: 'Villosités → absorption des nutriments (6 à 7 m)', fill: '#ECFDF5', stroke: '#059669', text: '#065F46' },
      { label: '6. Côlon → Rectum', detail: 'Réabsorption de l’eau puis formation et évacuation des selles', fill: '#F5F3FF', stroke: '#7C3AED', text: '#4C1D95' },
    ];
    return (
      <DiagramFrame
        viewBox="0 0 360 250"
        ariaLabel="Schéma de l'appareil digestif : bouche, œsophage, estomac, duodénum, intestin grêle, côlon et rectum"
        caption="Schéma hors ligne : les 6 étapes du tube digestif et les sécrétions associées."
      >
        {steps.map((st, i) => {
          const y = 12 + i * 38;
          return (
            <g key={st.label}>
              <rect x="30" y={y} width="300" height="32" rx="7" fill={st.fill} stroke={st.stroke} strokeWidth="1.5" />
              <text x="42" y={y + 14} fontSize="9.5" fontWeight="bold" fill={st.text}>
                {st.label}
              </text>
              <text x="42" y={y + 26} fontSize="7.8" fill="#475569">
                {st.detail}
              </text>
              {i < steps.length - 1 && (
                <line x1="180" y1={y + 32} x2="180" y2={y + 38} stroke="#94A3B8" strokeWidth="1.4" />
              )}
            </g>
          );
        })}
      </DiagramFrame>
    );
  }

  if (diagramId === 'appareil_respiratoire') {
    return (
      <DiagramFrame
        viewBox="0 0 360 268"
        ariaLabel="Schéma de l'appareil respiratoire : voies aériennes, poumons, alvéoles et hématose"
        caption="Schéma hors ligne : ventilation (nez → alvéoles) et hématose alvéolo-capillaire (O₂ / CO₂)."
      >
        <ellipse cx="180" cy="34" rx="14" ry="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        <line x1="194" y1="32" x2="206" y2="30" stroke="#94A3B8" strokeWidth="1" />
        <text x="209" y="33" fontSize="8.5" fill="#0369A1" fontWeight="bold">Nez / bouche</text>
        <rect x="172" y="46" width="16" height="36" rx="7" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.4" />
        <text x="196" y="60" fontSize="8.5" fill="#0C4A6E" fontWeight="bold">Trachée</text>
        <text x="196" y="70" fontSize="7.5" fill="#0C4A6E">(cartilages en C)</text>
        <path d="M180 82 L130 104" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
        <path d="M180 82 L230 104" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
        <text x="112" y="92" textAnchor="end" fontSize="8" fill="#0C4A6E" fontWeight="bold">Bronches</text>
        <line x1="128" y1="100" x2="115" y2="94" stroke="#94A3B8" strokeWidth="1" />
        <path d="M96 104 Q64 142 92 180 Q120 160 118 104 Z" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" />
        <path d="M264 104 Q296 142 268 180 Q240 160 242 104 Z" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" />
        <text x="96" y="192" textAnchor="middle" fontSize="9" fill="#1E3A8A" fontWeight="bold">Poumon droit</text>
        <text x="264" y="192" textAnchor="middle" fontSize="9" fill="#1E3A8A" fontWeight="bold">Poumon gauche</text>
        <line x1="118" y1="132" x2="148" y2="132" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 2" />
        <line x1="242" y1="132" x2="212" y2="132" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="180" cy="140" r="30" fill="#F8FAFC" stroke="#0EA5E9" strokeWidth="1.8" />
        <text x="180" y="135" textAnchor="middle" fontSize="7.5" fill="#0369A1" fontWeight="bold">Alvéole</text>
        <text x="180" y="147" textAnchor="middle" fontSize="6.4" fill="#0369A1">300 M / poumon</text>
        <path d="M156 168 Q180 182 204 168" fill="none" stroke="#DC2626" strokeWidth="2.6" />
        <text x="180" y="208" textAnchor="middle" fontSize="8" fill="#991B1B" fontWeight="bold">Capillaire — hématose</text>
        <path d="M96 228 Q180 210 264 228" fill="none" stroke="#64748B" strokeWidth="3" />
        <text x="180" y="244" textAnchor="middle" fontSize="8" fill="#475569">Diaphragme (muscle inspirateur principal)</text>
        <text x="180" y="260" textAnchor="middle" fontSize="8" fill="#334155">O₂ inspiré → sang (Hb) · CO₂ sanguin → alvéole → expiration</text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'systeme_nerveux') {
    return (
      <DiagramFrame
        viewBox="0 0 360 258"
        ariaLabel="Schéma du système nerveux : cerveau, tronc cérébral, moelle épinière et nerfs périphériques"
        caption="Schéma hors ligne : système nerveux central (encéphale + moelle) et système nerveux périphérique."
      >
        <ellipse cx="180" cy="44" rx="52" ry="34" fill="#FCE7F3" stroke="#BE185D" strokeWidth="1.8" />
        <path d="M148 34 q14 -11 28 0 q14 -11 28 0 M144 50 q16 -11 32 0 q16 -11 32 0 M152 64 q14 -9 28 0 q14 -9 28 0" fill="none" stroke="#BE185D" strokeWidth="1.1" />
        <text x="180" y="92" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9D174D">Encéphale (cerveau)</text>
        <rect x="170" y="100" width="20" height="70" rx="9" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="1.6" />
        <text x="180" y="135" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#5B21B6" transform="rotate(-90 180 135)">Moelle épinière</text>
        {[110, 122, 134, 146, 158].map((y) => (
          <g key={y}>
            <line x1="170" y1={y} x2="132" y2={y + 6} stroke="#7C3AED" strokeWidth="1.3" />
            <line x1="190" y1={y} x2="228" y2={y + 6} stroke="#7C3AED" strokeWidth="1.3" />
            <circle cx="130" cy={y + 6} r="2.4" fill="#A78BFA" />
            <circle cx="230" cy={y + 6} r="2.4" fill="#A78BFA" />
          </g>
        ))}
        <text x="26" y="118" fontSize="8" fill="#5B21B6" fontWeight="bold">Nerfs rachidiens</text>
        <text x="26" y="130" fontSize="8" fill="#5B21B6">(SNP, 31 paires)</text>
        <rect x="20" y="186" width="150" height="44" rx="7" fill="#F0F9FF" stroke="#0369A1" strokeWidth="1.4" />
        <text x="95" y="204" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#075985">SNC</text>
        <text x="95" y="219" textAnchor="middle" fontSize="8" fill="#0C4A6E">Encéphale + moelle épinière</text>
        <rect x="190" y="186" width="150" height="44" rx="7" fill="#F0FDF4" stroke="#15803D" strokeWidth="1.4" />
        <text x="265" y="204" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#166534">SNP</text>
        <text x="265" y="219" textAnchor="middle" fontSize="8" fill="#14532D">Nerfs somatiques + autonomes</text>
        <text x="180" y="250" textAnchor="middle" fontSize="7.5" fill="#64748B">Influx nerveux : potentiel d’action de −70 mV à +30 mV</text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'squelette') {
    return (
      <DiagramFrame
        viewBox="0 0 360 284"
        ariaLabel="Schéma simplifié du squelette humain : crâne, colonne, cage thoracique, bassin, fémur et tibia"
        caption="Schéma hors ligne : repères osseux essentiels (206 os chez l’adulte, 270 à la naissance)."
      >
        <g stroke="#57534E" fill="#FAFAF9" strokeWidth="1.6">
          <ellipse cx="180" cy="30" rx="18" ry="20" />
          <path d="M164 42 Q180 58 196 42" fill="none" />
          <circle cx="173" cy="28" r="2" fill="#57534E" stroke="none" />
          <circle cx="187" cy="28" r="2" fill="#57534E" stroke="none" />
        </g>
        <line x1="180" y1="50" x2="180" y2="168" stroke="#57534E" strokeWidth="4" strokeLinecap="round" />
        {[56, 64, 72, 80, 128, 138, 148, 158].map((y) => (
          <line key={y} x1="174" y1={y} x2="186" y2={y} stroke="#78716C" strokeWidth="1.6" />
        ))}
        <path d="M150 74 Q180 66 210 74" fill="none" stroke="#57534E" strokeWidth="3" strokeLinecap="round" />
        <line x1="180" y1="76" x2="180" y2="122" stroke="#78716C" strokeWidth="2.4" />
        {[80, 90, 100, 110].map((y) => (
          <g key={`rib${y}`}>
            <path d={`M180 ${y} C 154 ${y + 1} 140 ${y + 8} 138 ${y + 20}`} fill="none" stroke="#57534E" strokeWidth="1.8" />
            <path d={`M180 ${y} C 206 ${y + 1} 220 ${y + 8} 222 ${y + 20}`} fill="none" stroke="#57534E" strokeWidth="1.8" />
          </g>
        ))}
        <path d="M156 168 Q150 188 164 198 Q172 190 180 198 Q188 190 196 198 Q210 188 204 168 Z" fill="#FAFAF9" stroke="#57534E" strokeWidth="1.6" />
        <line x1="168" y1="198" x2="164" y2="234" stroke="#57534E" strokeWidth="6" strokeLinecap="round" />
        <line x1="192" y1="198" x2="196" y2="234" stroke="#57534E" strokeWidth="6" strokeLinecap="round" />
        <line x1="164" y1="236" x2="160" y2="264" stroke="#78716C" strokeWidth="5" strokeLinecap="round" />
        <line x1="196" y1="236" x2="200" y2="264" stroke="#78716C" strokeWidth="5" strokeLinecap="round" />
        <line x1="160" y1="266" x2="150" y2="270" stroke="#78716C" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="266" x2="210" y2="270" stroke="#78716C" strokeWidth="4" strokeLinecap="round" />
        <line x1="150" y1="74" x2="132" y2="112" stroke="#57534E" strokeWidth="4" strokeLinecap="round" />
        <line x1="210" y1="74" x2="228" y2="112" stroke="#57534E" strokeWidth="4" strokeLinecap="round" />
        <line x1="132" y1="114" x2="124" y2="144" stroke="#78716C" strokeWidth="3.4" strokeLinecap="round" />
        <line x1="228" y1="114" x2="236" y2="144" stroke="#78716C" strokeWidth="3.4" strokeLinecap="round" />

        {[
          { label: 'Crâne', x: 204, y: 26, from: 198, to: 202, anchor: 'start' as const },
          { label: 'Clavicule', x: 218, y: 66, from: 206, to: 214, anchor: 'start' as const },
          { label: 'Cage thoracique', x: 246, y: 96, from: 214, to: 242, anchor: 'start' as const },
          { label: 'Colonne vertébrale', x: 108, y: 150, from: 114, to: 174, anchor: 'end' as const },
          { label: 'Bassin', x: 110, y: 184, from: 116, to: 152, anchor: 'end' as const },
          { label: 'Fémur', x: 240, y: 216, from: 200, to: 236, anchor: 'start' as const },
          { label: 'Tibia / péroné', x: 110, y: 252, from: 116, to: 158, anchor: 'end' as const },
        ].map((b) => (
          <g key={b.label}>
            <line x1={b.from} y1={b.y} x2={b.to} y2={b.y} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />
            <text x={b.x} y={b.y + 3} textAnchor={b.anchor} fontSize="8.5" fontWeight="bold" fill="#334155">
              {b.label}
            </text>
          </g>
        ))}
      </DiagramFrame>
    );
  }

  if (diagramId === 'cellule') {
    return (
      <DiagramFrame
        viewBox="0 0 360 250"
        ariaLabel="Schéma d'une cellule eucaryote : membrane, cytoplasme, noyau, mitochondries, réticulum et appareil de Golgi"
        caption="Schéma hors ligne : organites d’une cellule eucaryote animale et leurs fonctions."
      >
        <text x="180" y="20" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#115E59">
          Membrane plasmique (bicouche lipidique)
        </text>
        <line x1="180" y1="24" x2="180" y2="46" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2" />
        <ellipse cx="180" cy="138" rx="140" ry="90" fill="#F0FDFA" stroke="#0F766E" strokeWidth="2.2" />
        <ellipse cx="180" cy="138" rx="130" ry="81" fill="none" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="148" cy="118" r="32" fill="#E0E7FF" stroke="#4338CA" strokeWidth="1.8" />
        <circle cx="148" cy="118" r="10" fill="#A5B4FC" stroke="#4338CA" strokeWidth="1.2" />
        <text x="148" y="78" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#3730A3">Noyau (ADN)</text>
        <ellipse cx="252" cy="94" rx="19" ry="9.5" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5" transform="rotate(-18 252 94)" />
        <text x="278" y="84" fontSize="8" fill="#9A3412" fontWeight="bold">Mitochondrie</text>
        <text x="278" y="94" fontSize="7.5" fill="#9A3412">(ATP)</text>
        <path d="M210 142 q14 -12 28 0 q14 12 28 0" fill="none" stroke="#7C3AED" strokeWidth="2.4" />
        <text x="238" y="160" textAnchor="middle" fontSize="7.8" fill="#5B21B6" fontWeight="bold">Réticulum rugueux</text>
        <text x="238" y="170" textAnchor="middle" fontSize="7.2" fill="#5B21B6">(ribosomes)</text>
        <path d="M108 170 q16 12 32 0" fill="none" stroke="#B91C1C" strokeWidth="3" />
        <path d="M112 179 q16 12 32 0" fill="none" stroke="#B91C1C" strokeWidth="3" />
        <text x="124" y="200" textAnchor="middle" fontSize="7.8" fill="#991B1B" fontWeight="bold">Appareil de Golgi</text>
        <circle cx="252" cy="186" r="9" fill="#FDE68A" stroke="#B45309" strokeWidth="1.3" />
        <text x="266" y="189" fontSize="7.8" fill="#92400E" fontWeight="bold">Lysosome</text>
        <text x="72" y="150" textAnchor="middle" fontSize="8" fill="#0F766E" fontWeight="bold">Cytoplasme</text>
        <text x="180" y="244" textAnchor="middle" fontSize="7.2" fill="#64748B">
          Échelle indicative — la cellule mesure 10 à 100 µm.
        </text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'adn_helice') {
    const strand = (sign: number) =>
      Array.from({ length: 41 }, (_, i) => {
        const y = 24 + i * 4;
        const x = 180 + sign * 30 * Math.sin((2 * Math.PI * (y - 24)) / 152);
        return `${x.toFixed(1)},${y}`;
      }).join(' ');
    const pairs = Array.from({ length: 7 }, (_, i) => {
      const y = 30 + i * 22;
      const offset = 30 * Math.sin((2 * Math.PI * (y - 24)) / 152);
      return { y, x1: 180 + offset, x2: 180 - offset, label: ['A—T', 'G—C', 'T—A', 'C—G', 'A—T', 'G—C', 'T—A'][i] };
    });
    return (
      <DiagramFrame
        viewBox="0 0 360 200"
        ariaLabel="Schéma de la double hélice d'ADN avec les paires de bases adénine-thymine et guanine-cytosine"
        caption="Schéma hors ligne : double hélice d’ADN, appariement complémentaire A–T / G–C et brins antiparallèles."
      >
        <text x="150" y="14" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1E3A8A">
          Brin 5′ → 3′
        </text>
        <text x="212" y="14" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#065F46">
          Brin 3′ → 5′
        </text>
        <polyline points={strand(1)} fill="none" stroke="#1D4ED8" strokeWidth="3.6" strokeLinejoin="round" />
        <polyline points={strand(-1)} fill="none" stroke="#059669" strokeWidth="3.6" strokeLinejoin="round" />
        {pairs.map((pr) => (
          <g key={pr.y}>
            <line x1={pr.x1} y1={pr.y} x2={pr.x2} y2={pr.y} stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
            <text x="232" y={pr.y + 3} fontSize="8" fontWeight="bold" fill="#334155">{pr.label}</text>
          </g>
        ))}
        <text x="232" y="176" fontSize="7" fill="#475569">A=T : 2 liaisons hydrogène</text>
        <text x="232" y="187" fontSize="7" fill="#475569">G≡C : 3 liaisons hydrogène</text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'chandeliers_japonais') {
    const candles = [
      { x: 72, open: 118, close: 74, high: 58, low: 130, bull: true },
      { x: 122, open: 74, close: 96, high: 64, low: 108, bull: false },
      { x: 172, open: 96, close: 62, high: 50, low: 104, bull: true },
      { x: 222, open: 62, close: 84, high: 52, low: 94, bull: false },
      { x: 272, open: 84, close: 46, high: 34, low: 92, bull: true },
    ];
    return (
      <DiagramFrame
        viewBox="0 0 360 226"
        ariaLabel="Schéma des chandeliers japonais : corps, mèche haute et basse, chandelier haussier vert et baissier rouge"
        caption="Schéma hors ligne : anatomie d’un chandelier japonais (corps = ouverture → clôture, mèches = plus haut / plus bas)."
      >
        <line x1="30" y1="158" x2="336" y2="158" stroke="#94A3B8" strokeWidth="1.4" />
        <line x1="30" y1="24" x2="30" y2="158" stroke="#94A3B8" strokeWidth="1.4" />
        <text x="34" y="20" fontSize="8" fill="#475569" fontWeight="bold">Prix</text>
        <text x="312" y="172" fontSize="8" fill="#475569">Temps</text>
        {candles.map((c) => {
          const color = c.bull ? '#059669' : '#DC2626';
          const top = Math.min(c.open, c.close);
          const height = Math.abs(c.close - c.open);
          return (
            <g key={c.x}>
              <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={color} strokeWidth="2" />
              <rect x={c.x - 10} y={top} width="20" height={Math.max(6, height)} rx="2" fill={color} opacity="0.88" />
            </g>
          );
        })}
        <text x="84" y="56" fontSize="7.5" fill="#475569">Plus haut</text>
        <line x1="82" y1="58" x2="74" y2="60" stroke="#94A3B8" strokeWidth="0.8" />
        <text x="84" y="140" fontSize="7.5" fill="#475569">Plus bas</text>
        <line x1="82" y1="136" x2="74" y2="130" stroke="#94A3B8" strokeWidth="0.8" />
        <rect x="30" y="180" width="306" height="40" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        <rect x="42" y="188" width="12" height="10" rx="2" fill="#059669" />
        <text x="60" y="197" fontSize="8" fill="#065F46" fontWeight="bold">Haussier : clôture &gt; ouverture</text>
        <rect x="42" y="203" width="12" height="10" rx="2" fill="#DC2626" />
        <text x="60" y="212" fontSize="8" fill="#991B1B" fontWeight="bold">Baissier : clôture &lt; ouverture</text>
        <text x="206" y="197" fontSize="7.5" fill="#334155">Corps = Ouverture → Clôture</text>
        <text x="206" y="211" fontSize="7.5" fill="#334155">Mèches = rejet / volatilité</text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'support_resistance') {
    return (
      <DiagramFrame
        viewBox="0 0 360 226"
        ariaLabel="Graphique de support et résistance avec rebonds du prix et cassure haussière"
        caption="Schéma hors ligne : zones de support/résistance, rebonds et cassure (breakout) suivie d’un retest."
      >
        <rect x="32" y="46" width="300" height="20" fill="#FEE2E2" stroke="#F87171" strokeWidth="1" strokeDasharray="4 3" />
        <rect x="32" y="152" width="300" height="20" fill="#DCFCE7" stroke="#4ADE80" strokeWidth="1" strokeDasharray="4 3" />
        <text x="34" y="38" fontSize="8.5" fontWeight="bold" fill="#991B1B">RÉSISTANCE (offre / vendeurs)</text>
        <text x="34" y="192" fontSize="8.5" fontWeight="bold" fill="#166534">SUPPORT (demande / acheteurs)</text>
        <polyline
          points="44,160 78,58 112,156 146,54 180,158 214,56 240,44 268,60 300,30"
          fill="none"
          stroke="#1D4ED8"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <circle cx="214" cy="56" r="4" fill="#D97706" />
        <text x="222" y="36" fontSize="7.5" fill="#92400E" fontWeight="bold">Cassure</text>
        <line x1="220" y1="40" x2="216" y2="52" stroke="#D97706" strokeWidth="0.9" />
        <circle cx="268" cy="60" r="4" fill="#7C3AED" />
        <text x="286" y="82" fontSize="7.5" fill="#5B21B6" fontWeight="bold">Retest</text>
        <line x1="272" y1="66" x2="282" y2="78" stroke="#7C3AED" strokeWidth="0.9" />
        <text x="180" y="212" textAnchor="middle" fontSize="7.5" fill="#475569">
          Zone de range = prix coincé entre support et résistance.
        </text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'gestion_risque_trading') {
    return (
      <DiagramFrame
        viewBox="0 0 360 244"
        ariaLabel="Schéma de gestion du risque en trading : entrée, stop-loss, objectif et ratio risque-récompense"
        caption="Schéma hors ligne : dimensionnement de position et ratio Risque/Récompense (1R risqué pour 2R visé)."
      >
        <line x1="34" y1="34" x2="34" y2="150" stroke="#94A3B8" strokeWidth="1.4" />
        <line x1="34" y1="150" x2="200" y2="150" stroke="#94A3B8" strokeWidth="1.4" />
        <text x="34" y="30" fontSize="8" fill="#475569" fontWeight="bold">Prix</text>
        <polyline
          points="44,142 72,130 98,134 124,120 150,112 176,94 196,78"
          fill="none"
          stroke="#1D4ED8"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <line x1="44" y1="112" x2="200" y2="112" stroke="#0F766E" strokeWidth="1.6" strokeDasharray="5 3" />
        <line x1="44" y1="136" x2="200" y2="136" stroke="#DC2626" strokeWidth="1.6" strokeDasharray="5 3" />
        <line x1="44" y1="64" x2="200" y2="64" stroke="#059669" strokeWidth="1.6" strokeDasharray="5 3" />
        <rect x="52" y="112" width="10" height="24" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1" />
        <rect x="52" y="64" width="10" height="48" fill="#86EFAC" stroke="#059669" strokeWidth="1" />
        <text x="204" y="68" fontSize="8" fontWeight="bold" fill="#047857">Objectif (2R)</text>
        <text x="204" y="116" fontSize="8" fontWeight="bold" fill="#0F766E">Entrée</text>
        <text x="204" y="140" fontSize="8" fontWeight="bold" fill="#B91C1C">Stop-loss (1R)</text>
        <text x="40" y="172" fontSize="8" fill="#334155" fontWeight="bold">Formule de la taille de position :</text>
        <rect x="40" y="176" width="282" height="38" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="52" y="192" fontSize="8.4" fill="#0F172A" fontWeight="bold">
          Taille = (Capital × % de risque) ÷ |Entrée − Stop-loss|
        </text>
        <text x="52" y="206" fontSize="7.4" fill="#475569">
          Ex. 1 000 000 F · risque 1 % · stop 200 F ⇒ 50 lots (10 000 F risqués).
        </text>
        <text x="180" y="232" textAnchor="middle" fontSize="7.5" fill="#64748B">
          Avec un R:R de 1:2, 40 % de trades gagnants suffisent à être rentable.
        </text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'coupe_sol') {
    const horizons = [
      { h: 34, label: 'O — Litière', detail: 'Matière organique en décomposition', fill: '#EFEBE9', stroke: '#8D6E63', text: '#4E342E' },
      { h: 44, label: 'A — Horizon humifère', detail: 'Racines fines, humus, vie microbienne', fill: '#5D4037', stroke: '#3E2723', text: '#FFFFFF' },
      { h: 44, label: 'B — Horizon minéral', detail: 'Argiles, oxydes de fer, lessivage', fill: '#A1887F', stroke: '#6D4C41', text: '#FFFFFF' },
      { h: 44, label: 'C — Roche altérée', detail: 'Fragments de la roche mère', fill: '#D7CCC8', stroke: '#8D6E63', text: '#4E342E' },
      { h: 34, label: 'R — Roche mère', detail: 'Substratum non altéré', fill: '#9E9E9E', stroke: '#616161', text: '#FFFFFF' },
    ];
    let cursor = 16;
    const placed = horizons.map((hz) => {
      const item = { ...hz, y: cursor };
      cursor += hz.h;
      return item;
    });
    return (
      <DiagramFrame
        viewBox="0 0 360 250"
        ariaLabel="Coupe de sol : horizons O, A, B, C et R avec racines et infiltration de l'eau"
        caption="Schéma hors ligne : coupe pédologique (horizons O-A-B-C-R), racines et circulation de l’eau."
      >
        {placed.map((hz) => (
          <g key={hz.label}>
            <rect x="20" y={hz.y} width="240" height={hz.h} fill={hz.fill} stroke={hz.stroke} strokeWidth="1.3" />
            <text x="32" y={hz.y + 15} fontSize="9" fontWeight="bold" fill={hz.text}>
              {hz.label}
            </text>
            <text x="32" y={hz.y + 28} fontSize="7.5" fill={hz.text}>
              {hz.detail}
            </text>
          </g>
        ))}
        <path d="M238 24 L238 176" fill="none" stroke="#15803D" strokeWidth="2.2" />
        <path d="M238 60 q-14 -10 -20 -26 M238 88 q16 -12 22 -30 M238 118 q-16 -14 -24 -32 M238 148 q16 -12 24 -30" fill="none" stroke="#15803D" strokeWidth="1.6" />
        <text x="224" y="210" textAnchor="end" fontSize="7.5" fill="#166534" fontWeight="bold">Racines</text>
        <line x1="272" y1="24" x2="272" y2="216" stroke="#0284C7" strokeWidth="3" strokeDasharray="5 4" />
        <text x="280" y="60" fontSize="7.5" fill="#0369A1">Infiltration</text>
        <text x="280" y="71" fontSize="7.5" fill="#0369A1">(porosité)</text>
        <text x="280" y="170" fontSize="7.5" fill="#0369A1">Nappe</text>
        <text x="280" y="181" fontSize="7.5" fill="#0369A1">phréatique</text>
        <text x="180" y="240" textAnchor="middle" fontSize="7.5" fill="#64748B">
          Un sol sain = structure, matière organique, eau et biodiversité.
        </text>
      </DiagramFrame>
    );
  }

  if (diagramId === 'circuit_electrique_serie') {
    return (
      <DiagramFrame
        viewBox="0 0 360 206"
        ariaLabel="Circuit électrique en série avec générateur, résistor et lampe, loi d'Ohm U = R × I"
        caption="Schéma hors ligne : circuit série (générateur, résistor, lampe) et loi d’Ohm U = R × I."
      >
        <path d="M40 60 L118 60 M142 60 L210 60 M250 60 L320 60" fill="none" stroke="#0F172A" strokeWidth="2" />
        <path d="M320 60 L320 140 L40 140 L40 60" fill="none" stroke="#0F172A" strokeWidth="2" />
        <line x1="128" y1="46" x2="128" y2="74" stroke="#0F172A" strokeWidth="3" />
        <line x1="137" y1="50" x2="137" y2="70" stroke="#0F172A" strokeWidth="3" />
        <text x="132" y="38" textAnchor="middle" fontSize="8.5" fill="#334155" fontWeight="bold">Générateur E</text>
        <rect x="210" y="48" width="40" height="24" rx="2" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.6" />
        <text x="230" y="40" textAnchor="middle" fontSize="8" fill="#92400E" fontWeight="bold">R (résistor)</text>
        <circle cx="320" cy="100" r="16" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.8" />
        <line x1="312" y1="92" x2="328" y2="108" stroke="#CA8A04" strokeWidth="1.5" />
        <line x1="328" y1="92" x2="312" y2="108" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="298" y="104" textAnchor="end" fontSize="8" fill="#854D0E" fontWeight="bold">Lampe</text>
        <line x1="110" y1="140" x2="150" y2="140" stroke="#DC2626" strokeWidth="2" />
        <polygon points="150,135 160,140 150,145" fill="#DC2626" />
        <text x="166" y="136" fontSize="8" fill="#991B1B" fontWeight="bold">I (intensité)</text>

        <rect x="36" y="164" width="290" height="36" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="48" y="178" fontSize="8.4" fill="#0F172A" fontWeight="bold">Loi d’Ohm : U = R × I</text>
        <text x="48" y="192" fontSize="7.4" fill="#475569">
          Série : I identique, U = U₁ + U₂ · Dérivation : U commune.
        </text>
      </DiagramFrame>
    );
  }

  return (
    <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <svg viewBox="0 0 360 130" className="mx-auto h-32 w-full max-w-md" role="img" aria-label="Boucle itérative Scrum Sprint">
        <rect x="20" y="38" width="90" height="50" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
        <text x="65" y="60" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1E3A8A">Product</text>
        <text x="65" y="75" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1E3A8A">Backlog</text>
        <line x1="110" y1="63" x2="148" y2="63" stroke="#64748B" strokeWidth="2" />
        <circle cx="195" cy="63" r="42" fill="#ECFDF5" stroke="#059669" strokeWidth="3" />
        <text x="195" y="59" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#065F46">SPRINT</text>
        <text x="195" y="75" textAnchor="middle" fontSize="9.5" fill="#047857">1 à 4 sem.</text>
        <line x1="238" y1="63" x2="268" y2="63" stroke="#64748B" strokeWidth="2" />
        <rect x="268" y="38" width="76" height="50" rx="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
        <text x="306" y="60" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400E">Incrément</text>
        <text x="306" y="75" textAnchor="middle" fontSize="10" fill="#92400E">livrable</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        Schéma hors ligne : cycle itératif Scrum (Backlog → Sprint → Incrément).
      </figcaption>
    </figure>
  );
};
