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
	const { Option } = Select;
	const [provinces, setProvinces] = useState(['Quảng Nam', 'Đà Nẵng', 'Quảng Ngãi', 'Quảng Trị', 'Huế', 'Hà Nội']);
	const [districts, setDistricts] = useState([
		'Hải Châu',
		'Cẩm Lệ',
		'Thanh Khê',
		'Liên Chiểu',
		'Ngũ Hành Sơn',
		'Sơn Trà',
		'Hòa Vang',
	]);
	const [schools, setSchools] = useState([
		'Trường THPT Nguyễn Khuyến',
		'Trường THPT Nguyễn Hiền',
		'Trường THPT Nguyễn Trãi',
		'Trường THPT Nguyễn Du',
		'Trường THPT Nguyễn Thị Minh Khai',
		'Trường THPT Nguyễn Thị Định',
	]);
	const [grade, setGrade] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
	const [loading, setLoading] = useState(false); // Trạng thái loading
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
			dob: values.date_picker.format('YYYY-MM-DD'),
			gender: values.gender,
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
	return (
		<div className="body-verify">
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
			<div className="form-verify">
				<div style={{width:'50%',maxWidth:'370px'}}>
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
						<Form.Item
							className="form-item-register"
							name="district"
							rules={[{ required: true, message: 'Vui lòng chọn quận huyện!' }]}
						>
							<Select
								showSearch
								style={{ width: '180px' }}
								placeholder="Quận huyện"
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
						<Form.Item
							name="school"
							rules={[{ required: true, message: 'Vui lòng chọn trường học!' }]}
							className="form-item-register"
						>
							<Select
								showSearch
								style={{ width: '180px' }}
								placeholder="Trường học"
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
