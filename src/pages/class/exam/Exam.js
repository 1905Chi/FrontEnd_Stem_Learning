import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import { selectselectuser } from '../../../redux/User';
import { selectselectexam } from '../../../redux/Exam';
import { url } from '../../../constants/Constant';
import './Exam.css';
export default function Exam() {
    const navigate = useNavigate(); 
    const { uuid } = useParams();
    const openEdttor = () => {
        navigate('/classes/'+uuid+'/exam/createquiz');
    }
	const listExam = useSelector(selectselectexam);
	const user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
	console.log(listExam);
	console.log(user);
	return (
		<div>
			<div className="exam-class">
				<h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px' ,flex:7}}>
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
					{ listExam.length  > 0 && listExam.map((item, index) => {
						return (
							<div className="exam-class__item" key={index}>
								<div className="exam-class__item__title" style={{display:'flex', margin:'10px'}}>
									<button style={{ flex:7}} onClick={()=> {navigate("/classes/" +uuid+"/exam/"+ item.id )}} ><h3 >{item.name}</h3></button>
									<div style={{textAlign:'end'}}>
										<p>Bắt đầu: {item.createdAt}</p>
										<p>Kết thúc: {item.endedAt}</p>
									</div>
								</div>
								<div className="exam-class__item__content">
									<div className="exam-class__item__content__item">
										<p>{item.description}</p>
										<p>Thời gian làm bài: {item.duration} phút</p>
									</div>
									
									</div>
							</div>
						);	
					}
					)}
					</div>
				
		</div>
	);
}
