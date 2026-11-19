import { NavLink } from 'react-router-dom'
import Sparkle from './Sparkle'
import './Nav.css'

type Phase = 'new' | 'waxing' | 'full' | 'waning'

// x-position of the shadow for each moon phase (relative to center).
// the cycle reads left-to-right across the nav: waxing → full → waning
const SHADOW_X: Record<Phase, number> = {
  new: 12,
  waxing: 6,
  full: -12,
  waning: 18,
}

// a moon! in different phases:
function Moon({ phase }: { phase: Phase }) {
  const maskId = `moon-${phase}`
  return (
    <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
      <mask id={maskId}>
        <circle cx="12" cy="12" r="9" fill="white" />
        <circle cx={SHADOW_X[phase]} cy="12" r="8" fill="black" />
      </mask>
      <circle cx="10" cy="10" r="12" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

// each moon has its own twinkles, styled in Nav.css by name
const PAGES = [
  { to: '/', label: 'home', phase: 'waxing', twinkles: ['twirl'] },
  { to: '/work', label: 'work', phase: 'full', twinkles: ['above', 'below'] },
  { to: '/contact', label: 'contact', phase: 'waning', twinkles: ['falling', 'falling-small'] },
] as const

function NavItem({ to, label, phase, twinkles }: (typeof PAGES)[number]) {
  return (
    <NavLink to={to} className="nav__link" end={to === '/'}>
      <span className="nav__moon">
        <Moon phase={phase} />
        {twinkles.map(twinkle => (
          <Sparkle key={twinkle} size={12} className={`nav__twinkle nav__twinkle--${twinkle}`} />
        ))}
      </span>
      <span className="nav__label">{label}</span>
    </NavLink>
  )
}

export default function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      {PAGES.map(page => (
        <NavItem key={page.to} {...page} />
      ))}
    </nav>
  )
}
