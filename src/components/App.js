import React, { useState, useEffect } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";
import "scss/ckEditor.scss";
// import store from "../store";
import { USER_LOADING_REQUEST } from "redux/types";
import { useDispatch } from "react-redux";

const App = () => {
  const [init, setInit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      try {
        if (user) {
          // const { email, uid } = user;
          const { uid } = user;

          const payload = {
            // email,
            uid,
          };

          // store.dispatch({
          //   type: USER_LOADING_REQUEST,
          //   payload,
          // });
          dispatch({
            type: USER_LOADING_REQUEST,
            payload,
          });
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    });
    setInit(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">{init ? <AppRouter /> : <p>Initializing...</p>}</div>
  );
};

export default App;
