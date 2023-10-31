import React from 'react';
import './PostItem.css'; // Import tệp CSS
import { useState } from 'react';
import { Avatar } from 'antd';
import { BiCommentDetail, BiSolidShare, BiLike } from 'react-icons/bi';
import xemthem from '../../../assets/images/xemthem.png';

function PostItem({ user, content, image, likes }) {
	const [isLiked, setIsLiked] = useState(false); // Trạng thái ban đầu là "không thích"

	function handleLike() {
		setIsLiked(!isLiked); // Đảo ngược trạng thái khi nút "like" được nhấn
	}
	let firstFourImage = [];
	if (image && image.length >= 4) {

		firstFourImage = [...image.slice(0, 3), xemthem];
	} else {
		firstFourImage = image;
	}

	const likeButtonStyle = isLiked ? { color: 'blue' } : {}; // Đổi màu của biểu tượng "like"
	return (
		<div className="post-item">
			<div className="user-info">
				<div className="avatarPost">
					<Avatar src={user.avatar} />
				</div>
				<p className="user-name"> {user.name} </p>
			</div>
			<p className="post-content"> {content} </p>
			<div className="image-post">
				{firstFourImage && firstFourImage.length > 0
					? firstFourImage.map((image, index) => (
						
							<img key={index} src={image} alt={`Image ${index + 1}`} className="post-image" />
					  ))
					: null}
				{image && image.length > 4 ? <div className="overlay"> <div className="overlay-content">
              +{image.length - 3} 
            </div></div> : null}
			</div>
			<div className='file-post'> 
			<div className='image-file'>

			</div>
			<div className='name-file'> 

			</div>

			</div>

			<p className="likes-count">
				{likes}
				likes
			</p>
			<div className="post-actions">
				<button
					style={{
						marginRight: '5px',
						fontSize: '22px',
						color: 'black',
						background: 'none',
					}}
					onClick={handleLike}
				>
					<BiLike style={likeButtonStyle} />
				</button>
				<button
					style={{
						marginRight: '5px',
						fontSize: '22px',
						color: 'black',
						background: 'none',
					}}
				>
					<BiCommentDetail />
				</button>
				<button style={{ fontSize: '22px', background: 'none', color: 'black' }}>
					<BiSolidShare />
				</button>
			</div>
		</div>
	);
}

export default PostItem;
