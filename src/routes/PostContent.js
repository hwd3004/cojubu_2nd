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
import { Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

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

  const getContent = async () => {
    const contentRef = await dbService.collection(`${dbName}`).doc(`${id}`);

    await contentRef.get().then((doc) => {
      setDocument(doc.data());
    });
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contents, title, createdAt, creatorNickname, creatorUid } = document;

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

  return (
    <div className={`${divClassName}`}>
      {modalAskDelete}
      <Button variant="dark" onClick={() => history.goBack()}>
        Back
      </Button>
      <Table>
        <thead>
          <tr>
            <td>{title}</td>
            <td>{creatorNickname}</td>
            <td>{createdAt}</td>
          </tr>
        </thead>
        <tbody>
          <CKEditor
            editor={BalloonEditor}
            data={contents}
            config={editorConfiguration}
            disabled="true"
          />
        </tbody>
        <tfoot>
          <td>
            <Button variant="dark" onClick={() => history.goBack()}>
              Back
            </Button>
          </td>
          {creatorUid === uid ? (
            <tr>
              <td>
                <Button>수정</Button>
              </td>
              <td>
                <Button onClick={handleShowModalToDelete}>삭제</Button>
              </td>
            </tr>
          ) : null}
        </tfoot>
      </Table>
    </div>
  );
};

export default PostContent;
