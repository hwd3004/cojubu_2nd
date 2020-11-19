import React from "react";
import { Button } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Board from "routes/Board";
import PostWrite from "routes/PostWrite";
import Home from "routes/Home";
import SignUp from "routes/SignUp";
import Skyrocket from "routes/Skyrocket";
import PostContent from "routes/PostContent";
import Footer from "./Footer";
import Header from "./Header";
import "scss/AppRouter.scss";

const AppRouter = () => {
  return (
    <div className="AppRouter">
      <div className="container">
        <Header />

        <nav>
          <Button variant="info" as={Link} to="/Skyrocket/page=1">
            떡상
          </Button>
          <Button variant="info" as={Link} to="/Coin/page=1">
            코인
          </Button>
          <Button variant="info" as={Link} to="/Stock/page=1">
            주식
          </Button>
        </nav>

        <div className="container_body">
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

            <Route exact path="/Coin/page=:id">
              <Board />
            </Route>
            <Route exact path="/Stock/page=:id">
              <Board />
            </Route>

            <Route exact path="/CoinPostWrite">
              <PostWrite />
            </Route>

            <Route exact path="/StockPostWrite">
              <PostWrite />
            </Route>

            <Route exact path="/:id">
              <PostContent />
            </Route>

            {/* <Redirect from="*" to="/" /> */}
          </Switch>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AppRouter;
