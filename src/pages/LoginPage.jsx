import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../utils/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login(email, password)
      localStorage.setItem('token',     res.data.access_token)
      localStorage.setItem('user_id',   res.data.user_id)
      localStorage.setItem('full_name', res.data.full_name)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Logo */}
        <div style={s.logo}>
          <div style={s.logoBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M20.38 18H3.62a1 1 0 0 1-.7-1.71L12 8"/>
              <path d="M12 8V5"/>
              <circle cx="12" cy="4" r="1"/>
            </svg>
          </div>
          <span style={s.logoText}>Attire<span style={{color:'var(--burnt)'}}>AI</span></span>
        </div>

        <h2 style={s.title}>Welcome back</h2>
        <p style={s.sub}>Sign in to get your personalised outfit recommendations</p>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleLogin} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email address</label>
            <input
              style={s.input}
              type="email"
              placeholder="priya@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              style={s.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>

        <div style={s.footer}>
          Don't have an account?{' '}
          <Link to="/signup" style={s.link}>Create one free</Link>
        </div>

      </div>
    </div>
  )
}

const s = {
  page: { minHeight:'100vh', background:'var(--cream)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' },
  card: { background:'var(--white)', border:'1px solid var(--cream3)', borderRadius:'20px', padding:'40px', width:'100%', maxWidth:'420px', boxShadow:'var(--shadow-md)' },
  logo: { display:'flex', alignItems:'center', gap:'9px', marginBottom:'28px' },
  logoBox: { width:'32px', height:'32px', background:'var(--burnt)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' },
  logoText: { fontFamily:'var(--serif)', fontSize:'18px', fontWeight:600, color:'var(--ink)' },
  title: { fontFamily:'var(--serif)', fontSize:'28px', fontWeight:700, color:'var(--ink)', marginBottom:'6px' },
  sub: { fontSize:'14px', color:'var(--ink3)', marginBottom:'28px', lineHeight:1.6 },
  error: { background:'#fdf0ee', border:'1px solid rgba(184,84,48,.2)', borderRadius:'8px', padding:'10px 14px', fontSize:'13px', color:'var(--burnt)', marginBottom:'16px' },
  form: { display:'flex', flexDirection:'column', gap:'16px' },
  field: { display:'flex', flexDirection:'column', gap:'6px' },
  label: { fontSize:'11px', fontWeight:700, letterSpacing:'.07em', textTransform:'uppercase', color:'var(--ink4)' },
  input: { padding:'11px 14px', border:'1.5px solid var(--cream3)', borderRadius:'9px', fontSize:'14px', color:'var(--ink)', background:'var(--cream)', fontFamily:'var(--sans)', transition:'border-color .18s' },
  btn: { background:'var(--burnt)', color:'#fff', border:'none', borderRadius:'10px', padding:'13px', fontSize:'14px', fontWeight:700, cursor:'pointer', marginTop:'4px' },
  footer: { textAlign:'center', marginTop:'20px', fontSize:'13px', color:'var(--ink3)' },
  link: { color:'var(--burnt)', fontWeight:600 },
}