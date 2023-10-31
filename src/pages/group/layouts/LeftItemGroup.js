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
import axios from 'axios';
import RefeshToken from './../../../api/RefeshToken';
import UseTheme from './../../../layouts/UseTheme';

export default function LeftItemGroup() {
	const { theme } = UseTheme();
	const [isAdmin, setIsAdmin] = useState(false);
	const [isMember, setIsMember] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);

	const apifake = {
		isAdmin: true,
		isMember: true,
		isPrivate: true,
	};
	
	useEffect(() => {
		
	}, []);

	const mygroup = {
		image: 'https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png',
		name: 'Nhóm 4',
	};
	return (
		<>
			<div style={{ position: 'relative',borderRight:'0.2px solid black' }}>
				<div className="header-item-group">
					<LableGroup image={mygroup.image} name={mygroup.name} />
					<div className="button-add-member">
						{isMember ? (
							<div>
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
					{isMember ? (
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
							{isAdmin ? (
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
			</div>
		</>
	);
}
