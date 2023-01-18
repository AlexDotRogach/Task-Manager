import css from './Pagination.module.css';
import { nanoid } from 'nanoid';

const Pagination = ({pagPage, changePage}) => {
  return (
    <ul className={css.listPagination}>
      {pagPage.map(item => {
        return <li className={css.listPaginationItem} onClick={changePage} key={nanoid()}>{item}</li>;
      })}
    </ul>
  )
};

export default Pagination;
