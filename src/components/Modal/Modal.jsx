import { createRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './Modal.module.css';
import {getDay as getDayWord} from '../../tools/dateServices';
const modalContainer = document.querySelector('#modal-root');

const Modal = ({ toggle }) => {
  const [startDate, setStartDate] = useState(new Date());
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

  useEffect(() => {
    setStartDate(setStartDate.getDay())
  }, [startDate]);

  return createPortal(
    <div className={css.overlay} ref={overlay}>
      <div className={css.modal}>
        <form className={css.modalForm}>
          <input
            className={css.modalInput}
            name="task"
            placeholder="Задача"
          ></input>
          <input
            className={css.modalInput}
            name="describe"
            placeholder="Описание"
          ></input>
          <div className={css.modalPicker}>
            <button type="button" className={css.modalPickerButton}>
              {startDate.getDay() ?? 'Date'}
            </button>
            <DatePicker
              className={css.modalPickerInput}
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </div>
          <button
            type="button"
            className={css.modalButton_cancel}
            onClick={toggle}
          >
            Отмена
          </button>
          <button className={css.modalButton_save}>Сохранить</button>
        </form>
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
