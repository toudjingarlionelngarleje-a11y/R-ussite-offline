import { Fiche, Flashcard } from '../types';

export const FICHES: Fiche[] = [
  {
    id: 'fiche-maths-second-degre',
    subjectId: 'maths',
    chapterId: 'ch-maths-second-degre',
    title: 'Équations et fonctions du second degré',
    subtitle: 'Discriminant, factorisation, signe du trinôme et parabole',
    sizeKb: 64,
    notionsEssentielles: [
      'Un trinôme du second degré est défini par f(x) = ax² + bx + c avec a ≠ 0.',
      'Le discriminant Δ = b² − 4ac détermine le nombre de solutions réelles.',
      'La représentation graphique est une parabole orientée vers le haut si a > 0, vers le bas si a < 0.',
      'Le sommet de la parabole a pour abscisse α = −b / (2a).',
    ],
    definitions: [
      {
        terme: 'Discriminant (Δ)',
        definition: 'Nombre réel calculé par Δ = b² − 4ac qui indique si le trinôme possède 0, 1 ou 2 racines réelles.',
      },
      {
        terme: 'Racine d’un polynôme',
        definition: 'Valeur x₀ telle que f(x₀) = 0, correspondant graphiquement à l’intersection avec l’axe des abscisses.',
      },
      {
        terme: 'Forme canonique',
        definition: 'Écriture f(x) = a(x − α)² + β mettant directement en évidence les coordonnées du sommet S(α ; β).',
      },
    ],
    formules: [
      { label: 'Discriminant', formule: 'Δ = b² − 4ac' },
      { label: 'Racines (si Δ > 0)', formule: 'x₁ = (−b − √Δ)/(2a)  ;  x₂ = (−b + √Δ)/(2a)' },
      { label: 'Racine double (si Δ = 0)', formule: 'x₀ = −b / (2a)' },
      { label: 'Somme et Produit', formule: 'S = −b/a   et   P = c/a' },
    ],
    datesReperes: [
      { repere: 'IXe siècle — Al-Khwarizmi', detail: 'Première résolution systématique des équations du second degré (Kitab al-Jabr).' },
      { repere: 'XVIe siècle — François Viète', detail: 'Formalisation des relations entre coefficients et racines.' },
    ],
    methodes: [
      'Étape 1 : Vérifier si une racine évidente existe (tester x = 1, −1, 2, −2).',
      'Étape 2 : Si non, écrire clairement a, b et c avec leurs signes, puis calculer Δ.',
      'Étape 3 : Conclure selon le signe de Δ et toujours vérifier ses racines par S = −b/a et P = c/a.',
      'Étape 4 : Pour une inéquation, dresser le tableau de signe en appliquant « signe de a à l’extérieur des racines ».',
    ],
    erreursFrequentes: [
      'Oublier le signe négatif de b dans (−b) ou calculer −5² = −25 au lieu de (−5)² = +25.',
      'Diviser par 2 au lieu de 2a lorsque a ≠ 1.',
      'Oublier le facteur a lors de la factorisation : écrire (x − x₁)(x − x₂) au lieu de a(x − x₁)(x − x₂).',
    ],
    exemples: [
      {
        titre: 'Résoudre 2x² − 5x + 2 = 0',
        contenu: 'Δ = (−5)² − 4(2)(2) = 25 − 16 = 9. √Δ = 3. Donc x₁ = (5−3)/4 = 1/2 et x₂ = (5+3)/4 = 2.',
      },
      {
        titre: 'Astuce racine évidente sur x² − 4x + 3 = 0',
        contenu: 'On voit 1 − 4 + 3 = 0 donc x₁ = 1. Produit P = c/a = 3 donc x₂ = 3. Gain : 45 secondes !',
      },
    ],
    resumeExpress:
      'Calcule Δ = b² − 4ac. Si Δ > 0 : deux racines (−b ± √Δ)/(2a) et signe de a à l’extérieur. Si Δ = 0 : racine double −b/(2a). Si Δ < 0 : pas de racine réelle, toujours du signe de a.',
    tableauComparatif: {
      headers: ['Cas de Δ', 'Nombre de racines & Forme factorisée', 'Signe de ax² + bx + c'],
      rows: [
        { critere: 'Δ > 0', elementA: '2 racines : a(x − x₁)(x − x₂)', elementB: 'Signe de a à l’extérieur, −a entre x₁ et x₂' },
        { critere: 'Δ = 0', elementA: '1 racine double : a(x − x₀)²', elementB: 'Signe de a partout, nul en x₀' },
        { critere: 'Δ < 0', elementA: 'Aucune factorisation dans ℝ', elementB: 'Strictement du signe de a sur ℝ' },
      ],
    },
    autoEvaluation: [
      { question: 'Que vaut Δ pour x² + 2x + 5 = 0 ?', reponse: 'Δ = 4 − 20 = −16 < 0 : aucune solution réelle.' },
      { question: 'Quelle est la somme des racines de 2x² − 8x + 6 = 0 ?', reponse: 'S = −(−8)/2 = 4 (les racines sont 1 et 3).' },
    ],
  },
  {
    id: 'fiche-maths-derivees',
    subjectId: 'maths',
    chapterId: 'ch-maths-derivees',
    title: 'Dérivation et variations de fonctions',
    subtitle: 'Formules usuelles, tangente et extremums locaux',
    sizeKb: 62,
    notionsEssentielles: [
      'Le signe de f’(x) donne le sens de variation de f : f’ > 0 ⇒ f croissante ; f’ < 0 ⇒ f décroissante.',
      'La tangente en a a pour équation y = f’(a)(x − a) + f(a).',
      'Si f’ s’annule en changeant de signe en x₀, alors f admet un extremum local en x₀.',
    ],
    definitions: [
      { terme: 'Nombre dérivé f’(a)', definition: 'Limite du taux d’accroissement [f(a+h) − f(a)] / h quand h tend vers 0.' },
      { terme: 'Tangente', definition: 'Droite qui épouse au mieux la courbe au voisinage d’un point a, de pente f’(a).' },
    ],
    formules: [
      { label: 'Puissance', formule: '(xⁿ)’ = n·xⁿ⁻¹' },
      { label: 'Produit', formule: '(u·v)’ = u’v + uv’' },
      { label: 'Quotient', formule: '(u/v)’ = (u’v − uv’) / v²' },
      { label: 'Tangente en a', formule: 'y = f’(a)(x − a) + f(a)' },
    ],
    datesReperes: [
      { repere: 'XVIIe siècle — Newton & Leibniz', detail: 'Invention simultanée du calcul différentiel.' },
    ],
    methodes: [
      'Déterminer d’abord l’ensemble de définition et de dérivabilité.',
      'Factoriser f’(x) autant que possible pour étudier facilement son signe.',
      'Compléter le tableau de variations avec les limites et les valeurs aux extremums.',
    ],
    erreursFrequentes: [
      'Inverser le numérateur de la dérivée d’un quotient (écrire uv’ − u’v).',
      'Oublier de calculer f(a) dans l’équation de la tangente.',
    ],
    exemples: [
      { titre: 'Dérivée de f(x) = x³ − 3x² + 2', contenu: 'f’(x) = 3x² − 6x = 3x(x − 2). S’annule en 0 et 2.' },
    ],
    resumeExpress:
      'Pour étudier une fonction : domaine → calcul de f’ → factorisation de f’ → signe de f’ → variations de f. N’oublie jamais le signe moins dans (u/v)’ !',
    tableauComparatif: {
      headers: ['Fonction f(x)', 'Dérivée f’(x)', 'Domaine de dérivabilité'],
      rows: [
        { critere: '√x', elementA: '1 / (2√x)', elementB: ']0 ; +∞[' },
        { critere: '1 / x', elementA: '−1 / x²', elementB: 'ℝ*' },
        { critere: 'ln(x)', elementA: '1 / x', elementB: ']0 ; +∞[' },
        { critere: 'eˣ', elementA: 'eˣ', elementB: 'ℝ' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle est la dérivée de (3x + 2)² ?', reponse: '2 × 3 × (3x + 2) = 6(3x + 2) = 18x + 12.' },
    ],
  },
  {
    id: 'fiche-maths-probas',
    subjectId: 'maths',
    chapterId: 'ch-maths-probas',
    title: 'Probabilités conditionnelles et loi binomiale',
    subtitle: 'Arbres pondérés, probabilités totales et paramètres B(n, p)',
    sizeKb: 58,
    notionsEssentielles: [
      'P_A(B) = P(A ∩ B) / P(A) avec P(A) > 0.',
      'Formule des probabilités totales : P(B) = P(A ∩ B) + P(Ā ∩ B).',
      'Loi binomiale B(n, p) : E(X) = n·p et V(X) = n·p·(1 − p).',
    ],
    definitions: [
      { terme: 'Indépendance', definition: 'A et B sont indépendants si P(A ∩ B) = P(A) × P(B), autrement dit P_A(B) = P(B).' },
      { terme: 'Épreuve de Bernoulli', definition: 'Expérience aléatoire n’ayant que deux issues possibles : Succès (p) ou Échec (1 − p).' },
    ],
    formules: [
      { label: 'Conditionnelle', formule: 'P_A(B) = P(A ∩ B) / P(A)' },
      { label: 'Intersection', formule: 'P(A ∩ B) = P(A) × P_A(B)' },
      { label: 'Espérance binomiale', formule: 'E(X) = n · p' },
    ],
    datesReperes: [
      { repere: '1654 — Pascal & Fermat', detail: 'Naissance du calcul des probabilités moderne.' },
    ],
    methodes: [
      'Construire un arbre pondéré propre en plaçant les probabilités conditionnelles sur les secondes branches.',
      'Multiplier le long d’un chemin pour obtenir une intersection ; additionner les chemins menant au même événement.',
    ],
    erreursFrequentes: [
      'Confondre P_A(B) (« B sachant A ») avec P(A ∩ B) (« A et B »).',
      'Utiliser la loi binomiale lors d’un tirage SANS remise sans vérifier l’indépendance.',
    ],
    exemples: [
      { titre: 'Calcul d’espérance', contenu: 'Sur 20 QCM au hasard (4 choix, p = 0,25), on obtient en moyenne E(X) = 20 × 0,25 = 5 bonnes réponses.' },
    ],
    resumeExpress:
      'Sur un arbre : on multiplie sur une branche (ET), on additionne entre branches (OU). Pour B(n,p), E(X) = np.',
    tableauComparatif: {
      headers: ['Notion', 'Formule', 'Piège à éviter'],
      rows: [
        { critere: 'Intersection', elementA: 'P(A ∩ B) = P(A)·P_A(B)', elementB: 'Ne pas multiplier P(A)·P(B) sans indépendance' },
        { critere: 'Conditionnelle', elementA: 'P_A(B) = P(A ∩ B)/P(A)', elementB: 'Bien diviser par l’événement connu (en indice)' },
      ],
    },
    autoEvaluation: [
      { question: 'Si P(A)=0,5 et P_A(B)=0,4, que vaut P(A ∩ B) ?', reponse: '0,5 × 0,4 = 0,20.' },
    ],
  },
  {
    id: 'fiche-phys-rc',
    subjectId: 'physique',
    chapterId: 'ch-phys-rc',
    title: 'Dipôle RC — Charge et décharge',
    subtitle: 'Constante de temps τ, équation différentielle et énergie',
    sizeKb: 68,
    notionsEssentielles: [
      'La constante de temps caractérise la rapidité de charge ou de décharge : τ = R · C.',
      'La tension aux bornes d’un condensateur u_C(t) est toujours continue.',
      'L’énergie électrostatique stockée vaut E_e = ½ · C · u_C².',
    ],
    definitions: [
      { terme: 'Capacité C', definition: 'Aptitude d’un condensateur à stocker une charge électrique sous une tension donnée (unité : Farad, F).' },
      { terme: 'Régime permanent', definition: 'État atteint au bout d’environ 5τ : le condensateur est chargé (u_C = E) et le courant i devient nul.' },
    ],
    formules: [
      { label: 'Constante de temps', formule: 'τ = R · C', unite: 's = Ω · F' },
      { label: 'Charge', formule: 'u_C(t) = E · (1 − e⁻ᵗ/ᵀ)', unite: 'V' },
      { label: 'Décharge', formule: 'u_C(t) = E · e⁻ᵗ/ᵀ', unite: 'V' },
      { label: 'Énergie stockée', formule: 'E_e = ½ · C · u_C²', unite: 'J' },
    ],
    datesReperes: [
      { repere: '1745 — Bouteille de Leyde', detail: 'Premier condensateur historique.' },
    ],
    methodes: [
      'Toujours convertir kΩ → 10³ Ω, mF → 10⁻³ F, µF → 10⁻⁶ F, nF → 10⁻⁹ F avant tout calcul.',
      'Appliquer la loi des mailles : u_R + u_C = E, puis remplacer u_R = R·C·(du_C/dt).',
    ],
    erreursFrequentes: [
      'Oublier de convertir les microfarads (µF) en farads (× 10⁻⁶).',
      'Confondre 63 % de E (charge à t = τ) et 37 % de E (décharge à t = τ).',
    ],
    exemples: [
      { titre: 'Calcul de τ', contenu: 'R = 2 kΩ = 2000 Ω, C = 50 µF = 50×10⁻⁶ F ⇒ τ = 0,1 s. Charge complète en 5τ = 0,5 s.' },
    ],
    resumeExpress:
      'τ = RC en secondes. Charge : 63% à τ, 99% à 5τ. Décharge : 37% à τ. Convertis toujours en unités SI !',
    tableauComparatif: {
      headers: ['Instant', 'Charge u_C(t)', 'Décharge u_C(t)'],
      rows: [
        { critere: 't = 0', elementA: '0 V', elementB: 'E' },
        { critere: 't = τ', elementA: '0,63 · E', elementB: '0,37 · E' },
        { critere: 't ≥ 5τ', elementA: '≈ E (chargé)', elementB: '≈ 0 V (déchargé)' },
      ],
    },
    autoEvaluation: [
      { question: 'Que vaut i en régime permanent lors de la charge ?', reponse: 'i = 0 A (le condensateur se comporte comme un interrupteur ouvert).' },
    ],
  },
  {
    id: 'fiche-phys-meca',
    subjectId: 'physique',
    chapterId: 'ch-phys-meca',
    title: 'Lois de Newton & Énergie mécanique',
    subtitle: 'Dynamique du point et conservation de l’énergie',
    sizeKb: 60,
    notionsEssentielles: [
      '1re loi (inertie) : si ΣF = 0, le mouvement est rectiligne uniforme ou au repos.',
      '2e loi : ΣF_ext = m · a dans un référentiel galiléen.',
      'Sans frottements, E_m = E_c + E_p reste constante.',
    ],
    definitions: [
      { terme: 'Référentiel galiléen', definition: 'Référentiel dans lequel le principe d’inertie est vérifié (ex. référentiel terrestre pour des expériences courtes).' },
    ],
    formules: [
      { label: '2e loi de Newton', formule: 'ΣF_ext = m · a', unite: 'N = kg · m/s²' },
      { label: 'Énergie cinétique', formule: 'E_c = ½ · m · v²', unite: 'J' },
      { label: 'Énergie potentielle', formule: 'E_p = m · g · z', unite: 'J' },
    ],
    datesReperes: [
      { repere: '1687 — Isaac Newton', detail: 'Publication des Principia Mathematica.' },
    ],
    methodes: [
      'Toujours suivre le plan en 4 points : 1. Système, 2. Référentiel, 3. Bilan des forces, 4. Projection sur les axes.',
    ],
    erreursFrequentes: [
      'Oublier le carré sur la vitesse dans E_c = ½mv².',
      'Confondre masse (en kg, invariante) et poids P = mg (en N, dépend de g).',
    ],
    exemples: [
      { titre: 'Chute libre sans frottements', contenu: 'v = √(2gh). Pour h = 20 m et g = 10 m/s², v = √400 = 20 m/s.' },
    ],
    resumeExpress:
      'ΣF = m·a. En chute libre sans frottements, la vitesse au sol vaut v = √(2gh) et ne dépend pas de la masse.',
    tableauComparatif: {
      headers: ['Grandeur', 'Formule', 'Unité SI'],
      rows: [
        { critere: 'Poids', elementA: 'P = m · g', elementB: 'Newton (N)' },
        { critere: 'Travail du poids', elementA: 'W(P) = m · g · (z_A − z_B)', elementB: 'Joule (J)' },
      ],
    },
    autoEvaluation: [
      { question: 'Si la vitesse double, par combien l’énergie cinétique est-elle multipliée ?', reponse: 'Par 4 (car E_c est proportionnelle à v²).' },
    ],
  },
  {
    id: 'fiche-svt-mitose',
    subjectId: 'svt',
    chapterId: 'ch-svt-mitose',
    title: 'Mitose, Méiose & Cycle cellulaire',
    subtitle: 'Reproduction conforme vs brassage génétique',
    sizeKb: 55,
    notionsEssentielles: [
      'La phase S de l’interphase double la quantité d’ADN par réplication semi-conservative.',
      'La mitose conserve le caryotype (2n → deux cellules 2n identiques).',
      'La méiose réduit de moitié le nombre de chromosomes (2n → quatre gamètes n différents).',
    ],
    definitions: [
      { terme: 'Chromatides sœurs', definition: 'Deux copies identiques d’un même chromosome reliées par le centromère après la phase S.' },
      { terme: 'Crossing-over', definition: 'Échange réciproque de fragments de chromatides entre chromosomes homologues en prophase I de méiose.' },
    ],
    formules: [
      { label: 'Bilan Mitose', formule: '1 cellule (2n) → 2 cellules identiques (2n)' },
      { label: 'Bilan Méiose', formule: '1 cellule (2n) → 4 gamètes uniques (n)' },
    ],
    datesReperes: [
      { repere: '1953 — Watson, Crick & Franklin', detail: 'Découverte de la structure en double hélice de l’ADN.' },
    ],
    methodes: [
      'Retenir l’ordre des phases grâce à PMAT : Prophase (Préparation), Métaphase (Milieu), Anaphase (Ascension), Télophase (Terminaison).',
    ],
    erreursFrequentes: [
      'Placer la réplication de l’ADN pendant la mitose au lieu de la phase S de l’interphase.',
      'Confondre séparation des chromosomes homologues (anaphase I méiose) et séparation des chromatides (anaphase mitose / anaphase II).',
    ],
    exemples: [
      { titre: 'Cellule humaine (2n = 46)', contenu: 'Mitose : 2 cellules à 46 chromosomes. Méiose : 4 gamètes à 23 chromosomes.' },
    ],
    resumeExpress:
      'Interphase S = copie de l’ADN. Mitose (PMAT) = 2 clones diploïdes. Méiose = 4 gamètes haploïdes diversifiés.',
    tableauComparatif: {
      headers: ['Critère', 'Mitose', 'Méiose'],
      rows: [
        { critere: 'Nombre de divisions', elementA: '1 division', elementB: '2 divisions successives' },
        { critere: 'Cellules produites', elementA: '2 cellules diploïdes (2n)', elementB: '4 cellules haploïdes (n)' },
        { critere: 'Identité génétique', elementA: 'Identiques à la cellule mère', elementB: 'Génétiquement uniques (brassages)' },
      ],
    },
    autoEvaluation: [
      { question: 'En quelle phase les chromosomes s’alignent-ils à l’équateur ?', reponse: 'En métaphase (M comme Milieu).' },
    ],
  },
  {
    id: 'fiche-philo-liberte',
    subjectId: 'philo',
    chapterId: 'ch-philo-liberte',
    title: 'Conscience, Liberté & Devoir',
    subtitle: 'Repères conceptuels et auteurs clés pour le Bac',
    sizeKb: 48,
    notionsEssentielles: [
      'Descartes : la conscience (« Cogito ») fonde la certitude du sujet.',
      'Kant : la vraie liberté est l’autonomie (obéir à la loi morale rationnelle).',
      'Sartre : la liberté implique une responsabilité totale, sans excuse.',
      'Spinoza : le libre arbitre est une illusion née de l’ignorance des causes qui nous déterminent.',
    ],
    definitions: [
      { terme: 'Autonomie', definition: 'Capacité d’un sujet rationnel à se donner librement sa propre loi morale.' },
      { terme: 'Déterminisme', definition: 'Doctrine selon laquelle tout événement, y compris humain, résulte nécessairement de causes antérieures.' },
    ],
    formules: [
      { label: 'Rousseau (Contrat social)', formule: '« L’obéissance à la loi qu’on s’est prescrite est liberté. »' },
      { label: 'Sartre', formule: '« L’homme est condamné à être libre. »' },
    ],
    datesReperes: [
      { repere: '1637 — Descartes', detail: 'Discours de la méthode.' },
      { repere: '1785 — Kant', detail: 'Fondements de la métaphysique des mœurs.' },
      { repere: '1946 — Sartre', detail: 'L’existentialisme est un humanisme.' },
    ],
    methodes: [
      'En dissertation, ne jamais réduire la liberté à l’absence totale de contraintes : toujours distinguer liberté-caprice et liberté-autonomie.',
    ],
    erreursFrequentes: [
      'Citer un auteur sans expliquer l’argument qui justifie sa thèse.',
      'Oublier de définir les termes clés du sujet dès l’introduction.',
    ],
    exemples: [
      { titre: 'Sujet : « Les lois limitent-elles notre liberté ? »', contenu: 'I. Elles contraignent les désirs immédiats → II. Mais elles protègent contre l’arbitraire (Locke, Rousseau) → III. À condition d’être justes et consenties.' },
    ],
    resumeExpress:
      'Liberté ≠ faire tout ce que je veux. Opposer autonomie rationnelle (Kant/Rousseau), liberté radicale (Sartre) et lucidité face au déterminisme (Spinoza).',
    tableauComparatif: {
      headers: ['Auteur', 'Conception de la liberté', 'Mot-clé'],
      rows: [
        { critere: 'Kant', elementA: 'Obéir à la raison morale', elementB: 'Autonomie' },
        { critere: 'Sartre', elementA: 'Choix permanent sans excuse', elementB: 'Responsabilité' },
        { critere: 'Spinoza', elementA: 'Comprendre la nécessité des causes', elementB: 'Déterminisme lucide' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel philosophe distingue autonomie et hétéronomie ?', reponse: 'Emmanuel Kant.' },
    ],
  },
  {
    id: 'fiche-droit-pouvoirs',
    subjectId: 'droit',
    chapterId: 'ch-droit-pouvoirs',
    title: 'Séparation des pouvoirs & Service Public',
    subtitle: 'Droit constitutionnel et administratif pour concours',
    sizeKb: 61,
    notionsEssentielles: [
      'Montesquieu distingue pouvoir législatif, exécutif et judiciaire pour éviter l’arbitraire.',
      'Pyramide de Kelsen : Constitution > Traités > Lois > Règlements.',
      'Les 3 lois de Rolland du service public : Continuité, Égalité, Mutabilité.',
    ],
    definitions: [
      { terme: 'État de droit', definition: 'Système institutionnel dans lequel la puissance publique elle-même est soumise au respect du droit.' },
      { terme: 'Acte administratif unilatéral', definition: 'Décision prise par une autorité administrative (décret, arrêté) qui crée des droits ou obligations sans accord des administrés.' },
    ],
    formules: [
      { label: 'Hiérarchie des normes', formule: 'Constitution > Traités > Lois > Décrets > Arrêtés' },
      { label: 'Lois de Rolland', formule: 'Continuité + Égalité + Mutabilité' },
    ],
    datesReperes: [
      { repere: '1748 — Montesquieu', detail: 'Publication de De l’esprit des lois.' },
      { repere: '1934 — Hans Kelsen', detail: 'Théorie pure du droit et hiérarchie des normes.' },
    ],
    methodes: [
      'Face à un cas pratique administratif, identifier d’abord l’auteur de l’acte, sa compétence et la norme supérieure applicable.',
    ],
    erreursFrequentes: [
      'Inclure la « gratuité » dans les lois de Rolland (faux : les transports publics ou l’université peuvent être payants).',
      'Confondre régime présidentiel (USA) et régime semi-présidentiel.',
    ],
    exemples: [
      { titre: 'Contrôle de légalité', contenu: 'Un arrêté municipal contraire à une loi nationale est illégal et peut être annulé par le juge administratif (recours pour excès de pouvoir).' },
    ],
    resumeExpress:
      'Constitution au sommet (Kelsen). Parlementaire = responsabilité politique ; Présidentiel = séparation stricte. Service public = Continuité, Égalité, Mutabilité.',
    tableauComparatif: {
      headers: ['Critère', 'Régime parlementaire', 'Régime présidentiel'],
      rows: [
        { critere: 'Séparation', elementA: 'Souple (collaboration)', elementB: 'Stricte (spécialisation)' },
        { critere: 'Motion de censure', elementA: 'Oui', elementB: 'Non' },
        { critere: 'Dissolution', elementA: 'Oui (en général)', elementB: 'Non' },
      ],
    },
    autoEvaluation: [
      { question: 'Un décret peut-il abroger une loi ?', reponse: 'Non, la loi est supérieure au décret dans la hiérarchie des normes.' },
    ],
  },
  {
    id: 'fiche-cg-institutions',
    subjectId: 'culture_gen',
    chapterId: 'ch-cg-institutions',
    title: 'Institutions Africaines & Internationales',
    subtitle: 'UA, CEMAC, UEMOA, CEDEAO et ONU en un coup d’œil',
    sizeKb: 52,
    notionsEssentielles: [
      'Union Africaine (UA) : 55 États, siège à Addis-Abeba, succède à l’OUA en 2002.',
      'CEMAC : 6 États d’Afrique centrale, monnaie Franc CFA (XAF), banque centrale BEAC (Yaoundé).',
      'ONU : fondée en 1945, siège à New York, 5 membres permanents au Conseil de sécurité.',
    ],
    definitions: [
      { terme: 'Droit de veto', definition: 'Pouvoir réservé aux 5 membres permanents du Conseil de sécurité de l’ONU de bloquer toute résolution de fond.' },
    ],
    formules: [
      { label: 'CEMAC (6 pays)', formule: 'Cameroun, RCA, Congo, Gabon, Guinée Éq., Tchad' },
      { label: 'P5 ONU', formule: 'Chine, États-Unis, France, Royaume-Uni, Russie' },
    ],
    datesReperes: [
      { repere: '24 octobre 1945', detail: 'Entrée en vigueur de la Charte des Nations Unies.' },
      { repere: '25 mai 1963', detail: 'Création de l’OUA à Addis-Abeba (Journée de l’Afrique).' },
      { repere: '16 mars 1994', detail: 'Traité instituant la CEMAC signé à N’Djamena.' },
      { repere: '9 juillet 2002', detail: 'Lancement officiel de l’Union Africaine à Durban.' },
    ],
    methodes: [
      'Apprendre les organisations par tableau comparatif : acronyme, date de création, siège, nombre d’États, mission principale.',
    ],
    erreursFrequentes: [
      'Confondre BEAC (Afrique centrale, CEMAC) et BCEAO (Afrique de l’Ouest, UEMOA).',
      'Placer la Cour internationale de justice à New York au lieu de La Haye (Pays-Bas).',
    ],
    exemples: [
      { titre: 'Traité de N’Djamena (1994)', contenu: 'Acte fondateur de la CEMAC, entré en vigueur en 1999, avec siège de la Commission à Bangui.' },
    ],
    resumeExpress:
      'UA = Addis-Abeba (55 États). CEMAC = 6 États, BEAC, traité de N’Djamena 1994. ONU = 1945, 5 permanents avec veto, CIJ à La Haye.',
    tableauComparatif: {
      headers: ['Organisation', 'Siège principal', 'Membres & Spécificité'],
      rows: [
        { critere: 'Union Africaine', elementA: 'Addis-Abeba', elementB: '55 États africains' },
        { critere: 'CEMAC', elementA: 'Bangui (BEAC : Yaoundé)', elementB: '6 États — Zone XAF' },
        { critere: 'UEMOA', elementA: 'Ouagadougou (BCEAO : Dakar)', elementB: '8 États — Zone XOF' },
        { critere: 'ONU', elementA: 'New York (CIJ : La Haye)', elementB: '193 États — P5 avec veto' },
      ],
    },
    autoEvaluation: [
      { question: 'Dans quelle ville a été signé le traité créant la CEMAC en 1994 ?', reponse: 'À N’Djamena (Tchad).' },
    ],
  },
  {
    id: 'fiche-eco-marche',
    subjectId: 'economie',
    chapterId: 'ch-eco-marche',
    title: 'Marché, PIB et Inflation',
    subtitle: 'Fondamentaux de microéconomie et macroéconomie',
    sizeKb: 56,
    notionsEssentielles: [
      'La demande décroît avec le prix ; l’offre croît avec le prix.',
      'Valeur ajoutée (VA) = Production − Consommations intermédiaires.',
      'Le PIB réel élimine l’effet de l’inflation pour mesurer la croissance en volume.',
    ],
    definitions: [
      { terme: 'Inflation', definition: 'Hausse générale, durable et auto-entretenue du niveau général des prix.' },
      { terme: 'Élasticité-prix', definition: 'Sensibilité de la quantité demandée face à une variation de 1 % du prix.' },
    ],
    formules: [
      { label: 'Valeur ajoutée', formule: 'VA = Chiffre d’affaires − Consommations intermédiaires' },
      { label: 'Taux de croissance', formule: '((PIB_t − PIB_{t-1}) / PIB_{t-1}) × 100' },
    ],
    datesReperes: [
      { repere: '1776 — Adam Smith', detail: 'La Richesse des nations (mécanisme du marché).' },
      { repere: '1936 — John Maynard Keynes', detail: 'Théorie générale (politique de relance par la demande).' },
    ],
    methodes: [
      'Toujours raisonner avec un schéma offre/demande simple lorsqu’on analyse une taxe, une subvention ou un prix plafond.',
    ],
    erreursFrequentes: [
      'Retrancher les salaires lors du calcul de la valeur ajoutée.',
      'Confondre désinflation (ralentissement de l’inflation) et déflation (baisse générale des prix).',
    ],
    exemples: [
      { titre: 'Prix plafond', contenu: 'Si le prix maximal imposé est sous le prix d’équilibre, la demande excède l’offre : pénurie.' },
    ],
    resumeExpress:
      'VA = Production − CI. PIB réel = PIB corrigé de l’inflation. Prix plafond bas = pénurie ; prix plancher élevé = excédent.',
    tableauComparatif: {
      headers: ['Indicateur', 'Signification', 'Usage principal'],
      rows: [
        { critere: 'PIB nominal', elementA: 'Prix courants', elementB: 'Mesurer la taille monétaire actuelle' },
        { critere: 'PIB réel', elementA: 'Prix constants', elementB: 'Mesurer la vraie croissance économique' },
      ],
    },
    autoEvaluation: [
      { question: 'Que produit un prix plancher supérieur au prix d’équilibre ?', reponse: 'Un excédent (l’offre dépasse la demande).' },
    ],
  },
  {
    id: 'fiche-gp-agile',
    subjectId: 'gestion_projet',
    chapterId: 'ch-gp-agile',
    title: 'Gestion de Projet : Scrum vs Cycle en V',
    subtitle: 'Rôles, cérémonies, chemin critique et triangle QCD',
    sizeKb: 50,
    isPremium: true,
    notionsEssentielles: [
      'Triangle QCD : Qualité, Coût, Délai — modifier un sommet impacte les autres.',
      'Scrum fonctionne par Sprints courts (1 à 4 semaines) livrant un incrément utilisable.',
      'Chemin critique = séquence de tâches à marge nulle déterminant la durée minimale du projet.',
    ],
    definitions: [
      { terme: 'Product Backlog', definition: 'Liste ordonnée et évolutive de tout ce qui peut apporter de la valeur au produit, gérée par le Product Owner.' },
      { terme: 'Chemin critique', definition: 'Enchaînement le plus long de tâches dépendantes : tout retard décale la livraison finale.' },
    ],
    formules: [
      { label: 'Marge totale', formule: 'Date de début au plus tard − Date de début au plus tôt' },
    ],
    datesReperes: [
      { repere: '2001 — Manifeste Agile', detail: '4 valeurs privilégiant les individus, un produit fonctionnel et l’adaptation au changement.' },
    ],
    methodes: [
      'Choisir le Cycle en V quand le périmètre est fixe et réglementé ; choisir Scrum quand le besoin évolue.',
    ],
    erreursFrequentes: [
      'Confondre le Scrum Master avec un chef de projet hiérarchique (c’est un facilitateur de la méthode).',
    ],
    exemples: [
      { titre: 'Cérémonies Scrum', contenu: 'Sprint Planning → Daily Scrum (15 min) → Sprint Review (démo) → Sprint Retrospective (amélioration).' },
    ],
    resumeExpress:
      'PO = valeur/backlog. Scrum Master = cadre/obstacles. Chemin critique = marge 0.',
    tableauComparatif: {
      headers: ['Critère', 'Cycle en V', 'Agile / Scrum'],
      rows: [
        { critere: 'Périmètre', elementA: 'Fixé au départ', elementB: 'Évolutif selon les retours' },
        { critere: 'Livraisons', elementA: 'En fin de projet', elementB: 'À chaque Sprint' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle est la durée maximale recommandée d’un Daily Scrum ?', reponse: '15 minutes.' },
    ],
  },
  {
    id: 'fiche-cyber-bases',
    subjectId: 'cybersecurite',
    chapterId: 'ch-cyber-bases',
    title: 'Cybersécurité & Hygiène Numérique',
    subtitle: 'Triade DIC, MFA, chiffrement et protection contre le phishing',
    sizeKb: 49,
    isPremium: true,
    notionsEssentielles: [
      'Triade DIC : Disponibilité, Intégrité, Confidentialité.',
      'Le hachage (ex. SHA-256) vérifie l’intégrité ; le chiffrement (ex. AES-256) protège la confidentialité.',
      'L’authentification multifacteur (MFA) associe au moins 2 facteurs distincts.',
    ],
    definitions: [
      { terme: 'Phishing', definition: 'Attaque par ingénierie sociale usurpant une identité de confiance pour dérober des accès ou de l’argent.' },
      { terme: 'Ransomware', definition: 'Logiciel malveillant chiffrant les fichiers de la victime afin d’exiger une rançon.' },
    ],
    formules: [
      { label: 'Règle de sauvegarde 3-2-1', formule: '3 copies, sur 2 supports différents, dont 1 hors ligne / hors site' },
    ],
    datesReperes: [
      { repere: '2018 — Entrée en application du RGPD', detail: 'Référence internationale sur le consentement et les droits sur les données personnelles.' },
    ],
    methodes: [
      'Toujours vérifier l’expéditeur réel et l’URL complète avant de saisir un mot de passe.',
    ],
    erreursFrequentes: [
      'Réutiliser le même mot de passe sur sa messagerie, sa banque et ses réseaux sociaux.',
    ],
    exemples: [
      { titre: 'Triple protection simple', contenu: 'Gestionnaire de mots de passe + MFA + mises à jour régulières.' },
    ],
    resumeExpress:
      'DIC = Disponibilité, Intégrité, Confidentialité. Protège-toi avec MFA, sauvegardes 3-2-1 et vigilance anti-phishing.',
    tableauComparatif: {
      headers: ['Mécanisme', 'Objectif DIC', 'Réversible ?'],
      rows: [
        { critere: 'Chiffrement (AES)', elementA: 'Confidentialité', elementB: 'Oui (avec la clé)' },
        { critere: 'Hachage (SHA-256)', elementA: 'Intégrité', elementB: 'Non (sens unique)' },
      ],
    },
    autoEvaluation: [
      { question: 'Un mot de passe + un code PIN forment-ils une vraie MFA ?', reponse: 'Non, ce sont deux facteurs de connaissance ; il faut un second type (ex. téléphone ou biométrie).' },
    ],
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subjectId: 'maths',
    chapterId: 'ch-maths-second-degre',
    question: 'Quelle est la formule du discriminant Δ et que signifie Δ = 0 ?',
    answer: 'Δ = b² − 4ac. Si Δ = 0, l’équation admet une racine double x₀ = −b / (2a).',
    formula: 'Δ = b² − 4ac  ⇒  x₀ = −b / (2a)',
    example: 'x² − 6x + 9 = 0 ⇒ Δ = 36 − 36 = 0 ⇒ x₀ = 3.',
    diagramId: 'parabole',
  },
  {
    id: 'fc-2',
    subjectId: 'maths',
    chapterId: 'ch-maths-second-degre',
    question: 'Quel est le signe d’un trinôme ax² + bx + c lorsque Δ > 0 ?',
    answer: 'Du signe de a à l’extérieur des racines, et du signe de (−a) entre les racines.',
    example: 'Pour −x² + 4x − 3 (a = −1, racines 1 et 3), le trinôme est positif sur [1 ; 3].',
  },
  {
    id: 'fc-3',
    subjectId: 'maths',
    chapterId: 'ch-maths-second-degre',
    question: 'Que valent la somme S et le produit P des racines d’un trinôme ?',
    answer: 'S = x₁ + x₂ = −b/a et P = x₁ · x₂ = c/a.',
    formula: 'S = −b/a   |   P = c/a',
  },
  {
    id: 'fc-4',
    subjectId: 'maths',
    chapterId: 'ch-maths-derivees',
    question: 'Quelle est l’équation réduite de la tangente à la courbe de f au point d’abscisse a ?',
    answer: 'y = f’(a)(x − a) + f(a).',
    formula: 'T_a : y = f’(a)(x − a) + f(a)',
    example: 'Pour f(x) = x² en a = 2 : y = 4(x − 2) + 4 = 4x − 4.',
  },
  {
    id: 'fc-5',
    subjectId: 'maths',
    chapterId: 'ch-maths-derivees',
    question: 'Quelle est la formule de dérivation d’un quotient u / v ?',
    answer: '(u / v)’ = (u’v − uv’) / v² pour tout x tel que v(x) ≠ 0.',
    formula: '(u/v)’ = (u’v − uv’) / v²',
  },
  {
    id: 'fc-6',
    subjectId: 'maths',
    chapterId: 'ch-maths-probas',
    question: 'Comment calculer l’espérance et la variance d’une loi binomiale B(n, p) ?',
    answer: 'Espérance E(X) = n·p et Variance V(X) = n·p·(1 − p).',
    formula: 'E(X) = np   |   V(X) = np(1 − p)',
  },
  {
    id: 'fc-7',
    subjectId: 'physique',
    chapterId: 'ch-phys-rc',
    question: 'Quelle est l’expression de la constante de temps τ d’un dipôle RC et quelle tension atteint u_C à t = τ lors de la charge ?',
    answer: 'τ = R · C (en secondes). À t = τ, u_C(τ) ≈ 0,63 · E (63 % de la tension du générateur).',
    formula: 'τ = R · C   |   u_C(τ) = 0,63 · E',
    diagramId: 'circuit_rc',
  },
  {
    id: 'fc-8',
    subjectId: 'physique',
    chapterId: 'ch-phys-rc',
    question: 'Quelle est la formule de l’énergie électrostatique stockée dans un condensateur ?',
    answer: 'E_e = ½ · C · u_C² (en Joules).',
    formula: 'E_e = ½ · C · u_C²',
  },
  {
    id: 'fc-9',
    subjectId: 'physique',
    chapterId: 'ch-phys-meca',
    question: 'Énoncer la seconde loi de Newton et la vitesse en chute libre sans frottements.',
    answer: 'Dans un référentiel galiléen, ΣF_ext = m · a. Sans frottements ni vitesse initiale : v = √(2gh).',
    formula: 'ΣF_ext = m · a   |   v = √(2gh)',
  },
  {
    id: 'fc-10',
    subjectId: 'svt',
    chapterId: 'ch-svt-mitose',
    question: 'Quelles sont les 4 phases de la mitose dans l’ordre (PMAT) ?',
    answer: 'Prophase (condensation), Métaphase (alignement équatorial), Anaphase (séparation des chromatides), Télophase (2 noyaux).',
    diagramId: 'mitose',
  },
  {
    id: 'fc-11',
    subjectId: 'svt',
    chapterId: 'ch-svt-mitose',
    question: 'Quelle est la différence majeure entre mitose et méiose ?',
    answer: 'La mitose produit 2 cellules diploïdes (2n) identiques ; la méiose produit 4 gamètes haploïdes (n) génétiquement différents.',
  },
  {
    id: 'fc-12',
    subjectId: 'philo',
    chapterId: 'ch-philo-liberte',
    question: 'Comment Kant définit-il l’autonomie morale ?',
    answer: 'C’est l’obéissance à la loi morale universelle que la raison se donne à elle-même (par opposition à l’hétéronomie).',
  },
  {
    id: 'fc-13',
    subjectId: 'droit',
    chapterId: 'ch-droit-pouvoirs',
    question: 'Citer les 3 lois de Rolland du service public.',
    answer: 'Continuité, Égalité (et neutralité), Mutabilité (adaptation). La gratuité n’en fait pas partie !',
  },
  {
    id: 'fc-14',
    subjectId: 'droit',
    chapterId: 'ch-droit-pouvoirs',
    question: 'Quel est l’ordre décroissant de la hiérarchie des normes (Kelsen) ?',
    answer: '1. Bloc de constitutionnalité → 2. Traités internationaux ratifiés → 3. Lois → 4. Règlements (décrets, arrêtés).',
    diagramId: 'separation_pouvoirs',
  },
  {
    id: 'fc-15',
    subjectId: 'culture_gen',
    chapterId: 'ch-cg-institutions',
    question: 'Quels sont les 6 pays membres de la CEMAC et quelle est sa banque centrale ?',
    answer: 'Cameroun, Centrafrique, Congo, Gabon, Guinée équatoriale et Tchad. Banque centrale : la BEAC (siège à Yaoundé).',
  },
  {
    id: 'fc-16',
    subjectId: 'culture_gen',
    chapterId: 'ch-cg-institutions',
    question: 'Quels sont les 5 membres permanents du Conseil de sécurité de l’ONU ?',
    answer: 'Chine, États-Unis, France, Royaume-Uni et Russie (seuls titulaires du droit de veto).',
  },
  {
    id: 'fc-17',
    subjectId: 'economie',
    chapterId: 'ch-eco-marche',
    question: 'Comment calcule-t-on la Valeur Ajoutée (VA) d’une entreprise ?',
    answer: 'VA = Valeur de la production (chiffre d’affaires) − Consommations intermédiaires.',
    formula: 'VA = Production − CI',
    diagramId: 'offre_demande',
  },
  {
    id: 'fc-18',
    subjectId: 'economie',
    chapterId: 'ch-eco-marche',
    question: 'Quelle différence entre PIB nominal et PIB réel ?',
    answer: 'Le PIB nominal est mesuré aux prix courants (inclut l’inflation) ; le PIB réel est mesuré à prix constants (mesure le volume réel).',
  },
  {
    id: 'fc-19',
    subjectId: 'gestion_projet',
    chapterId: 'ch-gp-agile',
    question: 'Quels sont les 3 rôles officiels du cadre Scrum ?',
    answer: 'Product Owner (valeur & backlog), Scrum Master (méthode & obstacles), Développeurs (réalisation de l’incrément).',
    diagramId: 'cycle_projet',
  },
  {
    id: 'fc-20',
    subjectId: 'cybersecurite',
    chapterId: 'ch-cyber-bases',
    question: 'Que signifie la triade DIC en cybersécurité ?',
    answer: 'Disponibilité (accès garanti), Intégrité (données non altérées), Confidentialité (accès réservé aux personnes autorisées).',
  },
];
