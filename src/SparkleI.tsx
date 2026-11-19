// the favicon's elvish i, sized to sit in a line of text: a pen-stroke stem
// with a small sparkle for its dot. the stem takes the text colour
export default function SparkleI({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="12 6 9 24.5" aria-hidden="true">
      <path
        d="M16.3 6.1 L17.26 9.34 L20.5 10.3 L17.26 11.26 L16.3 14.5 L15.34 11.26 L12.1 10.3 L15.34 9.34 Z"
        className="sparkle-i__dot"
        fill="currentColor"
      />
      <path
        d="M14 16.9 Q16.6 15.7 18.4 16.4 Q17.1 23 17.2 26.8 Q17.3 28.9 19.7 29.3 Q16.2 31.7 14.4 29.3 Q13.6 28 14.1 25.1 Q14.8 21.1 14 16.9 Z"
        fill="currentColor"
      />
    </svg>
  )
}
