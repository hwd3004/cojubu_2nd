import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
// import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "redux/reducers";
import rootSaga from "redux/sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];

// devtools는 크롬 같은 웹브라우저에서 리덕스로 개발할때,
// 어떻게 상태가 진행되고 있는지 도와주는 개발자 도구
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

// initialState는 앱의 초기값
// createStore 안의 createRootReducer(), initialState, composeEnhancer()
// 이 3개를 합쳐서 store를 만들어달라는 뜻
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);


export default store;
