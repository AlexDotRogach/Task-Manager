import css from './Date.module.css';
import {getDay as getDayWord} from '../../tools/dateServices';

const DateToDo = () => {
  const date = new Date();
  const numberOfDate = date.getDate();
  const day = getDayWord(date.getDay());

  return (
    <div className={css.date}>
      <span>Сегодня</span>
      <span className={css.day}>{day.slice(0, 3)}</span>
      <span className={css.number}>{numberOfDate}</span>
    </div>
  );
};

export default DateToDo;
