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
function PostItem(props) {
	console.log(props);
	const [isLiked, setIsLiked] = useState(props.reaction !== null && props.reaction !== undefined ? true : false); // Trạng thái ban đầu là "không thích"
	const [isEditPost, setisEditPost] = useState(false); // Trạng thái ban đầu là "không chỉnh sửa"
	const [contentPost, setContentPost] = useState(props.content);
	const [idComment, setIdComment] = useState(null);
	const [responseComement, setResponseComement] = useState(false);
	const [xemthem, setXemthem] = useState(false);
	const [ListReaction, setListReaction] = useState([
		{
			key: '1',
			label: (
				<div style={{ font: '15px' }} onClick={handleLike}>
					haha
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div style={{ font: '15px' }} onClick={handleLike}>
					huhu
				</div>
			),
		},
	]);
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
				postId: props.id,
				typeName: 'LIKE',
			};
		} else {
			data = {
				postId: props.id,
				typeName: 'DISLIKE',
			};
		}
		Api.put(url + 'api/v1/reactions', data, { headers: headers })
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
		Api.delete(url + 'api/v1/posts/' + props.id, { headers: headers })
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
		const contentContainer = document.querySelector('.content' + props.id);
		const showMoreButton = document.querySelector('#show' + props.id);
		const showLessButton = document.querySelector('#less' + props.id);
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
		const contentContainer = document.querySelector('.content' + props.id);
		const showMoreButton = document.querySelector('#show' + props.id);
		const showLessButton = document.querySelector('#less' + props.id);
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
		const contentContainer = document.querySelector('.content' + props.id);
		const showLessButton = document.querySelector('#less' + props.id);
		const showMoreButton = document.querySelector('#show' + props.id);
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
					{props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
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
					{props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
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
					index={props.id}
					type={props.type}
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
						src={props.authorAvatar}
						onClick={() => {
							window.location.href = '/profile/' + props.authorId;
						}}
					/>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', flex: 9 }}>
					<a style={{ textDecoration: 'none', color: 'black' }}>
						<p className="user-name" style={{ fontWeight: 'bold' }}>
							{props.authorFirstName + ' ' + props.authorLastName}
						</p>
					</a>
					<p className="user-name" style={{ display: 'block' }}>
						đã đăng {props.type === 'QUESTION' ? 'Câu hỏi' : null}{' '}
						{props.type === 'POST' ? 'Bài viết' : null} trong nhóm
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
			<div className={'content-container content' + props.id}>
				<div className="post-content" dangerouslySetInnerHTML={{ __html: contentPost }} id="post" />

				<button className={'show-more-button'} id={'show' + props.id} onClick={SeeMore}>
					Xem thêm
				</button>
				<button className={'show-more-button'} id={'less' + props.id} onClick={SeeLess}>
					Thu gọn
				</button>
			</div>

			<div className="file-post">
				{props.refUrls &&
					props.refUrls.map((item, index) => {
						const indexAfterNumbers = item.indexOf('_') + 1;
						const truncatedFileName = item.slice(indexAfterNumbers);
						return <LabelFile key={index} type={'docx'} filename={truncatedFileName} />;
					})}
			</div>
			<div>
				<Dropdown
					menu={{
						items,
					}}
					placement="bottomRight"
					arrow={{
						pointAtCenter: true,
					}}
				>
					<Button style={{ backgroundColor: 'aliceblue', border: 'none' }}>
						{props.totalReactions} likes
					</Button>
				</Dropdown>
			</div>

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
					onClick={openComment}
				>
					<BiCommentDetail />
				</button>
			</div>

			{props.comments && props.comments.length > 0 && xemthem === false ? (
				<div>
					{props.comments && props.comments.length > 1 ? (
						<button className="comment-count" onClick={SeeMoreComent}>
							{' '}
							Xem thêm {props.comments.length - 1} bình luận
						</button>
					) : null}
					<div className="new-comment">
						<Avatar src={props.comments[props.comments.length - 1].authorAvatar} />
						<div style={{ flex: 8 }}>
							<div className="content-comment">
								<p className="user-name" style={{ fontWeight: 'bold' }}>
									{props.comments[props.comments.length - 1].authorFirstName +
										' ' +
										props.comments[props.comments.length - 1].authorLastName}
								</p>
								<div
									className="comment-content"
									dangerouslySetInnerHTML={{
										__html: props.comments[props.comments.length - 1].content,
									}}
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
			{props.comments && props.comments.length > 0 && xemthem === true ? (
				<div>
					<button className="comment-count" onClick={SeeMoreComent}>
						{' '}
						Thu gọn
					</button>
					{props.comments.map((item, index) => (
						<div className="new-comment">
							<Avatar src={props.comments[props.comments.length - 1 - index].authorAvatar} />
							<div style={{ flex: 8 }}>
								<div className="content-comment">
									<p className="user-name" style={{ fontWeight: 'bold' }}>
										{props.comments[props.comments.length - 1 - index].authorFirstName +
											' ' +
											props.comments[props.comments.length - 1 - index].authorLastName}
									</p>
									<div
										className="comment-content"
										dangerouslySetInnerHTML={{
											__html: props.comments[props.comments.length - 1 - index].content,
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
			<CommentPost user={props.authorAvatar} idPost={props.id} />
		</div>
	);
}

export default PostItem;
