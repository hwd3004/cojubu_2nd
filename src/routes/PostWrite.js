import React, { useEffect } from "react";
import { useState } from "react";
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
import { authService, dbService } from "fbase";
import moment from "moment";
import shortid from "shortid";
import { useSelector } from "react-redux";

const PostWrite = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { isLoggedIn, nickname } = useSelector((state) => state.auth);

  const [something, setSomething] = useState({});

  const { path } = match;

  let db_name;

  if (path === "/CoinPostWrite") {
    db_name = "CoinPostDB";
  } else if (path === "/StockPostWrite") {
    db_name = "StockPostDB";
  }

  useEffect(() => {
    if (path === "/CoinPostWrite") {
      setSomething({
        DB_NAME: "CoinPostDB",
        DIV_CLASS_NAME: "CoinPost",
        CATEGORY: "코인",
        LINK_TO: "Coin",
      });
    } else if (path === "/StockPostWrite") {
      setSomething({
        DB_NAME: "StockPostDB",
        DIV_CLASS_NAME: "StockPost",
        CATEGORY: "주식",
        LINK_TO: "Stock",
      });
    }
  }, [path]);

  const { DIV_CLASS_NAME, CATEGORY, LINK_TO } = something;

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

    const GET_URL = moment().format("YYMMDD") + shortid.generate();

    const url = `${LINK_TO}${GET_URL}`;

    const { title, contents, fileUrl } = form;

    const newPost = {
      url,
      title,
      contents,
      fileUrl,
      category: CATEGORY,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      creatorUid: authService.currentUser.uid,
      creatorNickname: nickname,
      upVote: 0,
      downVOte: 0,
      comment: [],
      unreadComment: false,
      views: 0,
      time: Date.now(),
    };

    await dbService.collection("PostDB").doc(url).set(newPost);

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
      return new MyUploadAdapter(loader, db_name);
    };
  };

  return (
    <div className={`${DIV_CLASS_NAME}`}>
      <div>{isLoggedIn ? null : history.push("/")}</div>
      <NavbarBrand>{CATEGORY} 게시판 글쓰기</NavbarBrand>
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
