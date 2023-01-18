import { useState, useEffect } from 'react';
import css from './App.module.css';
import Header from 'components/Header';
import ToDo from '../ToDo';
import Modal from '../Modal';
import Pagination from '../Pagination';
import fetchData from '../../services/api';
import { getDateInfo } from '../../tools/dateServices';
import { isToday } from '../../tools/validateDate';
import { filterContext } from '../../context/filterContext';

const fetchSetting = '?_sort=done&_order=asc&_limit=6';
let pagPage = [];
const App = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);



  // init toDo
  useEffect(() => {
    submitData();

    fetchData({}).then(data => {
      const totalPage = Math.ceil(data.length / 8);
      for (let i = 1; i <= totalPage; i++) {
        console.log(i)
        pagPage.push(i);
      }
    });
  }, []);

  useEffect(() => {
    setFilterData();
  }, [filter]);

  const toggleModal = e => setIsOpenAdd(!isOpenAdd);

  // update ToDo
  // for form add and when i change checkboxes
  const submitData = () => {
    if (filter && filter !== 'all') {
      setFilterData();
      return;
    }

    fetchData({}, fetchSetting).then(data => {
      setData(data);
    });
  };

  const setFilterData = () => {
    switch (filter) {
      case 'all':
        submitData();
        break;
      case 'today':
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
      case 'overdue':
        fetchData({}, fetchSetting).then(data => {
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

  const changePage = (e) => {
    console.log(e.target)
  }

  return (
    <>
      <div className={css.app}>
        <filterContext.Provider value={setFilter}>
          <Header toggleModal={toggleModal}></Header>
          <ToDo data={data} submitData={submitData}></ToDo>
        </filterContext.Provider>
        <Pagination pagPage={pagPage} changePage={changePage}></Pagination>
      </div>
      {isOpenAdd && (
        <Modal toggle={toggleModal} submitData={submitData} type="new"></Modal>
      )}
    </>
  );
};

export default App;
