import css from './Date.module.css';
import {getDateInfo, getDayWeek, getMonth} from '../../../../tools/dateServices';

const DateToDo = () => {
  const {month, dayOfWeek, day} = getDateInfo(new Date())

  return (
    <div className={css.date}>
      <span>{`${day}`.padStart(2,0)}</span>
      <span>{getMonth(month).slice(0,3)}</span>
      <span>· Сегодня ·</span>
      <span>{getDayWeek(dayOfWeek)}</span>
    </div>
  );
};

export default DateToDo;
