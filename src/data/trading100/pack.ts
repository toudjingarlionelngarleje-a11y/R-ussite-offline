import { CenturionBundle, mergeCenturionBundles } from '../centurion100/engine';
import { buildMillenniumPack, MillenniumModuleTuple } from '../millennium100/builder';

/**
 * v17.4 — Trading & Marchés Financiers : 20 modules × 5 chapitres progressifs = 100 chapitres.
 *
 * Chaque module est décliné automatiquement en 5 chapitres :
 *   1. Fondements & concepts clés
 *   2. Règles, formules & normes de référence
 *   3. Méthodologie & mise en pratique
 *   4. Étude de cas corrigée & pièges d'examen
 *   5. Synthèse avancée & maîtrise concours
 */
const TRADING_MODULES: MillenniumModuleTuple[] = [
  [
    'fondements-marches',
    'Fondements des marchés financiers & microstructure',
    'Un marché est un lieu de rencontre entre offre et demande de capitaux où se forment les prix (actions, devises, crypto, matières premières)',
    'Prix d’équilibre = intersection du carnet d’achat (bid) et du carnet de vente (ask) ; le spread = ask − bid rémunère la liquidité',
    'Confondre volatilité (amplitude des variations) et tendance (direction) : un marché très volatil n’est pas forcément haussier',
    'Sur EUR/USD, bid 1,0850 / ask 1,0852 : un aller-retour coûte immédiatement 2 pips, soit 20 $ sur 1 lot standard (100 000 unités)',
  ],
  [
    'comptes-courtiers-levier',
    'Courtiers, comptes, levier & marge',
    'Compte de trading : dépôt, effet de levier, marge requise, appel de marge (margin call) et liquidation automatique (stop-out)',
    'Marge requise = (Taille de position × Prix) / Levier ; l’appel de marge survient dès que l’equity devient inférieure à la marge requise',
    'Croire que le levier augmente les gains sans augmenter le risque : il amplifie strictement proportionnellement les pertes',
    'Compte de 1 000 000 FCFA avec un levier 1:100 : 1 lot EUR/USD (100 000 €) immobilise environ 1 000 € de marge, mais 1 % de variation = 10 % du capital',
  ],
  [
    'lecture-graphique-timeframes',
    'Lecture des graphiques, unités de temps & sessions',
    'Unité de temps (M1, M5, H1, H4, D1, W1), échelle linéaire ou logarithmique, prix OHLC et fuseaux horaires de session',
    'Chaque bougie agrège 4 prix (Open, High, Low, Close) ; la clôture journalière forex de référence est celle de 23h59 UTC',
    'Analyser un signal sur une unité de temps sans jamais vérifier le contexte du timeframe supérieur',
    'Une bougie H4 se ferme à 20h00 UTC en hiver mais à 19h00 UTC en heure d’été : ignorer ce décalage décale l’analyse des sessions de Londres et New York',
  ],
  [
    'chandeliers-japonais',
    'Chandeliers japonais & figures de bougies',
    'Chandelier = corps (ouverture → clôture) + mèches (plus haut / plus bas) ; marteau, pendu, doji, avalement (engulfing), étoile du soir',
    'Un doji ou un marteau ne vaut signal que sur une zone majeure (support/résistance) et avec confirmation par la clôture suivante',
    'Prendre un marteau isolé en pleine tendance baissière sans attendre la bougie de confirmation au-dessus du corps',
    'Avalement haussier sur support S1 : bougie rouge puis bougie verte englobante ; entrée à la clôture, stop-loss sous le plus bas de l’ensemble',
  ],
  [
    'figures-chartistes',
    'Figures chartistes : continuation & retournement',
    'Figures de continuation (triangle, drapeau, rectangle) et de retournement (épaule-tête-épaule, double sommet / double creux)',
    'Objectif d’un triangle = hauteur de sa base projetée depuis le point de cassure confirmé par une clôture hors de la figure',
    'Entrer avant la cassure confirmée, puis se faire piéger par un faux départ / retour dans la figure',
    'ETE : tête 1,1200, épaules 1,1050, ligne de cou 1,1000 ⇒ objectif = 1,1000 − (1,1200 − 1,1000) = 1,0800',
  ],
  [
    'supports-resistances',
    'Supports, résistances & zones de liquidité',
    'Une zone de support/résistance est un niveau de prix où l’offre ou la demande s’inverse durablement ; elle peut changer de polarité',
    'Tracer les zones sur les extrêmes de mèches et les clôtures : une zone est une bande de prix, jamais un unique point',
    'Tracer quinze lignes horizontales : trop de zones équivaut à aucune zone. Se limiter à 3 ou 4 zones majeures par actif',
    'Range 1,0800 – 1,1000 : achat sur le support avec stop 1,0770 et objectif 1,0990 ⇒ ratio risque/récompense proche de 1:3',
  ],
  [
    'tendances-moyennes-mobiles',
    'Tendances, moyennes mobiles & croisements',
    'Tendance haussière = sommets et creux ascendants ; MM/EMA, pente, croisement et rôle de la moyenne comme support dynamique',
    'MM50 au-dessus de la MM200 = structure haussière de fond ; en tendance, le prix revient souvent vers la MM20/MM50 avant de repartir',
    'Utiliser un croisement de moyennes mobiles en marché sans tendance (range) : les faux signaux se multiplient',
    'Croisement EMA20/EMA50 haussier puis pullback sur l’EMA50 ⇒ entrée avec stop sous le dernier creux significatif',
  ],
  [
    'indicateurs-momentum',
    'Indicateurs de momentum : RSI, MACD & stochastique',
    'RSI(14), MACD (12, 26, 9), stochastique (14, 3, 3) : mesure de la vitesse et de la force du mouvement, détection des divergences',
    'RSI > 70 = surachat, mais ce n’est jamais un signal de vente isolé ; une divergence prix/RSI signale un essoufflement du mouvement',
    'Vendre mécaniquement à RSI 70 en tendance forte : le RSI peut rester au-dessus de 70 pendant plusieurs semaines',
    'Le prix inscrit un nouveau sommet alors que le RSI plafonne plus bas : divergence baissière, on attend la cassure de structure pour agir',
  ],
  [
    'volatilite-atr-bollinger',
    'Volatilité : ATR, bandes de Bollinger & écarts-types',
    'Volatilité historique et implicite ; ATR(14) = amplitude vraie moyenne ; bandes de Bollinger = MM20 ± 2 écarts-types',
    'Stop minimum = 1,5 à 2 × ATR pour rester hors du bruit de marché ; la taille de position doit être ajustée à l’ATR',
    'Poser un stop fixe de 10 pips sur un actif dont l’ATR horaire vaut 40 pips : sortie quasi certaine par le bruit',
    'ATR H1 = 25 pips ⇒ stop à 2 × ATR = 50 pips ; avec 1 % de risque sur 1 000 000 F, taille = 10 000 / 50 = 200 unités par pip',
  ],
  [
    'volume-carnet-ordres',
    'Volume, VWAP & carnet d’ordres',
    'Volume de transaction, VWAP (prix moyen pondéré), profondeur du carnet, delta de volume et zones de liquidité',
    'Une cassure sans volume est suspecte ; volume croissant + clôture hors de la zone = confirmation statistique de la cassure',
    'Interpréter le volume du forex spot comme un volume réel : il s’agit d’un volume de ticks, non d’un volume centralisé',
    'Cassure de résistance avec un volume double de la moyenne 20 périodes : probabilité de continuation nettement supérieure à une cassure dans le vide',
  ],
  [
    'fibonacci-elliott',
    'Fibonacci & vagues d’Elliott',
    'Retracements 23,6 / 38,2 / 50 / 61,8 % et extensions 127 / 161,8 % ; structure impulsive (1-2-3-4-5) et corrective (A-B-C)',
    'En tendance, la zone de retracement 38,2 % – 61,8 % constitue la zone d’entrée privilégiée lorsqu’elle converge avec un support',
    'Compter les vagues après coup (biais de rétrospection) et forcer un décompte que le prix contredit',
    'Hausse de 1,0000 à 1,1000 ⇒ retracement 61,8 % = 1,0382 : zone d’achat avec stop sous 1,0300 et objectif 1,1000',
  ],
  [
    'price-action-structure',
    'Price action : BOS, CHoCH & structure de marché',
    'Structure de marché : BOS (Break of Structure), CHoCH (Change of Character), balayage de liquidité et zones d’offre/demande',
    'Un CHoCH ne valide un changement de tendance qu’après une clôture au-delà du dernier sommet (ou creux) significatif',
    'Confondre un simple balayage de liquidité (longue mèche) avec une véritable cassure de structure (clôture franche)',
    'Balayage du plus bas puis clôture haussière au-dessus du dernier sommet : inversion de structure confirmée, entrée sur le retest',
  ],
  [
    'analyse-multi-timeframes',
    'Analyse multi-timeframes & confluence',
    'Analyse descendante : biais D1/H4, zone de travail H1, déclenchement M15/M5 — la confluence valide le trade',
    'Aucun trade n’est pris si le signal de l’unité de temps basse contredit la structure de l’unité de temps haute',
    'Prendre une entrée en M1 contre une tendance D1 bien établie en espérant « gratter » quelques pips',
    'D1 haussier, H1 en pullback sur support, M15 en avalement haussier ⇒ entrée alignée avec les trois horizons',
  ],
  [
    'gestion-risque-position',
    'Gestion du risque & taille de position',
    'Risque par trade (0,5 à 2 %), risque total, corrélations, drawdown maximal et espérance mathématique',
    'Taille = (Capital × % de risque) / |Entrée − Stop| ; espérance = (P × gain moyen) − ((1 − P) × perte moyenne)',
    'Risquer 10 % par trade : sept pertes consécutives détruisent près de 52 % du capital, la ruine devient quasi certaine',
    'Capital 1 000 000 F, risque 1 % = 10 000 F, stop de 50 pips ⇒ taille = 0,20 lot sur EUR/USD (2 $ par pip)',
  ],
  [
    'stop-loss-trailing',
    'Stop-loss, trailing stop & break-even',
    'Stop initial, stop de protection, trailing stop basé sur l’ATR, mise à break-even et invalidation du scénario',
    'Déplacer le stop au break-even seulement après +1R ; jamais élargir un stop déjà posé',
    'Élargir un stop pour éviter d’être sorti : première cause de destruction de compte chez les débutants',
    'Entrée 1,0900, stop 1,0870 (30 pips) ; à 1,0930 (+1R) le stop passe à 1,0900, puis trailing à 2 × ATR',
  ],
  [
    'psychologie-trading',
    'Psychologie du trader, discipline & biais cognitifs',
    'Biais FOMO, aversion à la perte, ancrage, illusion de contrôle, trading de revanche et fatigue décisionnelle',
    'Une perte est un coût d’exploitation : seule l’espérance mathématique sur 100 trades détermine la performance',
    'Doubler la taille après une perte pour « se refaire » (martingale émotionnelle) : accélération directe vers la ruine',
    'Trois pertes consécutives alors que le plan prévoit 2 % de perte journalière maximale ⇒ arrêt de la journée et journalisation à froid',
  ],
  [
    'journal-backtesting',
    'Journal de trading, métriques & backtesting',
    'Journal de bord, R-multiple, taux de réussite, profit factor, drawdown maximal et backtest sur données historiques',
    'Profit factor = gains bruts / pertes brutes ; au-delà de 1,5 après frais, une stratégie devient exploitable',
    'Ne journaliser que les trades gagnants : le biais de sélection fausse toutes les statistiques et masque les fuites',
    '100 trades : 45 gagnants à +2R et 55 perdants à −1R ⇒ espérance = 0,45 × 2 − 0,55 × 1 = +0,35R par trade',
  ],
  [
    'plan-trading-routine',
    'Plan de trading, routine & gestion du capital',
    'Plan écrit : marchés suivis, sessions, setups autorisés, règles d’entrée/sortie, limites de risque et routine quotidienne',
    'Aucun trade sans les trois conditions : setup défini + ratio R:R ≥ 1:2 + risque ≤ limite journalière',
    'Changer de stratégie après trois pertes : le « zapping » permanent empêche toute validation statistique',
    'Routine : préparation à 07h00, session Londres 08h00–11h00, 2 trades maximum, 1 % par trade et 3 % de perte journalière maximale',
  ],
  [
    'forex-crypto-matieres',
    'Forex, crypto & matières premières',
    'Spécificités par classe d’actifs : forex 24/5 avec sessions, crypto 24/7, futures de matières premières, coût de financement des perpétuels',
    'Les frais de financement (funding rate) d’un contrat perpétuel s’appliquent toutes les 8 heures et s’ajoutent au P&L',
    'Ignorer les gaps du week-end en crypto et les horaires de fermeture du forex : stops sautés et slippage massif',
    'Position perpétuelle de 10 000 $ à un funding de 0,03 % par 8 heures ⇒ 0,09 % par jour, soit environ 9 $ de coût quotidien',
  ],
  [
    'strategies-avancees-algo',
    'Stratégies avancées, scalping, swing & trading algorithmique',
    'Scalping, day trading, swing trading, position trading, carry trade, grille/martingale (dangers) et trading algorithmique',
    'Chaque stratégie impose un horizon, une taille de position et un coût de transaction adaptés à sa fréquence',
    'Utiliser une martingale à levier élevé : la ruine devient mathématiquement certaine sur un nombre suffisant de séries perdantes',
    'Swing : 5 trades par mois, R:R 1:3, taux de réussite 40 % ⇒ espérance = 0,4 × 3 − 0,6 × 1 = +0,6R par trade',
  ],
];

export const TRADING_PACK: CenturionBundle = mergeCenturionBundles([
  buildMillenniumPack([
    {
      subjectId: 'trading_marches',
      subjectName: 'Trading & Marchés Financiers',
      primaryExamId: 'certification-trading-marches',
      examIds: [
        'certification-trading-marches',
        'concours-sciencespo-banque-eau',
        'concours-finances-banque',
        'certif-fintech-microfinance',
      ],
      zone: 'Finance de marché, bourse, forex, crypto & gestion du risque',
      diagramId: 'chandeliers_japonais',
      modules: TRADING_MODULES,
    },
  ]),
]);
