# Słowo

Słowo is a mobile-first web app for learning vocabulary by scrolling. Each full-screen card shows one word: an emoji, the word in the language you’re learning, the translation in the language you know, and spoken audio.

The idea is TikTok-style vertical snap-scroll, applied to language learning. Open the feed, swipe, hear the word, tap the emoji to hear it again.

**Repo:** [github.com/Shawnhillmann/scroll-vocab](https://github.com/Shawnhillmann/scroll-vocab)

## How it works

1. Choose **I speak** (native language) and **I want to learn**.
2. Pick a category: **Home**, **Animals**, or **City**.
3. Scroll one card at a time. The learning-language word is spoken automatically.
4. Tap the emoji to replay. Mute autoplay from the top bar if you only want tap-to-hear.

Any supported language can be native or target. The two picks must be different; choosing the same language for both auto-switches the other.

Settings (languages, category, and practice mode) persist in `localStorage` and can be changed mid-session from the top-left chip.

## Practice modes

- **Learn** — snap-scroll cards with the word, translation, and auto-played audio.
- **Multiple choice** — emoji plus the word you know; pick the learning-language word from three options in that category (one right, two wrong).
- **Typing** — type the learning-language word. Accents are optional (`lyzka` matches `łyżka`).

## Supported content (MVP)

| Languages | English, Polish, French, Spanish |
| Categories | Home (17), Animals (17), City (16) |
| Vocabulary | 50 everyday words, all with emoji cues |

Each word has forms in all four languages, so the same deck can teach any direction (e.g. English speaker learning Polish, or Polish speaker learning English).

## Audio

Speech uses the browser’s free [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). Słowo scores installed voices and prefers neural/natural voices that match the learning language (`pl-PL`, `fr-FR`, `es-ES`, `en-US`, plus fallbacks). Compact and robotic voices are deprioritized.

Quality depends on what the device has installed. Desktop often sounds better than phones because a full language pack is already there. If a language sounds off on a phone:

- **iPhone:** Settings → Accessibility → Spoken Content → Voices
- **Android:** Settings → Languages → Text-to-speech → install the language pack

Browsers still require a tap before the first utterance. Chrome and Edge tend to be more reliable than Safari.

## Product shape

- Mobile-first, full-viewport snap scrolling
- Desktop shows the same UI in a centered phone frame
- No accounts, no backend, no images (emojis keep the MVP fast)
- Vite + TypeScript, vanilla DOM (no React)

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173/

```bash
npm run build    # production build
npm run preview  # preview the built app
```

## Project layout

```
src/main.ts      # onboarding, feed, settings, scroll + speech wiring
src/words.ts     # languages, categories, 50-word dictionary
src/speech.ts    # voice scoring and Web Speech playback
src/style.css    # mobile-first layout and snap-scroll cards
```

## What’s next (not in this MVP)

Live hosting (GitHub Pages / Vercel) so phones can open a public URL; more languages and categories; real photos instead of emojis; spaced repetition or progress tracking.
