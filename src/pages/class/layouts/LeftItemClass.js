import React, { useEffect } from 'react';
import './LeftItemClass.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectselectUser } from '../../../redux/MemberGroup';
import { selectselectexam } from '../../../redux/Exam';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
export default function LeftItemClass() {
	const listExam = useSelector(selectselectexam);
	const { uuid } = useParams();
	const navigate = useNavigate();
	return (
		<div className="exam-class__list">
			{listExam.length > 0 &&
				listExam.map((item, index) => {
					return (
						<div className="exam-class__item" key={index}>
							<div className="exam-class__item__title" style={{ display: 'flex', margin: '10px' }}>
								<button
									style={{ flex: 7 }}
									onClick={() => {
										navigate('/classes/' + uuid + '/exam/' + item.id);
									}}
								>
									<h3>{item.name}</h3>
								</button>
								<div style={{ textAlign: 'end' }}>
									<p>Bắt đầu: {item.createdAt}</p>
									<p>Kết thúc: {item.endedAt}</p>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}
