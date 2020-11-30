import React, { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "components/editor/EditorConfig";
import CKEditor from "@ckeditor/ckeditor5-react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMENT_CONTENT_REQUEST,
  COMMENT_WRITE_REQUEST,
  POST_CONTENT_REQUEST,
  POST_DELETE_REQUEST,
  POST_DOWN_VOTE_REQUEST,
  POST_UP_VOTE_REQUEST,
} from "redux/types";
import moment from "moment";
import shortid from "shortid";
import { authService } from "fbase";
import Comment from "components/Comment";

const PostContent = () => {
  const { auth, post } = useSelector((state) => state);
  const getPostContent = post;

  const { isLoggedIn, nickname, permission, uid, point } = auth;

  console.log("PostContent/auth", auth);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService.onAuthStateChanged((user) => {
  //     const uid = user.uid;
  //     const payload = { uid };

  //     if (user) {
  //       dispatch({
  //         type: USER_LOADING_REQUEST,
  //         payload,
  //       });
  //     }
  //   });
  // }, []);

  const { id } = useParams();
  const match = useRouteMatch();
  // eslint-disable-next-line no-unused-vars
  const { path, url } = match;
  console.log("id", id);
  console.log("url", url);
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const loc = useLocation();

  // const [document, setDocument] = useState({});

  const [showModalToDelete, setShowModalToDelete] = useState(false);
  const handleCloseModalToDelete = () => setShowModalToDelete(false);
  const handleShowModalToDelete = () => setShowModalToDelete(true);

  const [inputComment, setInputComment] = useState("");

  // eslint-disable-next-line no-unused-vars
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

    case "OsStock":
      divClassName = "OsStock";
      dbName = "OsStockPostDB";
      break;

    case "Free":
      divClassName = "Free";
      dbName = "FreeStockPostDB";
      break;

    case "Game":
      divClassName = "Game";
      dbName = "GameStockPostDB";
      break;

    default:
      // alert("Board.js executed switch default.");
      break;
  }

  const executeDeletePost = async () => {
    // await dbService.collection(`${dbName}`).doc(`${id}`).delete();

    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        ...getPostContent,
        currentUserUid: uid,
        permission,
      },
    });

    history.push("/");
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

  // const getContent = async () => {
  //   const data = {
  //     url,
  //     uid,
  //   };

  //   dispatch({
  //     type: POST_CONTENT_REQUEST,
  //     payload: data,
  //   });

  //   // const contentRef = await dbService.collection(`${dbName}`).doc(`${id}`);
  //   // await contentRef.get().then((doc) => {
  //   //   setDocument(doc.data());
  //   // });
  //   //
  //   //
  //   //
  //   // https://firebase.google.com/docs/firestore/query-data/listen?hl=ko
  //   // 클라우드 파이어 스토어 실시간 업데이트
  //   // 구글 검색 - 파이어베이스 onsnapshot
  //   // Firestore 사용시 주의점 - 토리토시스템 :: 토리토시스템 - 티스토리
  //   // https://toritosystem.tistory.com/8
  //   // const postRef = await dbService
  //   //   .collection(`${dbName}`)
  //   //   .doc(`${id}`)
  //   //   .onSnapshot((snapshot) => {
  //   //     // console.log(snapshot.data());
  //   //     setDocument(snapshot.data());
  //   //   });
  // };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        const data = {
          url,
          uid: authService.currentUser.uid,
        };
        dispatch({
          type: POST_CONTENT_REQUEST,
          payload: data,
        });
      } else {
        const data = {
          url,
          uid: null,
        };

        dispatch({
          type: POST_CONTENT_REQUEST,
          payload: data,
        });
      }
    });
    // getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // const {
  //   contents,
  //   title,
  //   createdAt,
  //   creatorNickname,
  //   creatorUid,
  //   upVote,
  //   downVote,
  // } = document;

  const {
    contents,
    title,
    createdAt,
    creatorNickname,
    creatorUid,
    upVote,
    downVote,
    comment,
    isLoading,
  } = getPostContent;

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

  useEffect(() => {
    dispatch({
      type: COMMENT_CONTENT_REQUEST,
      payload: comment,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  const getCommentContent = useSelector((state) => state.comment);
  console.log("getCommentContent", getCommentContent);

  // const [commentList, setCommentList] = useState([]);

  // useEffect(() => {
  //   setCommentList(getCommentContent);

  //   console.log("commentList", commentList);
  // }, [getCommentContent]);

  const onClickUpVote = () => {
    if (uid) {
      if (uid !== creatorUid) {
        dispatch({
          type: POST_UP_VOTE_REQUEST,
          payload: {
            // ...document,
            ...getPostContent,
            currentUserUid: uid,
          },
        });
      } else {
        alert("본인의 글에는 추천할 수 없습니다");
      }
    } else {
      alert("로그인한 사용자만 가능합니다");
    }
  };

  const onClickDownVote = () => {
    if (uid) {
      if (uid !== creatorUid) {
        dispatch({
          type: POST_DOWN_VOTE_REQUEST,
          payload: {
            ...getPostContent,
            currentUserUid: uid,
          },
        });
      } else {
        alert("본인의 글에는 비추천할 수 없습니다");
      }
    } else {
      alert("로그인한 사용자만 가능합니다");
    }
  };

  const checkEmailVerifiedToComment = () => {
    let emailVerified;

    if (authService.currentUser) {
      authService.currentUser.reload();

      if (authService.currentUser.emailVerified) {
        emailVerified = true;
      } else {
        alert("이메일 인증이 완료된 사용자만 댓글쓰기가 가능합니다.");

        emailVerified = false;
      }
    } else {
      alert("이메일 인증이 완료된 사용자만 댓글쓰기가 가능합니다.");

      emailVerified = false;
    }

    return emailVerified;
  };

  const onSubmitComment = (event) => {
    event.preventDefault();

    const checkPermission = checkEmailVerifiedToComment();

    if (checkPermission) {
      const data = {
        commentId: `${divClassName}-${shortid.generate()}`,

        commenterUid: uid,
        commenterNickname: nickname,

        commentContent: inputComment,
        commentCreatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),

        isDeleted: false,

        commentUpVote: 0,
        commentDownVote: 0,

        postUrl: getPostContent.url,

        // 대댓글 구현시 부모댓글이 무엇인지
        replyTo: null,

        unreadReply: false,

        commenterPoint: point,
      };

      dispatch({
        type: COMMENT_WRITE_REQUEST,
        payload: {
          ...getPostContent,
          comment: data,
        },
      });

      setInputComment("");
    }
  };

  const onChangeComment = (event) => {
    const {
      target: { value },
    } = event;

    setInputComment(value);
  };

  return (
    <>
      {!isLoading ? (
        <div className={`${divClassName}`}>
          {modalAskDelete}
          <Button
            className="mt-1"
            variant="dark"
            onClick={() => history.goBack()}
          >
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
            <Button onClick={onClickUpVote} variant="primary">
              {upVote ? upVote.length : null} 추천
            </Button>

            <Button onClick={onClickDownVote} variant="primary">
              {downVote ? downVote.length : null} 비추천
            </Button>
          </div>

          <br></br>

          <div>
            <Button
              className="mr-1"
              variant="dark"
              onClick={() => history.goBack()}
            >
              Back
            </Button>

            {creatorUid === uid || permission === "admin" ? (
              <>
                <Button as={Link} to={`/PostUpdate/${id}`} className="mr-1">
                  수정
                </Button>
                <Button className="mr-1" onClick={handleShowModalToDelete}>
                  삭제
                </Button>
              </>
            ) : null}
          </div>

          <br></br>

          {getCommentContent.comment.length > 0 &&
            getCommentContent.comment.map((item, index) => {
              return (
                <Comment
                  key={index}
                  item={item}
                  isLoading={getCommentContent.isLoading}
                />
              );
            })}

          {isLoggedIn ? (
            <Form onSubmit={onSubmitComment}>
              <FormGroup>
                <FormLabel>댓글 쓰기</FormLabel>
                <FormControl
                  onChange={onChangeComment}
                  value={inputComment}
                  name="comment"
                  as="textarea"
                  minLength="2"
                  maxLength="200"
                  rows="4"
                  style={{ resize: "none" }}
                />
                <Button type="submit">댓글 등록</Button>
              </FormGroup>
            </Form>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default PostContent;
