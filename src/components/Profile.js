// import { authService } from "fbase";
import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "redux/types";

const Profile = () => {
  const dispatch = useDispatch();

  const { nickname, point } = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    // authService.signOut();
  };

  return (
    <Nav className="ml-auto">
      <Navbar.Brand>
        sup. {nickname} | {point} point
      </Navbar.Brand>
      <Button onClick={onLogOut} variant="outline-primary">
        로그아웃
      </Button>
    </Nav>
  );
};

export default Profile;
