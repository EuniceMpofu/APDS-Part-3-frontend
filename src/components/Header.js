import React from 'react';
import Nav from './Nav';
import logo from '../logo.svg';
import './header.css';

function Header() {
  return (
    <header id='header' className="header fixed-top d-flex align-items-center">
        <img src={logo} className="logo" alt="logo" />
        <Nav/>
    </header>
  )
}

export default Header;