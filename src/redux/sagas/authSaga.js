import { authService, dbService } from "fbase";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../types";
import moment from "moment";

//
//
// 회원가입

const signUpUserAPI = async (signUpData) => {
  try {
    console.log("authSaga.js/signUpData", signUpData);

    const { email, password, nickname } = signUpData;

    const signUpDay = moment().format("YYYY-MM-DD HH:mm:ss");

    await authService.createUserWithEmailAndPassword(email, password);

    const uid = await authService.currentUser.uid;

    const permission = "user";

    await dbService.collection("userDB").doc(uid).set({
      uid,
      email,
      password,
      nickname,
      signUpDay,
      permission,
    });

    return { email, password, nickname, signUpDay, uid, permission };
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

function* signUpUser(action) {
  try {
    const result = yield call(signUpUserAPI, action.payload);

    console.log("authSaga.js/signUpUser", result);

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      payload: error.response,
    });
    console.log(error);
    alert(error);
  }
}

function* watchSignUpUser() {
  yield takeEvery(SIGN_UP_REQUEST, signUpUser);
}

//
//
// 로그인

const loginUserAPI = async (loginData) => {
  try {
    console.log("authSaga.js/loginData", loginData);

    const { email, password } = loginData;

    await authService.signInWithEmailAndPassword(email, password);

    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = await authService.currentUser.uid;

        const userRef = await dbService
          .collection("userDB")
          .doc(`${authService.currentUser.email}`)
          .get()
          .then((doc) => {
            return doc.data();
          });

        const { nickname, permission, signUpDay } = userRef;

        console.log("닉네임", nickname);

        return { email, password, uid, nickname, permission, signUpDay };
      }
    });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("등록되지않은 이메일입니다");
    }
    console.log(error);
  }
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);

    console.log("authSaga.js/loginUser", result);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: error.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

//
//
//

export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchSignUpUser)]);
}
