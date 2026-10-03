import Arrow from './Arrow'

export default function Footer() {
  return (
    <footer className="site-footer section-wrap">
      {/* <a className="wordmark footer-mark" href="#home">
        <span className="wordmark-icon">NK</span>
        <span className="wordmark-name">NAVINKUMAR V R</span>
      </a> */}
      <span className="footer-copy">DESIGNED WITH INTENTION. BUILT TO WORK.</span>
      <div className="footer-links">
        <a href="mailto:navinkumar.vr.29102000@gmail.com">
          EMAIL <Arrow diagonal />
        </a>
        <a href="https://www.linkedin.com/in/navinkumar-v-r-044a4323b/"
          target="_blank"
          rel="noreferrer"
        >
          LINKEDIN <Arrow diagonal />
        </a>
        <a href="/Navinkumar_Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >RÉSUMÉ <Arrow diagonal />
        </a>
      </div>
      <span className="copyright">
        © {new Date().getFullYear()} NAVINKUMAR V R
      </span>
    </footer>
  )
}
