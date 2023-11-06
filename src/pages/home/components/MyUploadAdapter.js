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
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
          })
      );
    }
  
    // Aborts the upload process.
    abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }
  
    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
      const xhr = (this.xhr = new XMLHttpRequest());
  
      // Note that your request may look different. It is up to you and your editor
      // integration to choose the right communication channel. This example uses
      // a POST request with JSON as a data structure but your configuration
      // could be different.
      xhr.open(
        "POST",
        // `https://snowy-cuboid-vulcanodon.glitch.me/api/post/upload`,
        `http://localhost:8080/api/v1/files/posts`,
        true
      );
  
      //set Authorization Token
      xhr.setRequestHeader(
        "Authorization",
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4OWI4MTVlNS01NzE1LTQwZTQtYjViMS1hNzZmNTA0OGU1ZDYiLCJpYXQiOjE2OTkxNDIzNjUsImV4cCI6MTY5OTE0NTk2NX0.X2DqVRVlxrM8CWPaTIsYPKHPSlpBC44M5zI-9it0kH4uuLXxEz5_Q82tHuYiHpgePnTRNZCJ8alyDqHbVnIQ4Q"
      );
  
      xhr.responseType = "json";
    }
  
    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject, file) {
      const { xhr } = this;
      const { loader } = this;
      const genericErrorText = `Couldn't upload file: ${file.name}.`;
  
      xhr.addEventListener("error", () => reject(genericErrorText));
      xhr.addEventListener("abort", () => reject());
      xhr.addEventListener("load", () => {
        const { response } = xhr;
        console.log(xhr);
        console.log({ response });
        // This example assumes the XHR server's "response" object will come with
        // an "error" which has its own "message" that can be passed to reject()
        // in the upload promise.
        //
        // Your integration may handle upload errors in a different way so make sure
        // it is done properly. The reject() function must be called when the upload fails.
        if (!response || response.error) {
          return reject(
            response && response.error ? response.error.message : genericErrorText
          );
        }
  
        // If the upload is successful, resolve the upload promise with an object containing
        // at least the "default" URL, pointing to the image on the server.
        // This URL will be used to display the image in the content. Learn more in the
        // UploadAdapter#upload documentation.
        // resolve({
        //   default: response.url
        // });
        resolve({
          default: response[0].fileLink
        });
      });
  
      // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
      // properties which are used e.g. to display the upload progress bar in the editor
      // user interface.
      if (xhr.upload) {
        xhr.upload.addEventListener("progress", (evt) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total;
            loader.uploaded = evt.loaded;
          }
        });
      }
    }
  
    // Prepares the data and sends the request.
    _sendRequest(file) {
      // Prepare the form data.
      const data = new FormData();
  
      data.append("mediaFiles", file);
  
      // Important note: This is the right place to implement security mechanisms
      // like authentication and CSRF protection. For instance, you can use
      // XMLHttpRequest.setRequestHeader() to set the request headers containing
      // the CSRF token generated earlier by your application.
  
      // Send the request.
      this.xhr.send(data);
    }
  }
  
  export default MyUploadAdapter;
  