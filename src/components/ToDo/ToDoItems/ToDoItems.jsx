import css from './ToDoItems.module.css';
import Date from './Date';
import Item from './Item';
import fetchData from '../../../services/api';
import { headersFetch } from '../../../services/const';

const ToDoItems = ({ data, submitData, showMoreInfo }) => {
  const closeTask = async (e, id) => {
    const { value } = e.target;
    const check = !JSON.parse(value);

    const bodyFetch = {
      done: check,
    };

    await fetchData(headersFetch('PATCH', bodyFetch), `/${id}`);
    submitData();
  };

  return (
    <>
      <Date></Date>
      <ul className={css.list}>
        {data.map(toDo => {
          return <Item key={toDo.id} toDo={toDo} closeTask={closeTask} showMoreInfo={showMoreInfo}></Item>;
        })}
      </ul>
    </>
  );
};

export default ToDoItems;
