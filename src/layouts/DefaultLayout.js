import Header from './Header';
import React from 'react';
import { Layout } from 'antd';
import './DefaultLayout.css';
const { Sider, Content } = Layout;
export default function DefaultLayout({ Left, Right, children }) {
	return (
		<>
			<div>
				
				<div className="content">
					<div theme="light" className="sider-left">
						{Left}
					</div>
					<div className="content-main"> {children} </div>
					<div theme="light" className="sider-right">
						
						{Right}
					</div>
				</div>
			</div>
		</>
	);
}
