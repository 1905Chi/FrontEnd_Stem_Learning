import React, { useEffect, useState } from 'react';
import './Profile.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import { useDispatch } from 'react-redux';
import { BsGenderTrans } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { TbBuildingFactory } from 'react-icons/tb';
import { AiFillPhone } from 'react-icons/ai';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Api from '../../../../src/api/Api';
import { url } from '../../../constants/Constant';
import { anh_logo } from '../../../constants/Constant';
import { Tabs } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { FaFacebookMessenger } from "react-icons/fa";
import { Skeleton } from 'antd';
export default function Profile(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { uuid } = useParams();
	// const user = useSelector(selectselectUser);
	const [user, setUser] = useState();

	//const friendOfFriend = useSelector(selectselectFriendOfFriend);
	const [friendOfFriend, setFriendOfFriend] = useState();

	const [items, setItem] = useState();
	console.log('friendOfFriend', items);
	const [isFriend, setIsFriend] = useState(false);
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	};
	useEffect(() => {
		if (uuid && uuid === JSON.parse(localStorage.getItem('user')).id) {
			navigate('/profile');
		} else if (uuid && uuid !== JSON.parse(localStorage.getItem('user')).id) {
			CallApiprofile(uuid);
			ValidateFriend();
		} else {
			CallApiprofile(props.id);
			ValidateFriend();
		}
	}, [props.id, uuid]);

	const CallApiprofile = async (id) => {
		Api.get(url + 'api/v1/users/userDto/' + id)
			.then((res) => {
				// dispatch(selectUser(res.data));
				setUser(res.data);
				console.log('dada', res.data);
				CallApilistFriend(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const Requestfriend = async (id) => {
		try {
			await Api.post(
				url + 'api/v1/friend-requests',
				{
					userId: id,
				},
				{ Headers: headers }
			).then((res) => {
				toast.success('Gửi lời mời kết bạn thành công');
			});
		} catch (err) {
			console.log(err);
		}
	};
	const CallApilistFriend = async (user) => {
		console.log('user', user);
		if ((uuid && uuid !== JSON.parse(localStorage.getItem('user')).id )||(props.id && props.id !== JSON.parse(localStorage.getItem('user')).id))   {
			const id= uuid ? uuid : props.id;
			Api.get(url + 'api/v1/users/friends-of-user?uId=' + id)
				.then((res) => {
					// const validateFriendshipPromises = res.data.result.map(async (user) => {
					// 	return { ...user.user, isFriend: user.isFriend };
					// 	// try {
					// 	// 	const friendshipResponse = await Api.get(
					// 	// 		url + 'api/v1/friendships/validate?friendId=' + user.user.id,
					// 	// 		{ headers }
					// 	// 	);
					// 	// 	const isFriend = friendshipResponse.data.result === true ? 1 : 0; // 1 đã kết bạn , 0 chưa kết bạn
					// 	// 	return { ...us	er.user, isFriend };
					// 	// } catch (err) {
					// 	// 	console.error(err);
					// 	// 	return { ...user, isFriend: 2 }; // chưa đăng nhập
					// 	// }
					// });
					// setFriendOfFriend(validateFriendshipPromises);
					const listFriend = res.data.result;
					console.log('listFriend', listFriend);
					//console.log('validateFriendshipPromises', validateFriendshipPromises);

					setItem([
						{
							key: '1',
							tab: '<h2>Bạn bè</h2>',
							label: (
								<div style={{}}>
									<h3>Giới thiệu</h3>
								</div>
							),
							children: (
								<div className="introduce" style={{ justifyContent: 'center', display: 'flex' }}>
									<div style={{ textAlign: 'start' }}>
										{user.phone ? (
											<div style={{ width: '100%', margin: '5px 0' }}>
												<span style={{ fontWeight: 'bold' }}>
													Số điện thoại
													<AiFillPhone className="icon-profile"></AiFillPhone> :
												</span>
												{user.phone}
											</div>
										) : null}
										{user.dob ? (
											<div style={{ width: '100%', margin: '5px 0' }}>
												<span style={{ fontWeight: 'bold' }}>
													Ngày sinh
													<LiaBirthdayCakeSolid className="icon-profile"></LiaBirthdayCakeSolid>
													:
												</span>
												{user.dob}
											</div>
										) : null}

										{user.gender ? (
											<div style={{ width: '100%', margin: '5px 0' }}>
												<span style={{ fontWeight: 'bold' }}>
													Giới tính
													<BsGenderTrans className="icon-profile"></BsGenderTrans> :
												</span>
												{user.gender}
											</div>
										) : null}

										<div style={{ width: '100%', margin: '5px 0' }}>
											<span style={{ fontWeight: 'bold' }}>
												Địa chỉ<CiLocationOn className="icon-profile"></CiLocationOn> :
												{user.province ? user.province : null}
												{user.district ? user.district : null}
											</span>
										</div>

										{user.parents !== null ? (
											<div style={{ width: '100%', margin: '5px 0' }}>
												<span
													style={{ fontWeight: 'bold' }}
													onClick={() => {
														navigate(`/profile/${user.parents[0].id}`);
													}}
												>
													Phụ huynh:
													{`${user.parents[0].firstName} ${user.parents[0].lastName}`}
												</span>
											</div>
										) : null}
										{user.children !== null ? (
											<div style={{ width: '100%', margin: '5px 0' }}>
												<span style={{ fontWeight: 'bold' }}>
													Con: {`${user.children[0].firstName} ${user.children[0].lastName}`}
												</span>
											</div>
										) : null}
									</div>
								</div>
							),
						},
						{
							key: '2',
							tab: '<h2>Bạn bè</h2>',
							label: (
								<div style={{}}>
									<h3>Bạn bè</h3>
								</div>
							),
							children: (
								<div
									style={{
										textAlign: 'center',
										display: 'flex',
										flexWrap: 'wrap',
										overflowY: 'auto',
										justifyContent: 'center',
									}}
								>
									{listFriend &&
										listFriend.length > 0 &&
										listFriend.map((item, index) => {
											return (
												<div
													key={index}
													className="friend"
													style={{ width: '21%', height: 'auto' }}
												>
													<div className="friend-avatar">
														<img
															src={
																item.user.avatarUrl === null
																	? item.user.avatarUrl
																	: anhlogo1
															}
															alt=""
															style={{
																width: '80%',
																height: '15rem',
																borderRadius: '1rem',
															}}
														/>
													</div>
													<div className="friend-name">
														<span>{item.user.firstName + ' ' + item.user.lastName}</span>
													</div>
													{
														!item.isFriend ? (
															<button
																style={{
																	backgroundColor: '#0866ff',
																	color: 'white',
																	borderRadius: '0.5rem',
																	margin: '0.5rem 0',
																}}
																onClick={() => {
																	Requestfriend(item.user.id);
																}}
															>
																Thêm bạn
															</button>
														) : null
														// <button}
													}
												</div>
											);
										})}
								</div>
							),
						},
					]);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const ValidateFriend = () => {
		const id = uuid ? uuid : props.id;
		Api.get(url + 'api/v1/friendships/validate?friendId=' + id)
			.then((res) => {
				setIsFriend(res.data.result ? true : false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="profile-user">
			{user && items  ? (
				<div>
					<div style={{ position: 'relative' }}>
						<div className="cover-photo">
							<img src={user.coverUrl !== '' ? user.coverUrl : anh_logo} alt="Cover Photo" />
						</div>
						<div className="profile-picture">
							<img src={user.avatarUrl !== '' ? user.avatarUrl : anh_logo} alt="Profile Picture" />
						</div>
					</div>
					<div>
						<div style={{ textAlign: 'center' }} className="title-profile">
							<div style={{ display: 'flex', justifyContent: 'center' }} className="infor-user">
								<p style={{ fontSize: '35px' }}>{user.firstName + ' ' + user.lastName}</p>
								<p
									style={{
										fontSize: '15px',
										backgroundColor: 'aliceblue',
										marginTop: '33px',
										height: 'fit-content',
									}}
								>
									{user.role === 'TEACHER' ? '(Giáo viên)' : null}
									{user.role === 'PARENT' ? '(Phụ huynh)' : null}
									{user.role === 'STUDENT' ? '(Học sinh)' : null}
								</p>
								{!isFriend && (uuid || props.id) ? (
									<button style={{ maxWidth: '10%', backgroundColor: '0866ff' }} onClick={() => {}}>
										Thêm bạn
									</button>
								) : (<button onClick={()=>{navigate(`/messenger/u/${user.id}`)}}><FaFacebookMessenger style={{color:'white', backgroundColor:'blue'}}/> Nhắn tin</button>)}
							</div>
						</div>
					</div>
					<Tabs defaultActiveKey="1" items={items} centered />
				</div>
			) : (
				<Skeleton
					avatar
					paragraph={{
						rows: 4,
					}}
				/>
			)}
			<ToastContainer />
		</div>
	);
}
