import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../../home/components/Editor';
import './QuestionGroup.css';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import PostItem from '../../home/components/PostItem';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedPostGroup, selectPostGroup } from '../../../redux/Group';
import { Form, Button, Input, Row, Col } from 'antd';
import { Modal } from 'antd';
import { Checkbox, Radio } from 'antd';
import ServeyItem from './ServeyItem';
const { TextArea } = Input;

export default function Servey() {
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const postgroup = useSelector(selectSelectedPostGroup);
	const dispatch = useDispatch();
	const [post, setPost] = useState([]);
	const { uuid } = useParams();
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState(['', '']); // Mặc định có hai ô input đáp án
	const [settingOpen, setSettingOpen] = useState(false);
	const [isAddOption, setIsAddOption] = useState(false);
	const [isMultiSelect, setIsMultiSelect] = useState(false);
	const handleChangeQuestion = (e) => {
		setQuestion(e.target.value);
	};
	const toggleSettingModal = () => {
		setSettingOpen(false);
		setIsAddOption(false);
		setSettingOpen(!settingOpen);
	};
    
	const handleChangeOption = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const handleAddOption = () => {
		setOptions([...options, '']);
	};

	const openEdttor = () => {
		setOptions(['', '']);
		setOpen(!open);
	};
	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};

	const callBackApi = () => {
		Api.get(url + 'api/v1/posts?' + 'groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectPostGroup(response.data.result));
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const createServey = () => {
		setConfirmLoading(true);
		const trimmedOptions = options.filter((option) => option.trim() !== '');

		console.log(trimmedOptions);
		console.log(isAddOption);
		console.log(isMultiSelect);
		setTimeout(() => {
			//setOptions(['', '']);
			//	setQuestion('');
			setConfirmLoading(false);
			setOpen(false); // Đặt setOpen ở đây khi xử lý hoàn tất
		}, 5000);
	};
	const handleRemoveOption = (index) => {
		const newOptions = [...options];
		if (newOptions.length === 2) return; // Không cho xóa nếu chỉ còn 2 ô input
		newOptions.splice(index, 1); // Xóa phần tử ở vị trí index
		setOptions(newOptions);
	};
	
    const listservey = [
        {
            question: 'Câu hỏi 1',
            options: ['Option 1', 'Option 2', 'Option 3'],
            isAddOption: false,
            isMultiSelect: false,
            listAnswer: [
                {
                    answer: 'Option 1',
                    count: 2,
                },
                {
                    answer: 'Option 2',
                    count: 1,
                },
                {
                    answer: 'Option 3',
                    count: 0,
                },
            ],
            
        },
        {
            question: 'Câu hỏi 2',
            options: ['Option 1', 'Option 2', 'Option 3'],
            isAddOption: true,
            isMultiSelect: true,
            listAnswer: [
                {
                    answer: 'Option 1',
                    count: 5,
                },
                {
                    answer: 'Option 2',
                    count: 1,
                },
                {
                    answer: 'Option 3',
                    count: 0,
                },
            ],
        }
    ]

	

	return (
		<div>
			<Modal
				title="Cài đặt"
				open={settingOpen}
				onCancel={toggleSettingModal}
				footer={null} // Không cần footer cho Modal cài đặt
			>
				<div style={{ marginBottom: '10px' }}>
					<Checkbox
						onChange={(value) => {
							setIsAddOption(value.target.checked);
						}}
					>
						Cho phép chọn nhiều đáp án
					</Checkbox>
				</div>
				<div style={{ marginBottom: '10px' }}>
					<Checkbox
						onChange={(value) => {
							setIsMultiSelect(value.target.checked);
						}}
					>
						Cho phép thêm đáp án
					</Checkbox>
				</div>
			</Modal>

			<Modal
				title="Tạo cuộc thăm dò ý kiến"
				open={open}
				onOk={createServey}
				confirmLoading={confirmLoading}
				onCancel={openEdttor}
			>
				<Form>
					<Form.Item label="Question">
						<Input placeholder="Enter your question" value={question} onChange={handleChangeQuestion} />
					</Form.Item>
					<Form.Item label="Options">
						{options.map((option, index) => (
							<Row key={index} style={{ marginBottom: '2%' }}>
								<Col span={20}>
									<Input
										placeholder={`Option ${index + 1}`}
										value={option}
										onChange={(e) => handleChangeOption(index, e.target.value)}
									/>
								</Col>
								<Col span={4}>
									<Button type="danger" onClick={() => handleRemoveOption(index)}>
										X
									</Button>
								</Col>
							</Row>
						))}
					</Form.Item>
					<Button type="primary" onClick={handleAddOption}>
						Thêm lựa chọn
					</Button>
					<Button type="primary" onClick={toggleSettingModal}>
						Cài đặt
					</Button>
				</Form>
			</Modal>
			<div className="question-group">
				<h2 style={{ textAlign: 'center', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>
					Khảo sát
				</h2>

				<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					Tạo khảo sát
				</button>
			</div>
            <div>
          {  listservey.map((servey, index) => (
                <ServeyItem key={index} 
                question={servey.question}
                options={servey.options}
                isAddOption={servey.isAddOption}
                isMultiSelect={servey.isMultiSelect}
                listAnswer={servey.listAnswer}
                index={index}


                 />
            ))}
            </div>
		</div>
	);
}
