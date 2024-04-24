import React from 'react';
import logo from '../assets/staxer-black.png';
import '../styles/header.css';

const Header: React.FC = () => {
    return (
      <header className='header'>
        <img src={logo} alt="Staxer logo" className='logo-navbar'/>
        <h1>Staxer</h1>
        &nbsp;
      </header>
    );
  };
  
export default Header;
