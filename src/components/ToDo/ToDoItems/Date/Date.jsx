import css from './Date.module.css';
import {
  getDateInfo,
  getDayWeek,
  getMonth,
} from '../../../../tools/dateServices';

const DateToDo = () => {
  const { month, dayOfWeek, day } = getDateInfo(new Date());

  return (
    <div className={css.date}>
      <span>{`${day}`}</span>
      <span>{getMonth(month[0] === "0" ? month[1] : month, 'short')}</span>
      <span>· Сегодня ·</span>
      <span>{getDayWeek(dayOfWeek)}</span>
    </div>
  );
};

export default DateToDo;
