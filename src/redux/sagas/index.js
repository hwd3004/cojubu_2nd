import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import postSaga from "./postSaga";

// function* 함수는 제너레이터 함수라고 한다
// 일반 함수는 값을 하나만 반환하지만, 이 함수는 여러 값을 반환할 수 있다
export default function* rootSaga() {
  yield all([fork(authSaga), fork(postSaga)]);
}
