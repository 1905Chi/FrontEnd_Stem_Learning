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
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Checkbox, Radio } from 'antd';
export default function SurveyItem(props) {
	console.log(props);
	const navigate = useNavigate();
	const [inforReport, setInforReport] = useState(null);
	const [selectedReport, setSelectedReport] = useState(null);
	const [opentReport, setOpentReport] = useState(false);
	const [reportTo, setReportTo] = useState('Báo cáo bài đăng');
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [options, setOptions] = useState(props.options);
    const [isMultiSelect, setIsMultiSelect] = useState(props.isMultiSelect);
    const [listAnswer, setListAnswer] = useState(props.listAnswer);
	const [question, setQuestion] = useState(props.question);
	const totalVotes = props.listAnswer.reduce((acc, answer) => acc + answer.count, 0);
	const [addOption, setAddOption] = useState(false);
	const handleSelectOption = (e) => {
		setSelectedOption(e.target.value);
	};
	const handleCancel = () => {
		setOpentReport(false);
	};
	const EditPost = () => {
		console.log('EditPost');
	};
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const handleRemoveOption = () => {
		const newOptions = [...options];
		console.log(newOptions.length);
		newOptions.splice(options.length - 1, 1);
		setOptions(newOptions);
		setAddOption(false);
		console.log(newOptions.length);
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
								setOpen(true);
							}}
						>
							<RiDeleteBin6Fill style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Xóa bài đăng</span>
						</div>
					) : (
						<div
							onClick={() => {
								setOpentReport(true);
								setReportTo('Báo cáo bài đăng');
								setSelectedReport(null);
							}}
						>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo bài đăng cho quản trị viên</span>
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
						<div onClick={EditPost}>
							<EditOutlined style={{ color: 'red', fontSize: '15px' }} />
							<span style={{ fontSize: '15px' }}>Chỉnh sửa bài đăng</span>
						</div>
					) : (
						<div
							onClick={() => {
								setOpentReport(true);
								setReportTo('Báo cáo bài đăng');
								setSelectedReport(null);
							}}
						>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo bài đăng </span>
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
        const totalVotes = listAnswer.reduce((acc, answer) => acc + answer.count, 0);
        const percentage = totalVotes === 0 ? 0 : (listAnswer[index].count / totalVotes) * 100;
        return `${percentage}%`;
    };
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
					{options.map((option, i) => (
						<div key={i} className="option-item" style={{ background: `linear-gradient(to right, rgba(0, 0, 255, 0.5) ${calculateBackgroundWidth(i)}, transparent ${calculateBackgroundWidth(i)})` }}>
							{isMultiSelect ? (
								<Checkbox>{option}</Checkbox>
							) : (
								<Radio value={option} onChange={handleSelectOption} checked={selectedOption === option}>
									{option}
								</Radio>
							)}
							{listAnswer[i].count} votes
						</div>
					))}
					{addOption && (
						<div style={{ display: 'flex' }} className="add-option">
							<Input placeholder="Thêm lựa chọn" />
							<Button type="danger" onClick={() => handleRemoveOption()}>
								X
							</Button>
							<Button type="danger">Thêm</Button>
						</div>
					)}
					{props.isAddOption && (
						<div>
							<Button
								onClick={() => {
									let newOptions = [...options];
									console.log(newOptions);
									newOptions.push('');
									setOptions(newOptions);
									setAddOption(true);
									console.log(newOptions);
								}}
							>
								Thêm lựa chọn
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
