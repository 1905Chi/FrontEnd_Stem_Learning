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
import { selectselectuser } from '../../../redux/User';

const { Search } = Input;
const RightClass = () => {
	const [theme, setTheme] = useState('dark');
	const [current, setCurrent] = useState('1');
	const [loading, setLoading] = useState(false);
	const [listClass, setListClass] = useState([]);
	const [classJoin, setClassJoin] = useState([]);
	const [listClassJoin, setListClassJoin] = useState();
	const [mygroup, setMygroup] = useState([]);
	const navigate = useNavigate();
	const changeTheme = (value) => {
		setTheme(value ? 'dark' : 'light');
	};

	const create = () => {
		navigate('/classes/create');
	};

	const dispatch = useDispatch();
	const searchClass = (e) => {
		if (e.target.value === '') {
			setListClassJoin(mygroup);
			return;
		}
		setListClassJoin(mygroup.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
	};
	const role = JSON.parse(localStorage.getItem('user')).role;
	

	useEffect(() => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.get(url + 'api/v1/groups/suggested-classes', { headers })
				
			.then(async (response) => {
				if (response.data.statusCode === 200) {
				
					setListClassJoin(response.data.result);
					setMygroup(response.data.result);
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
		
	}, []);

	
	return (
		<>
			<div>
				<div
				className='header-classes'
				>
					{loading ? ( // Nếu đang loading thì hiển thị component loading
						<Loading Loading={loading}></Loading>
					) : null}
					<div className="header-left" style={{}}>
						<h1 style={{ textAlign: 'center', marginTop:'0' }}>Lớp</h1>

						<Search
							theme={theme}
							placeholder="Tìm kiếm Lớp"
							onChange={searchClass}
							style={{ textAlign: 'center', marginLeft:'1rem' }}
						/>
					</div>
				</div>
				
				<div style={{ margin: '20vh 0px 0px 0px' }}>
				{(role && role === 'TEACHER') || localStorage.getItem('role') === 'TEACHER' ? (
					<div className="button-add" onClick={create}>
						<Button
							type="primary"
							style={{ width: '100%', marginTop: '0', height: '50px', marginLeft: '0px' }}
						>
							<span style={{ fontSize: '15px', fontWeight: '500' }}>+ Tạo Lớp </span>
						</Button>
					</div>
				) : null}
					<div className="your-group">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{textAlign:'center', width:'100%', color: '#2424a5'}}>Đề xuất</h3>
						</div>
						<div style={{ height: '52vh', overflowY: 'scroll' }} >
						<Slider
							dots={true}
							infinite={true}
							speed={500}
							slidesToShow={1}
							slidesToScroll={1}
							autoplay={true}
							autoplaySpeed={3000}
						>
							{listClassJoin &&
								listClassJoin.map((mygroup, index) => {
									return (
										<div style={{marginRight:'1rem'}}>
										<LableGroup
											key={index}
											image={mygroup.avatarUrl}
											name={mygroup.name}
											id={mygroup.id}
											type={true}
										/>
										</div>
									);
								})}
								</Slider>
						</div>
					</div>

					<ToastContainer />
				</div>
			</div>
		</>
	);
};
export default RightClass;
