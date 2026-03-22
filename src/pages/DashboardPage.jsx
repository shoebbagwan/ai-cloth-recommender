import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { recommendationApi, weatherApi } from '../utils/api'

const OCCASIONS = [
  { id:'daily',   e:'☀️', l:'Daily'    },
  { id:'office',  e:'💼', l:'Office'   },
  { id:'party',   e:'🥂', l:'Party'    },
  { id:'wedding', e:'💐', l:'Wedding'  },
  { id:'gym',     e:'🏃', l:'Gym'      },
  { id:'travel',  e:'✈️', l:'Travel'   },
  { id:'date',    e:'🌹', l:'Date'     },
  { id:'festival',e:'🎊', l:'Festival' },
]

const BODY_TYPES = [
  { id:'hourglass', l:'Hourglass',         h:'Defined waist, balanced' },
  { id:'rectangle', l:'Rectangle',         h:'Shoulders & hips equal'  },
  { id:'triangle',  l:'Triangle',          h:'Wider hips'              },
  { id:'inv',       l:'Inverted Triangle', h:'Wider shoulders'         },
  { id:'apple',     l:'Apple',             h:'Fuller midsection'       },
]

const PALETTES = {
  warm:    { cols:['#c4703f','#b8963e','#8b6b3a','#c44b2c','#7a5c2e'], note:'Warm palette — terracotta, camel, rust, mustard and olive.' },
  cool:    { cols:['#2c4a8c','#6b4c9a','#3d7d6b','#8b3d5a','#4a6a9a'], note:'Cool palette — navy, emerald, burgundy, lavender and royal blue.' },
  neutral: { cols:['#7a8c6e','#9a8878','#6b7a6b','#b8a8a0','#7a6e60'], note:'Neutral palette — sage, mauve, taupe, dusty rose and warm gray.' },
}

const OUTFITS = [
  { name:'The Office Classic',   occ:'Office · Mumbai · 32°C',   score:0.96, items:[{n:'White Linen Shirt',        col:'#f0ebe0',fab:'Linen'     },{n:'Black Wide-Leg Trousers', col:'#1a1714',fab:'Wool blend'},{n:'Tan Block Heels',          col:'#c8a06a',fab:'Leather'   }]},
  { name:'Breezy Saturday',      occ:'Daily · Mumbai · 32°C',    score:0.93, items:[{n:'Sage Green Blouse',        col:'#7a8c6e',fab:'Silk'      },{n:'Beige Slim Chinos',       col:'#c8b89a',fab:'Cotton'    },{n:'White Canvas Sneakers',    col:'#f5f5f0',fab:'Canvas'    }]},
  { name:'Festival-Ready Look',  occ:'Festival · Mumbai · 32°C', score:0.91, items:[{n:'Coral Wrap Dress',         col:'#e87b5a',fab:'Chiffon'   },{n:'Gold Kolhapuri Sandals',  col:'#b8963e',fab:'Leather'   },{n:'Ivory Silk Dupatta',       col:'#f5efe6',fab:'Silk'      }]},
  { name:'Smart Casual Date',    occ:'Date · Mumbai · 32°C',     score:0.88, items:[{n:'Ivory Midi Dress',         col:'#f5efe6',fab:'Linen'     },{n:'Olive Linen Blazer',      col:'#7a8c6e',fab:'Linen'     },{n:'Nude Block Heels',         col:'#d4b8a0',fab:'Leather'   }]},
  { name:'Weekend Market Run',   occ:'Daily · Mumbai · 32°C',    score:0.85, items:[{n:'Terracotta A-line Skirt',  col:'#c4703f',fab:'Cotton'    },{n:'White Linen Shirt',       col:'#f0ebe0',fab:'Linen'     },{n:'Brown Leather Tote',       col:'#6b4c30',fab:'Leather'   }]},
  { name:'Evening Party Look',   occ:'Party · Mumbai · 32°C',    score:0.82, items:[{n:'Sage Green Blouse',        col:'#7a8c6e',fab:'Silk'      },{n:'Black Palazzo Pants',     col:'#1a1714',fab:'Chiffon'   },{n:'Gold Drop Earrings',       col:'#b8963e',fab:'Metal'     }]},
]

function getWeatherEmoji(condition = '') {
  const c = condition.toLowerCase()
  if (c.includes('thunder') || c.includes('storm')) return '⛈️'
  if (c.includes('rain') || c.includes('drizzle'))  return '🌧️'
  if (c.includes('cloud') || c.includes('overcast')) return '⛅'
  if (c.includes('mist') || c.includes('fog') || c.includes('haze')) return '🌫️'
  if (c.includes('snow'))  return '❄️'
  if (c.includes('clear')) return '☀️'
  return '🌤️'
}

function getFabricAdvice(temp) {
  if (temp >= 35) return { text:'Extreme heat. Go ultra-light and airy.', fabrics:['Cotton','Linen','Bamboo','Chiffon'] }
  if (temp >= 28) return { text:'Hot and humid. Stick to natural, breathable fabrics.', fabrics:['Cotton','Linen','Chiffon','Bamboo'] }
  if (temp >= 20) return { text:'Warm and pleasant. Light layers work well today.', fabrics:['Cotton','Linen','Rayon','Jersey'] }
  if (temp >= 12) return { text:'Mild weather. A light layer over breathables is perfect.', fabrics:['Cotton','Denim','Knit','Flannel'] }
  return { text:'Cool day. Layer up with warm, cozy fabrics.', fabrics:['Wool','Fleece','Denim','Corduroy'] }
}

function getUVLabel(uv) {
  if (uv == null) return 'N/A'
  if (uv <= 2) return 'Low'
  if (uv <= 5) return 'Moderate'
  if (uv <= 7) return 'High'
  if (uv <= 10) return 'Very High'
  return 'Extreme'
}

function getLiveDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function DashboardPage() {
  const [selOcc,         setSelOcc]         = useState('daily')
  const [selBT,          setSelBT]          = useState('hourglass')
  const [selSkin,        setSelSkin]        = useState('warm')
  const [loading,        setLoading]        = useState(false)
  const [outfits,        setOutfits]        = useState(null)
  const [weather,        setWeather]        = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError,   setWeatherError]   = useState(false)

  useEffect(() => {
    async function fetchWeather() {
      setWeatherLoading(true)
      setWeatherError(false)
      try {
        const res = await weatherApi.get('Mumbai')
        const d = res.data.weather
        setWeather({
          temp:      Math.round(d.temp),
          feels:     Math.round(d.feels_like),
          condition: d.condition,
          humidity:  d.humidity,
          wind:      Math.round(d.wind_speed),
          uv:        null,
        })
      } catch (err) {
        console.error('Weather fetch failed:', err)
        setWeatherError(true)
        setWeather({ temp:27, feels:30, condition:'Clear sky', humidity:70, wind:12, uv:6 })
      } finally {
        setWeatherLoading(false)
      }
    }
    fetchWeather()
  }, [])

  async function generate() {
    setLoading(true)
    setOutfits(null)
    try {
      const res = await recommendationApi.get(selOcc, 'Mumbai', selBT, selSkin)
      setOutfits(res.data.recommendations)
    } catch (error) {
      console.error('API error:', error)
      setOutfits(OUTFITS)
    } finally {
      setLoading(false)
    }
  }

  const fabricAdvice = weather ? getFabricAdvice(weather.temp) : null
  const weatherEmoji = weather ? getWeatherEmoji(weather.condition) : '🌤️'

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.topbar}>
          <div>
            <h1 style={s.greeting}>
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
              {localStorage.getItem('full_name')?.split(' ')[0] || 'there'} ☀️
            </h1>
            <div style={s.subDate}>
              {getLiveDate()}
              <span style={s.liveBadge}>
                <span style={s.liveDot}></span>
                {weatherLoading ? 'Fetching weather…' : weatherError ? 'Weather unavailable' : 'Live weather'}
              </span>
            </div>
          </div>
          <div style={s.cityChip}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="var(--ink3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={s.cityName}>Mumbai, Maharashtra</span>
          </div>
        </div>

        <div style={s.layout}>
          <aside style={s.sidebar}>
            <div style={s.card}>
              <div style={s.weatherBg}>
                <div style={s.wLoc}>📍 Mumbai, Maharashtra</div>
                {weatherLoading ? (
                  <div style={{padding:'10px 0'}}>
                    <div style={s.skeletonTemp}></div>
                    <div style={s.skeletonLine}></div>
                  </div>
                ) : (
                  <>
                    <div style={s.wRow}>
                      <div style={s.wTemp}>{weather.temp}°<span style={s.wUnit}>C</span></div>
                      <div style={s.wRight}>
                        <div style={{fontSize:'28px'}}>{weatherEmoji}</div>
                        <div style={s.wCond}>{weather.condition}</div>
                        <div style={s.wFeels}>Feels like {weather.feels}°C</div>
                      </div>
                    </div>
                    <div style={s.wStats}>
                      <div style={s.wStat}><strong style={s.wStatVal}>{weather.humidity}%</strong>Humidity</div>
                      <div style={s.wStat}><strong style={s.wStatVal}>{weather.wind} km/h</strong>Wind</div>
                      <div style={s.wStat}><strong style={s.wStatVal}>{getUVLabel(weather.uv)}</strong>UV Index</div>
                    </div>
                  </>
                )}
              </div>
              <div style={s.fabricAdvice}>
                <div style={s.faLabel}>Fabric advice for today</div>
                {weatherLoading ? (
                  <div style={s.skeletonLineLight}></div>
                ) : (
                  <>
                    <div style={s.faText}>{fabricAdvice.text}</div>
                    <div style={s.faTags}>
                      {fabricAdvice.fabrics.map(t => (
                        <span key={t} style={s.faTag}>{t}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div style={s.card}>
              <div style={s.cardLabel}>What's the occasion today?</div>
              <div style={s.occGrid}>
                {OCCASIONS.map(o => (
                  <button key={o.id}
                    style={{...s.occChip, ...(selOcc===o.id ? s.occChipOn : {})}}
                    onClick={() => setSelOcc(o.id)}>
                    <span style={{fontSize:'13px'}}>{o.e}</span>{o.l}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.card}>
              <div style={s.cardLabel}>Your body type</div>
              <div style={s.btList}>
                {BODY_TYPES.map(b => (
                  <button key={b.id}
                    style={{...s.btOpt, ...(selBT===b.id ? s.btOptOn : {})}}
                    onClick={() => setSelBT(b.id)}>
                    <div style={s.btInfo}>
                      <div style={s.btName}>{b.l}</div>
                      <div style={s.btHint}>{b.h}</div>
                    </div>
                    {selBT===b.id && <span style={s.btTick}>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.card}>
              <div style={s.cardLabel}>Your colour palette</div>
              <div style={s.skinTabs}>
                {Object.keys(PALETTES).map(k => (
                  <button key={k}
                    style={{...s.skinTab, ...(selSkin===k ? s.skinTabOn : {})}}
                    onClick={() => setSelSkin(k)}>
                    {k.charAt(0).toUpperCase()+k.slice(1)}
                  </button>
                ))}
              </div>
              <div style={s.palSwatches}>
                {PALETTES[selSkin].cols.map((c,i) => (
                  <div key={i} style={{...s.palSw, background: c}}></div>
                ))}
              </div>
              <div style={s.palNote}>{PALETTES[selSkin].note}</div>
            </div>

            <button style={s.genBtn} onClick={generate}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              {loading ? 'Finding your looks...' : 'Generate My Outfits'}
            </button>
          </aside>

          <main style={s.main}>
            {!outfits && !loading && (
              <div style={s.emptyWrap}>
                <div style={s.emptyIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="var(--burnt)" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M20.38 18H3.62a1 1 0 0 1-.7-1.71L12 8"/>
                    <path d="M12 8V5"/>
                    <circle cx="12" cy="4" r="1"/>
                  </svg>
                </div>
                <h3 style={s.emptyTitle}>Your outfits await</h3>
                <p style={s.emptySub}>
                  Select an occasion, confirm your body type and colour palette,
                  then hit <em>Generate My Outfits</em>.
                </p>
                <div style={s.emptyPills}>
                  {['🌤️ Weather-aware','🎨 Colour-matched','👤 Body-type fit','✦ ML-ranked'].map(p => (
                    <span key={p} style={s.emptyPill}>{p}</span>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div>
                <div style={s.resultsHead}>
                  <h2 style={s.resultsTitle}>Finding your looks...</h2>
                </div>
                <div style={s.outfitsGrid}>
                  {[...Array(6)].map((_,i) => (
                    <div key={i} className="skeleton" style={{height:'270px'}}></div>
                  ))}
                </div>
              </div>
            )}

            {outfits && !loading && (
              <div>
                <div style={s.resultsHead}>
                  <h2 style={s.resultsTitle}>
                    Outfits for <em style={{color:'var(--burnt)'}}>
                      {OCCASIONS.find(o=>o.id===selOcc)?.l}
                    </em> in Mumbai
                    {weather && <span style={s.tempBadge}> · {weather.temp}°C</span>}
                  </h2>
                  <span style={s.resultsMeta}>6 looks · Sorted by AI match score</span>
                </div>
                <div style={s.outfitsGrid} className="stagger">
                  {outfits.map((o,i) => (
                    <OutfitCard key={i} outfit={o} rank={i} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function OutfitCard({ outfit, rank }) {
  const [liked,  setLiked]  = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [saving, setSaving] = useState(false)
  const pct = Math.round((outfit.confidence_score || outfit.score || 0) * 100)

  async function handleLike() {
    const userId = localStorage.getItem('user_id')
    if (!userId) return
    const newLiked = !liked
    setLiked(newLiked)
    if (newLiked) {
      try {
        await recommendationApi.save({
          user_id:           parseInt(userId),
          occasion:          outfit.occasions?.[0] || 'daily',
          weather_temp:      outfit.weather?.temp  || 30,
          weather_condition: outfit.weather?.condition || 'Clear',
          outfit_name:       outfit.name,
          outfit_items:      outfit.items || [],
          confidence_score:  outfit.confidence_score || 0,
          feedback:          'like',
        })
      } catch (err) {
        console.error('Like error:', err)
        setLiked(false)
      }
    }
  }

  async function handleSave() {
    const userId = localStorage.getItem('user_id')
    if (!userId) return
    setSaving(true)
    try {
      await recommendationApi.save({
        user_id:           parseInt(userId),
        occasion:          outfit.occasions?.[0] || 'daily',
        weather_temp:      outfit.weather?.temp  || 30,
        weather_condition: outfit.weather?.condition || 'Clear',
        outfit_name:       outfit.name,
        outfit_items:      outfit.items || [],
        confidence_score:  outfit.confidence_score || 0,
        feedback:          'saved',
      })
      setSaved(true)
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={s.oc}>
      <div style={s.ocTop}>
        <div style={s.ocRank}>#{rank+1}</div>
        <div style={s.ocSwatches}>
          {(outfit.items || []).map((it,i) => (
            <div key={i} style={{...s.ocSw, background: it.color_hex || it.col || '#ccc'}}></div>
          ))}
        </div>
        <div style={s.ocName}>{outfit.name}</div>
        <div style={s.ocOcc}>{outfit.occ}</div>
      </div>
      <div style={s.ocItems}>
        {(outfit.items || []).map((it,i) => (
          <div key={i} style={s.ocItem}>
            <div style={{...s.ocDot, background: it.color_hex || it.col || '#ccc'}}></div>
            <span style={s.ocItemName}>{it.name || it.n}</span>
            <span style={s.ocItemFab}>{it.fabric || it.fab}</span>
          </div>
        ))}
      </div>
      <div style={s.ocFooter}>
        <div style={s.ocScoreRow}>
          <span style={s.ocScoreLbl}>AI match score</span>
          <span style={s.ocScoreNum}>{pct}%</span>
        </div>
        <div style={s.ocBar}>
          <div style={{...s.ocBarFill, width:`${pct}%`}}></div>
        </div>
        <div style={s.ocActions}>
          <button style={{...s.ocBtn, ...(liked ? s.ocBtnOn : {})}} onClick={handleLike}>
            ♥ {liked ? 'Loved!' : 'Love it'}
          </button>
          <button style={{...s.ocBtn, ...(saved ? s.ocBtnOn : {})}} onClick={handleSave} disabled={saving}>
            ✦ {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
          </button>
          <button style={s.ocBtnX}>✕</button>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: 'calc(100vh - 58px)', background: 'var(--cream)' },
  wrap: { maxWidth: '1200px', margin: '0 auto', padding: '24px 28px' },
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '26px' },
  greeting: { fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 700, color: 'var(--ink)' },
  subDate: { fontSize: '13px', color: 'var(--ink4)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' },
  liveBadge: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--forest2)', border: '1px solid rgba(58,92,56,.2)', borderRadius: '999px', padding: '3px 10px', fontSize: '11px', fontWeight: 600, color: 'var(--forest)' },
  liveDot: { width: '6px', height: '6px', borderRadius: '50%', background: 'var(--forest)', animation: 'pulse 1.8s infinite' },
  cityChip: { display: 'flex', alignItems: 'center', gap: '7px', background: 'var(--white)', border: '1px solid var(--cream4)', borderRadius: '999px', padding: '8px 16px', fontSize: '13px', cursor: 'pointer' },
  cityName: { fontSize: '13px', color: 'var(--ink2)', fontWeight: 500 },
  layout: { display: 'grid', gridTemplateColumns: '292px 1fr', gap: '20px', alignItems: 'start' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '14px' },
  main: { minHeight: '400px' },
  card: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '16px', overflow: 'hidden' },
  cardLabel: { fontSize: '10.5px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink4)', padding: '14px 16px 0' },
  weatherBg: { background: 'linear-gradient(145deg,#d4926a 0%,#b06040 100%)', padding: '18px' },
  wLoc: { fontSize: '11px', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', marginBottom: '10px' },
  wRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  wTemp: { fontFamily: 'var(--serif)', fontSize: '52px', fontWeight: 400, color: '#fff', lineHeight: 1 },
  wUnit: { fontSize: '22px', verticalAlign: 'top', marginTop: '8px', display: 'inline-block' },
  wRight: { textAlign: 'right' },
  wCond: { fontSize: '14px', fontWeight: 500, color: '#fff', marginBottom: '2px' },
  wFeels: { fontSize: '12px', color: 'rgba(255,255,255,.65)' },
  wStats: { display: 'flex', gap: '16px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,.2)' },
  wStat: { fontSize: '11px', color: 'rgba(255,255,255,.65)' },
  wStatVal: { fontSize: '13px', color: '#fff', display: 'block', fontWeight: 600, marginBottom: '1px' },
  fabricAdvice: { padding: '12px 16px', background: 'var(--burnt4)', borderTop: '1px solid var(--cream3)' },
  faLabel: { fontSize: '10px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--burnt)', marginBottom: '5px' },
  faText: { fontSize: '12.5px', color: 'var(--ink2)', lineHeight: 1.55, marginBottom: '10px' },
  faTags: { display: 'flex', gap: '5px', flexWrap: 'wrap' },
  faTag: { background: 'var(--burnt)', color: '#fff', borderRadius: '999px', padding: '3px 10px', fontSize: '10.5px', fontWeight: 600 },
  occGrid: { padding: '10px 14px 14px', display: 'flex', flexWrap: 'wrap', gap: '6px' },
  occChip: { display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--cream)', border: '1px solid var(--cream4)', borderRadius: '999px', padding: '7px 13px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', color: 'var(--ink2)', transition: 'all .18s' },
  occChipOn: { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' },
  btList: { padding: '10px 14px 14px', display: 'flex', flexDirection: 'column', gap: '5px' },
  btOpt: { display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 11px', borderRadius: '10px', border: '1px solid var(--cream3)', background: 'var(--cream)', cursor: 'pointer', textAlign: 'left', transition: 'all .18s' },
  btOptOn: { background: 'var(--burnt3)', borderColor: 'var(--burnt)' },
  btInfo: { flex: 1 },
  btName: { fontSize: '12.5px', fontWeight: 600, color: 'var(--ink)' },
  btHint: { fontSize: '10.5px', color: 'var(--ink4)', marginTop: '1px' },
  btTick: { color: 'var(--burnt)', fontWeight: 700, fontSize: '14px' },
  skinTabs: { display: 'flex', gap: '5px', padding: '12px 14px 0' },
  skinTab: { padding: '5px 11px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 500, cursor: 'pointer', border: '1px solid var(--cream4)', color: 'var(--ink3)', background: 'var(--cream)', transition: 'all .18s' },
  skinTabOn: { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' },
  palSwatches: { display: 'flex', gap: '5px', padding: '10px 14px', background: 'var(--cream2)', margin: '10px 14px', borderRadius: '10px' },
  palSw: { flex: 1, height: '44px', borderRadius: '8px', border: '1px solid rgba(0,0,0,.04)', cursor: 'pointer' },
  palNote: { fontSize: '11.5px', color: 'var(--ink4)', padding: '0 14px 14px', lineHeight: 1.55 },
  genBtn: { width: '100%', background: 'var(--burnt)', color: '#fff', borderRadius: '12px', padding: '14px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', border: 'none' },
  emptyWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '420px', textAlign: 'center', padding: '20px' },
  emptyIcon: { width: '76px', height: '76px', borderRadius: '20px', background: 'var(--burnt3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' },
  emptyTitle: { fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' },
  emptySub: { fontSize: '14.5px', color: 'var(--ink3)', lineHeight: 1.72, marginBottom: '26px', maxWidth: '340px' },
  emptyPills: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' },
  emptyPill: { background: 'var(--cream2)', border: '1px solid var(--cream4)', fontSize: '12px', fontWeight: 500, color: 'var(--ink2)', borderRadius: '999px', padding: '6px 15px' },
  resultsHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' },
  resultsTitle: { fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)' },
  tempBadge: { fontSize: '16px', color: 'var(--ink3)', fontStyle: 'normal' },
  resultsMeta: { fontSize: '12px', color: 'var(--ink4)' },
  outfitsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' },
  oc: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' },
  ocTop: { padding: '14px 14px 10px', position: 'relative' },
  ocRank: { position: 'absolute', top: '12px', right: '13px', fontFamily: 'var(--serif)', fontSize: '12px', color: 'var(--ink4)', fontStyle: 'italic' },
  ocSwatches: { display: 'flex', gap: '3px', height: '5px', marginBottom: '13px' },
  ocSw: { flex: 1, borderRadius: '3px' },
  ocName: { fontFamily: 'var(--serif)', fontSize: '14.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' },
  ocOcc: { fontSize: '11px', color: 'var(--ink4)' },
  ocItems: { padding: '0 14px 10px' },
  ocItem: { display: 'flex', alignItems: 'center', gap: '9px', padding: '6px 0', borderBottom: '1px solid var(--cream2)' },
  ocDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  ocItemName: { fontSize: '12.5px', fontWeight: 500, color: 'var(--ink)', flex: 1 },
  ocItemFab: { fontSize: '10px', color: 'var(--white)', background: 'var(--ink4)', borderRadius: '4px', padding: '1px 7px', fontWeight: 500 },
  ocFooter: { padding: '10px 14px 14px', borderTop: '1px solid var(--cream2)' },
  ocScoreRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  ocScoreLbl: { fontSize: '10.5px', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink4)' },
  ocScoreNum: { fontSize: '14px', fontWeight: 700, color: 'var(--forest)' },
  ocBar: { height: '4px', background: 'var(--cream3)', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px' },
  ocBarFill: { height: '100%', background: 'linear-gradient(90deg,var(--forest),#5aaa58)', borderRadius: '2px', transition: 'width 1s ease' },
  ocActions: { display: 'flex', gap: '6px' },
  ocBtn: { flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid var(--cream3)', background: 'var(--cream)', fontSize: '11.5px', fontWeight: 600, color: 'var(--ink2)', cursor: 'pointer', transition: 'all .18s' },
  ocBtnOn: { background: 'var(--burnt)', color: '#fff', borderColor: 'var(--burnt)' },
  ocBtnX: { width: '34px', padding: '8px', borderRadius: '8px', border: '1px solid var(--cream3)', background: 'transparent', color: 'var(--ink4)', cursor: 'pointer', fontSize: '12px' },
  skeletonTemp: { width: '120px', height: '52px', borderRadius: '8px', background: 'rgba(255,255,255,0.25)', marginBottom: '10px' },
  skeletonLine: { width: '160px', height: '16px', borderRadius: '6px', background: 'rgba(255,255,255,0.2)' },
  skeletonLineLight: { width: '100%', height: '14px', borderRadius: '6px', background: 'rgba(0,0,0,0.08)', marginBottom: '8px' },
}