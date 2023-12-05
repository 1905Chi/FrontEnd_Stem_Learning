import React, { useState } from "react";
import Editor from "../../home/components/Editor"
import "./QuestionGroup.css"
export default function QuestionGroup() {
    const [open, setOpen] = useState(false);
    const openEdttor = () => {
        setOpen(!open);
    }
    
    return (
        <div>
            <div className="question-group">
                <h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>Câu hỏi </h2>
                
                {open && <Editor cancel={openEdttor} type ="question" />}
                <button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>Đặt câu hỏi</button>
            </div>
        </div>
    )

}