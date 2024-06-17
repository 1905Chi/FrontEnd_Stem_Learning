import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import './InstructCompetition.css';
import { useSelector } from 'react-redux';
import { selectselectrole } from '../../../redux/Exam';
import 'react-toastify/dist/ReactToastify.css'; // Ensure to import the styles for toast

export default function InstructCompetition() {
	const role = useSelector(selectselectrole);
	const { uuid } = useParams();
	const [exams, setExams] = useState([]);
	const navigate = useNavigate();

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	};

	const withinTimeRange = (dateStart, dateEnd) => {
		const startTime = moment(dateStart, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		const endTime = moment(dateEnd, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		const now = moment().valueOf();

		if (now >= startTime && now <= endTime) {
			return 0; // Ongoing
		} else if (now < startTime) {
			return -1; // Not started
		} else {
			return 1; // Ended
		}
	};

	useEffect(() => {
		if (uuid && (role === 'GROUP_ADMIN' || role === 'GROUP_MEMBER' || role === 'GROUP_OWNER')) {
			getExam();
		}
	}, [uuid, role]);

	const getExam = async () => {
		try {
			const response = await Api.get(`${url}api/v1/exams/group/${uuid}`, { headers });
			if (response.data.statusCode === 200) {
				const exams = response.data.result.map((item, index) => ({
					id: item.exam.id,
					name: item.exam.name,
					description: item.exam.description,
					startedAt: item.exam.startedAt,
					endedAt: item.exam.endedAt,
					duration: item.exam.duration,
					key: index,
				}));
				setExams(exams);
			} else {
				console.error('Error:', response.error);
				toast.error('Đã xảy ra lỗi khi tải dữ liệu.');
			}
		} catch (error) {
			console.error('Error:', error);
			toast.error('Đã xảy ra lỗi khi tải dữ liệu.');
		}
	};
	const CreateSubmit = (id,started,duration) => {
		localStorage.setItem('typesubmit', 'create');
		localStorage.setItem('StartAt', started);
		localStorage.setItem('duration', duration);
		setTimeout(() => {
			navigate('/competition/' + uuid + '/submition/'+ id );
		}, 1000);
	};
	const columns = [
		{ title: 'Số thứ tự', dataIndex: 'key', key: 'key', render: (key) => key + 1 },
		{ title: 'Bài thi', dataIndex: 'name', key: 'name' },
		{ title: 'Mô tả', dataIndex: 'description', key: 'description' },
		{ title: 'Bắt đầu lúc', dataIndex: 'startedAt', key: 'startedAt' },
		{ title: 'Thời gian làm bài', dataIndex: 'duration', key: 'duration'},
		{ title: 'Kết thúc lúc', dataIndex: 'endedAt', key: 'endedAt' },
		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => {
				const status = withinTimeRange(record.startedAt, record.endedAt);
				return (
					<button
						className={status === 0 ? 'btn-action-now' : status === -1 ? 'btn-action' : 'btn-action-past'}
						onClick={() => {
							if (status === 0) {
								CreateSubmit(record.id,record.startedAt,record.duration);
							}
						}}
						disabled={status !== 0}
					>
						{status === 0 ? 'Vào thi' : status === -1 ? 'Chưa bắt đầu' : 'Đã kết thúc'}
					</button>
				);
			},
		},
	];

	return (
		<div className="instruct-competition">
			{role === 'GROUP_ADMIN' || role === 'GROUP_MEMBER' || role === 'GROUP_OWNER' ? (
				<div>
					
					<h2>Lịch thi</h2>
					<Table columns={columns} dataSource={exams} rowKey={(record) => record.key} />
				</div>
			) : (
				<div><h1>Bấm tham gia tại mục trang chủ để đăng ký tham gia bài thi và xem lịch thi</h1>
				</div>
			)}

			<ToastContainer />
		</div>
	);
}
