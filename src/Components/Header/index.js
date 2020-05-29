import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-minhas-series.png';

function Header() {
  const [open, setOpen] = useState(false); //estado usado para controlar estado do topggler

  const toggle = () => {
    setOpen(!open);
  }

  return (
    <Navbar color="light" light expand='md'>
      <NavbarBrand tag={Link} to='/'><img src={logo} alt="logo minhas séries" width="110" /></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={open} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink tag={Link} to='/generos'>Gêneros</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;