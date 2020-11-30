import { dbService } from "fbase";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as firebase from "firebase";
import {
  COMMENT_CONTENT_FAILURE,
  COMMENT_CONTENT_REQUEST,
  COMMENT_CONTENT_SUCCESS,
  COMMENT_WRITE_FAILURE,
  COMMENT_WRITE_REQUEST,
  COMMENT_WRITE_SUCCESS,
} from "redux/types";

export const findDBNameAndCommentDBNameByCategory = (inputCategory) => {
  let dbName, commentDBName;

  switch (inputCategory) {
    case "코인":
      dbName = "CoinPostDB";
      commentDBName = "CoinCommentDB";
      break;

    case "주식":
      dbName = "StockPostDB";
      commentDBName = "StockCommentDB";
      break;

    default:
      break;
  }

  return { dbName, commentDBName };
};

const getCommentObjByCommentDataOfPostDB = async (inputCommentData) => {
  console.log("inputCommentData", inputCommentData);

  let resultData = [];

  if (inputCommentData.length > 0) {
    for (let i = 0; i < inputCommentData.length; i++) {
      const splitData = inputCommentData[i].split("/");

      const commentDBName = splitData[0];
      const commentDocName = splitData[1];

      const commentRef = await dbService
        .collection(`${commentDBName}`)
        .doc(commentDocName)
        .get();

      const commentDB = await commentRef.data();

      resultData.push(commentDB);
    }

    resultData.sort((a, b) => a.commentCreatedAt - b.commentCreatedAt);
  }

  return resultData;
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 코멘트(댓글) 불러오기

const commentContentAPI = async (commentData) => {
  const result = getCommentObjByCommentDataOfPostDB(commentData);
  // let resultData = [];

  // if (commentData.length > 0) {
  //   for (let i = 0; i < commentData.length; i++) {
  //     const splitData = commentData[i].split("/");

  //     const commentDBName = splitData[0];
  //     const commentDocName = splitData[1];

  //     const commentRef = await dbService
  //       .collection(`${commentDBName}`)
  //       .doc(commentDocName)
  //       .get();

  //     const commentDB = commentRef.data();

  //     resultData.push(commentDB);
  //   }

  //   resultData.sort((a, b) => a.commentCreatedAt - b.commentCreatedAt);
  // }

  return result;

  // return {
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
};

function* commentContent(action) {
  try {
    const result = yield call(commentContentAPI, action.payload);

    console.log("commentContent", result);

    yield put({
      type: COMMENT_CONTENT_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: COMMENT_CONTENT_FAILURE,
    });

    console.log("commentContent", commentContent);
    // alert("commentContent", commentContent);
  }
}

function* watchCommentContent() {
  yield takeEvery(COMMENT_CONTENT_REQUEST, commentContent);
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 코멘트(댓글) 등록

const commentWriteAPI = async (data) => {
  console.log("commentWriteAPI", data);

  const { category, url, comment } = data;
  const { commentId, commenterUid } = comment;

  const { dbName, commentDBName } = findDBNameAndCommentDBNameByCategory(
    category
  );

  try {
    await dbService.collection(`${commentDBName}`).doc(commentId).set(comment);

    const postRef = await dbService.collection(`${dbName}`).doc(url);

    await postRef.update({
      comment: firebase.firestore.FieldValue.arrayUnion(
        `${commentDBName}/${commentId}`
      ),
      unreadComment: true,
    });

    await dbService
      .collection("userDB")
      .doc(commenterUid)
      .update({
        point: firebase.firestore.FieldValue.increment(1),
      });

    const postDB = await postRef.get();

    const commentData = await postDB.data().comment;

    const result = getCommentObjByCommentDataOfPostDB(commentData);

    return result;
  } catch (error) {
    console.log("commentWriteAPI", error);
    alert("commentWriteAPI", error);
  }
};

function* commentWrite(action) {
  try {
    const result = yield call(commentWriteAPI, action.payload);

    console.log("commentWrite", result);

    yield put({
      type: COMMENT_WRITE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: COMMENT_WRITE_FAILURE,
    });

    console.log("commentWrite", error);
    alert("commentWrite", error);
  }
}

function* watchCommentWrite() {
  yield takeEvery(COMMENT_WRITE_REQUEST, commentWrite);
}

//
//
//

export default function* commentSaga() {
  yield all([fork(watchCommentWrite), fork(watchCommentContent)]);
}
