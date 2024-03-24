import React, { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import Loading from '../../../../components/Loading';
import './EditInforExam.css';
import { Form, Input, Checkbox, Radio, Button, Space , InputNumber} from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import Editor from '../../../home/components/Editor';
import { useParams } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import Api from '../../../../api/Api';
import { url } from '../../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
export default function EditInforExam(props) {
	const [loading, setloading] = useState(false);
    const [form] = Form.useForm();
	const navigate = useNavigate();
	const { Option } = Select;
	const [answerTypes, setAnswerTypes] = useState(['single']); // 'single' or 'multiple'
	const [editingIndex, setEditingIndex] = useState(-1);
	const { uuid , id } = useParams();
	const [value, setValue] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	console.log(props);
	const onFinish = (values) => {
        try {
		// console.log('Received values:', values);
		// console.log('Answer types:', answerTypes);
		// console.log('content ', value);
		setIsLoading(true);
		const data = {
			name: values.name ? values.name : props.name,
			description: values.description ? values.description : props.description,
			duration: Number(values.duration) ? Number(values.duration) : props.duration,
			startedAt: values.startedAt ? values.startedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS') : props.startedAt+':000000' ,
			endedAt: values.endedAt ? values.endedAt.format('DD-MM-YYYY HH:mm:ss:SSSSSS') : props.endedAt +':000000',
			isEnabled: true,
			level: values.level ? values.level : props.level,
			numberOfQuestion: Number(values.numberOfQuestion) ? Number(values.numberOfQuestion) : props.numberOfQuestion,
			maxScore: 100,
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
        
           
		Api.put(url + 'api/v1/exams/' +id, data, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Cập kiểm tra thành công !');   
					props.CallApiExam();        
				}
			})
			.catch((error) => {
				toast.error('Cập nhật kiểm tra thất bại !');
			});
        if(data.questions.length>0)
        {
            data.questions.forEach((item,index)=>{
                Api.post(url + 'api/v1/questions/create?examId='+props.id, item, { headers: headers })
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        toast.success('Thêm câu hỏi thành công !');           
                    }
                })
                .catch((error) => {
                    toast.error('Thêm câu hỏi thất bại !');
                });
            })
        }
			
        } catch (error) {
            console.log(error);
        }
        finally{
            setTimeout(() => {
                setIsLoading(false);
            props.cancel();
            }, 3000);
            
        }
        
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
	return (
		<div className="edit-infor-exam">
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}

			<div className="form-edit-infor-exam">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Chỉnh sửa thông bài kiểm tra</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={props.cancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
				<div className="body-form-edit-exam" style={{maxHeight:'60vh', overflowY:'scroll'}}>
					<div>
						{editingIndex >= 0 ? (
							<Editor
								data={value[editingIndex]}
								editcontent={handleEditorChange}
								cancel={handleEditorCancel}
								isQuiz={true}
							/>
						) : null}
						{isLoading ? <Loading /> : null}
						<Form form={form} 
						
						onFinish={onFinish} layout="vertical" style={{marginLeft:'65px'}} >
                            <div style={{display:'flex', flexWrap:'wrap'}}>
							<Form.Item
								name="name"
								rules={[{ required: false, message: 'Vui lòng nhập tên bài kiểm tra!' }]}
                                style={{width:'45%', marginRight:'5px'}}
                                
							>
								<Input placeholder="Nhập tên bài kiểm tra" style={{ width: '100%',height:'40px' }} defaultValue={props.name}/>
							</Form.Item>
							<Form.Item
								name="description"
								rules={[{ required: false, message: 'Vui lòng nhập mô tả bài kiểm tra!' }]}
                                style={{width:'45%'}}
                                
							>
								<Input placeholder="Nhập mô tả bài kiểm tra" style={{ width: '100%' ,height:'40px'}} defaultValue={props.description} />
							</Form.Item>
							<Form.Item
								name="duration"
								rules={[{ required: false, message: 'Vui lòng nhập thời gian làm bài!' }]}
                                style={{width:'45%' , marginRight:'5px'}}
							>
								<InputNumber placeholder="Nhập thời gian làm bài ( Số phút)" style={{ width: '100%',height:'40px' }}   defaultValue={props.duration}/>
							</Form.Item>
							<Form.Item
								name="level"
								rules={[{ required: false, message: 'Vui lòng nhập mức độ bài kiểm tra!' }]}
                                style={{width:'45%'}}

							>
								<Select placeholder="Chọn mức độ bài kiểm tra" style={{ width: '100%',height:'40px' }} defaultValue={props.level}>
									<Option value="Easy">Dễ</Option>
									<Option value="Medium">Trung bình</Option>
									<Option value="Hard">Khó</Option>
								</Select>
							</Form.Item>
							<Form.Item
								name="numberOfQuestion"
								rules={[{ required: false, message: 'Nhập số lượng câu hỏi mỗi bài kiểm tra' }]}
                                style={{width:'45%', marginRight:'5px'}}
							>
								<InputNumber
                                defaultValue= {props.numberOfQuestion}
									placeholder="Nhập số lượng câu hỏi mỗi bài kiểm tra"
									style={{ width: '100%' , height:'40px'}}
								/>
							</Form.Item>

							<Form.Item
								name="startedAt"
								rules={[{ required: false, message: 'Vui lòng nhập thời gian bắt đầu!' }]}
                                style={{width:'45%'}}
							>
								<DatePicker placeholder="Chọn thời gian bắt đầu" showTime style={{width: '100%'}} />
							</Form.Item>
							<Form.Item
								name="endedAt"
								rules={[{ required: false, message: 'Vui lòng nhập thời gian kết thúc!' }]}
                                style={{width:'45%'}}
							>
								<DatePicker placeholder="Chọn thời gian kết thúc" showTime style={{width:'100%'}} />
							</Form.Item>
                            </div>

							<Form.List name="questions">
								{(fields, { add, remove }) => (
									<>
										{fields.map(({ key, name, fieldKey, ...restField }, index) => (
											<div
												key={key}
												style={{
													marginBottom: 8,
													border: '1px solid black',
													paddingLeft: '15px',
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
													<div dangerouslySetInnerHTML={{ __html: value[index] }} className='question-content-edit' />
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
												{index >= 0 && (
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
									Cập nhật bài kiểm tra
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
