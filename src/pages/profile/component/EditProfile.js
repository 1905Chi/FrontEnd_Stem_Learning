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

	return (
		<div className="edit-profile">
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
				<Form>
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
						<Form.Item name="phone"  >
							<Input className="form-item" placeholder="Địa chỉ" />
						</Form.Item>
					) : null}

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
