import css from './Pagination.module.css';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import PropTypes from 'prop-types';

const Pagination = ({ pagPage, changePage, currentPage }) => {
  const renderArrowSide = {
    left: true,
    right: true,
  };
  let renderArrowAllow = pagPage.length > 5;
  const pageMove = arrow => {
    const step = arrow === 'next' ? 1 : -1;

    changePage(currentPage + step);
  };

  let shortArray = pagPage.slice(currentPage - 1, currentPage + 4);

  if (currentPage >= pagPage.length - 4) {
    shortArray = pagPage.slice(pagPage.length - 5);
    renderArrowSide.right = false;
  }

  if (currentPage === 1) renderArrowSide.left = false;

  return (
    <div className={css.paginationContainer}>
      <div
        className={clsx(css.leftArrow, [
          renderArrowAllow && renderArrowSide.left && css.show,
        ])}
        onClick={e => {
          const {
            currentTarget: {
              dataset: { arrow },
            },
          } = e;

          pageMove(arrow);
        }}
        data-arrow="previous"
      >
        <BsFillArrowLeftCircleFill color="white"></BsFillArrowLeftCircleFill>
      </div>
      <ul className={css.listPagination}>
        {shortArray.map(item => {
          return (
            <li
              className={clsx(css.listPaginationItem, [
                item === +currentPage && css.listPaginationItemActive,
              ])}
              onClick={e => {
                const {
                  target: { textContent: pageNumber },
                } = e;
                changePage(pageNumber);
              }}
              key={nanoid()}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <div
        className={clsx(css.rightArrow, [
          renderArrowAllow && renderArrowSide.right && css.show,
        ])}
        onClick={e => {
          const {
            currentTarget: {
              dataset: { arrow },
            },
          } = e;

          pageMove(arrow);
        }}
        data-arrow="next"
      >
        <BsFillArrowRightCircleFill color="white"></BsFillArrowRightCircleFill>
      </div>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  pagPage: PropTypes.array.isRequired,
  changePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
};
