import css from './ToDo.module.css';
import Filter from '../Filter';
import ToDoItems from './ToDoItems';
import Modal from '../Modal';
import { useState } from 'react';

const ToDo = ({ data, submitData }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [id, setId] = useState('');
  const toggleModal = e => setIsOpenAdd(!isOpenAdd);

  //  for li
  const showMoreInfo = e => {
    if (e.target.tagName !== 'LI') return;
    if (!checkDone(e.target.dataset.id, data)) return;

    toggleModal();
    setId(e.target.dataset.id);
  };

  return (
    <div className={css.toDo}>
      <div className={css.toDoHeader}>
        <span>Задачи</span>
        <Filter></Filter>
      </div>
      <ToDoItems
        data={data}
        submitData={submitData}
        showMoreInfo={showMoreInfo}
      ></ToDoItems>
      {isOpenAdd && (
        <Modal
          toggle={toggleModal}
          submitData={submitData}
          type="showInfo"
          infoForToDo={{ data: data, id: id }}
        ></Modal>
      )}
    </div>
  );
};

function checkDone(id, data) {
  for (const key in data) {
    if (data[key].id !== id) continue;
    if (data[key].done) return false;
  }
  return true;
}

export default ToDo;
