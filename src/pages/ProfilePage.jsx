import { useState, useEffect } from 'react'
import { recommendationApi } from '../utils/api'

const PALETTES = {
  warm:    { cols:['#c4703f','#b8963e','#8b6b3a','#c44b2c','#d4a06a'], desc:'Warm palette: terracotta, camel, rust, mustard and gold.' },
  cool:    { cols:['#2c4a8c','#6b4c9a','#3d7d6b','#8b3d5a','#4a90b0'], desc:'Cool palette: navy, violet, emerald, burgundy and dusty blue.' },
  neutral: { cols:['#7a8c6e','#9a8878','#b8a8a0','#6b7a6b','#7a6e60'], desc:'Neutral palette: sage, mauve, dusty rose, taupe and warm gray.' },
}

const BODY_TYPES = [
  { id:'hourglass', l:'Hourglass',     svg:<HourglassSVG/> },
  { id:'rectangle', l:'Rectangle',     svg:<RectSVG/>      },
  { id:'triangle',  l:'Triangle',      svg:<TriSVG/>       },
  { id:'inv',       l:'Inv. Triangle', svg:<InvTriSVG/>    },
  { id:'apple',     l:'Apple',         svg:<AppleSVG/>     },
]

function HourglassSVG() {
  return <svg width="16" height="20" viewBox="0 0 18 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2h14M2 22h14M3 2l5.5 9-5.5 9M15 2l-5.5 9 5.5 9"/></svg>
}
function RectSVG() {
  return <svg width="14" height="20" viewBox="0 0 14 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="12" height="22" rx="2"/></svg>
}
function TriSVG() {
  return <svg width="16" height="20" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M9 2L1 20h16L9 2z"/></svg>
}
function InvTriSVG() {
  return <svg width="16" height="20" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M1 2h16L9 20 1 2z"/></svg>
}
function AppleSVG() {
  return <svg width="16" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="10" cy="12" rx="8" ry="7"/><ellipse cx="10" cy="5" rx="4" ry="3"/></svg>
}

export default function ProfilePage() {
  const fullName    = localStorage.getItem('full_name') || 'User'
  const email       = localStorage.getItem('email')     || ''
  const gender      = localStorage.getItem('gender')    || 'unisex'
  const storedBT    = localStorage.getItem('body_type') || 'hourglass'
  const storedSkin  = localStorage.getItem('skin_tone') || 'warm'
  const storedStyle = localStorage.getItem('style')     || 'classic'

  const avatarLetter = fullName.charAt(0).toUpperCase()
  const genderLabel  = gender === 'male' ? '👔 Male' : gender === 'female' ? '👗 Female' : '✨ Other'

  const styleLabels = {
    classic: 'Classic style persona', casual: 'Casual style persona',
    formal: 'Formal style persona', bohemian: 'Bohemian style persona', sporty: 'Sporty style persona',
  }
  const bodyLabels = {
    hourglass: 'Hourglass body type', rectangle: 'Rectangle body type',
    triangle: 'Triangle body type', inv: 'Inv. Triangle body type', apple: 'Apple body type',
  }

  const [selBT,        setSelBT]        = useState(storedBT)
  const [selSkin,      setSelSkin]      = useState(storedSkin)
  const [budget,       setBudget]       = useState(5000)
  const [saved,        setSaved]        = useState(false)
  const [savedOutfits, setSavedOutfits] = useState([])
  const [loadingSaved, setLoadingSaved] = useState(true)

  useEffect(() => {
    async function fetchSaved() {
      const userId = localStorage.getItem('user_id')
      if (!userId) { setLoadingSaved(false); return }
      try {
        const res = await recommendationApi.getSaved(userId)
        setSavedOutfits(res.data.saved_outfits || [])
      } catch (err) {
        console.error('Error fetching saved outfits:', err)
      } finally {
        setLoadingSaved(false)
      }
    }
    fetchSaved()
  }, [])

  function handleSave() {
    localStorage.setItem('body_type', selBT)
    localStorage.setItem('skin_tone', selSkin)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={s.page} className="page-enter">
      <div style={s.wrap}>

        {/* HERO CARD */}
        <div style={s.heroCard}>
          <div style={s.avWrap}>
            <div style={s.bigAv}>{avatarLetter}</div>
            <div style={s.avEdit}>✏️</div>
          </div>
          <div style={s.heroInfo}>
            <div style={s.heroName}>{fullName}</div>
            <div style={s.heroEmail}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {email || 'Mumbai, Maharashtra'}
            </div>
            <div style={s.heroBadges}>
              <span style={{...s.badge, background:'var(--burnt3)', color:'var(--burnt)'}}>
                ✦ {storedSkin.charAt(0).toUpperCase() + storedSkin.slice(1)} undertone
              </span>
              <span style={{...s.badge, background:'var(--forest2)', color:'var(--forest)'}}>
                {bodyLabels[storedBT] || 'Hourglass body type'}
              </span>
              <span style={{...s.badge, background:'#eeeeff', color:'#534ab7'}}>
                {styleLabels[storedStyle] || 'Classic style persona'}
              </span>
              <span style={{...s.badge, background:'var(--cream3)', color:'var(--ink3)'}}>
                {genderLabel}
              </span>
            </div>
          </div>
          <div style={s.completion}>
            <div style={s.ringWrap}>
              <svg width="68" height="68" viewBox="0 0 68 68" style={{transform:'rotate(-90deg)'}}>
                <circle cx="34" cy="34" r="28" fill="none" stroke="var(--cream3)" strokeWidth="5"/>
                <circle cx="34" cy="34" r="28" fill="none" stroke="var(--burnt)"
                  strokeWidth="5" strokeDasharray="175.9" strokeDashoffset="38.7" strokeLinecap="round"/>
              </svg>
              <div style={s.ringInner}>78%</div>
            </div>
            <div style={s.compLabel}>Profile<br/>complete</div>
          </div>
        </div>

        {/* ALERT */}
        <div style={s.alert}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--burnt)" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span><strong>Complete your profile</strong> — add your height and weight to improve fit suggestions.</span>
        </div>

        {/* GRID */}
        <div style={s.grid}>

          {/* PERSONAL DETAILS */}
          <div style={s.section}>
            <div style={s.secTitle}>
              <div style={{...s.secIcon, background:'var(--cream2)'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ink3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              Personal details
            </div>
            <div style={s.field}>
              <div style={s.fieldLabel}>Full name</div>
              <input style={s.fieldInput} defaultValue={fullName}/>
            </div>
            <div style={s.field}>
              <div style={s.fieldLabel}>Email address</div>
              <input style={s.fieldInput} defaultValue={email} type="email"/>
            </div>
            <div style={s.twoCol}>
              <div style={s.field}>
                <div style={s.fieldLabel}>City</div>
                <input style={s.fieldInput} defaultValue="Mumbai"/>
              </div>
              <div style={s.field}>
                <div style={s.fieldLabel}>State</div>
                <select style={s.fieldSelect}>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Gujarat</option>
                </select>
              </div>
            </div>
            <div style={s.twoCol}>
              <div style={s.field}>
                <div style={s.fieldLabel}>Height (cm)</div>
                <input style={s.fieldInput} placeholder="e.g. 162" type="number"/>
              </div>
              <div style={s.field}>
                <div style={s.fieldLabel}>Weight (kg)</div>
                <input style={s.fieldInput} placeholder="e.g. 58" type="number"/>
              </div>
            </div>
            <div style={s.field}>
              <div style={{...s.fieldLabel, display:'flex', justifyContent:'space-between'}}>
                <span>Max budget per outfit (₹)</span>
                <span style={{color:'var(--burnt)', fontWeight:700}}>₹{budget.toLocaleString('en-IN')}</span>
              </div>
              <input type="range" min="500" max="25000" step="500" value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                style={{width:'100%', accentColor:'var(--burnt)'}}/>
            </div>
            <button style={s.saveBtn} onClick={handleSave}>
              {saved ? '✓ Saved!' : 'Save personal details'}
            </button>
          </div>

          {/* STYLE PROFILE */}
          <div style={s.section}>
            <div style={s.secTitle}>
              <div style={{...s.secIcon, background:'var(--burnt3)'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--burnt)" strokeWidth="2" strokeLinecap="round">
                  <path d="M20.38 18H3.62a1 1 0 0 1-.7-1.71L12 8"/>
                  <path d="M12 8V5"/>
                  <circle cx="12" cy="4" r="1"/>
                </svg>
              </div>
              Style profile
            </div>
            <div style={s.field}>
              <div style={s.fieldLabel}>Body type</div>
              <div style={s.btSelector}>
                {BODY_TYPES.map(b => (
                  <div key={b.id}
                    style={{...s.btOption, ...(selBT===b.id ? s.btOptionOn : {})}}
                    onClick={() => setSelBT(b.id)}>
                    <div style={s.btShape}>{b.svg}</div>
                    <div style={s.btLabel}>{b.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={s.field}>
              <div style={s.fieldLabel}>Skin undertone</div>
              <div style={s.skinTabs}>
                {Object.keys(PALETTES).map(k => (
                  <button key={k}
                    style={{...s.skinTab, ...(selSkin===k ? s.skinTabOn : {})}}
                    onClick={() => setSelSkin(k)}>
                    {k.charAt(0).toUpperCase()+k.slice(1)}
                  </button>
                ))}
              </div>
              <div style={s.palPreview}>
                {PALETTES[selSkin].cols.map((c,i) => (
                  <div key={i} style={{...s.palSw, background: c}}></div>
                ))}
              </div>
              <div style={s.palDesc}>{PALETTES[selSkin].desc}</div>
            </div>
            <div style={s.field}>
              <div style={s.fieldLabel}>Style persona</div>
              <select style={s.fieldSelect} defaultValue={storedStyle}>
                <option value="classic">Classic — Timeless, polished, structured pieces</option>
                <option value="casual">Casual — Relaxed, comfortable, everyday wear</option>
                <option value="formal">Formal — Sharp, professional, tailored</option>
                <option value="bohemian">Bohemian — Free-spirited, earthy, layered</option>
                <option value="sporty">Sporty — Active, functional, athleisure</option>
              </select>
            </div>
            <div style={s.field}>
              <div style={s.fieldLabel}>Primary occasion</div>
              <select style={s.fieldSelect} defaultValue={localStorage.getItem('occasion') || 'office'}>
                <option value="office">Office / Work — 5 days a week</option>
                <option value="daily">Daily casual — Everyday errands</option>
                <option value="social">Social events — Weekends & outings</option>
                <option value="mixed">Mixed — Varies day to day</option>
              </select>
            </div>
            <div style={s.quizCard}>
              <div style={s.quizIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--burnt)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div style={{flex:1}}>
                <div style={s.quizTitle}>Retake the style quiz</div>
                <div style={s.quizSub}>3 minutes · Refreshes all your recommendations</div>
              </div>
              <span style={{color:'var(--burnt)', fontSize:'16px'}}>→</span>
            </div>
            <button style={s.saveBtn} onClick={handleSave}>
              {saved ? '✓ Saved!' : 'Save style profile'}
            </button>
          </div>

        </div>

        {/* SAVED OUTFITS */}
        <div style={s.section2}>
          <div style={s.secTitle}>
            <div style={{...s.secIcon, background:'var(--burnt3)'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--burnt)" strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            Saved Outfits
          </div>

          {loadingSaved ? (
            <div style={{padding:'20px', textAlign:'center', color:'var(--ink4)', fontSize:'13px'}}>
              Loading saved outfits...
            </div>
          ) : savedOutfits.length === 0 ? (
            <div style={s.emptyState}>
              <div style={{fontSize:'32px', marginBottom:'10px'}}>👗</div>
              <div style={{fontSize:'14px', fontWeight:600, color:'var(--ink)', marginBottom:'4px'}}>No saved outfits yet</div>
              <div style={{fontSize:'12px', color:'var(--ink4)'}}>Go to Dashboard, generate outfits and click ♥ Love it or ✦ Save!</div>
            </div>
          ) : (
            <div style={s.savedGrid}>
              {savedOutfits.map((outfit, i) => (
                <div key={i} style={s.savedCard}>
                  <div style={s.savedOcc}>
                    {outfit.occasion} · {new Date(outfit.created_at).toLocaleDateString('en-IN')}
                  </div>
                  <div style={s.savedItems}>
                    {(outfit.outfit_items || []).slice(0,3).map((item, j) => (
                      <div key={j} style={s.savedItem}>
                        <div style={{...s.savedDot, background: item.color_hex || '#ccc'}}></div>
                        <span style={s.savedItemName}>{item.name}</span>
                        <span style={s.savedItemFab}>{item.fabric}</span>
                      </div>
                    ))}
                  </div>
                  <div style={s.savedScore}>
                    AI Score: <strong style={{color:'var(--forest)'}}>
                      {Math.round((outfit.confidence_score || 0) * 100)}%
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

const s = {
  page: { minHeight: 'calc(100vh - 58px)', background: 'var(--cream)' },
  wrap: { maxWidth: '1000px', margin: '0 auto', padding: '28px' },
  heroCard: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '18px', padding: '26px', display: 'flex', gap: '22px', alignItems: 'center', marginBottom: '16px' },
  avWrap: { position: 'relative', flexShrink: 0 },
  bigAv: { width: '82px', height: '82px', borderRadius: '18px', background: 'linear-gradient(135deg,#c4703f,#8b4a22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '30px', fontWeight: 700, color: '#fff' },
  avEdit: { position: 'absolute', bottom: '-5px', right: '-5px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--ink)', border: '2px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px' },
  heroInfo: { flex: 1 },
  heroName: { fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginBottom: '3px' },
  heroEmail: { fontSize: '13px', color: 'var(--ink4)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' },
  heroBadges: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  badge: { borderRadius: '999px', padding: '4px 13px', fontSize: '11.5px', fontWeight: 600 },
  completion: { marginLeft: 'auto', textAlign: 'center', flexShrink: 0 },
  ringWrap: { position: 'relative', width: '68px', height: '68px', margin: '0 auto 8px' },
  ringInner: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: 'var(--ink)' },
  compLabel: { fontSize: '11px', color: 'var(--ink4)', textAlign: 'center', lineHeight: 1.4 },
  alert: { background: 'var(--burnt4)', border: '1px solid rgba(184,84,48,.2)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '13px', color: 'var(--ink2)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  section: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '16px', padding: '22px 24px' },
  section2: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '16px', padding: '22px 24px', marginTop: '16px' },
  secTitle: { fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 600, color: 'var(--ink)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '14px', borderBottom: '1px solid var(--cream2)' },
  secIcon: { width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  field: { marginBottom: '16px' },
  fieldLabel: { fontSize: '11px', fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--ink4)', marginBottom: '6px' },
  fieldInput: { width: '100%', padding: '10px 13px', border: '1.5px solid var(--cream3)', borderRadius: '9px', fontSize: '13.5px', color: 'var(--ink)', background: 'var(--cream)', fontFamily: 'var(--sans)', transition: 'border-color .18s' },
  fieldSelect: { width: '100%', padding: '10px 13px', border: '1.5px solid var(--cream3)', borderRadius: '9px', fontSize: '13.5px', color: 'var(--ink)', background: 'var(--cream)', fontFamily: 'var(--sans)', cursor: 'pointer' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  btSelector: { display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px' },
  btOption: { border: '1.5px solid var(--cream3)', borderRadius: '10px', padding: '10px 6px', textAlign: 'center', cursor: 'pointer', transition: 'all .18s', background: 'var(--cream)' },
  btOptionOn: { borderColor: 'var(--burnt)', background: 'var(--burnt3)' },
  btShape: { width: '28px', height: '28px', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  btLabel: { fontSize: '10px', fontWeight: 600, color: 'var(--ink2)' },
  skinTabs: { display: 'flex', gap: '5px', marginBottom: '10px' },
  skinTab: { padding: '5px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 500, border: '1px solid var(--cream4)', color: 'var(--ink3)', background: 'var(--cream)', cursor: 'pointer', transition: 'all .18s' },
  skinTabOn: { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' },
  palPreview: { display: 'flex', gap: '5px', padding: '10px', background: 'var(--cream2)', borderRadius: '10px', marginBottom: '8px' },
  palSw: { flex: 1, height: '40px', borderRadius: '7px', border: '1px solid rgba(0,0,0,.04)', cursor: 'pointer' },
  palDesc: { fontSize: '12px', color: 'var(--ink3)', lineHeight: 1.55 },
  quizCard: { background: 'var(--burnt4)', border: '1px solid rgba(184,84,48,.15)', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '16px' },
  quizIcon: { width: '38px', height: '38px', borderRadius: '10px', background: 'var(--burnt3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  quizTitle: { fontSize: '13.5px', fontWeight: 600, color: 'var(--burnt)' },
  quizSub: { fontSize: '11.5px', color: 'var(--ink3)', marginTop: '2px' },
  saveBtn: { width: '100%', background: 'var(--burnt)', color: '#fff', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', border: 'none', transition: 'background .18s' },
  emptyState: { textAlign: 'center', padding: '30px', color: 'var(--ink3)' },
  savedGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' },
  savedCard: { background: 'var(--cream2)', border: '1px solid var(--cream3)', borderRadius: '12px', padding: '14px' },
  savedOcc: { fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--burnt)', marginBottom: '10px' },
  savedItems: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' },
  savedItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  savedDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  savedItemName: { fontSize: '12px', fontWeight: 500, color: 'var(--ink)', flex: 1 },
  savedItemFab: { fontSize: '10px', color: 'var(--white)', background: 'var(--ink4)', borderRadius: '4px', padding: '1px 6px' },
  savedScore: { fontSize: '11.5px', color: 'var(--ink3)' },
}