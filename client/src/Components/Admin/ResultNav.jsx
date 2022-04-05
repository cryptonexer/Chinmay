import React from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const Topbar = () => {

  const logout = () => {
    localStorage.removeItem('token');
  }

    return (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">Cryptonex</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                  <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                  </LinkContainer>

                  </Nav>
                </Navbar.Collapse>
              </Container>
          </Navbar>
        </>
    )
}

export default Topbar
