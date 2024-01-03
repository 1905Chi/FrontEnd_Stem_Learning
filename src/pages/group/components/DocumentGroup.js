import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Dropdown, DatePicker } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import LabelFile from '../../profile/component/LabelFile';
import { DownOutlined } from '@ant-design/icons';
import AddFile from '../../class/components/AddFile';
import { selectSelectedPostGroup ,} from '../../../redux/Group';
import { useSelector, useDispatch } from 'react-redux';
import './Document.css';
import Loading from '../../../components/Loading';
import { selectselectMemberGroup } from '../../../redux/MemberGroup';
import moment from 'moment';
import { selectOptionSearchDocementbyDate, selectOptionSearchDocumentbyName,selectOptionSearchDocumentbySender,selectOptionSearchDocumentbyType } from '../../../redux/Group';
import { selectSelectOptionSearchDocementbyDate,selectSelectOptionSearchDocumentbyName, selectSelectOptionSearchDocumentbySender, selectSelectOptionSearchDocumentbyType } from '../../../redux/Group';
export default function DocumentGroup() {
	const [isShowAllFile, setIsShowAllFile] = useState(false);
	const  dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { Option } = Select;
	const { Search } = Input;
	const { RangePicker } = DatePicker;
	const [visible, setVisible] = useState(false);
	const [isopenAddFile, setIsopenAddFile] = useState(false);
	const member = useSelector(selectselectMemberGroup);
	const [searchQuery, setSearchQuery] = useState('');

	const searchName = useSelector(selectSelectOptionSearchDocumentbyName);
	const searchType = useSelector(selectSelectOptionSearchDocumentbyType);
	const searchSender = useSelector(selectSelectOptionSearchDocumentbySender);
	const searchDate = useSelector(selectSelectOptionSearchDocementbyDate);
	
	
	///
	const [post,setPost] =useState( useSelector(selectSelectedPostGroup).posts);
	
	const [search,setSearch] = useState([]);
	const [file, setFile] = useState([]);
	useEffect(()=>{
		Filter();
	},[searchName,searchType,searchSender,searchDate]);

	const Filter=()=>{
		if((searchName=== null|| searchName===''|| searchName=== undefined) && (searchType===null || searchType=== 'all') && (searchSender===null|| searchSender==='all') && searchDate===null ){
			setFile(search);
			return;
		}
		var postFilter=search;
		if(searchName!==null && searchName!==''){
			postFilter=postFilter.filter((item)=>{
				return item.filename.includes(searchName);
			});
		}
		if(searchType!==null && searchType!=='all'){
			if(searchType==='all'){
				postFilter=postFilter.filter((item)=>{
					return item.type==='doc' || item.type==='docx' || item.type==='pdf' || item.type==='ppt' || item.type==='pptx';
				});
			}
			else if(searchType==="doc"){
				postFilter=postFilter.filter((item)=>{
					return item.type==='doc' || item.type==='docx';
				});
			}
			else if(searchType==="pdf"){
				postFilter=postFilter.filter((item)=>{
					return item.type==='pdf';
				});
			}
			else if(searchType==="ppt"){
				postFilter=postFilter.filter((item)=>{
					return item.type==='ppt' || item.type==='pptx';
				});
			}
			else if(searchType==="other"){
				postFilter=postFilter.filter((item)=>{
					return item.type!=='doc' && item.type!=='docx' && item.type!=='pdf' && item.type!=='ppt' && item.type!=='pptx';
				});
			}
			
		}
		if(searchSender!==null && searchSender!=='all'){
			postFilter=postFilter.filter((item)=>{
				return item.sender===searchSender;
			});
		}
		if(searchDate!==null && searchDate.length>0){
			if(searchDate[0]===null || searchDate[1]===null || searchDate[0]==='' || searchDate[1]===''){
			postFilter=postFilter.filter((item)=>{
				
				return checktime(searchDate[0],item.createdAt,searchDate[1]);
			});
		}
		}
		console.log("postFilter",postFilter);
		
		let setKetQua= new Set(postFilter);
		postFilter=Array.from(setKetQua);
		console.log("postFilter",postFilter);
		//setPost(postFilter);
		setFile(postFilter);

	}
	function soSanhDoiTuong(a, b) {
		return a.link === b.link && a.createdAt === b.createdAt && a.filename === b.filename && a.sender === b.sender;
	  }

	const checktime = (startedAt, now, endedAt) => {
		const startTime = moment(startedAt, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		console.log("startTime",startTime);

		const endTime = moment(endedAt, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		console.log("endTime",endTime);

		const nowTime = moment(now, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		console.log("nowTime",nowTime);
		if (nowTime > startTime && nowTime < endTime) {
			return true;
		}
		return false;
	}
	const openAddFile = () => {
		setIsopenAddFile(!isopenAddFile);
	};
	

	const handleFile = () => {
		setIsShowAllFile(!isShowAllFile);
	};
	const handleDateChange = (value, dateString) => {
		console.log('Selected Time: ', value);
		console.log('Formatted Selected Time: ', dateString);
		dispatch(selectOptionSearchDocementbyDate(dateString));
	};
	

	const getTypes = (filename) => {
		const parts = filename.split('.');

		// Lấy phần mở rộng của tệp từ phần tử cuối cùng của mảng
		const fileExtension = parts[parts.length - 1];

		// Chuyển đổi phần mở rộng thành chữ thường để so sánh dễ dàng hơn
		const lowerCaseExtension = fileExtension.toLowerCase();

		// Kiểm tra loại file và trả về kết quả tương ứng
		switch (lowerCaseExtension) {
			case 'pdf':
				return 'pdf';
			case 'docx':
				return 'docx';
			// Thêm các loại file khác nếu cần thiết
			case 'doc':
				return 'doc';
			case 'ppt':
				return 'ppt';
			case 'pptx':
				return 'pptx';
			default:
				return 'other';
		}
	};


	
		
	 




	useEffect(() => {
		if (post && post.length > 0) {
			post.map((item) => {
				if (item.post.refUrls && item.post.refUrls.length > 0) {
					item.post.refUrls.map((item1, index) => {
						const indexAfterNumbers = item1.indexOf('_') + 1;
						const truncatedFileName = item1.slice(indexAfterNumbers);
						var files = {
							type: getTypes(truncatedFileName),
							createdAt: item.post.createdAt,
							link: item1,
							filename: truncatedFileName,
							sender: item.post.authorId,
						};
						setFile((file) => {
							return [...file, files];
						});
						setSearch((search) => {
							return [...search, files];
						});
					});
				}
			});
			
		}
	}, [post]);

	const dropdownMenu = (
		<div>
			<RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange={handleDateChange} />
		</div>
	);
	return (
		<div style={{ backgroundColor: 'white', border: '1px solid e6e6e6', paddingTop: '15px' }}>
			{isopenAddFile ? <AddFile onCancel={openAddFile}></AddFile> : null}
			{loading ? <Loading></Loading> : null}
			<div className="document-group">
				<div className="document-group-title">
					<h4 style={{ flex: 7 }}>Tài liệu</h4>
					<button onClick={openAddFile} style={{ padding: '0px' }}>
						Thêm tài liệu{' '}
					</button>
				</div>
				<div className="document-group-content">
					{search && search.length > 0 ? (
						<LabelFile type={search[0].type} filename={search[0].filename} link={search[0].link}></LabelFile>
					) : null}
					{search && search.length > 1 ? (
						<LabelFile type={search[1].type} filename={search[1].filename} link={search[1].link}></LabelFile>
					) : null}
				</div>
				{file && file.length > 2 ? (
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
						<button onClick={handleFile}>{isShowAllFile ? 'Thu gọn' : 'Xem thêm'}</button>
					</div>
				) : null}
			</div>
			{isShowAllFile ? (
				<div className="file-show-all">
					<div className="document-group-search">
						<div style={{ width: '83%', margin: '50px' }}>
							<Search
								placeholder="Tìm kiếm tài liệu"
								style={{ borderRadius: '50px' }}
								onChange={(e) => {
									setSearchQuery(e.target.value);
								dispatch(selectOptionSearchDocumentbyName(e.target.value));
							}}
								value={searchQuery}
								
							/>
						</div>
						<div className="search-file">
							<Select
								style={{ width: '30%', marginLeft: '15px' }}
								placeholder="Loại"
								onChange={(value) => {
									
									dispatch(selectOptionSearchDocumentbyType(value));
								}}
							>
								<Option value="all">Tất cả</Option>
								<Option value="doc">Word</Option>
								<Option value="pdf">PDF</Option>
								<Option value="other">Khác</Option>
							</Select>
							<Select
								style={{ width: '30%', marginLeft: '15px' }}
								placeholder="Người gửi"
								onChange={(value) => {
									dispatch(selectOptionSearchDocumentbySender(value));
									
								}}
							>
								<Option value="all">Tất cả</Option>
								{member.map((item, index) => {
									return (
										<Option value={item.user.id}>
											{item.user.firstName} {item.user.lastName}
										</Option>
									);
								})}
							</Select>
							<Dropdown
								overlay={dropdownMenu}
								visible={visible}
								onVisibleChange={(v) => setVisible(v)}
								trigger={['click']}
								onChange={(value) => {
									dispatch(selectOptionSearchDocementbyDate(value));
								}}
								style={{ width: '30%', marginLeft: '15px' }}
							>
								<Button style={{ marrginLeft: '15px', marginRight: '30px' }}>
									Thời gian <DownOutlined />
								</Button>
							</Dropdown>
						</div>
					</div>
					<div className="document-group-content document-group-content-allfile">
						{file.map((file, index) => {
							return <LabelFile type={file.type} filename={file.filename} link={file.link}></LabelFile>;
						})}
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}></div>
				</div>
			) : null}
		</div>
	);
}
