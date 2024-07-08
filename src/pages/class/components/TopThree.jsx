import React, { useEffect } from 'react';
import { Avatar, Popover, Image } from 'antd';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import Trophy from '../../../assets/images/trophy.jpg';
import LaurelWreath from '../../../assets/images/Golden_Laurel_Wreath.png';
import Ribbon from '../../../assets/images/ribbon-png.webp';
import FloralDesign from '../../../assets/images/floral-design.jpg';
import SliverMedal from '../../../assets/images/SliverMedal.jpg';
import GoldMedal from '../../../assets/images/badge.jpg';
import BronzeMedal from '../../../assets/images/bronze-medal.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './TopThree.css';

const TopThree = () => {
	const [topThree, setTopThree] = React.useState([]);

	let defaultTopThreeData = [
		{
			id: 1,
			name: 'SliverMedal',
			avatar: SliverMedal,
			medal: SliverMedal,
		},
		{
			id: 2,
			name: 'GoldMedal',
			avatar: GoldMedal,
			medal: GoldMedal,
		},
		{
			id: 3,
			name: 'BronzeMedal',
			avatar: BronzeMedal,
			medal: BronzeMedal,
		},
	];

	// Kiểm tra và sử dụng dữ liệu mặc định nếu topThree không có dữ liệu
	let topThreeData =
		topThree.length < 3
			? defaultTopThreeData
			: [
					{
						id: topThree[1].userId,
						name: topThree[1].userName,
						avatar: topThree[1].avatar,
						medal: SliverMedal,
					},
					{
						id: topThree[0].userId,
						name: topThree[0].userName,
						avatar: topThree[0].avatar,
						medal: GoldMedal,
					},
					{
						id: topThree[2].userId,
						name: topThree[2].userName,
						avatar: topThree[2].avatar,
						medal: BronzeMedal,
					},
			  ];

	const handleUserClick = (userId) => {
		<Navigate to={`/profile/${userId}`}></Navigate>
		
	};

	return (
		<>
			<div className="main-rank ">
				
				<div className="top-three-container">
					<img className="left-image" src={Trophy} alt="Trophy Icon" />
					{topThreeData.map((item, index) => (
						<div className={`top-three-item ${index === 1 ? 'center-item' : ''}`} key={item.id}>
							<Avatar className={`top-three-avatar ${index === 1 ? 'large' : ''}`} src={item.avatar} />
							<div className="medal-container">
								<img className="medal" src={item.medal} alt="Medal Icon" />
							</div>
							<img className="laurel-wreath" src={LaurelWreath} alt="Laurel Wreath Icon" />
							<p>{item.name}</p>
						</div>
					))}
					<img className="right-image" src={Trophy} alt="Trophy Icon" />
					<img className="floral-design top-left" src={FloralDesign} alt="Floral Design Icon" />
					<img className="floral-design top-right" src={FloralDesign} alt="Floral Design Icon" />
					<img className="floral-design bottom-left" src={FloralDesign} alt="Floral Design Icon" />
					<img className="floral-design bottom-right" src={FloralDesign} alt="Floral Design Icon" />
				</div>
				<div className="banner">
				<span>Vinh danh Top 3 xuất sắc</span>
				<img className="ribbon" src={Ribbon} alt="Ribbon Icon" />
			</div> 
			</div>
			
		</>
	);
};

export default TopThree;
