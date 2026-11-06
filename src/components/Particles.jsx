import { useMemo } from 'react'
// हल्की सुनहरी चमक – सिर्फ CSS से, ताकि फोन पर तेज़ चले
export default function Particles({ count = 26 }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => {
    const r = (n) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2)
    return { left: r(1) * 100, size: 2 + r(2) * 4, dur: 9 + r(3) * 12, delay: -r(4) * 20, drift: (r(5) - 0.5) * 80 }
  }), [count])
  return (
    <div className="particles" aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, '--drift': `${p.drift}px` }} />
      ))}
    </div>
  )
}
