import { useEffect } from 'react'
import { X } from 'lucide-react'
export default function Modal({ onClose, label, children }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={label}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="बंद करें"><X size={22} /></button>
        {children}
      </div>
    </div>
  )
}
