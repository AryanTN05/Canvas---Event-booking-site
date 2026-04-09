import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import logo from './assets/canvas-logo.png'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  /* If already logged in, skip straight to admin dashboard */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin', { replace: true })
    })
  }, [navigate])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    /* Frontend domain check before hitting Supabase */
    if (!email.toLowerCase().endsWith('@canvaswork.co')) {
      setError('Only Canvas Workspace members (@canvaswork.co) can access this page.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (authError) {
      setError('Invalid email or password. Please try again.')
    } else {
      navigate('/admin', { replace: true })
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <img src={logo} alt="Canvas" onError={e => { e.target.style.display = 'none' }} />
        </div>

        <div className="login-header">
          <h1>Admin Access</h1>
          <p>Sign in with your Canvas Workspace email</p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="name@canvaswork.co"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="login-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8"  x2="12"    y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading
              ? <><span className="spinner spinner-sm" /> Signing in…</>
              : 'Sign In'
            }
          </button>
        </form>

        <p className="login-note">
          Restricted to @canvaswork.co accounts only
        </p>
      </div>
    </div>
  )
}
