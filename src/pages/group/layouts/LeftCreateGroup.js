import React, { useState } from 'react';
import { Input, Button, Form, Radio, Tooltip, Select } from 'antd';
import LableGroup from '../components/LableGroup';
import { FaEarthEurope } from 'react-icons/fa6';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import './LeftCreateGroup.css';
export default function LeftCreateGroup() {
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
		{
			value: 'Khang',
			label: 'Khang',
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
	return (
		<>
			<div className="header-left-create">
				<h1 style={{ textAlign: 'start' }}>Tạo Nhóm</h1>
			</div>
			<div>
				<LableGroup
					image="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
					name="Nhóm"
				></LableGroup>
				<Form>
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
					{ policyDescription.length ===0  ? null : <Form.Item name="description">
						<span className="description-policy">{policyDescription}</span>
					</Form.Item>}
					

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
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%', height: '45px' }}>
							Tạo
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}
