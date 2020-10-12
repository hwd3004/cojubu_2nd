import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../scss/Header.scss";
import SignUpForm from "./SignUpForm";

const Header = () => {
  return (
    <div id="Header" className="set_bg">
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Brand as={Link} to="/">
          코주부
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Form inline>
              <FormControl type="text" placeholder="검색" className="mr-sm-2" />
              <Button variant="outline-success">검색</Button>
            </Form>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link>로그인</Nav.Link>
            <Nav.Link as={Link} to="/SignUpForm" >가입하기</Nav.Link>
            {/* <SignUpForm></SignUpForm> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
