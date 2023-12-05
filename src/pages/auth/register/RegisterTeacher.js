import { Form, Input, Button, Radio, Tooltip, DatePicker, Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { url } from '../../../constants/Constant';
import Loading from '../../../components/Loading';
import "./Register.css"

export default function RegisterTeacher(props) {

	const navigate = useNavigate();
	const login = () => {
		navigate('/login');
	};
	const config = {
		rules: [
			{
				type: 'object',
				required: true,
				message: 'Chọn ngày tháng năm sinh!',
			},
		],
	};
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const handleNext = (values) => {
		setLoading(true);
		const data = {
			email: values.email,
			password: values.password,
			
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axios
			.post(url + 'api/v1/auth/register-teacher', data, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setTimeout(() => {
						navigate('/');
					}, 5000);
				} else {
					toast.error(response.data.message);
				
				}
			})
			.catch((error) => {
				// Xử lý lỗi nếu có lỗi xảy ra
				// Xử lý lỗi nếu có lỗi xảy ra
				if (error.response) {
					// Lỗi từ phía máy chủ
					
					console.log(error.response.data.statusCode);
					if (error.response.data.statusCode >= 500) {
						// Xử lý lỗi 503 Service Unavailable
						toast.error('Máy chủ hiện không khả dụng. Vui lòng thử lại sau.');
					} else if (error.response.data.statusCode === 400) {
						toast.error(error.response.data.message);
						console.log(error.response.data.message);
					} else {
						toast.error(error.response.data.message);
					}
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
					toast.error('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
					toast.error('Lỗi khi thiết lập yêu cầu.');
				}
			})
			.finally(() => {
				setTimeout(() => {

				setLoading(false);
				props.cancelRegister();
				} , 5000);
			});

		// Xử lý logic xác thực email ở đây (gửi email xác thực, kiểm tra địa chỉ email, vv.)
		console.log(values);
	};
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	return (
		<>
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
			<div className="Register-form">
				<div className="register-body-form">
					<div
						style={{
							display: 'flex',
							borderBottom: '1px solid black',
							justifyContent: 'space-between',
							flex: 10,
						}}
					>
						<h2 style={{ flex: 8, textAlign: 'end' }}>Đăng ký tài khoản cho Giáo viên</h2>
						<button
							style={{ flex: 3, height: '72.5px', backgroundColor: 'aliceblue	', textAlign: 'end' }}
							onClick={props.cancelRegister}
						>
							<CloseOutlined style={{ color: 'black', fontSize: '30px' }}></CloseOutlined>
						</button>
					</div>

					<Form name="register" onFinish={handleNext} scrollToFirstError>
						<h3 style={{ color: 'blue' }}>Thông tin tài khoản:</h3>
						<div className="information-account">
							<Form.Item
								name="email"
								rules={[
									{
										type: 'email',
										message: 'Email không hợp lệ!',
									},
									{
										required: true,
										message: 'Vui lòng nhập email của bạn!',
									},
								]}
								className="form-item-register"
							>
								<Input placeholder="Email" style={{ width: '180px' }} />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: 'vui lòng nhập mật khẩu!',
									},
									{
										min: 8,
										message: 'Mật khẩu phải có ít nhất 8 kí tự',
									},
								]}
								hasFeedback
								className="form-item-register"
							>
								<Input.Password placeholder="Mật khẩu" style={{ width: '180px' }} />
							</Form.Item>
							<Form.Item
								name="confirm"
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Vui lòng xác nhận lại mật khẩu!',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(new Error('Mật khẩu xác thực không đúng!'));
										},
									}),
								]}
								className="form-item-register"
							>
								<Input.Password placeholder="Nhập lại mật khẩu" style={{ width: '180px' }} />
							</Form.Item>
						</div>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: '100%' }}
								className="button-register"
							>
								Đăng ký
							</Button>
						</Form.Item>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<p>Đã có tài khoản?</p>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Button type="primary" onClick={login} className="button-register-login">
								Đăng nhập
							</Button>
						</div>
					</Form>
					<ToastContainer/>
				</div>
				
			</div>
		</>
	);
}
