import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import './LeftsGroup.css';
import { useNavigate } from 'react-router-dom';
import LableGroup from '../components/LableGroup';
import axios from 'axios';
import { url } from '../../../constants/Constant';
import RefeshToken from '../../../api/RefeshToken';
import { ToastContainer, toast } from 'react-toastify';
import anh_logo_1 from '../../../assets/images/anh_logo_1.jpg';
import Loading from '../../../components/Loading';
import Api from './../../../api/Api';

const { Search } = Input;
const LeftsGroup = () => {
	const [theme, setTheme] = useState('dark');
	const [current, setCurrent] = useState('1');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const changeTheme = (value) => {
		setTheme(value ? 'dark' : 'light');
	};
	
	const create = () => {
		navigate('/groups/create');
	};
	const [mygroup, setMygroup] = useState([]);
	const [group, setGroup] = useState([]);
	const getGroup = async () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api
			.get(url + 'api/v1/groups', { headers })
			.then(async (response) => {
				if (response.data.statusCode === 200) {
					setMygroup(response.data.result.GROUP_ADMIN);
					setGroup(response.data.result.GROUP_MEMBER);
				}
			})
			.catch(async (error) => {
				if (error.response) {
					// lỗi khi access token hết hạn
					toast.error(error.request.data.message);
					setTimeout(() => {
						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						navigate('/login');
					}, 5000);
					
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
					toast.error(error.request.data.message);
					setTimeout(() => {
						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						navigate('/login');
					}, 5000);
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
					toast('Lỗi khi thiết lập yêu cầu.');
					setTimeout(() => {
						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						navigate('/login');
					}, 5000);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		getGroup();
	}, []);

	const linkgroup = (value) => {
		navigate(`/groups/${value}` );
	};

	return (
		<>
			<div style={{ position: 'fixed', top: '60px', zIndex: '999', width: '280px', backgroundColor: 'white' }}>
				{loading ? ( // Nếu đang loading thì hiển thị component loading
					<Loading Loading={loading}></Loading>
				) : null}
				<div className="header-left">
					<h1 style={{ textAlign: 'start' }}>Nhóm</h1>

					<Search theme={theme} placeholder="Tìm kiếm nhóm" />
				</div>
				<div className="button-add" onClick={create}>
					<Button type="primary" style={{ width: '100%', marginTop: '10px', height: '50px' }}>
						<span style={{ fontSize: '15px', fontWeight: '500' }}>+ Tạo nhóm</span>
					</Button>
				</div>
			</div>
			<div style={{ margin: '200px 0 0 0' }}>
				<div className="your-group">
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<h4>Nhóm do bạn quản lý</h4>
						<h4 style={{ color: 'blue' }}>Xem thêm</h4>
					</div>
					{mygroup.map((mygroup, index) => {
						{
							mygroup.groupImage === null
								? (mygroup.groupImage = anh_logo_1)
								: (mygroup.groupImage = mygroup.groupImage);
						}
						return <LableGroup key={index} image={mygroup.groupImage} name={mygroup.groupName} id={mygroup.groupId} />;
					})}
				</div>
				<div className="your-group">
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<h4>Nhóm do tham gia</h4>
						<h4 style={{ color: 'blue' }}>Xem thêm</h4>
					</div>
					{group.map((group, index) => {
						{
							group.groupImage === null
								? (group.groupImage = anh_logo_1)
								: (group.groupImage = group.groupImage);
						}
						return <LableGroup key={index} image={group.groupImage} name={group.groupName} id={group.groupId} />;
					})}
				</div>
				<ToastContainer />
			</div>
		</>
	);
};
export default LeftsGroup;
