import React from "react";
import { Button } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Board from "routes/Board";
import PostWrite from "routes/PostWrite";
import SignUp from "routes/SignUp";
import PostContent from "routes/PostContent";
import Footer from "./Footer";
import Header from "./Header";
import "scss/AppRouter.scss";
import Everything from "routes/Everything";
import PostUpdate from "routes/PostUpdate";

const AppRouter = () => {
  return (
    <div className="AppRouter">
      <div className="container">
        <Header />

        <nav>
          <Button variant="info" as={Link} to="/">
            홈
          </Button>
          <Button variant="info" as={Link} to="/Coin/page=1">
            코인
          </Button>
          <Button variant="info" as={Link} to="/Stock/page=1">
            국내주식
          </Button>
          <Button variant="info" as={Link} to="/OsStock/page=1">
            해외주식
          </Button>
          <Button variant="info" as={Link} to="/Free/page=1">
            자유
          </Button>
          <Button variant="info" as={Link} to="/Game/page=1">
            게임
          </Button>
        </nav>

        <div className="container_body">
          <Switch>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>

            <Route exact path="/">
              <Everything />
            </Route>

            <Route exact path="/Coin/page=:id">
              <Board />
            </Route>
            <Route exact path="/Stock/page=:id">
              <Board />
            </Route>
            <Route exact path="/OsStock/page=:id">
              <Board />
            </Route>
            <Route exact path="/Free/page=:id">
              <Board />
            </Route>
            <Route exact path="/Game/page=:id">
              <Board />
            </Route>

            <Route exact path="/CoinPostWrite">
              <PostWrite />
            </Route>
            <Route exact path="/StockPostWrite">
              <PostWrite />
            </Route>
            <Route exact path="/OsStockPostWrite">
              <PostWrite />
            </Route>
            <Route exact path="/FreePostWrite">
              <PostWrite />
            </Route>
            <Route exact path="/GamePostWrite">
              <PostWrite />
            </Route>

            <Route exact path="/:id">
              <PostContent />
            </Route>

            <Route exact path="/PostUpdate/:id">
              <PostUpdate />
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
