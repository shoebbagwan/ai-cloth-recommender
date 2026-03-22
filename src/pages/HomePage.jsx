import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div style={s.page}>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navInner}>
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
          <div style={s.navLinks}>
            <Link to="/dashboard" style={s.navLink}>Discover</Link>
            <Link to="/wardrobe"  style={s.navLink}>My Wardrobe</Link>
            <Link to="/profile"   style={s.navLink}>Profile</Link>
          </div>
          <div style={s.navRight}>
            <Link to="/onboarding">
              <button style={s.navBtnGhost}>Sign in</button>
            </Link>
            <Link to="/signup">
              <button style={s.navBtn}>Get Started →</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroLeft} className="page-enter">
          <div style={s.heroBadge}>
            <div style={s.heroBadgeDot}></div>
            <span style={s.heroBadgeText}>Season 2026 — Now Live</span>
          </div>
          <h1 style={s.heroH1}>
            Your personal<br/>
            <em style={{color:'var(--burnt)',fontStyle:'italic'}}>style advisor,</em><br/>
            powered by AI
          </h1>
          <p style={s.heroSub}>
            Stop staring at your wardrobe every morning. AttireAI recommends
            the perfect outfit based on today's weather, your occasion, body
            type, and personal colour profile.
          </p>
          <div style={s.heroBtns}>
            <Link to="/signup">
              <button style={s.btnPrimary}>Build my style profile — free</button>
            </Link>
            <Link to="/dashboard">
              <button style={s.btnSecondary}>Try the demo →</button>
            </Link>
          </div>
          <div style={s.heroProof}>
            <div style={s.avatars}>
              {['#b85430','#3a5c38','#2c4a6e','#7a5030'].map((c,i) => (
                <div key={i} style={{...s.avatar, background: c}}>
                  {['PS','AR','MK','SN'][i]}
                </div>
              ))}
            </div>
            <span style={s.proofText}><b>12,400+</b> users this week</span>
            <div style={s.proofSep}></div>
            <span style={s.proofText}>⭐ <b>4.9</b> / 5.0</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div style={s.heroVisual}>
          <div style={s.circle1}></div>
          <div style={s.circle2}></div>

          {/* Main outfit card */}
          <div style={s.outfitCard}>
            <div style={s.outfitCardTop}>
              <div style={s.outfitCardLabel}>Top pick · Office · Mumbai</div>
              <div style={s.outfitCardTitle}>The Classic Neutral</div>
              <div style={s.outfitCardSub}>Warm undertone · Hourglass fit</div>
            </div>
            <div style={s.outfitCardBody}>
              {[
                { color: '#f0ebe0', name: 'White Linen Shirt',  sub: 'Linen · Breathable' },
                { color: '#c8b89a', name: 'Beige Slim Chinos',  sub: 'Cotton · Tailored' },
                { color: '#6b4c30', name: 'Tan Derby Shoes',    sub: 'Leather · Polished' },
              ].map((item, i) => (
                <div key={i} style={s.outfitRow}>
                  <div style={{...s.outfitSwatch, background: item.color}}></div>
                  <div style={{flex:1}}>
                    <div style={s.outfitItemName}>{item.name}</div>
                    <div style={s.outfitItemSub}>{item.sub}</div>
                  </div>
                  <div style={s.checkCircle}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.outfitCardFooter}>
              <div>
                <div style={s.scoreLabel}>AI Match Score</div>
                <div style={s.scoreSub}>Weather · Colour · Fit</div>
              </div>
              <div style={s.scoreNum}>96%</div>
            </div>
          </div>

          {/* Weather float */}
          <div style={s.floatWeather}>
            <div style={s.floatLabel}>Mumbai, MH</div>
            <div style={s.floatTemp}>32° ☀️</div>
            <div style={s.floatCond}>Clear · feels 35°C</div>
            <div style={s.floatTags}>
              <span style={s.floatTag}>Cotton</span>
              <span style={s.floatTag}>Linen</span>
            </div>
          </div>

          {/* Harmony float */}
          <div style={s.floatHarmony}>
            <div style={s.harmonyTop}>
              <span style={s.floatLabel}>Colour harmony</span>
              <span style={s.harmonyVal}>94%</span>
            </div>
            <div style={s.harmonyBar}>
              <div style={s.harmonyFill}></div>
            </div>
            <div style={s.harmonySwatch}>
              {['#c4703f','#b8963e','#c8b89a','#6b4c30','#f0ebe0'].map((c,i) => (
                <div key={i} style={{...s.harmonyDot, background: c}}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <div style={s.strip}>
        {[
          { icon: '🌤️', text: 'Live weather from OpenWeatherMap' },
          { icon: '🎯', text: '90%+ recommendation accuracy' },
          { icon: '👗', text: '500+ clothing items in database' },
          { icon: '🔒', text: 'Your data is never sold' },
        ].map((item, i) => (
          <div key={i} style={s.stripItem}>
            <span style={{fontSize:'16px'}}>{item.icon}</span>
            <span style={{fontSize:'13px', color:'var(--ink3)'}}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section style={s.features}>
        <div style={s.sectionTag}>How it works</div>
        <h2 style={s.sectionTitle}>Four engines, one perfect outfit</h2>
        <p style={s.sectionSub}>
          Every recommendation combines real-time weather, occasion logic,
          body type science, and colour theory — all working together.
        </p>
        <div style={s.featGrid}>
          {[
            { bg:'#fff8ef', icon:'🌤️', title:'Live weather sync',   body:'Pulls real-time temperature and humidity for your city. Recommends the right fabrics so you\'re never too hot or cold.' },
            { bg:'#eef3ed', icon:'🎯', title:'Occasion matching',   body:'From daily errands to formal weddings — 8 occasions with distinct style logic. Every setting covered.' },
            { bg:'#fdf2ee', icon:'👤', title:'Body type advisor',   body:'Five body types, each with tailored fit and silhouette recommendations. Clothes that flatter your actual shape.' },
            { bg:'#f5f0ff', icon:'🎨', title:'Colour science',      body:'Seasonal colour analysis based on your skin undertone. We tell you exactly which shades make you glow.' },
          ].map((f, i) => (
            <div key={i} style={s.featCard}>
              <div style={{...s.featIcon, background: f.bg}}>{f.icon}</div>
              <div style={s.featTitle}>{f.title}</div>
              <div style={s.featBody}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={s.testi}>
        <div style={s.sectionTag}>Real users</div>
        <h2 style={s.sectionTitle}>People are dressing better</h2>
        <div style={s.testiGrid}>
          {[
            { av:'PS', bg:'#b85430', name:'Priya Sharma',   role:'Product Manager · Mumbai',   text:'"I used to spend 20 minutes every morning staring at my wardrobe. Now I open AttireAI, pick my occasion, and I\'m dressed in five. The weather-based suggestions are spot on for Mumbai\'s humidity."' },
            { av:'AR', bg:'#3a5c38', name:'Ananya Rao',     role:'Architect · Bengaluru',       text:'"The colour palette feature changed how I shop. I finally understand I\'m a cool undertone. I\'ve stopped buying things that look wrong the moment I get home."' },
            { av:'MK', bg:'#9a7c2e', name:'Meera Krishnan', role:'School Teacher · Chennai',    text:'"As someone who always found fashion confusing, the body type advisor is a game changer. A-line skirts and wide-leg trousers are now my wardrobe staples."' },
          ].map((t, i) => (
            <div key={i} style={s.testiCard}>
              <div style={s.testiStars}>★★★★★</div>
              <div style={s.testiQuote}>{t.text}</div>
              <div style={s.testiAuthor}>
                <div style={{...s.testiAv, background: t.bg}}>{t.av}</div>
                <div>
                  <div style={s.testiName}>{t.name}</div>
                  <div style={s.testiRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={s.ctaSection}>
        <div style={s.ctaBox}>
          <div>
            <h2 style={s.ctaTitle}>Ready to dress better,<br/>every single day?</h2>
            <p style={s.ctaSub}>Takes 2 minutes. No subscription required. Works best for Indian weather.</p>
          </div>
          <div style={s.ctaRight}>
            <Link to="/onboarding">
              <button style={s.ctaBtn}>Build my style profile →</button>
            </Link>
            <span style={s.ctaNote}>Free forever · No credit card needed</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <span style={s.footerLogo}>Attire<span style={{color:'var(--burnt)'}}>AI</span> © 2026</span>
          <div style={s.footerLinks}>
            {['About','Privacy','Terms','Contact'].map(l => (
              <span key={l} style={s.footerLink}>{l}</span>
            ))}
          </div>
          <span style={s.footerCopy}>Built with Python + React </span>
        </div>
      </footer>

    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: 'var(--cream)' },

  // NAV
  nav: { background: 'rgba(250,247,242,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--cream3)', position: 'sticky', top: 0, zIndex: 100 },
  navInner: { maxWidth: '1180px', margin: '0 auto', padding: '0 32px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { display: 'flex', alignItems: 'center', gap: '9px' },
  logoBox: { width: '34px', height: '34px', background: 'var(--burnt)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontFamily: 'var(--serif)', fontSize: '19px', fontWeight: 600, color: 'var(--ink)' },
  navLinks: { display: 'flex', gap: '30px' },
  navLink: { fontSize: '13.5px', fontWeight: 500, color: 'var(--ink3)', transition: 'color 0.18s' },
  navRight: { display: 'flex', alignItems: 'center', gap: '8px' },
  navBtnGhost: { fontSize: '13.5px', fontWeight: 500, color: 'var(--ink2)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', background: 'transparent', border: 'none' },
  navBtn: { background: 'var(--burnt)', color: '#fff', borderRadius: '9px', padding: '9px 20px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', border: 'none' },

  // HERO
  hero: { maxWidth: '1180px', margin: '0 auto', padding: '72px 32px 56px', display: 'grid', gridTemplateColumns: '1fr 460px', gap: '64px', alignItems: 'center' },
  heroLeft: {},
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--burnt3)', border: '1px solid rgba(184,84,48,.15)', borderRadius: '999px', padding: '6px 14px', marginBottom: '24px' },
  heroBadgeDot: { width: '7px', height: '7px', borderRadius: '50%', background: 'var(--burnt)' },
  heroBadgeText: { fontSize: '12px', fontWeight: 600, color: 'var(--burnt)', letterSpacing: '.05em', textTransform: 'uppercase' },
  heroH1: { fontSize: '56px', fontWeight: 700, letterSpacing: '-.025em', marginBottom: '20px', lineHeight: 1.06, fontFamily: 'var(--serif)' },
  heroSub: { fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.78, marginBottom: '32px', maxWidth: '460px' },
  heroBtns: { display: 'flex', gap: '12px', marginBottom: '40px' },
  btnPrimary: { background: 'var(--ink)', color: '#fff', borderRadius: '10px', padding: '14px 28px', fontSize: '14.5px', fontWeight: 600, cursor: 'pointer', border: 'none' },
  btnSecondary: { background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--cream4)', borderRadius: '10px', padding: '14px 28px', fontSize: '14.5px', fontWeight: 500, cursor: 'pointer' },
  heroProof: { display: 'flex', alignItems: 'center', gap: '16px' },
  avatars: { display: 'flex' },
  avatar: { width: '30px', height: '30px', borderRadius: '50%', border: '2.5px solid var(--white)', marginLeft: '-9px', fontSize: '10px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  proofText: { fontSize: '13px', color: 'var(--ink3)' },
  proofSep: { width: '4px', height: '4px', borderRadius: '50%', background: 'var(--cream4)' },

  // HERO VISUAL
  heroVisual: { position: 'relative', height: '500px' },
  circle1: { position: 'absolute', width: '240px', height: '240px', background: 'var(--burnt3)', borderRadius: '50%', top: '60px', right: '20px' },
  circle2: { position: 'absolute', width: '130px', height: '130px', background: 'var(--cream3)', borderRadius: '50%', bottom: '30px', left: '10px' },
  outfitCard: { position: 'absolute', top: '0', right: '0', width: '320px', background: 'var(--white)', borderRadius: '20px', boxShadow: 'var(--shadow-md)', overflow: 'hidden', zIndex: 2 },
  outfitCardTop: { background: 'linear-gradient(135deg,#c8a07a 0%,#a87050 100%)', padding: '20px 22px 18px' },
  outfitCardLabel: { fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)', marginBottom: '6px' },
  outfitCardTitle: { fontFamily: 'var(--serif)', fontSize: '21px', color: '#fff', fontWeight: 600, marginBottom: '2px' },
  outfitCardSub: { fontSize: '12px', color: 'rgba(255,255,255,.65)' },
  outfitCardBody: { padding: '14px 22px' },
  outfitRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 0', borderBottom: '1px solid var(--cream2)' },
  outfitSwatch: { width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0, border: '1px solid rgba(0,0,0,.06)' },
  outfitItemName: { fontSize: '13px', fontWeight: 600, color: 'var(--ink)' },
  outfitItemSub: { fontSize: '11px', color: 'var(--ink4)', marginTop: '2px' },
  checkCircle: { width: '20px', height: '20px', borderRadius: '50%', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  outfitCardFooter: { background: 'var(--cream2)', padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  scoreLabel: { fontSize: '12px', color: 'var(--ink4)', fontWeight: 500 },
  scoreSub: { fontSize: '11px', color: 'var(--ink4)', marginTop: '2px' },
  scoreNum: { fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 700, color: 'var(--burnt)' },

  // FLOATS
  floatWeather: { position: 'absolute', top: '60px', left: '0', width: '160px', background: 'var(--white)', borderRadius: '14px', boxShadow: 'var(--shadow-md)', padding: '14px 16px', zIndex: 2 },
  floatLabel: { fontSize: '11px', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink4)', marginBottom: '6px' },
  floatTemp: { fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1, marginBottom: '4px' },
  floatCond: { fontSize: '12px', color: 'var(--ink3)', marginBottom: '8px' },
  floatTags: { display: 'flex', gap: '4px' },
  floatTag: { background: 'var(--burnt3)', color: 'var(--burnt)', fontSize: '10px', fontWeight: 600, borderRadius: '999px', padding: '2px 8px' },
  floatHarmony: { position: 'absolute', bottom: '100px', left: '16px', width: '168px', background: 'var(--white)', borderRadius: '14px', boxShadow: 'var(--shadow-md)', padding: '14px 16px', zIndex: 2 },
  harmonyTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  harmonyVal: { fontSize: '14px', fontWeight: 700, color: 'var(--forest)' },
  harmonyBar: { height: '5px', background: 'var(--cream3)', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' },
  harmonyFill: { height: '100%', background: 'var(--forest)', borderRadius: '3px', width: '94%' },
  harmonySwatch: { display: 'flex', gap: '4px' },
  harmonyDot: { width: '24px', height: '24px', borderRadius: '6px' },

  // STRIP
  strip: { background: 'var(--cream2)', borderTop: '1px solid var(--cream3)', borderBottom: '1px solid var(--cream3)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', height: '54px' },
  stripItem: { display: 'flex', alignItems: 'center', gap: '8px' },

  // FEATURES
  features: { maxWidth: '1180px', margin: '80px auto', padding: '0 32px' },
  sectionTag: { fontSize: '12px', fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--burnt)', marginBottom: '10px' },
  sectionTitle: { fontFamily: 'var(--serif)', fontSize: '38px', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px', letterSpacing: '-.015em' },
  sectionSub: { fontSize: '15.5px', color: 'var(--ink3)', lineHeight: 1.75, maxWidth: '540px', marginBottom: '48px' },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px' },
  featCard: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '18px', padding: '26px' },
  featIcon: { width: '48px', height: '48px', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '18px' },
  featTitle: { fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' },
  featBody: { fontSize: '13.5px', color: 'var(--ink3)', lineHeight: 1.68 },

  // TESTIMONIALS
  testi: { background: 'var(--cream2)', borderTop: '1px solid var(--cream3)', padding: '80px 32px' },
  testiGrid: { maxWidth: '1180px', margin: '36px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' },
  testiCard: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '18px', padding: '24px 26px' },
  testiStars: { color: '#f5a623', fontSize: '14px', marginBottom: '12px', letterSpacing: '2px' },
  testiQuote: { fontFamily: 'var(--serif)', fontSize: '15px', color: 'var(--ink2)', lineHeight: 1.72, marginBottom: '18px', fontStyle: 'italic' },
  testiAuthor: { display: 'flex', alignItems: 'center', gap: '12px' },
  testiAv: { width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: '#fff', flexShrink: 0 },
  testiName: { fontSize: '14px', fontWeight: 600, color: 'var(--ink)' },
  testiRole: { fontSize: '12px', color: 'var(--ink4)', marginTop: '2px' },

  // CTA
  ctaSection: { maxWidth: '1180px', margin: '0 auto', padding: '56px 32px' },
  ctaBox: { background: 'var(--ink)', borderRadius: '22px', padding: '52px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' },
  ctaTitle: { fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '10px' },
  ctaSub: { fontSize: '15px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 },
  ctaRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 },
  ctaBtn: { background: 'var(--burnt)', color: '#fff', borderRadius: '11px', padding: '14px 30px', fontSize: '14.5px', fontWeight: 600, cursor: 'pointer', border: 'none', whiteSpace: 'nowrap' },
  ctaNote: { fontSize: '12px', color: 'rgba(255,255,255,.35)' },

  // FOOTER
  footer: { background: 'var(--ink)', padding: '32px' },
  footerInner: { maxWidth: '1180px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  footerLogo: { fontFamily: 'var(--serif)', fontSize: '16px', color: 'rgba(255,255,255,.5)' },
  footerLinks: { display: 'flex', gap: '24px' },
  footerLink: { fontSize: '13px', color: 'rgba(255,255,255,.35)', cursor: 'pointer' },
  footerCopy: { fontSize: '12px', color: 'rgba(255,255,255,.25)' },
}