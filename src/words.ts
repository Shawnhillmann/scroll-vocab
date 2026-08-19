import { examplesFor, type Example } from './examples.ts'

export type LangCode = 'en' | 'pl'
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
  | 'jobs'
  | 'body'
  | 'face'
  | 'health'
  | 'clothing'
  | 'accessories'
  | 'nature'
  | 'weather'
  | 'actions'
  | 'doing'
  | 'descriptions'
  | 'size'
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

export type { Example }

export type Word = {
  id: string
  category: CategoryId
  emoji: string
  tint: string
  forms: Record<LangCode, string>
  examples: Example[]
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
]

export const categories: Category[] = [
  { id: 'kitchen', label: 'Kitchen', short: 'Kitchen', emoji: '🍳', tint: '#3a2418' },
  { id: 'furniture', label: 'Furniture', short: 'Furniture', emoji: '🛋️', tint: '#2c241c' },
  { id: 'home', label: 'Home', short: 'Home', emoji: '🏠', tint: '#2a2218' },
  { id: 'fruit', label: 'Fruit', short: 'Fruit', emoji: '🍎', tint: '#3a2018' },
  { id: 'food', label: 'Food', short: 'Food', emoji: '🍽️', tint: '#3a2418' },
  { id: 'drinks', label: 'Drinks & sweets', short: 'Drinks & sweets', emoji: '☕', tint: '#301c14' },
  { id: 'animals', label: 'Pets & farm', short: 'Pets & farm', emoji: '🐶', tint: '#243018' },
  { id: 'wild', label: 'Wild animals', short: 'Wild animals', emoji: '🦁', tint: '#2a2814' },
  { id: 'creatures', label: 'Sea & bugs', short: 'Sea & bugs', emoji: '🐙', tint: '#182830' },
  { id: 'transport', label: 'Transport', short: 'Transport', emoji: '🚗', tint: '#1a2430' },
  { id: 'city', label: 'Places', short: 'Places', emoji: '🏙️', tint: '#1c2030' },
  { id: 'streets', label: 'Travel', short: 'Travel', emoji: '🧳', tint: '#182028' },
  { id: 'people', label: 'Family', short: 'Family', emoji: '👪', tint: '#3a2820' },
  { id: 'jobs', label: 'Jobs', short: 'Jobs', emoji: '💼', tint: '#2c2218' },
  { id: 'face', label: 'Face', short: 'Face', emoji: '🙂', tint: '#301820' },
  { id: 'body', label: 'Body', short: 'Body', emoji: '💪', tint: '#2c1820' },
  { id: 'health', label: 'Health', short: 'Health', emoji: '💊', tint: '#30181c' },
  { id: 'clothing', label: 'Clothes', short: 'Clothes', emoji: '👕', tint: '#2c2030' },
  { id: 'accessories', label: 'Accessories', short: 'Accessories', emoji: '👜', tint: '#282030' },
  { id: 'weather', label: 'Weather', short: 'Weather', emoji: '🌧️', tint: '#1c242c' },
  { id: 'nature', label: 'Nature', short: 'Nature', emoji: '🌿', tint: '#1c2c18' },
  { id: 'actions', label: 'Everyday', short: 'Everyday', emoji: '🚶', tint: '#242018' },
  { id: 'doing', label: 'Actions', short: 'Actions', emoji: '🔎', tint: '#282418' },
  { id: 'descriptions', label: 'Feelings', short: 'Feelings', emoji: '😊', tint: '#302028' },
  { id: 'size', label: 'Adjectives', short: 'Adjectives', emoji: '📏', tint: '#282020' },
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
): Word {
  return {
    id,
    category,
    emoji: singleEmoji(emoji),
    tint: tintFor(category),
    forms: { en, pl },
    examples: examplesFor(id).slice(0, 3),
  }
}

export const words: Word[] = [
  word('spoon', 'kitchen', '🥄', 'spoon', 'łyżka'),
  word('fork', 'kitchen', '🍴', 'fork', 'widelec'),
  word('knife', 'kitchen', '🔪', 'knife', 'nóż'),
  word('plate', 'kitchen', '🍽️', 'plate', 'talerz'),
  word('bowl', 'kitchen', '🥣', 'bowl', 'miska'),
  word('pan', 'kitchen', '🍳', 'pan', 'patelnia'),
  word('glass', 'kitchen', '🥃', 'glass', 'szklanka'),
  word('trash', 'kitchen', '🗑️', 'trash can', 'kosz'),
  word('broom', 'kitchen', '🧹', 'broom', 'miotła'),
  word('chair', 'furniture', '🪑', 'chair', 'krzesło'),
  word('sofa', 'furniture', '🛋️', 'sofa', 'kanapa'),
  word('bed', 'furniture', '🛏️', 'bed', 'łóżko'),
  word('lamp', 'furniture', '💡', 'lamp', 'lampa'),
  word('clock', 'furniture', '⏰', 'clock', 'zegar'),
  word('candle', 'furniture', '🕯️', 'candle', 'świeca'),
  word('houseplant', 'furniture', '🪴', 'plant', 'roślina'),
  word('television', 'furniture', '📺', 'television', 'telewizor'),
  word('door', 'home', '🚪', 'door', 'drzwi'),
  word('window', 'home', '🪟', 'window', 'okno'),
  word('key', 'home', '🔑', 'key', 'klucz'),
  word('soap', 'home', '🧼', 'soap', 'mydło'),
  word('book', 'home', '📖', 'book', 'książka'),
  word('phone', 'home', '📱', 'phone', 'telefon'),
  word('shower', 'home', '🚿', 'shower', 'prysznic'),
  word('toilet', 'home', '🚽', 'toilet', 'toaleta'),
  word('mirror', 'home', '🪞', 'mirror', 'lustro'),
  word('computer', 'home', '💻', 'computer', 'komputer'),
  word('charger', 'home', '🔌', 'charger', 'ładowarka'),
  word('mailbox', 'home', '📫', 'mailbox', 'skrzynka'),
  word('elevator', 'home', '🛗', 'elevator', 'winda'),
  word('apple', 'fruit', '🍎', 'apple', 'jabłko'),
  word('banana', 'fruit', '🍌', 'banana', 'banan'),
  word('orange', 'fruit', '🍊', 'orange', 'pomarańcza'),
  word('strawberry', 'fruit', '🍓', 'strawberry', 'truskawka'),
  word('grape', 'fruit', '🍇', 'grape', 'winogrono'),
  word('lemon', 'fruit', '🍋', 'lemon', 'cytryna'),
  word('peach', 'fruit', '🍑', 'peach', 'brzoskwinia'),
  word('bread', 'food', '🍞', 'bread', 'chleb'),
  word('cheese', 'food', '🧀', 'cheese', 'ser'),
  word('egg', 'food', '🥚', 'egg', 'jajko'),
  word('meat', 'food', '🥩', 'meat', 'mięso'),
  word('rice', 'food', '🍚', 'rice', 'ryż'),
  word('pasta', 'food', '🍝', 'pasta', 'makaron'),
  word('soup', 'food', '🍲', 'soup', 'zupa'),
  word('salad', 'food', '🥗', 'salad', 'sałatka'),
  word('pizza', 'food', '🍕', 'pizza', 'pizza'),
  word('burger', 'food', '🍔', 'burger', 'hamburger'),
  word('sandwich', 'food', '🥪', 'sandwich', 'kanapka'),
  word('chicken-food', 'food', '🍗', 'chicken', 'kurczak'),
  word('potato', 'food', '🥔', 'potato', 'ziemniak'),
  word('carrot', 'food', '🥕', 'carrot', 'marchewka'),
  word('butter', 'food', '🧈', 'butter', 'masło'),
  word('tomato', 'food', '🍅', 'tomato', 'pomidor'),
  word('mushroom', 'food', '🍄', 'mushroom', 'grzyb'),
  word('corn', 'food', '🌽', 'corn', 'kukurydza'),
  word('honey', 'food', '🍯', 'honey', 'miód'),
  word('salt', 'food', '🧂', 'salt', 'sól'),
  word('water', 'drinks', '💧', 'water', 'woda'),
  word('milk', 'drinks', '🥛', 'milk', 'mleko'),
  word('coffee', 'drinks', '☕', 'coffee', 'kawa'),
  word('tea', 'drinks', '🍵', 'tea', 'herbata'),
  word('wine', 'drinks', '🍷', 'wine', 'wino'),
  word('beer', 'drinks', '🍺', 'beer', 'piwo'),
  word('juice', 'drinks', '🧃', 'juice', 'sok'),
  word('cake', 'drinks', '🍰', 'cake', 'ciasto'),
  word('ice-cream', 'drinks', '🍦', 'ice cream', 'lody'),
  word('chocolate', 'drinks', '🍫', 'chocolate', 'czekolada'),
  word('cookie', 'drinks', '🍪', 'cookie', 'ciastko'),
  word('croissant', 'drinks', '🥐', 'croissant', 'rogalik'),
  word('donut', 'drinks', '🍩', 'donut', 'pączek'),
  word('popcorn', 'drinks', '🍿', 'popcorn', 'popcorn'),
  word('cat', 'animals', '🐱', 'cat', 'kot'),
  word('dog', 'animals', '🐶', 'dog', 'pies'),
  word('bird', 'animals', '🐦', 'bird', 'ptak'),
  word('fish', 'animals', '🐟', 'fish', 'ryba'),
  word('horse', 'animals', '🐴', 'horse', 'koń'),
  word('cow', 'animals', '🐮', 'cow', 'krowa'),
  word('pig', 'animals', '🐷', 'pig', 'świnia'),
  word('sheep', 'animals', '🐑', 'sheep', 'owca'),
  word('chicken', 'animals', '🐔', 'chicken', 'kura'),
  word('rabbit', 'animals', '🐰', 'rabbit', 'królik'),
  word('mouse', 'animals', '🐭', 'mouse', 'mysz'),
  word('duck', 'animals', '🦆', 'duck', 'kaczka'),
  word('goat', 'animals', '🐐', 'goat', 'koza'),
  word('donkey', 'animals', '🫏', 'donkey', 'osioł'),
  word('bear', 'wild', '🐻', 'bear', 'niedźwiedź'),
  word('lion', 'wild', '🦁', 'lion', 'lew'),
  word('elephant', 'wild', '🐘', 'elephant', 'słoń'),
  word('snake', 'wild', '🐍', 'snake', 'wąż'),
  word('turtle', 'wild', '🐢', 'turtle', 'żółw'),
  word('wolf', 'wild', '🐺', 'wolf', 'wilk'),
  word('fox', 'wild', '🦊', 'fox', 'lis'),
  word('deer', 'wild', '🦌', 'deer', 'jeleń'),
  word('tiger', 'wild', '🐯', 'tiger', 'tygrys'),
  word('monkey', 'wild', '🐵', 'monkey', 'małpa'),
  word('panda', 'wild', '🐼', 'panda', 'panda'),
  word('zebra', 'wild', '🦓', 'zebra', 'zebra'),
  word('giraffe', 'wild', '🦒', 'giraffe', 'żyrafa'),
  word('kangaroo', 'wild', '🦘', 'kangaroo', 'kangur'),
  word('squirrel', 'wild', '🐿️', 'squirrel', 'wiewiórka'),
  word('crocodile', 'wild', '🐊', 'crocodile', 'krokodyl'),
  word('camel', 'wild', '🐪', 'camel', 'wielbłąd'),
  word('frog', 'wild', '🐸', 'frog', 'żaba'),
  word('penguin', 'creatures', '🐧', 'penguin', 'pingwin'),
  word('whale', 'creatures', '🐋', 'whale', 'wieloryb'),
  word('dolphin', 'creatures', '🐬', 'dolphin', 'delfin'),
  word('shark', 'creatures', '🦈', 'shark', 'rekin'),
  word('crab', 'creatures', '🦀', 'crab', 'krab'),
  word('octopus', 'creatures', '🐙', 'octopus', 'ośmiornica'),
  word('seal', 'creatures', '🦭', 'seal', 'foka'),
  word('swan', 'creatures', '🦢', 'swan', 'łabędź'),
  word('bee', 'creatures', '🐝', 'bee', 'pszczoła'),
  word('butterfly', 'creatures', '🦋', 'butterfly', 'motyl'),
  word('spider', 'creatures', '🕷️', 'spider', 'pająk'),
  word('ant', 'creatures', '🐜', 'ant', 'mrówka'),
  word('owl', 'creatures', '🦉', 'owl', 'sowa'),
  word('car', 'transport', '🚗', 'car', 'samochód'),
  word('bus', 'transport', '🚌', 'bus', 'autobus'),
  word('train', 'transport', '🚆', 'train', 'pociąg'),
  word('bicycle', 'transport', '🚲', 'bicycle', 'rower'),
  word('taxi', 'transport', '🚕', 'taxi', 'taksówka'),
  word('airplane', 'transport', '✈️', 'airplane', 'samolot'),
  word('boat', 'transport', '⛵', 'boat', 'łódź'),
  word('metro', 'transport', '🚇', 'metro', 'metro'),
  word('motorcycle', 'transport', '🏍️', 'motorcycle', 'motocykl'),
  word('tram', 'transport', '🚊', 'tram', 'tramwaj'),
  word('truck', 'transport', '🚚', 'truck', 'ciężarówka'),
  word('traffic-light', 'transport', '🚦', 'traffic light', 'światła'),
  word('road', 'transport', '🛣️', 'road', 'droga'),
  word('parking', 'transport', '🅿️', 'parking', 'parking'),
  word('shop', 'city', '🏪', 'shop', 'sklep'),
  word('school', 'city', '🏫', 'school', 'szkoła'),
  word('hospital', 'city', '🏥', 'hospital', 'szpital'),
  word('library', 'city', '📚', 'library', 'biblioteka'),
  word('bank', 'city', '🏦', 'bank', 'bank'),
  word('church', 'city', '⛪', 'church', 'kościół'),
  word('museum', 'city', '🏛️', 'museum', 'muzeum'),
  word('office', 'city', '🏢', 'office', 'biuro'),
  word('factory', 'city', '🏭', 'factory', 'fabryka'),
  word('stadium', 'city', '🏟️', 'stadium', 'stadion'),
  word('market', 'city', '🛒', 'market', 'targ'),
  word('post-office', 'city', '📮', 'post office', 'poczta'),
  word('pharmacy', 'city', '⚕️', 'pharmacy', 'apteka'),
  word('hotel', 'city', '🏨', 'hotel', 'hotel'),
  word('gas-station', 'city', '⛽', 'gas station', 'stacja'),
  word('map', 'streets', '🗺️', 'map', 'mapa'),
  word('station', 'streets', '🚉', 'station', 'dworzec'),
  word('ticket', 'streets', '🎫', 'ticket', 'bilet'),
  word('suitcase', 'streets', '🧳', 'suitcase', 'walizka'),
  word('airport', 'streets', '🛫', 'airport', 'lotnisko'),
  word('fountain', 'streets', '⛲', 'fountain', 'fontanna'),
  word('stop', 'streets', '🛑', 'stop', 'stop'),
  word('bridge', 'streets', '🌉', 'bridge', 'most'),
  word('man', 'people', '👨', 'man', 'mężczyzna'),
  word('woman', 'people', '👩', 'woman', 'kobieta'),
  word('boy', 'people', '👦', 'boy', 'chłopiec'),
  word('girl', 'people', '👧', 'girl', 'dziewczynka'),
  word('baby', 'people', '👶', 'baby', 'niemowlę'),
  word('child', 'people', '🧒', 'child', 'dziecko'),
  word('grandmother', 'people', '👵', 'grandmother', 'babcia'),
  word('grandfather', 'people', '👴', 'grandfather', 'dziadek'),
  word('family', 'people', '👪', 'family', 'rodzina'),
  word('husband', 'people', '🤵', 'husband', 'mąż'),
  word('wife', 'people', '👰', 'wife', 'żona'),
  word('friend', 'people', '🤝', 'friend', 'przyjaciel'),
  word('student', 'people', '🎓', 'student', 'uczeń'),
  word('police', 'jobs', '👮', 'police officer', 'policjant'),
  word('doctor', 'jobs', '🩺', 'doctor', 'lekarz'),
  word('farmer', 'jobs', '🚜', 'farmer', 'rolnik'),
  word('singer', 'jobs', '🎤', 'singer', 'piosenkarz'),
  word('artist', 'jobs', '🎨', 'artist', 'artysta'),
  word('firefighter', 'jobs', '🚒', 'firefighter', 'strażak'),
  word('soldier', 'jobs', '🪖', 'soldier', 'żołnierz'),
  word('mechanic', 'jobs', '🔧', 'mechanic', 'mechanik'),
  word('photographer', 'jobs', '📸', 'photographer', 'fotograf'),
  word('journalist', 'jobs', '📰', 'journalist', 'dziennikarz'),
  word('lawyer', 'jobs', '⚖️', 'lawyer', 'prawnik'),
  word('head', 'face', '🗣️', 'head', 'głowa'),
  word('eye', 'face', '👁️', 'eye', 'oko'),
  word('ear', 'face', '👂', 'ear', 'ucho'),
  word('nose', 'face', '👃', 'nose', 'nos'),
  word('mouth', 'face', '👄', 'mouth', 'usta'),
  word('tooth', 'face', '🦷', 'tooth', 'ząb'),
  word('face', 'face', '🙂', 'face', 'twarz'),
  word('tongue', 'face', '👅', 'tongue', 'język'),
  word('smile', 'face', '😁', 'smile', 'uśmiech'),
  word('finger', 'face', '☝️', 'finger', 'palec'),
  word('hand', 'body', '✋', 'hand', 'ręka'),
  word('foot', 'body', '🦶', 'foot', 'stopa'),
  word('arm', 'body', '💪', 'arm', 'ramię'),
  word('leg', 'body', '🦵', 'leg', 'noga'),
  word('heart', 'body', '❤️', 'heart', 'serce'),
  word('brain', 'body', '🧠', 'brain', 'mózg'),
  word('bone', 'body', '🦴', 'bone', 'kość'),
  word('blood', 'body', '🩸', 'blood', 'krew'),
  word('lungs', 'body', '🫁', 'lungs', 'płuca'),
  word('medicine', 'health', '💊', 'medicine', 'lek'),
  word('bandage', 'health', '🩹', 'bandage', 'plaster'),
  word('thermometer', 'health', '🌡️', 'thermometer', 'termometr'),
  word('ambulance', 'health', '🚑', 'ambulance', 'karetka'),
  word('mask', 'health', '😷', 'mask', 'maseczka'),
  word('vaccine', 'health', '💉', 'vaccine', 'szczepionka'),
  word('fever', 'health', '🤒', 'fever', 'gorączka'),
  word('cough', 'health', '🤧', 'cough', 'kaszel'),
  word('pain', 'health', '😣', 'pain', 'ból'),
  word('sick', 'health', '🤮', 'sick', 'chory'),
  word('injury', 'health', '🤕', 'injury', 'rana'),
  word('shirt', 'clothing', '👕', 'shirt', 'koszula'),
  word('pants', 'clothing', '👖', 'pants', 'spodnie'),
  word('dress', 'clothing', '👗', 'dress', 'sukienka'),
  word('coat', 'clothing', '🧥', 'coat', 'płaszcz'),
  word('socks', 'clothing', '🧦', 'socks', 'skarpety'),
  word('shoes', 'clothing', '👟', 'shoes', 'buty'),
  word('boots', 'clothing', '🥾', 'boots', 'kozaki'),
  word('hat', 'clothing', '🧢', 'hat', 'czapka'),
  word('scarf', 'clothing', '🧣', 'scarf', 'szalik'),
  word('gloves', 'clothing', '🧤', 'gloves', 'rękawiczki'),
  word('shorts', 'clothing', '🩳', 'shorts', 'szorty'),
  word('slippers', 'clothing', '🥿', 'slippers', 'kapcie'),
  word('sandals', 'clothing', '👡', 'sandals', 'sandały'),
  word('bikini', 'clothing', '👙', 'swimsuit', 'kostium'),
  word('glasses', 'accessories', '👓', 'glasses', 'okulary'),
  word('watch', 'accessories', '⌚', 'watch', 'zegarek'),
  word('bag', 'accessories', '👜', 'bag', 'torba'),
  word('backpack', 'accessories', '🎒', 'backpack', 'plecak'),
  word('umbrella', 'accessories', '☂️', 'umbrella', 'parasol'),
  word('ring', 'accessories', '💍', 'ring', 'pierścionek'),
  word('wallet', 'accessories', '👛', 'wallet', 'portfel'),
  word('tie', 'accessories', '👔', 'tie', 'krawat'),
  word('sunglasses', 'accessories', '🕶️', 'sunglasses', 'okulary przeciwsłoneczne'),
  word('helmet', 'accessories', '⛑️', 'helmet', 'kask'),
  word('comb', 'accessories', '🪮', 'comb', 'grzebień'),
  word('lipstick', 'accessories', '💄', 'lipstick', 'szminka'),
  word('toothbrush', 'accessories', '🪥', 'toothbrush', 'szczoteczka'),
  word('sun', 'weather', '☀️', 'sun', 'słońce'),
  word('moon', 'weather', '🌙', 'moon', 'księżyc'),
  word('star', 'weather', '⭐', 'star', 'gwiazda'),
  word('cloud', 'weather', '☁️', 'cloud', 'chmura'),
  word('rain', 'weather', '🌧️', 'rain', 'deszcz'),
  word('snow', 'weather', '❄️', 'snow', 'śnieg'),
  word('wind', 'weather', '💨', 'wind', 'wiatr'),
  word('storm', 'weather', '⛈️', 'storm', 'burza'),
  word('rainbow', 'weather', '🌈', 'rainbow', 'tęcza'),
  word('lightning', 'weather', '⚡', 'lightning', 'błyskawica'),
  word('fog', 'weather', '🌫️', 'fog', 'mgła'),
  word('ice', 'weather', '🧊', 'ice', 'lód'),
  word('thunder', 'weather', '🌩️', 'thunder', 'grzmot'),
  word('sunrise', 'weather', '🌅', 'sunrise', 'wschód słońca'),
  word('sunset', 'weather', '🌇', 'sunset', 'zachód słońca'),
  word('weather', 'weather', '⛅', 'weather', 'pogoda'),
  word('tree', 'nature', '🌳', 'tree', 'drzewo'),
  word('flower', 'nature', '🌸', 'flower', 'kwiat'),
  word('grass', 'nature', '🌿', 'grass', 'trawa'),
  word('mountain', 'nature', '⛰️', 'mountain', 'góra'),
  word('sea', 'nature', '🌊', 'sea', 'morze'),
  word('forest', 'nature', '🌲', 'forest', 'las'),
  word('beach', 'nature', '🏖️', 'beach', 'plaża'),
  word('rock', 'nature', '🪨', 'rock', 'kamień'),
  word('island', 'nature', '🏝️', 'island', 'wyspa'),
  word('desert', 'nature', '🏜️', 'desert', 'pustynia'),
  word('volcano', 'nature', '🌋', 'volcano', 'wulkan'),
  word('field', 'nature', '🌾', 'field', 'pole'),
  word('fire', 'nature', '🔥', 'fire', 'ogień'),
  word('earth', 'nature', '🌍', 'earth', 'ziemia'),
  word('leaf', 'nature', '🍃', 'leaf', 'liść'),
  word('spring', 'nature', '🌱', 'spring', 'wiosna'),
  word('autumn', 'nature', '🍂', 'autumn', 'jesień'),
  word('summer', 'nature', '🌞', 'summer', 'lato'),
  word('winter', 'nature', '⛄', 'winter', 'zima'),
  word('eat', 'actions', '🍽️', 'eat', 'jeść'),
  word('drink', 'actions', '🥤', 'drink', 'pić'),
  word('sleep', 'actions', '😴', 'sleep', 'spać'),
  word('walk', 'actions', '🚶', 'walk', 'chodzić'),
  word('run', 'actions', '🏃', 'run', 'biegać'),
  word('stand', 'actions', '🧍', 'stand', 'stać'),
  word('read', 'actions', '📖', 'read', 'czytać'),
  word('write', 'actions', '✍️', 'write', 'pisać'),
  word('speak', 'actions', '💬', 'speak', 'mówić'),
  word('listen', 'actions', '🎧', 'listen', 'słuchać'),
  word('see', 'actions', '👀', 'see', 'widzieć'),
  word('wash', 'actions', '🫧', 'wash', 'myć'),
  word('buy', 'actions', '🛒', 'buy', 'kupować'),
  word('work', 'doing', '💼', 'work', 'pracować'),
  word('play', 'doing', '🎮', 'play', 'grać'),
  word('give', 'doing', '🤲', 'give', 'dawać'),
  word('find', 'doing', '🔎', 'find', 'znajdować'),
  word('help', 'doing', '🆘', 'help', 'pomagać'),
  word('think', 'doing', '💭', 'think', 'myśleć'),
  word('ask', 'doing', '❓', 'ask', 'pytać'),
  word('call', 'doing', '📞', 'call', 'dzwonić'),
  word('send', 'doing', '📨', 'send', 'wysyłać'),
  word('learn', 'doing', '📘', 'learn', 'uczyć się'),
  word('laugh', 'doing', '😂', 'laugh', 'śmiać się'),
  word('happy', 'descriptions', '😊', 'happy', 'szczęśliwy'),
  word('sad', 'descriptions', '😢', 'sad', 'smutny'),
  word('angry', 'descriptions', '😠', 'angry', 'wściekły'),
  word('tired', 'descriptions', '😫', 'tired', 'zmęczony'),
  word('hungry', 'descriptions', '😋', 'hungry', 'głodny'),
  word('thirsty', 'descriptions', '🥤', 'thirsty', 'spragniony'),
  word('love', 'descriptions', '💕', 'love', 'miłość'),
  word('kind', 'descriptions', '🤗', 'kind', 'miły'),
  word('scared', 'descriptions', '😨', 'scared', 'przestraszony'),
  word('surprised', 'descriptions', '😲', 'surprised', 'zaskoczony'),
  word('good', 'descriptions', '👍', 'good', 'dobry'),
  word('bad', 'descriptions', '👎', 'bad', 'zły'),
  word('hot', 'size', '🥵', 'hot', 'gorący'),
  word('cold', 'size', '🥶', 'cold', 'zimny'),
  word('new', 'size', '🆕', 'new', 'nowy'),
  word('old', 'size', '🧓', 'old', 'stary'),
  word('slow', 'size', '🐌', 'slow', 'wolny'),
  word('fast', 'size', '⚡', 'fast', 'szybki'),
  word('long', 'size', '📏', 'long', 'długi'),
  word('strong', 'size', '💪', 'strong', 'silny'),
  word('loud', 'size', '📢', 'loud', 'głośny'),
  word('quiet', 'size', '🤫', 'quiet', 'cichy'),
  word('dark', 'size', '🌑', 'dark', 'ciemny'),
  word('bright', 'size', '🌟', 'bright', 'jasny'),
  word('left', 'size', '⬅️', 'left', 'lewy'),
  word('right', 'size', '➡️', 'right', 'prawy'),
  word('free', 'size', '🆓', 'free', 'wolny'),
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

export function wordsInCategory(id: CategoryId): Word[] {
  return words.filter((item) => item.category === id)
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
