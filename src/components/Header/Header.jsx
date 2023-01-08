import { useState } from 'react';
import css from './Header.module.css';
import { Squash as Hamburger } from 'hamburger-react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Menu from '../Menu/Menu';
import Date from '../Date/Date';

const Header = ({ toggleModal, setFilter }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={css.header}>
        <Hamburger color="white" size={22} toggled={isOpen} toggle={setOpen} />
        <div className={css.date}>
          <Date></Date>
        </div>
        <div className={css.plus} onClick={toggleModal}>
          <AiFillPlusCircle size={24}></AiFillPlusCircle>
        </div>
      </div>
      <Menu show={isOpen} setFilter={setFilter}></Menu>
    </>
  );
};

export default Header;
