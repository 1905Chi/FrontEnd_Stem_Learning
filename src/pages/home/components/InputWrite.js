import React, { useState } from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import pretty from "pretty";
import "./InputWrite.css";
import MyUploadAdapter from "./MyUploadAdapter";

function InputWrite({cancel}) {
  const [ckEditorOutput, setCkEditorOutput] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const toggleDisabled = () => setDisabled(!disabled);

  const handelInput = (event, editor) => {
    setCkEditorOutput(editor.getData());
  };
 
  const Save=()=>{
    console.log(ckEditorOutput);
    console.log(pretty(ckEditorOutput));
    cancel();
    
  }

  return (
    <div className="input-post-comment">
      <div className="main-input">
      <CKEditor
        editor={ClassicEditor}

        onChange={handelInput}
        disabled={disabled}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
            new MyUploadAdapter(loader);
        }}
        style={{width:'100%'}}
      />  
      <label>
        <input type="checkbox" onChange={toggleDisabled} style={{width:'2%'}} /> Disable 
      </label>
      <button style={{width:'90%',margin:'5px 32px',borderRadius:'10px'}} onClick={Save}>Lưu</button>
      
      </div>
    </div>
  );
}

export default InputWrite;
