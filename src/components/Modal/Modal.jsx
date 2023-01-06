import { createRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FormAddToDo from '../Form/FormAddToDo';
import FormInfoToDo from '../Form/FormInfoToDo';
import 'react-datepicker/dist/react-datepicker.css';
import css from './Modal.module.css';

const modalContainer = document.querySelector('#modal-root');

const Modal = ({ toggle, submitData, type, infoForToDo }) => {
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

  const typeFormRender = type => {
    switch (type) {
      case 'new':
        return (
          <FormAddToDo submitData={submitData} toggle={toggle}></FormAddToDo>
        );
        break;
      case 'showInfo':
        return (
          <FormInfoToDo
            infoForToDo={infoForToDo}
            toggle={toggle}
            submitData={submitData}
          ></FormInfoToDo>
        );
      default:
        return <span>no form</span>;
    }
  };

  return createPortal(
    <div className={css.overlay} ref={overlay}>
      <div className={css.modal}>{typeFormRender(type)}</div>
    </div>,
    modalContainer
  );
};
export default Modal;
