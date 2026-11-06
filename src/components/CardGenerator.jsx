import { useEffect, useRef, useState } from 'react'
import { Section, WhatsAppIcon } from './Shared'
import { Download, Wand2 } from 'lucide-react'
import { config, siteUrl } from '../config'
import { openWhatsApp } from '../utils/share'

const W = 1080, H = 1350
const TEMPLATES = [
  { id: 'royal', name: 'शाही मैरून', bg: ['#4a0a2a', '#2a0a3e', '#12123a'], accent: '#f5c451', text: '#fff3cf', glow: '#ff9a3c' },
  { id: 'night', name: 'नीली रात', bg: ['#0b1240', '#1a1a5c', '#2d0f4d'], accent: '#ffd36b', text: '#ffffff', glow: '#7aa2ff' },
  { id: 'saffron', name: 'केसरिया उजाला', bg: ['#ffc15e', '#ff8a1f', '#c2410c'], accent: '#5a0a24', text: '#3b0a1a', glow: '#fff2a8' },
  { id: 'purple', name: 'राजसी बैंगनी', bg: ['#6b21a8', '#4c1d95', '#2e1065'], accent: '#fbbf24', text: '#fff7e0', glow: '#f0abfc' },
]
const DISPLAY = '"Yatra One","Noto Sans Devanagari",sans-serif'
const BODY = '"Noto Sans Devanagari",sans-serif'

function diya(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  let g = ctx.createRadialGradient(0, -24, 2, 0, -24, 80)
  g.addColorStop(0, 'rgba(255,214,107,.85)'); g.addColorStop(1, 'rgba(255,154,31,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -24, 80, 0, 7); ctx.fill()
  g = ctx.createLinearGradient(0, -64, 0, -10); g.addColorStop(0, '#fff2a8'); g.addColorStop(0.6, '#ffb52e'); g.addColorStop(1, '#ff6a1a')
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, -64); ctx.bezierCurveTo(15, -44, 17, -28, 0, -10); ctx.bezierCurveTo(-17, -28, -15, -44, 0, -64); ctx.fill()
  ctx.fillStyle = '#fff6cf'; ctx.beginPath(); ctx.moveTo(0, -40); ctx.bezierCurveTo(7, -30, 7, -22, 0, -14); ctx.bezierCurveTo(-7, -22, -7, -30, 0, -40); ctx.fill()
  g = ctx.createLinearGradient(0, -4, 0, 34); g.addColorStop(0, '#f08a24'); g.addColorStop(1, '#a8420f')
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-46, -4); ctx.lineTo(46, -4); ctx.bezierCurveTo(44, 22, 26, 34, 0, 34); ctx.bezierCurveTo(-26, 34, -44, 22, -46, -4); ctx.fill()
  ctx.fillStyle = '#f7b04a'; ctx.beginPath(); ctx.ellipse(0, -4, 46, 7, 0, 0, 7); ctx.fill()
  ctx.restore()
}

function mandala(ctx, cx, cy, r, color) {
  ctx.save(); ctx.translate(cx, cy); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2
  for (let ring = 0; ring < 3; ring++) {
    const n = 16 + ring * 8, rr = r * (1 - ring * 0.28)
    ctx.globalAlpha = 0.38 - ring * 0.07
    for (let i = 0; i < n; i++) {
      ctx.save(); ctx.rotate((Math.PI * 2 * i) / n + ring * 0.1)
      ctx.beginPath(); ctx.moveTo(0, -rr * 0.55); ctx.bezierCurveTo(rr * 0.2, -rr * 0.75, rr * 0.2, -rr * 0.92, 0, -rr); ctx.bezierCurveTo(-rr * 0.2, -rr * 0.92, -rr * 0.2, -rr * 0.75, 0, -rr * 0.55)
      ctx.stroke(); if (ring === 1) ctx.fill(); ctx.restore()
    }
  }
  ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(0, 0, r * 1.04, 0, 7); ctx.setLineDash([3, 9]); ctx.stroke()
  ctx.restore()
}

function wrap(ctx, text, maxW) {
  const words = text.split(/\s+/), lines = []; let line = ''
  for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w } else line = t }
  if (line) lines.push(line); return lines
}

function draw(c, t, to, from) {
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, W, H); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  let g = ctx.createLinearGradient(0, 0, 0, H); t.bg.forEach((col, i) => g.addColorStop(i / 2, col)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  g = ctx.createRadialGradient(W / 2, 520, 10, W / 2, 520, 640); g.addColorStop(0, t.glow + '55'); g.addColorStop(1, t.glow + '00'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  for (let i = 0; i < 70; i++) { // चमकते तारे (हर बार एक जैसे)
    const r = (n) => (Math.sin(i * 91.7 + n * 17.3) + 1) / 2
    ctx.globalAlpha = 0.25 + r(3) * 0.6; ctx.fillStyle = t.id === 'saffron' ? '#fff7d6' : t.accent
    ctx.beginPath(); ctx.arc(70 + r(1) * (W - 140), 70 + r(2) * (H - 140), 1.5 + r(4) * 3, 0, 7); ctx.fill()
  }
  ctx.globalAlpha = 1
  ctx.strokeStyle = t.accent; ctx.lineWidth = 8; ctx.strokeRect(36, 36, W - 72, H - 72); ctx.lineWidth = 2; ctx.strokeRect(60, 60, W - 120, H - 120)
  ctx.fillStyle = t.accent
  ;[[60, 60], [W - 60, 60], [60, H - 60], [W - 60, H - 60]].forEach(([x, y]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillRect(-12, -12, 24, 24); ctx.restore() })

  diya(ctx, 540, 210, 1.9); diya(ctx, 340, 240, 1.15); diya(ctx, 740, 240, 1.15); diya(ctx, 175, 262, 0.8); diya(ctx, 905, 262, 0.8)

  ctx.shadowColor = t.glow; ctx.shadowBlur = t.id === 'saffron' ? 0 : 28
  ctx.fillStyle = t.accent; ctx.font = `124px ${DISPLAY}`; ctx.fillText('शुभ दीपावली', 540, 470); ctx.shadowBlur = 0
  ctx.fillStyle = t.accent; ctx.fillRect(340, 510, 400, 3); ctx.save(); ctx.translate(540, 511); ctx.rotate(Math.PI / 4); ctx.fillRect(-9, -9, 18, 18); ctx.restore()

  let y = 625
  let size = 88; ctx.font = `800 ${size}px ${BODY}`
  const toLine = `${to} को`
  while (ctx.measureText(toLine).width > 860 && size > 56) { size -= 4; ctx.font = `800 ${size}px ${BODY}` }
  ctx.fillStyle = t.id === 'saffron' ? '#5a0a24' : '#ffe9a8'
  wrap(ctx, toLine, 860).forEach((l) => { ctx.fillText(l, 540, y); y += size * 1.35 })
  y += 8; ctx.fillStyle = t.text; ctx.font = `600 50px ${BODY}`
  wrap(ctx, `${from} की ओर से`, 860).forEach((l) => { ctx.fillText(l, 540, y); y += 70 })
  y += 16; ctx.fillStyle = t.accent; ctx.font = `800 62px ${BODY}`
  wrap(ctx, 'दीपावली की हार्दिक शुभकामनाएं!', 880).forEach((l) => { ctx.fillText(l, 540, y); y += 84 })
  y += 10; ctx.fillStyle = t.text; ctx.font = `500 38px ${BODY}`
  wrap(ctx, 'आपके घर में सदा सुख, शांति और समृद्धि बनी रहे।', 800).forEach((l) => { ctx.fillText(l, 540, y); y += 56 })

  mandala(ctx, 540, 1190, 175, t.accent); diya(ctx, 540, 1200, 0.9)
}

export default function CardGenerator() {
  const [name, setName] = useState('')
  const [tpl, setTpl] = useState('royal')
  const [error, setError] = useState('')
  const [final, setFinal] = useState('')
  const [fontsReady, setFontsReady] = useState(false)
  const cvs = useRef(null)

  useEffect(() => {
    let live = true
    const sample = 'शुभ दीपावली शर्मा परिवार'
    Promise.all([document.fonts.load(`124px "Yatra One"`, sample), document.fonts.load(`800 60px "Noto Sans Devanagari"`, sample), document.fonts.load(`500 40px "Noto Sans Devanagari"`, sample)])
      .catch(() => {}).finally(() => live && setFontsReady(true))
    return () => { live = false }
  }, [])

  useEffect(() => {
    if (!fontsReady || !cvs.current) return
    draw(cvs.current, TEMPLATES.find((x) => x.id === tpl), final || 'आपके नाम', config.familyName)
  }, [tpl, final, fontsReady])

  const generate = (e) => {
    e.preventDefault()
    const v = name.trim().replace(/\s+/g, ' ')
    if (!v) { setError('कृपया पहले अपना नाम या परिवार का नाम लिखिए।'); return }
    setError(''); setFinal(v)
    setTimeout(() => cvs.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }
  const blob = () => new Promise((res) => cvs.current.toBlob(res, 'image/png'))
  const download = async () => {
    const b = await blob(); const a = document.createElement('a')
    a.href = URL.createObjectURL(b); a.download = `diwali-card-${final.replace(/\s+/g, '-')}.png`; a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 2000)
  }
  const text = `🪔 ${final} को ${config.familyName} की ओर से दीपावली की हार्दिक शुभकामनाएं! 🪔\n\n${siteUrl()}`
  const share = async () => {
    try {
      const file = new File([await blob()], 'diwali-card.png', { type: 'image/png' })
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text }); return }
    } catch (err) { if (err && err.name === 'AbortError') return }
    openWhatsApp(text)
  }
  const ready = Boolean(final)

  return (
    <Section id="card" icon="🖼️" title="अपना दीपावली कार्ड बनाएं" sub="नाम लिखिए, डिज़ाइन चुनिए और कार्ड अपने रिश्तेदारों को भेजिए">
      <form className="card-form" onSubmit={generate}>
        <label htmlFor="cardName">1. जिसे कार्ड भेजना है उनका नाम</label>
        <input id="cardName" type="text" value={name} maxLength={30} placeholder="जैसे: शर्मा परिवार" onChange={(e) => { setName(e.target.value); setError('') }} autoComplete="off" />
        {error && <p className="field-error" role="alert">{error}</p>}
        <p className="label">2. कार्ड का डिज़ाइन चुनिए</p>
        <div className="tpl-row" role="radiogroup" aria-label="कार्ड का डिज़ाइन">
          {TEMPLATES.map((t) => (
            <button type="button" key={t.id} role="radio" aria-checked={tpl === t.id} className={`tpl ${tpl === t.id ? 'on' : ''}`} onClick={() => setTpl(t.id)}>
              <span style={{ background: `linear-gradient(160deg, ${t.bg[0]}, ${t.bg[2]})`, borderColor: t.accent }}><i style={{ background: t.accent }} /></span>{t.name}
            </button>
          ))}
        </div>
        <button type="submit" className="btn btn-gold btn-lg"><Wand2 size={22} /> 3. कार्ड बनाएं</button>
      </form>
      <div className="card-preview">
        <canvas ref={cvs} width={W} height={H} aria-label="आपका बनाया हुआ दीपावली कार्ड" role="img" />
      </div>
      <div className="btn-row">
        <button className="btn btn-gold" onClick={download} disabled={!ready}><Download size={20} /> कार्ड डाउनलोड करें</button>
        <button className="btn btn-wa" onClick={share} disabled={!ready}><WhatsAppIcon size={20} /> व्हाट्सऐप पर भेजें</button>
      </div>
      {!ready && <p className="hint-text">ऊपर दिख रहा कार्ड नमूना है। नाम लिखकर “कार्ड बनाएं” दबाइए।</p>}
    </Section>
  )
}
