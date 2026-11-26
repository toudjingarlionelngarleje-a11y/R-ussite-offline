import { CourseSection, Subject } from '../types';

/**
 * v17.4 — Bibliothèque de schémas illustrés par matière.
 *
 * Objectif : toute matière qui a besoin d'une représentation visuelle (anatomie,
 * biologie, trading, géologie, électricité, droit, économie…) affiche
 * automatiquement des graphiques pédagogiques SVG 100 % hors ligne, sans image
 * distante ni CDN.
 */

export type DiagramId = NonNullable<CourseSection['diagramId']>;

export interface DiagramMeta {
  id: DiagramId;
  title: string;
  summary: string;
}

/** Titres & résumés utilisés par la galerie de schémas du lecteur de cours. */
export const DIAGRAM_META: Partial<Record<DiagramId, { title: string; summary: string }>> = {
  corps_humain: {
    title: 'Corps humain — organes internes',
    summary: 'Silhouette légendée : cerveau, poumons, cœur, foie, estomac, reins, intestins.',
  },
  squelette: {
    title: 'Squelette & repères osseux',
    summary: 'Crâne, colonne, cage thoracique, bassin et os longs (206 os chez l’adulte).',
  },
  appareil_digestif: {
    title: 'Appareil digestif',
    summary: 'Bouche → œsophage → estomac → duodénum → intestin grêle → côlon.',
  },
  appareil_respiratoire: {
    title: 'Appareil respiratoire & hématose',
    summary: 'Ventilation, alvéoles et échanges gazeux O₂ / CO₂.',
  },
  systeme_nerveux: {
    title: 'Système nerveux',
    summary: 'SNC (encéphale + moelle) et SNP (nerfs somatiques et autonomes).',
  },
  cellule: {
    title: 'Cellule eucaryote',
    summary: 'Membrane, noyau, mitochondries, réticulum, Golgi et lysosomes.',
  },
  adn_helice: {
    title: 'Double hélice d’ADN',
    summary: 'Appariement complémentaire A–T / G–C et brins antiparallèles.',
  },
  cycle_cardiaque: {
    title: 'Cycle cardiaque',
    summary: 'Systole / diastole, débit cardiaque et pression artérielle.',
  },
  pharmacocinetique: {
    title: 'Pharmacocinétique ADME',
    summary: 'Absorption, distribution, métabolisme, élimination et demi-vie.',
  },
  score_apgar: {
    title: 'Score d’Apgar',
    summary: 'Évaluation du nouveau-né à 1, 5 et 10 minutes de vie.',
  },
  chandeliers_japonais: {
    title: 'Chandeliers japonais',
    summary: 'Corps, mèches, chandelier haussier / baissier et lecture du prix.',
  },
  support_resistance: {
    title: 'Support, résistance & cassure',
    summary: 'Zones de liquidité, rebonds, breakout et retest.',
  },
  gestion_risque_trading: {
    title: 'Gestion du risque & ratio R:R',
    summary: 'Taille de position, stop-loss et objectif à 1:2.',
  },
  coupe_sol: {
    title: 'Coupe de sol (pédologie)',
    summary: 'Horizons O-A-B-C-R, racines et infiltration de l’eau.',
  },
  circuit_electrique_serie: {
    title: 'Circuit électrique en série',
    summary: 'Générateur, résistor, lampe et loi d’Ohm U = R × I.',
  },
  circuit_rc: {
    title: 'Charge d’un condensateur RC',
    summary: 'Constante de temps τ = RC et régime transitoire.',
  },
  reaction_chimique: {
    title: 'Réaction chimique & bilan',
    summary: 'Réactifs, produits, conservation de la matière et énergie.',
  },
  fonctions_chimie: {
    title: 'Groupes fonctionnels',
    summary: 'Alcool, aldéhyde, acide carboxylique, ester et amine.',
  },
  cycle_azote: {
    title: 'Cycle de l’azote',
    summary: 'Fixation, nitrification, dénitrification et rôle agronomique.',
  },
  pyramide_alimentaire: {
    title: 'Pyramide alimentaire',
    summary: 'Équilibre nutritionnel et repères de portions.',
  },
  couches_geologiques: {
    title: 'Couches géologiques',
    summary: 'Stratigraphie, plissement et lecture d’une coupe.',
  },
  couches_sig: {
    title: 'Couches SIG',
    summary: 'Raster, vecteur, attributs et analyse spatiale.',
  },
  poutre_flexion: {
    title: 'Flexion d’une poutre (RDM)',
    summary: 'Moment fléchissant, contrainte et flèche.',
  },
  separation_pouvoirs: {
    title: 'Séparation des pouvoirs',
    summary: 'Législatif, exécutif, judiciaire et hiérarchie constitutionnelle.',
  },
  pyramide_normes: {
    title: 'Pyramide des normes',
    summary: 'Constitution, traités, lois, règlements et actes individuels.',
  },
  offre_demande: {
    title: 'Offre, demande & équilibre',
    summary: 'Prix d’équilibre, déplacements de courbes et élasticité.',
  },
  bilan_syscohada: {
    title: 'Bilan SYSCOHADA',
    summary: 'Actif, passif, équilibre financier et grandeurs de gestion.',
  },
  flux_fintech: {
    title: 'Flux FinTech / mobile money',
    summary: 'Émetteur, agrégateur, wallet et règlement interbancaire.',
  },
  sql_relations: {
    title: 'Relations SQL',
    summary: 'Clés primaires/étrangères, 1-N et N-N.',
  },
  architecture_ia: {
    title: 'Architecture d’un modèle d’IA',
    summary: 'Données → entraînement → évaluation → inférence.',
  },
  modele_osi: {
    title: 'Modèle OSI (7 couches)',
    summary: 'Encapsulation de la couche physique à l’application.',
  },
  mitose: {
    title: 'Mitose (PMAT)',
    summary: 'Prophase, métaphase, anaphase, télophase.',
  },
  pyramide_maslow: {
    title: 'Pyramide de Maslow',
    summary: 'Besoins physiologiques → actualisation de soi.',
  },
  cycle_projet: {
    title: 'Cycle de projet',
    summary: 'Initiation, planification, exécution, contrôle, clôture.',
  },
  photovoltaique: {
    title: 'Effet photovoltaïque',
    summary: 'Cellule PV, courant continu, onduleur et rendement.',
  },
  loi_normale: {
    title: 'Loi normale',
    summary: 'Courbe en cloche, écart-type et intervalles de confiance.',
  },
  incoterms_chaine: {
    title: 'Chaîne logistique & Incoterms',
    summary: 'Transfert de risque, transport et douane.',
  },
  forces_vol: {
    title: 'Forces du vol',
    summary: 'Portance, poids, traction et traînée.',
  },
  cycle_crise: {
    title: 'Cycle de crise',
    summary: 'Alerte, mobilisation, réponse, relèvement.',
  },
};

/**
 * Galeries par matière (identifiants du catalogue). Ordre = priorité pédagogique :
 * le premier schéma est celui affiché en tête de chapitre.
 */
const SUBJECT_GALLERIES: Record<string, DiagramId[]> = {
  // Santé, anatomie & biologie
  anatomie_physio: ['corps_humain', 'squelette', 'appareil_digestif', 'appareil_respiratoire', 'systeme_nerveux', 'cycle_cardiaque'],
  medecine_clinique: ['corps_humain', 'cycle_cardiaque', 'appareil_respiratoire', 'score_apgar'],
  soins_infirmiers: ['cycle_cardiaque', 'corps_humain', 'score_apgar', 'pharmacocinetique'],
  chirurgie_traumatologie: ['squelette', 'corps_humain', 'systeme_nerveux'],
  odontologie_stomato: ['appareil_digestif', 'squelette'],
  obstetrique_pediatrie: ['corps_humain', 'score_apgar', 'cycle_cardiaque'],
  sante_mentale_psychiatrie: ['systeme_nerveux', 'pyramide_maslow'],
  pharmacologie: ['pharmacocinetique', 'corps_humain'],
  microbiologie_biomed: ['cellule', 'adn_helice'],
  genetique_biotech: ['adn_helice', 'cellule', 'mitose'],
  svt: ['cellule', 'mitose', 'adn_helice', 'cycle_azote', 'pyramide_alimentaire'],
  chimie_bio: ['reaction_chimique', 'fonctions_chimie', 'adn_helice'],
  chimie_organique: ['fonctions_chimie', 'reaction_chimique'],
  nutrition_sante: ['pyramide_alimentaire', 'appareil_digestif'],
  sante_publique: ['score_apgar', 'pyramide_alimentaire', 'couches_sig'],
  eps_sciences_sport: ['squelette', 'corps_humain', 'cycle_cardiaque'],

  // Sciences exactes & ingénierie
  maths: ['parabole', 'loi_normale'],
  statistiques: ['loi_normale', 'parabole'],
  physique: ['circuit_electrique_serie', 'circuit_rc', 'loi_normale'],
  electronique_electrotech: ['circuit_electrique_serie', 'circuit_rc', 'photovoltaique'],
  energies_renouv: ['photovoltaique', 'circuit_electrique_serie'],
  genie_mecanique: ['poutre_flexion', 'circuit_electrique_serie'],
  thermodynamique_froid: ['poutre_flexion', 'photovoltaique'],
  genie_civil_btp: ['poutre_flexion', 'couches_geologiques'],
  architecture_design: ['poutre_flexion', 'couches_sig'],
  genie_chimique_procedes: ['reaction_chimique', 'fonctions_chimie'],
  science_materiaux: ['couches_geologiques', 'poutre_flexion'],
  automatique_controle: ['architecture_ia', 'circuit_electrique_serie'],

  // Numérique
  informatique: ['sql_relations', 'architecture_ia', 'modele_osi'],
  data_ia: ['architecture_ia', 'sql_relations', 'loi_normale'],
  genie_logiciel_devops: ['architecture_ia', 'modele_osi'],
  bases_donnees_bigdata: ['sql_relations', 'architecture_ia'],
  developpement_mobile_web: ['architecture_ia', 'modele_osi'],
  design_ux_infographie: ['pyramide_maslow', 'architecture_ia'],
  iot_systemes_embarques: ['circuit_electrique_serie', 'modele_osi'],
  reseaux_telecoms: ['modele_osi', 'flux_fintech'],
  cybersecurite: ['modele_osi', 'architecture_ia'],
  fintech_microfinance: ['flux_fintech', 'sql_relations'],

  // Droit, institutions, économie & gestion
  droit: ['separation_pouvoirs', 'pyramide_normes'],
  droit_ohada: ['pyramide_normes', 'bilan_syscohada'],
  droit_penal_proc: ['separation_pouvoirs', 'pyramide_normes'],
  criminologie_securite: ['cycle_crise', 'separation_pouvoirs'],
  droit_international_public: ['pyramide_normes', 'separation_pouvoirs'],
  droit_fiscal_douanes: ['pyramide_normes', 'bilan_syscohada'],
  droit_foncier_environnement: ['pyramide_normes', 'couches_sig'],
  droit_assurances_cima: ['pyramide_normes', 'bilan_syscohada'],
  droit_numerique: ['pyramide_normes', 'modele_osi'],
  finances_publiques: ['bilan_syscohada', 'pyramide_normes'],
  sciences_politiques: ['separation_pouvoirs', 'pyramide_normes'],
  relations_inter: ['separation_pouvoirs', 'couches_sig'],
  ethique_gouvernance: ['pyramide_normes', 'separation_pouvoirs'],
  educ_civique: ['separation_pouvoirs', 'pyramide_normes'],
  economie: ['offre_demande', 'bilan_syscohada'],
  comptabilite: ['bilan_syscohada', 'offre_demande'],
  finance_marches_banque: ['offre_demande', 'flux_fintech', 'bilan_syscohada'],
  trading_marches: ['chandeliers_japonais', 'support_resistance', 'gestion_risque_trading', 'offre_demande'],
  audit_controle_interne: ['bilan_syscohada', 'pyramide_normes'],
  econometrie_prevision: ['loi_normale', 'offre_demande'],
  economie_developpement: ['offre_demande', 'couches_sig'],
  marketing_entrep: ['pyramide_maslow', 'offre_demande'],
  negociation_commerce_b2b: ['pyramide_maslow', 'flux_fintech'],
  gestion_projet: ['cycle_projet', 'pyramide_maslow'],
  grh_travail: ['pyramide_maslow', 'separation_pouvoirs'],
  qualite_hse_iso: ['cycle_projet', 'pyramide_normes'],
  gestion_crises: ['cycle_crise', 'couches_sig'],
  logistique_ci: ['incoterms_chaine', 'flux_fintech'],
  commerce_maritime: ['incoterms_chaine', 'flux_fintech'],

  // Terre, climat & agronomie
  agronomie_env: ['coupe_sol', 'cycle_azote', 'pyramide_alimentaire'],
  agroalimentaire_transformation: ['coupe_sol', 'pyramide_alimentaire'],
  foresterie_biodiversite: ['coupe_sol', 'cycle_azote'],
  hydrologie_eau_climat: ['coupe_sol', 'couches_sig'],
  geologie_mines: ['couches_geologiques', 'coupe_sol'],
  peche_aquaculture: ['coupe_sol', 'cycle_azote'],
  veterinaire_elevage: ['corps_humain', 'cycle_azote'],
  geographie_amenagement: ['couches_sig', 'couches_geologiques'],
  urbanisme_sig: ['couches_sig', 'couches_geologiques'],
  tourisme_hotel: ['couches_sig', 'pyramide_maslow'],

  // Lettres, langues & sciences humaines
  philosophie: ['pyramide_maslow'],
  psychologie_cog: ['pyramide_maslow', 'systeme_nerveux'],
  pedagogie: ['pyramide_maslow', 'cycle_projet'],
  sociologie_anthropo: ['pyramide_maslow', 'couches_sig'],
  histoire_geo: ['couches_sig', 'couches_geologiques'],
  archeologie_histoire_afrique: ['couches_geologiques', 'couches_sig'],
  culture_gen: ['separation_pouvoirs', 'pyramide_normes'],
  journalisme_comm: ['pyramide_maslow', 'modele_osi'],
  methodo_redaction: ['pyramide_normes', 'cycle_projet'],
  arts_musique_patrimoine: ['couches_sig', 'pyramide_maslow'],
  aeronautique_meteo: ['forces_vol', 'couches_sig'],
};

/** Secours par mots-clés lorsque la matière n'a pas de galerie explicite. */
const KEYWORD_GALLERIES: { test: RegExp; diagrams: DiagramId[] }[] = [
  { test: /(anatom|physio|medec|infirm|chirurg|sante|veterin|corps)/, diagrams: ['corps_humain', 'squelette'] },
  { test: /(bio|gene|cellul|microb|immun)/, diagrams: ['cellule', 'adn_helice', 'mitose'] },
  { test: /(trading|bourse|marche|finance|investis)/, diagrams: ['chandeliers_japonais', 'support_resistance', 'gestion_risque_trading'] },
  { test: /(sol|agro|agri|pedol|forest|elev)/, diagrams: ['coupe_sol', 'cycle_azote'] },
  { test: /(geol|mine|petrol|hydrol|eau|climat)/, diagrams: ['couches_geologiques', 'coupe_sol'] },
  { test: /(info|algo|data|logiciel|reseau|cyber|num)/, diagrams: ['sql_relations', 'modele_osi', 'architecture_ia'] },
  { test: /(droit|jurid|constit|admin|polit|institution)/, diagrams: ['separation_pouvoirs', 'pyramide_normes'] },
  { test: /(econ|compta|gestion|banq|audit|market)/, diagrams: ['offre_demande', 'bilan_syscohada'] },
  { test: /(physiq|electr|energ|mecan|ingeni|automat)/, diagrams: ['circuit_electrique_serie', 'poutre_flexion'] },
  { test: /(chim|materiau|procede)/, diagrams: ['reaction_chimique', 'fonctions_chimie'] },
  { test: /(psycho|pedago|socio|philo|rh|ressources)/, diagrams: ['pyramide_maslow'] },
  { test: /(geo|urban|sig|touris|transport|logist)/, diagrams: ['couches_sig', 'incoterms_chaine'] },
];

const FALLBACK_GALLERY: DiagramId[] = [];

/** Renvoie la galerie illustrée (dédoublonnée) d'une matière, ou [] si aucun schéma n'est pertinent. */
export function getSubjectDiagramGallery(subject?: Subject): DiagramId[] {
  if (!subject) return FALLBACK_GALLERY;
  const explicit = SUBJECT_GALLERIES[subject.id];
  if (explicit && explicit.length > 0) return explicit;
  const key = `${subject.id} ${subject.name ?? ''}`.toLowerCase();
  for (const entry of KEYWORD_GALLERIES) {
    if (entry.test.test(key)) return entry.diagrams;
  }
  return FALLBACK_GALLERY;
}

/** Choisit un schéma déterminant (stable et varié) pour un chapitre donné. */
export function getChapterDiagram(subject: Subject | undefined, chapterOrder: number): DiagramId | undefined {
  const gallery = getSubjectDiagramGallery(subject);
  if (gallery.length === 0) return undefined;
  const idx = (Math.max(1, chapterOrder) - 1) % gallery.length;
  return gallery[idx];
}

export function getDiagramMeta(id: DiagramId): DiagramMeta {
  const meta = DIAGRAM_META[id];
  if (meta) return { id, ...meta };
  const pretty = id.replace(/_/g, ' ');
  return {
    id,
    title: pretty.charAt(0).toUpperCase() + pretty.slice(1),
    summary: 'Schéma pédagogique hors ligne.',
  };
}
