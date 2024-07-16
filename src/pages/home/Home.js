import React, { useState, useEffect, useRef } from 'react';
import PostItem from './components/PostItem';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { selectselectuser, selectuser } from '../../redux/User';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { Skeleton } from 'antd';
import { selectPostHome } from '../../redux/Group';
import { TfiAngleDoubleRight } from 'react-icons/tfi';
import Left from '../../layouts/Left';
import { selectlistpostHome, selectselectlistpostHome } from '../../redux/Post';
import { Empty } from 'antd';
import './Home.css';
import ServeyItem from './../group/components/ServeyItem';
//import { verifyJwtToken } from '../../api/Jwt';
function Home() {
	const [ispost, setIspost] = useState(false);

	const [listpost, setListpost] = useState(null);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(100);
	const [currentElements, setCurrentElements] = useState(0)
	const [openLeft, setOpenLeft] = useState(false);
	const LeftHomeRef = useRef(null);
	useEffect(() => {
		//console.log(verifyJwtToken(localStorage.getItem('use')));
		if (localStorage.getItem('login')) {
			toast.success('Đăng nhập thành công');
			localStorage.removeItem('login');
		}
	}, []);
	useEffect(() => {
		homePosts();
	}, []);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (LeftHomeRef.current && !LeftHomeRef.current.contains(event.target)) {
				setOpenLeft(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	const updatePostList = (updatedPosts) => {
		setListpost(updatedPosts);
	};
	const parseDate = (dateString) => {
		const [date, time] = dateString.split(' ');
		const [day, month, year] = date.split('-');
		const [hours, minutes, seconds] = time.split(':');
		return new Date(year, month - 1, day, hours, minutes, seconds);
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

			const responseSurvey = await Api.get(url + `api/v1/surveys/getHomeSurvey`, {
				headers: headers,
			});

			console.log('responseSurvey', responseSurvey.data.result.surveys);
			const combinedList = [
				...responseSurvey.data.result.surveys.map((post) => ({
					...post,
					createdAt: parseDate(post.createdAt),
				})),
				...response.data.result.posts.map((item) => ({ ...item, createdAt: parseDate(item.post.createdAt) })),
			];

			// Sắp xếp danh sách gộp theo createdAt
			combinedList.sort((a, b) => b.createdAt - a.createdAt);

			console.log(combinedList);
			combinedList !== null ? setListpost(combinedList) : setListpost([]);
			if (response.data.statusCode === 200) {
				console.log('data', response.data.result.posts);
			} else {
				console.log(response.error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="Left">
				<TfiAngleDoubleRight
					onClick={() => {
						setOpenLeft((prev) => !prev);
					}}
				/>
			</div>
			{openLeft ? (
				<div
					className="LeftHome"
					ref={LeftHomeRef}
					style={{ position: 'absolute', top: '37px', left: 0, width: '50%', height: '100%', zIndex: 999 }}
				>
					<Left />
				</div>
			) : null}
			<div className="home-page">
				{listpost === null ? (
					<Skeleton active />
				) : listpost !== null && listpost.length === 0 ? (
					<Empty style={{ marginTop: '10px' }} description="Không có bài viết nào" />
				) : null}
				{listpost !== null &&
					listpost.length > 0 &&
					listpost.map((post, index) => {
						if (post.post) {
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
									group= {post.group}
									reaction={post.reaction}
									homePosts={homePosts}
									updatePostList={updatePostList}
								/>
							);
						} else {
							return (
								<ServeyItem
									key={index}
									id={post.id}
									authorId={post.author.id}
									authorAvatar={post.author.avatarUrl}
									authorFirstName={post.author.firstName}
									authorLastName={post.author.lastName}
									question={post.content}
									options={post.options}
									isAddOption={post.isAddOtherOption}
									isMultiSelect={post.isMultipleChoice}
									listAnswer={post.options}
									group= {post.group}
									callBackApi={homePosts}
									index={index}
								/>
							);
						}
					})}
				<ToastContainer />
			</div>
		</>
	);
}

export default Home;
