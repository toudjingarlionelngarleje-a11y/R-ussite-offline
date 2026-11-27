import { ExtensionSubjectModules } from './types';

/**
 * v20.0 — Deuxième vague juridique, économique et concours administratifs (32 matières).
 */
export const GROUP_B_DROIT_ECO: ExtensionSubjectModules = {
  droit: [
    [
      'x20-decentralisation',
      'Décentralisation et droit des collectivités territoriales',
      'Transfert de compétences, tutelle, autonomie financière et coopération décentralisée',
      'La tutelle contrôle la légalité des actes locaux, elle ne substitue pas l’État aux élus locaux',
      'Confondre contrôle de légalité et pouvoir d’annulation discrétionnaire',
      'Contentieux d’un budget communal rejeté par le préfet',
    ],
  ],
  droit_ohada: [
    [
      'x20-societes-ohada',
      'Droit des sociétés commerciales OHADA',
      'SARL, SA, SAS, gérance, assemblées et responsabilité des dirigeants',
      'Dans une SARL, la responsabilité des associés est limitée aux apports sauf caution personnelle',
      'Confondre capital social souscrit et capital libéré lors de la constitution',
      'Constitution d’une SAS entre trois associés à N’Djamena',
    ],
  ],
  droit_penal_proc: [
    [
      'x20-penal-special',
      'Droit pénal spécial et infractions économiques',
      'Éléments constitutifs, tentative, complicité et infractions d’atteinte aux biens',
      'Une infraction exige un élément légal, un élément matériel et un élément moral',
      'Qualifier pénalement un simple manquement contractuel',
      'Qualification d’un détournement de fonds dans une entreprise publique',
    ],
  ],
  droit_fiscal_douanes: [
    [
      'x20-prix-transfert',
      'Fiscalité internationale et prix de transfert',
      'Conventions fiscales, établissement stable, retenue à la source et prix de transfert',
      'Le principe de pleine concurrence impose des prix intragroupe comparables à ceux du marché',
      'Négliger la retenue à la source sur les prestations transfrontalières',
      'Documentation des prix de transfert d’un groupe pétrolier',
    ],
  ],
  droit_foncier_environnement: [
    [
      'x20-expropriation',
      'Urbanisme, expropriation et évaluation foncière',
      'Utilité publique, procédure d’expropriation et indemnisation juste et préalable',
      'L’expropriation exige une déclaration d’utilité publique et une indemnisation préalable',
      'Occuper un terrain avant l’aboutissement de la procédure d’indemnisation',
      'Expropriation pour un projet routier urbain',
    ],
  ],
  droit_international_public: [
    [
      'x20-droit-humanitaire',
      'Droit international humanitaire et protection des personnes',
      'Conventions de Genève, distinction, proportionnalité et crimes internationaux',
      'Le principe de distinction interdit de viser directement les civils et les biens de caractère civil',
      'Confondre jus ad bellum (recours à la force) et jus in bello (conduite des hostilités)',
      'Analyse d’un rapport sur un camp de déplacés',
    ],
  ],
  droit_assurances_cima: [
    [
      'x20-assurance-vie',
      'Assurance vie, épargne et retraite',
      'Bénéficiaires, rachat, provisions mathématiques et rentes',
      'La provision mathématique représente l’engagement actualisé de l’assureur envers l’assuré',
      'Confondre capital décès et valeur de rachat dans un contrat d’épargne',
      'Évaluation d’un contrat d’épargne retraite collectif',
    ],
  ],
  droit_numerique: [
    [
      'x20-propriete-intellectuelle',
      'Propriété intellectuelle et contrats technologiques',
      'Droit d’auteur, logiciel, marques, licences et cession de droits',
      'Le logiciel est protégé par le droit d’auteur ; la cession doit être écrite et délimitée',
      'Supposer que payer une prestation transfère automatiquement les droits patrimoniaux',
      'Contrat de développement d’une application avec clause de cession',
    ],
  ],
  economie: [
    [
      'x20-commerce-international',
      'Commerce international et avantages comparatifs',
      'Avantage absolu/comparatif, balance courante et termes de l’échange',
      'Un pays gagne à se spécialiser là où son coût d’opportunité est le plus faible',
      'Confondre avantage absolu et avantage comparatif dans une démonstration',
      'Échange coton-textile entre pays sahéliens et asiatiques',
    ],
  ],
  economie_developpement: [
    [
      'x20-financement-developpement',
      'Financement du développement, IDE et aide publique',
      'Aide publique au développement, IDE, dette extérieure et efficacité de l’aide',
      'L’efficacité de l’aide dépend de la qualité des institutions et de l’appropriation locale',
      'Mesurer le développement au seul PIB sans indicateurs sociaux',
      'Évaluation d’un programme d’IDE dans l’agro-industrie',
    ],
  ],
  econometrie_prevision: [
    [
      'x20-donnees-panel',
      'Économétrie des données de panel',
      'Effets fixes, effets aléatoires, test de Hausman et endogénéité',
      'Le test de Hausman arbitre entre effets fixes et effets aléatoires',
      'Employer des effets fixes sans test préalable ni correction de l’hétéroscédasticité',
      'Panel de 12 pays sur 15 ans pour la croissance',
    ],
  ],
  comptabilite: [
    [
      'x20-comptabilite-analytique',
      'Comptabilité analytique et contrôle de gestion',
      'Centres de coût, coûts directs/indirects, seuil de rentabilité et imputation',
      'Le seuil de rentabilité = charges fixes / taux de marge sur coût variable',
      'Imputer les charges fixes au prorata du chiffre d’affaires sans analyser les inducteurs',
      'Calcul du coût de revient d’une baguette de pain',
    ],
  ],
  audit_controle_interne: [
    [
      'x20-audit-si',
      'Audit des systèmes d’information et cybersécurité',
      'Contrôles généraux informatiques, séparation des tâches et plans de reprise',
      'Un contrôle applicatif n’est fiable que si les accès et les journaux sont maîtrisés',
      'Auditer une application sans vérifier la gestion des habilitations',
      'Audit du système de paie d’un ministère',
    ],
  ],
  finances_publiques: [
    [
      'x20-finances-locales',
      'Finances locales et gestion de la dette publique',
      'Recettes propres, dotations, emprunts et ratios d’endettement',
      'Un emprunt local n’est soutenable que si l’épargne brute couvre l’annuité de la dette',
      'Financer des dépenses de fonctionnement par l’emprunt',
      'Plan de financement d’une commune minière',
    ],
  ],
  finance_marches_banque: [
    [
      'x20-gestion-portefeuille',
      'Gestion de portefeuille et évaluation d’actifs',
      'CAPM, bêta, diversification et frontière efficiente',
      'Le rendement attendu selon le CAPM : E(R) = Rf + β·(E(Rm) − Rf)',
      'Utiliser le bêta d’un secteur comme bêta d’un projet spécifique sans correction',
      'Allocation d’actifs d’une caisse de retraite',
    ],
  ],
  fintech_microfinance: [
    [
      'x20-paiements-digitaux',
      'Paiements digitaux, interopérabilité et inclusion',
      'Mobile money, QR codes, API bancaires et interopérabilité régionale',
      'L’interopérabilité exige des standards d’identité et de compensation communs',
      'Déployer un portefeuille digital sans plan de résolution des litiges',
      'Interconnexion de deux réseaux mobile money CEMAC',
    ],
  ],
  gestion_projet: [
    [
      'x20-conduite-changement',
      'Conduite du changement et adoption utilisateur',
      'Parties prenantes, résistances, plan de communication et formation',
      'Un projet échoue souvent par faible adoption, pas par défaut de livraison technique',
      'Former les utilisateurs après la mise en production au lieu de les associer en amont',
      'Déploiement d’un logiciel de gestion dans 40 écoles',
    ],
  ],
  marketing_entrep: [
    [
      'x20-distribution-afrique',
      'Marketing mix, distribution et commerce de proximité',
      'Canaux courts, réseaux de détaillants, pricing et fidélisation',
      'La couverture numérique du canal conditionne la disponibilité réelle du produit',
      'Fixer un prix sans intégrer les intermédiaires et les ruptures de stock',
      'Lancement d’une gamme de savons dans les marchés de quartier',
    ],
  ],
  negociation_commerce_b2b: [
    [
      'x20-negociation-interculturelle',
      'Négociation interculturelle et partenariats durables',
      'Contextes de communication, temps, confiance et protocoles',
      'En contexte à forte distance hiérarchique, la décision remonte rarement au négociateur',
      'Interpréter un silence ou un refus indirect comme un accord',
      'Partenariat commercial entre une PME africaine et un fournisseur asiatique',
    ],
  ],
  grh_travail: [
    [
      'x20-talents-formation',
      'Gestion des talents, formation et évaluation',
      'Referentiels de compétences, plan de formation, entretiens et mobilité',
      'Un plan de formation n’a de valeur que si les besoins sont issus d’une analyse de compétences',
      'Financer des formations sans mesure de l’impact sur les compétences',
      'Plan de formation annuel d’une banque',
    ],
  ],
  logistique_ci: [
    [
      'x20-transport-multimodal',
      'Transport multimodal, douane et documents',
      'Incoterms, documents douaniers, groupage et délais',
      'Le choix du mode de transport arbitre coût, délai et risque de la marchandise',
      'Oublier la déclaration en douane dans le calcul du coût logistique total',
      'Acheminement conteneurisé Douala–N’Djamena',
    ],
  ],
  commerce_maritime: [
    [
      'x20-assurance-transport',
      'Assurance transport et règlement des avaries',
      'Avaries particulières/communes, franchises et recours',
      'Les avaries communes se répartissent entre armateur et chargeurs selon la règle d’York-Anvers',
      'Confondre avarie commune et avarie particulière dans une réclamation',
      'Réclamation pour avarie de cargaison de ciment',
    ],
  ],
  qualite_hse_iso: [
    [
      'x20-certification-iso',
      'Certification ISO 9001 et 45001',
      'Approche processus, revue de direction, indicateurs et plan d’audit',
      'Une non-conformité majeure bloque la certification jusqu’à action corrective vérifiée',
      'Rédiger des procédures jamais appliquées sur le terrain',
      'Préparation d’une PME à la certification ISO 9001',
    ],
  ],
  ethique_gouvernance: [
    [
      'x20-open-data',
      'Transparence, ouverture des données et redevabilité',
      'Open data, budget citoyen, déclarations d’intérêts et audit social',
      'Une donnée publique ouverte doit être complète, primaire, datée et librement réutilisable',
      'Publier des données agrégées sans méthodologie ni licence',
      'Portail open data d’une collectivité',
    ],
  ],
  gestion_crises: [
    [
      'x20-securite-alimentaire-urgence',
      'Sécurité alimentaire et logistique d’urgence',
      'Cadre intégré de classification, ciblage, distribution et suivi',
      'Le ciblage d’une aide alimentaire repose sur des critères vérifiables et une évaluation rapide',
      'Distribuer sans registre nominatif ni contrôle post-distribution',
      'Réponse à une crise alimentaire dans la bande sahélienne',
    ],
  ],
  methodo_redaction: [
    [
      'x20-discours-oral',
      'Rédaction de discours et prise de parole',
      'Accroche, structure ternaire, rythme et gestion du trac',
      'Un discours efficace énonce une idée par paragraphe et répète l’essentiel sans se répéter',
      'Lire un texte dense sans respirations ni transitions',
      'Discours de rentrée d’un proviseur',
    ],
  ],
  sciences_politiques: [
    [
      'x20-integration-cemac',
      'Institutions régionales et intégration CEMAC/CEDEAO',
      'Communauté économique, libre circulation, harmonisation et souveraineté',
      'L’intégration avance par l’effectivité des textes, pas par leur seule adoption',
      'Confondre zone de libre-échange et union douanière achevée',
      'Bilan de la libre circulation en zone CEMAC',
    ],
  ],
  relations_inter: [
    [
      'x20-diplomatie-economique',
      'Diplomatie économique et négociations commerciales',
      'Intérêts nationaux, accords commerciaux, soft power et arbitrage',
      'La diplomatie économique se juge aux flux obtenus, pas aux communiqués signés',
      'Négocier un accord commercial sans étude d’impact sectoriel',
      'Négociation d’un accord de pêche avec l’Union européenne',
    ],
  ],
  educ_civique: [
    [
      'x20-institutions-etat-droit',
      'Institutions républicaines et État de droit',
      'Séparation des pouvoirs, hiérarchie des normes et contrôle de constitutionnalité',
      'La hiérarchie des normes place la Constitution au sommet de l’ordre juridique interne',
      'Confondre indépendance de la justice et impunité des magistrats',
      'Débat sur la justice constitutionnelle en classe',
    ],
  ],
  psychotechnique: [
    [
      'x20-attention-rapidite',
      'Tests d’attention, de rapidité et de mémoire de travail',
      'Balayage visuel, codes, doubles tâches et gestion du temps',
      'Dans un test chronométré, la stratégie de balayage systématique bat la lecture improvisée',
      'Lire chaque question deux fois et perdre le temps de la série',
      'Épreuve de 80 items en 40 minutes',
    ],
  ],
  culture_gen: [
    [
      'x20-histoire-idees',
      'Histoire des idées et courants artistiques',
      'Lumières, romantisme, réalisme, modernité et pensées africaines',
      'Un courant artistique se définit par sa rupture avec les codes qui le précèdent',
      'Citer un auteur sans dater son courant ni sa thèse',
      'Dissertation sur progrès et tradition',
    ],
  ],
  criminologie_securite: [
    [
      'x20-securite-privee-foules',
      'Sécurité privée, gestion des foules et prévention',
      'Analyse de risque, contrôle d’accès, évacuation et sécurité événementielle',
      'Une foule se gère par flux, files d’attente et issues dimensionnées, pas par la seule présence d’agents',
      'Sous-dimensionner les issues de secours d’un événement',
      'Sécurisation d’un match au stade municipal',
    ],
  ],
};
