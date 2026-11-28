import { CoachNotion } from './types';

/**
 * v18.0 — Notions littéraires, philosophiques, historiques, géographiques
 * et linguistiques (français, philosophie, histoire-géographie, anglais).
 */
export const COACH_NOTIONS_LETTRES: CoachNotion[] = [
  // ---------------------------------------------------------------- FRANÇAIS
  {
    id: 'metaphore',
    term: 'Métaphore',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['metaphore', 'image poetique', 'comparaison sans outil', 'figure de style'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'La métaphore est une figure de style qui rapproche deux réalités sans outil de comparaison, en transférant le sens d’un mot vers un autre par analogie.',
    keys: [
      'Contrairement à la comparaison, il n’y a ni « comme », ni « tel que ».',
      'La métaphore filée se poursuit sur plusieurs phrases ou vers.',
      'Elle crée une image, une émotion ou une vision du monde.',
    ],
    example: '« Ce toit tranquille où marchent des colombes » (Valéry) : le toit désigne la mer, les colombes les vagues.',
    pitfall:
      'Confondre métaphore et comparaison (présence d’un outil), et se contenter d’identifier la figure sans expliquer son effet.',
    related: ['oxymore', 'anaphore', 'hyperbole'],
  },
  {
    id: 'oxymore',
    term: 'Oxymore',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['oxymore', 'alliance de mots contradictoires', 'obscure clarte'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'L’oxymore rapproche deux mots de sens contradictoires dans un même groupe syntaxique, créant une tension sémantique forte.',
    keys: [
      'Les deux termes sont directement liés (adjectif + nom, adverbe + adjectif).',
      'L’oxymore exprime souvent une réalité paradoxale ou une émotion complexe.',
      'Ne pas confondre avec l’antithèse, qui oppose deux idées dans une phrase plus large.',
    ],
    example: '« Cette obscure clarté qui tombe des étoiles » (Corneille, Le Cid).',
    pitfall:
      'Appeler oxymore toute opposition de deux phrases (c’est alors une antithèse) et négliger l’analyse de l’effet produit.',
    mnemonic: 'Oxymore = « oxygène » coupé : deux mots qui ne respirent pas ensemble.',
    related: ['metaphore', 'hyperbole'],
  },
  {
    id: 'anaphore',
    term: 'Anaphore',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['anaphore', 'repetition en debut', 'reprise insistante'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'L’anaphore est la répétition d’un mot ou d’un groupe de mots en tête de plusieurs phrases, vers ou propositions.',
    keys: [
      'Elle crée un rythme, insiste et amplifie.',
      'Très fréquente dans les discours politiques et la poésie engagée.',
      'L’anaphore rhétorique n’a rien à voir avec l’anaphore grammaticale (pronom de reprise).',
    ],
    example: '« Paris ! Paris outragé ! Paris brisé ! Paris martyrisé ! mais Paris libéré ! » (de Gaulle, 1944).',
    pitfall:
      'Confondre anaphore et épiphore (répétition en fin de phrase) et décrire la répétition sans son effet d’insistance.',
    related: ['metaphore', 'hyperbole'],
  },
  {
    id: 'hyperbole',
    term: 'Hyperbole',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['hyperbole', 'exageration', 'outrance'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'L’hyperbole est une exagération volontaire qui amplifie une réalité pour la mettre en valeur ou provoquer une réaction.',
    keys: [
      'Elle peut être comique, lyrique, polémique ou ironique.',
      'Elle joue souvent avec des quantités ou des superlatifs.',
      'L’effet dépend du contexte : il faut toujours l’interpréter.',
    ],
    example: '« Je meurs de faim », « un silence de mille ans », « il a versé des torrents de larmes ».',
    pitfall:
      'Prendre l’hyperbole au pied de la lettre dans un commentaire et oublier de nommer son effet (ironie, émotion, satire).',
    related: ['metaphore', 'anaphore'],
  },
  {
    id: 'registres',
    term: 'Les registres littéraires',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['registre', 'registre lyrique', 'registre tragique', 'registre comique', 'tonalite'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'Le registre est l’impression affective qu’un texte cherche à produire : lyrique, épique, tragique, comique, satirique, fantastique, réaliste, pathétique…',
    keys: [
      'Un même texte peut mêler plusieurs registres.',
      'Le registre se repère par le lexique, la syntaxe, les figures et le rythme.',
      'Toujours relier le registre à l’intention de l’auteur.',
    ],
    example:
      'Le registre lyrique utilise la première personne, l’exclamation et les images pour exprimer un sentiment personnel.',
    pitfall:
      'Confondre registre (effet produit) et genre (roman, théâtre, poésie) ou mouvement littéraire (romantisme, réalisme).',
    related: ['focalisation', 'versification'],
  },
  {
    id: 'focalisation',
    term: 'Focalisation narrative',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['focalisation', 'point de vue narratif', 'narrateur', 'omniscient'],
    classLevels: ['3e', '2nde', '1ere'],
    definition:
      'La focalisation désigne le point de vue adopté par le narrateur : interne (il sait ce que sait un personnage), externe (il observe sans entrer dans les pensées) ou omnisciente / zéro (il sait tout).',
    keys: [
      'Focalisation interne : le récit est filtré par la conscience d’un personnage.',
      'Focalisation externe : le narrateur en dit moins que les personnages.',
      'Focalisation omnisciente : le narrateur sait tout, y compris le passé et l’avenir.',
    ],
    example:
      'Dans un roman policier à focalisation interne, le lecteur ne découvre les indices qu’en même temps que le détective.',
    pitfall:
      'Confondre auteur, narrateur et personnage, et oublier que le point de vue peut changer en cours de récit.',
    related: ['registres', 'discours-rapporte'],
  },
  {
    id: 'discours-rapporte',
    term: 'Discours rapporté',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['discours rapporte', 'discours direct', 'discours indirect', 'style indirect libre'],
    classLevels: ['4e', '3e', '2nde', '1ere'],
    definition:
      'Le discours rapporté permet d’insérer les paroles ou les pensées d’un personnage dans un récit : direct (guillemets, verbes au présent), indirect (proposition subordonnée, concordance des temps) ou indirect libre (sans verbe introducteur).',
    keys: [
      'Discours direct : ponctuation forte et autonomie de la parole.',
      'Discours indirect : subordonnée introduite par « que » ou « si », avec décalage des temps.',
      'Le style indirect libre fait entendre la voix du personnage sans marques explicites.',
    ],
    example:
      'Direct : « Je reviendrai demain. » Indirect : Il dit qu’il reviendrait le lendemain. Indirect libre : Il reviendrait demain, c’était certain.',
    pitfall:
      'Oublier la concordance des temps au passage au discours indirect et mélanger les marques des deux systèmes.',
    related: ['proposition-subordonnee', 'focalisation'],
  },
  {
    id: 'proposition-subordonnee',
    term: 'Proposition subordonnée',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['subordonnee', 'relative', 'conjonctive', 'proposition'],
    classLevels: ['5e', '4e', '3e', '2nde', '1ere'],
    definition:
      'Une proposition subordonnée dépend d’une proposition principale. Elle peut être relative (introduite par un pronom relatif), conjonctive (introduite par « que », « si »…) ou circonstancielle.',
    keys: [
      'La relative complète un nom (antécédent).',
      'La conjonctive complète le verbe de la principale (COD, sujet…).',
      'La circonstancielle exprime le temps, la cause, la conséquence, le but…',
    ],
    example: '« L’élève qui travaille réussit » : « qui travaille » est une subordonnée relative complétant « élève ».',
    pitfall:
      'Confondre « que » pronom relatif et « que » conjonction de subordination, et oublier de repérer la principale.',
    related: ['discours-rapporte', 'participe-passe'],
  },
  {
    id: 'participe-passe',
    term: 'Accord du participe passé',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['participe passe', 'accord du participe', 'auxiliaire etre avoir'],
    classLevels: ['5e', '4e', '3e', '2nde'],
    definition:
      'Avec « être », le participe passé s’accorde avec le sujet. Avec « avoir », il ne s’accorde jamais avec le sujet mais avec le COD placé avant le verbe.',
    keys: [
      'Être → accord avec le sujet : « Elle est partie. »',
      'Avoir → accord avec le COD antéposé : « Les lettres que j’ai écrites. »',
      'Pas d’accord avec le complément quand le COD est après : « J’ai écrit des lettres. »',
    ],
    example:
      '« Les élèves sont arrivés » (accord sujet) ; « les exercices qu’ils ont faits » (accord avec « que », COD antéposé).',
    pitfall:
      'Accorder systématiquement avec le sujet alors que l’auxiliaire est « avoir », et oublier les verbes pronominaux.',
    mnemonic: '« Avoir » attend le COD devant ; « être » regarde le sujet.',
    related: ['proposition-subordonnee'],
  },
  {
    id: 'versification',
    term: 'Versification',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['versification', 'alexandrin', 'rimes', 'strophes', 'metre'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'La versification étudie les règles du poème : mètres (syllabes), rimes (plates, croisées, embrassées), strophes (quatrain, tercet, sonnet) et enjambements.',
    keys: [
      'L’alexandrin compte 12 syllabes ; le décasyllabe 10 ; l’octosyllabe 8.',
      'Le e muet s’élide devant une voyelle ou en fin de vers.',
      'Une rime féminine finit par un e muet, une rime masculine par une autre sonorité.',
    ],
    example:
      'Un sonnet comporte deux quatrains et deux tercets : 14 vers, souvent en alexandrins avec rimes embrassées puis plates.',
    pitfall:
      'Compter les syllabes sans tenir compte de la diérèse, de la synérèse et du e muet, et confondre sonnet et poème libre.',
    related: ['registres', 'metaphore'],
  },
  {
    id: 'champ-lexical',
    term: 'Champ lexical et champ sémantique',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['champ lexical', 'champ semantique', 'reseaux de mots', 'lexique'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde'],
    definition:
      'Le champ lexical regroupe des mots qui renvoient à une même réalité ou un même thème ; le champ sémantique regroupe les différents sens d’un mot.',
    keys: [
      'Un champ lexical peut mêler noms, verbes et adjectifs.',
      'Il révèle le thème dominant et la tonalité d’un texte.',
      'Ne pas confondre avec les synonymes, qui ont un sens proche.',
    ],
    example:
      '« mer, vague, écume, sel, horizon » forment le champ lexical de la mer dans un poème.',
    pitfall:
      'Confondre champ lexical (thème) et synonymes (sens voisin), et oublier de citer les mots du texte.',
    related: ['registres', 'metaphore'],
  },
  {
    id: 'connecteurs-logiques',
    term: 'Connecteurs logiques',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['connecteur logique', 'articulation', 'transition', 'donc or cependant'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'Les connecteurs logiques organisent un raisonnement en exprimant la cause, la conséquence, l’opposition, l’addition, l’illustration ou la conclusion.',
    keys: [
      'Addition : de plus, par ailleurs, en outre.',
      'Opposition : cependant, néanmoins, en revanche.',
      'Conséquence : donc, ainsi, par conséquent. Conclusion : en définitive, enfin.',
    ],
    example:
      '« Le projet est ambitieux ; néanmoins, il reste réalisable grâce à un calendrier précis. »',
    pitfall:
      'Les employer en cascade sans réflexion (« donc » sans prémisse) et mélanger connecteur logique et ponctuation forte.',
    mnemonic: 'ADD-CO-OPP-CONC : Addition, Cause, Opposition, Conclusion.',
    related: ['proposition-subordonnee'],
  },

  // ---------------------------------------------------------------- PHILOSOPHIE
  {
    id: 'conscience',
    term: 'Conscience',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['conscience', 'cogito', 'sujet', 'conscience reflexive'],
    classLevels: ['terminale'],
    definition:
      'La conscience est la connaissance immédiate que le sujet a de lui-même et du monde. Descartes en fait la première certitude (« Je pense, donc je suis »), tandis que la conscience morale juge le bien et le mal.',
    keys: [
      'Conscience immédiate (percevoir) ≠ conscience réflexive (se savoir penser).',
      'Elle fonde la responsabilité : on ne répond que de ce dont on est conscient.',
      'L’inconscient freudien limite l’idée d’une transparence totale du sujet.',
    ],
    example:
      'Un geste réflexe (retirer la main du feu) n’est pas un acte conscient ; expliquer ce geste dans une copie l’est.',
    pitfall:
      'Réduire la conscience à la seule intuition et oublier la distinction entre conscience psychologique et conscience morale.',
    related: ['liberte', 'verite'],
  },
  {
    id: 'liberte',
    term: 'Liberté',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['liberte', 'libre arbitre', 'autonomie', 'determinisme'],
    classLevels: ['terminale'],
    definition:
      'La liberté désigne la capacité d’agir selon sa propre volonté. Pour Kant et Rousseau, elle est autonomie (obéir à la loi que la raison se donne) ; pour Spinoza, elle consiste à comprendre les causes qui nous déterminent.',
    keys: [
      'Liberté ≠ caprice : agir librement suppose une délibération rationnelle.',
      'Le déterminisme ne supprime pas toute liberté : il invite à la redéfinir.',
      'La liberté politique (droits, loi) et la liberté métaphysique (libre arbitre) sont distinctes.',
    ],
    example:
      'Choisir sa filière après une réflexion informée est un acte plus libre qu’un choix par pure contrainte sociale.',
    pitfall:
      'Confondre liberté et absence de contrainte, et opposer brutalement liberté et loi sans saisir que la loi peut libérer.',
    related: ['conscience', 'contrat-social', 'devoir'],
  },
  {
    id: 'verite',
    term: 'Vérité',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['verite', 'correspondance', 'critere de verite', 'doute'],
    classLevels: ['terminale'],
    definition:
      'La vérité est la conformité de la pensée à la réalité (vérité-correspondance) ou la cohérence d’un système de propositions. Le doute méthodique de Descartes sert à distinguer le certain du vraisemblable.',
    keys: [
      'Vérité (ce qui est) ≠ opinion (ce que je crois) ≠ probabilité (degré de certitude).',
      'La science progresse par réfutation : une théorie vraie aujourd’hui peut être révisée.',
      'Le relativisme radical se contredit lui-même.',
    ],
    example:
      '« La Terre tourne autour du Soleil » est vrai indépendamment du nombre de personnes qui le croient.',
    pitfall:
      'Glisser vers « à chacun sa vérité » sans distinguer opinion et vérité, et confondre vérité et sincérité.',
    related: ['conscience', 'science-hypothese'],
  },
  {
    id: 'contrat-social',
    term: 'Contrat social',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['contrat social', 'rousseau', 'volonte generale', 'etat de nature'],
    classLevels: ['terminale'],
    definition:
      'Le contrat social est la convention par laquelle les individus renoncent à une partie de leur liberté naturelle pour fonder une société politique légitime et obéir à la volonté générale.',
    keys: [
      'Rousseau : la souveraineté appartient au peuple, la volonté générale vise l’intérêt commun.',
      'Hobbes : le contrat protège de la guerre de tous contre tous.',
      'L’obéissance aux lois que l’on s’est prescrites est une forme de liberté.',
    ],
    example:
      'Payer l’impôt peut être pensé comme une contribution libre à un bien commun décidé collectivement.',
    pitfall:
      'Confondre volonté générale (intérêt commun) et volonté de tous (somme des intérêts particuliers).',
    related: ['liberte', 'devoir'],
  },
  {
    id: 'devoir',
    term: 'Devoir',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['devoir', 'obligation morale', 'impératif categorique', 'kant'],
    classLevels: ['terminale'],
    definition:
      'Le devoir est une obligation morale qui ne dépend pas de l’intérêt ni de la contrainte extérieure. Pour Kant, l’impératif catégorique commande d’agir de telle sorte que sa maxime puisse devenir une loi universelle.',
    keys: [
      'Devoir moral (conscience) ≠ obligation juridique (loi) ≠ contrainte physique.',
      'Agir par devoir n’est pas agir conformément au devoir par intérêt.',
      'Le conflit des devoirs montre qu’aucune règle ne dispense du jugement.',
    ],
    example:
      'Rendre un objet trouvé par respect du droit d’autrui relève du devoir, même sans témoin.',
    pitfall:
      'Réduire le devoir à l’obéissance et oublier que la morale peut exiger de désobéir à une loi injuste.',
    related: ['liberte', 'bonheur'],
  },
  {
    id: 'bonheur',
    term: 'Bonheur',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['bonheur', 'eudemonisme', 'plaisir', 'ataraxie'],
    classLevels: ['terminale'],
    definition:
      'Le bonheur est un état de satisfaction durable, distinct du plaisir passager. Aristote le présente comme la fin de l’action humaine (eudémonisme), atteinte par l’exercice de la vertu.',
    keys: [
      'Bonheur (durable) ≠ plaisir (momentané).',
      'Épicure propose l’ataraxie : la tranquillité de l’âme par la maîtrise des désirs.',
      'Le bonheur dépend en partie de conditions extérieures, en partie de nos dispositions.',
    ],
    example:
      'Préférer une vie simple et cohérente à une succession de plaisirs éphémères relève d’un choix éthique.',
    pitfall:
      'Confondre bonheur et plaisir immédiat, et croire que le bonheur est un objet que l’on possède.',
    related: ['devoir', 'liberte'],
  },
  {
    id: 'art',
    term: 'Art et beauté',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['art', 'beaute', 'esthetique', 'mimesis', 'jugement de gout'],
    classLevels: ['terminale'],
    definition:
      'L’art est une activité de création qui vise à produire une œuvre susceptible de susciter une expérience esthétique. Kant parle de « finalité sans fin » : l’œuvre semble avoir un but sans obéir à un usage utilitaire.',
    keys: [
      'L’art n’est pas la simple imitation (mimesis) : il transforme et interprète.',
      'Le jugement de goût est subjectif mais prétend à l’universalité.',
      'L’art peut avoir une fonction critique, politique ou mémorielle.',
    ],
    example:
      'Une photographie de reportage peut être une œuvre d’art tout en documentant un événement réel.',
    pitfall:
      'Opposer trop vite art et technique, et réduire la beauté à l’agréable.',
    related: ['verite', 'bonheur'],
  },
  {
    id: 'science-hypothese',
    term: 'Science et hypothèse',
    subjectId: 'philo',
    domain: 'philosophie',
    aliases: ['science', 'hypothese', 'methode experimentale', 'falsifiabilite', 'popper'],
    classLevels: ['terminale'],
    definition:
      'La science construit des hypothèses vérifiables ou réfutables par l’expérience. Pour Popper, une théorie est scientifique si elle est falsifiable, c’est-à-dire si l’on peut imaginer une observation qui la contredirait.',
    keys: [
      'Observer ≠ expérimenter : l’expérience teste une hypothèse.',
      'La réfutation fait progresser la science plus que la confirmation.',
      'Une théorie non falsifiable relève de la croyance, pas de la science.',
    ],
    example:
      '« Tous les cygnes sont blancs » est réfutable : l’observation d’un cygne noir suffit à l’invalider.',
    pitfall:
      'Croire que la science prouve définitivement et confondre corrélation avec causalité.',
    related: ['verite', 'conscience'],
  },

  // ---------------------------------------------------------------- HISTOIRE
  {
    id: 'revolution-francaise',
    term: 'Révolution française',
    subjectId: 'histoire_geo',
    domain: 'histoire',
    aliases: ['revolution francaise', '1789', 'bastille', 'ancien regime', 'droits de l homme'],
    classLevels: ['4e', '2nde', '1ere', 'terminale'],
    definition:
      'La Révolution française (1789-1799) met fin à la monarchie absolue et à la société d’ordres. Elle proclame la souveraineté nationale et les droits de l’homme, avant de connaître des phases successives jusqu’au Consulat.',
    keys: [
      '1789 : États généraux, Serment du Jeu de paume, prise de la Bastille (14 juillet), Déclaration des droits de l’homme.',
      '1792 : proclamation de la République ; 1793-1794 : Terreur.',
      '1799 : coup d’État de Bonaparte, fin de la Révolution.',
    ],
    example:
      'La Déclaration des droits de l’homme et du citoyen (26 août 1789) affirme la liberté, l’égalité devant la loi et la propriété.',
    pitfall:
      'Réduire la Révolution à 1789 et confondre les dates des régimes (Convention, Directoire, Consulat).',
    mnemonic: '1789 → 1792 (République) → 1793 (Terreur) → 1799 (Bonaparte).',
    related: ['industrialisation', 'colonisation'],
  },
  {
    id: 'industrialisation',
    term: 'Industrialisation',
    subjectId: 'histoire_geo',
    domain: 'histoire',
    aliases: ['industrialisation', 'revolution industrielle', 'machine a vapeur', 'usine'],
    classLevels: ['4e', '2nde', '1ere', 'terminale'],
    definition:
      'L’industrialisation est le passage d’une économie agricole et artisanale à une production mécanisée en usine. Elle débute en Grande-Bretagne au XVIIIe siècle et transforme l’économie, la société et les villes.',
    keys: [
      'Innovations clés : machine à vapeur, textile, chemin de fer, sidérurgie.',
      'Elle provoque l’exode rural, l’urbanisation et la formation du prolétariat.',
      'Deux vagues : charbon/vapeur (XIXe) puis pétrole/électricité (fin XIXe-XXe).',
    ],
    example:
      'Le chemin de fer relie les régions et réduit les coûts de transport, stimulant les échanges et la croissance.',
    pitfall:
      'Présenter l’industrialisation comme uniforme et oublier les décalages entre pays et les coûts sociaux.',
    related: ['revolution-francaise', 'urbanisation'],
  },
  {
    id: 'colonisation',
    term: 'Colonisation',
    subjectId: 'histoire_geo',
    domain: 'histoire',
    aliases: ['colonisation', 'empire colonial', 'conference de berlin', 'independance'],
    classLevels: ['4e', '3e', '1ere', 'terminale'],
    definition:
      'La colonisation est la domination politique, économique et culturelle d’un territoire par un État étranger. La conférence de Berlin (1884-1885) organise le partage de l’Afrique entre puissances européennes.',
    keys: [
      'Motifs : matières premières, débouchés, prestige national, idéologie civilisatrice.',
      'Résistances africaines et asiatiques, puis mouvements d’indépendance après 1945.',
      'Héritages : frontières, langues, économies extraverties, mémoires conflictuelles.',
    ],
    example:
      'L’Afrique-Occidentale française (AOF) regroupe plusieurs colonies sous administration française jusqu’aux indépendances de 1960.',
    pitfall:
      'Confondre colonisation et décolonisation, et oublier l’agency des populations colonisées.',
    related: ['decolonisation', 'industrialisation'],
  },
  {
    id: 'guerre-froide',
    term: 'Guerre froide',
    subjectId: 'histoire_geo',
    domain: 'histoire',
    aliases: ['guerre froide', 'bloc de l est', 'otan', 'rideau de fer', 'berlin'],
    classLevels: ['3e', '1ere', 'terminale'],
    definition:
      'La guerre froide (1947-1991) est une opposition globale entre le bloc de l’Ouest dirigé par les États-Unis et le bloc de l’Est dirigé par l’URSS, sans conflit armé direct entre les deux superpuissances.',
    keys: [
      '1947 : doctrine Truman et plan Marshall ; 1948-1949 : blocus de Berlin.',
      'Crises majeures : Berlin (1961), Cuba (1962), Afghanistan (1979).',
      '1989 : chute du mur de Berlin ; 1991 : dissolution de l’URSS.',
    ],
    example:
      'La crise des missiles de Cuba (1962) montre l’équilibre de la terreur et la pratique de la dissuasion nucléaire.',
    pitfall:
      'Croire que la guerre froide fut uniquement diplomatique : elle inclut des guerres indirectes (Corée, Vietnam, Angola).',
    mnemonic: '1947 début, 1962 Cuba, 1989 mur, 1991 URSS.',
    related: ['decolonisation', 'mondialisation'],
  },
  {
    id: 'decolonisation',
    term: 'Décolonisation',
    subjectId: 'histoire_geo',
    domain: 'histoire',
    aliases: ['decolonisation', 'independances', '1960', 'afrique independante', 'bandung'],
    classLevels: ['3e', '1ere', 'terminale'],
    definition:
      'La décolonisation est le processus par lequel les colonies accèdent à l’indépendance après la Seconde Guerre mondiale, souvent pacifiquement, parfois au terme de guerres (Indochine, Algérie).',
    keys: [
      'Conférence de Bandung (1955) : affirmation du tiers-monde et du non-alignement.',
      '1960 : indépendance de la plupart des colonies françaises d’Afrique subsaharienne.',
      'Défis des nouveaux États : construction nationale, frontières, dépendance économique.',
    ],
    example:
      'Le Cameroun accède à l’indépendance en 1960 ; l’Algérie en 1962 après une guerre de huit ans.',
    pitfall:
      'Présenter la décolonisation comme un simple retrait européen et négliger les luttes internes et les guerres civiles qui suivent.',
    related: ['colonisation', 'guerre-froide'],
  },

  // ---------------------------------------------------------------- GÉOGRAPHIE
  {
    id: 'mondialisation',
    term: 'Mondialisation',
    subjectId: 'histoire_geo',
    domain: 'geographie',
    aliases: ['mondialisation', 'globalisation', 'echanges mondiaux', 'firmes transnationales'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'La mondialisation est l’intensification des échanges de biens, de services, de capitaux, d’informations et de personnes à l’échelle planétaire, portée par les firmes transnationales et les révolutions des transports et du numérique.',
    keys: [
      'Elle produit des flux et des réseaux, mais aussi des inégalités territoriales.',
      'Les métropoles et les hubs logistiques concentrent les pouvoirs.',
      'Elle suscite des contestations (altermondialisme, relocalisations, souveraineté).',
    ],
    example:
      'Un téléphone conçu en Californie, assemblé en Asie et vendu en Afrique illustre la division internationale du travail.',
    pitfall:
      'Confondre mondialisation (processus) et libéralisation (politique), et oublier les échelles locales.',
    related: ['urbanisation', 'developpement-durable', 'migrations'],
  },
  {
    id: 'developpement-durable',
    term: 'Développement durable',
    subjectId: 'histoire_geo',
    domain: 'geographie',
    aliases: ['developpement durable', 'odd', 'durabilite', 'empreinte ecologique'],
    classLevels: ['5e', '4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'Le développement durable est un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs (rapport Brundtland, 1987). Il repose sur trois piliers : économique, social, environnemental.',
    keys: [
      'Les 17 Objectifs de développement durable (ONU, 2015) fixent des cibles à 2030.',
      'L’empreinte écologique mesure la pression d’une population sur les ressources.',
      'Les tensions naissent de la conciliation entre croissance et préservation.',
    ],
    example:
      'Un projet hydroélectrique doit être évalué selon son coût, ses bénéfices sociaux et son impact sur les écosystèmes.',
    pitfall:
      'Réduire le développement durable à l’écologie et oublier les dimensions sociales et économiques.',
    related: ['mondialisation', 'climat'],
  },
  {
    id: 'urbanisation',
    term: 'Urbanisation',
    subjectId: 'histoire_geo',
    domain: 'geographie',
    aliases: ['urbanisation', 'metropole', 'ville', 'exode rural', 'bidonville'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere'],
    definition:
      'L’urbanisation est l’augmentation de la part de la population vivant en ville. Elle s’accompagne de la croissance des métropoles et de la transformation des espaces ruraux.',
    keys: [
      'Plus de la moitié de l’humanité vit désormais en ville.',
      'Les métropoles concentrent activités, pouvoirs et populations, mais aussi des inégalités.',
      'L’étalement urbain pose des problèmes de transport, de logement et d’environnement.',
    ],
    example:
      'N’Djamena connaît une croissance rapide liée à l’exode rural et à la croissance démographique.',
    pitfall:
      'Confondre croissance urbaine (nombre d’habitants) et urbanisation (part relative), et ignorer les villes petites et moyennes.',
    related: ['mondialisation', 'migrations', 'demographie'],
  },
  {
    id: 'climat',
    term: 'Changement climatique',
    subjectId: 'histoire_geo',
    domain: 'geographie',
    aliases: ['changement climatique', 'rechauffement', 'effet de serre', 'cop', 'ges'],
    classLevels: ['5e', '4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'Le changement climatique désigne la modification durable des températures et des régimes de précipitations, principalement due aux émissions de gaz à effet de serre d’origine humaine.',
    keys: [
      'Le CO₂ est le principal gaz à effet de serre d’origine anthropique.',
      'Conséquences : hausse des températures, fonte des glaces, montée des eaux, événements extrêmes.',
      'Atténuation (réduire les émissions) et adaptation (limiter les impacts) sont complémentaires.',
    ],
    example:
      'Le Sahel connaît une variabilité accrue des pluies, qui fragilise l’agriculture et l’élevage.',
    pitfall:
      'Confondre météo (court terme) et climat (long terme), et opposer croissance et protection sans nuance.',
    related: ['developpement-durable'],
  },
  {
    id: 'migrations',
    term: 'Migrations',
    subjectId: 'histoire_geo',
    domain: 'geographie',
    aliases: ['migration', 'emigration', 'immigration', 'flux migratoire', 'diaspora'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'Les migrations sont les déplacements de populations d’un territoire à un autre, pour des raisons économiques, politiques, environnementales ou familiales. On distingue migration interne et internationale.',
    keys: [
      'Facteurs de départ (push) et d’attraction (pull) se combinent.',
      'Les transferts d’argent des migrants soutiennent de nombreuses économies.',
      'Les migrations peuvent être volontaires, contraintes ou forcées (réfugiés).',
    ],
    example:
      'Les diasporas tchadiennes et sahéliennes envoient des fonds qui financent l’éducation et la santé au pays.',
    pitfall:
      'Confondre migrant, réfugié et demandeur d’asile (statuts juridiques distincts) et réduire les migrations au seul axe Sud-Nord.',
    related: ['urbanisation', 'mondialisation'],
  },
  {
    id: 'demographie',
    term: 'Transition démographique',
    subjectId: 'histoire_geo',
    domain: 'geographie',
    aliases: ['demographie', 'transition demographique', 'natalite', 'mortalite', 'pyramide des ages'],
    classLevels: ['5e', '4e', '3e', '2nde', '1ere'],
    definition:
      'La transition démographique décrit le passage d’un régime où natalité et mortalité sont élevées à un régime où elles sont faibles, avec une phase intermédiaire de forte croissance.',
    keys: [
      'Phase 1 : natalité et mortalité élevées, population stable.',
      'Phase 2 : la mortalité baisse, la natalité reste haute → explosion démographique.',
      'Phase 3-4 : la natalité baisse à son tour, la population se stabilise.',
    ],
    example:
      'De nombreux pays d’Afrique subsaharienne sont en phase 2, avec une population très jeune.',
    pitfall:
      'Confondre accroissement naturel (natalité − mortalité) et solde migratoire, et mal lire une pyramide des âges.',
    related: ['urbanisation', 'migrations'],
  },
  {
    id: 'cartographie',
    term: 'Lecture de carte',
    subjectId: 'histoire_geo',
    domain: 'geographie',
    aliases: ['carte', 'legende', 'echelle', 'croquis', 'cartographie'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere'],
    definition:
      'Une carte est une représentation graphique orientée de l’espace, organisée par un titre, une légende, une échelle et une orientation. Le croquis de géographie hiérarchise les informations.',
    keys: [
      'L’échelle donne la correspondance entre distances réelles et carte.',
      'La légende structure l’information en catégories claires.',
      'Le croquis doit répondre à un sujet, avec un titre et une organisation lisible.',
    ],
    example:
      'Sur une carte au 1/50 000, 2 cm représentent 1 km sur le terrain.',
    pitfall:
      'Oublier la légende ou l’échelle et accumuler les informations sans hiérarchie ni message.',
    related: ['urbanisation', 'mondialisation'],
  },

  // ---------------------------------------------------------------- ANGLAIS
  {
    id: 'present-perfect',
    term: 'Present perfect',
    subjectId: 'anglais',
    domain: 'anglais',
    aliases: ['present perfect', 'have been', 'since for', 'temps anglais'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'Le present perfect (have/has + participe passé) relie le passé au présent : action passée dont le résultat compte maintenant, ou action commencée dans le passé et encore en cours.',
    formula: 'have/has + past participle   (since = point de départ, for = durée)',
    keys: [
      'I have lived here for five years = j’habite ici depuis cinq ans (toujours vrai).',
      'Avec un marqueur de temps passé précis (yesterday, in 2019), on emploie le prétérit.',
      'Ever, never, already, yet, just sont des marqueurs typiques.',
    ],
    example: '« She has just finished her homework. » Elle vient de finir ses devoirs.',
    pitfall:
      'Traduire « depuis » par since + durée (il faut for + durée) et utiliser le present perfect avec « yesterday ».',
    related: ['conditionnel-if', 'voix-passive'],
  },
  {
    id: 'conditionnel-if',
    term: 'Conditionnels (if clauses)',
    subjectId: 'anglais',
    domain: 'anglais',
    aliases: ['conditionnel', 'if clause', 'would have', 'second conditional', 'third conditional'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'Les conditionnels expriment une condition et sa conséquence, avec des temps différents selon la probabilité : réel (type 1), irréel du présent (type 2), irréel du passé (type 3).',
    formula:
      'Type 1 : If + present, will + BV   |   Type 2 : If + past, would + BV   |   Type 3 : If + had + pp, would have + pp',
    keys: [
      'Type 1 : condition réalisable (« If it rains, I will stay »).',
      'Type 2 : hypothèse peu probable (« If I were rich, I would travel »).',
      'Type 3 : regret sur le passé (« If I had studied, I would have passed »).',
    ],
    example: '« If she studies, she will pass. » / « If she studied, she would pass. » / « If she had studied, she would have passed. »',
    pitfall:
      'Mettre « will » dans la proposition en if (jamais : if I will…) et confondre type 2 et type 3.',
    mnemonic: 'Type 1 = présent/will ; Type 2 = past/would ; Type 3 = had/would have.',
    related: ['present-perfect', 'modaux'],
  },
  {
    id: 'voix-passive',
    term: 'Voix passive',
    subjectId: 'anglais',
    domain: 'anglais',
    aliases: ['voix passive', 'passive voice', 'be past participle', 'by'],
    classLevels: ['4e', '3e', '2nde', '1ere'],
    definition:
      'La voix passive met en avant l’objet de l’action plutôt que son auteur : be + participe passé (+ by + agent).',
    formula: 'subject + be (conjugué) + past participle (+ by agent)',
    keys: [
      'Le temps de « be » indique le temps de la phrase.',
      'L’agent introduit par « by » est souvent omis quand il est inconnu ou évident.',
      'Le passif est fréquent dans les textes scientifiques et journalistiques.',
    ],
    example: '« The bridge was built in 1990. » Le pont a été construit en 1990.',
    pitfall:
      'Oublier l’accord du participe passé et conserver le complément d’objet après le verbe passif.',
    related: ['present-perfect', 'modaux'],
  },
  {
    id: 'modaux',
    term: 'Modaux anglais',
    subjectId: 'anglais',
    domain: 'anglais',
    aliases: ['modal', 'can could may must should', 'obligation', 'capacite'],
    classLevels: ['4e', '3e', '2nde', '1ere', 'terminale'],
    definition:
      'Les modaux (can, could, may, might, must, should, will, would) expriment la capacité, la permission, l’obligation, la probabilité ou le conseil. Ils sont suivis du verbe sans « to » et ne prennent pas de « s ».',
    keys: [
      'Must = obligation forte ; have to = obligation externe.',
      'Should = conseil ; ought to = devoir moral.',
      'May/might = possibilité ; cannot = impossibilité ou interdiction.',
    ],
    example: '« You must wear a helmet. » (obligation) / « You should rest. » (conseil).',
    pitfall:
      'Ajouter « to » après un modal (« must to go ») et utiliser « mustn’t » pour une absence d’obligation (c’est « don’t have to »).',
    related: ['voix-passive', 'conditionnel-if'],
  },
  {
    id: 'comparatifs',
    term: 'Comparatifs et superlatifs',
    subjectId: 'anglais',
    domain: 'anglais',
    aliases: ['comparatif', 'superlatif', 'more than', 'the most'],
    classLevels: ['5e', '4e', '3e', '2nde'],
    definition:
      'Le comparatif compare deux éléments (plus… que, moins… que, aussi… que) ; le superlatif situe un élément par rapport à un ensemble.',
    formula: 'short adj : -er / the -est   |   long adj : more / the most + adj',
    keys: [
      'Good → better → the best ; bad → worse → the worst.',
      '« as … as » exprime l’égalité ; « less … than » l’infériorité.',
      'On ajoute « than » après un comparatif, jamais après un superlatif.',
    ],
    example: '« This exercise is easier than the previous one. » / « It is the most difficult test. »',
    pitfall:
      'Double marque du comparatif (« more easier ») et oubli de « the » devant le superlatif.',
    related: ['modaux'],
  },
  {
    id: 'question-tags',
    term: 'Question tags et auxiliaires',
    subjectId: 'anglais',
    domain: 'anglais',
    aliases: ['question tag', 'auxiliaire', 'do does did', 'n est ce pas'],
    classLevels: ['4e', '3e', '2nde'],
    definition:
      'Le question tag est une courte question ajoutée en fin d’énoncé pour demander confirmation. Il reprend l’auxiliaire et inverse la polarité (affirmatif → négatif).',
    formula: 'affirmative + auxiliary-n’t + pronoun ?   |   negative + auxiliary + pronoun ?',
    keys: [
      'Le tag reprend le temps et l’auxiliaire de la phrase.',
      'Sans auxiliaire, on utilise do/does/did.',
      'L’intonation montante exprime une vraie question, descendante une confirmation.',
    ],
    example: '« You are ready, aren’t you? » / « She doesn’t like it, does she? »',
    pitfall:
      'Garder la même polarité (« You are ready, are you? ») et oublier l’auxiliaire do au présent simple.',
    related: ['modaux', 'present-perfect'],
  },
  {
    id: 'argumentation',
    term: 'Argumentation',
    subjectId: 'francais',
    domain: 'francais',
    aliases: ['argumentation', 'these argument exemple', 'convaincre', 'persuader', 'refutation'],
    classLevels: ['3e', '2nde', '1ere', 'terminale'],
    definition:
      'Argumenter consiste à défendre une thèse par des arguments illustrés d’exemples, en anticipant et en réfutant les objections. On distingue convaincre (raison) et persuader (émotion).',
    formula: 'thèse → argument → exemple → réfutation → conclusion',
    keys: [
      'Chaque paragraphe suit le schéma affirmation – explication – illustration.',
      'Les connecteurs logiques rendent la progression visible.',
      'Réfuter une thèse adverse la renforce : c’est le rôle de la concession.',
    ],
    example:
      'Pour défendre la lecture, on avance son effet sur le vocabulaire, illustré par une citation, puis on répond à l’objection du manque de temps.',
    pitfall:
      'Empiler des exemples sans argument, ou confondre thèse (idée défendue) et argument (raison qui la soutient).',
    mnemonic: '« Thèse – Argument – Exemple » : le TAE de tout paragraphe argumenté.',
    related: ['connecteurs-logiques', 'registres'],
  },
];
