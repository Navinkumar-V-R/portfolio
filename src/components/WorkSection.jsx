import '../styles/WorkSection.css'
import { useState } from 'react'
import { projects } from '../data/portfolio'
import ProjectArt from './ProjectArt'

const filters = ['All', 'Full stack', 'Web', 'Automation']

export default function WorkSection() {
  const [filter, setFilter] = useState('All')
  const [expandedProjects, setExpandedProjects] = useState({})
  const visibleProjects = filter === 'All' ? projects : projects.filter(project => project.type === filter)

  return (
    <section className="work-section section-wrap" id="work">
      <div className="section-heading">
        <div><div className="eyebrow section-kicker">
          SELECTED WORK
          {/* <span className="section-count">/ 06</span> */}
        </div>
          <h2>
            Built with <span className="serif-word">purpose.</span>
          </h2>
        </div>
        <p>
          A selection of products and workflows<br />
          I’ve helped bring to life.
        </p>
      </div>
      <div className="project-filters" role="group" aria-label="Filter projects">
        {filters.map(item =>
          <button
            type="button"
            aria-pressed={filter === item}
            className={filter === item ? 'filter-chip active' : 'filter-chip'}
            key={item}
            onClick={() => setFilter(item)}
          >
            {item}
            <span>
              {item === 'All' ? '06' : String(projects.filter(project =>
                project.type === item).length).padStart(2, '0')
              }
            </span>
          </button>
        )}
      </div>
      <div className="project-grid">
        {visibleProjects.map(project => {
          const expanded = Boolean(expandedProjects[project.number])
          const detailsId = `project-details-${project.number}`

          return (
            <article className="project-card" key={project.number}>
              <ProjectArt project={project} />
              <div className="project-meta">
                <span>{project.type.toUpperCase()}</span>
                {/* <span>PROJECT {project.number}</span> */}
              </div>
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <button
                  type="button"
                  className="project-link"
                  aria-label={`${expanded ? 'Hide' : 'Show'} what I did for ${project.title}`}
                  aria-expanded={expanded}
                  aria-controls={detailsId}
                  onClick={() =>
                    setExpandedProjects(current =>
                      ({ ...current, [project.number]: !current[project.number] })
                    )
                  }
                >
                  <span className="project-toggle-mark" aria-hidden="true" />
                </button>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="stack-list">
                {project.stack.map(item =>
                  <span key={item}>{item}</span>
                )}
              </div>
              <div className="project-details" id={detailsId} hidden={!expanded}>
                <div className="expanded-label">WHAT I DID</div>
                <ul>
                  {project.work.map(item =>
                    <li key={item}>{item}</li>
                  )}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
