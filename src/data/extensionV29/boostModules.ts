import { ExtensionSubjectModules } from '../extensionV23/types';

/**
 * v29.0 — Deux modules « approfondissement » inédits par matière (141 matières × 2 modules × 10 étapes),
 * soit 2 820 nouveaux chapitres complets, illustrés par la galerie SVG de chaque matière.
 */
export const X29_BOOST_MODULES: ExtensionSubjectModules = {
  maths: [
    ['x29-geometrie-espace', 'Géométrie de l’espace et vecteurs', 'Plans, droites, produit scalaire, équations cartésiennes', 'Deux plans sont orthogonaux si leurs vecteurs normaux le sont', 'Confondre orthogonalité des plans et des droites', 'Section d’un cube par un plan'],
    ['x29-suites-series', 'Suites et séries numériques', 'Convergence, monotonie, séries de Riemann, comparaison', 'Une suite croissante et majorée converge', 'Conclure à la convergence sans majoration', 'Étude d’une suite récurrente'],
  ],
  physique: [
    ['x29-electromagnetisme', 'Électromagnétisme et induction', 'Champ magnétique, flux, force de Laplace, induction', 'Une variation de flux induit une force électromotrice', 'Oublier le signe de la loi de Lenz', 'Freinage par courants de Foucault'],
    ['x29-mecanique-fluides', 'Mécanique des fluides', 'Pression, débit, Bernoulli, viscosité', 'La conservation du débit relie sections et vitesses', 'Appliquer Bernoulli à un fluide visqueux', 'Écoulement dans une conduite'],
  ],
  svt: [
    ['x29-genetique-populations', 'Génétique des populations', 'Fréquences alléliques, Hardy-Weinberg, dérive, sélection', 'Les fréquences restent stables sans mutation, sélection ni dérive', 'Appliquer Hardy-Weinberg à une petite population', 'Groupe sanguin dans une population'],
    ['x29-ecosystemes-cycles', 'Écosystèmes et cycles biogéochimiques', 'Chaînes trophiques, cycles du carbone et de l’azote, productivité', 'L’énergie se perd à chaque niveau trophique', 'Confondre cycle de matière et flux d’énergie', 'Étude d’une forêt tropicale'],
  ],
  philo: [
    ['x29-epistemologie-sciences', 'Épistémologie et sciences', 'Observation, hypothèse, falsifiabilité, paradigme', 'Une hypothèse scientifique doit pouvoir être réfutée', 'Confondre vérité et opinion majoritaire', 'Débat sur la méthode expérimentale'],
    ['x29-ethique-technique', 'Éthique et technique', 'Responsabilité, technoscience, dignité, précaution', 'La technique engage une responsabilité envers autrui', 'Séparer l’efficacité de toute valeur', 'Choix d’un algorithme médical'],
  ],
  droit: [
    ['x29-contentieux-administratif', 'Contentieux administratif', 'Recours gracieux, excès de pouvoir, délais, juge', 'Un recours contentieux suit un délai et une décision préalable', 'Saisir le juge sans décision attaquable', 'Refus de permis de construire'],
    ['x29-droit-famille', 'Droit de la famille', 'Mariage, filiation, autorité parentale, divorce', 'L’intérêt de l’enfant guide les décisions familiales', 'Ignorer le consentement des époux', 'Garde d’un enfant'],
  ],
  culture_gen: [
    ['x29-aires-culturelles', 'Aires culturelles et langues', 'Familles de langues, migrations, métissages', 'Une aire culturelle se définit par des traits partagés et des échanges', 'Réduire une culture à un stéréotype', 'Carte des langues africaines'],
    ['x29-sciences-decouvertes', 'Sciences et grandes découvertes', 'Imprimerie, navigation, révolution scientifique', 'Une découverte se diffuse par des réseaux techniques et commerciaux', 'Attribuer une invention à un seul inventeur', 'Expédition maritime'],
  ],
  economie: [
    ['x29-monnaie-inflation', 'Monnaie et inflation', 'Masse monétaire, pouvoir d’achat, indexation', 'L’inflation érode le pouvoir d’achat nominal', 'Confondre inflation et hausse d’un seul prix', 'Hausse des prix alimentaires'],
    ['x29-commerce-international', 'Échanges internationaux', 'Balance courante, avantages comparatifs, tarifs', 'Un pays gagne à se spécialiser selon ses coûts relatifs', 'Analyser un échange sans taux de change', 'Déficit commercial'],
  ],
  gestion_projet: [
    ['x29-gestion-risques-projet', 'Cartographie des risques et plans de réponse', 'Identification, probabilité, impact, plan de réponse', 'Un risque se traite avant qu’il ne devienne un problème', 'Lister les risques sans les hiérarchiser', 'Projet de déploiement réseau'],
    ['x29-budget-projet', 'Budget et rentabilité de projet', 'Coûts, marge, seuil de rentabilité, trésorerie', 'Le seuil de rentabilité divise les charges fixes par la marge unitaire', 'Confondre chiffre d’affaires et marge', 'Lancement d’une application'],
  ],
  cybersecurite: [
    ['x29-cryptographie-appliquee', 'Cryptographie appliquée', 'Chiffrement symétrique, asymétrique, hachage, signature', 'Le chiffrement asymétrique résout l’échange de clés', 'Confondre chiffrement et encodage', 'Échange de données bancaires'],
    ['x29-reponse-incident', 'Réponse à incident', 'Détection, confinement, éradication, retour d’expérience', 'On confine avant d’éradiquer pour limiter la propagation', 'Supprimer les traces avant analyse', 'Poste infecté par un rançongiciel'],
  ],
  francais: [
    ['x29-argumentation-essai', 'Argumentation et essai', 'Thèse, arguments, exemples, concessions', 'Un essai progresse par thèse, antithèse et dépassement', 'Empiler des exemples sans thèse', 'Sujet sur la liberté d’expression'],
    ['x29-poesie-versification', 'Poésie et versification', 'Mètre, rime, sonorité, image', 'Le rythme du vers sert le sens du poème', 'Compter les syllabes sans l’élision', 'Commentaire d’un sonnet'],
  ],
  histoire_geo: [
    ['x29-revolutions-industrielles', 'Révolutions industrielles', 'Machinisme, charbon, urbanisation, classes sociales', 'Chaque révolution industrielle repose sur une énergie dominante', 'Décrire la croissance sans ses coûts sociaux', 'Usine textile du XIXe siècle'],
    ['x29-empires-saheliens', 'États et routes commerciales en Afrique de l’Ouest', 'Ghana, Mali, Songhaï, commerce transsaharien', 'Un empire sahélien se construit sur le contrôle des routes commerciales', 'Confondre empire et État-nation moderne', 'Empire du Mali'],
  ],
  anglais: [
    ['x29-conditionals-modals', 'Conditionals and modals', 'Zero to third conditional, modal verbs, register', 'Le troisième conditionnel exprime un regret irréel', 'Mélanger les temps du conditionnel', 'Email professionnel'],
    ['x29-academic-writing', 'Academic writing and connectors', 'Thesis statement, connectors, hedging, cohesion', 'Un texte académique annonce sa thèse et la relie', 'Traduire mot à mot depuis le français', 'Essay introduction'],
  ],
  informatique: [
    ['x29-poo-structures', 'POO et structures de données', 'Classe, objet, encapsulation, pile, file, arbre', 'Une structure se choisit selon le coût des opérations', 'Utiliser une liste pour des insertions massives', 'Gestion d’une file d’attente'],
    ['x29-complexite-algorithmes', 'Complexité algorithmique', 'Grand O, récursivité, tri, dichotomie', 'La dichotomie divise par deux à chaque étape', 'Estimer la complexité au nombre de lignes', 'Recherche dans un annuaire'],
  ],
  comptabilite: [
    ['x29-analyse-financiere', 'Lecture financière du bilan et du compte de résultat', 'Bilan fonctionnel, FR, BFR, ratios de rentabilité', 'Le BFR mesure le besoin de financement du cycle d’exploitation', 'Calculer un ratio sans référentiel', 'Diagnostic d’une PME'],
    ['x29-fiscalite-entreprise', 'Fiscalité de l’entreprise', 'TVA, impôt sur les sociétés, charges déductibles', 'Une charge n’est déductible que si elle est engagée dans l’intérêt de l’exploitation', 'Déduire une amende fiscale', 'Déclaration annuelle'],
  ],
  chimie_bio: [
    ['x29-stereochimie', 'Stéréochimie et isomérie', 'Carbone asymétrique, énantiomères, conformations', 'Deux énantiomères diffèrent par leur configuration spatiale', 'Confondre isomère de constitution et stéréoisomère', 'Médicament chiral'],
    ['x29-enzymologie', 'Enzymologie et cinétique', 'Site actif, Km, Vmax, inhibition', 'La vitesse enzymatique sature quand le substrat est en excès', 'Confondre Km et Vmax', 'Effet d’un inhibiteur'],
  ],
  psychotechnique: [
    ['x29-tests-numeriques', 'Tests numériques et suites', 'Suites logiques, pourcentages, proportions', 'Une suite se résout en testant différences et ratios', 'Chercher une règle unique trop vite', 'Série de nombres'],
    ['x29-tests-figures', 'Tests de figures et matrices', 'Rotation, symétrie, superposition, série graphique', 'Une matrice se résout par lignes ou par colonnes, jamais au hasard', 'Choisir la figure la plus esthétique', 'Matrice 3 × 3'],
  ],
  statistiques: [
    ['x29-echantillonnage-estimation', 'Échantillonnage et estimation', 'Échantillon, biais, intervalle de confiance', 'Un intervalle de confiance dépend de la taille et du niveau', 'Généraliser sans marge d’erreur', 'Sondage d’opinion'],
    ['x29-tests-hypotheses', 'Tests d’hypothèses', 'H0, H1, seuil, p-value, puissance', 'On ne rejette H0 que si la p-value est inférieure au seuil', 'Confondre seuil et p-value', 'Test d’un traitement'],
  ],
  pedagogie: [
    ['x29-evaluation-competences', 'Évaluation par compétences', 'Critères, indicateurs, niveaux de maîtrise, remédiation', 'Une compétence s’évalue par des critères explicites', 'Noter sans critère annoncé', 'Grille d’évaluation'],
    ['x29-differenciation', 'Groupes de besoin et parcours différenciés', 'Besoins, groupes, supports variés, tutorat', 'Différencier, c’est varier les chemins et non les exigences', 'Donner plus de travail aux plus rapides', 'Classe hétérogène'],
  ],
  marketing_entrep: [
    ['x29-etude-marche', 'Segmentation et validation d’un besoin', 'Échantillon, entretien, personas, concurrence', 'Un persona se construit sur des données, pas des intuitions', 'Extrapoler trois entretiens à tout le marché', 'Lancement d’un service'],
    ['x29-tunnel-acquisition', 'Tunnel d’acquisition et fidélisation', 'Attractivité, conversion, rétention, coût d’acquisition', 'On optimise l’étape qui perd le plus de clients', 'Investir sans mesurer la conversion', 'Campagne digitale'],
  ],
  educ_civique: [
    ['x29-droits-enfant', 'Droits de l’enfant et protection', 'Convention, intérêt supérieur, protection, participation', 'L’intérêt supérieur de l’enfant prime dans toute décision', 'Protéger sans jamais écouter l’enfant', 'Signalement de maltraitance'],
    ['x29-citoyennete-numerique', 'Citoyenneté numérique', 'Identité numérique, cyberharcèlement, traces, réputation', 'Une trace publiée peut rester accessible durablement', 'Croire que la suppression est immédiate partout', 'Harcèlement en ligne'],
  ],
  espagnol: [
    ['x29-subjonctif', 'Subjonctif et modes', 'Subjonctif présent, indicatif, volonté, doute', 'Le subjonctif exprime le doute, le souhait ou la nécessité', 'Employer l’indicatif après « ojalá »', 'Expression du souhait'],
    ['x29-espagnol-affaires', 'Espagnol professionnel : réunions et courriels', 'Courriel, réunion, négociation, formules de politesse', 'Le vouvoiement professionnel utilise « usted »', 'Tutoyer un client inconnu', 'Réunion commerciale'],
  ],
  anatomie_physio: [
    ['x29-appareil-locomoteur', 'Appareil locomoteur', 'Os, articulations, muscles, levier', 'Un muscle agit sur deux points d’insertion par un levier', 'Confondre origine et terminaison', 'Flexion du coude'],
    ['x29-equilibre-hydro-electrolytique', 'Équilibre hydro-électrolytique', 'Eau corporelle, osmolarité, sodium, diurèse', 'L’osmolarité guide les mouvements d’eau entre compartiments', 'Raisonner en volume sans concentrations', 'Déshydratation aiguë'],
  ],
  sante_publique: [
    ['x29-surveillance-epidemiologique', 'Surveillance épidémiologique', 'Notification, seuil d’alerte, investigation, cas', 'Une alerte se déclenche sur un seuil défini à l’avance', 'Attendre la confirmation de tous les cas', 'Épidémie de choléra'],
    ['x29-promotion-sante', 'Promotion de la santé', 'Prévention, éducation, déterminants, participation', 'La promotion de la santé agit aussi sur les environnements', 'Informer sans changer l’environnement', 'Campagne de vaccination'],
  ],
  finances_publiques: [
    ['x29-budget-etat', 'Élaboration et exécution du budget', 'Loi de finances, équilibre, contrôle, exécution', 'Le budget s’exécute dans le cadre de la loi de finances', 'Engager une dépense sans crédit', 'Budget ministériel'],
    ['x29-fiscalite-indirecte', 'TVA et fiscalité indirecte', 'TVA, exonérations, base imposable, territorialité', 'La TVA est neutre pour l’entreprise assujettie', 'Confondre TVA collectée et charge', 'Facturation d’un service'],
  ],
  droit_ohada: [
    ['x29-suretes-ohada', 'Sûretés et garanties OHADA', 'Cautionnement, hypothèque, gage, nantissement', 'Une sûreté protège le créancier en cas de défaut', 'Prendre une garantie sans publicité', 'Prêt bancaire garanti'],
    ['x29-procedures-collectives', 'Procédures collectives', 'Redressement, liquidation, créanciers, déclaration', 'La déclaration de créance conditionne le rang du créancier', 'Omettre de déclarer sa créance', 'Entreprise en cessation de paiement'],
  ],
  data_ia: [
    ['x29-apprentissage-supervise', 'Entraînement, validation et surapprentissage', 'Features, entraînement, validation croisée, sur-apprentissage', 'Un modèle s’évalue sur des données jamais vues', 'Évaluer sur l’ensemble d’entraînement', 'Prédiction d’attrition'],
    ['x29-visualisation-donnees', 'Visualisation et récit de données', 'Encodage visuel, échelle, biais, tableau de bord', 'Un bon graphique montre une comparaison, pas une décoration', 'Tronquer l’axe pour exagérer un écart', 'Tableau de bord d’activité'],
  ],
  arabe: [
    ['x29-grammaire-arabe-avancee', 'Grammaire arabe avancée', 'Racines, schèmes, cas, annexion', 'La racine trilitère organise le lexique arabe', 'Ignorer la voyelle finale de cas', 'Analyse d’une phrase nominale'],
    ['x29-arabe-affaires', 'Terminologie arabe commerciale', 'Terminologie, correspondance, registre', 'La traduction professionnelle respecte le registre et le terme', 'Traduire littéralement une formule de politesse', 'Contrat commercial'],
  ],
  relations_inter: [
    ['x29-organisations-internationales', 'ONU et organisations régionales', 'Conseil de sécurité, résolutions, CEDEAO, Union africaine', 'Une résolution du Conseil de sécurité peut être contraignante', 'Confondre recommandation et décision', 'Débat au Conseil de sécurité'],
    ['x29-geopolitique-energie', 'Géopolitique de l’énergie', 'Routes d’approvisionnement, rente, sanctions', 'Un corridor énergétique est un enjeu de puissance', 'Analyser l’énergie sans les infrastructures', 'Pipeline transsaharien'],
  ],
  agronomie_env: [
    ['x29-fertilite-sols', 'Fertilité et fertilisation des sols', 'Humus, pH, NPK, carences, amendements', 'Une fertilisation se raisonne à partir d’une analyse de sol', 'Fertiliser sans connaître le pH', 'Parcelle de maïs'],
    ['x29-irrigation-drainage', 'Irrigation et drainage', 'Besoins en eau, goutte-à-goutte, nappe, salinisation', 'L’irrigation se calcule sur l’évapotranspiration de la culture', 'Irriguer à heure fixe sans mesure', 'Maraîchage en saison sèche'],
  ],
  energies_renouv: [
    ['x29-photovoltaique', 'Solaire photovoltaïque', 'Irradiance, cellule, onduleur, rendement', 'La puissance crête n’est atteinte qu’aux conditions de test', 'Dimensionner sur la puissance crête seule', 'Electrification d’une école'],
    ['x29-stockage-reseaux', 'Stockage et réseaux électriques', 'Batteries, intermittence, foisonnement, réseau', 'Le stockage découple production et consommation', 'Ignorer l’intermittence dans le dimensionnement', 'Centrale solaire avec batterie'],
  ],
  pharmacologie: [
    ['x29-pharmacocinetique', 'Pharmacocinétique', 'Absorption, distribution, métabolisme, élimination', 'La posologie dépend de la vitesse d’élimination', 'Confondre demi-vie et durée d’action', 'Adaptation posologique'],
    ['x29-interactions-medicamenteuses', 'Associations à risque et cytochromes', 'Induction enzymatique, synergie, antagonisme', 'Deux médicaments peuvent modifier mutuellement leur concentration', 'Associer sans vérifier le cytochrome', 'Patient polymédiqué'],
  ],
  logistique_ci: [
    ['x29-transport-multimodal', 'Transport multimodal', 'Rupture de charge, conteneur, coût, délai', 'Chaque rupture de charge ajoute coût et risque', 'Comparer les modes sur le seul tarif', 'Acheminement maritime puis routier'],
    ['x29-douane-incoterms', 'Douane et Incoterms', 'Incoterms, valeur en douane, droits, origine', 'L’Incoterm choisi détermine qui supporte le risque', 'Choisir un Incoterm sans lire le transfert de risque', 'Importation de matériel'],
  ],
  grh_travail: [
    ['x29-paie-cotisations', 'Paie et cotisations sociales', 'Brut, net, cotisations, retenues', 'Le net à payer se déduit du brut après cotisations', 'Confondre brut et coût employeur', 'Bulletin de paie'],
    ['x29-dialogue-social', 'Dialogue social et conflits', 'Délégués, convention collective, grève, négociation', 'La négociation collective produit des règles opposables', 'Négocier sans mandat', 'Conflit dans une usine'],
  ],
  reseaux_telecoms: [
    ['x29-fibre-optique', 'Fibre optique et transmission', 'Atténuation, épissure, réflectométrie, FTTH', 'L’atténuation se mesure en décibels par kilomètre', 'Raccorder sans mesure de réflectométrie', 'Déploiement FTTH'],
    ['x29-5g-radio', 'Radiocom et 5G', 'Bandes, cellules, handover, interférences', 'La couverture dépend de la bande et de la densité de sites', 'Planifier une bande sans étude de couverture', 'Couverture d’un quartier'],
  ],
  genie_civil_btp: [
    ['x29-beton-armature', 'Dimensionnement des sections en béton armé', 'Dosage, enrobage, aciers, coffrage', 'L’enrobage protège les aciers de la corrosion', 'Poser les aciers sans respecter l’enrobage', 'Poutre de bâtiment'],
    ['x29-rdm-portiques', 'RDM et portiques', 'Effort normal, moment fléchissant, flèche, appuis', 'Un portique se dimensionne sur les combinaisons d’actions', 'Négliger la flèche admissible', 'Hangar industriel'],
  ],
  journalisme_comm: [
    ['x29-ecriture-journalistique', 'Écriture journalistique et sources', 'Angle, lead, hiérarchie, vérification', 'Une information se vérifie par deux sources indépendantes', 'Publier une rumeur non recoupée', 'Reportage local'],
    ['x29-reseaux-sociaux-media', 'Réseaux sociaux et modération', 'Communauté, algorithme, signalement, charte', 'Une charte de modération rend les décisions prévisibles', 'Modérer sans critère publié', 'Page officielle d’un média'],
  ],
  nutrition_sante: [
    ['x29-micronutriments', 'Carences nutritionnelles et supplémentation', 'Vitamines, fer, iode, signes cliniques', 'Une carence se diagnostique par des signes et des dosages', 'Supplémenter sans diagnostic', 'Anémie chez l’adolescente'],
    ['x29-hygiene-alimentaire', 'Hygiène et conservation', 'Chaîne du froid, contaminations, DLC, HACCP', 'La rupture de la chaîne du froid accélère la prolifération', 'Recongeler un produit décongelé', 'Restauration scolaire'],
  ],
  tourisme_hotel: [
    ['x29-accueil-hebergement', 'Accueil et hébergement', 'Réservation, check-in, yield, satisfaction', 'La disponibilité se pilote par le revenue management', 'Surréserver sans politique de compensation', 'Hôtel en haute saison'],
    ['x29-produit-touristique', 'Montage d’un produit touristique', 'Circuit, prestataires, marge, saisonnalité', 'Un circuit se construit sur la fiabilité des prestataires', 'Vendre sans tester le circuit', 'Séjour de trois jours'],
  ],
  methodo_redaction: [
    ['x29-note-synthese', 'Note de synthèse', 'Corpus, plan, reformulation, neutralité', 'Une note de synthèse reformule sans jamais paraphraser', 'Recopier les documents', 'Dossier de cinq pièces'],
    ['x29-argumentation-ecrite', 'Argumentation écrite et plan', 'Thèse, plan dialectique, transitions', 'Chaque partie répond à la précédente', 'Annoncer un plan que le devoir ne suit pas', 'Sujet de culture générale'],
  ],
  aeronautique_meteo: [
    ['x29-navigation-aerienne', 'Navigation et instruments', 'Cap, dérive, radionavigation, cartes', 'Le cap vrai se corrige de la déclinaison magnétique', 'Confondre cap et route', 'Préparation d’un vol'],
    ['x29-meteo-operationnelle', 'Météorologie opérationnelle', 'METAR, TAF, cumulonimbus, cisaillement', 'Un TAF se lit par évolution temporelle', 'Décoller sans briefing météo', 'Vol côtier'],
  ],
  geologie_mines: [
    ['x29-mineralogie-gitologie', 'Minéralogie et gîtologie', 'Minéraux, gangue, gîte, teneur', 'Un gîte s’évalue par sa teneur et sa tonnage', 'Confondre teneur et réserve', 'Gisement aurifère'],
    ['x29-exploitation-mine', 'Exploitation minière et sécurité', 'Ciel ouvert, galerie, ventilation, éboulement', 'La ventilation conditionne la sécurité en souterrain', 'Exploiter sans plan de soutènement', 'Mine souterraine'],
  ],
  veterinaire_elevage: [
    ['x29-nutrition-animale', 'Nutrition animale', 'Ration, protéines, énergie, minéraux', 'Une ration s’équilibre entre besoins et apports', 'Distribuer sans analyser le fourrage', 'Troupeau bovin'],
    ['x29-maladies-contagieuses', 'Maladies contagieuses et prophylaxie', 'Contagion, quarantaine, vaccination, biosécurité', 'La quarantaine sépare les animaux avant intégration', 'Mélanger les nouveaux animaux aussitôt', 'Élevage porcin'],
  ],
  fintech_microfinance: [
    ['x29-mobile-money', 'Mobile money et paiements', 'Wallet, KYC, frais, interopérabilité', 'Le KYC protège l’opérateur et le client', 'Ouvrir un compte sans vérification', 'Paiement marchand'],
    ['x29-scoring-credit', 'Scoring et octroi de crédit', 'Score, historique, garanties, défaut', 'Un score se valide sur une population de défauts observés', 'Octroyer sans historique de remboursement', 'Microcrédit productif'],
  ],
  psychologie_cog: [
    ['x29-memoire-travail', 'Mémoire de travail', 'Empan, charge, répétition, consolidation', 'La mémoire de travail traite peu d’éléments à la fois', 'Surcharger l’apprenant d’informations simultanées', 'Apprentissage d’un texte'],
    ['x29-metacognition', 'Métacognition et autorégulation', 'Planification, contrôle, évaluation, illusions de savoir', 'Se tester révèle mieux le savoir que relire', 'Confondre familiarité et maîtrise', 'Préparation d’un contrôle'],
  ],
  ethique_gouvernance: [
    ['x29-marches-publics', 'Passation des marchés publics', 'Appel d’offres, seuils, impartialité, recours', 'La concurrence loyale exige des critères publiés à l’avance', 'Modifier les critères après ouverture', 'Attribution d’un marché'],
    ['x29-lutte-corruption', 'Lutte contre la corruption', 'Conflit d’intérêts, déclaration, sanction, prévention', 'La prévention passe par la traçabilité des décisions', 'Traiter un signalement sans protection du témoin', 'Commission d’enquête'],
  ],
  urbanisme_sig: [
    ['x29-cadastre-foncier', 'Cadastre et foncier urbain', 'Parcelles, titre, plan, mutation', 'Un titre foncier sécurise la propriété et la transaction', 'Bâtir sans vérifier le statut de la parcelle', 'Lotissement communal'],
    ['x29-sig-analyse-spatiale', 'SIG et analyse spatiale', 'Couches, projection, buffer, requête spatiale', 'Toute analyse SIG dépend de la projection utilisée', 'Superposer des couches aux projections différentes', 'Carte d’accessibilité'],
  ],
  obstetrique_pediatrie: [
    ['x29-suivi-grossesse', 'Suivi de grossesse', 'Consultations, échographie, tension, dépistage', 'Un suivi régulier dépiste les complications à temps', 'Espacer les consultations sans motif', 'Consultation du troisième trimestre'],
    ['x29-urgences-neonatales', 'Urgences néonatales', 'Détresse, hypothermie, hypoglycémie, transfert', 'Le nouveau-né se réchauffe avant tout autre geste', 'Manipuler sans maintien de la chaleur', 'Prématuré en détresse'],
  ],
  commerce_maritime: [
    ['x29-affretement', 'Affrètement et charte-partie', 'Affrètement coque nue, temps, voyage, surestaries', 'La charte-partie répartit les coûts et les risques', 'Confondre affrètement et connaissement', 'Contrat d’affrètement'],
    ['x29-connaissement', 'Connaissement et documents', 'B/L, manifeste, endossement, original', 'Le connaissement original vaut titre de possession', 'Livrer sans original', 'Remise de marchandise'],
  ],
  droit_numerique: [
    ['x29-donnees-personnelles', 'Données personnelles et consentement', 'Base légale, finalité, minimisation, droits', 'Toute collecte exige une base légale et une finalité', 'Collecter sans finalité définie', 'Formulaire en ligne'],
    ['x29-cybercriminalite', 'Cybercriminalité et preuve', 'Infraction, traces, chaîne de custody, signalement', 'La preuve numérique doit rester intègre jusqu’au procès', 'Manipuler la copie originale', 'Escroquerie en ligne'],
  ],
  chimie_organique: [
    ['x29-mecanismes-reactionnels', 'Mécanismes réactionnels', 'Substitution, addition, élimination, intermédiaires', 'Le mécanisme s’écrit avec des flèches de déplacement d’électrons', 'Oublier la régiosélectivité', 'Synthèse d’un alcène'],
    ['x29-spectroscopie', 'Spectroscopie IR et RMN', 'Bandes IR, déplacements chimiques, intégration', 'Chaque signal RMN s’interprète par environnement et intégration', 'Attribuer un signal sans le multiplicités', 'Identification d’un ester'],
  ],
  gestion_crises: [
    ['x29-coordination-humanitaire', 'Coordination humanitaire', 'Clusters, évaluation, mandat, redevabilité', 'La coordination répartit les mandats pour éviter les doublons', 'Intervenir sans évaluation commune', 'Réponse à un séisme'],
    ['x29-logistique-urgence', 'Logistique d’urgence', 'Prépositionnement, chaîne d’approvisionnement, dernier kilomètre', 'Le dernier kilomètre détermine l’accès aux sinistrés', 'Acheminer sans plan de distribution', 'Aide alimentaire'],
  ],
  technologie_robotique: [
    ['x29-capteurs-actionneurs', 'Chaîne d’acquisition et motorisation', 'Mesure, seuil, moteur, servo, boucle', 'Un capteur se choisit selon la grandeur et la précision utiles', 'Brancher un actionneur sans driver', 'Robot suiveur de ligne'],
    ['x29-programmation-robot', 'Programmation de robot', 'Boucles, conditions, sous-programmes, sécurité', 'Un programme robot doit prévoir l’arrêt d’urgence', 'Tester sans limite de course', 'Bras articulé'],
  ],
  allemand: [
    ['x29-civilisation-allemande', 'Civilisation allemande', 'Länder, histoire, institutions, culture', 'Le fédéralisme structure les compétences allemandes', 'Confondre Bund et Länder', 'Exposé sur la RFA'],
    ['x29-allemand-professionnel', 'Allemand professionnel', 'Bewerbung, courriel, réunion, formules', 'La correspondance professionnelle respecte la forme « Sie »', 'Tutoyer un recruteur', 'Entretien d’embauche'],
  ],
  astronomie_spatial: [
    ['x29-systeme-solaire', 'Système solaire et lois de Kepler', 'Orbites, périodes, excentricité, gravitation', 'Le carré de la période varie comme le cube du demi-grand axe', 'Confondre masse et poids', 'Étude d’une comète'],
    ['x29-cosmologie', 'Cosmologie et évolution stellaire', 'Big Bang, redshift, séquence principale, naines', 'Le décalage vers le rouge mesure l’éloignement', 'Interpréter un redshift comme une vitesse locale pure', 'Observation d’une galaxie lointaine'],
  ],
  sociologie_anthropo: [
    ['x29-methodes-enquete', 'Méthodes d’enquête', 'Entretien, observation, questionnaire, échantillon', 'La méthode se choisit selon la question posée', 'Généraliser une observation localisée', 'Enquête de terrain'],
    ['x29-migrations-urbaines', 'Migrations et urbanisation', 'Exode rural, informalité, réseaux, intégration', 'Les migrations s’expliquent par des réseaux autant que par l’économie', 'Réduire la migration à la seule pauvreté', 'Quartier périphérique'],
  ],
  arts_musique_patrimoine: [
    ['x29-analyse-image', 'Analyse d’image', 'Cadrage, lumière, couleur, symbolique', 'Une image s’analyse par sa composition avant son sujet', 'Décrire sans interpréter', 'Lecture d’une photographie'],
    ['x29-formes-musicales', 'Formes musicales', 'Thème, variation, sonate, polyrythmie', 'La forme musicale organise la répétition et la rupture', 'Confondre rythme et tempo', 'Analyse d’un morceau'],
  ],
  eps_sciences_sport: [
    ['x29-physiologie-effort', 'Filières énergétiques et récupération', 'VO2 max, filières énergétiques, récupération', 'Chaque filière énergétique domine selon l’intensité et la durée', 'Confondre endurance et résistance', 'Course de demi-fond'],
    ['x29-preparation-physique', 'Préparation physique', 'Charge, périodisation, surcompensation, blessure', 'La progression passe par une alternance charge et récupération', 'Enchaîner les séances maximales', 'Préparation d’avant-saison'],
  ],
  genetique_biotech: [
    ['x29-genie-genetique', 'Génie génétique et édition', 'CRISPR, vecteur, transgénèse, biosécurité', 'L’édition ciblée exige un guide spécifique et un contrôle hors cible', 'Modifier sans vérifier les effets hors cible', 'Amélioration d’une variété'],
    ['x29-bio-informatique', 'Bio-informatique', 'Séquençage, alignement, BLAST, phylogénie', 'Un alignement s’interprète avec un score et un seuil', 'Conclure une homologie sur un score faible', 'Analyse d’un génome'],
  ],
  droit_penal_proc: [
    ['x29-procedure-penale', 'Instruction et droits de la défense', 'Garde à vue, instruction, droits de la défense', 'Les droits de la défense s’appliquent dès le début de la procédure', 'Interroger sans informer des droits', 'Enquête préliminaire'],
    ['x29-criminologie', 'Criminologie et profilage', 'Passage à l’acte, victimologie, prévention', 'Le profilage éclaire l’enquête sans la remplacer', 'Confondre profil et preuve', 'Série de cambriolages'],
  ],
  linguistique_oralite: [
    ['x29-linguistique-structurale', 'Phonétique et morphologie', 'Phonèmes, morphèmes, tons, syntaxe', 'Deux sons sont des phonèmes distincts s’ils changent le sens', 'Confondre son et graphie', 'Transcription d’un mot'],
    ['x29-oralite-tradition', 'Oralité et traditions', 'Conte, épopée, griot, transmission', 'Un récit oral se fixe par la performance et la mémoire', 'Traiter l’oral comme un texte écrit', 'Veillée de contes'],
  ],
  electronique_electrotech: [
    ['x29-amplificateurs', 'Amplificateurs et filtres', 'Gain, bande passante, filtres RC, saturation', 'Le gain chute au-delà de la fréquence de coupure', 'Négliger la saturation de l’amplificateur', 'Chaîne audio'],
    ['x29-machines-electriques', 'Machines électriques', 'Alternateur, moteur, couple, rendement', 'Le rendement relie puissance utile et puissance absorbée', 'Confondre puissance mécanique et électrique', 'Moteur triphasé'],
  ],
  architecture_design: [
    ['x29-construction-durable', 'Construction durable', 'Matériaux locaux, inertie, orientation, énergie', 'L’orientation et l’inertie réduisent les besoins énergétiques', 'Climatiser sans traiter l’enveloppe', 'Bâtiment scolaire'],
    ['x29-ergonomie-espace', 'Ergonomie et usages', 'Circulation, accessibilité, lumière, confort', 'Un espace se conçoit à partir des usages observés', 'Dessiner sans relever les usages', 'Réaménagement d’un accueil'],
  ],
  medecine_clinique: [
    ['x29-examen-clinique', 'Examen clinique structuré', 'Interrogatoire, inspection, palpation, auscultation', 'L’hypothèse se confirme par un examen ciblé', 'Prescrire avant d’examiner', 'Douleur abdominale'],
    ['x29-urgences-vitales', 'Urgences vitales', 'ABC, triage, choc, réanimation', 'On traite d’abord la fonction vitale menacée', 'Traiter la douleur avant l’oxygénation', 'Arrêt cardio-respiratoire'],
  ],
  sciences_politiques: [
    ['x29-regimes-politiques', 'Régimes et institutions', 'Séparation des pouvoirs, régime parlementaire, présidentiel', 'Un régime se caractérise par la responsabilité du gouvernement', 'Confondre régime et mode de scrutin', 'Analyse d’une constitution'],
    ['x29-politiques-publiques', 'Politiques publiques', 'Agenda, instruments, évaluation, acteurs', 'Une politique publique s’évalue par ses effets, pas ses annonces', 'Évaluer sans indicateurs', 'Politique de l’eau'],
  ],
  hydrologie_eau_climat: [
    ['x29-traitement-eau', 'Traitement de l’eau potable', 'Filtration, désinfection, turbidité, chlore', 'La désinfection exige une eau préalablement clarifiée', 'Chlorer une eau trop trouble', 'Station de pompage'],
    ['x29-assainissement', 'Assainissement et eaux usées', 'Réseau, fosse, lagunage, boues', 'Les eaux usées se traitent avant tout rejet', 'Rejeter sans traitement', 'Quartier sans réseau'],
  ],
  finance_marches_banque: [
    ['x29-evaluation-entreprise', 'Évaluation d’entreprise', 'DCF, multiples, actif net, prime de risque', 'La valeur actualisée dépend des flux et du taux retenu', 'Actualiser sans justifier le taux', 'Cession d’une PME'],
    ['x29-actuariat', 'Actuariat vie et non-vie', 'Mortalité, tables, provision, sinistralité', 'Une prime couvre le risque et les frais de gestion', 'Calculer une prime sans table de mortalité', 'Assurance obsèques'],
  ],
  genie_mecanique: [
    ['x29-usinage-tolerances', 'Usinage et tolérances', 'Tolérance, ajustement, état de surface, cotation', 'Un ajustement se définit par un jeu ou un serrage calculé', 'Usiner sans vérifier la cote', 'Arbre et palier'],
    ['x29-maintenance-predictive', 'Maintenance prédictive', 'Vibration, thermographie, lubrification, MTBF', 'Une signature vibratoire annonce la panne avant la casse', 'Attendre la panne pour intervenir', 'Pompe industrielle'],
  ],
  thermodynamique_froid: [
    ['x29-climatisation', 'Climatisation et pompes à chaleur', 'Cycle frigorifique, COP, détente, charge', 'Le COP dépend des températures d’évaporation et de condensation', 'Confondre puissance frigorifique et puissance électrique', 'Climatisation d’une salle'],
    ['x29-chaine-froid', 'Chaîne du froid et entreposage', 'Température, isolation, dégivrage, enregistrement', 'La température se contrôle et s’enregistre en continu', 'Se fier à l’affichage seul', 'Chambre froide'],
  ],
  genie_chimique_procedes: [
    ['x29-bilans-matiere', 'Bilans matière et énergie', 'Débit, rendement, recyclage, pertes', 'Ce qui entre égale ce qui sort plus ce qui s’accumule', 'Oublier le recyclage dans le bilan', 'Réacteur pilote'],
    ['x29-securite-procedes', 'Sécurité des procédés', 'HAZOP, pression, emballement, soupape', 'Une réaction exothermique se refroidit et se décharge', 'Supprimer la sécurité pour gagner du temps', 'Réacteur sous pression'],
  ],
  science_materiaux: [
    ['x29-traitements-thermiques', 'Traitements thermiques', 'Trempe, revenu, austénite, dureté', 'La trempe durcit mais fragilise sans revenu', 'Tremper sans revenu ensuite', 'Acier d’outil'],
    ['x29-corrosion', 'Protection cathodique et revêtements', 'Oxydation, pile galvanique, passivation, revêtement', 'Deux métaux différents en contact accélèrent la corrosion', 'Assembler deux métaux sans isolation', 'Structure métallique'],
  ],
  automatique_controle: [
    ['x29-regulation-pid', 'Réglage des boucles de régulation', 'Proportionnel, intégral, dérivé, stabilité', 'L’intégrale annule l’écart statique au prix de l’oscillation', 'Augmenter le gain sans observer l’oscillation', 'Régulation de température'],
    ['x29-automates-supervision', 'Automates et supervision', 'Automate, entrées-sorties, SCADA, sécurité', 'Le programme automate doit rester lisible et testé', 'Modifier en production sans sauvegarde', 'Ligne d’embouteillage'],
  ],
  genie_logiciel_devops: [
    ['x29-tests-qualite', 'Tests et qualité logicielle', 'Tests unitaires, intégration, couverture, revue', 'Un test qui ne peut pas échouer ne prouve rien', 'Mesurer la couverture comme preuve de qualité', 'Correctif de bug'],
    ['x29-conteneurs-ci', 'Conteneurs et CI/CD', 'Image, Dockerfile, pipeline, déploiement', 'Un déploiement reproductible passe par une image versionnée', 'Déployer depuis un poste local', 'Mise en production'],
  ],
  bases_donnees_bigdata: [
    ['x29-modelisation-relationnelle', 'Modélisation et normalisation', 'Clés, dépendances, 3e forme normale, intégrité', 'La normalisation supprime les redondances coûteuses', 'Dupliquer une donnée pour aller plus vite', 'Schéma de facturation'],
    ['x29-entrepots-donnees', 'Entrepôts et flux de données', 'ETL, étoile, partition, qualité', 'Un entrepôt s’alimente par des flux contrôlés et datés', 'Charger sans contrôler la qualité', 'Analyse des ventes'],
  ],
  developpement_mobile_web: [
    ['x29-accessibilite-web', 'Accessibilité et performance web', 'Contraste, ARIA, clavier, temps de chargement', 'Une interface accessible se teste au clavier et au lecteur d’écran', 'Compter sur la couleur seule', 'Formulaire public'],
    ['x29-pwa-hors-ligne', 'Synchronisation et cache applicatif', 'Service worker, cache, IndexedDB, synchronisation', 'Le cache se versionne pour éviter les données périmées', 'Mettre en cache sans invalidation', 'Application terrain'],
  ],
  design_ux_infographie: [
    ['x29-recherche-utilisateur', 'Recherche utilisateur', 'Entretien, test d’utilisabilité, parcours, friction', 'Cinq tests révèlent l’essentiel des blocages majeurs', 'Concevoir sans observer d’utilisateur', 'Refonte d’un parcours'],
    ['x29-charte-graphique', 'Charte graphique et typographie', 'Grille, palette, hiérarchie, lisibilité', 'Une charte fixe les règles pour rendre la production cohérente', 'Multiplier les polices décoratives', 'Identité d’un service'],
  ],
  iot_systemes_embarques: [
    ['x29-protocoles-iot', 'Protocoles IoT', 'MQTT, LoRa, Wi-Fi, passerelle', 'Le protocole se choisit selon la portée et l’énergie', 'Choisir Wi-Fi pour un capteur lointain', 'Réseau de capteurs'],
    ['x29-energie-embarquee', 'Énergie et autonomie', 'Consommation, veille, batterie, solaire', 'L’autonomie se calcule en cycle de veille et de réveil', 'Dimensionner sur la consommation active', 'Station météo autonome'],
  ],
  soins_infirmiers: [
    ['x29-demarche-soins', 'Démarche de soins', 'Recueil, diagnostic infirmier, plan, évaluation', 'Le plan de soins découle d’un diagnostic infirmier explicite', 'Appliquer un protocole sans évaluation', 'Patient diabétique'],
    ['x29-hygiene-hopital', 'Hygiène hospitalière', 'Hygiène des mains, asepsie, isolement, DASRI', 'L’hygiène des mains précède et suit chaque soin', 'Porter des gants à la place du lavage', 'Pose de cathéter'],
  ],
  microbiologie_biomed: [
    ['x29-bacteriologie', 'Bactériologie diagnostique', 'Prélèvement, culture, Gram, antibiogramme', 'Un antibiogramme s’interprète selon les seuils du laboratoire', 'Traiter sans prélèvement', 'Infection post-opératoire'],
    ['x29-parasitologie', 'Parasitologie', 'Cycles, vecteurs, frottis, prophylaxie', 'Le cycle du parasite guide la prévention', 'Traiter sans identification du parasite', 'Paludisme'],
  ],
  chirurgie_traumatologie: [
    ['x29-asepsie-bloc', 'Asepsie au bloc opératoire', 'Champ, gants stériles, temps opératoire, contamination', 'La zone stérile ne se franchit jamais sans contrôle', 'Tourner le dos au champ stérile', 'Préparation d’une intervention'],
    ['x29-fractures-immobilisation', 'Immobilisation et surveillance post-opératoire', 'Déplacement, immobilisation, compression, surveillance', 'Une immobilisation se surveille par la mobilité et la sensibilité distales', 'Serrer sans vérifier la circulation', 'Fracture du poignet'],
  ],
  odontologie_stomato: [
    ['x29-carie-soins', 'Traitement des lésions carieuses', 'Lésion, émail, dentine, restauration', 'La carie se traite avant d’atteindre la pulpe', 'Attendre la douleur pour soigner', 'Restauration d’une molaire'],
    ['x29-parodontie', 'Maladies parodontales et maintenance', 'Gencive, sulcus, déchaussement, détartrage', 'La mobilité dentaire signe une atteinte parodontale avancée', 'Confondre gingivite et parodontite', 'Déchaussement'],
  ],
  sante_mentale_psychiatrie: [
    ['x29-troubles-anxieux', 'Anxiété pathologique et exposition graduée', 'Anxiété, attaque de panique, évitement, TCC', 'L’évitement entretient l’anxiété à long terme', 'Rassurer sans exposer progressivement', 'Crise de panique'],
    ['x29-entretien-clinique', 'Entretien clinique', 'Écoute, alliance, cadre, transfert', 'Le cadre de l’entretien sécurise la parole', 'Interpréter avant d’écouter', 'Première consultation'],
  ],
  droit_fiscal_douanes: [
    ['x29-fiscalite-directe', 'Fiscalité directe', 'Impôt sur le revenu, barème, quotient, retenue', 'Le barème s’applique par tranches, pas au taux marginal global', 'Appliquer le taux marginal à tout le revenu', 'Calcul d’un impôt'],
    ['x29-code-douanier', 'Code des douanes CEMAC', 'Valeur en douane, origine, régimes, contentieux', 'L’origine détermine le régime tarifaire applicable', 'Déclarer sans justificatif d’origine', 'Importation de véhicule'],
  ],
  droit_foncier_environnement: [
    ['x29-titres-fonciers', 'Titres fonciers', 'Immatriculation, cadastre, droits coutumiers, litige', 'Le titre foncier est opposable aux tiers après immatriculation', 'Acheter sur simple acte de vente', 'Conflit de parcelles'],
    ['x29-droit-environnement', 'Droit de l’environnement', 'Étude d’impact, principe pollueur-payeur, autorisation', 'Un projet soumis à étude d’impact ne démarre qu’après autorisation', 'Commencer les travaux avant l’arrêté', 'Carrière de sable'],
  ],
  droit_international_public: [
    ['x29-droit-traites', 'Droit des traités', 'Signature, ratification, réserve, entrée en vigueur', 'Un traité n’engage l’État qu’après ratification', 'Confondre signature et engagement définitif', 'Adhésion à une convention'],
    ['x29-juridictions-internationales', 'Juridictions internationales', 'Compétence, CPI, CIJ, recevabilité', 'La compétence d’une juridiction conditionne tout examen au fond', 'Saisir une juridiction incompétente', 'Contentieux frontalier'],
  ],
  criminologie_securite: [
    ['x29-scene-crime', 'Scène de crime', 'Périmètre, prélèvements, scellés, continuité', 'La scène se protège avant tout prélèvement', 'Déplacer un objet sans le photographier', 'Cambriolage avec effraction'],
    ['x29-enquete-scientifique', 'Enquête scientifique', 'ADN, empreintes, balistique, exploitation', 'Une trace s’exploite par comparaison à une référence', 'Conclure d’une trace unique sans recoupement', 'Identification d’un suspect'],
  ],
  droit_assurances_cima: [
    ['x29-contrat-assurance', 'Contrat d’assurance CIMA', 'Risque, prime, garantie, exclusions, déclaration', 'La déclaration du risque conditionne la garantie', 'Omettre un antécédent au contrat', 'Souscription auto'],
    ['x29-sinistres-indemnisation', 'Sinistres et indemnisation', 'Déclaration, expertise, indemnité, recours', 'Le délai de déclaration du sinistre est impératif', 'Déclarer après le délai contractuel', 'Dégât des eaux'],
  ],
  audit_controle_interne: [
    ['x29-normes-audit', 'Normes d’audit', 'ISA, opinion, seuil de signification, échantillonnage', 'L’auditeur exprime une opinion raisonnable, pas une certitude', 'Certifier sans échantillon représentatif', 'Audit des comptes'],
    ['x29-controle-interne-coso', 'Contrôle interne COSO', 'Environnement, risques, activités de contrôle, pilotage', 'Un contrôle interne se documente et se teste', 'Décrire un contrôle jamais testé', 'Cartographie des risques'],
  ],
  econometrie_prevision: [
    ['x29-series-temporelles', 'Séries temporelles', 'Tendance, saisonnalité, stationnarité, ARIMA', 'Une série non stationnaire se différencie avant modélisation', 'Régression sur deux séries tendancielles', 'Prévision des ventes'],
    ['x29-modeles-panel', 'Modèles à effets', 'Effets fixes, effets aléatoires, endogénéité', 'Les effets fixes contrôlent les caractéristiques non observées stables', 'Ignorer l’hétérogénéité entre pays', 'Données de 10 pays'],
  ],
  economie_developpement: [
    ['x29-mesure-pauvrete', 'Mesure de la pauvreté', 'Seuil, incidence, profondeur, IPM', 'Un seuil de pauvreté se définit par rapport à un panier de référence', 'Comparer des seuils nationaux différents', 'Enquête ménages'],
    ['x29-financement-developpement', 'Aide et financement du développement', 'APD, dette, IDE, conditionnalité', 'L’efficacité de l’aide dépend de la gouvernance locale', 'Compter les engagements au lieu des décaissements', 'Programme sectoriel'],
  ],
  negociation_commerce_b2b: [
    ['x29-prospection', 'Prospection et pipeline', 'Ciblage, qualification, pipeline, relance', 'La qualification évite de poursuivre les mauvaises pistes', 'Prospecter en masse sans ciblage', 'Ouverture d’un marché'],
    ['x29-negociation-achat', 'Négociation acheteur-vendeur', 'BATNA, marge, concession, closing', 'Celui qui connaît son BATNA négocie sans peur', 'Céder sans contrepartie', 'Renouvellement de contrat'],
  ],
  qualite_hse_iso: [
    ['x29-iso-9001', 'Système qualité ISO 9001', 'Processus, client, amélioration continue, audit', 'La norme exige la maîtrise des processus, pas un document unique', 'Écrire des procédures sans les appliquer', 'Certification d’une PME'],
    ['x29-evaluation-risques', 'Évaluation des risques professionnels', 'Danger, exposition, gravité, prévention', 'Le risque s’évalue avant de choisir la protection', 'Distribuer des EPI sans évaluer le risque', 'Atelier de soudure'],
  ],
  portugais_lusophone: [
    ['x29-grammaire-portugaise', 'Grammaire portugaise', 'Conjugaison, subjonctif, pronoms, accord', 'Le portugais du Brésil et celui du Portugal diffèrent à l’oral', 'Mélanger les normes brésilienne et européenne', 'Rédaction d’un courriel'],
    ['x29-civilisation-lusophone', 'Civilisation lusophone', 'PALOP, Brésil, histoire, musique', 'La lusophonie réunit des histoires coloniales différenciées', 'Réduire la lusophonie au Brésil', 'Exposé sur le Mozambique'],
  ],
  chinois_mandarin: [
    ['x29-tons-pinyin', 'Tons et pinyin', 'Quatre tons, neutralisation, transcription', 'Le ton fait partie du mot et non de l’intonation', 'Oublier le ton en prononçant', 'Dialogue de salutation'],
    ['x29-caracteres-radicaux', 'Caractères et radicaux', 'Radical, clé sémantique, ordre des traits', 'Le radical indique souvent le champ sémantique', 'Écrire sans respecter l’ordre des traits', 'Lecture d’une enseigne'],
  ],
  litterature_africaine: [
    ['x29-roman-africain', 'Roman africain', 'Réalisme, oralité, engagement, postcolonial', 'Le roman africain intègre souvent la parole orale dans sa structure', 'Lire sans contexte historique', 'Analyse de « L’Enfant noir »'],
    ['x29-theatre-africain', 'Théâtre africain', 'Rituel, griot, satire, public', 'Le théâtre africain dialogue avec le public et le rituel', 'Réduire le théâtre au texte écrit', 'Représentation villageoise'],
  ],
  archeologie_histoire_afrique: [
    ['x29-methodes-archeo', 'Méthodes archéologiques', 'Fouille, stratigraphie, datation, inventaire', 'La stratigraphie ordonne les couches du plus récent au plus ancien', 'Datation sans contexte stratigraphique', 'Fouille d’un site'],
    ['x29-civilisations-saheliennes', 'Civilisations sahéliennes', 'Djenné, Tombouctou, métallurgie, commerce', 'Les cités sahéliennes prospèrent par le commerce et le savoir', 'Confondre tradition orale et source écrite', 'Manuscrits de Tombouctou'],
  ],
  geographie_amenagement: [
    ['x29-cartographie-thematique', 'Cartographie thématique', 'Échelle, figurés, discrétisation, légende', 'La discrétisation modifie la lecture de la carte', 'Choisir des classes sans justification', 'Carte de la densité'],
    ['x29-amenagement-territoire', 'Aménagement du territoire', 'Pôles, corridors, équipements, concertation', 'L’aménagement arbitre entre équité et efficacité', 'Planifier sans concertation locale', 'Plan régional'],
  ],
  foresterie_biodiversite: [
    ['x29-sylviculture', 'Sylviculture', 'Peuplement, régénération, éclaircie, rotation', 'La régénération conditionne la pérennité du peuplement', 'Couper sans plan de régénération', 'Forêt communautaire'],
    ['x29-aires-protegees', 'Aires protégées', 'Zonage, cogestion, braconnage, suivi', 'Une aire protégée associe les communautés riveraines', 'Interdire sans alternative économique', 'Parc national'],
  ],
  agroalimentaire_transformation: [
    ['x29-conservation-aliments', 'Conservation des aliments', 'Pasteurisation, séchage, fermentation, Aw', 'L’activité de l’eau conditionne le développement microbien', 'Stocker sans contrôle d’humidité', 'Production de farine'],
    ['x29-haccp', 'Normes et HACCP', 'Points critiques, seuils, surveillance, traçabilité', 'Un point critique se définit par un seuil mesurable', 'Contrôler sans enregistrer', 'Unité de jus'],
  ],
  peche_aquaculture: [
    ['x29-pisciculture', 'Pisciculture', 'Étangs, alevins, densité, alimentation', 'La densité de stockage détermine la qualité de l’eau', 'Surdensifier sans oxygénation', 'Élevage de tilapias'],
    ['x29-gestion-peches', 'Gestion des pêches', 'Stock, quota, maille, repos biologique', 'La maille protège les juvéniles et le renouvellement du stock', 'Pêcher sans respecter la maille', 'Pêche artisanale'],
  ],
  audiovisuel_cinema_podcast: [
    ['x29-ecriture-scenario', 'Écriture de scénario', 'Prémisse, acte, conflit, séquence', 'Un scénario se construit sur un conflit et des obstacles', 'Écrire sans conflit dramatique', 'Court-métrage'],
    ['x29-tournage-montage', 'Tournage et montage', 'Plan, raccord, champ-contrechamp, rythme', 'Le montage crée le sens par l’ordre des plans', 'Enchaîner sans raccord de mouvement', 'Documentaire'],
  ],
  trading_marches: [
    ['x29-analyse-technique', 'Analyse technique', 'Support, résistance, tendance, volume', 'Un niveau technique n’a de valeur que confirmé par le volume', 'Tracer des supports après coup', 'Graphique journalier'],
    ['x29-gestion-risque-trading', 'Gestion du risque de marché', 'Taille de position, stop, ratio risque-rendement', 'La taille de position se déduit du risque accepté', 'Trader sans stop défini', 'Position sur devises'],
  ],
  latin_grec: [
    ['x29-declinaisons-latines', 'Déclinaisons latines', 'Cas, fonctions, terminaisons, syntaxe', 'La terminaison indique la fonction du mot', 'Traduire selon l’ordre des mots', 'Version d’un texte'],
    ['x29-heritage-antique', 'Héritage antique', 'Mythologie, politique, rhétorique, théâtre', 'La référence antique éclaire les œuvres modernes', 'Réduire l’Antiquité à la mythologie', 'Étude d’un discours'],
  ],
  technologie_college: [
    ['x29-materiaux-objets', 'Matériaux et objets techniques', 'Propriétés, familles, assemblage, recyclage', 'Le matériau se choisit selon la contrainte et l’usage', 'Choisir un matériau par son aspect seul', 'Fabrication d’un support'],
    ['x29-energie-objets', 'Énergie et fonctionnement', 'Source, conversion, rendement, sécurité', 'Une chaîne d’énergie convertit sans créer d’énergie', 'Confondre puissance et énergie', 'Vélo électrique'],
  ],
  arts_plastiques: [
    ['x29-couleur-composition', 'Couleur et composition', 'Cercle chromatique, contraste, équilibre, format', 'Les couleurs se lisent par contraste et proximité', 'Associer sans penser aux contrastes', 'Affiche peinte'],
    ['x29-pratiques-numeriques', 'Pratiques numériques', 'Bitmap, vectoriel, calques, export', 'Le vectoriel s’adapte sans perte, le bitmap se dégrade', 'Agrandir un bitmap sans conséquence', 'Création d’un logo'],
  ],
  methodes_travail: [
    ['x29-prise-notes', 'Notes structurées et rappel actif', 'Reformulation, abréviations, structure, rappel actif', 'Une note utile est reformulée, pas recopiée', 'Recopier le cours mot à mot', 'Cours de sciences'],
    ['x29-planification-revisions', 'Planification des révisions', 'Objectifs, créneaux, espacement, bilan', 'L’espacement des révisions améliore la rétention', 'Réviser la veille au soir', 'Préparation d’un examen'],
  ],
  sciences_ingenieur: [
    ['x29-chaines-energie-information', 'Chaîne d’énergie et d’information', 'Alimenter, distribuer, convertir, transmettre', 'La chaîne d’information commande la chaîne d’énergie', 'Confondre capteur et actionneur', 'Portail automatique'],
    ['x29-materiaux-structures', 'Matériaux et structures', 'Efforts, triangulation, rigidité, sécurité', 'La triangulation rigidifie une structure', 'Calculer sans coefficient de sécurité', 'Passerelle piétonne'],
  ],
  preparation_bac: [
    ['x29-gestion-temps-epreuve', 'Gestion du temps d’épreuve', 'Lecture, répartition, relecture, marge', 'Le temps de relecture se réserve dès le début', 'Rédiger jusqu’à la dernière minute', 'Épreuve de 4 heures'],
    ['x29-analyse-sujet', 'Analyse du sujet', 'Mots-clés, consigne, limites, problématique', 'Chaque mot du sujet délimite le champ du devoir', 'Traiter un mot du sujet et ignorer les autres', 'Sujet de dissertation'],
  ],
  education_financiere: [
    ['x29-budget-familial', 'Budget familial', 'Revenus, charges fixes, variables, épargne', 'Le budget se construit sur les dépenses réelles, pas estimées', 'Budgéter sans relever les dépenses', 'Ménage urbain'],
    ['x29-epargne-credit', 'Épargne et crédit', 'Taux, intérêts composés, endettement, épargne de précaution', 'Le coût total d’un crédit inclut les intérêts et les frais', 'Comparer les crédits au seul taux affiché', 'Achat à crédit'],
  ],
  entrepreneuriat: [
    ['x29-business-plan', 'Business plan', 'Proposition de valeur, marché, prévisions, risques', 'Un business plan se juge à la cohérence de ses hypothèses', 'Prévoir une croissance sans hypothèse', 'Dossier de financement'],
    ['x29-financement-startup', 'Financement de startup', 'Amorçage, capital, subvention, dilution', 'Chaque tour de table dilue la participation des fondateurs', 'Négocier sans calculer la dilution', 'Levée de fonds'],
  ],
  sciences_forensiques: [
    ['x29-adn-empreintes', 'ADN et empreintes', 'Prélèvement, profilage, comparaison, probabilité', 'Une correspondance ADN s’exprime en probabilité', 'Présenter une correspondance comme une certitude', 'Analyse d’un prélèvement'],
    ['x29-toxicologie-forensique', 'Toxicologie forensique', 'Dosage, métabolites, seuils, matrice', 'Le métabolite peut révéler une prise ancienne', 'Interpréter sans délai de prélèvement', 'Autopsie'],
  ],
  mediation_conflits: [
    ['x29-ecoute-active', 'Écoute active', 'Reformulation, questions ouvertes, empathie', 'Reformuler montre que l’on a compris avant de proposer', 'Proposer une solution avant d’écouter', 'Conflit de voisinage'],
    ['x29-accord-mediation', 'Accord de médiation', 'Intérêts, options, accord écrit, suivi', 'Un accord de médiation n’est solide que s’il est rédigé et suivi', 'Conclure un accord oral non suivi', 'Litige commercial'],
  ],
  langues_nationales: [
    ['x29-orthographe-langues', 'Orthographe et tons', 'Graphie, tons, variantes, normalisation', 'Une langue nationale s’écrit selon une orthographe normalisée', 'Écrire selon la prononciation locale seule', 'Rédaction d’un texte'],
    ['x29-contes-tradition', 'Contes et tradition orale', 'Conte, proverbe, généalogie, performance', 'Le conte se transmet par la performance autant que par le texte', 'Fixer un conte sans noter ses variantes', 'Veillée familiale'],
  ],
  inclusion_handicap: [
    ['x29-amenagements-scolaires', 'Aménagements scolaires', 'PAP, PPS, accessibilité, compensation', 'Un aménagement compense le handicap sans réduire l’exigence', 'Baisser les exigences au lieu d’aménager', 'Élève dyslexique'],
    ['x29-langue-des-signes-base', 'Bases de la langue des signes', 'Configuration, emplacement, mouvement, expression', 'Un signe se compose de paramètres simultanés', 'Signer sans expression du visage', 'Accueil d’un élève sourd'],
  ],
  ia_societe: [
    ['x29-biais-algorithmes', 'Biais algorithmiques', 'Données biaisées, discrimination, audit, transparence', 'Un modèle reproduit les biais de ses données d’entraînement', 'Croire qu’un algorithme est neutre par nature', 'Tri de candidatures'],
    ['x29-ia-emploi', 'IA et transformations du travail', 'Automatisation, tâches, compétences, reconversion', 'L’automatisation transforme des tâches avant de supprimer des emplois', 'Raisonner en métiers entiers plutôt qu’en tâches', 'Service client'],
  ],
  climat_adaptation: [
    ['x29-vulnerabilite-territoires', 'Vulnérabilité des territoires', 'Aléa, exposition, vulnérabilité, résilience', 'Le risque naît de la rencontre entre aléa et vulnérabilité', 'Confondre aléa et risque', 'Quartier inondable'],
    ['x29-adaptation-agricole', 'Itinéraires techniques résilients', 'Variétés, calendrier, eau, diversification', 'L’adaptation joue sur le calendrier et les variétés', 'Conserver un calendrier devenu inadapté', 'Culture pluviale'],
  ],
  economie_circulaire: [
    ['x29-filieres-recyclage', 'Filières de recyclage', 'Collecte, tri, transformation, taux de valorisation', 'La qualité du tri conditionne la valeur de la matière', 'Mélanger les flux et dégrader la matière', 'Collecte de plastiques'],
    ['x29-ecoconception', 'Conception durable des produits', 'Cycle de vie, durabilité, réparabilité, impact', 'L’impact se mesure sur tout le cycle de vie', 'Optimiser une seule étape', 'Emballage réutilisable'],
  ],
  gerontologie: [
    ['x29-vieillissement-physiologique', 'Pertes fonctionnelles liées à l’âge', 'Sarcopénie, ostéoporose, vue, audition', 'Le vieillissement réduit les réserves fonctionnelles', 'Attribuer tout symptôme à l’âge', 'Chute à domicile'],
    ['x29-maintien-domicile', 'Maintien à domicile', 'Autonomie, adaptation du logement, aidants, soins', 'Le maintien à domicile repose sur l’adaptation et l’entourage', 'Maintenir sans aménager le logement', 'Personne isolée'],
  ],
  bibliotheconomie: [
    ['x29-catalogage', 'Catalogage et classification', 'Notice, métadonnées, Dewey, indexation', 'Une notice normalisée rend le document retrouvable', 'Indexer sans vocabulaire contrôlé', 'Fonds documentaire'],
    ['x29-veille-documentaire', 'Veille documentaire', 'Sources, alertes, tri, synthèse', 'La veille se définit par une question et des sources choisies', 'Accumuler sans synthèse', 'Bulletin de veille'],
  ],
  demographie: [
    ['x29-recensement', 'Recensement et sources', 'Recensement, état civil, enquête, projection', 'La qualité d’une projection dépend de la qualité des données de base', 'Projeter sans corriger les sous-déclarations', 'Recensement national'],
    ['x29-transition-demographique', 'Baisse de la fécondité et vieillissement', 'Natalité, mortalité, vieillissement, dividende', 'La transition passe par une baisse conjointe de la mortalité puis de la natalité', 'Confondre croissance et transition', 'Étude d’un pays'],
  ],
  economie_sante: [
    ['x29-financement-soins', 'Financement des soins', 'Assurance, ticket modérateur, pool, risque moral', 'La mutualisation répartit le risque sur une population large', 'Financer sans réguler la demande', 'Assurance maladie'],
    ['x29-evaluation-economique', 'Évaluation économique en santé', 'Coût-efficacité, QALY, perspective, horizon', 'Une évaluation se définit par sa perspective et son horizon', 'Comparer sans même perspective', 'Choix d’un traitement'],
  ],
  esthetique_cosmetologie: [
    ['x29-soins-visage', 'Soins du visage', 'Type de peau, nettoyage, hydratation, protection', 'Un soin se choisit selon le type de peau', 'Appliquer un soin agressif sur peau réactive', 'Protocole de soin'],
    ['x29-hygiene-cosmetique', 'Hygiène et cosmétique', 'Conservation, contamination, allergènes, étiquetage', 'Un cosmétique ouvert se conserve selon sa notice', 'Utiliser un produit périmé', 'Institut de beauté'],
  ],
  securite_privee: [
    ['x29-controle-acces', 'Contrôle d’accès', 'Badge, registre, zones, vérification', 'Le contrôle d’accès exige une vérification et une trace', 'Laisser entrer sans registre', 'Entrée d’un site'],
    ['x29-videosurveillance', 'Exploitation des images de sécurité', 'Caméra, angle mort, conservation, conformité', 'Les images ne valent comme preuve que si la chaîne est respectée', 'Extraire une image sans horodatage', 'Incident de parking'],
  ],
  mobilite_urbaine: [
    ['x29-transports-collectifs', 'Transports collectifs', 'Fréquence, capacité, amplitude, régularité', 'La qualité de service se mesure en régularité et en temps d’attente', 'Augmenter la vitesse sans la fréquence', 'Ligne de bus'],
    ['x29-intermodalite', 'Intermodalité et pôles', 'Correspondance, pôle d’échange, billet unique, rabattement', 'Un pôle d’échange réduit le temps de correspondance', 'Créer des lignes sans pôle', 'Gare routière'],
  ],
  fle_didactique: [
    ['x29-cadre-europeen', 'Cadre européen des langues', 'A1 à C2, descripteurs, compétences', 'Un niveau se définit par des descripteurs observables', 'Évaluer au feeling sans descripteur', 'Test de positionnement'],
    ['x29-activites-communicatives', 'Activités communicatives', 'Compréhension, production, interaction, médiation', 'On apprend une langue en l’utilisant en situation', 'Faire seulement de la grammaire', 'Atelier de conversation'],
  ],
  traduction_professionnelle: [
    ['x29-traduction-juridique', 'Traduction juridique', 'Terminologie, équivalence, fidélité, registre', 'Le terme juridique se traduit par son équivalent du système cible', 'Traduire mot à mot une notion juridique', 'Traduction d’un contrat'],
    ['x29-interpretation', 'Interprétation consécutive', 'Prise de notes, restitution, décalage, fidélité', 'La prise de notes sert la structure du discours', 'Restituer sans noter les articulations', 'Conférence bilingue'],
  ],
  droit_notarial: [
    ['x29-acte-notarie', 'Acte notarié', 'Authenticité, minute, expédition, conservation', 'L’acte notarié fait foi jusqu’à inscription de faux', 'Confondre minute et copie', 'Vente immobilière'],
    ['x29-successions', 'Successions et partage', 'Héritiers, réserve, liquidation, indivision', 'La liquidation précède le partage des biens', 'Partager sans évaluer les biens', 'Succession familiale'],
  ],
  kinesitherapie_reeducation: [
    ['x29-bilan-kine', 'Bilan kinésithérapique', 'Mobilité, force, douleur, objectifs', 'Le bilan fixe des objectifs mesurables avant la rééducation', 'Rééduquer sans bilan initial', 'Entorse de cheville'],
    ['x29-reeducation-membre', 'Rééducation du membre', 'Amplitude, renforcement, proprioception, progression', 'La progression va de la mobilité à la force puis à l’équilibre', 'Forcer la force avant la mobilité', 'Rééducation du genou'],
  ],
  immobilier_transaction: [
    ['x29-estimation-bien', 'Estimation immobilière', 'Comparables, surface, état, marché', 'Une estimation s’appuie sur des ventes comparables récentes', 'Estimer sans comparable', 'Vente d’un appartement'],
    ['x29-mandat-vente', 'Mandat et vente', 'Mandat, exclusivité, diagnostics, compromis', 'Le mandat écrit fixe la commission et sa durée', 'Vendre sans mandat signé', 'Mise en vente'],
  ],
  blockchain_actifs_numeriques: [
    ['x29-consensus', 'Mécanismes de consensus', 'Preuve de travail, preuve d’enjeu, nœuds, finalité', 'Le consensus garantit l’accord sans autorité centrale', 'Confondre consensus et validation juridique', 'Réseau de paiement'],
    ['x29-regulation-crypto', 'Régulation des crypto-actifs', 'KYC, LCB-FT, stablecoins, fiscalité', 'Un actif numérique échangeable relève des obligations LCB-FT', 'Échanger sans vérification d’identité', 'Plateforme d’échange'],
  ],
  orthophonie_langage: [
    ['x29-bilan-orthophonique', 'Bilan orthophonique', 'Langage oral, articulation, compréhension, tests', 'Le bilan compare les performances à une norme d’âge', 'Conclure sans test étalonné', 'Enfant de 5 ans'],
    ['x29-troubles-articulation', 'Troubles de l’articulation', 'Phonème, substitution, omission, rééducation', 'Un trouble articulatoire se décrit par le phonème atteint', 'Corriger sans travailler l’écoute du phonème', 'Zézaiement'],
  ],
  horticulture_paysage: [
    ['x29-palette-vegetale', 'Palette végétale', 'Exposition, sol, rusticité, floraison', 'Une plante se choisit selon le sol et l’exposition', 'Planter sans connaître le sol', 'Massif de fleurs'],
    ['x29-entretien-jardin', 'Entretien des espaces verts', 'Taille, arrosage, paillage, saison', 'La taille se fait selon la période de floraison', 'Tailler une plante en pleine floraison', 'Jardin public'],
  ],
  menuiserie_ebenisterie: [
    ['x29-debit-sechage', 'Débit et séchage du bois', 'Humidité, fil, débit, séchage', 'Un bois trop humide travaille et se déforme', 'Assembler un bois non séché', 'Fabrication d’une table'],
    ['x29-finitions-meuble', 'Finitions et quincaillerie', 'Ponçage, vernis, charnière, réglage', 'La finition se prépare par un ponçage progressif', 'Vernir sans dépoussiérer', 'Porte de placard'],
  ],
  jeu_video_esport: [
    ['x29-game-design-boucles', 'Boucles de game design', 'Boucle, récompense, difficulté, équilibrage', 'Une boucle de jeu doit offrir une récompense à chaque cycle', 'Ajouter du contenu sans boucle claire', 'Prototype de jeu mobile'],
    ['x29-esport-preparation', 'Préparation e-sport', 'Entraînement, analyse vidéo, hygiène de vie, mental', 'L’entraînement se structure par objectifs et débriefing', 'Jouer sans analyser ses parties', 'Équipe en tournoi'],
  ],
  coiffure_barbier: [
    ['x29-coloration', 'Coloration et chimie', 'Base, oxydant, temps de pose, test', 'Le test de mèche permet de prévoir le résultat', 'Appliquer sans test préalable', 'Coloration sur cheveux foncés'],
    ['x29-coupe-brushing', 'Coupe et réalisation', 'Sections, mèches, dégradé, brushing', 'Une coupe se construit par sections nettes', 'Couper sans diviser les sections', 'Coupe longue'],
  ],
  plomberie_sanitaire: [
    ['x29-installation-sanitaire', 'Installation sanitaire', 'Alimentation, évacuation, pente, étanchéité', 'Les évacuations s’installent avec une pente régulière', 'Poser une évacuation à contre-pente', 'Salle de bain'],
    ['x29-recherche-fuite', 'Recherche de fuite', 'Pression, compteur, inspection, réparation', 'Une fuite se localise avant d’être réparée', 'Casser sans localiser', 'Fuite enterrée'],
  ],
  maintenance_automobile: [
    ['x29-moteur-thermique', 'Moteur thermique', 'Admission, compression, combustion, échappement', 'Le cycle à quatre temps ordonne le diagnostic moteur', 'Diagnostiquer sans vérifier la compression', 'Moteur qui démarre mal'],
    ['x29-electricite-auto', 'Électricité automobile', 'Batterie, alternateur, fusibles, capteurs', 'Une panne électrique se mesure avant d’être remplacée', 'Changer des pièces au hasard', 'Voyant batterie'],
  ],
  soudage_chaudronnerie: [
    ['x29-procedes-soudage', 'Procédés de soudage', 'MMA, MIG, TIG, position, pénétration', 'Chaque procédé s’emploie selon l’épaisseur et le métal', 'Souder à l’arc un aluminium fin', 'Assemblage d’acier'],
    ['x29-chaudronnerie-toles', 'Débit et formage des tôles', 'Débit, pliage, rayon, déformation', 'Le pliage respecte un rayon minimal selon l’épaisseur', 'Piler sans respecter le rayon', 'Conduit de ventilation'],
  ],
  apiculture_ruche: [
    ['x29-recolte-miel', 'Récolte et extraction', 'Hausse, désoperculation, extraction, maturité', 'Le miel s’extrait quand les alvéoles sont operculées', 'Récolter un miel non mûr', 'Récolte de saison'],
    ['x29-sante-colonie', 'Santé de la colonie', 'Varroa, nourrissement, essaimage, reine', 'Une colonie se surveille par la ponte et la population', 'Nourrir sans vérifier les réserves', 'Colonie affaiblie'],
  ],
  viticulture_oenologie: [
    ['x29-taille-vigne', 'Taille de la vigne', 'Guyot, cordon, yeux, vigueur', 'La taille règle l’équilibre entre vigueur et récolte', 'Tailler sans tenir compte de la vigueur', 'Parcelle de cépage rouge'],
    ['x29-elevage-vin', 'Élevage et assemblage', 'Fermentation, macération, fût, assemblage', 'L’assemblage équilibre les cépages et les millésimes', 'Assembler sans dégustation', 'Vin de garde'],
  ],
  gemmologie_joaillerie: [
    ['x29-identification-gemmes', 'Contrôle gemmologique d’une pierre', 'Réfraction, densité, inclusions, traitement', 'Une gemme s’identifie par plusieurs mesures croisées', 'Identifier à l’œil seul', 'Contrôle d’un saphir'],
    ['x29-montage-bijou', 'Montage et sertissage', 'Sertissage, griffes, soudure, finition', 'Le sertissage protège la pierre sans la contraindre', 'Sertir sans contrôler l’épaisseur du métal', 'Bague de fiançailles'],
  ],
  protocole_diplomatique: [
    ['x29-visites-officielles', 'Visites officielles', 'Préséance, accueil, drapeaux, programme', 'L’ordre de préséance se fixe avant toute visite', 'Improviser l’ordre d’accueil', 'Visite d’État'],
    ['x29-immunites-diplomatiques', 'Immunités et courtoisie', 'Immunité, valise diplomatique, réciprocité', 'L’immunité protège la fonction et non la personne', 'Confondre immunité et impunité', 'Incident consulaire'],
  ],
};
