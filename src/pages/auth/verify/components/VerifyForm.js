import { FcManager } from 'react-icons/fc';
import { FcBusinesswoman } from 'react-icons/fc';
import { AiFillQuestionCircle } from 'react-icons/ai';
import React, { useEffect,useState } from 'react';
import { Button, Form, Input, Radio, DatePicker ,Spin,Tooltip} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './VerifyForm.css';
import axios from 'axios';
import Loading from '../../../../components/Loading';	
import { url } from '../../../../constants/Constant';
export default function VerifyForm(props) {
	const { uuid } = useParams();
	const navigate = useNavigate();
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

	const onFinish = (values) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		setLoading(true);
		const data = {
			firstName: values.firstname,
			lastName: values.lastname,
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
			<Form
				name="normal_login"
				className="verify-form"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
			>
					<img
						src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
						alt="logo"
						className="logo"
					/>
				<Form.Item>
					<h2> Xác thực tài khoản </h2>
				</Form.Item>
				<Form.Item
					name="firstname"
					rules={[
						{
							required: true,
							message: 'Nhập tên!',
							whitespace: true,
						},
					]}
				>
					<Input  style={{width:'280px' , marginLeft:'8px'}} placeholder="Tên"/>
				</Form.Item>
				<Form.Item
					name="lastname"
					rules={[
						{
							required: true,
							message: 'Nhập họ !',
							whitespace: true,
						},
					]}
				>
					<Input  style={{width:'280px' , marginLeft:'8px'}} placeholder="Họ và tên đệm"/>
				</Form.Item>
				<Form.Item name="date_picker" {...config}>
					<DatePicker format="DD-MM-YYYY" style={{width:'280px', marginLeft:'8px'}} placeholder="Ngày tháng năm sinh" />
				</Form.Item>
				<Form.Item
					name="phone"
					
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập số điện thoại!',
							whitespace: true,
						},
						{
							min: 10,
							message: 'Số điện thoại phải đủ 10 ký tự',
						},
						{
							max: 10,
							message: 'Số điện thoại phải 10 ký tự',
						},

						{
							pattern: /^0\d{9,10}$/, // Sử dụng biểu thức chính quy để kiểm tra số điện thoại bắt đầu bằng 0 và có tổng cộng từ 10 đến 11 ký tự
							message: 'Số điện thoại không hợp lệ!',
						},
					]}
				>
					<Input  placeholder="Số điện thoại" style={{width:'280px', marginLeft:'8px'}}/>
				</Form.Item>
				<Form.Item
					label="Gender"
					name="gender"
					defaultValue="MALE"
					rules={[
						{
							required: true,
							message: 'Chọn giới tính',
						},
					]}
				>
					<Radio.Group defaultValue="MALE">
						<Tooltip title="Nam" >
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
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Xác thực
					</Button>
				</Form.Item>
			</Form>
			<ToastContainer />
		</div>
	);
}
