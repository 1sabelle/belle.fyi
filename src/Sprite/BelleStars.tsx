import Sparkle from '../Sparkle'
import { BELLE_WORDS } from './belle.content'
import './BelleStars.css'

// the stars that carry Belle's words; hovering, focusing or tapping one shows its word
export default function BelleStars() {
  return (
    <div className="belle-stars">
      {BELLE_WORDS.map(({ word, star }) => (
        <button
          key={word}
          type="button"
          className="belle-star"
          style={{ top: star.top, left: star.left }}
          aria-label={`A star with the word ${word}`}
        >
          <Sparkle size={12} className="belle-star__sparkle" />
          <span className="belle-star__word" aria-hidden="true">{word}</span>
        </button>
      ))}
    </div>
  )
}
