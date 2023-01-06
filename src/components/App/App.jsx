import { useState, useEffect } from 'react';
import css from './App.module.css';
import Header from 'components/Header';
import ToDo from '../ToDo';
import Modal from '../Modal';
import fetchData from '../../services/api';

const App = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [data, setData] = useState([]);

  // init toDo
  useEffect(() => {
    fetchData().then(data => {
      setData(data);
    });
  }, []);

  const toggleModal = e => setIsOpenAdd(!isOpenAdd);

  // update ToDo
  // for form add and when i change checkboxes
  const submitData = e => {
    fetchData().then(data => {
      setData(data);
    });
  };

  return (
    <>
      <div className={css.app}>
        <Header toggleModal={toggleModal}></Header>
        <ToDo data={data} submitData={submitData}></ToDo>
      </div>
      {isOpenAdd && (
        <Modal toggle={toggleModal} submitData={submitData} type="new"></Modal>
      )}
    </>
  );
};

export default App;
