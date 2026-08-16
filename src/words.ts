export type LangCode = 'en' | 'pl' | 'fr' | 'es'
export type CategoryId =
  | 'home'
  | 'food'
  | 'animals'
  | 'city'
  | 'people'
  | 'body'
  | 'clothing'
  | 'nature'
  | 'actions'
  | 'descriptions'
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
  { id: 'home', label: 'Home', short: 'Home', emoji: '🏠', tint: '#2c241c' },
  { id: 'food', label: 'Food & Drink', short: 'Food', emoji: '🍽️', tint: '#3a2418' },
  { id: 'animals', label: 'Animals', short: 'Animals', emoji: '🐾', tint: '#243018' },
  { id: 'city', label: 'City & Transport', short: 'City', emoji: '🏙️', tint: '#1a2430' },
  { id: 'people', label: 'People & Family', short: 'People', emoji: '👪', tint: '#3a2820' },
  { id: 'body', label: 'Body & Health', short: 'Body', emoji: '💪', tint: '#301820' },
  { id: 'clothing', label: 'Clothing & Personal Items', short: 'Clothes', emoji: '👕', tint: '#2c2030' },
  { id: 'nature', label: 'Nature & Weather', short: 'Nature', emoji: '🌿', tint: '#1c2c18' },
  { id: 'actions', label: 'Everyday Actions', short: 'Actions', emoji: '🏃', tint: '#242018' },
  { id: 'descriptions', label: 'Descriptions & Emotions', short: 'Feelings', emoji: '😊', tint: '#302028' },
]

export const modes: Mode[] = [
  { id: 'learn', label: 'Learn', detail: 'Scroll, see, and hear each word', emoji: '📖' },
  { id: 'choice', label: 'Multiple choice', detail: 'Pick the right word from three', emoji: '✅' },
  { id: 'type', label: 'Typing', detail: 'Type the word yourself', emoji: '⌨️' },
]

function tintFor(category: CategoryId): string {
  return categories.find((item) => item.id === category)?.tint ?? '#16120e'
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
  return { id, category, emoji, tint: tintFor(category), forms: { en, pl, fr, es } }
}

export const words: Word[] = [
  word('spoon', 'home', '🥄', 'spoon', 'łyżka', 'cuillère', 'cuchara'),
  word('fork', 'home', '🍴', 'fork', 'widelec', 'fourchette', 'tenedor'),
  word('knife', 'home', '🔪', 'knife', 'nóż', 'couteau', 'cuchillo'),
  word('plate', 'home', '🍽️', 'plate', 'talerz', 'assiette', 'plato'),
  word('cup', 'home', '☕', 'cup', 'kubek', 'tasse', 'taza'),
  word('chair', 'home', '🪑', 'chair', 'krzesło', 'chaise', 'silla'),
  word('sofa', 'home', '🛋️', 'sofa', 'kanapa', 'canapé', 'sofá'),
  word('bed', 'home', '🛏️', 'bed', 'łóżko', 'lit', 'cama'),
  word('door', 'home', '🚪', 'door', 'drzwi', 'porte', 'puerta'),
  word('window', 'home', '🪟', 'window', 'okno', 'fenêtre', 'ventana'),
  word('key', 'home', '🔑', 'key', 'klucz', 'clé', 'llave'),
  word('lamp', 'home', '💡', 'lamp', 'lampa', 'lampe', 'lámpara'),
  word('clock', 'home', '⏰', 'clock', 'zegar', 'horloge', 'reloj'),
  word('soap', 'home', '🧼', 'soap', 'mydło', 'savon', 'jabón'),
  word('book', 'home', '📖', 'book', 'książka', 'livre', 'libro'),
  word('phone', 'home', '📱', 'phone', 'telefon', 'téléphone', 'teléfono'),
  word('shower', 'home', '🚿', 'shower', 'prysznic', 'douche', 'ducha'),
  word('toilet', 'home', '🚽', 'toilet', 'toaleta', 'toilettes', 'váter'),
  word('television', 'home', '📺', 'television', 'telewizor', 'télévision', 'televisión'),
  word('broom', 'home', '🧹', 'broom', 'miotła', 'balai', 'escoba'),

  word('water', 'food', '💧', 'water', 'woda', 'eau', 'agua'),
  word('bread', 'food', '🍞', 'bread', 'chleb', 'pain', 'pan'),
  word('apple', 'food', '🍎', 'apple', 'jabłko', 'pomme', 'manzana'),
  word('banana', 'food', '🍌', 'banana', 'banan', 'banane', 'plátano'),
  word('orange', 'food', '🍊', 'orange', 'pomarańcza', 'orange', 'naranja'),
  word('cheese', 'food', '🧀', 'cheese', 'ser', 'fromage', 'queso'),
  word('milk', 'food', '🥛', 'milk', 'mleko', 'lait', 'leche'),
  word('coffee', 'food', '☕', 'coffee', 'kawa', 'café', 'café'),
  word('tea', 'food', '🍵', 'tea', 'herbata', 'thé', 'té'),
  word('wine', 'food', '🍷', 'wine', 'wino', 'vin', 'vino'),
  word('beer', 'food', '🍺', 'beer', 'piwo', 'bière', 'cerveza'),
  word('egg', 'food', '🥚', 'egg', 'jajko', 'œuf', 'huevo'),
  word('meat', 'food', '🥩', 'meat', 'mięso', 'viande', 'carne'),
  word('rice', 'food', '🍚', 'rice', 'ryż', 'riz', 'arroz'),
  word('pasta', 'food', '🍝', 'pasta', 'makaron', 'pâtes', 'pasta'),
  word('soup', 'food', '🍲', 'soup', 'zupa', 'soupe', 'sopa'),
  word('cake', 'food', '🍰', 'cake', 'ciasto', 'gâteau', 'pastel'),
  word('ice-cream', 'food', '🍦', 'ice cream', 'lody', 'glace', 'helado'),
  word('salt', 'food', '🧂', 'salt', 'sól', 'sel', 'sal'),
  word('honey', 'food', '🍯', 'honey', 'miód', 'miel', 'miel'),

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
  word('bee', 'animals', '🐝', 'bee', 'pszczoła', 'abeille', 'abeja'),
  word('butterfly', 'animals', '🦋', 'butterfly', 'motyl', 'papillon', 'mariposa'),
  word('bear', 'animals', '🐻', 'bear', 'niedźwiedź', 'ours', 'oso'),
  word('lion', 'animals', '🦁', 'lion', 'lew', 'lion', 'león'),
  word('duck', 'animals', '🦆', 'duck', 'kaczka', 'canard', 'pato'),
  word('elephant', 'animals', '🐘', 'elephant', 'słoń', 'éléphant', 'elefante'),
  word('snake', 'animals', '🐍', 'snake', 'wąż', 'serpent', 'serpiente'),
  word('turtle', 'animals', '🐢', 'turtle', 'żółw', 'tortue', 'tortuga'),

  word('car', 'city', '🚗', 'car', 'samochód', 'voiture', 'coche'),
  word('bus', 'city', '🚌', 'bus', 'autobus', 'bus', 'autobús'),
  word('train', 'city', '🚆', 'train', 'pociąg', 'train', 'tren'),
  word('bicycle', 'city', '🚲', 'bicycle', 'rower', 'vélo', 'bicicleta'),
  word('taxi', 'city', '🚕', 'taxi', 'taksówka', 'taxi', 'taxi'),
  word('airplane', 'city', '✈️', 'airplane', 'samolot', 'avion', 'avión'),
  word('boat', 'city', '⛵', 'boat', 'łódź', 'bateau', 'barco'),
  word('metro', 'city', '🚇', 'metro', 'metro', 'métro', 'metro'),
  word('motorcycle', 'city', '🏍️', 'motorcycle', 'motocykl', 'moto', 'motocicleta'),
  word('traffic-light', 'city', '🚦', 'traffic light', 'światła', 'feu', 'semáforo'),
  word('road', 'city', '🛣️', 'road', 'droga', 'route', 'carretera'),
  word('bridge', 'city', '🌉', 'bridge', 'most', 'pont', 'puente'),
  word('map', 'city', '🗺️', 'map', 'mapa', 'carte', 'mapa'),
  word('station', 'city', '🚉', 'station', 'dworzec', 'gare', 'estación'),
  word('ticket', 'city', '🎫', 'ticket', 'bilet', 'billet', 'billete'),
  word('suitcase', 'city', '🧳', 'suitcase', 'walizka', 'valise', 'maleta'),
  word('hotel', 'city', '🏨', 'hotel', 'hotel', 'hôtel', 'hotel'),
  word('shop', 'city', '🏪', 'shop', 'sklep', 'magasin', 'tienda'),
  word('school', 'city', '🏫', 'school', 'szkoła', 'école', 'escuela'),
  word('hospital', 'city', '🏥', 'hospital', 'szpital', 'hôpital', 'hospital'),

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
  word('friend', 'people', '🤝', 'friend', 'przyjaciel', 'ami', 'amigo'),
  word('teacher', 'people', '👩‍🏫', 'teacher', 'nauczyciel', 'enseignant', 'maestro'),
  word('doctor', 'people', '👨‍⚕️', 'doctor', 'lekarz', 'médecin', 'médico'),
  word('student', 'people', '🎓', 'student', 'uczeń', 'élève', 'estudiante'),
  word('cook', 'people', '🧑‍🍳', 'cook', 'kucharz', 'cuisinier', 'cocinero'),
  word('police', 'people', '👮', 'police officer', 'policjant', 'policier', 'policía'),
  word('nurse', 'people', '🩺', 'nurse', 'pielęgniarka', 'infirmière', 'enfermera'),

  word('head', 'body', '🗣️', 'head', 'głowa', 'tête', 'cabeza'),
  word('eye', 'body', '👁️', 'eye', 'oko', 'œil', 'ojo'),
  word('ear', 'body', '👂', 'ear', 'ucho', 'oreille', 'oreja'),
  word('nose', 'body', '👃', 'nose', 'nos', 'nez', 'nariz'),
  word('mouth', 'body', '👄', 'mouth', 'usta', 'bouche', 'boca'),
  word('tooth', 'body', '🦷', 'tooth', 'ząb', 'dent', 'diente'),
  word('hand', 'body', '✋', 'hand', 'ręka', 'main', 'mano'),
  word('foot', 'body', '🦶', 'foot', 'stopa', 'pied', 'pie'),
  word('arm', 'body', '💪', 'arm', 'ramię', 'bras', 'brazo'),
  word('leg', 'body', '🦵', 'leg', 'noga', 'jambe', 'pierna'),
  word('heart', 'body', '❤️', 'heart', 'serce', 'cœur', 'corazón'),
  word('brain', 'body', '🧠', 'brain', 'mózg', 'cerveau', 'cerebro'),
  word('bone', 'body', '🦴', 'bone', 'kość', 'os', 'hueso'),
  word('blood', 'body', '🩸', 'blood', 'krew', 'sang', 'sangre'),
  word('medicine', 'body', '💊', 'medicine', 'lek', 'médicament', 'medicamento'),
  word('bandage', 'body', '🩹', 'bandage', 'plaster', 'pansement', 'tirita'),
  word('thermometer', 'body', '🌡️', 'thermometer', 'termometr', 'thermomètre', 'termómetro'),
  word('ambulance', 'body', '🚑', 'ambulance', 'karetka', 'ambulance', 'ambulancia'),
  word('mask', 'body', '😷', 'mask', 'maseczka', 'masque', 'mascarilla'),
  word('vaccine', 'body', '💉', 'vaccine', 'szczepionka', 'vaccin', 'vacuna'),

  word('shirt', 'clothing', '👕', 'shirt', 'koszula', 'chemise', 'camisa'),
  word('pants', 'clothing', '👖', 'pants', 'spodnie', 'pantalon', 'pantalones'),
  word('dress', 'clothing', '👗', 'dress', 'sukienka', 'robe', 'vestido'),
  word('coat', 'clothing', '🧥', 'coat', 'płaszcz', 'manteau', 'abrigo'),
  word('socks', 'clothing', '🧦', 'socks', 'skarpety', 'chaussettes', 'calcetines'),
  word('shoes', 'clothing', '👟', 'shoes', 'buty', 'chaussures', 'zapatos'),
  word('boots', 'clothing', '🥾', 'boots', 'kozaki', 'bottes', 'botas'),
  word('hat', 'clothing', '🧢', 'hat', 'czapka', 'casquette', 'gorra'),
  word('glasses', 'clothing', '👓', 'glasses', 'okulary', 'lunettes', 'gafas'),
  word('watch', 'clothing', '⌚', 'watch', 'zegarek', 'montre', 'reloj'),
  word('bag', 'clothing', '👜', 'bag', 'torba', 'sac', 'bolsa'),
  word('backpack', 'clothing', '🎒', 'backpack', 'plecak', 'sac à dos', 'mochila'),
  word('umbrella', 'clothing', '☂️', 'umbrella', 'parasol', 'parapluie', 'paraguas'),
  word('ring', 'clothing', '💍', 'ring', 'pierścionek', 'bague', 'anillo'),
  word('necklace', 'clothing', '📿', 'necklace', 'naszyjnik', 'collier', 'collar'),
  word('comb', 'clothing', '🪮', 'comb', 'grzebień', 'peigne', 'peine'),
  word('lipstick', 'clothing', '💄', 'lipstick', 'szminka', 'rouge à lèvres', 'pintalabios'),
  word('toothbrush', 'clothing', '🪥', 'toothbrush', 'szczoteczka', 'brosse à dents', 'cepillo'),
  word('scarf', 'clothing', '🧣', 'scarf', 'szalik', 'écharpe', 'bufanda'),
  word('gloves', 'clothing', '🧤', 'gloves', 'rękawiczki', 'gants', 'guantes'),

  word('sun', 'nature', '☀️', 'sun', 'słońce', 'soleil', 'sol'),
  word('moon', 'nature', '🌙', 'moon', 'księżyc', 'lune', 'luna'),
  word('star', 'nature', '⭐', 'star', 'gwiazda', 'étoile', 'estrella'),
  word('cloud', 'nature', '☁️', 'cloud', 'chmura', 'nuage', 'nube'),
  word('rain', 'nature', '🌧️', 'rain', 'deszcz', 'pluie', 'lluvia'),
  word('snow', 'nature', '❄️', 'snow', 'śnieg', 'neige', 'nieve'),
  word('wind', 'nature', '💨', 'wind', 'wiatr', 'vent', 'viento'),
  word('storm', 'nature', '⛈️', 'storm', 'burza', 'orage', 'tormenta'),
  word('tree', 'nature', '🌳', 'tree', 'drzewo', 'arbre', 'árbol'),
  word('flower', 'nature', '🌸', 'flower', 'kwiat', 'fleur', 'flor'),
  word('grass', 'nature', '🌿', 'grass', 'trawa', 'herbe', 'hierba'),
  word('mountain', 'nature', '⛰️', 'mountain', 'góra', 'montagne', 'montaña'),
  word('river', 'nature', '🏞️', 'river', 'rzeka', 'rivière', 'río'),
  word('sea', 'nature', '🌊', 'sea', 'morze', 'mer', 'mar'),
  word('fire', 'nature', '🔥', 'fire', 'ogień', 'feu', 'fuego'),
  word('earth', 'nature', '🌍', 'earth', 'ziemia', 'terre', 'tierra'),
  word('leaf', 'nature', '🍃', 'leaf', 'liść', 'feuille', 'hoja'),
  word('forest', 'nature', '🌲', 'forest', 'las', 'forêt', 'bosque'),
  word('rainbow', 'nature', '🌈', 'rainbow', 'tęcza', 'arc-en-ciel', 'arcoíris'),
  word('weather', 'nature', '⛅', 'weather', 'pogoda', 'temps', 'tiempo'),

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
  word('work', 'actions', '💼', 'work', 'pracować', 'travailler', 'trabajar'),
  word('play', 'actions', '🎮', 'play', 'grać', 'jouer', 'jugar'),
  word('open', 'actions', '📬', 'open', 'otwierać', 'ouvrir', 'abrir'),
  word('close', 'actions', '🔐', 'close', 'zamykać', 'fermer', 'cerrar'),
  word('give', 'actions', '🤲', 'give', 'dawać', 'donner', 'dar'),

  word('big', 'descriptions', '🔼', 'big', 'duży', 'grand', 'grande'),
  word('small', 'descriptions', '🔽', 'small', 'mały', 'petit', 'pequeño'),
  word('hot', 'descriptions', '🥵', 'hot', 'gorący', 'chaud', 'caliente'),
  word('cold', 'descriptions', '🥶', 'cold', 'zimny', 'froid', 'frío'),
  word('happy', 'descriptions', '😊', 'happy', 'szczęśliwy', 'heureux', 'feliz'),
  word('sad', 'descriptions', '😢', 'sad', 'smutny', 'triste', 'triste'),
  word('angry', 'descriptions', '😠', 'angry', 'wściekły', 'fâché', 'enfadado'),
  word('tired', 'descriptions', '😫', 'tired', 'zmęczony', 'fatigué', 'cansado'),
  word('hungry', 'descriptions', '😋', 'hungry', 'głodny', 'affamé', 'hambriento'),
  word('thirsty', 'descriptions', '🥤', 'thirsty', 'spragniony', 'assoiffé', 'sediento'),
  word('beautiful', 'descriptions', '✨', 'beautiful', 'piękny', 'beau', 'hermoso'),
  word('new', 'descriptions', '🆕', 'new', 'nowy', 'nouveau', 'nuevo'),
  word('old', 'descriptions', '🧓', 'old', 'stary', 'vieux', 'viejo'),
  word('good', 'descriptions', '👍', 'good', 'dobry', 'bon', 'bueno'),
  word('bad', 'descriptions', '👎', 'bad', 'zły', 'mauvais', 'malo'),
  word('fast', 'descriptions', '⚡', 'fast', 'szybki', 'rapide', 'rápido'),
  word('slow', 'descriptions', '🐌', 'slow', 'wolny', 'lent', 'lento'),
  word('easy', 'descriptions', '🟢', 'easy', 'łatwy', 'facile', 'fácil'),
  word('difficult', 'descriptions', '🧩', 'difficult', 'trudny', 'difficile', 'difícil'),
  word('love', 'descriptions', '💕', 'love', 'miłość', 'amour', 'amor'),
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
