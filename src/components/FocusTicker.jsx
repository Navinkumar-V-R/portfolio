import '../styles/FocusTicker.css'
const topics = ['FULL STACK DEVELOPMENT', 'RESPONSIVE INTERFACES', 'API INTEGRATION', 'PROCESS AUTOMATION']

export default function FocusTicker() {
  const repeatedTopics = [...topics, ...topics]

  return (
    <section className="ticker" aria-label="Areas of focus">
      <div className="ticker-track">
        {repeatedTopics.map((topic, index) =>
          <span className="ticker-item" key={`${topic}-${index}`}>
            <span>{topic}</span>
            <i>✳</i>
          </span>
        )}
      </div>
    </section>
  )
}
