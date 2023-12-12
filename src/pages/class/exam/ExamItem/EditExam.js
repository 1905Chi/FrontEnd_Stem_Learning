import React, { useEffect, useState } from 'react';
import { Badge, Table } from 'antd';
import Api from '../../../../api/Api';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectquestion, selectanswer, selectselectquestion, selectselectanswer } from '../../../../redux/Exam';
import { url } from '../../../../constants/Constant';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import './EditExam.css';

export default function EditExam() {
	const { id } = useParams();
	const listQuestion = useSelector(selectselectquestion);
	//const listAnswer = useSelector(selectselectanswer);
	const [loading, setloading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			setloading(true);
			const header = {
				Authorization: localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			};

			try {
				const questionsResponse = await Api.get(url + `api/v1/questions/exam?examId=${id}`, {
					headers: header,
				});
				const questionsData = questionsResponse.data.result;

				const questionsPromises = questionsData.map(async (question, index) => {
					const answersResponse = await Api.get(url + `api/v1/questions/${question.id}`, { headers: header });
					const answersData = answersResponse.data.result.answers;

					const answers = answersData.map((answer, answerIndex) => ({
						...answer,
						key: answerIndex.toString(),
					}));

					return {
						...question,
						key: index.toString(),
						answers: answers,
					};
				});

				const questions = await Promise.all(questionsPromises);

				dispatch(selectquestion(questions));
			} catch (error) {
				console.log(error);
			} finally {
				setloading(false);
			}
		};

		fetchData();
	}, [dispatch, id]);

	  const expandedRowRender = (record) => {
	    const answerColumns = [
	      {
	        title: 'Thứ tự',
	        dataIndex: 'key',
	        key: 'key',
            render: (key) => ( Number(key)+ 1),
            width: '10%',
            
	      },
	      {
	        title: 'Nội dung trả lời',
	        dataIndex: 'content',
	        key: 'content',
            width: '50%',
	      },
	      {
	        title: 'Loại đáp án',
	        dataIndex: 'isCorrect' ,
	        key: 'isCorrect' ,
            render: (isCorrect) => (isCorrect ? <span style={{color:'green', fontWeight:'bold'}}>Đáp án đúng</span> 
            : <span style={{color:'red', fontWeight:'bold'}}>Đáp án sai</span>),
            width: '10%',
	      },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
              <span>
                <button style={{ marginRight: 16, color: 'blue', borderRadius:'5px' }}>Edit</button>
                <button style={{backgroundColor:'red',color:'white', borderRadius:'5px'}}>Delete</button>
              </span>
            ),
            width: '20%',
          }
	    ];

	    return <Table columns={answerColumns} dataSource={record.answers} pagination={false} />;
	  };

	const columns = [
		{
			title: 'Thứ tự',
			dataIndex: 'key',
			key: 'key',
            render: (key) => ( Number(key)+ 1),
            width: '10%',
		},
		{
			title: 'Nội dung câu hỏi',
			dataIndex: 'content',
			key: 'content',
            width: '50%',
		},
		{
			title: 'Mức độ ',
			dataIndex: 'level',
			key: 'level',
            render: (level) => (level === 'Easy' ? <span style={{color:'green', fontWeight:'bold'}}>Dễ</span> : level === 'Medium'
             ? <span style={{color:'orange', fontWeight:'bold'}}>Trung bình</span> : level==='Hard' 
             ? <span style={{color:'red', fontWeight:'bold'}}>Khó</span> 
             : <span style={{color:'black', fontWeight:'bold'}}>Không xác định</span>),
            width: '20%',
		},
		{
			title: 'Loại câu hỏi',
			dataIndex: 'typeCode',
			key: 'typeCode',
            render: (typeCode) => (typeCode === 'single_choice' ? <span style={{color:'green', fontWeight:'bold'}}>Chọn 1</span>
                : typeCode === 'multiple_choice' ? <span style={{color:'orange', fontWeight:'bold'}}>Chọn nhiều</span>           
                : <span style={{color:'black', fontWeight:'bold'}}>Không xác định</span>),
            width: '10%',
		},
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
              <span>
                <button style={{ marginRight: 16, color: 'blue', borderRadius:'5px' }}><CiEdit/></button>
                <button style={{backgroundColor:'red',color:'white', borderRadius:'5px'}}><MdDeleteForever/></button>
              </span>
            ),
            width: '10%',
          }
	];

	return (
		<>
        <h2 style={{textAlign:'center'}}>Danh sách câu hỏi</h2>
			<Table
				columns={columns}
				expandable={{
					expandedRowRender,
					defaultExpandedRowKeys: ['0'],
				}}
                align="center"
				dataSource={listQuestion}
				size="middle"
			/>
		</>
	);
}
