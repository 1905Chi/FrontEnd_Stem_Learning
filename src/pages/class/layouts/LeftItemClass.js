import React, { useState, useRef } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './LeftItemClass.css';
import { Form, Input, Button, DatePicker, Select, Dropdown } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import LabelFile from '../../profile/component/LabelFile';
import { DownOutlined } from '@ant-design/icons';
import ReadQuestion from '../components/ReadQuestion';
import CalendarC from '../../../components/CalendarC';
import CalendarAntd from '../../../components/CalendarAntd';
import AddFile from '../components/AddFile';
export default function LeftItemClass() {

	const [isShowAllFile, setIsShowAllFile] = useState(false);
	const { Option } = Select;
	const { Search } = Input;
	const { RangePicker } = DatePicker;
	const [visible, setVisible] = useState(false);
	const [isopenAddFile, setIsopenAddFile] = useState(false);
	const openAddFile = () => {
		setIsopenAddFile(!isopenAddFile);
	};
	
	const handleFile = () => {
		setIsShowAllFile(!isShowAllFile);
	};


	const file = [
		{
			filename: 'Bài tập về nhà.docx',
			type: 'word',
		},
		{
			filename: 'Bài tập về nhà.zip',
			type: 'other',
		},
		{
			filename: 'Bài tập về lớp.zip',
			type: 'other',
		},
		{
			filename: 'bài tập bổ sung.docx',
			type: 'word',
		},
		{
			filename: 'Bài tập về nhà.pdf',
			type: 'pdf',
		},
	];
	const handleDateChange = (value, dateString) => {
		console.log('Selected Time: ', value);
		console.log('Formatted Selected Time: ', dateString);
	};

	const dropdownMenu = (
		<div>
			<RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange={handleDateChange} />
		</div>
	);
	return (
		<div style={{}}>
			{isopenAddFile ? ( <AddFile onCancel={openAddFile}></AddFile>) : null}
			
			{isShowAllFile ? (
				<div className="file-all">
					<div className="document-class-title" style={{ borderBottom: '3px solid #1890ff', height: '80px' }}>
						<h4>Tài liệu</h4>
						<button onClick={handleFile} style={{ paddingLeft: '230px' }}>
							<CloseOutlined style={{ color: 'black', fontSize: '30px' }}></CloseOutlined>{' '}
						</button>
					</div>
					<div className="document-class-search">
						<div style={{ width: '70%', marginLeft: '50px', marginBottom: '15px' }}>
							<Search placeholder="Tìm kiếm tài liệu" />
						</div>
						<div className="search-file">
							<Select style={{ width: '100px', marginLeft: '15px' }} placeholder="Loại">
								<Option value="all">Tất cả</Option>
								<Option value="word">Word</Option>
								<Option value="pdf">PDF</Option>
								<Option value="other">Khác</Option>
							</Select>
							<Select style={{ marginLeft: '15px' }} placeholder="Người gửi">
								<Option value="all">Tất cả</Option>
								<Option value="Chi">Chi</Option>
								<Option value="Kiet">Kiet</Option>
								<Option value="other">Khác</Option>
							</Select>
							<Dropdown
								overlay={dropdownMenu}
								visible={visible}
								onVisibleChange={(v) => setVisible(v)}
								trigger={['click']}
							>
								<Button style={{ marrginLeft: '15px', marginRight: '30px' }}>
									Thời gian <DownOutlined />
								</Button>
							</Dropdown>
						</div>
					</div>
					<div className="document-class-content document-class-content-allfile">
						{file.map((file, index) => {
							return <LabelFile type={file.type} filename={file.filename}></LabelFile>;
						})}
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}></div>
				</div>
			) : null}
			<div className="inforClass">
				<h2>Toán</h2>
				<h4>Thời gian lập:</h4>
				<h4>Số lượng thành viên:</h4>
				<h4>Giáo viên:</h4>
				<h4>Chủ đề:</h4>
			</div>
			<div style={{width:'80%',marrginLeft:'20px'}}	>
			<CalendarAntd ></CalendarAntd>
			</div>
			<div className="document-class">
				<div className="document-class-title">
					<h4>Tài liệu</h4>
					<button onClick={openAddFile}>Thêm tài liệu </button>
				</div>
				<div className="document-class-content">
					<LabelFile type="word" filename="Bài tập về nhà.docx"></LabelFile>
					<LabelFile type="other" filename="Bài tập về nhà.zip"></LabelFile>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
					<button onClick={handleFile}>Xem thêm</button>
				</div>
			</div>
			<div className="question-class">
				<ReadQuestion></ReadQuestion>
			</div>
			
		</div>
	);
}
