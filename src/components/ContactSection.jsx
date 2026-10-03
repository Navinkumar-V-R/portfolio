import Arrow from './Arrow'

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-wrap contact-wrap">
        <div className="eyebrow">
          <span className="status-dot" />
          OPEN TO THE NEXT CHALLENGE
        </div>
        <h2>
          Have a good one
          <br />in <span className="serif-word">mind?</span>
        </h2>
        <div className="contact-bottom">
          <p>Let’s talk about what you’re building
            <br />and how I can help.
          </p>
          <a className="button button-light"
            href="mailto:navinkumar.vr.29102000@gmail.com">
            Start a conversation
            <Arrow diagonal />
          </a>
        </div>
        <span className="contact-deco">✳</span>
      </div>
    </section>
  )
}
