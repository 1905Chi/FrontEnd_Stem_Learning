import React, { useState } from 'react';
import { Badge, Calendar } from 'antd';
import './CalendarAntd.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Col, Radio, Row, Select, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { selectselecteventGroup } from './../redux/EventGroup';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(dayLocaleData);
dayjs.extend(isBetween);

const CalendarAntd = () => {
	const listEvent = useSelector(selectselecteventGroup);
	const getListData = (value) => {
		let listData = [];
		const date = value.date();
		const month = value.month();
		const year = value.year();

		const dateCr = new Date(year, month, date);
		const formattedDate = dayjs(dateCr).format('MM-DD-YYYY');

		if (listEvent === null) {
			return listData;
		} else {
			listEvent.map((item) => {
				const dateStart = item.startedAt;
				// Tách các phần tử từ chuỗi
				const parts = dateStart.split(/[- :]/);

				// Định dạng lại chuỗi ngày
				const dateS = `${parts[1]}-${parts[0]}-${parts[2]}`;
				const dateEnd = item.endedAt;
				const parts1 = dateEnd.split(/[- :]/);
				const dateE = `${parts1[1]}-${parts1[0]}-${parts1[2]}`;
				
				if (formattedDate === dateS || formattedDate === dateE) {
					listData = [...listData, item];
				} else {
					console.log('khong co');
				}
			});
		}
		return listData;
	};
	const dateCellRender = (value) => {
		const listData = getListData(value);
		if (listData.length > 0) {
			return (
				<div
					className={`events ${listData.length > 0 ? 'has-event' : ''} 
        `}
					onMouseEnter={() => openEvent(value)}
					onMouseLeave={() => openEvent(null)}
				>
					{listData.length > 0 && <div className="event-day" />}
				</div>
			);
		} else {
			return null;
		}
	};
	const [event, setEvent] = useState([]);
	const cellRender = (current, info) => {
		if (info.type === 'date') return dateCellRender(current);

		return null;
	};
	const openEvent = (value) => {
		if (value === null) {
			setTimeout(() => {
				setEvent([]);
				return;
			}, 2000);
		} else {
			const listData = getListData(value);
			setEvent(listData);
		}
	};

	return (
		<div style={{ position: 'relative' }}>
			{/* {open && (
				<div className="overlay-event-create">
					<div
						style={{
							display: 'flex',
							borderBottom: '1px solid black',
							justifyContent: 'space-between',
							flex: 10,
						}}
					>
						<h2 style={{ flex: 8, textAlign: 'center', color: 'black' }}>Tạo lịch biểu</h2>
						<button
							style={{ flex: 3, height: '72.5px', textAlign: 'end', backgroundColor: 'white' }}
							onClick={handleEventClose}
						>
							<CloseOutlined style={{ color: 'black', fontSize: '30px' }}></CloseOutlined>
						</button>
					</div>
					<Form name="create-event" onFinish={createEvent} scrollToFirstError>
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
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Tạo
							</Button>
						</Form.Item>
					</Form>
				</div>
			)} */}
			{event.length > 0 && (
				<div className="event-hover">
					<ul>
						{event.map((item) => (
							<li key={item.id} style={{ color: 'yellow' }}>
								<Badge status={item.name} text={item.description} style={{ color: 'white' }} />
							</li>
						))}
					</ul>
				</div>
			)}
			<Calendar
				cellRender={cellRender}
				fullscreen={false}
				// onSelect={OpenCreate()}
				headerRender={({ value, type, onChange, onTypeChange }) => {
					const start = 0;
					const end = 12;
					const monthOptions = [];
					let current = value.clone();
					const localeData = value.localeData();
					const months = [];
					for (let i = 0; i < 12; i++) {
						current = current.month(i);
						months.push(localeData.monthsShort(current));
					}

					for (let i = start; i < end; i++) {
						monthOptions.push(
							<Select.Option key={i} value={i} className="month-item">
								{months[i % 12]} {/* Sử dụng i % 12 để tránh lặp lại */}
							</Select.Option>
						);
					}
					const year = value.year();
					const month = value.month();
					const options = [];
					for (let i = year - 10; i < year + 10; i += 1) {
						options.push(
							<Select.Option key={i} value={i} className="year-item">
								{i}
							</Select.Option>
						);
					}
					return (
						<div
							style={{
								padding: 8,
							}}
						>
							<Typography.Title level={4} style={{ margin: '8px' }}>
								Lịch
							</Typography.Title>
							<Row gutter={8}>
								<Col>
									<Radio.Group
										size="small"
										onChange={(e) => onTypeChange(e.target.value)}
										value={type}
									>
										<Radio.Button value="month">Month</Radio.Button>
										<Radio.Button value="year">Year</Radio.Button>
									</Radio.Group>
								</Col>
								<Col>
									<Select
										size="small"
										dropdownMatchSelectWidth={false}
										className="my-year-select"
										value={year}
										onChange={(newYear) => {
											const now = value.clone().year(newYear);
											onChange(now);
										}}
									>
										{options}
									</Select>
								</Col>
								<Col>
									<Select
										size="small"
										dropdownMatchSelectWidth={false}
										value={month}
										onChange={(newMonth) => {
											const now = value.clone().month(newMonth);
											onChange(now);
										}}
									>
										{monthOptions}
									</Select>
								</Col>
							</Row>
						</div>
					);
				}}
			/>
			
		</div>
	);
};

export default CalendarAntd;
