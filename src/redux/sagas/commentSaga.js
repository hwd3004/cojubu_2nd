import { dbService } from "fbase";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as firebase from "firebase";
import {
  COMMENT_WRITE_FAILURE,
  COMMENT_WRITE_REQUEST,
  COMMENT_WRITE_SUCCESS,
} from "redux/types";

const findDBNameAndCommentDBNameByCategory = (inputCategory) => {
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
  const { category, url, comment } = data;
  const {
    commentContent,
    commentCreatedAt,
    commentDownVote,
    commentId,
    commentUpVote,
    commenterNickname,
    commenterUid,
    isDeleted,
    postUrl,
    replyTo,
  } = comment;

  const { dbName, commentDBName } = findDBNameAndCommentDBNameByCategory(
    category
  );

  try {
    const commentRef = await dbService
      .collection(`${commentDBName}`)
      .doc(commentId);

    await commentRef.set(comment);

    const postRef = await dbService.collection(`${dbName}`).doc(url);

    await postRef.update({
      comment: firebase.firestore.FieldValue.arrayUnion(commentRef),
      unreadComment: true,
    });

    await dbService
      .collection("userDB")
      .doc(commenterUid)
      .update({
        point: firebase.firestore.FieldValue.increment(1),
      });

    const postDB = await postRef.get();

    return postDB.data();
  } catch (error) {
    console.log("commentWriteAPI", error);
    alert("commentWriteAPI", error);
  }
};

function* commentWrite(action) {
  try {
    const result = yield call(commentWriteAPI, action.payload);

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

export default function* postSaga() {
  yield all([fork(watchCommentWrite)]);
}
