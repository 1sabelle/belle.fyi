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

// a star waking between code brackets, each bracket a pair of leaves.
// cropped closer than the others because the brackets are wider than they are tall
export function CuivienenIcon() {
  return (
    <svg className="project-icon" viewBox="2.5 2.5 19 19" aria-hidden="true">
      <g fill="currentColor">
        <path d="M2.8 12 Q4 7.9 8.4 5.8 Q7.2 9.9 2.8 12 Z" />
        <path d="M2.8 12 Q4 16.1 8.4 18.2 Q7.2 14.1 2.8 12 Z" />
        <path d="M21.2 12 Q20 7.9 15.6 5.8 Q16.8 9.9 21.2 12 Z" />
        <path d="M21.2 12 Q20 16.1 15.6 18.2 Q16.8 14.1 21.2 12 Z" />
      </g>
      <path d="M12 8.5 L12.9 11.1 L15.5 12 L12.9 12.9 L12 15.5 L11.1 12.9 L8.5 12 L11.1 11.1 Z" fill="currentColor" />
    </svg>
  )
}

// an open eye with a star for its pupil, from the seer school favicon
export function SeerSchoolIcon() {
  return (
    <svg className="project-icon" viewBox="3 3 26 26" aria-hidden="true">
      <path d="M4 16 Q16 5 28 16 Q16 27 4 16 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 10.8 L17.2 14.8 L21.2 16 L17.2 17.2 L16 21.2 L14.8 17.2 L10.8 16 L14.8 14.8 Z" fill="currentColor" />
    </svg>
  )
}
