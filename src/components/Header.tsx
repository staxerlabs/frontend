import React from 'react';
import logo from '../assets/staxer-black.png';
import {ArrowRight} from '@phosphor-icons/react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../styles/header.css';

const Header: React.FC = () => {
    return (
      <header className='header'>
        <Navbar expand="xxl">
              <img
                alt=""
                src={logo}
                width="48"
                height="48"
                className="logo-navbar "
              />{' '}
              <h1>Staxer</h1>
              
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-button'/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/profile/:user_id">Profile</Nav.Link>
            <Nav.Link href="/settings/:user_id">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>

      </header>
    );
  };
  
export default Header;
