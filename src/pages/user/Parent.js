import React, { useState, useEffect, useCallback } from 'react';
import { Table, Select, DatePicker, Button, Space } from 'antd';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { useNavigate } from 'react-router-dom';
import './Parent.css'; 
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Parent() {
	const [listChild, setListChild] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [dateRange, setDateRange] = useState([]);
	const navigate = useNavigate();

	const columns = [
		{ title: 'Số thứ tự', dataIndex: 'key', key: 'key', render: (key) => Number(key) + 1 },
		{ title: 'Tên', dataIndex: 'firstName', key: 'firstName' },
		{ title: 'Họ và tên đệm', dataIndex: 'lastName', key: 'lastName' },
		{ title: 'Bắt đầu lúc', dataIndex: 'startedAt', key: 'startedAt' },
		{ title: 'Thời gian nộp bài', dataIndex: 'endedAt', key: 'endedAt' },
		{ title: 'Điểm', dataIndex: 'score', key: 'score' },
		{
			title: 'Hành động',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<Button type="link" onClick={() => ReviewTest(record)}>
					Xem bài nộp
				</Button>
			),
		},
	];

	useEffect(() => {
		CallSubmissionChild();
	}, []);

	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	};

	const CallSubmissionChild = () => {
		Api.get(url + 'api/v1/submissions/list/children', { headers })
			.then((response) => {
				if (response.data.statusCode === 200 && response.data.result.length > 0) {
					const newData = response.data.result
						.map((item, index) => {
							const { submissions, user } = item;

							const newSubmissions = submissions.map((submission, subIndex) => ({
								...submission,
								key: subIndex,
								firstName: user.firstName,
								lastName: user.lastName,
							}));

							return newSubmissions;
						})
						.flat(); // Kết hợp tất cả các submissions thành một mảng duy nhất

					setListChild(newData);
					setFilteredData(newData); // Set dữ liệu đã lọc ban đầu
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const ReviewTest = (record) => {
		localStorage.setItem('typesubmit', 'review');
		localStorage.setItem('StartAt', record.startedAt);
		localStorage.setItem('submissionId', record.id);

		setTimeout(() => {
			navigate('/exam/' + record.id + '/submit');
		}, 1000);
	};

	const handleStudentChange = (value) => {
		setSelectedStudent(value);
	};

	const handleDateChange = (dates) => {
		if (dates) {
			const [startDate, endDate] = dates;
			setDateRange([startDate.startOf('day'), endDate.endOf('day')]);
		} else {
			setDateRange([]);
		}
	};

	const filterResults = useCallback(() => {
		let filtered = [...listChild];

		if (selectedStudent) {
			filtered = filtered.filter(
				(submission) => `${submission.firstName} ${submission.lastName}` === selectedStudent
			);
		}

		if (dateRange && dateRange.length === 2) {
			const [startDate, endDate] = dateRange;
			filtered = filtered.filter((submission) => {
				const starttime = moment(
					startDate.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
					'DD-MM-YYYY HH:mm:ss:SSSSSS'
				).valueOf();
				const endTime = moment(
					endDate.format('DD-MM-YYYY HH:mm:ss:SSSSSS'),
					'DD-MM-YYYY HH:mm:ss:SSSSSS'
				).valueOf();

        const startTime = moment(submission.startedAt);

				return (
					startTime.isSameOrAfter(starttime) &&
          startTime.isSameOrBefore(endTime)
				);
			});
		}

		setFilteredData(filtered);
	}, [listChild, selectedStudent, dateRange]);

	useEffect(() => {
		filterResults();
	}, [selectedStudent, dateRange, filterResults]);

	const studentOptions = Array.from(
		new Set(listChild.map((submission) => `${submission.firstName} ${submission.lastName}`))
	).map((student) => (
		<Option key={student} value={student}>
			{student}
		</Option>
	));

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>Kết quả học tập của học sinh</h1>
			<Space style={{ marginBottom: 20 }}>
				<Select placeholder="Chọn học sinh" onChange={handleStudentChange} style={{ width: 200 }} allowClear>
					{studentOptions}
				</Select>
				<RangePicker onChange={handleDateChange} />
				<Button onClick={filterResults}>Lọc kết quả</Button>
			</Space>
			<Table columns={columns} dataSource={filteredData} rowKey={(record) => record.key} />
		</div>
	);
}
