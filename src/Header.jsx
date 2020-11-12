import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => { 
    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <NavLink className="nav-link" to="/">Home</NavLink>
    <NavLink className="nav-link" to="/about">About</NavLink>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default Header;

