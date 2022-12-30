import {  useState } from 'react';
import css from './Header.module.css';
import { Squash as Hamburger } from 'hamburger-react';
import Menu from '../Menu/Menu';

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={css.header}>
        <Hamburger color="white" toggled={isOpen} toggle={setOpen} />
      </div>

      <Menu show={isOpen}></Menu>
    </>
  );
};

export default Header;
