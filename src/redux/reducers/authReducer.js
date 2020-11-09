import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "redux/types";

// store.js에 있는 initialState와 이름을 똑같이 해주어야함
const initialState = {
  isLoggedIn: false,
  isLoading: false,
  uid: null,
  nickname: null,
  email: null,
  password: null,
  signUpDay: null,
  permission: null,
  errorMsg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        isLoading: false,
        uid: action.payload.uid,
        nickname: action.payload.nickname,
        email: action.payload.email,
        password: action.payload.password,
        signUpDay: action.payload.signUpDay,
        permission: action.payload.permission,
      };
    case LOGIN_FAILURE:
    case SIGN_UP_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: false,
        isLoading: false,
        uid: null,
        nickname: null,
        email: null,
        password: null,
        signUpDay: null,
        permission: null,
      };

    //
    //
    //

    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
      };

    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;
