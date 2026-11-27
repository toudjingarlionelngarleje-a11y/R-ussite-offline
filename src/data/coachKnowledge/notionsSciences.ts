import { CoachNotion } from './types';

/**
 * v18.0 — Notions scientifiques : mathématiques, physique, chimie, SVT.
 * Contenus alignés sur les programmes du collège, du lycée et du supérieur.
 */
export const COACH_NOTIONS_SCIENCES: CoachNotion[] = [
  // ---------------------------------------------------------------- MATHÉMATIQUES
  {
    id: 'discriminant',
    term: 'Discriminant Δ',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['discriminant', 'delta', 'b2-4ac', 'b carre moins 4ac', 'racines du trinome'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Le discriminant d’un trinôme ax² + bx + c (avec a ≠ 0) est le réel Δ = b² − 4ac. Son signe détermine le nombre de solutions réelles de l’équation ax² + bx + c = 0 et le signe du trinôme.',
    formula: 'Δ = b² − 4ac   puis   x = (−b ± √Δ) / (2a)',
    keys: [
      'Δ > 0 : deux racines réelles distinctes x₁ et x₂.',
      'Δ = 0 : une racine double x₀ = −b/(2a).',
      'Δ < 0 : aucune racine réelle, le trinôme garde le signe de a.',
      'Le trinôme est du signe de a à l’extérieur des racines, du signe de −a entre les racines.',
    ],
    example:
      'Pour 2x² − 5x + 2 = 0 : Δ = 25 − 16 = 9, donc x₁ = (5 − 3)/4 = 0,5 et x₂ = (5 + 3)/4 = 2.',
    pitfall:
      'Oublier le signe de c dans −4ac (avec c négatif, −4ac devient positif) et confondre la racine double −b/(2a) avec le sommet α = −b/(2a) : c’est la même abscisse, mais l’un est une solution, l’autre un extremum.',
    mnemonic: '« b² moins 4ac » : Bêta-Carré-Moins-Quatre-A-Cé, à réciter avant tout calcul.',
    related: ['equation-second-degre', 'trigonometrie'],
  },
  {
    id: 'equation-second-degre',
    term: 'Équation du second degré',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['second degre', 'trinome', 'equation quadratique', 'resoudre equation'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Une équation du second degré s’écrit ax² + bx + c = 0 avec a ≠ 0. On la résout en calculant le discriminant, puis en appliquant la formule des racines ; les racines permettent aussi de factoriser le trinôme.',
    formula: 'ax² + bx + c = a(x − x₁)(x − x₂)   |   S = −b/a   |   P = c/a',
    keys: [
      'Toujours se ramener à la forme ax² + bx + c = 0 avant d’identifier a, b, c.',
      'La somme des racines vaut −b/a et leur produit c/a : utile pour vérifier.',
      'Une racine évidente (1, −1, 2…) permet de factoriser et de trouver l’autre par produit.',
    ],
    example:
      'x² − 5x + 6 = 0 : Δ = 1, racines 2 et 3. Vérification : 2 + 3 = 5 = −b/a et 2 × 3 = 6 = c/a.',
    pitfall:
      'Diviser par a sans discuter le cas a = 0 (l’équation devient du premier degré) et oublier de vérifier que les solutions appartiennent au domaine de définition.',
    related: ['discriminant', 'fonction-affine'],
  },
  {
    id: 'pythagore',
    term: 'Théorème de Pythagore',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['pythagore', 'hypotenuse', 'triangle rectangle'],
    classLevels: ['4e', '3e', '2nde'],
    definition:
      'Dans un triangle rectangle, le carré de la longueur de l’hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.',
    formula: 'AB² = AC² + BC² (AB hypoténuse)',
    keys: [
      'L’hypoténuse est toujours le côté opposé à l’angle droit, et le plus long.',
      'La réciproque permet de prouver qu’un triangle est rectangle.',
      'Pour trouver un côté de l’angle droit : AC² = AB² − BC².',
    ],
    example: 'Un triangle de côtés 6 cm et 8 cm a une hypoténuse de √(36 + 64) = 10 cm.',
    pitfall:
      'Additionner les carrés alors qu’on cherche un côté de l’angle droit (il faut soustraire), ou appliquer le théorème dans un triangle qui n’est pas rectangle.',
    mnemonic: '« 3-4-5 » : le triplet magique, car 9 + 16 = 25.',
    related: ['thales', 'trigonometrie'],
  },
  {
    id: 'thales',
    term: 'Théorème de Thalès',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['thales', 'droites paralleles', 'configuration papillon'],
    classLevels: ['3e', '2nde'],
    definition:
      'Si deux droites parallèles coupent deux droites sécantes, alors elles déterminent des segments proportionnels. La configuration peut être « triangle » ou « papillon ».',
    formula: 'AM/AB = AN/AC = MN/BC',
    keys: [
      'Les rapports doivent être écrits dans le même ordre sur les deux droites.',
      'Les droites (MN) et (BC) doivent être parallèles : c’est l’hypothèse à citer.',
      'La réciproque sert à démontrer un parallélisme.',
    ],
    example:
      'Dans un triangle ABC avec M sur [AB] et N sur [AC], si AM = 3, AB = 5 et MN = 4, alors BC = 4 × 5/3 ≈ 6,67.',
    pitfall:
      'Mélanger les sommets dans les rapports (AB/AM au lieu de AM/AB) et oublier de justifier le parallélisme avant d’appliquer la propriété.',
    related: ['pythagore'],
  },
  {
    id: 'fonction-affine',
    term: 'Fonction affine',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['fonction affine', 'y egale ax plus b', 'coefficient directeur', 'droite'],
    classLevels: ['3e', '2nde', '1ere'],
    definition:
      'Une fonction affine s’écrit f(x) = ax + b : sa représentation graphique est une droite de coefficient directeur a et d’ordonnée à l’origine b. Si b = 0, la fonction est linéaire (proportionnalité).',
    formula: 'f(x) = ax + b   |   a = (y₂ − y₁)/(x₂ − x₁)',
    keys: [
      'a > 0 : la droite monte ; a < 0 : elle descend ; a = 0 : elle est horizontale.',
      'Le coefficient directeur mesure la variation de y quand x augmente de 1.',
      'Deux droites sont parallèles si et seulement si elles ont le même a.',
    ],
    example:
      'Un abonnement à 5 000 F + 500 F par séance s’écrit f(x) = 500x + 5 000 : 10 séances coûtent 10 000 F.',
    pitfall:
      'Confondre ordonnée à l’origine et racine, et lire a sur le graphique en comptant les pixels plutôt que les unités graduées.',
    related: ['equation-second-degre', 'derivee'],
  },
  {
    id: 'derivee',
    term: 'Dérivée d’une fonction',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['derivee', 'derivation', 'f prime', 'taux de variation'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La dérivée f’(x) mesure la vitesse de variation de f : c’est la pente de la tangente à la courbe au point d’abscisse x. Son signe donne les variations de f.',
    formula: '(u·v)’ = u’v + uv’   |   (u/v)’ = (u’v − uv’)/v²   |   (xⁿ)’ = n·xⁿ⁻¹',
    keys: [
      'f’ > 0 sur un intervalle : f est strictement croissante sur cet intervalle.',
      'f’ s’annule en changeant de signe : extremum local (maximum ou minimum).',
      '(ln x)’ = 1/x pour x > 0 et (eˣ)’ = eˣ.',
    ],
    example:
      'f(x) = x² − 4x + 1 donne f’(x) = 2x − 4, qui s’annule en x = 2 : minimum f(2) = −3.',
    pitfall:
      'Oublier le signe moins dans la dérivée d’un quotient et conclure sur les variations sans dresser le tableau de signes de f’.',
    mnemonic: '« u’v + uv’ » pour le produit ; « bas moins haut » (u’v − uv’) pour le quotient.',
    related: ['tangente', 'primitive', 'limite-asymptote'],
  },
  {
    id: 'tangente',
    term: 'Équation de la tangente',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['tangente', 'equation de la tangente', 'pente en un point'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La tangente à la courbe de f au point d’abscisse a est la droite qui « épouse » la courbe en ce point ; son coefficient directeur est f’(a).',
    formula: 'T : y = f’(a)(x − a) + f(a)',
    keys: [
      'Il faut deux informations : le point (a ; f(a)) et la pente f’(a).',
      'Si f’(a) = 0, la tangente est horizontale.',
      'Le signe de f’(a) indique si la fonction monte ou descend en a.',
    ],
    example:
      'Pour f(x) = x² en a = 3 : f(3) = 9 et f’(3) = 6, donc T : y = 6(x − 3) + 9 = 6x − 9.',
    pitfall:
      'Développer la formule en oubliant le « + f(a) », ce qui donne une tangente parallèle mais décalée.',
    related: ['derivee'],
  },
  {
    id: 'primitive',
    term: 'Primitive et intégrale',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['primitive', 'integrale', 'aire sous la courbe', 'integration'],
    classLevels: ['terminale'],
    definition:
      'F est une primitive de f sur un intervalle si F’ = f. L’intégrale de f entre a et b vaut F(b) − F(a) et mesure l’aire algébrique sous la courbe.',
    formula: '∫ₐᵇ f(x) dx = F(b) − F(a)   |   ∫ xⁿ dx = xⁿ⁺¹/(n+1) + k',
    keys: [
      'Deux primitives d’une même fonction diffèrent d’une constante.',
      'L’intégrale est linéaire : ∫(αf + βg) = α∫f + β∫g.',
      'Une aire géométrique est positive : on découpe si la courbe passe sous l’axe.',
    ],
    example: '∫₀² 3x² dx = [x³]₀² = 8 − 0 = 8.',
    pitfall:
      'Oublier la constante d’intégration dans une primitive et prendre l’aire brute sans traiter les portions sous l’axe des abscisses.',
    related: ['derivee'],
  },
  {
    id: 'logarithme',
    term: 'Logarithme népérien ln',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['logarithme', 'ln', 'log neperien', 'fonction ln'],
    classLevels: ['terminale'],
    definition:
      'ln est la fonction réciproque de l’exponentielle : ln(x) est l’exposant qu’il faut donner à e pour obtenir x. Elle n’est définie que pour x > 0.',
    formula: 'ln(ab) = ln a + ln b   |   ln(a/b) = ln a − ln b   |   ln(aⁿ) = n ln a',
    keys: [
      'Domaine : ]0 ; +∞[, ln(1) = 0 et ln(e) = 1.',
      'ln est strictement croissante, donc ln a = ln b équivaut à a = b (avec a, b > 0).',
      'La dérivée de ln est 1/x ; la limite en 0⁺ est −∞.',
    ],
    example: 'Résoudre e^(2x) = 5 : 2x = ln 5, donc x = ln 5 / 2 ≈ 0,805.',
    pitfall:
      'Écrire ln(a + b) = ln a + ln b (faux !) et oublier de vérifier que les arguments sont strictement positifs.',
    mnemonic: '« ln transforme les multiplications en additions », jamais les additions en additions.',
    related: ['exponentielle', 'derivee'],
  },
  {
    id: 'exponentielle',
    term: 'Fonction exponentielle',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['exponentielle', 'exp', 'e puissance x', 'croissance exponentielle'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La fonction exponentielle est l’unique fonction égale à sa propre dérivée et valant 1 en 0. Elle est strictement croissante et toujours positive.',
    formula: 'e^(a+b) = eᵃ × eᵇ   |   (eᵘ)’ = u’ × eᵘ',
    keys: [
      'e⁰ = 1, e¹ ≈ 2,718 et eˣ > 0 pour tout réel x.',
      'Elle transforme les sommes en produits et les produits en puissances.',
      'Sa réciproque est ln : e^(ln x) = x pour x > 0.',
    ],
    example:
      'Une population qui augmente de 2 % par an suit N(t) = N₀ × 1,02ᵗ = N₀ × e^(0,0198t).',
    pitfall:
      'Croire que eˣ peut être négative ou que e^(a·b) = eᵃ × eᵇ (la bonne règle est e^(a+b)).',
    related: ['logarithme', 'derivee'],
  },
  {
    id: 'suite-arithmetique',
    term: 'Suite arithmétique',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['suite arithmetique', 'raison', 'progressions arithmetiques'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Une suite est arithmétique lorsqu’on passe d’un terme au suivant en ajoutant toujours la même raison r : uₙ₊₁ = uₙ + r.',
    formula: 'uₙ = u₀ + n·r   |   Sₙ = (n + 1)(u₀ + uₙ)/2',
    keys: [
      'La différence uₙ₊₁ − uₙ est constante et égale à r.',
      'La représentation graphique est une suite de points alignés.',
      'La somme de termes consécutifs se calcule par « nombre de termes × (premier + dernier)/2 ».',
    ],
    example: 'u₀ = 3 et r = 4 : u₁₀ = 3 + 40 = 43 et S = 11 × (3 + 43)/2 = 253.',
    pitfall:
      'Compter n termes au lieu de n + 1 (de u₀ à uₙ il y a n + 1 termes) et confondre avec une suite géométrique.',
    mnemonic: 'Arithmétique = addition (+ r) ; Géométrique = multiplication (× q).',
    related: ['suite-geometrique'],
  },
  {
    id: 'suite-geometrique',
    term: 'Suite géométrique',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['suite geometrique', 'raison q', 'pourcentage evolution'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Une suite est géométrique lorsqu’on passe d’un terme au suivant en multipliant toujours par la même raison q non nulle : uₙ₊₁ = q·uₙ.',
    formula: 'uₙ = u₀ × qⁿ   |   Sₙ = u₀ × (1 − qⁿ⁺¹)/(1 − q) si q ≠ 1',
    keys: [
      'Le quotient uₙ₊₁/uₙ est constant et égal à q.',
      'Une hausse de t % correspond à q = 1 + t/100 ; une baisse à q = 1 − t/100.',
      'Si |q| < 1, la suite tend vers 0 ; si q > 1, elle diverge vers +∞.',
    ],
    example: 'Un capital de 100 000 F placé à 5 % par an vaut 100 000 × 1,05ⁿ ; au bout de 4 ans : ≈ 121 551 F.',
    pitfall:
      'Additionner les pourcentages au lieu de les composer (deux hausses de 10 % donnent 1,1² = 1,21, soit +21 %, et non +20 %).',
    related: ['suite-arithmetique', 'pourcentage'],
  },
  {
    id: 'produit-scalaire',
    term: 'Produit scalaire',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['produit scalaire', 'orthogonal', 'vecteurs orthogonaux', 'norme'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Le produit scalaire de deux vecteurs u et v vaut ‖u‖ × ‖v‖ × cos(θ), où θ est l’angle entre les vecteurs. Il vaut 0 si et seulement si les vecteurs sont orthogonaux.',
    formula: 'u·v = ‖u‖‖v‖cos θ = x·x’ + y·y’',
    keys: [
      'u·v = 0 ⇔ u ⊥ v (dans le plan ou l’espace).',
      'Le produit scalaire est commutatif et distributif sur l’addition.',
      '‖u‖² = u·u : la norme au carré est le produit scalaire du vecteur par lui-même.',
    ],
    example: 'u(2 ; 3) et v(3 ; −2) : u·v = 6 − 6 = 0, donc les vecteurs sont orthogonaux.',
    pitfall:
      'Écrire que u·v est un vecteur alors que c’est un nombre réel, et oublier le cosinus dans le calcul avec les normes.',
    related: ['vecteurs', 'trigonometrie'],
  },
  {
    id: 'vecteurs',
    term: 'Vecteurs et colinéarité',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['vecteur', 'colineaire', 'coordonnees', 'alignement'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Un vecteur AB est caractérisé par une direction, un sens et une norme. Deux vecteurs sont colinéaires lorsqu’ils ont la même direction, c’est-à-dire lorsque l’un est un multiple de l’autre.',
    formula: 'u(x ; y) et v(x’ ; y’) colinéaires ⇔ x·y’ − y·x’ = 0',
    keys: [
      'Le déterminant x·y’ − y·x’ sert de test de colinéarité (et d’alignement de trois points).',
      'AB = (x_B − x_A ; y_B − y_A) : toujours « arrivée moins départ ».',
      'La norme ‖AB‖ = √(x² + y²) dans un repère orthonormé.',
    ],
    example:
      'A(1 ; 2), B(3 ; 5), C(7 ; 11) : AB(2 ; 3) et AC(6 ; 9) = 3·AB, donc A, B et C sont alignés.',
    pitfall:
      'Inverser les coordonnées (départ moins arrivée) et confondre colinéarité (parallélisme) avec orthogonalité.',
    related: ['produit-scalaire', 'barycentre'],
  },
  {
    id: 'barycentre',
    term: 'Barycentre',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['barycentre', 'point moyen', 'isobarycentre'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Le barycentre G de points pondérés (A ; α), (B ; β) est l’unique point vérifiant α·GA + β·GB = 0 (avec α + β ≠ 0). L’isobarycentre de deux points est leur milieu.',
    formula: 'AG = (β/(α + β))·AB',
    keys: [
      'Le barycentre est « plus proche » du point de plus fort coefficient.',
      'L’isobarycentre de trois points est le centre de gravité du triangle.',
      'On peut réduire les sommes vectorielles en introduisant le barycentre.',
    ],
    example:
      'Barycentre de (A ; 2) et (B ; 1) : il est situé aux deux tiers du segment depuis A, car AG = (1/3)AB.',
    pitfall:
      'Écrire AG = (α/(α + β))AB au lieu de β/(α + β), et oublier de vérifier que la somme des coefficients est non nulle.',
    related: ['vecteurs'],
  },
  {
    id: 'nombres-complexes',
    term: 'Nombres complexes',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['complexe', 'nombre complexe', 'module argument', 'i carre egal moins 1'],
    classLevels: ['terminale'],
    definition:
      'Un nombre complexe s’écrit z = a + ib avec a et b réels et i² = −1. On le représente par un point du plan complexe, de module |z| = √(a² + b²) et d’argument θ tel que a = |z|cos θ et b = |z|sin θ.',
    formula: 'z = a + ib   |   |z| = √(a² + b²)   |   z·z̄ = a² + b²',
    keys: [
      'La forme algébrique sert aux calculs ; la forme trigonométrique sert aux produits et quotients.',
      'z est réel si et seulement si sa partie imaginaire est nulle.',
      'z₁/z₂ = z₁·z̄₂/|z₂|² (on multiplie par le conjugué pour écrire sous forme algébrique).',
    ],
    example: 'z = 3 + 4i : |z| = 5 et arg z = arctan(4/3) ≈ 53,1°.',
    pitfall:
      'Utiliser i² = 1 par erreur, oublier le conjugué pour diviser et confondre argument et module.',
    related: ['vecteurs', 'trigonometrie'],
  },
  {
    id: 'trigonometrie',
    term: 'Trigonométrie et cercle trigonométrique',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['trigonometrie', 'cosinus', 'sinus', 'cercle trigonometrique', 'tan'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'Dans le cercle trigonométrique de rayon 1, cos θ et sin θ sont l’abscisse et l’ordonnée du point associé à l’angle θ. Elles vérifient cos²θ + sin²θ = 1.',
    formula: 'cos²θ + sin²θ = 1   |   tan θ = sin θ/cos θ',
    keys: [
      'Valeurs à connaître : 0, π/6, π/4, π/3, π/2 (0° à 90°).',
      'Sinus au premier et deuxième quadrant positif ; cosinus au premier et quatrième.',
      'Dans un triangle rectangle : SOH-CAH-TOA.',
    ],
    example: 'cos(π/3) = 0,5 ; sin(π/3) = √3/2 ≈ 0,866 ; tan(π/4) = 1.',
    pitfall:
      'Calculer en degrés alors que la calculatrice est en radians (ou inversement), et oublier les solutions supplémentaires dans [0 ; 2π[.',
    mnemonic: 'SOH-CAH-TOA : Sinus = Opposé/Hypoténuse, Cosinus = Adjacent/Hypoténuse, Tangente = Opposé/Adjacent.',
    related: ['produit-scalaire', 'nombres-complexes'],
  },
  {
    id: 'limite-asymptote',
    term: 'Limites et asymptotes',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['limite', 'asymptote', 'infini', 'branche infinie'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Une limite décrit le comportement d’une fonction au voisinage d’un point ou à l’infini. Une asymptote est une droite dont la courbe s’approche indéfiniment.',
    formula:
      'lim(x→±∞) 1/x = 0   |   asymptote verticale si lim f = ±∞ en a   |   oblique si f(x) − (ax + b) → 0',
    keys: [
      'Asymptote verticale x = a lorsque f tend vers ±∞ en a.',
      'Asymptote horizontale y = L lorsque f(x) → L à l’infini.',
      'On factorise par le terme dominant pour lever une forme indéterminée de type ∞/∞.',
    ],
    example:
      'f(x) = (2x + 1)/(x − 3) : asymptote verticale x = 3 et horizontale y = 2 (rapport des coefficients dominants).',
    pitfall:
      'Conclure « forme indéterminée donc pas de limite » : une factorisation par le terme dominant suffit généralement à trancher.',
    related: ['derivee', 'exponentielle'],
  },
  {
    id: 'probabilite-conditionnelle',
    term: 'Probabilité conditionnelle',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['probabilite conditionnelle', 'sachant que', 'arbre pondere', 'independance'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La probabilité de B sachant A est la probabilité que B se réalise lorsque A est déjà réalisé : P_A(B) = P(A ∩ B)/P(A), avec P(A) > 0.',
    formula: 'P_A(B) = P(A ∩ B)/P(A)   |   P(A ∩ B) = P(A) × P_A(B)',
    keys: [
      'Sur un arbre, on multiplie le long des branches et on additionne entre les branches.',
      'A et B sont indépendants si P(A ∩ B) = P(A) × P(B), pas parce qu’ils « semblent » séparés.',
      'La formule des probabilités totales découpe selon une partition de l’univers.',
    ],
    example:
      'Si 60 % des élèves font du sport et que 30 % des sportifs font aussi du théâtre, alors 18 % des élèves font les deux.',
    pitfall:
      'Confondre P_A(B) et P_B(A), et oublier que l’indépendance se démontre par un calcul, pas par l’intuition.',
    related: ['loi-binomiale', 'loi-normale'],
  },
  {
    id: 'loi-binomiale',
    term: 'Loi binomiale B(n, p)',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['loi binomiale', 'binomiale', 'epreuve de bernoulli', 'n p'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'On répète n fois une épreuve de Bernoulli identique et indépendante de probabilité de succès p. La variable X comptant les succès suit la loi binomiale B(n, p).',
    formula: 'P(X = k) = C(n,k) pᵏ (1 − p)ⁿ⁻ᵏ   |   E(X) = np   |   V(X) = np(1 − p)',
    keys: [
      'Trois conditions : répétition, épreuves identiques, indépendance.',
      'L’espérance np est le nombre moyen de succès.',
      'P(X ≥ 1) = 1 − P(X = 0) = 1 − (1 − p)ⁿ : le calcul le plus fréquent.',
    ],
    example:
      'Un QCM de 5 questions à 4 choix, répondu au hasard : P(3 bonnes) = C(5,3)(0,25)³(0,75)² ≈ 0,088.',
    pitfall:
      'Utiliser la loi binomiale sans vérifier l’indépendance (tirage sans remise !) et calculer P(X ≥ 1) en additionnant laborieusement au lieu de passer par l’événement contraire.',
    related: ['probabilite-conditionnelle', 'loi-normale'],
  },
  {
    id: 'loi-normale',
    term: 'Loi normale',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['loi normale', 'gaussienne', 'courbe en cloche', 'esperance ecart type'],
    classLevels: ['terminale'],
    definition:
      'La loi normale N(μ, σ) modélise une variable continue dont la distribution est symétrique en cloche autour de la moyenne μ, avec un écart type σ.',
    formula: 'P(μ − σ ≤ X ≤ μ + σ) ≈ 0,683   |   P(μ − 2σ ≤ X ≤ μ + 2σ) ≈ 0,954',
    keys: [
      'La courbe est symétrique : P(X ≤ μ) = P(X ≥ μ) = 0,5.',
      'L’écart type mesure la dispersion : plus σ est grand, plus la cloche est aplatie.',
      'On utilise la calculatrice ou la table pour les intervalles non remarquables.',
    ],
    example:
      'Des notes de moyenne 12 et d’écart type 2 : environ 68 % des élèves ont entre 10 et 14.',
    pitfall:
      'Oublier de corriger la continuité lors d’une approximation d’une loi discrète par une loi normale, et confondre μ (moyenne) avec σ (dispersion).',
    related: ['loi-binomiale', 'statistiques-descriptives'],
  },
  {
    id: 'statistiques-descriptives',
    term: 'Statistiques descriptives',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['moyenne', 'mediane', 'quartile', 'ecart type', 'serie statistique'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'La moyenne résume la tendance centrale, la médiane partage la série en deux, les quartiles en quatre. L’écart type mesure la dispersion autour de la moyenne.',
    formula: 'x̄ = Σnᵢxᵢ/N   |   σ = √(Σnᵢ(xᵢ − x̄)²/N)',
    keys: [
      'Médiane : valeur qui sépare 50 % des effectifs ; insensible aux valeurs extrêmes.',
      'Q1 et Q3 encadrent 50 % des données ; l’écart interquartile vaut Q3 − Q1.',
      'Comparer deux séries demande moyenne ET dispersion.',
    ],
    example:
      'Série 2, 4, 4, 7, 9 : moyenne 5,2, médiane 4 ; la moyenne est tirée vers le haut par la valeur 9.',
    pitfall:
      'Comparer des séries de tailles différentes sans pondérer, et confondre écart type (même unité que les données) et variance (unité au carré).',
    related: ['loi-normale'],
  },
  {
    id: 'pourcentage',
    term: 'Pourcentages et taux d’évolution',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['pourcentage', 'taux d evolution', 'hausse', 'baisse', 'coefficient multiplicateur'],
    classLevels: ['5e', '4e', '3e', '2nde', '1ere'],
    definition:
      'Une hausse de t % multiplie par (1 + t/100) ; une baisse par (1 − t/100). Les taux se composent en multipliant les coefficients, ils ne s’additionnent pas.',
    formula: 'CM = 1 + t/100   |   taux global = CM₁ × CM₂ − 1',
    keys: [
      'Pour retrouver un taux à partir du coefficient : t = (CM − 1) × 100.',
      'Hausse de 20 % puis baisse de 20 % ⇒ ×1,2 × 0,8 = 0,96, soit −4 %.',
      'Le taux de variation entre V₀ et V₁ vaut (V₁ − V₀)/V₀.',
    ],
    example:
      'Un article de 25 000 F subit une remise de 15 % : 25 000 × 0,85 = 21 250 F.',
    pitfall:
      'Additionner deux pourcentages successifs, et appliquer une remise sur le prix déjà remisé sans composer les coefficients.',
    mnemonic: '« Le pourcentage se multiplie, il ne s’additionne pas. »',
    related: ['suite-geometrique'],
  },
  {
    id: 'pgcd',
    term: 'PGCD et PPCM',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['pgcd', 'ppcm', 'plus grand commun diviseur', 'arithmetique'],
    classLevels: ['3e', '2nde', 'terminale'],
    definition:
      'Le PGCD de deux entiers est le plus grand entier qui divise les deux ; le PPCM est le plus petit multiple commun. On les obtient par décomposition en facteurs premiers ou par l’algorithme d’Euclide.',
    formula: 'PGCD(a, b) × PPCM(a, b) = a × b',
    keys: [
      'Algorithme d’Euclide : PGCD(a, b) = PGCD(b, r) où r est le reste de la division de a par b.',
      'Deux nombres sont premiers entre eux si leur PGCD vaut 1.',
      'Le PPCM sert à réduire deux fractions au même dénominateur.',
    ],
    example: 'PGCD(48, 36) : 48 = 36 × 1 + 12, 36 = 12 × 3 + 0, donc PGCD = 12 et PPCM = 144.',
    pitfall:
      'Confondre PGCD et PPCM dans les problèmes de partage (on cherche le plus grand diviseur commun) et oublier de décomposer tous les facteurs pour le PPCM.',
    related: ['fractions'],
  },
  {
    id: 'fractions',
    term: 'Fractions et opérations',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['fraction', 'denominateur', 'numerateur', 'simplifier'],
    classLevels: ['6e', '5e', '4e', '3e'],
    definition:
      'Une fraction a/b représente a parts d’un tout partagé en b parts égales. On additionne des fractions après réduction au même dénominateur et on multiplie numérateurs et dénominateurs entre eux.',
    formula: 'a/b + c/d = (ad + bc)/bd   |   (a/b)/(c/d) = ad/bc',
    keys: [
      'Simplifier avant de calculer limite les erreurs.',
      'Diviser par une fraction revient à multiplier par son inverse.',
      'Attention : a/b + c ne s’écrit jamais (a + c)/(b + c).',
    ],
    example: '2/3 + 1/4 = 8/12 + 3/12 = 11/12 ; 3/5 ÷ 2/7 = 3/5 × 7/2 = 21/10.',
    pitfall:
      'Additionner les dénominateurs, et simplifier un terme isolé alors que la simplification porte sur tout le numérateur et tout le dénominateur.',
    related: ['pgcd'],
  },
  {
    id: 'puissances-racines',
    term: 'Puissances et racines carrées',
    subjectId: 'maths',
    domain: 'maths',
    aliases: ['puissance', 'racine carree', 'exposant', 'racine'],
    classLevels: ['4e', '3e', '2nde'],
    definition:
      'aⁿ désigne le produit de n facteurs égaux à a. La racine carrée de a est le nombre positif dont le carré vaut a.',
    formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ   |   (aᵐ)ⁿ = aᵐⁿ   |   √(ab) = √a × √b',
    keys: [
      'a⁰ = 1 (pour a ≠ 0) et a⁻ⁿ = 1/aⁿ.',
      '√(a²) = |a|, pas a : la racine carrée est toujours positive.',
      '√(a + b) ≠ √a + √b.',
    ],
    example: '2³ × 2⁴ = 2⁷ = 128 ; √50 = √(25 × 2) = 5√2.',
    pitfall:
      'Distribuer la racine sur une somme et oublier que √(a²) = |a| (piège classique avec une variable).',
    related: ['fractions', 'logarithme'],
  },

  // ---------------------------------------------------------------- PHYSIQUE
  {
    id: 'vitesse-mouvement',
    term: 'Vitesse et mouvement',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['vitesse', 'mouvement rectiligne uniforme', 'mru', 'acceleration', 'trajectoire'],
    classLevels: ['5e', '4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'La vitesse moyenne est le rapport de la distance parcourue sur la durée du parcours. Dans un mouvement rectiligne uniforme, la vitesse est constante et le vecteur vitesse ne change pas.',
    formula: 'v = d/t   |   d = v × t   |   t = d/v',
    keys: [
      'Convertir : 1 m/s = 3,6 km/h.',
      'Un mouvement est uniforme si la vitesse est constante, accéléré si elle augmente.',
      'Le sens du mouvement est donné par le signe de la vitesse sur un axe orienté.',
    ],
    example: 'Parcourir 150 km en 2 h donne v = 75 km/h ≈ 20,8 m/s.',
    pitfall:
      'Mélanger les unités (minutes avec des km/h) et confondre vitesse moyenne et vitesse instantanée.',
    related: ['energie-cinetique', 'chute-libre'],
  },
  {
    id: 'poids-masse',
    term: 'Poids et masse',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['poids', 'masse', 'newton', 'kilogramme', 'pesanteur'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde'],
    definition:
      'La masse (en kg) mesure la quantité de matière et ne change pas ; le poids (en N) est la force d’attraction exercée par l’astre et dépend du lieu.',
    formula: 'P = m × g   (g ≈ 9,8 N/kg sur Terre, 1,6 N/kg sur la Lune)',
    keys: [
      'Masse en kilogrammes, poids en newtons : deux grandeurs différentes.',
      'Sur la Lune, la masse est identique mais le poids est divisé par environ 6.',
      'Représenter le poids par un vecteur vertical dirigé vers le bas.',
    ],
    example: 'Un élève de 60 kg a un poids terrestre de 60 × 9,8 = 588 N, soit environ 96 N sur la Lune.',
    pitfall:
      'Dire « je pèse 60 kg » en mélangeant masse et poids, et oublier la conversion des grammes en kilogrammes.',
    related: ['poussee-archimede', 'pression'],
  },
  {
    id: 'energie-cinetique',
    term: 'Énergie cinétique',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['energie cinetique', 'ec', 'energie de mouvement', 'joule'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'L’énergie cinétique est l’énergie liée au mouvement d’un corps de masse m animé d’une vitesse v. Elle s’exprime en joules.',
    formula: 'Ec = ½ × m × v²',
    keys: [
      'La vitesse est au carré : doubler la vitesse quadruple l’énergie cinétique.',
      'Conversion obligatoire des km/h en m/s avant le calcul.',
      'Théorème de l’énergie cinétique : la variation de Ec égale la somme des travaux des forces.',
    ],
    example: 'Une voiture de 1 000 kg à 90 km/h (25 m/s) possède Ec = 0,5 × 1 000 × 625 = 312 500 J.',
    pitfall:
      'Oublier de convertir la vitesse en m/s, ce qui fausse le résultat d’un facteur 12,96 (3,6²).',
    related: ['energie-mecanique', 'vitesse-mouvement'],
  },
  {
    id: 'energie-mecanique',
    term: 'Énergie mécanique et conservation',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['energie mecanique', 'energie potentielle', 'conservation de l energie', 'em'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'L’énergie mécanique est la somme de l’énergie cinétique et de l’énergie potentielle. En l’absence de frottements, elle reste constante : l’énergie se transforme sans se perdre.',
    formula: 'Em = Ec + Ep = ½mv² + mgz',
    keys: [
      'Sans frottement : Em = constante, donc ΔEc = −ΔEp.',
      'L’énergie potentielle de pesanteur dépend de la référence choisie pour z = 0.',
      'Les frottements convertissent l’énergie mécanique en énergie thermique.',
    ],
    example:
      'Un objet lâché de 5 m sans vitesse initiale atteint v = √(2 × 9,8 × 5) ≈ 9,9 m/s, quelle que soit sa masse.',
    pitfall:
      'Appliquer la conservation en présence de frottements et oublier de préciser la référence de l’énergie potentielle.',
    related: ['energie-cinetique', 'chute-libre'],
  },
  {
    id: 'chute-libre',
    term: 'Chute libre',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['chute libre', 'gravite', 'lois de newton', 'acceleration g'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Un corps est en chute libre lorsque la seule force qui s’exerce sur lui est son poids. Son accélération est alors égale au champ de pesanteur g, indépendamment de sa masse.',
    formula: 'a = g   |   v(t) = g·t + v₀   |   z(t) = ½g·t² + v₀t + z₀',
    keys: [
      'Dans le vide, tous les corps tombent avec la même accélération.',
      'Le mouvement est rectiligne uniformément accéléré si v₀ est verticale.',
      'La vitesse acquise ne dépend pas de la masse mais de la hauteur de chute.',
    ],
    example: 'Après 2 s de chute sans vitesse initiale : v = 19,6 m/s et hauteur chutée ≈ 19,6 m.',
    pitfall:
      'Croire qu’un objet plus lourd tombe plus vite (vrai seulement avec frottements de l’air), et oublier la vitesse initiale dans les équations.',
    related: ['energie-mecanique', 'vitesse-mouvement'],
  },
  {
    id: 'loi-ohm',
    term: 'Loi d’Ohm',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['loi d ohm', 'tension', 'intensite', 'resistance', 'ohm'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'Aux bornes d’un conducteur ohmique, la tension est proportionnelle à l’intensité du courant qui le traverse : u = R × i.',
    formula: 'u = R × i   (U en volts, R en ohms, I en ampères)',
    keys: [
      'La résistance convertit l’énergie électrique en chaleur (effet Joule).',
      'En série, les résistances s’additionnent ; en dérivation, 1/Req = Σ1/Rᵢ.',
      'La caractéristique u = f(i) d’un conducteur ohmique est une droite passant par l’origine.',
    ],
    example: 'Un dipôle de 220 Ω traversé par 0,05 A présente une tension de 11 V.',
    pitfall:
      'Utiliser des milliampères sans conversion en ampères et appliquer la loi d’Ohm à un dipôle non ohmique (lampe, diode).',
    mnemonic: 'Triangle U-R-I : U en haut, R et I en bas ; U = R × I, R = U/I, I = U/R.',
    related: ['puissance-electrique', 'dipole-rc'],
  },
  {
    id: 'puissance-electrique',
    term: 'Puissance et énergie électrique',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['puissance electrique', 'wattheure', 'kwh', 'effet joule', 'p = ui'],
    classLevels: ['3e', '2nde', '1ere'],
    definition:
      'La puissance électrique consommée par un dipôle vaut P = U × I. L’énergie consommée est le produit de la puissance par la durée.',
    formula: 'P = U × I   |   E = P × t   |   P = R × I² (effet Joule)',
    keys: [
      'Une énergie en kWh correspond à une puissance en kW multipliée par des heures.',
      '1 kWh = 3,6 × 10⁶ J.',
      'Le rendement compare l’énergie utile à l’énergie absorbée.',
    ],
    example: 'Un fer à repasser de 1 200 W utilisé 30 min consomme 0,6 kWh.',
    pitfall:
      'Mélanger W et kW dans le calcul des kWh et oublier de convertir les minutes en heures.',
    related: ['loi-ohm', 'rendement'],
  },
  {
    id: 'dipole-rc',
    term: 'Dipôle RC et constante de temps',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['dipole rc', 'condensateur', 'constante de temps', 'charge decharge', 'tau'],
    classLevels: ['terminale'],
    definition:
      'Lors de la charge d’un condensateur de capacité C à travers une résistance R sous une tension E, la tension évolue selon u_C(t) = E(1 − e^(−t/τ)) avec τ = RC.',
    formula: 'τ = R × C   |   u_C(t) = E(1 − e^(−t/τ))   |   q = C × u_C',
    keys: [
      'À t = τ, la charge atteint 63 % de sa valeur finale.',
      'La charge est considérée terminée au bout de 5τ (99,3 %).',
      'La tension aux bornes d’un condensateur est continue : pas de saut brusque.',
    ],
    example: 'Avec R = 10 kΩ et C = 100 µF, τ = 1 s : au bout de 1 s, u_C = 0,63E.',
    pitfall:
      'Oublier de convertir les microfarads en farads et confondre la constante de temps avec la durée totale de charge.',
    related: ['loi-ohm', 'puissance-electrique'],
  },
  {
    id: 'periode-frequence',
    term: 'Période et fréquence',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['periode', 'frequence', 'hertz', 'signal periodique'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'La période T est la durée d’un cycle complet ; la fréquence f est le nombre de cycles par seconde. Elles sont inverses l’une de l’autre.',
    formula: 'f = 1/T   (f en hertz, T en secondes)',
    keys: [
      'Un signal périodique se répète identique à lui-même.',
      'Sur un oscillogramme, T se lit en multipliant le nombre de divisions par la sensibilité horizontale.',
      'La fréquence du secteur en Afrique centrale et en Europe est de 50 Hz (T = 20 ms).',
    ],
    example: 'Un signal de période 4 ms a une fréquence de 250 Hz.',
    pitfall:
      'Lire une demi-période au lieu d’une période complète et oublier les préfixes (kHz, MHz).',
    related: ['onde-longueur', 'dipole-rc'],
  },
  {
    id: 'onde-longueur',
    term: 'Ondes et longueur d’onde',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['onde', 'longueur d onde', 'lambda', 'celerite', 'son', 'lumiere'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Une onde transporte de l’énergie sans transport de matière. Sa longueur d’onde λ est la distance parcourue pendant une période : λ = v × T = v/f.',
    formula: 'λ = v × T = v/f',
    keys: [
      'Vitesse du son dans l’air ≈ 340 m/s ; vitesse de la lumière ≈ 3 × 10⁸ m/s.',
      'Le son a besoin d’un milieu matériel, la lumière non.',
      'La fréquence ne change pas quand l’onde change de milieu : c’est la vitesse (donc λ) qui change.',
    ],
    example: 'Un son de 500 Hz dans l’air a une longueur d’onde de 340/500 = 0,68 m.',
    pitfall:
      'Confondre période (s) et longueur d’onde (m), et croire que la fréquence change lors d’une réfraction.',
    related: ['periode-frequence', 'refraction-snell'],
  },
  {
    id: 'refraction-snell',
    term: 'Réfraction et loi de Snell-Descartes',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['refraction', 'snell descartes', 'indice de refraction', 'angle incident'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Lors du passage d’un rayon lumineux d’un milieu à un autre, il change de direction : c’est la réfraction. La loi de Snell-Descartes relie les angles et les indices de réfraction.',
    formula: 'n₁ sin i₁ = n₂ sin i₂',
    keys: [
      'Les angles se mesurent par rapport à la normale au dioptre.',
      'Indice de l’air ≈ 1, de l’eau ≈ 1,33, du verre ≈ 1,5.',
      'Si i₂ > 90° n’existe pas, il y a réflexion totale.',
    ],
    example:
      'Un rayon passant de l’air (n = 1) à l’eau (n = 1,33) sous 45° ressort avec sin i₂ = 0,707/1,33, soit i₂ ≈ 32°.',
    pitfall:
      'Mesurer l’angle par rapport à la surface au lieu de la normale, et oublier que la lumière se rapproche de la normale en passant vers un milieu plus réfringent.',
    mnemonic: '« n₁ sin i₁ = n₂ sin i₂ » : les indices et les sinus se compensent.',
    related: ['onde-longueur', 'optique-lentille'],
  },
  {
    id: 'optique-lentille',
    term: 'Lentille mince convergente',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['lentille', 'focale', 'image reelle', 'vergence', 'optique geometrique'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Une lentille convergente fait converger les rayons parallèles en son foyer image. La relation de conjugaison relie la position de l’objet, de l’image et la distance focale.',
    formula: '1/OA’ − 1/OA = 1/f’   |   grandissement γ = A’B’/AB = OA’/OA',
    keys: [
      'Les distances sont algébriques et orientées dans le sens de propagation.',
      'f’ > 0 pour une lentille convergente, f’ < 0 pour une divergente.',
      'Un objet au foyer objet donne une image à l’infini.',
    ],
    example: 'Un objet placé à 30 cm d’une lentille de focale 10 cm donne une image à 15 cm.',
    pitfall:
      'Oublier les signes algébriques (OA négatif pour un objet réel placé avant la lentille) et tracer un seul rayon au lieu de deux.',
    related: ['refraction-snell'],
  },
  {
    id: 'pression',
    term: 'Pression et force pressante',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['pression', 'pascal', 'bar', 'force pressante', 'hydrostatique'],
    classLevels: ['4e', '3e', '2nde', '1ere'],
    definition:
      'La pression est la force exercée par unité de surface : p = F/S. Elle se mesure en pascals et augmente avec la profondeur dans un liquide.',
    formula: 'p = F/S   |   p = p₀ + ρ·g·h',
    keys: [
      '1 bar = 10⁵ Pa ; la pression atmosphérique vaut environ 1 013 hPa.',
      'Dans un liquide, la pression dépend de la profondeur et de la masse volumique, pas de la forme du récipient.',
      'La même force appliquée sur une surface dix fois plus petite produit une pression dix fois plus grande.',
    ],
    example: 'À 10 m de profondeur dans l’eau : p ≈ 101 300 + 1 000 × 9,8 × 10 ≈ 199 300 Pa.',
    pitfall:
      'Utiliser des cm² au lieu des m² (1 cm² = 10⁻⁴ m²) et oublier la pression atmosphérique en surface.',
    related: ['poussee-archimede', 'poids-masse'],
  },
  {
    id: 'poussee-archimede',
    term: 'Poussée d’Archimède',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['archimede', 'poussee d archimede', 'flottabilite', 'deplacement d eau'],
    classLevels: ['3e', '2nde', '1ere'],
    definition:
      'Tout corps plongé dans un fluide subit une poussée verticale dirigée vers le haut, égale au poids du fluide déplacé.',
    formula: 'Π = ρ_fluide × V_immergé × g',
    keys: [
      'Si Π > poids, le corps flotte ; si Π < poids, il coule.',
      'La poussée ne dépend pas de la masse du corps mais du volume immergé.',
      'C’est la variation de poussée qui explique la flottabilité d’un sous-marin (ballasts).',
    ],
    example:
      'Un bloc de 0,002 m³ immergé dans l’eau subit Π = 1 000 × 0,002 × 9,8 = 19,6 N.',
    pitfall:
      'Utiliser la masse volumique du corps au lieu de celle du fluide, et oublier que seul le volume immergé compte.',
    related: ['pression', 'poids-masse'],
  },
  {
    id: 'rendement',
    term: 'Rendement d’un dispositif',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['rendement', 'energie utile', 'pertes', 'efficacite'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Le rendement compare l’énergie utilement transférée à l’énergie absorbée. Il est toujours inférieur ou égal à 1 (ou 100 %) à cause des pertes.',
    formula: 'η = E_utile / E_absorbée = P_utile / P_absorbée',
    keys: [
      'Un rendement s’exprime en pourcentage (0 à 100 %).',
      'Les pertes sont souvent dissipées sous forme thermique.',
      'Le rendement global d’une chaîne est le produit des rendements intermédiaires.',
    ],
    example: 'Un moteur qui absorbe 500 W et fournit 400 W a un rendement de 80 %.',
    pitfall:
      'Inverser numérateur et dénominateur, et oublier que le rendement global se multiplie (0,9 × 0,8 = 0,72, pas 0,85).',
    related: ['puissance-electrique', 'energie-cinetique'],
  },
  {
    id: 'champ-electrique',
    term: 'Champ électrique et force de Coulomb',
    subjectId: 'physique',
    domain: 'physique',
    aliases: ['champ electrique', 'coulomb', 'force electrostatique', 'charge electrique'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Deux charges électriques exercent l’une sur l’autre une force proportionnelle au produit des charges et inversement proportionnelle au carré de la distance. Le champ électrique est la force par unité de charge.',
    formula: 'F = k·|q₁q₂|/d²   |   E = F/q   |   k ≈ 9 × 10⁹',
    keys: [
      'Charges de même signe : répulsion ; de signes opposés : attraction.',
      'Le champ électrique est orienté de la borne positive vers la borne négative.',
      'La force décroît très vite avec la distance (1/d²).',
    ],
    example:
      'Deux charges de 1 µC séparées de 10 cm exercent une force de 9 × 10⁹ × 10⁻¹²/0,01 = 0,9 N.',
    pitfall:
      'Oublier de convertir les microcoulombs et les centimètres, et confondre champ (V/m) et force (N).',
    related: ['loi-ohm', 'onde-longueur'],
  },

  // ---------------------------------------------------------------- CHIMIE
  {
    id: 'mole',
    term: 'Mole et quantité de matière',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['mole', 'quantite de matiere', 'avogadro', 'mol'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La mole est l’unité de quantité de matière : une mole contient 6,02 × 10²³ entités. La quantité de matière d’un échantillon se calcule à partir de sa masse et de sa masse molaire.',
    formula: 'n = m/M   |   N = n × N_A   |   N_A = 6,02 × 10²³ mol⁻¹',
    keys: [
      'M s’exprime en g/mol : n = m/M donne des moles.',
      'Pour un gaz, n = V/V_m (V_m ≈ 24 L/mol à 20 °C et 1 bar).',
      'Dans une solution, n = C × V si C est en mol/L et V en litres.',
    ],
    example: '18 g d’eau (M = 18 g/mol) représentent 1 mol, donc 6,02 × 10²³ molécules.',
    pitfall:
      'Utiliser des grammes avec une masse molaire en kg/mol et oublier de convertir les mL en L.',
    related: ['concentration', 'tableau-avancement'],
  },
  {
    id: 'concentration',
    term: 'Concentration molaire',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['concentration', 'molaire', 'mol par litre', 'solution'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La concentration molaire d’une espèce en solution est la quantité de matière dissoute par litre de solution : C = n/V.',
    formula: 'C = n/V   (mol/L)   |   n = C × V',
    keys: [
      'Le volume pris en compte est celui de la solution, pas celui du solvant.',
      'La concentration massique C_m = m/V s’exprime en g/L et C_m = C × M.',
      'Lors d’une dilution, la quantité de matière de soluté est conservée.',
    ],
    example: 'Dissoudre 0,1 mol de sel dans 500 mL d’eau donne C = 0,1/0,5 = 0,2 mol/L.',
    pitfall:
      'Diviser par le volume de solvant ajouté au lieu du volume total de solution, et oublier la conversion mL → L.',
    related: ['mole', 'dilution', 'titrage'],
  },
  {
    id: 'dilution',
    term: 'Dilution',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['dilution', 'facteur de dilution', 'solution mere', 'pipette'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Diluer une solution consiste à y ajouter du solvant sans ajouter de soluté : la quantité de matière reste constante, la concentration diminue.',
    formula: 'C_mère × V_mère = C_fille × V_fille',
    keys: [
      'Le facteur de dilution vaut F = C_mère/C_fille = V_fille/V_mère.',
      'Utiliser une pipette jaugée pour prélever et une fiole jaugée pour compléter.',
      'La concentration diminue quand le volume augmente.',
    ],
    example:
      'Pour préparer 250 mL à 0,1 mol/L à partir d’une solution à 1 mol/L : V = (0,1 × 250)/1 = 25 mL.',
    pitfall:
      'Ajouter du soluté en même temps que le solvant, et compléter au-delà du trait de jauge (concentration fausse).',
    related: ['concentration', 'titrage'],
  },
  {
    id: 'ph',
    term: 'pH et acidité',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['ph', 'acidite', 'basicite', 'log h3o'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Le pH mesure l’acidité d’une solution aqueuse : pH = −log[H₃O⁺]. Plus le pH est bas, plus la solution est acide.',
    formula: 'pH = −log[H₃O⁺]   |   [H₃O⁺] = 10^(−pH)   |   pH acide + pH base = 14 (à 25 °C)',
    keys: [
      'pH < 7 : acide ; pH = 7 : neutre ; pH > 7 : basique (à 25 °C).',
      'Une dilution d’un acide fort rapproche le pH de 7 sans jamais le dépasser.',
      'Le pH dépend de la température : le pH neutre n’est pas toujours 7.',
    ],
    example: 'Une solution de pH 3 contient [H₃O⁺] = 10⁻³ mol/L, soit 100 fois plus qu’à pH 5.',
    pitfall:
      'Croire que pH 5 est « deux fois » plus acide que pH 3 (en réalité 100 fois moins) et oublier que l’échelle est logarithmique.',
    mnemonic: '« Un point de pH = un facteur 10 sur la concentration. »',
    related: ['acide-base', 'titrage'],
  },
  {
    id: 'acide-base',
    term: 'Réaction acide-base',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['acide base', 'couple acide base', 'bronsted', 'transfert de proton'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Selon Brønsted, un acide cède un proton H⁺ et une base le capte. Un couple acide/base est relié par l’échange d’un proton.',
    formula: 'AH + H₂O ⇌ A⁻ + H₃O⁺   |   K_a = [A⁻][H₃O⁺]/[AH]   |   pK_a = −log K_a',
    keys: [
      'Un acide fort réagit totalement avec l’eau ; un acide faible réagit partiellement.',
      'À pH = pK_a, l’acide et la base conjuguée sont en proportions égales.',
      'Plus le pK_a est petit, plus l’acide est fort.',
    ],
    example: 'Le couple CH₃COOH/CH₃COO⁻ a un pK_a de 4,8 : à pH 4,8, moitié acide, moitié base.',
    pitfall:
      'Confondre force d’un acide (constante d’acidité) et concentration (pH), et oublier que l’eau intervient dans le couple.',
    related: ['ph', 'titrage'],
  },
  {
    id: 'titrage',
    term: 'Titrage',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['titrage', 'dosage', 'equivalence', 'burette'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Un titrage permet de déterminer la concentration inconnue d’une solution en la faisant réagir avec une solution titrante de concentration connue jusqu’à l’équivalence.',
    formula: 'C_A × V_A = C_B × V_B (pour des coefficients 1:1)',
    keys: [
      'À l’équivalence, les réactifs ont été introduits dans les proportions stœchiométriques.',
      'Repérer l’équivalence par un changement de couleur (indicateur) ou un saut de pH.',
      'Écrire l’équation-bilan avant d’utiliser la relation.',
    ],
    example:
      'Doser 20 mL d’acide par une base à 0,1 mol/L : équivalence à 12 mL, donc C_acide = 0,1 × 12/20 = 0,06 mol/L.',
    pitfall:
      'Appliquer la relation 1:1 sans vérifier les coefficients stœchiométriques, et confondre volume versé et volume total.',
    related: ['concentration', 'ph', 'acide-base'],
  },
  {
    id: 'oxydoreduction',
    term: 'Oxydoréduction',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['oxydoreduction', 'oxydant', 'reducteur', 'transfert d electrons', 'demi equation'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Une oxydation est une perte d’électrons, une réduction est un gain d’électrons. L’oxydant capte des électrons, le réducteur en cède.',
    formula: 'Ox + n e⁻ ⇌ Red   |   couple Ox/Red',
    keys: [
      'Dans une réaction d’oxydoréduction, les électrons échangés ne sont jamais libres.',
      'Il faut équilibrer les demi-équations puis les additionner en multipliant pour éliminer les électrons.',
      'Le nombres d’oxydation (n.o.) aide à identifier l’élément qui s’oxyde.',
    ],
    example:
      'Fe²⁺/Fe et Cu²⁺/Cu : le fer s’oxyde (Fe → Fe²⁺ + 2e⁻) et le cuivre est réduit (Cu²⁺ + 2e⁻ → Cu).',
    pitfall:
      'Additionner les demi-équations sans multiplier pour égaliser les électrons, et inverser oxydant/réducteur.',
    mnemonic: '« Oxydation = perte d’électrons » : celui qui perd s’oxyde.',
    related: ['acide-base', 'electrolyse'],
  },
  {
    id: 'electrolyse',
    term: 'Électrolyse',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['electrolyse', 'electrodes', 'anode', 'cathode', 'pile'],
    classLevels: ['terminale'],
    definition:
      'L’électrolyse est une transformation chimique forcée par un passage de courant, réalisée dans un électrolyseur. C’est la réaction inverse de celle d’une pile.',
    formula: 'Q = I × t   |   n(e⁻) = Q/F   avec F ≈ 96 500 C/mol',
    keys: [
      'L’anode est le siège de l’oxydation, la cathode celui de la réduction.',
      'Dans un électrolyseur, le courant circule du pôle + vers le pôle −.',
      'La quantité de matière formée dépend de la charge totale Q = It.',
    ],
    example: 'Un courant de 2 A pendant 1 930 s libère 3 860 C, soit 0,04 mol d’électrons.',
    pitfall:
      'Confondre les rôles de l’anode et de la cathode et oublier de convertir les minutes en secondes.',
    related: ['oxydoreduction'],
  },
  {
    id: 'tableau-avancement',
    term: 'Tableau d’avancement',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['tableau d avancement', 'avancement', 'reactif limitant', 'stoechiometrie'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'Le tableau d’avancement suit l’évolution des quantités de matière au cours d’une transformation chimique, en fonction de l’avancement x.',
    formula: 'n(A) = n₀(A) − a·x   |   réactif limitant : n₀/a minimale',
    keys: [
      'Écrire et équilibrer l’équation-bilan avant de remplir le tableau.',
      'Le réactif limitant est celui qui s’épuise le premier (plus petit rapport n₀/coefficient).',
      'À l’état final, x = x_max et le réactif limitant a une quantité nulle.',
    ],
    example:
      'Pour 2 mol de H₂ et 1 mol de O₂ (2H₂ + O₂ → 2H₂O), le rapport 2/2 = 1 et 1/1 = 1 : mélange stœchiométrique, x_max = 1 mol.',
    pitfall:
      'Oublier les coefficients stœchiométriques dans les colonnes et conclure sur le limitant en comparant les quantités initiales brutes.',
    related: ['mole', 'equilibre-chimique'],
  },
  {
    id: 'equilibre-chimique',
    term: 'Équilibre chimique',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['equilibre chimique', 'quotient de reaction', 'le chatelier', 'reaction reversible'],
    classLevels: ['terminale'],
    definition:
      'Un équilibre chimique est atteint lorsque les vitesses des réactions directe et inverse sont égales : les concentrations n’évoluent plus macroscopiquement, mais les réactions continuent.',
    formula: 'Q_r = [produits]/[réactifs]   |   équilibre ⇔ Q_r = K',
    keys: [
      'Un équilibre est dynamique : les deux réactions se produisent simultanément.',
      'D’après Le Chatelier, une contrainte déplace l’équilibre dans le sens qui la limite.',
      'La constante K ne dépend que de la température.',
    ],
    example:
      'Dans la synthèse de l’ammoniac, augmenter la pression déplace l’équilibre vers la formation de NH₃ (moins de moles gazeuses).',
    pitfall:
      'Croire que la réaction s’arrête à l’équilibre, et penser que K dépend des concentrations initiales.',
    related: ['tableau-avancement', 'acide-base'],
  },
  {
    id: 'liaison-chimique',
    term: 'Liaisons chimiques',
    subjectId: 'chimie_bio',
    domain: 'chimie',
    aliases: ['liaison covalente', 'liaison ionique', 'molecule', 'doublet'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Une liaison covalente résulte de la mise en commun de deux électrons de valence ; une liaison ionique résulte d’un transfert d’électrons entre un métal et un non-métal.',
    formula: 'règle du duet (2 e⁻) et de l’octet (8 e⁻)',
    keys: [
      'Les atomes engagent leurs électrons de valence pour atteindre une structure stable.',
      'Une molécule est électriquement neutre ; un ion est chargé.',
      'La polarité d’une liaison dépend de l’électronégativité des atomes.',
    ],
    example:
      'NaCl est ionique (Na⁺ Cl⁻) ; H₂O est covalente polaire, avec deux doublets liants et deux doublets non liants sur l’oxygène.',
    pitfall:
      'Confondre le nombre de liaisons (doublets liants) et le nombre total de doublets, et oublier les doublets non liants.',
    related: ['mole', 'oxydoreduction'],
  },

  // ---------------------------------------------------------------- SVT & BIOLOGIE
  {
    id: 'mitose',
    term: 'Mitose',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['mitose', 'division cellulaire', 'pmat', 'reproduction conforme'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'La mitose est la division d’une cellule mère en deux cellules filles génétiquement identiques, avec le même nombre de chromosomes. Elle assure la croissance et le renouvellement des tissus.',
    keys: [
      'Quatre phases : Prophase, Métaphase, Anaphase, Télophase (PMAT).',
      'La réplication de l’ADN a lieu avant, pendant la phase S de l’interphase.',
      'Une cellule diploïde (2n) donne deux cellules diploïdes (2n).',
    ],
    example:
      'Une cellule humaine à 46 chromosomes donne après mitose deux cellules à 46 chromosomes chacune.',
    pitfall:
      'Dire que la mitose « réduit » le nombre de chromosomes (c’est la méiose), et oublier l’interphase avec la réplication.',
    mnemonic: 'PMAT : Pour Mon Amusement, Tout se passe en ordre.',
    related: ['meiose', 'adn'],
  },
  {
    id: 'meiose',
    term: 'Méiose',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['meiose', 'gametes', 'haploide', 'brassage genetique', 'crossing over'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La méiose est une succession de deux divisions cellulaires qui produit quatre cellules haploïdes génétiquement différentes à partir d’une cellule diploïde. Elle est à l’origine des gamètes.',
    keys: [
      'Deux divisions : réductionnelle (division I) puis équationnelle (division II).',
      'Deux brassages : interchromosomique (anaphase I) et intrachromosomique (crossing-over en prophase I).',
      'Une cellule 2n donne quatre cellules n, toutes différentes.',
    ],
    example: 'Chez l’humain, une cellule à 46 chromosomes donne quatre spermatozoïdes à 23 chromosomes.',
    pitfall:
      'Confondre méiose et mitose, et oublier que le crossing-over a lieu en prophase I (pas en mitose).',
    related: ['mitose', 'genetique-mendel'],
  },
  {
    id: 'adn',
    term: 'ADN et réplication',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['adn', 'replication', 'double helice', 'nucleotide', 'chromosome'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'L’ADN est une macromolécule en double hélice formée de nucléotides (A, T, G, C). Il porte l’information génétique et se réplique avant chaque division cellulaire.',
    formula: 'appariement : A–T et G–C',
    keys: [
      'La réplication est semi-conservative : chaque brin sert de matrice.',
      'Chez l’humain, l’ADN est réparti sur 46 chromosomes (23 paires).',
      'L’information génétique est transcrite en ARN puis traduite en protéines.',
    ],
    example: 'Le brin ATGC se réplique en formant le brin complémentaire TACG.',
    pitfall:
      'Apparier A–G ou C–T, et croire que la réplication crée un ADN entièrement neuf (elle est semi-conservative).',
    related: ['transcription-traduction', 'mitose'],
  },
  {
    id: 'transcription-traduction',
    term: 'Transcription et traduction',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['transcription', 'traduction', 'arn messager', 'codon', 'proteine'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La transcription copie un gène d’ADN en ARN messager dans le noyau ; la traduction lit cet ARNm au niveau des ribosomes pour assembler une chaîne d’acides aminés.',
    keys: [
      'Un codon de 3 nucléotides code un acide aminé.',
      'La traduction a lieu dans le cytoplasme, sur les ribosomes.',
      'Le code génétique est redondant : plusieurs codons peuvent coder le même acide aminé.',
    ],
    example:
      'Le codon AUG est le codon d’initiation ; UAA, UAG et UGA sont des codons-stop.',
    pitfall:
      'Mélanger les bases de l’ARN (U remplace T) et confondre codon (3 nucléotides) avec anticodon porté par l’ARNt.',
    related: ['adn', 'genetique-mendel'],
  },
  {
    id: 'genetique-mendel',
    term: 'Génétique et lois de Mendel',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['genetique', 'mendel', 'croisement', 'dominant recessif', 'echiquier'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'Les caractères héréditaires sont transmis par des gènes, chaque individu portant deux allèles. Un allèle dominant s’exprime chez l’hétérozygote, un allèle récessif nécessite d’être homozygote.',
    formula: 'croisement F1 : Aa × Aa → 1/4 AA, 1/2 Aa, 1/4 aa',
    keys: [
      'Génotype (allèles) ≠ phénotype (caractère observé).',
      'L’échiquier de croisement donne les proportions attendues.',
      'Un individu porteur sain est hétérozygote pour une maladie récessive.',
    ],
    example:
      'Deux parents Aa (porteurs sains) ont 25 % de chances d’avoir un enfant aa malade et 75 % d’un enfant sain.',
    pitfall:
      'Confondre allèle et gène, et oublier d’écrire les génotypes avec deux allèles (Aa, pas A).',
    related: ['meiose', 'transcription-traduction'],
  },
  {
    id: 'groupes-sanguins',
    term: 'Groupes sanguins',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['groupe sanguin', 'abo', 'rhesus', 'transfusion', 'antigene'],
    classLevels: ['3e', '2nde', '1ere'],
    definition:
      'Le groupe sanguin dépend des antigènes A et B présents à la surface des globules rouges et des anticorps présents dans le plasma. Le facteur Rhésus ajoute la distinction +/−.',
    keys: [
      'Chaque individu possède les anticorps contre les antigènes qu’il ne porte pas.',
      'Un receveur ne doit pas recevoir d’antigènes qu’il ne possède pas.',
      'O− est donneur universel, AB+ receveur universel.',
    ],
    example: 'Un patient de groupe A porte l’antigène A et des anticorps anti-B : il ne peut pas recevoir de sang B.',
    pitfall:
      'Confondre antigène (sur le globule rouge) et anticorps (dans le plasma), et ignorer le Rhésus dans une transfusion.',
    related: ['immunite'],
  },
  {
    id: 'immunite',
    term: 'Immunité',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['immunite', 'anticorps', 'lymphocyte', 'vaccin', 'defense de l organisme'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'L’immunité innée est rapide et non spécifique ; l’immunité adaptative est spécifique d’un antigène et repose sur les lymphocytes B (anticorps) et T (cellules infectées).',
    keys: [
      'La vaccination crée une mémoire immunitaire sans provoquer la maladie.',
      'Les anticorps se fixent spécifiquement sur un antigène (clé-serrure).',
      'Le VIH détruit les lymphocytes T4, ce qui affaiblit l’immunité adaptative.',
    ],
    example:
      'Après un vaccin, l’organisme garde des lymphocytes mémoire qui réagissent plus vite à la seconde rencontre.',
    pitfall:
      'Croire que l’immunité innée est spécifique et que les antibiotiques agissent sur les virus.',
    related: ['groupes-sanguins', 'microbiologie'],
  },
  {
    id: 'photosynthese',
    term: 'Photosynthèse',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['photosynthese', 'chlorophylle', 'co2', 'glucose', 'plante verte'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'La photosynthèse permet aux végétaux chlorophylliens de produire de la matière organique à partir de dioxyde de carbone, d’eau et de lumière.',
    formula: '6 CO₂ + 6 H₂O + lumière → C₆H₁₂O₆ + 6 O₂',
    keys: [
      'Elle a lieu dans les chloroplastes, grâce à la chlorophylle.',
      'Elle libère du dioxygène et stocke l’énergie sous forme de glucose.',
      'Elle est à la base de la plupart des chaînes alimentaires.',
    ],
    example:
      'Une plante placée à l’obscurité cesse de produire de l’O₂ : la lumière est un facteur indispensable.',
    pitfall:
      'Confondre photosynthèse et respiration (qui consomme O₂ et libère CO₂) et croire que la plante ne respire pas.',
    related: ['respiration-cellulaire', 'ecosysteme'],
  },
  {
    id: 'respiration-cellulaire',
    term: 'Respiration cellulaire',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['respiration cellulaire', 'atp', 'mitochondrie', 'glycolyse'],
    classLevels: ['1ere', 'terminale'],
    definition:
      'La respiration cellulaire dégrade le glucose en présence de dioxygène pour produire de l’énergie utilisable (ATP), du CO₂ et de l’eau.',
    formula: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + énergie (ATP)',
    keys: [
      'Elle se déroule dans le cytoplasme puis dans les mitochondries.',
      'L’ATP est la « monnaie énergétique » de la cellule.',
      'En l’absence d’O₂, la fermentation prend le relais avec un rendement plus faible.',
    ],
    example: 'Un muscle en effort intense manque d’O₂ et produit de l’acide lactique par fermentation.',
    pitfall:
      'Inverser les réactifs de la photosynthèse et de la respiration, et croire que la respiration se fait uniquement dans les poumons.',
    related: ['photosynthese'],
  },
  {
    id: 'ecosysteme',
    term: 'Écosystème et chaîne alimentaire',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['ecosysteme', 'chaine alimentaire', 'biomasse', 'producteur', 'consommateur'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde'],
    definition:
      'Un écosystème est un ensemble formé par un milieu de vie et les êtres vivants qui l’occupent, reliés par des relations alimentaires et énergétiques.',
    keys: [
      'Les producteurs (végétaux) captent l’énergie solaire ; les consommateurs la transfèrent.',
      'Les décomposeurs recyclent la matière organique en éléments minéraux.',
      'L’énergie diminue à chaque niveau trophique (pyramide alimentaire).',
    ],
    example:
      'Herbe → sauterelle → grenouille → serpent : chaque maillon ne transmet qu’une fraction de l’énergie reçue.',
    pitfall:
      'Placer un animal au mauvais niveau trophique et oublier le rôle des décomposeurs dans le recyclage.',
    related: ['photosynthese', 'cycle-cardiaque'],
  },
  {
    id: 'cycle-cardiaque',
    term: 'Cycle cardiaque',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['cycle cardiaque', 'systole', 'diastole', 'frequence cardiaque', 'coeur'],
    classLevels: ['2nde', '1ere', 'terminale'],
    definition:
      'Le cycle cardiaque alterne contraction (systole) et relâchement (diastole) des oreillettes puis des ventricules, ce qui propulse le sang dans la circulation.',
    keys: [
      'Le sang circule dans un sens unique grâce aux valvules.',
      'La fréquence cardiaque au repos est d’environ 60 à 80 battements par minute.',
      'Le débit cardiaque vaut fréquence × volume d’éjection systolique.',
    ],
    example: 'À 70 bpm et 70 mL éjectés par battement, le débit est d’environ 4,9 L/min.',
    pitfall:
      'Confondre systole (contraction) et diastole (relâchement), et mélanger circulation pulmonaire et systémique.',
    related: ['respiration-cellulaire', 'ecosysteme'],
  },
  {
    id: 'echantillonnage',
    term: 'Échantillonnage et fluctuation',
    subjectId: 'statistiques',
    domain: 'maths',
    aliases: ['echantillon', 'echantillonnage', 'fluctuation', 'intervalle de confiance', 'sondage'],
    classLevels: ['1ere', 'terminale', 'l1', 'l2'],
    definition:
      'Un échantillon est un sous-ensemble d’une population. La fréquence observée sur un échantillon fluctue autour de la proportion réelle : c’est la fluctuation d’échantillonnage.',
    formula: 'intervalle de fluctuation à 95 % ≈ [p − 1/√n ; p + 1/√n] (conditions usuelles)',
    keys: [
      'Plus la taille n de l’échantillon augmente, plus la fluctuation diminue.',
      'La moyenne des fréquences observées tend vers la proportion réelle p.',
      'Un intervalle de confiance s’interprète en probabilité, pas comme une certitude.',
    ],
    example:
      'Pour p = 0,5 et n = 100, l’intervalle de fluctuation approché à 95 % vaut environ [0,40 ; 0,60].',
    pitfall:
      'Confondre intervalle de fluctuation (autour de p) et intervalle de confiance (autour de la fréquence observée), et conclure sur la population à partir d’un échantillon trop petit.',
    related: ['statistiques-descriptives', 'probabilite-conditionnelle'],
  },
  {
    id: 'tectonique-plaques',
    term: 'Tectonique des plaques',
    subjectId: 'svt',
    domain: 'biologie',
    aliases: ['tectonique', 'plaques', 'subduction', 'dorsale', 'seisme', 'volcanisme'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'La lithosphère est découpée en plaques rigides qui se déplacent sur l’asthénosphère. Leurs mouvements (divergence, convergence, coulissage) expliquent séismes, volcans et formation des reliefs.',
    keys: [
      'Divergence aux dorsales : création de croûte océanique.',
      'Convergence : subduction (fosse, volcans) ou collision (chaîne de montagnes).',
      'Les séismes se concentrent aux limites de plaques.',
    ],
    example:
      'La convergence de la plaque africaine et de la plaque eurasienne soulève les Alpes et provoque des séismes en Méditerranée.',
    pitfall:
      'Confondre subduction (une plaque passe sous une autre) et collision (deux continents se heurtent), et placer les séismes au hasard sur les continents.',
    related: ['ecosysteme', 'climat'],
  },
];
