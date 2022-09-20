import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

interface INavProps {};

export const AppNav: React.FunctionComponent<INavProps> = (props: INavProps) => {
  const navigate = useNavigate()

  return (
      <Navbar collapseOnSelect fixed='top' bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">NBA Underdogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link 
                onClick={() => navigate("/")}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate("/team")}
                >
                Team
              </Nav.Link>
              <Nav.Link 
                onClick={() => navigate("/standings")}
                >
                Standings
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}