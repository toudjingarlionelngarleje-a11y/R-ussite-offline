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
