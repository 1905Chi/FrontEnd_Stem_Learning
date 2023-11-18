import React from 'react';
import './PostGroup.css';
import Editor from "../../home/components/Editor"
import { useState } from 'react';
export default function PostGroup() {
    const [open, setOpen] = useState(false);
    const openEdttor = () => {
        setOpen(!open);
    }
	return (
		<div>
			<div className="post-group">
				<h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>
					Bài viết{' '}
				</h2>
				{open && <Editor cancel={openEdttor} />}
				<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					Bài viết mới
				</button>
			</div>
		</div>
	);
}
