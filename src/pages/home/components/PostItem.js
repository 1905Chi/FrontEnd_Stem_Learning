import React, { useEffect } from 'react';
import './PostItem.css'; // Import tệp CSS
import { useState } from 'react';
import { Avatar, Button, Dropdown } from 'antd';
import { BiCommentDetail, BiSolidShare, BiLike } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdBugReport } from 'react-icons/md';
import CommentPost from './CommentPost';
import { EditOutlined } from '@ant-design/icons';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import Editor from './Editor';
import LabelFile from '../../profile/component/LabelFile';
import { toast } from 'react-toastify';
function PostItem({ user, content, likes, liked, index, type, refUrls, comment }) {
	const [isLiked, setIsLiked] = useState(liked); // Trạng thái ban đầu là "không thích"
	const [isEditPost, setisEditPost] = useState(false); // Trạng thái ban đầu là "không chỉnh sửa"
	const [contentPost, setContentPost] = useState(content);
	const [idComment, setIdComment] = useState(null);
	const [responseComement, setResponseComement] = useState(false);
	const [xemthem, setXemthem] = useState(false);

	function EditContentPost(value) {
		setContentPost(value);
	}

	function handleLike() {
		setIsLiked(!isLiked); // Đảo ngược trạng thái khi nút "like" được nhấn
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		let data = {};
		if (isLiked === false) {
			data = {
				post_id: index,
				type: 'LIKE',
			};
		} else {
			data = {
				post_id: index,
				type: 'DISLIKE',
			};
		}
		Api.post(url + 'reaction', data, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	const deletePost = () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		Api.delete(url + 'api/v1/posts/' + index, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					console.log(response.data.result);
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	function EditPost() {
		setisEditPost(!isEditPost); //
	}
	function openComment() {
		setResponseComement(!responseComement);
	}
	function repComent(id) {
		setIdComment(id);
		openComment();
	}
	function SeeMoreComent() {
		setXemthem(!xemthem);
	}
	useEffect(() => {
		const contentContainer = document.querySelector('.content' + index);
		const showMoreButton = document.querySelector('#show' + index);
		const showLessButton = document.querySelector('#less' + index);
		if (contentContainer && showMoreButton) {
			if (contentContainer.scrollHeight > 500) {
				showMoreButton.style.display = 'block';
				showLessButton.style.display = 'none';
			} else {
				showMoreButton.style.display = 'none';
			}
			if (contentContainer.scrollHeight < 500) {
				showLessButton.style.display = 'none';
			}
		}
	}, [contentPost]);
	const SeeMore = () => {
		const contentContainer = document.querySelector('.content' + index);
		const showMoreButton = document.querySelector('#show' + index);
		const showLessButton = document.querySelector('#less' + index);
		const post = document.querySelector('#post');

		if (contentContainer && showMoreButton) {
			if (contentContainer.scrollHeight > 500) {
				showMoreButton.style.display = 'none';
				showLessButton.style.display = 'block';
				contentContainer.style.height = 'auto';
				post.style.maxHeight = 'max-content';
			}
		}
		setXemthem(true);
	};
	const SeeLess = () => {
		const contentContainer = document.querySelector('.content' + index);
		const showLessButton = document.querySelector('#less' + index);
		const showMoreButton = document.querySelector('#show' + index);
		const post = document.querySelector('#post');
		if (contentContainer && showMoreButton) {
			if (contentContainer.scrollHeight > 500) {
				showMoreButton.style.display = 'block';
				showLessButton.style.display = 'none';
				contentContainer.style.height = '500px';
				post.style.maxHeight = '500px';
			}
		}
		setXemthem(false);
	};

	const items = [
		{
			key: '1',
			label: (
				<div style={{ font: '15px' }} onClick={deletePost}>
					{user.id === JSON.parse(localStorage.getItem('user')).id ? (
						<div>
							<RiDeleteBin6Fill style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Xóa bài đăng</span>
						</div>
					) : (
						<div>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo bài đăng</span>
						</div>
					)}
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div style={{ font: '15px' }} onClick={EditPost}>
					{user.id === JSON.parse(localStorage.getItem('user')).id ? (
						<div>
							<EditOutlined style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Chỉnh sửa bài đăng</span>
						</div>
					) : null}
				</div>
			),
		},
	];

	const likeButtonStyle = isLiked ? { color: 'blue' } : {}; // Đổi màu của biểu tượng "like"
	return (
		<div className="post-item">
			{isEditPost ? (
				<Editor
					cancel={EditPost}
					data={contentPost}
					editcontent={EditContentPost}
					index={index}
					type={type}
				></Editor>
			) : null}
			{responseComement ? (
				<Editor cancel={openComment} idComment={idComment}>
					{' '}
				</Editor>
			) : null}
			<div className="user-info">
				<div className="avatarPost" style={{ flex: 1, marginTop: '15px' }}>
					<Avatar
						src={user.avatar_url}
						onClick={() => {
							window.location.href = '/profile/' + user.id;
						}}
					/>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', flex: 9 }}>
					<a style={{ textDecoration: 'none', color: 'black' }}>
						<p className="user-name" style={{ fontWeight: 'bold' }}>
							{user.first_name + ' ' + user.last_name}
						</p>
					</a>
					<p className="user-name" style={{ display: 'block' }}>
						đã đăng {type === 'QUESTION' ? 'câu hỏi' : null} {type === 'POST' ? 'Bài viết' : null} trong
						nhóm
					</p>
				</div>
				<Dropdown
					menu={{
						items,
					}}
					placement="bottomRight"
					arrow={{
						pointAtCenter: true,
					}}
					style={{ border: 'none', flex: 1 }}
				>
					<Button style={{ color: 'black', backgroundColor: 'aliceblue', border: 'none', textAlign: 'end' }}>
						...
					</Button>
				</Dropdown>
			</div>
			<div className={'content-container content' + index}>
				<div className="post-content" dangerouslySetInnerHTML={{ __html: contentPost }} id="post" />

				<button className={'show-more-button'} id={'show' + index} onClick={SeeMore}>
					Xem thêm
				</button>
				<button className={'show-more-button'} id={'less' + index} onClick={SeeLess}>
					Thu gọn
				</button>
			</div>

			<div className="file-post">
				{refUrls &&
					refUrls.map((item, index) => {
						const indexAfterNumbers = item.indexOf('_') + 1;
						const truncatedFileName = item.slice(indexAfterNumbers);
						return <LabelFile key={index} type={'docx'} filename={truncatedFileName} />;
					})}
			</div>

			<p className="likes-count">{likes ? likes : 0} likes</p>
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

			{comment && comment.length > 0 && xemthem === false ? (
				<div>
					{comment && comment.length > 1 ? (
						<button className="comment-count" onClick={SeeMoreComent}>
							{' '}
							Xem thêm {comment.length - 1} bình luận
						</button>
					) : null}
					<div className="new-comment">
						<Avatar src={comment[comment.length - 1].author.avatar_url} />
						<div style={{ flex: 8 }}>
							<div className="content-comment">
								<p className="user-name" style={{ fontWeight: 'bold' }}>
									{comment[comment.length - 1].author.first_name +
										' ' +
										comment[comment.length - 1].author.last_name}
								</p>
								<div
									className="comment-content"
									dangerouslySetInnerHTML={{ __html: comment[comment.length - 1].content }}
								/>
							</div>
							<div className="react-post">
								<button>Thích</button>
								{/* //	<button onClick={repComent(comment[comment.length-1].content )}>Phản hồi</button> */}
								<button>Phản hồi</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
			{comment && comment.length > 0 && xemthem === true ? (
				<div>
					<button className="comment-count" onClick={SeeMoreComent}>
						{' '}
						Thu gọn
					</button>
					{comment.map((item, index) => (
						<div className="new-comment">
							<Avatar src={comment[comment.length - 1 - index].author.avatar_url} />
							<div style={{ flex: 8 }}>
								<div className="content-comment">
									<p className="user-name" style={{ fontWeight: 'bold' }}>
										{comment[comment.length - 1 - index].author.first_name +
											' ' +
											comment[comment.length - 1 - index].author.last_name}
									</p>
									<div
										className="comment-content"
										dangerouslySetInnerHTML={{
											__html: comment[comment.length - 1 - index].content,
										}}
									/>
								</div>
								<div className="react-post">
									<button>Thích</button>
									<button>Phản hồi</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : null}
			<CommentPost user={user} idPost={index} />
		</div>
	);
}

export default PostItem;
