import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectselectuser } from '../redux/User';
import anh_logo_1 from '../../src/assets/images/anh_logo_1.jpg';
import { Avatar } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FaHistory } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Api from '../api/Api';
import { CiEdit } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { IoExitOutline } from 'react-icons/io5';
import EditProfile from '../pages/profile/component/EditProfile';
const Topbar = (props) => {
	const [activeIndex, setActiveIndex] = useState(1);
	const location = useLocation();
	const [search, setSearch] = useState(false);
	const navigate = useNavigate();
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	const [inputValue, setInputValue] = useState('');
	const [historySearch, sethistorySearch] = useState(JSON.parse(localStorage.getItem('search')));
	const [openMenu, setOpenMenu] = useState(false);
	const [editprofile, setEditProfile] = useState(false);
	const role = localStorage.getItem('role') ? localStorage.getItem('role') : null;
	const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') ? true : false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		if (role === 'ADMIN') {
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
					user.avatarUrl !== null ? (
						<div className="avatar-topbar" onClick={toProfile}>
							<Avatar alt="avatar" src={user.avatarUrl} height="40" className="mr-2" />
						</div>
					) : (
						<div className="avatar-topbar" onClick={toProfile}>
							<Avatar alt="avatar" src={anh_logo_1} height="40" className="mr-2" />
						</div>
					)
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
