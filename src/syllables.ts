const VOWELS = new Set(['a', 'ą', 'e', 'ę', 'i', 'o', 'ó', 'u', 'y'])

/** Digraphs / trigraphs treated as one consonant unit (longest first). */
const CLUSTERS = ['szcz', 'dzi', 'dż', 'dź', 'dz', 'cz', 'sz', 'ch', 'rz'] as const

/** Common Polish syllable onsets (unit strings, lowercase). */
const ONSETS = new Set([
  // singles covered dynamically
  'pr',
  'tr',
  'kr',
  'gr',
  'br',
  'dr',
  'fr',
  'wr',
  'chr',
  'pl',
  'tl',
  'kl',
  'gl',
  'bl',
  'dl',
  'fl',
  'ml',
  'chl',
  'pn',
  'tn',
  'kn',
  'gn',
  'dn',
  'fn',
  'mn',
  'sn',
  'zn',
  'cn',
  'śn',
  'źn',
  'ps',
  'ks',
  'gs',
  'sp',
  'st',
  'sk',
  'sf',
  'sch',
  'sw',
  'sł',
  'sm',
  'sn',
  'sr',
  'sł',
  'zb',
  'zd',
  'zg',
  'zl',
  'zm',
  'zn',
  'zr',
  'zw',
  'ść',
  'śp',
  'śc',
  'św',
  'śm',
  'śl',
  'śn',
  'śr',
  'str',
  'skr',
  'spr',
  'spl',
  'skl',
  'skw',
  'stw',
  'zdż',
  'źdź',
  'trz',
  'drz',
  'krz',
  'grz',
  'prz',
  'brz',
  'chrz',
  'pstr',
  'łk',
  'łg',
  'łb',
  'wm',
  'wk',
  'wt',
  'wd',
  'wg',
  'wb',
  'wc',
  'wcz',
  'wsz',
])

/**
 * Syllabify a vocab form for on-card pronunciation guides.
 * Multi-word phrases are syllabified per word.
 */
export function pronunciationGuide(text: string): string {
  const trimmed = text.normalize('NFC').trim()
  if (!trimmed) return ''
  return trimmed
    .split(/\s+/)
    .map((part) => syllabifyToken(part))
    .join(' ')
}

function syllabifyToken(token: string): string {
  if (token.length <= 2) return token

  const { units, vowels } = tokenize(token)
  if (vowels.length <= 1) return token

  const cuts: number[] = []
  for (let i = 0; i < vowels.length - 1; i += 1) {
    const left = vowels[i]!
    const right = vowels[i + 1]!
    cuts.push(cutBeforeNextSyllable(units, left, right))
  }

  const parts: string[] = []
  let start = 0
  for (const cut of cuts) {
    parts.push(units.slice(start, cut).join(''))
    start = cut
  }
  parts.push(units.slice(start).join(''))

  return parts.filter(Boolean).join('-')
}

function cutBeforeNextSyllable(units: string[], left: number, right: number): number {
  const consonants = units.slice(left + 1, right)
  if (!consonants.length) return right

  for (let onsetLen = Math.min(consonants.length, 4); onsetLen >= 1; onsetLen -= 1) {
    const onset = consonants.slice(consonants.length - onsetLen)
    if (isValidOnset(onset)) return right - onsetLen
  }
  return right
}

function isValidOnset(units: string[]): boolean {
  if (units.length === 1) return !VOWELS.has(units[0]!.toLowerCase())
  const key = units.map((unit) => unit.toLowerCase()).join('')
  return ONSETS.has(key)
}

function tokenize(token: string): { units: string[]; vowels: number[] } {
  const lower = token.toLowerCase()
  const units: string[] = []
  const vowels: number[] = []
  let i = 0

  while (i < token.length) {
    let matched = false
    for (const cluster of CLUSTERS) {
      if (lower.startsWith(cluster, i)) {
        units.push(token.slice(i, i + cluster.length))
        i += cluster.length
        matched = true
        break
      }
    }
    if (matched) continue

    const next = lower[i + 1]
    // Softening "i" + vowel counts as one nucleus (ziemia → zie-mia).
    if (lower[i] === 'i' && next && VOWELS.has(next) && next !== 'i') {
      units.push(token.slice(i, i + 2))
      vowels.push(units.length - 1)
      i += 2
      continue
    }

    const ch = token[i]!
    units.push(ch)
    if (VOWELS.has(lower[i]!)) vowels.push(units.length - 1)
    i += 1
  }

  return { units, vowels }
}
