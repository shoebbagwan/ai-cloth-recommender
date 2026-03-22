import { useState } from 'react'

const ITEMS = [
  { n:'White Linen Shirt',        cat:'Top',       col:'#f0ebe0', f:'Linen',      occ:['daily','office'],    worn:12, fav:true  },
  { n:'Navy Cotton Kurta',        cat:'Top',       col:'#1a2b4a', f:'Cotton',     occ:['daily','festival'],  worn:8,  fav:false },
  { n:'Sage Green Blouse',        cat:'Top',       col:'#7a8c6e', f:'Silk',       occ:['office','party'],    worn:5,  fav:true  },
  { n:'Ivory Peplum Top',         cat:'Top',       col:'#f5efe6', f:'Chiffon',    occ:['party','date'],      worn:3,  fav:false },
  { n:'Beige Slim Chinos',        cat:'Bottom',    col:'#c8b89a', f:'Cotton',     occ:['daily','office'],    worn:15, fav:false },
  { n:'Black Wide-Leg Trousers',  cat:'Bottom',    col:'#1a1714', f:'Wool blend', occ:['office','party'],    worn:10, fav:true  },
  { n:'Terracotta A-line Skirt',  cat:'Bottom',    col:'#c4703f', f:'Cotton',     occ:['daily','date'],      worn:6,  fav:false },
  { n:'Olive Cargo Pants',        cat:'Bottom',    col:'#6b7a5a', f:'Cotton',     occ:['daily','travel'],    worn:4,  fav:false },
  { n:'Coral Wrap Dress',         cat:'Dress',     col:'#e87b5a', f:'Chiffon',    occ:['party','date'],      worn:3,  fav:true  },
  { n:'Ivory Midi Dress',         cat:'Dress',     col:'#f5efe6', f:'Linen',      occ:['daily','casual'],    worn:7,  fav:false },
  { n:'Forest Green Jumpsuit',    cat:'Dress',     col:'#2a4a2a', f:'Crepe',      occ:['party','date'],      worn:2,  fav:true  },
  { n:'Olive Linen Blazer',       cat:'Outerwear', col:'#7a8c6e', f:'Linen',      occ:['office'],            worn:9,  fav:true  },
  { n:'Camel Wool Coat',          cat:'Outerwear', col:'#c8a06a', f:'Wool',       occ:['formal','travel'],   worn:2,  fav:false },
  { n:'Denim Jacket',             cat:'Outerwear', col:'#4a6a9a', f:'Denim',      occ:['daily','casual'],    worn:11, fav:false },
  { n:'Tan Block Heels',          cat:'Footwear',  col:'#c8a06a', f:'Leather',    occ:['office','party'],    worn:8,  fav:true  },
  { n:'White Canvas Sneakers',    cat:'Footwear',  col:'#f5f5f0', f:'Canvas',     occ:['daily','gym'],       worn:20, fav:false },
  { n:'Brown Leather Sandals',    cat:'Footwear',  col:'#8b6b3a', f:'Leather',    occ:['daily','casual'],    worn:14, fav:false },
  { n:'Gold Kolhapuri Sandals',   cat:'Footwear',  col:'#b8963e', f:'Leather',    occ:['festival','wedding'],worn:4,  fav:true  },
]

const CATS = ['All','Top','Bottom','Dress','Outerwear','Footwear']

export default function WardrobePage() {
  const [selCat, setSelCat] = useState('All')
  const [items, setItems]   = useState(ITEMS)

  const filtered = selCat === 'All'
    ? items
    : items.filter(w => w.cat === selCat)

  function toggleFav(index) {
    const actualIndex = ITEMS.indexOf(filtered[index])
    setItems(prev => prev.map((item, i) =>
      i === actualIndex ? { ...item, fav: !item.fav } : item
    ))
  }

  return (
    <div style={s.page} className="page-enter">
      <div style={s.wrap}>

        {/* HEADER */}
        <div style={s.header}>
          <div>
            <h1 style={s.title}>My Wardrobe</h1>
            <p style={s.sub}>
              Your personal collection — AttireAI recommends outfits from these {items.length} items
            </p>
          </div>
          <div style={s.actions}>
            <button style={s.btnGhost}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search items
            </button>
            <button style={s.btnSolid}>
              + Add clothing item
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={s.statsRow}>
          {[
            { num: '24',  lbl: 'Total items',       note: '↑ 3 added this month',    noteCol: 'var(--forest)'  },
            { num: '8',   lbl: 'Outfits created',   note: 'from your wardrobe',       noteCol: 'var(--ink4)'   },
            { num: '4',   lbl: 'Rarely worn',       note: 'consider donating',        noteCol: 'var(--gold)'   },
            { num: '92%', lbl: 'Season coverage',   note: 'all seasons covered',      noteCol: 'var(--forest)'  },
          ].map((stat, i) => (
            <div key={i} style={s.statCard}>
              <div style={s.statNum}>{stat.num}</div>
              <div style={s.statLbl}>{stat.lbl}</div>
              <div style={{...s.statNote, color: stat.noteCol}}>{stat.note}</div>
            </div>
          ))}
        </div>

        {/* FILTER BAR */}
        <div style={s.filterBar}>
          <div style={s.cats}>
            {CATS.map(c => (
              <button key={c}
                style={{...s.cat, ...(selCat===c ? s.catOn : {})}}
                onClick={() => setSelCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div style={s.sortWrap}>
            <span style={{fontSize:'12.5px', color:'var(--ink4)'}}>Sort by:</span>
            <select style={s.sortSel}>
              <option>Recently added</option>
              <option>Most worn</option>
              <option>Colour</option>
              <option>Fabric type</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        <div style={s.grid} className="stagger">
          {filtered.map((item, i) => (
            <div key={i} style={s.card}>
              <div style={{...s.swatch, background: item.col}}>
                <span style={s.badge}>{item.cat}</span>
                <button
                  style={s.favBtn}
                  onClick={() => toggleFav(i)}>
                  {item.fav ? '♥' : '♡'}
                </button>
              </div>
              <div style={s.cardBody}>
                <div style={s.cardName}>{item.n}</div>
                <div style={s.cardDetail}>{item.f}</div>
                <div style={s.cardTags}>
                  {item.occ.map(o => (
                    <span key={o} style={s.tag}>{o}</span>
                  ))}
                </div>
                <div style={s.wornRow}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Worn {item.worn} {item.worn !== 1 ? 'times' : 'time'}
                </div>
              </div>
            </div>
          ))}

          {/* Upload card */}
          <div style={s.uploadCard}>
            <div style={s.uploadPlus}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div style={s.uploadTitle}>Add new item</div>
            <div style={s.uploadSub}>Upload a photo or fill in details manually</div>
          </div>
        </div>

      </div>
    </div>
  )
}

const s = {
  page: { minHeight: 'calc(100vh - 58px)', background: 'var(--cream)' },
  wrap: { maxWidth: '1200px', margin: '0 auto', padding: '28px' },

  // HEADER
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' },
  title: { fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 700, color: 'var(--ink)' },
  sub: { fontSize: '13.5px', color: 'var(--ink3)', marginTop: '4px' },
  actions: { display: 'flex', gap: '8px', alignItems: 'center' },
  btnGhost: { background: 'var(--white)', border: '1px solid var(--cream4)', borderRadius: '9px', padding: '9px 16px', fontSize: '13px', fontWeight: 500, color: 'var(--ink2)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' },
  btnSolid: { background: 'var(--ink)', color: '#fff', borderRadius: '9px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none' },

  // STATS
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', margin: '22px 0' },
  statCard: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '14px', padding: '16px 18px' },
  statNum: { fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 700, color: 'var(--ink)', marginBottom: '3px' },
  statLbl: { fontSize: '12px', color: 'var(--ink4)', fontWeight: 500 },
  statNote: { fontSize: '11.5px', marginTop: '5px', fontWeight: 500 },

  // FILTERS
  filterBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' },
  cats: { display: 'flex', gap: '6px' },
  cat: { padding: '7px 16px', borderRadius: '999px', border: '1px solid var(--cream4)', background: 'var(--white)', fontSize: '12.5px', fontWeight: 500, color: 'var(--ink3)', cursor: 'pointer', transition: 'all .18s' },
  catOn: { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' },
  sortWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  sortSel: { border: '1px solid var(--cream4)', borderRadius: '8px', padding: '6px 10px', fontSize: '12.5px', color: 'var(--ink2)', background: 'var(--white)', cursor: 'pointer', fontFamily: 'var(--sans)' },

  // GRID
  grid: { display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px' },
  card: { background: 'var(--white)', border: '1px solid var(--cream3)', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s' },
  swatch: { height: '104px', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '8px' },
  badge: { background: 'rgba(24,20,15,.55)', color: '#fff', borderRadius: '999px', padding: '3px 9px', fontSize: '9.5px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' },
  favBtn: { width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', cursor: 'pointer', border: 'none' },
  cardBody: { padding: '11px 13px' },
  cardName: { fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px', lineHeight: 1.3 },
  cardDetail: { fontSize: '11px', color: 'var(--ink4)', marginBottom: '8px' },
  cardTags: { display: 'flex', gap: '4px', flexWrap: 'wrap' },
  tag: { background: 'var(--cream2)', borderRadius: '5px', padding: '2px 8px', fontSize: '10px', color: 'var(--ink3)', fontWeight: 500 },
  wornRow: { fontSize: '10.5px', color: 'var(--ink4)', marginTop: '7px', paddingTop: '7px', borderTop: '1px solid var(--cream2)', display: 'flex', alignItems: 'center', gap: '4px' },

  // UPLOAD CARD
  uploadCard: { border: '1.5px dashed var(--cream4)', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '194px', cursor: 'pointer', textAlign: 'center', padding: '20px' },
  uploadPlus: { fontSize: '28px', color: 'var(--cream4)', marginBottom: '8px' },
  uploadTitle: { fontSize: '13px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '3px' },
  uploadSub: { fontSize: '11.5px', color: 'var(--ink4)', lineHeight: 1.5 },
}