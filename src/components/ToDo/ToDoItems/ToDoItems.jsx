import css from './ToDoItems.module.css';
import fetchData from '../../../services/api';
import Date from './Date';
import Item from './Item';
import { useEffect, useState } from 'react';

const ToDoItems = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  return (
    <>
      <Date></Date>
      <ul>
        {data.map(toDo => {
          return <Item key={toDo.id} toDo={toDo}></Item>;
        })}
      </ul>
    </>
  );
};

export default ToDoItems;
