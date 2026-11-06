import { useCallback, useEffect, useRef, useState } from 'react'
import { Section } from './Shared'
import { Sparkles } from 'lucide-react'

const COLORS = ['#ffd36b', '#ff9a3c', '#ff4d6d', '#ff7bd5', '#7ee0ff', '#9dff8a', '#ffffff', '#c084fc']

export default function Fireworks() {
  const cvs = useRef(null), box = useRef(null), parts = useRef([]), raf = useRef(0), timers = useRef([])
  const [touched, setTouched] = useState(false)

  const loop = useCallback(() => {
    const c = cvs.current; if (!c) return
    const ctx = c.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(0, 0, c.width, c.height)
    ctx.globalCompositeOperation = 'lighter'
    const dpr = c.width / (box.current?.clientWidth || c.width)
    parts.current = parts.current.filter((p) => p.life > 0)
    for (const p of parts.current) {
      p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.05; p.x += p.vx; p.y += p.vy; p.life -= p.decay
      ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.color
      ctx.beginPath(); ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, 6.2832); ctx.fill()
    }
    ctx.globalAlpha = 1
    if (parts.current.length) raf.current = requestAnimationFrame(loop)
    else { ctx.clearRect(0, 0, c.width, c.height); raf.current = 0 }
  }, [])

  const burst = useCallback((x, y) => {
    const base = COLORS[Math.floor(Math.random() * COLORS.length)]
    const alt = COLORS[Math.floor(Math.random() * COLORS.length)]
    const n = 64
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + Math.random() * 0.1
      const s = (i % 2 ? 2.2 : 4) + Math.random() * 1.6
      parts.current.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: 0.011 + Math.random() * 0.008, color: i % 3 ? base : alt, size: 1.6 + Math.random() * 1.4 })
    }
    if (!raf.current) raf.current = requestAnimationFrame(loop)
  }, [loop])

  useEffect(() => {
    const el = box.current, c = cvs.current
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      c.width = el.clientWidth * dpr; c.height = el.clientHeight * dpr
    }
    fit()
    const ro = new ResizeObserver(fit); ro.observe(el)
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); timers.current.forEach(clearTimeout) }
  }, [])

  const onTap = (e) => {
    const r = box.current.getBoundingClientRect()
    setTouched(true); burst(e.clientX - r.left, e.clientY - r.top)
  }
  const show = () => {
    setTouched(true)
    const r = box.current.getBoundingClientRect()
    for (let i = 0; i < 6; i++) timers.current.push(setTimeout(() => burst(r.width * (0.15 + Math.random() * 0.7), r.height * (0.15 + Math.random() * 0.5)), i * 320))
  }

  return (
    <Section id="fireworks" icon="🎆" title="आतिशबाजी का आनंद" sub="आसमान पर जहां चाहें टैप कीजिए">
      <div className="fw-stage" ref={box} onPointerDown={onTap} role="button" aria-label="आतिशबाजी चलाने के लिए यहां टैप करें">
        <canvas ref={cvs} />
        <div className="skyline" aria-hidden="true" />
        {!touched && <p className="fw-hint">👆 यहां टैप कीजिए</p>}
      </div>
      <p className="big-msg">खुशियों की रोशनी यूं ही चमकती रहे!</p>
      <div className="btn-row"><button className="btn btn-gold" onClick={show}><Sparkles size={20} /> आतिशबाजी शुरू करें</button></div>
    </Section>
  )
}
