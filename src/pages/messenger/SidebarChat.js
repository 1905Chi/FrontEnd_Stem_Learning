import { Group, Message, MoreHoriz } from '@material-ui/icons';
import { Button, Typography, Modal, Select, Switch, Input, Form, Space, Avatar } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BottomNavigation, BottomNavigationAction, Popover } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import useTheme from '../../context/ThemeContext';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';

const SidebarChat = ({ user, onChangeMessage }) => {
	const [form] = Form.useForm();
	const { Option } = Select;
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const navigate = useNavigate();
	const [friend, setFriend] = useState();
	const params = useParams();
	const [group, setGroup] = useState();
	const [isGroup, setIsGroup] = useState(0);
	const [selectItem, setSelectItem] = useState(null);
	const [friendList, setFriendList] = useState([]);

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
		fetchFriendList();
	}, [open]);

	const handleClickMessage = (e) => {
		const item = e.currentTarget;
		setSelectItem(item.id);
		const list = document.querySelectorAll('.item--message--sidebar');
		list.forEach((item) => {
			item.classList.remove('active--message');
		});
		document.getElementById(item.id).classList.add('active--message');
		if (isGroup === 0) {
			onChangeMessage({
				isGroup: false,
				id: item.id,
			});
		} else if (isGroup === 1) {
			onChangeMessage({
				isGroup: true,
				id: item.id,
			});
		}
	};

	useEffect(() => {
		const elementCurrent = document.getElementById(selectItem);
		if (elementCurrent) {
			elementCurrent.classList.add('active--message');
		}
	}, [isGroup]);

	useEffect(() => {
		const element = document.querySelector('.item--message--sidebar');
		if (element) {
			element.classList.add('active--message');
			setSelectItem(element.id);
			onChangeMessage({
				isGroup: false,
				id: element.id,
			});
		}
	}, [friend]);

	useEffect(() => {
		//Nếu params.userId mà nhỏ hơn 30 kí tự thì là id của group
		//nếu là id của group thì tự động ấn qua cộng đồng và chọn group đó
		if (params.userId) {
			const element = document.getElementById(params.userId);
			if (element) {
				element.classList.add('active--message');
			}
			setSelectItem(params.userId);
			setIsGroup(0);
			onChangeMessage({
				isGroup: false,
				id: params.userId,
			});
		} else if (params.chatRoomId) {
			const element = document.getElementById(params.chatRoomId);
			if (element) {
				element.classList.add('active--message');
			}
			setSelectItem(params.chatRoomId);
			setIsGroup(1);
			onChangeMessage({
				isGroup: true,
				id: params.chatRoomId,
			});
		} else {
			const element = document.querySelector('.item--message--sidebar');
			if (element) {
				element.classList.add('active--message');
				setSelectItem(element.id);
				onChangeMessage({
					isGroup: false,
					id: element.id,
				});
			}
		}
	}, [params.chatRoomId, params.userId]);
	useEffect(() => {
		const fetchData = async () => {
			if (!isGroup) {
				try {
					const headers = {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
						timeout: 15000,
					};
					const res = await Api.get(url + `api/v1/chat-users/get-last-10-user-messages`, {
						headers: headers,
					});
					if (res.data.statusCode === 200) {
						setFriend(res.data.result);
						console.log(res.data.result);
					} else {
						console.log(res.error);
					}
				} catch (error) {
					toast.error(`Lỗi khi lấy danh sách bạn bè ${error}`);
				}
			} else {
				try {
					const headers = {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
						timeout: 15000,
					};
					const res = await Api.get(url + `api/v1/chat-users/get-last-10-group-messages`, {
						headers: headers,
					});
					if (res.data.statusCode === 200) {
						setGroup(res.data.result.chatRooms);
						console.log(res.data.result.chatRooms);
					} else {
						console.log(res.error);
					}
				} catch (error) {
					toast.error(`Lỗi khi lấy danh sách bạn bè ${error}`);
				}
			}
		};
		fetchData();
	}, [isGroup]);

	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const underDev = () => {
		toast.error('Chức năng đang được phát triển');
		setAnchorEl(null);
	};
	const handleCreateChatRoom = () => {
		setAnchorEl(null);
		showModal();
	};

	const showModal = () => {
		setOpen(true);
	};

	const createChatRoom = async (values) => {
		setConfirmLoading(true);
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			};

			const res = await Api.post(
				url + `api/v1/chat-rooms/create`,
				{
					name: values.chatRoomName,
					memberIds: values.memberIds,
					isAcceptAllRequest: values.isAcceptAllRequest,
				},
				{
					headers: headers,
				}
			);

			if (res.data.statusCode === 200) {
				console.log('Tạo nhóm thành công');
			} else {
				console.error(res.data.message);
			}
		} catch (error) {
			console.error(`Lỗi khi tạo nhóm ${error}`);
		}
		setConfirmLoading(false);
		setOpen(false);
		form.resetFields();
	};

	const handleOk = () => {
		form.validateFields()
			.then((values) => {
				createChatRoom(values);
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	const handleCancel = () => {
		setOpen(false);
		form.resetFields();
	};

	const formItemLayout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 14 },
		labelWrap: true,
		colon: false,
	};

	const { theme } = useTheme();
	return (
		<div className="sidebar--chat">
			<div className="header--chat" style={{ color: theme.foreground, background: theme.background }}>
				<div className="header--chat--infor">
					<Modal
						title="Tạo nhóm"
						open={open}
						onOk={form.submit}
						confirmLoading={confirmLoading}
						onCancel={handleCancel}
						footer={null}
					>
						<Form
							form={form}
							name="validate_other"
							{...formItemLayout}
							onFinish={handleOk}
							style={{ maxWidth: 600 }}
						>
							<Form.Item
								name="chatRoomName"
								label="Tên nhóm"
								rules={[{ required: true, message: 'Vui lòng nhập tên nhóm!' }]}
							>
								<Input />
							</Form.Item>

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
										Tạo nhóm
									</Button>
								</Space>
							</Form.Item>
						</Form>
					</Modal>
					<span>Tin nhắn</span>
					<Button
						type="default"
						icon={<MoreHoriz />}
						aria-describedby="simple-popover"
						onClick={handleClick}
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
						<Typography className="title--popper" onClick={() => handleCreateChatRoom()}>
							Tạo nhóm mới
						</Typography>
						<Typography className="title--popper" onClick={() => underDev()}>
							Gửi tin nhắn đến nhiều người
						</Typography>
					</Popover>
				</div>
				<Search className="search--friend--message" placeholder="tìm kiếm bạn bè" />
				<BottomNavigation
					style={{ color: theme.foreground, background: theme.background }}
					className="list--message--sidebar"
					showLabels
					value={isGroup}
					onChange={(event, newValue) => {
						setIsGroup(newValue);
					}}
				>
					<BottomNavigationAction
						style={{ color: theme.foreground, background: theme.background }}
						label="Hộp thư"
						icon={<Message />}
					/>
					<BottomNavigationAction
						style={{ color: theme.foreground, background: theme.background }}
						label="Cộng đồng"
						icon={<Group />}
					/>
				</BottomNavigation>
			</div>
			<div className="container--sidebar--message">
				{isGroup === 0 &&
					friend?.map((item, index) => (
						<div
							className="item--message--sidebar "
							key={index}
							onClick={handleClickMessage}
							id={item && item?.id}
						>
							<div className="avatar--message--sidebar">
								<img
									src={item?.avatarUrl || 'https://img.icons8.com/ios/50/user--v1.png'}
									alt="avatar"
								/>
							</div>
							<div className="infor--message--sidebar">
								<div className="name--message--sidebar">{`${item?.firstName} ${item?.lastName}`}</div>
								<div className="content--message--sidebar">Tin nhắn mới nhất</div>
							</div>
						</div>
					))}
				{isGroup === 1 &&
					group?.map((item, index) => (
						<div className="item--message--sidebar " key={index} onClick={handleClickMessage} id={item.id}>
							<div className="avatar--message--sidebar">
								<img
									src={item?.avatarUrl || 'https://img.icons8.com/ios/50/user--v1.png'}
									alt="avatar"
								/>
							</div>
							<div className="infor--message--sidebar">
								<div className="name--message--sidebar">{item?.name}</div>
								<div className="content--message--sidebar">Tin nhắn mới nhất</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
export default SidebarChat;
