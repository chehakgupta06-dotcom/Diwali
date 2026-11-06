// शुभकामना दीवार का स्टोरेज।
//  • अगर .env में VITE_SUPABASE_URL और VITE_SUPABASE_ANON_KEY दिए हैं → संदेश सबके लिए साझा (Supabase)
//  • नहीं दिए तो → संदेश सिर्फ इसी फोन/ब्राउज़र में (localStorage)
const URL_ = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
export const isShared = Boolean(URL_ && KEY)

const LS = 'diwali_wishes_v1'
const hdr = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

export async function loadWishes() {
  if (isShared) {
    const r = await fetch(`${URL_}/rest/v1/wishes?select=id,name,message,created_at&order=created_at.desc&limit=60`, { headers: hdr })
    if (!r.ok) throw new Error('load failed')
    return r.json()
  }
  try { return JSON.parse(localStorage.getItem(LS)) || [] } catch { return [] }
}

export async function addWish(name, message) {
  if (isShared) {
    const r = await fetch(`${URL_}/rest/v1/wishes`, { method: 'POST', headers: { ...hdr, Prefer: 'return=representation' }, body: JSON.stringify({ name, message }) })
    if (!r.ok) throw new Error('save failed')
    return (await r.json())[0]
  }
  const item = { id: Date.now(), name, message, created_at: new Date().toISOString() }
  try { localStorage.setItem(LS, JSON.stringify([item, ...(await loadWishes())].slice(0, 60))) } catch { /* storage full/blocked */ }
  return item
}
