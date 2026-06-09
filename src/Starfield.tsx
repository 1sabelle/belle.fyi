import { useMemo } from 'react'
import './Starfield.css'

type Star = {
  top: string
  left: string
  size: number
  delay: string
  duration: string
  opacity: number
}

function composeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,        
    delay: `${Math.random() * 6}s`,     
    duration: `${Math.random() * 4 + 4}s`, 
    opacity: Math.random() * 0.5 + 0.2, 
  }))
}

export default function Starfield({ count = 80 }: { count?: number }) {
  const stars = useMemo(() => composeStars(count), [count])

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            ['--star-opacity' as string]: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}