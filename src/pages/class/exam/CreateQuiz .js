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
import moment from 'moment';
const CreateQuiz = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { Option } = Select;
	const [answerTypes, setAnswerTypes] = useState(['single']); // 'single' or 'multiple'
	const [editingIndex, setEditingIndex] = useState(-1);
	const { uuid } = useParams();
	const [value, setValue] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentDate, setCurrentDate] = useState(moment());
	const isDateDisabled = (date) => {
		return !date.isAfter(moment()); // Trả về true nếu ngày là ngày tương lai
	};
	const onFinish = (values) => {
		console.log('Received values:', values);
		console.log('Answer types:', answerTypes);
		console.log('content ', value);
		
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
			maxScore: values.maxScore,
			questions: [],
		};
		value.map((item, index) => {
			let questions = {
				content: item,
				level: 'Easy',
				typeCode: answerTypes[index],
				answers: [],
			};

			values.questions[index].answers.map((item) => {
				var answer = {};
				if (item.isCorrect === true) {
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
			data.questions = [...data.questions, questions];
		});
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
		const newAnswerTypes = [...answerTypes];
		newAnswerTypes[index] = e.target.value;
		if (e.target.value === 'single_choice') {
			newAnswerTypes[index] = 'single_choice';
		} else {
			newAnswerTypes[index] = 'multiple_choice';
		}
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
		
		
		const startTime = moment(startedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		console.log('start',startTime);
		
		
		const endTime = moment(endedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),'DD-MM-YYYY HH:mm:ss:SSSSSS' ).valueOf();
		console.log('end',endTime);
		
		
		console.log(duration);
		console.log(duration*60000+ startTime)
	
		if (endTime <(startTime+duration*60000)) {
		  return Promise.reject(new Error(`Thời gian kết thúc phải sau ít nhất 1 khoảng thời gian ${duration} phút.`));
		}
	
		return Promise.resolve();
	  };

	return (
		<div className="create-quiz">
			{editingIndex >= 0 ? (
				<Editor
					data={value[editingIndex]}
					editcontent={handleEditorChange}
					cancel={handleEditorCancel}
					isQuiz={true}
				/>
			) : null}
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
				<Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra!' }]}>
					<Input placeholder="Nhập tên bài kiểm tra" style={{ width: '60%' }} />
				</Form.Item>
				<Form.Item
					name="description"
					rules={[{ required: true, message: 'Vui lòng nhập mô tả bài kiểm tra!' }]}
				>
					<Input placeholder="Nhập mô tả bài kiểm tra" style={{ width: '60%' }} />
				</Form.Item>
				<Form.Item name="duration" rules={[{ required: true, message: 'Vui lòng nhập thời gian làm bài!' }]}>
					<InputNumber
						min={15}
						placeholder="Nhập thời gian làm bài ( Số phút)"
						style={{ width: '60%', border: '1px solid black' }}
					/>
				</Form.Item>
				<Form.Item name="maxScore" rules={[{ required: true, message: 'Vui lòng nhập điểm số tối đa của bài kiểm tra!' }]}>
					<InputNumber
						min={1}
						placeholder="Nhập điểm tối đa"
						style={{ width: '60%', border: '1px solid black' }}
					/>
				</Form.Item>
				<Form.Item name="level" rules={[{ required: true, message: 'Vui lòng nhập mức độ bài kiểm tra!' }]}>
					<Select placeholder="Chọn mức độ bài kiểm tra" style={{ width: '60%', border: '1px solid black' }}>
						<Option value="Easy">Dễ</Option>
						<Option value="Medium">Trung bình</Option>
						<Option value="Hard">Khó</Option>
					</Select>
				</Form.Item>
				<Form.Item
					name="numberOfQuestion"
					rules={[{ required: true, message: 'Nhập số lượng câu hỏi mỗi bài kiểm tra' }]}
				>
					<InputNumber
						min={1}
						placeholder="Nhập số lượng câu hỏi mỗi bài kiểm tra"
						style={{ width: '60%', border: '1px solid black' }}
					/>
				</Form.Item>

				<Form.Item name="startedAt" rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu!' }]}>
					<DatePicker placeholder="Chọn thời gian bắt đầu" showTime disabledDate={isDateDisabled}  />
				</Form.Item>
				<Form.Item name="endedAt" rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' }, { validator: validateEndTime },]}>
					<DatePicker placeholder="Chọn thời gian kết thúc" showTime disabledDate={isDateDisabled} />
				</Form.Item>

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
										/>
									</div>

									<Form.Item name={[name, 'answerType']} valuePropName="checked">
										<Radio.Group
											onChange={(e) => handleAnswerTypeChange(index, e)}
											defaultValue={answerTypes[index] || 'single_choice'} // Sử dụng 'single' nếu giá trị là undefined
										>
											<Radio value="single_choice">Chọn 1 đáp án</Radio>
											<Radio value="multiple_choice">Chọn nhiều đáp án</Radio>
										</Radio.Group>
									</Form.Item>
									<Form.List name={[name, 'answers']}>
										{(answerFields, { add: addAnswer, remove: removeAnswer }) => (
											<>
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
														<Space
															key={answerKey}
															style={{ display: 'flex', marginBottom: 8 }}
															align="baseline"
														>
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
															<MinusCircleOutlined
																onClick={() => removeAnswer(answerName)}
															/>
														</Space>
													)
												)}
												<Form.Item>
													<Button
														type="dashed"
														onClick={() => addAnswer()}
														icon={<PlusOutlined />}
													>
														Thêm đáp án
													</Button>
												</Form.Item>
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
										setAnswerTypes([...answerTypes, 'single_choice']);
										setValue([...value, '<p>Nhập câu hỏi </p>']);
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
