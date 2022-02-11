import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import React from "react";

const Ylatunniste = () => {
  return (
    <header class="masthead">
      <Navbar className="me-auto" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Reseptit</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link href="/reseptitieto/lisaa">Lisää</Nav.Link>
            </Nav>
            <Nav className="">
              <Nav.Link href="/">Muokkaa</Nav.Link>
            </Nav>
            <Nav className="">
              <Nav.Link href="/">Tietoa</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Ylatunniste;
