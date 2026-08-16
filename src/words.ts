export type LangCode = 'en' | 'pl'

export type LanguageOption = {
  code: LangCode
  label: string
  nativeName: string
  bcp47: string
}

export type Word = {
  id: string
  emoji: string
  tint: string
  forms: Record<LangCode, string>
}

export const nativeLanguages: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', bcp47: 'en-US' },
]

export const learningLanguages: LanguageOption[] = [
  { code: 'pl', label: 'Polish', nativeName: 'Polski', bcp47: 'pl-PL' },
]

export const words: Word[] = [
  {
    id: 'spoon',
    emoji: '🥄',
    tint: '#2c241c',
    forms: { pl: 'łyżka', en: 'spoon' },
  },
  {
    id: 'apple',
    emoji: '🍎',
    tint: '#3a1c1a',
    forms: { pl: 'jabłko', en: 'apple' },
  },
  {
    id: 'cat',
    emoji: '🐱',
    tint: '#3a2a18',
    forms: { pl: 'kot', en: 'cat' },
  },
  {
    id: 'dog',
    emoji: '🐶',
    tint: '#322418',
    forms: { pl: 'pies', en: 'dog' },
  },
  {
    id: 'book',
    emoji: '📖',
    tint: '#1c2620',
    forms: { pl: 'książka', en: 'book' },
  },
  {
    id: 'key',
    emoji: '🔑',
    tint: '#332818',
    forms: { pl: 'klucz', en: 'key' },
  },
  {
    id: 'bread',
    emoji: '🍞',
    tint: '#3a2c1c',
    forms: { pl: 'chleb', en: 'bread' },
  },
  {
    id: 'water',
    emoji: '💧',
    tint: '#1a2430',
    forms: { pl: 'woda', en: 'water' },
  },
  {
    id: 'flower',
    emoji: '🌸',
    tint: '#321c28',
    forms: { pl: 'kwiat', en: 'flower' },
  },
  {
    id: 'sun',
    emoji: '☀️',
    tint: '#3a3018',
    forms: { pl: 'słońce', en: 'sun' },
  },
]
