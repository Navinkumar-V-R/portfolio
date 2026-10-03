export default function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-wrap experience-content">
        <div className="section-heading">
          <div>
            <div className="eyebrow section-kicker">
              THE JOURNEY 
              {/* <span className="section-count">/ 02</span> */}
            </div>
            <h2>
              Experience that <span className="serif-word">adds up.</span>
            </h2>
          </div>
          <p>
            Good work comes from care,<br />
            collaboration, and iteration.
          </p>
        </div>

        <details className="experience-accordion">
          <summary className="experience-card">
            <div className="experience-date">
              <span>DEC 2021</span>
              <i>—</i>
              <span>PRESENT</span>
            </div>
            <div className="experience-main">
              <span className="experience-type">
                <i className="status-dot" /> CURRENT ROLE
              </span>
              <h3>
                Software Engineer<br />
                <span>/ Full Stack Developer</span>
              </h3>
              <p className="company-name">
                Emergere Computing Solutions Pvt Ltd <span>· Coimbatore</span>
              </p>
            </div>
            <div className="experience-detail">
              <p>
                Working across the full application lifecycle: building interfaces
                and APIs, supporting Azure deployments, solving production issues,
                and helping junior developers grow.
              </p>
              <div className="experience-tags">
                <span>React & Next.js</span>
                <span>FastAPI & Node.js</span>
                <span>Azure</span>
                <span>Agile</span>
              </div>
            </div>
            <span className="disclosure-icon experience-disclosure" aria-hidden="true" />
          </summary>
          <div className="experience-expanded">
            <div className="expanded-label">ROLES & RESPONSIBILITIES</div>
            <ul>
              <li>Designed, developed, tested, and maintained full stack applications with React, Next.js, FastAPI, Node.js, MySQL, MongoDB, and Azure.</li>
              <li>Built responsive, reusable React components and REST APIs connecting frontends, backend services, and databases.</li>
              <li>Implemented business logic, CRUD operations, validation, authentication, authorization, and secure request handling.</li>
              <li>Worked across requirements, development, testing, deployment, maintenance, and production support in Agile teams.</li>
              <li>Resolved production issues and delivered fixes, enhancements, and performance improvements.</li>
              <li>Supported Azure deployment, monitoring, release management, and production maintenance; used Git and GitHub for collaboration and release support.</li>
              <li>Guided junior developers on feature development, debugging, application workflows, code reviews, and clean coding practices.</li>
            </ul>
          </div>
        </details>

        <div className="automation-note">
          <span className="automation-icon">⌘</span>
          <div>
            <b>Also building smarter workflows.</b>
            <p>
              UiPath, Jiffy.ai, and Python automation — from requirements and error
              handling to reliable production runs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
