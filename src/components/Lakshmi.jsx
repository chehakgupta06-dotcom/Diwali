import { Section, Diya } from './Shared'

function Art() {
  const back = [-70, -50, -30, -10, 10, 30, 50, 70]
  const front = [-55, -33, -11, 11, 33, 55]
  const petal = 'M0 0C-16-20-14-50 0-72C14-50 16-20 0 0Z'
  return (
    <svg viewBox="0 0 300 340" className="lakshmi-art" role="img" aria-label="कमल पर रखा सुनहरा कलश, चारों ओर दिव्य प्रकाश">
      <defs>
        <radialGradient id="lkHalo"><stop offset="0" stopColor="#ffe08a" stopOpacity=".9" /><stop offset=".6" stopColor="#f5c451" stopOpacity=".25" /><stop offset="1" stopColor="#f5c451" stopOpacity="0" /></radialGradient>
        <linearGradient id="lotusG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd1e3" /><stop offset="1" stopColor="#e0457b" /></linearGradient>
      </defs>
      <circle className="lk-halo" cx="150" cy="150" r="140" fill="url(#lkHalo)" />
      <g className="lk-rays" stroke="#f5c451" strokeWidth="1.6" opacity=".55">
        {Array.from({ length: 24 }, (_, i) => <line key={i} x1="150" y1="150" x2="150" y2="14" transform={`rotate(${i * 15} 150 150)`} />)}
      </g>
      <circle cx="150" cy="150" r="104" fill="none" stroke="url(#goldG)" strokeWidth="3" />
      <circle cx="150" cy="150" r="96" fill="#3a0a35" opacity=".82" />
      <g transform="translate(150 292)">
        {back.map((a) => <path key={a} d={petal} fill="url(#lotusG)" stroke="#a21f55" strokeWidth=".8" transform={`rotate(${a})`} />)}
        {front.map((a) => <path key={'f' + a} d={petal} fill="#ffb3cf" stroke="#c2185b" strokeWidth=".8" transform={`scale(.82) rotate(${a})`} />)}
      </g>
      <g transform="translate(150 160)">
        {[-50, -25, 0, 25, 50].map((a) => <path key={a} d="M0 0C-12-14-10-34 0-46C10-34 12-14 0 0Z" fill="#2e7d32" stroke="#1b5e20" strokeWidth=".8" transform={`rotate(${a})`} />)}
      </g>
      <ellipse cx="150" cy="128" rx="17" ry="21" fill="#7a4a1c" /><path d="M140 124q10 8 20 0M141 133q9 7 18 0" stroke="#c28a4a" fill="none" strokeWidth="1.5" />
      <rect x="128" y="160" width="44" height="18" fill="url(#goldG)" />
      <ellipse cx="150" cy="160" rx="31" ry="7" fill="#f5c451" stroke="#b9801a" />
      <path d="M112 176C100 208 116 238 150 240C184 238 200 208 188 176Z" fill="url(#goldG)" stroke="#b9801a" strokeWidth="1.5" />
      <text x="150" y="216" textAnchor="middle" fontSize="26" fontWeight="700" fill="#8a1538" fontFamily="'Yatra One','Noto Sans Devanagari',serif">श्री</text>
      {[60, 240, 100, 205, 40, 262].map((x, i) => <circle key={i} className="coin" cx={x} cy="40" r="6" fill="url(#goldG)" stroke="#b9801a" style={{ animationDelay: `${i * 0.7}s` }} />)}
    </svg>
  )
}

export default function Lakshmi() {
  return (
    <Section id="lakshmi" icon="🪷" title="लक्ष्मी जी के आशीर्वाद" sub="दीपावली की शाम, मां लक्ष्मी के चरणों में प्रणाम" className="sec-lakshmi">
      <div className="lakshmi-wrap">
        <div className="lakshmi-stage">
          <Diya lit size={64} className="lk-diya lk-diya-l" />
          <Art />
          <Diya lit size={64} className="lk-diya lk-diya-r" />
        </div>
        <div className="prayer">
          <p className="mantra">ॐ श्री महालक्ष्म्यै नमः 🙏</p>
          <p className="shloka">या देवी सर्वभूतेषु लक्ष्मीरूपेण संस्थिता।<br />नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥</p>
          <p className="meaning">जो देवी सभी प्राणियों में लक्ष्मी के रूप में विराजमान हैं, उन्हें बार-बार प्रणाम।</p>
          <p className="prayer-msg">मां लक्ष्मी की कृपा से आपके घर में धन, शांति, सुख और समृद्धि का वास हो। आपका घर सदा खुशियों से जगमगाता रहे।</p>
          <ul className="pills"><li>💰 धन</li><li>🕊️ शांति</li><li>😊 सुख</li><li>🌟 समृद्धि</li></ul>
        </div>
      </div>
    </Section>
  )
}
