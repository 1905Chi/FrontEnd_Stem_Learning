import React, { useState, useEffect, useCallback } from 'react';
import { Statistic } from 'antd';
import Loading from '../../../components/Loading';
import './SubmitCompetition.css'; // Đảm bảo import đúng file CSS của bạn
import { useDispatch, useSelector } from 'react-redux';
import { selectexam, selectquestionChoose, deletequestionChoose } from '../../../redux/Exam';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { toast,ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import moment from 'moment';


export default function SubmitCompetition() {
	const [loading, setloading] = useState(false);
	const [submition, setSubmition] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const { Countdown } = Statistic;
	const typesubmit = localStorage.getItem('typesubmit');
	const [iscreate, setiscreate] = useState(false);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const dispatch = useDispatch();
	const [targetTime, setTargetTime] = useState(0);
	const { uuid,id } = useParams();

	const [currentQuestion,setCurrentQuestion]= useState();
	const onFinish = () => {
		setloading(true);
		Api.post(url + 'api/v1/submissions/submit?submissionId=' + localStorage.getItem('submissionId'), {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			},
		})
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Đã nộp bài cho hệ thống chấm điểm');
					window.history.back();
				}
			})
			.catch((error) => {
				toast.error(error);
			})
			.finally(() => {
				setloading(false);
			});
	};
	useEffect(() => {
		callQuiz();
	}, [typesubmit]);

	const callQuiz = async () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		if (typesubmit === 'create' && !iscreate) {
			Api.post(url + 'api/v1/submissions/create?examId=' + id + '', { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setSubmition(response.data.result);
						localStorage.setItem('submissionId', response.data.result.submissionId);
						setCurrentQuestion(response.data.result.questions[0]);
						setTargetTime(Number(localStorage.getItem('duration')) * 60 * 1000);
						
						localStorage.setItem('typesubmit', 'continue');

						setiscreate(true);
					} else {
						
						toast.error(response.data.message);
						
					}
				})
				.catch((error) => {
						toast.error('Bạn đã thực hoàn thành bài thi này. Không được phép làm lại');			
					window.history.back();
					
				});
		}
		if (typesubmit === 'continue') {
			const submissionId = localStorage.getItem('submissionId');
			Api.get(url + 'api/v1/submissions/continue/' + submissionId, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setSubmition(response.data.result);
						console.log(response.data.result);
						dispatch(selectexam(response.data.result.questions));
						var oldsubmisstion = [];
						response.data.result.questions.map((item) => {
							var answer = [];
							if (item.answers.length > 0) {
								item.answers.map((answeritem) => {
									if (answeritem.checked && answer !== null) {
										answer.push(answeritem.answer);
									} else if (answeritem.checked && answer === null) {
										answer.push(answeritem.answer);
									}
								});
							}
							if (answer.length > 0) {
								oldsubmisstion.push({ questionId: item.submissionDetailId, answerIndex: answer });
							}
						});
						if (oldsubmisstion.length > 0) {
							setSelectedAnswers(oldsubmisstion);
							//dispatch(selectquestionChoose());
							oldsubmisstion.map((item) => {
								dispatch(
									selectquestionChoose({ id: item.questionId, answer: item.answerIndex.join(',') })
								);
							});
						} else {
							setSelectedAnswers([]);
						}

						var startat = moment(localStorage.getItem('StartAt'), 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
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
						setTargetTime(Number(localStorage.getItem('duration')) * 60 * 1000 - (nowDate - startat));
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error);
				});
		}
	};
	const handleRadioChange = (questionId, answer, typeCode, index) => {
		const oldSelectedAnswers = selectedAnswers;

		if (oldSelectedAnswers.filter((item) => item.questionId === questionId).length === 0) {
			oldSelectedAnswers.push({ questionId: questionId, answerIndex: [answer] });
		} else {
			if (
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.includes(answer) &&
				typeCode === 'multiple_choice'
			) {
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex = oldSelectedAnswers
					.filter((item) => item.questionId === questionId)[0]
					.answerIndex.filter((item) => item !== answer);
			
			} else if (typeCode === 'single_choice') {
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex = [];
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.push(answer);
			} else if (typeCode === 'essay') {
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex[index] = answer;
			} else {
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.push(answer);
			}
		}

		setSelectedAnswers(oldSelectedAnswers);

		if (selectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.length > 0) {
			const data = {
				id: questionId,
				answer: selectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.join(', '),
			};
			Api.put(url + 'api/v1/submission-details/update', data, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
				},
			}).then((response) => {
				if (response) {
		
					dispatch(selectquestionChoose(data));
				} else {
									}
			});
		} else {
			const data = { submissionDetailId: questionId };
			Api.put(url + 'api/v1/submission-details/delete-answer', data, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
				},
			}).then((response) => {
				if (response) {
					
					dispatch(deletequestionChoose({ id: questionId }));
				} else {
					
				}
			});
		}
	};

	const handleNextQuestion = useCallback(() => {
		console.log(currentQuestionIndex)
		console.log(submition.questions[currentQuestionIndex + 1])
		setCurrentQuestionIndex((prevIndex) => {
			if (prevIndex < submition.questions.length - 1) {
				setCurrentQuestion(submition.questions[currentQuestionIndex + 1]);
				return prevIndex + 1;

			} else {
				onFinish();
				return prevIndex;
			}		
		});
		
	}, [currentQuestionIndex, submition]);

	if (loading) {
		return <Loading />;
	}

	if (!submition) {
		return null;
	}
 
	

	return (
		<div className="submitcompetition">
			<div className="header-submit">
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
			<ToastContainer />
		</div>
	);
}
