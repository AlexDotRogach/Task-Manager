import css from './Filter.module.css';
import { VscFilter } from 'react-icons/vsc';

const Filter = () => {
  return (
    <div className={css.filter}>
      <div className={css.filterIcon}><VscFilter></VscFilter></div>
      <span className={css.filterText}>Отбражение</span>
    </div>
  )
};

export default Filter;
