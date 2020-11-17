import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "components/editor/EditorConfig";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { POST_UP_VOTE_REQUEST } from "redux/types";

const PostContent = () => {
  const { id } = useParams();
  const match = useRouteMatch();
  // eslint-disable-next-line no-unused-vars
  const { path, url } = match;
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const loc = useLocation();

  const [document, setDocument] = useState({});

  const { uid } = useSelector((state) => state.auth);

  const [showModalToDelete, setShowModalToDelete] = useState(false);
  const handleCloseModalToDelete = () => setShowModalToDelete(false);
  const handleShowModalToDelete = () => setShowModalToDelete(true);

  const dispatch = useDispatch();

  let divClassName, dbName;

  const getURL = id.split("-");

  switch (getURL[0]) {
    case "Coin":
      divClassName = "Coin";
      dbName = "CoinPostDB";
      break;

    case "Stock":
      divClassName = "Stock";
      dbName = "StockPostDB";
      break;

    default:
      // alert("Board.js executed switch default.");
      break;
  }

  const executeDeletePost = async () => {
    await dbService.collection(`${dbName}`).doc(`${id}`).delete();
    history.goBack();
  };

  const modalAskDelete = (
    <Modal show={showModalToDelete} onHide={handleCloseModalToDelete}>
      <Modal.Header closeButton>
        <Modal.Title>게시글 삭제 안내</Modal.Title>
      </Modal.Header>
      <Modal.Body>정말로 삭제하시겠습니까? 복구할 수 없습니다.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseModalToDelete}>
          취소
        </Button>
        <Button variant="danger" onClick={executeDeletePost}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const getContent = async () => {
    const contentRef = await dbService.collection(`${dbName}`).doc(`${id}`);

    await contentRef.get().then((doc) => {
      setDocument(doc.data());
      // console.log(doc.data().upVote.length);
    });

    //
    //
    //

    // https://firebase.google.com/docs/firestore/query-data/listen?hl=ko
    // 클라우드 파이어 스토어 실시간 업데이트

    // 구글 검색 - 파이어베이스 onsnapshot
    // Firestore 사용시 주의점 - 토리토시스템 :: 토리토시스템 - 티스토리
    // https://toritosystem.tistory.com/8

    // const postRef = await dbService
    //   .collection(`${dbName}`)
    //   .doc(`${id}`)
    //   .onSnapshot((snapshot) => {
    //     // console.log(snapshot.data());

    //     setDocument(snapshot.data());
    //   });
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    contents,
    title,
    createdAt,
    creatorNickname,
    creatorUid,
    upVote,
    downVote,
  } = document;

  const onClickVote = () => {
    dispatch({
      type: POST_UP_VOTE_REQUEST,
      payload: {
        ...document,
        currentUserUid: uid,
      },
    });
  };

  return (
    <div className={`${divClassName}`}>
      {modalAskDelete}
      <Button className="mt-1" variant="dark" onClick={() => history.goBack()}>
        Back
      </Button>

      <div className="d-flex mt-1">
        <h1>{title}</h1>
        <div className="ml-auto">
          <span className="mr-5">{creatorNickname}</span>
          <span>{createdAt}</span>
        </div>
      </div>

      <CKEditor
        editor={BalloonEditor}
        data={contents}
        config={editorConfiguration}
        disabled="true"
      />

      <div id="voteDiv">
        <Button onClick={onClickVote} variant="primary">
          {upVote ? upVote.length : null} 추천
        </Button>

        <Button variant="primary">
          {downVote ? downVote.length : null} 비추천
        </Button>
      </div>

      <Button className="mr-1" variant="dark" onClick={() => history.goBack()}>
        Back
      </Button>

      {creatorUid === uid ? (
        <>
          <Button className="mr-1">수정</Button>
          <Button className="mr-1" onClick={handleShowModalToDelete}>
            삭제
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default PostContent;
