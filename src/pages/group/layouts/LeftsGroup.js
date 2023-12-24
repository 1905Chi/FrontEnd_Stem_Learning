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
	const [groupCreate, setGroupCreate] = useState([]);
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
		Api.get(url + 'api/v1/groups', { headers })
			.then(async (response) => {
				if (response.data.statusCode === 200) {
					response.data.result.GROUP_ADMIN.forEach((element) => {
						if (element.isClass === false) {
							const group = groupManage
							group.push(element)
							setGroupManage(group);
						}
					});
					response.data.result.GROUP_MEMBER.forEach((element) => {
						if (element.isClass === false) {
							const group = groupCreate
							group.push(element)
							setGroupJoin(group);
						}
						
					});
					response.data.result.GROUP_OWNER.forEach((element) => {
						if (element.isClass === false) {
							const group = groupCreate
							group.push(element)
							setGroupCreate( group);
						}
						
					});
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

	// const getGroups = async () => {
	// 	const headers = {
	// 		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	// 		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	// 	};
	// 	Api.get(url + 'api/v1/groups/suggested-groups', { headers })
	// 		.then(async (response) => {
	// 			if (response.data.statusCode === 200) {
	// 				setGroupJoin(response.data.result);
	// 			}
	// 		})
	// 		.catch(async (error) => {
	// 			if (error.response) {
	// 				// lỗi khi access token hết hạn
	// 				toast.error(error.response.data.message);
	// 			} else if (error.request) {
	// 				// Lỗi không có phản hồi từ máy chủ
	// 				toast.error(error.request.data.message);
	// 			} else {
	// 				// Lỗi trong quá trình thiết lập yêu cầu
	// 			}
	// 		})
	// 		.finally(() => {
	// 			setLoading(false);
	// 		});
	// };

	useEffect(() => {
		setLoading(true);
		getGroupJoin();
		// getGroups();
	}, []);

	const linkgroup = (value) => {
		navigate(`/groups/${value}`);
	};

	return (
		<div>
			<div
				style={{
					position: 'fixed',
					top: '70px',
					zIndex: '700',
					width: '24.5%',
					backgroundColor: 'white',
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
				{groupManage && groupManage.length > 0 ? (
					<div className="your-group">
						<div style={{ display: 'flex', justifyContent: 'start', gap: '3rem', marginLeft:'12%' }}>
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
										type={mygroup.isClass}
									/>
								);
							})}
					</div>
				) : null}
				{groupJoin && groupJoin.length > 0 ? (
					<div className="your-group">
						<div style={{ display: 'flex', justifyContent: 'start', gap: '3rem' ,marginLeft:'12%'}}>
							<h4>Nhóm bạn tham gia</h4>
							<h4 style={{ color: 'blue' }}>Xem thêm</h4>
						</div>
						{groupJoin &&
							groupJoin.map((group, index) => {
								{
									group.groupImage === null
										? (group.avatar_url = anh_logo_1)
										: (group.avatar_url = group.avatar_url);
								}
								return (
									<LableGroup
										key={index}
										image={group.avatar_url}
										name={group.name}
										id={group.id}
										type={group.isClass}
									/>
								);
							})}
					</div>
				) : null}
				{groupCreate && groupCreate.length > 0 ? (
					<div className="your-group">
						<div style={{ display: 'flex', justifyContent: 'start', gap: '3rem',marginLeft:'12%' }}>
							<h4>Nhóm bạn tạo</h4>
							<h4 style={{ color: 'blue' }}>Xem thêm</h4>
						</div>
						{groupCreate &&
							groupCreate.map((group, index) => {
								{
									group.groupImage === null
										? (group.avatar_url = anh_logo_1)
										: (group.avatar_url = group.avatar_url);
								}
								return (
									<LableGroup
										key={index}
										image={group.avatar_url}
										name={group.name}
										id={group.id}
										type={group.isClass}
									/>
								);
							})}
					</div>
				) : null}
				<ToastContainer />
			</div>
		</div>
	);
};
export default LeftsGroup;
