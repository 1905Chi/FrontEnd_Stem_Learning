import React, { useEffect } from 'react';
import './PostGroup.css';
import Editor from '../../home/components/Editor';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import PostItem from './../../home/components/PostItem';
import { useSelector } from 'react-redux';
import { selectSelectedPostGroup } from '../../../redux/Group';
export default function PostGroup() {
	const [open, setOpen] = useState(false);
	const postgroup = useSelector(selectSelectedPostGroup);
	console.log(postgroup);
	const [post, setPost] = useState([]);

	const fetchPostGroup = async () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.get(url + 'group/' + uuid + '/posts', { headers })

			.then(async (response) => {
				if (response.data.statusCode === 200) {
					console.log(response.data.postsWithAuthor);
					setPost(response.data.postsWithAuthor);
				}
			})
			.catch(async (error) => {
				if (error.response) {
					// lỗi khi access token hết hạn
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
				}
			})
			.finally(() => {});
	};
	useEffect(() => {
		fetchPostGroup();
	}, []);

	const openEdttor = () => {
		setOpen(!open);
	};
	const { uuid } = useParams();

	return (
		<div>
			<div className="post-group">
				<h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>
					Bài viết{' '}
				</h2>
				{open && <Editor cancel={openEdttor} type="post" />}
				<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					Bài viết mới
				</button>
			</div>
			<div className="post-group__list">
				{post &&
					post.map((item) => (
						<PostItem
							index={item.id}
							content={item.content}
							user={item.author}
							likes={item.reactions}
							liked={item.isLiked}
							type={item.type}
							refUrls={item.refUrls}
							comment={item.commentsWithAuthor}
						/>
					))}
			</div>
		</div>
	);
}
