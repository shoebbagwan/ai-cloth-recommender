import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  {
    eyebrow: 'Step 1 of 4',
    title: "What's your body shape?",
    sub: "This helps us suggest silhouettes and cuts that flatter your natural proportions.",
    opts: [
      { id:'hourglass', title:'Hourglass',          sub:'Shoulders and hips roughly equal, defined waist' },
      { id:'rectangle', title:'Rectangle',          sub:'Shoulders, waist and hips are roughly the same width' },
      { id:'triangle',  title:'Triangle (pear)',    sub:'Hips wider than shoulders, narrower upper body' },
      { id:'inv',       title:'Inverted triangle',  sub:'Shoulders broader than hips, narrower lower body' },
      { id:'apple',     title:'Apple (round)',      sub:'Fuller midsection, weight carried around the middle' },
    ]
  },
  {
    eyebrow: 'Step 2 of 4',
    title: 'Your skin undertone',
    sub: "We'll match colours that genuinely complement your complexion.",
    opts: [
      { id:'warm',    title:'Warm',    sub:'Veins look greenish or olive. Gold jewellery suits you more' },
      { id:'cool',    title:'Cool',    sub:'Veins look bluish or purple. Silver jewellery looks better' },
      { id:'neutral', title:'Neutral', sub:'Veins look blue-green. Both gold and silver suit you' },
    ]
  },
  {
    eyebrow: 'Step 3 of 4',
    title: 'Your style persona',
    sub: "Pick the description that best captures how you naturally want to dress.",
    opts: [
      { id:'classic',    title:'Classic',           sub:'Timeless, polished pieces that never go out of style' },
      { id:'casual',     title:'Casual',            sub:'Relaxed, comfortable and easy to wear every day' },
      { id:'formal',     title:'Formal',            sub:'Sharp, tailored, professional — always put-together' },
      { id:'bohemian',   title:'Bohemian',          sub:'Free-spirited, earthy, layered and eclectic' },
      { id:'sporty',     title:'Sporty / Athleisure',sub:'Active, functional pieces that still look stylish' },
    ]
  },
  {
    eyebrow: 'Step 4 of 4',
    title: 'Your typical occasion',
    sub: "This sets the default for your daily recommendations.",
    opts: [
      { id:'office',  title:'Office / Work',    sub:"I dress for a professional setting most days" },
      { id:'daily',   title:'Daily casual',     sub:'Everyday errands, outings and relaxed days' },
      { id:'social',  title:'Social events',    sub:'Weekends, dinners, parties and gatherings' },
      { id:'mixed',   title:'Mixed — it varies',sub:'Different every day, I need flexibility' },
    ]
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})

  const current = STEPS[step]

  function pick(id) {
    setAnswers(a => ({ ...a, [step]: id }))
  }

  function goNext() {
  if (!answers[step]) return
  if (step < STEPS.length - 1) {
    setStep(s => s + 1)
  } else {
    // Save all onboarding answers to localStorage
    localStorage.setItem('body_type',   answers[0])
    localStorage.setItem('skin_tone',   answers[1])
    localStorage.setItem('style',       answers[2])
    localStorage.setItem('occasion',    answers[3])
    navigate('/dashboard')
  }
}

  function goBack() {
    if (step > 0) setStep(s => s - 1)
  }

  return (
    <div style={s.page}>

      {/* TOP BAR */}
      <div style={s.topbar}>
        <div style={s.logo}>
          <div style={s.logoBox}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M20.38 18H3.62a1 1 0 0 1-.7-1.71L12 8"/>
              <path d="M12 8V5"/>
              <circle cx="12" cy="4" r="1"/>
            </svg>
          </div>
          <span style={s.logoText}>
            Attire<span style={{color:'var(--burnt)'}}>AI</span>
          </span>
        </div>
        <span style={s.skipLink} onClick={() => navigate('/dashboard')}>
          Skip for now →
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div style={s.progressWrap}>
        <div style={s.progressSteps}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              ...s.progressStep,
              ...(i <= step ? s.progressStepDone : {})
            }}></div>
          ))}
        </div>
        <div style={s.progressLabel}>
          {step + 1} of {STEPS.length} steps completed
        </div>
      </div>

      {/* CARD */}
      <div style={s.main}>
        <div style={s.card}>
          <div style={s.eyebrow}>{current.eyebrow}</div>
          <h2 style={s.title}>{current.title}</h2>
          <p style={s.sub}>{current.sub}</p>

          {/* OPTIONS */}
          <div style={s.opts}>
            {current.opts.map(o => (
              <button
                key={o.id}
                style={{
                  ...s.opt,
                  ...(answers[step] === o.id ? s.optOn : {})
                }}
                onClick={() => pick(o.id)}>
                <div style={s.optText}>
                  <div style={s.optTitle}>{o.title}</div>
                  <div style={s.optSub}>{o.sub}</div>
                </div>
                <div style={{
                  ...s.optCheck,
                  ...(answers[step] === o.id ? s.optCheckOn : {})
                }}>
                  {answers[step] === o.id && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div style={s.actions}>
            {step > 0 ? (
              <button style={s.backBtn} onClick={goBack}>
                ← Back
              </button>
            ) : (
              <div></div>
            )}
            <button
              style={{
                ...s.nextBtn,
                ...(answers[step] ? s.nextBtnReady : {})
              }}
              onClick={goNext}
              disabled={!answers[step]}>
              {step < STEPS.length - 1 ? 'Continue →' : 'See my looks →'}
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' },

  // TOPBAR
  topbar: { padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--cream3)', background: 'var(--white)' },
  logo: { display: 'flex', alignItems: 'center', gap: '9px' },
  logoBox: { width: '30px', height: '30px', background: 'var(--burnt)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 600, color: 'var(--ink)' },
  skipLink: { fontSize: '13px', color: 'var(--ink4)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' },

  // PROGRESS
  progressWrap: { padding: '24px 32px 0', maxWidth: '480px', margin: '0 auto', width: '100%' },
  progressSteps: { display: 'flex', gap: '6px', marginBottom: '8px' },
  progressStep: { flex: 1, height: '4px', borderRadius: '2px', background: 'var(--cream3)', transition: 'background .3s' },
  progressStepDone: { background: 'var(--burnt)' },
  progressLabel: { fontSize: '12px', color: 'var(--ink4)', textAlign: 'right' },

  // MAIN
  main: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  card: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '20px', padding: '36px 40px', width: '100%', maxWidth: '480px', boxShadow: '0 4px 24px rgba(24,20,15,.07)' },
  eyebrow: { fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', color: 'var(--burnt)', marginBottom: '10px' },
  title: { fontFamily: 'var(--serif)', fontSize: '30px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.15 },
  sub: { fontSize: '14px', color: 'var(--ink3)', lineHeight: 1.7, marginBottom: '28px' },

  // OPTIONS
  opts: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' },
  opt: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', border: '1.5px solid var(--cream3)', borderRadius: '12px', cursor: 'pointer', background: 'var(--cream)', textAlign: 'left', transition: 'all .18s' },
  optOn: { borderColor: 'var(--burnt)', background: 'var(--burnt4)' },
  optText: { flex: 1 },
  optTitle: { fontSize: '14px', fontWeight: 600, color: 'var(--ink)' },
  optSub: { fontSize: '12px', color: 'var(--ink4)', marginTop: '2px' },
  optCheck: { width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid var(--cream4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .18s' },
  optCheckOn: { background: 'var(--burnt)', borderColor: 'var(--burnt)' },

  // ACTIONS
  actions: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 500, color: 'var(--ink3)', padding: '10px 16px', borderRadius: '9px', border: '1px solid var(--cream4)', background: 'var(--cream)', cursor: 'pointer' },
  nextBtn: { background: 'var(--cream3)', color: 'var(--ink4)', borderRadius: '10px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'not-allowed', border: 'none', transition: 'all .18s', opacity: 0.5 },
  nextBtnReady: { background: 'var(--burnt)', color: '#fff', opacity: 1, cursor: 'pointer' },
}