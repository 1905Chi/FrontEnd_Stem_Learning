import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import './../../group/layouts/LeftsGroup.css';
import { useNavigate } from 'react-router-dom';
import LableGroup from './../../group/components/LableGroup';
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
import { selectselectuser } from '../../../redux/User';

const { Search } = Input;
const RightClass = () => {
	const [theme, setTheme] = useState('dark');
	const [current, setCurrent] = useState('1');
	const [loading, setLoading] = useState(false);
	const [listClass, setListClass] = useState([]);
	const [classJoin, setClassJoin] = useState([]);

	const navigate = useNavigate();
	const changeTheme = (value) => {
		setTheme(value ? 'dark' : 'light');
	};

	const create = () => {
		navigate('/classes/create');
	};
	const mygroup = useSelector(selectSelectedGroupOwner);

	const dispatch = useDispatch();
	const searchClass = (e) => {
		console.log(e.target.value);
	};
	const role = localStorage.getItem('role') || null;
	useEffect(() => {
		// const headers = {
		// 	Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		// 	'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		// };
		// Api.get(url + 'api/v1/groups', { headers })
		// 	.then(async (response) => {
		// 		if (response.data.statusCode === 200) {
		// 			let MYGROUP = [];

		// 			response.data.result.GROUP_OWNER.map((item) => {
		// 				if (item.subject) {
		// 					MYGROUP = [...MYGROUP, item];
		// 				}
		// 			});
		// 			response.data.result.GROUP_ADMIN.map((item) => {
		// 				if (item.subject) {
		// 					MYGROUP = [...MYGROUP, item];
		// 				}
		// 			});
		// 			response.data.result.GROUP_MEMBER.map((item) => {
		// 				if (item.subject) {
		// 					MYGROUP = [...MYGROUP, item];
		// 				}
		// 			});

		// 			dispatch(selectGroupOwner(MYGROUP));
		// 		}
		// 	})
		// 	.catch(async (error) => {
		// 		if (error.response) {
		// 			// lỗi khi access token hết hạn
		// 			toast.error(error.response.data.message);
		// 		} else if (error.request) {
		// 			// Lỗi không có phản hồi từ máy chủ
		// 			toast.error(error.request.data.message);
		// 		} else {
		// 			// Lỗi trong quá trình thiết lập yêu cầu
		// 		}
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 	});
		fetchClassJoin();
	}, []);

	const fetchClassJoin = async () => {
		try {
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			};
			const response = await Api.get('class/join', headers);
			console.log('Fetch class successfully: ', response);
			if (response.data.statusCode === 200) {
				setClassJoin(response.data.groupClassIds);
			}
		} catch (error) {
			console.log('Failed to fetch class list: ', error);
		}
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
					marginLeft: '15px',
				}}
			>
				{loading ? ( // Nếu đang loading thì hiển thị component loading
					<Loading Loading={loading}></Loading>
				) : null}
				<div className="header-left" style={{}}>
					<h1 style={{ textAlign: 'center' }}>Lớp</h1>

					<Search
						theme={theme}
						placeholder="Tìm kiếm Lớp"
						onChange={searchClass}
						style={{ textAlign: 'center' }}
					/>
				</div>
				{role && role === 'TEACHER' ? (
					<div className="button-add" onClick={create}>
						<Button type="primary" style={{ width: '100%', marginTop: '10px', height: '50px' }}>
							<span style={{ fontSize: '15px', fontWeight: '500' }}>+ Tạo Lớp </span>
						</Button>
					</div>
				) : null}
			</div>
			<div style={{ margin: '190px 0 0 0' }}>
				<div className="your-group">
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<h4>Lớp học của bạn</h4>
					</div>
					{classJoin &&
						classJoin.map((mygroup, index) => {
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

				<ToastContainer />
			</div>
		</>
	);
};
export default RightClass;
