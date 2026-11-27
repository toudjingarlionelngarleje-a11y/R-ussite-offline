import { ExtensionSubjectModules } from './types';

/**
 * v21.0 — Troisième vague juridique, économique et concours administratifs (32 matières).
 */
export const GROUP_B_DROIT_ECO: ExtensionSubjectModules = {
  droit: [
    [
      'x21-obligations',
      'Droit des obligations et responsabilité civile',
      'Contrat, consentement, cause, inexécution et réparation du préjudice',
      'La responsabilité civile exige une faute, un dommage et un lien de causalité',
      'Confondre responsabilité contractuelle et délictuelle dans la qualification',
      'Indemnisation d’un dommage causé par un chantier voisin',
    ],
  ],
  droit_ohada: [
    [
      'x21-arbitrage-ohada',
      'Contrats commerciaux et arbitrage OHADA',
      'Liberté contractuelle, clauses léonines et sentence arbitrale',
      'Une clause compromissoire écrite et déterminée conditionne la compétence arbitrale',
      'Rédiger une clause d’arbitrage imprécise, ce qui entraîne la nullité',
      'Litige de fourniture entre deux sociétés UEMOA',
    ],
  ],
  droit_penal_proc: [
    [
      'x21-execution-peines',
      'Exécution des peines et réinsertion',
      'Aménagement de peine, sursis, probation et récidive',
      'L’aménagement de peine suppose un projet sérieux d’insertion et un suivi',
      'Récidiver sans tenir compte des délais légaux de récidive',
      'Accompagnement d’un condamné en fin de peine',
    ],
  ],
  droit_fiscal_douanes: [
    [
      'x21-fiscalite-entreprises',
      'Fiscalité des entreprises et TVA',
      'Assiette, déductions, taux, territorialité et déclarations',
      'La TVA est neutre pour l’entreprise : seul le consommateur final la supporte',
      'Déduire une TVA sur une facture non conforme',
      'Déclaration de TVA d’une entreprise de négoce',
    ],
  ],
  droit_foncier_environnement: [
    [
      'x21-cadastre-bornage',
      'Cadastre, bornage et sécurité juridique du titre',
      'Cadastre, bornage contradictoire, publicité foncière',
      'Un titre foncier n’est opposable qu’après inscription et publication au cadastre',
      'Acheter sur la base d’un plan de bornage non contradictoire',
      'Régularisation d’un terrain urbain disputé',
    ],
  ],
  droit_international_public: [
    [
      'x21-organisations-internationales',
      'Organisations internationales et maintien de la paix',
      'ONU, Conseil de sécurité, maintien de la paix et légitime défense',
      'Seul le Conseil de sécurité peut autoriser un usage de la force hors légitime défense',
      'Confondre résolution contraignante et déclaration politique',
      'Analyse d’un mandat de mission de paix',
    ],
  ],
  droit_assurances_cima: [
    [
      'x21-micro-assurance',
      'Micro-assurance et assurance agricole',
      'Micro-assurance, index climatique, mutualisation et sinistralité',
      'Une assurance indicielle indemnise sur un indice mesurable, sans expertise individuelle',
      'Vendre une micro-assurance sans éducation financière de l’assuré',
      'Couverture sécheresse pour des producteurs de mil',
    ],
  ],
  droit_numerique: [
    [
      'x21-preuve-numerique',
      'Preuve numérique et cybersécurité juridique',
      'Valeur probante, horodatage, conservation et notification',
      'Une preuve numérique est recevable si son intégrité et sa traçabilité sont établies',
      'Produire une capture d’écran sans métadonnées ni constat',
      'Litige sur un contrat signé électroniquement',
    ],
  ],
  economie: [
    [
      'x21-economie-travail',
      'Économie du travail et chômage',
      'Taux d’activité, chômage structurel/frictionnel et salaire minimum',
      'Le taux de chômage rapporte les chômeurs à la population active, pas à la population totale',
      'Confondre chômage et inactivité dans une analyse du marché du travail',
      'Analyse du sous-emploi des jeunes diplômés',
    ],
  ],
  economie_developpement: [
    [
      'x21-developpement-rural',
      'Développement rural et sécurité alimentaire',
      'Filières agricoles, stockage, prix et résilience',
      'La sécurité alimentaire combine disponibilité, accès, utilisation et stabilité',
      'Réduire la sécurité alimentaire à la seule production agricole',
      'Stratégie de sécurité alimentaire d’une région sahélienne',
    ],
  ],
  econometrie_prevision: [
    [
      'x21-evaluation-impact',
      'Évaluation d’impact et inférence causale',
      'Randomisation, variables instrumentales, différences de différences',
      'Une corrélation ne devient causale qu’avec une stratégie d’identification explicite',
      'Attribuer un effet au programme sans groupe de comparaison',
      'Évaluation d’un programme de cantines scolaires',
    ],
  ],
  comptabilite: [
    [
      'x21-syscohada',
      'SYSCOHADA révisé et états financiers',
      'Bilan, compte de résultat, notes annexes et amortissements',
      'Un amortissement se calcule sur la valeur d’entrée diminuée de la valeur résiduelle',
      'Amortir un bien sur une durée fiscale sans vérifier son usage réel',
      'États financiers annuels d’une PME OHADA',
    ],
  ],
  audit_controle_interne: [
    [
      'x21-audit-interne',
      'Audit interne et cartographie des risques',
      'Normes IIA, plan d’audit, échantillonnage et recommandations',
      'L’audit interne évalue le dispositif de maîtrise des risques, il ne le remplace pas',
      'Publier des recommandations sans responsable ni délai de mise en œuvre',
      'Cartographie des risques d’une mutuelle',
    ],
  ],
  finances_publiques: [
    [
      'x21-commande-publique',
      'Commande publique et exécution budgétaire',
      'Seuils, procédures, contrôle des engagements et paiements',
      'Aucune dépense ne peut être engagée sans crédit disponible et visa préalable',
      'Engager une dépense avant visa du contrôleur financier',
      'Audit d’un marché de fournitures hospitalières',
    ],
  ],
  finance_marches_banque: [
    [
      'x21-produits-derives',
      'Produits dérivés et couverture des risques',
      'Forwards, futures, options et swaps',
      'Une option confère un droit, non une obligation : l’acheteur paie une prime',
      'Confondre couverture et spéculation dans la justification d’une position',
      'Couverture du risque de change d’un importateur',
    ],
  ],
  fintech_microfinance: [
    [
      'x21-blockchain-crypto',
      'Blockchain, crypto-actifs et régulation',
      'Registre distribué, consensus, stablecoins et conformité',
      'Un registre distribué n’est fiable que si le consensus et les clés sont sécurisés',
      'Conserver les clés privées d’un portefeuille en ligne sans sauvegarde',
      'Cadre de conformité d’un service de transfert crypto',
    ],
  ],
  gestion_projet: [
    [
      'x21-agilite-echelle',
      'Agilité à l’échelle et gestion de programme',
      'SAFe, équipes alignées, release train et dépendances',
      'À l’échelle, la synchronisation des dépendances prime sur la vélocité locale',
      'Multiplier les équipes agiles sans alignement de backlog',
      'Programme de digitalisation de 12 services',
    ],
  ],
  marketing_entrep: [
    [
      'x21-marketing-digital',
      'Marketing digital et réseaux sociaux',
      'Contenu, acquisition, communautés et mesure',
      'Un plan social se mesure par le coût d’acquisition et la rétention, pas par les likes',
      'Acheter des abonnés sans stratégie de conversion',
      'Lancement d’une marque de cosmétiques naturels',
    ],
  ],
  negociation_commerce_b2b: [
    [
      'x21-achats-fournisseurs',
      'Négociation d’achat et gestion des fournisseurs',
      'Cahier des charges, panel, coût total de possession et contrats',
      'Le coût total de possession inclut achat, maintenance, énergie et fin de vie',
      'Comparer les offres sur le seul prix d’achat',
      'Appel d’offres pour une flotte de véhicules',
    ],
  ],
  grh_travail: [
    [
      'x21-dialogue-social',
      'Dialogue social et négociation collective',
      'Délégués, conventions collectives, grève et médiation',
      'Un accord collectif n’est valable qu’avec des représentants habilités et un objet licite',
      'Négocier sans mandat ni traçabilité des engagements',
      'Négociation d’un accord d’entreprise sur les horaires',
    ],
  ],
  logistique_ci: [
    [
      'x21-entrepot-stocks',
      'Gestion d’entrepôt et optimisation des stocks',
      'Implantation, picking, WMS, rotation et inventaire',
      'Un inventaire tournant fiable réduit les écarts sans bloquer l’activité',
      'Surstocker pour masquer des ruptures chroniques',
      'Réorganisation d’un entrepôt de pièces détachées',
    ],
  ],
  commerce_maritime: [
    [
      'x21-affretement',
      'Affrètement et économie du transport maritime',
      'Affrètement au voyage/à temps, surestaries et taux de fret',
      'L’affrètement à temps transfère l’exploitation, pas la propriété du navire',
      'Confondre lignes régulières et tramping dans le choix du mode',
      'Négociation d’un contrat d’affrètement au voyage',
    ],
  ],
  qualite_hse_iso: [
    [
      'x21-iso-14001',
      'Management environnemental et ISO 14001',
      'Aspects environnementaux, obligations de conformité et indicateurs',
      'L’analyse environnementale identifie les aspects significatifs selon impact et fréquence',
      'Déclarer un aspect environnemental sans mesure ni objectif',
      'Certification ISO 14001 d’une unité de transformation',
    ],
  ],
  ethique_gouvernance: [
    [
      'x21-conformite-anticorruption',
      'Conformité anticorruption et programmes d’intégrité',
      'Cartographie des risques, cadeaux, tiers et signalement',
      'Un programme anticorruption se juge à ses contrôles effectifs, pas à sa charte',
      'Accepter un avantage en nature sans déclaration ni seuil',
      'Due diligence d’un intermédiaire commercial',
    ],
  ],
  gestion_crises: [
    [
      'x21-coordination-humanitaire',
      'Coordination humanitaire et clusters',
      'Clusters, évaluation des besoins, standards Sphère',
      'La coordination évite les doublons : un seul mandat par secteur et par zone',
      'Distribuer sans évaluation conjointe des besoins',
      'Coordination de la réponse après des inondations',
    ],
  ],
  methodo_redaction: [
    [
      'x21-rapport-activite',
      'Rapports d’activité et notes de service',
      'Objet, structure, indicateurs et ton administratif',
      'Une note de service énonce une décision et ses modalités d’application',
      'Mélanger analyse et décision dans une même note',
      'Note de service sur la nouvelle procédure d’archivage',
    ],
  ],
  sciences_politiques: [
    [
      'x21-sociologie-electorale',
      'Sociologie électorale et comportement politique',
      'Clivages, abstention, modes de scrutin et représentativité',
      'Le mode de scrutin modifie la traduction des voix en sièges',
      'Analyser une élection sans distinguer inscrits, votants et suffrages exprimés',
      'Analyse des résultats d’une élection municipale',
    ],
  ],
  relations_inter: [
    [
      'x21-securite-regionale',
      'Sécurité régionale et lutte contre le terrorisme',
      'Coalitions, mandats, droit des conflits et coopération',
      'Une opération régionale exige une base juridique et un mandat clair',
      'Intervenir sans base légale ni coordination avec les autorités locales',
      'Coopération sécuritaire dans le bassin du lac Tchad',
    ],
  ],
  educ_civique: [
    [
      'x21-droits-enfant',
      'Droits de l’enfant et protection sociale',
      'Convention des droits de l’enfant, protection et participation',
      'L’intérêt supérieur de l’enfant guide toute décision qui le concerne',
      'Confondre protection de l’enfant et décision à sa place sans l’écouter',
      'Campagne contre le travail des enfants',
    ],
  ],
  psychotechnique: [
    [
      'x21-raisonnement-numerique',
      'Raisonnement numérique et résolution de problèmes',
      'Pourcentages, proportions, débits et séries numériques',
      'Une baisse de 20 % ne s’annule pas avec une hausse de 20 % : les bases diffèrent',
      'Appliquer les pourcentages sur des bases différentes sans vérifier la référence',
      'Problème de robinets et de débits en 90 secondes',
    ],
  ],
  culture_gen: [
    [
      'x21-enjeux-scientifiques',
      'Enjeux scientifiques et technologiques contemporains',
      'Climat, énergie, santé et intelligence artificielle',
      'Un débat scientifique se tranche par des données convergentes, pas par l’autorité',
      'Citer une étude unique comme consensus scientifique',
      'Dissertation sur la sobriété énergétique',
    ],
  ],
  criminologie_securite: [
    [
      'x21-victimologie',
      'Victimologie et accompagnement des victimes',
      'Traumatisme, prise en charge, indemnisation et protection',
      'Une victime doit être informée de ses droits et orientée sans être re-victimisée',
      'Faire répéter plusieurs fois le récit sans protocole adapté',
      'Accompagnement d’une victime de vol avec violence',
    ],
  ],
};
