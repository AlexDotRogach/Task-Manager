import css from './Item.module.css';

const Item = ({ toDo: { id, task, describe, done, date } }) => {
  return (
    <li>
      <span>{task}</span>
    </li>
  );
};

export default Item;
