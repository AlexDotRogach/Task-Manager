// import { createRef, useEffect } from 'react';
import css from './Menu.module.css';
import clsx from 'clsx';
import { useFilter } from '../../context/filterContext';
import PropTypes from 'prop-types';

const Menu = ({ show }) => {
  const setFilter = useFilter();
  const clickFilter = ({ target }) => {
    if (target.tagName !== 'LI') return;

    const { type } = target.dataset;

    setFilter(type);
  };

  return (
    <div className={clsx(css.wrapper, show && css.isNavOpen)}>
      <div className={css.nav}>
        <ul className={css.navBody} onClick={clickFilter}>
          <li className={css.navItem} data-type="all">
            Все
          </li>
          <li className={css.navItem} data-type="today">
            Сегодня
          </li>
          <li className={css.navItem} data-type="overdue">
            Просроченные
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
};
