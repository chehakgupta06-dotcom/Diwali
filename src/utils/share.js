import { config, siteUrl } from '../config'

export const shareText = () =>
  `🪔 शुभ दीपावली! 🪔\n\nइस पावन पर्व पर आपके और आपके परिवार के लिए ढेर सारी खुशियों, सुख, शांति और समृद्धि की कामना।\n\nहमारी तरफ से एक छोटी सी दिवाली की शुभकामना देखने के लिए यहां क्लिक करें:\n\n${siteUrl()}\n\nसप्रेम,\n${config.familyName} ❤️`

export const openWhatsApp = (text = shareText()) =>
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch { return false }
  }
}
