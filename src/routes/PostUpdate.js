import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  NavbarBrand,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "components/editor/EditorConfig";
import MyUploadAdapter from "components/editor/UploadAdapter.js";
import { dbService } from "fbase";

const PostUpdate = () => {
  const { auth, post } = useSelector((state) => state);
  const { title, contents, fileUrl, url } = post;
  const history = useHistory();
  //   const { id } = useParams();
  //   console.log("id", id);

  const [form, setForm] = useState({
    title,
    contents,
    fileUrl,
  });

  let divClassName, dbName;
  try {
    const getURL = url.split("-");

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
  } catch (error) {
    history.push("/");
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { title, contents, fileUrl } = form;

    await dbService.collection(`${dbName}`).doc(url).update({
      title,
      contents,
      fileUrl,
    });

    console.log("url", url);

    history.push(`/${url}`);
  };

  console.log("auth", auth.uid);
  console.log("post", post.creatorUid);
  console.log(post);

  //   if (auth.uid !== post.creatorUid) {
  //     window.location.href = "/";
  //   }

  useEffect(() => {}, []);

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
    <div className="PostUpdate">
      {auth.uid === post.creatorUid ? null : history.push("/")}

      <NavbarBrand>글수정</NavbarBrand>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            name="title"
            id="title"
            onChange={onChange}
            defaultValue={title}
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Content</FormLabel>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            onBlur={getDataFromCKEditor}
            onInit={postInit}
            data={contents}
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

export default PostUpdate;
