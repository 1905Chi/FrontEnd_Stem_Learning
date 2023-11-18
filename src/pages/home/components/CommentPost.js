import EmojiInput from 'react-input-emoji';
import { BsImageFill } from 'react-icons/bs';
import { Avatar } from 'antd';
import { useState } from 'react';
import {Input } from 'antd';
import './CommentPost.css';
import {PiPaperPlaneRightFill} from 'react-icons/pi';
import Editor from './Editor';
export default function CommentPost({user}) {

	const [value, setValue] = useState('');
	const [showEditor, setShowEditor] = useState(false);
const openEditor = () => {
		setShowEditor(true);
		

	}
	const closeEditor = (e) => {
		setShowEditor(false);
		
	}
	return (
		<>
		{showEditor ? (
					<Editor
						data={value}
						cancel={closeEditor}
						editcontent={setValue}
					/>
				) : (
					null
				)}
		
		<div className="comment-component">
			<div className="avatarPost-comment-self">
				<Avatar src={user.avatar} className='user-profile-comment'  />
			</div>
			
				
			
			<div className="input-comment">
				<Input placeholder="Viết bình luận" className="input-comment-self"  style={{width:'450px',margin:'10px 35px',borderRadius:'10px'}} onClick={openEditor}/>
				</div>
		
		</div>
		</>
	);
}
