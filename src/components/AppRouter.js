import React from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Coin from "routes/Coin";
import PostWrite from "routes/PostWrite";
import Home from "routes/Home";
import SignUp from "routes/SignUp";
import Skyrocket from "routes/Skyrocket";
import Stock from "routes/Stock";
import CoinContent from "routes/CoinContent";
import StockContent from "routes/StockContent";
import Footer from "./Footer";
import Header from "./Header";
import "scss/AppRouter.scss";

const AppRouter = () => {
  return (
    <div className="AppRouter">
      <div className="container">
        <Header />

        <nav>
          <Button variant="info" as={Link} to="/Skyrocket">
            떡상
          </Button>
          <Button variant="info" as={Link} to="/Coin">
            코인
          </Button>
          <Button variant="info" as={Link} to="/Stock">
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
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AppRouter;
