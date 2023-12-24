import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectselectuser } from '../redux/User';
import anh_logo_1 from '../../src/assets/images/anh_logo_1.jpg';
import { Avatar, Badge, List, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FaHistory } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Api from '../api/Api';
import { CiEdit } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { IoExitOutline } from 'react-icons/io5';
import EditProfile from '../pages/profile/component/EditProfile';
import { Popover } from '@material-ui/core';
import { useWebSocket } from '../context/WebSocketContext';
import moment from 'moment';
import classnames from 'classnames';
import { Notifications } from '@material-ui/icons';
import { url } from '../constants/Constant';
import toast, { Toaster } from 'react-hot-toast';

const Topbar = (props) => {
	const adver4 = 'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg';
	const [activeIndex, setActiveIndex] = useState(1);
	const location = useLocation();
	const [search, setSearch] = useState(false);
	const navigate = useNavigate();
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	const [inputValue, setInputValue] = useState('');
	const [historySearch, sethistorySearch] = useState(JSON.parse(localStorage.getItem('search')));
	const [openMenu, setOpenMenu] = useState(false);
	const [editprofile, setEditProfile] = useState(false);
	const role = localStorage.getItem('role') ? localStorage.getItem('role')? JSON.parse(localStorage.getItem('user')).role:JSON.parse(localStorage.getItem('user')).role : null;
	const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') ? true : false);
	const [items, setItems] = useState([]);

	const classParent = ['notification--item'];
	const [listNotification, setListNotification] = useState([]);
	const [page, setPage] = useState(0);
	const { notification } = useWebSocket();
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};
	useEffect(() => {
		console.log('notification', notification);
		if (notification) {
			// unshift thêm vào đầu mảng
			setListNotification([notification, ...listNotification]);
		}
	}, [notification]);

	useEffect(() => {
		const fetchNotifications = async () => {
			setLoading(true);
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			};
			const response = await Api.get(url + `api/v1/notifications/get-last-notifications?page=${page}&size=10`, {
				headers: headers,
			});
			if (response.data.statusCode === 200) {
				setListNotification([...listNotification, ...response.data.result.notifications]);
				console.log(listNotification);
				if (response.data.result.currentElements < 10) {
					setHasMore(false);
				} else {
					setHasMore(true);
				}
			} else {
				console.log(response.error);
			}
			setLoading(false);
		};
		if (isLogin) {
			fetchNotifications();
		}
	}, [page]);
	const unReadAllNotification = async () => {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		};
		const response = await Api.post(url + `api/v1/notifications/mask-all-as-readed`, { headers: headers });
		if (response.data.statusCode === 200) {
			setListNotification(response.data.result);
			console.log(listNotification);
			if (response.data.result.currentElements < 10) {
				setHasMore(false);
			} else {
				setHasMore(true);
			}
		} else {
			console.log(response.error);
		}
	};
	const handleReadNotification = async (item) => {
		const toastId = toast.loading('Đang xử lý...');
		const headers = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		};
		const response = await Api.post(url + `api/v1/notifications/mask-as-readed/${item.id}`, { headers: headers });
		toast.dismiss(toastId);
		if (response.data.statusCode === 200) {
			setAnchorEl(null);
			navigate(`${item.refUrl}`);
		} else {
			toast.error('Nội dung thông báo không còn tồn tại!!!');
		}
		//Chỉnh thông báo đó là đã đọc
		const newListNotification = listNotification.map((notification) => {
			if (notification.notificationId === item.notificationId) {
				return { ...notification, isRead: true };
			}
			return notification;
		});
		setListNotification(newListNotification);
	};

	useEffect(() => {
		if (role !== null && role === 'ADMIN' ) {
			setItems([
				{
					label: 'Trang chủ',
					icon: 'pi pi-fw pi-home',
					command: () => {
						navigate('/home');
					},
				},
				{
					label: 'Nhóm',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/manage/groups');
					},
				},
				{
					label: 'Môn học',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/subjects');
					},
				},
				{
					label: 'Địa chỉ',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/addresses');
					},
				},
				{
					label: 'Người dùng',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/users');
					},
				},
			]);
		} else if (
			role === undefined ||
			role === null ||
			role === 'TEACHER' ||
			role === 'STUDENT' ||
			role === 'PARENT' ||
			user.role === 'TEACHER' ||
			user.role === 'STUDENT' ||
			user.role === 'PARENT'
		) {
			setItems([
				{
					label: 'Trang chủ',
					icon: 'pi pi-fw pi-home',
					command: () => {
						navigate('/home');
					},
				},
				{
					label: 'Lớp học',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/classes');
					},
				},
				{
					label: 'Nhóm',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/groups');
					},
				},
			]);
		} else {
			setItems([
				{
					label: 'Trang chủ',
					icon: 'pi pi-fw pi-home',
					command: () => {
						navigate('/home');
					},
				},
				{
					label: 'Lớp học',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/classes');
					},
				},
				{
					label: 'Nhóm',
					icon: 'pi pi-fw pi-users',
					command: () => {
						navigate('/groups');
					},
				},
			]);
		}
	}, [role]);

	const openEditProfile = () => {
		toProfile();

		setEditProfile(!editprofile);
	};
	const cancel = () => {
		setEditProfile(false);
	};
	useEffect(() => {
		setSearch(false);
	}, [location]);
	const toProfile = () => {
		setOpenMenu(!openMenu);
	};
	const openSearch = () => {
		setSearch(true);
	};
	const closeSearch = () => {
		setSearch(false);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			// Xử lý sự kiện khi nhấn phím Enter ở đây
			let history = localStorage.getItem('search');
			if (history === null) {
				let arr = [];
				arr.push(inputValue);
				localStorage.setItem('search', JSON.stringify(arr));
				sethistorySearch(arr);
			} else {
				let arr = JSON.parse(history);

				arr.push(inputValue);
				localStorage.setItem('search', JSON.stringify(arr));
				sethistorySearch(arr);
			}
			setSearch(false);
			navigate('/search/?search=' + inputValue);
		}
	};

	const searchUser = async (searchQuery) => {
		try {
			const response = await Api.get('/api/v1/users/searchWithoutToken?', {
				params: {
					query: searchQuery,
				},
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = () => {
		console.log('Searching for:', searchQuery);
		searchUser(searchQuery);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const start = () => {
		return (
			<div className="start-topbar">
				<div className="logo-topbar">
					<img
						alt="logo"
						src="https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg"
						height="40"
						className="mr-2"
						onClick={() => {
							navigate('/home');
						}}
					></img>
				</div>
				<div className="search-topbar">
					<InputText
						placeholder="Search"
						type="text"
						onClick={openSearch}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
		);
	};

	const end = () => {
		return (
			<div className="end-topbar">
				{!isLogin ? (
					<div className="name-topbar">
						<button className="login-topbar" onClick={() => navigate('/login')}>
							Đăng nhập
						</button>
						<button className="register-topbar" onClick={props.scrollToSection}>
							Đăng ký
						</button>
					</div>
				) : null}

				{isLogin && user !== null ? (
					<div style={{ display: 'flex' }}>
						<div className="button-right">
							<Badge
								// chỉ tính những thông báo chưa đọc
								count={listNotification.filter((item) => item.isReaded === false).length}
								aria-describedby="simple-popover"
								onClick={(e) => handleClick(e)}
							>
								<Notifications className="button-right-notifications" titleAccess="Thông báo" />
							</Badge>
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
								<div className="notification--container">
									<div className="notification--header">
										<Typography.Text strong>Thông báo</Typography.Text>

										<Typography.Text
											style={{ color: '#1e90ff', cursor: 'pointer' }}
											onClick={unReadAllNotification}
										>
											Đánh dấu tất cả đã đọc
										</Typography.Text>
									</div>
									<div className="notification--body">
										{listNotification.length > 0 ? (
											<List
												itemLayout="horizontal"
												dataSource={listNotification}
												loadMore={
													<div
														style={{
															textAlign: 'center',
															marginTop: 12,
															height: 32,
															lineHeight: '32px',
															marginBottom: 12,
														}}
													>
														<Button
															disabled={!hasMore}
															type="primary"
															onClick={() => setPage((pre) => pre + 1)}
															loading={loading}
														>
															Xem thêm
														</Button>
													</div>
												}
												renderItem={(item) => (
													<List.Item
														className={classnames(
															item.isRead ? 'read' : 'unread',
															classParent
														)}
														onClick={() => handleReadNotification(item)}
													>
														<List.Item.Meta
															avatar={
																<img
																	src={item.photo || adver4}
																	alt="avatarGroup"
																	className="notification--item-avatar"
																></img>
															}
															description={
																<div
																	style={{ display: 'flex', flexDirection: 'column' }}
																>
																	<span className="notification--item-content">
																		{item.content}
																	</span>
																	<span className="notification--item-time">
																		Thời gian:{' '}
																		{moment(item.createdAt).format('DD/MM/YYYY')}
																	</span>
																</div>
															}
														/>
													</List.Item>
												)}
											/>
										) : (
											<div className="notification--item">
												<img
													src={adver4}
													alt="avatarGroup"
													className="notification--item-avatar"
												></img>
												<div className="notification--item-content">
													<Typography.Text>
														<span className="notification--item-content-content">
															Bạn không có thông báo nào
														</span>
													</Typography.Text>
												</div>
											</div>
										)}
									</div>
								</div>
							</Popover>
						</div>

						{user.avatarUrl !== null ? (
							<div className="avatar-topbar" onClick={toProfile}>
								<Avatar alt="avatar" src={user.avatarUrl} height="40" className="mr-2" />
							</div>
						) : (
							<div className="avatar-topbar" onClick={toProfile}>
								<Avatar alt="avatar" src={anh_logo_1} height="40" className="mr-2" />
							</div>
						)}
					</div>
				) : null}

				{openMenu === true ? (
					<div className="menu-option">
						<button
							className="menu-option-item"
							onClick={() => {
								navigate('/profile');
							}}
						>
							{' '}
							<CgProfile className="iocon-pr" /> <span>Trang cá nhân</span>
						</button>
						<button className="menu-option-item" onClick={openEditProfile}>
							<CiEdit className="iocon-pr" /> <span>Chỉnh sửa thông tin cá nhân</span>
						</button>
						<button
							className="menu-option-item"
							onClick={() => {
								localStorage.clear();
								navigate('/login');
							}}
						>
							<IoExitOutline className="iocon-pr" />
							<span>Đăng xuất</span>
						</button>
					</div>
				) : null}
			</div>
		);
	};

	return (
		<div className="topbar">
			{editprofile === true ? <EditProfile onCancel={cancel} /> : null}
			{search ? (
				<div className="search-topbar-menu-history">
					<div className="header-menu-search">
						<button onClick={closeSearch}>
							<ArrowLeftOutlined />
						</button>
						<h3>Tìm kiếm gần đây</h3>
						<button
							onClick={() => {
								localStorage.removeItem('search');
								sethistorySearch([]);
							}}
						>
							Xóa lịch sử
						</button>
					</div>
					<div>
						{historySearch && historySearch.length > 0
							? historySearch.map((item, index) => (
									<button className="history-search-item" key={index}>
										<FaHistory style={{ paddingTop: '5px' }} />
										<p>{item}</p>
									</button>
							  ))
							: null}
					</div>
				</div>
			) : null}
			<MegaMenu model={items} orientation="horizontal" start={start} end={end} />
		</div>
	);
};

export default Topbar;
