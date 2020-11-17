import { authService, dbService } from "fbase";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  POST_UP_VOTE_REQUEST,
  POST_UP_VOTE_SUCCESS,
  POST_UP_VOTE_FAILURE,
} from "../types";

const postUpVoteAPI = async (postData) => {
  try {
    console.log("postUpVoteAPI", postData);

    const { url, category, upVote, currentUserUid } = postData;

    let dbName;

    switch (category) {
      case "코인":
        dbName = "CoinPostDB";
        break;

      case "주식":
        dbName = "StockPostDB";
        break;

      default:
        break;
    }

    let updatePostData;
    let canUpVote = false;

    try {
      if (typeof upVote === "object") {
        if (upVote.length > 0) {
          for (const i of upVote) {
            console.log("upVote i", i);
          }
        } else {
          const newVote = upVote.concat(currentUserUid);
          console.log("newVote", newVote);

          //   await dbService.collection(`${dbName}`).doc(url).update({
          //     upVote: newVote,
          //   });

          updatePostData = {
            ...postData,
            upVote: newVote,
          };
        }
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주시기 바랍니다");
    }

    // 파이어베이스 추천 작업
    // await dbService.collection(`${dbName}`).doc(url).update({
    //     upVote :
    // });

    console.log("updatePostData", updatePostData);

    return updatePostData;
  } catch (error) {
    console.log("postUpVoteAPI", error);
    alert("postUpVoteAPI", error);
  }
};

function* postUpVote(action) {
  try {
    const result = yield call(postUpVoteAPI, action.payload);

    console.log("postUpVote/result", result);

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

export default function* postSaga() {
  yield all([fork(watchPostUpVote)]);
}
