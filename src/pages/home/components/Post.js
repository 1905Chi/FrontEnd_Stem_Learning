import React, { useState } from 'react';
import EmojiInput from 'react-input-emoji';
import { GiCancel } from 'react-icons/gi';
import './Post.css';
import { Select } from 'antd';
import { BsImageFill } from 'react-icons/bs';
import LabelFile from '../../profile/component/LabelFile';
export default function Post() {
	const [emoji, setEmoji] = useState('');
	const [selectedFiles, setSelectedFiles] = useState([]); // Danh sách các tệp đã chọn
	const handleEmojiChange = (text) => {
		setEmoji(text);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Xử lý dữ liệu đã nhập (emoji) ở đây
		console.log('Emoji đã chọn:', emoji);
		console.log('Tệp đã chọn:', selectedFiles);
	};
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	const openAvatarPictureDialog = () => {
		document.getElementById('AvatarPictureInput').click();
	};
	const handleAvatarPictureChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const files = event.target.files;

		if (files.length > 0) {
			// Chuyển danh sách tệp đã chọn thành mảng và cập nhật selectedFiles
			setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);

			// Đặt lại giá trị của trường input để cho phép người dùng chọn tiếp
			event.target.value = null;
		}
	};
	const handleDeleteFile = (index) => {
		setSelectedFiles((prevSelectedFiles) => {
			const newSelectedFiles = [...prevSelectedFiles];
			newSelectedFiles.splice(index, 1); // Xóa file khỏi mảng
			return newSelectedFiles;
		});
	};
	const ClearPost = () => {
		setEmoji('');
		setSelectedFiles([]);
	};
	const checkFileExtension = (filename) => {
		// Lấy phần mở rộng của tệp
		const fileExtension = filename.split('.').pop().toLowerCase();

		// Kiểm tra xem phần mở rộng có phù hợp với loại tệp bạn muốn kiểm tra
		if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
			// Đây là một tệp ảnh
			return 'image';
		} else if (['doc', 'docx'].includes(fileExtension)) {
			// Đây là tệp Word
			return 'word';
		} else if (['ppt', 'pptx'].includes(fileExtension)) {
			// Đây là tệp PowerPoint
			return 'powerpoint';
		} else if (['pdf'].includes(fileExtension)) {
			// Đây là tệp pdf
			return 'pdf';
		} else {
			// Đây là một loại tệp khác
			return 'other';
		}
	};

	// Sau khi có danh sách các tệp đã chọn (selectedFiles)
	const fileTypes = selectedFiles.map((file) => checkFileExtension(file.name));
	console.log('Loại tệp đã chọn:', fileTypes);
	return (
		<div className="post">
			<form onSubmit={handleFormSubmit}>
				<EmojiInput value={emoji} onChange={handleEmojiChange} placeholder="Bạn có suy nghĩ gì nào" />
				<div className="anhluachon">
					<div>
						<BsImageFill style={{ fontSize: '20px', color: 'blue' }} onClick={openAvatarPictureDialog} />{' '}
						<span style={{ fontSize: '15px' }}> Đính kèm </span>
					</div>
					<div>
						<Select
							defaultValue="Group"
							style={{
								width: 120,
								fontSize: '15px',
							}}
							onChange={handleChange}
							options={[
								{
									value: 'jack',
									label: 'Jack',
								},
								{
									value: 'lucy',
									label: 'Lucy',
								},
								{
									value: 'Yiminghe',
									label: 'yiminghe',
								},
								{
									value: 'disabled',
									label: 'Disabled',
									disabled: true,
								},
							]}
						/>
					</div>
					<div>
						<Select
							defaultValue="Loại bài viết"
							style={{
								width: 240,
								fontSize: '15px',
							}}
							onChange={handleChange}
							options={[
								{
									value: 'ASK',
									label: 'Câu hỏi',
								},
								{
									value: 'ANSWER',
									label: 'Trả lời',
								},

								{
									value: 'disabled',
									label: 'Disabled',
									disabled: true,
								},
							]}
						/>
					</div>
				</div>
				<div className="file-post-choonse">
					<label
						style={{
							textAlign: 'center',
							borderBottom: '2px solid black',
							paddingBottom: '15px',
							marginBottom: '15px',
						}}
					>
						Các tệp đã chọn
					</label>
					<input
						style={{ display: 'none' }}
						type="file"
						accept="image/*, application/pdf , .doc, .docx, application/vnd.ms-powerpoint, .ppt, .pptx"
						onChange={handleAvatarPictureChange}
						id="AvatarPictureInput"
					/>
					<div style={{ display: 'flex' }}>
						{selectedFiles &&
							selectedFiles.map((file, index) => (
								<div key={index}>
									{fileTypes[index] === 'image' ? (
										<div className="image-container">
											<img
												src={URL.createObjectURL(file)}
												alt={`Image ${index + 1}`}
												style={{ width: '100px', height: '100px' }}
											/>
											
											<GiCancel onClick={() => handleDeleteFile(index)} className="delete-button"></GiCancel>
											
										</div>
									) : null}
								</div>
							))}
					</div>
					{selectedFiles &&
						selectedFiles.map((file, index) => (
							<div key={index}>
								{fileTypes[index] !== 'image' ? (
									<div className="file-container">
										<LabelFile
											type={fileTypes[index]}
											filename={file.name}
											onDelete={() => handleDeleteFile(index)}
										/>
										<br></br>
									</div>
								) : null}
							</div>
						))}
				</div>
				<div style={{ display: 'flex' }}>
					<button className="postbutton" onClick={ClearPost}>
						<span style={{ fontSize: '15px' }}> Hủy </span>
					</button>
					<button className="postbutton" type="submit">
						<span style={{ fontSize: '15px' }}> Đăng </span>
					</button>
				</div>
			</form>
		</div>
	);
}
