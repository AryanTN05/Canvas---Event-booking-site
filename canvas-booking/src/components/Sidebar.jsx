import { useState } from 'react'
import logo from '../assets/canvas-logo.png'
import { BUILDINGS, APP_VERSION } from '../constants'

export default function Sidebar({ activeView, onNavigate }) {
  const [logoError, setLogoError] = useState(false)

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sb-logo">
        {logoError ? (
          <div className="logo-text">
            <div className="lt-name">CANVAS</div>
            <div className="lt-tag">SPACE FOR BIG IDEAS</div>
          </div>
        ) : (
          <img
            src={logo}
            alt="Canvas"
            onError={() => setLogoError(true)}
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="sb-nav">
        <span className="sb-nav-label">Navigation</span>

        <button
          className={`nav-btn ${activeView === 'add' ? 'active' : ''}`}
          onClick={() => onNavigate('add')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8"  y1="2" x2="8"  y2="6"/>
            <line x1="3"  y1="10" x2="21" y2="10"/>
            <line x1="12" y1="14" x2="12" y2="18"/>
            <line x1="10" y1="16" x2="14" y2="16"/>
          </svg>
          Add Event
        </button>

        <button
          className={`nav-btn ${activeView === 'scheduled' ? 'active' : ''}`}
          onClick={() => onNavigate('scheduled')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6"  x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <circle cx="3.5" cy="6"  r="0.5" fill="currentColor" stroke="none"/>
            <circle cx="3.5" cy="12" r="0.5" fill="currentColor" stroke="none"/>
            <circle cx="3.5" cy="18" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
          Scheduled Events
        </button>
      </nav>

      {/* Footer */}
      <div className="sb-footer">
        {BUILDINGS.join(' · ')} · {APP_VERSION}
      </div>
    </aside>
  )
}
