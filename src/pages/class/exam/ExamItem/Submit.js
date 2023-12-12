import { selectselectsubmition } from '../../../../redux/Exam';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { url } from '../../../../constants/Constant';
import Api from '../../../../api/Api';
import { toast, ToastContainer } from 'react-toastify';
import './Submit.css';
export default function Submit() {
	const [submition, setsubmition] = useState();
	const { id } = useParams();

	useEffect(() => {
		const typesubmit = localStorage.getItem('typesubmit');

		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		if (typesubmit === 'create') {
			Api.post(url + 'api/v1/submissions/create?examId=' + id + '', { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setsubmition(response.data.result);
						localStorage.removeItem('typesubmit');
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error.data.message);
				});
		}
		if (typesubmit === 'continue') {
			const submissionId = localStorage.getItem('submissionId');
			Api.get(url + 'api/v1/submissions/continue/' + submissionId, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setsubmition(response.data.result);
						localStorage.removeItem('submissionId');
						localStorage.removeItem('typesubmit');
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error.data.message);
				});
		}
	}, []);
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
		<div className="submit">
			{submition.questions.length > 0 &&
				submition.questions.map((question) => (
					<div key={question.submissionDetailId} className="item-question">
						<div className="quest-content" dangerouslySetInnerHTML={{ __html: question.content }} />

						<div>
							{question.answers.map((answer, index) => (
								<label key={index}>
									{question.typeCode === 'multiple_choice' ? (
										<input
											type="checkbox"
											name={`question_${question.submissionDetailId}`}
											checked={selectedAnswers[question.submissionDetailId] === index}
											style={{ width: '15px', height: '15px', marginRight: '10px' }}
											onChange={() => handleRadioChange(question.submissionDetailId, index)}
										/>
									) : (
										<input
											type="radio"
											name={`question_${question.submissionDetailId}`}
											checked={selectedAnswers[question.submissionDetailId] === index}
											style={{ width: '15px', height: '15px', marginRight: '10px' }}
											onChange={() => handleRadioChange(question.submissionDetailId, index)}
										/>
									)}

									{answer.answer}
								</label>
							))}
						</div>
					</div>
				))}
			<button onClick={handleSubmit}>Submit</button>
			<ToastContainer />
		</div>
	);
}
