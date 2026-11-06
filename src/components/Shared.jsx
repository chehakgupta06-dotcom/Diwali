// छोटे साझा टुकड़े: आइकन, दीया, गेंदे का फूल, सेक्शन का ढांचा
export function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C9.4 3 4 8.38 4 15.02c0 2.12.55 4.19 1.6 6.02L4 29l8.14-1.56a12 12 0 0 0 3.9.65C22.68 28.09 28 22.7 28 16.06 28 9.4 22.68 3 16.04 3Zm0 22.02c-1.2 0-2.37-.27-3.43-.78l-.5-.24-4.83.93.96-4.7-.27-.52a9.9 9.9 0 0 1-1.5-5.27c0-5.47 4.46-9.9 9.97-9.9s9.96 4.43 9.96 9.9-4.46 9.58-10.36 10.58Zm5.46-7.2c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5a9 9 0 0 1-1.67-2.08c-.18-.3 0-.47.13-.62.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.48.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.58-.08 1.78-.72 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35Z" />
    </svg>
  )
}

// सारे दीयों के रंग एक ही जगह – पूरे पेज में एक बार
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="haloG"><stop offset="0" stopColor="#ffd36b" stopOpacity=".85" /><stop offset="1" stopColor="#ff9a1f" stopOpacity="0" /></radialGradient>
        <linearGradient id="flameG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff2a8" /><stop offset=".55" stopColor="#ffb52e" /><stop offset="1" stopColor="#ff6a1a" /></linearGradient>
        <linearGradient id="bowlG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f08a24" /><stop offset="1" stopColor="#a8420f" /></linearGradient>
        <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff0a8" /><stop offset=".5" stopColor="#f5c451" /><stop offset="1" stopColor="#b9801a" /></linearGradient>
      </defs>
    </svg>
  )
}

export function Diya({ lit = false, size = 80, className = '' }) {
  return (
    <svg viewBox="0 0 100 92" width={size} height={size * 0.92} className={`diya ${lit ? 'lit' : ''} ${className}`} aria-hidden="true">
      <ellipse className="diya-halo" cx="50" cy="38" rx="48" ry="42" fill="url(#haloG)" />
      <g className="flame">
        <path d="M50 6C63 22 66 36 50 50C34 36 37 22 50 6Z" fill="url(#flameG)" />
        <path d="M50 26C57 34 57 42 50 48C43 42 43 34 50 26Z" fill="#fff6cf" />
      </g>
      <rect x="48.5" y="44" width="3" height="9" rx="1.5" fill="#3a1a0a" />
      <path d="M6 54H94C92 76 74 86 50 86C26 86 8 76 6 54Z" fill="url(#bowlG)" />
      <ellipse cx="50" cy="54" rx="44" ry="7" fill="#f7b04a" />
      <ellipse cx="50" cy="54" rx="36" ry="4.5" fill="#7a2c0a" opacity=".55" />
      <g fill="#ffd36b"><circle cx="30" cy="72" r="2.2" /><circle cx="42" cy="77" r="2.2" /><circle cx="58" cy="77" r="2.2" /><circle cx="70" cy="72" r="2.2" /></g>
    </svg>
  )
}

export function Marigold({ size = 34, color = '#f59e0b', center = '#b45309' }) {
  return (
    <svg width={size} height={size} viewBox="-20 -20 40 40" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="0" cy="-11" rx="5" ry="9" fill={color} stroke="#c2680a" strokeWidth=".6" transform={`rotate(${i * 30})`} />)}
      {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="0" cy="-6" rx="3.4" ry="6" fill="#fbbf24" transform={`rotate(${i * 45 + 20})`} />)}
      <circle r="4" fill={center} />
    </svg>
  )
}

export function Divider() {
  return (
    <div className="divider" aria-hidden="true"><span /><i>❖</i><span /></div>
  )
}

export function Section({ id, icon, title, sub, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <header className="sec-head">
          <h2><span className="sec-icon" aria-hidden="true">{icon}</span> {title}</h2>
          {sub && <p>{sub}</p>}
          <Divider />
        </header>
        {children}
      </div>
    </section>
  )
}
