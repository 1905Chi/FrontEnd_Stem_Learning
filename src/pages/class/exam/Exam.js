import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectselectuser } from '../../../redux/User';
import { selectselectexam } from '../../../redux/Exam';
import { url } from '../../../constants/Constant';
import Api from '../../../api/Api';
import { toast } from 'react-toastify';
import moment from 'moment';
import './Exam.css';
export default function Exam() {
	const navigate = useNavigate();
	const { uuid } = useParams();
	const openEdttor = () => {
		navigate('/classes/' + uuid + '/exam/createquiz');
	};
	const listExam = useSelector(selectselectexam);
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	console.log(listExam);
	console.log(user);
	const WithinTimeRang = (dateStart, dateEnd) => {
	
		const startTime =  moment(dateStart, "DD-MM-YYYY HH:mm:ss:SSSSSS").valueOf();
		
		const endTime =  moment(dateEnd, "DD-MM-YYYY HH:mm:ss:SSSSSS").valueOf();
		
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
			now.getSeconds()
			+':' +
			'000000';

		
		const nowDate =  moment(nowTime, "DD-MM-YYYY HH:mm:ss:SSSSSS").valueOf();

		
		
		if (nowDate >= startTime && nowDate <= endTime) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<div>
			<div className="exam-class">
				<h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px', flex: 7 }}>
					Bài kiểm tra
				</h2>
				{user && user.role === 'TEACHER' ? (
					<div className="exam-class__create">
						<button className="exam-class__button" onClick={openEdttor}>
							+
						</button>
					</div>
				) : null}
			</div>
			<div className="exam-class__list">
				{listExam.length > 0 &&
					listExam.map((item, index) => {
						return (
							<div className="exam-class__item" key={index} onClick={()=>{
								navigate('/classes/' + uuid + '/exam/'+item.id);
							}}>
								<div className="infor-exam">
									<p> Tên bài kiểm tra: <strong>{item.name}</strong></p>
									<p>Mô tả: <span style={{fontStyle:'italic'}}>{item.description}</span></p>
									{WithinTimeRang(item.staredAt, item.endedAt) ? (
										<p > Trạng thái: <strong style={{ color: 'green' }}>Đang diễn ra</strong></p>
									) : (
										<p > Trạng thái: <strong style={{ color: 'red' }}>Đã kết thúc</strong></p>
									)}
									<p>
										Thời gian: <strong>{item.staredAt} - {item.endedAt}</strong> 
									</p>
								</div>
								<div className='exam-detal'>
									<p>Số câu: <strong>{item.numberOfQuestion}</strong></p>
									<p>Thời gian làm bài: <strong>{item.duration} </strong>phút</p>

								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
