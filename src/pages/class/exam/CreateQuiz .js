import React, { useState } from 'react';
import { Form, Input, Checkbox, Radio, Button, Space, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import Editor from '../../home/components/Editor';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import Loading from '../../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import './CreateQuiz.css';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { selectselectscore, selectscore } from '../../../redux/Exam';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { InputBase } from '@mui/material';
const CreateQuiz = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const maxScore = useSelector(selectselectscore);
	console.log(maxScore);
	const navigate = useNavigate();
	const { Option } = Select;
	const [answerTypes, setAnswerTypes] = useState(['single']); // 'single' or 'multiple'
	const [editingIndex, setEditingIndex] = useState(-1);
	const { uuid } = useParams();
	const [value, setValue] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentDate, setCurrentDate] = useState(moment());
	const [scores, setScores] = useState([]);
	const isDateDisabled = (date) => {
		return !date.isAfter(moment()); // Trả về true nếu ngày là ngày tương lai
	};
	const onFinish = (values) => {
		console.log('Received values:', values);
		console.log('Answer types:', answerTypes);
		console.log('content ', value);
		console.log('scores ', scores);

		setIsLoading(true);
		const data = {
			groupId: uuid,
			name: values.name,
			description: values.description,
			duration: Number(values.duration),
			startedAt: values.startedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
			endedAt: values.endedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
			isEnabled: true,
			level: values.level,
			numberOfQuestion: Number(values.numberOfQuestion),
			maxScore: maxScore,
			questions: [],
		};
		answerTypes.map((item, index) => {
			if(index < answerTypes.length-1) {
				let questions = {
					content: value[index],
					level: 'Easy',
					typeCode: answerTypes[index],
					answers: [],
					score: answerTypes[index] === 'essay' && scores[index] !== undefined ? scores[index] : 1,
				};
				if (answerTypes[index] !== 'essay' ) {
					values.questions[index].answers !== undefined &&
						values.questions[index].answers.map((item) => {
							var answer = {};
							if (item.isCorrect === true) {
								answer = {
									content: item.answer,
									isCorrect: true,
								};
								questions.answers = [...questions.answers, answer];
							} else if (item.isCorrect === undefined && answerTypes[index] === 'essay') {
								answer = {
									content: item.answer,
									isCorrect: true,
								};
								questions.answers = [...questions.answers, answer];
							} else {
								answer = {
									content: item.answer,
									isCorrect: false,
								};
								questions.answers = [...questions.answers, answer];
							}
						});
				}
	
				data.questions = [...data.questions, questions];
			}
			
		});
		console.log('data', data);
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.post(url + 'api/v1/exams', data, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Tạo bài kiểm tra thành công !');
					setTimeout(() => {
						navigate('/classes/' + uuid);
					}, 3000);
				}
			})
			.catch((error) => {
				toast.error('Tạo bài kiểm tra thất bại !');
			})
			.finally(() => {
				setIsLoading(false);
			});

		console.log(data);
	};

	const handleAnswerTypeChange = (index, e) => {
		let newAnswerTypes = [...answerTypes];
		newAnswerTypes[index] = e.target.value;
		if (e.target.value === 'single_choice') {
			newAnswerTypes[index] = 'single_choice';
		} else if (e.target.value === 'multiple_choice') {
			newAnswerTypes[index] = 'multiple_choice';
		}  else {
			newAnswerTypes[index] = 'essay';
		}
		totalScore(newAnswerTypes, scores);
		console.log(newAnswerTypes);
		setAnswerTypes(newAnswerTypes);
		
		
	};
	const handleEditQuestion = (index) => {
		setEditingIndex(index);
	};

	const handleEditorChange = (content) => {
		if (editingIndex !== null) {
			setValue((prevValue) => {
				const newValue = [...prevValue];
				newValue[editingIndex] = content;

				return newValue;
			});
		}
		console.log(value);
	};

	const handleEditorCancel = () => {
		setEditingIndex(-1);
		console.log(editingIndex);
	};

	const validateEndTime = (_, value) => {
		const { startedAt, duration, endedAt } = form.getFieldsValue();

		const startTime = moment(
			startedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
			'DD-MM-YYYY HH:mm:ss:SSSSSS'
		).valueOf();
		console.log('start', startTime);

		const endTime = moment(endedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS'), 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		console.log('end', endTime);

		console.log(duration);
		console.log(duration * 60000 + startTime);

		if (endTime < startTime + duration * 60000) {
			return Promise.reject(
				new Error(`Thời gian kết thúc phải sau ít nhất 1 khoảng thời gian ${duration} phút.`)
			);
		}

		return Promise.resolve();
	};
	const totalScore = (newAnswerTypes,scores)=> {
		let total = 0;
		console.log(scores)
		console.log(answerTypes)
		newAnswerTypes.map((item, index) => {
			if (item === 'essay' && scores[index] !== undefined && !Number.isNaN(scores[index])){
				total += scores[index];
			} else {
				total += 1;
			}
		});
		console.log("total",total);
		dispatch(selectscore(total-1));
	};
	return (
		<div className="create-quiz">
			<div className="back-to-exam" style={{ margin: '5rem 0 0 3rem' }}>
				<button
					className="back-to-exam-button"
					onClick={() => {
						window.history.back();
					}}
				>
					<RiArrowGoBackLine /> Quay lại
				</button>
			</div>
			{isLoading ? <Loading /> : null}

			<Form form={form} onFinish={onFinish} layout="vertical" style={{ textAlign: 'center' }}>
				<h1 style={{ textAlign: 'center' }}>Tạo bài kiểm tra</h1>
				<div className="infor-exam-create">
					<strong>Tên bài kiểm tra:</strong>
					<Form.Item
						name="name"
						className="infor-exam-create-input"
						rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra!' }]}
					>
						<Input placeholder="Nhập tên bài kiểm tra" style={{ width: '60%' }} />
					</Form.Item>
				</div>
				<div className="infor-exam-create">
					<strong>Mô tả bài kiểm tra:</strong>
					<Form.Item
						className="infor-exam-create-input"
						name="description"
						rules={[{ required: true, message: 'Vui lòng nhập mô tả bài kiểm tra!' }]}
					>
						<Input placeholder="Nhập mô tả bài kiểm tra" style={{ width: '60%' }} />
					</Form.Item>
				</div>
				<div className="infor-exam-create">
					<strong>Thời gian làm bài:</strong>
					<Form.Item
						name="duration"
						className="infor-exam-create-input"
						rules={[{ required: true, message: 'Vui lòng nhập thời gian làm bài!' }]}
					>
						<InputNumber
							min={15}
							placeholder="Nhập thời gian làm bài ( Số phút)"
							style={{ width: '60%', border: '1px solid black' }}
						/>
					</Form.Item>
				</div>
				<div className="infor-exam-create">
					<strong>Điểm số tối đa:</strong>
					<Form.Item
						name="maxScore"
						//		rules={[{ required: true, message: 'Vui lòng nhập điểm số tối đa của bài kiểm tra!' }]}
						className="infor-exam-create-input"
					>
						
						{useSelector(selectselectscore)}
					</Form.Item>
				</div>
				<div className="infor-exam-create">
					<strong>Mức độ bài kiểm tra:</strong>
					<Form.Item
						name="level"
						className="infor-exam-create-input"
						rules={[{ required: true, message: 'Vui lòng nhập mức độ bài kiểm tra!' }]}
					>
						<Select
							placeholder="Chọn mức độ bài kiểm tra"
							style={{ width: '60%', border: '1px solid black' }}
						>
							<Option value="Easy">Dễ</Option>
							<Option value="Medium">Trung bình</Option>
							<Option value="Hard">Khó</Option>
						</Select>
					</Form.Item>
				</div>
				<div className="infor-exam-create">
					<strong>Số lượng câu hỏi mỗi bài kiểm tra:</strong>
					<Form.Item
						name="numberOfQuestion"
						className="infor-exam-create-input"
						rules={[{ required: true, message: 'Nhập số lượng câu hỏi mỗi bài kiểm tra' }]}
					>
						<InputNumber
							min={1}
							placeholder="Nhập số lượng câu hỏi mỗi bài kiểm tra"
							style={{ width: '60%', border: '1px solid black' }}
						/>
					</Form.Item>
				</div>
				<div className="infor-exam-create">
					<strong>Thời gian bắt đầu:</strong>
					<Form.Item
						name="startedAt"
						className="infor-exam-create-input"
						rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]}
					>
						<DatePicker placeholder="Chọn thời gian bắt đầu" showTime disabledDate={isDateDisabled} />
					</Form.Item>
				</div>
				<div className="infor-exam-create">
					<strong>Thời gian kết thúc:</strong>
					<Form.Item
						name="endedAt"
						className="infor-exam-create-input"
						rules={[
							{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' },
							{ validator: validateEndTime },
						]}
					>
						<DatePicker placeholder="Chọn thời gian kết thúc" showTime disabledDate={isDateDisabled} />
					</Form.Item>
				</div>

				<Form.List name="questions" style={{ textAlign: 'center' }}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, fieldKey, ...restField }, index) => (
								<div
									key={key}
									style={{
										marginBottom: 8,
										border: '1px solid black',
										paddingLeft: '15px',
										width: '50%',
										marginLeft: '25%',
									}}
								>
									<div
										style={{
											display: 'flex',

											width: '100%',
										}}
										onClick={() => handleEditQuestion(index)}
									>
										<lable> Câu hỏi: </lable>
										<div
											dangerouslySetInnerHTML={{ __html: value[index] }}
											className="question-content"
											hidden={editingIndex === index}
										/>
										{editingIndex >= 0 && editingIndex == index ? (
											<Editor
												data={value[editingIndex]}
												editcontent={handleEditorChange}
												cancel={handleEditorCancel}
												isQuiz={true}
											/>
										) : null}
									</div>

									<Form.Item name={[name, 'answerType']} valuePropName="checked">
										<Radio.Group
											onChange={(e) => handleAnswerTypeChange(index, e)}
											defaultValue={answerTypes[index] || 'single_choice'} // Sử dụng 'single' nếu giá trị là undefined
										>
											<Radio value="single_choice">Chọn 1 đáp án</Radio>
											<Radio value="multiple_choice">Chọn nhiều đáp án</Radio>
											<Radio value="essay">Tự luận</Radio>
											
										</Radio.Group>
									</Form.Item>
									<Form.List name={[name, 'answers']}>
										{(answerFields, { add: addAnswer, remove: removeAnswer }) => (
											<>
												{answerTypes[index] === 'essay' && (
													<Form.Item name={[name, 'score']}>
														<lable>Điểm cho câu hỏi:</lable>
														<InputNumber
															min={1}
															placeholder="Điểm cho câu hỏi"
															style={{
																width: '60%',
																border: '1px solid black',
															}}
															onChange={(value) => {
																const newScores = [...scores];
																newScores[index] = value;
																setScores(newScores);
																totalScore(answerTypes,newScores);
															}}
														/>
													</Form.Item>
												)}
												{answerFields.map(
													(
														{
															key: answerKey,
															name: answerName,
															fieldKey: answerFieldKey,
															...answerRestField
														},
														answerIndex
													) => (
														<>
															<Space
																key={answerKey}
																style={{ display: 'flex', marginBottom: 8 }}
																align="baseline"
															>
																{answerTypes[index] !== 'essay' && (
																	<Form.Item
																		{...answerRestField}
																		name={[answerName, 'answer']}
																		rules={[
																			{
																				required: true,
																				message: 'Vui lòng nhập đáp án!',
																			},
																		]}
																	>
																		<Input placeholder="Nhập đáp án" />
																	</Form.Item>
																)}

																{answerTypes[index] === 'multiple_choice' && (
																	<Form.Item
																		name={[answerName, 'isCorrect']}
																		valuePropName="checked"
																	>
																		<Checkbox>Đáp án đúng</Checkbox>
																	</Form.Item>
																)}

																{answerTypes[index] === 'single_choice' && (
																	<Form.Item
																		name={[answerName, 'isCorrect']}
																		valuePropName="checked"
																	>
																		<Radio>Đáp án đúng</Radio>
																	</Form.Item>
																)}
																

																{answerTypes[index] !== 'essay' && (
																	<MinusCircleOutlined
																		onClick={() => removeAnswer(answerName)}
																	/>
																)}
															</Space>
														</>
													)
												)}
												{answerTypes[index] !== 'essay' && (
													<Form.Item>
														<Button
															type="dashed"
															onClick={() => addAnswer()}
															icon={<PlusOutlined />}
														>
															Thêm đáp án
														</Button>
													</Form.Item>
												)}
											</>
										)}
									</Form.List>
									{index > 0 && (
										<Form.Item>
											<DeleteOutlined
												onClick={() => {
													remove(name);
													const newAnswerTypes = [...answerTypes];
													newAnswerTypes.splice(index, 1);
													setAnswerTypes(newAnswerTypes);
													totalScore(newAnswerTypes, scores);
												}}
											/>
										</Form.Item>
									)}
								</div>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => {
										add();
										const newAnswerTypes = [...answerTypes, 'single_choice'];
										setAnswerTypes(newAnswerTypes);
										setValue([...value, '<p>Nhập câu hỏi </p>']);
										totalScore(newAnswerTypes, scores);
									}}
									icon={<PlusOutlined />}
								>
									Thêm câu hỏi
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Tạo bài kiểm tra
					</Button>
				</Form.Item>
			</Form>
			<ToastContainer />
		</div>
	);
};

export default CreateQuiz;
