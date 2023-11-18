import React from 'react';
import './DefaultLayout.css';

export default function DefaultLayoutTwoPage({ Left, children }) {
	return (
		<>
			<div>
				
				<div className="content">
					<div theme="light" className="sider-left">
						{Left}
					</div>
					<div className="content-main"> {children} </div>
				
				</div>
			</div>
		</>
	);
}
