import React, { useState } from 'react';
import { Input, Button, Form, Radio, Tooltip, Select } from 'antd';
import LableGroup from '../components/LableGroup';
import { FaEarthEurope } from 'react-icons/fa6';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import './LeftCreateGroup.css';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../components/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../constants/Constant';
import RefeshToken from '../../../api/RefeshToken';
export default function LeftCreateGroup() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const options = [
		{
			value: 'Khang',
			label: 'Khang',
			imageUrl: 'https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png',
		},
		{
			value: 'Toàn',
			label: 'Toàn',
			imageUrl: 'https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png',
		},
		{
			value: 'Kiệt',
			label: 'Kiệt',
			imageUrl: 'https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png',
		},
		{
			value: 'Huy',
			label: 'Huy',
			imageUrl: 'https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png',
		},
	];
	const [policyDescription, setPolicyDescription] = useState('');

	const description = (e) => {
		if (e.target.value === 'PUBLIC') {
			setPolicyDescription(
				'Thành viên và khách truy cập có thể đăng bài trong nhóm. Quản trị viên có thể xét duyệt người lần đầu tham gia.'
			);
		} else {
			setPolicyDescription(
				'Chỉ thành viên mới có thể xem và đăng bài trong nhóm. Quản trị viên có thể xét duyệt người lần đầu tham gia.'
			);
		}
	};
	const create = (values) => {
		setLoading(true);
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		const data = {
			groupName: values.nameGroup,
			groupDescription: values.descriptionGroup,
			groupType: values.policy,
		};

		axios
			.post(url + 'api/v1/groups', data, { headers })
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					setLoading(false);
					toast.success('Tạo nhóm thành công');
					setTimeout(() => {
						navigate(`/groups/${response.data.result.groupId}`);
					}, 5000);
				} else {
					setLoading(false);
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				// Xử lý lỗi nếu có lỗi xảy ra
				if (error.response) {
					// lỗi khi access token hết hạn
					const status = error.response.status;
					if (status === 401) {
						let a = RefeshToken();
						if (a === 200) {
							create(values);
						} else  {
							// lỗi khi refresh token hết hạn
							toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
							setTimeout(() => {
								localStorage.clear();
								navigate('/login');
							}, 5000);
						}
						// token không hợp lệ trả về mã lỗi
					}
				} else if (error.request) {
					// Lỗi không có phản hồi từ máy chủ
					toast.error(error.request.data.message);
					setTimeout(() => {
						localStorage.clear();
						navigate('/login');
					}, 5000);
				} else {
					// Lỗi trong quá trình thiết lập yêu cầu
					toast('Lỗi khi thiết lập yêu cầu.');
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
			<div style={{ height: '100vh' }}>
				<div className="header-left-create">
					<h1 style={{ textAlign: 'start' }}>Tạo Nhóm</h1>
				</div>
				<div>
					<LableGroup
						image="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
						name="Nhóm"
					></LableGroup>
					<Form name="creategroup" onFinish={create} scrollToFirstError>
						<Form.Item
							name="nameGroup"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập tên nhóm',
								},
							]}
						>
							<Input placeholder="Tên nhóm" />
						</Form.Item>
						<Form.Item
							name="descriptionGroup"
							rules={[
								{
									required: false,
								},
							]}
						>
							<Input placeholder="Thông tin về nhóm" />
						</Form.Item>
						<Form.Item
							name="policy"
							label="Quyền riêng tư"
							rules={[
								{
									required: true,
									message: 'Vui lòng chọn quyền riêng tư',
								},
							]}
						>
							<Radio.Group defaultValue="PUBLIC" onChange={description}>
								<Tooltip title="Công khai">
									<Radio.Button
										value="PUBLIC"
										style={{ padding: '0px', marginLeft: '25px', padding: '0 20px 0 20px' }}
									>
										<FaEarthEurope />
									</Radio.Button>
								</Tooltip>
								<Tooltip title="Riêng tư">
									<Radio.Button
										value="PRIVATE"
										style={{
											marginLeft: '10px',
											marginRight: '10px',
											padding: '0 20px 0 20px',
										}}
									>
										<RiGitRepositoryPrivateFill />
									</Radio.Button>
								</Tooltip>
							</Radio.Group>
						</Form.Item>
						{policyDescription.length === 0 ? null : (
							<Form.Item name="description">
								<span className="description-policy">{policyDescription}</span>
							</Form.Item>
						)}

						<Form.Item name="member">
							<Select
								mode="tags"
								placeholder="Mời bạn bè ( Không bắt buộc)"
								style={{
									width: '100%',
								}}
							>
								{options.map((option) => (
									<Select.Option key={option.value} value={option.value}>
										<div className="custom-option">
											<img src={option.imageUrl} alt={option.label} className="rounded-avatar" />
											<span className="option-label">{option.label}</span>
										</div>
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item style={{ position: 'fixed', bottom: '0', width: '285px', margin: '0 15px 0 0' }}>
							<Button type="primary" htmlType="submit" style={{ width: '100%', height: '45px' }}>
								Tạo
							</Button>
						</Form.Item>
					</Form>
				</div>
				<ToastContainer />
			</div>
		</>
	);
}
