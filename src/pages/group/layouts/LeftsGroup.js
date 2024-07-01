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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
		Api.get(url + 'api/v1/groups/suggested-groups', { headers })
			.then(async (response) => {
				if (response.status === 200) {
					setGroupJoin(response.data.result);
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
		// getGroups();
	}, []);

	const linkgroup = (value) => {
		navigate(`/groups/${value}`);
	};
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
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
				{groupJoin && groupJoin.length > 1 ? (
					<div className="your-group">
						<Slider
							dots={true}
							infinite={true}
							speed={500}
							slidesToShow={1}
							slidesToScroll={1}
							autoplay={true}
							autoplaySpeed={3000}
						>
							{groupJoin &&
								groupJoin.map((mygroup, index) => {
									return (
										<div key={index} className="slide">
											<img src={mygroup.group.avatarUrl} alt="Group Avatar" />
											<div className="group-info">
												<h2>{mygroup.group.name}</h2>
												<p>{mygroup.group.description}</p>
											</div>
										</div>
									);
								})}
						</Slider>
					</div>
				) : groupJoin && groupJoin.length === 1 ? (
					<div className="slide">
						<img src={groupJoin[0].group.avatarUrl} alt="Group Avatar" />
						<div className="group-info">
							<h2>{groupJoin[0].group.name}</h2>
							<p>{groupJoin[0].group.description}</p>
						</div>
					</div>
				) : null}

				<ToastContainer />
			</div>
		</div>
	);
};
export default LeftsGroup;
