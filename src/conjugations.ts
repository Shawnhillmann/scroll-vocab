export type ConjugationRow = {
  label: string
  form: string
  gloss: string
}

export type ConjugationSheet = {
  id: string
  category: 'conj-present' | 'conj-past' | 'conj-future'
  emoji: string
  titleEn: string
  titlePl: string
  tenseEn: string
  tensePl: string
  rows: ConjugationRow[]
}

const r = (label: string, form: string, gloss: string): ConjugationRow => ({
  label,
  form,
  gloss,
})

export const conjugationSheets: ConjugationSheet[] = [
  {
    id: 'sheet-byc-present',
    category: 'conj-present',
    emoji: '✨',
    titleEn: 'to be',
    titlePl: 'być',
    tenseEn: 'Present',
    tensePl: 'Czas teraźniejszy',
    rows: [
      r('ja', 'jestem', 'I am'),
      r('ty', 'jesteś', 'you are'),
      r('on / ona / ono', 'jest', 'he / she / it is'),
      r('my', 'jesteśmy', 'we are'),
      r('wy', 'jesteście', 'you are'),
      r('oni / one', 'są', 'they are'),
    ],
  },
  {
    id: 'sheet-miec-present',
    category: 'conj-present',
    emoji: '👜',
    titleEn: 'to have',
    titlePl: 'mieć',
    tenseEn: 'Present',
    tensePl: 'Czas teraźniejszy',
    rows: [
      r('ja', 'mam', 'I have'),
      r('ty', 'masz', 'you have'),
      r('on / ona / ono', 'ma', 'he / she / it has'),
      r('my', 'mamy', 'we have'),
      r('wy', 'macie', 'you have'),
      r('oni / one', 'mają', 'they have'),
    ],
  },
  {
    id: 'sheet-robic-present',
    category: 'conj-present',
    emoji: '🛠️',
    titleEn: 'to do / make',
    titlePl: 'robić',
    tenseEn: 'Present',
    tensePl: 'Czas teraźniejszy',
    rows: [
      r('ja', 'robię', 'I do'),
      r('ty', 'robisz', 'you do'),
      r('on / ona / ono', 'robi', 'he / she / it does'),
      r('my', 'robimy', 'we do'),
      r('wy', 'robicie', 'you do'),
      r('oni / one', 'robią', 'they do'),
    ],
  },
  {
    id: 'sheet-isc-present',
    category: 'conj-present',
    emoji: '🚶',
    titleEn: 'to go (on foot)',
    titlePl: 'iść',
    tenseEn: 'Present',
    tensePl: 'Czas teraźniejszy',
    rows: [
      r('ja', 'idę', 'I go'),
      r('ty', 'idziesz', 'you go'),
      r('on / ona / ono', 'idzie', 'he / she / it goes'),
      r('my', 'idziemy', 'we go'),
      r('wy', 'idziecie', 'you go'),
      r('oni / one', 'idą', 'they go'),
    ],
  },
  {
    id: 'sheet-jesc-present',
    category: 'conj-present',
    emoji: '🍽️',
    titleEn: 'to eat',
    titlePl: 'jeść',
    tenseEn: 'Present',
    tensePl: 'Czas teraźniejszy',
    rows: [
      r('ja', 'jem', 'I eat'),
      r('ty', 'jesz', 'you eat'),
      r('on / ona / ono', 'je', 'he / she / it eats'),
      r('my', 'jemy', 'we eat'),
      r('wy', 'jecie', 'you eat'),
      r('oni / one', 'jedzą', 'they eat'),
    ],
  },
  {
    id: 'sheet-mowic-present',
    category: 'conj-present',
    emoji: '💬',
    titleEn: 'to speak',
    titlePl: 'mówić',
    tenseEn: 'Present',
    tensePl: 'Czas teraźniejszy',
    rows: [
      r('ja', 'mówię', 'I speak'),
      r('ty', 'mówisz', 'you speak'),
      r('on / ona / ono', 'mówi', 'he / she / it speaks'),
      r('my', 'mówimy', 'we speak'),
      r('wy', 'mówicie', 'you speak'),
      r('oni / one', 'mówią', 'they speak'),
    ],
  },
  {
    id: 'sheet-byc-past',
    category: 'conj-past',
    emoji: '✨',
    titleEn: 'to be',
    titlePl: 'być',
    tenseEn: 'Past',
    tensePl: 'Czas przeszły',
    rows: [
      r('ja (m)', 'byłem', 'I was'),
      r('ja (f)', 'byłam', 'I was'),
      r('ty (m)', 'byłeś', 'you were'),
      r('ty (f)', 'byłaś', 'you were'),
      r('on', 'był', 'he was'),
      r('ona', 'była', 'she was'),
      r('ono', 'było', 'it was'),
      r('my (m)', 'byliśmy', 'we were'),
      r('my (f)', 'byłyśmy', 'we were'),
      r('oni', 'byli', 'they were (m)'),
      r('one', 'były', 'they were (f)'),
    ],
  },
  {
    id: 'sheet-miec-past',
    category: 'conj-past',
    emoji: '👜',
    titleEn: 'to have',
    titlePl: 'mieć',
    tenseEn: 'Past',
    tensePl: 'Czas przeszły',
    rows: [
      r('ja (m)', 'miałem', 'I had'),
      r('ja (f)', 'miałam', 'I had'),
      r('ty (m)', 'miałeś', 'you had'),
      r('ty (f)', 'miałaś', 'you had'),
      r('on', 'miał', 'he had'),
      r('ona', 'miała', 'she had'),
      r('ono', 'miało', 'it had'),
      r('my (m)', 'mieliśmy', 'we had'),
      r('my (f)', 'miałyśmy', 'we had'),
      r('oni', 'mieli', 'they had (m)'),
      r('one', 'miały', 'they had (f)'),
    ],
  },
  {
    id: 'sheet-robic-past',
    category: 'conj-past',
    emoji: '🛠️',
    titleEn: 'to do / make',
    titlePl: 'robić',
    tenseEn: 'Past',
    tensePl: 'Czas przeszły',
    rows: [
      r('ja (m)', 'robiłem', 'I did'),
      r('ja (f)', 'robiłam', 'I did'),
      r('ty (m)', 'robiłeś', 'you did'),
      r('ty (f)', 'robiłaś', 'you did'),
      r('on', 'robił', 'he did'),
      r('ona', 'robiła', 'she did'),
      r('my (m)', 'robiliśmy', 'we did'),
      r('my (f)', 'robiłyśmy', 'we did'),
      r('oni', 'robili', 'they did (m)'),
      r('one', 'robiły', 'they did (f)'),
    ],
  },
  {
    id: 'sheet-byc-future',
    category: 'conj-future',
    emoji: '✨',
    titleEn: 'to be',
    titlePl: 'być',
    tenseEn: 'Future',
    tensePl: 'Czas przyszły',
    rows: [
      r('ja', 'będę', 'I will be'),
      r('ty', 'będziesz', 'you will be'),
      r('on / ona / ono', 'będzie', 'he / she / it will be'),
      r('my', 'będziemy', 'we will be'),
      r('wy', 'będziecie', 'you will be'),
      r('oni / one', 'będą', 'they will be'),
    ],
  },
  {
    id: 'sheet-miec-future',
    category: 'conj-future',
    emoji: '👜',
    titleEn: 'to have',
    titlePl: 'mieć',
    tenseEn: 'Future',
    tensePl: 'Czas przyszły',
    rows: [
      r('ja', 'będę mieć', 'I will have'),
      r('ty', 'będziesz mieć', 'you will have'),
      r('on / ona / ono', 'będzie mieć', 'he / she / it will have'),
      r('my', 'będziemy mieć', 'we will have'),
      r('wy', 'będziecie mieć', 'you will have'),
      r('oni / one', 'będą mieć', 'they will have'),
    ],
  },
  {
    id: 'sheet-robic-future',
    category: 'conj-future',
    emoji: '🛠️',
    titleEn: 'to do / make',
    titlePl: 'robić',
    tenseEn: 'Future',
    tensePl: 'Czas przyszły',
    rows: [
      r('ja', 'będę robić', 'I will do'),
      r('ty', 'będziesz robić', 'you will do'),
      r('on / ona / ono', 'będzie robić', 'he / she / it will do'),
      r('my', 'będziemy robić', 'we will do'),
      r('wy', 'będziecie robić', 'you will do'),
      r('oni / one', 'będą robić', 'they will do'),
    ],
  },
]

export function sheetsInCategory(id: ConjugationSheet['category'] | string): ConjugationSheet[] {
  return conjugationSheets.filter((sheet) => sheet.category === id)
}

export function isConjugationCategory(
  id: string,
): id is ConjugationSheet['category'] {
  return id === 'conj-present' || id === 'conj-past' || id === 'conj-future'
}
