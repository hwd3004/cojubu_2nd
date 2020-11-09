import React, { useState, useEffect } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";
import "scss/ckEditor.scss";
import { Provider } from "react-redux";
import store from "store";
import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

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
      {init ? (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {/* {/* {console.log(window.indexedDB.open())} */}
            {/* {console.log(indexedDB.open('firebaseLocalStorageDb'))}
            {console.log(indexedDB.open('firebaseLocalStorage'))} */}
            <AppRouter isLoggedIn={isLoggedIn} />
          </ConnectedRouter>
        </Provider>
      ) : null}
    </div>
  );
};

export default App;
