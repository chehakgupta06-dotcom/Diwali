import { Diya, Marigold } from './Shared'
import { config } from '../config'
import { Volume2, VolumeX } from 'lucide-react'

function Lantern({ className, hue = '#c2185b' }) {
  return (
    <svg className={`lantern ${className}`} viewBox="0 0 60 120" aria-hidden="true">
      <line x1="30" y1="0" x2="30" y2="26" stroke="#f5c451" strokeWidth="2" />
      <rect x="20" y="24" width="20" height="7" rx="2" fill="#f5c451" />
      <path d="M14 36C14 30 46 30 46 36L50 70C50 82 10 82 10 70Z" fill={hue} />
      <path d="M30 31V80M22 32C16 50 16 66 20 80M38 32C44 50 44 66 40 80" stroke="#ffd36b" strokeWidth="1.4" fill="none" opacity=".85" />
      <rect x="20" y="80" width="20" height="6" rx="2" fill="#f5c451" />
      <path d="M24 86v22M30 86v28M36 86v22" stroke="#f5c451" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="56" r="9" fill="#ffd36b" opacity=".45" />
    </svg>
  )
}

function Mandala() {
  const petals = Array.from({ length: 24 }, (_, i) => i)
  return (
    <svg viewBox="-200 -200 400 400" className="mandala" aria-hidden="true">
      <g fill="none" stroke="#f5c451" strokeWidth="1.2">
        <circle r="190" strokeDasharray="2 6" /><circle r="150" /><circle r="96" strokeDasharray="1 5" />
        {petals.map((i) => <path key={i} d="M0-100C26-130 26-160 0-186C-26-160-26-130 0-100Z" transform={`rotate(${i * 15})`} fill="#f5c451" fillOpacity=".07" />)}
        {petals.map((i) => <path key={'b' + i} d="M0-60C14-76 14-92 0-104C-14-92-14-76 0-60Z" transform={`rotate(${i * 15 + 7.5})`} />)}
      </g>
    </svg>
  )
}

export default function Hero({ music }) {
  return (
    <section id="top" className="hero">
      <div className="garland" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <Marigold key={i} size={38} color={i % 2 ? '#f59e0b' : '#fb923c'} />)}</div>
      <Lantern className="lantern-l" /><Lantern className="lantern-r" hue="#7b1fa2" />
      <div className="hero-mandala"><Mandala /></div>
      <div className="hero-inner">
        <p className="hero-from">{config.familyName} की ओर से</p>
        <h1 className="hero-title">शुभ दीपावली!</h1>
        <p className="hero-sub">दीपों की रोशनी आपके जीवन में खुशियां और समृद्धि लेकर आए।</p>
        <div className="hero-diyas" aria-hidden="true"><Diya lit size={70} /><Diya lit size={130} /><Diya lit size={70} /></div>
        <p className="hero-greet">आपको और आपके पूरे परिवार को हमारी ओर से दिल से शुभकामनाएं 🙏</p>
        <a href="#family" className="btn btn-gold btn-lg">दीपावली की खुशियां देखें</a>
        <button className="btn btn-ghost" onClick={music.toggle} aria-pressed={music.on}>
          {music.on ? <VolumeX size={20} /> : <Volume2 size={20} />} {music.on ? 'संगीत बंद करें' : 'संगीत चालू करें'}
        </button>
      </div>
    </section>
  )
}
