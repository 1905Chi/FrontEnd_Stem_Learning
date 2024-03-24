import CalendarAntd from '../../../components/CalendarAntd';
import React, { useState, useEffect } from 'react';
import './RightItemGroup.css';
import { useSelector } from 'react-redux';
import { selectselecteventGroup } from '../../../redux/EventGroup';
import { selectselectexam } from '../../../redux/Exam';
import { Empty } from 'antd';
import moment from 'moment';
export default function RightItemClass() {
	const event = useSelector(selectselecteventGroup);
	const exam = useSelector(selectselectexam);
	console.log('event', event);
	console.log('exam', exam);
	const [listEvent, setListEvent] = useState();
	//sự kiện sắp diễn ra
	useEffect(() => {
		EventGroupComing();
	}, [event, exam]);
	const EventGroupComing = () => {
		let eventComing = [];

		event !== null &&
			event.map((event) => {
				if (EventNotPass(event.startedAt)) {
					eventComing.push(event);
				}
			});
		exam !== null &&
			exam.map((exam) => {
				if (exam.exam !== null && exam.exam !== undefined) {
					if (EventNotPass(exam.exam.startedAt)) {
						eventComing.push(exam);
					}
				}
			});
		setListEvent(eventComing);
	};
	const EventNotPass = (dateStart) => {
		const startTime = moment(dateStart, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();

		const now = new Date();

		const nowTime =
			now.getDate() +
			'-' +
			(now.getMonth() + 1) +
			'-' +
			now.getFullYear() +
			' ' +
			now.getHours() +
			':' +
			now.getMinutes() +
			':' +
			now.getSeconds() +
			':' +
			'000000';

		const nowDate = moment(nowTime, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
		if (nowDate < startTime) {
			return true;
		}
		return false;
	};
	return (
		<div className="right-class-group" style={{ height: '99vh', overflowY: 'auto', backgroundColor: 'white' }}>
			<div className="Lich">
				<CalendarAntd />
			</div>
			<div className="event-upcoming">
				<h3>Sự kiện sắp diễn ra</h3>
				{listEvent && listEvent !== null && listEvent.length > 0 ? (
					listEvent.map((event, index) => (
						<div className="event-upcoming__item">
							<div>
								<div className="event-upcoming__item__title">
									<p>Sự kiện: {event.name}</p>
									<p>Chi tiết: {event.description}</p>
								</div>
								<div className="event-upcoming__item__time">
									<p>Bắt đầu lúc: {event.startedAt}</p>
									<p>Kết thúc lúc: {event.endedAt}</p>
								</div>
							</div>
						</div>
					))
				) : (
					<Empty />
				)}
			</div>
		</div>
	);
}
