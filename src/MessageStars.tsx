import { useRef, useState } from 'react'
import { useMessages } from './MessagesContext'
import './MessageStars.css'

const HOVER_DELAY = 2000

const dateFormat = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export default function MessageStars() {
  const { messages } = useMessages()
  const [activeId, setActiveId] = useState<string | null>(null)
  const timers = useRef<Record<string, number>>({})

  function reveal(id: string, delay: number) {
    window.clearTimeout(timers.current[id])
    if (delay === 0) {
      setActiveId(id)
    } else {
      timers.current[id] = window.setTimeout(() => setActiveId(id), delay)
    }
  }

  function hide(id: string) {
    window.clearTimeout(timers.current[id])
    setActiveId(curr => (curr === id ? null : curr))
  }

  return (
    <div className="message-stars" aria-hidden={messages.length === 0}>
      {messages.map(message => {
        const active = activeId === message.id
        const hpos = parseFloat(message.left)
        const vpos = parseFloat(message.top)
        const hAnchor =
          hpos < 30 ? ' message-star__bubble--left'
          : hpos > 70 ? ' message-star__bubble--right'
          : ''
        const vAnchor =
          vpos < 50 ? ' message-star__bubble--below' : ' message-star__bubble--above'
        const anchor = vAnchor + hAnchor
        return (
          <button
            key={message.id}
            type="button"
            className={`message-star${active ? ' message-star--active' : ''}`}
            style={{
              top: message.top,
              left: message.left,
              ['--size' as string]: `${message.size}px`,
              ['--star-opacity' as string]: message.opacity,
              ['--twinkle-delay' as string]: message.delay,
              ['--twinkle-duration' as string]: message.duration,
            }}
            onMouseEnter={() => reveal(message.id, HOVER_DELAY)}
            onMouseLeave={() => hide(message.id)}
            onFocus={() => reveal(message.id, 0)}
            onBlur={() => hide(message.id)}
            onClick={() => reveal(message.id, 0)}
            aria-label={message.alias ? `Message from ${message.alias}` : 'A message'}
          >
            <span className="message-star__dot" aria-hidden="true" />
            {active && (
              <span className={`message-star__bubble${anchor}`} role="tooltip">
                <span className="message-star__text">{message.text}</span>
                <span className="message-star__meta">
                  {message.alias && (
                    <span className="message-star__alias">{message.alias}</span>
                  )}
                  <time
                    className="message-star__date"
                    dateTime={new Date(message.createdAt).toISOString()}
                  >
                    {dateFormat.format(message.createdAt)}
                  </time>
                </span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
