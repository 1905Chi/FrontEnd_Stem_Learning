import Header from './Header';
import Left from './Left';
import React from 'react';
import { Layout } from 'antd';
import './DefaultLayout.css';
const { Sider, Content } = Layout;
export default function DefaultLayout({ children }) {
	return (
		<>
			<Layout className="header">
				<Header> </Header>
			</Layout>
			<Layout className="content">
				<Sider  theme="light" className="sider-left">
					<Left> </Left>
				</Sider>
				<Content  className="content-main"> {children} </Content>
				<Sider  theme="light" className="sider-right">
					
				</Sider>
			</Layout>
      
		</>
	);
}
