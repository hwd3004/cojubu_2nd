import {
  POST_UP_VOTE_REQUEST,
  POST_UP_VOTE_SUCCESS,
  POST_UP_VOTE_FAILURE,
} from "redux/types";

const initialState = {
  isLoading: false,
  category: null,
  comment: [],
  contents: [],
  createdAt: null,
  creatorUid: null,
  fileUrl: null,
  time: null,
  title: null,
  unreadComment: false,
  url: null,
  views: 0,
  upVote: [],
  downVote: [],
  currentUserUid: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_UP_VOTE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case POST_UP_VOTE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        category: action.payload.category,
        comment: action.payload.comment,
        contents: action.payload.contents,
        createdAt: action.payload.createdAt,
        creatorUid: action.payload.creatorUid,
        fileUrl: action.payload.fileUrl,
        time: action.payload.time,
        title: action.payload.title,
        unreadComment: action.payload.unreadComment,
        url: action.payload.url,
        views: action.payload.views,
        upVote: action.payload.upVote,
        downVote: action.payload.downVote,
        currentUserUid: action.payload.currentUserUid,
      };

    case POST_UP_VOTE_FAILURE:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        category: null,
        comment: [],
        contents: [],
        createdAt: null,
        creatorUid: null,
        fileUrl: null,
        time: null,
        title: null,
        unreadComment: false,
        url: null,
        views: 0,
        upVote: [],
        downVote: [],
        currentUserUid: null,
      };

    default:
      return state;
  }
}
