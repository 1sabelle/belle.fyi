// The words Belle knows. Each one is written on a star in the sky (positioned
// by `star`), and offering it to Belle gets her `reply`.
export type BelleWord = {
  word: string
  star: { top: string, left: string }
  reply: string
}

export const BELLE_WORDS: BelleWord[] = [
  {
    word: 'belle',
    star: { top: '14%', left: '6%' },
    reply: 'That\'s me! Belle is short for Isabelle, and this little sky is where I live.',
  },
]

export const UNKNOWN_WORD_REPLY = 'Hmm, I don\'t know that word. Is it really written on one of my stars?'

// exact match after trimming, lowercasing and dropping punctuation
export function findBelleWord(offered: string): BelleWord | undefined {
  const offeredWord = offered.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '')
  return BELLE_WORDS.find(entry => entry.word === offeredWord)
}
