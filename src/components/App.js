import React from "react";
import Header from "./Header";
import Stock from "../routes/Stock";
import Cryptocurrency from "../routes/Cryptocurrency";
import { Route, Link, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Footer from "./Footer";
import "../scss/reset.scss";
import "../scss/App.scss";
import SignUpForm from "./SignUpForm";

const App = () => {
  return (
    <div id="App">
      <div className="header_div_bg">
        <Header />
      </div>

      <div className="set_bg">

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/Stock">
          <Stock />
        </Route>

        <Route path="/Cryptocurrency">
          <Cryptocurrency />
        </Route>

        <Route path="/SignUpForm">
          <SignUpForm />
        </Route>
      </div>

      <Footer />

      <script src="/__/firebase/7.23.0/firebase-app.js"></script>
      <script src="/__/firebase/7.23.0/firebase-analytics.js"></script>
      <script src="/__/firebase/init.js"></script>
    </div>
  );
};

export default App;
