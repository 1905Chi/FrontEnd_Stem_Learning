import React, { useState } from 'react';
import { Badge, Calendar } from 'antd';
import './CalendarAntd.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Col, Radio, Row, Select, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { selectselecteventGroup } from './../redux/EventGroup';
import { selectselectexam } from '../redux/Exam';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(dayLocaleData);
dayjs.extend(isBetween);

const CalendarAntd = () => {
	const listEvent = useSelector(selectselecteventGroup);
	const listExam = useSelector(selectselectexam);
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
			if(listEvent.length > 0){
			listEvent.map((item) => {
				const dateStart = item.startedAt;
				// Tách các phần tử từ chuỗi
				const parts = dateStart.split(/[- :]/);

				// Định dạng lại chuỗi ngày
				const dateS = `${parts[1]}-${parts[0]}-${parts[2]}`;
				const dateEnd = item.endedAt;
				const parts1 = dateEnd.split(/[- :]/);
				const dateE = `${parts1[1]}-${parts1[0]}-${parts1[2]}`;

				

				if (formattedDate === dateS ) {
					let data= {
						id:item.id,
						name: item.name,
						description:item.description +' bắt đầu',
						startedAt:item.startedAt,
						endedAt:item.endedAt,
						
					}
					listData = [...listData, data];
				} 
				

				else if( formattedDate === dateE){
					let data= {
						id:item.id,
						name: item.name,
						description:item.description +' kết thúc ',
						startedAt:item.startedAt,
						endedAt:item.endedAt,
						
					}
					listData = [...listData, data];
				}
				else {
					console.log('khong co');
				}
			});
		}
		}
		if (listExam === null) {
			return listData;
		} else if(listExam.length > 0) {
			listExam.map((item) => {
				console.log(item.exam);
				if (item.exam!== undefined &&	item.exam!==null ) {
				//const dateStart = item.exam.startedAt;
				const dateStart = item.exam.startedAt;
								// Tách các phần tử từ chuỗi
				
				const parts = dateStart.split(/[- :]/);

				// Định dạng lại chuỗi ngày
				const dateS = `${parts[1]}-${parts[0]}-${parts[2]}`;
				//const dateEnd = item.exam.endedAt;
				const dateEnd = item.exam.endedAt;
				const parts1 = dateEnd.split(/[- :]/);
				const dateE = `${parts1[1]}-${parts1[0]}-${parts1[2]}`;

				


				if (formattedDate === dateS  ) {
					let data= {
						id:item.exam.id,
						name: item.exam.name,
						description:item.exam.description +' bắt đầu',
						startedAt:item.exam.startedAt,
						endedAt:item.exam.endedAt,
						
					}
					listData = [...listData, data];
				}
				else if( formattedDate === dateE){
					let data= {
						id:item.exam.id,
						name: item.exam.name,
						description:item.exam.description + " kết thúc",
						startedAt:item.exam.startedAt,
						endedAt:item.exam.endedAt,
						
					}
					listData = [...listData, data];
				}
				 else {
					console.log('khong co');
				}
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
					onMouseLeave={() => closeEvent(null)}
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
	const closeEvent = (value) => {
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
							{event.length > 0 && (
								<div className="event-hover">
									<ul>
										{event.map((item) => (
											<li key={item.id} style={{ color: 'yellow' }}>
												<Badge
													status={item.name}

													text={ item.name +"-"+  item.description}
													style={{ color: 'white' }}
												/>
											</li>
										))}
									</ul>
								</div>
							)}
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
