import Arrow from './Arrow'

export default function Hero() {
  return (
    <section className="hero section-wrap">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          SOFTWARE ENGINEER
          <span className="eyebrow-rule" />
          COIMBATORE, INDIA
        </div>
        <h1>
          Making the web
          <br />
          work
          <span className="serif-word">better.</span>
        </h1>
        <p className="hero-intro">
          I’m Navinkumar — a software engineer who turns complex workflows into clear,
          dependable digital products.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#work">
            Explore my work <Arrow />
          </a>
          <a className="text-link" href="/Navinkumar_Resume.pdf" target="_blank" rel="noreferrer">
            View résumé <Arrow diagonal />
          </a>
        </div>
        <div className="hero-note">
          {/* <span>01 — 03</span>
          <span>Thoughtful engineering, from interface to infrastructure.</span> */}
        </div>
      </div>
      <div
        className="hero-visual"
        aria-label="Abstract illustration of connected interface and backend systems">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="visual-label label-top">
          <span>DESIGN</span><i>✳</i><span>DEVELOP</span>
        </div>
        <div className="visual-core">
          <div className="core-glow" />
          <span className="core-bracket">&lt;</span>
          <span className="core-n">NK</span>
          <span className="core-bracket">&gt;</span>
        </div>
        <div className="float-card float-api">
          <span className="float-icon">↗</span>
          <span><b>REST API</b><small>connected</small></span>
          <span className="mini-live" />
        </div>
        <div className="float-card float-ui">
          <span className="ui-icon"><i /><i /><i /></span>
          <span><b>Responsive UI</b><small>built to scale</small></span>
        </div>
        <div className="float-card float-cloud">
          <span className="cloud-icon">☁</span>
          <span><b>Azure</b><small>in production</small></span>
        </div>
        <span className="visual-caption">THOUGHTFUL BY DESIGN <span>✳</span></span>
        <span className="visual-axis axis-x" />
        <span className="visual-axis axis-y" />
      </div>
      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE <span className="scroll-mark">↓</span></span>
        <span>BUILDING FOR PEOPLE, NOT JUST PIXELS.</span>
        <span>EST. 2021</span>
      </div>
    </section>
  )
}
