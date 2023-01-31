import { createRef, useEffect, useState } from 'react';
import css from './FormInfoToDo.module.css';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import DatePicker from 'react-datepicker';
import { getTypeOfDay } from '../../../tools/validateDate';
import fetchData from '../../../services/api';
import { headersFetch } from '../../../services/const';
import PropTypes from 'prop-types';

const FormInfoToDo = ({ toggle, submitData, infoForToDo }) => {
  const [pickDate, setPickDate] = useState('Дата');
  const [date, setDate] = useState(new Date());
  const dateBtn = createRef();
  const form = createRef();

  useEffect(() => {
    const { data, id } = infoForToDo;

    for (const key in data) {
      if (data[key].id !== id) continue;
      setValueForm(data[key]);
      break;
    }
  }, []);

  useEffect(() => {
    setPickDate(getTypeOfDay(new Date(date), new Date()));
  }, [date]);

  const setValueForm = obj => {
    const { task, describe, date } = obj;
    const { task: taskElem, describe: describeElem } = form.current.elements;

    taskElem.value = task;
    describeElem.value = describe;
    setDate(new Date(date));
  };

  const updateToDo = async e => {
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

    const { data } = infoForToDo;
    let curToDo;

    for (const key in data) {
      if (data[key].id !== infoForToDo.id) continue;
      curToDo = data[key];
    }

    const bodyFetch = {
      task: taskValue,
      describe: describeValue,
    };

    const inputDate = new Date(e.target.elements[3].value);

    if (inputDate.getTime() !== new Date(curToDo.date).getTime()) {
      bodyFetch.date = inputDate;
    }

    await fetchData(headersFetch('PATCH', bodyFetch), `/${infoForToDo.id}`);

    toggle();
    submitData();
  };

  return (
    <>
      <h4 className={css.title}>Задача</h4>
      <form className={css.modalForm} ref={form} onSubmit={updateToDo}>
        <input
          className={css.modalInput}
          name="task"
          placeholder="Задача"
        ></input>
        <textarea
          maxLength={500}
          minLength={10}
          className={css.modalInput}
          name="describe"
          placeholder="Описание"
        ></textarea>
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

export default FormInfoToDo;

FormInfoToDo.propTypes = {
  toggle: PropTypes.func.isRequired,
  submitData: PropTypes.func.isRequired,
  infoForToDo: PropTypes.object
};
