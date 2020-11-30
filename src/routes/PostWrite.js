import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  NavbarBrand,
} from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "components/editor/EditorConfig";
// import MyInit from "components/editor/UploadAdapter.js";
import MyUploadAdapter from "components/editor/UploadAdapter.js";
import { authService, dbService, firebaseInstance } from "fbase";
import moment from "moment";
import shortid from "shortid";
import { useDispatch, useSelector } from "react-redux";

const PostWrite = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, nickname, point } = auth;

  console.log("PostWrite/auth", auth);

  // console.log("uid, point?", uid, point);

  const { path } = match;

  let category, dbName, urlPrefix, divClassName;

  if (!authService.currentUser.emailVerified) {
    history.push("/");
  }

  // const [divClassName, setDivClassName] = useState("");

  // useEffect(() => {
  //   switch (path) {
  //     case "/Coin":
  //       setDivClassName("Coin");
  //       break;

  //     case "/Stock":
  //       setDivClassName("Stock");
  //       break;

  //     default:
  //       alert("Board.js useEffect switch default.");
  //       break;
  //   }
  // }, [path]);

  switch (path) {
    case "/CoinPostWrite":
      urlPrefix = "Coin";
      category = "코인";
      dbName = "CoinPostDB";
      divClassName = "CoinPostWrite";
      break;

    case "/StockPostWrite":
      urlPrefix = "Stock";
      category = "국내주식";
      dbName = "StockPostDB";
      divClassName = "StockPostWrite";
      break;

    case "/OsStockPostWrite":
      urlPrefix = "OsStock";
      category = "해외주식";
      dbName = "OsStockPostDB";
      divClassName = "OsStockPostWrite";
      break;

    case "/FreePostWrite":
      urlPrefix = "Free";
      category = "자유";
      dbName = "FreePostDB";
      divClassName = "FreePostWrite";
      break;

    case "/GamePostWrite":
      urlPrefix = "Game";
      category = "게임";
      dbName = "GamePostDB";
      divClassName = "GamePostWrite";
      break;

    default:
      alert("PostWrite.js executed switch default.");
      break;
  }

  const [form, setForm] = useState({
    title: "",
    contents: "",
    fileUrl: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const urlSuffix = moment().format("YYMMDDHHmm") + shortid.generate();

    const url = `${urlPrefix}-${urlSuffix}`;

    const { title, contents, fileUrl } = form;

    await dbService
      .collection("userDB")
      .doc(authService.currentUser.uid)
      .update({
        point: firebaseInstance.firestore.FieldValue.increment(+5),
      });

    const newPost = {
      url,
      title,
      contents,
      fileUrl,
      category,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      creatorUid: authService.currentUser.uid,
      creatorNickname: nickname,
      // upVote: 0,
      // downVote: 0,
      upVote: [],
      downVote: [],
      comment: [],
      unreadComment: false,
      views: 0,
      time: Date.now(),
      creatorPoint: point,
    };

    // await dbService.collection("PostDB").doc(url).set(newPost);
    await dbService.collection(`${dbName}`).doc(url).set(newPost);

    // dispatch({
    //   type: GET_POINT_WHEN_POST_REQUEST,
    //   payload: auth,
    // });

    history.push(url);
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    if (data && data.match("<img src=")) {
      const whereImg_start = data.indexOf("<img src="); // indexOf() - 첫번째 인덱스 값 반환
      let whereImg_end = "";
      let ext_name_find = "";
      let result_Img_Url = "";
      const ext_name = ["jpeg", "png", "jpg", "gif"];

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }

      if (ext_name_find === "jpeg") {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      setForm({
        ...form,
        fileUrl: result_Img_Url,
        contents: data,
      });
    } else {
      setForm({
        ...form,
        fileUrl:
          "https://images.unsplash.com/photo-1507123948929-86a949bdaa23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        contents: data,
      });
    }
  };

  const postInit = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      // Configure the URL to the upload script in your back-end here!
      return new MyUploadAdapter(loader, dbName);
    };
  };

  return (
    <div className={`${divClassName}`}>
      {isLoggedIn ? null : history.push("/")}
      <NavbarBrand>{category} 게시판 글쓰기</NavbarBrand>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            name="title"
            id="title"
            onChange={onChange}
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Content</FormLabel>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            onBlur={getDataFromCKEditor}
            onInit={postInit}
          />
        </FormGroup>

        <Button
          type="submit"
          color="success"
          block
          className="mt-3 col-md-2 offset-md-10 mb-3"
        >
          제출
        </Button>
      </Form>
    </div>
  );
};

export default PostWrite;
