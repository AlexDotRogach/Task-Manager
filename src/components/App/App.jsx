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

const defaultFetchSetting = '?_sort=done,date&_order=asc';
const paginationObj = {};
let searchStr = defaultFetchSetting;
const sizeData = 6;

const App = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [pagPage, setPagPage] = useState([]);
  const [dataLimit, setDataLimit] = useState([]);
  // const [curPage, se]
  // init toDo
  useEffect(() => {
    fetchData({}).then(data => {
      paginationElement(data);
      submitData();
      setDataLimit(paginationObj[1]);
    });
  }, []);

  // update filter data
  useEffect(() => {
    setFilterData();
  }, [filter]);

  // update pagination buttons
  useEffect(() => {
    if (filter && filter !== 'all') {
      paginationElement(data);
      return;
    }

    fetchData({}).then(data => {
      paginationElement(data);
    });
  }, [data]);

  const toggleModal = () => setIsOpenAdd(!isOpenAdd);

  const paginationElement = arr => {
    if (arr.length < sizeData) {
      setDataLimit(arr);
      setPagPage([]);
      return;
    }

    const totalPage = Math.ceil(arr.length / sizeData);
    const pagPageArr = [];
    let rangeData = {
      start: 0,
      end: 6,
    };

    for (let i = 1; i <= totalPage; i++) {
      pagPageArr.push(i);
      paginationObj[i] = arr.slice(rangeData.start, rangeData.end);
      rangeData = {
        start: rangeData.start + sizeData,
        end: rangeData.end + sizeData,
      };
    }

    setDataLimit(paginationObj[1]);
    setPagPage(pagPageArr);
  };

  // update ToDo
  // for form add and when i change checkboxes
  const submitData = () => {
    if (filter && filter !== 'all') {
      setFilterData();
      return;
    }

    fetchData({}, searchStr).then(data => {
      setData(data);
    });
  };

  const setFilterData = () => {
    searchStr = defaultFetchSetting;

    switch (filter) {
      case 'all':
        submitData();
        break;
      case 'today':
        const { month, day, year } = getDateInfo(new Date());

        searchStr = `${defaultFetchSetting}&date_like=${year}-${`${
          +month + 1
        }`.padStart(2, 0)}-${`${day - 1}`.padStart(2, 0)}T22:00:00.000Z`;

        fetchData({}, searchStr).then(data => {
          const filterData = data.filter(item => !item.done);
          console.log(filterData)
          setData(filterData);
        });
        break;
      case 'overdue':
        fetchData({}, defaultFetchSetting).then(data => {
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

  const changePage = ({ target: { textContent: pageNumber } }) => {
    setDataLimit(paginationObj[pageNumber]);
  };

  return (
    <>
      <div className={css.app}>
        <filterContext.Provider value={setFilter}>
          <Header toggleModal={toggleModal}></Header>
          <ToDo data={dataLimit} submitData={submitData}></ToDo>
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
