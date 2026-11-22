import React from 'react';
import { CourseSection } from '../types';

export const PedagogicalDiagram: React.FC<{
  diagramId: NonNullable<CourseSection['diagramId']>;
}> = ({ diagramId }) => {
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
