import { FaUserFriends } from 'react-icons/fa';
import { UserAddOutlined } from '@ant-design/icons';
import { UserSwitchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOption } from '../../../redux/Group';
import { selectFriend } from '../../../redux/Friend';
import { useDispatch } from 'react-redux';
import { selectSelectedOption } from '../../../redux/Group';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './LeftFriend.css';
import anh_logo_1 from '../../../assets/images/anh_logo_1.jpg';
import { selectselectFriendRequest, editFriendRequest } from '../../../redux/Friend';
import Api from '../../../../src/api/Api';
import { url } from '../../../constants/Constant';
import { selectFriendRequest } from '../../../redux/Friend';
import { Avatar } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { selectFriendOfFriend } from '../../../redux/Friend';
export default function LeftFriend() {
	const dispatch = useDispatch();
	const selectedOption = useSelector(selectSelectedOption);
	const [friendRequest, setFriendRequest] = useState(null);
	const [friendPending, setFriendPending] = useState([]);
	const [friend, setFriend] = useState([]);
	const [friendOfFriend, setFriendOfFriend] = useState([]);
	useEffect(() => {
		dispatch(selectOption('all'));
	}, []);

	useEffect(() => {
		fetchFriendRequest();
		fetchFriend();
		fetchFriendOfFriend();
	}, [selectOption]);

	const fetchFriendRequest = async () => {
		try {
			if (friendRequest === null) {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				};
				const response = await Api.get(url + 'api/v1/friendships/friend/pending', { headers: headers });
				if (response.data.statusCode === 200) {
					setFriendPending(response.data.friendWithAuthor);
					console.log(response.data.friendWithAuthor);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchFriend = async () => {
		try {
			if (friendRequest === null) {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				};
				const response = await Api.get(url + 'api/v1/friendships/friend/accept', { headers: headers });
				if (response.data.statusCode === 200) {
					setFriend(response.data.friendWithAuthor);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchFriendOfFriend = async (id) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			};
			const response = await Api.get(url + 'api/v1/friendships/friends', { headers: headers });
			if (response.data.statusCode === 200) {
				setFriendOfFriend(response.data.friendWithAuthor);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// const fetchFriendOfFriend = async (id) => {
	// 	try {
	// 		const headers = {
	// 			'Content-Type': 'application/json',
	// 			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	// 		};
	// 		const response = await Api.get(url + 'api/v1/friendships/friend/suggestions', { headers: headers });
	// 		if (response.data.statusCode === 200) {
	// 			setFriendOfFriend(response.data.friendWithAuthor);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const callInformationUser = (id) => {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		};
		Api.get(url + 'api/v1/users/friends-of-user?uId=' + id, { headers: headers })
			.then((res) => {
				dispatch(selectFriendOfFriend(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const accept = (status, id) => () => {
		if (status === 'ACCEPT') {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			const data = {
				friend_id: id,
			};
			Api.post(url + 'api/v1/friendships/accept/friend', data, { headers: headers })
				.then((res) => {
					toast.success('Đã chấp nhận lời mời kết bạn');
					// dispatch(editFriendRequest(id));
					dispatch(selectOption('all'));
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
		if (status === 'REJECT') {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			Api.post(url + 'api/v1/friendships/decline/friend', { friend_id: id }, { headers: headers })
				.then((res) => {
					toast.success('Đã xóa lời mời kết bạn');
					// dispatch(editFriendRequest(id));
					dispatch(selectOption('request_friend'));
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
		if (status === 'REQUEST') {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			Api.post(url + 'api/v1/friendships/friend', { userId: id }, { headers: headers })
				.then((res) => {
					toast.success('Đã gửi lời mời kết bạn');
					// dispatch(editFriendRequest(id));
					dispatch(selectOption('sent_request'));
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
	};
	return (
		<div className="left-friend">
			{selectedOption === 'all' ? (
				<div>
					<h2>Bạn bè</h2>
					<div
						className="option-friend"
						onClick={() => {
							dispatch(selectOption('all_friend'));
							fetchFriend();
						}}
					>
						<button className="btn-friend">
							<FaUserFriends className="icon-friend" />
						</button>
						<span className="text-friend">Tất cả bạn bè</span>
					</div>
					<div
						className="option-friend"
						onClick={() => {
							fetchFriendRequest();
							dispatch(selectOption('request_friend'));
						}}
					>
						<button className="btn-friend">
							<UserSwitchOutlined className="icon-friend" />
						</button>
						<span className="text-friend">Lời mời kết bạn</span>
					</div>
					<div
						className="option-friend"
						onClick={() => {
							dispatch(selectOption('sent_request'));
							fetchFriendOfFriend();
						}}
					>
						<button className="btn-friend">
							<UserAddOutlined className="icon-friend" />
						</button>
						<span className="text-friend">Gợi ý kết bạn</span>
					</div>
				</div>
			) : null}

			{selectedOption === 'request_friend' ? (
				<div>
					<div className="header-left-friend">
						<button
							className="back"
							onClick={() => {
								dispatch(selectOption('all'));
							}}
						>
							<ArrowLeftOutlined />
						</button>
						<h2>Lời mời kết bạn</h2>
					</div>
					{friendPending &&
						friendPending.map((item, index) => (
							<div className="friend-request__item" key={item.id}>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
									<div
										className="friend-request__item__avatar"
										onClick={() => {
											dispatch(selectFriend(item.id));
										}}
									>
										<Avatar src={item.avatar_url} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button">
									<div
										className="friend-request__item__name"
										onClick={() => {
											dispatch(selectFriend(item.id));
										}}
									>
										<p>{item.firstName + ' ' + item.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff' }}
											onClick={accept('ACCEPT', item.id)}
										>
											Chấp nhận
										</button>
										<button className="btn btn-danger" onClick={accept('REJECT', item.id)}>
											Xóa
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			) : null}
			{selectedOption === 'all_friend' ? (
				<div>
					<div className="header-left-friend">
						<button
							className="back"
							onClick={() => {
								dispatch(selectOption('all'));
							}}
						>
							<ArrowLeftOutlined />
						</button>
						<h2>Tất cả bạn bè</h2>
					</div>
					{friend &&
						friend.map((item, index) => (
							<div className="friend-request__item" key={item.id}>
								<div style={{ margin: '15px', marginTop: '18px' }}>
									<div
										className="friend-request__item__avatar"
										onClick={() => {
											dispatch(selectFriend(item.id));
										}}
									>
										<Avatar src={item.avatar_url} alt="" />
									</div>
								</div>
								<div
									className="friend-request__item__button"
									style={{ textAlign: 'start', paddingTop: '10px' }}
									onClick={() => {
										dispatch(selectFriend(item.id));
									}}
								>
									<div className="friend-request__item__name">
										<p style={{ textAlign: 'start' }}>{item.firstName + ' ' + item.lastName}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			) : null}

			{selectedOption === 'sent_request' ? (
				<div>
					<div className="header-left-friend">
						<button
							className="back"
							onClick={() => {
								dispatch(selectOption('all'));
							}}
						>
							<ArrowLeftOutlined />
						</button>
						<h2>Gợi ý kết bạn</h2>
					</div>
					{friendOfFriend &&
						friendOfFriend.map((item, index) => (
							<div className="friend-request__item" key={item.id}>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
									<div
										className="friend-request__item__avatar"
										onClick={() => {
											dispatch(selectFriend(item.id));
										}}
									>
										<Avatar src={item.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button">
									<div
										className="friend-request__item__name"
										onClick={() => {
											dispatch(selectFriend(item.id));
										}}
									>
										<p>{item.firstName + ' ' + item.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff' }}
											onClick={accept('REQUEST', item.id)}
										>
											Thêm bạn bè
										</button>
										<button className="btn btn-danger" onClick={accept('REJECT', item.id)}>
											Xóa
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			) : null}
			<ToastContainer />
		</div>
	);
}
