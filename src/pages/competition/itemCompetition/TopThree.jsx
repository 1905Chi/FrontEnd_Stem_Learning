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
import { UserOutlined } from '@ant-design/icons';
import './TopThree.css';
const TopThree = (props) => {
	



	const  defaultTopThreeData=(topThree) => {
		if(topThree.length === 0) {
		return( 
			[
				{
					id: 1,
					name: 'Đang cập nhật',
					avatar: SliverMedal,
					medal: SliverMedal,
				},
				{
					id: 2,
					name: 'Đang cập nhật',
					avatar: GoldMedal,
					medal: GoldMedal,
				},
				{
					id: 3,
					name: 'Đang cập nhật',
					avatar: BronzeMedal,
					medal: BronzeMedal,
				},
			])
		} else if(topThree.length === 1) {
			return( 
				[
					
					{
						id: 2,
						name: 'Đang cập nhật',
						avatar: SliverMedal,
						medal: SliverMedal,
					},
					{
						id: topThree[0].id,
						name: topThree[0].name,
						avatar: topThree[0].Avatar,
						medal:  GoldMedal,
					},
				
					{
						id: 3,
						name: 'Đang cập nhật',
						avatar: BronzeMedal,
						medal: BronzeMedal,
					},
				])
		} else if(topThree.length === 2) {
			return( 
				[
					{
						id: topThree[1].id,
						name: topThree[1].name,
						avatar: topThree[1].Avatar,
						medal: SliverMedal,
					},
					{
						id: topThree[0].id,
						name: topThree[0].name,
						avatar: topThree[0].Avatar,
						medal: GoldMedal,
					},
					{
						id: 3,
						name: 'Đang cập nhật',
						avatar: BronzeMedal,
						medal: BronzeMedal,
					},
				])
		} else {
			return( 
				[
					{
						id: topThree[1].id,
						name: topThree[1].name,
						avatar: topThree[1].Avatar,
						medal: SliverMedal,
					},
					{
						id: topThree[0].id,
						name: topThree[0].name,
						avatar: topThree[0].Avatar,
						medal: GoldMedal,
					},
					{
						id: topThree[2].id,
						name: topThree[2].name,
						avatar: topThree[2].Avatar,
						medal: BronzeMedal,
					},
				])
		}
}

	// Kiểm tra và sử dụng dữ liệu mặc định nếu topThree không có dữ liệu
	let topThreeData = defaultTopThreeData(props.TopThree);
		
	const handleUserClick = (userId) => {
		<Navigate to={`/profile/${userId}`}></Navigate>
		
	};

	return (
		<>
			<div className="main-rank-competition">
				
				<div className="top-three-container-competition">
					<img className="left-image" src={Trophy} alt="Trophy Icon" />
					{topThreeData.map((item, index) => (
						<div className={`top-three-item ${index === 1 ? 'center-item' : ''}`} key={item.id}>

							{item.avatar !== null && item.avatar !== undefined ?
							<Avatar className={`top-three-avatar ${index === 1 ? 'large' : ''}`} src={item.avatar} />
							: <Avatar className={`top-three-avatar ${index === 1 ? 'large' : ''}`} icon={<UserOutlined style={{ height: '3em' }} />}/>
						}
							<div className="medal-container">
								<img className="medal" src={item.medal} alt="Medal Icon" />
							</div>
							{/* <img className="laurel-wreath" src={LaurelWreath} alt="Laurel Wreath Icon" /> */}
							<p>{item.name}</p>
						</div>
					))}
					<img className="right-image" src={Trophy} alt="Trophy Icon" />
					<img className="floral-design top-left" src={FloralDesign} alt="Floral Design Icon" />
					<img className="floral-design top-right" src={FloralDesign} alt="Floral Design Icon" />
					<img className="floral-design bottom-left" src={FloralDesign} alt="Floral Design Icon" />
					<img className="floral-design bottom-right" src={FloralDesign} alt="Floral Design Icon" />
				</div>
				<div className="banner-competition">
				<span>Vinh danh Top 3 xuất sắc</span>
				<img className="ribbon-competition" src={Ribbon} alt="Ribbon Icon" />
			</div> 
			</div>
			
		</>
	);
};

export default TopThree;
