import './DefaultLayout.css';
import Topbar from '../components/Topbar';
import React from 'react';
import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Col, Row } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const items = [
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	BarChartOutlined,
	CloudOutlined,
	AppstoreOutlined,
	TeamOutlined,
	ShopOutlined,
].map((icon, index) => ({
	key: String(index + 1),
	icon: React.createElement(icon),
	label: `nav ${index + 1}`,
}));

export default function DefaultLayoutTwoPage({ Left, children }) {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<div style={{backgroundColor:"white"}}>
			<div className="header" style={{ background: colorBgContainer }}>
				<Topbar />
			</div>
			<Row className="body-web">
				<Col span={6} className="left-web">
					<div className="left-web-content">{Left}</div>
				</Col>
				<Col span={18} className="main-web">
					<div className="main-web-content" style={{width:'92%'}}>{children}</div>
				</Col>
			</Row>
			</div>
	);
}
