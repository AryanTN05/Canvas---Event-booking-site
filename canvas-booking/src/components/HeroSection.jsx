import { useState } from 'react'
import logo from '../assets/logo-purple.png'
import './HeroSection.css'

export default function HeroSection({ onBookClick }) {
  const [activeVenue, setActiveVenue] = useState('1331')

  return (
    <div className="hero-wrapper">

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <nav className="hero-nav">
        <img src={logo} alt="Canvas" className="hero-nav-logo" />
        <button className="hero-nav-btn" onClick={onBookClick}>Book</button>
      </nav>

      {/* ── Hero — single section ─────────────────────────────────── */}
      <section className="hero">

        {/* Heading */}
        <h1 className="hero-heading">
          <span className="hero-heading-black">Events </span>
          <span className="hero-heading-purple">@ Canvas.</span>
        </h1>

        {/* Two-column body */}
        <div className="hero-body">

          {/* Left — Venue tabs */}
          <div className="venues-row">
            <span className="venue-label">VENUES</span>
            {['1331', '1317'].map(v => (
              <button
                key={v}
                className={`venue-tab ${activeVenue === v ? 'active' : ''}`}
                onClick={() => setActiveVenue(v)}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Right — Photo grid + Map link */}
          <div className="photo-area">
            <div className="photo-grid">
              <div className="photo photo-1"><span>Photo 1</span></div>
              <div className="photo photo-2"><span>Photo 2</span></div>
              <div className="photo photo-3"><span>Photo 3</span></div>
              <div className="photo photo-4"><span>Photo 4</span></div>
            </div>

            {/* Map link */}
            <a href="#" className="map-link" target="_blank" rel="noreferrer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Map Link
            </a>
          </div>

        </div>

      </section>
    </div>
  )
}
