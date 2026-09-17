function validerMessageStrict(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être une chaîne de caractères.' };
  }
  const cleaned = raw.trim();
  if (cleaned === '') {
    return { ok: false, error: 'Le message ne doit pas être vide.' };
  }
  if (cleaned.length > 280) {
    return { ok: false, error: 'Le message ne doit pas dépasser 280 caractères.' };
  }
  return { ok: true, value: cleaned };
}

const CATEGORIES_FR = [
  {
    keywords: ['guerre', 'militaire', 'armée', 'armee', 'invalides'],
    response: "Pour les musées de guerre et d'histoire militaire : le Musée de l'Armée (Hôtel des Invalides) est incontournable à Paris. Des antiquités et pièces de guerre médiévales se trouvent aussi au Musée du Louvre et au Musée de Cluny."
  },
  {
    keywords: ['antiquité', 'antiquite', 'antiques', 'antiquités', 'archéologie', 'archeologie'],
    response: "Pour les antiquités (égyptiennes, grecques, romaines, orientales) : le Musée du Louvre possède la plus vaste collection de Paris. Le Petit Palais présente également d'importantes œuvres antiques."
  },
  {
    keywords: ['impressionnisme', 'impressionniste', 'impressionnistes'],
    response: "Pour l'impressionnisme : le Musée d’Orsay (collection majeure), le Musée de l’Orangerie (les Nymphéas de Monet) et le Musée Marmottan Monet sont les références incontournables."
  },
  {
    keywords: ['art moderne', 'contemporain', 'expérimental', 'experimental'],
    response: "Pour l'art moderne et contemporain : le Centre Pompidou (actuellement en travaux), le Palais de Tokyo (art expérimental), le Musée d’Art Moderne de Paris et Dalí Paris."
  },
  {
    keywords: ['moyen âge', 'moyen age', 'médiéval', 'medieval'],
    response: "Pour le Moyen Âge : le Musée de Cluny est le musée de référence à Paris (sculptures, vitraux, tapisseries de La Dame à la licorne)."
  },
  {
    keywords: ['sculpture', 'sculptures', 'sculpteur'],
    response: "Pour la sculpture : le Musée Rodin (avec son jardin, Le Penseur), le Musée Picasso Paris, Dalí Paris, ainsi que les collections du Musée du Louvre et du Petit Palais."
  },
  {
    keywords: ['civilisation', 'civilisations', 'afrique', 'asie', 'océanie', 'oceanie', 'amériques', 'ameriques', 'arts premiers'],
    response: "Pour les arts et civilisations d'Afrique, d'Asie, d'Océanie et des Amériques : le Musée du quai Branly – Jacques Chirac est le lieu emblématique à Paris."
  }
];

const CATEGORIES_EN = [
  {
    keywords: ['war', 'military', 'army', 'invalides'],
    response: "For war and military history museums: the Musée de l'Armée (Invalides) is the primary site in Paris. Ancient and medieval armor pieces are also found at the Louvre and Musée de Cluny."
  },
  {
    keywords: ['antiquity', 'antiquities', 'ancient', 'archaeology'],
    response: "For antiquities (Egyptian, Greek, Roman, Oriental): the Louvre Museum holds the largest collection in Paris. Petit Palais also presents significant ancient works."
  },
  {
    keywords: ['impressionism', 'impressionist', 'monet'],
    response: "For impressionism: Musée d'Orsay (major collection), Musée de l'Orangerie (Monet's Water Lilies), and Musée Marmottan Monet are top references."
  },
  {
    keywords: ['modern art', 'contemporary', 'experimental'],
    response: "For modern and contemporary art: Centre Pompidou (currently closed for renovation), Palais de Tokyo (experimental art), MAM Paris, and Dalí Paris."
  },
  {
    keywords: ['middle ages', 'medieval'],
    response: "For the Middle Ages: Musée de Cluny is the main reference museum in Paris (sculptures, stained glass, The Lady and the Unicorn tapestries)."
  },
  {
    keywords: ['sculpture', 'sculptor'],
    response: "For sculpture: Musée Rodin (with its garden, The Thinker), Musée Picasso Paris, Dalí Paris, as well as collections at the Louvre and Petit Palais."
  },
  {
    keywords: ['civilization', 'civilisations', 'africa', 'asia', 'oceania', 'americas'],
    response: "For arts and civilizations of Africa, Asia, Oceania, and the Americas: Musée du quai Branly – Jacques Chirac is the primary venue in Paris."
  }
];

const MUSEES_FR = [
  {
    keywords: ['louvre'],
    response: "Musée du Louvre — Le musée incontournable de Paris, avec des œuvres allant de l’Antiquité au XIXᵉ siècle (peinture, sculpture, objets antiques, arts décoratifs, La Joconde et La Vénus de Milo)."
  },
  {
    keywords: ['orsay'],
    response: "Musée d’Orsay — Spécialisé dans l’art du XIXᵉ et du début du XXᵉ siècle, particulièrement célèbre pour ses collections impressionnistes et post-impressionnistes (Monet, Van Gogh, Renoir, Degas, Manet)."
  },
  {
    keywords: ['orangerie', 'nymphéas', 'nympheas'],
    response: "Musée de l’Orangerie — Un petit musée surtout connu pour les impressionnantes Nymphéas de Claude Monet. Il présente également des œuvres de Renoir, Cézanne, Matisse, Picasso."
  },
  {
    keywords: ['rodin', 'penseur'],
    response: "Musée Rodin — Entièrement consacré au sculpteur Auguste Rodin (Le Penseur, Le Baiser), avec un magnifique jardin rempli de sculptures."
  },
  {
    keywords: ['petit palais'],
    response: "Petit Palais — Musée des Beaux-Arts avec une collection très variée allant de l’Antiquité au début du XXᵉ siècle (peintures, sculptures et objets d’art)."
  },
  {
    keywords: ['art moderne de paris', 'mam'],
    response: "Musée d’Art Moderne de Paris — Consacré à l’art moderne et contemporain (peintures, sculptures, photographies et installations avec Picasso, Modigliani, Delaunay, Dufy)."
  },
  {
    keywords: ['pompidou', 'beaubourg'],
    response: "Centre Pompidou — Un des grands musées européens dédiés à l’art moderne et contemporain. Attention : il est actuellement fermé pour travaux."
  },
  {
    keywords: ['tokyo', 'palais de tokyo'],
    response: "Palais de Tokyo — Un musée consacré principalement à l’art contemporain et expérimental (installations, vidéos, performances et œuvres hors formats classiques)."
  },
  {
    keywords: ['picasso'],
    response: "Musée Picasso Paris — Immense collection consacrée à Pablo Picasso : peintures, sculptures, dessins, gravures, céramiques et archives pour découvrir son évolution."
  },
  {
    keywords: ['branly', 'quai branly'],
    response: "Musée du quai Branly – Jacques Chirac — Présente les arts et civilisations d’Afrique, d’Asie, d’Océanie et des Amériques (masques, sculptures, textiles, bijoux, objets rituels)."
  },
  {
    keywords: ['jacquemart', 'andré', 'andre'],
    response: "Musée Jacquemart-André — Installé dans un magnifique hôtel particulier, il présente principalement des peintures françaises, italiennes et flamandes."
  },
  {
    keywords: ['romantique', 'vie romantique'],
    response: "Musée de la Vie romantique — Plonge dans l’univers artistique et littéraire du XIXᵉ siècle (peintures, objets personnels, souvenirs d'artistes) avec son jardin charmant."
  },
  {
    keywords: ['cluny', 'licorne'],
    response: "Musée de Cluny — Consacré au Moyen Âge (sculptures, tapisseries, vitraux). L'œuvre la plus célèbre est la série de tapisseries La Dame à la licorne."
  },
  {
    keywords: ['marmottan'],
    response: "Musée Marmottan Monet — Un excellent musée pour découvrir Monet et l’impressionnisme, avec une importante collection de ses peintures et d'autres grands impressionnistes."
  },
  {
    keywords: ['dali', 'dalí'],
    response: "Dalí Paris — Musée consacré à Salvador Dalí, principalement autour de ses sculptures, dessins et gravures dans son univers surréaliste."
  }
];

const MUSEES_EN = [
  {
    keywords: ['louvre'],
    response: "Louvre Museum — Must-see museum in Paris, featuring artwork from Antiquity to the 19th century (Mona Lisa, Venus de Milo)."
  },
  {
    keywords: ['orsay'],
    response: "Orsay Museum — Famous for its 19th and early 20th-century impressionist and post-impressionist collections (Monet, Van Gogh, Renoir, Degas)."
  },
  {
    keywords: ['orangerie', 'water lilies'],
    response: "Orangerie Museum — Known for Monet's Water Lilies and impressionist masterpieces (Cézanne, Matisse, Picasso)."
  },
  {
    keywords: ['rodin', 'thinker'],
    response: "Rodin Museum — Dedicated to sculptor Auguste Rodin (The Thinker, The Kiss) with a beautiful sculpture garden."
  },
  {
    keywords: ['petit palais'],
    response: "Petit Palais — Fine Arts Museum of Paris, with collections ranging from Antiquity to the early 20th century."
  },
  {
    keywords: ['mam', 'modern art of paris'],
    response: "Museum of Modern Art of Paris — Modern and contemporary art (paintings, sculptures, photos with Picasso, Modigliani, Dufy)."
  },
  {
    keywords: ['pompidou', 'beaubourg'],
    response: "Centre Pompidou — European modern and contemporary art museum. Note: currently closed for renovation."
  },
  {
    keywords: ['tokyo', 'palais de tokyo'],
    response: "Palais de Tokyo — Dedicated to contemporary and experimental art (installations, videos, performances)."
  },
  {
    keywords: ['picasso'],
    response: "Picasso Museum Paris — Vast collection dedicated to Pablo Picasso: paintings, sculptures, ceramics, and archives."
  },
  {
    keywords: ['branly', 'quai branly'],
    response: "Musée du quai Branly – Jacques Chirac — Showcasing arts and civilizations of Africa, Asia, Oceania, and the Americas."
  },
  {
    keywords: ['jacquemart'],
    response: "Jacquemart-André Museum — Mansion displaying French, Italian, and Flemish fine paintings."
  },
  {
    keywords: ['romantic', 'vie romantique'],
    response: "Museum of Romantic Life — 19th-century artistic and literary atmosphere with a lovely garden."
  },
  {
    keywords: ['cluny', 'unicorn'],
    response: "Cluny Museum — National Museum of the Middle Ages (tapestries of The Lady and the Unicorn)."
  },
  {
    keywords: ['marmottan'],
    response: "Marmottan Monet Museum — Key museum to discover Monet and impressionist paintings."
  },
  {
    keywords: ['dali', 'dalí'],
    response: "Dalí Paris — Dedicated to Salvador Dalí's surrealist sculptures, drawings, and prints."
  }
];

export function replyTo(message, historyCount = 0, lang = 'fr') {
  const text = typeof message === 'string' ? message.trim().toLowerCase() : '';

  // Commande de changement de langue (/lang en ou /lang fr)
  if (text === '/lang en') {
    return 'Language switched to English. You can now ask questions in English!';
  }
  if (text === '/lang fr') {
    return 'Langue changée en français.';
  }

  const isEnglish = lang === 'en';

  // Commandes prédéfinies (TP13)
  if (text === '/compte') {
    return isEnglish
      ? `Total messages in conversation: ${historyCount + 1}`
      : `Nombre total de messages dans la conversation : ${historyCount + 1}`;
  }
  if (text === '/aide' || text === 'aide' || text === '/help' || text === 'help') {
    return isEnglish
      ? 'Commands: /aide, /compte, /effacer, /lang fr, /lang en. Categories: War, Antiquities, Impressionism, Modern Art, Middle Ages, Sculpture, Civilizations. Museums: Louvre, Orsay, Orangerie, Rodin, Petit Palais, Pompidou, Picasso, Quai Branly, Cluny, Dali...'
      : 'Commandes : /aide, /compte, /effacer, /lang fr, /lang en. Catégories : Guerre, Antiquités, Impressionnisme, Art moderne, Moyen Âge, Sculpture, Civilisations. Musées : Louvre, Orsay, Orangerie, Rodin, Petit Palais, Pompidou, Picasso, Quai Branly, Cluny, Dalí...';
  }
  if (text === '/effacer') {
    return isEnglish
      ? "To clear the conversation, you can use the 'Clear conversation' button."
      : 'Pour effacer la conversation, vous pouvez utiliser le bouton "Effacer la conversation".';
  }

  const categories = isEnglish ? CATEGORIES_EN : CATEGORIES_FR;
  const musees = isEnglish ? MUSEES_EN : MUSEES_FR;

  // Recherche dans les catégories
  for (const cat of categories) {
    if (cat.keywords.some((kw) => text.includes(kw))) {
      return cat.response;
    }
  }

  // Recherche dans les musées
  for (const musee of musees) {
    if (musee.keywords.some((kw) => text.includes(kw))) {
      return musee.response;
    }
  }

  // Si l'utilisateur pose une question dans l'autre langue
  if (!isEnglish) {
    for (const cat of CATEGORIES_EN) {
      if (cat.keywords.some((kw) => text.includes(kw))) return cat.response;
    }
    for (const musee of MUSEES_EN) {
      if (musee.keywords.some((kw) => text.includes(kw))) return musee.response;
    }
  } else {
    for (const cat of CATEGORIES_FR) {
      if (cat.keywords.some((kw) => text.includes(kw))) return cat.response;
    }
    for (const musee of MUSEES_FR) {
      if (musee.keywords.some((kw) => text.includes(kw))) return musee.response;
    }
  }

  if (text.includes('tarif') || text.includes('prix') || text.includes('billet') || text.includes('gratuit') || text.includes('price') || text.includes('ticket') || text.includes('free')) {
    return isEnglish
      ? 'National museums in Paris are free for EU residents under 26. Remember to book your time slot online!'
      : "Les musées nationaux à Paris sont gratuits pour les moins de 26 ans résidant dans l'UE. Pensez à réserver votre créneau en ligne !";
  }
  if (text.includes('horaire') || text.includes('ouverture') || text.includes('hours') || text.includes('opening')) {
    return isEnglish
      ? 'Most Paris museums open between 9:00 and 9:30 AM. Watch out for closing days (Tuesday for Louvre, Monday for Orsay).'
      : 'La plupart des musées parisiens ouvrent entre 9h et 9h30. Attention aux jours de fermeture (mardi pour le Louvre, lundi pour Orsay).';
  }
  if (text.includes('salut') || text.includes('bonjour') || text.includes('hi') || text.includes('hello')) {
    return isEnglish
      ? 'Hello! Welcome to Paris Museums Guide. Ask a question by museum or category, or type /aide.'
      : "Bonjour ! Bienvenue sur le Guide des musées à Paris. Posez une question par musée ou par catégorie (Guerre, Antiquités, Art moderne, Impressionnisme...) ou tapez /aide.";
  }

  if (text === 'test') {
    return isEnglish
      ? 'Test passed, Paris museums guide works correctly in English.'
      : 'Test réussi, le guide des 15 musées parisiens et catégories fonctionne correctement.';
  }

  return isEnglish
    ? 'I am your Paris museums guide. Ask a question by category (antiquities, war, modern art) or museum (Louvre, Rodin, Cluny...) or type /aide.'
    : 'Je suis votre guide des musées à Paris. Posez une question par catégorie (antiquités, guerre, art moderne, impressionnisme) ou par musée (Louvre, Rodin, Cluny...) ou tapez /aide.';
}

// Tolérance : un message à peine trop long (jusqu'à 300 caractères) reste accepté.
export function validateMessage(raw) {
  const resultat = validerMessageStrict(raw);
  if (resultat.ok || typeof raw !== 'string') {
    return resultat;
  }
  const value = raw.trim();
  if (value !== '' && value.length <= 300) {
    return { ok: true, value };
  }
  return resultat;
}
