import EmojiInput from 'react-input-emoji';
import { BsImageFill } from 'react-icons/bs';
import { Avatar } from 'antd';
import { useState } from 'react';
import './CommentPost.css';
import {PiPaperPlaneRightFill} from 'react-icons/pi';
export default function CommentPost({user}) {
	const [emoji, setEmoji] = useState('');
	const [selectFileComent, setselectFileComent] = useState([]); // Danh sách các tệp đã chọn
	const handleEmojiChange = (text) => {
		setEmoji(text);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Xử lý dữ liệu đã nhập (emoji) ở đây
		console.log('Emoji đã chọn:', emoji);
		console.log('Tệp đã chọn:', selectFileComent);
	};
	const openAvatarPictureDialog = () => {
		document.getElementById('AvatarPictureInput').click();
	};

	const handleAvatarPictureChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const files = event.target.files;

		if (files.length > 0) {
			// Chuyển danh sách tệp đã chọn thành mảng và cập nhật selectFileComent
			const newSelectedFiles = [...selectFileComent, ...files];
			setselectFileComent(newSelectedFiles);

			// Đặt lại giá trị của trường input để cho phép người dùng chọn tiếp
			event.target.value = null;
		}
	};
	const handleDeleteFile = (index) => {
		setselectFileComent((prevselectFileComent) => {
			const newselectFileComent = [...prevselectFileComent];
			newselectFileComent.splice(index, 1); // Xóa file khỏi mảng
			return newselectFileComent;
		});
	};
	const ClearPost = () => {
		setEmoji('');
		setselectFileComent([]);
	};
	const checkFileExtension = (filename) => {
		// Lấy phần mở rộng của tệp
		const fileExtension = filename.split('.').pop().toLowerCase();

		// Kiểm tra xem phần mở rộng có phù hợp với loại tệp bạn muốn kiểm tra
		if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
			// Đây là một tệp ảnh
			return 'image';
		} else if (['doc', 'docx'].includes(fileExtension)) {
			// Đây là tệp Word
			return 'word';
		} else if (['ppt', 'pptx'].includes(fileExtension)) {
			// Đây là tệp PowerPoint
			return 'powerpoint';
		} else if (['pdf'].includes(fileExtension)) {
			// Đây là tệp pdf
			return 'pdf';
		} else {
			// Đây là một loại tệp khác
			return 'other';
		}
	};
    const handleFormSubmitComment = (e) => {
        e.preventDefault();
        // Xử lý dữ liệu đã nhập (emoji) ở đây
        console.log('Emoji đã chọn:', emoji);
        console.log('Tệp đã chọn:', selectFileComent);
    }

	return (
		<div className="comment-component">
			<div className="avatarPost-comment-self">
				<Avatar src={user.avatar} className='user-profile-comment'  />
			</div>
			<div className="write-commnent">
				<EmojiInput value={emoji} onChange={handleEmojiChange} placeholder="Viết bình luận ..." ></EmojiInput>
				<BsImageFill style={{ fontSize: '20px', color: 'blue',padding:'15px' }} onClick={openAvatarPictureDialog} />
                <PiPaperPlaneRightFill style={{ fontSize: '20px', color: 'blue',padding:'15px' }} onClick={handleFormSubmitComment} />
				<input
					style={{ display: 'none' }}
					type="file"
					accept="image/*, application/pdf , .doc, .docx, application/vnd.ms-powerpoint, .ppt, .pptx"
					onChange={handleAvatarPictureChange}
					id="AvatarPictureInput"
				/>
			</div>
		</div>
	);
}
