import { createRef, useEffect, useState } from 'react';
import css from './FormAddToDo.module.css';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import DatePicker from 'react-datepicker';
import { getTypeOfDay, isToday } from '../../../tools/validateDate';
import fetchData from '../../../services/api';
import { headersFetch } from '../../../services/const';
import { nanoid } from 'nanoid';
import { getDateInfo } from '../../../tools/dateServices';
import PropTypes from 'prop-types';

const FormAddToDo = ({ toggle, submitData }) => {
  const [pickDate, setPickDate] = useState('Сегодня');
  const [date, setDate] = useState(() => {
    const { month, day, year } = getDateInfo(new Date());
    return new Date(
      `${year}-${`${+month + 1}`.padStart(2, 0)}-${`${day - 1}`.padStart(
        2,
        0
      )}T22:00:00.000Z`
    );
  });
  const dateBtn = createRef();

  useEffect(() => {
    if (!date) return;

    const currentDate = new Date();

    if (date < currentDate && !isToday(date, currentDate)) {
      NotificationManager.info(
        'Выбраная дата в прошлом',
        'Важная информация',
        1500
      );
      dateBtn.current.style.background = 'red';
    } else {
      dateBtn.current.style.background = 'lightgray';
    }

    setPickDate(getTypeOfDay(date, currentDate));
  }, [date]);

  const addToDo = async e => {
    e.preventDefault();

    const {
      elements: {
        describe: { value: describeValue },
        task: { value: taskValue },
      },
    } = e.target;

    if (!describeValue || !taskValue) {
      NotificationManager.info('Заполните задачу', 'Важная информация', 1500);
      return;
    }

    const bodyFetch = {
      id: nanoid(),
      task: taskValue,
      describe: describeValue,
      done: false,
      date: date,
    };

    await fetchData(headersFetch('POST', bodyFetch));

    toggle();
    submitData();
  };

  return (
    <>
      <form className={css.modalForm} onSubmit={addToDo}>
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
          <button type="button" className={css.modalPickerButton} ref={dateBtn}>
            {pickDate}
          </button>

          <DatePicker
            selected={date}
            className={css.modalPickerInput}
            onChange={setDate}
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
      <NotificationContainer></NotificationContainer>
    </>
  );
};

export default FormAddToDo;

FormAddToDo.propTypes = {
  toggle: PropTypes.func.isRequired,
  submitData: PropTypes.func.isRequired,
};
