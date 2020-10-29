// import { authService, dbService } from "fbase";
// import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Profile = ({myNickname}) => {
  const history = useHistory();
  const onLogOut = () => {
    authService.signOut();
    history.push("/");
  };

  // const [myNickname, setMyNickname] = useState("");

  // const myProfile = () => {
  //   const userRef = dbService
  //     .collection("userDB")
  //     .doc(`${authService.currentUser.email}`);

  //   userRef.get().then((doc) => {
  //     setMyNickname(doc.data().nickname);
  //   });
  // };

  // useEffect(() => {
  //   myProfile();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="Profile">
      <div>Profile</div>
      <div>{myNickname}</div>
      <Button onClick={onLogOut}>로그아웃</Button>
    </div>
  );
};

export default Profile;
