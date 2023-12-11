import React, { useState, useEffect} from 'react';
import { Input, Button, Select, Dropdown ,DatePicker} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import LabelFile from '../../profile/component/LabelFile';
import { DownOutlined } from '@ant-design/icons';
import AddFile from '../../class/components/AddFile';
import { selectSelectedPostGroup } from '../../../redux/Group';
import { useSelector } from 'react-redux';
import './Document.css';
export default function DocumentGroup() {
	const [isShowAllFile, setIsShowAllFile] = useState(false);
	const { Option } = Select;
	const { Search } = Input;
    const { RangePicker } = DatePicker;
	const [visible, setVisible] = useState(false);
	const [isopenAddFile, setIsopenAddFile] = useState(false);
	
	const openAddFile = () => {
		setIsopenAddFile(!isopenAddFile);
	};
	const [file, setFile] = useState([]);

	const handleFile = () => {
		setIsShowAllFile(!isShowAllFile);
	};
    const handleDateChange = (value, dateString) => {
		console.log('Selected Time: ', value);
		console.log('Formatted Selected Time: ', dateString);
	};
	const post =useSelector(selectSelectedPostGroup);
	useEffect(() => {
		if(post && post.length>0){
			post.map((item)=>{
				if(item.post.refUrls && item.post.refUrls.length>0){
					item.post.refUrls.map((item1)=>{
						const indexAfterNumbers = item1.indexOf('_') + 1;
						const truncatedFileName = item1.slice(indexAfterNumbers);
						var files={
							type:'docx',
							filename:truncatedFileName
						}
						setFile((file)=>{
							return [...file,files]
						})
					})
				}
			})
		}
	}, [post])

	const dropdownMenu = (
		<div>
			<RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange={handleDateChange} />
		</div>
	);
	return (
		<div>
			{isopenAddFile ? <AddFile onCancel={openAddFile}></AddFile> : null}
			
			<div className="document-group">
				<div className="document-group-title">
					<h4 style={{flex:7}}>Tài liệu</h4>
					<button onClick={openAddFile} style={{padding:'0px'}}>Thêm tài liệu </button>
				</div>
				<div className="document-group-content">
					{file && file.length > 0 ? (<LabelFile type={file[0].type} filename={file[0].filename}></LabelFile>):null}
					{file && file.length > 1 ? (<LabelFile type={file[1].type} filename={file[1].filename}></LabelFile>):null}
				</div>
				{file && file.length > 2 ? (<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
					<button onClick={handleFile}>{isShowAllFile ? ('Thu gọn'): 'Xem thêm'}</button>
				</div>) : null}
				
			</div>
            {isShowAllFile ? (
				<div className="file-show-all">
					
					<div className="document-group-search">
						<div style={{ width: '83%', margin: '50px' }}>
							<Search placeholder="Tìm kiếm tài liệu"  style={{borderRadius:'50px'}}/>
						</div>
						<div className="search-file">
							<Select style={{ width: '30%', marginLeft: '15px' }} placeholder="Loại">
								<Option value="all">Tất cả</Option>
								<Option value="word">Word</Option>
								<Option value="pdf">PDF</Option>
								<Option value="other">Khác</Option>
							</Select>
							<Select style={{width:'30%', marginLeft: '15px' }} placeholder="Người gửi">
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
                                style={{width:'30%', marginLeft: '15px' }}
							>
								<Button style={{ marrginLeft: '15px', marginRight: '30px' }}>
									Thời gian <DownOutlined />
								</Button>
							</Dropdown>
						</div>
					</div>
					<div className="document-group-content document-group-content-allfile">
						{file.map((file, index) => {
							return <LabelFile type={file.type} filename={file.filename}></LabelFile>;
						})}
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}></div>
				</div>
			) : null}
		</div>
	);
}
