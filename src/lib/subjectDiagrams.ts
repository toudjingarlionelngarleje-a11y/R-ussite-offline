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

  // v25.0 — Nouvelles illustrations pédagogiques
  budget_repartition: {
    title: 'Budget mensuel — répartition illustrée',
    summary: 'Revenus, charges fixes et variables, part d’épargne et réserve de précaution.',
  },
  business_model_canvas: {
    title: 'Business model canvas',
    summary: 'Neuf blocs : partenaires, activités, offre, clients, revenus et coûts.',
  },
  scene_forensique: {
    title: 'Scène de crime et prélèvements',
    summary: 'Périmètre balisé, traces numérotées, chaîne de custody.',
  },
  transmission_orale: {
    title: 'Transmission orale du conte',
    summary: 'Du griot au public : récit, rythme, variantes et mémoire collective.',
  },
  reseau_neurones: {
    title: 'Réseau de neurones',
    summary: 'Entrées → couches cachées → sortie, poids ajustés par apprentissage.',
  },
  roue_autonomie: {
    title: 'Roue de l’autonomie',
    summary: 'Six domaines du quotidien : se déplacer, se nourrir, se laver, s’orienter, se soigner, vie sociale.',
  },
  pyramide_ages: {
    title: 'Pyramide des âges',
    summary: 'Structure par sexe et par âge, lecture des creux et des générations.',
  },
  financement_sante: {
    title: 'Financement du système de santé',
    summary: 'Ménages, employeurs et État → mutualisation → offre de soins.',
  },
  couches_peau: {
    title: 'Coupe de la peau',
    summary: 'Épiderme, derme et hypoderme : cible de chaque actif cosmétique.',
  },
  perimetres_surete: {
    title: 'Périmètres de sûreté',
    summary: 'Voie publique, enceinte, zone sensible : contrôles proportionnés.',
  },
  chaine_deplacement: {
    title: 'Chaîne de déplacement',
    summary: 'Origine, modes, correspondances et destination en temps porte à porte.',
  },
  quadrant_langagier: {
    title: 'Quadrant des compétences langagières',
    summary: 'Oral/écrit et réception/production : les quatre compétences du CECRL.',
  },
  cycle_traduction: {
    title: 'Cycle de traduction',
    summary: 'Analyse, terminologie, traduction, révision, livraison.',
  },
  plan_classification: {
    title: 'Plan de classification et rayonnage',
    summary: 'Indices de sujet, cotes et ordre des ouvrages sur les rayons.',
  },

  // v26.0 — Nouvelles illustrations pédagogiques
  acte_authentique: {
    title: 'Acte authentique et chaîne de validation',
    summary: 'Parties, notaire et publicité foncière : de l’accord privé à l’acte opposable.',
  },
  reeducation_mouvement: {
    title: 'Progression d’une rééducation fonctionnelle',
    summary: 'Bilan mesuré, objectif, progression de charge et critères de reprise.',
  },
  marche_immobilier: {
    title: 'Cycle d’une transaction immobilière',
    summary: 'Estimation, mandat, dossier, financement et acte authentique.',
  },
  chaine_blocs: {
    title: 'Chaîne de blocs et consensus',
    summary: 'Blocs chaînés par hachage, validation par la majorité des nœuds.',
  },
  appareil_phonatoire: {
    title: 'Appareil phonatoire',
    summary: 'Souffle pulmonaire, vibration laryngée et résonance bucco-nasale.',
  },
  plan_paysager: {
    title: 'Plan paysager et zonage',
    summary: 'Usages, cheminements, massifs et palette végétale d’un jardin.',
  },
  assemblage_bois: {
    title: 'Assemblages bois',
    summary: 'Tenon-mortaise et queue d’aronde : la géométrie répond à l’effort.',
  },
  boucle_gameplay: {
    title: 'Boucle de gameplay',
    summary: 'Action, récompense, progression, playtest et itération.',
  },

  // v27.0 — Nouvelles illustrations pédagogiques
  coupe_cheveu: {
    title: 'Structure du cheveu et sections',
    summary: 'Cuticule, cortex et médulla ; coupe construite par sections tracées.',
  },
  reseau_plomberie: {
    title: 'Réseau de plomberie',
    summary: 'Alimentation eau froide/chaude, réducteur de pression et évacuation en pente.',
  },
  diagnostic_auto: {
    title: 'Démarche de diagnostic automobile',
    summary: 'Symptôme, mesure, données OBD et contrôle après réparation.',
  },
  soudure_assemblage: {
    title: 'Assemblage soudé',
    summary: 'Chanfrein, cordon et contrôles non destructifs du joint soudé.',
  },
  ruche_cadres: {
    title: 'Ruche et cadres',
    summary: 'Hausse, corps de couvain, grille à reine et plateau.',
  },
  vinification: {
    title: 'Étapes de la vinification',
    summary: 'Vendange, macération, fermentation, élevage et mise en bouteille.',
  },
  taille_gemme: {
    title: 'Taille en brillant',
    summary: 'Table, couronne, pavillon : les proportions déterminent l’éclat.',
  },
  rang_protocole: {
    title: 'Ordre protocolaire',
    summary: 'Préséance bilatérale (fonction, ancienneté) et ordre alphabétique multilatéral.',
  },
  mediation_triangle: {
    title: 'Triangle positions, intérêts, besoins',
    summary: 'Dépasser les positions pour négocier sur les intérêts et les besoins.',
  },
  boucle_circulaire: {
    title: 'Boucle de l’économie circulaire',
    summary: 'Réduire, réemployer, réparer, recycler, valoriser.',
  },
  chaine_risque_climat: {
    title: 'Chaîne du risque climatique',
    summary: 'Risque = aléa × enjeu × vulnérabilité, réduit par l’adaptation.',
  },
  accessibilite_universelle: {
    title: 'Accessibilité universelle',
    summary: 'Cheminement, information perceptible et usage autonome.',
  },
  arts_composition: {
    title: 'Cercle chromatique et composition',
    summary: 'Couleurs complémentaires, lignes de force et équilibre des masses.',
  },
  planning_organisation: {
    title: 'Planning d’organisation hebdomadaire',
    summary: 'Blocs de travail profond, révisions et récupération planifiée.',
  },
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
  // v24.0 — matières transversales
  education_financiere: ['budget_repartition', 'offre_demande', 'cycle_projet'],
  entrepreneuriat: ['business_model_canvas', 'cycle_projet', 'offre_demande'],
  sciences_forensiques: ['scene_forensique', 'adn_helice'],
  mediation_conflits: ['mediation_triangle', 'pyramide_maslow'],
  langues_nationales: ['transmission_orale', 'quadrant_langagier'],
  inclusion_handicap: ['accessibilite_universelle', 'planning_organisation'],
  ia_societe: ['reseau_neurones', 'architecture_ia'],
  climat_adaptation: ['chaine_risque_climat', 'cycle_azote'],
  economie_circulaire: ['boucle_circulaire', 'cycle_azote'],
  gerontologie: ['roue_autonomie', 'corps_humain'],
  // v25.0 — huit nouvelles matières
  bibliotheconomie: ['plan_classification', 'cycle_projet'],
  droit_notarial: ['acte_authentique', 'pyramide_normes', 'mediation_triangle'],
  kinesitherapie_reeducation: ['reeducation_mouvement', 'squelette', 'couches_peau'],
  immobilier_transaction: ['marche_immobilier', 'planning_organisation', 'bilan_syscohada'],
  blockchain_actifs_numeriques: ['chaine_blocs', 'flux_fintech', 'reseau_neurones'],
  orthophonie_langage: ['appareil_phonatoire', 'quadrant_langagier', 'reseau_neurones'],
  horticulture_paysage: ['plan_paysager', 'coupe_sol', 'cycle_azote'],
  menuiserie_ebenisterie: ['assemblage_bois', 'poutre_flexion', 'plan_classification'],
  jeu_video_esport: ['boucle_gameplay', 'planning_organisation', 'quadrant_langagier'],
  coiffure_barbier: ['coupe_cheveu', 'couches_peau', 'cycle_projet'],
  plomberie_sanitaire: ['reseau_plomberie', 'poutre_flexion', 'coupe_sol'],
  maintenance_automobile: ['diagnostic_auto', 'circuit_electrique_serie', 'loi_normale'],
  soudage_chaudronnerie: ['soudure_assemblage', 'poutre_flexion', 'reaction_chimique'],
  apiculture_ruche: ['ruche_cadres', 'cycle_azote', 'pyramide_alimentaire'],
  viticulture_oenologie: ['vinification', 'coupe_sol', 'cycle_azote'],
  gemmologie_joaillerie: ['taille_gemme', 'couches_geologiques', 'arts_composition'],
  protocole_diplomatique: ['rang_protocole', 'separation_pouvoirs', 'mediation_triangle'],
  demographie: ['pyramide_ages', 'couches_sig'],
  economie_sante: ['financement_sante', 'cycle_cardiaque'],
  esthetique_cosmetologie: ['coupe_cheveu', 'couches_peau', 'corps_humain'],
  securite_privee: ['perimetres_surete', 'separation_pouvoirs'],
  mobilite_urbaine: ['chaine_deplacement', 'couches_sig'],
  fle_didactique: ['quadrant_langagier', 'pyramide_maslow'],
  traduction_professionnelle: ['cycle_traduction', 'quadrant_langagier'],
  // Langues, lettres et arts (jusqu’ici sans illustration)
  francais: ['quadrant_langagier', 'pyramide_maslow'],
  anglais: ['quadrant_langagier', 'planning_organisation'],
  espagnol: ['quadrant_langagier', 'transmission_orale'],
  arabe: ['quadrant_langagier', 'transmission_orale'],
  allemand: ['quadrant_langagier', 'planning_organisation'],
  portugais_lusophone: ['quadrant_langagier', 'transmission_orale'],
  chinois_mandarin: ['quadrant_langagier', 'transmission_orale'],
  linguistique_oralite: ['appareil_phonatoire', 'transmission_orale', 'quadrant_langagier'],
  litterature_africaine: ['transmission_orale', 'pyramide_maslow'],
  latin_grec: ['transmission_orale', 'separation_pouvoirs'],
  arts_plastiques: ['arts_composition', 'pyramide_maslow'],
  technologie_college: ['planning_organisation', 'circuit_electrique_serie'],
  methodes_travail: ['planning_organisation', 'pyramide_maslow'],
  preparation_bac: ['planning_organisation', 'pyramide_maslow'],
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
  electronique_electrotech: ['diagnostic_auto', 'circuit_electrique_serie', 'circuit_rc', 'photovoltaique'],
  energies_renouv: ['photovoltaique', 'circuit_electrique_serie'],
  genie_mecanique: ['soudure_assemblage', 'poutre_flexion', 'circuit_electrique_serie'],
  thermodynamique_froid: ['poutre_flexion', 'photovoltaique'],
  genie_civil_btp: ['assemblage_bois', 'poutre_flexion', 'couches_geologiques'],
  architecture_design: ['reseau_plomberie', 'poutre_flexion', 'couches_sig'],
  genie_chimique_procedes: ['reaction_chimique', 'fonctions_chimie'],
  science_materiaux: ['couches_geologiques', 'poutre_flexion'],
  automatique_controle: ['architecture_ia', 'circuit_electrique_serie'],

  // Numérique
  informatique: ['sql_relations', 'architecture_ia', 'modele_osi'],
  data_ia: ['architecture_ia', 'sql_relations', 'loi_normale'],
  genie_logiciel_devops: ['architecture_ia', 'modele_osi'],
  bases_donnees_bigdata: ['sql_relations', 'architecture_ia'],
  developpement_mobile_web: ['architecture_ia', 'modele_osi'],
  design_ux_infographie: ['boucle_gameplay', 'pyramide_maslow', 'architecture_ia'],
  iot_systemes_embarques: ['circuit_electrique_serie', 'modele_osi'],
  reseaux_telecoms: ['modele_osi', 'flux_fintech'],
  cybersecurite: ['modele_osi', 'architecture_ia'],
  fintech_microfinance: ['chaine_blocs', 'flux_fintech', 'sql_relations'],

  // Droit, institutions, économie & gestion
  droit: ['acte_authentique', 'separation_pouvoirs', 'pyramide_normes'],
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
  relations_inter: ['rang_protocole', 'separation_pouvoirs', 'couches_sig'],
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
  agronomie_env: ['ruche_cadres', 'plan_paysager', 'coupe_sol', 'cycle_azote', 'pyramide_alimentaire'],
  agroalimentaire_transformation: ['vinification', 'coupe_sol', 'pyramide_alimentaire'],
  foresterie_biodiversite: ['coupe_sol', 'cycle_azote'],
  hydrologie_eau_climat: ['coupe_sol', 'couches_sig'],
  geologie_mines: ['taille_gemme', 'couches_geologiques', 'coupe_sol'],
  peche_aquaculture: ['coupe_sol', 'cycle_azote'],
  veterinaire_elevage: ['corps_humain', 'cycle_azote'],
  geographie_amenagement: ['couches_sig', 'couches_geologiques'],
  urbanisme_sig: ['marche_immobilier', 'couches_sig', 'couches_geologiques'],
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
