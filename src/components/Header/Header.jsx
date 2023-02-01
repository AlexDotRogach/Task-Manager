import { useState } from 'react';
import css from './Header.module.css';
import { Squash as Hamburger } from 'hamburger-react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Menu from '../Menu/Menu';
import Date from '../Date/Date';
import PropTypes from 'prop-types';

const Header = ({ toggleModal }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={css.header}>
        <Hamburger color="white" size={22} toggled={isOpen} toggle={setOpen} />
        <Date></Date>
        <div className={css.plus} onClick={toggleModal}>
          <AiFillPlusCircle size={24}></AiFillPlusCircle>
        </div>
      </div>
      <Menu show={isOpen}></Menu>
    </>
  );
};

export default Header;

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
