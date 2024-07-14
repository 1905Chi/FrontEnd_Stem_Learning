import React from 'react';
import { Table } from 'antd';
import './RankCompetition.css';
import TopThree from './TopThree';
import { Button } from 'antd/es/radio';
import { useSelector } from 'react-redux';
import { selectSelectedListRank } from '../../../redux/Group';
export default function RankCompetition(props) {
	const selectedListRank = useSelector(selectSelectedListRank);
    const Top3= selectedListRank !== undefined  && selectedListRank !== null && selectedListRank.length > 0
                         ? selectedListRank.slice(0,3) : [];
	const columns = [
		{
			title: 'STT',
			dataIndex: 'key',
			key: 'key',
			width: '10%',
		},
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Số bài làm',
            dataIndex: 'point',
            key: 'point',
            width: '10%',
        },
        {
            title: 'Tổng điểm',
            dataIndex: 'total',
            key: 'total',
            width: '10%',
        },
        {
            title: 'Xếp hạng',
            dataIndex: 'key',
            key: 'key',
            width: '10%',
        },
        
    ]
	const dataMember = [
		{
			key: '1',
			name: 'Nguyễn Văn A',
			point:2,
			total: 50,
			rank: 1,
		},
		
		{
			key: '2',
			name: 'Nguyễn Quang Huy',
			point:2,
			total: 50,
			rank: 2,
		},
		{
			key: '3',
			name: 'Nguyễn Thị B',
			point:2,
			total: 50,
			rank: 3,
		},
	];
	return (
		<div className="rank-competition">
			<TopThree TopThree={Top3} />
			<section className="section search">
				<div className="container">
					<div className="search-wrapper">
						<form method="GET">
							<div className="row">

								<input
									type="text"
									id="dataName"
									name="dataName"
									className="form-control"
									placeholder="Nhập họ tên"
									value=""
								/>
								<Button type="primary" style={{ marginLeft: '10px' }}>
									Tìm kiếm
								</Button>
							</div>
						</form>
					</div>
				</div>
			</section>

			<Table columns={columns} dataSource={selectedListRank} style={{ width: '98%', margin: '2% 1%' }} />
		</div>
	);
}
