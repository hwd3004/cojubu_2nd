import {
  COMMENT_CONTENT_FAILURE,
  COMMENT_CONTENT_REQUEST,
  COMMENT_CONTENT_SUCCESS,
  COMMENT_WRITE_FAILURE,
  COMMENT_WRITE_REQUEST,
  COMMENT_WRITE_SUCCESS,
} from "redux/types";

const initialState = {
  isLoading: false,
  comment: [],
};

const commentReducer = (state = initialState, action) => {
  console.log("commentRedcuer", action);

  switch (action.type) {
    case COMMENT_WRITE_REQUEST:
    case COMMENT_CONTENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    // case COMMENT_WRITE_SUCCESS:
    //   return {
    //     ...state,
    //     comment: action.payload,
    //     isLoading: false,
    //   };

    case COMMENT_CONTENT_SUCCESS:
    case COMMENT_WRITE_SUCCESS:
      return {
        ...state,
        // comment: [...state.comment, action.payload],
        comment: action.payload,
        // 아니 시발...?
        isLoading: false,
      };

    case COMMENT_WRITE_FAILURE:
    case COMMENT_CONTENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default commentReducer;

// import {
//   COMMENT_CONTENT_FAILURE,
//   COMMENT_CONTENT_REQUEST,
//   COMMENT_CONTENT_SUCCESS,
//   COMMENT_WRITE_FAILURE,
//   COMMENT_WRITE_REQUEST,
//   COMMENT_WRITE_SUCCESS,
// } from "redux/types";

// const initialState = {
//   isLoading: false,
//   commentContent: null,
//   commentCreatedAt: null,
//   commentDownVote: 0,
//   commentId: null,
//   commentUpVote: 0,
//   commenterNickname: null,
//   commenterUid: null,
//   isDeleted: false,
//   postUrl: null,
//   replyTo: null,
// };

// const commentReducer = (state = initialState, action) => {
//   console.log("commentRedcuer", action);

//   switch (action.type) {
//     case COMMENT_WRITE_REQUEST:
//     case COMMENT_CONTENT_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//       };

//     case COMMENT_WRITE_SUCCESS:
//     case COMMENT_CONTENT_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//         isLoading: false,
//         commentContent: action.payload.commentContent,
//         commentCreatedAt: action.payload.commentCreatedAt,
//         commentDownVote: action.payload.commentDownVote,
//         commentId: action.payload.commentId,
//         commentUpVote: action.payload.commentUpVote,
//         commenterNickname: action.payload.commenterNickname,
//         commenterUid: action.payload.commenterUid,
//         isDeleted: action.payload.isDeleted,
//         postUrl: action.payload.postUrl,
//         replyTo: action.payload.replyTo,
//       };

//     case COMMENT_WRITE_FAILURE:
//     case COMMENT_CONTENT_FAILURE:
//       return {
//         ...state,
//         ...action.ayload,
//         isLoading: false,
//         commentContent: null,
//         commentCreatedAt: null,
//         commentDownVote: 0,
//         commentId: null,
//         commentUpVote: 0,
//         commenterNickname: null,
//         commenterUid: null,
//         isDeleted: false,
//         postUrl: null,
//         replyTo: null,
//       };

//     default:
//       return state;
//   }
// };

// export default commentReducer;
