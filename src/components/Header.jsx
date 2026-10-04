import '../styles/Header.css'
import { useState } from 'react'
import Arrow from './Arrow'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navClass = menuOpen ? 'nav-links nav-open' : 'nav-links'

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Navinkumar, home">
        <span className="wordmark-icon">NK</span>
        <span className="wordmark-name">NAVINKUMAR V R</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <nav className={navClass}
        aria-label="Main navigation"
        onClick={() => setMenuOpen(false)}
      >
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#certifications">Certifications</a>
        <a href="#contact" className="nav-contact">Let’s talk <Arrow diagonal /></a>
      </nav>
    </header>
  )
}
