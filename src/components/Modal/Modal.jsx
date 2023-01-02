import { createRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FormAddToDo from '../FormAddToDo';
import 'react-datepicker/dist/react-datepicker.css';
import css from './Modal.module.css';

const modalContainer = document.querySelector('#modal-root');

const Modal = ({ toggle }) => {
  const overlay = createRef();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    overlay.current.addEventListener('click', outModalClose);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const outModalClose = e => {
    if (e.currentTarget === e.target) toggle();
  };

  const handleKeyDown = e => {
    if (e.code !== 'Escape') return '';
    toggle();
  };

  return createPortal(
    <div className={css.overlay} ref={overlay}>
      <div className={css.modal}>
        <FormAddToDo
          toggle={toggle}
        ></FormAddToDo>
      </div>
    </div>,
    modalContainer
  );
};
export default Modal;
