import styles from './modal-overlay.module.css'

function ModalOverlay({ onClose }) {
  const handleClick = e => {
    e.target.classList.contains(styles.modalOverlay) && onClose();
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleClick}
    />
  )
}

export default ModalOverlay
