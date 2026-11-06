import { useState } from 'react'
import { Section, Diya } from './Shared'
import { RotateCcw, Flame } from 'lucide-react'

const TOTAL = 9
export default function DiyaLighting() {
  const [lit, setLit] = useState(() => Array(TOTAL).fill(false))
  const n = lit.filter(Boolean).length
  const light = (i) => setLit((a) => a.map((v, j) => (j === i ? true : v)))
  return (
    <Section id="diya" icon="🪔" title="दीप जलाएं" sub="हर दीये पर उंगली रखिए और उसे जलाइए">
      <div className="diya-stage" style={{ '--glow': n / TOTAL }}>
        <div className="diya-grid">
          {lit.map((v, i) => (
            <button key={i} className="diya-btn" onClick={() => light(i)} aria-pressed={v} aria-label={v ? `दीया ${i + 1} जल रहा है` : `दीया ${i + 1} जलाएं`}>
              <Diya lit={v} size={96} />
              <span className="tap-hint">{v ? '✨' : 'जलाएं'}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="counter" aria-live="polite">{n} / {TOTAL} दीप जल गए</p>
      <p className="big-msg">आपके जीवन में खुशियों के दीप हमेशा जलते रहें।</p>
      {n === TOTAL && <p className="celebrate">🎉 वाह! सारे दीप जल उठे — शुभ दीपावली! 🎉</p>}
      <div className="btn-row">
        <button className="btn btn-gold" onClick={() => setLit(Array(TOTAL).fill(true))}><Flame size={20} /> सारे दीप जलाएं</button>
        <button className="btn btn-ghost" onClick={() => setLit(Array(TOTAL).fill(false))}><RotateCcw size={20} /> फिर से शुरू करें</button>
      </div>
    </Section>
  )
}
