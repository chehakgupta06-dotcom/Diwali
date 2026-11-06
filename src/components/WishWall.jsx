import { useEffect, useState } from 'react'
import { Section } from './Shared'
import { Send } from 'lucide-react'
import { addWish, isShared, loadWishes } from '../services/wishStore'
import { config } from '../config'

const seeds = [
  { id: 's1', name: config.familyName, message: 'आप सभी को दीपावली की ढेर सारी शुभकामनाएं! अपनी शुभकामना यहां ज़रूर लिखिए। 🪔' },
  { id: 's2', name: config.familyName, message: 'आपका आना और आपका प्यार ही हमारी सबसे बड़ी दिवाली है। ❤️' },
]

export default function WishWall() {
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [loadErr, setLoadErr] = useState(false)

  useEffect(() => { loadWishes().then(setList).catch(() => setLoadErr(true)) }, [])

  const submit = async (e) => {
    e.preventDefault()
    const n = name.trim(), m = msg.trim()
    if (!n) return setErr('कृपया अपना नाम लिखिए।')
    if (!m) return setErr('कृपया अपनी शुभकामना लिखिए।')
    setErr(''); setBusy(true)
    try {
      const item = await addWish(n, m)
      setList((l) => [item, ...l]); setMsg('')
    } catch { setErr('संदेश भेजने में दिक्कत आई। कृपया थोड़ी देर बाद फिर कोशिश कीजिए।') }
    setBusy(false)
  }
  const shown = isShared ? (list.length ? list : seeds) : [...list, ...seeds]

  return (
    <Section id="wall" icon="📝" title="शुभकामना दीवार" sub="अपना नाम और दो पंक्तियां लिखिए – आपका संदेश दीवार पर सज जाएगा">
      <div className={`notice ${isShared ? 'ok' : ''}`} role="note">
        {isShared
          ? '✅ यहां लिखे संदेश सभी आने वाले लोगों को दिखेंगे।'
          : 'ध्यान दें: अभी यह दीवार सिर्फ आपके इसी फोन में चलती है। आपके लिखे संदेश दूसरे लोगों के फोन पर नहीं दिखेंगे।'}
      </div>
      <form className="wall-form" onSubmit={submit} noValidate>
        <label htmlFor="wName">आपका नाम / परिवार का नाम</label>
        <input id="wName" type="text" value={name} maxLength={30} onChange={(e) => { setName(e.target.value); setErr('') }} placeholder="जैसे: वर्मा परिवार" autoComplete="off" />
        <label htmlFor="wMsg">आपकी शुभकामना</label>
        <textarea id="wMsg" rows={3} maxLength={150} value={msg} onChange={(e) => { setMsg(e.target.value); setErr('') }} placeholder="दीपावली की शुभकामना यहां लिखिए…" />
        <span className="char-count">{msg.length} / 150</span>
        {err && <p className="field-error" role="alert">{err}</p>}
        <button type="submit" className="btn btn-gold btn-lg" disabled={busy}><Send size={20} /> {busy ? 'भेज रहे हैं…' : 'दीवार पर लगाएं'}</button>
      </form>
      {loadErr && <p className="field-error">पुराने संदेश नहीं खुल पाए।</p>}
      <div className="wall">
        {shown.map((w, i) => (
          <article key={w.id} className={`note-card c${i % 5}`} style={{ '--tilt': `${[-1.5, 1, -0.8, 1.6, -1.1][i % 5]}deg` }}>
            <span className="pin" aria-hidden="true">🪔</span>
            <p>{w.message}</p>
            <strong>— {w.name}</strong>
          </article>
        ))}
      </div>
    </Section>
  )
}
