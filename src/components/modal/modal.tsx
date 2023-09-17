import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./modal.module.css";
import { IPropsModal } from "utils/types";

const Modal: FC<IPropsModal> = ({ onClose, children }) => {
  // const modalElement = document.querySelector('#modals') as HTMLElement
  const modalElement = document.getElementById("root") as HTMLElement;

  useEffect(() => {
    const handleEscKey = (evt: KeyboardEvent) =>
      evt.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  });

  return createPortal(
    <div className={style.modal} data-cy="modal">
      <ModalOverlay onClose={onClose} />
      <div className={`${style.modalContent} pr-10 pl-10`}>
        <div
          className={style.modalClose}
          aria-label="Закрыть"
          data-cy="closeIcon"
        >
          <CloseIcon type="primary" onClick={onClose}/>
        </div>
        {children}
      </div>
    </div>,
    modalElement
  );
};

export default Modal;
