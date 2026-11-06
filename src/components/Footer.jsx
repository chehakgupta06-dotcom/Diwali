import { config } from '../config'
import { WhatsAppIcon } from './Shared'
import { openWhatsApp } from '../utils/share'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-diyas" aria-hidden="true">🪔 ✨ 🪔 ✨ 🪔</div>
      <p className="footer-main">आप सभी को एवं आपके परिवार को दीपावली की हार्दिक शुभकामनाएं।</p>
      <p className="footer-sign">सप्रेम – {config.familyName}</p>
      <button className="btn btn-wa" onClick={() => openWhatsApp()}><WhatsAppIcon /> व्हाट्सऐप पर भेजें</button>
      <p className="footer-small">इस वेबसाइट के लिए किसी लॉगिन की ज़रूरत नहीं है।</p>
    </footer>
  )
}
