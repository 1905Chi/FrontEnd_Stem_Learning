import { useEffect, useState } from 'react';
import Api from '../api/Api';
import { url } from './../constants/Constant';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriendRequest } from '../redux/Friend';
import { selectselectFriendRequest } from '../redux/Friend';
import { Avatar } from 'antd';
import { selectFriend } from '../redux/Friend';
import './../pages/friend/layouts/LeftFriend.css';
import { toast, ToastContainer } from 'react-toastify';
import { editFriendRequest } from '../redux/Friend';
import { selectOption } from '../redux/Group';
import LableGroup from '../pages/group/components/LableGroup';
export default function Right() {
	const dispatch = useDispatch();
	const friendRequest = useSelector(selectselectFriendRequest);
	const [lisstInvite, setListInvite] = useState();
	const [listRelationShip, setListRelationShip] = useState()
	const accept = (status, id) => () => {
		if (status === 'ACCEPT') {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			// Api.put(url + 'api/v1/friendships/accept/friend', { friend_id: id }, { headers: headers })
			// 	.then((res) => {
			// 		toast.success('Đã chấp nhận lời mời kết bạn');
			// 		dispatch(editFriendRequest(id));
			// 		dispatch(selectOption('all'));
			// 	})
			// 	.catch((err) => {
			// 		toast.error('Đã xảy ra lỗi');
			
			// 	});
				Api.put(url + 'api/v1/friend-requests/accept/'+id, { headers: headers })
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
			// Api.put(url + 'api/v1/friendships/decline/friend', { friend_id: id }, { headers: headers })
			// 	.then((res) => {
			// 		toast.success('Đã xóa lời mời kết bạn');
			// 		dispatch(editFriendRequest(id));
			// 		dispatch(selectOption('all'));
			// 	})
			// 	.catch((err) => {
			// 		toast.error('Đã xảy ra lỗi');
			// 	});
				// Api.put(url + 'api/v1/friend-requests/reject/', { friend_id: id }, { headers: headers })
				// .then((res) => {
				// 	toast.success('Đã xóa lời mời kết bạn');
				// 	dispatch(editFriendRequest(id));
				// 	dispatch(selectOption('all'));
				// })
				// .catch((err) => {
				// 	toast.error('Đã xảy ra lỗi');
				// });
				Api.put(url + 'api/v1/friend-requests/reject/'+id, { headers: headers })
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

		Api.post(url + `api/v1/group-member-invitations/${id}/response`, {isAccept:isAccept}, { headers: headers })
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
	const callApifriendRequest = () => {
		Api.get(url + 'api/v1/users/friend-requests', { headers: headers })
			.then((res) => {
				console.log(res.data);
				dispatch(selectFriendRequest(res.data.result));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// const callApifriendRequest = () => {
	// 	Api.get(url + 'api/v1/friendships/friend/pending', { headers: headers })
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			dispatch(selectFriendRequest(res.data.friendWithAuthor));
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

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

	const callRelationShip = () => {
		Api.get(url+ 'api/v1/relationships/student/relationship-requests', { headers: headers })
		.then((res) => {
			setListRelationShip(res.data.result);
		})
		.catch((err) => {
			console.log(err);
		}
		)
	}

	return (
		<>
			<div className="friend-request">
				<div className="friend-request__title">
					<p>Lời mời kết bạn</p>
				</div>
				{friendRequest &&
					friendRequest.length > 0 &&
					friendRequest.map(
						(item, index) => (
							item.status === 'PENDING' ? (
							<div
								className="friend-request__item"
								key={item.id}
								onClick={() => {
									dispatch(selectFriend(item.id));
								}}
							>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.sender.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button">
									<div className="friend-request__item__name">
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
						)
						 : null

					))}
				{lisstInvite && lisstInvite.length > 0 && (
					<div className="friend-request__title">
						<p>Lời mời tham gia nhom lop</p>
					</div>
				)}

				{lisstInvite &&
					lisstInvite.map((item, index) =>
						item.state === 'PENDING' ? (
							<div style={{backgroundColor:'aliceblue'}}>
								<div className="friend-request__item" key={item.id} onClick={() => {}} style={{border:'none', marginBottom:'0px'}}>
									<div style={{ flex: '2', margin: '15px', marginTop: '18px' , paddingBottom:'1px'}}>
										<div className="friend-request__item__avatar">
											<Avatar src={item.inviter.avartarUrl} alt="" />
										</div>
									</div>
									<div className="friend-request__item__button">
										<div className="friend-request__item__name">
											<p>
												{item.inviter.firstName + ' ' + item.inviter.lastName} 
											</p>
											<strong>Mời bạn tham gia</strong>
										</div>
									</div>
								</div>
								<LableGroup id={item.group.id} name={item.group.name} image={item.group.avatarUrl} style={{backgroundColor:'aliceblue'}} />
								<div style={{ textAlign: 'center', marginBottom:'20px' }}>
									<button
										className="btn btn-primary"
										style={{ backgroundColor: '#1677ff', width: '83px' }}
										onClick={acceptInvite('ACCEPT', item.id)}
									>
										Chấp nhận
									</button>
									<button
										className="btn btn-danger"
										onClick={acceptInvite('REJECT', item.id)}
										style={{ width: '64px' }}
									>
										Xóa
									</button>
								</div>
							</div>
						) : null
					)}
				<ToastContainer />
			</div>
		</>
	);
}
