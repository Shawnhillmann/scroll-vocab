export type LangCode = 'en' | 'pl' | 'fr' | 'es'
export type CategoryId = 'home' | 'animals' | 'city'
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
  emoji: string
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
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'animals', label: 'Animals', emoji: '🐾' },
  { id: 'city', label: 'City', emoji: '🏙️' },
]

export const modes: Mode[] = [
  { id: 'learn', label: 'Learn', detail: 'Scroll, see, and hear each word', emoji: '📖' },
  { id: 'choice', label: 'Multiple choice', detail: 'Pick the right word from three', emoji: '✅' },
  { id: 'type', label: 'Typing', detail: 'Type the word yourself', emoji: '⌨️' },
]

function word(
  id: string,
  category: CategoryId,
  emoji: string,
  tint: string,
  en: string,
  pl: string,
  fr: string,
  es: string,
): Word {
  return { id, category, emoji, tint, forms: { en, pl, fr, es } }
}

export const words: Word[] = [
  word('spoon', 'home', '🥄', '#2c241c', 'spoon', 'łyżka', 'cuillère', 'cuchara'),
  word('fork', 'home', '🍴', '#32261c', 'fork', 'widelec', 'fourchette', 'tenedor'),
  word('knife', 'home', '🔪', '#2a2018', 'knife', 'nóż', 'couteau', 'cuchillo'),
  word('plate', 'home', '🍽️', '#30241c', 'plate', 'talerz', 'assiette', 'plato'),
  word('cup', 'home', '☕', '#3a2a1c', 'cup', 'kubek', 'tasse', 'taza'),
  word('bread', 'home', '🍞', '#3a301c', 'bread', 'chleb', 'pain', 'pan'),
  word('apple', 'home', '🍎', '#3a1c1a', 'apple', 'jabłko', 'pomme', 'manzana'),
  word('water', 'home', '💧', '#1a2430', 'water', 'woda', 'eau', 'agua'),
  word('chair', 'home', '🪑', '#2c2418', 'chair', 'krzesło', 'chaise', 'silla'),
  word('bed', 'home', '🛏️', '#2a221c', 'bed', 'łóżko', 'lit', 'cama'),
  word('door', 'home', '🚪', '#32281c', 'door', 'drzwi', 'porte', 'puerta'),
  word('window', 'home', '🪟', '#243038', 'window', 'okno', 'fenêtre', 'ventana'),
  word('key', 'home', '🔑', '#332818', 'key', 'klucz', 'clé', 'llave'),
  word('lamp', 'home', '💡', '#3a3418', 'lamp', 'lampa', 'lampe', 'lámpara'),
  word('clock', 'home', '⏰', '#2c2018', 'clock', 'zegar', 'horloge', 'reloj'),
  word('soap', 'home', '🧼', '#24302c', 'soap', 'mydło', 'savon', 'jabón'),
  word('book', 'home', '📖', '#1c2620', 'book', 'książka', 'livre', 'libro'),

  word('cat', 'animals', '🐱', '#3a2a18', 'cat', 'kot', 'chat', 'gato'),
  word('dog', 'animals', '🐶', '#322418', 'dog', 'pies', 'chien', 'perro'),
  word('bird', 'animals', '🐦', '#1c3030', 'bird', 'ptak', 'oiseau', 'pájaro'),
  word('fish', 'animals', '🐟', '#183040', 'fish', 'ryba', 'poisson', 'pez'),
  word('horse', 'animals', '🐴', '#2c2418', 'horse', 'koń', 'cheval', 'caballo'),
  word('cow', 'animals', '🐮', '#2a2818', 'cow', 'krowa', 'vache', 'vaca'),
  word('pig', 'animals', '🐷', '#3a2428', 'pig', 'świnia', 'cochon', 'cerdo'),
  word('sheep', 'animals', '🐑', '#2c2c24', 'sheep', 'owca', 'mouton', 'oveja'),
  word('chicken', 'animals', '🐔', '#3a3018', 'chicken', 'kura', 'poule', 'gallina'),
  word('rabbit', 'animals', '🐰', '#2c2420', 'rabbit', 'królik', 'lapin', 'conejo'),
  word('mouse', 'animals', '🐭', '#28241c', 'mouse', 'mysz', 'souris', 'ratón'),
  word('frog', 'animals', '🐸', '#1c3018', 'frog', 'żaba', 'grenouille', 'rana'),
  word('bee', 'animals', '🐝', '#3a3410', 'bee', 'pszczoła', 'abeille', 'abeja'),
  word('butterfly', 'animals', '🦋', '#24203a', 'butterfly', 'motyl', 'papillon', 'mariposa'),
  word('bear', 'animals', '🐻', '#2a2018', 'bear', 'niedźwiedź', 'ours', 'oso'),
  word('lion', 'animals', '🦁', '#3a2c10', 'lion', 'lew', 'lion', 'león'),
  word('duck', 'animals', '🦆', '#1c2c24', 'duck', 'kaczka', 'canard', 'pato'),

  word('car', 'city', '🚗', '#1a2430', 'car', 'samochód', 'voiture', 'coche'),
  word('bus', 'city', '🚌', '#18283a', 'bus', 'autobus', 'bus', 'autobús'),
  word('train', 'city', '🚆', '#1c242c', 'train', 'pociąg', 'train', 'tren'),
  word('bicycle', 'city', '🚲', '#1c3024', 'bicycle', 'rower', 'vélo', 'bicicleta'),
  word('taxi', 'city', '🚕', '#3a3410', 'taxi', 'taksówka', 'taxi', 'taxi'),
  word('airplane', 'city', '✈️', '#203040', 'airplane', 'samolot', 'avion', 'avión'),
  word('house', 'city', '🏠', '#2c241c', 'house', 'dom', 'maison', 'casa'),
  word('shop', 'city', '🏪', '#2a201c', 'shop', 'sklep', 'magasin', 'tienda'),
  word('school', 'city', '🏫', '#243028', 'school', 'szkoła', 'école', 'escuela'),
  word('hospital', 'city', '🏥', '#301820', 'hospital', 'szpital', 'hôpital', 'hospital'),
  word('bank', 'city', '🏦', '#24281c', 'bank', 'bank', 'banque', 'banco'),
  word('park', 'city', '🌳', '#1c2c18', 'park', 'park', 'parc', 'parque'),
  word('bridge', 'city', '🌉', '#202438', 'bridge', 'most', 'pont', 'puente'),
  word('traffic-light', 'city', '🚦', '#1c2818', 'traffic light', 'światła', 'feu', 'semáforo'),
  word('map', 'city', '🗺️', '#24302c', 'map', 'mapa', 'carte', 'mapa'),
  word('church', 'city', '⛪', '#2c2418', 'church', 'kościół', 'église', 'iglesia'),
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
