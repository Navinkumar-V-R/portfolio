import { certifications } from '../data/portfolio'

export default function CertificationsSection() {
  return (
    <section className="certifications-section" id="certifications">
      <div className="section-wrap certification-content">
        <div className="section-heading">
          <div>
            <div className="eyebrow section-kicker">
              CONTINUOUS LEARNING 
              {/* <span className="section-count">/ 03</span> */}
            </div>
            <h2>
              Certifications<span className="serif-word">.</span>
            </h2>
          </div>
          <p>
            Knowledge built through<br />
            study and practice.
          </p>
        </div>

        <div className="certification-grid">
          {certifications.map(([issuer, title], index) => (
            <article className="certification-card" key={title}>
              <span className="certification-number">0{index + 1}</span>
              <div>
                <span className="certification-issuer">{issuer}</span>
                <h3>{title}</h3>
              </div>
              <span className="certification-seal" aria-hidden="true">✳</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
