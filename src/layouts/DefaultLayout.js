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
export default function DefaultLayout({ Left, Right, children }) {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<>
			<div style={{backgroundColor:'rgb(244 246 250)'}}>
				<div className="header" style={{ background: colorBgContainer }}>
					<Topbar />
				</div>
				<Row className="body-web">
					<Col span={5} className="left-web">
						<div className="left-web-content">{Left}</div>
					</Col>
					<Col span={19} className="main-web">
						<div className="main-web-content">{children}</div>
					</Col>
				</Row>
				<div className="right-web">{Right}</div>

			</div>
		</>
	);
}
