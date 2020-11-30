// import { authService } from "fbase";
import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT_REQUEST } from "redux/types";

const Profile = () => {
  const dispatch = useDispatch();

  const { nickname } = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    // authService.signOut();
  };

  return (
    <Nav className="ml-auto">
      <Navbar.Brand>{nickname}</Navbar.Brand>
      {/* <Button as={Link} to="/MyProfile" variant="outline-primary">
        프로필
      </Button> */}
      &nbsp;&nbsp;&nbsp;
      <Button onClick={onLogOut} variant="outline-primary">
        로그아웃
      </Button>
    </Nav>
  );
};

export default Profile;
