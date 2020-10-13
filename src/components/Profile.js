import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogOut = () => {
    authService.signOut();
    history.push("/");
  };

  const [myNickname, setMyNickname] = useState("");

  const myProfile = async () => {
    const data = await dbService
      .collection("userDB")
      .where("email", "==", authService.currentUser.email)
      .get();

    data.docs.map((doc) => {
      return setMyNickname(doc.data().nickname);
    });
  };

  useEffect(() => {
    myProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Profile">
      <div>Profile</div>
      <div>{myNickname}</div>
      <Button onClick={onLogOut}>로그아웃</Button>
    </div>
  );
};

export default Profile;
