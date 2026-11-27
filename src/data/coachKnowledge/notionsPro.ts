import { CoachNotion } from './types';

/**
 * v18.0 — Notions professionnelles et supérieures : économie, gestion,
 * comptabilité, droit, informatique, santé et ingénierie.
 */
export const COACH_NOTIONS_PRO: CoachNotion[] = [
  // ---------------------------------------------------------------- ÉCONOMIE
  {
    id: 'pib',
    term: 'PIB et croissance',
    subjectId: 'economie',
    domain: 'economie',
    aliases: ['pib', 'produit interieur brut', 'croissance economique', 'richesse nationale'],
    classLevels: ['1ere', 'terminale', 'l1', 'l2'],
    definition:
      'Le produit intérieur brut mesure la valeur des biens et services produits sur un territoire pendant une période. Sa variation en volume mesure la croissance économique.',
    formula: 'PIB = Σ valeur ajoutée + impôts sur les produits − subventions   |   taux de croissance = (PIB₁ − PIB₀)/PIB₀',
    keys: [
      'PIB nominal (prix courants) ≠ PIB réel (prix constants, corrigé de l’inflation).',
      'Le PIB par habitant rapporte la richesse à la population.',
      'Le PIB ignore l’économie informelle, les inégalités et les externalités négatives.',
    ],
    example:
      'Un pays dont le PIB passe de 1 000 à 1 040 milliards a un taux de croissance nominal de 4 %.',
    pitfall:
      'Confondre croissance (augmentation du PIB) et développement (amélioration du bien-être) et comparer des PIB sans tenir compte de la population.',
    related: ['inflation', 'offre-demande'],
  },
  {
    id: 'offre-demande',
    term: 'Offre et demande',
    subjectId: 'economie',
    domain: 'economie',
    aliases: ['offre et demande', 'equilibre du marche', 'prix d equilibre', 'loi de l offre'],
    classLevels: ['1ere', 'terminale', 'l1', 'l2'],
    definition:
      'La demande est une fonction décroissante du prix, l’offre une fonction croissante. Le prix d’équilibre égalise les quantités offertes et demandées.',
    formula: 'Qd = a − bP   |   Qo = c + dP   |   équilibre : Qd = Qo',
    keys: [
      'Un prix supérieur à l’équilibre crée un excédent ; inférieur, une pénurie.',
      'Un déplacement de la courbe (revenu, goûts) diffère d’un mouvement le long de la courbe (prix).',
      'L’élasticité mesure la sensibilité des quantités au prix.',
    ],
    example:
      'Si le prix du carburant augmente, la quantité demandée diminue et le transport collectif devient plus attractif.',
    pitfall:
      'Confondre déplacement de la courbe et déplacement sur la courbe, et oublier les effets des taxes sur l’équilibre.',
    related: ['elasticite', 'inflation'],
  },
  {
    id: 'elasticite',
    term: 'Élasticité',
    subjectId: 'economie',
    domain: 'economie',
    aliases: ['elasticite', 'elasticite prix', 'sensibilite de la demande'],
    classLevels: ['l1', 'l2', 'l3'],
    definition:
      'L’élasticité-prix de la demande mesure la variation relative de la quantité demandée pour une variation relative du prix de 1 %.',
    formula: 'e = (ΔQ/Q) / (ΔP/P)',
    keys: [
      '|e| > 1 : demande élastique (produits de luxe, substituables).',
      '|e| < 1 : demande inélastique (produits de première nécessité).',
      'Une demande inélastique permet d’augmenter les recettes en augmentant le prix.',
    ],
    example:
      'Une augmentation de 10 % du prix réduit la demande de 25 % : e = −2,5, demande fortement élastique.',
    pitfall:
      'Oublier le signe négatif et confondre élasticité-prix et élasticité-revenu.',
    related: ['offre-demande'],
  },
  {
    id: 'inflation',
    term: 'Inflation',
    subjectId: 'economie',
    domain: 'economie',
    aliases: ['inflation', 'hausse des prix', 'pouvoir d achat', 'ipc'],
    classLevels: ['1ere', 'terminale', 'l1', 'l2'],
    definition:
      'L’inflation est la hausse durable et générale du niveau des prix, mesurée par l’indice des prix à la consommation. Elle réduit le pouvoir d’achat si les revenus n’augmentent pas autant.',
    formula: 'taux d’inflation = (IPC₁ − IPC₀)/IPC₀ × 100',
    keys: [
      'Inflation par la demande, par les coûts ou par la création monétaire.',
      'Elle pénalise les créanciers et les revenus fixes, favorise les débiteurs.',
      'La déflation (baisse des prix) peut bloquer l’économie.',
    ],
    example:
      'Un panier de 50 000 F qui coûte 52 500 F un an plus tard a connu une inflation de 5 %.',
    pitfall:
      'Confondre inflation (hausse générale) et hausse du prix d’un seul bien, et oublier de corriger le taux d’intérêt nominal de l’inflation.',
    related: ['pib', 'chomage'],
  },
  {
    id: 'chomage',
    term: 'Chômage',
    subjectId: 'economie',
    domain: 'economie',
    aliases: ['chomage', 'taux de chomage', 'population active', 'sous emploi'],
    classLevels: ['1ere', 'terminale', 'l1', 'l2'],
    definition:
      'Le chômage désigne les personnes sans emploi, disponibles et à la recherche d’un emploi. Le taux de chômage rapporte le nombre de chômeurs à la population active.',
    formula: 'taux de chômage = chômeurs / population active × 100',
    keys: [
      'Chômage conjoncturel (cycle), structurel (inadéquation), frictionnel (transition).',
      'Le sous-emploi et le halo autour du chômage complètent la mesure.',
      'La courbe de Phillips relie inflation et chômage, sans relation stable.',
    ],
    example:
      'Avec 800 000 chômeurs pour 8 millions d’actifs, le taux de chômage est de 10 %.',
    pitfall:
      'Diviser par la population totale au lieu de la population active, et confondre chômeur et inactif.',
    related: ['inflation', 'pib'],
  },

  // ---------------------------------------------------------------- GESTION & COMPTABILITÉ
  {
    id: 'bilan',
    term: 'Bilan comptable',
    subjectId: 'comptabilite',
    domain: 'economie',
    aliases: ['bilan', 'actif passif', 'patrimoine', 'syscohada', 'situation nette'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'Le bilan décrit le patrimoine de l’entreprise à une date donnée : à l’actif les emplois (ce qu’elle possède), au passif les ressources (ce qu’elle doit et les capitaux propres).',
    formula: 'Total actif = Total passif',
    keys: [
      'Actif immobilisé, actif circulant, trésorerie-actif.',
      'Capitaux propres + dettes financières + passif circulant.',
      'Le résultat de l’exercice apparaît au passif et relie bilan et compte de résultat.',
    ],
    example:
      'Une entreprise avec 20 M F d’actif immobilisé et 5 M F de trésorerie a un actif total de 25 M F, financés par capitaux propres et dettes.',
    pitfall:
      'Inverser actif et passif et oublier que le bilan est une photographie à une date, non un flux.',
    related: ['compte-resultat', 'amortissement'],
  },
  {
    id: 'compte-resultat',
    term: 'Compte de résultat',
    subjectId: 'comptabilite',
    domain: 'economie',
    aliases: ['compte de resultat', 'charges produits', 'resultat net', 'exploitation'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'Le compte de résultat récapitule les charges et les produits de l’exercice et dégage le résultat : bénéfice si les produits dépassent les charges, perte sinon.',
    formula: 'Résultat = Produits − Charges',
    keys: [
      'Trois niveaux : exploitation, financier, exceptionnel (ou HAO).',
      'Les charges et produits sont rattachés à l’exercice (comptabilité d’engagement).',
      'Le résultat alimente les capitaux propres au bilan.',
    ],
    example:
      'Produits 80 M F et charges 65 M F donnent un bénéfice de 15 M F avant impôt.',
    pitfall:
      'Confondre charge (consommation) et immobilisation (investissement), et oublier les dotations aux amortissements.',
    related: ['bilan', 'amortissement'],
  },
  {
    id: 'amortissement',
    term: 'Amortissement',
    subjectId: 'comptabilite',
    domain: 'economie',
    aliases: ['amortissement', 'vnc', 'dotation', 'plan d amortissement', 'lineaire'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'L’amortissement constate la dépréciation irréversible d’une immobilisation du fait de l’usage, du temps ou de l’obsolescence. Il répartit son coût sur sa durée d’utilité.',
    formula: 'annuité linéaire = (coût − valeur résiduelle) / durée   |   VNC = coût − amortissements cumulés',
    keys: [
      'L’amortissement est une charge calculée, non un décaissement.',
      'Modes : linéaire, dégressif, unités d’œuvre.',
      'La valeur nette comptable figure au bilan.',
    ],
    example:
      'Un matériel de 6 000 000 F amorti sur 5 ans en linéaire donne 1 200 000 F par an et une VNC nulle en fin de plan.',
    pitfall:
      'Confondre amortissement (dépréciation) et provision (risque), et oublier de proratiser la première annuité.',
    related: ['compte-resultat', 'bilan'],
  },
  {
    id: 'tva',
    term: 'TVA',
    subjectId: 'comptabilite',
    domain: 'economie',
    aliases: ['tva', 'taxe sur la valeur ajoutee', 'tva collectee deductible', '18 pour cent'],
    classLevels: ['terminale', 'l1', 'l2'],
    definition:
      'La TVA est un impôt indirect sur la consommation collecté par les entreprises pour le compte de l’État. Chaque entreprise collecte la TVA sur ses ventes et déduit celle payée sur ses achats.',
    formula: 'TVA à payer = TVA collectée − TVA déductible   |   montant TTC = HT × (1 + taux)',
    keys: [
      'La TVA est neutre pour l’entreprise : elle n’est ni une charge ni un produit définitif.',
      'Le taux varie selon les pays et les produits (exemptions, taux réduits).',
      'Une TVA déductible supérieure donne un crédit de TVA reportable.',
    ],
    example:
      'Vente de 100 000 F HT à 18 % : TVA collectée 18 000 F, TTC 118 000 F. Achats avec 9 000 F de TVA : à payer 9 000 F.',
    pitfall:
      'Calculer la TVA sur le TTC au lieu du HT, et oublier les exonérations et l’autoliquidation.',
    mnemonic: 'Collectée − déductible = à payer (ou crédit).',
    related: ['compte-resultat', 'bilan'],
  },
  {
    id: 'seuil-rentabilite',
    term: 'Seuil de rentabilité',
    subjectId: 'gestion_projet',
    domain: 'economie',
    aliases: ['seuil de rentabilite', 'point mort', 'charges fixes', 'marge sur cout variable'],
    classLevels: ['l1', 'l2', 'l3'],
    definition:
      'Le seuil de rentabilité est le chiffre d’affaires à partir duquel l’entreprise couvre toutes ses charges et commence à réaliser un bénéfice.',
    formula: 'SR = Charges fixes / Taux de marge sur coût variable   |   TMCV = (CA − CV)/CA',
    keys: [
      'Le point mort indique la date à laquelle le seuil est atteint.',
      'Plus les charges fixes sont élevées, plus le seuil est haut (risque accru).',
      'Marge de sécurité = CA − SR.',
    ],
    example:
      'Charges fixes de 5 M F et TMCV de 40 % donnent un seuil de 12,5 M F de chiffre d’affaires.',
    pitfall:
      'Utiliser la marge nette au lieu de la marge sur coût variable, et oublier de distinguer charges fixes et variables.',
    related: ['compte-resultat', 'offre-demande'],
  },
  {
    id: 'gestion-projet',
    term: 'Triangle du projet',
    subjectId: 'gestion_projet',
    domain: 'economie',
    aliases: ['triangle du projet', 'triple contrainte', 'delai cout qualite', 'planning'],
    classLevels: ['l1', 'l2', 'l3', 'master'],
    definition:
      'Tout projet est contraint par trois dimensions interdépendantes : le périmètre (qualité attendue), le délai et le coût. Modifier l’une affecte nécessairement les autres.',
    formula: 'Périmètre ↔ Délai ↔ Coût (arbitrage permanent)',
    keys: [
      'Le chef de projet arbitre en fonction des priorités du commanditaire.',
      'La méthode critique (chemin critique) identifie les tâches qui déterminent la durée.',
      'Un projet réussi respecte les trois contraintes et satisfait les parties prenantes.',
    ],
    example:
      'Ajouter un module sans allonger le délai oblige à augmenter l’équipe, donc le coût.',
    pitfall:
      'Promettre les trois variables à la fois (périmètre, délai, coût) sans arbitrage explicite.',
    related: ['budget', 'seuil-rentabilite'],
  },
  {
    id: 'budget',
    term: 'Budget et contrôle budgétaire',
    subjectId: 'gestion_projet',
    domain: 'economie',
    aliases: ['budget', 'ecart budgetaire', 'prevision', 'controle budgetaire'],
    classLevels: ['l1', 'l2', 'l3', 'master'],
    definition:
      'Le budget est une prévision chiffrée des recettes et des dépenses sur une période. Le contrôle budgétaire compare le réalisé au prévu et analyse les écarts.',
    formula: 'Écart = Réalisé − Budget   |   écart en % = écart / budget',
    keys: [
      'Un écart favorable augmente le résultat, un écart défavorable le réduit.',
      'Décomposer l’écart : effet prix, effet volume, effet mix.',
      'Le budget est un outil de pilotage, pas une prévision figée.',
    ],
    example:
      'Un budget de 5 M F pour 6 M F réalisés donne un écart de +1 M F à analyser (volume ou prix ?).',
    pitfall:
      'Se contenter de constater l’écart sans en expliquer l’origine, et confondre écart de volume et écart de prix.',
    related: ['gestion-projet', 'compte-resultat'],
  },
  {
    id: 'marketing-4p',
    term: 'Marketing mix (4 P)',
    subjectId: 'marketing_entrep',
    domain: 'economie',
    aliases: ['marketing mix', '4p', 'produit prix place promotion', 'positionnement'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'Le marketing mix regroupe les quatre leviers d’action commerciale : Produit, Prix, Distribution (Place) et Communication (Promotion), cohérents avec le positionnement choisi.',
    formula: 'Produit + Prix + Place + Promotion = offre cohérente',
    keys: [
      'Le positionnement précède le mix : à qui et avec quelle promesse ?',
      'Les 4 P doivent être cohérents entre eux (un produit de luxe ne se vend pas en discount).',
      'Aux services s’ajoutent les 7 P (personnel, processus, preuve physique).',
    ],
    example:
      'Une marque de cosmétiques bio choisit un prix premium, une pharmacie et une communication santé : cohérence des 4 P.',
    pitfall:
      'Confondre « Place » (distribution) et communication, et construire un mix sans segment cible.',
    related: ['offre-demande', 'seuil-rentabilite'],
  },

  // ---------------------------------------------------------------- DROIT
  {
    id: 'personnalite-juridique',
    term: 'Personnalité juridique',
    subjectId: 'droit',
    domain: 'droit',
    aliases: ['personnalite juridique', 'personne morale', 'personne physique', 'capacite'],
    classLevels: ['terminale', 'l1', 'l2'],
    definition:
      'La personnalité juridique est l’aptitude à être titulaire de droits et d’obligations. Elle est reconnue aux personnes physiques dès la naissance et aux personnes morales à compter de leur immatriculation.',
    keys: [
      'Personne physique : être humain ; personne morale : société, association, État.',
      'Capacité de jouissance (avoir des droits) ≠ capacité d’exercice (agir soi-même).',
      'Les mineurs et majeurs protégés ont une capacité limitée.',
    ],
    example:
      'Une SARL acquiert la personnalité morale à son immatriculation au registre du commerce ; elle peut signer des contrats en son nom.',
    pitfall:
      'Confondre personnalité juridique et capacité, et croire que l’animal est une personne juridique.',
    related: ['contrat', 'societe-ohada'],
  },
  {
    id: 'contrat',
    term: 'Contrat',
    subjectId: 'droit',
    domain: 'droit',
    aliases: ['contrat', 'consentement', 'objet licite', 'force obligatoire', 'nullite'],
    classLevels: ['terminale', 'l1', 'l2'],
    definition:
      'Le contrat est un accord de volontés créateur d’obligations. Pour être valable, il exige consentement, capacité, objet licite et cause licite ; il s’impose aux parties (« pacta sunt servanda »).',
    formula: 'Validité = consentement + capacité + objet + cause',
    keys: [
      'Vices du consentement : erreur, dol, violence.',
      'Nullité relative (protection d’un contractant) ou absolue (ordre public).',
      'Clause pénale, clause résolutoire et force majeure encadrent l’exécution.',
    ],
    example:
      'Un contrat signé sous la contrainte physique peut être annulé pour violence.',
    pitfall:
      'Croire qu’un écrit est toujours obligatoire (principe du consensualisme) et confondre nullité et résolution.',
    related: ['personnalite-juridique', 'responsabilite-civile'],
  },
  {
    id: 'responsabilite-civile',
    term: 'Responsabilité civile',
    subjectId: 'droit',
    domain: 'droit',
    aliases: ['responsabilite civile', 'dommage', 'faute', 'indemnisation', 'prejudice'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'La responsabilité civile oblige celui qui cause un dommage à autrui à le réparer. Elle repose sur une faute, un dommage et un lien de causalité.',
    formula: 'Responsabilité = faute + dommage + lien de causalité',
    keys: [
      'Responsabilité contractuelle (inexécution du contrat) ≠ délictuelle (hors contrat).',
      'Responsabilité du fait personnel, des choses ou d’autrui.',
      'La réparation vise à remettre la victime dans l’état antérieur (principe de réparation intégrale).',
    ],
    example:
      'Un conducteur distrait endommage un véhicule : sa faute engage sa responsabilité et il doit indemniser le préjudice.',
    pitfall:
      'Oublier l’un des trois éléments et confondre responsabilité civile (réparation) et pénale (sanction).',
    related: ['contrat', 'personnalite-juridique'],
  },
  {
    id: 'hierarchie-normes',
    term: 'Hiérarchie des normes',
    subjectId: 'droit',
    domain: 'droit',
    aliases: ['hierarchie des normes', 'kelsen', 'pyramide', 'constitutionnalite'],
    classLevels: ['terminale', 'l1', 'l2'],
    definition:
      'La hiérarchie des normes (Kelsen) organise les règles juridiques en niveaux : chaque norme doit être conforme à la norme supérieure.',
    formula: 'Constitution > traités > lois > règlements > actes individuels',
    keys: [
      'Le contrôle de constitutionnalité vérifie la conformité des lois à la Constitution.',
      'Le contrôle de conventionnalité vérifie la conformité aux traités.',
      'Une norme inférieure contraire est écartée ou annulée.',
    ],
    example:
      'Un arrêté municipal contraire à une loi est illégal et peut être annulé par le juge administratif.',
    pitfall:
      'Placer les traités au-dessus de la Constitution sans distinguer les ordres juridiques, et confondre abrogation et annulation.',
    related: ['contrat', 'personnalite-juridique'],
  },
  {
    id: 'societe-ohada',
    term: 'Sociétés commerciales OHADA',
    subjectId: 'droit_ohada',
    domain: 'droit',
    aliases: ['ohada', 'sarl', 'sa', 'sas', 'capital social', 'acte uniforme'],
    classLevels: ['l2', 'l3', 'master'],
    definition:
      'L’OHADA harmonise le droit des affaires dans 17 États africains. Les formes principales de sociétés sont la SARL, la SA, la SAS et la SNC, régies par l’Acte uniforme relatif au droit des sociétés commerciales.',
    keys: [
      'SARL : responsabilité limitée aux apports, gérant, pas d’actions.',
      'SA : capital divisé en actions, gouvernance par conseil d’administration.',
      'SAS : liberté statutaire, président, actions.',
    ],
    example:
      'Deux associés créent une SARL au capital de 1 000 000 F : leur responsabilité est limitée à leurs apports.',
    pitfall:
      'Confondre capital social minimum et apports, et ignorer les règles d’immatriculation au RCCM.',
    related: ['personnalite-juridique', 'contrat'],
  },

  // ---------------------------------------------------------------- INFORMATIQUE
  {
    id: 'algorithme',
    term: 'Algorithme',
    subjectId: 'informatique',
    domain: 'informatique',
    aliases: ['algorithme', 'pseudo code', 'programme', 'instructions'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1'],
    definition:
      'Un algorithme est une suite finie et ordonnée d’instructions permettant de résoudre un problème. Il se traduit ensuite dans un langage de programmation.',
    keys: [
      'Entrées → traitement → sortie.',
      'Un algorithme doit être fini, non ambigu et efficace.',
      'Le pseudo-code décrit la logique indépendamment du langage.',
    ],
    example:
      'Algorithme de moyenne : lire les notes, calculer la somme, diviser par le nombre de notes, afficher le résultat.',
    pitfall:
      'Confondre algorithme et programme (le programme est une implémentation) et oublier les cas limites (liste vide).',
    related: ['variable', 'boucle', 'complexite'],
  },
  {
    id: 'variable',
    term: 'Variable et type',
    subjectId: 'informatique',
    domain: 'informatique',
    aliases: ['variable', 'type de donnee', 'affectation', 'entier chaine booleen'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1'],
    definition:
      'Une variable est un espace mémoire nommé qui contient une valeur d’un certain type (entier, réel, chaîne, booléen). L’affectation modifie son contenu.',
    formula: 'nom ← valeur   (to  x = 3 en Python)',
    keys: [
      'Une variable a un nom, un type et une valeur.',
      'L’affectation écrase l’ancienne valeur.',
      'Les types déterminent les opérations possibles.',
    ],
    example: 'En Python : x = 5 ; x = x + 1 ; print(x) affiche 6.',
    pitfall:
      'Confondre « = » (affectation) et « == » (comparaison), et utiliser une variable non initialisée.',
    related: ['algorithme', 'boucle'],
  },
  {
    id: 'boucle',
    term: 'Boucles et conditions',
    subjectId: 'informatique',
    domain: 'informatique',
    aliases: ['boucle', 'for while', 'condition if else', 'iteration'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1'],
    definition:
      'Une structure conditionnelle (si… alors… sinon) exécute un bloc selon un test. Une boucle (pour, tant que) répète un bloc un nombre de fois connu ou tant qu’une condition est vraie.',
    keys: [
      'for : nombre d’itérations connu ; while : condition d’arrêt.',
      'Une boucle while doit faire évoluer sa condition pour éviter l’infini.',
      'Le test d’arrêt se vérifie avant (while) ou après (do…while) l’exécution.',
    ],
    example:
      'Pour calculer 5! : résultat ← 1 ; pour i de 1 à 5 : résultat ← résultat × i.',
    pitfall:
      'Oublier d’incrémenter le compteur dans un while (boucle infinie) et confondre indentation et logique du bloc.',
    related: ['variable', 'algorithme'],
  },
  {
    id: 'sql-select',
    term: 'Requête SQL SELECT',
    subjectId: 'bases_donnees_bigdata',
    domain: 'informatique',
    aliases: ['sql', 'select', 'where', 'order by', 'group by', 'requete'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'SELECT interroge une table pour extraire des lignes et des colonnes. WHERE filtre les lignes, ORDER BY trie, GROUP BY regroupe et HAVING filtre les groupes.',
    formula: 'SELECT colonnes FROM table WHERE condition GROUP BY … HAVING … ORDER BY …;',
    keys: [
      'L’ordre logique d’évaluation : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
      'WHERE filtre les lignes, HAVING filtre les agrégats (COUNT, SUM, AVG).',
      'DISTINCT élimine les doublons.',
    ],
    example:
      'SELECT ville, COUNT(*) FROM eleves WHERE niveau = ’Tle’ GROUP BY ville HAVING COUNT(*) > 10;',
    pitfall:
      'Utiliser WHERE au lieu de HAVING sur un agrégat, et oublier GROUP BY pour toute colonne non agrégée.',
    related: ['sql-join', 'cle-primaire'],
  },
  {
    id: 'sql-join',
    term: 'Jointures SQL',
    subjectId: 'bases_donnees_bigdata',
    domain: 'informatique',
    aliases: ['jointure', 'join', 'inner join', 'left join', 'relation'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'Une jointure combine les lignes de deux tables selon une condition de correspondance, généralement clé étrangère = clé primaire.',
    formula: 'FROM A INNER JOIN B ON A.id = B.a_id',
    keys: [
      'INNER JOIN : seulement les correspondances.',
      'LEFT JOIN : toutes les lignes de gauche, avec NULL si absence de correspondance.',
      'Une jointure sans condition produit un produit cartésien.',
    ],
    example:
      'SELECT e.nom, c.libelle FROM eleves e INNER JOIN classes c ON e.classe_id = c.id;',
    pitfall:
      'Oublier la condition ON (produit cartésien) et confondre LEFT JOIN et INNER JOIN dans les rapports d’absence.',
    related: ['sql-select', 'cle-primaire'],
  },
  {
    id: 'cle-primaire',
    term: 'Clé primaire et clé étrangère',
    subjectId: 'bases_donnees_bigdata',
    domain: 'informatique',
    aliases: ['cle primaire', 'cle etrangere', 'integrite', 'identifiant'],
    classLevels: ['terminale', 'l1', 'l2'],
    definition:
      'La clé primaire identifie de façon unique chaque ligne d’une table. La clé étrangère référence la clé primaire d’une autre table et garantit l’intégrité référentielle.',
    keys: [
      'Une clé primaire est unique et non nulle.',
      'La clé étrangère peut être nulle (relation facultative).',
      'Les contraintes empêchent les références orphelines.',
    ],
    example:
      'Dans une table « notes », eleve_id est une clé étrangère vers la clé primaire id de la table « eleves ».',
    pitfall:
      'Confondre clé candidate et clé primaire, et croire qu’une clé étrangère doit être unique.',
    related: ['sql-join', 'bdd-relationnelle'],
  },
  {
    id: 'bdd-relationnelle',
    term: 'Base de données relationnelle',
    subjectId: 'bases_donnees_bigdata',
    domain: 'informatique',
    aliases: ['base de donnees', 'relationnelle', 'modele relationnel', 'table'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'Une base de données relationnelle organise les données en tables reliées entre elles par des clés, afin d’éviter la redondance et d’assurer la cohérence.',
    keys: [
      'Normalisation : 1FN, 2FN, 3FN pour limiter les redondances.',
      'Chaque table possède une clé primaire et éventuellement des clés étrangères.',
      'Les transactions garantissent les propriétés ACID.',
    ],
    example:
      'Un lycée sépare les tables eleves, classes et notes plutôt que de répéter le nom de la classe dans chaque ligne élève.',
    pitfall:
      'Stocker des données redondantes sans normalisation et ignorer les contraintes d’intégrité.',
    related: ['cle-primaire', 'sql-select'],
  },
  {
    id: 'binaire',
    term: 'Binaire et conversion',
    subjectId: 'informatique',
    domain: 'informatique',
    aliases: ['binaire', 'base 2', 'octet', 'bit', 'hexadecimal'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1'],
    definition:
      'Un ordinateur code l’information en binaire (base 2). Un octet regroupe 8 bits et permet de coder 256 valeurs (0 à 255).',
    formula: '1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = 13₁₀',
    keys: [
      'Chaque bit vaut une puissance de 2 selon sa position.',
      'L’hexadécimal regroupe 4 bits par chiffre (0-F).',
      '1 kio = 1 024 octets (et non 1 000).',
    ],
    example: '255 s’écrit 11111111 en binaire et FF en hexadécimal.',
    pitfall:
      'Confondre bit et octet, et utiliser 1 000 au lieu de 1 024 pour les multiples binaires.',
    related: ['algorithme'],
  },
  {
    id: 'complexite',
    term: 'Complexité algorithmique',
    subjectId: 'informatique',
    domain: 'informatique',
    aliases: ['complexite', 'big o', 'o de n', 'performance algorithme'],
    classLevels: ['l1', 'l2', 'l3'],
    definition:
      'La complexité mesure l’évolution du temps ou de la mémoire utilisés par un algorithme en fonction de la taille n des données, exprimée en notation grand O.',
    formula: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
    keys: [
      'La recherche dichotomique est en O(log n) sur un tableau trié.',
      'Le tri par insertion est O(n²) dans le pire cas, O(n) au mieux.',
      'On s’intéresse au comportement asymptotique, pas aux constantes.',
    ],
    example:
      'Sur 1 000 000 d’éléments, une recherche linéaire fait un million d’opérations, une dichotomie seulement une vingtaine.',
    pitfall:
      'Confondre complexité temporelle et temps réel mesuré, et oublier de préciser le pire cas ou le cas moyen.',
    related: ['algorithme', 'boucle'],
  },

  // ---------------------------------------------------------------- SANTÉ
  {
    id: 'signes-vitaux',
    term: 'Signes vitaux',
    subjectId: 'soins_infirmiers',
    domain: 'sante',
    aliases: ['signes vitaux', 'constantes', 'tension arterielle', 'pouls', 'temperature', 'frequence respiratoire'],
    classLevels: ['l1', 'l2', 'l3', 'master'],
    definition:
      'Les signes vitaux sont les paramètres qui renseignent sur l’état physiologique d’un patient : température, pouls, fréquence respiratoire, tension artérielle et saturation en oxygène.',
    formula: 'TA = PA systolique / PA diastolique (mmHg)',
    keys: [
      'Adulte au repos : 60-100 bpm, 12-20 cycles/min, 36,1-37,5 °C, TA ≈ 120/80 mmHg, SpO₂ ≥ 95 %.',
      'Toute anomalie doit être comparée à l’état habituel du patient.',
      'La douleur est considérée comme le cinquième signe vital.',
    ],
    example:
      'Une fréquence respiratoire à 28 cycles/min chez un adulte signale une détresse respiratoire à signaler immédiatement.',
    pitfall:
      'Mesurer la tension après un effort ou sans brassard adapté, et interpréter un seul relevé isolé.',
    related: ['homeostasie', 'asepsie'],
  },
  {
    id: 'homeostasie',
    term: 'Homéostasie',
    subjectId: 'anatomie_physio',
    domain: 'sante',
    aliases: ['homeostasie', 'regulation', 'equilibre interne', 'retroaction'],
    classLevels: ['l1', 'l2', 'l3'],
    definition:
      'L’homéostasie est la capacité de l’organisme à maintenir ses paramètres internes (température, pH, glycémie, pression) dans des limites compatibles avec la vie, grâce à des boucles de régulation.',
    keys: [
      'Rétroaction négative : la réponse s’oppose à la perturbation (thermorégulation).',
      'Rétroaction positive : amplifie un phénomène (contractions de l’accouchement).',
      'Les capteurs, le centre intégrateur et les effecteurs forment la boucle.',
    ],
    example:
      'En cas d’hypoglycémie, le pancréas libère du glucagon qui fait remonter la glycémie.',
    pitfall:
      'Confondre rétroaction positive et négative, et oublier le rôle des capteurs.',
    related: ['signes-vitaux'],
  },
  {
    id: 'asepsie',
    term: 'Asepsie et hygiène',
    subjectId: 'soins_infirmiers',
    domain: 'sante',
    aliases: ['asepsie', 'antisepsie', 'hygiene des mains', 'infection nosocomiale', 'stérilisation'],
    classLevels: ['l1', 'l2', 'l3'],
    definition:
      'L’asepsie vise à prévenir l’introduction de micro-organismes ; l’antisepsie détruit ou inactive les micro-organismes sur les tissus vivants. L’hygiène des mains est le geste central.',
    keys: [
      'Friction hydro-alcoolique : 30 secondes ; lavage savonné : 40-60 secondes.',
      'Les 5 indications de l’OMS encadrent le moment de l’hygiène des mains.',
      'Le port des gants ne remplace jamais l’hygiène des mains.',
    ],
    example:
      'Avant un soin invasif, une friction hydro-alcoolique est réalisée même si des gants seront portés.',
    pitfall:
      'Croire que les gants sont stériles après usage et confondre asepsie (prévention) et antisepsie (destruction).',
    related: ['signes-vitaux'],
  },

  // ---------------------------------------------------------------- INGÉNIERIE
  {
    id: 'contrainte-mecanique',
    term: 'Contrainte mécanique',
    subjectId: 'genie_mecanique',
    domain: 'ingenierie',
    aliases: ['contrainte', 'sigma', 'mpa', 'traction compression', 'resistance des materiaux'],
    classLevels: ['l1', 'l2', 'l3', 'master'],
    definition:
      'La contrainte est l’effort interne par unité de surface dans une pièce. Elle se compare à la limite d’élasticité du matériau pour vérifier la résistance.',
    formula: 'σ = F/S   (Pa ou MPa)',
    keys: [
      'Traction/compression : contrainte normale ; cisaillement : contrainte tangentielle.',
      'La déformation est élastique en dessous de la limite d’élasticité, plastique au-delà.',
      'Un coefficient de sécurité couvre les incertitudes de calcul et de charge.',
    ],
    example:
      'Une tige de 100 mm² soumise à 10 000 N subit σ = 100 MPa : acceptable pour un acier dont Re = 235 MPa.',
    pitfall:
      'Oublier de convertir les mm² en m² et confondre contrainte et force.',
    related: ['poutre-flexion', 'transmission-mouvement'],
  },
  {
    id: 'poutre-flexion',
    term: 'Flexion d’une poutre',
    subjectId: 'genie_civil_btp',
    domain: 'ingenierie',
    aliases: ['flexion', 'moment flechissant', 'fleche', 'poutre', 'portee'],
    classLevels: ['l2', 'l3', 'master'],
    definition:
      'Une poutre soumise à des charges transversales subit un moment fléchissant qui provoque une déformation (flèche) et des contraintes normales maximales aux fibres extrêmes.',
    formula: 'σ = M·v/I   |   flèche max (poutre sur 2 appuis, charge répartie) = 5qL⁴/(384EI)',
    keys: [
      'Le moment fléchissant est maximal là où l’effort tranchant s’annule.',
      'L’inertie I dépend de la géométrie de la section.',
      'La flèche doit rester inférieure à L/300 ou L/500 selon les règles.',
    ],
    example:
      'Doubler la hauteur d’une poutre rectangulaire multiplie son inertie par 8 (h³), réduisant fortement la flèche.',
    pitfall:
      'Confondre moment et effort tranchant, et oublier les unités (N·m, m⁴).',
    related: ['contrainte-mecanique'],
  },
  {
    id: 'transmission-mouvement',
    term: 'Transmission de mouvement',
    subjectId: 'sciences_ingenieur',
    domain: 'ingenierie',
    aliases: ['transmission', 'engrenage', 'poulie courroie', 'rapport de reduction', 'arbre moteur'],
    classLevels: ['2nde-s', '1ere-s', 'terminale-s', 'l1'],
    definition:
      'Les systèmes de transmission (engrenages, poulies-courroies, chaînes) transmettent un mouvement de rotation en modifiant la vitesse et le couple selon un rapport de transmission.',
    formula: 'r = ω_sortie/ω_entrée = Z_menante/Z_menée = −C_sortie/C_entrée',
    keys: [
      'Un réducteur diminue la vitesse et augmente le couple.',
      'Le signe négatif traduit l’inversion du sens de rotation (engrenages).',
      'Le rendement de la transmission réduit la puissance disponible.',
    ],
    example:
      'Un pignon de 20 dents entraîne une roue de 60 dents : la vitesse est divisée par 3 et le couple triplé (aux pertes près).',
    pitfall:
      'Inverser menante et menée dans le rapport, et oublier que la puissance se conserve hors pertes.',
    related: ['contrainte-mecanique', 'rendement'],
  },
  {
    id: 'energie-solaire',
    term: 'Énergie solaire photovoltaïque',
    subjectId: 'energies_renouv',
    domain: 'ingenierie',
    aliases: ['photovoltaique', 'panneau solaire', 'irradiance', 'watt crete', 'onduleur'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    definition:
      'Une installation photovoltaïque convertit le rayonnement solaire en électricité. La puissance crête s’exprime en watt-crête (Wc) dans des conditions standard d’ensoleillement.',
    formula: 'E (kWh) = P_crête (kWc) × ensoleillement (h/j) × rendement × jours',
    keys: [
      'L’irradiance standard vaut 1 000 W/m² à 25 °C.',
      'Les pertes (température, câblage, onduleur, salissure) réduisent la production réelle.',
      'L’onduleur convertit le courant continu en courant alternatif.',
    ],
    example:
      'Un champ de 5 kWc avec 5 h d’ensoleillement équivalent produit environ 25 kWh par jour, avant pertes.',
    pitfall:
      'Confondre puissance crête et énergie produite, et ignorer l’orientation et l’inclinaison des panneaux.',
    related: ['rendement'],
  },
];
