export type PremiereModule = [
  slug: string,
  moduleTitle: string,
  coreConcept: string,
  keyRule: string,
  examTrap: string,
  practicalCase: string
];

export interface PremiereSubjectSpec {
  subjectId: string;
  subjectName: string;
  primaryExamId: string;
  examIds: string[];
  zone: string;
  stream: 'science' | 'litteraire';
  diagramId?:
    | 'parabole'
    | 'circuit_rc'
    | 'mitose'
    | 'reaction_chimique'
    | 'sql_relations'
    | 'couches_geologiques'
    | 'pyramide_alimentaire';
  modules: PremiereModule[];
}

/**
 * ============================================================================
 * v17.7 — PREMIÈRE SCIENTIFIQUE (1ère S / séries C & D)
 * 5 matières × 4 modules × 5 chapitres progressifs = 100 chapitres dédiés.
 * Ces chapitres s'ajoutent aux 100 chapitres déjà présents dans chaque matière.
 * ============================================================================
 */
export const PREMIERE_S_SUBJECTS: PremiereSubjectSpec[] = [
  {
    subjectId: 'maths',
    subjectName: 'Mathématiques',
    primaryExamId: 'premiere-scientifique',
    examIds: [
      'premiere-scientifique',
      'bac-scientifique',
      'bac-c-maths-physique',
      'bac-d-sciences-nat',
      'concours-ingenieur',
      'concours-medecine',
    ],
    zone: 'Programme officiel 1ère S — séries C & D',
    stream: 'science',
    diagramId: 'parabole',
    modules: [
      [
        'prem-s-second-degre',
        'Second degré : formes canoniques, discriminant et inéquations',
        'Trinôme ax² + bx + c (a ≠ 0) : forme canonique a(x + α)² + β avec α = −b/2a et β = f(α) ; discriminant Δ = b² − 4ac',
        'Δ > 0 : deux racines réelles (−b ± √Δ)/2a ; Δ = 0 : racine double −b/2a ; Δ < 0 : aucune racine réelle ; le trinôme est du signe de a à l’extérieur des racines et du signe opposé entre elles',
        'Confondre le signe du trinôme avec le signe du discriminant, et oublier la condition a ≠ 0 avant de conclure sur la nature de la courbe',
        'Résoudre 2x² − 5x + 3 = 0 : Δ = 25 − 24 = 1, racines x = 1 et x = 3/2 ; le trinôme est positif sur ]−∞ ; 1[ ∪ ]1,5 ; +∞[ car a = 2 > 0',
      ],
      [
        'prem-s-suites',
        'Suites arithmétiques et géométriques : terme général et sommes',
        'Suite arithmétique de raison r : uₙ = u₀ + n·r ; suite géométrique de raison q (q ≠ 1) : uₙ = u₀·qⁿ ; monotonie selon le signe de r ou la position de q par rapport à 1',
        'Somme arithmétique = nombre de termes × (premier + dernier)/2 ; somme géométrique = premier terme × (1 − qⁿᵒᵐᵇʳᵉ)/(1 − q) ; uₙ₊₁ − uₙ = r et uₙ₊₁/uₙ = q pour tout n',
        'Compter un terme de trop dans une somme (il y a n + 1 termes de u₀ à uₙ) et appliquer la formule géométrique avec q = 1',
        'Capital de 50 000 F placé à 4 % par an : uₙ = 50 000 × 1,04ⁿ ; au bout de 5 ans, u₅ ≈ 60 833 F ; la somme des 5 premiers versements s’obtient avec la formule géométrique',
      ],
      [
        'prem-s-derivation',
        'Dérivation : nombre dérivé, tangente et tableau de variations',
        'Le nombre dérivé f′(a) est la limite du taux d’accroissement (f(a+h) − f(a))/h ; il représente le coefficient directeur de la tangente en a',
        '(u + v)′ = u′ + v′ ; (uv)′ = u′v + uv′ ; (u/v)′ = (u′v − uv′)/v² ; f est croissante sur un intervalle I lorsque f′(x) ≥ 0 sur I',
        'Oublier le dénominateur v² dans la dérivée d’un quotient, et conclure sur les variations sans étudier le signe de f′',
        'f(x) = x³ − 3x : f′(x) = 3x² − 3 = 3(x − 1)(x + 1) ; maximum local f(−1) = 2, minimum local f(1) = −2, tangente horizontale en ces deux points',
      ],
      [
        'prem-s-trigo-produit-scalaire',
        'Trigonométrie, cercle trigonométrique et produit scalaire',
        'Cercle trigonométrique, mesures en radians, cosinus et sinus ; produit scalaire de deux vecteurs u⃗·v⃗ = ‖u⃗‖‖v⃗‖cos θ = x·x′ + y·y′',
        'cos(a + b) = cos a cos b − sin a sin b ; sin(a + b) = sin a cos b + cos a sin b ; cos 2a = 2cos²a − 1 ; cos θ = (u⃗·v⃗)/(‖u⃗‖‖v⃗‖) et orthogonalité si u⃗·v⃗ = 0',
        'Écrire cos 2a = 2cos a (au lieu de 2cos²a − 1) et oublier de convertir les degrés en radians dans les formules d’addition',
        'u⃗(3 ; 4) et v⃗(1 ; 0) : u⃗·v⃗ = 3 et ‖u⃗‖ = 5, donc cos θ = 3/5 soit θ ≈ 53,13° ; les vecteurs sont orthogonaux si et seulement si u⃗·v⃗ = 0',
      ],
    ],
  },
  {
    subjectId: 'physique',
    subjectName: 'Physique',
    primaryExamId: 'premiere-scientifique',
    examIds: ['premiere-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'concours-ingenieur'],
    zone: 'Programme officiel 1ère S — ondes, champs et mécanique',
    stream: 'science',
    diagramId: 'circuit_rc',
    modules: [
      [
        'prem-s-ondes-lumiere',
        'Ondes mécaniques, lumière et spectres',
        'Onde progressive : période T, fréquence f = 1/T, longueur d’onde λ = v·T ; lumière = onde électromagnétique, spectre visible 400–800 nm',
        'Réfraction : n₁ sin i₁ = n₂ sin i₂ (loi de Snell-Descartes) ; fréquence invariante au changement de milieu, longueur d’onde et célérité modifiées',
        'Confondre fréquence (invariante) et longueur d’onde (variable selon le milieu) et oublier l’angle limite de réfraction totale',
        'Ondes sonores à 440 Hz dans l’air (v = 340 m/s) : λ = 340/440 ≈ 0,77 m ; dans l’eau (v = 1 480 m/s) : λ ≈ 3,36 m pour la même fréquence',
      ],
      [
        'prem-s-electrostatique',
        'Champ électrostatique, potentiel et condensateurs',
        'Force de Coulomb F = k·|q₁q₂|/r² ; champ électrique E⃗ = F⃗/q ; potentiel V, différence de potentiel U = V₁ − V₂ et énergie d’un condensateur',
        'E = U/d dans un condensateur plan ; capacité C = Q/U ; énergie stockée W = ½CU² ; les lignes de champ partent des charges positives et arrivent sur les négatives',
        'Confondre champ (vecteur, N/C ou V/m) et potentiel (scalaire, volts) et oublier le carré de la distance dans la loi de Coulomb',
        'Condensateur 10 µF chargé sous 12 V : Q = CU = 120 µC et W = ½ × 10⁻⁵ × 144 = 7,2 × 10⁻⁴ J',
      ],
      [
        'prem-s-mecanique',
        'Cinématique et dynamique : forces, travail et énergie',
        'Référentiel, vecteur vitesse et accélération ; deuxième loi de Newton ΣF⃗ = m·a⃗ ; travail d’une force, énergie cinétique et énergie potentielle',
        'Théorème de l’énergie cinétique : ΔEc = ΣW(F⃗) ; conservation de l’énergie mécanique en l’absence de frottements ; W = F·d·cos α',
        'Utiliser la formule de la chute libre dans un problème avec frottements, et oublier de projeter les forces sur les axes du repère',
        'Chute libre depuis 20 m : v = √(2gh) = √(2 × 9,8 × 20) ≈ 19,8 m/s, soit environ 71 km/h — la masse n’intervient pas',
      ],
      [
        'prem-s-electricite',
        'Courant alternatif, circuits RLC et puissance électrique',
        'Tension sinusoïdale u(t) = Umax·sin(2πft) ; valeurs efficace et maximale, impédance d’un circuit RLC, résonance et facteur de puissance',
        'Ueff = Umax/√2 ; Ieff = Imax/√2 ; puissance active P = U·I·cos φ ; à la résonance, Lω = 1/(Cω) et l’impédance est minimale',
        'Confondre valeur maximale et valeur efficace (facteur √2) et oublier le déphasage φ dans le calcul de la puissance',
        'Réseau 220 V efficaces : Umax = 220 × √2 ≈ 311 V ; un moteur de cos φ = 0,8 absorbant 5 A consomme P = 220 × 5 × 0,8 = 880 W',
      ],
    ],
  },
  {
    subjectId: 'svt',
    subjectName: 'Sciences de la Vie et de la Terre',
    primaryExamId: 'premiere-scientifique',
    examIds: ['premiere-scientifique', 'bac-scientifique', 'bac-d-sciences-nat', 'concours-medecine', 'concours-agronomie'],
    zone: 'Programme officiel 1ère S — génétique, immunologie, géologie',
    stream: 'science',
    diagramId: 'mitose',
    modules: [
      [
        'prem-s-genetique',
        'Génétique : ADN, mitose, méiose et brassage génétique',
        'L’ADN support de l’information génétique ; gène, allèle, génotype et phénotype ; mitose (conservation) et méiose (réduction chromatique)',
        'Lois de Mendel : uniformité des hybrides F1, ségrégation 3/4–1/4 en F2 pour un couple d’allèles, brassage interchromosomique et intrachromosomique (crossing-over)',
        'Confondre génotype (combinaison d’allèles) et phénotype (caractère observé), et oublier que les gamètes sont haploïdes',
        'Croisement de deux hétérozygotes Aa × Aa : 1/4 AA, 1/2 Aa, 1/4 aa, soit 3/4 de phénotype dominant et 1/4 de phénotype récessif',
      ],
      [
        'prem-s-immunologie',
        'Immunologie : soi et non-soi, réponse immunitaire et VIH',
        'Immunité innée (barrières, phagocytose, inflammation) et immunité adaptative (lymphocytes B et T, anticorps, mémoire immunitaire)',
        'La réponse à médiation humorale produit des anticorps par les plasmocytes ; la réponse cellulaire détruit les cellules infectées via les LT cytotoxiques ; le VIH cible les LT4',
        'Confondre lymphocyte B (production d’anticorps) et lymphocyte T (coordination et cytotoxicité) et oublier le rôle des cellules mémoire dans la vaccination',
        'Après une primo-infection, les anticorps apparaissent en 5 à 10 jours ; lors d’un rappel vaccinal, la réponse est plus rapide et plus intense grâce aux cellules mémoire',
      ],
      [
        'prem-s-reproduction-hormones',
        'Reproduction humaine, hormones et maîtrise de la procréation',
        'Cycles ovarien et utérin, axe hypothalamo-hypophysaire, œstrogènes et progestérone ; spermatogenèse et régulation hormonale',
        'Le pic de LH déclenche l’ovulation vers le 14e jour d’un cycle de 28 jours ; la progestérone maintient l’endomètre ; les contraceptifs hormonaux bloquent le pic de LH par rétrocontrôle négatif',
        'Confondre œstrogènes (phase folliculaire, rétrocontrôle d’abord négatif puis positif) et progestérone (phase lutéale), et oublier le rôle du rétrocontrôle',
        'Pilule œstroprogestative : le rétrocontrôle négatif empêche le pic de LH, donc l’ovulation ; l’efficacité dépend de la régularité de la prise',
      ],
      [
        'prem-s-geologie',
        'Tectonique des plaques, volcanisme et risques naturels',
        'Dérive des continents, dorsales et zones de subduction ; magmatisme, séismes et structures internes de la Terre',
        'Expansion océanique de 2 à 10 cm/an le long des dorsales ; subduction là où la lithosphère océanique dense plonge sous une plaque continentale ; séismes localisés aux frontières de plaques',
        'Confondre volcanisme de dorsale (effusif, basaltique) et volcanisme de subduction (explosif, andésitique), et placer les séismes au hasard sur les continents',
        'Faille de San Andreas : coulissage de 3 à 5 cm/an ; la zone de subduction du Japon explique les séismes violents et les tsunamis associés',
      ],
    ],
  },
  {
    subjectId: 'chimie_bio',
    subjectName: 'Chimie',
    primaryExamId: 'premiere-scientifique',
    examIds: ['premiere-scientifique', 'bac-scientifique', 'bac-c-maths-physique', 'bac-d-sciences-nat', 'concours-medecine'],
    zone: 'Programme officiel 1ère S — chimie générale et organique',
    stream: 'science',
    diagramId: 'reaction_chimique',
    modules: [
      [
        'prem-s-structure-atome',
        'Structure de l’atome, configuration électronique et tableau périodique',
        'Noyau (protons, neutrons), électrons, numéro atomique Z et nombre de masse A ; couches et sous-couches électroniques ; familles du tableau périodique',
        'Règle de Klechkowski pour le remplissage et règle de l’octet pour la stabilité ; les propriétés chimiques dépendent des électrons de valence',
        'Confondre Z (protons) et A (nucléons), et oublier que les isotopes ont le même Z mais un nombre de neutrons différent',
        'Sodium ₁₁Na : 1s² 2s² 2p⁶ 3s¹ — un seul électron de valence, d’où sa forte réactivité et la formation facile de l’ion Na⁺',
      ],
      [
        'prem-s-acides-bases',
        'Acides, bases, pH et équilibres chimiques',
        'Acide de Brønsted = donneur de proton, base = accepteur ; pH = −log[H₃O⁺] ; constante d’acidité Ka et pKa ; avancement et taux d’avancement',
        'pH = −log[H₃O⁺] et [H₃O⁺] = 10^(−pH) ; à 25 °C, pH + pOH = 14 ; un acide fort est totalement dissocié, un acide faible ne l’est que partiellement',
        'Écrire pH = log[H₃O⁺] (signe oublié) et confondre concentration apportée et concentration effective en ions oxonium',
        'Solution d’acide chlorhydrique à 10⁻³ mol/L : pH = 3 ; même concentration en acide acétique (Ka = 1,8 × 10⁻⁵) : pH ≈ 3,4 car l’acide est faiblement dissocié',
      ],
      [
        'prem-s-oxydoreduction',
        'Oxydoréduction, piles et électrolyse',
        'Oxydant = espèce qui capte des électrons, réducteur = espèce qui cède des électrons ; couple Ox/Red, demi-équations et bilan d’électrons',
        'Une oxydation libère des électrons (à l’anode), une réduction en capte (à la cathode) ; f.é.m. d’une pile = E°(cathode) − E°(anode) ; à l’électrolyse, le sens imposé est inverse de la pile',
        'Inverser anode et cathode et oublier d’équilibrer les électrons avant d’additionner les demi-équations',
        'Pile Daniell Zn/Cu : E°(Cu²⁺/Cu) = +0,34 V et E°(Zn²⁺/Zn) = −0,76 V ⇒ f.é.m. = 0,34 − (−0,76) = 1,10 V',
      ],
      [
        'prem-s-chimie-organique',
        'Chimie organique : alcanes, alcools, acides et polymères',
        'Formules semi-développées, groupes fonctionnels (alcool, aldéhyde, cétone, acide carboxylique, ester), nomenclature et isomérie',
        'Oxydation ménagée : alcool primaire → aldéhyde → acide ; alcool secondaire → cétone ; alcool tertiaire non oxydable ; estérification acide + alcool ⇌ ester + eau',
        'Attribuer une fonction cétone à un alcool primaire oxydé et oublier que l’estérification est limitée (rendement < 100 %)',
        'Éthanol CH₃–CH₂–OH oxydé ménagément donne l’éthanal CH₃–CHO puis l’acide éthanoïque CH₃–COOH ; avec l’acide éthanoïque et l’éthanol on obtient l’éthanoate d’éthyle',
      ],
    ],
  },
  {
    subjectId: 'informatique',
    subjectName: 'Informatique & Sciences Numériques',
    primaryExamId: 'premiere-scientifique',
    examIds: ['premiere-scientifique', 'bac-scientifique', 'concours-ingenieur', 'concours-telecoms'],
    zone: 'Programme officiel 1ère S — algorithmique, données et réseaux',
    stream: 'science',
    diagramId: 'sql_relations',
    modules: [
      [
        'prem-s-algorithmique',
        'Algorithmique et programmation Python : variables, conditions, boucles',
        'Algorithme = suite finie d’instructions ; types de données, affectation, structures conditionnelles (si/sinon) et boucles (pour, tant que)',
        'Une boucle « pour » s’exécute un nombre connu de fois, une boucle « tant que » dépend d’une condition ; l’indentation est syntaxiquement obligatoire en Python',
        'Oublier l’indentation et créer une boucle infinie en ne modifiant jamais la condition d’arrêt',
        'Somme des entiers de 1 à n : s = 0 ; pour i allant de 1 à n : s = s + i — en Python, la version fermée s’écrit n*(n+1)//2',
      ],
      [
        'prem-s-structures-donnees',
        'Structures de données : listes, dictionnaires, tuples et fonctions',
        'Listes indexées à partir de 0, tuples immuables, dictionnaires clé/valeur ; fonctions, paramètres, valeur de retour et portée des variables',
        'len(liste), append(), indices, slicing [début:fin] ; une fonction sans return renvoie None ; les objets mutables passés en argument peuvent être modifiés',
        'Confondre index et longueur (dernier indice = longueur − 1) et croire qu’une affectation de liste recopie la liste',
        'notes = [12, 15, 9] ; moyenne = sum(notes)/len(notes) = 12 ; notes.append(14) ajoute en fin de liste sans changer son identité',
      ],
      [
        'prem-s-web-reseaux',
        'Web, HTML/CSS et modèles réseaux (OSI & TCP/IP)',
        'Client/serveur, HTTP/HTTPS, URL, HTML pour la structure et CSS pour la présentation ; encapsulation en couches du modèle OSI et TCP/IP',
        'Le modèle OSI comporte 7 couches (physique → application) ; TCP garantit l’ordre et la fiabilité, UDP privilégie la rapidité ; HTTPS = HTTP + TLS',
        'Confondre HTML (structure) et CSS (style), et croire que TCP/IP et OSI sont deux protocoles au lieu de deux modèles en couches',
        'Une requête HTTPS traverse application (HTTP), transport (TCP, port 443), internet (IP), puis accès réseau (Ethernet/Wi-Fi) avant d’atteindre le serveur',
      ],
      [
        'prem-s-bases-donnees',
        'Bases de données relationnelles, SQL et conduite de projet',
        'Table, enregistrement, champ, clé primaire et clé étrangère ; requêtes SQL de sélection, d’insertion et d’agrégation ; cahier des charges d’un projet',
        'SELECT colonnes FROM table WHERE condition ORDER BY colonne ; une clé primaire est unique et non nulle ; l’intégrité référentielle interdit une clé étrangère orpheline',
        'Oublier la clause WHERE dans un UPDATE ou un DELETE (toute la table est modifiée) et écrire une jointure sans condition sur la clé étrangère',
        'SELECT nom, moyenne FROM eleves WHERE moyenne >= 10 ORDER BY moyenne DESC ; sans WHERE, la requête renvoie les 100 % des élèves',
      ],
    ],
  },
];

/**
 * ============================================================================
 * v17.7 — PREMIÈRE LITTÉRAIRE (1ère L / séries A4 & A5)
 * 5 matières × 4 modules × 5 chapitres progressifs = 100 chapitres dédiés.
 * ============================================================================
 */
export const PREMIERE_L_SUBJECTS: PremiereSubjectSpec[] = [
  {
    subjectId: 'francais',
    subjectName: 'Français & Littérature',
    primaryExamId: 'premiere-litteraire',
    examIds: ['premiere-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'concours-ens-enseignement', 'concours-journalisme'],
    zone: 'Programme officiel 1ère L — objets d’étude littéraires',
    stream: 'litteraire',
    modules: [
      [
        'prem-l-theatre',
        'Le théâtre : comédie, tragédie et dramaturgie',
        'Texte théâtral = dialogue + didascalies ; double énonciation, aparté, monologue, quiproquo ; comédie (Molière) et tragédie (Racine) au XVIIe siècle',
        'Le commentaire de théâtre analyse la construction de l’illusion (règles des trois unités), les registres (comique, tragique, pathétique) et le jeu des didascalies',
        'Raconter la pièce au lieu d’analyser les procédés, et négliger les didascalies qui portent souvent l’essentiel de la mise en scène',
        'Dans Le Malade imaginaire, l’aparté de Toinette révèle au public ce que Argan ignore : le spectateur devient complice de l’intrigue',
      ],
      [
        'prem-l-roman',
        'Le roman et ses personnages : réalisme, naturalisme et roman africain',
        'Personnage, narrateur, point de vue (interne, externe, omniscient), focalisation, temps du récit et cadre spatio-temporel',
        'Le point de vue narratif détermine l’information disponible : interne (le narrateur sait ce que sait le personnage), externe (il observe sans savoir), omniscient (il sait tout)',
        'Confondre auteur, narrateur et personnage, et attribuer au romancier les jugements portés par un narrateur interne',
        'Dans Une vie de Maupassant, le narrateur omniscient révèle les illusions perdues de Jeanne ; dans Ville cruelle d’Eza Boto, la focalisation interne épouse la violence coloniale',
      ],
      [
        'prem-l-poesie',
        'La poésie : lyrisme, formes fixes et modernité poétique',
        'Vers, strophes, rimes (plates, croisées, embrassées), mètres (alexandrin, décasyllabe), sonnet et poème en prose ; lyrisme et image',
        'L’analyse poétique combine métrique, sonorités (allitérations, assonances), figures (métaphore, comparaison, anaphore) et effet de sens produit',
        'Paraphraser le poème « pour dire la même chose en moins bien » au lieu d’analyser la construction du sens par la forme',
        'Dans « Les Djinns » de Hugo, la longueur des vers croît puis décroît avec le bruit des esprits : la forme imite le sens (mimétisme métrique)',
      ],
      [
        'prem-l-litterature-idees',
        'Littérature d’idées et argumentation : essai, fable et pamphlet',
        'Argumentation directe (essai, traité, discours) et indirecte (fable, apologue, conte philosophique, théâtre) ; thèse, arguments, exemples et concessions',
        'La stratégie argumentative combine convaincre (raison), persuader (émotion) et délibérer (choix) ; l’ironie et la prétérition sont des armes de l’argumentation indirecte',
        'Résumer la morale de la fable sans analyser le récit qui la construit, et confondre ironie (dire le contraire) avec simple moquerie',
        'Dans « Le Loup et l’Agneau », La Fontaine fait parler le fort avant de conclure : la structure du récit démontre la thèse mieux que la morale finale',
      ],
    ],
  },
  {
    subjectId: 'philo',
    subjectName: 'Philosophie',
    primaryExamId: 'premiere-litteraire',
    examIds: ['premiere-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'concours-ens-enseignement'],
    zone: 'Programme officiel 1ère L — notions et méthode',
    stream: 'litteraire',
    modules: [
      [
        'prem-l-conscience',
        'La conscience, la perception et l’inconscient',
        'Conscience immédiate et réflexive, Cogito cartésien, perception et illusions, inconscient freudien (Ça, Moi, Surmoi)',
        'La conscience comme condition de la responsabilité : seul un sujet conscient peut répondre de ses actes ; l’hypothèse de l’inconscient psychique déplace mais ne supprime pas la responsabilité',
        'Réciter des définitions sans problématiser la tension entre conscience et inconscient, ou réduire Freud à une simple croyance',
        'Un acte manqué (oubli de rendez-vous important) illustre l’hypothèse freudienne d’un désir inconscient qui contrarie l’intention consciente',
      ],
      [
        'prem-l-liberte',
        'La liberté, le déterminisme et la responsabilité',
        'Liberté d’indifférence, liberté de choix, libre arbitre ; déterminisme physique, déterminisme social et nécessité ; contrainte et obligation',
        'Distinguer « faire ce que l’on veut » (liberté formelle) et « vouloir ce que l’on fait » (liberté réfléchie) ; la loi morale kantienne comme autonomie de la volonté',
        'Confondre liberté et absence de toute contrainte, et conclure que le déterminisme supprime toute morale',
        'Spinoza : l’homme qui ignore les causes de ses désirs se croit libre ; connaître ces causes accroît paradoxalement sa liberté véritable',
      ],
      [
        'prem-l-verite',
        'La vérité, la raison et les sciences',
        'Vérité-correspondance, vérité-critère, opinion et savoir ; raison, expérience, hypothèse et réfutabilité (Popper) ; vérité et croyance',
        'Une proposition scientifique doit être réfutable pour être testable ; la vérité n’est pas l’unanimité mais l’accord de la pensée et du réel, toujours perfectible',
        'Confondre vérité et certitude subjective, et présenter l’opinion majoritaire comme preuve de vérité',
        'Le géocentrisme fut longtemps tenu pour vrai : la science progresse en réfutant, ce qui montre que la vérité scientifique est provisoire et corrigible',
      ],
      [
        'prem-l-art-technique',
        'L’art, la technique et le travail',
        'Beau, jugement de goût (Kant), art et artisanat, technique et outil, travail et transformation du monde ; aliénation et sens du travail',
        'Le jugement esthétique est désintéressé et universalisable sans concept ; la technique est un moyen, l’art une fin ; le travail humanise autant qu’il peut aliéner',
        'Ramener l’art à l’imitation ou à la seule expression des émotions, et réduire le travail à la seule contrainte économique',
        'Un même objet peut être beau pour l’un et indifférent pour l’autre : le jugement de goût prétend à l’universel sans pouvoir le démontrer',
      ],
    ],
  },
  {
    subjectId: 'histoire_geo',
    subjectName: 'Histoire-Géographie',
    primaryExamId: 'premiere-litteraire',
    examIds: ['premiere-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'concours-ens-enseignement', 'concours-police-douanes'],
    zone: 'Programme officiel 1ère L — histoire et géographie',
    stream: 'litteraire',
    diagramId: 'couches_geologiques',
    modules: [
      [
        'prem-l-revolutions',
        'Révolutions, industrialisation et sociétés (1789-1914)',
        'Révolution française, Révolutions industrielles (charbon, vapeur, chemin de fer), croissance économique, question sociale et naissance des syndicats',
        'L’industrialisation se mesure par la croissance de la production, l’urbanisation et la part de la population active dans le secondaire ; elle s’accompagne d’une paupérisation ouvrière (paupérisme)',
        'Confondre les dates des deux révolutions industrielles (vapeur 1780-1850, électricité et pétrole 1870-1914) et décrire l’industrialisation sans citer d’acteurs sociaux',
        'Manchester en 1870 : la ville passe de 25 000 à plus de 350 000 habitants en un siècle, avec un smog permanent et une espérance de vie ouvrière inférieure à 30 ans',
      ],
      [
        'prem-l-colonisation',
        'Colonisation, décolonisation et émergence des États africains',
        'Conférence de Berlin (1884-1885), impérialisme, économie de traite, résistances africaines ; décolonisation, indépendances 1957-1960, pansafricanisme',
        'La colonisation repose sur la « mission civilisatrice » affichée et l’exploitation économique réelle ; l’indépendance kényane (1963), le Sénégal (1960) et le Tchad (1960) illustrent des rythmes différenciés',
        'Présenter la décolonisation comme un simple cadeau des puissances coloniales et oublier les résistances (Soubourou, Samory, les Mau Mau)',
        'Le Congo belge extrait le caoutchouc et le cuivre via le travail forcé ; la Conférence de Brazzaville (1944) prépare timidement les indépendances de 1960',
      ],
      [
        'prem-l-guerres',
        'Guerres mondiales, totalitarismes et mémoire',
        'Première Guerre mondiale (1914-1918), traité de Versailles, totalitarismes (nazisme, fascisme, stalinisme), Seconde Guerre mondiale et génocides',
        'La Grande Guerre est totale (mobilisation des économies et des civils) ; la Shoah est un génocide industrialisé ; la mémoire est un objet d’histoire en construction',
        'Réduire la Seconde Guerre mondiale aux combats de 1939-1945 et oublier la spécificité du génocide des Juifs et des Tziganes',
        'Les tirailleurs sénégalais (plus de 200 000 mobilisés) participent aux combats européens et à la libération de la France, comme les tirailleurs algériens et marocains',
      ],
      [
        'prem-l-mondialisation',
        'Mondialisation, développement et enjeux géopolitiques africains',
        'Mondialisation (flux, firmes multinationales, division internationale du travail), conflit Nord-Sud, développement et dépendance, intégration régionale africaine',
        'La mondialisation se mesure par les flux de marchandises, de capitaux et d’informations ; l’Afrique reste très intégrée par l’extraction (pétrole, minerais) avec une faible transformation locale',
        'Confondre mondialisation et occidentalisation, et décrire l’Afrique uniquement par ses conflits sans analyser ses dynamiques démographiques et urbaines',
        'Le port de Douala et le corridor de N’Djamena illustrent l’enclavement du Tchad : plus de 90 % de son commerce extérieur transite par le Cameroun',
      ],
    ],
  },
  {
    subjectId: 'litterature_africaine',
    subjectName: 'Littérature Africaine',
    primaryExamId: 'premiere-litteraire',
    examIds: ['premiere-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'concours-ens-enseignement', 'concours-langues-lettres-afrique'],
    zone: 'Programme 1ère L — littérature africaine francophone',
    stream: 'litteraire',
    modules: [
      [
        'prem-l-negritude',
        'Négritude et Renaissance africaine',
        'Césaire (Cahier d’un retour au pays natal), Senghor, Damas ; contestation de l’assimilation culturelle et affirmation des valeurs noires',
        'La négritude est un mouvement littéraire ET politique (revendication identitaire) qui mobilise l’image, le rythme et le mythe ; elle précède la Renaissance africaine des années 1990',
        'Réduire la négritude à une célébration folklorique, et oublier sa critique par les générations suivantes (Soyinka, Wole Soyinka : « le tigre ne proclame pas sa tigritude »)',
        'Dans « Femme noire », Senghor fait de la femme africaine un symbole identitaire et une figure de transmission mémorielle',
      ],
      [
        'prem-l-roman-africain',
        'Le roman africain : engagement, identité et mémoire',
        'Ville cruelle (Eza Boto), Le Pauvre Christ de Bomba (Beti), Une si longue lettre (Bâ), En attendant le vote des bêtes sauvages (Kourouma)',
        'Le roman africain articule critique sociale, mémoire coloniale et question de la langue ; le récit est souvent polyphonique (lettres, récits enchâssés)',
        'Lire le roman africain comme un simple témoignage ethnographique et négliger ses choix narratologiques (focalisation, ironie, oralité intégrée)',
        'Dans Une si longue lettre, la forme épistolaire crée une intimité qui autorise la critique des mariages forcés et de la polygamie',
      ],
      [
        'prem-l-oralite',
        'Oralité, épopée et traditions orales',
        'Genres oraux (conte, épopée, devinette, chant, proverbe), grille de la performance, griot et transmission intergénérationnelle',
        'La performance orale se définit par le texte, le musicien, le public et l’occasion ; l’épopée de Soundiata (Mali) illustre la conservation d’une mémoire dynastique',
        'Confondre oral et analphabète, et traiter l’oralité comme un réservoir de « folklore » sans valeur esthétique',
        'La geste de Soundiata intègre généalogies, proverbes et chants : sa transcription écrite n’est qu’une des formes de sa transmission',
      ],
      [
        'prem-l-theatre-poesie',
        'Théâtre et poésie africains contemporains',
        'Théâtre (Kwao Konan, Sony Labou Tansi, Tchicaya U Tam’si), poésie post-négritude, engagement politique, humour satirique et expérimentation formelle',
        'Le théâtre africain contemporain mêle dénonciation du pouvoir et recherche formelle (langue, espace scénique, récit rituel) ; la poésie allie héritage oral et modernité',
        'Réduire le théâtre africain au seul théâtre traditionnel ou le juger uniquement comme un instrument de propagande',
        'La Parenthèse de sang de Sony Labou Tansi : violence politique, grotesque et création verbale font de la pièce une critique de tous les pouvoirs',
      ],
    ],
  },
  {
    subjectId: 'anglais',
    subjectName: 'Anglais',
    primaryExamId: 'premiere-litteraire',
    examIds: ['premiere-litteraire', 'bac-litteraire', 'bac-a4-lettres', 'concours-diplomatie', 'concours-journalisme'],
    zone: 'Programme 1ère L — anglais renforcé',
    stream: 'litteraire',
    modules: [
      [
        'prem-l-reading',
        'Reading comprehension : skimming, scanning et inférence',
        'Global understanding (skimming), repérage d’informations (scanning), inference from context, tone and purpose of a text',
        'Answer in your own words using textual evidence : quote a short clue then paraphrase; do not copy whole sentences',
        'Confondre inférence et invention : une réponse doit s’appuyer sur un indice du texte, jamais sur une opinion personnelle',
        'Text about Kenyan mobile banking: the phrase « unbanked population » implies customers without a traditional bank account — the answer must point to this clue',
      ],
      [
        'prem-l-writing',
        'Writing : essay, formal letter and argumentation',
        'Paragraph structure (topic sentence, evidence, comment), connectors (however, therefore, moreover), register and formality',
        'An essay follows a plan: introduction with a thesis, two or three developed body paragraphs, and a conclusion that answers the question',
        'Rédiger une introduction sans thèse claire et empiler des exemples sans les relier à l’argument',
        '« Studying abroad: opportunity or risk? » — thesis, one body paragraph on employability, one on cultural shock, then a nuanced conclusion',
      ],
      [
        'prem-l-grammar',
        'Grammar : tenses, modals, conditionals and the passive voice',
        'Present perfect vs past simple, future forms, modal verbs of obligation and deduction, the three conditionals and passive constructions',
        'Present perfect (have + V-ed) relié au présent, past simple pour une action datée ; third conditional (if + had + V-ed … would have + V-ed) exprime un regret',
        'Employer le past simple avec « since » ou « for » (le present perfect s’impose) et construire un conditionnel irréel avec « would » dans la subordonnée',
        '« I have lived here for three years » (toujours vrai) vs « I lived there in 2019 » (action terminée et datée)',
      ],
      [
        'prem-l-civilisation',
        'Civilisation : Royaume-Uni, États-Unis et Afrique anglophone',
        'Institutions britanniques et américaines, Commonwealth, indépendances africaines anglophones, questions de société (droits civiques, immigration)',
        'Le Royaume-Uni est une monarchie constitutionnelle sans constitution écrite unique ; les États-Unis pratiquent un fédéralisme avec séparation stricte des pouvoirs',
        'Confondre le Royaume-Uni et la Grande-Bretagne, et présenter les institutions britanniques comme un système présidentiel',
        'Le Civil Rights Act (1964) met fin à la ségrégation légale aux États-Unis ; la marche de Washington (1963) en fut le moment symbolique majeur',
      ],
    ],
  },
];

export const PREMIERE_SUBJECT_SPECS: PremiereSubjectSpec[] = [
  ...PREMIERE_S_SUBJECTS,
  ...PREMIERE_L_SUBJECTS,
];
