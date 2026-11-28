import { ExtensionSubjectModules } from '../extensionV23/types';

/**
 * v32.0 — Deux modules « raisonnement et transfert » inédits par matière
 * (150 matières × 2 modules × 10 étapes), soit 3 000 nouveaux chapitres complets.
 */
export const X32_BOOST_MODULES: ExtensionSubjectModules = {
  maths: [
    ['x32-probabilites-arbres', 'Probabilités et arbres pondérés', 'Événements, probabilité conditionnelle, indépendance, arbre', 'La probabilité d’un chemin est le produit des probabilités rencontrées', 'Additionner les probabilités le long d’un chemin', 'Tirage successif sans remise'],
    ['x32-optimisation-lineaire', 'Optimisation linéaire et contraintes', 'Variables, contraintes, région admissible, optimum', 'L’optimum d’une fonction linéaire se cherche aux sommets de la région admissible', 'Tester un point intérieur au hasard', 'Planification de production'],
  ],
  physique: [
    ['x32-courant-alternatif', 'Courant alternatif et circuits RLC', 'Période, fréquence, impédance, résonance', 'L’impédance combine résistance et réactances', 'Additionner les tensions efficaces sans tenir compte du déphasage', 'Filtrage d’un signal'],
    ['x32-radioactivite-datation', 'Radioactivité et datation', 'Demi-vie, activité, décroissance, carbone 14', 'Après n demi-vies la quantité restante est divisée par deux puissance n', 'Confondre période et demi-vie', 'Datation d’un échantillon'],
  ],
  svt: [
    ['x32-immunite-vaccination', 'Immunité et vaccination', 'Anticorps, mémoire immunitaire, rappel, sérothérapie', 'La mémoire immunitaire explique l’efficacité du rappel vaccinal', 'Confondre sérothérapie et vaccination', 'Campagne de rappel'],
    ['x32-biodiversite-ecosystemes', 'Biodiversité et équilibres écologiques', 'Chaînes alimentaires, niches, perturbations, indicateurs', 'Une espèce clé de voûte conditionne tout l’écosystème', 'Réduire la biodiversité à un simple comptage d’espèces', 'Étude d’une zone humide'],
  ],
  philo: [
    ['x32-verite-croyance', 'Vérité, croyance et opinion', 'Correspondance, cohérence, doute, preuve', 'Une croyance vraie n’est pas encore une connaissance justifiée', 'Confondre opinion et savoir démontré', 'Texte sur la vérité'],
    ['x32-liberte-determinisme', 'Liberté et déterminisme', 'Libre arbitre, nécessité, responsabilité, contingence', 'Être libre suppose de connaître ce qui nous détermine', 'Réduire la liberté à l’absence de contrainte', 'Débat sur la responsabilité'],
  ],
  droit: [
    ['x32-responsabilite-civile', 'Responsabilité civile et réparation', 'Faute, dommage, lien de causalité, indemnisation', 'La réparation suppose un dommage, une faute et un lien de causalité', 'Indemniser sans prouver le lien de causalité', 'Accident de voisinage'],
    ['x32-procedure-juridictionnelle', 'Procédure et organisation judiciaire', 'Juridictions, compétence, instances, voies de recours', 'Une juridiction est compétente selon la matière et le montant', 'Saisir la mauvaise juridiction', 'Assignation en paiement'],
  ],
  culture_gen: [
    ['x32-medias-information', 'Médias, information et désinformation', 'Sources, vérification, ligne éditoriale, algorithmes', 'Une information se vérifie par recoupement de sources', 'Partager une capture d’écran sans source', 'Rumeur virale'],
    ['x32-sport-societe', 'Sport, culture et société', 'Pratiques, institutions, valeurs, économie du sport', 'Le sport reflète et transforme les normes sociales', 'Réduire le sport à la seule performance', 'Organisation de jeux scolaires'],
  ],
  economie: [
    ['x32-inflation-pouvoir-achat', 'Inflation et pouvoir d’achat', 'Indice des prix, panier, salaire réel, indexation', 'Le salaire réel mesure le pouvoir d’achat après inflation', 'Comparer des salaires nominaux sur dix ans', 'Évolution du panier familial'],
    ['x32-marches-concurrence', 'Marchés et structures de concurrence', 'Concurrence pure, monopole, oligopole, barrières', 'La structure du marché conditionne le prix et la quantité', 'Étudier un prix sans regarder l’offre et la demande', 'Marché de la téléphonie'],
  ],
  gestion_projet: [
    ['x32-planification-gantt', 'Planification et diagramme de Gantt', 'Tâches, antériorités, chemin critique, marges', 'Le chemin critique détermine la durée minimale du projet', 'Planifier sans identifier les dépendances', 'Chantier de rénovation'],
    ['x32-budget-projet', 'Budget et suivi des coûts de projet', 'Estimation, provisions, engagements, écart', 'Un budget se suit par l’écart entre prévu et réalisé', 'Suivre les dépenses sans les engagements', 'Projet de fin d’études'],
  ],
  cybersecurite: [
    ['x32-ingenierie-sociale', 'Ingénierie sociale et hameçonnage', 'Prétexte, urgence, leurre, sensibilisation', 'Un message urgent qui réclame un secret est suspect', 'Cliquer sur un lien de connexion inattendu', 'Faux message du service informatique'],
    ['x32-sauvegarde-continuite', 'Sauvegarde et continuité d’activité', 'RPO, RTO, règle 3-2-1, test de restauration', 'Une sauvegarde jamais restaurée n’est pas une sauvegarde', 'Stocker la copie sur le même serveur', 'Rançongiciel sur un service'],
  ],
  francais: [
    ['x32-argumentation-ecrite', 'Argumentation écrite et progression du propos', 'Thèse, arguments, exemples, connecteurs, concession', 'La concession renforce la thèse en anticipant la critique', 'Empiler des exemples sans thèse', 'Texte argumentatif'],
    ['x32-images-sonorites', 'Images et sonorités poétiques', 'Comparaison, métaphore, allitération, assonance', 'Une image se justifie par l’effet qu’elle produit', 'Repérer une figure sans expliquer son effet', 'Étude d’un poème lyrique'],
  ],
  histoire_geo: [
    ['x32-decolonisation', 'Décolonisation et constructions nationales', 'Indépendances, négociations, conflits, héritages', 'Les indépendances combinent négociation et conflit armé', 'Dater toutes les indépendances d’un seul événement', 'Indépendance du Cameroun'],
    ['x32-metropolisation', 'Métropolisation et mutations urbaines', 'Flux, centralité, étalement, inégalités', 'La métropolisation concentre les fonctions de commandement', 'Confondre croissance urbaine et métropolisation', 'Croissance de Douala'],
  ],
  anglais: [
    ['x32-conditionnels', 'Conditionnels et hypothèses', 'Zero, first, second, third conditional, unless', 'Le conditionnel choisi dépend du degré de probabilité', 'Utiliser will après if', 'Exprimer une hypothèse'],
    ['x32-discours-professionnel', 'Discours professionnel et négociation', 'Formules de politesse, reformulation, compromis', 'Reformuler avant de proposer un compromis', 'Négocier sans reformuler la demande', 'Réunion en anglais'],
  ],
  informatique: [
    ['x32-algorithmique-complexite', 'Algorithmique et complexité', 'Boucles, récursion, ordre de grandeur, tests', 'Une boucle imbriquée multiplie le nombre d’opérations', 'Optimiser sans mesurer le temps d’exécution', 'Tri d’une liste'],
    ['x32-systemes-fichiers', 'Systèmes de fichiers et droits', 'Arborescence, chemins, permissions, montage', 'Les droits se lisent par utilisateur, groupe et autres', 'Ouvrir tous les droits pour éviter les erreurs', 'Partage de dossier'],
  ],
  comptabilite: [
    ['x32-inventaire-amortissements', 'Inventaire et amortissements', 'Stocks, dépréciation, plan d’amortissement, TVA', 'L’amortissement répartit le coût sur la durée d’usage', 'Amortir un bien non immobilisé', 'Camionnette acquise'],
    ['x32-etats-financiers', 'États financiers et lecture du bilan', 'Bilan, compte de résultat, annexe, ratios', 'Le bilan photographie le patrimoine à une date donnée', 'Confondre résultat et trésorerie', 'Analyse d’une PME'],
  ],
  chimie_bio: [
    ['x32-enzymes-cinetique', 'Enzymes et cinétique', 'Site actif, affinité, constante de Michaelis, inhibition', 'La vitesse sature quand toutes les enzymes sont occupées', 'Augmenter sans limite la concentration de substrat', 'Dosage enzymatique'],
    ['x32-acides-bases-bio', 'Acides, bases et équilibre acido-basique', 'pH, pKa, solution tampon, régulation', 'Un tampon limite la variation de pH', 'Confondre pH et concentration initiale', 'Analyse d’un prélèvement sanguin'],
  ],
  psychotechnique: [
    ['x32-tests-aptitudes', 'Tests d’aptitudes et raisonnement', 'Séries, matrices, analogies, chronomètre', 'Chercher d’abord la règle de transformation', 'Répondre au hasard sans hypothèse', 'Épreuve de recrutement'],
    ['x32-entretien-motivation', 'Entretien et motivation professionnelle', 'Parcours, argumentation, projet, posture', 'L’exemple concret vaut mieux que l’adjectif', 'Réciter des qualités sans preuve', 'Entretien de concours'],
  ],
  statistiques: [
    ['x32-regression-lineaire', 'Régression linéaire et corrélation', 'Nuage de points, droite des moindres carrés, résidus', 'Une corrélation forte ne prouve pas la causalité', 'Conclure à la causalité sans contrôle', 'Taille et poids'],
    ['x32-sondages-echantillonnage', 'Sondages et échantillonnage', 'Échantillon, marge d’erreur, biais, redressement', 'La marge d’erreur diminue avec la racine de l’effectif', 'Extrapoler un échantillon biaisé', 'Enquête de satisfaction'],
  ],
  pedagogie: [
    ['x32-feedback-efficace', 'Rétroaction et feedback en classe', 'Feedback immédiat, critère, piste de progrès', 'Une rétroaction utile porte sur la tâche et non sur la personne', 'Commenter seulement la note', 'Correction d’un devoir'],
    ['x32-classe-inversee', 'Classe inversée et travail à distance', 'Capsule, activité, tempo, autonomie', 'La capsule prépare l’activité, elle ne la remplace pas', 'Diffuser une vidéo sans activité en classe', 'Séance de sciences'],
  ],
  marketing_entrep: [
    ['x32-etude-marche', 'Étude de marché et demande', 'Échantillon, concurrence, prix, potentiel', 'Le potentiel de marché s’estime par la demande solvable', 'Confondre population totale et marché visé', 'Lancement d’un produit'],
    ['x32-plan-marketing', 'Plan marketing et marketing mix', 'Ciblage, positionnement, quatre P, budget', 'Le positionnement guide les quatre composantes du mix', 'Fixer le prix avant le positionnement', 'Plan de lancement'],
  ],
  educ_civique: [
    ['x32-decentralisation', 'Décentralisation et collectivités', 'Compétences transférées, budget local, tutelle', 'Une collectivité n’exerce que les compétences transférées', 'Confondre déconcentration et décentralisation', 'Conseil régional'],
    ['x32-droits-devoirs-citoyen', 'Droits, devoirs et engagement citoyen', 'Constitution, devoirs, associations, service civique', 'Un droit s’exerce dans les limites fixées par la loi', 'Opposer systématiquement droit et devoir', 'Action associative'],
  ],
  espagnol: [
    ['x32-subjonctif-souhait', 'Subjonctif et expression du souhait', 'Modes, déclencheurs, ojalá, quizás', 'Le subjonctif apparaît après une volonté ou un doute', 'Employer l’indicatif après ojalá', 'Expression d’un souhait'],
    ['x32-voyage-echanges', 'Voyage et échanges culturels', 'Lexique, formules, itinéraire, interculturalité', 'Un échange se prépare avec un vocabulaire de situation', 'Traduire mot à mot les formules de politesse', 'Présenter une ville'],
  ],
  anatomie_physio: [
    ['x32-systeme-nerveux-autonome', 'Système nerveux autonome', 'Sympathique, parasympathique, neurotransmetteurs', 'Les deux branches agissent en opposition coordonnée', 'Attribuer un seul effet au sympathique', 'Réponse au stress'],
    ['x32-thermoregulation', 'Thermorégulation et équilibre hydrique', 'Hypothalamus, sueur, frissons, osmolarité', 'La température centrale se maintient par des boucles de régulation', 'Boire seulement quand la soif devient intense', 'Effort en climat chaud'],
  ],
  sante_publique: [
    ['x32-epidemiologie-indicateurs', 'Épidémiologie et indicateurs de santé', 'Incidence, prévalence, mortalité, taux', 'L’incidence mesure les nouveaux cas sur une période', 'Confondre incidence et prévalence', 'Suivi d’une épidémie'],
    ['x32-promotion-sante', 'Promotion de la santé et prévention', 'Déterminants, dépistage, éducation, plaidoyer', 'Agir sur les déterminants réduit le risque à la source', 'Limiter la prévention au seul dépistage', 'Campagne de prévention'],
  ],
  finances_publiques: [
    ['x32-budget-etat', 'Budget de l’État et loi de finances', 'Recettes, dépenses, équilibre, exécution', 'Le budget est voté puis exécuté selon des règles comptables', 'Confondre déficit et dette', 'Présentation d’un budget'],
    ['x32-fiscalite-impots', 'Fiscalité et systèmes d’imposition', 'Assiette, taux, progressivité, recouvrement', 'La progressivité fait croître le taux avec la base imposable', 'Confondre taux marginal et taux moyen', 'Calcul d’un impôt'],
  ],
  droit_ohada: [
    ['x32-entrepreneur-individuel', 'Entreprise individuelle et statut de l’entrepreneur', 'Patrimoine, immatriculation, responsabilité', 'L’entrepreneur individuel engage son patrimoine personnel', 'Exercer sans immatriculation', 'Création d’un atelier'],
    ['x32-recouvrement-creances', 'Recouvrement des créances et injonction de payer', 'Titre, mise en demeure, procédure, exécution', 'Le recouvrement commence par une preuve de la créance', 'Relancer sans mise en demeure écrite', 'Facture impayée'],
  ],
  data_ia: [
    ['x32-donnees-non-structurees', 'Traitement des données non structurées', 'Texte, image, nettoyage, étiquetage', 'Une donnée non structurée doit être normalisée avant usage', 'Alimenter un modèle avec des textes bruts non nettoyés', 'Analyse d’avis clients'],
    ['x32-biais-donnees', 'Biais et qualité des données', 'Échantillonnage, valeurs manquantes, étiquetage, équité', 'Un biais d’échantillonnage se retrouve dans le modèle', 'Nettoyer les données sans documenter les choix', 'Détection de fraude'],
  ],
  arabe: [
    ['x32-declinaisons-fonctions', 'Déclinaisons et fonctions grammaticales', 'Cas, fonction, marques, ordre des mots', 'La fonction grammaticale commande la marque de cas', 'Traduire sans identifier la fonction du mot', 'Analyse d’une phrase'],
    ['x32-connecteurs-expression', 'Connecteurs et expression écrite', 'Coordination, subordination, enchaînement, style', 'Le connecteur explicite le lien logique entre deux idées', 'Enchaîner les phrases sans lien logique', 'Rédaction d’un paragraphe'],
  ],
  relations_inter: [
    ['x32-diplomatie-economique', 'Diplomatie économique et accords', 'Négociation, accords, coopération, influence', 'Un accord s’appuie sur des intérêts réciproques identifiés', 'Négocier sans cartographier les intérêts', 'Accord commercial bilatéral'],
    ['x32-organisations-internationales', 'Organisations internationales et gouvernance', 'Mandats, résolutions, institutions régionales, vote', 'Un mandat définit ce qu’une organisation peut décider', 'Confondre résolution et traité', 'Sommet régional'],
  ],
  agronomie_env: [
    ['x32-rotation-cultures', 'Rotation des cultures et fertilité', 'Successions, légumineuses, azote, adventices', 'Alterner les familles rompt le cycle des parasites', 'Cultiver la même espèce chaque année', 'Parcelle de maïs'],
    ['x32-irrigation-drainage', 'Irrigation et drainage des sols', 'Besoins en eau, tensiomètre, salinisation', 'Irriguer selon le bilan hydrique du sol', 'Irriguer à date fixe sans mesure', 'Périmètre maraîcher'],
  ],
  energies_renouv: [
    ['x32-stockage-energie', 'Stockage de l’énergie', 'Batteries, hydrogène, rendement, cyclage', 'Le rendement aller-retour compte dans le bilan', 'Comparer des capacités sans rendement', 'Site isolé solaire'],
    ['x32-reseau-intelligent', 'Réseaux électriques intelligents', 'Pointe, effacement, compteur, pilotage', 'L’effacement déplace la consommation hors pointe', 'Raisonner sans profil de charge', 'Gestion d’un quartier'],
  ],
  pharmacologie: [
    ['x32-pharmacovigilance', 'Pharmacovigilance et effets indésirables', 'Notification, imputabilité, gravité, registre', 'Tout effet indésirable grave se notifie', 'Attendre la certitude pour déclarer', 'Réaction cutanée médicamenteuse'],
    ['x32-therapeutique-ciblee', 'Traitements ciblés et biomarqueurs', 'Récepteurs, biomarqueurs, résistance', 'Un traitement ciblé suppose un marqueur identifié', 'Prescrire sans test de marqueur', 'Thérapie ciblée en oncologie'],
  ],
  logistique_ci: [
    ['x32-incoterms-douane', 'Incoterms et formalités douanières', 'Transfert de risque, documents, valeur en douane', 'L’Incoterm fixe le transfert de risque et non la propriété', 'Choisir un Incoterm sans lire la répartition des frais', 'Expédition conteneur'],
    ['x32-stock-securite', 'Stocks de sécurité et réapprovisionnement', 'Demande variable, délai, point de commande', 'Le stock de sécurité couvre la variabilité du délai', 'Commander sans connaître le délai fournisseur', 'Rupture d’un article'],
  ],
  grh_travail: [
    ['x32-recrutement-process', 'Recrutement et évaluation des candidats', 'Fiche de poste, sourcing, entretien, références', 'La fiche de poste précède l’annonce', 'Recruter sans critères définis', 'Poste de technicien'],
    ['x32-dialogue-social', 'Dialogue social et relations professionnelles', 'Délégués, convention collective, négociation', 'La négociation collective produit des accords opposables', 'Négocier sans mandat', 'Négociation salariale'],
  ],
  reseaux_telecoms: [
    ['x32-adressage-ip', 'Adressage IP et découpage en sous-réseaux', 'Masque, CIDR, passerelle, plan d’adressage', 'Le masque détermine la taille du sous-réseau', 'Attribuer la même adresse à deux machines', 'Plan d’adressage d’un site'],
    ['x32-reseaux-mobiles', 'Réseaux mobiles et couverture radio', 'Cellule, fréquence, transfert intercellulaire, capacité', 'La couverture se planifie par cellules et fréquences', 'Ajouter des antennes sans étude de capacité', 'Couverture d’une zone rurale'],
  ],
  genie_civil_btp: [
    ['x32-fondations-sols', 'Fondations et portance des sols', 'Essai de sol, semelle, pieu, tassement', 'Le choix de fondation dépend de la portance mesurée', 'Fonder sans essai géotechnique', 'Bâtiment sur sol argileux'],
    ['x32-planning-chantier', 'Planning et sécurité de chantier', 'Phasage, coactivité, plan de prévention', 'La coactivité impose un plan de prévention', 'Ouvrir deux lots sans coordination', 'Réhabilitation d’un bâtiment'],
  ],
  journalisme_comm: [
    ['x32-enquete-sources', 'Enquête journalistique et sources', 'Recoupement, documents, protection des sources', 'Une affirmation se publie avec sa source vérifiable', 'Publier une source unique anonyme sans recoupement', 'Enquête locale'],
    ['x32-communication-crise', 'Communication de crise', 'Canal, message, temporalité, porte-parole', 'La première prise de parole fixe le cadre', 'Attendre que la crise passe', 'Incident industriel'],
  ],
  nutrition_sante: [
    ['x32-besoins-nutritionnels', 'Besoins nutritionnels par âge', 'Apports, macronutriments, carences, groupes d’aliments', 'Les besoins varient avec l’âge et l’activité', 'Appliquer le même apport à tous', 'Ration d’un adolescent'],
    ['x32-etiquetage-alimentaire', 'Étiquetage et qualité des aliments', 'Liste d’ingrédients, valeurs, additifs, allégations', 'Les ingrédients sont classés par ordre décroissant', 'Lire la valeur énergétique sans tenir compte de la portion', 'Comparaison de deux produits'],
  ],
  tourisme_hotel: [
    ['x32-accueil-hebergement', 'Accueil et gestion de l’hébergement', 'Réservation, surbooking, arrivée, fidélisation', 'Le surbooking se pilote avec un taux d’annulation connu', 'Fermer les ventes sans suivi des annulations', 'Week-end de forte demande'],
    ['x32-tourisme-durable', 'Tourisme durable et territoires', 'Capacité de charge, saisonnalité, retombées locales', 'La capacité de charge limite la fréquentation acceptable', 'Promouvoir sans évaluer la capacité du site', 'Site classé'],
  ],
  methodo_redaction: [
    ['x32-plan-dissertation', 'Plan de dissertation et progression', 'Problématique, thèse, antithèse, dépassement', 'Une problématique se formule en tension entre deux réponses', 'Annoncer un plan sans problématique', 'Sujet sur la liberté'],
    ['x32-citation-source', 'Citation et usage des sources', 'Référence, paraphrase, plagiat, bibliographie', 'Toute idée empruntée se cite avec sa référence', 'Paraphraser sans citer la source', 'Mémoire de licence'],
  ],
  aeronautique_meteo: [
    ['x32-meteo-vol', 'Météorologie appliquée au vol', 'Masse d’air, nuages, vent, givrage', 'Le givrage modifie la portance et la consommation', 'Décoller sans briefing météo', 'Vol régional'],
    ['x32-navigation-aerienne', 'Navigation et instruments de bord', 'Cap, route, dérive, instruments, plan de vol', 'La route réelle intègre la dérive due au vent', 'Confondre cap et route', 'Traversée en montagne'],
  ],
  geologie_mines: [
    ['x32-prospection-miniere', 'Prospection et évaluation de gîte', 'Indices, géochimie, sondages, teneur', 'La teneur s’évalue sur des échantillons représentatifs', 'Estimer une réserve à partir d’un seul sondage', 'Campagne d’exploration'],
    ['x32-exploitation-mine', 'Exploitation minière et réhabilitation', 'Méthodes, stériles, eaux, réhabilitation', 'Le plan de fermeture se prépare avant l’ouverture', 'Différer la réhabilitation du site', 'Site d’orpaillage'],
  ],
  veterinaire_elevage: [
    ['x32-sante-troupeau', 'Santé du troupeau et prophylaxie', 'Biosécurité, vaccination, quarantaine', 'La quarantaine protège le troupeau des introductions', 'Introduire un animal sans isolement', 'Achat d’un bovin'],
    ['x32-alimentation-ration', 'Rations et alimentation animale', 'Besoins, fourrages, concentrés, conversion', 'Une ration s’équilibre entre énergie et azote', 'Augmenter le concentré sans eau disponible', 'Ration de vaches laitières'],
  ],
  fintech_microfinance: [
    ['x32-micro-assurance', 'Micro-assurance et protection des emprunteurs', 'Prime, garantie, sinistre, inclusion', 'Un produit de micro-assurance se cale sur des risques fréquents et faibles', 'Assurer un risque inassurable à ce coût', 'Décès d’un emprunteur'],
    ['x32-paiement-mobile', 'Paiement mobile et inclusion financière', 'Portefeuille, agent, frais, vérification d’identité', 'L’inclusion passe par un réseau d’agents de confiance', 'Ouvrir un compte sans vérification d’identité', 'Transfert en zone rurale'],
  ],
  psychologie_cog: [
    ['x32-memoire-apprentissage', 'Mémoire et stratégies d’apprentissage', 'Encodage, rappel, espacement, récupération', 'Le rappel actif ancre mieux que la relecture', 'Relire passivement en croyant apprendre', 'Révision d’examen'],
    ['x32-biais-cognitifs', 'Biais cognitifs et décision', 'Ancrage, confirmation, disponibilité, cadrage', 'Le cadrage change la décision sans changer le fait', 'Ne chercher que les preuves favorables', 'Choix d’orientation'],
  ],
  ethique_gouvernance: [
    ['x32-conflits-interets', 'Conflits d’intérêts et transparence', 'Déclaration, déport, cadeaux, registre', 'Un élu concerné se retire de la décision', 'Décider sans déclarer un lien d’affaires', 'Attribution d’un marché'],
    ['x32-ethique-numerique', 'Éthique du numérique et données personnelles', 'Consentement, minimisation, finalité, traçabilité', 'Une donnée se collecte pour une finalité déterminée', 'Réutiliser des données sans base légale', 'Application de suivi'],
  ],
  urbanisme_sig: [
    ['x32-cadastre-foncier', 'Cadastre et information foncière', 'Parcelles, limites, titres, mise à jour', 'Une limite non bornée reste contestable', 'Cartographier sans relevé contradictoire', 'Lotissement communal'],
    ['x32-analyse-spatiale', 'Analyse spatiale et aide à la décision', 'Couches, zones tampons, superposition, indicateurs', 'Chaque couche doit partager la même projection', 'Superposer des couches de projections différentes', 'Choix d’un site'],
  ],
  obstetrique_pediatrie: [
    ['x32-suivi-grossesse', 'Suivi de grossesse et dépistage', 'Consultations, échographies, sérologies, signes d’alerte', 'Chaque consultation recherche des signes d’alerte précis', 'Espacer les consultations sans motif', 'Grossesse de 32 semaines'],
    ['x32-nourrisson-alimentation', 'Alimentation et croissance du nourrisson', 'Allaitement, diversification, courbes, carences', 'La diversification commence sans abandonner le lait', 'Introduire plusieurs aliments à la fois', 'Nourrisson de six mois'],
  ],
  commerce_maritime: [
    ['x32-affretement-contrats', 'Contrats d’affrètement et responsabilités', 'Charte-partie, connaissement, avaries', 'Le connaissement vaut titre de transport et preuve de chargement', 'Livrer sans vérifier le connaissement', 'Litige de cargaison'],
    ['x32-ports-logistique', 'Ports et chaîne logistique maritime', 'Terminaux, escales, manutention, délais', 'Le temps de rotation conditionne la capacité du terminal', 'Planifier sans temps d’attente au quai', 'Escales d’un porte-conteneurs'],
  ],
  droit_numerique: [
    ['x32-cybercriminalite-droit', 'Cybercriminalité et qualification pénale', 'Infraction, preuve numérique, compétence, coopération', 'La qualification pénale précède la recherche de la preuve', 'Poursuivre sans qualification précise', 'Escroquerie en ligne'],
    ['x32-contrats-numeriques', 'Contrats et preuve numérique', 'Signature électronique, horodatage, archivage', 'La valeur probante exige une signature fiable', 'Conserver une simple capture d’écran', 'Commande en ligne'],
  ],
  chimie_organique: [
    ['x32-fonctions-reactivite', 'Fonctions et réactivité organique', 'Alcools, acides, amines, substitution, addition', 'La réactivité dépend du groupe fonctionnel et du milieu', 'Mélanger deux réactifs sans contrôler le pH', 'Synthèse d’un ester'],
    ['x32-polymeres-macromolecules', 'Polymères et macromolécules', 'Monomère, chaîne, réticulation, recyclage', 'Les propriétés du polymère dépendent de sa chaîne', 'Confondre polymère et mélange de monomères', 'Fabrication d’un plastique'],
  ],
  gestion_crises: [
    ['x32-cellule-crise', 'Cellule de crise et décisions urgentes', 'Rôles, main courante, arbitrage, communication', 'Une cellule de crise a des rôles écrits et un pilote unique', 'Décider à plusieurs sans pilote désigné', 'Inondation d’un quartier'],
    ['x32-retour-experience', 'Retour d’expérience après incident', 'Chronologie, causes, actions, suivi', 'Le retour d’expérience se fonde sur une chronologie factuelle', 'Chercher un coupable au lieu d’une cause', 'Panne d’un réseau'],
  ],
  technologie_robotique: [
    ['x32-securite-cellule-robotisee', 'Sécurité des cellules robotisées', 'Zone dangereuse, barrière, arrêt, redondance', 'Une cellule robotisée se sécurise par barrières et arrêts contrôlés', 'Neutraliser une barrière pour gagner du temps', 'Cellule de soudage'],
    ['x32-programmation-robot', 'Programmation et trajectoires', 'Points, interpolation, sécurité, cycle', 'Une trajectoire se définit par des points et des vitesses', 'Programmer sans zone de sécurité', 'Robot de palettisation'],
  ],
  allemand: [
    ['x32-declinaisons-cas', 'Déclinaisons et cas allemands', 'Nominatif, accusatif, datif, génitif', 'Le cas dépend de la fonction du mot dans la phrase', 'Choisir l’article d’après le seul genre', 'Analyse d’une phrase'],
    ['x32-verbes-particule', 'Verbes à particule et ordre des mots', 'Préverbe séparable, place du verbe, subordonnée', 'Le préverbe séparable se détache en proposition principale', 'Laisser le préverbe collé au verbe principal', 'Rédaction d’un courriel'],
  ],
  astronomie_spatial: [
    ['x32-mouvements-systeme-solaire', 'Mouvements et lois du système solaire', 'Orbites, lois de Kepler, gravitation, éclipses', 'La troisième loi de Kepler relie période et demi-grand axe', 'Confondre rotation et révolution', 'Observation d’une éclipse'],
    ['x32-telescopes-observation', 'Télescopes et observation du ciel', 'Ouverture, grossissement, turbulence, magnitudes', 'Le pouvoir séparateur croît avec le diamètre', 'Chercher un fort grossissement sans diamètre', 'Observation de Saturne'],
  ],
  sociologie_anthropo: [
    ['x32-methodes-enquete', 'Méthodes d’enquête sociologique', 'Entretien, observation, questionnaire, échantillon', 'La méthode se choisit selon la question posée', 'Généraliser à partir de trois entretiens', 'Enquête de quartier'],
    ['x32-mobilite-sociale', 'Stratification et mobilité sociale', 'Classes, capitaux, reproduction, trajectoires', 'La mobilité se mesure par comparaison de générations', 'Confondre mobilité et simple hausse de revenu', 'Trajectoires familiales'],
  ],
  arts_musique_patrimoine: [
    ['x32-analyse-oeuvre', 'Analyse d’œuvre et lecture formelle', 'Composition, lumière, matière, contexte', 'Une œuvre se lit par sa forme avant son sujet', 'Décrire le sujet sans analyser la forme', 'Commentaire d’une peinture'],
    ['x32-conservation-patrimoine', 'Conservation et valorisation du patrimoine', 'Inventaire, restauration, médiation, risque', 'Toute restauration se documente avant intervention', 'Restaurer sans état des lieux', 'Masque ancien'],
  ],
  eps_sciences_sport: [
    ['x32-recuperation-blessures', 'Récupération et prévention des blessures', 'Sommeil, hydratation, charge, signaux d’alerte', 'La récupération fait partie de l’entraînement', 'Enchaîner les séances sans sommeil suffisant', 'Reprise après claquage'],
    ['x32-biomecanique-sport', 'Biomécanique du geste sportif', 'Leviers, trajectoire, appuis, transfert d’énergie', 'La technique optimise le transfert d’énergie', 'Corriger le geste sans observer la chaîne complète', 'Lancer de poids'],
  ],
  genetique_biotech: [
    ['x32-epigenetique', 'Épigénétique et expression des gènes', 'Méthylation, environnement, expression, transmission', 'L’environnement module l’expression sans changer la séquence', 'Confondre mutation et modification épigénétique', 'Effet du stress sur l’expression'],
    ['x32-biotechnologies-sante', 'Biotechnologies appliquées à la santé', 'Clonage, amplification, vaccins, bioéthique', 'Une technique se choisit selon l’objectif diagnostique', 'Interpréter un test sans connaître sa sensibilité', 'Dépistage néonatal'],
  ],
  droit_penal_proc: [
    ['x32-presomption-innocence', 'Présomption d’innocence et preuve pénale', 'Charge de la preuve, doute, garde à vue, droits', 'Le doute profite à l’accusé', 'Confondre soupçon et preuve', 'Instruction d’une affaire'],
    ['x32-procedure-penale', 'Procédure pénale et voies de recours', 'Enquête, instruction, jugement, appel', 'Chaque phase a un juge et des délais propres', 'Ignorer les délais de recours', 'Appel d’un jugement'],
  ],
  linguistique_oralite: [
    ['x32-transcription-oral', 'Transcription et analyse de l’oral', 'Norme, variante, prosodie, conventions', 'La transcription doit être stable et annotée', 'Transcrire en corrigeant la langue', 'Entretien enregistré'],
    ['x32-langues-contact', 'Contact de langues et emprunts', 'Bilinguisme, alternance codique, emprunt, créole', 'L’emprunt s’intègre selon les règles de la langue d’accueil', 'Voir dans l’emprunt un appauvrissement', 'Français parlé à N’Djamena'],
  ],
  electronique_electrotech: [
    ['x32-machines-electriques', 'Machines électriques et transformateurs', 'Champ, couple, rendement, pertes', 'Le rendement compare puissance utile et puissance absorbée', 'Négliger les pertes fer et cuivre', 'Moteur asynchrone'],
    ['x32-automatismes-industriels', 'Automatismes et logique câblée', 'Capteur, préactionneur, séquence, sécurité', 'Une séquence se décrit par étapes et conditions de transition', 'Câbler sans condition d’arrêt d’urgence', 'Convoyeur automatisé'],
  ],
  architecture_design: [
    ['x32-construction-durable', 'Construction durable et matériaux', 'Isolation, inertie, cycle de vie, orientation', 'L’orientation et l’inertie réduisent les besoins énergétiques', 'Choisir un matériau sans analyse de cycle de vie', 'Maison en climat sahélien'],
    ['x32-espace-public', 'Espaces publics et usages', 'Flux, accessibilité, sécurité, sociabilité', 'Un espace public se conçoit par les usages observés', 'Dessiner sans relevé des flux', 'Place de marché'],
  ],
  medecine_clinique: [
    ['x32-examen-clinique', 'Examen clinique et raisonnement', 'Interrogatoire, inspection, palpation, hypothèses', 'Le raisonnement clinique se construit par hypothèses successives', 'Commander tous les examens sans hypothèse', 'Douleur abdominale'],
    ['x32-maladies-chroniques', 'Suivi des maladies chroniques', 'Observance, éducation, complications, coordination', 'Le suivi repose sur l’éducation du patient', 'Modifier le traitement sans mesurer l’observance', 'Diabète de type 2'],
  ],
  sciences_politiques: [
    ['x32-transitions-politiques', 'Transitions politiques et sortie de crise', 'Négociation, institutions provisoires, élections, mémoire', 'Une transition se consolide par des institutions acceptées', 'Organiser des élections sans registre consensuel', 'Sortie d’une crise politique'],
    ['x32-politiques-publiques', 'Analyse des politiques publiques', 'Problème, instrument, mise en œuvre, évaluation', 'Une politique publique se juge sur ses effets observés', 'Confondre annonce et mise en œuvre', 'Politique de logement'],
  ],
  hydrologie_eau_climat: [
    ['x32-bassin-versant', 'Bassins versants et écoulements', 'Bassin, exutoire, pluie, crue', 'Le bassin versant collecte les eaux vers un exutoire', 'Dimensionner un ouvrage sans débit de crue', 'Crue d’un affluent'],
    ['x32-qualite-eau', 'Qualité de l’eau et traitement', 'Paramètres, turbidité, chloration, normes', 'La potabilité s’évalue sur des paramètres mesurés', 'Juger l’eau à son apparence', 'Station de pompage'],
  ],
  finance_marches_banque: [
    ['x32-risque-credit-bancaire', 'Risque de crédit bancaire', 'Probabilité de défaut, garantie, provision', 'La perte attendue combine défaut, exposition et recouvrement', 'Accorder sans évaluer la capacité de remboursement', 'Dossier de prêt'],
    ['x32-produits-derives', 'Produits dérivés et couverture du risque', 'Forward, option, prime, sous-jacent', 'Une couverture fixe un prix futur contre une prime ou un engagement', 'Spéculer avec un instrument de couverture', 'Couverture d’un exportateur'],
  ],
  genie_mecanique: [
    ['x32-dimensionnement-arbres', 'Dimensionnement des arbres et paliers', 'Charges, couple, fatigue, roulements', 'Un arbre se dimensionne en fatigue, pas seulement en statique', 'Négliger les concentrations de contrainte', 'Arbre de transmission'],
    ['x32-transmission-mouvement', 'Transmission de mouvement et engrenages', 'Rapport, module, rendement, jeu', 'Le rapport de transmission est le rapport des nombres de dents', 'Confondre vitesse et couple', 'Réducteur de vitesse'],
  ],
  thermodynamique_froid: [
    ['x32-cycle-frigorifique', 'Cycle frigorifique et pompe à chaleur', 'Compression, détente, évaporation, coefficient de performance', 'Le coefficient de performance mesure l’efficacité du cycle', 'Confondre chaleur et température', 'Chambre froide'],
    ['x32-isolation-thermique', 'Isolation et déperditions thermiques', 'Résistance, ponts thermiques, humidité', 'Les résistances thermiques s’additionnent en série', 'Isoler sans traiter les ponts thermiques', 'Toiture d’un bâtiment'],
  ],
  genie_chimique_procedes: [
    ['x32-bilans-matiere', 'Bilans de matière et rendement', 'Flux, conversion, sélectivité, recyclage', 'Le bilan de matière se fait sur chaque constituant', 'Confondre conversion et rendement', 'Réacteur de synthèse'],
    ['x32-securite-procedes', 'Sécurité des procédés chimiques', 'Incompatibilités, surpression, détection, consignes', 'Une réaction exothermique se contrôle par le refroidissement', 'Arrêter le refroidissement en cas d’emballement', 'Stockage de solvants'],
  ],
  science_materiaux: [
    ['x32-materiaux-composites', 'Matériaux composites et structures sandwich', 'Fibre, matrice, anisotropie, délaminage', 'Un composite est anisotrope : ses propriétés dépendent de l’orientation', 'Dimensionner un composite comme un métal isotrope', 'Pale d’éolienne'],
    ['x32-corrosion-protection', 'Corrosion et protection des matériaux', 'Oxydation, galvanisation, protection cathodique', 'La protection cathodique sacrifie un métal plus réactif', 'Peindre sur une surface déjà rouillée', 'Structure en bord de mer'],
  ],
  automatique_controle: [
    ['x32-regulation-pid', 'Régulation et correcteur PID', 'Proportionnel, intégral, dérivé, stabilité', 'L’action intégrale annule l’erreur statique', 'Augmenter le gain jusqu’à l’oscillation', 'Régulation de température'],
    ['x32-bus-terrain', 'Bus de terrain et communication industrielle', 'Protocole, maître-esclave, cycle, diagnostic', 'Un bus de terrain impose un maître et un temps de cycle', 'Mélanger deux protocoles sur le même segment', 'Réseau d’automates'],
  ],
  genie_logiciel_devops: [
    ['x32-revue-code', 'Revue de code et dette technique', 'Relecture, conventions, complexité, remboursement', 'La dette technique se mesure et se rembourse par priorité', 'Reporter indéfiniment les corrections', 'Module de facturation'],
    ['x32-integration-continue', 'Intégration et déploiement continus', 'Pipeline, construction, environnement, retour arrière', 'Un déploiement se prépare avec une procédure de retour arrière', 'Déployer sans sauvegarde préalable', 'Mise en production du soir'],
  ],
  bases_donnees_bigdata: [
    ['x32-modelisation-relationnelle', 'Modélisation relationnelle et normalisation', 'Entités, clés, dépendances, formes normales', 'La troisième forme normale supprime les dépendances transitives', 'Dupliquer une donnée pour aller plus vite', 'Base de scolarité'],
    ['x32-index-performance', 'Index et performance des requêtes', 'Plan d’exécution, index, coût, cache', 'Un index accélère la lecture mais ralentit l’écriture', 'Indexer toutes les colonnes sans discernement', 'Requête lente'],
  ],
  developpement_mobile_web: [
    ['x32-accessibilite-web', 'Accessibilité et ergonomie web', 'Contraste, focus, alternative textuelle, clavier', 'Un contenu interactif doit être utilisable au clavier', 'Compter sur la couleur seule pour informer', 'Formulaire d’inscription'],
    ['x32-performance-frontend', 'Performance des interfaces', 'Poids, chargement différé, cache, rendu', 'Le temps perçu compte autant que le temps mesuré', 'Charger toutes les images au démarrage', 'Application hors ligne'],
  ],
  design_ux_infographie: [
    ['x32-tests-utilisateurs', 'Tests utilisateurs et itération', 'Scénario, observation, friction, priorisation', 'Un test observe un utilisateur réel sur une tâche réelle', 'Demander son avis au lieu d’observer', 'Refonte d’un formulaire'],
    ['x32-systeme-design', 'Système de design et cohérence', 'Composants, jetons, états, documentation', 'Un composant documente ses états et ses règles', 'Créer un composant sans état d’erreur', 'Bibliothèque d’interface'],
  ],
  iot_systemes_embarques: [
    ['x32-protocoles-iot', 'Protocoles de communication IoT', 'MQTT, LoRa, Wi-Fi, consommation, portée', 'Le protocole se choisit selon la portée et la consommation', 'Choisir le Wi-Fi pour un capteur autonome éloigné', 'Capteurs agricoles'],
    ['x32-maintenance-objets', 'Maintenance et cycle de vie des objets connectés', 'Parc, mises à jour, obsolescence, remplacement', 'Un parc d’objets se maintient avec un inventaire à jour', 'Déployer sans inventaire des objets', 'Parc de capteurs'],
  ],
  soins_infirmiers: [
    ['x32-hygiene-soins', 'Hygiène et prévention des infections', 'Friction hydro-alcoolique, asepsie, isolement', 'L’hygiène des mains précède et suit chaque soin', 'Enfiler des gants sans hygiène des mains', 'Pose de cathéter'],
    ['x32-transmissions-ciblees', 'Transmissions ciblées et continuité des soins', 'Observation, dossier, cible, relève', 'Une transmission ciblée décrit un problème observé et l’action menée', 'Transmettre une impression sans fait observé', 'Relève de nuit'],
  ],
  microbiologie_biomed: [
    ['x32-identification-bacteries', 'Identification bactérienne', 'Coloration, culture, milieux, antibiogramme', 'L’antibiogramme confirme la sensibilité avant traitement', 'Traiter sans antibiogramme', 'Infection urinaire'],
    ['x32-sterilisation', 'Stérilisation et contrôle d’asepsie', 'Autoclave, indicateurs, conditionnement', 'Un cycle se valide par des indicateurs biologiques', 'Se fier seulement à l’apparence du sachet', 'Instrumentation chirurgicale'],
  ],
  chirurgie_traumatologie: [
    ['x32-luxations-entorses', 'Luxations et entorses', 'Stabilité, réduction, immobilisation, rééducation', 'Une luxation se réduit avant toute immobilisation', 'Masser une articulation luxée', 'Entorse grave de la cheville'],
    ['x32-plaies-sutures', 'Plaies et sutures', 'Nettoyage, détersion, suture, vaccination', 'Une plaie se nettoie avant toute fermeture', 'Suturer une plaie souillée sans détersion', 'Plaie de la main'],
  ],
  odontologie_stomato: [
    ['x32-caries-prevention', 'Carie et prévention bucco-dentaire', 'Plaque, fluor, scellement, alimentation', 'Le scellement des sillons protège les molaires définitives', 'Attendre la douleur pour consulter', 'Enfant de huit ans'],
    ['x32-prothese-dentaire', 'Prothèses et réhabilitation dentaire', 'Empreinte, occlusion, matériaux, entretien', 'L’occlusion se vérifie avant la pose définitive', 'Livrer une prothèse sans contrôle occlusal', 'Couronne définitive'],
  ],
  sante_mentale_psychiatrie: [
    ['x32-entretien-psychiatrique', 'Entretien et évaluation psychiatrique', 'Alliance, écoute, évaluation du risque, orientation', 'L’évaluation du risque suicidaire se fait systématiquement', 'Minimiser une plainte sans l’explorer', 'Consultation d’urgence'],
    ['x32-traitements-psychotropes', 'Psychotropes et observance', 'Classes, effets, interactions, suivi', 'Un psychotrope s’ajuste progressivement sous surveillance', 'Arrêter brutalement un traitement', 'Suivi ambulatoire'],
  ],
  droit_fiscal_douanes: [
    ['x32-controle-fiscal', 'Contrôle fiscal et garanties du contribuable', 'Avis, délais, contradictoire, recours', 'Le contrôle respecte un débat contradictoire', 'Redresser sans motivation écrite', 'Vérification d’une PME'],
    ['x32-dedouanement', 'Dédouanement et régimes douaniers', 'Classement tarifaire, valeur, régimes, transit', 'Le classement tarifaire détermine droits et taxes', 'Déclarer une valeur sous-évaluée', 'Importation de véhicules'],
  ],
  droit_foncier_environnement: [
    ['x32-titres-fonciers', 'Titres fonciers et publicité', 'Immatriculation, mutation, inscription, cadastre', 'Seul le titre publié est opposable aux tiers', 'Acheter sur simple acte sous seing privé', 'Vente d’une parcelle'],
    ['x32-contentieux-environnemental', 'Contentieux environnemental et réparation', 'Préjudice écologique, action, expertise, réparation', 'Le préjudice écologique se répare en nature ou par équivalent', 'Se limiter à une amende sans réparation', 'Pollution d’un cours d’eau'],
  ],
  droit_international_public: [
    ['x32-traites-internationaux', 'Traités et engagements internationaux', 'Négociation, signature, ratification, réserve', 'Un traité n’oblige qu’après ratification', 'Confondre signature et entrée en vigueur', 'Convention régionale'],
    ['x32-immunites-diplomatiques', 'Immunités et relations diplomatiques', 'Immunité, valise diplomatique, courtoisie', 'L’immunité protège la fonction et non l’impunité des actes privés', 'Étendre l’immunité à toute activité', 'Incident consulaire'],
  ],
  criminologie_securite: [
    ['x32-profilage-criminalistique', 'Analyse comportementale et criminalistique', 'Indices, scène, signatures, limites', 'Un profil oriente l’enquête mais ne prouve rien', 'Condamner sur la base d’un profil', 'Série de cambriolages'],
    ['x32-prevention-situations', 'Prévention des situations criminogènes', 'Environnement, éclairage, contrôle d’accès, coopération', 'La prévention agit sur l’occasion plus que sur l’individu', 'Renforcer la surveillance sans traiter le lieu', 'Sécurisation d’un marché'],
  ],
  droit_assurances_cima: [
    ['x32-contrat-assurance', 'Contrat d’assurance et déclaration du risque', 'Prime, garantie, exclusion, déclaration', 'Une fausse déclaration peut entraîner la nullité du contrat', 'Omettre un antécédent médical', 'Souscription automobile'],
    ['x32-sinistre-indemnisation', 'Sinistre et indemnisation', 'Déclaration, expertise, vétusté, recours', 'L’indemnité tient compte de la vétusté et de la franchise', 'Régler sans expertise contradictoire', 'Dégât d’eau'],
  ],
  audit_controle_interne: [
    ['x32-programme-audit', 'Programme d’audit et échantillonnage', 'Risques, seuil, échantillon, documentation', 'L’échantillon se construit à partir des risques identifiés', 'Auditer au hasard sans cartographie des risques', 'Audit des achats'],
    ['x32-recommandations-suivi', 'Recommandations et suivi des plans d’action', 'Constats, recommandation, responsable, échéance', 'Une recommandation est assortie d’un responsable et d’une échéance', 'Rédiger un constat sans preuve', 'Rapport d’audit'],
  ],
  econometrie_prevision: [
    ['x32-modeles-panel', 'Modèles de panel et données longitudinales', 'Effets fixes, effets aléatoires, individus, temps', 'Le modèle de panel exploite la double dimension individu-temps', 'Empiler des coupes sans identifier les individus', 'Suivi de ménages'],
    ['x32-prevision-modeles', 'Prévision et choix de modèle', 'Modèle, erreur, intervalle, validation', 'Un modèle se valide hors échantillon', 'Choisir le modèle qui colle le mieux au passé', 'Prévision de trafic'],
  ],
  economie_developpement: [
    ['x32-aide-developpement', 'Aide au développement et efficacité', 'Aide, conditionnalité, absorption, évaluation', 'L’efficacité de l’aide dépend de la capacité d’absorption', 'Financer sans dispositif de suivi', 'Projet d’hydraulique'],
    ['x32-inegalites-mesure', 'Inégalités et mesure du développement', 'Coefficient de Gini, quintiles, pauvreté multidimensionnelle', 'Un indicateur moyen masque la répartition', 'Juger le développement au seul produit intérieur brut', 'Comparaison de régions'],
  ],
  negociation_commerce_b2b: [
    ['x32-preparation-negociation', 'Préparation d’une négociation', 'Solution de repli, intérêts, marge de manœuvre, scénarios', 'La meilleure solution de repli fixe le seuil d’accord', 'Négocier sans connaître sa solution de repli', 'Contrat de fourniture'],
    ['x32-clauses-contrat', 'Clauses essentielles d’un contrat commercial', 'Livraison, pénalités, résiliation, force majeure', 'Une clause s’écrit avec un critère mesurable', 'Signer sans clause de résiliation', 'Contrat annuel'],
  ],
  qualite_hse_iso: [
    ['x32-analyse-risques-hse', 'Analyse des risques professionnels', 'Dangers, gravité, fréquence, prévention', 'Le risque se hiérarchise par gravité et fréquence', 'Traiter d’abord les risques les plus visibles', 'Atelier de soudure'],
    ['x32-audit-iso', 'Audit de système qualité', 'Référentiel, preuve, non-conformité, action corrective', 'Une non-conformité s’appuie sur une preuve enregistrée', 'Déclarer conforme sans enregistrement', 'Audit ISO 9001'],
  ],
  portugais_lusophone: [
    ['x32-subjonctif-portugais', 'Subjonctif au Portugal et au Brésil', 'Indicatif, subjonctif, futur du subjonctif', 'Le futur du subjonctif apparaît dans les subordonnées temporelles', 'Employer l’indicatif après quando au futur', 'Expression d’une condition'],
    ['x32-litterature-lusophone', 'Littérature lusophone et contextes', 'Mouvements, auteurs, oralité, engagement', 'Une œuvre se situe dans son contexte historique', 'Lire une œuvre sans son contexte colonial', 'Commentaire d’un poème'],
  ],
  chinois_mandarin: [
    ['x32-tons-prononciation', 'Tons et prononciation', 'Quatre tons, pinyin, paires minimales', 'Le ton fait partie du mot et non de l’intonation', 'Ignorer les tons à l’écrit', 'Exercice de paires minimales'],
    ['x32-phrase-chinoise', 'Construction de la phrase chinoise', 'Ordre sujet-verbe-objet, aspects, particules', 'L’aspect du verbe se marque par des particules', 'Traduire les temps français mot à mot', 'Rédaction d’un message'],
  ],
  litterature_africaine: [
    ['x32-roman-engagement', 'Roman africain et engagement', 'Colonialisme, indépendance, mémoire, narration', 'L’engagement se lit dans les choix narratifs autant que dans le propos', 'Réduire l’œuvre à son seul message', 'Commentaire d’un roman'],
    ['x32-oralite-ecriture', 'Oralité et écriture littéraire', 'Conte, griot, rythme, intertextualité', 'L’oralité structure le récit écrit', 'Ignorer les marques de l’oral dans le texte', 'Analyse d’un conte'],
  ],
  archeologie_histoire_afrique: [
    ['x32-fouilles-stratigraphie', 'Fouilles et stratigraphie', 'Couches, carroyage, prélèvement, datation', 'La position stratigraphique situe un objet par rapport aux autres', 'Sortir un objet sans noter sa couche', 'Site d’habitat'],
    ['x32-arts-rupestres', 'Arts rupestres et patrimoine', 'Peintures, gravures, contexte, conservation', 'Une œuvre rupestre s’étudie dans son paysage', 'Photographier sans relevé', 'Abri du Sahara'],
  ],
  geographie_amenagement: [
    ['x32-amenagement-territoire', 'Aménagement du territoire et équilibres', 'Pôles, axes, maillage, services', 'L’aménagement vise l’équité d’accès aux services', 'Concentrer les équipements sans réseau de transport', 'Schéma régional'],
    ['x32-risques-naturels', 'Risques naturels et planification', 'Aléa, vulnérabilité, prévention, cartographie', 'Le risque résulte de la rencontre entre aléa et vulnérabilité', 'Confondre aléa et risque', 'Zone inondable'],
  ],
  foresterie_biodiversite: [
    ['x32-inventaire-forestier', 'Inventaire forestier et gestion durable', 'Placettes, diamètre, régénération, prélèvement', 'Le prélèvement admissible se calcule sur l’accroissement', 'Couper sans inventaire préalable', 'Forêt communautaire'],
    ['x32-filiere-bois', 'Filière bois et valorisation', 'Sciage, séchage, classement, traçabilité', 'Le séchage conditionne la stabilité du bois', 'Vendre du bois vert pour la menuiserie', 'Scierie locale'],
  ],
  agroalimentaire_transformation: [
    ['x32-conservation-produits-agro', 'Conservation des produits transformés', 'Barème, pH, activité de l’eau, emballage', 'La stérilisation dépend du pH et du barème appliqué', 'Refermer un bocal sans traitement thermique', 'Confiture artisanale'],
    ['x32-controle-qualite-agro', 'Contrôle qualité en agroalimentaire', 'Prélèvement, analyse, traçabilité, non-conformité', 'Un lot non conforme se bloque et se trace', 'Remettre un lot non conforme en production', 'Lot de farine'],
  ],
  peche_aquaculture: [
    ['x32-aquaculture-elevage', 'Élevage aquacole et qualité de l’eau', 'Bassin, oxygène, densité, alimentation', 'L’oxygène dissous conditionne la survie du stock', 'Surdensifier sans aération', 'Élevage de tilapias'],
    ['x32-conservation-poisson', 'Conservation et valorisation du poisson', 'Chaîne du froid, fumage, salage, traçabilité', 'La chaîne du froid ne se rompt jamais', 'Fumer sans contrôle de température', 'Pêche artisanale'],
  ],
  audiovisuel_cinema_podcast: [
    ['x32-ecriture-scenario', 'Écriture de scénario et structure', 'Prémisse, actes, conflit, séquence', 'Chaque scène change la situation du personnage', 'Écrire une scène qui ne fait pas avancer l’action', 'Court-métrage'],
    ['x32-ecriture-documentaire', 'Écriture documentaire et voix off', 'Angle, personnage, archive, narration', 'Un documentaire se construit sur un angle et un point de vue', 'Empiler des images sans propos', 'Documentaire de quartier'],
  ],
  trading_marches: [
    ['x32-gestion-risque-trading', 'Gestion du risque et taille de position', 'Stop, risque par opération, effet de levier, perte maximale', 'La taille de position découle du risque accepté', 'Doubler la position après une perte', 'Plan de trading'],
    ['x32-analyse-fondamentale-marches', 'Analyse fondamentale des marchés', 'Taux, inflation, résultats, annonces', 'Une annonce se lit par rapport aux attentes', 'Réagir au chiffre publié sans la prévision', 'Décision avant une annonce'],
  ],
  latin_grec: [
    ['x32-version-latine', 'Version latine et méthode de traduction', 'Déclinaisons, syntaxe, repérage du verbe', 'On repère le verbe et le sujet avant de traduire', 'Traduire mot à mot dans l’ordre latin', 'Extrait de César'],
    ['x32-heritage-antique', 'Héritage antique et vocabulaire savant', 'Racines grecques et latines, étymologie', 'La racine éclaire le sens du terme scientifique', 'Deviner un mot sans vérifier sa racine', 'Vocabulaire médical'],
  ],
  technologie_college: [
    ['x32-objets-techniques', 'Objets techniques et fonctions', 'Besoin, fonction, solution, matériaux', 'Un objet technique répond à une fonction identifiée', 'Décrire l’objet sans sa fonction', 'Analyse d’un vélo'],
    ['x32-chaine-energie', 'Énergie et chaîne d’énergie', 'Source, conversion, transmission, pertes', 'La chaîne d’énergie relie source, conversion et action', 'Ignorer les pertes dans le bilan', 'Trottinette électrique'],
  ],
  arts_plastiques: [
    ['x32-couleur-matiere', 'Couleur, matière et texture', 'Mélanges, saturation, matière, support', 'La matière modifie la perception de la couleur', 'Mélanger sans noter les proportions', 'Composition peinte'],
    ['x32-perspective-espace', 'Perspective et construction de l’espace', 'Ligne d’horizon, fuyantes, échelle, ombre', 'Les fuyantes convergent vers la ligne d’horizon', 'Placer la ligne d’horizon au hasard', 'Dessin d’architecture'],
  ],
  methodes_travail: [
    ['x32-concentration-attention', 'Concentration et gestion de l’attention', 'Sessions courtes, distractions, pauses, environnement', 'L’attention se travaille par sessions courtes et sans interruption', 'Réviser en consultant son téléphone', 'Session de travail de deux heures'],
    ['x32-fiches-memo', 'Fiches mémo et cartes de révision', 'Recto-verso, question, réponse, répétition', 'Une fiche mémo pose une question et non un résumé', 'Recopier le cours sur une fiche', 'Révision d’un chapitre'],
  ],
  sciences_ingenieur: [
    ['x32-cahier-charges', 'Cahier des charges et conception', 'Fonctions, contraintes, critères, validation', 'Chaque exigence se traduit par un critère vérifiable', 'Concevoir sans exigences écrites', 'Conception d’un support'],
    ['x32-cinematique-mecanismes', 'Cinématique des mécanismes', 'Trajectoire, vitesse, liaison, degrés de liberté', 'Une liaison supprime certains degrés de liberté', 'Confondre rotation et translation', 'Bras de robot'],
  ],
  preparation_bac: [
    ['x32-stress-examen', 'Gestion du stress le jour de l’épreuve', 'Respiration, sommeil, préparation matérielle, discours interne', 'La préparation matérielle réduit une source évitable de stress', 'Réviser toute la nuit précédente', 'Jour du baccalauréat'],
    ['x32-analyse-sujet', 'Analyse du sujet et critères', 'Mots-clés, consigne, limites, plan', 'Chaque mot du sujet délimite le contenu attendu', 'Répondre à côté du sujet faute de l’avoir analysé', 'Sujet de dissertation'],
  ],
  education_financiere: [
    ['x32-epargne-placement', 'Épargne et premiers placements', 'Objectif, horizon, risque, liquidité', 'L’horizon de placement détermine le risque acceptable', 'Placer à court terme dans un actif risqué', 'Épargne pour les études'],
    ['x32-credit-endettement', 'Crédit et maîtrise de l’endettement', 'Taux, mensualité, taux d’endettement, assurance', 'Le coût total inclut les frais et l’assurance', 'Comparer les seules mensualités', 'Crédit moto'],
  ],
  entrepreneuriat: [
    ['x32-modele-economique', 'Modèle économique et viabilité', 'Proposition de valeur, revenus, coûts, seuil', 'Le seuil de rentabilité fixe le volume minimal', 'Lancer sans calcul de marge', 'Petite entreprise de services'],
    ['x32-pitch-financement', 'Pitch et recherche de financement', 'Problème, solution, marché, demande, chiffres', 'Un pitch convainc par la preuve d’usage', 'Promettre sans chiffres vérifiables', 'Concours de jeunes entreprises'],
  ],
  sciences_forensiques: [
    ['x32-adn-identification', 'ADN et identification génétique', 'Prélèvement, profil, comparaison, probabilité', 'Un profil se compare à une population de référence', 'Confondre identité et certitude absolue', 'Affaire non élucidée'],
    ['x32-toxicologie-analyse', 'Toxicologie et analyses chimiques', 'Prélèvements, chaîne de conservation, seuils', 'La chaîne de conservation garantit la valeur de l’analyse', 'Analyser un prélèvement mal conservé', 'Analyse sanguine'],
  ],
  mediation_conflits: [
    ['x32-ecoute-active', 'Écoute active et reformulation', 'Faits, émotions, besoins, reformulation', 'Reformuler les besoins cachés derrière les positions', 'Négocier sur les seules positions', 'Conflit de voisinage'],
    ['x32-accord-mediation', 'Accord de médiation et durabilité', 'Points d’accord, garanties, suivi, rédaction', 'Un accord se rédige avec des engagements vérifiables', 'Conclure un accord sans écrit', 'Médiation scolaire'],
  ],
  langues_nationales: [
    ['x32-orthographe-transcription', 'Orthographe et transcription des langues nationales', 'Alphabet, tons, conventions, variantes', 'La transcription suit une convention stable', 'Transcrire selon l’oreille du moment', 'Texte en langue locale'],
    ['x32-traduction-culturelle', 'Traduction et équivalence culturelle', 'Proverbes, images, registres, adaptation', 'Un proverbe se transpose au lieu de se traduire mot à mot', 'Traduire littéralement une image', 'Proverbe et morale'],
  ],
  inclusion_handicap: [
    ['x32-accessibilite-batiment', 'Accessibilité des bâtiments', 'Cheminement, pente, largeur, signalétique', 'Un cheminement accessible est continu et sans obstacle', 'Réussir l’entrée mais pas les sanitaires', 'École inclusive'],
    ['x32-accompagnement-scolaire', 'Accompagnement scolaire et adaptations', 'Projet, aménagements, évaluation, équipe', 'Un aménagement se décide dans un projet écrit', 'Improviser l’aménagement le jour de l’examen', 'Élève dyslexique'],
  ],
  ia_societe: [
    ['x32-ia-transparence', 'Transparence et explicabilité des systèmes d’IA', 'Modèle opaque, documentation, recours humain', 'Une décision automatisée doit pouvoir être contestée', 'Automatiser une décision sans voie de recours', 'Attribution d’une aide sociale'],
    ['x32-ia-travail', 'IA et transformation du travail', 'Automatisation, tâches, compétences, accompagnement', 'L’automatisation modifie les tâches plus qu’elle ne supprime les métiers', 'Remplacer un poste sans analyse des tâches', 'Guichet automatisé'],
  ],
  climat_adaptation: [
    ['x32-adaptation-villes', 'Adaptation des villes au climat', 'Îlot de chaleur, végétalisation, eau, ombrage', 'La végétalisation réduit l’îlot de chaleur', 'Minéraliser sans prévoir d’ombrage', 'Quartier en zone sahélienne'],
    ['x32-adaptation-agriculture', 'Adaptation de l’agriculture au climat', 'Variétés précoces, calendrier, eau, assurance', 'Le calendrier cultural s’ajuste aux prévisions saisonnières', 'Conserver le même calendrier malgré le déficit pluviométrique', 'Campagne agricole'],
  ],
  economie_circulaire: [
    ['x32-filiere-reemploi', 'Filières de réemploi et réparation', 'Collecte, tri, réparation, garantie', 'Le réemploi exige une filière de collecte organisée', 'Réparer sans disponibilité des pièces', 'Atelier de réparation'],
    ['x32-ecoconception', 'Écoconception des produits', 'Durée de vie, réparabilité, matériaux, fin de vie', 'La réparabilité se conçoit dès la conception', 'Coller un composant qui devrait être démontable', 'Électroménager'],
  ],
  gerontologie: [
    ['x32-autonomie-personne-agee', 'Autonomie et prévention de la perte d’autonomie', 'Mobilité, nutrition, lien social, chutes', 'La prévention des chutes combine activité et aménagement', 'Restreindre toute activité au nom de la prudence', 'Personne de 82 ans'],
    ['x32-accompagnement-familles', 'Accompagnement des familles et des aidants', 'Aidant, répit, coordination, deuil', 'L’aidant a lui-même besoin de répit et de formation', 'Ignorer l’épuisement de l’aidant', 'Maintien à domicile'],
  ],
  bibliotheconomie: [
    ['x32-catalogage-indexation', 'Catalogage et indexation', 'Notice, métadonnées, thésaurus, cote', 'Une notice décrit le document selon une norme', 'Classer sans vocabulaire contrôlé', 'Fonds documentaire'],
    ['x32-service-public-lecture', 'Service public de la lecture', 'Accueil, médiation, publics empêchés, politique', 'La médiation va vers les publics qui ne viennent pas', 'Attendre le public sans aller vers lui', 'Bibliothèque de quartier'],
  ],
  demographie: [
    ['x32-analyse-pyramide', 'Analyse de la pyramide des âges', 'Classes d’âge, sex-ratio, vieillissement, migrations', 'La pyramide révèle l’histoire démographique du pays', 'Lire une pyramide sans échelle', 'Recensement national'],
    ['x32-migrations-analyse', 'Migrations et mobilités', 'Solde migratoire, motifs, trajectoires, intégration', 'Le solde migratoire se distingue des flux bruts', 'Confondre arrivées et solde migratoire', 'Recensement des villes'],
  ],
  economie_sante: [
    ['x32-financement-soins', 'Financement des systèmes de soins', 'Assurance, ticket modérateur, mutualisation, risque moral', 'La mutualisation répartit le coût des maladies graves', 'Financer uniquement par paiement direct', 'Mutuelle de santé'],
    ['x32-evaluation-economique-soins', 'Évaluation économique des soins', 'Coût-efficacité, qualité de vie, seuil', 'L’évaluation compare coûts et résultats avec un comparateur', 'Comparer un traitement à l’absence de traitement', 'Nouveau protocole'],
  ],
  esthetique_cosmetologie: [
    ['x32-diagnostic-peau', 'Diagnostic de peau et soins adaptés', 'Type de peau, sensibilité, actifs, contre-indications', 'Un soin se choisit après diagnostic et test de tolérance', 'Appliquer un actif fort sans test', 'Peau réactive'],
    ['x32-hygiene-instruments', 'Hygiène et stérilisation en institut', 'Désinfection, matériel, protocole, traçabilité', 'Le matériel réutilisable se désinfecte selon un protocole écrit', 'Ranger le matériel sans désinfection', 'Poste de manucure'],
  ],
  securite_privee: [
    ['x32-gestion-incidents', 'Gestion des incidents et alerte', 'Détection, qualification, alerte, main courante', 'Une alerte se transmet selon une chaîne définie', 'Attendre la fin de l’incident pour alerter', 'Intrusion nocturne'],
    ['x32-ronde-surveillance', 'Rondes et surveillance active', 'Itinéraire, horodatage, anomalie, main courante', 'Une ronde se trace et s’horodate', 'Effectuer une ronde non enregistrée', 'Site logistique'],
  ],
  mobilite_urbaine: [
    ['x32-transport-collectif', 'Organisation du transport collectif', 'Ligne, fréquence, correspondance, amplitude', 'La fréquence détermine l’attractivité de la ligne', 'Dessiner une ligne sans estimation de demande', 'Réseau de bus'],
    ['x32-modes-actifs', 'Modes actifs et partage de la voirie', 'Marche, vélo, sécurité, stationnement', 'Un aménagement cyclable se juge par sa continuité', 'Peindre une bande sans continuité', 'Boulevard urbain'],
  ],
  fle_didactique: [
    ['x32-sequence-fle', 'Séquence de français langue étrangère', 'Objectif communicatif, tâche, support, évaluation', 'Une séquence se construit autour d’une tâche communicative', 'Enchaîner des exercices sans objectif', 'Cours de niveau A2'],
    ['x32-evaluation-fle', 'Évaluation en langue étrangère', 'Niveaux, descripteurs, grille, remédiation', 'Un niveau s’évalue par des descripteurs observables', 'Noter à l’impression', 'Test de positionnement'],
  ],
  traduction_professionnelle: [
    ['x32-traduction-specialisee', 'Traduction spécialisée et terminologie', 'Termes, corpus, équivalence, révision', 'Le terme se vérifie dans un corpus de référence', 'Inventer un terme technique', 'Notice médicale'],
    ['x32-localisation-logiciels', 'Localisation et adaptation culturelle', 'Chaînes, formats, contexte, raccourcis', 'Une traduction respecte la longueur de l’interface', 'Traduire sans contexte d’écran', 'Application mobile'],
  ],
  droit_notarial: [
    ['x32-succession-partage', 'Succession et partage', 'Héritiers, réserve, liquidation, acte de partage', 'Le partage suppose la liquidation préalable des dettes', 'Partager sans inventaire préalable', 'Succession familiale'],
    ['x32-vente-immobiliere-notariee', 'Vente immobilière et sécurité de l’acte', 'Compromis, purge des droits, publicité foncière, fonds', 'La vente n’est opposable aux tiers qu’après publicité foncière', 'Remettre les clés avant publication', 'Achat d’un terrain'],
  ],
  kinesitherapie_reeducation: [
    ['x32-reeducation-epaule', 'Rééducation de l’épaule', 'Amplitude, coiffe des rotateurs, douleur, progression', 'La rééducation de l’épaule respecte la phase de cicatrisation', 'Mobiliser fortement une épaule opérée récente', 'Tendinopathie de l’épaule'],
    ['x32-reeducation-postoperatoire', 'Rééducation postopératoire', 'Protocole, délais, appui, progression', 'La progression respecte les délais de cicatrisation', 'Forcer l’appui avant l’autorisation', 'Prothèse de genou'],
  ],
  immobilier_transaction: [
    ['x32-estimation-bien', 'Estimation d’un bien immobilier', 'Comparables, surface, état, marché', 'Une estimation s’appuie sur des ventes comparables récentes', 'Estimer au prix souhaité par le vendeur', 'Appartement en centre-ville'],
    ['x32-mandat-vente', 'Mandat et commercialisation', 'Mandat, exclusivité, diagnostics, visites', 'Le mandat fixe la rémunération et sa durée', 'Commercialiser un bien sans mandat écrit', 'Maison à vendre'],
  ],
  blockchain_actifs_numeriques: [
    ['x32-portefeuille-cles', 'Portefeuille et gestion des clés', 'Clé privée, portefeuille, sauvegarde, signature', 'La clé privée donne le contrôle définitif des actifs', 'Stocker la clé privée en ligne en clair', 'Perte d’un portefeuille'],
    ['x32-contrats-intelligents', 'Contrats intelligents et audit', 'Code, conditions, coût de calcul, audit', 'Un contrat déployé est difficilement modifiable', 'Déployer un contrat sans audit', 'Vente automatique'],
  ],
  orthophonie_langage: [
    ['x32-langage-ecrit', 'Langage écrit et troubles associés', 'Lecture, orthographe, conscience phonologique, compensation', 'Le trouble du langage écrit s’évalue par des épreuves croisées', 'Confondre retard et trouble durable', 'Élève de huit ans'],
    ['x32-troubles-articulation', 'Troubles de l’articulation et rééducation', 'Phonèmes, praxies, discrimination, transfert', 'La rééducation part des sons déjà maîtrisés', 'Travailler un son isolé sans transfert', 'Trouble du « r »'],
  ],
  horticulture_paysage: [
    ['x32-creation-massif', 'Création d’un massif et palette végétale', 'Exposition, sol, arrosage, strates', 'La palette végétale se choisit selon le sol et l’exposition', 'Planter sans connaître le pH du sol', 'Massif d’entrée'],
    ['x32-arrosage-econome', 'Arrosage économe et paillage', 'Besoin en eau, paillage, goutte-à-goutte, horaire', 'Le paillage réduit l’évaporation et l’arrosage', 'Arroser en plein soleil sans paillage', 'Massif en saison sèche'],
  ],
  menuiserie_ebenisterie: [
    ['x32-assemblages-bois', 'Assemblages et quincaillerie', 'Tenon, mortaise, lamelle, vis', 'Un assemblage se choisit selon le sens de l’effort', 'Visser dans le fil du bois sans avant-trou', 'Table en chêne'],
    ['x32-finition-bois', 'Finition et protection du bois', 'Ponçage, teinte, vernis, huile', 'Le ponçage progressif prépare l’accroche de la finition', 'Vernir sans dépoussiérer', 'Meuble verni'],
  ],
  jeu_video_esport: [
    ['x32-equilibrage-gameplay', 'Équilibrage du gameplay', 'Règles, courbe de difficulté, retour au joueur, tests', 'L’équilibrage se règle par des tests de joueurs', 'Équilibrer à la seule intuition', 'Niveau avancé'],
    ['x32-production-jeu', 'Production d’un jeu et planning', 'Prototype, jalons, équipe, portage', 'Un jeu se produit par prototypes successifs', 'Développer le contenu avant le prototype', 'Jeu mobile'],
  ],
  coiffure_barbier: [
    ['x32-coloration-technique', 'Coloration et technique', 'Décapage, oxydant, reflets, test de tolérance', 'Le test de mèche précède toute coloration complète', 'Appliquer une coloration sans test de tolérance', 'Cliente aux cheveux colorés'],
    ['x32-barbe-rasage', 'Barbe et rasage professionnel', 'Contours, sens du poil, rasage, soins', 'Le rasage se fait dans le sens du poil avant le contre-poil', 'Raser à sec sans préparation', 'Barbe fournie'],
  ],
  plomberie_sanitaire: [
    ['x32-reseau-evacuation', 'Réseaux d’évacuation et ventilation', 'Pentes, siphons, colonnes, ventilation', 'Une évacuation exige une pente et une ventilation', 'Raccorder un appareil sans siphon', 'Rénovation de cuisine'],
    ['x32-recherche-fuite', 'Recherche de fuite et réparation', 'Pression, isolation, repérage, réparation', 'Une fuite se localise en isolant les tronçons', 'Casser sans avoir isolé le tronçon', 'Fuite encastrée'],
  ],
  maintenance_automobile: [
    ['x32-diagnostic-electronique', 'Diagnostic électronique embarqué', 'Calculateur, codes défaut, capteurs, effacement', 'Un code défaut oriente sans désigner à coup sûr la pièce', 'Remplacer la pièce au premier code lu', 'Voyant moteur'],
    ['x32-revision-periodique', 'Révision périodique et carnet d’entretien', 'Vidange, filtres, freins, échéances', 'La révision suit le plan du constructeur', 'Réviser seulement quand la panne survient', 'Véhicule de 60 000 km'],
  ],
  soudage_chaudronnerie: [
    ['x32-procedes-soudage', 'Procédés de soudage et choix', 'Électrode enrobée, MIG, TIG, position, épaisseur', 'Le procédé se choisit selon le métal et l’épaisseur', 'Souder de l’aluminium à l’électrode enrobée', 'Châssis en acier'],
    ['x32-deformation-controle', 'Déformation et contrôle des assemblages', 'Retrait, bridage, contrôle visuel, ressuage', 'Le bridage limite le retrait dû au soudage', 'Souder en continu sans bridage', 'Portail soudé'],
  ],
  apiculture_ruche: [
    ['x32-essaimage-colonies', 'Essaimage et division des colonies', 'Essaim, cellule royale, division, récolte', 'L’essaimage se prépare en surveillant les cellules royales', 'Laisser essaimer une colonie productive', 'Printemps au rucher'],
    ['x32-recolte-miel', 'Récolte et extraction du miel', 'Hausse, désoperculation, extraction, humidité', 'Le miel se récolte operculé et à faible humidité', 'Extraire un miel non operculé', 'Récolte d’été'],
  ],
  viticulture_oenologie: [
    ['x32-taille-vigne', 'Taille de la vigne et conduite', 'Guyot, cordon, charge, rendement', 'La taille règle l’équilibre entre végétation et raisins', 'Tailler sans respecter la charge', 'Parcelle de cépages'],
    ['x32-elevage-vin', 'Élevage et assemblage du vin', 'Fûts, bâtonnage, sulfitage, assemblage', 'L’élevage modifie la structure du vin', 'Sulfiter sans mesure', 'Vin rouge de garde'],
  ],
  gemmologie_joaillerie: [
    ['x32-identification-pierres', 'Identification des pierres', 'Réfringence, dureté, inclusions, synthèse', 'Une pierre s’identifie par plusieurs mesures croisées', 'Se fier au seul éclat de la pierre', 'Saphir de synthèse'],
    ['x32-sertissage', 'Sertissage et montage', 'Griffes, chatons, serti, contrôle', 'Le serti maintient la pierre sans la contraindre', 'Sertir sans contrôle final', 'Bague solitaire'],
  ],
  protocole_diplomatique: [
    ['x32-visite-officielle', 'Organisation d’une visite officielle', 'Programme, préséances, sécurité, symboles', 'L’ordre de préséance se fixe avant toute invitation', 'Improviser l’ordre des prises de parole', 'Visite ministérielle'],
    ['x32-ceremonial-symboles', 'Cérémonial et symboles officiels', 'Hymne, drapeau, préséance, décorations', 'Les symboles officiels suivent un ordre protocolaire fixe', 'Placer les emblèmes dans un ordre improvisé', 'Cérémonie nationale'],
  ],
  imagerie_medicale: [
    ['x32-cliches-radiologiques', 'Clichés et critères de qualité', 'Densité, contraste, artefacts, recadrage', 'Un cliché se juge sur des critères avant toute conclusion', 'Conclure sur une image floue', 'Radiographie du rachis'],
    ['x32-dose-patient', 'Dose patient et justification', 'Justification, optimisation, limite, grossesse', 'Chaque examen doit être justifié par un bénéfice', 'Répéter un examen sans justification', 'Contrôle post-opératoire'],
  ],
  optometrie_optique: [
    ['x32-verres-progressifs-adaptation', 'Verres progressifs et adaptation', 'Zones, couloir de vision, prise en main, chute', 'L’adaptation dépend du centrage et des habitudes du porteur', 'Changer de géométrie sans réévaluation', 'Premier équipement progressif'],
    ['x32-vision-ecran', 'Vision et travail sur écran', 'Distance, pauses, sécheresse, éclairage', 'La fatigue visuelle se prévient par des pauses régulières', 'Travailler des heures sans pause devant l’écran', 'Poste de travail'],
  ],
  appareillage_orthopedie: [
    ['x32-orthopedie-pediatrique', 'Appareillage orthopédique de l’enfant', 'Croissance, correction, renouvellement, tolérance', 'Un appareil de l’enfant se révise au rythme de la croissance', 'Livrer un appareil sans prévoir la croissance', 'Enfant de sept ans'],
    ['x32-controle-appareil', 'Contrôle et maintenance de l’appareil', 'Fixations, usure, hygiène, sécurité', 'Les fixations se contrôlent à chaque visite', 'Attendre la casse d’une fixation', 'Orthèse de marche'],
  ],
  pharmacie_officine: [
    ['x32-medicaments-generiques', 'Médicaments génériques et substitution', 'Principe actif, bioéquivalence, substitution', 'La substitution porte sur un médicament de même dosage', 'Substituer sans vérifier le dosage', 'Ordonnance d’antibiotique'],
    ['x32-automedication-conseil', 'Automédication et limites du conseil', 'Symptômes, durée, signes d’alerte, orientation', 'Au-delà de quelques jours, le conseil s’arrête et oriente', 'Prolonger un traitement symptomatique', 'Douleur persistante'],
  ],
  mode_stylisme: [
    ['x32-modelisme-industriel', 'Modélisme et industrialisation', 'Gradation, plan de coupe, tolérances, série', 'La gradation décline le patron dans toutes les tailles', 'Grader sans vérifier les mesures clés', 'Série de chemises'],
    ['x32-retouches-ajustements', 'Retouches et ajustements', 'Épingleage, bâtis, retouche, essayage', 'Une retouche se bâtit avant d’être cousue', 'Coudre directement sans bâtis', 'Ourlet à raccourcir'],
  ],
  arts_culinaires: [
    ['x32-cuisson-basse-temperature', 'Cuisson à basse température', 'Température à cœur, temps, sécurité, perte', 'La cuisson basse température exige un contrôle à cœur', 'Maintenir une viande tiède trop longtemps', 'Filet de bœuf'],
    ['x32-gestion-cuisine', 'Organisation et gestion de la cuisine', 'Postes, ordres, stocks, pertes, hygiène', 'La mise en place conditionne le service', 'Lancer le service sans mise en place', 'Cuisine de 150 couverts'],
  ],
  machinisme_agricole: [
    ['x32-carburant-lubrifiants', 'Carburants, lubrifiants et filtres', 'Qualité, filtration, vidange, contamination', 'Un carburant souillé détruit la pompe d’injection', 'Remplir le réservoir depuis un fût non filtré', 'Panne d’injection'],
    ['x32-travail-sol', 'Travail du sol et outils', 'Labour, hersage, semis, compactage', 'Le travail du sol vise une structure favorable à la graine', 'Travailler un sol trop humide', 'Préparation de semis'],
  ],
  imprimerie_graphique: [
    ['x32-controle-bon-a-tirer', 'Contrôle et bon à tirer', 'Épreuve, repérage, densité, validation', 'Le bon à tirer engage le client sur le rendu', 'Lancer la production sans bon à tirer signé', 'Impression d’un magazine'],
    ['x32-maintenance-presses', 'Maintenance des presses', 'Rouleaux, encres, séchage, arrêts', 'Un arrêt prolongé exige le nettoyage des rouleaux', 'Laisser sécher l’encre sur les rouleaux', 'Presse offset'],
  ],
  bureautique_secretariat: [
    ['x32-publipostage', 'Publipostage et documents types', 'Base de données, champs, fusion, contrôle', 'Un publipostage se teste sur un échantillon', 'Lancer la fusion sans contrôle', 'Convocation à une réunion'],
    ['x32-tableaux-bord', 'Tableaux de bord et indicateurs', 'Indicateurs, mise à jour, graphiques, alerte', 'Un indicateur se définit avec sa cible et sa fréquence', 'Afficher des chiffres sans cible', 'Suivi d’activité mensuel'],
  ],
};
