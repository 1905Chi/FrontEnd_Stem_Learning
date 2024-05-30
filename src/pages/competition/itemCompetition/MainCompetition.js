import './MainCompetition.css';
import React from 'react';
import { Tabs } from 'antd';
import { Label } from '@material-ui/icons';
import HomeCompetition from './HomeCompetition';
import RankCompetition from './RankCompetition';
import InstructCompetition from './InstructCompetition';
function MainCompetition() {
	const items = [
		{
			key: '1',
			label:"Trang chủ",
			children:(<HomeCompetition />),
		},
		{
			key: '2',
			label:"Xếp hạng",
			children:(<RankCompetition />),
		},
		{
			key: '3',
			label:"Hướng dẫn",
			children:(<InstructCompetition />),
		},
	]

			



	return <div className="main-competition">
		<img src="https://nld.mediacdn.vn/291774122806476800/2022/11/25/9-phu-1669389995850149695263.jpg" alt="anh" className="img-baner"/>
		<Tabs defaultActiveKey="1" items={items}  centered indicatorSize={(origin) => origin - 16} />
	</div>;
}

export default MainCompetition;
