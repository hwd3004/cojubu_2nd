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
  GET_POINT_WHEN_POST_REQUEST,
  GET_POINT_WHEN_POST_SUCCESS,
  GET_POINT_WHEN_POST_FAILURE,
} from "../types";
import moment from "moment";

//
//
// 글 작성시 포인트 + 5

const getPointWhenPostAPI = async (userData) => {
  try {
    const { point, uid } = userData;

    await dbService
      .collection("userDB")
      .doc(uid)
      .update({
        point: point + 5,
      });

    return { point: point + 5 };
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

function* getPointWhenPost(action) {
  try {
    const result = yield call(getPointWhenPostAPI, action.payload);

    console.log("getPointWhenPost/result", result);

    yield put({
      type: GET_POINT_WHEN_POST_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: GET_POINT_WHEN_POST_FAILURE,
      payload: error.response,
    });
  }
}

function* watchGetPointWhenPost() {
  yield takeEvery(GET_POINT_WHEN_POST_REQUEST, getPointWhenPost);
}

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

    const point = 0;

    await dbService.collection("userDB").doc(uid).set({
      uid,
      email,
      password,
      nickname,
      signUpDay,
      permission,
      emailVerified,
      point,
    });

    return {
      email,
      password,
      nickname,
      signUpDay,
      uid,
      permission,
      emailVerified,
      point,
    };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("이미 사용하고 있는 이메일입니다.");
    }
    console.log(error);
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

    const { nickname, permission, signUpDay, emailVerified, point } = userRef;

    return {
      email,
      password,
      uid,
      nickname,
      permission,
      signUpDay,
      emailVerified,
      point,
    };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("등록되지않은 이메일입니다.");
    } else if (error.code === "auth/wrong-password") {
      alert("비밀번호가 일치하지 않습니다.");
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
    fork(watchGetPointWhenPost),
  ]);
}
