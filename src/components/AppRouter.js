/* eslint-disable no-unused-vars */
import { authService } from "fbase";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import SignUp from "routes/SignUp";
import Profile from "./Profile";

const AppRouter = ({ isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="AppRouter">
      <div className="header">
        <Button as={Link} to="/">
          인덱스
        </Button>
        {isLoggedIn ? (
          <div>
            <Profile />
          </div>
        ) : (
          <div>
            <form onSubmit={onSubmit}>
              <input onChange={onChange} valeu={email} name="email" type="email" placeholder="이메일"></input>
              <input onChange={onChange} email={password} name="password" type="password" placeholder="패스워드"></input>
              <input type="submit" value="로그인"></input>
            </form>
            <Button as={Link} to="/SignUp">
              가입하기
            </Button>
          </div>
        )}
      </div>
      <Switch>
        <Route path="/SignUp">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
};

export default AppRouter;
