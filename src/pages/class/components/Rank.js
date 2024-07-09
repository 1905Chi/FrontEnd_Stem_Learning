import React, { useState, useEffect } from 'react';
import { selectselectMemberGroup } from '../../../redux/MemberGroup';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import { Button, Space, Select } from 'antd';
import { Dialog } from 'primereact/dialog';
import { Input } from 'antd';
import { Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import TopThree from './TopThree';
import { selectSelectedListRank } from '../../../redux/Group';
export default function Rank() {
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
    
	return (
		<div className='rank-class'>
            <TopThree TopThree= {Top3}/>
            <Table columns={columns} dataSource={selectedListRank} style={{width:'94%', margin:'10% 0 0 0'}} />
		</div>
	);
}
