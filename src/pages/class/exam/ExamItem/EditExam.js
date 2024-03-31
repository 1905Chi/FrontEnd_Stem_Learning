import React, { useEffect, useState } from 'react';
import { Badge, Table } from 'antd';
import Api from '../../../../api/Api';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectquestion, selectanswer, selectselectquestion, selectselectanswer } from '../../../../redux/Exam';
import { url } from '../../../../constants/Constant';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import EditInforQuestion from './EditInforQuestion';
import { GiCancel } from 'react-icons/gi';
import './EditExam.css';
import { Checkbox } from 'antd';

export default function EditExam() {
	const { id } = useParams();
	const [listQuestion,SetlistQuestion]= useState();
	//const listAnswer = useSelector(selectselectanswer);
	const [loading, setloading] = useState(false);
	const [isEditQuestion, setIsEditQuestion] = useState(false);
	const [isEditAnswer, setIsEditAnswer] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const dispatch = useDispatch();
	const cancel = () => {
		setIsEditQuestion(false);
	};

	const [newAswer, setNewAnswer] = useState();
	const [question, setQuestion] = useState();
	const [answer, setAnswer] = useState();
	const openEditQuestion = (record) => {
		setIsEditQuestion(true);
		setQuestion(record);
	};
	const header = {
		Authorization: localStorage.getItem('accessToken'),
		'Content-Type': 'application/json',
	};
	useEffect(() => {


		fetchData();
	}, [dispatch, id]);

	const fetchData = async () => {
		setloading(true);
		

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

			SetlistQuestion(questions)
		} catch (error) {
			console.log(error);
		} finally {
			setloading(false);
		}
	};

	const deleteAnswer = (record) => {

		setloading(true);
		console.log('record', record);
		console.log('id', record.id);
		Api.delete(url + `api/v1/answers/${record.id}`, {
			headers: {
				Authorization: localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.data.statusCode === 200) {
					toast.success('Xóa thành công', {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 3000,
					});
					fetchData();
				} else {
					toast.error('Xóa thất bại', {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 3000,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setloading(false);
			});
	};

	const EditAnswer = (record) => {
		setAnswer(record);
		setIsEditAnswer(true);
	};

	
	const deleteQuestion = (record) => {
		setloading(true);
		Api.delete(url + `api/v1/questions/${record.id}`, {
			headers: {
				Authorization: localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.data.statusCode === 200) {
					toast.success('Xóa thành công', {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 3000,
					});
					fetchData();
				} else {
					toast.error('Xóa thất bại', {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 3000,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setloading(false);
			});
	};
	const expandedRowRender = (record) => {
		const answerColumns = [
			{
				title: 'Thứ tự',
				dataIndex: 'key',
				key: 'key',
				render: (key) => Number(key) + 1,
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
				dataIndex: 'isCorrect',
				key: 'isCorrect',
				render: (isCorrect) =>
					isCorrect ? (
						<span style={{ color: 'green', fontWeight: 'bold' }}>Đáp án đúng</span>
					) : (
						<span style={{ color: 'red', fontWeight: 'bold' }}>Đáp án sai</span>
					),
				width: '10%',
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => (
					<span>
						<button
							style={{ marginRight: 16, color: 'blue', borderRadius: '5px' }}
							onClick={() => EditAnswer(record)}
						>
							Edit
						</button>
						<button
							style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}
							onClick={() => deleteAnswer(record)}
						>
							Delete
						</button>
					</span>
				),
				width: '20%',
			},
		];

		return <Table columns={answerColumns} dataSource={record.answers} pagination={false} />;
	};
	const UpdateAnswer = () => {
		setloading(true);
		Api.put(
			url + `api/v1/answers/${answer.id}`,
			{
				content: newAswer ? newAswer : answer.content,
				isCorrect: isCorrect!==answer.isCorrect ? isCorrect : answer.isCorrect,
			},
			{
				headers: {
					Authorization: localStorage.getItem('accessToken'),
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => {
				if (res.data.statusCode === 200) {
					toast.success('Cập nhật thành công', {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 3000,
					});
					fetchData();
					
				} else {
					toast.error('Cập nhật thất bại', {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 3000,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setloading(false);
				setIsEditAnswer(false);
			});
	};
	const columns = [
		{
			title: 'Thứ tự',
			dataIndex: 'key',
			key: 'key',
			render: (key) => Number(key) + 1,
			width: '10%',
		},
		{
			title: 'Nội dung câu hỏi',
			dataIndex: 'content',
			key: 'content',
			width: '50%',
			render: (content) => <div dangerouslySetInnerHTML={{ __html: content }} className='question-content-edit' />,
		},
		{
			title: 'Mức độ ',
			dataIndex: 'level',
			key: 'level',
			render: (level) =>
				level === 'Easy' ? (
					<span style={{ color: 'green', fontWeight: 'bold' }}>Dễ</span>
				) : level === 'Medium' ? (
					<span style={{ color: 'orange', fontWeight: 'bold' }}>Trung bình</span>
				) : level === 'Hard' ? (
					<span style={{ color: 'red', fontWeight: 'bold' }}>Khó</span>
				) : (
					<span style={{ color: 'black', fontWeight: 'bold' }}>Không xác định</span>
				),
			width: '20%',
		},
		{
			title: 'Loại câu hỏi',
			dataIndex: 'typeCode',
			key: 'typeCode',
			render: (typeCode) =>
				typeCode === 'single_choice' ? (
					<span style={{ color: 'green', fontWeight: 'bold' }}>Chọn 1</span>
				) : typeCode === 'multiple_choice' ? (
					<span style={{ color: 'orange', fontWeight: 'bold' }}>Chọn nhiều</span>
				)
				: typeCode === 'essay' ? (
					<span style={{ color: 'orange', fontWeight: 'bold' }}>Trả lời ngắn</span>
				)  : (
					<span style={{ color: 'black', fontWeight: 'bold' }}>Không xác định</span>
				),
			width: '10%',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<span>
					<button
						style={{ marginRight: 16, color: 'blue', borderRadius: '5px' }}
						onClick={() => openEditQuestion(record)}
					>
						<CiEdit />
					</button>
					<button
						style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}
						onClick={() => deleteQuestion(record)}
					>
						<MdDeleteForever />
					</button>
				</span>
			),
			width: '10%',
		},
	];
	const UpdateContent = (e) => {
		setNewAnswer(e.target.value);
	}


	return (
		<>
			{loading && <div className="loading"></div>}
			{isEditQuestion && <EditInforQuestion question={question} cancel={cancel} fetchData={fetchData} />}
			{isEditAnswer && (
				<div className="edit-answer-exam">
					<div className="form-edit-answer-exam" style={{ width: '50%' }}>
						<div
							style={{
								display: 'flex',
								borderBottom: '1px solid black',
								justifyContent: 'space-between',
								flex: 10,
							}}
						>
							<h2 style={{ flex: 8, textAlign: 'end' }}>Chỉnh sửa thông tin câu trả lời</h2>
							<button
								style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
								onClick={() => {
									setIsEditAnswer(false);
								}}
							>
								<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
							</button>
						</div>
						<div style={{ display: 'flex', padding: 'px' }}>
							<input defaultValue={answer.content} style={{ width: '50%' }} onChange= {UpdateContent} />
							<label style={{ paddingTop: '10px', margin: '0 20px' }}>Đáp án đúng</label>{' '}
							{answer.isCorrect ? <Checkbox defaultChecked > </Checkbox> : <Checkbox onChange={(e)=>{
								 setIsCorrect(e.target.checked);
							}}> </Checkbox>}
						</div>
						<div style={{ textAlign: 'center' }}>
							<button
								style={{
									backgroundColor: 'green',
									color: 'white',
									borderRadius: '5px',
									width: '100px',
									height: '50px',
									margin: '20px 0 15px 0',
								}}
								onClick={() => {
									UpdateAnswer();
								}	}
							>
								Lưu
							</button>
						</div>
					</div>
				</div>
			)}

			<h2 style={{ textAlign: 'center' }}>Danh sách câu hỏi</h2>
			<Table
				columns={columns}
				expandable={{
					expandedRowRender,
					
				}}
				align="center"
				dataSource={listQuestion}
				size="middle"
			/>
			<ToastContainer />
		</>
	);
}
