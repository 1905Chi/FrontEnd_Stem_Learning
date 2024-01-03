import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmailForm.css';
import { url } from '../../../../constants/Constant';
import Loading from '../../../../components/Loading';

const EmailForm = () => {
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const navigate = useNavigate();
	const huy = () => {
		navigate('/login');
	};
	const handleNext = (values) => {
		setLoading(true);
		const data = { email: values.email };

		axios
			.post(url + 'api/v1/tokens/reset-password', data)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success('Vui lòng kiểm tra mail để đặt lại mật khẩu');
					setTimeout(() => {
						navigate('*');
					}, 2000);
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
						toast.error(error.response.data.message);
					}
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
					toast.error('Không thể kết nối đến máy chủ.');
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
					toast.error(error);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="body-enteremail-resetform">
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading Loading={loading}></Loading>
			) : null}
			<div style={{ background: '#f8f8f8', height: 'auto', display: 'flex', justifyContent: 'center' }}>
				<div className="enteremail-resetform">
					<img
						src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
						alt="logo"
						className="logo"
					/>
					<div className='forgot-pass'>
						<h2> Cấp lại mật khẩu </h2> <p> Bước 1: Nhập địa chỉ email để lấy lại mật khẩu</p>
						<p> Hệ thống sẽ gửi link cấp lại mật khẩu cho bạn </p>
						<Form name="Enter your email" onFinish={handleNext} scrollToFirstError>
							<Form.Item
								name="email"
								label="E-mail"
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
							>
								<Input />
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									style={{ width: '156px', background: 'gray', height: '50px' }}
									onClick={huy}
								>
									Hủy
								</Button>
								<Button
									type="primary"
									htmlType="submit"
									style={{ marginLeft: '15px', width: '156px', height: '50px' }}
								>
									Tiếp tục
								</Button>
							</Form.Item>
							<ToastContainer />
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default EmailForm;
