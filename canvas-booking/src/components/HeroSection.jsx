import logo from '../assets/logo-purple.png'
import './HeroSection.css'

export default function HeroSection({ onBookClick }) {
  return (
    <div className="hero-wrapper">

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <nav className="hero-nav">
        <img src={logo} alt="Canvas" className="hero-nav-logo" />
        <button className="hero-nav-btn" onClick={onBookClick}>Book a Space</button>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-content">
          {/* Heading */}
          <h1 className="hero-heading">
            <span className="hero-heading-black">Events </span>
            <span className="hero-heading-purple">@ Canvas.</span>
          </h1>

        </div>
      </section>

    </div>
  )
}
