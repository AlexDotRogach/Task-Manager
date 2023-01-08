import {
  convertMs,
  getMonth as getMonthWord,
  getDateInfo,
} from './dateServices';

const daysType = ['Сегодня', 'Вчера', 'Завтра'];

export function getTypeOfDay(chooseDate, currentDate) {
  const { days: chooseDays } = convertMs(chooseDate);
  const { days: currentDays } = convertMs(currentDate);
  const daysDifference = currentDays - (chooseDays + 1);

  if (daysDifference === -1) return daysType[2];
  if (daysDifference === 1) return daysType[1];
  if (daysDifference === 0) return daysType[0];

  const monthWord = getMonthWord(chooseDate.getMonth(), 'short').toLowerCase();

  return `${chooseDate.getDate()} ${monthWord}`;
}

export function isToday(chooseDate, currentDate) {
  return (
    `${Object.values(getDateInfo(chooseDate))}` ===
    `${Object.values(getDateInfo(currentDate))}`
  );
}
