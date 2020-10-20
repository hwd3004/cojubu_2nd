import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "components/editor/EditorConfig";
import MyInit from "components/editor/UploadAdapter.js";

const CoinPost = ({ isLoggedIn }) => {
  const history = useHistory();

  const [form, setValues] = useState({ title: "", contents: "", fileUrl: "" });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (event) => {
    await event.preventDefault();
    const { title, contents, fileUrl, category } = form;
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

      setValues({
        ...form,
        fileUrl: result_Img_Url,
        contents: data,
      });
    } else {
      setValues({
        ...form,
        fileUrl:
          "https://images.unsplash.com/photo-1507123948929-86a949bdaa23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        contents: data,
      });
    }
  };

  return (
    <div className="CoinPost">
      글쓰기 폼<div>{isLoggedIn ? null : history.push("/")}</div>
      <div className="container">
        <Form>
          <FormGroup className="mb-3">
            <FormLabel for="title">Title</FormLabel>
            <FormControl
              type="text"
              name="title"
              id="title"
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel for="title">Category</FormLabel>
            <FormControl
              type="text"
              name="category"
              id="category"
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel for="title">Content</FormLabel>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onInit={MyInit}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              제출
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default CoinPost;
