import { selectselectsubmition } from '../../../../redux/Exam';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Submit.css';
export default function Submit() {
	const submition = useSelector(selectselectsubmition);
	console.log(submition);

	const [selectedAnswers, setSelectedAnswers] = useState({});

	const handleRadioChange = (questionId, answerIndex) => {
		setSelectedAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: answerIndex,
		}));
	};

	const handleSubmit = () => {
		// Gửi selectedAnswers lên server hoặc xử lý dữ liệu theo ý bạn

		console.log('Selected Answers:', selectedAnswers);
	};

	return (
		<div className='submit'>
			{submition.questions.length > 0 &&
				submition.questions.map((question) => (
					<div key={question.submissionDetailId} className='item-question'>
                        <div className="quest-content" dangerouslySetInnerHTML={{ __html: question.content }} />
					
						<div>
							{question.answers.map((answer, index) => (
								<label key={index}>
                                    {question.typeCode==='multiple_choice' ? (<input
										type="checkbox"
										name={`question_${question.submissionDetailId}`}
										checked={selectedAnswers[question.submissionDetailId] === index}
                                        style={{width:'15px',height:'15px' , marginRight:'10px'}}
										onChange={() => handleRadioChange(question.submissionDetailId, index)}
									/>):(<input
										type="radio"
										name={`question_${question.submissionDetailId}`}
										checked={selectedAnswers[question.submissionDetailId] === index}
                                        style={{width:'15px',height:'15px', marginRight:'10px'}}
										onChange={() => handleRadioChange(question.submissionDetailId, index)}
									/>)}
									
									{answer.answer}
								</label>
							))}
						</div>
					</div>
				))}
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}
