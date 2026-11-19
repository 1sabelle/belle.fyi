import { createPortal } from 'react-dom'
import './ShootingStar.css'

export type Flight = {
  starId: string
  fromX: number
  fromY: number
  toX: number
  toY: number
}

// a glowing head with a tail behind it, flying from the shoot button to the new star.
// rendered into <body> because the hero's rise animation leaves a transform on its
// ancestors, which would otherwise pin position: fixed to them instead of the viewport
export default function ShootingStar({ flight, onLanded }: { flight: Flight, onLanded: () => void }) {
  const dx = flight.toX - flight.fromX
  const dy = flight.toY - flight.fromY
  const heading = Math.atan2(dy, dx)

  return createPortal(
    <span
      className="shooting-star"
      aria-hidden="true"
      style={{
        left: flight.fromX,
        top: flight.fromY,
        ['--dx' as string]: `${dx}px`,
        ['--dy' as string]: `${dy}px`,
        ['--heading' as string]: `${heading}rad`,
      }}
      onAnimationEnd={onLanded}
    />,
    document.body,
  )
}
