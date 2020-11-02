import { authService } from "fbase";
import React from "react";
import { Button } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

const Profile = ({ myNickname }) => {
  // const history = useHistory();
  const onLogOut = () => {
    authService.signOut();
    // history.push("/");
  };

  return (
    <div className="Profile">
      <div>Profile</div>
      <div>{myNickname}</div>
      <Button onClick={onLogOut}>로그아웃</Button>
    </div>
  );
};

export default Profile;
