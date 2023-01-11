import css from './FilterWindow.module.css';
import { FormControlLabel, RadioGroup, FormLabel, Radio } from '@mui/material';
import { useFilter } from '../../../context/filterContext';

const sxSetting = {
  color: 'white',
  '&.Mui-checked': {
    color: 'grey',
  },
};

const FilterWindow = ({ref}) => {
  const setFilter = useFilter();

  return (
    <div className={css.filterWindowWrapper} ref={ref}>
      <FormLabel
        id="filterRadio"
        className={css.filterRadioLabel}
      >
        Фильтр
      </FormLabel>
      <RadioGroup
        aria-labelledby="filterRadio"
        defaultValue="all"
        name="radio-buttons-group"
        onChange={({ target: { value } }) => setFilter(value)}
      >
        <FormControlLabel
          value="all"
          control={<Radio sx={sxSetting} />}
          label="Все"
        />
        <FormControlLabel
          value="today"
          control={<Radio sx={sxSetting} />}
          label="Сегодня"
        />
        <FormControlLabel
          value="overdue"
          control={<Radio sx={sxSetting} />}
          label="Просроченные"
        />
      </RadioGroup>
    </div>
  );
};

export default FilterWindow;
