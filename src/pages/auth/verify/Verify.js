import React, { useEffect } from 'react';
import { Button, Form, Input, Radio,DatePicker, Select  } from 'antd';
import { useParams,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Verify.css';
import axios from 'axios';
import { url } from '../../../constants/Constant';
import { FcManager } from 'react-icons/fc';
import { FcBusinesswoman } from 'react-icons/fc';
import { AiFillQuestionCircle } from 'react-icons/ai';
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Verify() {
	const genders = ['MALE', 'FEMALE', 'OTHER'];
	const navigate = useNavigate();
	const { uuid } = useParams();
	useEffect(() => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axios
			.get(url + `api/auth/verify?token=${uuid}`, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
				} else {
					toast.error(response.data.message);

				}
			})
			.catch((error) => {
				toast.error("Đường dẫn không đúng hoặc đã hết hạn.");
				navigate('/login');

				// Xử lý lỗi nếu có lỗi xảy ra
				// if (error.response) {
				// 	// Lỗi từ phía máy chủ
				// 	const status = error.response.status;
				// 	if (status === 503) {
				// 		// Xử lý lỗi 503 Service Unavailable
				// 		toast.error('Máy chủ hiện không khả dụng. Vui lòng thử lại sau.');
				// 	} else {
				// 		toast.error('Lỗi máy chủ không xác định.');
				// 	}
				// } else if (error.request) {
				// 	// Lỗi không có phản hồi từ máy chủ
				// 	toast.error('Không thể kết nối đến máy chủ.');
				// } else {
				// 	// Lỗi trong quá trình thiết lập yêu cầu
				// 	toast.error(error.response.data.message);
				// }
			});
	}, []);

	
	const onFinish = (values) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const data = {
			firstName: values.firstname,
			lastName: values.lastname,
			phone: values.phone,
			dob: values.date_picker.format('YYYY-MM-DD'),
			gender: values.gender,
		};
		axios
			.post(url + `api/users/verify?token=${uuid}`, data, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					navigate('/login');
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error.response.data.message);
				// Xử lý lỗi nếu có lỗi xảy ra
				// if (error.response) {
				// 	// Lỗi từ phía máy chủ
				// 	const status = error.response.status;
				// 	if (status === 503) {
				// 		// Xử lý lỗi 503 Service Unavailable
				// 		toast.error('Máy chủ hiện không khả dụng. Vui lòng thử lại sau.');
				// 	} else {
				// 		toast.error('Lỗi máy chủ không xác định.');
				// 	}
				// } else if (error.request) {
				// 	// Lỗi không có phản hồi từ máy chủ
				// 	toast.error('Không thể kết nối đến máy chủ.');
				// } else {
				// 	// Lỗi trong quá trình thiết lập yêu cầu
				// 	toast.error(error.response.error);
				// }
			});
	};

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	const config = {
		rules: [
			{
				type: 'object',
				required: true,
				message: 'Please select time!',
			},
		],
	};
	return (
		<div className="body-verify">
			<Form
				name="normal_login"
				className="verify-form"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
			>
				<Form.Item>
					<h2> Xác thực tài khoản </h2>
				</Form.Item>
				<Form.Item
					name="firstname"
					label="First Name"
					rules={[
						{
							required: true,
							message: 'Nhập tên!',
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="lastname"
					label="Last Name"
					rules={[
						{
							required: true,
							message: 'Nhập họ !',
							whitespace: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="date_picker" label="Day of birth" {...config}>
					<DatePicker format="DD-MM-YYYY" />
				</Form.Item>
				<Form.Item
					name="phone"
					label="Số điện thoại"
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
					<Input />
				</Form.Item>
				<Form.Item
					label="Gender"
					name="gender"
					rules={[
						{
							required: true,
							message: 'Please select your gender',
						},
					]}
				>
					<Radio.Group defaultValue="MALE">
						<Radio.Button value="MALE">
							<FcManager />
							Nam
						</Radio.Button>
						<Radio.Button value="FEMALE">
							<FcBusinesswoman />
							Nữ
						</Radio.Button>
						<Radio.Button value="OTHER">
							<AiFillQuestionCircle />
							Khác
						</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button">
						SUBMIT
					</Button>
				</Form.Item>
			</Form>
			<ToastContainer />
		</div>
	);
}
