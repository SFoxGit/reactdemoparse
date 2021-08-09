import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";

function Header() {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link to="/">CoH PvP DemoParse</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav><Link to="/results">Results</Link></Nav>
            <Nav><Link to="/add">Add</Link></Nav>
            <Nav><Link to="/login">Login</Link></Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;