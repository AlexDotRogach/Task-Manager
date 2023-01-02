import css from './ToDo.module.css';
import Filter from '../Filter';
import ToDoItems from './ToDoItems';
const ToDo = () => {
  return (
    <div className={css.toDo}>
      <div className={css.toDoHeader}>
        <span>Задачи</span>
        <Filter></Filter>
      </div>
      <ToDoItems></ToDoItems>
    </div>
  )
};

export default ToDo;
