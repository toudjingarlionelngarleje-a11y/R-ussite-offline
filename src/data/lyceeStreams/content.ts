/**
 * v17.8 — SECONDE ET TERMINALE SCIENTIFIQUE / LITTÉRAIRE
 *
 * 20 matières × 4 modules × 5 chapitres progressifs = 400 nouveaux chapitres :
 *   · Seconde scientifique (2nde S / C) ......... 100 chapitres
 *   · Seconde littéraire (2nde L / A) ........... 100 chapitres
 *   · Terminale scientifique (Tle S / C / D / E)  100 chapitres
 *   · Terminale littéraire (Tle L / A / B / G) .. 100 chapitres
 *
 * Ces chapitres s'ajoutent aux chapitres déjà présents dans chaque matière et
 * restent entièrement hors ligne (aucun asset externe).
 */

export type LyceeModule = [
  slug: string,
  moduleTitle: string,
  coreConcept: string,
  keyRule: string,
  examTrap: string,
  practicalCase: string
];

export type LyceeStream = 'science' | 'litteraire';

export interface LyceeSubjectSpec {
  subjectId: string;
  subjectName: string;
  primaryExamId: string;
  examIds: string[];
  zone: string;
  base: '2nde' | 'terminale';
  stream: LyceeStream;
  diagramId?:
    | 'parabole'
    | 'circuit_rc'
    | 'mitose'
    | 'reaction_chimique'
    | 'sql_relations'
    | 'couches_geologiques'
    | 'pyramide_alimentaire';
  modules: LyceeModule[];
}

/**
 * ============================================================================
 * SECONDE SCIENTIFIQUE (2nde S / 2nde C)
 * ============================================================================
 */
export const SECONDE_S_SUBJECTS: LyceeSubjectSpec[] = [
  {
    subjectId: 'maths',
    subjectName: 'Mathématiques',
    primaryExamId: 'seconde-scientifique',
    examIds: ['seconde-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'concours-ingenieur'],
    zone: 'Programme officiel 2nde S — série C',
    base: '2nde',
    stream: 'science',
    diagramId: 'parabole',
    modules: [
      [
        '2nd-s-fonctions',
        'Généralités sur les fonctions : ensemble de définition, image, variations',
        'Une fonction f associe à tout réel x de son ensemble de définition D un unique réel f(x) ; la courbe représentative est l’ensemble des points M(x ; f(x))',
        'f est croissante sur I si pour tous a < b de I, f(a) ≤ f(b) ; elle est décroissante si a < b implique f(a) ≥ f(b) ; une fonction paire vérifie f(−x) = f(x)',
        'Confondre ensemble de définition et ensemble des valeurs prises, et conclure sur les variations à partir d’un seul point du tableau',
        'Étudier f(x) = (x + 1)/(x − 2) : D = ℝ \\ {2} ; f est décroissante sur chacun des deux intervalles ]−∞ ; 2[ et ]2 ; +∞[, sans être décroissante sur leur réunion',
      ],
      [
        '2nd-s-equations',
        'Équations et inéquations du premier et du second degré',
        'Une équation du second degré s’écrit ax² + bx + c = 0 avec a ≠ 0 ; sa résolution repose sur le discriminant Δ = b² − 4ac',
        'Une inéquation se résout par un tableau de signes ; le signe d’un produit ou d’un quotient se déduit du signe de chaque facteur',
        'Multiplier ou diviser une inéquation par une expression dont le signe est inconnu, ce qui change le sens de l’inégalité',
        'Résoudre (x − 3)(2x + 1) ≤ 0 : les racines sont −1/2 et 3, le produit est négatif entre elles, d’où S = [−1/2 ; 3]',
      ],
      [
        '2nd-s-statistiques',
        'Statistiques descriptives : moyenne, médiane, quartiles et dispersion',
        'La moyenne d’une série pondérée vaut Σ(nᵢxᵢ)/N ; la médiane partage la série ordonnée en deux effectifs égaux',
        'L’écart interquartile Q3 − Q1 mesure la dispersion en éliminant les valeurs extrêmes ; l’écart-type est la racine de la variance',
        'Calculer une moyenne de moyennes sans tenir compte des effectifs, ou confondre médiane et moyenne sur une série asymétrique',
        'Notes 8, 12, 12, 15, 18 : moyenne = 13, médiane = 12 ; avec les effectifs 2, 5, 5, 3, 1 la moyenne pondérée vaut 11,9',
      ],
      [
        '2nd-s-geometrie',
        'Géométrie repérée : coordonnées, vecteurs et équations de droites',
        'Dans un repère orthonormé, le vecteur AB a pour coordonnées (xB − xA ; yB − yA) et la distance AB = √((xB − xA)² + (yB − yA)²)',
        'Deux vecteurs sont colinéaires si leur déterminant est nul ; une droite a une équation de la forme ax + by + c = 0, ou y = mx + p si elle n’est pas verticale',
        'Oublier de vérifier la colinéarité avant d’affirmer que trois points sont alignés, ou confondre coefficient directeur et ordonnée à l’origine',
        'A(1 ; 2), B(4 ; 6) : AB(3 ; 4) et AB = 5 ; le milieu I a pour coordonnées (2,5 ; 4) et la droite (AB) a pour équation 4x − 3y + 2 = 0',
      ],
    ],
  },
  {
    subjectId: 'physique',
    subjectName: 'Physique',
    primaryExamId: 'seconde-scientifique',
    examIds: ['seconde-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'concours-ingenieur'],
    zone: 'Programme officiel 2nde S — mécanique, électricité, optique',
    base: '2nde',
    stream: 'science',
    modules: [
      [
        '2nd-s-mouvement',
        'Mouvement d’un point : référentiel, vitesse et accélération',
        'Un mouvement n’a de sens que relativement à un référentiel ; la vitesse moyenne vaut v = d/Δt et s’exprime en m·s⁻¹',
        'Dans un mouvement rectiligne uniforme, la vitesse est constante et l’accélération nulle ; dans un mouvement uniformément varié, a = Δv/Δt est constante',
        'Mélanger les unités (km·h⁻¹ et m·s⁻¹) sans conversion, ou oublier de préciser le référentiel dans la conclusion',
        'Une voiture parcourt 90 km en 1 h 15 min : v = 90/1,25 = 72 km·h⁻¹, soit 20 m·s⁻¹',
      ],
      [
        '2nd-s-forces',
        'Forces, équilibre et principe fondamental de la statique',
        'Une force est modélisée par un vecteur (point d’application, direction, sens, valeur en newtons) ; le poids vaut P = m·g avec g ≈ 9,8 N·kg⁻¹',
        'Un solide soumis à deux forces est en équilibre si elles ont même droite d’action, même valeur et des sens opposés : F₁ + F₂ = 0',
        'Additionner les valeurs des forces sans tenir compte de leur direction, ou négliger la réaction du support',
        'Un livre de 1,2 kg posé sur une table subit un poids de 11,8 N vers le bas et une réaction normale de 11,8 N vers le haut : l’ensemble est équilibré',
      ],
      [
        '2nd-s-electricite',
        'Circuits électriques : loi d’Ohm, associations et puissance',
        'La loi d’Ohm s’écrit U = R·I ; en série l’intensité est la même partout et les tensions s’additionnent ; en dérivation la tension est commune',
        'Puissance P = U·I = R·I² = U²/R ; l’énergie consommée vaut E = P·t, en joules si t est en secondes',
        'Appliquer U = R·I à un circuit entier au lieu de chaque dipôle, ou additionner les résistances en dérivation',
        'Deux résistances de 30 Ω et 60 Ω en dérivation sous 12 V : Req = 20 Ω, I total = 0,6 A, P = 7,2 W',
      ],
      [
        '2nd-s-optique',
        'Optique géométrique : réfraction, lentilles et formation des images',
        'La réfraction obéit à la loi de Snell-Descartes : n₁·sin i₁ = n₂·sin i₂ ; la lumière se rapproche de la normale en passant dans un milieu plus réfringent',
        'Une lentille convergente de distance focale f forme une image réelle d’un objet placé au-delà de f ; la relation de conjugaison s’écrit 1/OA′ − 1/OA = 1/f',
        'Utiliser les angles en degrés dans la formule de Snell au lieu de vérifier le milieu, ou confondre image réelle et image virtuelle',
        'Un rayon passant de l’air (n = 1,00) à l’eau (n = 1,33) avec i₁ = 45° donne sin i₂ = 0,532 soit i₂ ≈ 32°',
      ],
    ],
  },
  {
    subjectId: 'svt',
    subjectName: 'Sciences de la Vie et de la Terre',
    primaryExamId: 'seconde-scientifique',
    examIds: ['seconde-scientifique', 'bac-scientifique', 'bac-d-sciences-nat', 'concours-medecine'],
    zone: 'Programme officiel 2nde S — biologie cellulaire et écologie',
    base: '2nde',
    stream: 'science',
    diagramId: 'mitose',
    modules: [
      [
        '2nd-s-cellule',
        'La cellule, unité du vivant : organites et division cellulaire',
        'La cellule eucaryote possède un noyau, une membrane plasmique et des organites (mitochondries, réticulum, appareil de Golgi, chloroplastes chez les végétaux)',
        'La mitose conserve le nombre de chromosomes : prophase, métaphase, anaphase, télophase ; l’ADN est répliqué avant la division',
        'Confondre mitose (cellules somatiques, 2 cellules filles identiques) et méiose (cellules sexuelles, 4 cellules haploïdes)',
        'Une cellule de racine d’oignon à 2n = 16 chromosomes donne après mitose deux cellules à 16 chromosomes chacune',
      ],
      [
        '2nd-s-photosynthese',
        'Nutrition végétale : photosynthèse, absorption et circulation de la sève',
        'La photosynthèse convertit le CO₂ et l’eau en glucose et dioxygène grâce à l’énergie lumineuse captée par la chlorophylle : 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂',
        'L’eau et les sels minéraux sont absorbés par les poils absorbants et circulent par la sève brute (xylème) ; la sève élaborée circule dans le phloème',
        'Écrire que la plante respire le jour et photosynthétise la nuit : les deux processus coexistent, la photosynthèse dominant en présence de lumière',
        'Une feuille éclairée produit de l’amidon détectable à l’eau iodée ; à l’obscurité, le test reste négatif',
      ],
      [
        '2nd-s-digestion',
        'Digestion et nutrition humaine : enzymes, absorption et bilan énergétique',
        'La digestion est une hydrolyse enzymatique des macromolécules en nutriments simples absorbés par l’intestin grêle (villosités)',
        'Les glucides donnent des oses, les lipides des acides gras et du glycérol, les protides des acides aminés ; les enzymes sont spécifiques du substrat',
        'Croire que les aliments sont absorbés tels quels, ou ignorer que l’amylase salivaire agit à pH neutre et la pepsine à pH acide',
        'Un amidon cuit placé avec de l’amylase à 37 °C donne du maltose détecté à la liqueur de Fehling ; à 100 °C l’enzyme est dénaturée',
      ],
      [
        '2nd-s-ecosystemes',
        'Écosystèmes : chaînes alimentaires, cycles de matière et équilibres',
        'Un écosystème associe un biotope et une biocénose ; les êtres vivants y occupent des niveaux trophiques reliés par des chaînes alimentaires',
        'Le flux d’énergie est unidirectionnel et décroît d’un niveau à l’autre (environ 10 % transférés) ; la matière, elle, est recyclée par les décomposeurs',
        'Confondre flux d’énergie (non cyclique) et cycle de la matière (cyclique), ou surestimer le rendement écologique',
        'Dans la chaîne herbe → criquet → lézard → aigle, il faut environ 1 000 kg d’herbe pour produire 1 kg d’aigle',
      ],
    ],
  },
  {
    subjectId: 'chimie_bio',
    subjectName: 'Chimie',
    primaryExamId: 'seconde-scientifique',
    examIds: ['seconde-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'bac-d-sciences-nat'],
    zone: 'Programme officiel 2nde S — chimie générale',
    base: '2nde',
    stream: 'science',
    diagramId: 'reaction_chimique',
    modules: [
      [
        '2nd-s-atome',
        'Structure de l’atome et classification périodique',
        'Un atome est constitué d’un noyau (protons et neutrons) et d’électrons ; Z est le numéro atomique, A le nombre de masse, et l’atome est électriquement neutre',
        'Les électrons se répartissent en couches K, L, M (2, 8, 18 au maximum) ; la position dans la classification dépend du nombre d’électrons de valence',
        'Confondre A et Z, ou placer les électrons de valence sur la mauvaise couche pour les éléments de la 3ᵉ période',
        'Le sodium ²³₁₁Na possède 11 protons, 12 neutrons et la structure électronique (K)²(L)⁸(M)¹ : il perd un électron pour former Na⁺',
      ],
      [
        '2nd-s-mole',
        'Quantité de matière : mole, masse molaire et volume molaire',
        'Une mole contient N_A = 6,02 × 10²³ entités ; n = N/N_A, n = m/M et, pour un gaz dans les conditions normales, n = V/V_m avec V_m ≈ 22,4 L·mol⁻¹',
        'La masse molaire d’une molécule est la somme des masses molaires atomiques ; la masse molaire moyenne d’un mélange tient compte des fractions molaires',
        'Mélanger masse molaire atomique et masse molaire moléculaire, ou utiliser 22,4 L·mol⁻¹ hors des conditions normales',
        '18 g d’eau (M = 18 g·mol⁻¹) représentent 1 mol, soit 6,02 × 10²³ molécules ; 5,6 L de dioxygène dans les CNTP représentent 0,25 mol',
      ],
      [
        '2nd-s-solutions',
        'Solutions aqueuses : concentration, dilution et pH',
        'La concentration molaire vaut C = n/V (mol·L⁻¹) ; lors d’une dilution, la quantité de matière de soluté est conservée : C₁V₁ = C₂V₂',
        'Le pH mesure l’acidité : pH = −log[H₃O⁺] ; une solution acide a pH < 7, basique pH > 7, neutre pH = 7 à 25 °C',
        'Oublier de convertir les volumes en litres, ou croire que diluer change la quantité de soluté',
        'Prélever 10 mL d’une solution à 0,5 mol·L⁻¹ et compléter à 100 mL donne C₂ = 0,5 × 10/100 = 0,05 mol·L⁻¹',
      ],
      [
        '2nd-s-reactions',
        'Réactions chimiques : équations bilan et stoechiométrie',
        'Une équation bilan respecte la conservation des éléments et de la charge ; les coefficients stoechiométriques indiquent les proportions de réaction',
        'Le réactif limitant est celui qui disparaît le premier ; il détermine l’avancement maximal et donc la masse de produit formée',
        'Équilibrer une équation en modifiant les formules chimiques au lieu des coefficients, ou identifier le réactif limitant par la masse et non par les quantités de matière',
        'Combustion du méthane CH₄ + 2 O₂ → CO₂ + 2 H₂O : 1 mol de CH₄ consomme 2 mol de O₂ et produit 2 mol d’eau',
      ],
    ],
  },
  {
    subjectId: 'informatique',
    subjectName: 'Informatique & Sciences Numériques',
    primaryExamId: 'seconde-scientifique',
    examIds: ['seconde-scientifique', 'bac-scientifique', 'concours-ingenieur', 'concours-enam'],
    zone: 'Programme officiel 2nde S — algorithmique et numérique',
    base: '2nde',
    stream: 'science',
    modules: [
      [
        '2nd-s-algorithmique',
        'Algorithmique : variables, conditions et boucles',
        'Un algorithme est une suite finie d’instructions non ambiguës transformant des entrées en sorties ; les structures de base sont la séquence, la condition et la boucle',
        'Une boucle « pour » s’utilise quand le nombre d’itérations est connu, une boucle « tant que » quand il dépend d’une condition ; toute boucle doit progresser vers sa fin',
        'Écrire une boucle « tant que » dont la condition ne devient jamais fausse (boucle infinie), ou confondre affectation et test d’égalité',
        'Algorithme de recherche du maximum d’une liste : initialiser max au premier élément puis comparer chaque élément restant',
      ],
      [
        '2nd-s-python',
        'Programmation Python : fonctions, listes et entrées-sorties',
        'Une fonction regroupe des instructions réutilisables, reçoit des paramètres et renvoie éventuellement une valeur avec return ; l’indentation délimite les blocs',
        'Une liste est une séquence mutable indexée à partir de 0 ; len(), append(), les tranches liste[a:b] et les boucles for x in liste sont les opérations de base',
        'Oublier le décalage d’indice, ou modifier une liste pendant qu’on la parcourt avec une boucle for',
        'def moyenne(notes): return sum(notes)/len(notes) — attention à la division par zéro si la liste est vide',
      ],
      [
        '2nd-s-tableur',
        'Tableur et traitement de données : formules, tri et graphiques',
        'Une cellule se repère par sa colonne et sa ligne ; les références relatives (A1) se décalent lors de la copie, les références absolues ($A$1) restent fixes',
        'Les fonctions SOMME, MOYENNE, SI, NB.SI et RECHERCHEV couvrent la majorité des besoins ; un graphique doit être choisi selon la nature des données',
        'Utiliser une référence relative là où il faut une référence absolue, et confondre corrélation et causalité dans l’interprétation',
        '=MOYENNE(B2:B11) calcule la moyenne des notes ; =SI(B2>=10;"Admis";"Ajourné") automatise la décision',
      ],
      [
        '2nd-s-reseaux',
        'Réseaux et Internet : protocoles, adressage et sécurité de base',
        'Un réseau relie des équipements par des protocoles ; Internet repose sur la pile TCP/IP et le routage de paquets identifiés par une adresse IP',
        'Un nom de domain est traduit en adresse IP par le DNS ; HTTPS chiffre les échanges avec TLS et garantit confidentialité et intégrité',
        'Croire qu’un site HTTPS est forcément fiable sur le fond, ou confondre adresse IP publique et adresse MAC locale',
        'Saisir une adresse dans un navigateur déclenche une requête DNS, une connexion TCP, une poignée de main TLS puis une requête HTTP',
      ],
    ],
  },
];

/**
 * ============================================================================
 * SECONDE LITTÉRAIRE (2nde L / 2nde A)
 * ============================================================================
 */
export const SECONDE_L_SUBJECTS: LyceeSubjectSpec[] = [
  {
    subjectId: 'francais',
    subjectName: 'Français & Littérature',
    primaryExamId: 'seconde-litteraire',
    examIds: ['seconde-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'bac-a5-langues'],
    zone: 'Programme officiel 2nde L — série A',
    base: '2nde',
    stream: 'litteraire',
    modules: [
      [
        '2nd-l-commentaire',
        'Le commentaire littéraire : lecture analytique et construction du plan',
        'Le commentaire compose une lecture personnelle et argumentée d’un texte littéraire à partir d’observations précises sur le fond et la forme',
        'On repère d’abord le genre, le registre et les procédés dominants, puis on regroupe les remarques en deux ou trois axes hiérarchisés',
        'Raconter le texte ou paraphraser au lieu de l’analyser, et citer sans expliquer l’effet produit',
        'Sur un poème de Senghor, axe 1 : célébration de la terre africaine ; axe 2 : musique du verset et images du rythme',
      ],
      [
        '2nd-l-dissertation',
        'La dissertation littéraire : problématique, thèse et antithèse',
        'La dissertation répond à une question littéraire par un raisonnement structuré appuyé sur des exemples d’œuvres',
        'L’introduction annonce le sujet, le reformule en problématique et expose le plan ; chaque partie s’appuie sur des exemples analysés et une transition relie les parties',
        'Recopier le sujet sans le problématiser, ou empiler des exemples sans lien avec l’argument',
        'Sujet « Le théâtre n’est-il fait que pour être lu ? » : I. le texte théâtral se lit ; II. mais il est écrit pour la scène ; III. la lecture et la représentation se complètent',
      ],
      [
        '2nd-l-figures',
        'Les figures de style : identification et interprétation',
        'Une figure de style est un écart par rapport à l’usage ordinaire de la langue, produisant un effet de sens ou d’expression',
        'Comparaison (comme), métaphore (sans outil), métonymie (désigner par un lien logique), anaphore (répétition en début de vers), hyperbole, ironie',
        'Nommer la figure sans expliquer son effet, ou confondre comparaison et métaphore',
        '« Cette faucille d’or dans le champ des étoiles » (Hugo) : métaphore qui transforme le croissant de lune en outil agricole',
      ],
      [
        '2nd-l-grammaire',
        'Grammaire et orthographe : classes de mots, fonctions et concordance',
        'Les mots se classent en natures (nom, verbe, adjectif, adverbe, pronom, préposition, conjonction) et remplissent des fonctions (sujet, COD, COI, attribut, complément circonstanciel)',
        'La concordance des temps régit la subordonnée ; l’accord du participe passé dépend de l’auxiliaire et de la place du COD',
        'Confondre nature et fonction, ou accorder le participe passé avec le sujet quand l’auxiliaire est « avoir »',
        '« Les lettres que j’ai écrites » : le COD « que » placé avant l’auxiliaire avoir impose l’accord au féminin pluriel',
      ],
    ],
  },
  {
    subjectId: 'litterature_africaine',
    subjectName: 'Littérature Africaine',
    primaryExamId: 'seconde-litteraire',
    examIds: ['seconde-litteraire', 'bac-litteraire', 'bac-a4-lettres'],
    zone: 'Programme officiel 2nde L — littératures d’Afrique',
    base: '2nde',
    stream: 'litteraire',
    modules: [
      [
        '2nd-l-oralite',
        'L’oralité africaine : conte, épopée et figure du griot',
        'La littérature orale transmet mythes, contes et épopées par la parole, la musique et la performance ; le griot est à la fois historien, poète et médiateur social',
        'Le conte obéit à une structure récurrente (situation initiale, épreuve, dénouement, morale) et à une fonction didactique ; l’épopée célèbre un héros collectif',
        'Réduire l’oralité à un folklore enfantin, ou ignorer sa dimension politique et mémorielle',
        'Dans l’épopée de Soundiata, la parole du griot fonde la légitimité du héros et transmet l’histoire du Mandé',
      ],
      [
        '2nd-l-roman',
        'Le roman africain : réalisme, engagement et construction du personnage',
        'Le roman africain du XXᵉ siècle mêle réalisme social, dénonciation coloniale et affirmation culturelle ; le personnage est souvent pris entre tradition et modernité',
        'L’analyse du personnage passe par son portrait, ses actions, ses paroles et son évolution ; le narrateur peut être omniscient, témoin ou personnage',
        'Résumer l’intrigue sans étudier la focalisation et les choix d’écriture, ou réduire l’œuvre à son message',
        'Dans « L’Enfant noir » de Camara Laye, le récit à la première personne fait du souvenir d’enfance une célébration de la culture malinké',
      ],
      [
        '2nd-l-poesie',
        'Poésie africaine : rythme, image et engagement',
        'La poésie repose sur le vers, le rythme, les sonorités et les images ; la poésie africaine moderne conjugue héritage oral et formes écrites',
        'Repérer le mètre, les rimes, les rejets et les figures permet d’interpréter le sens ; l’anaphore et le refrain structurent l’élan lyrique',
        'Lire un poème comme un texte narratif et négliger la mise en page, les blancs et la musicalité',
        '« Femme noire » de Senghor : anaphores et comparaisons construisent un blason qui célèbre la femme africaine',
      ],
      [
        '2nd-l-theatre',
        'Théâtre africain : tragédie, comédie et théâtre engagé',
        'Le texte théâtral associe dialogues, didascalies et découpage en actes et scènes ; sa vocation est la représentation',
        'La double énonciation (personnage et acteur) et le conflit dramatique structurent la pièce ; la comédie corrige les mœurs par le rire',
        'Négliger les didascalies, ou oublier que le théâtre peut se lire autant que se jouer',
        'Dans « La Tragédie du roi Christophe » de Césaire, le conflit entre idéal et pouvoir construit la tragédie historique',
      ],
    ],
  },
  {
    subjectId: 'histoire_geo',
    subjectName: 'Histoire-Géographie',
    primaryExamId: 'seconde-litteraire',
    examIds: ['seconde-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'bac-b-economie'],
    zone: 'Programme officiel 2nde L — histoire et géographie',
    base: '2nde',
    stream: 'litteraire',
    modules: [
      [
        '2nd-l-civilisations',
        'Grandes civilisations et échanges transsahariens',
        'Les civilisations de la vallée du Nil, du Sahel et de la forêt ont développé des États, des techniques et des réseaux d’échange durables',
        'Le commerce transsaharien reliait l’Afrique du Nord aux empires du Ghana, du Mali et du Songhaï par des caravanes et des villes-relais comme Tombouctou',
        'Réduire l’histoire africaine à la seule période coloniale, ou ignorer les sources orales et archéologiques',
        'Tombouctou, carrefour du sel, de l’or et des manuscrits, illustre la richesse intellectuelle et commerciale du Sahel médiéval',
      ],
      [
        '2nd-l-traite',
        'La traite atlantique et les abolitions',
        'La traite atlantique organise du XVIᵉ au XIXᵉ siècle la déportation de millions d’Africains vers les Amériques dans le cadre du commerce triangulaire',
        'Analyser les causes (économie de plantation, concurrence), le fonctionnement (forts, middle passage) et les conséquences démographiques et sociales',
        'Confondre traite atlantique, traite transsaharienne et esclavage antique, ou oublier les résistances et les abolitions',
        'L’abolition de 1848 en France suit les révoltes d’esclaves, le mouvement abolitionniste et la pression économique',
      ],
      [
        '2nd-l-climats',
        'Climats et milieux au Cameroun et en Afrique centrale',
        'Les climats équatorial, tropical humide, tropical sec et sahélien déterminent des milieux, des cultures et des contraintes hydriques',
        'Les facteurs du climat sont la latitude, l’altitude, les courants et la circulation des masses d’air ; on distingue saisons sèches et saisons des pluies',
        'Confondre climat et météo, ou généraliser un climat à tout un pays sans tenir compte du relief',
        'Douala (climat équatorial, plus de 3 000 mm/an) contraste avec Maroua (climat sahélien, moins de 800 mm/an)',
      ],
      [
        '2nd-l-cartographie',
        'Lecture et production de cartes : échelle, légende et croquis',
        'Une carte est une représentation conventionnelle d’un espace ; l’échelle relie distance mesurée et distance réelle, la légende explicite les figurés',
        'Le croquis de géographie organise des figurés (surfaces, lignes, symboles) hiérarchisés au service d’un message clair',
        'Utiliser des figurés sans légende, ou confondre échelle graphique et échelle numérique',
        'À l’échelle 1/50 000, 4 cm sur la carte représentent 2 km sur le terrain',
      ],
    ],
  },
  {
    subjectId: 'anglais',
    subjectName: 'Anglais',
    primaryExamId: 'seconde-litteraire',
    examIds: ['seconde-litteraire', 'bac-litteraire', 'bac-a5-langues'],
    zone: 'Programme officiel 2nde L — anglais renforcé',
    base: '2nde',
    stream: 'litteraire',
    modules: [
      [
        '2nd-l-tenses',
        'Temps et aspects : present perfect, past simple et futurs',
        'Le past simple situe une action révolue et datée ; le present perfect relie un fait passé au présent (bilan, expérience, action non datée)',
        'Le present perfect s’emploie avec since, for, ever, never, already, yet ; le past simple avec yesterday, last week, in 2010',
        'Traduire mécaniquement le passé composé français par le present perfect sans vérifier le repère temporel',
        '« I have lived in N’Djamena for ten years » (toujours vrai) vs « I lived in Douala in 2015 » (période révolue)',
      ],
      [
        '2nd-l-comprehension',
        'Compréhension écrite : skim, scan et inférence',
        'La lecture efficace combine survol (idée générale), repérage (informations ciblées) et inférence (déduire ce qui n’est pas écrit explicitement)',
        'Repérer les mots-clés, les connecteurs logiques et les marqueurs de modalité permet de distinguer fait, opinion et hypothèse',
        'Répondre avec ses connaissances personnelles au lieu de s’appuyer sur le texte, ou recopier des phrases entières',
        'Un texte affirmant « the policy may reduce pollution » exprime une possibilité, pas une certitude',
      ],
      [
        '2nd-l-essay',
        'Expression écrite : structure de l’essai argumentatif',
        'Un essai argue une thèse en trois temps : introduction avec thèse, développement en paragraphes argumentés, conclusion qui récapitule',
        'Chaque paragraphe suit l’ordre idée → explication → exemple ; les connecteurs (however, moreover, therefore) assurent la cohérence',
        'Empiler des idées sans exemple, ou employer un registre familier dans un devoir formel',
        'Sujet « Should school start later? » : I. health arguments ; II. academic results ; III. counter-arguments and conclusion',
      ],
      [
        '2nd-l-oral',
        'Compréhension orale et prononciation',
        'La compréhension orale repose sur la reconnaissance des sons, du rythme et de l’accent tonique, et non sur la seule transcription des mots',
        'Les phonèmes /θ/, /ð/, /ɪ/, /iː/ et les finales -ed distinguent de nombreux mots ; l’accent de phrase porte sur les mots porteurs de sens',
        'Lire l’anglais comme du français, ou ignorer les formes faibles (can, of, to) qui brouillent la compréhension',
        '« I can do it » se prononce avec un /kən/ réduit, alors que « I can’t do it » est accentué et porte le /t/ final',
      ],
    ],
  },
  {
    subjectId: 'culture_gen',
    subjectName: 'Culture Générale',
    primaryExamId: 'seconde-litteraire',
    examIds: ['seconde-litteraire', 'bac-litteraire', 'concours-enam', 'concours-administratif'],
    zone: 'Programme officiel 2nde L — culture générale et institutions',
    base: '2nde',
    stream: 'litteraire',
    modules: [
      [
        '2nd-l-institutions',
        'Institutions et vie démocratique',
        'Un État de droit repose sur une constitution, la séparation des pouvoirs (exécutif, législatif, judiciaire) et le contrôle de légalité',
        'Le pouvoir exécutif applique les lois, le législatif les vote, le judiciaire les interprète ; les contre-pouvoirs garantissent les libertés',
        'Confondre régime présidentiel et parlementaire, ou décrire les institutions sans citer leur base constitutionnelle',
        'Au Cameroun, la Constitution de 1996 révisée organise un régime présidentiel avec un Parlement bicaméral',
      ],
      [
        '2nd-l-medias',
        'Médias, information et esprit critique',
        'L’information se construit par la vérification des sources ; la désinformation exploite l’émotion, la vitesse et les biais cognitifs',
        'Face à une information, vérifier la source, la date, l’auteur, les preuves et la convergence des médias fiables',
        'Partager une information parce qu’elle confirme une opinion (biais de confirmation), ou prendre une image sortie de son contexte pour une preuve',
        'Une rumeur virale sur les réseaux sociaux doit être confrontée aux communiqués officiels et aux agences de vérification',
      ],
      [
        '2nd-l-arts',
        'Les arts : courants, analyse d’œuvre et patrimoine',
        'Une œuvre s’analyse par son contexte, son support, sa composition, ses couleurs et son message ; les courants artistiques se succèdent et se répondent',
        'Décrire avant d’interpréter : identifier le sujet, la technique, le cadre, puis dégager les effets et le sens',
        'Se limiter à un jugement affectif (« j’aime ») sans analyse formelle, ou ignorer le contexte de création',
        'Une sculpture de masque Fang s’analyse par ses proportions, sa fonction rituelle et l’influence qu’elle a exercée sur les avant-gardes',
      ],
      [
        '2nd-l-methodo',
        'Méthodologie : exposé, synthèse de documents et argumentation',
        'Un exposé s’organise en introduction, développement structuré et conclusion ; la synthèse confronte plusieurs documents sans les commenter séparément',
        'La synthèse dégage les idées communes et les divergences en reformulant, avec un plan thématique et une introduction hors document',
        'Recopier les documents ou introduire des opinions personnelles dans une synthèse',
        'Trois documents sur la jeunesse et l’emploi se synthétisent en : constats partagés, causes divergentes, solutions proposées',
      ],
    ],
  },
];

/**
 * ============================================================================
 * TERMINALE SCIENTIFIQUE (Tle S / C / D / E)
 * ============================================================================
 */
export const TERMINALE_S_SUBJECTS: LyceeSubjectSpec[] = [
  {
    subjectId: 'maths',
    subjectName: 'Mathématiques',
    primaryExamId: 'terminale-scientifique',
    examIds: ['terminale-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'bac-e-maths-techniques', 'concours-ingenieur'],
    zone: 'Programme officiel Terminale S — séries C, D et E',
    base: 'terminale',
    stream: 'science',
    diagramId: 'parabole',
    modules: [
      [
        'tle-s-limites',
        'Limites et continuité : comportement asymptotique d’une fonction',
        'La limite décrit le comportement d’une fonction quand la variable tend vers un réel ou l’infini ; une fonction continue sur un intervalle vérifie le théorème des valeurs intermédiaires',
        'Si f est continue et strictement monotone sur [a ; b] et si f(a)·f(b) < 0, l’équation f(x) = 0 admet une unique solution dans ]a ; b[',
        'Écrire qu’une fonction est continue parce qu’elle est dérivable sans vérifier le domaine, ou conclure à une asymptote sans calculer la limite',
        'f(x) = x³ − 3x + 1 : f(0) = 1 et f(1) = −1, donc l’équation f(x) = 0 admet une racine dans ]0 ; 1[',
      ],
      [
        'tle-s-derivation',
        'Dérivation et étude complète d’une fonction',
        'La dérivée mesure la variation instantanée ; le signe de f′ donne les variations de f et les extremums annulent f′ en changeant de signe',
        'Étude type : domaine, limites, dérivée, tableau de signes, variations, extremums, asymptotes, tangentes et courbe',
        'Oublier le domaine de définition avant de dériver, ou confondre extremum et point où la dérivée s’annule sans changement de signe',
        'f(x) = x + 1/x sur ]0 ; +∞[ : f′(x) = 1 − 1/x², minimum 2 atteint en x = 1, asymptote verticale en 0',
      ],
      [
        'tle-s-integration',
        'Calcul intégral : primitives, intégrale et aire',
        'Une primitive F de f vérifie F′ = f ; l’intégrale de a à b de f vaut F(b) − F(a) et mesure l’aire algébrique sous la courbe',
        'Les primitives usuelles (xⁿ, 1/x, eˣ, sin x, cos x) et la linéarité permettent de calculer la plupart des intégrales ; une intégrale peut être négative si f < 0',
        'Oublier la constante d’intégration dans une primitive, ou confondre aire géométrique et intégrale algébrique',
        '∫₀¹ 2x dx = [x²]₀¹ = 1 : l’aire sous la droite y = 2x entre 0 et 1 vaut 1 unité d’aire',
      ],
      [
        'tle-s-probabilites',
        'Probabilités : conditionnement, indépendance et variables aléatoires',
        'La probabilité conditionnelle de A sachant B vaut P(A|B) = P(A ∩ B)/P(B) ; deux événements sont indépendants si P(A ∩ B) = P(A)·P(B)',
        'L’espérance d’une variable aléatoire discrète vaut E(X) = Σ xᵢ·P(X = xᵢ) ; la variance mesure la dispersion autour de l’espérance',
        'Confondre P(A|B) et P(B|A), ou additionner des probabilités d’événements non incompatibles',
        'Deux tirages sans remise dans une urne ne sont pas indépendants : P(2ᵉ rouge | 1ʳᵉ rouge) dépend du premier tirage',
      ],
    ],
  },
  {
    subjectId: 'physique',
    subjectName: 'Physique',
    primaryExamId: 'terminale-scientifique',
    examIds: ['terminale-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'bac-e-maths-techniques'],
    zone: 'Programme officiel Terminale S — ondes, nucléaire, électricité, mécanique',
    base: 'terminale',
    stream: 'science',
    diagramId: 'circuit_rc',
    modules: [
      [
        'tle-s-ondes',
        'Ondes mécaniques et électromagnétiques',
        'Une onde transporte de l’énergie sans transport de matière ; la longueur d’onde, la fréquence et la célérité vérifient λ = v·T = v/f',
        'La diffraction et les interférences caractérisent les ondes ; la lumière se propage dans le vide à c = 3,00 × 10⁸ m·s⁻¹',
        'Confondre fréquence (constante, liée à la source) et longueur d’onde (variable selon le milieu)',
        'Une onde sonore de 440 Hz se propage à 340 m·s⁻¹ : λ = 0,77 m ; dans l’eau, la fréquence reste 440 Hz mais λ change',
      ],
      [
        'tle-s-radioactivite',
        'Décroissance radioactive et réactions nucléaires',
        'La loi de décroissance s’écrit N(t) = N₀·e^(−λt) ; la demi-vie T vérifie λ = ln2/T et le temps de demi-vie divise l’effectif par deux',
        'Les réactions nucléaires respectent la conservation du nombre de masse A et du nombre de charge Z ; la fusion libère de l’énergie par défaut de masse',
        'Confondre demi-vie et durée de vie moyenne, ou oublier de vérifier la conservation de A et Z dans une équation nucléaire',
        'Un isotope de demi-vie 8 jours conserve 25 % de son activité au bout de 16 jours (deux demi-vies)',
      ],
      [
        'tle-s-rc',
        'Dipôle RC et circuits électriques en régime variable',
        'La constante de temps d’un circuit RC vaut τ = RC ; la charge du condensateur suit u(t) = E(1 − e^(−t/τ))',
        'Au bout de 5τ, le régime permanent est atteint à plus de 99 % ; l’énergie stockée dans un condensateur vaut ½·C·u²',
        'Utiliser les lois du régime continu (U = RI) pour un condensateur en régime transitoire',
        'R = 1 kΩ et C = 1 µF donnent τ = 1 ms : le condensateur est chargé à 99 % après 5 ms',
      ],
      [
        'tle-s-newton',
        'Lois de Newton et mouvements dans un champ uniforme',
        'Dans un référentiel galiléen, la somme des forces vaut m·a ; le principe d’inertie énonce qu’un corps isolé conserve sa vitesse',
        'Projection de la deuxième loi sur les axes, puis intégration pour obtenir vitesse et position ; le poids et la force électrique sont des forces constantes',
        'Oublier de préciser le référentiel galiléen, ou confondre masse et poids dans les calculs',
        'Un projectile lancé horizontalement dans le champ de pesanteur décrit une parabole : x = v₀t, y = −½gt²',
      ],
    ],
  },
  {
    subjectId: 'svt',
    subjectName: 'Sciences de la Vie et de la Terre',
    primaryExamId: 'terminale-scientifique',
    examIds: ['terminale-scientifique', 'bac-scientifique', 'bac-d-sciences-nat', 'concours-medecine'],
    zone: 'Programme officiel Terminale S — génétique, immunologie, géologie',
    base: 'terminale',
    stream: 'science',
    diagramId: 'mitose',
    modules: [
      [
        'tle-s-genetique',
        'Génétique mendélienne et transmission des caractères',
        'Les gènes portés par les chromosomes transmettent les caractères selon les lois de Mendel ; les allèles peuvent être dominants, récessifs ou codominants',
        'Un croisement hybride Aa × Aa donne 3/4 de phénotype dominant et 1/4 récessif ; le test-cross Aa × aa donne 1/2-1/2 et révèle le génotype',
        'Confondre génotype et phénotype, ou oublier que les gènes liés ne se répartissent pas indépendamment',
        'Deux parents hétérozygotes pour une maladie récessive ont 1 chance sur 4 d’avoir un enfant malade à chaque grossesse',
      ],
      [
        'tle-s-immunologie',
        'Immunologie : réponses innée et adaptative',
        'L’immunité innée est immédiate et non spécifique ; l’immunité adaptative repose sur les lymphocytes B (anticorps) et T (cellules infectées)',
        'L’antigène déclenche la sélection clonale, la production d’anticorps et la mémoire immunitaire ; la vaccination exploite cette mémoire',
        'Confondre séropositivité et maladie déclarée, ou croire que les antibiotiques agissent sur les virus',
        'Le VIH détruit les lymphocytes T4 : la chute des défenses ouvre la porte aux infections opportunistes',
      ],
      [
        'tle-s-tectonique',
        'Tectonique des plaques et dynamique terrestre',
        'La lithosphère est découpée en plaques mobiles sur l’asthénosphère ; les dorsales créent de la croûte, les zones de subduction la recyclent',
        'Les séismes et volcans marquent les limites de plaques ; le paléomagnétisme et l’âge des sédiments prouvent l’expansion océanique',
        'Confondre limite divergente et convergente, ou attribuer les séismes à une cause unique',
        'La fosse du Japon illustre une subduction : séismes profonds, volcanisme explosif et formation d’une chaîne de montagnes',
      ],
      [
        'tle-s-reproduction',
        'Reproduction humaine et maîtrise de la procréation',
        'Le cycle féminin est contrôlé par l’axe hypothalamo-hypophysaire et les hormones ovariennes (œstrogènes, progestérone)',
        'L’ovulation survient sous le pic de LH ; la fécondation a lieu dans le tiers externe de la trompe et la nidation dans l’endomètre',
        'Confondre contraception (empêcher la fécondation) et contragestion (empêcher la nidation), ou ignorer le rôle du rétrocontrôle',
        'La pilule combinée bloque l’ovulation par rétrocontrôle négatif sur l’hypophyse',
      ],
    ],
  },
  {
    subjectId: 'chimie_bio',
    subjectName: 'Chimie',
    primaryExamId: 'terminale-scientifique',
    examIds: ['terminale-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'bac-d-sciences-nat'],
    zone: 'Programme officiel Terminale S — chimie générale et organique',
    base: 'terminale',
    stream: 'science',
    diagramId: 'reaction_chimique',
    modules: [
      [
        'tle-s-acides',
        'Acides et bases : pH, titrages et solutions tampons',
        'Un acide cède un proton, une base en capte ; le pH vaut −log[H₃O⁺] et la constante d’acidité Ka relie les espèces conjuguées',
        'À l’équivalence d’un titrage acide-base, les quantités de matière sont dans les proportions stoechiométriques : CₐVₐ = C_bV_b pour un monoacide',
        'Confondre equivalence acido-basique et neutralité (pH = 7), ou oublier de tenir compte de la dilution',
        'Titrage de 20 mL d’HCl par NaOH à 0,1 mol·L⁻¹ : équivalence pour 20 mL, pH = 7 seulement si acide et base sont forts',
      ],
      [
        'tle-s-redox',
        'Oxydoréduction : nombres d’oxydation et piles',
        'Une oxydation est une perte d’électrons, une réduction un gain ; l’oxydant est réduit et le réducteur oxydé',
        'Dans une pile, l’oxydation a lieu à l’anode (pôle négatif) et la réduction à la cathode (pôle positif) ; la force électromotrice vaut E = E°(cathode) − E°(anode)',
        'Inverser anode et cathode, ou oublier d’équilibrer les demi-équations en milieu acide',
        'Pile Daniell Zn/Cu : E° = 0,34 − (−0,76) = 1,10 V ; le zinc s’oxyde et le cuivre se dépose',
      ],
      [
        'tle-s-cinetique',
        'Cinétique chimique : vitesse, ordre et facteurs d’influence',
        'La vitesse de réaction mesure la variation de concentration par unité de temps ; elle dépend des concentrations, de la température et des catalyseurs',
        'La loi de vitesse v = k[A]ᵐ[B]ⁿ définit les ordres partiels ; le temps de demi-réaction caractérise la durée d’une transformation',
        'Confondre vitesse instantanée et vitesse moyenne, ou croire qu’un catalyseur modifie l’état final',
        'Un catalyseur abaisse l’énergie d’activation : la réaction est plus rapide mais le rendement final reste inchangé',
      ],
      [
        'tle-s-organique',
        'Chimie organique : groupes fonctionnels et réactions',
        'Les molécules organiques se caractérisent par leur squelette carboné et leurs groupes fonctionnels (alcool, aldéhyde, cétone, acide carboxylique, ester, amine)',
        'Les réactions types sont l’estérification, l’hydrolyse, l’oxydation des alcools et les substitutions ; la nomenclature suit les règles IUPAC',
        'Confondre aldéhyde et cétone, ou oublier que l’estérification est limitée et athermique',
        'L’oxydation ménagée du propan-2-ol donne de la propanone (cétone) ; celle du propan-1-ol peut donner l’aldéhyde puis l’acide',
      ],
    ],
  },
  {
    subjectId: 'informatique',
    subjectName: 'Informatique & Sciences Numériques',
    primaryExamId: 'terminale-scientifique',
    examIds: ['terminale-scientifique', 'bac-scientifique', 'concours-ingenieur', 'concours-enam'],
    zone: 'Programme officiel Terminale S — bases de données, algorithmes, réseaux',
    base: 'terminale',
    stream: 'science',
    diagramId: 'sql_relations',
    modules: [
      [
        'tle-s-sql',
        'Bases de données relationnelles et langage SQL',
        'Une base relationnelle organise les données en tables reliées par des clés ; la clé primaire identifie une ligne, la clé étrangère référence une autre table',
        'SELECT, FROM, WHERE, JOIN, GROUP BY et ORDER BY couvrent l’interrogation ; une jointure combine les lignes de deux tables sur un critère commun',
        'Oublier la clause ON d’une jointure (produit cartésien), ou confondre WHERE et HAVING sur des agrégats',
        'SELECT nom, AVG(note) FROM eleves JOIN notes ON eleves.id = notes.eleve_id GROUP BY nom ORDER BY nom',
      ],
      [
        'tle-s-algorithmes',
        'Algorithmes et complexité : tri, recherche et récursivité',
        'Un algorithme se juge sur sa correction et son coût ; la complexité décrit l’ordre de grandeur du temps en fonction de la taille des données',
        'La recherche dichotomique sur un tableau trié est en O(log n) ; le tri par insertion est en O(n²) dans le pire cas ; la récursivité exige un cas de base',
        'Oublier le cas de base d’une fonction récursive (débordement de pile), ou appliquer une recherche dichotomique sur un tableau non trié',
        'Rechercher 42 dans un tableau trié de 1 000 éléments par dichotomie nécessite au plus 10 comparaisons',
      ],
      [
        'tle-s-reseaux',
        'Réseaux : modèles en couches, routage et protocoles',
        'Le modèle TCP/IP organise la communication en couches (accès réseau, Internet, transport, application) ; chaque couche rend un service à la couche supérieure',
        'IP assure l’adressage et le routage, TCP la fiabilité et l’ordre, UDP la rapidité sans garantie ; les ports identifient les services',
        'Confondre IPv4 et IPv6, ou croire que TCP et UDP offrent les mêmes garanties',
        'Une requête web utilise TCP sur le port 443, tandis qu’une visioconférence privilégie souvent UDP pour limiter la latence',
      ],
      [
        'tle-s-cyber',
        'Cybersécurité : menaces, chiffrement et hygiène numérique',
        'Les menaces courantes sont le phishing, le rançongiciel, l’injection SQL et l’attaque par force brute ; la sécurité repose sur la prévention, la détection et la réaction',
        'Le chiffrement symétrique utilise une clé partagée, l’asymétrique une paire clé publique/privée ; le hachage garantit l’intégrité sans réversibilité',
        'Confondre chiffrement (confidentialité) et hachage (intégrité), ou réutiliser le même mot de passe partout',
        'Un mot de passe long avec gestionnaire dédié et double authentification réduit fortement le risque de compromission',
      ],
    ],
  },
];

/**
 * ============================================================================
 * TERMINALE LITTÉRAIRE (Tle L / A / B / G)
 * ============================================================================
 */
export const TERMINALE_L_SUBJECTS: LyceeSubjectSpec[] = [
  {
    subjectId: 'philo',
    subjectName: 'Philosophie',
    primaryExamId: 'terminale-litteraire',
    examIds: ['terminale-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'concours-enam'],
    zone: 'Programme officiel Terminale L — philosophie',
    base: 'terminale',
    stream: 'litteraire',
    modules: [
      [
        'tle-l-conscience',
        'La conscience et le sujet',
        'La conscience est la connaissance immédiate que le sujet a de lui-même et du monde ; elle fonde la responsabilité et l’identité personnelle',
        'Distinguer conscience spontanée et conscience réfléchie ; l’inconscient freudien interroge l’idée d’une transparence totale du sujet à lui-même',
        'Confondre conscience morale et conscience psychologique, ou réduire l’inconscient à un simple oubli',
        '« Puis-je être tenu responsable de ce que je fais sans en avoir conscience ? » ouvre sur la responsabilité juridique et morale',
      ],
      [
        'tle-l-verite',
        'Vérité, science et opinion',
        'La vérité désigne l’adéquation entre le jugement et le réel ; la science construit des vérités vérifiables par l’expérience et la démonstration',
        'Distinguer opinion (adhésion non justifiée), croyance (conviction), certitude et vérité ; la preuve et la réfutation fondent la démarche scientifique',
        'Confondre vérité et certitude subjective, ou opposer science et vérité sans examiner leurs critères',
        'Bachelard montre que la science se construit contre les obstacles épistémologiques et les évidences premières',
      ],
      [
        'tle-l-liberte',
        'La liberté et le déterminisme',
        'La liberté est l’absence de contrainte mais aussi la capacité de se déterminer par soi-même ; le déterminisme affirme que tout événement a une cause',
        'Le libre arbitre s’oppose au déterminisme strict ; Spinoza propose une liberté comme connaissance de la nécessité',
        'Confondre liberté et absence de règles, ou nier toute responsabilité au nom du déterminisme',
        'Un homme contraint par la nécessité naturelle peut néanmoins accéder à la liberté par la compréhension de ce qui le détermine',
      ],
      [
        'tle-l-etat',
        'L’État, la justice et le droit',
        'L’État est l’institution qui détient le monopole de la contrainte légitime ; la justice distributive répartit, la justice commutative égalise les échanges',
        'Le contrat social fonde la légitimité politique ; la loi positive doit être distinguée de la loi naturelle et de la morale',
        'Confondre légalité et légitimité, ou réduire la justice à la seule sanction',
        'La désobéissance civile pose la question d’une loi injuste : obéir ou résister au nom d’un principe supérieur ?',
      ],
    ],
  },
  {
    subjectId: 'francais',
    subjectName: 'Français & Littérature',
    primaryExamId: 'terminale-litteraire',
    examIds: ['terminale-litteraire', 'bac-litteraire', 'bac-a4-lettres'],
    zone: 'Programme officiel Terminale L — épreuves du Bac',
    base: 'terminale',
    stream: 'litteraire',
    modules: [
      [
        'tle-l-dissertation',
        'La dissertation littéraire : méthode complète',
        'La dissertation littéraire construit un raisonnement sur une question de littérature à partir d’exemples précis et d’une problématique claire',
        'Introduction en trois temps (amorce, problématique, annonce du plan), développement en deux ou trois parties équilibrées, conclusion qui répond à la question',
        'Réciter un cours sans construire d’argumentation, ou juxtaposer des exemples sans les analyser',
        'Sujet « Le roman doit-il faire rêver ou refléter le réel ? » : I. le roman miroir ; II. le roman évasion ; III. le roman comme vision du monde',
      ],
      [
        'tle-l-commentaire',
        'Le commentaire composé : observer, interpréter, rédiger',
        'Le commentaire compose une analyse méthodique d’un texte littéraire en dégageant les procédés et leurs effets de sens',
        'Repérer les procédés (lexique, syntaxe, figures, rythme), les regrouper en axes et rédiger des paragraphes argumentés avec citations entre guillemets',
        'Paraphraser le texte en citant sans analyser, ou rédiger un plan sans introduction rédigée',
        'Sur un extrait de Césaire, axe 1 : la révolte du sujet colonial ; axe 2 : la violence du rythme et des images',
      ],
      [
        'tle-l-resume',
        'Le résumé de texte et la contraction de texte',
        'Le résumé restitue fidèlement et brièvement les idées essentielles d’un texte en respectant son ordre et son système d’énonciation',
        'Lire le texte, repérer la thèse, les arguments et les exemples, puis reformuler en respectant le nombre de mots et les proportions des parties',
        'Recopier des phrases du texte, ou introduire des idées absentes de l’auteur',
        'Un texte de 1 000 mots résumé en 250 mots conserve le plan en quatre parties proportionnellement réduites',
      ],
      [
        'tle-l-oral',
        'L’oral du Bac : lecture, explication et entretien',
        'L’épreuve orale comprend une lecture expressive, une explication linéaire et un entretien avec l’examinateur sur l’œuvre et l’objet d’étude',
        'Préparer un plan linéaire avec procédés et effets, soigner l’élocution et savoir défendre une interprétation personnelle',
        'Réciter une fiche apprise par cœur sans adaptation au texte proposé, ou négliger la lecture expressive',
        'L’entretien attend une réflexion personnelle : « Pourquoi cette œuvre reste-t-elle actuelle ? »',
      ],
    ],
  },
  {
    subjectId: 'histoire_geo',
    subjectName: 'Histoire-Géographie',
    primaryExamId: 'terminale-litteraire',
    examIds: ['terminale-litteraire', 'bac-litteraire', 'bac-b-economie'],
    zone: 'Programme officiel Terminale L — histoire et géographie du monde contemporain',
    base: 'terminale',
    stream: 'litteraire',
    modules: [
      [
        'tle-l-guerres',
        'Les deux guerres mondiales : causes, déroulement et conséquences',
        'Les guerres mondiales sont des conflits totaux (mobilisation économique, idéologique et humaine) qui redessinent les frontières et l’ordre mondial',
        'Analyser les causes profondes et immédiates, les grandes phases, les conséquences démographiques politiques et morales, et les tentatives de paix',
        'Raconter les batailles sans analyser les enjeux et les conséquences, ou confondre les deux conflits',
        'La Première Guerre mondiale conduit aux traités de 1919-1920 ; la Seconde s’achève sur la création de l’ONU en 1945',
      ],
      [
        'tle-l-decolonisation',
        'Décolonisation et construction des États africains',
        'L’après-1945 voit l’émancipation politique des colonies africaines et asiatiques, entre négociation, indépendance et conflits armés',
        'Étudier les facteurs (guerre, ONU, élites, contestation), les modalités (indépendances negociated ou guerres) et les défis des jeunes États',
        'Confondre indépendance et décolonisation économique, ou ignorer les frontières héritées et les conflits frontaliers',
        'Le Cameroun accède à l’indépendance en 1960, puis à la réunification en 1961 par référendum',
      ],
      [
        'tle-l-mondialisation',
        'Mondialisation : échanges, acteurs et contestations',
        'La mondialisation est l’intensification des échanges de biens, de services, de capitaux et d’informations à l’échelle mondiale',
        'Elle s’appuie sur des acteurs (firmes transnationales, États, organisations internationales) et des flux (commerciaux, financiers, migratoires) inégaux',
        'Confondre mondialisation et uniformisation, ou ignorer les résistances et les inégalités territoriales',
        'Les ports africains et les corridors logistiques illustrent l’insertion différenciée du continent dans les échanges mondiaux',
      ],
      [
        'tle-l-afrique',
        'L’Afrique et le Cameroun dans les relations internationales',
        'Les États africains participent aux organisations régionales (UA, CEMAC, CEDEAO) et aux instances mondiales (ONU, OMC)',
        'Analyser les enjeux de coopération, d’intégration régionale, de sécurité et de développement durable',
        'Réduire l’Afrique à un objet d’aide, ou ignorer son rôle dans les négociations climatiques et commerciales',
        'La CEMAC coordonne les politiques monétaires et commerciales de ses six États membres autour du franc CFA',
      ],
    ],
  },
  {
    subjectId: 'litterature_africaine',
    subjectName: 'Littérature Africaine',
    primaryExamId: 'terminale-litteraire',
    examIds: ['terminale-litteraire', 'bac-litteraire', 'bac-a4-lettres'],
    zone: 'Programme officiel Terminale L — littératures africaines',
    base: 'terminale',
    stream: 'litteraire',
    modules: [
      [
        'tle-l-negritude',
        'La négritude : fondements, figures et débats',
        'La négritude est un mouvement littéraire et politique qui affirme la dignité et la valeur des cultures noires, porté par Senghor, Césaire et Damas',
        'Analyser ses sources (Panafricanisme, Harlem Renaissance, surréalisme), ses thèmes (mémoire, terre, souffrance, espoir) et ses critiques (essentialisme)',
        'Réduire la négritude à un simple éloge de la couleur, ou ignorer les critiques qui lui ont été adressées',
        '« Cahier d’un retour au pays natal » de Césaire mêle révolte et célébration de l’identité noire',
      ],
      [
        'tle-l-roman-post',
        'Le roman postcolonial : histoire, mémoire et identité',
        'Le roman postcolonial interroge les héritages coloniaux, la construction des identités et les violences de l’histoire',
        'Étudier la construction narrative (focalisation, temporalité, intertextualité) et la manière dont le récit porte une mémoire collective',
        'Réduire l’œuvre à sa dimension documentaire, ou ignorer la complexité formelle du récit',
        '« L’Aventure ambiguë » de Cheikh Hamidou Kane confronte école coranique et école coloniale',
      ],
      [
        'tle-l-theatre-engage',
        'Le théâtre engagé africain',
        'Le théâtre africain engagé met en scène les tensions politiques et sociales pour éveiller la conscience et provoquer le débat',
        'Le conflit dramatique, la satire et la double énonciation servent la critique ; les didascalies portent une part du sens',
        'Négliger la dimension scénique, ou confondre message de l’auteur et parole des personnages',
        '« Une saison au Congo » de Césaire met en scène l’assassinat de Lumumba et la trahison politique',
      ],
      [
        'tle-l-poesie-mod',
        'Poésie africaine moderne : voix, formes et héritages',
        'La poésie africaine contemporaine prolonge l’héritage oral (griot, chant) tout en explorant les formes modernes et les questions urbaines',
        'Analyser le rythme, l’énonciation, les images et les ruptures de forme pour dégager la vision du monde du poète',
        'Lire le poème comme un simple message politique sans étudier sa forme, ou ignorer la musicalité',
        'Les recueils de Tchicaya U Tam’si travaillent la fracture et la souffrance historique par une syntaxe éclatée',
      ],
    ],
  },
  {
    subjectId: 'anglais',
    subjectName: 'Anglais',
    primaryExamId: 'terminale-litteraire',
    examIds: ['terminale-litteraire', 'bac-litteraire', 'bac-a5-langues'],
    zone: 'Programme officiel Terminale L — anglais renforcé',
    base: 'terminale',
    stream: 'litteraire',
    modules: [
      [
        'tle-l-essay',
        'Essai argumentatif : plan, cohérence et registre',
        'L’essai argumentatif défend une position en trois parties avec des arguments illustrés, une progression logique et un registre adapté',
        'Chaque paragraphe respecte l’unité (une idée), la cohérence (connecteurs) et l’illustration (exemple concret)',
        'Employer des formules toutes faites sans argument, ou mélanger les registres formel et familier',
        'Sujet « Social media: a tool for freedom or a threat to democracy? » : thèse, antithèse, synthèse personnelle',
      ],
      [
        'tle-l-literature',
        'Étude d’un extrait littéraire anglophone',
        'L’étude d’un extrait associe compréhension fine, repérage des procédés et interprétation du contexte culturel',
        'Identifier le narrateur, le point de vue, les images et les tonalités pour construire une lecture argumentée',
        'Résumer l’extrait sans analyser les choix d’écriture, ou projeter des interprétations non étayées',
        'Un extrait d’« Things Fall Apart » d’Achebe se lit dans son contexte de rencontre coloniale et de résistance culturelle',
      ],
      [
        'tle-l-grammar',
        'Grammaire avancée : modaux, conditionnels et reported speech',
        'Les modaux expriment la capacité, la probabilité, l’obligation et l’hypothèse ; les conditionnels construisent des scénarios irréels',
        'Le conditionnel type 2 (if + past, would + base) exprime une hypothèse contraire au réel ; le type 3 un regret sur le passé',
        'Utiliser « will » dans la subordonnée conditionnelle, ou conserver les temps du discours direct au style indirect',
        '« If I had known, I would have applied » exprime un regret irréel du passé',
      ],
      [
        'tle-l-oral',
        'Expression orale : entretien, débat et présentation',
        'L’oral évalue la fluidité, la prononciation, la correction grammaticale et la capacité à défendre un point de vue',
        'Préparer des idées (pas un texte à lire), utiliser des connecteurs oraux et reformuler en cas d’hésitation',
        'Réciter un texte appris par cœur, ou répondre par oui/non sans développement',
        'En entretien, développer sa réponse en deux phrases puis illustrer par un exemple personnel',
      ],
    ],
  },
];

export const LYCEE_SUBJECT_SPECS: LyceeSubjectSpec[] = [
  ...SECONDE_S_SUBJECTS,
  ...SECONDE_L_SUBJECTS,
  ...TERMINALE_S_SUBJECTS,
  ...TERMINALE_L_SUBJECTS,
];
