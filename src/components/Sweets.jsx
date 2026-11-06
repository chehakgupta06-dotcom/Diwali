import { useState } from 'react'
import { Section } from './Shared'
import { sweets } from '../data/wishes'

const art = {
  laddu: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="88" rx="30" ry="5" fill="#000" opacity=".25" />
      <circle cx="50" cy="52" r="34" fill="#f5a623" /><circle cx="50" cy="52" r="34" fill="url(#ladduShade)" />
      <defs><radialGradient id="ladduShade" cx=".35" cy=".3"><stop offset="0" stopColor="#ffe08a" /><stop offset="1" stopColor="#c46d0c" /></radialGradient></defs>
      {[[34, 40], [50, 32], [64, 42], [40, 58], [58, 60], [48, 74], [72, 58], [28, 62], [52, 48]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="#b45309" opacity=".7" />)}
      {[[44, 28], [56, 30], [50, 24]].map(([x, y], i) => <rect key={i} x={x} y={y} width="5" height="3" rx="1.4" fill="#4ade80" transform={`rotate(${i * 40} ${x} ${y})`} />)}
    </svg>
  ),
  kaju: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="90" rx="34" ry="5" fill="#000" opacity=".25" />
      <polygon points="40,20 78,52 40,84 2,52" transform="translate(8 -6)" fill="#e9d7a8" stroke="#c9a85b" strokeWidth="1.5" />
      <polygon points="40,20 78,52 40,84 2,52" transform="translate(14 8) scale(.9)" fill="#f6ead0" stroke="#d6b66a" strokeWidth="1.5" />
      <polygon points="40,20 78,52 40,84 2,52" transform="translate(-4 0)" fill="#fff3d6" stroke="#d9b45a" strokeWidth="1.5" />
      <path d="M12 52L36 30M18 58L44 34" stroke="#cfd8dc" strokeWidth="2.2" strokeLinecap="round" opacity=".9" transform="translate(-4 0)" />
      <polygon points="36,44 44,52 36,60 28,52" fill="#fffaf0" opacity=".8" transform="translate(-2 0)" />
    </svg>
  ),
  barfi: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="90" rx="34" ry="5" fill="#000" opacity=".25" />
      <rect x="14" y="44" width="52" height="34" rx="5" fill="#d9467a" transform="rotate(-8 40 60)" />
      <rect x="14" y="36" width="52" height="34" rx="5" fill="#f68fb1" stroke="#e0527f" transform="rotate(-8 40 52)" />
      <rect x="30" y="26" width="52" height="34" rx="5" fill="#fbb6cb" stroke="#e8749a" transform="rotate(8 56 43)" />
      {[[42, 34], [60, 38], [52, 46], [70, 48], [36, 46]].map(([x, y], i) => <rect key={i} x={x} y={y} width="6" height="3" rx="1.5" fill={i % 2 ? '#86efac' : '#4ade80'} transform={`rotate(${i * 35} ${x} ${y})`} />)}
      <path d="M36 32L74 40" stroke="#fff" strokeWidth="1.4" opacity=".55" />
    </svg>
  ),
  jalebi: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="90" rx="32" ry="5" fill="#000" opacity=".25" />
      <path d="M50 52a7 7 0 0 1 14 0a16 16 0 0 1-32 0a25 25 0 0 1 50 0a34 34 0 0 1-68 0" fill="none" stroke="#e8590c" strokeWidth="10" strokeLinecap="round" transform="translate(0 -4) scale(.95) translate(2.5 2)" />
      <path d="M50 52a7 7 0 0 1 14 0a16 16 0 0 1-32 0a25 25 0 0 1 50 0a34 34 0 0 1-68 0" fill="none" stroke="#ffa94d" strokeWidth="4" strokeLinecap="round" transform="translate(0 -4) scale(.95) translate(2.5 2)" />
    </svg>
  ),
  jamun: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="92" rx="36" ry="5" fill="#000" opacity=".25" />
      <path d="M10 52H90C88 78 68 90 50 90C32 90 12 78 10 52Z" fill="#fde68a" stroke="#d6a52a" strokeWidth="1.5" />
      <circle cx="33" cy="46" r="17" fill="#6b2412" /><circle cx="67" cy="46" r="17" fill="#6b2412" /><circle cx="50" cy="36" r="17" fill="#7a2b16" />
      <circle cx="44" cy="30" r="4.5" fill="#fff" opacity=".28" /><circle cx="27" cy="40" r="3.5" fill="#fff" opacity=".25" /><circle cx="61" cy="40" r="3.5" fill="#fff" opacity=".25" />
      <ellipse cx="50" cy="54" rx="40" ry="7.5" fill="#f59e0b" opacity=".85" /><ellipse cx="50" cy="53" rx="40" ry="7.5" fill="none" stroke="#fde68a" strokeWidth="2" />
    </svg>
  ),
}

export default function Sweets() {
  const [active, setActive] = useState(null)
  const [counts, setCounts] = useState({})
  const tap = (s) => {
    const n = counts[s.id] || 0
    setCounts({ ...counts, [s.id]: n + 1 })
    setActive({ id: s.id, name: s.name, msg: s.msgs[n % s.msgs.length], k: Date.now() })
  }
  return (
    <Section id="sweets" icon="🍬" title="मिठास भरी दिवाली" sub="अपनी पसंद की मिठाई पर टैप कीजिए">
      <div className="sweets-grid">
        {sweets.map((s) => (
          <button key={s.id} className={`sweet ${active?.id === s.id ? 'on' : ''}`} onClick={() => tap(s)} aria-label={`${s.name} चुनें`}>
            <span className="sweet-art" key={active?.id === s.id ? active.k : 0}>{art[s.id]}</span>
            <span className="sweet-name">{s.name}</span>
          </button>
        ))}
      </div>
      <div className="sweet-bubble" aria-live="polite">
        {active ? <p key={active.k}><strong>{active.name}:</strong> {active.msg}</p> : <p>👆 किसी भी मिठाई पर टैप कीजिए और मीठा संदेश पाइए।</p>}
      </div>
    </Section>
  )
}
