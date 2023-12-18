
import React from 'react';
import './DefaultLayout.css';
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
