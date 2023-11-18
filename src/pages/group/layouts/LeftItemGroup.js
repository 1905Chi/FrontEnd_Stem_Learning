import React, { useEffect, useState } from 'react';
import LableGroup from './../components/LableGroup';
import { Button } from 'antd';
import './LeftItemGroup.css';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { HiOutlineClipboardDocumentList, HiInformationCircle } from 'react-icons/hi2';
import { MdEventNote } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { url } from './../../../constants/Constant';
import UseTheme from './../../../layouts/UseTheme';
import Api from './../../../api/Api';
import { useParams } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import {selectGroup} from './../../../redux/GetItemGroup'
export default function LeftItemGroup() {
	const { theme } = UseTheme();
	const [role, setRole] = useState('GUEST');
	const [group, setGroup] = useState({});
	const { uuid } = useParams();
const dispatch = useDispatch();

	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};
	
	useEffect(() => {
		Api.get(url + 'api/v1/groups/'+uuid,{headers:headers})
			.then((response) => {
				if (response.data.statusCode === 200) {
					if(response.data.result.user)
					{
						setRole(response.data.result.user.role);
					}
					
					setGroup(response.data.result.group);
					dispatch(selectGroup(response.data.result.group));
				} else {
					toast.error(response.data.result.message);
				}
			})
			.catch((error) => {
				toast.error(error.response.data.result.message);
			});

	}, []);

	

	return (
		<>
			<div style={{ position: 'relative',borderRight:'0.2px solid black' }}>
				<div className="header-item-group">
					<LableGroup image={group.avatarUrl} name={group.name} />
					<div className="button-add-member">
						{role ==='GROUP_ADMIN' ||  role ==='GROUP_MEMBER' || role==='GROUP_OWNER'  ? (
							<div >
								<Button
									type="primary"
									style={{
										width: '95%',
										margin: '5px 0 0 7px',
										height: '50px',
										alignItems: 'center',
									}}
								>
									<span style={{ fontSize: '15px', fontWeight: '500' }}>Thoát nhóm</span>
								</Button>
								<Button
									type="primary"
									style={{
										width: '95%',
										margin: '5px 0 0 7px',
										height: '50px',
										alignItems: 'center',
									}}
								>
									<span style={{ fontSize: '15px', fontWeight: '500' }}> + Mời thành viên</span>
								</Button>
								<Button
									type="primary"
									style={{
										width: '95%',
										margin: '5px 0 7px 7px',
										height: '50px',
										alignItems: 'center',
									}}
								>
									<span style={{ fontSize: '15px', fontWeight: '500' }}>Hội thoại nhóm</span>
								</Button>
							</div>
						) : (
							<Button
								type="primary"
								style={{ width: '95%', margin: '5px 0 0 7px', height: '50px', alignItems: 'center' }}
							>
								<span style={{ fontSize: '15px', fontWeight: '500' }}>Tham gia nhóm</span>
							</Button>
						)}
					</div>
				</div>
				<div style={{ overflow: 'auto', color: theme.foreground, background: theme.background }}>
					{role ==='GROUP_ADMIN' ||  role ==='GROUP_MEMBER' || role==='GROUP_OWNER' ? (
						<div>
							{' '}
							<div className="custom-option-group">
								<QuestionCircleOutlined className="icon-option-group" size={20} />
								<span className="option-label-group">Câu hỏi</span>
							</div>
							<div className="custom-option-group">
								<HiOutlineClipboardDocumentList className="icon-option-group" size={20} />
								<span className="option-label-group">Tài liệu học tập</span>
							</div>
							<div className="custom-option-group">
								<BsFillCalendar2WeekFill className="icon-option-group" size={20} />
								<span className="option-label-group">Lịch học</span>
							</div>
							<div className="custom-option-group">
								<MdEventNote className="icon-option-group" size={20} />
								<span className="option-label-group">Sự kiện</span>
							</div>
							{role ==='GROUP_ADMIN' || role==='GROUP_OWNER' ? (
								<div>
									<div className="custom-option-group">
										<AiOutlineUsergroupAdd className="icon-option-group" size={20} />
										<span className="option-label-group">Quản lý thành viên</span>
									</div>
									<div className="custom-option-group">
										<HiInformationCircle className="icon-option-group" size={20} />
										<span className="option-label-group">Quản lý nhóm</span>
									</div>
								</div>
							) : null}
						</div>
					) : null}
				</div>
				<ToastContainer/>
			</div>
		</>
	);
}
