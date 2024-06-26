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

export default function Register(props) {
	const navigate = useNavigate();
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);

	const [schools, setSchools] = useState([]);
	const [grade, setGrade] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
	const [isRegisterForParent, setIsRegisterForParent] = useState(false);
	const [currentDate, setCurrentDate] = useState(moment());
	const [provinceItem, setprovicesItem] = useState(); // Thông tin người dùng
	const [districtsItem, setdistrictsItem] = useState(); // Thông tin người dùng
	// Hàm kiểm tra xem ngày có phải đã diễn ra hay không
	const isDateDisabled = (date) => {
		return date.isAfter(moment()); // Trả về true nếu ngày là ngày tương lai
	};
	useEffect(() => {
		handleProvince();
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
	const RegisterForParent = () => {
		setIsRegisterForParent(!isRegisterForParent);
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
			student: {
				email: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
				gender: values.gender,
				phone: values.phone,
				dob: values.date_picker.format('MM-DD-YYYY'),
				province: provinceItem,
				district: districtsItem,
				school: values.school,
				grade: values.grade,
			},
			parent: {
				email: values.email_parent ? values.email_parent : null,
				password: values.password_parent ? values.password_parent : null,
				firstName: values.firstname_parent ? values.firstname_parent : null,
				lastName: values.lastName_parent ? values.lastName_parent : null,
				gender: values.gender_parent ? values.gender_parent : null,
				phone: values.phone_parent ? values.phone_parent : null,
				dob: values.date_parent ? values.date_parent.format('MM-DD-YYYY') : null,
			},
		};

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios
			.post(url + 'api/v1/auth/register-student', data, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 201 || response.data.statusCode === 200) {
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
				<div className="register-body-form-student">
					<div
						style={{
							display: 'flex',
							borderBottom: '1px solid black',
							justifyContent: 'space-between',
							flex: 10,
						}}
					>
						<h2 style={{ flex: 8 }}>Đăng ký tài khoản cho học sinh</h2>
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
										pattern: /^0\d{9,9}$/, // Sử dụng biểu thức chính quy để kiểm tra số điện thoại bắt đầu bằng 0 và có tổng cộng từ 10 đến 11 ký tự
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
									onChange={(date) => setCurrentDate(date)}
									disabledDate={isDateDisabled}
								/>
							</Form.Item>
							<Form.Item
								className="form-item-register"
								name="province"
								rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành!' }]}
							>
								<Select
									showSearch
									className='item-form'
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
									className='item-form'
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
									className='item-form'
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
									className='item-form'
									placeholder="Khối lớp"
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
						<div
							style={{ color: 'blue', backgroundColor: 'aliceblue', padding: '0' }}
							onClick={RegisterForParent}
						>
							<h3>Thêm tài khoản phụ huynh</h3>
						</div>
						{isRegisterForParent ? (
							<div className="information-profile">
								<Form.Item
									name="email_parent"
									rules={[
										{
											type: 'email',
											message: 'Email không hợp lệ!',
										},
										{
											required: true,
											message: 'Vui lòng nhập email 	!',
										},
									]}
									className="form-item-register"
								>
									<Input placeholder="Email" className='item-form' />
								</Form.Item>
								<Form.Item
									name="password_parent"
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
									name="confirm-parent"
									dependencies={['password']}
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Vui lòng xác nhận lại mật khẩu!',
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password_parent') === value) {
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
								<Form.Item
									name="firstname_parent"
									rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}
									className="form-item-register"
								>
									<Input placeholder="Tên" className='item-form' />
								</Form.Item>
								<Form.Item
									name="lastName_parent"
									rules={[{ required: true, message: 'Vui lòng nhập họ !' }]}
									className="form-item-register"
								>
									<Input placeholder="Họ" className='item-form' />
								</Form.Item>
								<Form.Item
									label="Gender"
									name="gender_parent"
									defaultValue="MALE"
									rules={[
										{
											required: true,
											message: 'Chọn giới tính',
										},
									]}
									className="form-item-register"
								>
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
								</Form.Item>
								<Form.Item
									name="phone_parent"
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
									<Input placeholder="Số điện thoại" className='item-form' />
								</Form.Item>
								<Form.Item name="date_parent" {...config} className="form-item-register">
									<DatePicker
										format="DD-MM-YYYY"
										className='item-form'
										placeholder="Ngày tháng năm sinh"
										onChange={(date) => setCurrentDate(date)}
										disabledDate={isDateDisabled}
									/>
								</Form.Item>
							</div>
						) : null}

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
