import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Verify.css';
import { DatePicker, Select } from 'antd';
import axios from 'axios';
import { url } from '../../../constants/Constant';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Verify() {
	const genders = ['MALE', 'FEMALE', 'OTHER'];
	const { uuid } = useParams();
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
			dob: values.date_picker.format('DD-MM-YYYY'),
			gender: values.gender,  
		};
		axios
			.post(url + `api/users/verify?token=${uuid}`, data,config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				// Xử lý lỗi nếu có lỗi xảy ra
				if (error.response) {
					// Lỗi từ phía máy chủ
					const status = error.response.status;
					if (status === 503) {
						// Xử lý lỗi 503 Service Unavailable
						toast.error('Máy chủ hiện không khả dụng. Vui lòng thử lại sau.');
					} else {
						toast.error('Lỗi máy chủ không xác định.');
					}
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
					toast.error('Không thể kết nối đến máy chủ.');
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
					toast.error(error.response.error);
				}
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
							message: 'Please input your firstname!',
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
							message: 'Please input your lastname!',
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
					label="Your phone number"
					rules={[
						{
							required: true,
							message: 'Please input your phone number!',
							whitespace: true,
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
					<Select
						showSearch
						ptionfilterprop="label"
						options={genders.map((item) => ({ label: item, value: item }))}
					/>
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
