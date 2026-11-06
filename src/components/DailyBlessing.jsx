import { Section } from './Shared'
import { dailyMessages } from '../data/wishes'
import { dayIndex, days, months, toHindiNum } from '../utils/hindi'

export default function DailyBlessing() {
  const d = new Date()
  const msg = dailyMessages[dayIndex(d) % dailyMessages.length]
  return (
    <Section id="daily" icon="📅" title="आज का शुभ संदेश" sub="हर दिन एक नया आशीर्वाद – कल फिर आइएगा">
      <div className="calendar">
        <div className="cal-top"><span>{months[d.getMonth()]}</span><span>{toHindiNum(d.getFullYear())}</span></div>
        <div className="cal-rings" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="cal-body">
          <div className="cal-day">{toHindiNum(d.getDate())}</div>
          <div className="cal-week">{days[d.getDay()]}</div>
          <p className="cal-msg">{msg}</p>
          <p className="cal-note">🪔 आज का आशीर्वाद • कल नया संदेश मिलेगा</p>
        </div>
      </div>
    </Section>
  )
}
