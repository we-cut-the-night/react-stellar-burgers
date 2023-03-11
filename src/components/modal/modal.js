import { useEffect } from 'react'
import ModalOverlay from './modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import style from './modal.module.css'

function Modal({ onClose, children }) {
  const handleEscKey = evt => evt.key === 'Escape' && onClose()

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  })

  return (
    <div className={style.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={`${style.modalContent} pr-10 pl-10`}>
        <div className={style.modalClose} aria-label='Закрыть'>
          <CloseIcon type='primary' onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal
