import { selectselectsubmition } from '../../../../redux/Exam';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { url } from '../../../../constants/Constant';
import Api from '../../../../api/Api';
import { CountdownProps } from 'antd';
import { Col, Row, Statistic, Skeleton } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
//import './Submit.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Loading from '../../../../components/Loading';
import { selectsubmition, selectexam, selectquestionChoose, deletequestionChoose } from '../../../../redux/Exam';
import Editor from '../../../home/components/Editor';
export default function Submit() {
	const [submition, setsubmition] = useState();
	const user = JSON.parse(localStorage.getItem('user'));
	console.log(user);
	const navigate = useNavigate();
	const { Countdown } = Statistic;
	const { id } = useParams();
	const [targetTime, setTargetTime] = useState();
	const [loading, setloading] = useState(false);
	const [iscreate, setiscreate] = useState(false);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const dispatch = useDispatch();
	const typesubmit = localStorage.getItem('typesubmit');
	const [submissionDetailId, setsubmissionDetailId] = useState();
	const [data, setData] = useState('');
	const [mark, setMark] = useState("");
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
					setTimeout(() => {
						window.history.back();
					}, 3000);
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
		//dispatch(selectquestionChoose())
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		if (typesubmit === 'create' && !iscreate) {
			Api.post(url + 'api/v1/submissions/create?examId=' + id + '', { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setsubmition(response.data.result);
						localStorage.setItem('submissionId', response.data.result.submissionId);
						setTargetTime(Number(localStorage.getItem('duration')) * 60 * 1000);
						dispatch(selectexam(response.data.result.questions));
						localStorage.setItem('typesubmit', 'continue');

						setiscreate(true);
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error('Lỗi! không thể mở bài kiểm tra. Vui lòng quay lại sau	');
					console.log(error);
				});
		}
		if (typesubmit === 'continue') {
			const submissionId = localStorage.getItem('submissionId');
			Api.get(url + 'api/v1/submissions/continue/' + submissionId, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setsubmition(response.data.result);
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

		if (typesubmit === 'review') {
			Api.get(url + `api/v1/submission-details/detail/${localStorage.getItem('submissionId')}`, {
				headers: headers,
			})
				.then((response) => {
					if (response.data.success === true) {
						const data = response.data.result.submissionDetail;
						let listAnserchonsed = [];
						const newdata = data.map((item) => {
							let correctAnswerArray = [];
							if (item.correctAnswer !== null) {
								correctAnswerArray = item.correctAnswer.split(',');
							}

							let userAnswerArray = [];
							if (item.userAnswer !== null) { 
								if(item.typeCode === 'essay'){
									userAnswerArray = [item.userAnswer];
								}else{
								userAnswerArray = item.userAnswer.split(',');
								}
								listAnserchonsed = [...listAnserchonsed, { id: item.id, answer: item.userAnswer }];
							}

							return {
								...item,
								correctAnswer: correctAnswerArray,
								userAnswer: userAnswerArray,
							};
						});
						setsubmissionDetailId(newdata);
						dispatch(selectexam(newdata));
						dispatch(selectquestionChoose(listAnserchonsed));

						console.log(newdata);
					} else {
						toast.error(response.data.message);
						setTimeout(() => {
							window.history.back();
						}, 3000);
					}
				})
				.catch((error) => {
					window.history.back();
				});
		}
	}, []);

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
				console.log(oldSelectedAnswers);
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
		console.log(oldSelectedAnswers);
		console.log(selectedAnswers);
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
					console.log('cập nhật thành công');
					dispatch(selectquestionChoose(data));
				} else {
					console.log('cập nhật thất bại');
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
					console.log('xóa thành công');
					dispatch(deletequestionChoose({ id: questionId }));
				} else {
					console.log('xóa thất bại');
				}
			});
		}
	};

	const handleEditorChange = (value) => {
		console.log(value);
		setData(value);
	};
	const handleEditorCancel = () => {
		setData('');
	};
const postMark= (id) => {
setloading(true);
const data = {
	mark: Number(mark),
	submissionDetailId: id,
	}
	let headers= {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),	
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	}
	Api.post(url + 'api/v1/submission-details/mark', data, {headers: headers})
	.then((response) => {
		if (response.data.success === true) {
			toast.success('Chấm điểm thành công');
		} else {
			toast.error(response.data.message);

		}
	})
	.catch((error) => {
		toast.error(error);
	})
	.finally(() => {
		setloading(false);
	});


console.log(id, mark);
}
	return (
		<div className="submit-sipn" style={{ width: '72vw' }}>
			{submition === null && typesubmit !== 'review' ? (
				<Skeleton active />
			) : typesubmit === 'create' || typesubmit === 'continue' ? (
				<div>
					<Countdown title="Thời gian còn lại" value={Date.now() + targetTime} onFinish={onFinish} />
					{loading ? <Loading /> : null}
					{submition &&
						submition.questions.length > 0 &&
						submition.questions.map((question, index) => (
							<div key={question.submissionDetailId} className="item-question">
								<div>
									<strong style={{ margin: '16px 15px 0 15px' }}>Câu hỏi {index + 1}: </strong>
									<div
										className="quest-content"
										dangerouslySetInnerHTML={{ __html: question.content }}
										style={{ marginTop: '15px' }}
									/>
								</div>

								<div>
									{question.typeCode === 'essay' ? (
										<>
											<Editor
												data={data}
												editcontent={handleEditorChange}
												cancel={handleEditorCancel}
												isQuiz={true}
											/>
											<button
												onClick={() =>
													handleRadioChange(
														question.submissionDetailId,
														data,
														question.typeCode
													)
												}
											>
												Lưu đáp án
											</button>
										</>
									) : null}
									{question.typeCode !== 'essay' &&
										question.answers.map((answer, index) => (
											<label key={index}>
												{question.typeCode === 'multiple_choice' ? (
													<>
														<input
															type="checkbox"
															name={`question_${question.submissionDetailId}`}
															defaultChecked={answer.checked ? true : false}
															style={{
																width: '15px',
																height: '15px',
																marginRight: '10px',
															}}
															onChange={() =>
																handleRadioChange(
																	question.submissionDetailId,
																	answer.answer,
																	question.typeCode,
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
															name={`question_${question.submissionDetailId}`}
															defaultChecked={answer.checked ? true : false}
															style={{
																width: '15px',
																height: '15px',
																marginRight: '10px',
															}}
															onChange={() =>
																handleRadioChange(
																	question.submissionDetailId,
																	answer.answer,
																	question.typeCode,
																	index
																)
															}
														/>
														{answer.answer}
													</>
												)}
											</label>
										))}
								</div>
							</div>
						))}
					<button onClick={onFinish}>Nộp bài</button>
				</div>
			) : null}

			{typesubmit === 'review' && user.role === 'STUDENT' ? (
				<div>
					{submissionDetailId && submissionDetailId.length > 0 ? (
						<div>
							<h4>Kết quả làm bài của bạn</h4>
							{submissionDetailId.map((item, index) => (
								<div
									style={{
										backgroundColor: 'aliceblue',
										marginBottom: '15px',
										paddingLeft: '15px',
										paddingBottom: '15px',
									}}
								>
									<div style={{ display: 'flex' }}>
										<strong style={{ margin: '16px 15px 0 15px' }}>Câu hỏi {index + 1}: </strong>
										<div
											className="quest-content"
											dangerouslySetInnerHTML={{ __html: item.question }}
											style={{ marginTop: '15px' }}
										/>
									</div>
									<div style={{ display: 'flex', marginLeft: '20px', marginBottom: '15px' }}>
										<strong>Đáp án của bạn: </strong>
										{item.correctAnswer[0] === 'Câu hỏi tự luận điểm do giáo viên chấm !!!' ? (
											<div dangerouslySetInnerHTML={{ __html: item.userAnswer[0] }} />
										) : (
											<div style={{ marginLeft: '15px' }}>
												{item.userAnswer.map((answer) => (
													<div>{answer}</div>
												))}
											</div>
										)}
									</div>

									<div style={{ display: 'flex', marginLeft: '20px', marginBottom: '15px' }}>
										<strong>Đáp án đúng: </strong>
										{
											<div style={{ marginLeft: '15px' }}>
												{item.correctAnswer.map((answer) => (
													<div>{answer}</div>
												))}
											</div>
										}
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
			) : null}
			{typesubmit === 'review' && user.role === 'TEACHER' ? (
				<div>
					{submissionDetailId && submissionDetailId.length > 0 ? (
						<div>
							<h4>Bài làm của học sinh</h4>
							{submissionDetailId.map((item, index) => (
								<div
									style={{
										backgroundColor: 'aliceblue',
										marginBottom: '15px',
										paddingLeft: '15px',
										paddingBottom: '15px',
									}}
								>
									<div style={{ display: 'flex' }}>
										<strong style={{ margin: '16px 15px 0 15px' }}>Câu hỏi {index + 1}: </strong>
										<div
											className="quest-content"
											dangerouslySetInnerHTML={{ __html: item.question }}
											style={{ marginTop: '15px' }}
										/>
									</div>
									<div style={{ display: 'flex', marginLeft: '20px', marginBottom: '15px' }}>
										<strong>Đáp án được trả lời: </strong>
										{item.correctAnswer[0] === 'Câu hỏi tự luận điểm do giáo viên chấm !!!' ? (
											<div dangerouslySetInnerHTML={{ __html: item.userAnswer[0] }} />
										) : (
											<div style={{ marginLeft: '15px' }}>
												{item.userAnswer.map((answer) => (
													<div>{answer}</div>
												))}
											</div>
										)}
									</div>

									<div style={{ display: 'flex', marginLeft: '20px', marginBottom: '15px' }}>
										{item.correctAnswer[0] !== 'Câu hỏi tự luận điểm do giáo viên chấm !!!' ? (
											<>
												<strong>Đáp án đúng: </strong>
												{
													<div style={{ marginLeft: '15px' }}>
														{item.correctAnswer.map((answer) => (
															<div>{answer}</div>
														))}
													</div>
												}
											</>
										) : (
											<div style={{ display: 'flex', marginBottom: '15px' }}>
												<strong>Điểm: </strong>
												<input style={{ marginLeft: '15px' }} 
												onChange={(e)=>setMark(e.target.value)}/>
												 <button onClick={() => postMark(item.id)}>Chấm điểm</button>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
			) : null}

			<ToastContainer />
		</div>
	);
}
