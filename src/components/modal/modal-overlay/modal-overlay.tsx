import { FC } from 'react';
import styles from './modal-overlay.module.css'
import { IPropsModalOverlay } from 'utils/types';

const ModalOverlay: FC<IPropsModalOverlay> = ({ onClose }) => {
  const handleClick = (event?: React.MouseEvent<HTMLDivElement>) => {
    if (event?.target instanceof HTMLElement) {
      event?.target.classList.contains(styles.modalOverlay) && onClose();
    }
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleClick}
    />
  )
}

export default ModalOverlay
