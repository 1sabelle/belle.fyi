import { useRef, useState, type FormEvent } from 'react'
import Belle, { type BelleState } from './Belle'
import { findBelleWord, UNKNOWN_WORD_REPLY } from './belle.content'

type BubbleState = 'closed' | 'prompt' | 'open'

const HAPPY_DURATION = 1600
const CONFUSED_DURATION = 700

export default function BellePanel() {
  const [bubble, setBubble] = useState<BubbleState>('prompt')
  const [belleState, setBelleState] = useState<BelleState>('idle')
  const [offered, setOffered] = useState('')
  const [reply, setReply] = useState('')
  const reactionTimer = useRef<number>(undefined)

  function react(state: BelleState, duration: number) {
    window.clearTimeout(reactionTimer.current)
    setBelleState(state)
    reactionTimer.current = window.setTimeout(() => setBelleState('idle'), duration)
  }

  function offerWord(event: FormEvent) {
    event.preventDefault()
    if (!offered.trim()) return
    const known = findBelleWord(offered)
    if (known) {
      setReply(known.reply)
      react('happy', HAPPY_DURATION)
    }
    else {
      setReply(UNKNOWN_WORD_REPLY)
      react('confused', CONFUSED_DURATION)
    }
    setOffered('')
  }

  return (
    <div className="belle-dock">
      {bubble !== 'closed' && (
        <div className={`belle-bubble belle-bubble--${bubble}`}>
          {bubble === 'prompt'
            ? (
                <button type="button" className="belle-bubble__open" onClick={() => setBubble('open')}>
                  talk to me!
                </button>
              )
            : (
                <div className="belle-bubble__talk">
                  <p className="belle-bubble__intro">
                    Hello, I'm Belle! If you'd like to get to know me, find something written on a
                    star and input it below to see what I have to say about it
                  </p>
                  <form className="belle-bubble__form" onSubmit={offerWord}>
                    <input
                      className="belle-bubble__input"
                      value={offered}
                      onChange={event => setOffered(event.target.value)}
                      placeholder="a word from a star"
                      aria-label="A word from a star"
                      maxLength={40}
                      autoFocus
                    />
                    <button type="submit" className="belle-bubble__offer">offer</button>
                  </form>
                  <p className="belle-bubble__reply" aria-live="polite">{reply}</p>
                </div>
              )}
          <button
            type="button"
            className="belle-bubble__close"
            aria-label={bubble === 'open' ? 'Minimise' : 'Close'}
            onClick={() => setBubble(bubble === 'open' ? 'prompt' : 'closed')}
          >
            ×
          </button>
        </div>
      )}
      <button
        type="button"
        className="belle-dock__belle"
        aria-label="Talk to Belle"
        onClick={() => setBubble(curr => (curr === 'closed' ? 'prompt' : curr))}
      >
        <Belle state={belleState} />
      </button>
    </div>
  )
}
