import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import './LeftsGroup.css';
import { useNavigate } from 'react-router-dom';
import LableGroup from '../components/LableGroup';
import { url } from '../../../constants/Constant';
import { ToastContainer, toast } from 'react-toastify';
import anh_logo_1 from '../../../assets/images/anh_logo_1.jpg';
import Loading from '../../../components/Loading';
import Api from './../../../api/Api';
import {
	selectSelectedGroupOwner,
	selectGroupOwner,
	selectGroupMember,
	selectSelectedGroupMember,
} from '../../../redux/Group';
import { useSelector, useDispatch } from 'react-redux';

const { Search } = Input;
const LeftsGroup = () => {
	const [theme, setTheme] = useState('dark');
	const [current, setCurrent] = useState('1');
	const [loading, setLoading] = useState(false);
	const [groupJoin, setGroupJoin] = useState([]);
	const [groupManage, setGroupManage] = useState([]);
	const navigate = useNavigate();
	const changeTheme = (value) => {
		setTheme(value ? 'dark' : 'light');
	};

	const create = () => {
		navigate('/groups/create');
	};
	const mygroup = useSelector(selectSelectedGroupOwner);
	const group = useSelector(selectSelectedGroupMember);

	const dispatch = useDispatch();

	const getGroupJoin = async () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.get(url + 'group/join', { headers })
			.then(async (response) => {
				if (response.data.statusCode === 200) {
					setGroupJoin(response.data.groups);
				}
			})
			.catch(async (error) => {
				if (error.response) {
					// lỗi khi access token hết hạn
					toast.error(error.response.data.message);
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
					toast.error(error.request.data.message);
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const getGroupManage = async () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.get(url + 'group/manage', { headers })
			.then(async (response) => {
				if (response.data.statusCode === 200) {
					setGroupManage(response.data.groups);
				}
			})
			.catch(async (error) => {
				if (error.response) {
					// lỗi khi access token hết hạn
					toast.error(error.response.data.message);
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
					toast.error(error.request.data.message);
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		getGroupJoin();
		getGroupManage();
	}, []);

	const linkgroup = (value) => {
		navigate(`/groups/${value}`);
	};

	return (
		<>
			<div
				style={{
					position: 'fixed',
					top: '60px',
					zIndex: '700',
					width: '25%',
					backgroundColor: 'white',
					marginLeft: '35px',
				}}
			>
				{loading ? ( // Nếu đang loading thì hiển thị component loading
					<Loading Loading={loading}></Loading>
				) : null}
				<div className="header-left">
					<h1 style={{ textAlign: 'center' }}>Nhóm</h1>

					<Search theme={theme} placeholder="Tìm kiếm nhóm" />
				</div>
				<div className="button-add" onClick={create}>
					<Button
						type="primary"
						style={{ width: '100%', marginTop: '10px', height: '50px', marginLeft: '0px' }}
					>
						<span style={{ fontSize: '15px', fontWeight: '500' }}>+ Tạo nhóm</span>
					</Button>
				</div>
			</div>
			<div style={{ margin: '228px 0 0 0' }}>
				<div className="your-group">
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<h4>Nhóm do bạn quản lý</h4>
						<h4 style={{ color: 'blue' }}>Xem thêm</h4>
					</div>
					{groupManage &&
						groupManage.map((mygroup, index) => {
							return (
								<LableGroup
									key={index}
									image={mygroup.avatar_url}
									name={mygroup.name}
									id={mygroup.id}
									type={mygroup.type}
								/>
							);
						})}
				</div>
				<div className="your-group">
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<h4>Nhóm bạn tham gia</h4>
						<h4 style={{ color: 'blue' }}>Xem thêm</h4>
					</div>
					{groupJoin &&
						groupJoin.map((group, index) => {
							{
								group.groupImage === null
									? (group.avatarUrl = anh_logo_1)
									: (group.avatarUrl = group.avatarUrl);
							}
							return (
								<LableGroup
									key={index}
									image={group.avatar_url}
									name={group.name}
									id={group.id}
									type={group.type}
								/>
							);
						})}
				</div>
				<ToastContainer />
			</div>
		</>
	);
};
export default LeftsGroup;
