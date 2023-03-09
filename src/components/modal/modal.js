import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay'
import style from './modal.module.css'

function Modal({ onClose }) {
  const handleEscKey = evt => evt.key === 'Escape' && onClose()

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  })

  return (
    <div className={style.modal}>
      <ModalOverlay />
    </div>
  )
}

export default Modal
