import { FcManager } from 'react-icons/fc';
import { FcBusinesswoman } from 'react-icons/fc';
import { AiFillQuestionCircle } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, DatePicker, Tooltip, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './VerifyForm.css';
import axios from 'axios';
import Loading from '../../../../components/Loading';
import { url } from '../../../../constants/Constant';
export default function VerifyForm(props) {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [schools, setSchools] = useState([]);
	const [grade, setGrade] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const [provinceItem, setprovicesItem] = useState({}); // Thông tin người dùng
	const [districtsItem, setdistrictsItem] = useState({}); // Thông tin người dùng
	const [subjects, setSubjects] = useState([]);

	const config = {
		rules: [
			{
				type: 'object',
				required: true,
				message: 'Chọn ngày tháng năm sinh!',
			},
		],
	};
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	const onFinish = (values) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		setLoading(true);
		const data = {
			firstName: values.firstName,
			lastName: values.lastName,
			phone: values.phone,
			dob: values.date_picker.format('MM-DD-YYYY'),
			gender: values.gender,
			province: provinceItem,
			district: districtsItem,
			school: values.school,
			grade: values.grade,
			subjects: [values.subject],
		};
		axios
			.post(url + `api/v1/auth/verify?token=${uuid}`, data, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setTimeout(() => {
						navigate('/login');
					}, 3000);
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	useEffect(() => {
		handleProvince();
		callSubject();
	}, []);

	const handleProvince = async () => {
		await axios
			.get(url + 'api/v1/addresses/provinces')
			.then((response) => {
				setProvinces(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const callSubject = async () => {
		await axios
			.get(url + 'api/v1/subjects')
			.then((response) => {
				setSubjects(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChangeProvince = async (currentProvince) => {
		setprovicesItem(provinces.filter((item) => item.id === currentProvince)[0].name);

		await axios
			.get(url + `api/v1/addresses/districtsByProvince?pId=${currentProvince}`)
			.then((response) => {
				setDistricts(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleChangeDistrict = (value) => {
		setdistrictsItem(districts.filter((item) => item.id === value)[0].name);
		console.log(`selected ${value}`);
		axios
			.get(url + `api/v1/addresses/schoolsByDistrict?dId=${value}`)
			.then((response) => {
				setSchools(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const { Option } = Select;
	return (
		<div className="body-verify">
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
			<div className="form-verify">
				<div style={{ width: '50%', maxWidth: '370px' }}>
					<img
						src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
						alt="logo"
						className="logo"
					/>
				</div>
				<Form
					name="normal_login"
					className="verify-form"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<h2> Xác thực tài khoản </h2>
					<h3 style={{ color: 'blue' }}>Thông tin cá nhân:</h3>
					<div className="information-profile">
						<Form.Item
							name="firstName"
							rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
							className="form-item-register"
						>
							<Input placeholder="Tên" style={{ width: '180px' }} />
						</Form.Item>
						<Form.Item
							name="lastName"
							rules={[{ required: true, message: 'Vui lòng nhập họ của bạn!' }]}
							className="form-item-register"
						>
							<Input placeholder="Họ" style={{ width: '180px' }} />
						</Form.Item>

						<Form.Item
							name="phone"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập số điện thoại!',
									whitespace: true,
								},

								{
									pattern: /^0\d{9,9}$/, // Sử dụng biểu thức chính quy để kiểm tra số điện thoại bắt đầu bằng 0 và có tổng cộng từ 10 đến 11 ký tự
									message: 'Số điện thoại không hợp lệ!',
								},
							]}
						>
							<Input placeholder="Số điện thoại" style={{ width: '180px' }} />
						</Form.Item>
						<Form.Item name="date_picker" {...config} className="form-item-register">
							<DatePicker
								format="DD-MM-YYYY"
								style={{ width: '180px' }}
								placeholder="Ngày tháng năm sinh"
							/>
						</Form.Item>
						<Form.Item
							className="form-item-register"
							name="province"
							rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành!' }]}
						>
							<Select
								showSearch
								style={{ width: '180px' }}
								placeholder="Tỉnh thành"
								onChange={(value) => {
									handleChangeProvince(value);
									setSchools([]);
									setDistricts([]);
								}}
							>
								{provinces.map((grade) => (
									<Option value={grade.id} key={grade.id} style={{ color: 'black' }}>
										{grade.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							className="form-item-register"
							name="district"
							rules={[{ required: true, message: 'Vui lòng chọn quận huyện!' }]}
						>
							<Select
								showSearch
								style={{ width: '180px' }}
								placeholder="Quận huyện"
								onChange={(value) => {
									handleChangeDistrict(value);
									setSchools([]);
								}}
							>
								{districts.map((grade) => (
									<Option value={grade.id} key={grade.id} style={{ color: 'black' }}>
										{grade.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name="school"
							rules={[{ required: true, message: 'Vui lòng chọn trường học!' }]}
							className="form-item-register"
						>
							<Select
								showSearch
								style={{ width: '180px' }}
								placeholder="Trường học"
								onChange={handleChange}
							>
								{schools.map((grade) => (
									<Option value={grade.name} key={grade.id} style={{ color: 'black' }}>
										{grade.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name="grade"
							rules={[{ required: true, message: 'Vui lòng chọn khối lớp!' }]}
							className="form-item-register"
						>
							<Select
								showSearch
								style={{ width: '180px' }}
								placeholder="Khối lớp"
								optionFilterProp="children"
								onChange={handleChange}
							>
								{grade.map((grade) => (
									<Option value={grade} key={grade} style={{ color: 'black' }}>
										{grade}
									</Option>
								))}
							</Select>
						</Form.Item>
						{subjects !== null && subjects.length > 0 && subjects !== undefined ? (
							<Form.Item
								name="subject"
								rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}
								className="form-item-register"
							>
								<Select
									showSearch
									style={{ width: '180px' }}
									placeholder="Môn học"
									optionFilterProp="children"
								>
									{subjects &&
										
										subjects.map((grade) => (
											<Option value={grade.name} key={grade.id} style={{ color: 'black' }}>
												{grade.name}
											</Option>
										))}
								</Select>
							</Form.Item>
						) : null}
						<Form.Item
							name="gender"
							defaultValue="MALE"
							rules={[
								{
									required: true,
									message: 'Chọn giới tính',
								},
							]}
							className="form-item-register"
						>
							<div>
								<Radio.Group defaultValue="MALE" style={{ width: '180px' }}>
									<Tooltip title="Nam">
										<Radio.Button value="MALE">
											<FcManager />
										</Radio.Button>
									</Tooltip>
									<Tooltip title="Nữ">
										<Radio.Button value="FEMALE">
											<FcBusinesswoman />
										</Radio.Button>
									</Tooltip>
									<Tooltip title="Khác">
										<Radio.Button value="OTHER">
											<AiFillQuestionCircle />
										</Radio.Button>
									</Tooltip>
								</Radio.Group>
							</div>
						</Form.Item>
					</div>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Xác thực
						</Button>
					</Form.Item>
				</Form>
			</div>
			<ToastContainer />
		</div>
	);
}
