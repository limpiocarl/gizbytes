import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Form, FormControl, Button, Container, NavDropdown } from "react-bootstrap";
import UserContext from '../UserContext'
import {Fragment, useContext} from 'react'
import "../App.css";

export default function AppNavbar() {

  const { user } = useContext(UserContext)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand as={Link} to="/" exact>GizBytes</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Navbar.Text className="justify-content-center mx-5">Hello Admin: {user.firstName} {user.lastName} welcome back master. </Navbar.Text>
          <NavDropdown title="Admin Features" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/adminProducts" exact>Products</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/adminOrders" exact>Orders</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/adminUsers" exact>Users</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/makeNewAdmin" exact>Add New Admin</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
