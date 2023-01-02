import { convertMs } from './dateServices';

const daysType = ['Сегодня', 'Вчера', 'Завтра'];

function validateDate(chooseDate, currentDate) {
  const { days: chooseDateDays } = convertMs(chooseDate);
  const { days: chooseCurrentDays } = convertMs(currentDate);

  if (chooseDateDays === chooseCurrentDays) return daysType[0];
  console.log(chooseCurrentDays - chooseDateDays)
  if (chooseCurrentDays - chooseDateDays === 1) return daysType[1];
  if (chooseDateDays - chooseCurrentDays) return daysType[2];

  return "Test"
}

export default validateDate;
