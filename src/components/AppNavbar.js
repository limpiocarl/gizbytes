import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";
import UserContext from '../UserContext'
import {Fragment, useContext} from 'react'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

export default function AppNavbar() {

  const { user } = useContext(UserContext)

  return (
    <Navbar bg="light" expand="lg">      
      <Navbar.Brand as={Link} to="/" className="mx-3">
        GizBytes
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/" exact>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/products" exact>
            Products
          </Nav.Link>
          <Form className="d-flex" id="navSearch">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          </Nav>
          <Nav className="justify-content-end mx-5" style={{ width: "100%" }}>
          { (user.id !== null) ?
            <Fragment>
              <Navbar.Text className="justify-content-center mx-5">Hello {user.firstName} {user.lastName} welcome to Gizbytes! </Navbar.Text>
              <Nav.Link as={Link} to="/user" exact><FontAwesomeIcon icon={faUser} size="md"></FontAwesomeIcon>Your Profile</Nav.Link>
              <Nav.Link as={Link} to="/cart" exact><FontAwesomeIcon icon={faShoppingCart} size="md"></FontAwesomeIcon>Cart</Nav.Link>            
              <Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
            </Fragment> :
            <Fragment>
              <Nav.Link as={Link} to="/register" exact className="ml-auto">Register</Nav.Link>
              <Nav.Link as={Link} to="/login" exact>Login</Nav.Link>              
            </Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
