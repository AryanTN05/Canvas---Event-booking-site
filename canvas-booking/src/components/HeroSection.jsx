import { useState } from 'react'
import logo from '../assets/logo-purple.png'
import './HeroSection.css'

const MAP_LINKS = {
  '1331': 'https://www.google.com/maps/place/Canvas+1331(Canvas+Workspace)/@12.9037283,77.6464065,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d9f2bc395f:0xb7a2be5f497e4332!8m2!3d12.9037283!4d77.6489814!16s%2Fg%2F11ww72ftlf?entry=tts&g_ep=EgoyMDI2MDQwOC4wIPu8ASoASAFQAw%3D%3D',
  '1317': 'https://maps.app.goo.gl/x1QLHitTJS4pDFt36',
}

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
            {[
              { id: '1331', label: 'Canvas 1331', address: 'HSR Layout, Bengaluru' },
              { id: '1317', label: 'Canvas 1317', address: 'HSR Layout, Bengaluru' },
            ].map(v => (
              <button
                key={v.id}
                className={`venue-tab ${activeVenue === v.id ? 'active' : ''}`}
                onClick={() => setActiveVenue(v.id)}
              >
                <span className="venue-tab-name">{v.label}</span>
                <span className="venue-tab-addr">{v.address}</span>
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
            {MAP_LINKS[activeVenue] ? (
              <a href={MAP_LINKS[activeVenue]} className="map-link" target="_blank" rel="noreferrer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.2"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                View on Map
              </a>
            ) : (
              <span className="map-link map-link--disabled">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.2"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Map coming soon
              </span>
            )}
          </div>

        </div>

      </section>
    </div>
  )
}
