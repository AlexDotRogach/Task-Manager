import css from './ToDo.module.css';
import Date from '../Date/Date';
import Filter from '../Filter';
import Overdue from './Overdue';

const ToDo = () => {
  return (
    <div className={css.toDo}>
      <div className={css.toDoHeader}>
        <Date></Date>
        <Filter></Filter>
      </div>

      <Overdue></Overdue>
    </div>
  )
};

export default ToDo;
