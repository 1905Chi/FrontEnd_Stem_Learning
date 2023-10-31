import React, { useState } from 'react';
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

import Loading from '../../../components/Loading';
export default function EditProfile({ onCancel }) {

	const [editName, setEditName] = useState(false);
	const [editLastName, setEditLastName] = useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = useState(false);
	const [editBirthday, setEditBirthday] = useState(false);
	const [editGender, setEditGender] = useState(false);
	const [editBio, setEditBio] = useState(false);
	const [editWork, setEditWork] = useState(false);
	const [editaddress, setEditaddress] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const setdEditName = () => {
		setEditName(true);
	};
	const setdEditLastName = () => {
		setEditLastName(true);
	};
	const setdEditPhoneNumber = () => {
		setEditPhoneNumber(true);
	};
	const setdEditBirthday = () => {
		setEditBirthday(true);
	};
	const setdEditGender = () => {
		setEditGender(true);
	};
	const setdEditBio = () => {
		setEditBio(true);
	};
	const setdEditWork = () => {
		setEditWork(true);
	};
	const setdAdress = () => {
		setEditaddress(true);
	};
	const [isSaving, setIsSaving] = useState(false);
	console.log(isSaving)
	const saveUpdate = (values) => {
		console.log(isSaving)

		
		if(values.firstname===undefined || values.firstname==="" || values.firstname===null){
			values.firstname=user.firstName;
		}
		if(values.lastname===undefined || values.lastname==="" || values.lastname===null){
			values.lastname=user.lastName;
		}
		if(values.phone===undefined || values.phone==="" || values.phone===null){
			if(user.phone!==null && user.phone!==undefined){
				values.phone=user.phone;
			}
			else values.phone="";
		}
		if(values.dob===undefined || values.dob==="" || values.dob===null){
			if(user.dob!==null && user.dob!==undefined){
				values.dob=user.dob;
			}
			else values.dob="";
		}
		if(values.gender === undefined || values.gender===""|| values===null)	{
			if(user.gender !==null && user.gender!==undefined){
			values.gender=user.gender
			}
			else values.gender="MALE";
		}
		if(values.about===undefined || values.about==="" || values.about===null){
			if(user.about!==null && user.about!==undefined){
				values.about=user.about;
			}
			else values.about="";
		}
		if(values.workAt===undefined || values.workAt==="" || values.workAt===null){
			if(user.workAt!==null && user.workAt!==undefined){
				values.workAt=user.workAt;
			}
			else values.workAt="";
		}
		if(values.adsress===undefined || values.adsress==="" || values.adsress===null){
			if(user.address!==null && user.address!==undefined){
				values.adsress=user.address;
			}
			else values.adsress="";
		}


		const data = {
			
			firstname: values.firstname,
			lastname: values.lastname,
			phone: values.phone,
			dob: values.dob,
			gender:values.gender,
			about:values.about,
			workedAt:values.workAt,
			address:values.adsress,



		};
		const config = {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			},
		};
		if (isSaving===false) {
           
            return; // Không thực hiện yêu cầu axios
        }

        setLoading(true);
		axios
			.put(url + 'api/v1/users/profile', data, config)
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
	}

	return (
		
		<div className="edit-profile">
			{loading ?// Nếu đang loading thì hiển thị component loading
				<Loading></Loading>:null
			}
			<div className="form-edit-profile">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Chỉnh sửa trang cá nhân</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={onCancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
				<Form onFinish={saveUpdate} scrollToFirstError>
					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Tên:</h3>
							{user.firstName ? <h4>{user.firstName}</h4> : null}

							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdEditName}
							>
								Cập nhật
							</button>
						</div>
					</div>

					{editName ? (
						<Form.Item
							name="firstname"
														
							rules={[
								{
									required: false,
									message: 'Nhập tên!',
									whitespace: true,
								},
							]}
						>
							<Input placeholder="Tên"  className="form-item"/>
						</Form.Item>
					) : null}

					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Họ và tên đệm:</h3>
							{user.lastName ? <h4>{user.lastName}</h4> : null}

							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdEditLastName}
							>
								Cập nhật
							</button>
						</div>
					</div>

					{editLastName ? (
						<Form.Item
							
							name="lastname"
							rules={[
								{
									required: false,
									message: 'Nhập họ !',
									whitespace: true,
								},
							]}
						>
							<Input className="form-item" placeholder="Họ và tên đệm" />{' '}
						</Form.Item>
					) : null}

					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Số điện thoại:</h3>
							{user.phone ? <h4>{user.phone}</h4> : null}
							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdEditPhoneNumber}
							>
								Cập nhật
							</button>
						</div>
					</div>

					{editPhoneNumber ? (
						<Form.Item
							name="phone"
							
							rules={[
								{
									required: false,
									message: 'Vui lòng nhập số điện thoại!',
									whitespace: true,
								},
								{
									pattern: /^0\d{9,10}$/, // Sử dụng biểu thức chính quy để kiểm tra số điện thoại bắt đầu bằng 0 và có tổng cộng từ 10 đến 11 ký tự
									message: 'Số điện thoại không hợp lệ!',
								},
							]}
						>
							<Input className="form-item" placeholder="Số điện thoại" />{' '}
						</Form.Item>
					) : null}

					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Ngày sinh:</h3>
							{user.dob ? <h4>{user.dob}</h4> : null}
							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdEditBirthday}
							>
								Cập nhật
							</button>
						</div>
					</div>

					{editBirthday ? (
						<Form.Item
							name="dob"
							rules={[
								{
									type: 'object',
									required: false,
									message: 'Chọn ngày tháng năm sinh!',
								},
							]}
							
						>
							<DatePicker format="DD-MM-YYYY" className="form-item" placeholder="Ngày tháng năm sinh" />
						</Form.Item>
					) : null}

					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Giới tính:</h3>
							{user.gender ? <h4>{user.gender}</h4> : null}
							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdEditGender}
							>
								Cập nhật
							</button>
						</div>
					</div>
					{editGender ? (
						<Form.Item
							name="gender"
							defaultValue="MALE"
							rules={[
								{
									required: false,
									message: 'Chọn giới tính',
								},
							]}
							
						>
							<Radio.Group defaultValue="MALE" className="form-item">
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
					) : null}

					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Tiểu sử:</h3>
							{user.about ? <h4>{user.about}</h4> : null}
							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdEditBio}
							>
								Cập nhật
							</button>
						</div>
					</div>
					{editBio ? (
						<Form.Item name="about"  >
							<Input className="form-item" placeholder="Tiểu sử" />
						</Form.Item>
					) : null}

					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Nơi làm việc:</h3>
							{user.workAt ? <h4>{user.workAt}</h4> : null}
							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdEditWork}
							>
								Cập nhật
							</button>
						</div>
					</div>
					{editWork ? (
						<Form.Item name="workAt"  >
							{' '}
							<Input className="form-item" placeholder="Nơi làm việc" />{' '}
						</Form.Item>
					) : null}

					<div className="ten">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 style={{ textAlign: 'center', margin: '0 0 0 10px' }}>Địa chỉ:</h3>
							{user.address ? <h4>{user.address}</h4> : null}
							<button
								style={{
									textAlign: 'end',
									margin: '0 10px 0 0',
									color: 'blue',
									backgroundColor: 'white',
								}}
								onClick={setdAdress}
							>
								Cập nhật
							</button>
						</div>
					</div>
					{editaddress ? (
						<Form.Item name="adsress"  >
							<Input className="form-item" placeholder="Địa chỉ" />
						</Form.Item>
					) : null}

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button" onClick={() => setIsSaving(true)}>
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</div>
			<ToastContainer />
		</div>
	);
}
