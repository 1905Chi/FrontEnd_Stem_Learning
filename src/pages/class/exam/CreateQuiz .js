import React, { useState } from 'react';
import { Form, Input, Checkbox, Radio, Button, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Editor from '../../home/components/Editor';
const CreateQuiz = () => {
	const [form] = Form.useForm();
	const [answerTypes, setAnswerTypes] = useState(['single']); // 'single' or 'multiple'
	const [editingIndex, setEditingIndex] = useState(-1);
	const [value, setValue] = useState([]);
	const onFinish = (values) => {
		console.log('Received values:', values);
		console.log('Answer types:', answerTypes);
	};
	
	  

	const handleAnswerTypeChange = (index, e) => {
		const newAnswerTypes = [...answerTypes];
		newAnswerTypes[index] = e.target.value;
		if (e.target.value === 'single') {
			newAnswerTypes[index] = 'single';
		} else {
			newAnswerTypes[index] = 'multiple';
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
		<div>{editingIndex >=0 ? (
			<Editor
				data={value[editingIndex]}
				editcontent={handleEditorChange}
				cancel={handleEditorCancel}
			/>
		) : null}
		<Form form={form} onFinish={onFinish} layout="vertical">
			<Form.List name="questions">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, fieldKey, ...restField }, index) => (
							<div key={key} style={{ marginBottom: 8, border:'1px solid black', paddingLeft:'15px' }} >
							
									<div
										style={{
											display: 'flex',
											
											width: '100%',
										}}
										onClick={() => handleEditQuestion(index)}
									>
										

										<lable> Câu hỏi: </lable>
										<div  dangerouslySetInnerHTML={{ __html: value[index] }} />
									</div>
						
								<Form.Item name={[name, 'answerType']} valuePropName="checked">
									<Radio.Group
										onChange={(e) => handleAnswerTypeChange(index, e)}
										defaultValue={answerTypes[index] || 'single'} // Sử dụng 'single' nếu giá trị là undefined
									>
										<Radio value="single">Chọn 1 đáp án</Radio>
										<Radio value="multiple">Chọn nhiều đáp án</Radio>
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
																{ required: true, message: 'Vui lòng nhập đáp án!' },
															]}
														>
															<Input placeholder="Nhập đáp án" />
														</Form.Item>

														{answerTypes[index] === 'multiple' && (
															<Form.Item
																name={[answerName, 'isCorrect']}
																valuePropName="checked"
															>
																<Checkbox>Đáp án đúng</Checkbox>
															</Form.Item>
														)}

														{answerTypes[index] === 'single' && (
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
									setAnswerTypes([...answerTypes, 'single']);
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
		</div>
	);
};

export default CreateQuiz;
