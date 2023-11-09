// Based on: https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html

import React from "react";

import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import pretty from "pretty";
import { GiCancel } from 'react-icons/gi';
import "./InputWrite.css";
import MyUploadAdapter from "./MyUploadAdapter";

export default class InputWrite extends React.Component {
 
  constructor(props) {
    super(props);

    // Truyền các tham số từ props vào trong constructor
   this.state = {
      ckEditorOutput: null,
      disabled: false,      
      data: this.props.data,
      editcontent: this.props.editcontent,
      cancel: this.props.cancel,
    };
  }
  _cancel = () => {
    this.state.cancel(false);
  }
  _editcontent=()=>{
    this.state.editcontent(this.state.ckEditorOutput);
  }
  _toggleDisabled = () => this.setState({ disabled: !this.state.disabled });

  _handleCKEditorChanges = (event, editor) =>
    this.setState({ ckEditorOutput: editor.getData() });
  _Save=()=>{
    if(this.state.editcontent!=null)
       this._editcontent();
    


    this._cancel();
  }
  

  render() {
    const { ckEditorOutput, disabled, datafirst ,data,editcontent,cancel} = this.state;

    return (
      <>
        
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					
					<button
						style={{  height: '72.5px', backgroundColor: 'aliceblue', textAlign: 'end' }}
						onClick={this._cancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
        <div style={{backgroundColor:'aliceblue'}}>
        <CKEditor
          className="ck-editor"
          editor={ClassicEditor}
          onChange={this._handleCKEditorChanges}
          disabled={disabled}
          data={data}
         
          
        />
        <label>
          <input type="checkbox" onChange={this._toggleDisabled} style={{width:'10px'}}/>
          Disable
        </label>
        <button style={{width:'90%',margin:'5px 32px',borderRadius:'10px'}} onClick={this._Save}>Lưu</button>
        </div>
      </>
    );
  }
}
