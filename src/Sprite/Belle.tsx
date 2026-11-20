import './Belle.css'

export type BelleState =
  | 'idle'
  | 'listening'
  | 'happy'
  | 'confused'
  | 'talking'
  | 'sleeping'

type BelleProps = {
  state?: BelleState
  size?: number
}

// tiny specks of light twinkling around her
const MOTES = [
  { x: 14, y: 44, delay: '0s' },
  { x: 86, y: 30, delay: '1.1s' },
  { x: 40, y: 92, delay: '2s' },
  { x: 92, y: 66, delay: '0.5s' },
]

// hearts that float up when she is happy
const HEARTS = [
  { x: 4, y: 18, size: 14, delay: '0s' },
  { x: 84, y: 8, size: 10, delay: '0.15s' },
  { x: 70, y: 46, size: 8, delay: '0.3s' },
]

export default function Belle({ state = 'idle', size = 104 }: BelleProps) {
  return (
    <div
      className={`belle belle--${state}`}
      style={{ ['--belle-size' as string]: `${size}px` }}
      role="img"
      aria-label="Belle, a small firefly"
    >
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="belle__mote"
          style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: m.delay }}
        />
      ))}
      <span className="belle__loop">
        <span className="belle__firefly">
          <span className="belle__ring belle__ring--outer" />
          <span className="belle__ring belle__ring--inner" />
          <span className="belle__wing belle__wing--left" />
          <span className="belle__wing belle__wing--right" />
          <span className="belle__body" />
        </span>
      </span>
      {state === 'happy' && HEARTS.map((h, i) => (
        <svg
          key={i}
          className="belle__heart"
          style={{ left: `${h.x}%`, top: `${h.y}%`, width: h.size, height: h.size, animationDelay: h.delay }}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 21.5 C5 16 1.5 12.2 1.5 7.8 C1.5 4.6 4 2.5 6.9 2.5 C9 2.5 10.9 3.7 12 5.6 C13.1 3.7 15 2.5 17.1 2.5 C20 2.5 22.5 4.6 22.5 7.8 C22.5 12.2 19 16 12 21.5 Z" />
        </svg>
      ))}
    </div>
  )
}
