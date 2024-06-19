import React from 'react';
import CalendarAntd from '../../../components/CalendarAntd';
import './EventGroup.css';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, Button } from 'antd';
import { useState } from 'react';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { selectselectMemberGroup } from '../../../redux/MemberGroup';
import { selectselectexam } from '../../../redux/Exam';
import moment from 'moment';
import 'moment/locale/vi'; // Chọn ngôn ngữ cho moment, ví dụ: tiếng Việt
import { CiEdit } from 'react-icons/ci';
import { useEffect } from 'react';
import { selectselecteventGroup } from '../../../redux/EventGroup';
import { useDispatch } from 'react-redux';
import { selecteventGroup } from '../../../redux/EventGroup';

import { Dialog } from 'primereact/dialog';
export default function EventGroup() {
	const [open, setOpen] = useState(false);
	const [editEventData, setEditEventData] = useState(null);
	const memberGroup = useSelector(selectselectMemberGroup);
	const [role, setRole] = useState('GUEST');
	const dispatch = useDispatch();
	
	useEffect(() => {
		memberGroup.map((member) => {
			if (member.user.id === JSON.parse(localStorage.getItem('user')).id) {
				setRole(member.role);
			}
		});
	}, []);



	const openEditEvent = (eventData) => {
		setEditEventData(eventData);
		setOpen(true);
	};

	const event = useSelector(selectselecteventGroup);
	const openCreateEvent = () => {
		setEditEventData(null);
		setOpen(true);
	};

	
	const deleteEvent = (value) => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		Api.delete(url + `api/v1/events/${value.id}`, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Xóa sự kiện thành công');
					CallApiEvent();
				}
			})
			.catch((error) => {
				toast.error(error.message);
			})
			.finally(() => {});
	};
	const { uuid } = useParams();
	const createEvent = (values) => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};

		if (editEventData) {
			const data = {
				eventName: values.title,
				eventDescription: values.description,
				startDate: values.start.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
				endDate: values.end.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
			};

			Api.put(url + `api/v1/events/${editEventData.id}`, data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success('Chỉnh sửa sự kiện thành công');
						CallApiEvent();
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error.message);
				})
				.finally(() => {
					setOpen(false);
					setEditEventData(null); // Đặt lại dữ liệu chỉnh sửa sau khi đã sử dụng
				});
		} else {
			const data = {
				groupId: uuid,
				eventName: values.title,
				eventDescription: values.description,
				startDate: values.start.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
				endDate: values.end.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
			};
			Api.post(url + 'api/v1/events', data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success('Tạo sự kiện thành công !');
						console.log(response.data.result);
						CallApiEvent();
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error.message);
				})	

				.finally(() => {
					setOpen(false);
				});			
		}
	};
	const CallApiEvent = () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
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
	}

	return (
		<div>
			<Dialog
				header={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em' }}>Sự kiện mới</div>}
				visible={open}
				style={{ width: '50vw', height: 'fit-content' }}
				onHide={() => {
					setOpen(false);
				}}
			>
				<Form
					name="create-event"
					onFinish={createEvent}
					scrollToFirstError
					style={{height:'fit-content'}}
					className="form-create-event"
					initialValues={{
						title: editEventData ? editEventData.name : '',
						description: editEventData ? editEventData.description : '',
						// start: editEventData ?	moment(editEventData.startedAt, 'DD-MM-YYYY HH:mm') : null,
						// end: editEventData ? moment(editEventData.endedAt, 'DD-MM-YYYY HH:mm') : null,
					}}
				>
					<div >
						<Form.Item
							name="title"
							label="Tiêu đề"
							style={{ marginTop: '20px' }}
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập tiêu đề sự kiện!',
								},
							]}
						>
							<Input style={{ width: '250px' }} />
						</Form.Item>
						<Form.Item
							name="description"
							label="Mô tả"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập mô tả sự kiện!',
								},
							]}
						>
							<Input style={{ width: '250px' }} />
						</Form.Item>
						<Form.Item
							name="start"
							label="Thời gian bắt đầu"
							rules={[
								{
									required: true,
									message: 'Vui lòng chọn thời gian bắt đầu!',
								},
							]}
						>
							<DatePicker showTime format="DD/MM/YYYY HH:mm" />
						</Form.Item>
						<Form.Item
							name="end"
							label="Thời gian kết thúc"
							rules={[
								{
									required: true,
									message: 'Vui lòng chọn thời gian kết thúc!',
								},
							]}
						>
							<DatePicker showTime format="DD/MM/YYYY HH:mm" />
						</Form.Item>
					</div>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							style={{ width: '89%', marginRight: '8px', height: '45px', padding: '5px 0' }}
						>
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</Dialog>

			<div className="event-group">
				<div className="Calendar-group">
					<CalendarAntd />
				</div>
				<div className="event-upcoming-main" >
					<div className="header-envent-title">
						<h3 style={{ marginLeft: '22px' }}>Danh sách các sự kiện</h3>
						{role === 'GROUP_ADMIN' || role === 'GROUP_OWNER' ?
						<button className="btn btn-primary" onClick={openCreateEvent}  style={{backgroundColor:'white'}}>
							Thêm sự kiện
						</button> : null }
					
					</div>
					{event && event.map((event, index) => (
						<div className="event-upcoming__item" style={{backgroundColor:'white'}}>
							<div style={{ flex: 7 }}>
								<div className="event-upcoming__item__title">
									<p>Sự kiện: {event.name}</p>
									<p>Chi tiết: {event.description}</p>
								</div>
								<div className="event-upcoming__item__time">
									<p>Bắt đầu lúc: {event.startedAt}</p>
									<p>Kết thúc lúc: {event.endedAt}</p>
								</div>
							</div>
							<div style={{ flex: 3 }}>
								{role === 'GROUP_ADMIN' || role === 'GROUP_OWNER' || event.author.id=== JSON.parse(localStorage.getItem('user')).id ? (
									<>
										{role === 'GROUP_ADMIN' || role === 'GROUP_OWNER' ? (
										<button
											style={{ fontSize: '30px', backgroundColor: 'white', color: 'red' }}
											onClick={() => deleteEvent(event)}
										>
											<MdDeleteForever />
										</button>
										) : null}
										{event.author.id=== JSON.parse(localStorage.getItem('user')).id ? (
										<button
											style={{ fontSize: '30px', backgroundColor: 'white', color: 'green' }}
											onClick={() => openEditEvent(event)}
										>
											<CiEdit />
										</button>)
										: null}
									</>
								) : null}
							</div>
						</div>
					))}
				</div>
				<ToastContainer />
			</div>
		</div>
	);
}
