import css from './App.module.css';
import Header from 'components/Header';
import ToDo from '../ToDo';
const App = () => {
  return (
    <div className={css.app}>
      <Header></Header>
      <ToDo></ToDo>
    </div>
  );
};

export default App;
