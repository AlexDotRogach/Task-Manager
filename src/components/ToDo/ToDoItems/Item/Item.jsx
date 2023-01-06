import { useState } from 'react';
import css from './Item.module.css';
import { Checkbox } from '@mui/material';
import { getDateInfo, getMonth } from '../../../../tools/dateServices';
import { isToday } from '../../../../tools/validateDate';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import clsx from 'clsx';

const Item = ({ toDo: { id, task, describe, done, date }, closeTask, showMoreInfo }) => {
  const { day, month } = getDateInfo(new Date(date));

  const dateCheck =
    !isToday(new Date(date), new Date()) && new Date(date) < new Date();

  return (
    <li className={clsx(css.item, [done && css.done])} onClick={showMoreInfo} data-id={id}>
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
        <span>{getMonth(month)}</span>
      </div>
    </li>
  );
};

export default Item;
