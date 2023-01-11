import { useRef, useState } from 'react';
import css from './Filter.module.css';
import { VscFilter } from 'react-icons/vsc';
import FilterWindow from './FilterWindow';
import { Transition } from 'react-transition-group';
import clsx from 'clsx';

const Filter = ({ showFilter }) => {
  const [stateFilter, setStateFilter] = useState(false);
  const toggleFilterWindow = () => {
    setStateFilter(!stateFilter);
  };

  return (
    <div className={css.filter}>
      <div className={css.filterIcon} onClick={toggleFilterWindow}>
        <VscFilter></VscFilter>
      </div>
      <span className={css.filterText}>Отображение</span>
      {stateFilter && (
        <Transition
          in={stateFilter}
          timeout={500}
          unmountOnExit={true}
        >
          {state => (
            <div className={clsx(css.alert, css[`alert-${state}`])}>
              <span>test</span>
              <FilterWindow></FilterWindow>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};

export default Filter;
