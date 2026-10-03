export default function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow">
      <path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3 10h13m-5-5 5 5-5 5'} />
    </svg>
  )
}
