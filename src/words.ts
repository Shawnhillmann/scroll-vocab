import { examplesFor, type Example } from './examples.ts'

export type LangCode = 'en' | 'pl'
export type CategoryGroupId = 'core' | 'nouns' | 'verbs' | 'modifiers' | 'conjugations'
export type CategoryId =
  | 'core1'
  | 'core2'
  | 'core3'
  | 'core4'
  | 'core5'
  | 'numbers'
  | 'days'
  | 'months'
  | 'clock'
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
  | 'motion'
  | 'social'
  | 'chores'
  | 'descriptions'
  | 'size'
  | 'colors'
  | 'looks'
  | 'manner'
  | 'timing'
  | 'degree'
  | 'conj-present'
  | 'conj-past'
  | 'conj-future'
export type ModeId = 'learn' | 'choice' | 'type' | 'blank' | 'listen' | 'recap'

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

export type CategoryGroup = {
  id: CategoryGroupId
  label: string
}

export type Category = {
  id: CategoryId
  group: CategoryGroupId
  label: string
  short: string
  emoji: string
  tint: string
  kind?: 'vocab' | 'sheet'
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

export const categoryGroups: CategoryGroup[] = [
  { id: 'core', label: 'Core' },
  { id: 'nouns', label: 'Nouns' },
  { id: 'verbs', label: 'Verbs' },
  { id: 'modifiers', label: 'Adjectives & Adverbs' },
  { id: 'conjugations', label: 'Conjugations' },
]

export const categories: Category[] = [
  { id: 'core1', group: 'core', label: 'Core Words 1', short: 'Core 1', emoji: '1️⃣', tint: '#241c28' },
  { id: 'core2', group: 'core', label: 'Core Words 2', short: 'Core 2', emoji: '2️⃣', tint: '#221c2a' },
  { id: 'core3', group: 'core', label: 'Core Words 3', short: 'Core 3', emoji: '3️⃣', tint: '#201c2c' },
  { id: 'core4', group: 'core', label: 'Core Words 4', short: 'Core 4', emoji: '4️⃣', tint: '#1e1c2e' },
  { id: 'core5', group: 'core', label: 'Core Words 5', short: 'Core 5', emoji: '5️⃣', tint: '#1c1c30' },
  { id: 'numbers', group: 'core', label: 'Numbers', short: 'Numbers', emoji: '🔢', tint: '#1a1c32' },
  { id: 'days', group: 'core', label: 'Days of the week', short: 'Days', emoji: '📅', tint: '#1c2034' },
  { id: 'months', group: 'core', label: 'Months', short: 'Months', emoji: '🗓️', tint: '#1e1830' },
  { id: 'clock', group: 'core', label: 'Time of day', short: 'Hours', emoji: '⏰', tint: '#18202e' },
  { id: 'kitchen', group: 'nouns', label: 'Kitchen', short: 'Kitchen', emoji: '🍳', tint: '#3a2418' },
  { id: 'furniture', group: 'nouns', label: 'Furniture', short: 'Furniture', emoji: '🛋️', tint: '#2c241c' },
  { id: 'home', group: 'nouns', label: 'Home', short: 'Home', emoji: '🏠', tint: '#2a2218' },
  { id: 'fruit', group: 'nouns', label: 'Fruit', short: 'Fruit', emoji: '🍎', tint: '#3a2018' },
  { id: 'food', group: 'nouns', label: 'Food', short: 'Food', emoji: '🍽️', tint: '#3a2418' },
  { id: 'drinks', group: 'nouns', label: 'Drinks & sweets', short: 'Drinks & sweets', emoji: '☕', tint: '#301c14' },
  { id: 'animals', group: 'nouns', label: 'Pets & farm', short: 'Pets & farm', emoji: '🐶', tint: '#243018' },
  { id: 'wild', group: 'nouns', label: 'Wild animals', short: 'Wild animals', emoji: '🦁', tint: '#2a2814' },
  { id: 'creatures', group: 'nouns', label: 'Sea & bugs', short: 'Sea & bugs', emoji: '🐙', tint: '#182830' },
  { id: 'transport', group: 'nouns', label: 'Transport', short: 'Transport', emoji: '🚗', tint: '#1a2430' },
  { id: 'city', group: 'nouns', label: 'Places', short: 'Places', emoji: '🏙️', tint: '#1c2030' },
  { id: 'streets', group: 'nouns', label: 'Travel', short: 'Travel', emoji: '🧳', tint: '#182028' },
  { id: 'people', group: 'nouns', label: 'Family', short: 'Family', emoji: '👪', tint: '#3a2820' },
  { id: 'jobs', group: 'nouns', label: 'Jobs', short: 'Jobs', emoji: '💼', tint: '#2c2218' },
  { id: 'face', group: 'nouns', label: 'Face', short: 'Face', emoji: '🙂', tint: '#301820' },
  { id: 'body', group: 'nouns', label: 'Body', short: 'Body', emoji: '💪', tint: '#2c1820' },
  { id: 'health', group: 'nouns', label: 'Health', short: 'Health', emoji: '💊', tint: '#30181c' },
  { id: 'clothing', group: 'nouns', label: 'Clothes', short: 'Clothes', emoji: '👕', tint: '#2c2030' },
  { id: 'accessories', group: 'nouns', label: 'Accessories', short: 'Accessories', emoji: '👜', tint: '#282030' },
  { id: 'weather', group: 'nouns', label: 'Weather', short: 'Weather', emoji: '🌧️', tint: '#1c242c' },
  { id: 'nature', group: 'nouns', label: 'Nature', short: 'Nature', emoji: '🌿', tint: '#1c2c18' },
  { id: 'actions', group: 'verbs', label: 'Everyday', short: 'Everyday', emoji: '🚶', tint: '#242018' },
  { id: 'doing', group: 'verbs', label: 'Actions', short: 'Actions', emoji: '🔎', tint: '#282418' },
  { id: 'motion', group: 'verbs', label: 'Movement', short: 'Movement', emoji: '🏃', tint: '#2a2414' },
  { id: 'social', group: 'verbs', label: 'People & mind', short: 'People & mind', emoji: '💬', tint: '#2c2018' },
  { id: 'chores', group: 'verbs', label: 'Home verbs', short: 'Home verbs', emoji: '🧹', tint: '#262018' },
  { id: 'descriptions', group: 'modifiers', label: 'Feelings', short: 'Feelings', emoji: '😊', tint: '#302028' },
  { id: 'size', group: 'modifiers', label: 'Qualities', short: 'Qualities', emoji: '📏', tint: '#282020' },
  { id: 'colors', group: 'modifiers', label: 'Colors', short: 'Colors', emoji: '🎨', tint: '#2a1828' },
  { id: 'looks', group: 'modifiers', label: 'Appearance', short: 'Appearance', emoji: '🪞', tint: '#2c1824' },
  { id: 'manner', group: 'modifiers', label: 'Manner', short: 'Manner', emoji: '🧭', tint: '#241c28' },
  { id: 'timing', group: 'modifiers', label: 'Time & frequency', short: 'Time', emoji: '🕒', tint: '#1c242c' },
  { id: 'degree', group: 'modifiers', label: 'Degree', short: 'Degree', emoji: '📶', tint: '#201c2a' },
  {
    id: 'conj-present',
    group: 'conjugations',
    kind: 'sheet',
    label: 'Present tense',
    short: 'Present',
    emoji: '⏱️',
    tint: '#1c2430',
  },
  {
    id: 'conj-past',
    group: 'conjugations',
    kind: 'sheet',
    label: 'Past tense',
    short: 'Past',
    emoji: '⏪',
    tint: '#241c28',
  },
  {
    id: 'conj-future',
    group: 'conjugations',
    kind: 'sheet',
    label: 'Future tense',
    short: 'Future',
    emoji: '⏩',
    tint: '#182828',
  },
]

export const modes: Mode[] = [
  { id: 'learn', label: 'Learn', detail: 'Scroll, see, and hear each word', emoji: '📖' },
  { id: 'choice', label: 'Multiple choice', detail: 'Pick the right word from three', emoji: '✅' },
  {
    id: 'blank',
    label: 'Fill in the blank',
    detail: 'Pick or type the missing word in a sentence',
    emoji: '✏️',
  },
  {
    id: 'listen',
    label: 'Listening',
    detail: 'Hear the word, then pick or type what you heard',
    emoji: '🎧',
  },
  { id: 'type', label: 'Typing', detail: 'Type the word yourself', emoji: '⌨️' },
  {
    id: 'recap',
    label: 'Recap',
    detail: 'See every word and translation in one list',
    emoji: '📋',
  },
]

function tintFor(category: CategoryId): string {
  return categories.find((item) => item.id === category)?.tint ?? '#16120e'
}

const GROUP_LABEL_PL: Record<CategoryGroupId, string> = {
  core: 'Podstawy',
  nouns: 'Rzeczowniki',
  verbs: 'Czasowniki',
  modifiers: 'Przymiotniki i przysłówki',
  conjugations: 'Koniugacje',
}

const CATEGORY_SHORT_PL: Record<CategoryId, string> = {
  core1: 'Podstawy 1',
  core2: 'Podstawy 2',
  core3: 'Podstawy 3',
  core4: 'Podstawy 4',
  core5: 'Podstawy 5',
  numbers: 'Liczby',
  days: 'Dni',
  months: 'Miesiące',
  clock: 'Godziny',
  kitchen: 'Kuchnia',
  furniture: 'Meble',
  home: 'Dom',
  fruit: 'Owoce',
  food: 'Jedzenie',
  drinks: 'Napoje i słodycze',
  animals: 'Zwierzęta',
  wild: 'Dzika przyroda',
  creatures: 'Morze i owady',
  transport: 'Transport',
  city: 'Miejsca',
  streets: 'Podróże',
  people: 'Rodzina',
  jobs: 'Praca',
  face: 'Twarz',
  body: 'Ciało',
  health: 'Zdrowie',
  clothing: 'Ubrania',
  accessories: 'Dodatki',
  weather: 'Pogoda',
  nature: 'Natura',
  actions: 'Codzienne',
  doing: 'Czynności',
  motion: 'Ruch',
  social: 'Ludzie i umysł',
  chores: 'Domowe',
  descriptions: 'Uczucia',
  size: 'Cechy',
  colors: 'Kolory',
  looks: 'Wygląd',
  manner: 'Sposób',
  timing: 'Czas',
  degree: 'Stopień',
  'conj-present': 'Teraźniejszy',
  'conj-past': 'Przeszły',
  'conj-future': 'Przyszły',
}

const MODE_LABEL_PL: Record<ModeId, string> = {
  learn: 'Nauka',
  choice: 'Quiz',
  blank: 'Luki',
  listen: 'Słuchanie',
  type: 'Pisanie',
  recap: 'Powtórka',
}

export function localizedGroupLabel(group: CategoryGroup, lang: LangCode): string {
  return lang === 'pl' ? (GROUP_LABEL_PL[group.id] ?? group.label) : group.label
}

export function localizedCategoryShort(category: Category, lang: LangCode): string {
  return lang === 'pl' ? (CATEGORY_SHORT_PL[category.id] ?? category.short) : category.short
}

export function localizedModeLabel(mode: Mode, lang: LangCode): string {
  return lang === 'pl' ? (MODE_LABEL_PL[mode.id] ?? mode.label) : mode.label
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
  word('core-nie', 'core1', '🚫', 'no', 'nie'),
  word('core-to', 'core1', '👉', 'this', 'to'),
  word('core-sie', 'core1', '🔁', 'oneself', 'się'),
  word('core-i', 'core1', '➕', 'and', 'i'),
  word('core-w', 'core1', '📥', 'in', 'w'),
  word('core-na', 'core1', '📍', 'on', 'na'),
  word('core-z', 'core1', '🤝', 'with', 'z'),
  word('core-do', 'core1', '➡️', 'to', 'do'),
  word('core-ze', 'core1', '💬', 'that', 'że'),
  word('core-co', 'core1', '❓', 'what', 'co'),
  word('core-tak', 'core1', '✅', 'yes', 'tak'),
  word('core-jak', 'core1', '❔', 'how', 'jak'),
  word('core-ale', 'core1', '⚖️', 'but', 'ale'),
  word('core-o', 'core1', 'ℹ️', 'about', 'o'),
  word('core-a', 'core1', '🔀', 'and', 'a'),
  word('core-za', 'core1', '🔙', 'for', 'za'),
  word('core-po', 'core1', '⏩', 'after', 'po'),
  word('core-od', 'core1', '⬅️', 'from', 'od'),
  word('core-dla', 'core1', '🎁', 'for', 'dla'),
  word('core-przez', 'core1', '🌉', 'through', 'przez'),

  word('core-czy', 'core2', '❓', 'whether', 'czy'),
  word('core-tylko', 'core2', '1️⃣', 'only', 'tylko'),
  word('core-bardzo', 'core2', '📈', 'very', 'bardzo'),
  word('core-juz', 'core2', '⏰', 'already', 'już'),
  word('core-jeszcze', 'core2', '⏳', 'still', 'jeszcze'),
  word('core-teraz', 'core2', '🕒', 'now', 'teraz'),
  word('core-tu', 'core2', '📌', 'here', 'tu'),
  word('core-tam', 'core2', '🔭', 'there', 'tam'),
  word('core-moze', 'core2', '🤔', 'maybe', 'może'),
  word('core-bo', 'core2', '💡', 'because', 'bo'),
  word('core-wiec', 'core2', '➡️', 'so', 'więc'),
  word('core-kiedy', 'core2', '📅', 'when', 'kiedy'),
  word('core-gdzie', 'core2', '🗺️', 'where', 'gdzie'),
  word('core-dlaczego', 'core2', '❓', 'why', 'dlaczego'),
  word('core-kto', 'core2', '👤', 'who', 'kto'),
  word('core-ktory', 'core2', '🔎', 'which', 'który'),
  word('core-cos', 'core2', '📦', 'something', 'coś'),
  word('core-nic', 'core2', '🕳️', 'nothing', 'nic'),
  word('core-ktos', 'core2', '🧍', 'someone', 'ktoś'),
  word('core-wszystko', 'core2', '🌐', 'everything', 'wszystko'),

  word('core-ja', 'core3', '🙋', 'I', 'ja'),
  word('core-ty', 'core3', '👉', 'you', 'ty'),
  word('core-on', 'core3', '👨', 'he', 'on'),
  word('core-ona', 'core3', '👩', 'she', 'ona'),
  word('core-my', 'core3', '👥', 'we', 'my'),
  word('core-wy', 'core3', '👥', 'you', 'wy'),
  word('core-oni', 'core3', '👥', 'they', 'oni'),
  word('core-moj', 'core3', '🪪', 'my', 'mój'),
  word('core-twoj', 'core3', '🫵', 'your', 'twój'),
  word('core-jego', 'core3', '♂️', 'his', 'jego'),
  word('core-jej', 'core3', '♀️', 'her', 'jej'),
  word('core-ich', 'core3', '👥', 'their', 'ich'),
  word('core-byc', 'core3', '✨', 'to be', 'być'),
  word('core-miec', 'core3', '👜', 'to have', 'mieć'),
  word('core-robic', 'core3', '🛠️', 'to do', 'robić'),
  word('core-wiedziec', 'core3', '🧠', 'to know', 'wiedzieć'),
  word('core-chciec', 'core3', '🙏', 'to want', 'chcieć'),
  word('core-moc', 'core3', '💪', 'can', 'móc'),
  word('core-musiec', 'core3', '❗', 'must', 'musieć'),
  word('core-powiedziec', 'core3', '🗣️', 'to say', 'powiedzieć'),

  word('core-mowic', 'core4', '💬', 'to speak', 'mówić'),
  word('core-isc', 'core4', '🚶', 'to go', 'iść'),
  word('core-dac', 'core4', '🤲', 'to give', 'dać'),
  word('core-wziac', 'core4', '📥', 'to take', 'wziąć'),
  word('core-widziec', 'core4', '👀', 'to see', 'widzieć'),
  word('core-jesc', 'core4', '🍽️', 'to eat', 'jeść'),
  word('core-pic', 'core4', '🥤', 'to drink', 'pić'),
  word('core-potrzebowac', 'core4', '🆘', 'to need', 'potrzebować'),
  word('core-znac', 'core4', '🤝', 'to know', 'znać'),
  word('core-dobrze', 'core4', '👍', 'well', 'dobrze'),
  word('core-dobry', 'core4', '🙂', 'good', 'dobry'),
  word('core-zly', 'core4', '🙁', 'bad', 'zły'),
  word('core-duzy', 'core4', '🔲', 'big', 'duży'),
  word('core-maly', 'core4', '▪️', 'small', 'mały'),
  word('core-duzo', 'core4', '📊', 'a lot', 'dużo'),
  word('core-malo', 'core4', '📉', 'little', 'mało'),
  word('core-nowy', 'core4', '🆕', 'new', 'nowy'),
  word('core-inny', 'core4', '🔀', 'other', 'inny'),
  word('core-jeden', 'core4', '1️⃣', 'one', 'jeden'),
  word('core-dwa', 'core4', '2️⃣', 'two', 'dwa'),

  word('core-dzien', 'core5', '☀️', 'day', 'dzień'),
  word('core-czas', 'core5', '⏱️', 'time', 'czas'),
  word('core-dom', 'core5', '🏠', 'home', 'dom'),
  word('core-praca', 'core5', '💼', 'work', 'praca'),
  word('core-czlowiek', 'core5', '🧑', 'person', 'człowiek'),
  word('core-ludzie', 'core5', '👥', 'people', 'ludzie'),
  word('core-rzecz', 'core5', '📦', 'thing', 'rzecz'),
  word('core-pan', 'core5', '🤵', 'sir', 'pan'),
  word('core-pani', 'core5', '👩', 'ma’am', 'pani'),
  word('core-prosze', 'core5', '🙏', 'please', 'proszę'),
  word('core-dziekuje', 'core5', '💝', 'thank you', 'dziękuję'),
  word('core-przepraszam', 'core5', '😔', 'sorry', 'przepraszam'),
  word('core-naprawde', 'core5', '❗', 'really', 'naprawdę'),
  word('core-zawsze', 'core5', '♾️', 'always', 'zawsze'),
  word('core-nigdy', 'core5', '🚫', 'never', 'nigdy'),
  word('core-tez', 'core5', '➕', 'also', 'też'),
  word('core-nawet', 'core5', '⚡', 'even', 'nawet'),
  word('core-razem', 'core5', '🫶', 'together', 'razem'),
  word('core-sam', 'core5', '🧍', 'alone', 'sam'),
  word('core-prawda', 'core5', '✅', 'truth', 'prawda'),

  word('num-1', 'numbers', '1️⃣', 'one', 'jeden'),
  word('num-2', 'numbers', '2️⃣', 'two', 'dwa'),
  word('num-3', 'numbers', '3️⃣', 'three', 'trzy'),
  word('num-4', 'numbers', '4️⃣', 'four', 'cztery'),
  word('num-5', 'numbers', '5️⃣', 'five', 'pięć'),
  word('num-6', 'numbers', '6️⃣', 'six', 'sześć'),
  word('num-7', 'numbers', '7️⃣', 'seven', 'siedem'),
  word('num-8', 'numbers', '8️⃣', 'eight', 'osiem'),
  word('num-9', 'numbers', '9️⃣', 'nine', 'dziewięć'),
  word('num-10', 'numbers', '🔟', 'ten', 'dziesięć'),
  word('num-11', 'numbers', '🔢', 'eleven', 'jedenaście'),
  word('num-12', 'numbers', '🔢', 'twelve', 'dwanaście'),
  word('num-15', 'numbers', '🔢', 'fifteen', 'piętnaście'),
  word('num-20', 'numbers', '🔢', 'twenty', 'dwadzieścia'),
  word('num-100', 'numbers', '💯', 'one hundred', 'sto'),

  word('monday', 'days', '1️⃣', 'Monday', 'poniedziałek'),
  word('tuesday', 'days', '2️⃣', 'Tuesday', 'wtorek'),
  word('wednesday', 'days', '3️⃣', 'Wednesday', 'środa'),
  word('thursday', 'days', '4️⃣', 'Thursday', 'czwartek'),
  word('friday', 'days', '5️⃣', 'Friday', 'piątek'),
  word('saturday', 'days', '6️⃣', 'Saturday', 'sobota'),
  word('sunday', 'days', '7️⃣', 'Sunday', 'niedziela'),
  word('week', 'days', '📆', 'week', 'tydzień'),
  word('weekend', 'days', '🎉', 'weekend', 'weekend'),
  word('weekday', 'days', '💼', 'weekday', 'dzień powszedni'),
  word('holiday', 'days', '🏖️', 'holiday', 'święto'),
  word('calendar', 'days', '🗓️', 'calendar', 'kalendarz'),
  word('date', 'days', '📌', 'date', 'data'),
  word('everyday-adv', 'days', '🔁', 'every day', 'codziennie'),
  word('schedule', 'days', '📋', 'schedule', 'plan'),

  word('january', 'months', '❄️', 'January', 'styczeń'),
  word('february', 'months', '💝', 'February', 'luty'),
  word('march', 'months', '🌱', 'March', 'marzec'),
  word('april', 'months', '🌧️', 'April', 'kwiecień'),
  word('may', 'months', '🌸', 'May', 'maj'),
  word('june', 'months', '☀️', 'June', 'czerwiec'),
  word('july', 'months', '🏖️', 'July', 'lipiec'),
  word('august', 'months', '🌻', 'August', 'sierpień'),
  word('september', 'months', '🍎', 'September', 'wrzesień'),
  word('october', 'months', '🍂', 'October', 'październik'),
  word('november', 'months', '🌫️', 'November', 'listopad'),
  word('december', 'months', '🎄', 'December', 'grudzień'),
  word('month', 'months', '🗓️', 'month', 'miesiąc'),
  word('year', 'months', '🎉', 'year', 'rok'),
  word('season', 'months', '🌍', 'season', 'pora roku'),

  word('hour', 'clock', '⏰', 'hour', 'godzina'),
  word('minute', 'clock', '⏱️', 'minute', 'minuta'),
  word('second', 'clock', '⏲️', 'second', 'sekunda'),
  word('morning', 'clock', '🌅', 'morning', 'rano'),
  word('afternoon', 'clock', '🌤️', 'afternoon', 'popołudnie'),
  word('evening', 'clock', '🌆', 'evening', 'wieczór'),
  word('night', 'clock', '🌙', 'night', 'noc'),
  word('noon', 'clock', '☀️', 'noon', 'południe'),
  word('midnight', 'clock', '🌑', 'midnight', 'północ'),
  word('clock-noun', 'clock', '🕰️', 'clock', 'zegar'),
  word('watch-noun', 'clock', '⌚', 'watch', 'zegarek'),
  word('quarter-hour', 'clock', '🕒', 'quarter hour', 'kwadrans'),
  word('half-hour', 'clock', '🕕', 'half an hour', 'pół godziny'),
  word('alarm', 'clock', '⏰', 'alarm', 'budzik'),
  word('appointment', 'clock', '📅', 'appointment', 'termin'),

  word('spoon', 'kitchen', '🥄', 'spoon', 'łyżka'),
  word('fork', 'kitchen', '🍴', 'fork', 'widelec'),
  word('knife', 'kitchen', '🔪', 'knife', 'nóż'),
  word('plate', 'kitchen', '🍽️', 'plate', 'talerz'),
  word('bowl', 'kitchen', '🥣', 'bowl', 'miska'),
  word('pan', 'kitchen', '🍳', 'pan', 'patelnia'),
  word('glass', 'kitchen', '🥃', 'glass', 'szklanka'),
  word('trash', 'kitchen', '🗑️', 'trash can', 'kosz'),
  word('broom', 'kitchen', '🧹', 'broom', 'miotła'),
  word('cup', 'kitchen', '☕', 'cup', 'kubek'),
  word('pot', 'kitchen', '🍲', 'pot', 'garnek'),
  word('oven', 'kitchen', '🔥', 'oven', 'piekarnik'),
  word('fridge', 'kitchen', '🧊', 'fridge', 'lodówka'),
  word('sink', 'kitchen', '🚰', 'sink', 'zlew'),
  word('napkin', 'kitchen', '🧻', 'napkin', 'serwetka'),
  word('chair', 'furniture', '🪑', 'chair', 'krzesło'),
  word('sofa', 'furniture', '🛋️', 'sofa', 'kanapa'),
  word('bed', 'furniture', '🛏️', 'bed', 'łóżko'),
  word('lamp', 'furniture', '💡', 'lamp', 'lampa'),
  word('clock', 'furniture', '⏰', 'clock', 'zegar'),
  word('candle', 'furniture', '🕯️', 'candle', 'świeca'),
  word('houseplant', 'furniture', '🪴', 'plant', 'roślina'),
  word('television', 'furniture', '📺', 'television', 'telewizor'),
  word('table', 'furniture', '🪵', 'table', 'stół'),
  word('desk', 'furniture', '🖥️', 'desk', 'biurko'),
  word('shelf', 'furniture', '📚', 'shelf', 'półka'),
  word('wardrobe', 'furniture', '🚪', 'wardrobe', 'szafa'),
  word('drawer', 'furniture', '🗄️', 'drawer', 'szuflada'),
  word('carpet', 'furniture', '🟫', 'carpet', 'dywan'),
  word('curtain', 'furniture', '🪟', 'curtain', 'zasłona'),
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
  word('stairs', 'home', '🪜', 'stairs', 'schody'),
  word('wall', 'home', '🧱', 'wall', 'ściana'),
  word('apple', 'fruit', '🍎', 'apple', 'jabłko'),
  word('banana', 'fruit', '🍌', 'banana', 'banan'),
  word('orange', 'fruit', '🍊', 'orange', 'pomarańcza'),
  word('strawberry', 'fruit', '🍓', 'strawberry', 'truskawka'),
  word('grape', 'fruit', '🍇', 'grape', 'winogrono'),
  word('lemon', 'fruit', '🍋', 'lemon', 'cytryna'),
  word('peach', 'fruit', '🍑', 'peach', 'brzoskwinia'),
  word('pear', 'fruit', '🍐', 'pear', 'gruszka'),
  word('cherry', 'fruit', '🍒', 'cherry', 'wiśnia'),
  word('watermelon', 'fruit', '🍉', 'watermelon', 'arbuz'),
  word('pineapple', 'fruit', '🍍', 'pineapple', 'ananas'),
  word('kiwi', 'fruit', '🥝', 'kiwi', 'kiwi'),
  word('plum', 'fruit', '🟣', 'plum', 'śliwka'),
  word('melon', 'fruit', '🍈', 'melon', 'melon'),
  word('raspberry', 'fruit', '🫐', 'raspberry', 'malina'),
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
  word('soda', 'drinks', '🥤', 'soda', 'napój gazowany'),
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
  word('hamster', 'animals', '🐹', 'hamster', 'chomik'),
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
  word('snail', 'creatures', '🐌', 'snail', 'ślimak'),
  word('jellyfish', 'creatures', '🪼', 'jellyfish', 'meduza'),
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
  word('scooter', 'transport', '🛴', 'scooter', 'hulajnoga'),
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
  word('passport', 'streets', '🛂', 'passport', 'paszport'),
  word('luggage', 'streets', '🧳', 'luggage', 'bagaż'),
  word('tourist', 'streets', '🧭', 'tourist', 'turysta'),
  word('ferry', 'streets', '⛴️', 'ferry', 'prom'),
  word('visa', 'streets', '📄', 'visa', 'wiza'),
  word('platform', 'streets', '🚉', 'platform', 'peron'),
  word('hostel', 'streets', '🛏️', 'hostel', 'hostel'),
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
  word('brother', 'people', '👦', 'brother', 'brat'),
  word('sister', 'people', '👧', 'sister', 'siostra'),
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
  word('teacher', 'jobs', '🍎', 'teacher', 'nauczyciel'),
  word('nurse', 'jobs', '💉', 'nurse', 'pielęgniarka'),
  word('chef', 'jobs', '🍳', 'chef', 'kucharz'),
  word('driver', 'jobs', '🚕', 'driver', 'kierowca'),
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
  word('hair', 'face', '💇', 'hair', 'włosy'),
  word('cheek', 'face', '😊', 'cheek', 'policzek'),
  word('chin', 'face', '🧔', 'chin', 'broda'),
  word('eyebrow', 'face', '🤨', 'eyebrow', 'brew'),
  word('forehead', 'face', '🧠', 'forehead', 'czoło'),
  word('hand', 'body', '✋', 'hand', 'ręka'),
  word('foot', 'body', '🦶', 'foot', 'stopa'),
  word('arm', 'body', '💪', 'arm', 'ramię'),
  word('leg', 'body', '🦵', 'leg', 'noga'),
  word('heart', 'body', '❤️', 'heart', 'serce'),
  word('brain', 'body', '🧠', 'brain', 'mózg'),
  word('bone', 'body', '🦴', 'bone', 'kość'),
  word('blood', 'body', '🩸', 'blood', 'krew'),
  word('lungs', 'body', '🫁', 'lungs', 'płuca'),
  word('stomach', 'body', '🤰', 'stomach', 'brzuch'),
  word('back', 'body', '🔙', 'back', 'plecy'),
  word('shoulder', 'body', '🏋️', 'shoulder', 'bark'),
  word('knee', 'body', '🦵', 'knee', 'kolano'),
  word('neck', 'body', '🦒', 'neck', 'szyja'),
  word('skin', 'body', '🧴', 'skin', 'skóra'),
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
  word('pill', 'health', '💊', 'pill', 'tabletka'),
  word('cold-illness', 'health', '🤧', 'cold', 'przeziębienie'),
  word('allergy', 'health', '🌼', 'allergy', 'alergia'),
  word('vitamin', 'health', '🍊', 'vitamin', 'witamina'),
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
  word('jacket', 'clothing', '🧥', 'jacket', 'kurtka'),
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
  word('necklace', 'accessories', '📿', 'necklace', 'naszyjnik'),
  word('belt', 'accessories', '🪢', 'belt', 'pasek'),
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
  word('sit', 'actions', '🪑', 'sit', 'siedzieć'),
  word('read', 'actions', '📖', 'read', 'czytać'),
  word('write', 'actions', '✍️', 'write', 'pisać'),
  word('speak', 'actions', '💬', 'speak', 'mówić'),
  word('listen', 'actions', '🎧', 'listen', 'słuchać'),
  word('see', 'actions', '👀', 'see', 'widzieć'),
  word('wash', 'actions', '🫧', 'wash', 'myć'),
  word('buy', 'actions', '🛒', 'buy', 'kupować'),
  word('cook', 'actions', '🍳', 'cook', 'gotować'),

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
  word('open', 'doing', '🚪', 'open', 'otwierać'),
  word('close', 'doing', '🔒', 'close', 'zamykać'),
  word('wait', 'doing', '⏳', 'wait', 'czekać'),
  word('understand', 'doing', '💡', 'understand', 'rozumieć'),

  word('drive', 'motion', '🚗', 'drive', 'jechać'),
  word('swim', 'motion', '🏊', 'swim', 'pływać'),
  word('fly', 'motion', '✈️', 'fly', 'latać'),
  word('jump', 'motion', '🦘', 'jump', 'skakać'),
  word('dance', 'motion', '💃', 'dance', 'tańczyć'),
  word('lie-down', 'motion', '🛏️', 'lie down', 'leżeć'),
  word('climb', 'motion', '🧗', 'climb', 'wspinać się'),
  word('fall', 'motion', '🍂', 'fall', 'upadać'),
  word('carry', 'motion', '📦', 'carry', 'nosić'),
  word('pull', 'motion', '🧲', 'pull', 'ciągnąć'),
  word('push', 'motion', '👉', 'push', 'pchać'),
  word('throw', 'motion', '⚾', 'throw', 'rzucać'),
  word('catch', 'motion', '🤾', 'catch', 'łapać'),
  word('ride', 'motion', '🚲', 'ride', 'jeździć'),
  word('enter', 'motion', '➡️', 'enter', 'wchodzić'),

  word('like', 'social', '👍', 'like', 'lubić'),
  word('love-verb', 'social', '❤️', 'love', 'kochać'),
  word('hate', 'social', '💔', 'hate', 'nienawidzić'),
  word('remember', 'social', '🧠', 'remember', 'pamiętać'),
  word('forget', 'social', '🫥', 'forget', 'zapominać'),
  word('meet', 'social', '🤝', 'meet', 'spotykać'),
  word('visit', 'social', '🏠', 'visit', 'odwiedzać'),
  word('invite', 'social', '📩', 'invite', 'zapraszać'),
  word('thank', 'social', '🙏', 'thank', 'dziękować'),
  word('apologize', 'social', '🙇', 'apologize', 'przepraszać'),
  word('promise', 'social', '🤞', 'promise', 'obiecywać'),
  word('decide', 'social', '⚖️', 'decide', 'decydować'),
  word('choose', 'social', '☝️', 'choose', 'wybierać'),
  word('hope', 'social', '🌟', 'hope', 'mieć nadzieję'),
  word('believe', 'social', '🕊️', 'believe', 'wierzyć'),

  word('clean', 'chores', '🧹', 'clean', 'sprzątać'),
  word('wash-clothes', 'chores', '👕', 'wash clothes', 'prać'),
  word('iron', 'chores', '♨️', 'iron', 'prasować'),
  word('do-dishes', 'chores', '🍽️', 'do the dishes', 'zmywać'),
  word('wake-up', 'chores', '⏰', 'wake up', 'budzić się'),
  word('get-up', 'chores', '🛏️', 'get up', 'wstawać'),
  word('get-dressed', 'chores', '👔', 'get dressed', 'ubierać się'),
  word('undress', 'chores', '🧥', 'undress', 'rozbierać się'),
  word('bathe', 'chores', '🛁', 'bathe', 'kąpać się'),
  word('rest', 'chores', '😌', 'rest', 'odpoczywać'),
  word('make-bed', 'chores', '🛏️', 'make the bed', 'ścielić łóżko'),
  word('take-out-trash', 'chores', '🗑️', 'take out trash', 'wyrzucać śmieci'),
  word('water-plants', 'chores', '🪴', 'water plants', 'podlewać'),
  word('vacuum', 'chores', '🌀', 'vacuum', 'odkurzać'),
  word('go-shopping', 'chores', '🛍️', 'shop', 'robić zakupy'),

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
  word('bored', 'descriptions', '😑', 'bored', 'znudzony'),
  word('calm', 'descriptions', '🧘', 'calm', 'spokojny'),
  word('proud', 'descriptions', '🦚', 'proud', 'dumny'),

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

  word('red', 'colors', '🔴', 'red', 'czerwony'),
  word('blue', 'colors', '🔵', 'blue', 'niebieski'),
  word('green', 'colors', '🟢', 'green', 'zielony'),
  word('yellow', 'colors', '🟡', 'yellow', 'żółty'),
  word('black', 'colors', '⚫', 'black', 'czarny'),
  word('white', 'colors', '⚪', 'white', 'biały'),
  word('orange-adj', 'colors', '🟠', 'orange', 'pomarańczowy'),
  word('pink', 'colors', '🩷', 'pink', 'różowy'),
  word('purple', 'colors', '🟣', 'purple', 'fioletowy'),
  word('brown', 'colors', '🟤', 'brown', 'brązowy'),
  word('gray', 'colors', '⬜', 'gray', 'szary'),
  word('gold', 'colors', '🥇', 'gold', 'złoty'),
  word('silver', 'colors', '🥈', 'silver', 'srebrny'),
  word('beige', 'colors', '🏜️', 'beige', 'beżowy'),
  word('navy', 'colors', '🔷', 'navy', 'granatowy'),

  word('big', 'looks', '🔲', 'big', 'duży'),
  word('small', 'looks', '🔹', 'small', 'mały'),
  word('tall', 'looks', '📏', 'tall', 'wysoki'),
  word('short', 'looks', '📐', 'short', 'niski'),
  word('young', 'looks', '🌱', 'young', 'młody'),
  word('beautiful', 'looks', '✨', 'beautiful', 'piękny'),
  word('ugly', 'looks', '🥴', 'ugly', 'brzydki'),
  word('clean-adj', 'looks', '✨', 'clean', 'czysty'),
  word('dirty', 'looks', '🧽', 'dirty', 'brudny'),
  word('rich', 'looks', '💰', 'rich', 'bogaty'),
  word('poor', 'looks', '🪙', 'poor', 'biedny'),
  word('thick', 'looks', '📘', 'thick', 'gruby'),
  word('thin', 'looks', '📏', 'thin', 'chudy'),
  word('soft', 'looks', '🧸', 'soft', 'miękki'),
  word('hard', 'looks', '🪨', 'hard', 'twardy'),

  word('quickly', 'manner', '⚡', 'quickly', 'szybko'),
  word('slowly', 'manner', '🐌', 'slowly', 'wolno'),
  word('well', 'manner', '👍', 'well', 'dobrze'),
  word('badly', 'manner', '👎', 'badly', 'źle'),
  word('loudly', 'manner', '📢', 'loudly', 'głośno'),
  word('quietly', 'manner', '🤫', 'quietly', 'cicho'),
  word('easily', 'manner', '✌️', 'easily', 'łatwo'),
  word('hard-adv', 'manner', '🧱', 'with difficulty', 'trudno'),
  word('together', 'manner', '👥', 'together', 'razem'),
  word('carefully', 'manner', '👀', 'carefully', 'ostrożnie'),
  word('suddenly', 'manner', '💥', 'suddenly', 'nagle'),
  word('exactly', 'manner', '🎯', 'exactly', 'dokładnie'),
  word('normally', 'manner', '🙂', 'normally', 'normalnie'),
  word('calmly', 'manner', '🍃', 'calmly', 'spokojnie'),
  word('happily', 'manner', '😄', 'happily', 'wesoło'),

  word('today', 'days', '📅', 'today', 'dziś'),
  word('tomorrow', 'days', '🌅', 'tomorrow', 'jutro'),
  word('yesterday', 'days', '⏪', 'yesterday', 'wczoraj'),
  word('often', 'timing', '🔁', 'often', 'często'),
  word('rarely', 'timing', '🌵', 'rarely', 'rzadko'),
  word('always', 'timing', '♾️', 'always', 'zawsze'),
  word('never', 'timing', '🚫', 'never', 'nigdy'),
  word('soon', 'timing', '⏩', 'soon', 'wkrótce'),
  word('later', 'timing', '🕒', 'later', 'później'),
  word('early', 'timing', '🌄', 'early', 'wcześnie'),
  word('late', 'timing', '🌙', 'late', 'późno'),
  word('sometimes', 'timing', '🎲', 'sometimes', 'czasem'),
  word('usually', 'timing', '📌', 'usually', 'zwykle'),
  word('recently', 'timing', '🆕', 'recently', 'niedawno'),
  word('immediately', 'timing', '🚨', 'immediately', 'natychmiast'),
  word('currently', 'timing', '📍', 'currently', 'obecnie'),
  word('previously', 'timing', '↩️', 'previously', 'poprzednio'),
  word('eventually', 'timing', '🏁', 'eventually', 'w końcu'),

  word('a-bit', 'degree', '🤏', 'a bit', 'trochę'),
  word('almost', 'degree', '⌛', 'almost', 'prawie'),
  word('quite', 'degree', '✅', 'quite', 'całkiem'),
  word('too', 'degree', '⚠️', 'too', 'zbyt'),
  word('more', 'degree', '📈', 'more', 'bardziej'),
  word('less', 'degree', '📉', 'less', 'mniej'),
  word('especially', 'degree', '⭐', 'especially', 'szczególnie'),
  word('completely', 'degree', '💯', 'completely', 'całkowicie'),
  word('really', 'degree', '❗', 'really', 'naprawdę'),
  word('rather', 'degree', '🤔', 'rather', 'raczej'),
  word('slightly', 'degree', '〰️', 'slightly', 'nieco'),
  word('significantly', 'degree', '📊', 'significantly', 'znacznie'),
  word('at-all', 'degree', '🛑', 'at all', 'wcale'),
  word('absolutely', 'degree', '🆗', 'absolutely', 'absolutnie'),
  word('enough', 'degree', '⚖️', 'enough', 'wystarczająco'),
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

export function categoriesInGroup(group: CategoryGroupId): Category[] {
  return categories.filter((category) => category.group === group)
}

export function isSheetCategory(id: CategoryId): boolean {
  return getCategory(id).kind === 'sheet'
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
