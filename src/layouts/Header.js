import React, { useEffect } from 'react';
import { Layout, Col, Input, Button, Space, Avatar } from 'antd';
import {
	SearchOutlined,
	HomeOutlined,
	VideoCameraOutlined,
	MenuOutlined,
	BellOutlined,
	MailOutlined,
} from '@ant-design/icons';
import { HiOutlineUserGroup } from 'react-icons/hi';
import './Header.css';

import { useNavigate } from 'react-router-dom';
const { Search } = Input;
export default function Header() {
	const navigate = useNavigate();
	const openHome = () => {
		navigate('/');
	};
	const openGroup = () => {
		navigate('/groups');
	};
	const openProfile = () => {
		navigate('/profile');
	};
	const user = JSON.parse(localStorage.getItem('user'));

	return (
		<Layout>
			<div className="navTop">
				<div className="block1">
					<Col>
						<Space>
							<span className="stem" onClick={openHome}>
								{' '}
								STEM{' '}
							</span>
							<Search placeholder="Tìm kiếm" />
						</Space>
					</Col>
				</div>
				<div className="block2">
					<Col>
						<Space>
							<Button
								shape="circle"
								icon={<HomeOutlined />}
								className="iconHome"
								onClick={openHome}
							></Button>
							<Button
								shape="circle"
								icon={<HiOutlineUserGroup />}
								className="iconHome"
								onClick={openGroup}
							/>
							<Button shape="circle" icon={<MenuOutlined />} className="iconHome" />
							<Button shape="circle" icon={<BellOutlined />} className="iconHome" />
						</Space>
					</Col>
				</div>
				<div className="block3">
					<Col>
						<Space>
							<Button size="circle" icon={<MailOutlined />} />
							<Button size="circle" icon={<BellOutlined />} />
							{user && user.profileImageUrl ? (
                <Avatar size="circle" src={user.profileImageUrl} onClick={openProfile}></Avatar>
								
							) : (
								<Avatar size="circle" src="" onClick={openProfile}></Avatar>
							)}
						</Space>
					</Col>
				</div>
			</div>
		</Layout>
	);
}
