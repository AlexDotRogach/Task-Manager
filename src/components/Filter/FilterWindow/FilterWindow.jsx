import css from './FilterWindow.module.css';
import { FormControlLabel, RadioGroup, FormLabel, Radio } from '@mui/material';
import {useFilter} from '../../../context/filterContext'

const sxSetting = {
  color: 'white',
  '&.Mui-checked': {
    color: 'grey',
  },
};

const FilterWindow = () => {
  const setFilter = useFilter();

  console.log(setFilter)

  return (
    <div className={css.filterWindowWrapper}>
      <FormLabel id="filterRadio" className={css.filterRadioLabel}>
        Фильтр
      </FormLabel>
      <RadioGroup
        aria-labelledby="filterRadio"
        defaultValue="all"
        name="radio-buttons-group"
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
