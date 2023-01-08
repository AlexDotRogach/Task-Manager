import { useState, useEffect } from 'react';
import css from './App.module.css';
import Header from 'components/Header';
import ToDo from '../ToDo';
import Modal from '../Modal';
import fetchData from '../../services/api';
import { getDateInfo } from '../../tools/dateServices';
import { isToday } from '../../tools/validateDate';

const sortString = '?_sort=done&_order=asc';

const App = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  // init toDo
  useEffect(() => {
    submitData();
  }, []);

  useEffect(() => {
    setFilterData();
  }, [filter]);

  const toggleModal = e => setIsOpenAdd(!isOpenAdd);

  // update ToDo
  // for form add and when i change checkboxes
  const submitData = e => {
    if (filter && filter !== 'все') {
      setFilterData();
      return;
    }

    fetchData({}, sortString).then(data => {
      setData(data);
    });
  };

  const setFilterData = () => {
    switch (filter) {
      case 'все':
        submitData();
        break;
      case 'сегодня':
        const { month, day, year } = getDateInfo(new Date());

        fetchData(
          {},
          `?date_like=${year}-${`${+month + 1}`.padStart(2, 0)}-${`${
            +day - 1
          }`.padStart(2, 0)}T22:00:00.000Z`
        ).then(filterData => {
          setData(filterData.filter(item => !item.done));
        });
        break;
      case 'просроченные':
        fetchData({}, sortString).then(data => {
          setData(
            data.filter(
              item =>
                !isToday(new Date(item.date), new Date()) &&
                new Date(item.date) < new Date()
            )
          );
        });
        break;
    }
  };

  return (
    <>
      <div className={css.app}>
        <Header toggleModal={toggleModal} setFilter={setFilter}></Header>
        <ToDo data={data} submitData={submitData}></ToDo>
      </div>
      {isOpenAdd && (
        <Modal toggle={toggleModal} submitData={submitData} type="new"></Modal>
      )}
    </>
  );
};

export default App;
