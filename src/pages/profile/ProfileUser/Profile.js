import React, { useEffect, useState } from 'react';
import './Profile.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import PostItem from '../../home/components/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptionProfile } from '../../../redux/Group';
import { selectSelectedOptionProfile } from '../../../redux/Group';
import { BsGenderTrans } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { TbBuildingFactory } from 'react-icons/tb';
import { AiFillPhone } from 'react-icons/ai';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectselectUser } from '../../../redux/MemberGroup';
import Api from '../../../../src/api/Api';
import { url } from '../../../constants/Constant';
import { anh_logo } from '../../../constants/Constant';
import { selectFriend, selectselectFriendOfFriend } from '../../../redux/Friend';
import { Tabs } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
export default function Profile(props) {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { uuid } = useParams();
	// const user = useSelector(selectselectUser);
	const [user, setUser] = useState();

	//const friendOfFriend = useSelector(selectselectFriendOfFriend);
	const [friendOfFriend, setFriendOfFriend] = useState();
	const [items, setItem] = useState([]);
	const [isFriend, setIsFriend] = useState(false);
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	};
	useEffect(() => {
		if (uuid && uuid === JSON.parse(localStorage.getItem('user')).id) {
			navigate('/profile');
		} else if (uuid && uuid !== JSON.parse(localStorage.getItem('user')).id) {
			CallApiprofile(uuid)
			ValidateFriend();
			
		} else {
			CallApiprofile(props.id)
			ValidateFriend();
			
		}
	}, [props.id, uuid]);

	const CallApiprofile = async (id) => {
		Api.get(url + 'api/v1/users/userDto/' + id)
				.then((res) => {
					// dispatch(selectUser(res.data));
					 setUser(res.data);
					CallApilistFriend(res.data);				
				})
				.catch((err) => {
					console.log(err);
				});
	}
		
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
		if (uuid && uuid !== JSON.parse(localStorage.getItem('user')).id) {
			Api.get(url + 'api/v1/users/friends-of-user?uId=' + uuid)
				.then((res) => {
					const validateFriendshipPromises = res.data.result.map(async (user) => {
						try {
						  const friendshipResponse = await Api.get(url + 'api/v1/friendships/validate?friendId=' + user.id, { headers });
						  const isFriend = friendshipResponse.data.result === true ? 1 : 0; // 1 đã kết bạn , 0 chưa kết bạn
						  return { ...user, isFriend };
						} catch (err) {
						  console.error(err);
						  return { ...user, isFriend: 2 };// chưa đăng nhập
						}
					  });
					setFriendOfFriend(validateFriendshipPromises);

					setItem([
						{
							key: '1',
							tab: 'Giới thiệu',
							label: (
								<div style={{}}>
									<h3>Giới thiệu</h3>{' '}
								</div>
							),
							children: (
								<div className="introduce" style={{ justifyContent: 'center' , display:'flex'}}>
									<div style={{textAlign:'start'}}>
									{user.phone ? (
										<div style={{ width: '100%', margin: '5px 0' }}>
										<span style={{ fontWeight: 'bold' }}>	Số điện thoại<AiFillPhone className="icon-profile"></AiFillPhone> :{' '}
										</span>
											{user.phone}
										</div>
									) : null}
									{user.dob ? (
										<div style={{ width: '100%', margin: '5px 0' }}>
											<span style={{ fontWeight: 'bold' }}>Ngày sinh
											<LiaBirthdayCakeSolid className="icon-profile"></LiaBirthdayCakeSolid> :{' '}
											</span>
											{user.dob}
										</div>
									) : null}

									{user.gender ? (
										<div style={{ width: '100%', margin: '5px 0' }}>
											<span style={{ fontWeight: 'bold' }}>Giới tính<BsGenderTrans className="icon-profile"></BsGenderTrans> :{' '}</span>
											{user.gender}
										</div>
									) : null}

									{user.workAt ? (
										<div style={{ width: '100%', margin: '5px 0' }}>
											<span style={{ fontWeight: 'bold' }}> Nơi làm việc<TbBuildingFactory className="icon-profile"></TbBuildingFactory> :{' '}
											</span>
											{user.workAt}
											
										</div>
									) : null}
									
										<div style={{ width: '100%', margin: '5px 0' }}>
										<span style={{ fontWeight: 'bold' }}> Địa chỉ<CiLocationOn className="icon-profile"></CiLocationOn> :
											{user.province ? user.province : null}
											{user.district ? user.district : null}
											
											 </span> 
										</div>
									
									{
										user.parent !== null ? (
											
												<div style={{ width: '100%', margin: '5px 0' }}>
													<span style={{ fontWeight: 'bold' }} onClick={()=>{navigate(`/profile/${user.parents[0].id}`)}}>Phụ huynh: {`${user.parents[0].firstName} ${user.parents[0].lastName}`}</span>
											</div>
										) : null
									}
									{
										user.children !== null ? (
											
												<div style={{ width: '100%', margin: '5px 0' }}>
													<span style={{ fontWeight: 'bold' }}>Con: {`${user.children[0].firstName} ${user.children[0].lastName}`}</span>
											</div>
										) : null
									}
								</div>
								</div>
							),
						},
						{
							key: '2',
							tab: 'Bạn bè',
							label: (
								<div style={{}}>
									<h3>Bạn bè</h3>{' '}
								</div>
							),
							children: (
								<div style={{ textAlign: 'center' }}>
									{friendOfFriend &&
										friendOfFriend.length > 0 &&
										friendOfFriend.map((item, index) => {
											return (
												<div key={index} className="friend">
													<div className="friend-avatar">
														<img
															src={item.avatarUrl === null ? item.avatarUrl : anhlogo1}
															alt=""
														/>
													</div>
													<div className="friend-name">
														<span>{item.firstName + ' ' + item.lastName}</span>
													</div>
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
		Api.get(url + 'api/v1/friendships/validate?friendId=' + uuid)
			.then((res) => {
				setIsFriend(res.data.result ? true : false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="profile-user">
			{user && (
				<div>
					<div>
						<div className="cover-photo">
							<img src={user.coverUrl !== '' ? user.coverUrl : anh_logo} alt="Cover Photo" />
						</div>
					</div>
					<div>
						<div className="profile-picture">
							<img src={user.avatarUrl !== '' ? user.avatarUrl : anh_logo} alt="Profile Picture" />
						</div>

						<div style={{ textAlign: 'center' }} className="title-profile">
							<div style={{ display: 'flex', justifyContent: 'center' }} className="infor-user">
								<p style={{ fontSize: '35px' }}>{user.firstName + ' ' + user.lastName}</p>
								<p style={{ fontSize: '15px', backgroundColor: 'aliceblue', marginTop:'33px',height:'fit-content' }}>
								
								{user.role === 'TEACHER' ? '(Giáo viên)' : null}
								{user.role === 'PARENT' ? '(Phụ huynh)' : null}
								{user.role === 'STUDENT' ? '(Học sinh)' : null}
							</p>
								{!isFriend && uuid && uuid !== JSON.parse(localStorage.getItem('user')).id ? (
									<button style={{ maxWidth: '10%', backgroundColor: '0866ff' }} onClick={() => {}}>
										Thêm bạn
									</button>
								) : null}
								
							</div>
							
						</div>
						
					</div>
					<Tabs defaultActiveKey="1" items={items} centered />
				</div>
			)}
		</div>
	);
}
