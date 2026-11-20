// The words Belle knows. Each one is written on a star in the sky as `word`
// (positioned by `star`), and offering it to Belle in any case gets her `reply`.
export type BelleWord = {
  word: string
  star: { top: string, left: string }
  reply: string
}

export const BELLE_WORDS: BelleWord[] = [
  {
    word: 'Belle',
    star: { top: '14%', left: '6%' },
    reply: 'That\'s me! Belle is short for Isabelle, and this little sky is where I live.',
  },
]

export const BELLE_INTRO = 'Hello, I\'m Belle! If you\'d like to get to know me, find something '
  + 'written on a star and input it below to see what I have to say about it'

export const UNKNOWN_WORD_REPLY = 'Hmm, I don\'t know that word. Is it really written on one of my stars?'

// exact match after trimming, ignoring case and dropping punctuation
export function findBelleWord(offered: string): BelleWord | undefined {
  const offeredWord = normalizeWord(offered.replace(/[^\p{L}\p{N}\s-]/gu, ''))
  return BELLE_WORDS.find(entry => normalizeWord(entry.word) === offeredWord)
}

function normalizeWord(word: string): string {
  return word.trim().toLocaleLowerCase('en')
}
