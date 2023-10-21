import { Form, Input, Button, Radio, Spin,Tooltip  } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { PiStudentBold } from 'react-icons/pi';
import { RiParentLine } from 'react-icons/ri';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { url } from '../../../constants/Constant';
import Loading from '../../../components/Loading';	

export default function Register() {
	const roles = ['STUDENT', 'TEACHER', 'PARENT'];
	const navigate = useNavigate();
	const login = () => {
		navigate('/login');
	};
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const handleNext = (values) => {
		setLoading(true);
		const data = {
			email: values.email,
			password: values.password,
			role: values.roles,
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axios
			.post(url + 'api/v1/auth/register', data, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setTimeout(() => {
						navigate('*');
					}, 2000);
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				// Xử lý lỗi nếu có lỗi xảy ra
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

		// Xử lý logic xác thực email ở đây (gửi email xác thực, kiểm tra địa chỉ email, vv.)
		console.log(values);
	};
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	return (
		<>
		{loading ?// Nếu đang loading thì hiển thị component loading
				<Loading></Loading>:null
			}
			<div className="Register-form">
				<div className="register-body-form">
					<div style={{ overflow: 'hidden' }}>
						<img
							src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
							alt="logo"
							className="logo"
						/>
					</div>
					<h2>Đăng ký</h2>
					<Form name="register" onFinish={handleNext} scrollToFirstError>
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
						>
							<Input placeholder="Email" style={{ width: '100%' }} />
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
						>
							<Input.Password placeholder="Mật khẩu" style={{ width: '100%' }} />
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
						>
							<Input.Password
								placeholder="Nhập lại mật khẩu"
								style={{ width: '100%', marginLeft: '0px' }}
							/>
						</Form.Item>
						<Form.Item
							label="Vai trò"
							name="roles"
							rules={[
								{
									required: true,
									message: 'Chọn vai trò của bạn!',
								},
							]}
						>
							<Radio.Group defaultValue="STUDENT">
								<Tooltip title="Giáo viên">
								<Radio.Button value="TEACHER" style={{ padding: '0px', marginLeft: '25px' ,padding:'0 20px 0 20px'}}>
									<LiaChalkboardTeacherSolid />
								</Radio.Button>
								</Tooltip>
								<Tooltip title="Học sinh">
								<Radio.Button
									value="STUDENT"
									style={{ padding: '0px', marginLeft: '10px', marginRight: '10px',padding:'0 20px 0 20px' }}
								>
									<PiStudentBold />
								</Radio.Button>
								</Tooltip>
								<Tooltip title="Phụ huynh">
								<Radio.Button value="PARENT" style={{ padding:'0 20px 0 20px'}}>
									<RiParentLine  />
								</Radio.Button>
								</Tooltip>
							</Radio.Group>
							
						</Form.Item>
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
				</div>
				<ToastContainer />
			
			</div>
		</>
	);
}
