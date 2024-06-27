import React, { useEffect } from 'react';
import './PostGroup.css';
import Editor from '../../home/components/Editor';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import PostItem from './../../home/components/PostItem';
import { useSelector,useDispatch } from 'react-redux';
import { selectSelectedPostGroup , selectedSurveyGroup} from '../../../redux/Group';
export default function PostGroup() {
	const [open, setOpen] = useState(false);
	const postgroup = useSelector(selectSelectedPostGroup);
	console.log(postgroup);
	const [post, setPost] = useState([]);
	const dispatch = useDispatch();

	// const fetchPostGroup = async () => {
	// 	const headers = {
	// 		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	// 		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	// 	};
	// 	Api.get(url + 'group/' + uuid + '/posts', { headers })

	// 		.then(async (response) => {
	// 			if (response.data.statusCode === 200) {
	// 				console.log(response.data.postsWithAuthor);
	// 				setPost(response.data.postsWithAuthor);
	// 			}
	// 		})
	// 		.catch(async (error) => {
	// 			if (error.response) {
	// 				// lỗi khi access token hết hạn
	// 			} else if (error.request) {
	// 				// Lỗi không có phản hồi từ máy chủ
	// 			} else {
	// 				// Lỗi trong quá trình thiết lập yêu cầu
	// 			}
	// 		})
	// 		.finally(() => {});
	// };
	// useEffect(() => {
	// 	fetchPostGroup();
	// }, []);

	const openEdttor = () => {
		setOpen(!open);
	};
	const { uuid } = useParams();
	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};

	const callBackApi = () => {
		Api.get(url + 'api/v1/posts?' + 'groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectedSurveyGroup(response.data.result));
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		}


	return (
		<div>
			<div className="post-group">
				<h2 style={{ textAlign: 'center', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>
					Bài viết
				</h2>
				{open && <Editor cancel={openEdttor} type="POST" />}
				{!open ?<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					<strong>Bài viết mới</strong>
				</button>:<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					<strong>Hủy</strong>
				</button>}
				{/* <button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					<strong>Bài viết mới</strong>
				</button> */}
			</div>
			<div className="post-group__list">
				{postgroup &&
					postgroup.posts.map((item) => (
						
						<PostItem
							id={item.post.id}
							authorId={item.post.authorId}
							authorFirstName={item.post.authorFirstName}
							authorLastName={item.post.authorLastName}
							authorAvatar={item.post.authorAvatar}
							content={item.post.content}
							type={item.post.type}
							refUrls={item.post.refUrls}
							totalReactions={item.post.totalReactions}
							totalComments={item.post.totalComments}
							comments={item.post.comments}
							reaction={item.reaction}
							callBackApi={callBackApi}
						/>
					))}
			</div>
		</div>
	);
}
