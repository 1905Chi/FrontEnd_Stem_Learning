import React, { useEffect,useState } from 'react';
import './LeftItemClass.css';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectselectUser } from '../../../redux/MemberGroup';
import { selectselectexam } from '../../../redux/Exam';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
export default function LeftItemClass() {
	const [listExam, setListExam] = useState([]);
	const { uuid } = useParams();
	
	
	useEffect(() => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.get(url + 'api/v1/exams/group/' +uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					
					 setListExam(response.data.result);
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	
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
								
							</div>
						</div>
					);
				})}
		</div>
	);
}
