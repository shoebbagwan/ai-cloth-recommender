import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../utils/api'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [gender, setGender] = useState('')

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!gender) {
      setError('Please select your gender.')
      return
    }
    setLoading(true)
    try {
      await authApi.register(email, password, fullName, gender)
      const res = await authApi.login(email, password)
      localStorage.setItem('token',     res.data.access_token)
      localStorage.setItem('user_id',   String(res.data.user_id))
      localStorage.setItem('full_name', res.data.full_name)
      localStorage.setItem('gender',    gender)
      window.location.href = '/onboarding'
    } catch (err) {
      console.error('Signup error:', err)
      if (err.response?.data?.detail === 'Email already registered') {
        setError('Email already registered. Please sign in instead.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
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
        <h2 style={s.title}>Create your account</h2>
        <p style={s.sub}>Takes 2 minutes. Free forever. No credit card needed.</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSignup} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Full name</label>
            <input style={s.input} type="text" placeholder="Priya Sharma"
              value={fullName} onChange={e => setFullName(e.target.value)} required/>
          </div>
          <div style={s.field}>
            <label style={s.label}>Email address</label>
            <input style={s.input} type="email" placeholder="priya@gmail.com"
              value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="At least 6 characters"
              value={password} onChange={e => setPassword(e.target.value)} required/>
          </div>
          <div style={s.field}>
            <label style={s.label}>I am a</label>
            <div style={s.genderRow}>
              {[
  { id:'male',   label:'Male',   symbol:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round">
      <circle cx="10" cy="14" r="5"/>
      <line x1="19" y1="5" x2="14.14" y2="9.86"/>
      <polyline points="15 5 19 5 19 9"/>
    </svg>
  )},
  { id:'female', label:'Female', symbol:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e05c8a" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="9" r="5"/>
      <line x1="12" y1="14" x2="12" y2="21"/>
      <line x1="9"  y1="18" x2="15" y2="18"/>
    </svg>
  )},
  { id:'unisex', label:'Other',  symbol:(
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="5"/>
      <line x1="11" y1="16" x2="11" y2="21"/>
      <line x1="8"  y1="19" x2="14" y2="19"/>
      <line x1="17" y1="5"  x2="13" y2="9"/>
      <polyline points="14 5 17 5 17 8"/>
    </svg>
  )},
].map(g => (
  <button
    key={g.id}
    type="button"
    style={{...s.genderBtn, ...(gender===g.id ? s.genderBtnOn : {})}}
    onClick={() => setGender(g.id)}>
    {g.symbol}
    <span style={{fontSize:'13px', fontWeight:600}}>{g.label}</span>
  </button>
))}
            </div>
          </div>
          <button style={{...s.btn, opacity: loading ? 0.7 : 1}}
            type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create my account →'}
          </button>
        </form>
        <div style={s.divider}>
          <span style={s.dividerLine}></span>
          <span style={s.dividerText}>or</span>
          <span style={s.dividerLine}></span>
        </div>
        <div style={s.footer}>
          Already have an account?{' '}
          <Link to="/login" style={s.link}>Sign in</Link>
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
  input: { padding:'11px 14px', border:'1.5px solid var(--cream3)', borderRadius:'9px', fontSize:'14px', color:'var(--ink)', background:'var(--cream)', fontFamily:'var(--sans)' },
  btn: { background:'var(--burnt)', color:'#fff', border:'none', borderRadius:'10px', padding:'13px', fontSize:'14px', fontWeight:700, cursor:'pointer', marginTop:'4px' },
  divider: { display:'flex', alignItems:'center', gap:'12px', margin:'20px 0' },
  dividerLine: { flex:1, height:'1px', background:'var(--cream3)' },
  dividerText: { fontSize:'12px', color:'var(--ink4)' },
  footer: { textAlign:'center', fontSize:'13px', color:'var(--ink3)' },
  link: { color:'var(--burnt)', fontWeight:600 },
  genderRow: { display:'flex', gap:'8px' },
  genderBtn: { flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', padding:'12px 8px', border:'1.5px solid var(--cream3)', borderRadius:'10px', background:'var(--cream)', cursor:'pointer', transition:'all .18s' },
  genderBtnOn: { border:'1.5px solid var(--burnt)', background:'var(--burnt3)' },
}
