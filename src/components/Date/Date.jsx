import css from './Date.module.css';
import {getDayWeek} from '../../tools/dateServices';

const dateToDo = () => {
  const date = new Date();
  const numberOfDate = date.getDate();
  const day = getDayWeek(date.getDay(), "short");

  return (
    <div className={css.date}>
      <span>Сегодня</span>
      <span className={css.day}>{day}</span>
      <span className={css.number}>{`${numberOfDate}`.padStart(2, '0')}</span>
    </div>
  );
};

export default dateToDo;
