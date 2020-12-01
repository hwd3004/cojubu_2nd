import React, { useState } from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGIN_REQUEST } from "redux/types";
import Profile from "./Profile";
import ckdm_converted_logo from "assets/image/ckdm_converted_csc_logo.svg";

const Header = () => {
  const [form, setForm] = useState({
    email: null,
    password: null,
  });

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = form;
    const user = {
      email,
      password,
    };

    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };

  const yesILoggedIn = <Profile />;

  const noOneIsLoggedIn = (
    <Nav className="ml-auto">
      <Form inline onSubmit={onSubmit}>
        <FormControl
          onChange={onChange}
          type="email"
          name="email"
          placeholder="이메일 입력"
          className="mr-sm-2"
          minLength="6"
          required
        />
        <FormControl
          onChange={onChange}
          type="password"
          name="password"
          placeholder="패스워드 입력"
          className="mr-sm-2"
          minLength="6"
          required
        />
        <Button type="submit" variant="outline-info">
          로그인
        </Button>
      </Form>
      <Nav.Link as={Link} to="/SignUp">
        가입하기
      </Nav.Link>
      {/* <Nav.Link
        onClick={() => {
          alert("🛠 Sorry. I have not made it yet.");
        }}
      >
        계정 찾기
      </Nav.Link> */}
    </Nav>
  );

  return (
    <div className="Header">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          코스코 - Coin Stock Community
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isLoggedIn ? yesILoggedIn : noOneIsLoggedIn}
        </Navbar.Collapse>
      </Navbar>
      <div>
        <img src={ckdm_converted_logo} alt="logo" />
      </div>
    </div>
  );
};

export default Header;
