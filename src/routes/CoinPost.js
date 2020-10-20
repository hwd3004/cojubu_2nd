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
import MyInit from "components/editor/UploadAdapter";

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
    console.log("editor");
  };

  return (
    <div className="CoinPost">
      글쓰기 폼<div>{isLoggedIn ? null : history.push("/")}</div>
      <div>
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
