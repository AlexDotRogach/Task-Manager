import css from './ToDo.module.css';
import Date from '../Date/Date';
import Filter from '../Filter';

const ToDo = () => {
  return (
    <div className={css.toDo}>
      <div className={css.toDoHeader}>
        <Date></Date>
        <Filter></Filter>
      </div>
    </div>
  )
};

export default ToDo;
