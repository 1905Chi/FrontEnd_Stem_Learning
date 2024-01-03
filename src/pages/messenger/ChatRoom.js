import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { Avatar, Badge, Button, Form, Input, List, Popover, Space, Spin, Tooltip, Typography } from 'antd';
import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { HiArrowSmallDown, HiFaceSmile, HiPaperAirplane, HiPaperClip, HiPlus } from 'react-icons/hi2';
import InfiniteScroll from 'react-infinite-scroll-component';
import { conversationConfig } from './utils/conversationConfig';
import { useDropzone } from 'react-dropzone';
import MessageItem from './MessageItem';
import './Message.css';
import { Call, CameraEnhance, InfoOutlined } from '@material-ui/icons';
import { Modal } from 'antd';
import useTheme from '../../context/ThemeContext';
import moment from 'moment';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';

var stompClient = null;
const ChatRoom = ({ user, data, Toggeinfo, currentUser }) => {
	const [form] = Form.useForm();
	const { theme } = useTheme();
	const files = Form.useWatch('files', form);
	const [messages, setMessages] = useState(new Map());
	const [info, setInfo] = useState(false);
	const [page, setPage] = useState(0);
	const checkGroup = data?.name ? true : false;
	const [hasMore, setHasMore] = useState(false);

	const handleClickInfo = () => {
		setInfo(!info);
		Toggeinfo(info);
	};

	const loadMore = async () => {
		try {
			// Tăng trang để tải dữ liệu mới
			const nextPage = page + 1;

			if (checkGroup) {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				};
				const response = await Api.get(
					url + `api/v1/chat-messages/get-message-from-group?groupId=${data?.id}&page=${nextPage}&size=20`,
					{ headers: headers }
				);
				if (response.data.statusCode === 200) {
					messages.get(data?.id).push(...response.data?.result.messages);
					if (response.data.result?.currentElements < 20) {
						setHasMore(false);
					} else {
						setHasMore(true);
					}
					setMessages(new Map(messages.entries()));
				} else {
					console.log(response.error);
				}
			} else {
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				};
				const response = await Api.get(
					url + `api/v1/chat-messages/get-message-from-user?friendId=${data?.id}&page=${nextPage}&size=20`,
					{ headers: headers }
				);
				if (response.data.statusCode === 200) {
					messages.get(data?.id).push(...response.data.result.messages);
					if (response.data.result?.currentElements < 20) {
						setHasMore(false);
					} else {
						setHasMore(true);
					}
					setMessages(new Map(messages.entries()));
				} else {
					console.log(response.error);
				}
			}
			setPage(nextPage);
		} catch (error) {
			console.log('Error loading more data:', error.message);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (data?.id && !messages.get(data?.id) && data?.name === undefined) {
				setPage(0);
				// const res = await MessageApi.getMessage({ userId: data.userId, page: page, size: 20 });
				// if (res) {
				// 	privateChats.set(data.userId, res.result);
				// 	setPrivateChats(new Map(privateChats));
				// }

				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				};
				const response = await Api.get(
					url + `api/v1/chat-messages/get-message-from-user?friendId=${data?.id}&page=0&size=20`,
					{ headers: headers }
				);
				if (response.data.statusCode === 200) {
					messages.set(data?.id, response.data.result.messages);
					if (response.data.result?.currentElements < 20) {
						setHasMore(false);
					} else {
						setHasMore(true);
					}
					setMessages(new Map(messages.entries()));
				} else {
					console.log(response.error);
				}
			}
			if (data?.id && !messages.get(data?.id) && data?.name !== undefined) {
				// const res = await MessageApi.getMessageGroup({ groupId: data?.postGroupId, page: page, size: 20 });
				// if (res) {
				// 	publicChats.set(data?.postchatRoomId, res.result);
				// 	setPublicChats(new Map(publicChats));
				// }
				setPage(0);
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				};
				const response = await Api.get(
					url + `api/v1/chat-messages/get-message-from-group?groupId=${data?.id}&page=0&size=20`,
					{ headers: headers }
				);
				if (response.data.statusCode === 200) {
					messages.set(data?.id, response.data.result.messages);
					if (response.data.result?.currentElements < 20) {
						setHasMore(false);
					} else {
						setHasMore(true);
					}
					setMessages(new Map(messages.entries()));
				} else {
					console.log(response.error);
				}
			}
		};

		const onMessageReceived = (payload) => {
			var payloadData = JSON.parse(payload.body);
			console.log('payloadData', payloadData);
			if (payloadData?.chatRoomId && payloadData?.chatRoomId !== 'null') {
				//trường hợp gửi react thì chỉnh sửa trong mảng

				if (messages.get(payloadData.chatRoomId)) {
					if (payloadData?.isDeleted) {
						console.log('createdAt', payloadData?.createdAt);
						console.log('messageSender', messages.get(payloadData.chatRoomId));
						const index = messages
							.get(payloadData.chatRoomId)
							.findIndex((item) => item?.createdAt === payloadData?.createdAt);
						console.log('index', index);
						if (index !== -1) {
							messages.get(payloadData.chatRoomId)[index] = payloadData;
							setMessages(new Map(messages.entries()));
						}
					} else {
						if (payloadData?.isReact) {
							//tìm tin nhắn thông qua createdAt và chỉnh sửa trong mảng
							console.log('createdAt', payloadData?.createdAt);
							console.log('messageSender', messages.get(payloadData.chatRoomId));
							const index = messages
								.get(payloadData.chatRoomId.toString())
								.findIndex((item) => item?.createdAt === payloadData?.createdAt);
							console.log('index', index);
							if (index !== -1) {
								if (
									messages.get(payloadData.chatRoomId)[index].react === null ||
									messages.get(payloadData.chatRoomId)[index].react === undefined ||
									messages.get(payloadData.chatRoomId)[index].react.length === 0
								) {
									console.log(
										'messages.get(needId)[index].react',
										messages.get(payloadData.chatRoomId)[index].react
									);
									messages.get(payloadData.chatRoomId)[index].react = [payloadData];
								} else {
									const react = messages.get(payloadData.chatRoomId)[index].react;
									let checkReact = true;
									react.map((item) => {
										if (item.reactUser === payloadData.reactUser) {
											checkReact = false;
											if (item.react === payloadData.react) {
												console.log('xóa react');
												//xóa react
												react.splice(react.indexOf(item), 1);
											} else {
												console.log('thay đổi react');
												//thay đổi react
												item.react = payloadData.react;
											}
										}
									});
									if (checkReact) {
										console.log('thêm react');
										react.push(payloadData);
									}
									console.log('react', react);
									messages.get(payloadData.chatRoomId)[index].react = react;
								}
								setMessages(new Map(messages.entries()));
							}
						} else {
							console.log('createdAt', payloadData?.createdAt);
							console.log('messageSender', messages.get(payloadData.chatRoomId));
							messages.get(payloadData.chatRoomId).unshift(payloadData);
							setMessages(new Map(messages.entries()));
						}
					}
				}
			} else {
				if (payloadData?.isDeleted) {
					const index = messages
						.get(payloadData.senderId)
						.findIndex((item) => item?.createdAt === payloadData?.createdAt);
					if (index !== -1) {
						messages.get(payloadData.senderId)[index] = payloadData;
						setMessages(new Map(messages.entries()));
					}
				} else {
					if (payloadData?.isReact) {
						const needId =
							payloadData.senderId === currentUser?.userId
								? payloadData.receiverId
								: payloadData.senderId;
						console.log('createdAt', payloadData?.createdAt);
						console.log('needId', needId);
						console.log('messageSender', messages);

						const index = messages
							.get(needId)
							.findIndex((item) => item?.createdAt === payloadData?.createdAt);
						console.log('index', index);
						if (index !== -1) {
							if (
								messages.get(needId)[index].react === null ||
								messages.get(needId)[index].react === undefined ||
								messages.get(needId)[index].react.length === 0
							) {
								console.log('messages.get(needId)[index].react', messages.get(needId)[index].react);
								messages.get(needId)[index].react = [payloadData];
							} else {
								const react = messages.get(needId)[index].react;
								let checkReact = true;
								react.map((item) => {
									if (item.reactUser === payloadData.reactUser) {
										checkReact = false;
										if (item.react === payloadData.react) {
											console.log('xóa react');
											//xóa react
											react.splice(react.indexOf(item), 1);
										} else {
											console.log('thay đổi react');
											//thay đổi react
											item.react = payloadData.react;
										}
									}
								});
								if (checkReact) {
									console.log('thêm react');
									react.push(payloadData);
								}
								console.log('react', react);
								messages.get(needId)[index].react = react;
							}

							setMessages(new Map(messages.entries()));
						}
					} else {
						console.log('createdAt', payloadData?.createdAt);
						console.log('messageSender', messages.get(payloadData.senderId));
						messages.get(payloadData.senderId).unshift(payloadData);
						setMessages(new Map(messages.entries()));
					}
				}
			}
		};
		const onConnected = () => {
			if (data?.id && data?.name === undefined) {
				stompClient.subscribe('/user/' + user?.id + '/private', onMessageReceived);
			} else if (data?.name) {
				stompClient.subscribe('/chatroom/room/' + data?.id, onMessageReceived);
			}
		};
		// kieerm tra data !== {} thi moi chay
		fetchData();

		if (data?.id) {
			let Sock = new SockJS('http://localhost:9000/ws');
			stompClient = over(Sock);
			stompClient.connect({}, onConnected, (err) => console.log(err));
		}

		return async () => {
			if (stompClient !== null) {
				await stompClient.disconnect();
			}
			console.log('Disconnected');
			setPage(0);
		};
	}, [data, user?.id]);

	// useEffect(() => {
	// 	const fetchGroup = async () => {
	// 		const res = await PostGroupApi.listMemberGroup({ user: currentUser, postId: data?.postGroupId });
	// 		setMemberGroup(res.result);
	// 	};
	// 	fetchGroup();
	// }, [currentUser, data]);

	const textInputRef = useRef(null);

	const sendMessage = (messageData) => {
		form.resetFields();
		setTimeout(() => textInputRef.current?.focus(), 0);
		if (stompClient) {
			if (messageData.content.trim() === '') {
				return; // Tránh gửi tin nhắn trống
			}
			let msgPlaceholder;
			if (data?.name) {
				msgPlaceholder = {
					senderId: user.id,
					senderAvatar: user?.avatar,
					senderName: user?.userName,
					chatRoomId: data?.id,
					content: messageData.content,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					isDeleted: false,
				};
			} else {
				msgPlaceholder = {
					senderId: user.id,
					senderAvatar: user?.avatar,
					senderName: user?.userName,
					receiverId: data?.id,
					content: messageData.content,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					isDeleted: false,
				};
			}

			console.log('msgPlaceholder', msgPlaceholder);
			try {
				console.log('data', data);
				if (data?.name === undefined) {
					stompClient.send('/app/private-message', {}, JSON.stringify(msgPlaceholder));
					const date = moment(msgPlaceholder.createdAt);

					// Convert ngày giờ sang múi giờ UTC
					const utcDate = date.utc();
					msgPlaceholder.createdAt = utcDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
					msgPlaceholder.updatedAt = utcDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
					messages.get(data?.id).unshift(msgPlaceholder);
					setMessages(new Map(messages.entries()));
					// private String id;
					// private String receiverId;
					// private String avatarUrl;
					
					// private String postId;
					// private String commentId;
					// private String groupId;
					// private String chatRoomId;
					
					// private String content;
					// private String refUrl;
					// private Boolean isReaded;
					
					// private Date createdAt;
					// private Date updatedAt;
					if (user.id !== data?.id) {
						const dataMessage = {
							receiverId: data?.id,
							avatarUrl: user?.avatar,
							postId: null,
							commentId: null,
							groupId: null,
							chatRoomId: null,							
							content: `${user?.firstName} ${user?.lastName} đã gửi tin nhắn cho bạn`,
							refUrl: `/messenger/u/${user?.id}`,
							isReaded: false,
							createdAt: new Date(),
						};
						stompClient.send('/app/userNotify/' + user?.id, {}, JSON.stringify(dataMessage));
					}
				} else {
					console.log('data', data);
					data.members.map((member) => {
						if (member.id !== user?.id) {
							const dataMessage = {
								receiverId: member.id,
								avatarUrl: data?.avatarUrl,
								postId: null,
								commentId: null,
								groupId: null,
								chatRoomId: data?.id,
								content: `${user?.firstName} ${user?.lastName} đã gửi tin nhắn cho nhóm ${data?.name}`,
								refUrl: `/messenger/g/${data?.id}`,
								isReaded: false,
								createdAt: new Date(),
							};
							stompClient.send('/app/userNotify/' + member.id, {}, JSON.stringify(dataMessage));
						}
					});

					stompClient.send('/app/room-message/' + data?.id, {}, JSON.stringify(msgPlaceholder));
				}
			} catch (error) {
				messages.get(data?.id).unshift({
					...messageData,
					error: 'Mạng yếu, vui lòng thử lại sau',
				});
				console.log('error', error);
				// setMessages(new Map(messages));
				setMessages(new Map(messages.entries()));
			}
		}
	};

	const bottomRef = useRef(null);
	const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	useEffect(() => {
		// Scroll
		const msgHistoryEl = document.getElementById('messages-history');
		const scrollDownBtnEl = document.getElementById('scroll-down-btn');

		const handleScroll = (e) => {
			const { scrollTop } = e.target;

			if (scrollDownBtnEl) {
				const classList = scrollDownBtnEl.classList;
				if (scrollTop < -200) {
					if (!classList.contains('show')) classList.add('show');
				} else {
					if (classList.contains('show')) classList.remove('show');
				}
			}
		};
		msgHistoryEl?.addEventListener('scroll', handleScroll);

		return () => {
			msgHistoryEl?.removeEventListener('scroll', handleScroll);
		};
	}, []);
	const inputFilesRef = useRef(null);

	const onDropAccepted = (acceptedFiles) => {
		form.setFieldValue('files', acceptedFiles);
	};

	const onDropRejected = (rejectedFiles) =>
		Modal.error({
			title: 'File không hợp lệ',
			content: (
				<List
					bordered
					size="small"
					dataSource={rejectedFiles}
					renderItem={(item) => {
						const error = item.errors.pop();
						return (
							<List.Item>
								<List.Item.Meta
									title={item.file.name}
									description={
										<Typography.Text type="danger" strong>
											{error?.message || 'Lỗi không xác định'}
										</Typography.Text>
									}
								/>
							</List.Item>
						);
					}}
				/>
			),
		});

	const dropzone = useDropzone({ onDropAccepted, onDropRejected, ...conversationConfig.dropzone });

	const { getRootProps, getInputProps, isDragAccept, isDragReject } = dropzone;

	const emitTyping = () => {};

	// listen typing event from socket io
	const [typingList, setTypingList] = useState([]);

	return (
		<div className="chatroom">
			<div className="header--chatroom">
				<div className="header--chatroom--left">
					<img src={data?.avatarUrl || 'https://img.icons8.com/ios/50/user--v1.png'} alt="avatar" />
					<div>
						<div className="name--message--sidebar">{data?.firstName ? `${data.firstName} ${data.lastName}` : data?.name}</div>
								{/* <div className="content--message--sidebar">{data?.status === undefined ? null : data.status === 'ONLINE' ? (
							<span>Đang hoạt động</span>
						) : (
							<span>{`Hoạt động lần cuối từ ${data.lastOnline}`}</span>
						)}</div> */}
					</div>
				</div>
				<div className="header--chatroom--right">
					<Call className="header--chatroom--right--icon" />
					<CameraEnhance className="header--chatroom--right--icon" />
					<InfoOutlined
						titleAccess="Thông tin về cuộc trò chuyện"
						className="header--chatroom--right--icon"
						onClick={handleClickInfo}
					/>
				</div>
			</div>
			<Form
				className="container--chatroom"
				form={form}
				onFinish={sendMessage}
				initialValues={{ files: '', text: '' }}
			>
				<div className="history" {...getRootProps()}>
					<div className="history_content" id="messages-history">
						<InfiniteScroll
							scrollableTarget="messages-history"
							dataLength={messages.get(data?.id)?.length || 0}
							style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'hidden' }}
							next={loadMore}
							hasMore={hasMore}
							inverse={true}
							loader={<Spin style={{ margin: '8px auto' }} />}
							endMessage={
								<Space
									direction="vertical"
									style={{ width: 'fit-content', margin: 'auto' }}
									align="center"
								>
									<img
										className="iamge_end"
										src={data?.avatarUrl || 'https://img.icons8.com/ios/50/user--v1.png'}
										alt="haha"
									/>
									<Typography.Title
										style={{ margin: 0, color: theme.foreground, background: theme.background }}
										level={4}
									>
										{data?.firstName ? `${data.firstName} ${data.lastName}` : data?.name}
									</Typography.Title>

									<Typography.Text
										style={{ color: theme.foreground, background: theme.background }}
										type="secondary"
									>
										Đây là đoạn chat của bạn với {data?.firstName ? `${data.firstName} ${data.lastName}` : data?.name}
									</Typography.Text>
								</Space>
							}
						>
							{/* Bottom ref */}
							<div ref={bottomRef} />
							{data?.id &&
								messages.get(data?.id) &&
								[...messages.get(data?.id)].map((item, index) => (
									<MessageItem
										key={item.createdAt + index}
										currentUser={user}
										message={item}
										stompClient={stompClient}
										isOwner={item.senderId === user?.id}
										onRetry={() => sendMessage(item)}
									/>
								))}
						</InfiniteScroll>
					</div>

					<Button
						shape="circle"
						icon={<HiArrowSmallDown />}
						onClick={scrollToBottom}
						className={'scroll_down'}
						id="scroll-down-btn"
					/>

					<Space className={classnames('typing', { show: typingList.length > 0 })}>
						<Avatar.Group maxCount={3} size="small" className="typing_list">
							{typingList.map(({ user, nickname }) => (
								<img
									src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
									alt="haha"
								/>
							))}
						</Avatar.Group>

						<Typography.Text type="secondary" className={'typing_text'}>
							đang soạn tin...
						</Typography.Text>
					</Space>

					<div
						className={'dropzone'}
						style={{
							zIndex: isDragAccept || isDragReject ? 1 : -1,
							opacity: isDragAccept || isDragReject ? 1 : 0,
						}}
					>
						<Form.Item name="files" hidden />
						<input {...getInputProps()} ref={inputFilesRef} />
						<div className={'dropzone_content'}>
							<Typography.Text strong>Gửi file</Typography.Text>

							<Typography.Text type="secondary">Thả file vào đây để gửi</Typography.Text>
						</div>
					</div>
				</div>

				<div className="footer--chatroom">
					<Space className="input">
						<Form.Item
							style={{ flex: 1 }}
							name="content"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập tin nhắn',
								},
							]}
							noStyle
						>
							<Input.TextArea
								style={{ flex: 1, color: theme.foreground, background: theme.background }}
								placeholder="Nhập tin nhắn"
								autoSize={{ maxRows: 5 }}
								bordered={false}
								onPressEnter={(e) => {
									if (e.shiftKey) return;

									const text = e.currentTarget.value?.trim();
									if (!text) return;

									e.preventDefault();
									form.submit();
								}}
								ref={textInputRef}
								onKeyDown={emitTyping}
							/>
						</Form.Item>

						<Tooltip title="Thêm icon">
							<Button shape="circle" icon={<HiFaceSmile />} />
						</Tooltip>

						<Popover
							title={
								<Space align="center" style={{ width: '100%' }}>
									<Typography.Text strong>Đính kèm</Typography.Text>

									<Tooltip title="Thêm file">
										<Button
											shape="circle"
											size="small"
											onClick={() => inputFilesRef.current?.click()}
											icon={<HiPlus />}
											style={{ marginLeft: 'auto' }}
										/>
									</Tooltip>
								</Space>
							}
							content={
								<List
									className={'file_list'}
									size="small"
									bordered
									dataSource={files}
									renderItem={(file) => (
										<List.Item
											extra={
												<Button
													shape="circle"
													icon={<HiX />}
													size="small"
													onClick={() => {
														const files = form.getFieldValue('files');
														form.setFieldValue(
															'files',
															files.filter((f) => f !== file)
														);
													}}
												/>
											}
										>
											<List.Item.Meta title={file.name} />
										</List.Item>
									)}
								/>
							}
							trigger={['click']}
						>
							<Tooltip title="Đính kèm">
								<Badge count={files?.length}>
									<Button shape="circle" icon={<HiPaperClip />} />
								</Badge>
							</Tooltip>
						</Popover>

						<Tooltip title="Gửi">
							<Button shape="circle" icon={<HiPaperAirplane />} htmlType="submit" />
						</Tooltip>
					</Space>
				</div>
			</Form>
		</div>
	);
};

export default ChatRoom;
