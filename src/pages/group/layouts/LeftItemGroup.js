import React, { useEffect, useState } from 'react';
import LableGroup from './../components/LableGroup';
import { Button } from 'antd';
import './LeftItemGroup.css';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { HiOutlineClipboardDocumentList, HiInformationCircle } from 'react-icons/hi2';
import { MdEventNote } from 'react-icons/md';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { url } from './../../../constants/Constant';
import UseTheme from './../../../layouts/UseTheme';
import Api from './../../../api/Api';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { selectGroup } from './../../../redux/GetItemGroup';
import { selectselectMemberGroup } from './../../../redux/MemberGroup';
import { selecteventGroup } from './../../../redux/EventGroup';
import { selectMemberGroup } from './../../../redux/MemberGroup';
import { selectMemberGroupRequest } from './../../../redux/MemberGroup';
import { selectUser, selectselectUser } from './../../../redux/MemberGroup';
import { selectOption } from '../../../redux/Group';
import { useLocation } from 'react-router-dom';
import { selectPostGroup } from '../../../redux/Group';
import { selectexam } from '../../../redux/Exam';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSignsPost } from 'react-icons/fa6';
import { MdGroups2 } from 'react-icons/md';
import { Skeleton } from 'antd';
export default function LeftItemGroup() {
	const { theme } = UseTheme();
	const [inforGroup, setInforGroup] = useState(null);
	const [role, setRole] = useState('GUEST');
	const navigate = useNavigate();
	const [group, setGroup] = useState({});
	const { uuid } = useParams();
	const location = useLocation();
	const isClassesPath = location.pathname.includes('classes');
	const memberGroup = useSelector(selectselectMemberGroup);

	const dispatch = useDispatch();

	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};
	const RequestJoinGroup = () => {
		Api.post(url + 'api/v1/group-members/request', { groupId: uuid }, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
				setTimeout(() => {
					navigate('/group/');
				}, 3000);
			});
	};

	useEffect(() => {
		Api.get(url + 'api/v1/groups/' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					if (response.data.result.user) {
						setRole(response.data.result.user.role);
					}

					setGroup(response.data.result.group);
					setInforGroup(response.data.result.group);
					dispatch(selectGroup(response.data.result.group));
					dispatch(selectUser(response.data.result.user));
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
		Api.get(url + 'api/v1/group-members?groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectMemberGroup(response.data.result));
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
		Api.get(url + 'api/v1/events?groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selecteventGroup(response.data.result));
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
		Api.get(url + 'api/v1/group-member-requests?groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectMemberGroupRequest(response.data.result));
				} else {
					//toast.error(response.data.message);
				}
			})
			.catch((error) => {
				//toast.error(error);
			});
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
			})
			.finally(() => {
				dispatch(selectOption('post'));
			});
		if (isClassesPath) {
			Api.get(url + 'api/v1/exams/group/' + uuid, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						dispatch(selectexam(response.data.result));
					} else {
						console.log(response.error);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

	const convertDay = (date) => {
		const dateConvert = new Date(date);
		const day = dateConvert.getDate();
		const month = dateConvert.getMonth() + 1;
		const year = dateConvert.getFullYear();
		return day + '/' + month + '/' + year;
	};

	return (
		<>
			<div style={{ position: 'relative', borderRight: '0.2px solid black', top: '45px' }}>
				{memberGroup === null || inforGroup === null ? (
					<Skeleton />
				) : (
					<div>
						<div className="header-item-group">
							<LableGroup image={group.avatarUrl} name={group.name} />
							{inforGroup ? (
								<div style={{display: 'flex', marginLeft:'35px'}}>
									<h4 style={{ textAlign: 'center' ,margin:'0px'}}>Nhóm :</h4>
									<span style={{paddingLeft: '5px'}}>
										{inforGroup && inforGroup.isPublic=== true
											? 'Công Khai'
											: 'Riêng tư'}
									</span>
								</div>
							) : null}

							{memberGroup && memberGroup.length > 0 ? (
								<div style={{display:'flex', marginLeft:'35px'}}>
									<h4 style={{ textAlign: 'center' ,margin:'0px'}}>Thành viên:</h4>
									<span style={{paddingLeft: '5px'}}>{memberGroup && memberGroup.length}</span>
								</div>
							) : null}
							{inforGroup && inforGroup.createdAt ? (
								<div style={{display:'flex', marginLeft:'35px'}}>
								<h4 style={{ textAlign: 'center' ,margin:'0px'}}>Ngày tạo: </h4>
								<span style={{ paddingLeft: '5px'}}>{convertDay(inforGroup && inforGroup.createdAt)}</span>
								</div>
							) : null}

							<div className="button-add-member">
								{(role && role === 'GROUP_ADMIN') ||
								role === 'GROUP_MEMBER' ||
								role === 'GROUP_OWNER' ? (
									<div>
										<Button
											type="primary"
											style={{
												width: '95%',
												margin: '5px 0 10px 7px',
												height: '50px',
												alignItems: 'center',
											}}
										>
											<span style={{ fontSize: '15px', fontWeight: '500' }}>
												{' '}
												+ Mời thành viên
											</span>
										</Button>
									</div>
								) : (
									<Button
										type="primary"
										style={{
											width: '95%',
											margin: '5px 0 12px 7px',
											height: '50px',
											alignItems: 'center',
										}}
										onClick={RequestJoinGroup}
									>
										<span style={{ fontSize: '15px', fontWeight: '500' }}>Tham gia nhóm</span>
									</Button>
								)}
							</div>
						</div>
						<div style={{ overflow: 'auto', color: theme.foreground, background: theme.background }}>
							{role === 'GROUP_ADMIN' || role === 'GROUP_MEMBER' || role === 'GROUP_OWNER' ? (
								<div>
									<div
										className="custom-option-group"
										onClick={() => {
											dispatch(selectOption('post'));
										}}
									>
										<FaSignsPost className="icon-option-group" size={20} />
										<span className="option-label-group">Bài viết</span>
									</div>
									<div
										className="custom-option-group"
										onClick={() => {
											dispatch(selectOption('question'));
										}}
									>
										<QuestionCircleOutlined className="icon-option-group" size={20} />
										<span className="option-label-group">Câu hỏi</span>
									</div>
									<div
										className="custom-option-group"
										onClick={() => {
											dispatch(selectOption('member'));
										}}
									>
										<MdGroups2 className="icon-option-group" size={20} />
										<span className="option-label-group">Thành viên</span>
									</div>

									{isClassesPath ? (
										<div
											className="custom-option-group"
											onClick={() => {
												dispatch(selectOption('exam'));
											}}
										>
											<QuestionCircleOutlined className="icon-option-group" size={20} />
											<span className="option-label-group">Bài kiểm tra</span>
										</div>
									) : null}
									<div
										className="custom-option-group"
										onClick={() => {
											dispatch(selectOption('document'));
										}}
									>
										<HiOutlineClipboardDocumentList className="icon-option-group" size={20} />
										<span className="option-label-group">Tài liệu học tập</span>
									</div>

									<div
										className="custom-option-group"
										onClick={() => {
											dispatch(selectOption('event'));
										}}
									>
										<MdEventNote className="icon-option-group" size={20} />
										<span className="option-label-group">Sự kiện</span>
									</div>
									{role === 'GROUP_ADMIN' || role === 'GROUP_OWNER' ? (
										<div>
											<div
												className="custom-option-group"
												onClick={() => {
													dispatch(selectOption('manager-member'));
												}}
											>
												<AiOutlineUsergroupAdd className="icon-option-group" size={20} />
												<span className="option-label-group">Quản lý thành viên</span>
											</div>
											<div
												className="custom-option-group"
												onClick={() => {
													dispatch(selectOption('manager-group'));
												}}
											>
												<HiInformationCircle className="icon-option-group" size={20} />
												<span className="option-label-group">Quản lý nhóm</span>
											</div>
										</div>
									) : null}
								</div>
							) : null}
						</div>
					</div>
				)}

				<ToastContainer />
			</div>
		</>
	);
}
