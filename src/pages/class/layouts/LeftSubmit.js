import React from 'react';
import './LeftSubmit.css';
import { selectselectexam, selectselectquestionChoose } from '../../../redux/Exam';
import { useSelector, useDispatch } from 'react-redux';
export default function LeftSubmit() {
	const exam = useSelector(selectselectexam);
	const questionChoose = useSelector(selectselectquestionChoose);
	const isChoose = (id) => {
		if (questionChoose.find((item) => item.id === id) !== undefined) {
			return true;
		}
		return false;
	};

	return (
		<div className="Left-submit">
			<h2>Các đáp án đã trả lời</h2>
			{exam.length > 0 ? (
				<div style={{display:'flex'}}>
				{exam.map((question, index) => (
					<div style={{width:'50px', height:'auto'}}>
					<button
						key={question.submissionDetailId}
						style={{
							backgroundColor: !questionChoose
								? 'white'
								: isChoose(question.submissionDetailId)
								? 'black'
								: 'white',
							border: '1px solid black',
							height: '30px',
							width: '30px',
							borderRadius: '5px',
						}}
					></button>
					<span style={{marginLeft:'5px'}}>Câu{index+1}</span>
					</div>
				))}
				</div>):(<div></div>)}
		</div>
	);
}
