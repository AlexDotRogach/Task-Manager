import css from './FilterWindow.module.css';
import { CSSTransition } from 'react-transition-group';
const FilterWindow = () => {
  return (
    <>
      test
        <div className={css.filter}>
          {/*<input type="radio" value="all" name="all" /> Все*/}
          {/*<input type="radio" value="today" name="today" /> Сегодня*/}
          {/*<input type="radio" value="overdue" name="overdue" /> Просроченные*/}

          {/*<div className="container">*/}
          {/*  <div className="radio">*/}
          {/*    <input id="radio-1" name="radio" type="radio" checked/>*/}
          {/*      <label htmlFor="radio-1" className="radio-label">Checked</label>*/}
          {/*  </div>*/}

          {/*  <div className="radio">*/}
          {/*    <input id="radio-2" name="radio" type="radio">*/}
          {/*      <label htmlFor="radio-2" className="radio-label"/>Unchecked</label>*/}
          {/*  </div>*/}

          {/*  <div className="radio">*/}
          {/*    <input id="radio-3" name="radio" type="radio" disabled>*/}
          {/*      <label htmlFor="radio-3" className="radio-label"/>Disabled</label>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

    </>
  );
};

export default FilterWindow;
