import { useMemo, useState } from 'react'
import { Section } from './Shared'
import { RotateCcw, Wand2 } from 'lucide-react'

const RINGS = [[1, 0], [6, 52], [12, 104], [18, 156]]
const COLORS = ['#e11d48', '#f59e0b', '#7c3aed', '#0ea5e9', '#16a34a', '#ec4899']
const TOOLS = [['flower', '🌼', 'फूल'], ['color', '🎨', 'रंग'], ['diya', '🪔', 'दीया'], ['pattern', '❋', 'नक्काशी']]

const star = (pts, ro, ri) => Array.from({ length: pts * 2 }, (_, i) => {
  const a = (Math.PI * i) / pts, r = i % 2 ? ri : ro
  return `${(Math.sin(a) * r).toFixed(1)},${(-Math.cos(a) * r).toFixed(1)}`
}).join(' ')
const STAR = star(8, 18, 8)

function Item({ it, x, y, ang }) {
  if (it.type === 'flower') return (
    <g transform={`translate(${x} ${y}) scale(1.05)`}>
      {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cy="-9" rx="5" ry="9" fill={i % 2 ? '#f59e0b' : '#fb923c'} stroke="#b45309" strokeWidth=".5" transform={`rotate(${i * 45})`} />)}
      <circle r="4.5" fill="#92400e" />
    </g>
  )
  if (it.type === 'color') return (
    <g transform={`translate(${x} ${y}) rotate(${ang})`}>
      <path d="M0 15C-15 4-11-13 0-20C11-13 15 4 0 15Z" fill={it.color} stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" />
      <ellipse cy="-1" rx="3.5" ry="7" fill="#fff" opacity=".35" />
    </g>
  )
  if (it.type === 'diya') return (
    <g transform={`translate(${x - 17} ${y - 16}) scale(.34)`}>
      <circle cx="50" cy="40" r="46" fill="url(#haloG)" />
      <path className="rg-flame" d="M50 6C63 22 66 36 50 50C34 36 37 22 50 6Z" fill="url(#flameG)" />
      <path d="M6 54H94C92 76 74 86 50 86C26 86 8 76 6 54Z" fill="url(#bowlG)" /><ellipse cx="50" cy="54" rx="44" ry="7" fill="#f7b04a" />
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) rotate(${ang})`}>
      <polygon points={STAR} fill={it.color} fillOpacity=".85" stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
      <circle r="4.5" fill="#ffe08a" />
    </g>
  )
}

export default function Rangoli() {
  const slots = useMemo(() => RINGS.flatMap(([n, r], ri) => Array.from({ length: n }, (_, i) => {
    const ang = n === 1 ? 0 : (360 / n) * i + (ri % 2 ? 180 / n : 0)
    const a = (ang * Math.PI) / 180
    return { key: `${ri}-${i}`, x: 200 + r * Math.sin(a), y: 200 - r * Math.cos(a), ang }
  })), [])
  const [tool, setTool] = useState('flower')
  const [color, setColor] = useState(COLORS[0])
  const [cells, setCells] = useState({})
  const filled = Object.keys(cells).length
  const done = filled === slots.length

  const place = (k) => setCells((c) => {
    const it = { type: tool, color }
    const old = c[k]
    if (old && old.type === it.type && old.color === it.color) { const n = { ...c }; delete n[k]; return n }
    return { ...c, [k]: it }
  })
  const auto = () => {
    const n = {}
    slots.forEach((s, i) => { n[s.key] = { type: ['flower', 'color', 'pattern', 'diya'][(i * 7 + (i % 3)) % 4], color: COLORS[(i * 5) % COLORS.length] } })
    setCells(n)
  }

  return (
    <Section id="rangoli" icon="🌸" title="अपनी रंगोली सजाएं" sub="पहले चुनिए, फिर रंगोली के खाली घेरे पर टैप कीजिए">
      <div className="tool-row" role="radiogroup" aria-label="सजावट चुनें">
        {TOOLS.map(([id, ic, label]) => (
          <button key={id} role="radio" aria-checked={tool === id} className={`tool ${tool === id ? 'on' : ''}`} onClick={() => setTool(id)}><span aria-hidden="true">{ic}</span>{label}</button>
        ))}
      </div>
      <div className="color-row" role="radiogroup" aria-label="रंग चुनें">
        {COLORS.map((c) => <button key={c} role="radio" aria-checked={color === c} aria-label={`रंग ${c}`} className={`swatch ${color === c ? 'on' : ''}`} style={{ background: c }} onClick={() => setColor(c)} />)}
      </div>
      <div className={`rangoli-box ${done ? 'done' : ''}`}>
        <svg viewBox="0 0 400 400" className="rangoli-svg" role="group" aria-label="रंगोली">
          <circle cx="200" cy="200" r="196" fill="#2b0f3a" stroke="url(#goldG)" strokeWidth="4" />
          <g fill="none" stroke="#f5c451" strokeOpacity=".4" strokeWidth="1.2">
            {RINGS.slice(1).map(([, r]) => <circle key={r} cx="200" cy="200" r={r} strokeDasharray="3 6" />)}
            <circle cx="200" cy="200" r="184" />
            {Array.from({ length: 12 }, (_, i) => <line key={i} x1="200" y1="200" x2="200" y2="20" transform={`rotate(${i * 30} 200 200)`} />)}
          </g>
          {slots.map((s) => {
            const it = cells[s.key]
            return (
              <g key={s.key} className="slot" role="button" tabIndex={0} aria-label={it ? 'सजा हुआ घेरा – बदलने के लिए टैप करें' : 'खाली घेरा – सजाने के लिए टैप करें'}
                onClick={() => place(s.key)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), place(s.key))}>
                <circle cx={s.x} cy={s.y} r="23" fill="transparent" />
                {it ? <Item it={it} x={s.x} y={s.y} ang={s.ang} /> : <circle cx={s.x} cy={s.y} r="12" fill="#f5c451" fillOpacity=".08" stroke="#f5c451" strokeOpacity=".7" strokeDasharray="3 3" />}
              </g>
            )
          })}
        </svg>
      </div>
      <p className="counter" aria-live="polite">{filled} / {slots.length} घेरे सजे</p>
      {done && <p className="celebrate">🎉 वाह! आपकी रंगोली पूरी हो गई। बहुत सुंदर! 🎉</p>}
      <div className="btn-row">
        <button className="btn btn-gold" onClick={auto}><Wand2 size={20} /> अपने आप सजाएं</button>
        <button className="btn btn-ghost" onClick={() => setCells({})}><RotateCcw size={20} /> रंगोली मिटाएं</button>
      </div>
    </Section>
  )
}
