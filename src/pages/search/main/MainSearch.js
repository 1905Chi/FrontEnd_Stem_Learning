import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { selectSelectedOption, selectOption } from '../../../redux/Group';
import {
	selectselectclass,
	selectselectgroup,
	selectselectpost,
	selectselectSearchpeople,
	editSearchPeople,
} from '../../../redux/Search';
import PostItem from '../../home/components/PostItem';
import './MainSearch.css';
import LableGroup from '../../group/components/LableGroup';
import { Avatar } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
	selectSelectOptionSearchGrade,
	selectSelectOptionSearchSubject,
	selectSelectOptionSearchPeople,
} from '../../../redux/Group';
export default function MainSearch() {
	const navigate = useNavigate();
	const selectedOption = useSelector(selectSelectedOption);
	const selectedOptionSearchGrade = useSelector(selectSelectOptionSearchGrade);
	const selectedOptionSearchSubject = useSelector(selectSelectOptionSearchSubject);
	const selectedOptionSearchPeople = useSelector(selectSelectOptionSearchPeople);
	const dispatch = useDispatch();
	const post = useSelector(selectselectpost);

	const group = useSelector(selectselectgroup);

	const [classs, setClass] = useState(useSelector(selectselectclass));
	const clasaSearch = useSelector(selectselectclass);

	const [people, setPeople] = useState(useSelector(selectselectSearchpeople));
	const peopleSearch = useSelector(selectselectSearchpeople);

	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		searchClass();
	}, [selectedOptionSearchGrade, selectedOptionSearchSubject]);

	useEffect(() => {
		searchPeople();
	}, [selectedOptionSearchPeople]);
	const searchPeople = async () => {
		if (selectedOptionSearchPeople === 'all' || selectedOptionSearchPeople === null) {
			setPeople(peopleSearch);
			return;
		} else {
			const search = peopleSearch.filter((item) => item.role === selectedOptionSearchPeople);
			setPeople(search);
			return;
		}
	};

	const searchClass = async () => {
		if (
			(selectedOptionSearchGrade === 'all' && selectedOptionSearchSubject === 'all') ||
			(selectedOptionSearchGrade === null && selectedOptionSearchSubject === null)
		) {
			setClass(clasaSearch);
			return;
		} else {
			if (selectedOptionSearchGrade === 'all' && selectedOptionSearchSubject !== 'all') {
				const classSearch = clasaSearch.filter((item) => item.subject === selectedOptionSearchSubject);
				console.log(classSearch);
				setClass(classSearch);
				return;
			} else if (selectedOptionSearchGrade !== 'all' && selectedOptionSearchSubject !== 'all') {
				console.log(selectedOptionSearchGrade);
				console.log(selectedOptionSearchSubject);
				console.log(clasaSearch);
				const classSearch = clasaSearch.filter(
					(item) =>
						item.grade === Number(selectedOptionSearchGrade) && item.subject === selectedOptionSearchSubject
				);
				console.log(classSearch);
				setClass(classSearch);
				return;
			} else if (selectedOptionSearchGrade !== 'all' && selectedOptionSearchSubject === 'all') {
				const classSearch = clasaSearch.filter((item) => item.grade === Number(selectedOptionSearchGrade));
				console.log(classSearch);
				setClass(classSearch);
				return;
			}
		}
	};
	const Requestfriend = async (id) => {
		if (user === null) {
			toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
			return;
		}
		const headers = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		};
		try {
			await Api.post(
				url + 'api/v1/friend-requests',
				{
					userId: id,
				},
				{ Headers: headers }
			).then((res) => {
				dispatch(editSearchPeople({ id: id, isFriend: -1 }));
				toast.success('Gửi lời mời kết bạn thành công');
			});
		} catch (err) {
			console.log(err);
		}
	};

	//    const checkFriend = (id) => {
	//         const headers = {
	//             'Content-Type': 'application/json',
	//             Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	//         };
	//         try {
	//             Api.get(url + 'api/v1/friendships/validate?friendId=' + id, {Headers: headers})
	//             .then((res) => {
	//                 console.log(res.data.result);
	//                 if(res.data.result=== true){

	//                     return 1;
	//                 }
	//                 else if(res.data.result=== false){
	//                     return 0;
	//                 }
	//                 else{
	//                     return -1;
	//                 }
	//             })
	//         }
	//         catch (err) {
	//             console.log(err);
	//         }
	//     }
	const requestParent = async (id) => {
		if (user === null) {
			toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
			return;
		}
		Api.post(
			url + 'api/v1/relationships',
			{ studentId: id },
			{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			}
		)
			.then((res) => {
				toast.success('Đã gửi yêu cầu ');
			})
			.catch((err) => {
				toast.error('Đã xảy ra lỗi');
			});
	};
	return (
		<div
			className="search-main"
			style={{
				marginLeft: '50px',
			}}
		>
			{selectedOption === 'all' && (
				<div>
					{/* {post && post.length > 0 && (
						<div>
							<h1>Bài viết</h1>
							{post.map((item, index) => (
								<PostItem
									index={item.id}
									content={item.content}
									authorId={item.authorId}
									authorAvatar={item.authorAvatar}
									likes={item.reactions}
									authorFirstName={item.authorFirstName}
									authorLastName={item.authorLastName}
									totalReactions={item.totalReactions}
									totalComments={item.totalComments}
									type={item.type}
									refUrls={item.refUrls}
								/>
							))}
						</div>
					)} */}
					{group && group.length > 0 && (
						<div>
							<h1>Nhóm</h1>
							{group.map((item, index) => (
								<LableGroup infor={item} type={item.isClass} />
							))}
						</div>
					)}
					{classs && classs.length > 0 && (
						<div>
							<h1>Lớp</h1>
							{classs.map((item, index) => (
								<LableGroup infor={item} type={item.isClass} />
							))}
						</div>
					)}
					{people && people.length > 0 && (
						<div>
							<h1>Mọi người</h1>
							{people &&
								people.map((item, index) => (
									<div className="user-search">
										{item.avatarUrl !== null && item.avatarUrl !== '' ? (
											<Avatar
												src={item.avatarUrl}
												size={64}
												onClick={() => {
													if (localStorage.getItem('user') === null) {
														toast.error(
															'Bạn cần đăng nhập để xem thông tin người dùng này'
														);
														return;
													}
													navigate('/profile/' + item.id);
												}}
											/>
										) : (
											<Avatar
												icon={<UserOutlined style={{ height: '3em' }} />}
												size={64}
												onClick={() => {
													if (localStorage.getItem('user') === null) {
														toast.error(
															'Bạn cần đăng nhập để xem thông tin người dùng này'
														);
														return;
													}
													navigate('/profile/' + item.id);
												}}
											/>
										)}
										<p>{item.firstName + ' ' + item.lastName}</p>
										{item.isFriend === 1 ? (
											<button
												onClick={() => {
													if (localStorage.getItem('user') === null) {
														toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
														return;
													}
													navigate('/profile/' + item.id);
												}}
											>
												Trang cá nhân{' '}
											</button>
										) : item.isFriend === 0 && item.id !== user.id ? (
											<button onClick={() => Requestfriend(item.id)}>Thêm bạn</button>
										) : item.isFriend === -1 ? (
											<button>Đã gửi lời mời</button>
										) : (
											null
										)}
										{item.role === 'STUDENT' &&
										user !== null &&
										(user.role === 'PARENT' || user.role === 'TEACHER') ? (
											<button onClick={() => requestParent(item.id)}>Liên kết tài khoản</button>
										) : null}
									</div>
								))}
						</div>
					)}
				</div>
			)}
			{/* {selectedOption === 'post' && (
				<div>
					{post && post.length > 0 ? (
						<div>
							<h1>Bài viết</h1>
							{post.map((item, index) => (
								<PostItem
									index={item.id}
									content={item.content}
									authorId={item.authorId}
									authorAvatar={item.authorAvatar}
									likes={item.reactions}
									authorFirstName={item.authorFirstName}
									authorLastName={item.authorLastName}
									totalReactions={item.totalReactions}
									totalComments={item.totalComments}
									type={item.type}
									refUrls={item.refUrls}
								/>
							))}
						</div>
					) : (
						<div>
							{' '}
							<h1>
								<Empty />
							</h1>
						</div>
					)}
				</div>
			)} */}
			{selectedOption === 'people' && (
				<div>
					{people && people.length > 0 ? (
						<div>
							<h1>Mọi người</h1>
							{people &&
								people.map((item, index) => (
									<div className="user-search">
										{item.avatarUrl !== null && item.avatarUrl !== '' ? (
											<Avatar
												src={item.avatarUrl}
												size={64}
												onClick={() => {
													if (localStorage.getItem('user') === null) {
														toast.error(
															'Bạn cần đăng nhập để xem thông tin người dùng này'
														);
														return;
													}
													navigate('/profile/' + item.id);
												}}
											/>
										) : (
											<Avatar
												icon={<UserOutlined style={{ height: '3em' }} />}
												size={64}
												onClick={() => {
													if (localStorage.getItem('user') === null) {
														toast.error(
															'Bạn cần đăng nhập để xem thông tin người dùng này'
														);
														return;
													}
													navigate('/profile/' + item.id);
												}}
											/>
										)}
										<p>{item.firstName + ' ' + item.lastName}</p>
										{item.isFriend === 1 ? (
											<button
												onClick={() => {
													if (localStorage.getItem('user') === null) {
														toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
														return;
													}
													navigate('/profile/' + item.id);
												}}
											>
												Trang cá nhân{' '}
											</button>
										) : item.isFriend === 0  && item.id !== user.id ? (
											<button onClick={() => Requestfriend(item.id)}>Thêm bạn</button>
										) : item.isFriend === -1 ? (
											<button>Đã gửi lời mời</button>
										) : (
											null
										)}
										{item.role === 'STUDENT' &&
										user !== null &&
										(user.role === 'PARENT' || user.role === 'TEACHER') ? (
											<button onClick={() => requestParent(item.id)}>Liên kết tài khoản</button>
										) : null}
									</div>
								))}
						</div>
					) : (
						<div>
							<h1>
								<Empty />
							</h1>
						</div>
					)}
				</div>
			)}

			{selectedOption === 'class' && (
				<div>
					{classs && classs.length > 0 ? (
						<div>
							<h1>Lớp</h1>
							{classs.map((item, index) => (
								<LableGroup infor={item} type={item.isClass} />
							))}
						</div>
					) : (
						<div>
							<h1>
								<Empty />
							</h1>
						</div>
					)}
				</div>
			)}
			{selectedOption === 'group' && (
				<div>
					{group && group.length > 0 ? (
						<div>
							<h1>Nhóm</h1>
							{group.map((item, index) => (
								<LableGroup infor={item} type={item.isClass} />
							))}
						</div>
					) : (
						<div>
							<h1>
								<Empty />
							</h1>
						</div>
					)}
				</div>
			)}
			<ToastContainer />
		</div>
	);
}
