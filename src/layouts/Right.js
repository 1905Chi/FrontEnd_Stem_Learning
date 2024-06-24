import { useEffect, useState } from 'react';
import Api from '../api/Api';
import { url } from './../constants/Constant';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriendRequest } from '../redux/Friend';
import { selectselectFriendRequest } from '../redux/Friend';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { selectFriend } from '../redux/Friend';
import './../pages/friend/layouts/LeftFriend.css';
import './Right.css';
import { toast, ToastContainer } from 'react-toastify';
import { editFriendRequest } from '../redux/Friend';
import { selectOption } from '../redux/Group';
import LableGroup from '../pages/group/components/LableGroup';
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import Slider from 'react-slick';
export default function Right() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const friendRequest = useSelector(selectselectFriendRequest);
	const [countRequest, setCountRequest] = useState();
	const [lisstInvite, setListInvite] = useState();
	const [listRelationShip, setListRelationShip] = useState();
	const [countRequestParent, setCountRequestParent] = useState();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [openDeleteinvite, setOpenDeleteinvite] = useState(false);
	const [modalText, setModalText] = useState('Bạn có chắc muốn xóa lời mời này?');
	const [item, setItem] = useState();
	const [listCompetition, setListCompetition] = useState([
		{
			id: '6f3e4fa0-b815-4d71-9db0-f60f0e5e5f4b',
			img: 'https://nghiquyet.hoisinhvien.com.vn/storage/images/news//202403281115Screenshot%202024-03-28%20at%2010.45.44.png',
		},
		{
			id: 2,
			img: 'https://khoahoctre.com.vn/wp-content/uploads/2022/04/44493e3a5621987fc130-810x607.jpg',
		},
	]);

	const accept = (status, id) => () => {
		if (status === 'ACCEPT') {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			// Api.post(url + 'api/v1/friendships/accept/friend', { friend_id: id }, { headers: headers })
			// 	.then((res) => {
			// 		toast.success('Đã chấp nhận lời mời kết bạn');
			// 		dispatch(editFriendRequest(id));
			// 		dispatch(selectOption('all'));
			// 	})
			// 	.catch((err) => {
			// 		toast.error('Đã xảy ra lỗi');
			// 	});
			Api.put(url + 'api/v1/friend-requests/accept/' + id, { headers: headers })
				.then((res) => {
					toast.success('Đã chấp nhận lời mời kết bạn');
					callApifriendRequest();
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
			Api.delete(url + 'api/v1/friend-requests/' + id, { headers: headers })
				.then((res) => {
					toast.success('Đã xóa lời mời kết bạn');
					dispatch(editFriendRequest(id));
					dispatch(selectOption('all'));
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});

			Api.put(url + 'api/v1/friend-requests/reject/' + id, { headers: headers })
				.then((res) => {
					toast.success('Đã xóa lời mời kết bạn');
					callApifriendRequest();
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
	};
	const acceptInvite = (status, id) => () => {
		const isAccept = status === 'ACCEPT' ? true : false;

		Api.post(url + `api/v1/group-member-invitations/${id}/response`, { isAccept: isAccept }, { headers: headers })
			.then((res) => {
				toast.success('Đã chấp nhận lời mời tham gia nhóm');
				callApiListInvite();
			})
			.catch((err) => {
				toast.error('Đã xảy ra lỗi');
			});
	};
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	};
	useEffect(() => {
		callApifriendRequest();
		callApiListInvite();
		callRelationShip();
	}, []);
	// const callApifriendRequest = () => {
	// 	Api.get(url + 'api/v1/users/friend-requests', { headers: headers })
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			dispatch(selectFriendRequest(res.data.result));
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	const callApifriendRequest = () => {
		Api.get(url + 'api/v1/users/friend-requests', { headers: headers })
			.then((res) => {
				console.log('adgs', res.data.result);
				setCountRequest(res.data.result.filter((item) => item.status === 'PENDING').length);
				dispatch(selectFriendRequest(res.data.result));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	///call api mời tham gia class/ group
	const callApiListInvite = () => {
		Api.get(url + 'api/v1/group-member-invitations', { headers: headers })
			.then((res) => {
				setListInvite(res.data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	////call api liên kết tài khoản phụ huynh học sinh
	const callRelationShip = () => {
		Api.get(url + 'api/v1/relationships/student/relationship-requests', { headers: headers })
			.then((res) => {
				setListRelationShip(res.data.result);
				setCountRequestParent(res.data.result.filter((item) => item.accepted === false).length);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const acceptRelation = (status, id) => () => {
		if (status === 'ACCEPT') {
			Api.put(url + 'api/v1/relationships/' + id, { isAccepted: true }, { headers: headers })
				.then((res) => {
					toast.success('Đã chấp nhận yêu cầu');
					callRelationShip();
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
		if (status === 'REJECT') {
			Api.put(url + 'api/v1/relationships/' + id, { isAccepted: false }, { headers: headers })
				.then((res) => {
					toast.success('Đã xóa yêu cầu');
					callRelationShip();
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
	};
	const handleCancel = () => {
		setOpen(false);
		setOpenDeleteinvite(false);
	};
	const linktoCompetition = (id) => () => {
		navigate(`/competition/${id}`);
	};
	return (
		<>
			<div className="friend-request" >
				<Modal
					title="Thông báo"
					open={open}
					onOk={() => {
						accept('REJECT', item.id);
					}}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
				>
					<p>{modalText}</p>
				</Modal>
				<Modal
					title="Thông báo"
					open={openDeleteinvite}
					onOk={() => {
						acceptInvite('REJECT', item.id);
					}}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
				>
					<p>{modalText}</p>
				</Modal>
				{listCompetition && listCompetition.length > 0 ? (
					<div className="your-group">
						<Slider
							dots={true}
							infinite={true}
							speed={500}
							slidesToShow={1}
							slidesToScroll={1}
							autoplay={true}
							autoplaySpeed={3000}
						>
							{listCompetition &&
								listCompetition.map((item, index) => {
									return (
										<div key={index} className="slide" onClick={linktoCompetition(item.id)}>
											<img src={item.img} alt="Group Avatar" />
										</div>
									);
								})}
						</Slider>
					</div>
				) : null}

				{friendRequest && friendRequest.length > 0 && countRequest > 0 ? (
					<>
						<div className="friend-request__title">
							<h3>Lời mời kết bạn</h3>
						</div>
						{friendRequest.map((item, index) => {
							return item.status === 'PENDING' ? (
								<div className="friend-request_item" key={item.id}>
									<div
										style={{margin: '15px', marginTop: '18px' }}
										onClick={() => {
											navigate(`/profile/${item.sender.id}`);
										}}
									>
										<div className="friend-request_item_avatar">
											{item.sender.avatarUrl !== null && item.sender.avatarUrl !== '' ? (
												<Avatar src={item.sender.avatarUrl} alt="" />
											) : (
												<Avatar icon={<UserOutlined style={{ height: '3em' }} />} />
											)}
										</div>
									</div>
									<div className="friend-request_item_button">
										<div
											className="friend-request_item_name"
											onClick={() => {
												navigate(`/profile/${item.sender.id}`);
											}}
										>
											<p>{item.sender.firstName + ' ' + item.sender.lastName}</p>
										</div>
										<div >
											<button
												className="btn btn-primary"
												style={{ backgroundColor: '#1677ff' }}
												onClick={() => accept('ACCEPT', item.id)}
											>
												Chấp nhận
											</button>
											<button
												className="btn btn-danger"
												onClick={() => {
													setOpen(true);
													setItem(item);
													setModalText(
														`Bạn có chắc muốn xóa lời mời kết bạn của ${
															item.sender.firstName + ' ' + item.sender.lastName
														}?`
													);
												}}
												style={{ width: '64px' }}
											>
												Xóa
											</button>
										</div>
									</div>
								</div>
							) : null;
						})}
					</>
				) : null}

				{listRelationShip && listRelationShip.length > 0 && countRequestParent > 0 && (
					<>
						<div className="friend-request__title">
							<h3>Yêu cầu liên kết tài khoản </h3>
						</div>
						{listRelationShip.map((item, index) =>
							item.accepted === false ? (
								<div className="friend-request__item" key={item.id}>
									<div
										style={{ flex: '2', margin: '15px', marginTop: '18px' }}
										onClick={() => {
											navigate(`/profile/${item.parent.id}`);
										}}
									>
										<div className="friend-request__item__avatar">
											{item.parent.avatarUrl !== null && item.parent.avatarUrl !== '' ? (
												<Avatar src={item.parent.avatarUrl} alt="" />
											) : (
												<Avatar icon={<UserOutlined style={{ height: '3em' }} />} />
											)}
										</div>
									</div>
									<div className="friend-request__item__button">
										<div
											className="friend-request__item__name"
											onClick={() => {
												navigate(`/profile/${item.parent.id}`);
											}}
										>
											<p>{item.parent.firstName + ' ' + item.parent.lastName}</p>
										</div>
										<div style={{ textAlign: 'start' }}>
											<button
												className="btn btn-primary"
												style={{ backgroundColor: '#1677ff', width: '83px' }}
												onClick={() => acceptRelation('ACCEPT', item.id)}
											>
												Chấp nhận
											</button>
											<button
												className="btn btn-danger"
												onClick={() => acceptRelation('REJECT', item.id)}
												style={{ width: '64px' }}
											>
												Xóa
											</button>
										</div>
									</div>
								</div>
							) : null
						)}
					</>
				)}

				{lisstInvite && lisstInvite.length > 0 && (
					<>
						<div className="friend-request__title">
							<h3>Lời mời tham gia nhóm </h3>
						</div>
						{lisstInvite.map((item, index) =>
							item.state === 'PENDING' ? (
								<div style={{ backgroundColor: 'white' }} className="invite-group" key={item.id}>
									<div
										className="invite-request__item"
										onClick={() => {}}
										style={{ border: 'none', marginBottom: '0px' }}
									>
										<div
											style={{
												flex: '2',
												margin: '15px',
												marginTop: '18px',
												paddingBottom: '1px',
											}}
										>
											<div className="invite-request__item__avatar">
												{item.inviter.avatarUrl !== null && item.inviter.avatarUrl !== '' ? (
													<Avatar src={item.inviter.avatarUrl} alt="" />
												) : (
													<Avatar icon={<UserOutlined style={{ height: '3em' }} />} />
												)}
											</div>
										</div>
										<div className="invite-request__item__button">
											<div className="invite-request__item__name">
												<p
													style={{
														textAlign: 'start',
														fontSize: 'larger',
														fontWeight: '800',
														marginTop: '9.5%',
													}}
													onClick={() => {
														navigate(`/profile/${item.inviter.id}`);
													}}
												>
													{item.inviter.firstName + ' ' + item.inviter.lastName}
												</p>
												<span>Mời bạn tham gia </span>
												<strong
													onClick={() => {
														navigate(`/groups/${item.group.id}`);
													}}
												>
													{item.group.name}
												</strong>
											</div>
										</div>
									</div>

									<div style={{ textAlign: 'center', marginBottom: '20px', margin: '0 0 0 14%' }}>
										<button
											className="btn btn-primary"
											style={{
												backgroundColor: '#1677ff',
												width: '83px',
												borderRadius: '0.5rem',
											}}
											onClick={() => acceptInvite('ACCEPT', item.id)}
										>
											Chấp nhận
										</button>
										<button
											className="btn btn-danger"
											onClick={() => {
												setOpenDeleteinvite(true);
												setItem(item);
												setModalText(
													`Bạn có chắc muốn xóa lời mời tham gia nhóm ${item.group.name}?`
												);
											}}
											style={{ width: '64px', borderRadius: '0.5rem' }}
										>
											Xóa
										</button>
									</div>
								</div>
							) : null
						)}
					</>
				)}

				<ToastContainer />
			</div>
		</>
	);
}
