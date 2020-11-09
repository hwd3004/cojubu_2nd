import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Coin from "routes/Coin";
import PostWrite from "routes/PostWrite";
import Home from "routes/Home";
import SignUp from "routes/SignUp";
import Skyrocket from "routes/Skyrocket";
import Stock from "routes/Stock";
import Profile from "./Profile";
import CoinContent from "routes/CoinContent";
import StockContent from "routes/StockContent";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "redux/types";

const AppRouter = () => {
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

  return (
    <div className="AppRouter">
      <div className="container">
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
                  name="email"
                  type="email"
                  placeholder="이메일"
                  minLength="6"
                ></input>
                <input
                  onChange={onChange}
                  name="password"
                  type="password"
                  placeholder="패스워드"
                  minLength="6"
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

          <Route exact path="/Coin">
            <Coin />
          </Route>
          <Route exact path="/CoinPostWrite">
            <PostWrite />
          </Route>
          <Route exact path="/Coin/:id">
            <CoinContent />
          </Route>

          <Route exact path="/Stock">
            <Stock />
          </Route>
          <Route exact path="/StockPostWrite">
            <PostWrite />
          </Route>
          <Route exact path="/Stock/:id">
            <StockContent />
          </Route>

          <Redirect from="*" to="/" />
        </Switch>

        <Footer />
      </div>
    </div>
  );
};

export default AppRouter;
