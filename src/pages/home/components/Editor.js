import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { htmlToMarkdown, markdownToHtml } from "./Parser";
import uploadToCloudinary from "./upload";
import { GiCancel } from 'react-icons/gi';

export default function Editor(props) {
  const [value, setValue] = useState((props.data || ""))
  const reactQuillRef = useRef(null);

  const onChange = (content) => {
    setValue(content);

    if (props.editcontent) {
      props.editcontent(value)
    }
  };
  const cancel=()=>{
    props.cancel(true);
  }
  const Save=()=>{
    if(props.editcontent!=null)
        props.editcontent(value);
    else
      console.log(value)
    props.cancel(false);
  
  }
 
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await uploadToCloudinary(file);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
      }
    };
  }, []);

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
						onClick={cancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      placeholder="Start writing..."
      modules={{
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code-block",
      ]}
      value={value}
      onChange={onChange}
    />
<button style={{width:'90%',margin:'5px 32px',borderRadius:'10px'}} onClick={Save}>Lưu</button>
    </>
  );
}
