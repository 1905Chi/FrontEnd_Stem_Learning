import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useState } from 'react';
import { Avatar, Button, Dropdown, Popconfirm } from 'antd';
import { BiCommentDetail, BiSolidShare, BiLike } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdBugReport } from 'react-icons/md';
import { EditOutlined } from '@ant-design/icons';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import './ServeyItem.css';
import LabelFile from '../../profile/component/LabelFile';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Checkbox, Radio } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { Form, Row, Col } from 'antd';
import { MdEdit } from 'react-icons/md';
export default function SurveyItem(props) {
	console.log(props);
	const navigate = useNavigate();
	const [inforReport, setInforReport] = useState(null);
	const [selectedReport, setSelectedReport] = useState(null);
	const [opentReport, setOpentReport] = useState(false);
	const [reportTo, setReportTo] = useState('Báo cáo khảo sát');
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [isMultiSelect, setIsMultiSelect] = useState(props.isMultiSelect);
	const [options, setOptions] = useState();
	const [listAnswer, setListAnswer] = useState();
	const [question, setQuestion] = useState(props.question);
	const [isAddOption, setIsAddOption] = useState(props.isAddOption);
	const totalVotes = props.listAnswer.reduce((acc, answer) => acc + answer.count, 0);
	const [addOption, setAddOption] = useState(false);
	const [settingOpen, setSettingOpen] = useState(false);
	const [oppenAddOption, setOppenAddOption] = useState(false);
	const [optionAdd, setOptionAdd] = useState('');
	const [openEditOption, setOpenEditOption] = useState(false);
	const [optionEdit, setOptionEdit] = useState('');
	const [idOptionEdit,setIdOptionEdit] = useState('');
	const handleCancel = () => {
		setOpentReport(false);
	};
	useEffect(() => {
		setOptions(props.options);
		setListAnswer(props.listAnswer);
		setAddOption(props.isAddOption);
		setIsMultiSelect(props.isMultiSelect);
	}, [props.options, props.listAnswer, props.isAddOption, props.isMultiSelect, props.question]);
	const [open, setOpen] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const handleRemoveOption = () => {
		const newOptions = [...options];
		console.log(newOptions.length);
		newOptions.splice(options.length - 1, 1);
		setOptions(newOptions);
		setAddOption(false);
		console.log(newOptions.length);
	};
	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};
	const selectOption = (id, useVote, ismultiplechoie) => {
		if (useVote === true && ismultiplechoie === true) {
			Api.post(url + 'api/v1/options/unvote/' + id, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success('UnVote thành công');
						props.callBackApi();
						setOptions(response.data.result.options);
						console.log(response.data.result.options);
						if (props.homePosts) {
							props.homePosts();
						}
					}
				})
				.catch((error) => {
					toast.error('Vote thất bại');
				});
		} else {
			Api.post(url + 'api/v1/options/vote/' + id, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success('Vote thành công');
						props.callBackApi();
						setOptions(response.data.result.options);
						console.log(response.data.result.options);
						if (props.homePosts) {
							props.homePosts();
						}
					}
				})
				.catch((error) => {
					toast.error('Vote thất bại');
				});
		}
	};

	const items = [
		{
			key: '1',
			label: (
				<div style={{ font: '15px' }}>
					{JSON.parse(localStorage.getItem('user')) &&
					props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
						<div
							onClick={() => {
								deleteSurvey();
							}}
						>
							<RiDeleteBin6Fill style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Xóa khảo sát</span>
						</div>
					) : (
						<div
							onClick={() => {
								setOpentReport(true);
								setReportTo('Báo cáo khảo sát');
								setSelectedReport(null);
							}}
						>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo khảo sát cho quản trị viên</span>
						</div>
					)}
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div style={{ font: '15px' }}>
					{JSON.parse(localStorage.getItem('user')) &&
					props.authorId === JSON.parse(localStorage.getItem('user')).id ? (
						<div
							onClick={() => {
								setOpen(true);
							}}
						>
							<EditOutlined style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Chỉnh sửa khảo sát</span>
						</div>
					) : (
						<div
							onClick={() => {
								setOpentReport(true);
								setReportTo('Báo cáo khảo sát');
								setSelectedReport(null);
							}}
						>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo khảo sát </span>
						</div>
					)}
				</div>
			),
		},
	];

	const reportContent = [
		{
			key: '1',
			reportContent: 'Ảnh khỏa thân hoặc nội dung khiêu dâm',
			information: `Hoạt động tình dục
			Bán hoặc mua dâm
			Nhũ hoa (trừ trường hợp đang cho con bú, liên quan đến sức khỏe và hành động phản đối)
			Ảnh khỏa thân hiển thị bộ phận sinh dục
			Ngôn ngữ khiêu dâm`,
			treeReportContent: [
				{
					key: '1',
					reportContent: 'Ảnh khỏa thân người lớn',
				},
				{
					key: '2',
					reportContent: 'Ảnh khỏa thân trẻ em',
				},
				{
					key: '3',
					reportContent: 'Nội dung khiêu dâm',
				},
				{
					key: '4',
					reportContent: 'Gợi dục',
				},
				{
					key: '5',
					reportContent: 'Dịch vụ tình dục',
				},
			],
		},
		{
			key: '2',
			reportContent: 'Spam',
			information: `Mua, bán hay tặng tài khoản, vai trò hoặc quyền
			Khuyến khích mọi người tương tác với nội dung sai sự thật
			Dùng liên kết gây hiểu nhầm để chuyển mọi người từ Facebook đến nơi khác`,
			treeReportContent: [],
		},
		{
			key: '3',
			reportContent: 'Bán hàng trái phép',
			information: `Đây là trang web học tập ,chúng tôi không cho phép cá nhân , tổ chức nào kinh doanh bất hợp pháp
			trên nền tảng này`,
			treeReportContent: [],
		},
		{
			key: '4',
			reportContent: 'Bạo lực hoặc tự tử',
			information: `Chúng tôi chỉ gỡ những nội dung vi phạm Tiêu chuẩn cộng đồng của mình, chẳng hạn như:
			Đe dọa sử dụng bạo lực
			Ví dụ: nhắm mục tiêu một người và nhắc đến vũ khí cụ thể
			Cá nhân hoặc tổ chức nguy hiểm
			Ví dụ: chủ nghĩa khủng bố hoặc một tổ chức tội phạm
			Hình ảnh cực kỳ bạo lực
			Ví dụ: tôn vinh bạo lực hoặc tán dương sự đau khổ
			Một loại bạo lực khác
			Ví dụ: hình ảnh hoặc nội dung khác gây khó chịu`,
			treeReportContent: [
				{
					key: '1',
					reportContent: 'Hình ảnh bạo lực',
				},
				{
					key: '2',
					reportContent: 'Tử vong hoặc bị thương nặng',
				},
				{
					key: '3',
					reportContent: 'Mối đe dọa bạo lực',
				},
				{
					key: '4',
					reportContent: 'Ngược đãi động vật',
				},
				{
					key: '5',
					reportContent: 'Bạo lực tình dục',
				},
				{
					key: '6',
					reportContent: 'Vấn đề khác',
				},
			],
		},
		{
			key: '5',
			reportContent: 'Thông tin sai sự thật',
			information: `Chúng tôi chỉ gỡ những nội dung vi phạm Tiêu chuẩn cộng đồng của mình, chẳng hạn như:
			Thông tin sai sự thật
			Ví dụ: thông tin sai về COVID-19
			Thông tin sai sự thật khác
			Ví dụ: thông tin sai về sự kiện nổi bật khác`,
			treeReportContent: [
				{
					key: '1',
					reportContent: 'Sức khỏe',
				},
				{
					key: '2',
					reportContent: 'Chính trị',
				},
				{
					key: '3',
					reportContent: 'Kiến thức',
				},
				{
					key: '4',
					reportContent: 'Vấn đề khác',
				},
			],
		},
	];
	const handleReportSelect = (report) => {
		setInforReport(null);
		setSelectedReport(report);
		if (report.treeReportContent.length === 0) {
			setInforReport(report.reportContent);
		}
	};

	const rePort = () => {
		console.log('rePort');
	};
	const calculateBackgroundWidth = (index) => {
		const totalVotes = listAnswer.reduce((acc, answer) => acc + answer.voteCount, 0);
		const percentage = totalVotes === 0 ? 0 : (listAnswer[index].voteCount / totalVotes) * 100;
		return `${percentage}%`;
	};
	const toggleSettingModal = () => {
		setSettingOpen(false);
		setIsAddOption(false);
		setSettingOpen(!settingOpen);
	};
	const updateSurvey = () => {
		setConfirmLoading(true);
		const data = {
			content: question,
			isMultipleChoice: isMultiSelect,
			isAddOption: isAddOption,
		};
		Api.put(url + 'api/v1/surveys/' + props.id, data, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Cập nhật khảo sát thành công');
					props.callBackApi();
					setIsAddOption(isAddOption);
					setIsMultiSelect(isMultiSelect);
					if (props.homePosts) {
						props.homePosts();
					}
				}
			})
			.catch((error) => {
				toast.error('Cập nhật khảo sát thất bại');
			})
			.finally(() => {
				setConfirmLoading(false);
				setOpen(!open);
			});
	};
	const addOptionSurvey = () => {
		setConfirmLoading(true);
		const data = {
			content: optionAdd,
			surveyId: props.id,
		};
		Api.post(url + 'api/v1/options/create', data, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Thêm lựa chọn thành công');
					props.callBackApi();
					if (props.homePosts) {
						props.homePosts();
					}
				}
			})
			.catch((error) => {
				toast.error('Thêm lựa chọn thất bại');
			})
			.finally(() => {
				setConfirmLoading(false);
				setOppenAddOption(!oppenAddOption);
				setOptionAdd('');
			});
	};

	const openEdttor = () => {
		setIsAddOption(false);
		setIsMultiSelect(false);
		setAddOption(false);
		setOpen(false);
		setOpenEditOption(false);
	};
	const handleChangeQuestion = (e) => {
		setQuestion(e.target.value);
	};

	const handleChangeOption = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};
	const handleAddOption = () => {
		const newOptions = [...options];
		newOptions.push('');
		setOptions(newOptions);
	};
	const deleteSurvey = () => {
		Api.delete(url + 'api/v1/surveys/' + props.id, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Xóa khảo sát thành công');
					props.callBackApi();
					if (props.homePosts) {
						props.homePosts();
					}
				}
			})
			.catch((error) => {
				toast.error('Xóa khảo sát thất bại');
			});
	};
	const deleteOption = (id) => {
		Api.delete(url + 'api/v1/options/delete/' + id, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Xóa lựa chọn thành công');
					props.callBackApi();
					if (props.homePosts) {
						props.homePosts();
					}
				}
			})
			.catch((error) => {
				toast.error('Xóa lựa chọn thất bại');
			});
	};
	const EditOption = () => {
	setConfirmLoading(true);
	Api.put(url + 'api/v1/options/update/'+ idOptionEdit, { content: optionEdit }, { headers: headers })
	.then((response) => {
		if (response.data.statusCode === 200) {
			toast.success('Chỉnh sửa lựa chọn thành công');
			props.callBackApi();
			if (props.homePosts) {
				props.homePosts();
			}
		}})
			// Remove the closing parenthesis
			.catch((error) => {
				toast.error('Chỉnh sửa lựa chọn thất bại');
			
		}).finally(() => {
		setConfirmLoading(false);
		setIdOptionEdit('')
		setOpenEditOption(false);
		
		});




	}
	return (
		<div className="post-item">
			<Modal
				title={reportTo}
				open={opentReport}
				onOk={rePort}
				okButtonProps={{ disabled: !inforReport }}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<h3>NỘI DUNG VI PHẠM CHÍNH SÁCH :</h3>
				{reportContent.map((report) => (
					<div key={report.key}>
						<Button
							onClick={() => handleReportSelect(report)}
							style={{
								backgroundColor: selectedReport && selectedReport.key === report.key ? '#1890ff' : '',
								marginBottom: '1em',
							}}
						>
							{report.reportContent}
						</Button>
					</div>
				))}
				{selectedReport !== null ? (
					<div>
						<h4>Thêm thông tin:</h4>
						<button>{selectedReport.reportContent} </button>
						<p>{selectedReport.information}</p> <br />
						{selectedReport.treeReportContent !== null &&
							selectedReport.treeReportContent.map((subReport) => (
								<Button
									key={subReport.key}
									onClick={() => {
										setInforReport(subReport.reportContent);
									}}
									style={{
										backgroundColor: inforReport === subReport.reportContent ? '#1890ff' : '',
										marginBottom: '1em',
									}}
								>
									{subReport.reportContent}
								</Button>
							))}
					</div>
				) : null}
			</Modal>

			<Modal
				title="Chỉnh sửa khảo sát"
				open={open}
				onOk={updateSurvey}
				confirmLoading={confirmLoading}
				onCancel={openEdttor}
			>
				<Form>
					<Form.Item label="Nội dung: ">
						<Input
							placeholder="Nhập câu hỏi khảo sát"
							value={props.question}
							onChange={handleChangeQuestion}
						/>
					</Form.Item>
					<Form.Item label="">
						<Checkbox
							onChange={(value) => {
								setIsAddOption(!isAddOption);
							}}
							checked={isAddOption}
						>
							Cho phép thêm đáp án
						</Checkbox>
					</Form.Item>
					<Form.Item label="">
						<Checkbox
							onChange={(value) => {
								setIsMultiSelect(!isMultiSelect);
							}}
							checked={isMultiSelect}
						>
							Cho phép chọn nhiều đáp án
						</Checkbox>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Thêm lựa chọn"
				open={oppenAddOption}
				onOk={addOptionSurvey}
				confirmLoading={confirmLoading}
				onCancel={openEdttor}
			>
				<Form>
					<Form.Item label="Lựa chọn: ">
						<Input
							placeholder="Nhập lựa chọn"
							onChange={(e) => {
								setOptionAdd(e.target.value);
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title="Chỉnh sửa lựa chọn"
				open={openEditOption}
				onOk={EditOption}
				confirmLoading={confirmLoading}
				onCancel={openEdttor}
			>
				<Form>
					<Form.Item label="Lựa chọn: ">
						<Input
							placeholder="Nhập lựa chọn"
							value =  {optionEdit}
							onChange={(e) => {
								setOptionEdit(e.target.value);
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
			<div className="user-info">
				<div className="avatarPost" style={{ flex: 1, marginTop: '15px' }}>
					{props.authorAvatar !== null && props.authorAvatar !== '' ? (
						<Avatar
							src={props.authorAvatar}
							onClick={() => {
								if (localStorage.getItem('user') === null) {
									toast.error('Bạn cần đăng nhập để xem thông tin người dùng này');
									return;
								}
								navigate('/profile/' + props.authorId);
							}}
						/>
					) : (
						<Avatar
							icon={<UserOutlined style={{ height: '3em' }} />}
							onClick={() => {
								if (localStorage.getItem('user') === null) {
									toast.error('Bạn cần đăng nhập để xem thông tin người dùng này');
									return;
								}
								navigate('/profile/' + props.authorId);
							}}
						/>
					)}
				</div>
				<div style={{}} className="infor-author">
					<a style={{ textDecoration: 'none', color: 'black' }}>
						<p className="user-name" style={{ fontWeight: 'bold' }}>
							{props.authorFirstName + ' ' + props.authorLastName}
						</p>
					</a>
					<p className="user-name" style={{ display: 'block' }}>
						đã tạo cuộc khảo sát trong nhóm
					</p>
				</div>
				<Dropdown
					menu={{
						items,
					}}
					placement="bottomRight"
					arrow={{
						pointAtCenter: true,
					}}
					style={{ border: 'none', flex: 1 }}
				>
					<Button style={{ color: 'black', backgroundColor: 'white', border: 'none', textAlign: 'end' }}>
						...
					</Button>
				</Dropdown>
			</div>
			<div className="conttent-servey">
				<div style={{ marginBottom: '20px' }}>
					<h3>{props.question}</h3>
					{options &&
						options.map((option, i) => (
							<div
								key={i}
								className="option-item"
								style={{
									width: '95%',
									marginBottom: '2%',
									display: 'flex',
									justifyContent: 'space-between',
									background: `linear-gradient(to right, rgba(0, 0, 255, 0.5) ${calculateBackgroundWidth(
										i
									)}, transparent ${calculateBackgroundWidth(i)})`,
								}}
							>
								<div>
									{isMultiSelect ? (
										<Checkbox
											onChange={() => selectOption(option.id, option.userVoted, isMultiSelect)}
											checked={option.userVoted}
										>
											{option.content}
										</Checkbox>
									) : (
										<Radio
											value={option.content}
											onChange={() => selectOption(option.id, option.userVoted, isMultiSelect)}
											checked={option.userVoted}
										>
											{option.content}
										</Radio>
									)}
									{listAnswer[i].voteCount} votes
								</div>
								{option.author.id === user.id ? (
									<div style={{ width: '10%', display: 'flex', justifyContent: 'space-around' }}>
										<MdDelete onClick={() => deleteOption(option.id)} />
										<MdEdit onClick ={()=>{setOpenEditOption(true)
										setIdOptionEdit(option.id)
										setOptionEdit(option.content)
										}}/>
									</div>
								) : null}
							</div>
						))}

					{(isAddOption || props.authorId=== user.id) && (
						<div>
							<Button
								onClick={() => {
									setOppenAddOption(true);
								}}
							>
								Thêm lựa chọn
							</Button>
						</div>
					)}
				</div>
				<ToastContainer />
			</div>
		</div>
	);
}
