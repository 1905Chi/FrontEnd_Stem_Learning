import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { url } from '../../../constants/Constant';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';

import './Login.css';

function Login() {
	const navigate = useNavigate();
	const notify = (string) => toast(string); // Hàm hiển thị thông báo
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const register = () => {
		navigate('/register');
	};

	const onFinish = (values) => {
		// Thực hiện kiểm tra đăng nhập tại đây
		setLoading(true);
		const data = { email: values.email, password: values.password };

		axios
			.post(url + 'api/auth/login', data)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					//navigate("/");
					localStorage.setItem('accessToken', response.data.result.accessToken);
					localStorage.setItem('refreshToken', response.data.result.refreshToken);
					localStorage.setItem('login', true);
					// localStorage.setItem("accessToken", response.data.accessToken); // Lưu token vào localStorage
					// localStorage.setItem("refreshToken", response.data.refreshToken); // Lưu refreshToken vào localStorage
					// localStorage.setItem("login", true); // Lưu thông tin user vào localStorage
					// navigate('/');
					// Chuyển hướng về trang chủ

					window.location.href = '/';
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
					} else if (status === 404) {
						toast.error('Không tìm thấy tài khoản này');
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
				setLoading(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		notify('Đăng nhập thất bại');
	};

	return (
		<div className="login-page">
			{loading ?// Nếu đang loading thì hiển thị component loading
				<Loading></Loading>:null
			}
			<div className="body-login">
				<div className="login-container">
					<div style={{ overflow: 'hidden' }}>
						<img
							src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
							alt="logo"
							className="logo"
						/>
					</div>
					<h2> Đăng nhập </h2>
					<Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
						<Form.Item
							name="email"
							rules={[
								{
									type: 'email',
									message: 'Email không hợp lệ!',
								},
								{
									required: true,
									message: 'Vui lòng nhập địa chỉ email của bạn!',
								},
							]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Email"
								style={{ width: '100%' }}
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập mật khẩu của bạn!',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Mật khẩu"
							/>
						</Form.Item>

						<Form.Item>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Button type="primary" htmlType="submit" className="login-form-button">
									Đăng nhập
								</Button>
							</div>
						</Form.Item>
					</Form>
					<div className="login-footer">
						<Link to="/forgot-password" style={{ textDecoration: 'none', color: 'blue' }}>
							Quên mật khẩu ?{' '}
						</Link>
						<br />
						<br />
						<div style={{ display: 'flex', justifyContent: 'center' }}>Chưa có tài khoản?</div>
						<br />
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Button type="primary" onClick={register} className="login-form-button">
								Đăng ký
							</Button>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
}

export default Login;
