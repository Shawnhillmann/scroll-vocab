export type LangCode = 'en' | 'pl' | 'fr' | 'es'
export type CategoryId =
  | 'home'
  | 'furniture'
  | 'kitchen'
  | 'food'
  | 'fruit'
  | 'drinks'
  | 'animals'
  | 'wild'
  | 'creatures'
  | 'city'
  | 'transport'
  | 'streets'
  | 'people'
  | 'relatives'
  | 'jobs'
  | 'body'
  | 'face'
  | 'health'
  | 'clothing'
  | 'accessories'
  | 'grooming'
  | 'nature'
  | 'weather'
  | 'seasons'
  | 'actions'
  | 'doing'
  | 'mind'
  | 'descriptions'
  | 'size'
  | 'opposites'
export type ModeId = 'learn' | 'choice' | 'type'

export type Mode = {
  id: ModeId
  label: string
  detail: string
  emoji: string
}

export type LanguageOption = {
  code: LangCode
  label: string
  nativeName: string
  bcp47: string
  voiceLangs: string[]
}

export type Category = {
  id: CategoryId
  label: string
  short: string
  emoji: string
  tint: string
}

export type Word = {
  id: string
  category: CategoryId
  emoji: string
  tint: string
  forms: Record<LangCode, string>
}

export const languages: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    bcp47: 'en-US',
    voiceLangs: ['en-US', 'en-GB', 'en-AU', 'en-IN', 'en-IE', 'en'],
  },
  {
    code: 'pl',
    label: 'Polish',
    nativeName: 'Polski',
    bcp47: 'pl-PL',
    voiceLangs: ['pl-PL', 'pl'],
  },
  {
    code: 'fr',
    label: 'French',
    nativeName: 'Français',
    bcp47: 'fr-FR',
    voiceLangs: ['fr-FR', 'fr-CA', 'fr-BE', 'fr'],
  },
  {
    code: 'es',
    label: 'Spanish',
    nativeName: 'Español',
    bcp47: 'es-ES',
    voiceLangs: ['es-ES', 'es-MX', 'es-US', 'es-AR', 'es-CO', 'es'],
  },
]

export const categories: Category[] = [
  { id: 'kitchen', label: 'Kitchen', short: 'Kitchen', emoji: '🍳', tint: '#3a2418' },
  { id: 'furniture', label: 'Furniture', short: 'Furniture', emoji: '🛋️', tint: '#2c241c' },
  { id: 'home', label: 'Home', short: 'Home', emoji: '🏠', tint: '#2a2218' },
  { id: 'fruit', label: 'Groceries', short: 'Groceries', emoji: '🍎', tint: '#3a2018' },
  { id: 'food', label: 'Food', short: 'Food', emoji: '🍽️', tint: '#3a2418' },
  { id: 'drinks', label: 'Drinks & sweets', short: 'Drinks & sweets', emoji: '☕', tint: '#301c14' },
  { id: 'animals', label: 'Pets & farm', short: 'Pets & farm', emoji: '🐶', tint: '#243018' },
  { id: 'wild', label: 'Wild animals', short: 'Wild animals', emoji: '🦁', tint: '#2a2814' },
  { id: 'creatures', label: 'Other animals', short: 'Other animals', emoji: '🐙', tint: '#182830' },
  { id: 'transport', label: 'Transport', short: 'Transport', emoji: '🚗', tint: '#1a2430' },
  { id: 'city', label: 'Places', short: 'Places', emoji: '🏙️', tint: '#1c2030' },
  { id: 'streets', label: 'Travel', short: 'Travel', emoji: '🛣️', tint: '#182028' },
  { id: 'people', label: 'Family', short: 'Family', emoji: '👪', tint: '#3a2820' },
  { id: 'relatives', label: 'Community', short: 'Community', emoji: '🤝', tint: '#32241c' },
  { id: 'jobs', label: 'Jobs', short: 'Jobs', emoji: '💼', tint: '#2c2218' },
  { id: 'face', label: 'Head', short: 'Head', emoji: '🙂', tint: '#301820' },
  { id: 'body', label: 'Body', short: 'Body', emoji: '💪', tint: '#2c1820' },
  { id: 'health', label: 'Health', short: 'Health', emoji: '💊', tint: '#30181c' },
  { id: 'clothing', label: 'Clothes', short: 'Clothes', emoji: '👕', tint: '#2c2030' },
  { id: 'accessories', label: 'Accessories', short: 'Accessories', emoji: '👜', tint: '#282030' },
  { id: 'grooming', label: 'Personal items', short: 'Personal items', emoji: '💄', tint: '#302028' },
  { id: 'weather', label: 'Weather', short: 'Weather', emoji: '🌧️', tint: '#1c242c' },
  { id: 'nature', label: 'Nature', short: 'Nature', emoji: '🌿', tint: '#1c2c18' },
  { id: 'seasons', label: 'Outdoors', short: 'Outdoors', emoji: '🍂', tint: '#242818' },
  { id: 'actions', label: 'Everyday', short: 'Everyday', emoji: '🚶', tint: '#242018' },
  { id: 'doing', label: 'Actions', short: 'Actions', emoji: '🛠️', tint: '#282418' },
  { id: 'mind', label: 'Mind', short: 'Mind', emoji: '💭', tint: '#201c24' },
  { id: 'descriptions', label: 'Feelings', short: 'Feelings', emoji: '😊', tint: '#302028' },
  { id: 'size', label: 'Adjectives', short: 'Adjectives', emoji: '📏', tint: '#282020' },
  { id: 'opposites', label: 'Opposites', short: 'Opposites', emoji: '⚖️', tint: '#241c20' },
]

export const modes: Mode[] = [
  { id: 'learn', label: 'Learn', detail: 'Scroll, see, and hear each word', emoji: '📖' },
  { id: 'choice', label: 'Multiple choice', detail: 'Pick the right word from three', emoji: '✅' },
  { id: 'type', label: 'Typing', detail: 'Type the word yourself', emoji: '⌨️' },
]

function tintFor(category: CategoryId): string {
  return categories.find((item) => item.id === category)?.tint ?? '#16120e'
}

function singleEmoji(value: string): string {
  const first = value.split('\u200D')[0] ?? value
  try {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const grapheme = [
        ...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(first),
      ][0]
      return grapheme?.segment ?? first
    }
  } catch {
    /* older browsers without grapheme splitting */
  }
  return [...first][0] ?? first
}

function word(
  id: string,
  category: CategoryId,
  emoji: string,
  en: string,
  pl: string,
  fr: string,
  es: string,
): Word {
  return { id, category, emoji: singleEmoji(emoji), tint: tintFor(category), forms: { en, pl, fr, es } }
}

export const words: Word[] = [
  word('spoon', 'kitchen', '🥄', 'spoon', 'łyżka', 'cuillère', 'cuchara'),
  word('fork', 'kitchen', '🍴', 'fork', 'widelec', 'fourchette', 'tenedor'),
  word('knife', 'kitchen', '🔪', 'knife', 'nóż', 'couteau', 'cuchillo'),
  word('plate', 'kitchen', '🍽️', 'plate', 'talerz', 'assiette', 'plato'),
  word('cup', 'kitchen', '☕', 'cup', 'kubek', 'tasse', 'taza'),
  word('bowl', 'kitchen', '🥣', 'bowl', 'miska', 'bol', 'bol'),
  word('pan', 'kitchen', '🍳', 'pan', 'patelnia', 'poêle', 'sartén'),
  word('glass', 'kitchen', '🥃', 'glass', 'szklanka', 'verre', 'vaso'),
  word('napkin', 'kitchen', '🧻', 'napkin', 'serwetka', 'serviette de table', 'servilleta'),
  word('fridge', 'kitchen', '🧊', 'fridge', 'lodówka', 'réfrigérateur', 'nevera'),
  word('oven', 'kitchen', '♨️', 'oven', 'piekarnik', 'four', 'horno'),
  word('sink', 'kitchen', '🚰', 'sink', 'zlew', 'évier', 'fregadero'),
  word('microwave', 'kitchen', '📡', 'microwave', 'mikrofalówka', 'micro-ondes', 'microondas'),
  word('trash', 'kitchen', '🗑️', 'trash can', 'kosz', 'poubelle', 'basura'),
  word('broom', 'kitchen', '🧹', 'broom', 'miotła', 'balai', 'escoba'),
  word('chair', 'furniture', '🪑', 'chair', 'krzesło', 'chaise', 'silla'),
  word('sofa', 'furniture', '🛋️', 'sofa', 'kanapa', 'canapé', 'sofá'),
  word('bed', 'furniture', '🛏️', 'bed', 'łóżko', 'lit', 'cama'),
  word('table', 'furniture', '🪵', 'table', 'stół', 'table', 'mesa'),
  word('lamp', 'furniture', '💡', 'lamp', 'lampa', 'lampe', 'lámpara'),
  word('pillow', 'furniture', '🛌', 'pillow', 'poduszka', 'oreiller', 'almohada'),
  word('blanket', 'furniture', '🧶', 'blanket', 'koc', 'couverture', 'manta'),
  word('carpet', 'furniture', '🟫', 'carpet', 'dywan', 'tapis', 'alfombra'),
  word('curtain', 'furniture', '🧵', 'curtain', 'zasłona', 'rideau', 'cortina'),
  word('shelf', 'furniture', '📚', 'shelf', 'półka', 'étagère', 'estante'),
  word('drawer', 'furniture', '🗃️', 'drawer', 'szuflada', 'tiroir', 'cajón'),
  word('clock', 'furniture', '⏰', 'clock', 'zegar', 'horloge', 'reloj'),
  word('candle', 'furniture', '🕯️', 'candle', 'świeca', 'bougie', 'vela'),
  word('houseplant', 'furniture', '🪴', 'plant', 'roślina', 'plante', 'planta'),
  word('television', 'furniture', '📺', 'television', 'telewizor', 'télévision', 'televisión'),
  word('door', 'home', '🚪', 'door', 'drzwi', 'porte', 'puerta'),
  word('window', 'home', '🪟', 'window', 'okno', 'fenêtre', 'ventana'),
  word('key', 'home', '🔑', 'key', 'klucz', 'clé', 'llave'),
  word('soap', 'home', '🧼', 'soap', 'mydło', 'savon', 'jabón'),
  word('book', 'home', '📖', 'book', 'książka', 'livre', 'libro'),
  word('phone', 'home', '📱', 'phone', 'telefon', 'téléphone', 'teléfono'),
  word('shower', 'home', '🚿', 'shower', 'prysznic', 'douche', 'ducha'),
  word('toilet', 'home', '🚽', 'toilet', 'toaleta', 'toilettes', 'váter'),
  word('towel', 'home', '🧖', 'towel', 'ręcznik', 'serviette', 'toalla'),
  word('mirror', 'home', '🪞', 'mirror', 'lustro', 'miroir', 'espejo'),
  word('washer', 'home', '🧺', 'washing machine', 'pralka', 'lave-linge', 'lavadora'),
  word('computer', 'home', '💻', 'computer', 'komputer', 'ordinateur', 'computadora'),
  word('charger', 'home', '🔌', 'charger', 'ładowarka', 'chargeur', 'cargador'),
  word('stairs', 'home', '🪜', 'stairs', 'schody', 'escalier', 'escaleras'),
  word('mailbox', 'home', '📫', 'mailbox', 'skrzynka', 'boîte aux lettres', 'buzón'),

  word('water', 'drinks', '💧', 'water', 'woda', 'eau', 'agua'),
  word('bread', 'food', '🍞', 'bread', 'chleb', 'pain', 'pan'),
  word('apple', 'fruit', '🍎', 'apple', 'jabłko', 'pomme', 'manzana'),
  word('banana', 'fruit', '🍌', 'banana', 'banan', 'banane', 'plátano'),
  word('orange', 'fruit', '🍊', 'orange', 'pomarańcza', 'orange', 'naranja'),
  word('cheese', 'food', '🧀', 'cheese', 'ser', 'fromage', 'queso'),
  word('milk', 'drinks', '🥛', 'milk', 'mleko', 'lait', 'leche'),
  word('coffee', 'drinks', '☕', 'coffee', 'kawa', 'café', 'café'),
  word('tea', 'drinks', '🍵', 'tea', 'herbata', 'thé', 'té'),
  word('wine', 'drinks', '🍷', 'wine', 'wino', 'vin', 'vino'),
  word('beer', 'drinks', '🍺', 'beer', 'piwo', 'bière', 'cerveza'),
  word('egg', 'food', '🥚', 'egg', 'jajko', 'œuf', 'huevo'),
  word('meat', 'food', '🥩', 'meat', 'mięso', 'viande', 'carne'),
  word('rice', 'food', '🍚', 'rice', 'ryż', 'riz', 'arroz'),
  word('pasta', 'food', '🍝', 'pasta', 'makaron', 'pâtes', 'pasta'),
  word('soup', 'food', '🍲', 'soup', 'zupa', 'soupe', 'sopa'),
  word('cake', 'drinks', '🍰', 'cake', 'ciasto', 'gâteau', 'pastel'),
  word('ice-cream', 'drinks', '🍦', 'ice cream', 'lody', 'glace', 'helado'),
  word('salt', 'fruit', '🧂', 'salt', 'sól', 'sel', 'sal'),
  word('honey', 'fruit', '🍯', 'honey', 'miód', 'miel', 'miel'),
  word('tomato', 'fruit', '🍅', 'tomato', 'pomidor', 'tomate', 'tomate'),
  word('potato', 'food', '🥔', 'potato', 'ziemniak', 'pomme de terre', 'patata'),
  word('carrot', 'food', '🥕', 'carrot', 'marchewka', 'carotte', 'zanahoria'),
  word('salad', 'food', '🥗', 'salad', 'sałatka', 'salade', 'ensalada'),
  word('pizza', 'food', '🍕', 'pizza', 'pizza', 'pizza', 'pizza'),
  word('burger', 'food', '🍔', 'burger', 'hamburger', 'hamburger', 'hamburguesa'),
  word('sandwich', 'food', '🥪', 'sandwich', 'kanapka', 'sandwich', 'sándwich'),
  word('chicken-food', 'food', '🍗', 'chicken', 'kurczak', 'poulet', 'pollo'),
  word('juice', 'drinks', '🧃', 'juice', 'sok', 'jus', 'jugo'),
  word('sugar', 'fruit', '🍬', 'sugar', 'cukier', 'sucre', 'azúcar'),
  word('pepper', 'fruit', '🌶️', 'pepper', 'pieprz', 'poivre', 'pimienta'),
  word('oil', 'fruit', '🫒', 'oil', 'olej', 'huile', 'aceite'),
  word('butter', 'food', '🧈', 'butter', 'masło', 'beurre', 'mantequilla'),
  word('yogurt', 'drinks', '🫙', 'yogurt', 'jogurt', 'yaourt', 'yogur'),
  word('strawberry', 'fruit', '🍓', 'strawberry', 'truskawka', 'fraise', 'fresa'),
  word('grape', 'fruit', '🍇', 'grape', 'winogrono', 'raisin', 'uva'),
  word('lemon', 'fruit', '🍋', 'lemon', 'cytryna', 'citron', 'limón'),
  word('chocolate', 'drinks', '🍫', 'chocolate', 'czekolada', 'chocolat', 'chocolate'),
  word('cookie', 'drinks', '🍪', 'cookie', 'ciastko', 'biscuit', 'galleta'),
  word('croissant', 'drinks', '🥐', 'croissant', 'rogalik', 'croissant', 'cruasán'),
  word('mushroom', 'fruit', '🍄', 'mushroom', 'grzyb', 'champignon', 'champiñón'),
  word('peach', 'fruit', '🍑', 'peach', 'brzoskwinia', 'pêche', 'melocotón'),
  word('corn', 'fruit', '🌽', 'corn', 'kukurydza', 'maïs', 'maíz'),
  word('donut', 'drinks', '🍩', 'donut', 'pączek', 'doughnut', 'donut'),
  word('popcorn', 'drinks', '🍿', 'popcorn', 'popcorn', 'pop-corn', 'palomitas'),

  word('cat', 'animals', '🐱', 'cat', 'kot', 'chat', 'gato'),
  word('dog', 'animals', '🐶', 'dog', 'pies', 'chien', 'perro'),
  word('bird', 'animals', '🐦', 'bird', 'ptak', 'oiseau', 'pájaro'),
  word('fish', 'animals', '🐟', 'fish', 'ryba', 'poisson', 'pez'),
  word('horse', 'animals', '🐴', 'horse', 'koń', 'cheval', 'caballo'),
  word('cow', 'animals', '🐮', 'cow', 'krowa', 'vache', 'vaca'),
  word('pig', 'animals', '🐷', 'pig', 'świnia', 'cochon', 'cerdo'),
  word('sheep', 'animals', '🐑', 'sheep', 'owca', 'mouton', 'oveja'),
  word('chicken', 'animals', '🐔', 'chicken', 'kura', 'poule', 'gallina'),
  word('rabbit', 'animals', '🐰', 'rabbit', 'królik', 'lapin', 'conejo'),
  word('mouse', 'animals', '🐭', 'mouse', 'mysz', 'souris', 'ratón'),
  word('frog', 'animals', '🐸', 'frog', 'żaba', 'grenouille', 'rana'),
  word('bee', 'creatures', '🐝', 'bee', 'pszczoła', 'abeille', 'abeja'),
  word('butterfly', 'creatures', '🦋', 'butterfly', 'motyl', 'papillon', 'mariposa'),
  word('bear', 'wild', '🐻', 'bear', 'niedźwiedź', 'ours', 'oso'),
  word('lion', 'wild', '🦁', 'lion', 'lew', 'lion', 'león'),
  word('duck', 'animals', '🦆', 'duck', 'kaczka', 'canard', 'pato'),
  word('elephant', 'wild', '🐘', 'elephant', 'słoń', 'éléphant', 'elefante'),
  word('snake', 'wild', '🐍', 'snake', 'wąż', 'serpent', 'serpiente'),
  word('turtle', 'wild', '🐢', 'turtle', 'żółw', 'tortue', 'tortuga'),
  word('wolf', 'wild', '🐺', 'wolf', 'wilk', 'loup', 'lobo'),
  word('fox', 'wild', '🦊', 'fox', 'lis', 'renard', 'zorro'),
  word('deer', 'wild', '🦌', 'deer', 'jeleń', 'cerf', 'ciervo'),
  word('tiger', 'wild', '🐯', 'tiger', 'tygrys', 'tigre', 'tigre'),
  word('monkey', 'wild', '🐵', 'monkey', 'małpa', 'singe', 'mono'),
  word('penguin', 'creatures', '🐧', 'penguin', 'pingwin', 'pingouin', 'pingüino'),
  word('whale', 'creatures', '🐋', 'whale', 'wieloryb', 'baleine', 'ballena'),
  word('dolphin', 'creatures', '🐬', 'dolphin', 'delfin', 'dauphin', 'delfín'),
  word('shark', 'creatures', '🦈', 'shark', 'rekin', 'requin', 'tiburón'),
  word('goat', 'animals', '🐐', 'goat', 'koza', 'chèvre', 'cabra'),
  word('donkey', 'animals', '🫏', 'donkey', 'osioł', 'âne', 'burro'),
  word('owl', 'creatures', '🦉', 'owl', 'sowa', 'hibou', 'búho'),
  word('spider', 'creatures', '🕷️', 'spider', 'pająk', 'araignée', 'araña'),
  word('ant', 'creatures', '🐜', 'ant', 'mrówka', 'fourmi', 'hormiga'),
  word('crab', 'creatures', '🦀', 'crab', 'krab', 'crabe', 'cangrejo'),
  word('octopus', 'creatures', '🐙', 'octopus', 'ośmiornica', 'pieuvre', 'pulpo'),
  word('panda', 'wild', '🐼', 'panda', 'panda', 'panda', 'panda'),
  word('zebra', 'wild', '🦓', 'zebra', 'zebra', 'zèbre', 'cebra'),
  word('giraffe', 'wild', '🦒', 'giraffe', 'żyrafa', 'girafe', 'jirafa'),
  word('kangaroo', 'wild', '🦘', 'kangaroo', 'kangur', 'kangourou', 'canguro'),
  word('squirrel', 'wild', '🐿️', 'squirrel', 'wiewiórka', 'écureuil', 'ardilla'),
  word('swan', 'creatures', '🦢', 'swan', 'łabędź', 'cygne', 'cisne'),
  word('crocodile', 'creatures', '🐊', 'crocodile', 'krokodyl', 'crocodile', 'cocodrilo'),
  word('camel', 'creatures', '🐪', 'camel', 'wielbłąd', 'chameau', 'camello'),
  word('seal', 'creatures', '🦭', 'seal', 'foka', 'phoque', 'foca'),

  word('car', 'transport', '🚗', 'car', 'samochód', 'voiture', 'coche'),
  word('bus', 'transport', '🚌', 'bus', 'autobus', 'bus', 'autobús'),
  word('train', 'transport', '🚆', 'train', 'pociąg', 'train', 'tren'),
  word('bicycle', 'transport', '🚲', 'bicycle', 'rower', 'vélo', 'bicicleta'),
  word('taxi', 'transport', '🚕', 'taxi', 'taksówka', 'taxi', 'taxi'),
  word('airplane', 'transport', '✈️', 'airplane', 'samolot', 'avion', 'avión'),
  word('boat', 'transport', '⛵', 'boat', 'łódź', 'bateau', 'barco'),
  word('metro', 'transport', '🚇', 'metro', 'metro', 'métro', 'metro'),
  word('motorcycle', 'transport', '🏍️', 'motorcycle', 'motocykl', 'moto', 'motocicleta'),
  word('traffic-light', 'transport', '🚦', 'traffic light', 'światła', 'feu', 'semáforo'),
  word('road', 'transport', '🛣️', 'road', 'droga', 'route', 'carretera'),
  word('bridge', 'transport', '🌉', 'bridge', 'most', 'pont', 'puente'),
  word('map', 'streets', '🗺️', 'map', 'mapa', 'carte', 'mapa'),
  word('station', 'streets', '🚉', 'station', 'dworzec', 'gare', 'estación'),
  word('ticket', 'streets', '🎫', 'ticket', 'bilet', 'billet', 'billete'),
  word('suitcase', 'streets', '🧳', 'suitcase', 'walizka', 'valise', 'maleta'),
  word('hotel', 'streets', '🏨', 'hotel', 'hotel', 'hôtel', 'hotel'),
  word('shop', 'city', '🏪', 'shop', 'sklep', 'magasin', 'tienda'),
  word('school', 'city', '🏫', 'school', 'szkoła', 'école', 'escuela'),
  word('hospital', 'city', '🏥', 'hospital', 'szpital', 'hôpital', 'hospital'),
  word('library', 'city', '📚', 'library', 'biblioteka', 'bibliothèque', 'biblioteca'),
  word('bank', 'city', '🏦', 'bank', 'bank', 'banque', 'banco'),
  word('church', 'city', '⛪', 'church', 'kościół', 'église', 'iglesia'),
  word('airport', 'streets', '🛫', 'airport', 'lotnisko', 'aéroport', 'aeropuerto'),
  word('park', 'streets', '🛝', 'park', 'park', 'parc', 'parque'),
  word('street', 'streets', '🏘️', 'street', 'ulica', 'rue', 'calle'),
  word('parking', 'transport', '🅿️', 'parking', 'parking', 'parking', 'aparcamiento'),
  word('tram', 'transport', '🚊', 'tram', 'tramwaj', 'tram', 'tranvía'),
  word('truck', 'transport', '🚚', 'truck', 'ciężarówka', 'camion', 'camión'),
  word('stop', 'streets', '🛑', 'stop', 'stop', 'stop', 'stop'),
  word('museum', 'city', '🏛️', 'museum', 'muzeum', 'musée', 'museo'),
  word('cafe', 'city', '🧋', 'cafe', 'kawiarnia', 'café', 'café'),
  word('post-office', 'city', '📮', 'post office', 'poczta', 'poste', 'correos'),
  word('market', 'city', '🛒', 'market', 'targ', 'marché', 'mercado'),
  word('fountain', 'streets', '⛲', 'fountain', 'fontanna', 'fontaine', 'fuente'),
  word('office', 'city', '🏢', 'office', 'biuro', 'bureau', 'oficina'),
  word('gas-station', 'streets', '⛽', 'gas station', 'stacja', 'station-service', 'gasolinera'),
  word('elevator', 'streets', '🛗', 'elevator', 'winda', 'ascenseur', 'ascensor'),
  word('harbor', 'streets', '⚓', 'harbor', 'port', 'port', 'puerto'),
  word('factory', 'city', '🏭', 'factory', 'fabryka', 'usine', 'fábrica'),
  word('restaurant', 'city', '🍜', 'restaurant', 'restauracja', 'restaurant', 'restaurante'),
  word('crosswalk', 'streets', '🚸', 'crosswalk', 'przejście', 'passage piéton', 'paso de peatones'),
  word('pharmacy', 'city', '⚕️', 'pharmacy', 'apteka', 'pharmacie', 'farmacia'),
  word('plaza', 'streets', '🟦', 'square', 'plac', 'place', 'plaza'),
  word('stadium', 'city', '🏟️', 'stadium', 'stadion', 'stade', 'estadio'),

  word('man', 'people', '👨', 'man', 'mężczyzna', 'homme', 'hombre'),
  word('woman', 'people', '👩', 'woman', 'kobieta', 'femme', 'mujer'),
  word('boy', 'people', '👦', 'boy', 'chłopiec', 'garçon', 'chico'),
  word('girl', 'people', '👧', 'girl', 'dziewczynka', 'fille', 'niña'),
  word('baby', 'people', '👶', 'baby', 'niemowlę', 'bébé', 'bebé'),
  word('child', 'people', '🧒', 'child', 'dziecko', 'enfant', 'niño'),
  word('mother', 'people', '👩', 'mother', 'matka', 'mère', 'madre'),
  word('father', 'people', '👨', 'father', 'ojciec', 'père', 'padre'),
  word('brother', 'people', '👦', 'brother', 'brat', 'frère', 'hermano'),
  word('sister', 'people', '👧', 'sister', 'siostra', 'sœur', 'hermana'),
  word('grandmother', 'people', '👵', 'grandmother', 'babcia', 'grand-mère', 'abuela'),
  word('grandfather', 'people', '👴', 'grandfather', 'dziadek', 'grand-père', 'abuelo'),
  word('family', 'people', '👪', 'family', 'rodzina', 'famille', 'familia'),
  word('friend', 'relatives', '🤝', 'friend', 'przyjaciel', 'ami', 'amigo'),
  word('teacher', 'relatives', '✏️', 'teacher', 'nauczyciel', 'enseignant', 'maestro'),
  word('doctor', 'relatives', '🩺', 'doctor', 'lekarz', 'médecin', 'médico'),
  word('student', 'relatives', '🎓', 'student', 'uczeń', 'élève', 'estudiante'),
  word('cook', 'jobs', '🍳', 'cook', 'kucharz', 'cuisinier', 'cocinero'),
  word('police', 'relatives', '👮', 'police officer', 'policjant', 'policier', 'policía'),
  word('nurse', 'relatives', '🩺', 'nurse', 'pielęgniarka', 'infirmière', 'enfermera'),
  word('aunt', 'relatives', '👩', 'aunt', 'ciocia', 'tante', 'tía'),
  word('uncle', 'relatives', '👨', 'uncle', 'wujek', 'oncle', 'tío'),
  word('cousin', 'relatives', '🧒', 'cousin', 'kuzyn', 'cousin', 'primo'),
  word('husband', 'relatives', '🤵', 'husband', 'mąż', 'mari', 'esposo'),
  word('wife', 'relatives', '👰', 'wife', 'żona', 'épouse', 'esposa'),
  word('son', 'people', '👦', 'son', 'syn', 'fils', 'hijo'),
  word('daughter', 'people', '👧', 'daughter', 'córka', 'fille', 'hija'),
  word('neighbor', 'relatives', '🏡', 'neighbor', 'sąsiad', 'voisin', 'vecino'),
  word('boss', 'jobs', '👔', 'boss', 'szef', 'patron', 'jefe'),
  word('waiter', 'jobs', '🍽️', 'waiter', 'kelner', 'serveur', 'camarero'),
  word('farmer', 'jobs', '🚜', 'farmer', 'rolnik', 'agriculteur', 'granjero'),
  word('driver', 'jobs', '🚗', 'driver', 'kierowca', 'chauffeur', 'conductor'),
  word('singer', 'jobs', '🎤', 'singer', 'piosenkarz', 'chanteur', 'cantante'),
  word('artist', 'jobs', '🎨', 'artist', 'artysta', 'artiste', 'artista'),
  word('athlete', 'jobs', '🏅', 'athlete', 'sportowiec', 'athlète', 'atleta'),
  word('firefighter', 'jobs', '🚒', 'firefighter', 'strażak', 'pompier', 'bombero'),
  word('engineer', 'jobs', '🛠️', 'engineer', 'inżynier', 'ingénieur', 'ingeniero'),
  word('soldier', 'jobs', '🪖', 'soldier', 'żołnierz', 'soldat', 'soldado'),
  word('tourist', 'relatives', '📷', 'tourist', 'turysta', 'touriste', 'turista'),
  word('guest', 'relatives', '🛎️', 'guest', 'gość', 'invité', 'invitado'),
  word('lawyer', 'jobs', '⚖️', 'lawyer', 'prawnik', 'avocat', 'abogado'),
  word('mechanic', 'jobs', '🔧', 'mechanic', 'mechanik', 'mécanicien', 'mecánico'),
  word('dentist', 'relatives', '😁', 'dentist', 'dentysta', 'dentiste', 'dentista'),
  word('photographer', 'jobs', '📸', 'photographer', 'fotograf', 'photographe', 'fotógrafo'),
  word('journalist', 'jobs', '📰', 'journalist', 'dziennikarz', 'journaliste', 'periodista'),

  word('head', 'face', '🗣️', 'head', 'głowa', 'tête', 'cabeza'),
  word('eye', 'face', '👁️', 'eye', 'oko', 'œil', 'ojo'),
  word('ear', 'face', '👂', 'ear', 'ucho', 'oreille', 'oreja'),
  word('nose', 'face', '👃', 'nose', 'nos', 'nez', 'nariz'),
  word('mouth', 'face', '👄', 'mouth', 'usta', 'bouche', 'boca'),
  word('tooth', 'face', '🦷', 'tooth', 'ząb', 'dent', 'diente'),
  word('hand', 'body', '✋', 'hand', 'ręka', 'main', 'mano'),
  word('foot', 'body', '🦶', 'foot', 'stopa', 'pied', 'pie'),
  word('arm', 'body', '💪', 'arm', 'ramię', 'bras', 'brazo'),
  word('leg', 'body', '🦵', 'leg', 'noga', 'jambe', 'pierna'),
  word('heart', 'body', '❤️', 'heart', 'serce', 'cœur', 'corazón'),
  word('brain', 'body', '🧠', 'brain', 'mózg', 'cerveau', 'cerebro'),
  word('bone', 'body', '🦴', 'bone', 'kość', 'os', 'hueso'),
  word('blood', 'body', '🩸', 'blood', 'krew', 'sang', 'sangre'),
  word('medicine', 'health', '💊', 'medicine', 'lek', 'médicament', 'medicamento'),
  word('bandage', 'health', '🩹', 'bandage', 'plaster', 'pansement', 'tirita'),
  word('thermometer', 'health', '🌡️', 'thermometer', 'termometr', 'thermomètre', 'termómetro'),
  word('ambulance', 'health', '🚑', 'ambulance', 'karetka', 'ambulance', 'ambulancia'),
  word('mask', 'health', '😷', 'mask', 'maseczka', 'masque', 'mascarilla'),
  word('vaccine', 'health', '💉', 'vaccine', 'szczepionka', 'vaccin', 'vacuna'),
  word('hair', 'face', '💇', 'hair', 'włosy', 'cheveux', 'pelo'),
  word('face', 'face', '🙂', 'face', 'twarz', 'visage', 'cara'),
  word('neck', 'face', '🧣', 'neck', 'szyja', 'cou', 'cuello'),
  word('shoulder', 'face', '🤷', 'shoulder', 'bark', 'épaule', 'hombro'),
  word('finger', 'face', '☝️', 'finger', 'palec', 'doigt', 'dedo'),
  word('knee', 'body', '🦵', 'knee', 'kolano', 'genou', 'rodilla'),
  word('back', 'body', '🔙', 'back', 'plecy', 'dos', 'espalda'),
  word('stomach', 'body', '🤢', 'stomach', 'brzuch', 'ventre', 'estómago'),
  word('skin', 'face', '🧴', 'skin', 'skóra', 'peau', 'piel'),
  word('fever', 'health', '🤒', 'fever', 'gorączka', 'fièvre', 'fiebre'),
  word('cough', 'health', '🤧', 'cough', 'kaszel', 'toux', 'tos'),
  word('pain', 'health', '😣', 'pain', 'ból', 'douleur', 'dolor'),
  word('tongue', 'face', '👅', 'tongue', 'język', 'langue', 'lengua'),
  word('lungs', 'body', '🫁', 'lungs', 'płuca', 'poumons', 'pulmones'),
  word('health', 'health', '💚', 'health', 'zdrowie', 'santé', 'salud'),
  word('muscle', 'body', '💪', 'muscle', 'mięsień', 'muscle', 'músculo'),
  word('throat', 'face', '🗣️', 'throat', 'gardło', 'gorge', 'garganta'),
  word('wrist', 'body', '⌚', 'wrist', 'nadgarstek', 'poignet', 'muñeca'),
  word('sick', 'health', '🤮', 'sick', 'chory', 'malade', 'enfermo'),
  word('injury', 'health', '🤕', 'injury', 'rana', 'blessure', 'herida'),
  word('vitamin', 'health', '🍊', 'vitamin', 'witamina', 'vitamine', 'vitamina'),
  word('appointment', 'health', '📅', 'appointment', 'wizyta', 'rendez-vous', 'cita'),
  word('rest', 'health', '😌', 'rest', 'odpoczynek', 'repos', 'descanso'),
  word('smile', 'face', '😁', 'smile', 'uśmiech', 'sourire', 'sonrisa'),
  word('ankle', 'body', '🦶', 'ankle', 'kostka', 'cheville', 'tobillo'),

  word('shirt', 'clothing', '👕', 'shirt', 'koszula', 'chemise', 'camisa'),
  word('pants', 'clothing', '👖', 'pants', 'spodnie', 'pantalon', 'pantalones'),
  word('dress', 'clothing', '👗', 'dress', 'sukienka', 'robe', 'vestido'),
  word('coat', 'clothing', '🧥', 'coat', 'płaszcz', 'manteau', 'abrigo'),
  word('socks', 'clothing', '🧦', 'socks', 'skarpety', 'chaussettes', 'calcetines'),
  word('shoes', 'clothing', '👟', 'shoes', 'buty', 'chaussures', 'zapatos'),
  word('boots', 'clothing', '🥾', 'boots', 'kozaki', 'bottes', 'botas'),
  word('hat', 'clothing', '🧢', 'hat', 'czapka', 'casquette', 'gorra'),
  word('glasses', 'accessories', '👓', 'glasses', 'okulary', 'lunettes', 'gafas'),
  word('watch', 'accessories', '⌚', 'watch', 'zegarek', 'montre', 'reloj'),
  word('bag', 'accessories', '👜', 'bag', 'torba', 'sac', 'bolsa'),
  word('backpack', 'accessories', '🎒', 'backpack', 'plecak', 'sac à dos', 'mochila'),
  word('umbrella', 'accessories', '☂️', 'umbrella', 'parasol', 'parapluie', 'paraguas'),
  word('ring', 'accessories', '💍', 'ring', 'pierścionek', 'bague', 'anillo'),
  word('necklace', 'accessories', '📿', 'necklace', 'naszyjnik', 'collier', 'collar'),
  word('comb', 'grooming', '🪮', 'comb', 'grzebień', 'peigne', 'peine'),
  word('lipstick', 'grooming', '💄', 'lipstick', 'szminka', 'rouge à lèvres', 'pintalabios'),
  word('toothbrush', 'grooming', '🪥', 'toothbrush', 'szczoteczka', 'brosse à dents', 'cepillo'),
  word('scarf', 'clothing', '🧣', 'scarf', 'szalik', 'écharpe', 'bufanda'),
  word('gloves', 'clothing', '🧤', 'gloves', 'rękawiczki', 'gants', 'guantes'),
  word('jacket', 'clothing', '🧥', 'jacket', 'kurtka', 'veste', 'chaqueta'),
  word('sweater', 'clothing', '🧶', 'sweater', 'sweter', 'pull', 'suéter'),
  word('skirt', 'clothing', '👗', 'skirt', 'spódnica', 'jupe', 'falda'),
  word('shorts', 'clothing', '🩳', 'shorts', 'szorty', 'short', 'pantalones cortos'),
  word('pajamas', 'grooming', '👘', 'pajamas', 'piżama', 'pyjama', 'pijama'),
  word('belt', 'accessories', '🎗️', 'belt', 'pasek', 'ceinture', 'cinturón'),
  word('tie', 'accessories', '👔', 'tie', 'krawat', 'cravate', 'corbata'),
  word('earrings', 'accessories', '💎', 'earrings', 'kolczyki', 'boucles d’oreilles', 'pendientes'),
  word('wallet', 'accessories', '👛', 'wallet', 'portfel', 'portefeuille', 'cartera'),
  word('perfume', 'grooming', '💐', 'perfume', 'perfumy', 'parfum', 'perfume'),
  word('slippers', 'grooming', '🥿', 'slippers', 'kapcie', 'pantoufles', 'zapatillas'),
  word('sandals', 'grooming', '👡', 'sandals', 'sandały', 'sandales', 'sandalias'),
  word('hoodie', 'grooming', '👕', 'hoodie', 'bluza', 'sweat', 'sudadera'),
  word('makeup', 'grooming', '💅', 'makeup', 'makijaż', 'maquillage', 'maquillaje'),
  word('button', 'grooming', '🔘', 'button', 'guzik', 'bouton', 'botón'),
  word('bikini', 'grooming', '👙', 'swimsuit', 'kostium', 'maillot', 'bañador'),
  word('bracelet', 'grooming', '📿', 'bracelet', 'bransoletka', 'bracelet', 'pulsera'),
  word('helmet', 'accessories', '⛑️', 'helmet', 'kask', 'casque', 'casco'),
  word('jeans', 'clothing', '👖', 'jeans', 'dżinsy', 'jean', 'vaqueros'),
  word('raincoat', 'accessories', '☔', 'raincoat', 'płaszcz przeciwdeszczowy', 'imperméable', 'chubasquero'),
  word('sunglasses', 'accessories', '🕶️', 'sunglasses', 'okulary przeciwsłoneczne', 'lunettes de soleil', 'gafas de sol'),
  word('hairbrush', 'grooming', '🪮', 'hairbrush', 'szczotka', 'brosse', 'cepillo'),
  word('pocket', 'accessories', '👖', 'pocket', 'kieszeń', 'poche', 'bolsillo'),
  word('uniform', 'grooming', '💂', 'uniform', 'mundur', 'uniforme', 'uniforme'),
  word('diaper', 'grooming', '🧷', 'diaper', 'pieluszka', 'couche', 'pañal'),

  word('sun', 'weather', '☀️', 'sun', 'słońce', 'soleil', 'sol'),
  word('moon', 'weather', '🌙', 'moon', 'księżyc', 'lune', 'luna'),
  word('star', 'weather', '⭐', 'star', 'gwiazda', 'étoile', 'estrella'),
  word('cloud', 'weather', '☁️', 'cloud', 'chmura', 'nuage', 'nube'),
  word('rain', 'weather', '🌧️', 'rain', 'deszcz', 'pluie', 'lluvia'),
  word('snow', 'weather', '❄️', 'snow', 'śnieg', 'neige', 'nieve'),
  word('wind', 'weather', '💨', 'wind', 'wiatr', 'vent', 'viento'),
  word('storm', 'weather', '⛈️', 'storm', 'burza', 'orage', 'tormenta'),
  word('tree', 'nature', '🌳', 'tree', 'drzewo', 'arbre', 'árbol'),
  word('flower', 'nature', '🌸', 'flower', 'kwiat', 'fleur', 'flor'),
  word('grass', 'nature', '🌿', 'grass', 'trawa', 'herbe', 'hierba'),
  word('mountain', 'nature', '⛰️', 'mountain', 'góra', 'montagne', 'montaña'),
  word('river', 'nature', '🏞️', 'river', 'rzeka', 'rivière', 'río'),
  word('sea', 'nature', '🌊', 'sea', 'morze', 'mer', 'mar'),
  word('fire', 'seasons', '🔥', 'fire', 'ogień', 'feu', 'fuego'),
  word('earth', 'seasons', '🌍', 'earth', 'ziemia', 'terre', 'tierra'),
  word('leaf', 'seasons', '🍃', 'leaf', 'liść', 'feuille', 'hoja'),
  word('forest', 'nature', '🌲', 'forest', 'las', 'forêt', 'bosque'),
  word('rainbow', 'weather', '🌈', 'rainbow', 'tęcza', 'arc-en-ciel', 'arcoíris'),
  word('weather', 'weather', '⛅', 'weather', 'pogoda', 'temps', 'tiempo'),
  word('sky', 'weather', '🌌', 'sky', 'niebo', 'ciel', 'cielo'),
  word('lake', 'nature', '🛶', 'lake', 'jezioro', 'lac', 'lago'),
  word('beach', 'nature', '🏖️', 'beach', 'plaża', 'plage', 'playa'),
  word('sand', 'nature', '⏳', 'sand', 'piasek', 'sable', 'arena'),
  word('rock', 'nature', '🪨', 'rock', 'kamień', 'rocher', 'piedra'),
  word('island', 'nature', '🏝️', 'island', 'wyspa', 'île', 'isla'),
  word('desert', 'nature', '🏜️', 'desert', 'pustynia', 'désert', 'desierto'),
  word('volcano', 'nature', '🌋', 'volcano', 'wulkan', 'volcan', 'volcán'),
  word('lightning', 'weather', '⚡', 'lightning', 'błyskawica', 'éclair', 'relámpago'),
  word('fog', 'weather', '🌫️', 'fog', 'mgła', 'brouillard', 'niebla'),
  word('ice', 'weather', '🧊', 'ice', 'lód', 'glace', 'hielo'),
  word('spring', 'seasons', '🌱', 'spring', 'wiosna', 'printemps', 'primavera'),
  word('autumn', 'seasons', '🍂', 'autumn', 'jesień', 'automne', 'otoño'),
  word('summer', 'seasons', '🌞', 'summer', 'lato', 'été', 'verano'),
  word('winter', 'seasons', '⛄', 'winter', 'zima', 'hiver', 'inverno'),
  word('garden', 'seasons', '🏡', 'garden', 'ogród', 'jardin', 'jardín'),
  word('cave', 'seasons', '🕳️', 'cave', 'jaskinia', 'grotte', 'cueva'),
  word('sunrise', 'seasons', '🌅', 'sunrise', 'wschód słońca', 'lever du soleil', 'amanecer'),
  word('sunset', 'seasons', '🌇', 'sunset', 'zachód słońca', 'coucher du soleil', 'atardecer'),
  word('thunder', 'weather', '🌩️', 'thunder', 'grzmot', 'tonnerre', 'trueno'),
  word('wave', 'seasons', '🌊', 'wave', 'fala', 'vague', 'ola'),
  word('pond', 'seasons', '🐸', 'pond', 'staw', 'étang', 'estanque'),
  word('valley', 'seasons', '🏕️', 'valley', 'dolina', 'vallée', 'valle'),
  word('hill', 'seasons', '🏔️', 'hill', 'wzgórze', 'colline', 'colina'),
  word('field', 'nature', '🌾', 'field', 'pole', 'champ', 'campo'),

  word('eat', 'actions', '🍽️', 'eat', 'jeść', 'manger', 'comer'),
  word('drink', 'actions', '🥤', 'drink', 'pić', 'boire', 'beber'),
  word('sleep', 'actions', '😴', 'sleep', 'spać', 'dormir', 'dormir'),
  word('walk', 'actions', '🚶', 'walk', 'chodzić', 'marcher', 'caminar'),
  word('run', 'actions', '🏃', 'run', 'biegać', 'courir', 'correr'),
  word('sit', 'actions', '💺', 'sit', 'siedzieć', 's’asseoir', 'sentarse'),
  word('stand', 'actions', '🧍', 'stand', 'stać', 'se tenir', 'pararse'),
  word('read', 'actions', '📖', 'read', 'czytać', 'lire', 'leer'),
  word('write', 'actions', '✍️', 'write', 'pisać', 'écrire', 'escribir'),
  word('speak', 'actions', '💬', 'speak', 'mówić', 'parler', 'hablar'),
  word('listen', 'actions', '🎧', 'listen', 'słuchać', 'écouter', 'escuchar'),
  word('see', 'actions', '👀', 'see', 'widzieć', 'voir', 'ver'),
  word('cook-action', 'actions', '🍳', 'cook', 'gotować', 'cuisiner', 'cocinar'),
  word('wash', 'actions', '🫧', 'wash', 'myć', 'laver', 'lavar'),
  word('buy', 'actions', '🛒', 'buy', 'kupować', 'acheter', 'comprar'),
  word('work', 'doing', '💼', 'work', 'pracować', 'travailler', 'trabajar'),
  word('play', 'doing', '🎮', 'play', 'grać', 'jouer', 'jugar'),
  word('open', 'doing', '📬', 'open', 'otwierać', 'ouvrir', 'abrir'),
  word('close', 'doing', '🔐', 'close', 'zamykać', 'fermer', 'cerrar'),
  word('give', 'doing', '🤲', 'give', 'dawać', 'donner', 'dar'),
  word('come', 'doing', '➡️', 'come', 'przychodzić', 'venir', 'venir'),
  word('go', 'doing', '🚶', 'go', 'iść', 'aller', 'ir'),
  word('wait', 'doing', '⏳', 'wait', 'czekać', 'attendre', 'esperar'),
  word('help', 'doing', '🆘', 'help', 'pomagać', 'aider', 'ayudar'),
  word('look', 'doing', '👀', 'look', 'patrzeć', 'regarder', 'mirar'),
  word('take', 'doing', '📥', 'take', 'brać', 'prendre', 'tomar'),
  word('put', 'doing', '📤', 'put', 'kłaść', 'mettre', 'poner'),
  word('find', 'doing', '🔎', 'find', 'znajdować', 'trouver', 'encontrar'),
  word('lose', 'doing', '🕳️', 'lose', 'gubić', 'perdre', 'perder'),
  word('start', 'doing', '▶️', 'start', 'zaczynać', 'commencer', 'empezar'),
  word('stop-action', 'mind', '⏹️', 'stop', 'przestawać', 'arrêter', 'parar'),
  word('think', 'mind', '💭', 'think', 'myśleć', 'penser', 'pensar'),
  word('know', 'mind', '💡', 'know', 'wiedzieć', 'savoir', 'saber'),
  word('want', 'mind', '🙏', 'want', 'chcieć', 'vouloir', 'querer'),
  word('need', 'mind', '📌', 'need', 'potrzebować', 'avoir besoin', 'necesitar'),
  word('like', 'mind', '❤️', 'like', 'lubić', 'aimer', 'gustar'),
  word('ask', 'mind', '❓', 'ask', 'pytać', 'demander', 'preguntar'),
  word('answer-action', 'mind', '💬', 'answer', 'odpowiadać', 'répondre', 'responder'),
  word('call', 'mind', '📞', 'call', 'dzwonić', 'appeler', 'llamar'),
  word('send', 'mind', '📨', 'send', 'wysyłać', 'envoyer', 'enviar'),
  word('learn', 'mind', '📘', 'learn', 'uczyć się', 'apprendre', 'aprender'),
  word('teach', 'mind', '📝', 'teach', 'uczyć', 'enseigner', 'enseñar'),
  word('remember', 'mind', '🧠', 'remember', 'pamiętać', 'se souvenir', 'recordar'),
  word('forget', 'mind', '🌫️', 'forget', 'zapominać', 'oublier', 'olvidar'),
  word('laugh', 'mind', '😂', 'laugh', 'śmiać się', 'rire', 'reír'),

  word('big', 'size', '🔼', 'big', 'duży', 'grand', 'grande'),
  word('small', 'size', '🔽', 'small', 'mały', 'petit', 'pequeño'),
  word('hot', 'size', '🥵', 'hot', 'gorący', 'chaud', 'caliente'),
  word('cold', 'size', '🥶', 'cold', 'zimny', 'froid', 'frío'),
  word('happy', 'descriptions', '😊', 'happy', 'szczęśliwy', 'heureux', 'feliz'),
  word('sad', 'descriptions', '😢', 'sad', 'smutny', 'triste', 'triste'),
  word('angry', 'descriptions', '😠', 'angry', 'wściekły', 'fâché', 'enfadado'),
  word('tired', 'descriptions', '😫', 'tired', 'zmęczony', 'fatigué', 'cansado'),
  word('hungry', 'descriptions', '😋', 'hungry', 'głodny', 'affamé', 'hambriento'),
  word('thirsty', 'descriptions', '🥤', 'thirsty', 'spragniony', 'assoiffé', 'sediento'),
  word('beautiful', 'descriptions', '✨', 'beautiful', 'piękny', 'beau', 'hermoso'),
  word('new', 'size', '🆕', 'new', 'nowy', 'nouveau', 'nuevo'),
  word('old', 'size', '🧓', 'old', 'stary', 'vieux', 'viejo'),
  word('good', 'descriptions', '👍', 'good', 'dobry', 'bon', 'bueno'),
  word('bad', 'opposites', '👎', 'bad', 'zły', 'mauvais', 'malo'),
  word('fast', 'size', '⚡', 'fast', 'szybki', 'rapide', 'rápido'),
  word('slow', 'size', '🐌', 'slow', 'wolny', 'lent', 'lento'),
  word('easy', 'size', '🟢', 'easy', 'łatwy', 'facile', 'fácil'),
  word('difficult', 'size', '🧩', 'difficult', 'trudny', 'difficile', 'difícil'),
  word('love', 'descriptions', '💕', 'love', 'miłość', 'amour', 'amor'),
  word('long', 'size', '📏', 'long', 'długi', 'long', 'largo'),
  word('short', 'size', '📌', 'short', 'krótki', 'court', 'corto'),
  word('tall', 'size', '🦒', 'tall', 'wysoki', 'haut', 'alto'),
  word('young', 'size', '🐥', 'young', 'młody', 'jeune', 'joven'),
  word('expensive', 'opposites', '💎', 'expensive', 'drogi', 'cher', 'caro'),
  word('cheap', 'opposites', '🪙', 'cheap', 'tani', 'pas cher', 'barato'),
  word('clean', 'opposites', '✨', 'clean', 'czysty', 'propre', 'limpio'),
  word('dirty', 'opposites', '🦨', 'dirty', 'brudny', 'sale', 'sucio'),
  word('full', 'opposites', '🌕', 'full', 'pełny', 'plein', 'lleno'),
  word('empty', 'opposites', '🕳️', 'empty', 'pusty', 'vide', 'vacío'),
  word('strong', 'opposites', '💪', 'strong', 'silny', 'fort', 'fuerte'),
  word('weak', 'opposites', '🫠', 'weak', 'słaby', 'faible', 'débil'),
  word('loud', 'opposites', '📢', 'loud', 'głośny', 'bruyant', 'ruidoso'),
  word('quiet', 'opposites', '🤫', 'quiet', 'cichy', 'silencieux', 'silencioso'),
  word('dark', 'opposites', '🌑', 'dark', 'ciemny', 'sombre', 'oscuro'),
  word('bright', 'opposites', '🌟', 'bright', 'jasny', 'clair', 'claro'),
  word('left', 'opposites', '⬅️', 'left', 'lewy', 'gauche', 'izquierdo'),
  word('right', 'opposites', '➡️', 'right', 'prawy', 'droit', 'derecho'),
  word('busy', 'descriptions', '📅', 'busy', 'zajęty', 'occupé', 'ocupado'),
  word('free', 'descriptions', '🆓', 'free', 'wolny', 'libre', 'libre'),
  word('kind', 'descriptions', '🤗', 'kind', 'miły', 'gentil', 'amable'),
  word('funny', 'descriptions', '🤡', 'funny', 'śmieszny', 'drôle', 'gracioso'),
  word('scared', 'descriptions', '😨', 'scared', 'przestraszony', 'effrayé', 'asustado'),
  word('surprised', 'descriptions', '😲', 'surprised', 'zaskoczony', 'surpris', 'sorprendido'),
  word('warm', 'size', '🌤️', 'warm', 'ciepły', 'tiède', 'templado'),
]

export function getLanguage(code: LangCode): LanguageOption {
  const language = languages.find((item) => item.code === code)
  if (!language) throw new Error(`Unknown language ${code}`)
  return language
}

export function getCategory(id: CategoryId): Category {
  const category = categories.find((item) => item.id === id)
  if (!category) throw new Error(`Unknown category ${id}`)
  return category
}

export function wordsInCategory(
  id: CategoryId,
  knownIds: Iterable<string> = [],
  knownOnly = false,
): Word[] {
  const known = new Set(knownIds)
  return words.filter((item) => {
    if (item.category !== id) return false
    return knownOnly ? known.has(item.id) : !known.has(item.id)
  })
}

export function isLangCode(value: string): value is LangCode {
  return languages.some((language) => language.code === value)
}

export function isCategoryId(value: string): value is CategoryId {
  return categories.some((category) => category.id === value)
}

export function isModeId(value: string): value is ModeId {
  return modes.some((mode) => mode.id === value)
}
