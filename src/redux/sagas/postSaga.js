import { dbService } from "fbase";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  POST_UP_VOTE_REQUEST,
  POST_UP_VOTE_SUCCESS,
  POST_UP_VOTE_FAILURE,
  POST_CONTENT_REQUEST,
  POST_CONTENT_SUCCESS,
  POST_CONTENT_FAILURE,
  POST_DOWN_VOTE_REQUEST,
  POST_DOWN_VOTE_FAILURE,
  POST_DOWN_VOTE_SUCCESS,
  POST_DELETE_REQUEST,
} from "../types";
import * as firebase from "firebase";

// 포스트 컨텐츠 불러오기 - postContentAPI는 직접 수정해줘야함
const findDBNameByCategory = (inputCategory) => {
  let getDBName;

  switch (inputCategory) {
    case "코인":
      getDBName = "CoinPostDB";
      break;

    case "주식":
      getDBName = "StockPostDB";
      break;

    default:
      break;
  }

  return getDBName;
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
// 글삭제

const postDeleteAPI = async (postData) => {
  try {
    console.log("postDeleteAPI", postData);

    // eslint-disable-next-line no-unused-vars
    const { url, category, currentUserUid, creatorUid, permission } = postData;

    const dbName = findDBNameByCategory(category);

    if (currentUserUid === creatorUid || permission === "admin") {
      const postRef = await dbService.collection(`${dbName}`).doc(url);

      let countUpVote;

      await postRef.get().then((doc) => {
        countUpVote = doc.data().upVote.length * 5;
      });

      const recallPoint = countUpVote + 5;

      await postRef.delete();

      await dbService
        .collection("userDB")
        .doc(creatorUid)
        .update({
          point: firebase.firestore.FieldValue.increment(-recallPoint),
        });
    } else {
      alert("삭제할 수 없습니다");
    }

    return postData;
  } catch (error) {
    console.log("postDeleteAPI", error);
    alert("postDeleteAPI", error);
  }
};

function* postDelete(action) {
  try {
    const result = yield call(postDeleteAPI, action.payload);

    yield put({
      type: POST_CONTENT_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: POST_CONTENT_FAILURE,
    });
    console.log("postDelete", error);
    alert("postDelete");
  }
}

function* watchPostDelete() {
  yield takeEvery(POST_DELETE_REQUEST, postDelete);
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
// 포스트 컨텐츠 불러오기
const postContentAPI = async (postData) => {
  try {
    const { url, uid } = postData;

    let getUrl = url.split("/");
    getUrl = getUrl[1];

    const findDB = getUrl.split("-");

    let dbName;

    switch (findDB[0]) {
      case "Coin":
        dbName = "CoinPostDB";
        break;

      case "Stock":
        dbName = "StockPostDB";
        break;

      default:
        break;
    }

    await dbService
      .collection(`${dbName}`)
      .doc(getUrl)
      .update({
        views: firebase.firestore.FieldValue.increment(1),
      });

    const postRef = await dbService.collection(`${dbName}`).doc(getUrl).get();

    const postDB = await postRef.data();

    if (uid === postDB.creatorUid) {
      await dbService.collection(`${dbName}`).doc(getUrl).update({
        unreadComment: false,
      });
    }

    return postDB;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

function* postContent(action) {
  try {
    const result = yield call(postContentAPI, action.payload);

    yield put({
      type: POST_CONTENT_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: POST_CONTENT_FAILURE,
    });
    console.log("postUpVote", error);
    alert("postUpVote", error);
  }
}

function* watchPostContent() {
  yield takeEvery(POST_CONTENT_REQUEST, postContent);
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
// 글 추천
const postUpVoteAPI = async (postData) => {
  try {
    const { url, category, currentUserUid, creatorUid } = postData;

    const dbName = findDBNameByCategory(category);

    let yesUpVote = [];

    const postRef = await dbService.collection(`${dbName}`).doc(url).get();

    const postDB = await postRef.data();

    const { upVote } = postDB;

    const handleUpVote = async () => {
      try {
        yesUpVote = upVote.concat(currentUserUid);

        await dbService.collection(`${dbName}`).doc(url).update({
          upVote: yesUpVote,
        });

        await dbService
          .collection("userDB")
          .doc(creatorUid)
          .update({
            point: firebase.firestore.FieldValue.increment(5),
          });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    try {
      if (typeof upVote === "object") {
        if (upVote.length > 0) {
          if (currentUserUid === creatorUid) {
            alert("본인의 글에는 추천할 수 없습니다");
            yesUpVote = upVote;
          } else {
            if (upVote.indexOf(currentUserUid) === -1) {
              handleUpVote();
            } else {
              alert("이미 추천하였습니다");
              yesUpVote = upVote;
            }
          }
        } else {
          if (currentUserUid === creatorUid) {
            alert("본인의 글에는 추천할 수 없습니다");
            yesUpVote = upVote;
          } else {
            handleUpVote();
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주시기 바랍니다");
    }

    const updatePostData = {
      ...postData,
      upVote: yesUpVote,
    };

    return updatePostData;
  } catch (error) {
    console.log("postUpVoteAPI", error);
    alert("postUpVoteAPI", error);
  }
};

function* postUpVote(action) {
  try {
    const result = yield call(postUpVoteAPI, action.payload);

    yield put({
      type: POST_UP_VOTE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: POST_UP_VOTE_FAILURE,
    });
    console.log("postUpVote", error);
    alert("postUpVote", error);
  }
}

function* watchPostUpVote() {
  yield takeEvery(POST_UP_VOTE_REQUEST, postUpVote);
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
// 글 비추천
const postDownVoteAPI = async (postData) => {
  try {
    const { url, category, currentUserUid, creatorUid } = postData;

    const dbName = findDBNameByCategory(category);

    let yesDownVote = [];

    const postRef = await dbService.collection(`${dbName}`).doc(url).get();

    const postDB = await postRef.data();

    const { downVote } = postDB;

    const handleDownVote = async () => {
      try {
        yesDownVote = downVote.concat(currentUserUid);

        await dbService.collection(`${dbName}`).doc(url).update({
          downVote: yesDownVote,
        });

        await dbService
          .collection("userDB")
          .doc(creatorUid)
          .update({
            point: firebase.firestore.FieldValue.increment(-5),
          });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    try {
      if (typeof downVote === "object") {
        if (downVote.length > 0) {
          if (currentUserUid === creatorUid) {
            alert("본인의 글에는 비추천할 수 없습니다");
            yesDownVote = downVote;
          } else {
            if (downVote.indexOf(currentUserUid) === -1) {
              handleDownVote();
            } else {
              alert("이미 비추천하였습니다");
              yesDownVote = downVote;
            }
          }
        } else {
          if (currentUserUid === creatorUid) {
            alert("본인의 글에는 추천할 수 없습니다");
            yesDownVote = downVote;
          } else {
            handleDownVote();
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주시기 바랍니다");
    }

    const updatePostData = {
      ...postData,
      downVote: yesDownVote,
    };

    return updatePostData;
  } catch (error) {
    console.log("postDownVoteAPI", error);
    alert("postDownVoteAPI", error);
  }
};

function* postDownVote(action) {
  try {
    const result = yield call(postDownVoteAPI, action.payload);

    yield put({
      type: POST_DOWN_VOTE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: POST_DOWN_VOTE_FAILURE,
    });
    console.log("postDownVote", error);
    alert("postDownVote", error);
  }
}

function* watchPostDownVote() {
  yield takeEvery(POST_DOWN_VOTE_REQUEST, postDownVote);
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

export default function* postSaga() {
  yield all([
    fork(watchPostUpVote),
    fork(watchPostContent),
    fork(watchPostDownVote),
    fork(watchPostDelete),
  ]);
}
