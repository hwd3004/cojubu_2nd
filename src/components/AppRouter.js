/* eslint-disable no-unused-vars */
import { authService } from "fbase";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Coin from "routes/Coin";
import CoinPost from "routes/CoinPost";
import Home from "routes/Home";
import SignUp from "routes/SignUp";
import Skyrocket from "routes/Skyrocket";
import Stock from "routes/Stock";
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
      await authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
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
              <input
                onChange={onChange}
                valeu={email}
                name="email"
                type="email"
                placeholder="이메일"
              ></input>
              <input
                onChange={onChange}
                email={password}
                name="password"
                type="password"
                placeholder="패스워드"
              ></input>
              <input type="submit" value="로그인"></input>
            </form>
            <Button as={Link} to="/SignUp">
              가입하기
            </Button>
          </div>
        )}
      </div>

      <nav>
        <Button as={Link} to="/Skyrocket">
          떡상
        </Button>
        <Button as={Link} to="/Coin">
          코인
        </Button>
        <Button as={Link} to="/Stock">
          주식
        </Button>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/SignUp">
          <SignUp />
        </Route>
        <Route exact path="/Skyrocket">
          <Skyrocket />
        </Route>
        <Route path="/Coin">
          <Coin exact isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/CoinPost">
          <CoinPost exact isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/Stock">
          <Stock exact isLoggedIn={isLoggedIn} />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
};

export default AppRouter;
