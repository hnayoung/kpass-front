import React from 'react'
import SearchBox from './SearchBox'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const FirstBar = () => {
  return (
    <div>
      <div className="bar">
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">afaada</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  )
}

export default FirstBar;
