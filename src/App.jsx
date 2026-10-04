import { useEffect } from 'react'
import AboutSection from './components/AboutSection'
import CertificationsSection from './components/CertificationsSection'
import ContactSection from './components/ContactSection'
import ExperienceSection from './components/ExperienceSection'
import FocusTicker from './components/FocusTicker'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import WorkSection from './components/WorkSection'

function App() {
  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const root = document.documentElement
        const distance = root.scrollHeight - window.innerHeight
        const progress = distance > 0 ? window.scrollY / distance : 0
        root.style.setProperty('--scroll-progress', progress.toFixed(4))
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('main > section')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach(section => section.classList.add('is-visible'))
      return
    }

    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    sections.forEach(section => observer.observe(section))

    const visual = document.querySelector('.hero-visual')
    const handleParallax = event => {
      if (event.pointerType !== 'mouse') return
      const bounds = visual.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      visual.style.setProperty('--parallax-x', `${(x * 10).toFixed(1)}px`)
      visual.style.setProperty('--parallax-y', `${(y * 10).toFixed(1)}px`)
      visual.querySelectorAll('.float-card').forEach((card, index) => {
        const depth = (index + 1) * -3
        card.style.setProperty('--parallax-x', `${(x * depth).toFixed(1)}px`)
        card.style.setProperty('--parallax-y', `${(y * depth).toFixed(1)}px`)
      })
    }
    const resetParallax = () => {
      visual.style.removeProperty('--parallax-x')
      visual.style.removeProperty('--parallax-y')
      visual.querySelectorAll('.float-card').forEach(card => {
        card.style.removeProperty('--parallax-x')
        card.style.removeProperty('--parallax-y')
      })
    }
    visual.addEventListener('pointermove', handleParallax)
    visual.addEventListener('pointerleave', resetParallax)

    const projectCards = document.querySelectorAll('.project-card')
    const handleTilt = event => {
      const bounds = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      event.currentTarget.style.setProperty('--tilt-x', `${(y * -3).toFixed(2)}deg`)
      event.currentTarget.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`)
    }
    const resetTilt = event => {
      event.currentTarget.style.removeProperty('--tilt-x')
      event.currentTarget.style.removeProperty('--tilt-y')
    }
    projectCards.forEach(card => {
      card.addEventListener('pointermove', handleTilt)
      card.addEventListener('pointerleave', resetTilt)
    })

    return () => {
      observer.disconnect()
      visual.removeEventListener('pointermove', handleParallax)
      visual.removeEventListener('pointerleave', resetParallax)
      projectCards.forEach(card => {
        card.removeEventListener('pointermove', handleTilt)
        card.removeEventListener('pointerleave', resetTilt)
      })
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="home">
        <Hero />
        <FocusTicker />
        <WorkSection />
        <AboutSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
