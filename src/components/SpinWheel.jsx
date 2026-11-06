import { useEffect, useRef, useState } from 'react'
import { Section } from './Shared'
import Modal from './Modal'
import { wheelSegments as SEG } from '../data/wishes'

const N = SEG.length, ANG = 360 / N, R = 190
const pt = (r, deg) => { const a = ((deg - 90) * Math.PI) / 180; return [(r * Math.cos(a)).toFixed(2), (r * Math.sin(a)).toFixed(2)] }
const slice = (i) => {
  const s = i * ANG - ANG / 2, e = s + ANG
  const [x1, y1] = pt(R, s), [x2, y2] = pt(R, e)
  return `M0 0L${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}Z`
}

export default function SpinWheel() {
  const [rot, setRot] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const spin = () => {
    if (spinning) return
    const k = Math.floor(Math.random() * N)
    const toZero = (((-k * ANG - rot) % 360) + 360) % 360
    const jitter = (Math.random() - 0.5) * (ANG - 12)
    setResult(null); setSpinning(true); setRot(rot + 360 * 5 + toZero + jitter)
    const wait = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 300 : 4700
    timer.current = setTimeout(() => { setSpinning(false); setResult(k) }, wait)
  }

  return (
    <Section id="wheel" icon="🎡" title="खुशियों का पहिया" sub="“घुमाएं” दबाइए – देखें आपके लिए कौन सा आशीर्वाद निकलता है">
      <div className="wheel-wrap">
        <div className="wheel-pointer" aria-hidden="true" />
        <svg viewBox="-200 -200 400 400" className="wheel-svg" style={{ transform: `rotate(${rot}deg)` }} role="img" aria-label="रंगीन आशीर्वाद का पहिया">
          <circle r="198" fill="url(#goldG)" />
          {SEG.map((s, i) => <path key={i} d={slice(i)} fill={s.color} stroke="#ffe08a" strokeWidth="2" />)}
          {SEG.map((s, i) => (
            <g key={'t' + i} transform={`rotate(${i * ANG - 90})`}>
              <text x="58" y="-3" className="wheel-text">{s.lines[0]}</text>
              <text x="58" y="15" className="wheel-text">{s.lines[1]}</text>
            </g>
          ))}
          {Array.from({ length: 24 }, (_, i) => { const [x, y] = pt(194, i * 15); return <circle key={i} cx={x} cy={y} r="3.2" fill="#fff6cf" /> })}
          <circle r="30" fill="url(#goldG)" stroke="#8a1538" strokeWidth="3" />
          <text y="9" textAnchor="middle" fontSize="26">🪔</text>
        </svg>
      </div>
      <div className="btn-row">
        <button className="btn btn-gold btn-lg" onClick={spin} disabled={spinning}>{spinning ? 'घूम रहा है…' : 'घुमाएं'}</button>
      </div>
      {result !== null && (
        <Modal onClose={() => setResult(null)} label="आपका आशीर्वाद">
          <div className="modal-emoji" aria-hidden="true">🎉</div>
          <h3 className="modal-title">{SEG[result].lines.join(' ')}</h3>
          <p className="modal-text">{SEG[result].text}</p>
          <div className="btn-row">
            <button className="btn btn-gold" onClick={() => { setResult(null); setTimeout(spin, 150) }}>फिर से घुमाएं</button>
            <button className="btn btn-ghost" onClick={() => setResult(null)}>बंद करें</button>
          </div>
        </Modal>
      )}
    </Section>
  )
}
