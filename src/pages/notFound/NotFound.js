import React from 'react';
import { Layout, Space } from 'antd';
const { Footer, Content } = Layout;

const contentStyle = {
	textAlign: 'center',
	height: 'auto',
	lineHeight: '120px',
	color: 'black',
	backgroundColor: 'white',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	
};
const footerStyle = {
	textAlign: 'center',
	color: 'black',
	width: '100%',
	backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
	position: 'fixed',
	bottom: 0,
};



const NotFound = () => {
	return (
		<Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
			<nav >
          <ul style={{display:'flex', listStyle:'none' , justifyContent:'space-around'}}>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/help">Xem hướng dẫn</a></li>
          </ul>
        </nav>
			<Layout>
				<Content style={contentStyle}>
					<div>
						<img src="https://i.pinimg.com/736x/fc/fc/5b/fcfc5ba1f115d6905b43cec76858bd94.jpg" alt="anh" />
					</div>
					<div>
						<h1>STEM</h1>
						<p>Science (Khoa học), Technology (Công nghệ), Engineering(Kỹ thuật), Maths(Toán học)</p>
					</div>
				</Content>
				<Footer style={footerStyle}><p>Copyright © 2023 HCMUTE - All Rights Reserved</p>
                <p>Powered and Designed by Trần Văn Kiêt - Bùi Đặng Quốc Chí
</p>
                </Footer>
			</Layout>
		</Space>
	);
};
export default NotFound;
