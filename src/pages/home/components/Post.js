import React, { useState } from 'react';
import EmojiInput from 'react-input-emoji';

import './Post.css';
import { Select } from 'antd';
import { BsImageFill } from 'react-icons/bs';
export default function Post() {
	const [emoji, setEmoji] = useState('');
	
	const handleEmojiChange = (text) => {
		setEmoji(text);
	};


	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Xử lý dữ liệu đã nhập (emoji) ở đây
		console.log('Emoji đã chọn:', emoji);
	};
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	return (
		<div className="post">
			<form onSubmit={handleFormSubmit}>
				<EmojiInput value={emoji} onChange={handleEmojiChange} placeholder="Bạn có suy nghĩ gì nào" />
				<div className="anhluachon">
					<div>
						<BsImageFill style={{ fontSize: '20px', color: 'blue' }} /> <span style={{fontSize:'15px'}}> Ảnh / Video </span>
					</div>
					<div>
						<Select
							defaultValue="Group"
							style={{
								width: 120,
								fontSize:'15px'
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
								fontSize:'15px'
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
				<button className="postbutton" type="submit">
					<span style={{ fontSize: '15px' }}> Đăng </span>
				</button>
			</form>
		</div>
	);
}
