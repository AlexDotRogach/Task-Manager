import css from './Date.module.css';
import getDayWord from '../tools/getDay';

const DateToDo = () => {
  const date = new Date();
  const numberOfDate = date.getDate();
  const day = getDayWord(date.getDay());

  return (
    <div className={css.date}>
      <span className={css.today}>Сегодня</span>
      <span className={css.day}>{day.slice(0, 3)}</span>
      <span className={css.number}>{numberOfDate}</span>
    </div>
  );
};

export default DateToDo;
