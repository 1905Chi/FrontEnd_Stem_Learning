import React from 'react';
import './MainCompetition.css';
import { Tabs, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
function MainCompetition() {
	const items = [
		{
			key: '1',
			label: 'Bảng xếp hạng',
			children: <div></div>,
		},
		{
			key: '2',
			label: 'Thể lệ',
			children: <div></div>,
		},
	];
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<div className="main-competition" style={{}}>
			<div className="marquee-container">
				<div className="marquee-content">
					<span>giương buồm ra khơi truy tìm kho báu.</span>
				</div>
			</div>
			<div className="map-copetition">
				<div className="grid-container">
					{/* Dòng 1 */}
					<div className="grid-item">
                        <img src=""/>   
                    </div>
					<div className="grid-item">2</div>
					<div className="grid-item">3</div>

					{/* Dòng 2 */}
					<div className="grid-item">4</div>
					<div className="grid-item">5</div>
					<div className="grid-item">6</div>

					{/* Dòng 3 */}
					<div className="grid-item">7</div>
					<div className="grid-item">8</div>
					<div className="grid-item">9</div>
				</div>
				{user.avatarUrl !== null && user.avatarUrl !== '' ? (
					<Avatar src={user.avatarUrl} size={64} className="overlay-image" />
				) : (
					<Avatar
						alt="avatar"
						height="40"
						icon={<UserOutlined style={{ height: '3em' }} />}
						className="overlay-image"
					/>
				)}
			</div>
			<div className="rank-infor">
				<Tabs defaultActiveKey="1" items={items} />
			</div>
		</div>
	);
}

export default MainCompetition;
