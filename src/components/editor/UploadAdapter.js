import * as firebase from "firebase";
import moment from "moment";

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          let storage = firebase.storage().ref();
          let uploadTask = storage
            .child(
              `${moment().format("YYMMDD")}/${moment().format("HHmm")}/${
                file.name
              }`
            )
            .put(file);

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
              // Get task progress, including the number of  bytes to be uploaded
              // var progress =
              // (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              // console.log(`Upload is ${progress}% done`);

              // eslint-disable-next-line default-case
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  // console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING:
                  // console.log("Upload is running");
                  break;
              }
            },
            function (error) {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
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

const MyInit = (editor) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
};

export default MyInit;
