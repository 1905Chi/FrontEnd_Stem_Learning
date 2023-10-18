import React from 'react';
import { Layout, Space } from 'antd';
import anh_logo_1 from '../../assets/images/anh_logo_1.jpg';
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
          <ul style={{display:'flex', listStyle:'none' , justifyContent:'space-around',backgroundColor:'blue',height:'50px'}}>
			<li style={{marginTop:'5px'}}><a href="/" style={{color:'black', fontWeight: 'bold',fontSize: '30px' }} >STEM</a></li>
            <li style={{marginTop:'15px'}}><a href="/login" style={{color:'black'}}>Login</a></li>
            <li style={{marginTop:'15px'}}><a href="/register" style={{color:'black'}}>Register</a></li>
            <li style={{marginTop:'15px'}}><a href="/help" style={{color:'black'}}>Xem hướng dẫn</a></li>
          </ul>
        </nav>
			<Layout>
				<Content style={contentStyle}>
					<div style={{width: '50%',height:'50%'}}>
						<img src={anh_logo_1} alt="anh"  style={{width: '100%',height:'100%'}}/>
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
