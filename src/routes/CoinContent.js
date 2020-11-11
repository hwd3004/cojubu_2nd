
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

const CoinContent = () => {
  const { id } = useParams();
  const match = useRouteMatch();
  const { path } = match;
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const loc = useLocation();

  const [document, setDocument] = useState({});

  const { uid } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log("id", id);
  // console.log("match", match);
  // console.log("loc", loc);

  let DB_NAME, DIV_CLASS_NAME, PARENT_URL;

  if (path === "/Coin/:id") {
    DB_NAME = "CoinPostDB";
    DIV_CLASS_NAME = "CoinContent";
    PARENT_URL = "/Coin";
  } else if (path === "/Stock/:id") {
    DB_NAME = "StockPostDB";
    DIV_CLASS_NAME = "StockContent";
    PARENT_URL = "/Stock";
  }

  const getContent = async () => {
    const contentRef = await dbService.collection(`${DB_NAME}`).doc(`${id}`);

    await contentRef.get().then((doc) => {
      //   console.log(doc.data())
      setDocument(doc.data());
    });
  };

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contents, title, createdAt, creatorNickname, creatorUid } = document;

  const executeDeletePost = async () => {
    await dbService.collection(`${DB_NAME}`).doc(`${id}`).delete();
    history.push(`${PARENT_URL}`);
  };

  const modalAskDelete = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>게시글 삭제 안내</Modal.Title>
      </Modal.Header>
      <Modal.Body>정말로 삭제하시겠습니까? 복구할 수 없습니다.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="danger" onClick={executeDeletePost}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className={`${DIV_CLASS_NAME}`}>
      {modalAskDelete}
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
        {creatorUid === uid ? (
          <tfoot>
            <tr>
              <td><Button>수정</Button></td>
              <td>
                <Button onClick={handleShow}>삭제</Button>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </Table>
    </div>
  );
};

export default CoinContent;
