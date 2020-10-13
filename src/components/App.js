/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

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
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : null}
    </div>
  );
};

export default App;
