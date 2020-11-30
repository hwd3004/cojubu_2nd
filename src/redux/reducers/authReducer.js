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
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_POINT_WHEN_POST_REQUEST,
  GET_POINT_WHEN_POST_SUCCESS,
  GET_POINT_WHEN_POST_FAILURE,
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
  emailVerified: false,
  point: 0,
  errorMsg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGN_UP_REQUEST:
    case USER_LOADING_REQUEST:
    case GET_POINT_WHEN_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case USER_LOADING_SUCCESS:
    case GET_POINT_WHEN_POST_SUCCESS:
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
        emailVerified: action.payload.emailVerified,
        point: action.payload.point,
      };

    case LOGIN_FAILURE:
    case SIGN_UP_FAILURE:
    case USER_LOADING_FAILURE:
    case GET_POINT_WHEN_POST_FAILURE:
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
        emailVerified: null,
        point: 0,
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

    //
    //
    //

    case LOGOUT_REQUEST:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return {
        isLoggedIn: false,
        isLoading: false,
        uid: "",
        nickname: "",
        email: "",
        password: "",
        signUpDay: "",
        permission: "user",
        emailVerified: false,
        point: 0,
      };

    default:
      return state;
  }
};

export default authReducer;
