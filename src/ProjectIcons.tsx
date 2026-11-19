// project icons, drawn in the same single-colour style as the nav moons and sparkles

const PETAL = 'M12 12 L14.2 6.5 L12 1.5 L9.8 6.5 Z'

// six petals around a centre, like the symmetry inside a kaleidoscope
export function KaleidoscopeIcon() {
  return (
    <svg className="project-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <path key={angle} d={PETAL} transform={`rotate(${angle} 12 12)`} />
      ))}
    </svg>
  )
}

// a full moon over the waves it pulls on
export function TideIcon() {
  return (
    <svg className="project-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7.5" r="4.5" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M2 15.5 q2.5 -2.5 5 0 t5 0 t5 0 t5 0" />
        <path d="M2 20 q2.5 -2.5 5 0 t5 0 t5 0 t5 0" />
      </g>
    </svg>
  )
}

// a star waking between code braces
export function CuivienenIcon() {
  return (
    <svg className="project-icon" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3.5 C5 3.5 5 4.5 5 6.5 V9.5 C5 11 4.2 12 3 12 C4.2 12 5 13 5 14.5 V17.5 C5 19.5 5 20.5 7 20.5" />
        <path d="M17 3.5 C19 3.5 19 4.5 19 6.5 V9.5 C19 11 19.8 12 21 12 C19.8 12 19 13 19 14.5 V17.5 C19 19.5 19 20.5 17 20.5" />
      </g>
      <path
        d="M12 7.5 L13.2 10.8 L16.5 12 L13.2 13.2 L12 16.5 L10.8 13.2 L7.5 12 L10.8 10.8 Z"
        fill="currentColor"
      />
    </svg>
  )
}
