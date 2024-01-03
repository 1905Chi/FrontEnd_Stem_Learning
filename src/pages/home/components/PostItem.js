import React, { useEffect } from 'react';
import './PostItem.css'; // Import tệp CSS
import { useState } from 'react';
import { Avatar, Button, Dropdown,Popconfirm  } from 'antd';
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
import {ueseSelector, useDispatch} from 'react-redux'
import {selectselctPostHome, deleteRaction} from '../../../redux/Group'
import { deletequestionChoose } from '../../../redux/Exam';
import { useNavigate } from 'react-router-dom';
function PostItem(props) {
	const navigate = useNavigate();
	console.log(props)
	const dispatch = useDispatch()
	const [myReaction, setMyReaction] = useState(props.reaction);
	const [isLiked, setIsLiked] = useState(
		props.reaction !== null &&
			props.reaction !== undefined &&
			(props.reaction === 'LIKE' || props.reaction.type === 'LIKE')
			? true
			: false
	); // Trạng thái ban đầu là "không thích"
	const [isEditPost, setisEditPost] = useState(false); // Trạng thái ban đầu là "không chỉnh sửa"
	const [contentPost, setContentPost] = useState(null);
	console.log("contentPost",props.content)
	const [idComment, setIdComment] = useState(null);
	const [responseComement, setResponseComement] = useState(false);
	const [xemthem, setXemthem] = useState(false);
	const [countReaction, setCountReaction] = useState(null);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
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
		if(localStorage.getItem('user')===null )
		{
			toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
			return;
		}
		else if(props.id === null || props.id === undefined)
		{	
			toast.error('Không thể thực hiện chức năng này bên ngoài nhóm/lớp');
			return;

		}
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		let data
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
		if (myReaction) {
			Api.put(url + `api/v1/reactions` , data,{ headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success(response.data.message);
						setCountReaction(response.data.result.count);
						props.callBackApi()
						setMyReaction(null);
					} else {
						console.log(response.error);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			Api.put(url + 'api/v1/reactions', data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success(response.data.message);
						setCountReaction(response.data.result.count);
						setMyReaction(response.data.result.reaction);
						props.callBackApi()
						
					} else {
						console.log(response.error);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		setIsLiked(!isLiked); // Đảo ngược trạng thái khi nút "like" được nhấn
	}

	const deletePost = () => {
		setConfirmLoading(true);
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		Api.delete(url + 'api/v1/posts/' + props.id, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setConfirmLoading(false);
					setOpen(false)

					props.callBackApi()
					if(props.homePosts)
					{
						props.homePosts();
					}
					
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
		if(localStorage.getItem('user')===null)
		{
			toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
			return;
		}
		if(props.id === null || props.id === undefined)
		{
			toast.error('Không thể thực hiện chức năng này bên ngoài nhóm/lớp');
			return;
		}
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
		if (props.content !== null && props.content !== undefined) {
			setContentPost(props.content);
		}
		if (props.reaction !== null && props.reaction !== undefined) {
			setMyReaction(props.reaction);
		}
		if (props.totalReactions !== null && props.totalReactions !== undefined) {
			setCountReaction(props.totalReactions);
		}
		
	}, [props.content ]);
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
	const handleOpenConfirm = () => {
		setOpen(true);
	  };
	
	  const handleCancel = () => {
		setOpen(false);
	  };
	const items = [
		{
			key: '1',
			label: (
				<div style={{ font: '15px' }}>
					{JSON.parse(localStorage.getItem('user')) && props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
						
						<div onClick={deletePost}>
							<RiDeleteBin6Fill style={{ color: 'red', fontSize: '15px' }}  />
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
					{JSON.parse(localStorage.getItem('user')) && props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
						<div>
							<EditOutlined style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Chỉnh sửa bài đăng</span>
						</div>
					) : null}
				</div>
			),
		},
	];
	const getTypes = (filename) => {
		const parts = filename.split('.');

		// Lấy phần mở rộng của tệp từ phần tử cuối cùng của mảng
		const fileExtension = parts[parts.length - 1];

		// Chuyển đổi phần mở rộng thành chữ thường để so sánh dễ dàng hơn
		const lowerCaseExtension = fileExtension.toLowerCase();

		// Kiểm tra loại file và trả về kết quả tương ứng
		console.log(lowerCaseExtension);
		switch (lowerCaseExtension) {
			case 'pdf':
				return 'pdf';
			case 'docx':
				return 'docx';
			// Thêm các loại file khác nếu cần thiết
			case 'doc':
				return 'doc';
			case 'ppt':
				return 'ppt';
			case 'pptx':
				return 'pptx';
			default:
				return 'other';
		}
	};
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
					homePosts={props.homePosts}
					
				></Editor>
			) : null}
			{responseComement ? (
				<Editor cancel={openComment} idComment={idComment} homePosts={props.homePosts}>
					
				</Editor>
			) : null}
			<div className="user-info">
				<div className="avatarPost" style={{ flex: 1, marginTop: '15px' }}>
					<Avatar
						src={props.authorAvatar}
						onClick={() => {
							if(localStorage.getItem('user')===null)
							{
								toast.error('Bạn cần đăng nhập để xem thông tin người dùng này');
								return;
							}
							  navigate('/profile/' + props.authorId);
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
						đã đăng {props.type === 'QUESTION' ? 'Câu hỏi ' : null}
						{props.type === 'POST' && props.content!== null && props.content !== undefined  && props.content!=='' ? 'bài viết ' : null} 
						{props.type === 'POST' && props.content === '' ?  'tài liệu ': null}
						trong nhóm
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
					<Button style={{ color: 'black', backgroundColor: 'white', border: 'none', textAlign: 'end' }}>
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
				{props?.refUrls && props.refUrls.length > 0 && props.refUrls !== null
					? props.refUrls.map((item, index) => {
							if (item !== null) {
								
								const indexAfterNumbers = item.indexOf('_') + 1;
								const truncatedFileName = item.slice(indexAfterNumbers);
								console.log(truncatedFileName)
								console.log(getTypes(truncatedFileName))
								return <LabelFile key={index} type={getTypes(truncatedFileName)} filename={truncatedFileName} link={item} />;
							}
							return null;
					  })
					: null}
			</div>
			<div>
				
					<Button style={{ backgroundColor: 'white', border: 'none' }}>{countReaction} likes</Button>
				
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
							
							Xem thêm {props.comments.length - 1} bình luận
						</button>
					) : null}
					<div className="new-comment">
						<Avatar src={props.comments[props.comments.length - 1].authorAvatar} />
						<div style={{ flex: 8 }}>
							<div className="content-comment">
								<p className="user-name" style={{ fontWeight: 'bold' }}>
									{props.comments[0].authorFirstName +
										' ' +
										props.comments[0].authorLastName}
								</p>
								<div
									className="comment-content"
									dangerouslySetInnerHTML={{
										__html: props.comments[0].content,
									}}
								/>
							</div>
							<div className="react-post">
								{/* <button>Thích</button>
								
								<button>Phản hồi</button> */}
							</div>
						</div>
					</div>
				</div>
			) : null}
			{props.comments && props.comments.length > 0 && xemthem === true ? (
				<div>
					<button className="comment-count" onClick={SeeMoreComent}>
						
						Thu gọn
					</button>
					{props.comments.map((item, index) => (
						<div className="new-comment">
							<Avatar src={props.comments[index].authorAvatar} />
							<div style={{ flex: 8 }}>
								<div className="content-comment">
									<p className="user-name" style={{ fontWeight: 'bold' }}>
										{props.comments[index].authorFirstName +
											' ' +
											props.comments[index].authorLastName}
									</p>
									<div
										className="comment-content"
										dangerouslySetInnerHTML={{
											__html: props.comments[index].content,
										}}
									/>
								</div>
								{/* <div className="react-post">
									<button>Thích</button>
									<button>Phản hồi</button>
								</div> */}
							</div>
						</div>
					))}
				</div>
			) : null}
			<div style={{width:'75%'}}>
			<CommentPost user={props.authorAvatar} idPost={props.id}  homePosts={props.homePosts}/>
			</div>
		</div>
	);
}

export default PostItem;
