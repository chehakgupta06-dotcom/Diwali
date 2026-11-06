import { Section } from './Shared'
import { config } from '../config'

export default function FamilyMessage() {
  return (
    <Section id="family" icon="🙏" title="परिवार की ओर से संदेश" sub="हमारे पूरे परिवार की तरफ से आपके लिए दिल से निकली बात">
      <figure className="arch-photo">
        <img src={config.photos[0].src} alt={`${config.familyName} की फोटो`} loading="lazy" width="1344" height="896" />
      </figure>
      <article className="family-card">
        <p className="fc-top" aria-hidden="true">🪔 ✦ 🪔</p>
        <p>आपको एवं आपके पूरे परिवार को दीपावली की हार्दिक शुभकामनाएं।</p>
        <p>माता लक्ष्मी और भगवान गणेश की कृपा आप सभी पर सदैव बनी रहे। आपके जीवन में सुख, शांति, स्वास्थ्य, समृद्धि और खुशियां हमेशा बनी रहें।</p>
        <p className="fc-love">सप्रेम शुभ दीपावली!</p>
        <p className="fc-sign">{config.familyName} की ओर से</p>
      </article>
    </Section>
  )
}
