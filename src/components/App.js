import React from "react";
import Header from "./Header";
import Stock from "../routes/Stock";
import Cryptocurrency from "../routes/Cryptocurrency";
import "./App.scss";
import { Route, Link, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <div id="header">
        <Header />
      </div>

      <div className="App">
        <Route path="/">
          <Home />
        </Route>

        <Route path="/Stock">
          <Stock />
        </Route>

        <Route path="/Cryptocurrency">
          <Cryptocurrency />
        </Route>
      </div>

      <Footer />

      <script src="/__/firebase/7.23.0/firebase-app.js"></script>
      <script src="/__/firebase/7.23.0/firebase-analytics.js"></script>
      <script src="/__/firebase/init.js"></script>
    </>
  );
};

export default App;
