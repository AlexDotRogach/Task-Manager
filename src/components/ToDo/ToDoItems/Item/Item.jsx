import css from './Item.module.css';
import { Checkbox } from '@mui/material';
import { getDateInfo, getMonth } from '../../../../tools/dateServices';
import { headersFetch } from '../../../../services/const';
import fetchData from '../../../../services/api';
import { isToday } from '../../../../tools/validateDate';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Item = ({
  toDo: { id, task, done, date },
  closeTask,
  showMoreInfo,
  submitData,
}) => {
  const { day, month } = getDateInfo(new Date(date));
  done = JSON.parse(done);

  const dateCheck =
    !isToday(new Date(date), new Date()) && new Date(date) < new Date();

  const deleteTask = e => {
    const {
      dataset: { id },
    } = e.currentTarget?.parentElement;

    fetchData(headersFetch('DELETE'), `/${id}`).then(() => {
      submitData();
    });
  };

  return (
    <li
      className={clsx(css.item, [done && css.done])}
      onClick={showMoreInfo}
      data-id={id}
    >
      <Checkbox
        value={done}
        checked={done}
        onChange={e => closeTask(e, id)}
        sx={{
          color: 'white',
          '&.Mui-checked': {
            color: 'white',
          },
          '& .MuiSvgIcon-root': { fontSize: 20 },
        }}
      />

      <span>{task}</span>
      <div className={clsx(css.date, [dateCheck && css.overdue])}>
        <BsFillCalendarCheckFill size={14}></BsFillCalendarCheckFill>
        <span>{day}</span>
        <span>
          {getMonth(month[0] === '0' ? month.slice(1) : month, 'short')}
        </span>
      </div>

      <GoTrashcan className={css.trash} onClick={deleteTask}></GoTrashcan>
    </li>
  );
};

export default Item;

Item.propTypes = {
  toDo: PropTypes.exact({
    id: PropTypes.string,
    task: PropTypes.string,
    describe: PropTypes.string,
    done: PropTypes.bool,
    date: PropTypes.string,
  }),
  closeTask: PropTypes.func.isRequired,
  showMoreInfo: PropTypes.func.isRequired,
};
