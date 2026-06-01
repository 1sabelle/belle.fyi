 import { NavLink } from 'react-router-dom'
 import './Nav.css'

 type Phase = 'waxing' | 'full' | 'waning'

  // x-position of the shadow for each moon phase (relative to center)
  const SHADOW_X: Record<Phase, number> = {
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

  const PAGES = [
    { to: '/', label: 'home', phase: 'waxing' },
    { to: '/work', label: 'work', phase: 'full' },
    { to: '/contact', label: 'contact', phase: 'waning' },
  ] as const

   function NavItem({ to, label, phase }: (typeof PAGES)[number]) {
    return (
      <NavLink to={to} className="nav__link" end={to === '/'}>
        <Moon phase={phase} />
        <span className="nav__label">{label}</span>
      </NavLink>
    )
  }

  export default function Nav() {
    return (
      <nav className="nav" aria-label="Primary">
        {PAGES.map((page) => (
          <NavItem key={page.to} {...page} />
        ))}
      </nav>
    )
  }