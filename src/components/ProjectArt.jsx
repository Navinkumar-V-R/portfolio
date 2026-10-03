export default function ProjectArt({ project }) {
  return (
    <div className={`project-art art-${project.art}`} aria-hidden="true">
      <div className="art-window">
        <div className="window-bar">
          <i /><i /><i />
          <span>{project.title}</span>
        </div>
        <div className="art-content">
          {project.art === 'hrms' &&
            <>
              <div className="art-side" />
              <div className="art-panel">
                <b /><b /><b />
              </div>
              <div className="art-circles">
                <i /><i /><i />
              </div>
            </>
          }
          {project.art === 'placement' &&
            <>
              <div className="art-heading">
                <i /><b /><i />
              </div>
              <div className="art-rows">
                <i /><i /><i /><i />
              </div>
              <div className="art-pill" />
            </>
          }
          {project.art === 'wellness' &&
            <>
              <div className="sun-shape" />
              <div className="wellness-line" />
              <div className="wellness-card">
                <i /><b /><b />
              </div>
            </>
          }
          {project.art === 'uveda' &&
            <>
              <div className="map-grid" />
              <div className="map-pin">⌖</div>
              <div className="map-card">
                <i /><i />
              </div></>
          }
          {project.art === 'office' &&
            <>
              <div className="site-title" />
              <div className="site-image" />
              <div className="site-copy">
                <i /><i /><b />
              </div>
            </>
          }
          {project.art === 'automation' &&
            <>
              <div className="flow-node">01</div>
              <div className="flow-line" />
              <div className="flow-node">02</div>
              <div className="flow-line" />
              <div className="flow-node">✓</div>
            </>
          }
        </div>
      </div>
      <span className="art-index">{project.mark}</span>
    </div>
  )
}
