import { authService, dbService } from "fbase";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
} from "../types";
import moment from "moment";

//
//
// 로그인된 유저 정보 불러오기

const userLoadingAPI = async (loadingData) => {
  try {
    const { uid } = loadingData;

    const userRef = await dbService
      .collection("userDB")
      .doc(uid)
      .get()
      .then((doc) => doc.data());

    return userRef;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);

    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: error.response,
    });
  }
}

function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

//
//
// 회원가입

const signUpUserAPI = async (signUpData) => {
  try {
    const { email, password, nickname } = signUpData;

    const signUpDay = moment().format("YYYY-MM-DD HH:mm:ss");

    await authService.createUserWithEmailAndPassword(email, password);

    const uid = await authService.currentUser.uid;

    const permission = "user";

    const emailVerified = false;

    await dbService.collection("userDB").doc(uid).set({
      uid,
      email,
      password,
      nickname,
      signUpDay,
      permission,
      emailVerified,
    });

    return {
      email,
      password,
      nickname,
      signUpDay,
      uid,
      permission,
      emailVerified,
    };
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

function* signUpUser(action) {
  try {
    const result = yield call(signUpUserAPI, action.payload);

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
    const { email, password } = loginData;

    await authService.signInWithEmailAndPassword(email, password);

    const uid = await authService.currentUser.uid;

    const userRef = await dbService
      .collection("userDB")
      .doc(uid)
      .get()
      .then((doc) => {
        return doc.data();
      });

    const { nickname, permission, signUpDay, emailVerified } = userRef;

    return {
      email,
      password,
      uid,
      nickname,
      permission,
      signUpDay,
      emailVerified,
    };
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
// 로그아웃

function* logout() {
  try {
    authService.signOut();

    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

//
//
//

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchSignUpUser),
    fork(watchUserLoading),
    fork(watchLogout),
  ]);
}