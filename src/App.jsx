import './App.css'
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
  return (
    <>
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
