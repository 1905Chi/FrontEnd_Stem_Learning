import React, { useState, useEffect } from 'react';
import PostItem from './components/PostItem';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { selectselectuser, selectuser } from '../../redux/User';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { Skeleton } from 'antd';
//import { verifyJwtToken } from '../../api/Jwt';
function Home() {
	const [ispost, setIspost] = useState(false);
	const dispatch = useDispatch();
	const [listpost, setListpost] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(30);

	useEffect(() => {
		//console.log(verifyJwtToken(localStorage.getItem('use')));
		if (localStorage.getItem('login')) {
			toast.success('Đăng nhập thành công');
			localStorage.removeItem('login');
		}
		dispatch(selectuser(JSON.parse(localStorage.getItem('user'))));
		// const headers = {
		// 	'Content-Type': 'application/json',
		// 	Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
		// };
		// Api.get(url+`api/v1/posts/home-posts?page=${page}&size=${size}`, {headers:headers}).then((response) => {
		//   if (response.data.statusCode === 200) {
		//     setListpost(response.data.result);
		//   } else {
		//     console.log(response.error);
		//   }

		// }).catch((error) => {
		//   console.log(error);
		// });
	}, []);
	useEffect(() => {
		homePosts();
	}, []);
	const fetchData = () => {
		// Tạo một Promise mới
		const myPromise = new Promise((resolve, reject) => {
			// Simulate an asynchronous task (e.g., fetching data from an API)
			setTimeout(() => {
				// Giả sử dữ liệu được lấy từ API
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
				};
				const apiData = Api.get(url + `api/v1/posts/home-posts?page=${page}&size=${size}`, {
					headers: headers,
				});
				// Gọi resolve khi công việc đã hoàn thành thành công
				resolve(apiData);
			}, 3000); // Giả định mất 2 giây để lấy dữ liệu
		});

		// Sử dụng Promise
		myPromise
			.then((result) => {
				// Xử lý kết quả khi Promise hoàn thành thành công
				if (result.data.statusCode === 200) {
					setListpost(result.data.result);
					console.log('data', result.data.result);
				} else {
					console.log(result.error);
				}
			})
			.catch((error) => {
				// Xử lý lỗi khi Promise không thành công
				console.error('Error fetching data:', error);
			});
	};

	const homePostss = async () => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			};
			const response = await Api.get(`home-posts`, { headers: headers });
			if (response.data.statusCode === 200) {
				setListpost(response.data.result);
				
			} else {
				console.log(response.error);
			}
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const homePosts = async () => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
				timeout: 15000,
			};
			const response = await Api.get(url + `api/v1/posts/home-posts?page=${page}&size=${size}`, {
				headers: headers,
			});
			if (response.data.statusCode === 200) {
				setListpost(response.data.result.posts);
				console.log('data', response.data.result.posts);
			} else {
				console.log(response.error);
			}
		} catch {
			console.log('error');
		}
	};

	return (
		<>
			<div className="home-page">
				{listpost ===null   ? <Skeleton active /> : null}
				{listpost !==null && listpost.length >0 &&  listpost.map((post, index) => {
					return (
						<PostItem
							key={index}
							id={post.post.id}
							authorId={post.post.authorId}
							authorFirstName={post.post.authorFirstName}
							authorLastName={post.post.authorLastName}
							authorAvatar={post.post.authorAvatar}
							type={post.post.type}
							refUrls={post.post.refUrls}
							totalReactions={post.post.totalReactions}
							totalComments={post.post.totalComments}
							createdAt={post.post.createdAt}
							updatedAt={post.post.updatedAt}
							content={post.post.content}
							comments={post.post.comments}
							reaction={post.reaction}
						/>
					);
				})}
				<ToastContainer />
			</div>
		</>
	);
}

export default Home;
