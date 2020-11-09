// import { authService } from "fbase";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "redux/types";

const Profile = ({ myNickname }) => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    // authService.signOut();
  };

  const { nickname } = useSelector((state) => state.auth);

  return (
    <div className="Profile">
      <div>Profile</div>
      <div>{nickname}</div>
      <Button onClick={onLogOut}>로그아웃</Button>
    </div>
  );
};

export default Profile;
