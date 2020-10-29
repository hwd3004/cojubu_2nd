/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

import "scss/ckEditor.scss";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsloggedIn(true);
      } else {
        setIsloggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        {init ? <AppRouter isLoggedIn={isLoggedIn} /> : null}
      </div>
    </div>
  );
};

export default App;
