import React from 'react';
import { Input, Button, Form ,Radio, Tooltip, Select} from 'antd';
import LableGroup from '../components/LableGroup';
import {FaEarthEurope} from 'react-icons/fa6';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
export default function LeftCreateGroup() {
    const options=[ {value:"Khang",label:"Khang"},
    {value:"Toàn",label:"Toàn"},
    {value:"Kiệt",label:"Kiệt"},
    {value:"Huy",label:"Huy"},
    {value:"Khang",label:"Khang"},
    ]
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
						name="policy"
						label="Quyền riêng tư"
						rules={[
							{
								required: true,
								message: 'Vui lòng chọn quyền riêng tư',
							},
						]}
					>
						<Radio.Group defaultValue="PUBLIC">
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
										padding: '0px',
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

					<Form.Item name="member">
						<Select
							mode="tags"
	
							placeholder="Mời bạn bè ( Không bắt buộc)"
							
						
							style={{
								width: '100%',
							}}
							options={options}
						/>
					</Form.Item>
                    <Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: '100%' }}
								
							>
								Đăng ký
							</Button>
						</Form.Item>
				</Form>
			</div>
		</>
	);
}
