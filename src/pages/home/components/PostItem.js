import React, { useEffect } from 'react';
import './PostItem.css'; // Import tệp CSS
import { Input } from 'antd';
import { useState } from 'react';
import { Avatar, Button, Dropdown, Popconfirm } from 'antd';
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
import { ueseSelector, useDispatch } from 'react-redux';
import { selectselctPostHome, deleteRaction } from '../../../redux/Group';
import { deletequestionChoose } from '../../../redux/Exam';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Title } from '@material-ui/icons';
function PostItem(props) {
	const navigate = useNavigate();
	console.log(props);
	const dispatch = useDispatch();
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
	console.log('contentPost', props.content);
	const [idComment, setIdComment] = useState(null);
	const [responseComement, setResponseComement] = useState(false);
	const [xemthem, setXemthem] = useState(false);
	const [countReaction, setCountReaction] = useState(null);
	const [open, setOpen] = useState(false);
	const [opentModelDeletecmt, setOpentModelDeletecmt] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Bạn có chắc muốn xóa bài đăng này?');
	const [showEditorRepcmt, setShowEditorRepcmt] = useState(
		Array(props.comments ? props.comments.length : 0).fill(false)
	);
	const [idCmtDelete, setIdCmtDelete] = useState(null);
	const [selectedReport, setSelectedReport] = useState(null);
	const [opentReport, setOpentReport] = useState(false);
	const [reportTo, setReportTo] = useState(null);
	const [inforReport,setInforReport ] = useState(null);
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
	function RepComent(index) {
		const newShowEditorRepcmt = [...showEditorRepcmt];
		// Nếu Editor đang được hiển thị cho comment này, ẩn nó; nếu không, hiển thị nó
		newShowEditorRepcmt[index] = !newShowEditorRepcmt[index];
		setShowEditorRepcmt(newShowEditorRepcmt);
	}

	function handleLike() {
		if (localStorage.getItem('user') === null) {
			toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
			return;
		} else if (props.id === null || props.id === undefined) {
			toast.error('Không thể thực hiện chức năng này bên ngoài nhóm/lớp');
			return;
		}
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		let data;
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
			Api.put(url + `api/v1/reactions`, data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success(response.data.message);
						setCountReaction(response.data.result.count);
						props.callBackApi();
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
						props.callBackApi();
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
					setOpen(false);

					props.callBackApi();
					if (props.homePosts) {
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
		if (localStorage.getItem('user') === null) {
			toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
			return;
		}
		if (props.id === null || props.id === undefined) {
			toast.error('Không thể thực hiện chức năng này bên ngoài nhóm/lớp');
			return;
		}
		setResponseComement(!responseComement);
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
	}, [props.content]);
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
		setOpentModelDeletecmt(false);
		setOpentReport(false);
	};

	const items = [
		{
			key: '1',
			label: (
				<div style={{ font: '15px' }}>
					{JSON.parse(localStorage.getItem('user')) &&
					props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
						<div
							onClick={() => {
								setOpen(true);
							}}
						>
							<RiDeleteBin6Fill style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Xóa bài đăng</span>
						</div>
					) : (
						<div
							onClick={() => {
								setOpentReport(true);
								setReportTo('Báo cáo bài đăng');
								setSelectedReport(null);
							}}
						>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo bài đăng cho quản trị viên</span>
						</div>
					)}
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div style={{ font: '15px' }}>
					{JSON.parse(localStorage.getItem('user')) &&
					props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
						<div onClick={EditPost}>
							<EditOutlined style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Chỉnh sửa bài đăng</span>
						</div>
					) : (
						<div
							onClick={() => {
								setOpentReport(true);
								setReportTo('Báo cáo bài đăng');
								setSelectedReport(null);
							}}
						>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo bài đăng </span>
						</div>
					)}
				</div>
			),
		},
	];
	const reportContent = [
		{
			key: '1',
			reportContent: 'Ảnh khỏa thân hoặc nội dung khiêu dâm',
			information: `Hoạt động tình dục
			Bán hoặc mua dâm
			Nhũ hoa (trừ trường hợp đang cho con bú, liên quan đến sức khỏe và hành động phản đối)
			Ảnh khỏa thân hiển thị bộ phận sinh dục
			Ngôn ngữ khiêu dâm`,
			treeReportContent: [
				{
					key: '1',
					reportContent: 'Ảnh khỏa thân người lớn',
				},
				{
					key: '2',
					reportContent: 'Ảnh khỏa thân trẻ em',
				},
				{
					key: '3',
					reportContent: 'Nội dung khiêu dâm',
				},
				{
					key: '4',
					reportContent: 'Gợi dục',
				},
				{
					key: '5',
					reportContent: 'Dịch vụ tình dục',
				},
			],
		},
		{
			key: '2',
			reportContent: 'Spam',
			information: `Mua, bán hay tặng tài khoản, vai trò hoặc quyền
			Khuyến khích mọi người tương tác với nội dung sai sự thật
			Dùng liên kết gây hiểu nhầm để chuyển mọi người từ Facebook đến nơi khác`,
			treeReportContent: [],
		},
		{
			key: '3',
			reportContent: 'Bán hàng trái phép',
			information: `Đây là trang web học tập ,chúng tôi không cho phép cá nhân , tổ chức nào kinh doanh bất hợp pháp
			trên nền tảng này`,
			treeReportContent: [],
		},
		{
			key: '4',
			reportContent: 'Bạo lực hoặc tự tử',
			information: `Chúng tôi chỉ gỡ những nội dung vi phạm Tiêu chuẩn cộng đồng của mình, chẳng hạn như:
			Đe dọa sử dụng bạo lực
			Ví dụ: nhắm mục tiêu một người và nhắc đến vũ khí cụ thể
			Cá nhân hoặc tổ chức nguy hiểm
			Ví dụ: chủ nghĩa khủng bố hoặc một tổ chức tội phạm
			Hình ảnh cực kỳ bạo lực
			Ví dụ: tôn vinh bạo lực hoặc tán dương sự đau khổ
			Một loại bạo lực khác
			Ví dụ: hình ảnh hoặc nội dung khác gây khó chịu`,
			treeReportContent: [
				{
					key: '1',
					reportContent: 'Hình ảnh bạo lực',
				},
				{
					key: '2',
					reportContent: 'Tử vong hoặc bị thương nặng',
				},
				{
					key: '3',
					reportContent: 'Mối đe dọa bạo lực',
				},
				{
					key: '4',
					reportContent: 'Ngược đãi động vật',
				},
				{
					key: '5',
					reportContent: 'Bạo lực tình dục',
				},
				{
					key: '6',
					reportContent: 'Vấn đề khác',
				},
			],
		},
		{
			key: '5',
			reportContent: 'Thông tin sai sự thật',
			information: `Chúng tôi chỉ gỡ những nội dung vi phạm Tiêu chuẩn cộng đồng của mình, chẳng hạn như:
			Thông tin sai sự thật
			Ví dụ: thông tin sai về COVID-19
			Thông tin sai sự thật khác
			Ví dụ: thông tin sai về sự kiện nổi bật khác`,
			treeReportContent: [
				{
					key: '1',
					reportContent: 'Sức khỏe',
				},
				{
					key: '2',
					reportContent: 'Chính trị',
				},
				{
					key: '3',
					reportContent: 'Kiến thức',
				},
				{
					key: '4',
					reportContent: 'Vấn đề khác',
				},
			],
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
	const [value, setValue] = useState('');

	const [showEditor, setShowEditor] = useState(false);
	const openEditor = () => {
		if (localStorage.getItem('user') === null) {
			toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
			return;
		} else if (props.id === null || props.id === undefined) {
			toast.error('Bạn không thể thực hiện chức năng này ngoài nhóm /lớp');
			return;
		} else {
			setShowEditor((setShowEditor) => !showEditor);
		}
	};
	const closeEditor = (e) => {
		setShowEditor(false);
	};
	const deleteComent = () => {
		console.log('deleteComent' + idCmtDelete);
		setConfirmLoading(true);
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		Api.delete(url + 'api/v1/comments/' + idCmtDelete, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setConfirmLoading(false);
					setOpentModelDeletecmt(false);
					props.homePosts();
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				toast.error('Xóa bình luận không thành công');
				console.log(error);
			})
			.finally(() => {
				setConfirmLoading(false);
				setOpentModelDeletecmt(false);
			});
	};
	function Comment({ comment }) {
		const [replyIndex, setReplyIndex] = useState(null); // State để lưu vị trí được chọn
		const [showEditor, setShowEditor] = useState(false); // State để kiểm soát việc hiển thị Editor
		// Hàm để xử lý khi bấm phản hồi
		const handleReplyClick = (index, id) => {
			setReplyIndex(index === replyIndex ? null : index);
			setShowEditor(true);
		};
		// Hàm để tắt Editor khi bấm vào ô khác
		const handleOutsideClick = () => {
			setShowEditor(false);
			setReplyIndex(null);
		};
		return (
			<div className="comment">
				<div className="new-comment">
					{props.comments[0].authorAvatar !== null && props.comments[0].authorAvatar !== '' ? (
						<Avatar src={props.comments[0].authorAvatar} />
					) : (
						<Avatar icon={<UserOutlined style={{ height: '3em' }} />} />
					)}
					<div style={{ flex: 8 }}>
						<div style={{ display: 'flex' }}>
							<div className="content-comment">
								<p className="user-name" style={{ fontWeight: 'bold' }}>
									{comment.authorFirstName} {comment.authorLastName}
								</p>
								<div
									className="comment-content"
									dangerouslySetInnerHTML={{
										__html: comment.content,
									}}
								/>
							</div>
							<DropdownMenu id={comment.authorId} idcmt={comment.id} />
						</div>
						<div className="react-post">
							<button>Thích</button>

							<button onClick={() => handleReplyClick(0)}>Phản hồi</button>
						</div>
						{replyIndex === 0 && showEditor ? (
							<div>
								<Editor
									data={value}
									cancel={() => setShowEditor(false)}
									editcontent={setValue}
									idComment={comment.id}
									homePosts={props.homePosts}
								/>
							</div>
						) : null}
					</div>
				</div>

				{comment.subComments && comment.subComments.length > 0 && (
					<div className="sub-comments">
						{comment.subComments.map((subComment) => (
							<Comment key={subComment.id} comment={subComment} />
						))}
					</div>
				)}
			</div>
		);
	}

	const deleteCmt = (id) => {
		setOpentModelDeletecmt(true);
		setIdCmtDelete(id);
	};
	function DropdownMenu({ id, idcmt }) {
		const itemsCmt = [
			{
				key: '1',
				label: (
					<div style={{ fontSize: '15px' }}>
						{JSON.parse(localStorage.getItem('user')) &&
						id === JSON.parse(localStorage.getItem('user')).id ? (
							<div
								onClick={() => {
									deleteCmt(idcmt);
								}}
							>
								<RiDeleteBin6Fill style={{ color: 'red', fontSize: '15px' }} />
								<span style={{ fontSize: '15px' }}>Xóa bình luận</span>
							</div>
						) : (
							<div>
								<MdBugReport style={{ color: 'red' }} />
								<span style={{ fontSize: '15px' }}>Báo cáo bình luận</span>
							</div>
						)}
					</div>
				),
			},
			{
				key: '2',
				label: (
					<div style={{ fontSize: '15px' }} onClick={EditPost}>
						{JSON.parse(localStorage.getItem('user')) &&
						id === JSON.parse(localStorage.getItem('user')).id ? (
							<div>
								<EditOutlined style={{ color: 'red', fontSize: '15px' }} />
								<span style={{ fontSize: '15px' }}>Chỉnh sửa bình luận</span>
							</div>
						) : null}
					</div>
				),
			},
		];

		const handleMenuClick = ({ key }) => {
			// Handle menu item click here
			console.log(key);
		};

		return (
			<div className="dropdown">
				<Dropdown
					overlay={
						<Menu onClick={handleMenuClick}>
							{itemsCmt.map((item) => (
								<Menu.Item key={item.key}>{item.label}</Menu.Item>
							))}
						</Menu>
					}
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
		);
	}

	const handleReportSelect = (report) => {
		setInforReport(null);
		setSelectedReport(report);
		if(report.treeReportContent.length === 0){
			setInforReport(report.reportContent);
		}
	};

	const rePort = () => {
		console.log('rePort');
	};
	return (
		<div className="post-item">
			<Modal
				title="Thông báo"
				open={open}
				onOk={deletePost}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<p>{modalText}</p>
			</Modal>
			<Modal
				title="Thông báo"
				open={opentModelDeletecmt}
				onOk={deleteComent}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<p>"Bạn có muốm xóa bình luận này"</p>
			</Modal>
			<Modal
				title={reportTo}
				open={opentReport}
				onOk={rePort}
				okButtonProps={{ disabled: !inforReport }}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<h3>Chọn lý do báo cáo:</h3>
				{reportContent.map((report) => (
					<div key={report.key}>
						<Button onClick={() => handleReportSelect(report)} style={{ backgroundColor: selectedReport && selectedReport.key === report.key ? '#1890ff' : '',marginBottom:'1em' }}>{report.reportContent}</Button>
						
					</div>
				))}
				{
					selectedReport !== null ? (
						<div>
							<h4>Thêm thông tin:</h4>
							<button>{selectedReport.reportContent} </button>
							<p>{selectedReport.information}</p> <br />
							{selectedReport.treeReportContent !== null && selectedReport.treeReportContent.map((subReport) => (
								<Button key={subReport.key} onClick={() =>{setInforReport(subReport.reportContent)}} style={{ backgroundColor: inforReport === subReport.reportContent ? '#1890ff' : '',marginBottom:'1em'  }}>
									{subReport.reportContent}
								</Button>
							))}
						</div>
					): null
				}
			</Modal>

			{/* {responseComement ? (
				<Editor cancel={openComment} idComment={idComment} homePosts={props.homePosts}></Editor>
			) : null} */}
			<div className="user-info">
				<div className="avatarPost" style={{ flex: 1, marginTop: '15px' }}>
					{props.authorAvatar !== null && props.authorAvatar !== '' ? (
						<Avatar
							src={props.authorAvatar}
							onClick={() => {
								if (localStorage.getItem('user') === null) {
									toast.error('Bạn cần đăng nhập để xem thông tin người dùng này');
									return;
								}
								navigate('/profile/' + props.authorId);
							}}
						/>
					) : (
						<Avatar
							icon={<UserOutlined style={{ height: '3em' }} />}
							onClick={() => {
								if (localStorage.getItem('user') === null) {
									toast.error('Bạn cần đăng nhập để xem thông tin người dùng này');
									return;
								}
								navigate('/profile/' + props.authorId);
							}}
						/>
					)}
				</div>
				<div style={{}} className="infor-author">
					<a style={{ textDecoration: 'none', color: 'black' }}>
						<p className="user-name" style={{ fontWeight: 'bold' }}>
							{props.authorFirstName + ' ' + props.authorLastName}
						</p>
					</a>
					<p className="user-name" style={{ display: 'block' }}>
						đã đăng {props.type === 'QUESTION' ? 'Câu hỏi ' : null}
						{props.type === 'POST' &&
						props.content !== null &&
						props.content !== undefined &&
						props.content !== ''
							? 'bài viết '
							: null}
						{props.type === 'POST' && props.content === '' ? 'tài liệu ' : null}
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
				{isEditPost ? (
					<Editor
						cancel={EditPost}
						data={contentPost}
						editcontent={EditContentPost}
						index={props.id}
						type={props.type}
						homePosts={props.homePosts}
					></Editor>
				) : (
					<div className="post-content" dangerouslySetInnerHTML={{ __html: contentPost }} id="post" />
				)}
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
								console.log(truncatedFileName);
								console.log(getTypes(truncatedFileName));
								return (
									<LabelFile
										key={index}
										type={getTypes(truncatedFileName)}
										filename={truncatedFileName}
										link={item}
									/>
								);
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
					onClick={openEditor}
				>
					<BiCommentDetail />
				</button>
			</div>
			<div style={{ width: '100%' }}>
				{/* <CommentPost user={props.authorAvatar} idPost={props.id} homePosts={props.homePosts} /> */}
				{showEditor ? (
					<Editor
						data={value}
						cancel={closeEditor}
						editcontent={setValue}
						idPost={props.id}
						homePosts={props.homePosts}
						style={{ marginTop: '10px' }}
					/>
				) : null}

				{/* <div className="comment-component">
					<div className="avatarPost-comment-self">
						{props.authorAvatar!== null && props.authorAvatar!=="" ? (
							<Avatar src={props.authorAvatar} className="user-profile-comment" />
						):(
							<Avatar
							icon={<UserOutlined style={{height:'3em'}} />}
						/>
						)}
						
					</div>

					<div className="input-comment">
						<Input
							placeholder="Viết bình luận"
							className="input-comment-self"
							style={{ width: '100%', margin: '10px 35px', borderRadius: '15px' }}
							onClick={openEditor}
						/>
					</div>
				</div> */}
			</div>

			{props.comments && props.comments.length > 0 && xemthem === false ? (
				<div>
					{props.comments && props.comments.length > 1 ? (
						<button className="comment-count" onClick={SeeMoreComent}>
							Xem thêm bình luận
						</button>
					) : null}
					<div className="new-comment">
						<Comment key={props.comments[0].id} comment={props.comments[0]} />

						{/* {props.comments[0].authorAvatar !== null && props.comments[0].authorAvatar !== '' ? (
							<Avatar src={props.comments[0].authorAvatar} />
						) : (
							<Avatar icon={<UserOutlined style={{ height: '3em' }} />} />
						)}

						<div style={{ flex: 8 }}>
							<div className="content-comment">
								<p className="user-name" style={{ fontWeight: 'bold' }}>
									{props.comments[0].authorFirstName + ' ' + props.comments[0].authorLastName}
								</p>
								<div
									className="comment-content"
									dangerouslySetInnerHTML={{
										__html: props.comments[0].content,
									}}
								/>
							</div>
							<div className="react-post">
								<button>Thích</button>

								<button onClick={() => RepComent(0)}>Phản hồi</button>
							</div>
							
							{showEditorRepcmt[0] ? (
								<div>
									<Editor
										data={value}
										cancel={RepComent}
										editcontent={setValue}
										idComment={props.comments[0].id}
										homePosts={props.homePosts}
									/>
								</div>
							) : null}
						</div> */}
					</div>
				</div>
			) : null}
			{props.comments && props.comments.length > 0 && xemthem === true ? (
				<div className="comment">
					<button className="comment-count" onClick={SeeMoreComent}>
						Thu gọn
					</button>
					{props.comments.map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))}
					{/* {props.comments.map((item, index) => (
						<div className="new-comment">
							{props.comments[index].authorAvatar !== null &&
							props.comments[index].authorAvatar !== '' ? (
								<Avatar src={props.comments[index].authorAvatar} />
							) : (
								<Avatar icon={<UserOutlined style={{ height: '3em' }} />} />
							)}
							
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
								<div className="react-post">
									<button>Thích</button>
									<button onClick={() => RepComent(index)}>Phản hồi</button>
								</div>
								{showEditorRepcmt[index] ? (
									<div>
										<Editor
											data={value}
											cancel={RepComent}
											editcontent={setValue}
											idComment={props.comments[index].id}
											homePosts={props.homePosts}
										/>
									</div>
								) : null}
							</div>
						</div>
					))} */}
				</div>
			) : null}
		</div>
	);
}

export default PostItem;
