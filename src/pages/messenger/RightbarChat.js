import { BottomNavigation, BottomNavigationAction, Popover } from '@material-ui/core';
import {
	FileCopy,
	Photo,
	VideoLibrary,
	MoreHoriz,
	BorderColorOutlined,
	ImageOutlined,
	ChatBubbleOutlined,
	RemoveCircle,
	AccountCircle,
	SettingsOutlined,
	PersonAddOutlined,
	ExitToAppOutlined,
	SwapHorizontalCircleOutlined,
	Sync,
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import {
	Divider,
	Button,
	Image,
	Select,
	Collapse,
	Switch,
	Space,
	List,
	Avatar,
	Modal,
	Input,
	Form,
	ConfigProvider,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../context/ThemeContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import './Message.css';

const RightbarChat = ({ user, group, currentData, showRightbar }) => {
	const { Option } = Select;
	const [form] = Form.useForm();
	const [data, setData] = useState({});
	const [choose, setChoose] = useState(0);
	const navigate = useNavigate();
	const [isOwner, setIsOwner] = useState(false);
	const [popoverData, setPopoverData] = useState(null);
	const [friendList, setFriendList] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalType, setModalType] = useState('');
	const [confirmLoading, setConfirmLoading] = useState(false);

	const [AvatarPicture, setAvatarPicture] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	useEffect(() => {
		// Gọi API để lấy danh sách bạn bè khi Modal được mở
		const fetchFriendList = async () => {
			try {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					timeout: 15000,
				};
				const res = await Api.get(url + `api/v1/users/friends`, {
					headers: headers,
				});
				if (res.data.statusCode === 200) {
					setFriendList(res.data.result);
				} else {
					console.log(res.error);
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (isModalVisible && modalType === 'addMember') {
			fetchFriendList(); // Gọi API khi Modal được mở
		}
	}, [isModalVisible]);

	const [photo, setPhoto] = useState([
		'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg',
		'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg',
		'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg',
	]);
	//video
	const [video, setVideo] = useState(['']);

	const [file, setFile] = useState([
		{
			name: 'file1',
		},
		{
			name: 'file2',
		},
		{
			name: 'file3',
		},
	]);
	// giả data cho các giá trị photo, file, video

	const handleButtonClick = (item) => {
		// Lưu giá trị cần truyền vào popover
		setPopoverData(item);
	};

	const handleClosePopover = () => {
		// Đặt giá trị popover về null khi popover đóng
		setPopoverData(null);
	};

	useEffect(() => {
		const fetchData = async () => {
			if (group.id) {
				if (group?.isGroup) {
					try {
						const headers = {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
							timeout: 15000,
						};
						const res = await Api.get(url + `api/v1/chat-rooms/get/${group.id}`, {
							headers: headers,
						});
						if (res.data.statusCode === 200) {
							setData(res.data.result);
						} else {
							console.log(res.error);
						}
					} catch (error) {
						console.log(error);
					}
				} else {
					try {
						const res = await Api.get(url + `api/v1/chat-users/user/${group.id}`);
						if (res?.data) {
							setData(res.data.result);
						} else {
							console.log(res.error);
						}
					} catch (error) {
						console.log(error);
					}
				}
			}
		};
		fetchData();
		currentData(data);
	}, [group]);
	useEffect(() => {
		currentData(data);
		if (data?.authorId === user.id) {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
		console.log('data', data);
	}, [data]);
	const handleClickAvatar = () => {
		if (data.userId) {
			navigate(`/profile/${data.userId}`);
		}
		if (data.postGroupId) {
			navigate(`/groups/${data.postGroupId}`);
		}
	};

	const { theme } = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event, item) => {
		if (anchorEl === null) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
		setPopoverData(item);
		console.log('item', item);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setPopoverData(null);
	};
	const underDev = () => {
		console.error('Chức năng đang được phát triển');
		setAnchorEl(null);
	};

	const items = [
		{
			key: '1',
			label: 'Chỉnh sửa thông tin đoạn chat',
			children: (
				<>
					<Space direction="vertical">
						<Button type="text" className="chat-room-button" onClick={() => showModal('changeName')}>
							<BorderColorOutlined style={{ marginRight: '8px' }} />
							<span>Đổi tên đoạn chat</span>
						</Button>
						<Button type="text" className="chat-room-button" onClick={() => showModal('changeImage')}>
							<ImageOutlined style={{ marginRight: '8px' }} />
							<span>Thay đổi ảnh</span>
						</Button>
						<Button type="text" className="chat-room-button" onClick={() => showModal('changeMode')}>
							<SettingsOutlined style={{ marginRight: '8px' }} />
							<span>Thay đổi chế độ kiểm duyệt</span>
						</Button>
					</Space>
				</>
			),
			collapsible: isOwner ? 'header' : 'disabled',
		},
		{
			key: '2',
			label: 'Thành viên trong đoạn chat',
			children: (
				<>
					<div className="demo-infinite-container">
						<InfiniteScroll
							dataLength={data.members?.length || 0} //This is important field to render the next data
							style={{ flexDirection: 'column', overflow: 'hidden' }}
							hasMore={false}
							endMessage={
								data?.members ? (
									<Button
										type="text"
										className="add-member-button"
										onClick={() => showModal('addMember')}
									>
										<PersonAddOutlined style={{ marginRight: '8px', width: '30%' }} />
										<span>Thêm thành viên</span>
									</Button>
								) : null
							}
						>
							<List
								dataSource={data?.members || [data, user]}
								renderItem={(item) => (
									<List.Item key={item.id}>
										<List.Item.Meta
											avatar={
												<Avatar
													src={
														item?.avatarUrl || 'https://img.icons8.com/ios/50/user--v1.png'
													}
												/>
											}
											title={
												<a href="https://ant.design">{`${item.firstName} ${item.lastName}`}</a>
											}
										/>
										<Button
											type="default"
											icon={<MoreHoriz />}
											className="button--more--member"
											aria-describedby="simple-popover"
											onClick={(event) => handleClick(event, item)}
										/>
										<Popover
											id="simple-popover"
											open={Boolean(anchorEl)}
											className="popper--member"
											anchorEl={anchorEl}
											onClose={handleClose}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
										>
											<Space direction="vertical">
												<Button
													type="text"
													className="chat-room-button"
													onClick={() => {
														navigate(`/messenger/u/${popoverData?.id}`);
													}}
												>
													<ChatBubbleOutlined style={{ marginRight: '8px' }} />
													<span>Nhắn tin</span>
												</Button>
												<Button
													type="text"
													className="chat-room-button"
													onClick={() => {
														navigate(`/profile/${popoverData?.id}`);
													}}
												>
													<AccountCircle style={{ marginRight: '8px' }} />
													<span>Trang cá nhân</span>
												</Button>
												{isOwner ? (
													<>
														<Divider style={{ margin: '0px 0' }} />
														<Button
															type="text"
															className="chat-room-button"
															onClick={(event) => {
																if (anchorEl === null) {
																	setAnchorEl(event.currentTarget);
																} else {
																	setAnchorEl(null);
																}
																showModal('giveAdmin');
															}}
														>
															<SwapHorizontalCircleOutlined
																style={{ marginRight: '8px' }}
															/>
															<span>Đặt làm quản trị viên</span>
														</Button>
														<Button
															type="text"
															className="chat-room-button"
															onClick={(event) => {
																if (anchorEl === null) {
																	setAnchorEl(event.currentTarget);
																} else {
																	setAnchorEl(null);
																}
																showModal('removeMember');
															}}
														>
															<RemoveCircle style={{ marginRight: '8px' }} />
															<span>Xoá thành viên</span>
														</Button>
													</>
												) : null}
											</Space>
										</Popover>
									</List.Item>
								)}
							></List>
						</InfiniteScroll>
					</div>
				</>
			),
		},
		{
			key: '3',
			label: 'File phương tiện',
			children: (
				<>
					<BottomNavigation
						style={{ color: theme.foreground, background: theme.background }}
						className="list--message--sidebar"
						showLabels
						value={choose}
						onChange={(event, newValue) => {
							console.log('event', event);
							console.log('newValue', newValue);
							setChoose(newValue);
						}}
					>
						<BottomNavigationAction
							style={{ color: theme.foreground, background: theme.background }}
							label="Ảnh"
							icon={<Photo />}
						/>
						<BottomNavigationAction
							style={{ color: theme.foreground, background: theme.background }}
							label="Video"
							icon={<VideoLibrary />}
						/>
						<BottomNavigationAction
							style={{ color: theme.foreground, background: theme.background }}
							label="File tài liệu"
							icon={<FileCopy />}
						/>
					</BottomNavigation>
					<div className="file--container">
						{choose === 0 &&
							photo?.map((item, index) => (
								<div className="file--item" key={index}>
									<Image width={87} height={87} src={item} alt="image" />
								</div>
							))}
						{choose === 1 &&
							video?.map((item, index) => (
								<div className="file--item" key={index}>
									<video src={item} alt="file" />
								</div>
							))}
					</div>
					<div className="contaner--item--file">
						{choose === 2 &&
							file?.map((item, index) => (
								<div key={index}>
									<Button icon={<FileCopy />} className="button--file--item">
										<p> {item.name}</p>
									</Button>
								</div>
							))}
					</div>
				</>
			),
		},
		{
			key: '4',
			label: 'Quyền riêng tư',
			children: (
				<>
					{isOwner ? (
						<Space direction="vertical">
							<Button type="text" className="chat-room-button" onClick={() => showModal('deleteGroup')}>
								<ExitToAppOutlined style={{ marginRight: '8px' }} />
								<span>Giải tán nhóm</span>
							</Button>
						</Space>
					) : (
						<Space direction="vertical">
							<Button type="text" className="chat-room-button" onClick={() => showModal('leaveGroup')}>
								<ExitToAppOutlined style={{ marginRight: '8px' }} />
								<span>Rời khỏi nhóm</span>
							</Button>
						</Space>
					)}
				</>
			),
		},
	];

	const showModal = (type) => {
		setModalType(type);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	const handleOk = () => {
		form.validateFields()
			.then(async (values) => {
				if (modalType === 'changeName') {
					await changeChatRoomName(values);
				} else if (modalType === 'changeImage') {
					await SaveChangeAvatar();
				} else if (modalType === 'changeMode') {
					await changeChatRoomMode(values);
				} else if (modalType === 'removeMember') {
					await removeMember(values);
				} else if (modalType === 'addMember') {
					await addMember(values);
				} else if (modalType === 'deleteGroup') {
					await deleteGroup(values);
				} else if (modalType === 'leaveGroup') {
					await leaveGroup(values);
				} else if (modalType === 'giveAdmin') {
					await giveAdmin(values);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const giveAdmin = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.post(
				url + `api/v1/chat-rooms/give-admin`,
				{
					userId: popoverData?.id,
					groupId: data?.id,
				},
				{
					headers: headers,
				}
			);

			if (res.data.statusCode === 200) {
				console.log('Đặt làm quản trị viên thành công');
				toast.success('Đặt làm quản trị viên thành công');
				setData(res.data.result);
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi đặt làm quản trị viên ${error}`);
			toast.error('Đặt làm quản trị viên thất bại');
		}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const leaveGroup = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.post(
				url + `api/v1/chat-rooms/leave-group`,
				{
					groupId: data?.id,
				},
				{
					headers: headers,
				}
			);

			if (res.data.statusCode === 200) {
				console.log('Rời khỏi nhóm thành công');
				toast.success('Rời khỏi nhóm thành công');
				navigate(`/messenger`);
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi rời khỏi nhóm ${error}`);
			toast.error('Rời khỏi nhóm thất bại');
		}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const deleteGroup = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.delete(url + `api/v1/chat-rooms/delete/${data?.id}`, {
				headers: headers,
			});

			if (res.data.statusCode === 200) {
				console.log('Xoá nhóm thành công');
				toast.success('Xoá nhóm thành công');
				navigate(`/messenger`);
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi xoá nhóm ${error}`);
			toast.error('Xoá nhóm thất bại');
		}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const addMember = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.post(
				url + `api/v1/chat-rooms/add-members`,
				{
					userIds: values.memberIds,
					groupId: data?.id,
				},
				{
					headers: headers,
				}
			);

			if (res.data.statusCode === 200) {
				console.log('Thêm thành viên thành công');
				toast.success('Thêm thành viên thành công');
				setData(res.data.result);
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi thêm thành viên ${error}`);
			toast.error('Thêm thành viên thất bại');
		}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const removeMember = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.post(
				url + `api/v1/chat-rooms/remove-member`,
				{
					userId: popoverData?.id,
					groupId: data?.id,
				},
				{
					headers: headers,
				}
			);

			if (res.data.statusCode === 200) {
				console.log('Xóa thành viên thành công');
				toast.success('Xóa thành viên thành công');
				console.log('New data:', res.data.result);
				setData(res.data.result);
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi xoá thành viên ${error}`);
			toast.error('Xóa thành viên thất bại');
		}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const changeChatRoomName = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.put(
				url + `api/v1/chat-rooms/change-name`,
				{
					name: values.newName,
					groupId: data?.id,
				},
				{
					headers: headers,
				}
			);

			if (res.data.statusCode === 200) {
				console.log('Đổi tên nhóm thành công');
				toast.success('Đổi tên nhóm thành công');
				setData(res.data.result);
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi đổi tên ${error}`);
			toast.error('Đổi tên nhóm thất bại');
		}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const SaveChangeAvatar = async () => {
		if (selectedFile) {
			setConfirmLoading(true);
			const formData = new FormData();
			formData.append('avatar', selectedFile);
			formData.append('groupId', group?.id);

			Api.put(url + 'api/v1/chat-rooms/change-avatar', formData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					'Content-Type': 'multipart/form-data',
				},
			})
				.then((res) => {
					if (res.data.statusCode === 200) {
						toast.success(res.data.message);
						setData(res.data.result);
					} else {
						toast.error(res.data.message);
					}
				})
				.catch((error) => {
					if (error.response) {
						// lỗi khi access token hết hạn
						if (error.response.data.statusCode === 401) {
							// lỗi khi refresh token hết hạn
							toast.error(error.response.data.message);
						}
						toast.error('Không thể thực hiện yêu cầu');
					} else if (error.request) {
						// Lỗi không có phản hồi từ máy chủ
						toast.error('Không có phản hồi từ máy chủ');
					} else {
						// Lỗi khi thiết lập request
						toast('Lỗi khi thiết lập yêu cầu.');
					}
				})
				.finally(() => {
					setSelectedFile(null);
					setAvatarPicture(null);
					setConfirmLoading(false);
					setIsModalVisible(false);
				});
		}
	};

	const changeChatRoomMode = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.put(
				url + `api/v1/chat-rooms/change-accept-all-request`,
				{
					isAcceptAllRequest: values.isAcceptAllRequest,
					groupId: data?.id,
				},
				{
					headers: headers,
				}
			);

			if (res.data.statusCode === 200) {
				console.log('Thay đổi chế độ kiểm duyệt thành công');
				toast.success('Thay đổi chế độ kiểm duyệt thành công');
				setData(res.data.result);
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi đổi tên ${error}`);
			toast.error('Thay đổi chế độ kiểm duyệt thất bại');
		}
		setConfirmLoading(false);
		setIsModalVisible(false);
	};

	const renderModalTitle = () => {
		switch (modalType) {
			case 'changeName':
				return 'Thay đổi tên nhóm chat';
			case 'changeImage':
				return 'Thay đổi hình nhóm chat';
			case 'changeMode':
				return 'Thay đổi chế độ kiểm duyệt';
			case 'removeMember':
				return 'Xóa khỏi đoạn chat?';
			case 'addMember':
				return 'Thêm thành viên';
			case 'deleteGroup':
				return 'Xóa nhóm chat?';
			case 'leaveGroup':
				return 'Rời khỏi nhóm chat?';
			case 'giveAdmin':
				return 'Đặt làm quản trị viên?';
			default:
				return '';
		}
	};
	const handleAvatarPictureChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				setAvatarPicture(reader.result);
				setSelectedFile(file);
			};
			reader.readAsDataURL(file);
		}
	};

	const openAvatarPictureDialog = () => {
		document.getElementById('AvatarPictureInput').click();
	};
	const renderModalContent = () => {
		switch (modalType) {
			case 'changeName':
				return (
					<Form form={form} fields={[{ name: 'newName', value: `${data?.name}` }]} onFinish={handleOk}>
						<Form.Item
							label="Tên mới"
							name="newName"
							rules={[{ required: true, message: 'Please input your new name!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Lưu
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);
			case 'changeImage':
				// TODO: Add logic for changing group image
				return (
					<Form form={form} onFinish={handleOk}>
						<Form.Item>
							<div className="anhdaidien">
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<button
										style={{
											textAlign: 'end',
											margin: '0 10px 0 0',
											color: 'blue',
											backgroundColor: 'white',
										}}
										onClick={openAvatarPictureDialog}
									>
										Thêm
									</button>
								</div>
								<div className="Avatar-picture-edit">
									<img src={AvatarPicture} alt="Avatar Picture" />
									<input
										style={{ display: 'none' }}
										type="file"
										accept="image/*"
										onChange={handleAvatarPictureChange}
										id="AvatarPictureInput"
									/>
								</div>
							</div>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Lưu
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);
			case 'changeMode':
				return (
					<Form
						form={form}
						initialValues={{ isAcceptAllRequest: data?.isAcceptAllRequest }}
						onFinish={handleOk}
					>
						<Form.Item
							name="isAcceptAllRequest"
							label="Chế độ kiểm duyệt thành viên"
							valuePropName="checked"
							rules={[{ required: true, message: 'Vui lòng chọn chế độ kiểm duyệt thành viên!' }]}
						>
							<Switch />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Lưu
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);
			case 'removeMember':
				return (
					<Form form={form} onFinish={handleOk}>
						<p>
							Bạn có chắc chắn muốn xóa người này khỏi cuộc trò chuyện không? Họ sẽ không thể gửi hay nhận
							tin nhắn mới nữa.
						</p>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Xác nhận
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);
			case 'addMember':
				return (
					<Form form={form} onFinish={handleOk}>
						<Form.Item
							name="memberIds"
							label="Thành viên"
							rules={[{ required: true, message: 'Vui lòng thêm thành viên!', type: 'array' }]}
						>
							<Select
								mode="multiple"
								placeholder="Chọn thành viên"
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{friendList.map((friend) => (
									<Option
										key={`${friend.firstName} ${friend.lastName} ${friend.id}`}
										value={friend.id}
										label={
											<div style={{ display: 'flex', alignItems: 'center' }}>
												<img
													src={friend.avatarUrl} // Đặt đường dẫn hình ảnh tại đây
													alt={`${friend.firstName} ${friend.lastName}`}
													style={{
														marginRight: 8,
														borderRadius: '50%',
														width: 24,
														height: 24,
													}}
												/>
												<span>{`${friend.firstName} ${friend.lastName}`}</span>
											</div>
										}
									>
										{`${friend.firstName} ${friend.lastName}`}
									</Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Xác nhận
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);
			case 'deleteGroup':
				return (
					<Form form={form} onFinish={handleOk}>
						<p>
							Bạn có chắc chắn muốn giải tán nhóm chat trên? Tất cả thành viên trong nhóm sẽ bị xóa khỏi
							nhóm
						</p>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Xác nhận
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);
			case 'leaveGroup':
				return (
					<Form form={form} onFinish={handleOk}>
						<p>
							Bạn có chắc chắn muốn rời khỏi nhóm chat trên? Khi đó bạn sẽ không thể nhận hay gửi tin nhắn
							mới đến nhóm này
						</p>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Xác nhận
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);

			case 'giveAdmin':
				return (
					<Form form={form} onFinish={handleOk}>
						<p>
							Bạn có chắc chắn muốn đặt{' '}
							<strong>
								{popoverData?.firstName} {popoverData?.lastName}
							</strong>{' '}
							làm quản trị viên của nhóm chat trên?
						</p>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Space style={{ float: 'right' }}>
								<Button type="default" onClick={handleCancel}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit" loading={confirmLoading}>
									Xác nhận
								</Button>
							</Space>
						</Form.Item>
					</Form>
				);
			default:
				return null;
		}
	};

	return (
		<>
			{showRightbar && (
				<div className="rightbar--chat">
					<div className="rightbar--chat--header">
						<img
							src={data?.avatarUrl || 'https://img.icons8.com/ios/50/user--v1.png'}
							alt="avatar"
							onClick={handleClickAvatar}
						/>
						<p>{data?.firstName ? `${data?.firstName} ${data?.lastName}` : data?.name}</p>
					</div>
					<ConfigProvider
						theme={{
							components: {
								Collapse: {
									contentPadding: '8px 8px',
								},
							},
						}}
					>
						<Collapse accordion items={items} expandIconPosition="end" />
					</ConfigProvider>

					{/* Modal */}
					<Modal
						title={renderModalTitle()}
						open={isModalVisible}
						onOk={form.submit}
						confirmLoading={confirmLoading}
						onCancel={handleCancel}
						footer={null}
					>
						{renderModalContent()}
					</Modal>
					<ToastContainer style={{zIndex:9999, marginTop: '50px'}}/>
				</div>
			)}
		</>
	);
};
export default RightbarChat;
