import React, { useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import './EditExam.css';
import { useParams } from 'react-router-dom';
import Api from '../../../../api/Api';
import { useState } from 'react';
import { url } from '../../../../constants/Constant';
import Loading from '../../../../components/Loading';

export default function EditExam() {
	const { id } = useParams();
	const [listQuestion, setlistQuestion] = useState([]);
    const [listAnswer, setlistAnswer] = useState([]);
	const [loading, setloading] = useState(false);
	useEffect(() => {
		setloading(true);
		const header = {
			Authorization: localStorage.getItem('accessToken'),
			'Content-Type': 'application/json',
		};
		Api.get(url + `api/v1/questions/exam?examId=${id}`, { headers: header })
			.then((response) => {
				response.data.result.map((item, index) => {
					let questions = {
						...item,
						key: index.toString(),
					};
					setlistQuestion((listQuestion) => [...listQuestion, questions]);
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setloading(false));
	}, []);
	const expandedRowRender =  (record) => {
        {
           
		const header = {
			Authorization: localStorage.getItem('accessToken'),
			'Content-Type': 'application/json',
		};
        //var listAnswer = [];
		Api.get(url + `api/v1/questions/${record.id}`, { headers: header })
            .then((response) => {
                setlistAnswer(response.data.result.answers);
               
                // response.data.result.answers.map((item, index) => {
                //     let answers = {
                //         ...item,
                //         key: index.toString(),
                //     };
                //     listAnswer=(listAnswer) => [...listAnswer, answers];
                    
                // });
            })
            .catch((error) => {
                console.log(error);
            });
		const answerColumns = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: 'nội dung trả lời',
				dataIndex: 'content',
				key: 'content',
			},
			{
				title: 'Đáp án đúng',
				dataIndex: 'isCorrect',
				key: 'isCorrect',
			},
			// Bạn có thể thêm các cột khác tùy thuộc vào dữ liệu chi tiết của câu trả lời
		];
		
		const columns = [
			{
				title: 'Date',
				dataIndex: 'date',
				key: 'date',
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Status',
				key: 'state',
				render: () => <Badge status="success" text="Finished" />,
			},
			{
				title: 'Upgrade Status',
				dataIndex: 'upgradeNum',
				key: 'upgradeNum',
			},
		];
		const data = [];
		for (let i = 0; i < 3; ++i) {
			data.push({
				key: i.toString(),
				date: '2014-12-24 23:12:00',
				name: 'This is production name',
				upgradeNum: 'Upgraded: 56',
			});
           
		}
        console.log(listAnswer);
        
		return <Table columns={answerColumns} dataSource={listAnswer} pagination={false} />;
    }

	};

	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Nội dung',
			dataIndex: 'content',
			key: 'content',
		},
		{
			title: 'Mức độ ',
			dataIndex: 'level',
			key: 'level',
		},
		{
			title: 'loại câu hỏi',
			dataIndex: 'typeCode',
			key: 'typeCode',
		},
	];
	const data = listQuestion.slice(0, 20);

	return (
		<>
			<Table
				columns={columns}
				expandable={{
					expandedRowRender,
					defaultExpandedRowKeys: ['0'],
				}}
				dataSource={data}
				size="middle"
			/>
		</>
	);
}
