import React, { useState, useRef, useEffect } from 'react';
import './Main.css';
import { selectselectMessenger } from '../../../redux/Messenger';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { MdFilePresent } from 'react-icons/md';
import { FaRegImage } from 'react-icons/fa';
import EmojiInput from 'react-input-emoji';
export default function Main() {
	const messageItem = useSelector(selectselectMessenger);
	const user = JSON.parse(localStorage.getItem('user'));

	const chatContainer = document.querySelector('.mainMessenger__body');

	const [oldScrollHeight, setoldScrollHeight] = useState(0);
	const [listmessage, setlistmessage] = useState([]);
	const [isScrolling, setIsScrolling] = useState(false);
	const [isLoadMore, setIsLoadMore] = useState(false);
	const [emoji, setEmoji] = useState('');
	const handleEmojiChange = (text) => {
		setEmoji(text);
	};

	
    const [selectedFile, setSelectedFile] = useState(null);
	useEffect(() => {
		setlistmessage([
			{
				idsender: 1,
				avatar: user.avatarUrl,
				name: 'Nguyễn Văn A',
				message: 'Chào bà già giữa trời đông hiu quạnh ' + 1,
			},
			{
				idsender: 1,
				avatar: user.avatarUrl,
				name: 'Nguyễn Văn A',
				message: 'Chào bà già giữa trời đông hiu quạnh ' + 2,
			},
			
			
			
		]);
	}, [messageItem]);
	useEffect(() => {
		if (chatContainer) {
			if (isScrolling === false) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
				setIsScrolling(true);
			} else {
				chatContainer.scrollTop = chatContainer.scrollTop + (chatContainer.scrollHeight - oldScrollHeight);
			}
		}
	}, [listmessage]);

	const handleScroll = () => {
		if (chatContainer) {
			const scrollY = chatContainer.scrollTop; // Lấy vị trí cuộn hiện tại

			// Chiều cao của trang
			const pageHeight = chatContainer.scrollHeight;

			// Tính toán 60% chiều cao
			const sixtyPercentHeight = (pageHeight * 30) / 100;
			if (scrollY < sixtyPercentHeight && isLoadMore === false ) {
				setIsLoadMore(true);
				setoldScrollHeight(pageHeight);

				setTimeout(() => {
					loadMoreMessages();

					// 	chatContainer.scrollTo(0, scrollY);
				}, 100); // Giả định thời gian API call
			}
		}
	};
	const handleKeyDown = (e) => {
		//e.preventDefault();
		// Xử lý dữ liệu đã nhập (emoji) ở đây
		console.log('Emoji đã chọn:', emoji);
		if (e.key === 'Enter') {
			if (emoji !== '') {
				setlistmessage((prevMessages) => [
					{
						idsender: user.id,
						avatar: user.avatarUrl,
						name: 'Nguyễn Văn A',
						message: emoji ,
					},
					...prevMessages,
				]);
				setEmoji('');
			}
		}
	};
    const openChonsePicture = () => {
        document.getElementById('imageInput').click();
    }
    const handlePictureChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				
				setSelectedFile(file);
			};
			reader.readAsDataURL(file);
            console.log(file);
		}

	};
	const loadMoreMessages = () => {
		// Simulate loading more messages

		const oldmess = [];
		for (let i = listmessage.length; i < listmessage.length + 10; i++) {
			oldmess.push({
				idsender: '9d79ed61-420b-443a-9838-66689bd9d0dd',
				avatar: user.avatarUrl,
				name: 'Nguyễn Văn A',
				message: 'Chào bà già giữa trời đông hiu quạnh ' + i + user.id,
			});
		}
		setlistmessage((prevMessages) => [...prevMessages, ...oldmess]);
		setIsLoadMore(false);
	};
	return (
		<div>
			{messageItem ? (
				<div className="mainMessenger">
					<div className="mainMessenger__header">
						<div className="mainMessenger__header__info">
							<Avatar src={user.avatarUrl} alt="avatar" />
							<h3>{messageItem.name}</h3>
						</div>
					</div>
					<div className="mainMessenger__body" onScroll={handleScroll}>
						{listmessage &&
							listmessage.map((item, index) => {
								const message = listmessage[listmessage.length - 1 - index];
								return (
									<div className="mainMessenger__body__item" key={index}>
										{message.idsender !== user.id ? (
											<div className="messenger-item">
												<div className="mainMessenger__body__item__left">
													<Avatar
														src={user.avatarUrl}
														alt="avatar"
														className="avartar-mess"
													/>
												</div>
												<div className="mainMessenger__body__item__right">
													<span>{message.name}</span>
													<p>{message.message}</p>
												</div>
											</div>
										) : (
											<div className="mess-sender">
												<div className="messenger-item-sender">
													<div style={{ display: 'flex', justifyContent: 'end ' }}>
														<div className="mainMessenger__body__item__sender">
															<span>{message.name}</span>
															<p>{message.message}</p>
														</div>
													</div>
													<div className="mainMessenger__body__item__avartar-sender">
														<Avatar
															src={user.avatarUrl}
															alt="avatar"
															className="avartar-mess-sender"
														/>
													</div>
												</div>
											</div>
										)}
									</div>
								);
							})}
					</div>
					<div className="mainMessenger__footer">
						<div className="mainMessenger__footer__input">
						<EmojiInput value={emoji} onChange={handleEmojiChange} placeholder="Nhập tin nhắn" onKeyDown={handleKeyDown} />
							
						</div>
						<MdFilePresent className="icon-file" />
						<FaRegImage className="icon-file"  onClick={openChonsePicture}/>

						<div className="mainMessenger__footer__send">
							<input
								style={{ display: 'none' }}
								type="file"
								accept="image/*"
								onChange={handlePictureChange}
								id="imageInput"
							/>
							<button>Gửi</button>
						</div>
					</div>
				</div>
			) : (
				<div className="chonse-messs">
					<h4>Chọn đoạn tin nhắn để tiếp tục</h4>
				</div>
			)}
		</div>
	);
}
