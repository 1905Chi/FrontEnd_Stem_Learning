import React, { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import Loading from '../../../../components/Loading';
import './EditInforExam.css';
import { Form, Input, Checkbox, Radio, Button, Space, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import Editor from '../../../home/components/Editor';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../../../api/Api';
import { url } from '../../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { editquestion } from '../../../../redux/Exam';
import { useDispatch } from 'react-redux';
export default function EditInforQuestion(props) {
	const [loading, setloading] = useState(false);
	const [form] = Form.useForm();
	const navigate = useNavigate();
    const dispatch = useDispatch();
	const [answerTypes, setAnswerTypes] = useState(props.question.typeCode); // 'single' or 'multiple'
	const [editingIndex, setEditingIndex] = useState(false);
	const { uuid, id } = useParams();
	const [value, setValue] = useState(props.question.content);
	const [isLoading, setIsLoading] = useState(false);
	const onFinish = (values) => {
		try {
			setIsLoading(true);
            console.log('values',values)
           console.log('answer',answerTypes)
           console.log('question',value)
           
			const question = {
				content: value,
				typeCode: answerTypes,
				level: 'Easy',
			};
            let answers = [];
            if( values.answers !== undefined){
                answers = values.answers.map((item, index) => ({
                    content: item.answer,
                    isCorrect: item.isCorrect ? true : false,
                    
                }));
            }

			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			};

			Api.put(url + 'api/v1/questions/' + props.question.id, question, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success('Cập nhật thành công !');
                        dispatch(editquestion(response.data.result))
						props.fetchData()
					}
				})
				.catch((error) => {
					toast.error(error)
            
				});
			if (answers.length > 0) {
				console.log('answers', answers);
				answers.forEach((item, index) => {
					Api.post(url + 'api/v1/answers/create?qId=' + props.question.id, item, { headers: headers })
						.then((response) => {
							if (response.data.statusCode === 200) {
                                
								toast.success('Thêm câu trả lời thành công !');
								props.fetchData();
                                
							}
						})
						.catch((error) => {
							toast.error('Thêm trả lời thất bại !');
						})
                        .finally(() => {
                            setloading(false);
                            
                        })
                    console.log('item',item)
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
				props.cancel();
			}, 3000);
		}
	};

	const handleAnswerTypeChange = (e) => {
		setAnswerTypes(e.target.value);
	};
	const handleEditQuestion = () => {
		setEditingIndex(!editingIndex);
	};

	const handleEditorChange = (content) => {
		setValue(content);
	};

	const handleEditorCancel = () => {
		setEditingIndex();
		console.log(editingIndex);
	};
	return (
		<div className="edit-infor-exam">
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}

			<div className="form-edit-infor-exam" style={{ width: '50%' }}>
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Chỉnh sửa thông tin câu hỏi</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={props.cancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
				<div className="body-form-edit-exam" style={{overflowY:'scroll', maxHeight:'50vh'}}>
					<div>
						{editingIndex ? (	
							<Editor
								data={value}
								editcontent={handleEditorChange}
								cancel={handleEditorCancel}
								isQuiz={true}
							/>
						) : null}
						{isLoading ? <Loading /> : null}
						<Form form={form} onFinish={onFinish} layout="vertical" style={{ marginLeft: '65px' }}>
							<div
								style={{
									display: 'flex',

									width: '100%',
								}}
								onClick={() => handleEditQuestion()}
							>
								<lable> Câu hỏi: </lable>
								<div dangerouslySetInnerHTML={{ __html: value }} />
							</div>
							<Form.Item name="answerType" valuePropName="checked">
								<Radio.Group
									onChange={(e) => handleAnswerTypeChange(e)}
									defaultValue={props.question.typeCode} // Sử dụng 'single' nếu giá trị là undefined
								>
									<Radio value="single_choice">Chọn 1 đáp án</Radio>
									<Radio value="multiple_choice">Chọn nhiều đáp án</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.List name="answers">
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

													{answerTypes === 'multiple_choice' && (
														<Form.Item
															name={[answerName, 'isCorrect']}
															valuePropName="checked"
														>
															<Checkbox>Đáp án đúng</Checkbox>
														</Form.Item>
													)}

													{answerTypes === 'single_choice' && (
														<Form.Item
															name={[answerName, 'isCorrect']}
															valuePropName="checked"
														>
															<Radio>Đáp án đúng</Radio>
														</Form.Item>
													)}
													<MinusCircleOutlined onClick={() => removeAnswer(answerName)} />
												</Space>
											)
										)}
										<Form.Item>
											<Button type="dashed" onClick={() => addAnswer()} icon={<PlusOutlined />}>
												Thêm đáp án
											</Button>
										</Form.Item>
									</>
								)}
							</Form.List>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Cập nhật câu hỏi
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
