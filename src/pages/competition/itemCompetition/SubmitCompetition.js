import React, { useState, useEffect, useCallback } from 'react';
import { Statistic } from 'antd';
import Loading from '../../../components/Loading';
import './SubmitCompetition.css'; // Đảm bảo import đúng file CSS của bạn

export default function SubmitCompetition() {
	const [loading, setLoading] = useState(false);
	const [submition, setSubmition] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const { Countdown } = Statistic;

	useEffect(() => {
		setLoading(true);
		// Call API get data
		const fetchedSubmission = {
			questions: [
				{
					submissionDetailId: 1,
					content: 'Câu hỏi 1',
					typeCode: 'multiple_choice',
					answers: [
						{ answer: 'A', checked: false },
						{ answer: 'B', checked: false },
						{ answer: 'C', checked: false },
						{ answer: 'D', checked: false },
					],
				},
				{
					submissionDetailId: 2,
					content: 'Câu hỏi 2',
					typeCode: 'single_choice',
					answers: [
						{ answer: 'A', checked: false },
						{ answer: 'B', checked: false },
						{ answer: 'C', checked: false },
						{ answer: 'D', checked: false },
					],
				},
				{
					submissionDetailId: 3,
					content: 'Câu hỏi 3',
					typeCode: 'single_choice',
					answers: [
						{ answer: 'A', checked: false },
						{ answer: 'B', checked: false },
						{ answer: 'C', checked: false },
						{ answer: 'D', checked: false },
					],
				},
			],
		};

		setSubmition(fetchedSubmission);
		setLoading(false);
	}, []);

	const handleRadioChange = (submissionDetailId, answer, typeCode, index) => {
		console.log(submissionDetailId, answer, typeCode, index);
	};

	const handleNextQuestion = useCallback(() => {
		setCurrentQuestionIndex((prevIndex) => {
			if (prevIndex < submition.questions.length - 1) {
				return prevIndex + 1;
			}
			return prevIndex;
		});
	}, [submition]);

	if (loading) {
		return <Loading />;
	}

	if (!submition) {
		return null;
	}

	const currentQuestion = submition.questions[currentQuestionIndex];

	return (
		<div className="submitcompetition">
			<div className='header-submit'>
				<Countdown
					title="Thời gian còn lại"
					value={Date.now() + 30 * 1000}
					onFinish={handleNextQuestion}
					key={currentQuestionIndex} // Ensure countdown restarts on question change
				/>
				<button onClick={handleNextQuestion}>Nộp bài</button>
			</div>
			<div className="question-container">
				<div key={currentQuestion.submissionDetailId} className="item-question">
					<div>
						<strong style={{ margin: '16px 15px 0 15px' }}>Câu hỏi {currentQuestionIndex + 1}: </strong>
						<div
							className="quest-content"
							dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
							style={{ marginTop: '15px' }}
						/>
					</div>
					<div className="answer-content">
						{currentQuestion.typeCode !== 'essay' &&
							currentQuestion.answers.map((answer, index) => (
								<div key={index} className="answer">
									{currentQuestion.typeCode === 'multiple_choice' ? (
										<>
											<input
												type="checkbox"
												name={`question_${currentQuestion.submissionDetailId}`}
												defaultChecked={answer.checked ? true : false}
												onChange={() =>
													handleRadioChange(
														currentQuestion.submissionDetailId,
														answer.answer,
														currentQuestion.typeCode,
														index
													)
												}
											/>
											{answer.answer}
										</>
									) : (
										<>
											<input
												type="radio"
												name={`question_${currentQuestion.submissionDetailId}`}
												defaultChecked={answer.checked ? true : false}
												onChange={() =>
													handleRadioChange(
														currentQuestion.submissionDetailId,
														answer.answer,
														currentQuestion.typeCode,
														index
													)
												}
											/>
											{answer.answer}
										</>
									)}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
