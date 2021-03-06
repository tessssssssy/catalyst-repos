import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../stylesheets/Header.scss';

const Header = () => { 
    return (
      <>
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavLink className="nav-link" style={{color: "white"}} to="/">Home</NavLink>
            <NavLink className="nav-link" style={{color: "white"}} to="/about">About</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="triangle">
        </div>
        <div className="heading">
          <h1>Catalyst IT</h1>
          <p>Github Repositories</p>
        </div>
        <div className="triangle-left"></div>
      </>
    )
}

export default Header;

