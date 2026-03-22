import { Link, useLocation, useNavigate } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Discover'    },
  { to: '/wardrobe',  label: 'My Wardrobe' },
  { to: '/profile',   label: 'Profile'     },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate     = useNavigate()
  const fullName     = localStorage.getItem('full_name')
  const isLoggedIn   = !!localStorage.getItem('token')

  function getInitials(name) {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('full_name')
    navigate('/')
  }

  return (
    <nav style={s.nav}>
      <div style={s.inner}>

        {/* Logo */}
        <Link to="/" style={s.logo}>
          <div style={s.logoBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M20.38 18H3.62a1 1 0 0 1-.7-1.71L12 8"/>
              <path d="M12 8V5"/>
              <circle cx="12" cy="4" r="1"/>
            </svg>
          </div>
          <span style={s.logoText}>
            Attire<span style={{color:'var(--burnt)'}}>AI</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={s.links}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              ...s.link,
              ...(pathname === l.to ? s.linkActive : {})
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={s.right}>
          {isLoggedIn ? (
            <>
              <div style={s.userPill}>
                <div style={s.userAv}>{getInitials(fullName)}</div>
                <span style={s.userName}>
                  {fullName?.split(' ')[0] || 'User'}
                </span>
              </div>
              <button style={s.logoutBtn} onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button style={s.ghostBtn}>Sign in</button>
              </Link>
              <Link to="/signup">
                <button style={s.cta}>Get Started →</button>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

const s = {
  nav: { background:'rgba(250,247,242,0.96)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--cream3)', position:'sticky', top:0, zIndex:100 },
  inner: { maxWidth:'1200px', margin:'0 auto', padding:'0 28px', height:'58px', display:'flex', alignItems:'center', justifyContent:'space-between' },
  logo: { display:'flex', alignItems:'center', gap:'9px' },
  logoBox: { width:'32px', height:'32px', background:'var(--burnt)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' },
  logoText: { fontFamily:'var(--serif)', fontSize:'18px', fontWeight:600, color:'var(--ink)', letterSpacing:'-.01em' },
  links: { display:'flex', gap:'28px' },
  link: { fontSize:'13px', fontWeight:500, color:'var(--ink3)', transition:'color .18s', paddingBottom:'3px' },
  linkActive: { color:'var(--ink)', borderBottom:'2px solid var(--burnt)' },
  right: { display:'flex', alignItems:'center', gap:'10px' },
  userPill: { display:'flex', alignItems:'center', gap:'8px', background:'var(--cream2)', border:'1px solid var(--cream4)', borderRadius:'999px', padding:'5px 12px 5px 7px', cursor:'pointer' },
  userAv: { width:'24px', height:'24px', borderRadius:'50%', background:'var(--burnt)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:700, color:'#fff' },
  userName: { fontSize:'13px', fontWeight:500, color:'var(--ink2)' },
  logoutBtn: { fontSize:'13px', fontWeight:500, color:'var(--ink3)', padding:'7px 14px', borderRadius:'8px', cursor:'pointer', border:'1px solid var(--cream4)', background:'transparent', transition:'all .18s' },
  ghostBtn: { fontSize:'13px', fontWeight:500, color:'var(--ink2)', padding:'8px 16px', borderRadius:'8px', cursor:'pointer', background:'transparent', border:'none' },
  cta: { background:'var(--burnt)', color:'#fff', borderRadius:'999px', padding:'8px 18px', fontSize:'13px', fontWeight:600, cursor:'pointer', border:'none' },
}