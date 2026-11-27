import { ExtensionSubjectModules } from './types';

/**
 * v19.0 — Approfondissements juridiques, économiques et concours administratifs (31 matières).
 */
export const GROUP_B_DROIT_ECO: ExtensionSubjectModules = {
  droit: [
    [
      'x19-contentieux-administratif',
      'Contentieux administratif et responsabilité de la puissance publique',
      'Recours pour excès de pouvoir, plein contentieux et responsabilité pour faute',
      'Le REP exige un acte administratif faisant grief, un intérêt à agir et le respect des délais de recours',
      'Confondre légalité externe (procédure) et légalité interne (motif, but)',
      'Recours d’un usager contre un permis de construire refusé',
    ],
  ],
  droit_ohada: [
    [
      'x19-suretes-ohada',
      'Sûretés OHADA, procédures collectives et recouvrement',
      'Cautionnement, hypothèque, gage et règlement préventif',
      'Le créancier chirographaire n’a aucun rang préférentiel : seule une sûreté publiée le protège',
      'Omettre la publicité d’une hypothèque, ce qui la rend inopposable aux tiers',
      'Recouvrement d’un impayé par un fournisseur auprès d’une SARL en difficulté',
    ],
  ],
  droit_penal_proc: [
    [
      'x19-procedure-penale',
      'Procédure pénale, garde à vue et droits de la défense',
      'Nullités de procédure, délais de garde à vue et présomption d’innocence',
      'Un acte irrégulier n’entraîne nullité que s’il porte atteinte aux intérêts de la personne concernée',
      'Confondre nullité d’ordre public et nullité relative invoquée par la seule partie intéressée',
      'Analyse d’un procès-verbal de garde à vue irrégulier',
    ],
  ],
  droit_fiscal_douanes: [
    [
      'x19-controle-fiscal',
      'Contrôle fiscal, contentieux et régimes douaniers CEMAC',
      'Prescription fiscale, redressement contradictoire et valeur en douane',
      'Le contribuable dispose d’un délai de réponse à la notification de redressement avant mise en recouvrement',
      'Négliger la hiérarchie des sources (acte uniforme, loi nationale, circulaire) dans un litige',
      'Redressement TVA d’une entreprise importatrice à Douala',
    ],
  ],
  droit_foncier_environnement: [
    [
      'x19-foncier-coutumier',
      'Sécurisation foncière, titres et droits d’usage coutumiers',
      'Immatriculation, conflits d’usage et compensation environnementale',
      'Sans titre foncier publié, la propriété n’est pas opposable : la possession seule ne suffit pas',
      'Acquérir un terrain sur simple acte de vente sous seing privé non enregistré',
      'Litige entre éleveurs et agriculteurs sur une zone pastorale',
    ],
  ],
  droit_international_public: [
    [
      'x19-traités-cedea',
      'Droit des traités, organisations régionales et protection diplomatique',
      'Ratification, effet direct, jus cogens et réserves',
      'Un traité régulièrement ratifié prime sur la loi nationale interne dans les systèmes monistes',
      'Invoquer une coutume locale contre une norme impérative (jus cogens)',
      'Contentieux CEDEAO sur la libre circulation des personnes',
    ],
  ],
  droit_assurances_cima: [
    [
      'x19-sinistres-cima',
      'Gestion des sinistres et obligations réciproques (Code CIMA)',
      'Déclaration de sinistre, délais, subrogation et recours contre le tiers',
      'L’assureur dispose d’un délai réglementaire pour indemniser après réception du dossier complet',
      'Laisser expirer le délai de déclaration sans vérifier la clause contractuelle',
      'Indemnisation d’un incendie d’entrepôt partiellement couvert',
    ],
  ],
  droit_numerique: [
    [
      'x19-conformite-donnees',
      'Conformité données personnelles, contrats numériques et IA',
      'Base légale du traitement, minimisation, DPO et responsabilité algorithmique',
      'Tout traitement de données exige une base légale, une finalité déterminée et une durée limitée',
      'Collecter des données biométriques sans base légale ni analyse d’impact',
      'Mise en conformité d’une application de paiement mobile',
    ],
  ],
  economie: [
    [
      'x19-politiques-conjoncturelles',
      'Politiques budgétaire et monétaire, multiplicateurs et inflation',
      'Multiplicateur keynésien, courbe de Phillips et policy mix',
      'Multiplicateur des dépenses publiques k = 1/(1 − c·(1 − t)) en économie ouverte simplifiée',
      'Confondre effet d’éviction et effet multiplicateur dans une relance budgétaire',
      'Évaluation d’un plan de relance dans une économie à forte informalité',
    ],
  ],
  economie_developpement: [
    [
      'x19-pauvrete-evaluation',
      'Mesure de la pauvreté et évaluation d’impact des politiques sociales',
      'Indices FGT, seuils monétaires et méthode des doubles différences',
      'L’indice de pauvreté FGT combine incidence et profondeur : P(α) = 1/n Σ ((z − y_i)/z)^α',
      'Comparer des taux de pauvreté calculés avec des seuils ou des années de référence différents',
      'Évaluation d’un transfert monétaire conditionnel au Sahel',
    ],
  ],
  econometrie_prevision: [
    [
      'x19-series-temporelles',
      'Séries temporelles, stationnarité et prévision',
      'Test de Dickey-Fuller, ARIMA et cointégration',
      'Une régression sur séries non stationnaires non cointégrées produit des corrélations fallacieuses',
      'Prévoir avec un modèle non validé sur un échantillon test hors période',
      'Prévision de la demande électrique annuelle d’une régie nationale',
    ],
  ],
  comptabilite: [
    [
      'x19-consolidation-ifrs',
      'Consolidation, normes IFRS et analyse financière',
      'Périmètre de consolidation, élimination des comptes réciproques et juste valeur',
      'Le goodwill = prix d’acquisition − quote-part de l’actif net réévalué acquis',
      'Additionner simplement les bilans sans éliminer les opérations intragroupe',
      'Consolidation d’un groupe familial avec filiale de distribution',
    ],
  ],
  audit_controle_interne: [
    [
      'x19-audit-risques',
      'Approche par les risques, échantillonnage et rapport d’audit',
      'Matrice de risques, seuil de signification et échantillonnage statistique',
      'Le seuil de signification se fixe en % d’un agrégat stable (chiffre d’affaires ou résultat)',
      'Conclure sans documentation des procédures ni piste d’audit suffisante',
      'Audit du cycle achats d’une entreprise de distribution pétrolière',
    ],
  ],
  finances_publiques: [
    [
      'x19-budget-etat',
      'Chaîne budgétaire, dette publique et soutenabilité',
      'Équilibre budgétaire, solde primaire et dynamique de la dette',
      'La dette se stabilise si le solde primaire couvre la charge d’intérêts et la croissance nominale',
      'Confondre déficit global et déficit primaire dans un diagnostic de soutenabilité',
      'Analyse de la soutenabilité de la dette d’un pays CEMAC',
    ],
  ],
  finance_marches_banque: [
    [
      'x19-gestion-actif-passif',
      'Gestion actif-passif, ratios prudentiels et risque de taux',
      'Duration, gap de taux, Bâle III et couverture par swaps',
      'Une duration de gap positive expose la marge d’intérêt à une hausse des taux',
      'Ignorer le risque de liquidité dans un bilan bancaire en tension',
      'Couverture du risque de taux d’une banque de détail',
    ],
  ],
  fintech_microfinance: [
    [
      'x19-scoring-credit',
      'Scoring de crédit, inclusion financière et conformité AML',
      'Modèles de score, KYC, LCB-FT et protection du consommateur',
      'Un modèle de score doit être validé par un test hors échantillon et un suivi de dérive',
      'Accorder un crédit digital sans vérification d’identité ni contrôle des sanctions',
      'Scoring d’un crédit mobile money pour des commerçantes rurales',
    ],
  ],
  gestion_projet: [
    [
      'x19-pilotage-portefeuille',
      'Pilotage de portefeuille, jalons et gestion des risques projet',
      'Chemin critique, valeur acquise (EVM) et registre des risques',
      'Un projet est en retard si SPI = EV/PV < 1 ; en dépassement si CPI = EV/AC < 1',
      'Suivre l’avancement en pourcentage déclaré sans mesure de la valeur acquise',
      'Pilotage d’un projet de digitalisation d’un service public',
    ],
  ],
  marketing_entrep: [
    [
      'x19-strategie-croissance',
      'Stratégie de croissance, pricing et économie unitaire',
      'Segmentation, coût d’acquisition client et marge contributive',
      'LTV/CAC > 3 est un repère de viabilité d’un modèle d’acquisition payant',
      'Confondre chiffre d’affaires et marge dans un calcul de rentabilité client',
      'Lancement d’une offre de formation en ligne pour artisans',
    ],
  ],
  negociation_commerce_b2b: [
    [
      'x19-negociation-complexe',
      'Négociation complexe, appels d’offres et gestion de la marge',
      'BATNA, zone d’accord possible et valeur client',
      'Sans BATNA claire, la concession devient subie et la marge s’effondre',
      'Négocier sur le prix seul sans élargir le champ des variables (délais, volumes, services)',
      'Réponse à un appel d’offres de fourniture de matériel médical',
    ],
  ],
  grh_travail: [
    [
      'x19-paie-contentieux',
      'Paie, relations sociales et contentieux du travail',
      'Bulletin de paie, cotisations, préavis et licenciement',
      'Le licenciement exige un motif réel et sérieux et une procédure respectée',
      'Confondre faute lourde et faute simple dans l’appréciation du préavis',
      'Contentieux d’un salarié licencié sans entretien préalable',
    ],
  ],
  logistique_ci: [
    [
      'x19-supply-chain-planification',
      'Planification, stocks et indicateurs de chaîne logistique',
      'Flux tirés/poussés, stock de sécurité et taux de service',
      'Stock de sécurité = z × σ_demande × √délai pour un niveau de service donné',
      'Réduire les stocks sans mesurer l’impact sur le taux de service',
      'Optimisation d’une chaîne d’approvisionnement en pièces détachées',
    ],
  ],
  commerce_maritime: [
    [
      'x19-chaîne-portuaire',
      'Chaîne portuaire, connaissement et litiges de transport',
      'Connaissement, Incoterms 2020, avaries et surestaries',
      'Le transfert de risque dépend de l’Incoterm choisi, pas du transfert de propriété',
      'Confondre FOB et CIF sur la répartition des frais et des risques',
      'Litige de surestaries au port de Douala',
    ],
  ],
  qualite_hse_iso: [
    [
      'x19-audit-iso',
      'Audit ISO, analyse des risques et culture sécurité',
      'Approche processus, PDCA, analyse des accidents et permis de travail',
      'Tout écart d’audit exige une action corrective avec responsable et échéance vérifiable',
      'Traiter un accident comme une faute individuelle sans analyse des causes racines',
      'Audit sécurité d’une unité de raffinage',
    ],
  ],
  ethique_gouvernance: [
    [
      'x19-integrity-marches',
      'Intégrité, marchés publics et dispositifs anticorruption',
      'Conflits d’intérêts, déclaration de patrimoine et contrôle des marchés',
      'Un marché public doit respecter publicité, mise en concurrence et critères annoncés',
      'Fractionner un marché pour éviter le seuil de mise en concurrence',
      'Audit d’intégrité d’un appel d’offres routier',
    ],
  ],
  gestion_crises: [
    [
      'x19-commandement-crise',
      'Commandement de crise, logistique humanitaire et continuité d’activité',
      'Cellule de crise, cycle de réponse et plan de continuité',
      'Une crise se pilote par un cycle évaluation → décision → action → communication',
      'Improviser la communication sans porte-parole désigné ni message validé',
      'Réponse à une inondation affectant 3 000 familles',
    ],
  ],
  methodo_redaction: [
    [
      'x19-note-synthese',
      'Note de synthèse, rapport administratif et argumentation',
      'Lecture rapide, plan en deux parties et neutralité du rédacteur',
      'Une note de synthèse ne contient aucune opinion personnelle : uniquement les idées du dossier',
      'Recopier les documents au lieu de les reformuler et hiérarchiser',
      'Note de synthèse sur la réforme de la fonction publique',
    ],
  ],
  sciences_politiques: [
    [
      'x19-analyse-politiques-publiques',
      'Analyse des politiques publiques et gouvernance locale',
      'Mise sur agenda, mise en œuvre et évaluation des politiques',
      'Une politique publique s’évalue par ses effets nets, pas par ses moyens engagés',
      'Décrire les textes sans analyser les acteurs ni les jeux d’intérêts',
      'Évaluation d’une politique de cantines scolaires',
    ],
  ],
  relations_inter: [
    [
      'x19-mediations-regionales',
      'Médiation régionale, sécurité collective et négociation multilatérale',
      'Organisations régionales, mandat de médiation et doctrine de non-ingérence',
      'Une médiation réussit si les parties s’approprient l’accord, pas si le médiateur impose sa solution',
      'Confondre maintien de la paix et imposition de la paix dans un mandat onusien',
      'Médiation d’un conflit frontalier en Afrique centrale',
    ],
  ],
  educ_civique: [
    [
      'x19-citoyennete-numerique',
      'Citoyenneté numérique, droits humains et engagement local',
      'Liberté d’expression, protection des mineurs et participation citoyenne',
      'Un droit s’exerce dans les limites fixées par la loi pour protéger autrui et l’ordre public',
      'Confondre liberté d’expression et droit de diffamer impunément',
      'Campagne de sensibilisation contre la désinformation dans un lycée',
    ],
  ],
  criminologie_securite: [
    [
      'x19-enquete-criminelle',
      'Enquête criminelle, police scientifique et prévention situationnelle',
      'Chaîne de preuve, indices matériels et profilage criminel',
      'Un indice n’a de valeur que si sa collecte, son scellé et sa traçabilité sont documentés',
      'Manipuler une scène sans protection, ce qui rend la preuve inexploitable',
      'Analyse d’une scène de cambriolage avec empreintes et vidéosurveillance',
    ],
  ],
  psychotechnique: [
    [
      'x19-tests-avances',
      'Tests de logique avancée, dominos et raisonnement abstrait',
      'Suites, matrices, analogies verbales et gestion du temps',
      'Dans une matrice, tester d’abord les lignes, puis les colonnes, puis la diagonale',
      'S’acharner sur une question difficile en sacrifiant les suivantes',
      'Batterie de 60 questions en 45 minutes type concours ENAM',
    ],
  ],
  culture_gen: [
    [
      'x19-culture-contemporaine',
      'Culture générale contemporaine, ODD et enjeux africains',
      'Objectifs de développement durable, intégration régionale et transitions',
      'Une dissertation de culture générale exige problématique, plan et exemples datés',
      'Empiler des connaissances sans problématique ni hiérarchisation',
      'Dissertation sur la souveraineté alimentaire en Afrique',
    ],
  ],
};
