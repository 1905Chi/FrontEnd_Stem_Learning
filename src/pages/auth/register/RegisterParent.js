import { Form, Input, Button, Radio, Tooltip, DatePicker, Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { FcManager } from 'react-icons/fc';
import { FcBusinesswoman } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { url } from '../../../constants/Constant';
import Loading from '../../../components/Loading';
import moment from 'moment';
export default function RegisterParent(props) {
	const roles = ['STUDENT', 'TEACHER', 'PARENT'];
	const navigate = useNavigate();

	useEffect(() => {
		
	}, []);

	const isDateDisabled = (date) => {
		return date.isAfter(moment()); // Trả về true nếu ngày là ngày tương lai
	};
	

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
			firstName: values.firstName,
			lastName: values.lastName,
			phone: values.phone,
			dob: values.date_picker.format('MM-DD-YYYY'),
			role: values.roles,
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axios
			.post(url + 'api/v1/auth/register-parent', data, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200 || response.data.statusCode === 201) {
					toast.success(response.data.message);
					setTimeout(() => {
						navigate('/login');
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
						<h2 style={{ flex: 8 }}>Đăng ký tài khoản cho phụ huynh</h2>
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
								<Input placeholder="Email" className='item-form' />
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
								<Input.Password placeholder="Mật khẩu" className='item-form' />
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
								<Input.Password placeholder="Nhập lại mật khẩu" className='item-form' />
							</Form.Item>
						</div>
						<h3 style={{ color: 'blue' }}>Thông tin cá nhân:</h3>
						<div className="information-profile">
							<Form.Item
								name="firstName"
								rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
								className="form-item-register"
							>
								<Input placeholder="Tên" className='item-form' />
							</Form.Item>
							<Form.Item
								name="lastName"
								rules={[{ required: true, message: 'Vui lòng nhập họ của bạn!' }]}
								className="form-item-register"
							>
								<Input placeholder="Họ" className='item-form' />
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
										pattern: /^0\d{10,10}$/, // Sử dụng biểu thức chính quy để kiểm tra số điện thoại bắt đầu bằng 0 và có tổng cộng từ 10 đến 11 ký tự
										message: 'Số điện thoại không hợp lệ!',
									},
								]}
							>
								<Input placeholder="Số điện thoại" className='item-form' />
							</Form.Item>
							<Form.Item name="date_picker" {...config} className="form-item-register">
								<DatePicker
									format="DD-MM-YYYY"
									className='item-form'
									placeholder="Ngày tháng năm sinh"
									disabledDate={isDateDisabled}
								/>
							</Form.Item>

							{/* <Form.Item
								className="form-item-register"
								name="district"
								rules={[{ required: true, message: 'Vui lòng chọn quận huyện!' }]}
							>
								<Select
									showSearch
									className='item-form'
									placeholder="Quận huyện"
									optionFilterProp="children"
									onChange={handleChange}
									filterOption={(input, option) =>
										option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									{districts.map((district) => (
										<Option value={district.id} key={district.id}>
											{district.name}
										</Option>
									))}
								</Select>
							</Form.Item> */}

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
									<Radio.Group defaultValue="MALE" className='item-form'>
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
