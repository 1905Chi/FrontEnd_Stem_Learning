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
export default function Rank() {
    const columns = [
		{
			title: 'STT',
			dataIndex: 'key',
			key: 'key',
			width: 10,
		},
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Tổng sao',
            dataIndex: 'star',
            key: 'star',
            width: 10,

        },
        {
            title: 'Điểm kiểm tra',
            dataIndex: 'point',
            key: 'point',
            width: 10,
        },
        {
            title: 'Tổng điểm',
            dataIndex: 'total',
            key: 'total',
            width: 10,
        },
        {
            title: 'Xếp hạng',
            dataIndex: 'rank',
            key: 'rank',
            width: 10,
        },
        
    ]
    const dataMember = [
        {
            key: '1',
            name: 'Nguyễn Văn A',
            star: 4,
            point: 8,
            total: 12,
            rank: 1
        },
        {
            key: '2',
            name: 'Nguyễn Văn B',
            star: 3,
            point: 7,
            total: 10,
            rank: 2
        },
        {
            key: '3',
            name: 'Nguyễn Văn C',
            star: 2,
            point: 6,
            total: 8,
            rank: 3
        },
        {
            key: '4',
            name: 'Nguyễn Văn D',
            star: 1,
            point: 5,
            total: 6,
            rank: 4
        },
        {
            key: '5',
            name: 'Nguyễn Văn E',
            star: 0,
            point: 4,
            total: 4,
            rank: 5
        }
    ]
	return (
		<div>
			<h1 style ={{textAlign:'center'}}>Xếp hạng</h1>
            <Table columns={columns} dataSource={dataMember} />
		</div>
	);
}
