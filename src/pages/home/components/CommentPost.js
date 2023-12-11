import EmojiInput from 'react-input-emoji';
import { BsImageFill } from 'react-icons/bs';
import { Avatar } from 'antd';
import { useState } from 'react';
import {Input } from 'antd';
import './CommentPost.css';
import {PiPaperPlaneRightFill} from 'react-icons/pi';
import Editor from './Editor';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
export default function CommentPost({user,idPost}) {

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
						idPost={idPost}
						
					/>
				) : (
					null
				)}
		
		<div className="comment-component">
			<div className="avatarPost-comment-self">
				<Avatar src={user} className='user-profile-comment'  />
			</div>
			
				
			
			<div className="input-comment">
				<Input placeholder="Viết bình luận" className="input-comment-self"  style={{width:'450px',margin:'10px 35px',borderRadius:'15px'}} onClick={openEditor}/>
				</div>
		
		</div>
		</>
	);
}
