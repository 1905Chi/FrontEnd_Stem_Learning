import React, { useState } from 'react';
import './Profile.css';
import EditProfile from './component/EditProfile';
import anhlogo1 from '../../assets/images/anh_logo_1.jpg';
import { AiFillCamera } from 'react-icons/ai';
import EditAvatar from './component/EditAvatar';
import EditCover from './component/EditCover';
import Post from '../home/components/Post';
import PostItem from '../home/components/PostItem';
export default function Profile() {
	const [isEdit, setIsEdit] = useState(false);
	const [isEditAvatar, setIsEditAvatar] = useState(false);
	const [isEditCoverPhoto, setIsEditCoverPhoto] = useState(false);
	const edit = () => {
		setIsEdit(true);
	};
	const setEditAvatar = () => {
		setIsEditAvatar(true);
	};
	const setEditCoverPhoto = () => {
		setIsEditCoverPhoto(true);
	};
	const cancel = () => {
		setIsEdit(false);
	};
	const cancelFormAvatar = () => {
		setIsEditAvatar(false);
	};
	const cancelFormCoverPhoto = () => {
		setIsEditCoverPhoto(false);
	};
	const anh = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoon_hT7QiYmBsL0F9ydjogk-wzvXtwp0Ef_1M6E-Kw&s';
	const post = [
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: 'This is a sample post on ReactJS.',
			image: anh,
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: 'This is a sample post on ReactJS.',
			image: anh,
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: 'This is a sample post on ReactJS.',
			image: anh,
			likes: 42,
		},
	];
	return (
		<>
			{isEdit ? <EditProfile onCancel={cancel}></EditProfile> : null}
			{isEditAvatar ? <EditAvatar onCancel={cancelFormAvatar}></EditAvatar> : null}
			{isEditCoverPhoto ? <EditCover onCancel={cancelFormCoverPhoto}></EditCover> : null}
			<div>
				<div>
					<div className="cover-photo">
						<img src={anhlogo1} alt="Cover Photo" />
					</div>
					<button className="cover-picture__button" style={{ height: '40px' }} onClick={setEditCoverPhoto}>
						<AiFillCamera style={{ fontSize: '30px', margin: '0 0 0 5px', color: 'white' }}></AiFillCamera>{' '}
						<span style={{ fontSize: '15px', color: 'white', margin: '0 5px 0 0' }}>Chỉnh sửa ảnh bìa</span>
					</button>
				</div>
				<div>
					<div className="profile-picture">
						<img src={anhlogo1} alt="Profile Picture" />
					</div>
					<button className="profile-picture__button" style={{ height: '40px' }} onClick={setEditAvatar}>
						<AiFillCamera style={{ fontSize: '30px', color: 'white' }}></AiFillCamera>
					</button>
					<div className="usename-button">
						<span>Quốc Chí</span>
					</div>
				</div>
				<div style={{margin:'125px 0 0 0'}}>
					<Post></Post>
					{post.map((post, index) => {
						return (
							<PostItem
								key={index}
								user={post.user}
								content={post.content}
								image={post.image}
								likes={post.likes}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}
