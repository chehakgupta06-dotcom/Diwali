import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function FloatingButtons() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return show ? (
    <a href="#top" className="fab fab-top" aria-label="सबसे ऊपर जाएं"><ArrowUp size={24} /></a>
  ) : null
}
