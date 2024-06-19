import React, { useEffect, useState } from 'react';
import LableGroup from './../components/LableGroup';
import { Button, Checkbox, Dropdown } from 'antd';
import './LeftItemGroup.css';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { HiOutlineClipboardDocumentList, HiInformationCircle } from 'react-icons/hi2';
import { MdEventNote } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { url } from './../../../constants/Constant';
import UseTheme from './../../../layouts/UseTheme';
import Api from './../../../api/Api';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { selectGroup } from './../../../redux/GetItemGroup';
import { selectselectMemberGroup } from './../../../redux/MemberGroup';
import { selecteventGroup } from './../../../redux/EventGroup';
import { selectMemberGroup } from './../../../redux/MemberGroup';
import { selectMemberGroupRequest } from './../../../redux/MemberGroup';
import { selectUser, selectselectUser } from './../../../redux/MemberGroup';
import { selectOption, selectSelectedOption } from '../../../redux/Group';
import { useLocation } from 'react-router-dom';
import { selectPostGroup } from '../../../redux/Group';
import { selectexam } from '../../../redux/Exam';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSignsPost } from 'react-icons/fa6';
import { MdGroups2 } from 'react-icons/md';
import { Skeleton, Avatar, Input } from 'antd';
import { Dialog } from 'primereact/dialog';
import moment from 'moment';
import { selectFriendInvite, editSelectFriendInvite, selectselectFriendInvite } from '../../../redux/Friend';
import anh_logo_1 from './../../../assets/images/anh_logo_1.jpg';
import Loading from '../../../components/Loading';
import { Edit } from '@material-ui/icons';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
export default function LeftItemGroup() {
	const { theme } = UseTheme();
	const [inforGroup, setInforGroup] = useState(null);
	const [role, setRole] = useState('GUEST');
	const navigate = useNavigate();
	const [group, setGroup] = useState({});
	const { uuid } = useParams();
	const location = useLocation();
	const isClassesPath = location.pathname.includes('classes');
	const memberGroup = useSelector(selectselectMemberGroup);
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [checkedItems, setCheckedItems] = useState({});
	const [listfriend, setListFriend] = useState([]);
	const selectedOption = useSelector(selectSelectedOption) || 'post';
	const [listFriendSearch, setListFriendSearch] = useState([...listfriend]);
	const listfriendSelected = useSelector(selectselectFriendInvite);
	const [newName, setNewName] = useState('');
	const [openEditName, setOpenEditName] = useState(false);
	const [newDescription, setNewDescription] = useState('');
	const [openChangeAvatar, setOpenChangeAvatar] = useState(false);
	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};
	const RequestJoinGroup = () => {
		Api.post(url + 'api/v1/group-members/request', { groupId: uuid }, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
				} else if (response.data.statusCode === 201) {
					toast.success(response.data.message);
					window.location.reload();
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
				const isclass = location.pathname.includes('classes');
				if (isclass) {
					setTimeout(() => {
						navigate('/classes/');
					}, 3000);
				} else {
					setTimeout(() => {
						navigate('/groups/');
					}, 3000);
				}
			});
	};
	const getGroup = () => {
		Api.get(url + 'api/v1/groups/' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					if (response.data.result.user) {
						setRole(response.data.result.user.role);
						localStorage.setItem('roleGroup', response.data.result.user.role);
					}

					setGroup(response.data.result.group);
					setInforGroup(response.data.result.group);
					dispatch(selectGroup(response.data.result.group));
					dispatch(selectUser(response.data.result.user));
				} else {
					toast.error(response.data.message);
					if (isClassesPath) {
						setTimeout(() => {
							navigate('/classes/');
						}, 1000);
					} else {
						setTimeout(() => {
							navigate('/groups/');
						}, 1000);
					}
				}
			})
			.catch((error) => {
				toast.error('Không thể truy cập nhóm ! Nhóm không tồn tại');
				if (isClassesPath) {
					setTimeout(() => {
						navigate('/classes/');
					}, 2000);
				} else {
					setTimeout(() => {
						navigate('/groups/');
					}, 2000);
				}
			});
	};
	useEffect(() => {
		getGroup();
		Api.get(url + 'api/v1/group-members?groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectMemberGroup(response.data.result));
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
		Api.get(url + 'api/v1/events?groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selecteventGroup(response.data.result));
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
		Api.get(url + 'api/v1/group-member-requests?groupId=' + uuid + '&state=PENDING', { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectMemberGroupRequest(response.data.result));
				} else {
					//toast.error(response.data.message);
				}
			})
			.catch((error) => {
				//toast.error(error);
			});
		Api.get(url + 'api/v1/posts?' + 'groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectPostGroup(response.data.result));
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		if (isClassesPath) {
			Api.get(url + 'api/v1/exams/group/' + uuid, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						dispatch(selectexam(response.data.result));
					} else {
						console.log(response.error);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		//dispatch(selectOption('post'))
	}, []);

	const convertDay = (date) => {
		console.log(date);
		return date.slice(0, 10);
		// const dateConvert = new Date(date);
		// console.log(dateConvert);
		// const day = dateConvert.getDate();
		// const month = dateConvert.getMonth() + 1;
		// const year = dateConvert.getFullYear();
		// console.log(day + '/' + month + '/' + year);
		// return day + '/' + month + '/' + year;
	};
	const openDialogInviteMember = () => {
		//dispatch(selectFriendInvite());
		Api.get(url + 'api/v1/users/friends', { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					setListFriend(response.data.result);
					setListFriendSearch(response.data.result);
					setVisible(true);
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const checkChecked = (item) => {
		if (listfriendSelected && listfriendSelected.length > 0) {
			for (let i = 0; i < listfriendSelected.length; i++) {
				if (listfriendSelected[i].id === item.id) {
					return true;
				}
			}
		}
		return false;
	};
	const handleCheckboxChange = (item) => {
		const newCheckedItems = { ...checkedItems, [item]: !checkedItems[item] };
		setCheckedItems(newCheckedItems);

		if (!checkedItems[item]) {
			dispatch(selectFriendInvite(item));
		} else {
			dispatch(editSelectFriendInvite(item));
		}
	};

	const Search = (e) => {
		return (e) => {
			if (e.target.value !== '') {
				setListFriendSearch(
					listfriend.filter((item) => {
						return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
					})
				);
			} else {
				setListFriendSearch(listfriend);
			}
		};
	};
	const inviteFriend = () => {
		setLoading(true);
		try {
			if (listfriendSelected && listfriendSelected.length > 0) {
				listfriendSelected.map((item, index) => {
					Api.post(
						url + 'api/v1/group-members/invite',
						{ groupId: uuid, userId: item.id },
						{ headers: headers }
					)
						.then((response) => {
							if (response.data.statusCode === 200) {
								toast.success(response.data.message);
							} else {
								toast.error(response.data.message);
							}
						})
						.catch((error) => {
							toast.error(error);
						});
				});
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
			setVisible(false);
		}
	};
	const items = [
		{
			key:'1',
			label:(<div style={{display:'flex',alignItems:'center'}} onClick={()=>{setOpenEditName(true)}}><MdDriveFileRenameOutline style={{marginRight:'10px'}}/>Đổi thông tin nhóm</div>),
			
		},
		{
			key:'2',
			label: (<div style={{display:'flex',alignItems:'center'}} onClick={()=>{setOpenChangeAvatar(true)}}><CiCamera style={{marginRight:'10px'}}/>Đổi ảnh đại diện</div>),
			
			
		},
	];
	const EditNameGroup = () => {
		setLoading(true);
		Api.put(
			url + 'api/v1/groups/' + uuid + '/updateDetail',
			{
				name: newName,
				description: newDescription,
			},
			{ headers: headers }
		)
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setOpenEditName(false);

					setNewName('');
					setNewDescription('');
					window.location.reload();
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const [AvartarPicture, setAvartarPicture] = useState(group.avatarUrl);
	const [selectedFile, setSelectedFile] = useState(null);
	const openAvatarPictureDialog = () => {
		document.getElementById('AvartarPictureInput').click();
	};
	const handleAvatarPictureChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setAvartarPicture(reader.result);
				setSelectedFile(file);
			};
			reader.readAsDataURL(file);
		}
	};
	const UpdateAvatar = () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'multipart/form-data',
		};
		setLoading(true);
		let data = new FormData();
		data.append('mediaFile', selectedFile);
		Api.put(url + 'api/v1/groups/' + uuid + '/updateAvatar', data, {
			headers: headers,
		})
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setAvartarPicture(response.data.result);
					setSelectedFile(null);
					window.location.reload();
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<>
			{loading ? <Loading /> : null}
			<Dialog
				header={
					<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em' }}>Mời thành viên</div>
				}
				visible={visible}
				style={{ width: '50vw', height: '60vh' }}
				onHide={() => {
					setVisible(false);
				}}
			>
				<div className="body-invite-friend" style={{ position: 'relative' }}>
					<div className="left-invite-friend" style={{ position: 'relative' }}>
						<input placeholder="Tìm bạn bè" onChange={Search()} style={{ position: 'sticky' }} />
						<span style={{ marginBottom: '15px' }}>Gợi ý</span>
						{listFriendSearch && listFriendSearch.length > 0 ? (
							<div style={{ height: '30vh', overflowY: 'scroll' }}>
								{listFriendSearch.map((item, index) => {
									return (
										<div style={{ display: 'flex', marginRight: '15px', marginBottom: '15px' }}>
											<Avatar src={item.avatarUrl} alt="avatar" />
											<span style={{ margin: '0 15px', paddingTop: '12px' }}>
												{item.firstName} {item.lastName}
											</span>

											<Checkbox
												style={{ marginLeft: 'auto' }}
												onChange={() => handleCheckboxChange(item)}
												checked={checkChecked(item) || false}
											/>
										</div>
									);
								})}
							</div>
						) : null}
					</div>
					<div className="right-invite-friend">
						<p>
							Đã chọn{' '}
							{listfriendSelected && listfriendSelected.length > 0 ? listfriendSelected.length : 0} người
							bạn
						</p>
						{listfriendSelected && listfriendSelected.length > 0 ? (
							<div style={{ height: '30vh', overflowY: 'scroll' }}>
								{listfriendSelected.map((item, index) => {
									return (
										<div style={{ display: 'flex', marginRight: '15px', marginBottom: '15px' }}>
											<Avatar src={item.avatarUrl} alt="avatar" />
											<span style={{ margin: '0 15px', paddingTop: '12px' }}>
												{item.firstName} {item.lastName}
											</span>
											<button
												style={{ marginLeft: 'auto', backgroundColor: 'white',  }}
												onClick={() => {
													dispatch(editSelectFriendInvite(item));
												}}
											>
												X
											</button>
										</div>
									);
								})}
							</div>
						) : null}
					</div>
				</div>
				<div className="footer-invite-friend" style={{ textAlign: 'center' }}>
					<button style={{ backgroundColor: 'e6e6e6' }}>
						<strong>Hủy</strong>
					</button>
					<button style={{ backgroundColor: '1677ff' }} onClick={inviteFriend}>
						<strong>Gửi lời mời</strong>
					</button>
				</div>
			</Dialog>
			<Dialog
				header= {<div style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5em" }}>Đổi thông tin</div>}
				visible={openEditName}
				style={{ width: '50vw' }}
				onHide={() => {
					setOpenEditName(false);
					setNewName('');
					setNewDescription('');
				}}
			>
				<div className="p-fluid">
					<div className="p-field" style={{textAlign:'center'}}>
						<div style={{display:'flex', marginTop:'2rem'}}>
						<label >Tên nhóm</label>
						<Input
							value={newName}
							label="Tên nhóm"
							onChange={(e) => {
								setNewName(e.target.value);
							}}
							placeholder={group.name}
							style={{ marginBottom: '1rem' , width:'80%', marginLeft:'1.2rem'}}
						/>
						</div>
						<div style={{display:'flex'}}>
						<label htmlFor="description">Mô tả</label>
						<Input
							value={newDescription}
							label="Mô tả"
							onChange={(e) => {
								setNewDescription(e.target.value);
							}}
							placeholder={group.description}
							style={{ marginBottom: '1rem', width:'80%' , marginLeft:'3rem'}}
						/>
						</div>
					</div>
				</div>
				<Button
					type="primary"
					style={{ width: '10rem', marginTop: '1rem' }}
					onClick={() => {
						EditNameGroup();
					}}
				>
					Lưu
				</Button>
			</Dialog>

			<Dialog
				header= {<div style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5em" }}>Đổi ảnh đại diện</div>}
				visible={openChangeAvatar}
				style={{ width: '50vw' }}
				onHide={() => {
					setOpenChangeAvatar(false);
				}}
			>
				<div className="p-fluid">
					<div className="p-field">
						<div className="anhdaidien">
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Ảnh bìa</h3>
								<button
									style={{
										textAlign: 'end',
										margin: '0 10px 0 0',
										color: 'blue',
										backgroundColor:'white',
									}}
									onClick={openAvatarPictureDialog}
								>
									Thêm
								</button>
							</div>
							<div className="Cover-picture-edit">
								<img src={AvartarPicture} alt="Cover Picture" />
							</div>
						</div>
						<div>
							<input
								style={{ display: 'none' }}
								type="file"
								accept="image/*"
								onChange={handleAvatarPictureChange}
								id="AvartarPictureInput"
							/>
						
						</div>
					</div>
				</div>
				<Button
					type="primary"
					style={{ width: '10rem', marginTop: '1rem' }}
					onClick={() => {
						UpdateAvatar();
					}}
				>
					Lưu
				</Button>
			</Dialog>

			<div style={{ position: 'relative', borderRight: '0.2px solid black', top: '45px' }}>
				{memberGroup === null || inforGroup === null ? (
					<Skeleton />
				) : (
					<div>
						<div className="header-item-group">
							{inforGroup ? (
								<div style={{ display: 'flex', marginLeft: '35px', marginTop: '15px' }}>
									<h4 style={{ textAlign: 'center', margin: '0px' }}>Nhóm :</h4>
									<span style={{ paddingLeft: '5px' }}>
										{inforGroup && inforGroup.isPublic === true ? 'Công Khai' : 'Riêng tư'}
									</span>
								</div>
							) : null}

							{memberGroup && memberGroup.length > 0 ? (
								<div style={{ display: 'flex', marginLeft: '35px' }}>
									<h4 style={{ textAlign: 'center', margin: '0px' }}>Thành viên:</h4>
									<span style={{ paddingLeft: '5px' }}>{memberGroup && memberGroup.length}</span>
								</div>
							) : null}
							{inforGroup && inforGroup.createdAt ? (
								<div style={{ display: 'flex', marginLeft: '35px' }}>
									<h4 style={{ textAlign: 'center', margin: '0px' }}>Ngày tạo: </h4>
									<span style={{ paddingLeft: '5px' }}>{convertDay(inforGroup.createdAt)}</span>
								</div>
							) : null}

							<div className="button-add-member">
								{(role && role === 'GROUP_ADMIN') ||
								role === 'GROUP_MEMBER' ||
								role === 'GROUP_OWNER' ? (
									<div>
										<Button
											type="primary"
											style={{
												width: '95%',
												margin: '5px 0 10px 7px',
												height: '50px',
												alignItems: 'center',
											}}
											onClick={openDialogInviteMember}
										>
											<span style={{ fontSize: '15px', fontWeight: '500' }}>
												{' '}
												+ Mời thành viên
											</span>
										</Button>
									</div>
								) : (
									<Button
										type="primary"
										style={{
											width: '95%',
											margin: '5px 0 12px 7px',
											height: '50px',
											alignItems: 'center',
										}}
										onClick={RequestJoinGroup}
									>
										<span style={{ fontSize: '15px', fontWeight: '500' }}>Tham gia nhóm</span>
									</Button>
								)}
							</div>
						</div>
						<div style={{ overflow: 'auto', color: theme.foreground, background: theme.background }}>
							{role === 'GROUP_ADMIN' || role === 'GROUP_MEMBER' || role === 'GROUP_OWNER' ? (
								<div>
									<div
										className={`custom-option-group ${selectedOption === 'post' ? 'active' : ''}`}
										onClick={() => {
											dispatch(selectOption('post'));
										}}
									>
										<FaSignsPost className="icon-option-group" size={20} />
										<span className="option-label-group">Bài viết</span>
									</div>
									<div
										className={`custom-option-group ${
											selectedOption === 'question' ? 'active' : ''
										}`}
										onClick={() => {
											dispatch(selectOption('question'));
										}}
									>
										<QuestionCircleOutlined className="icon-option-group" size={20} />
										<span className="option-label-group">Khảo sát</span>
									</div>
									<div
										className={`custom-option-group ${selectedOption === 'member' ? 'active' : ''}`}
										onClick={() => {
											dispatch(selectOption('member'));
										}}
									>
										<MdGroups2 className="icon-option-group" size={20} />
										<span className="option-label-group">Thành viên</span>
									</div>

									{isClassesPath ? (
										<div
											className={`custom-option-group ${
												selectedOption === 'exam' ? 'active' : ''
											}`}
											onClick={() => {
												dispatch(selectOption('exam'));
											}}
										>
											<QuestionCircleOutlined className="icon-option-group" size={20} />
											<span className="option-label-group">Bài kiểm tra</span>
										</div>
									) : null}
									{isClassesPath ? (
										<div
											className={`custom-option-group ${
												selectedOption === 'rank' ? 'active' : ''
											}`}
											onClick={() => {
												dispatch(selectOption('rank'));
											}}
										>
											<FaRankingStar  className="icon-option-group" size={20} />
											<span className="option-label-group">Xếp hạng</span>
										</div>
									) : null}
									<div
										className={`custom-option-group ${
											selectedOption === 'document' ? 'active' : ''
										}`}
										onClick={() => {
											dispatch(selectOption('document'));
										}}
									>
										<HiOutlineClipboardDocumentList className="icon-option-group" size={20} />
										<span className="option-label-group">Tài liệu học tập</span>
									</div>

									<div
										className={`custom-option-group ${selectedOption === 'event' ? 'active' : ''}`}
										onClick={() => {
											dispatch(selectOption('event'));
										}}
									>
										<MdEventNote className="icon-option-group" size={20} />
										<span className="option-label-group">Sự kiện</span>
									</div>
									{role === 'GROUP_ADMIN' || role === 'GROUP_OWNER' ? (
										<div>
											<div
												className={`custom-option-group ${
													selectedOption === 'manager-member' ? 'active' : ''
												}`}
												onClick={() => {
													dispatch(selectOption('manager-member'));
												}}
											>
												<AiOutlineUsergroupAdd className="icon-option-group" size={20} />
												<span className="option-label-group">Quản lý thành viên</span>
											</div>
											<div>
												<Dropdown
													menu={{
														items,
													}}
													placement="TopRight"
													arrow={{
														pointAtCenter: true,
													}}
													style={{ border: 'none', flex: 1 }}
												>
													<button style={{backgroundColor:'white', width:'94%',textAlign:'start'}}>
														<HiInformationCircle className="icon-option-group" size={20}  />
														<span className="option-label-group">Quản lý nhóm</span>
													</button>
												</Dropdown>
											</div>
										</div>
									) : null}
								</div>
							) : null}
						</div>
					</div>
				)}

				<ToastContainer style={{ zIndex: '1000' }} />
			</div>
		</>
	);
}
