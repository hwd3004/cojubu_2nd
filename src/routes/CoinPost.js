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

import { authService, dbService } from "fbase";
import moment from "moment";

import * as firebase from "firebase";
import dotenv from "dotenv";
dotenv.config();

const DB_NAME = "CoinPostDB";
const DIV_CLASS_NAME = "CoinPost";
const CATEGORY = "coin";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    let metadata = {
      contentType: "image/jpeg",
    };

    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          let storage = firebase.storage().ref();
          let uploadTask = storage
            .child(
              `${DB_NAME}/${moment().format("YYYYMMDD")}/${
                authService.currentUser.uid
              }/${moment().format("YYYYMMDD hh:mm:ss")}`
            )
            .put(file, metadata);

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            // function (snapshot) {
            //   console.log(snapshot.totalBytes);
            //   if (snapshot.bytesTransferred >= 1048576) {
            //     // 5242880
            //   }
            // },
            function (error) {
              // eslint-disable-next-line default-case
              switch (error.code) {
                case "storage/unauthorized":
                  reject(" User doesn't have permission to access the object");
                  break;

                case "storage/canceled":
                  reject("User canceled the upload");
                  break;

                case "storage/unknown":
                  reject(
                    "Unknown error occurred, inspect error.serverResponse"
                  );
                  break;
              }
            },
            function () {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  // console.log("File available at", downloadURL);
                  resolve({ default: downloadURL });
                });
            }
          );
        })
    );
  }
}

const CoinPost = ({ isLoggedIn, myNickname }) => {
  const history = useHistory();

  const [form, setValues] = useState({
    title: "",
    contents: "",
    fileUrl: "",
    // category: "",
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { title, contents, fileUrl } = form;

    const newPost = {
      title: title,
      contents: contents,
      fileUrl: fileUrl,
      // category: form.category,
      category: CATEGORY,
      createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
      creatorUid: authService.currentUser.uid,
      creatorNickname: `${myNickname}`,
      upVote: 0,
      downVote: 0,
      comment: [],
      views: 0,
    };

    await dbService.collection(`${DB_NAME}`).add(newPost);
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
    <div className={`${DIV_CLASS_NAME}`}>
      {isLoggedIn ? null : history.push("/")}
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel>제목</FormLabel>
          <FormControl
            type="text"
            name="title"
            id="title"
            onChange={onChange}
          />
        </FormGroup>

        {/* <FormGroup>
          <FormLabel>Category</FormLabel>
          <FormControl
            type="text"
            name="category"
            id="category"
            onChange={onChange}
          />
        </FormGroup> */}

        <FormGroup className="mb-3">
          <FormLabel>내용</FormLabel>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            // onInit={MyInit}
            onInit={(editor) => {
              editor.plugins.get("FileRepository").createUploadAdapter = (
                loader
              ) => {
                return new MyUploadAdapter(loader);
              };
            }}
            onBlur={getDataFromCKEditor}
          />
        </FormGroup>

        <Button
          type="submit"
          color="success"
          block
          className="mt-3 col-md-2 offset-md-10 mb-3"
        >
          등록
        </Button>
      </Form>
    </div>
  );
};

export default CoinPost;
