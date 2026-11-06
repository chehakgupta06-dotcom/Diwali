import { useState } from 'react'
import { Section } from './Shared'
import { WhatsAppIcon } from './Shared'
import { Shuffle } from 'lucide-react'
import { wishes } from '../data/wishes'
import { pick } from '../utils/hindi'
import { openWhatsApp } from '../utils/share'
import { config, siteUrl } from '../config'

export default function Wishes() {
  const [cur, setCur] = useState(() => wishes[Math.floor(Math.random() * wishes.length)])
  const next = () => setCur((c) => pick(wishes, c))
  const send = () => openWhatsApp(`🪔 ${cur.text} 🪔\n\n${siteUrl()}\n\nसप्रेम, ${config.familyName} ❤️`)
  return (
    <Section id="wishes" icon="💌" title="आपके लिए खास शुभकामनाएं" sub="दिल से निकली दुआएं – जितनी बार चाहें पढ़ें">
      <article className="wish-card" key={cur.text}>
        <span className="wish-tag">{cur.tag}</span>
        <p>{cur.text}</p>
        <p className="wish-sign">— {config.familyName}</p>
      </article>
      <div className="btn-row">
        <button className="btn btn-gold" onClick={next}><Shuffle size={20} /> दूसरी शुभकामना देखें</button>
        <button className="btn btn-wa" onClick={send}><WhatsAppIcon size={20} /> यह शुभकामना भेजें</button>
      </div>
      <h3 className="sub-title">सभी शुभकामनाएं (सरकाकर देखें 👉)</h3>
      <div className="wish-strip" tabIndex={0} aria-label="सभी शुभकामनाएं">
        {wishes.map((w) => (
          <button key={w.text} className={`mini-wish ${w === cur ? 'active' : ''}`} onClick={() => { setCur(w); document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <em>{w.tag}</em>
            <span>{w.text}</span>
          </button>
        ))}
      </div>
    </Section>
  )
}
