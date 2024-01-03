import { useEffect, useState } from 'react';
import Api from '../api/Api';
import { url } from './../constants/Constant';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriendRequest } from '../redux/Friend';
import { selectselectFriendRequest } from '../redux/Friend';
import { Avatar } from 'antd';
import { selectFriend } from '../redux/Friend';
import './../pages/friend/layouts/LeftFriend.css';
import './Right.css';
import { toast, ToastContainer } from 'react-toastify';
import { editFriendRequest } from '../redux/Friend';
import { selectOption } from '../redux/Group';
import LableGroup from '../pages/group/components/LableGroup';
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function Right() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const friendRequest = useSelector(selectselectFriendRequest);
	const [countRequest, setCountRequest] = useState();
	const [lisstInvite, setListInvite] = useState();
	const [listRelationShip, setListRelationShip] = useState();
	const [countRequestParent, setCountRequestParent] = useState();
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
		if(status === 'ACCEPT'){
			Api.put(url + 'api/v1/relationships/' + id, {isAccepted: true},{ headers: headers })
				.then((res) => {
					toast.success('Đã chấp nhận yêu cầu');
					callRelationShip();
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
		if(status === 'REJECT'){
			Api.put(url + 'api/v1/relationships/' + id,{isAccepted: false}, { headers: headers })
				.then((res) => {
					toast.success('Đã xóa yêu cầu');
					callRelationShip();
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
	}
	return (
		<>
			<div className="friend-request" style={{overflowY:'auto'}}>
				<div className="friend-request__title">
					<h3>Lời mời kết bạn</h3>
				</div>
				{friendRequest && friendRequest.length > 0 && countRequest > 0 ? (
					friendRequest.map((item, index) =>
						item.status === 'PENDING' ? (
							<div
								className="friend-request__item"
								key={item.id}
								
							>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }} onClick={()=>{navigate(`/profile/${item.sender.id}`)}}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.sender.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button" >
									<div className="friend-request__item__name" onClick={()=>{navigate(`/profile/${item.sender.id}`)}}>
										<p>{item.sender.firstName + ' ' + item.sender.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff', width: '83px' }}
											onClick={accept('ACCEPT', item.id)}
										>
											Chấp nhận
										</button>
										<button
											className="btn btn-danger"
											onClick={accept('REJECT', item.id)}
											style={{ width: '64px' }}
										>
											Xóa
										</button>
									</div>
								</div>
							</div>
						) : null
					)
				) : !friendRequest || friendRequest.length === 0 || countRequest === 0 ? (
					<div>
						<Empty />
					</div>
				) : (
					<div>
						<Empty />
					</div>
				)}
				<div className="friend-request__title">
					<h3>Yêu cầu liên kết tài khoản </h3>
				</div>
				{listRelationShip && listRelationShip.length > 0 && countRequestParent > 0 ? (
					listRelationShip.map((item, index) =>
						item.accepted === false? (
							<div
								className="friend-request__item"
								key={item.id}
								
							>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }} onClick={()=>{navigate(`/profile/${item.parent.id}`)}}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.parent.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button" >
									<div className="friend-request__item__name" onClick={()=>{navigate(`/profile/${item.parent.id}`)}}>
										<p>{item.parent.firstName + ' ' + item.parent.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff', width: '83px' }}
											onClick={acceptRelation('ACCEPT', item.id)}
										>
											Chấp nhận
										</button>
										<button
											className="btn btn-danger"
											onClick={acceptRelation('REJECT', item.id)}
											style={{ width: '64px' }}
										>
											Xóa
										</button>
									</div>
								</div>
							</div>
						) : null
					)
				) : !friendRequest || friendRequest.length === 0 || countRequestParent === 0 ? (
					<div>
						<Empty />
					</div>
				) : (
					<div>
						<Empty />
					</div>
				)}

				<div className="friend-request__title">
					<h3>Lời mời tham gia nhóm </h3>
				</div>

				{lisstInvite && lisstInvite.length > 0 ? (
					lisstInvite.map((item, index) =>
						item.state === 'PENDING' ? (
							<div style={{ backgroundColor: 'white' }} className="invite-group">
								<div
									className="invite-request__item"
									key={item.id}
									onClick={() => {}}
									style={{ border: 'none', marginBottom: '0px' }}
								>
									<div style={{ flex: '2', margin: '15px', marginTop: '18px', paddingBottom: '1px' }}>
										<div className="invite-request__item__avatar">
											<Avatar src={item.group.avatarUrl} alt="" />
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
										style={{ backgroundColor: '#1677ff', width: '83px', borderRadius: '0.5rem' }}
										onClick={acceptInvite('ACCEPT', item.id)}
									>
										Chấp nhận
									</button>
									<button
										className="btn btn-danger"
										onClick={acceptInvite('REJECT', item.id)}
										style={{ width: '64px', borderRadius: '0.5rem' }}
									>
										Xóa
									</button>
								</div>
							</div>
						) : null
					)
				) : (
					<div>
						<Empty />
					</div>
				)}

				<ToastContainer />
			</div>
		</>
	);
}
