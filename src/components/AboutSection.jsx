import '../styles/AboutSection.css'
import { skills } from '../data/portfolio'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="section-wrap about-grid">
        <div className="about-left">
          <div className="eyebrow section-kicker">
            A LITTLE ABOUT ME
            {/* <span className="section-count">/ 01</span> */}
          </div>
          <div className="about-stamp">
            4
            <span>+</span>
            <small>YEARS<br />BUILDING</small>
          </div>
          <div style={{ height: '20%' }} />
        </div>
        <div className="about-right">
          <h2>Curious by nature.
            <br />
            <span className="serif-word">Considered</span>
            in practice.</h2>
          <p className="about-lede">
            I work across the stack to make software feel simpler — for the people
            using it and the teams maintaining it.
          </p>
          <p className="about-body">Since 2021, I’ve helped build and support web applications
            from early requirements through deployment. My work brings together responsive
            frontend development, reliable APIs, thoughtful data handling, and the quieter details
            that make products work well day after day.
          </p>
          <div className="skills-list">
            {skills.map(([category, items], index) =>
              <div className="skill-row" key={category}>
                <span className="skill-number">0{index + 1}</span>
                <span className="skill-name">{category}</span>
                <span className="skill-items">{items}</span>
                <span className="skill-plus">↗</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
