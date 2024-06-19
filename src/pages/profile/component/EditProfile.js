import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import { GiCancel } from 'react-icons/gi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Input, Button, Radio, DatePicker, Spin, Tooltip } from 'antd';
import { FcManager } from 'react-icons/fc';
import { FcBusinesswoman } from 'react-icons/fc';
import { AiFillQuestionCircle } from 'react-icons/ai';
import Api from '../../../api/Api';
import Loading from '../../../components/Loading';
import { Tabs } from 'antd';
import moment from 'moment';
import { Select } from 'antd';

export default function EditProfile({ onCancel }) {
	const [editName, setEditName] = useState(false);
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [schools, setSchools] = useState([]);
	const [grade, setGrade] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
	const [editLastName, setEditLastName] = useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = useState(false);
	const [editBirthday, setEditBirthday] = useState(false);
	const [currentDate, setCurrentDate] = useState(moment());
	const [editGender, setEditGender] = useState(false);
	const [editBio, setEditBio] = useState(false);
	const [editWork, setEditWork] = useState(false);
	const [editaddress, setEditaddress] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const [provinceItem, setprovicesItem] = useState({}); // Thông tin người dùng
	const [districtsItem, setdistrictsItem] = useState({}); // Thông tin người dùng
	const [schoolsItem, setschoolsItem] = useState({}); // Thông tin người dùng
	const [isSaving, setIsSaving] = useState(false);
	console.log(isSaving);
	const [subjects, setSubjects] = useState([]);
	useEffect(() => {
		callSubject();
	}, []);
	const saveUpdate = (values) => {
		setLoading(true);
		let data = {};
		if (user.role === 'PARENT') {
			data = {
				firstName: values.firstname ? values.firstname : user.firstName,
				lastName: values.lastname ? values.lastname : user.lastName,
				phone: values.phone ? values.phone : user.phone,
				dob: values.date_picker ? values.date_picker.format('YYYY-MM-DD') : user.dob,
				gender: values.gender ? values.gender : user.gender,
			};
		}
		if (user.role === 'STUDENT') {
			data = {
				firstName: values.firstname ? values.firstname : user.firstName,
				lastName: values.lastname ? values.lastname : user.lastName,
				phone: values.phone ? values.phone : user.phone,
				dob: values.date_picker ? values.date_picker.format('YYYY-MM-DD') : user.dob,
				gender: values.gender ? values.gender : user.gender,
				provinces: values.province ? provinceItem : user.province,
				districts: values.district ? districtsItem : user.district,
				schools: values.school ? schoolsItem : user.school,
				grade: values.grade ? values.grade : user.grade,
			};
		}
		if (user.role === 'TEACHER') {
			data = {
				firstName: values.firstname ? values.firstname : user.firstName,
				lastName: values.lastname ? values.lastname : user.lastName,
				phone: values.phone ? values.phone : user.phone,
				dob: values.date_picker ? values.date_picker.format('YYYY-MM-DD') : user.dob,
				gender: values.gender ? values.gender : user.gender,
				provinces: values.province ? provinceItem : user.province,
				districts: values.district ? districtsItem : user.district,
				schools: values.school ? schoolsItem : user.school,
				grade: values.grade ? values.grade : user.grade,
				subject: values.subject ? values.subject : user.subject,
			};
		}
		console.log(data);
		const config = {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			},
		};

		Api.put(url + 'api/v1/users/profile', data, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setTimeout(() => {
						onCancel();
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
	};
	const callSubject = async () => {
		await axios
			.get(url + 'api/v1/subjects')
			.then((response) => {
				setSubjects(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
	const saveUpdatePass = (values) => {
		try {
			const data = {
				oldPassword: values.oldpassword,
				newPassword: values.newpassword,
				confirmPassword: values.confirm_password,
			};
			console.log(data);
			const config = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					'Content-Type': 'application/json',
				},
			};
			// if (isSaving === false) {
			// 	return; // Không thực hiện yêu cầu axios
			// }

			Api.put(url + 'api/v1/users/change-password', data, config).then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					setTimeout(() => {
						onCancel();
					}, 2000);
				} else {
					toast.error(response.data.message);
				}
			});
		} catch (error) {
			// Xử lý lỗi nếu có lỗi xảy ra
		}
	};
	const config = {
		rules: [
			{
				type: 'object',
				required: false,
				message: 'Chọn ngày tháng năm sinh!',
			},
		],
	};
	const handleChange = (value) => {
		setschoolsItem(schools.filter((item) => item.name === value)[0].name);
	};
	const UpdatePass = () => {};
	const items = [
		{
			key: '1',
			label: 'Cập nhật thông tin cá nhân',
			children: (
				<Form name="register" onFinish={saveUpdate} scrollToFirstError>
					<div className="information-profile">
						<Form.Item
							name="firstName"
							label="Tên"
							rules={[{ required: false, message: 'Vui lòng nhập tên của bạn!' }]}
							className="form-item-register"
						>
							<Input placeholder="Tên" style={{ width: '100%' }} defaultValue={user.firstName} />
						</Form.Item>
						<Form.Item
							name="lastName"
							label="Họ và tên đệm"
							rules={[{ required: false, message: 'Vui lòng nhập họ của bạn!' }]}
							className="form-item-register"
						>
							<Input placeholder="Họ" style={{ width: '100%' }} defaultValue={user.lastName} />
						</Form.Item>
						<Form.Item
							name="phone"
							label="Số điện thoại"
							className="form-item-register"
							rules={[
								{
									required: false,
									message: 'Vui lòng nhập số điện thoại!',
									whitespace: true,
								},
								{
									pattern: /^0\d{9}$/, // Số điện thoại bắt đầu bằng 0 và có 10 chữ số
									message: 'Số điện thoại không hợp lệ!',
								},
							]}
						>
							<Input placeholder="Số điện thoại" style={{ width: '100%' }} defaultValue={user.phone} />
						</Form.Item>
						<Form.Item name="date_picker" {...config} className="form-item-register" label="Ngày sinh">
							<DatePicker
								format="DD-MM-YYYY"
								style={{ width: '100%' }}
								placeholder="Ngày tháng năm sinh"
								onChange={(date) => setCurrentDate(date)}
								disabledDate={isDateDisabled}
							/>
						</Form.Item>
						{user.role === 'STUDENT' || user.role === 'TEACHER' ? (
							<div className="stu-tea">
								<Form.Item
									className="form-item-register"
									label="Tỉnh"
									name="province"
									rules={[{ required: false, message: 'Vui lòng chọn tỉnh thành!' }]}
								>
									<Select
										showSearch
										style={{ width: '100%' }}
										placeholder="Tỉnh"
										onChange={(value) => {
											handleChangeProvince(value);
											setSchools([]);
											setDistricts([]);
										}}
										defaultValue={user.province}
									>
										{provinces.map((province) => (
											<Option
												value={province.id}
												key={province.id}
												id={province.name}
												style={{ color: 'black' }}
											>
												{province.name}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									className="form-item-register"
									name="district"
									label="Quận"
									rules={[{ required: false, message: 'Vui lòng chọn quận huyện!' }]}
								>
									<Select
										showSearch
										style={{ width: '100%' }}
										placeholder="Quận huyện"
										onChange={(value) => {
											handleChangeDistrict(value);
											setSchools([]);
										}}
										defaultValue={user.district}
									>
										{districts.map((district) => (
											<Option value={district.id} key={district.id} style={{ color: 'black' }}>
												{district.name}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									name="school"
									label="Trường học"
									rules={[{ required: false, message: 'Vui lòng chọn trường học!' }]}
									className="form-item-register"
								>
									<Select
										showSearch
										style={{ width: '100%' }}
										placeholder="Trường học"
										onChange={handleChange}
										defaultValue={user.school}
									>
										{schools.map((school) => (
											<Option value={school.name} key={school.id} style={{ color: 'black' }}>
												{school.name}
											</Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item
									name="grade"
									label="Khối"
									rules={[{ required: false, message: 'Vui lòng chọn khối lớp!' }]}
									className="form-item-register"
								>
									<Select
										showSearch
										style={{ width: '100%' }}
										placeholder="Khối lớp"
										defaultValue={user.grade}
									>
										{grade.map((g) => (
											<Option value={g} key={g} style={{ color: 'black' }}>
												{g}
											</Option>
										))}
									</Select>
								</Form.Item>
							</div>
						) : null}
						{user.role === 'TEACHER' ? (
							<Form.Item
								name="subject"
								label="Môn"
								rules={[{ required: false, message: 'Vui lòng chọn môn học!' }]}
								className="form-item-register"
							>
								<Select
									showSearch
									style={{ width: '100%' }}
									placeholder="Môn học"
									onChange={handleChange}
									defaultValue={user.subject}
								>
									{subjects.map((subject) => (
										<Option value={subject.name} key={subject.id} style={{ color: 'black' }}>
											{subject.name}
										</Option>
									))}
								</Select>
							</Form.Item>
						) : null}
						<Form.Item
							name="gender"
							label="Giới tính"
							defaultValue={user.gender}
							rules={[{ required: false, message: 'Chọn giới tính' }]}
							className="form-item-register"
						>
							<div>
								<Radio.Group defaultValue="MALE" style={{ width: '100%' }}>
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
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Lưu
							</Button>
						</Form.Item>
					</div>
				</Form>
			),
		},
		{
			key: '2',
			label: 'Đổi mật khẩu',
			children: (
				<div className="ten">
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
						<Form onFinish={saveUpdatePass} scrollToFirstError>
							<Form.Item
								name="oldpassword"
								rules={[
									{
										required: false,
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
								<Input.Password placeholder="Mật khẩu cũ" style={{ width: '180px' }} />
							</Form.Item>

							<Form.Item
								name="newpassword"
								rules={[
									{
										required: false,
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
								name="confirm_password"
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: false,
										message: 'Vui lòng xác nhận lại mật khẩu!',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('newpassword') === value) {
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
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className="login-form-button"
									onClick={UpdatePass}
								>
									Lưu
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			),
		},
	];

	return (
		<div className="edit-profile">
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}

			<div className="form-edit-profile">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Chỉnh sửa thông cá nhân</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={onCancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
				<Tabs defaultActiveKey="1" items={items} centered indicatorSize={(origin) => origin - 16} />
			</div>
			<ToastContainer />
		</div>
	);
}
