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

// irregular streaks radiating from the core — uneven angles, lengths, widths
const RAYS = [
  { angle: 8, len: 82, w: 2, o: 0.7, delay: '0s' },
  { angle: 41, len: 48, w: 1.5, o: 0.45, delay: '0.9s' },
  { angle: 96, len: 66, w: 2.5, o: 0.6, delay: '1.7s' },
  { angle: 151, len: 38, w: 1.5, o: 0.4, delay: '0.4s' },
  { angle: 189, len: 92, w: 3, o: 0.75, delay: '1.2s' },
  { angle: 233, len: 44, w: 1.5, o: 0.5, delay: '2.1s' },
  { angle: 287, len: 72, w: 2, o: 0.6, delay: '0.6s' },
  { angle: 331, len: 54, w: 2, o: 0.55, delay: '1.5s' },
]

export default function Belle({ state = 'idle', size = 104 }: BelleProps) {
  return (
    <div
      className={`belle belle--${state}`}
      style={{ ['--belle-size' as string]: `${size}px` }}
      role="img"
      aria-label="Belle, a small star-sprite"
    >
      <div className="belle__haze" />
      <div className="belle__rays">
        {RAYS.map((r, i) => (
          <span
            key={i}
            className="belle__ray"
            style={{
              ['--ray-angle' as string]: `${r.angle}deg`,
              ['--ray-len' as string]: `${r.len}%`,
              ['--ray-w' as string]: `${r.w}px`,
              ['--ray-o' as string]: r.o,
              animationDelay: r.delay,
            }}
          />
        ))}
      </div>
      <div className="belle__core" />
      <span className="belle__glint belle__glint--1" />
      <span className="belle__glint belle__glint--2" />
      <span className="belle__glint belle__glint--3" />
    </div>
  )
}
