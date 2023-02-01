import {
  convertMs,
  getMonth as getMonthWord,
  getDateInfo,
} from './dateServices';

const daysType = ['Сегодня', 'Вчера', 'Завтра'];

export function getTypeOfDay(chooseDate, currentDate) {
  const {
    month: monthChoose,
    dayOfWeek: dayOfWeekChoose,
    day: dayChoose,
    year: yearChoose,
  } = getDateInfo(chooseDate);
  const {
    month: monthCurrent,
    dayOfWeek: dayOfWeekCurrent,
    day: dayCurrent,
    year: yearCurrent,
  } = getDateInfo(currentDate);

  if (isToday(chooseDate, currentDate)) return daysType[0];

  if (monthCurrent === monthChoose && yearCurrent === yearChoose) {
    if (dayChoose - dayCurrent === 1) return daysType[2];
    if (dayChoose - dayCurrent === -1) return daysType[1];
  }

  const monthWord = getMonthWord(chooseDate.getMonth(), 'short').toLowerCase();

  return `${chooseDate.getDate()} ${monthWord}`;
}

export function isToday(chooseDate, currentDate) {
  return (
    `${Object.values(getDateInfo(chooseDate))}` ===
    `${Object.values(getDateInfo(currentDate))}`
  );
}
