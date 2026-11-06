import { useEffect, useState } from 'react'
import { Menu, X, Volume2, VolumeX } from 'lucide-react'

export const navGroups = [
  { title: 'शुरुआत', items: [['family', '🙏', 'परिवार की ओर से'], ['diya', '🪔', 'दीप जलाएं'], ['lakshmi', '🪷', 'लक्ष्मी जी के आशीर्वाद']] },
  { title: 'शुभकामनाएं', items: [['wishes', '💌', 'खास शुभकामनाएं'], ['daily', '📅', 'आज का शुभ संदेश'], ['wheel', '🎡', 'खुशियों का पहिया']] },
  { title: 'खेल और सजावट', items: [['sweets', '🍬', 'मिठास भरी दिवाली'], ['rangoli', '🌸', 'रंगोली सजाएं'], ['fireworks', '🎆', 'आतिशबाजी']] },
  { title: 'आपके लिए', items: [['card', '🖼️', 'अपना कार्ड बनाएं'], ['wall', '📝', 'शुभकामना दीवार']] },
]

export default function Navbar({ music }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="navbar">
        <a href="#top" className="brand" aria-label="सबसे ऊपर जाएं">🪔 <span>दीपों का उत्सव</span></a>
        <div className="nav-actions">
          <button className="chip-btn" onClick={music.toggle} aria-pressed={music.on} aria-label={music.on ? 'संगीत बंद करें' : 'संगीत चालू करें'}>
            {music.on ? <Volume2 size={20} /> : <VolumeX size={20} />}<span>{music.on ? 'संगीत बंद' : 'संगीत चालू'}</span>
          </button>
          <button className="chip-btn menu-btn" onClick={() => setOpen(true)} aria-label="मेनू खोलें" aria-expanded={open}>
            <Menu size={22} /><span>मेनू</span>
          </button>
        </div>
      </header>

      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="मेनू">
          <div className="drawer-top">
            <strong>क्या देखना चाहेंगे?</strong>
            <button className="chip-btn" onClick={() => setOpen(false)} aria-label="मेनू बंद करें"><X size={22} /><span>बंद करें</span></button>
          </div>
          <div className="drawer-body">
            {navGroups.map((g) => (
              <div key={g.title} className="drawer-group">
                <h3>{g.title}</h3>
                <div className="drawer-links">
                  {g.items.map(([id, ic, label]) => (
                    <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span aria-hidden="true">{ic}</span>{label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
