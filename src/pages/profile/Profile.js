import React, { useEffect, useState } from 'react';
import './Profile.css';
import EditProfile from './component/EditProfile';
import anhlogo1 from '../../assets/images/anh_logo_1.jpg';
import { AiFillCamera } from 'react-icons/ai';
import { BsPencilFill } from 'react-icons/bs';
import EditAvatar from './component/EditAvatar';
import EditCover from './component/EditCover';
import Post from '../home/components/Post';
import PostItem from '../home/components/PostItem';
import { json } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptionProfile } from '../../redux/Group';
import { selectSelectedOptionProfile } from '../../redux/Group';
import { BsGenderTrans } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { TbBuildingFactory } from 'react-icons/tb';
import { AiFillPhone } from 'react-icons/ai';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
	const [isEdit, setIsEdit] = useState(false);
	const navigate = useNavigate();
	const [isEditAvatar, setIsEditAvatar] = useState(false);
	const [isEditCoverPhoto, setIsEditCoverPhoto] = useState(false);
	const [avatar, setAvatar] = useState();
	const [coverPhoto, setCoverPhoto] = useState();
	const dispatch = useDispatch();
	const selectedOption = useSelector(selectSelectedOptionProfile);
	console.log(selectedOption);
	const user = JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		const profile = JSON.parse(localStorage.getItem('user'));
		dispatch(selectOptionProfile('introduce'));
		if (profile.avatarUrl) {
			setAvatar(profile.avatarUrl);
		} else {
			setAvatar(anhlogo1);
		}
		if (profile.coverUrl) {
			setCoverPhoto(profile.coverUrl);
		} else {
			setCoverPhoto(anhlogo1);
		}
	}, [avatar, coverPhoto]);
	const changeAvatar = (values) => {
		setAvatar(values);
	};
	const changeCoverPhoto = (values) => {
		setCoverPhoto(values);
	};

	const setEditAvatar = () => {
		setIsEditAvatar(true);
	};
	const setEditCoverPhoto = () => {
		setIsEditCoverPhoto(true);
	};
	const setEditProfile = () => {
		setIsEdit(true);
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

	return (
		<div className="profile-self">
			{isEdit ? <EditProfile onCancel={cancel}></EditProfile> : null}
			{isEditAvatar ? (
				<EditAvatar onCancel={cancelFormAvatar} changeAvatar={changeAvatar} avatar={avatar}></EditAvatar>
			) : null}
			{isEditCoverPhoto ? (
				<EditCover
					onCancel={cancelFormCoverPhoto}
					changeCoverPhoto={changeCoverPhoto}
					coverPhoto={coverPhoto}
				></EditCover>
			) : null}
			<div>
				<div>
					<div className="cover-photo">
						<img src={coverPhoto} alt="Cover Photo" />
						<button className="cover-picture-self__button" style={{ height: '40px' }} onClick={setEditCoverPhoto}>
						<AiFillCamera style={{ fontSize: '30px', margin: '0 0 0 5px', color: 'white' }}></AiFillCamera>
						<span style={{ fontSize: '15px', color: 'white', margin: '0 5px 0 0' }}>Chỉnh sửa ảnh bìa</span>
					</button>
					</div>
					
				</div>
				<div style={{position:'relative'}}>
					<div className="profile-picture-self">
						<img src={avatar} alt="Profile Picture" />
						<button className="profile-picture-self__button" style={{ height: '40px' }} onClick={setEditAvatar}>
						<AiFillCamera style={{ fontSize: '30px', color: 'white' }}></AiFillCamera>
					</button>
					</div>
					
					<div className="usename-button-self">
						<span style={{ fontSize: '35px' }}>
							{JSON.parse(localStorage.getItem('user')).firstName +
								' ' +
								JSON.parse(localStorage.getItem('user')).lastName}
						</span>
						<p
									style={{
										fontSize: '25px',
										height: 'fit-content',
										marginTop:'10px',
										marginLeft:'0.5rem'

									}}
								>
									{user.role === 'TEACHER' ? '(Giáo viên)' : null}
									{user.role === 'PARENT' ? '(Phụ huynh)' : null}
									{user.role === 'STUDENT' ? '(Học sinh)' : null}
									{user.role === 'ADMIN' ? '(Quản trị viên)' : null}
								</p>
					</div>
				</div>
				
				{selectedOption === 'introduce' ? (
					<div className="introduce" style={{ justifyContent: 'center', display: 'flex', marginTop: '8rem' }}>
						<div style={{ textAlign: 'start' }}>
							{user.phone ? (
								<div style={{ width: '100%', margin: '5px 0' }}>
									<span style={{ fontWeight: 'bold' }}>
										{' '}
										Số điện thoại<AiFillPhone className="icon-profile"></AiFillPhone> :{' '}
									</span>
									{user.phone}
								</div>
							) : null}
							{user.dob ? (
								<div style={{ width: '100%', margin: '5px 0' }}>
									<span style={{ fontWeight: 'bold' }}>
										Ngày sinh
										<LiaBirthdayCakeSolid className="icon-profile"></LiaBirthdayCakeSolid> :{' '}
									</span>
									{user.dob}
								</div>
							) : null}

							{user.gender ? (
								<div style={{ width: '100%', margin: '5px 0' }}>
									<span style={{ fontWeight: 'bold' }}>
										Giới tính<BsGenderTrans className="icon-profile"></BsGenderTrans> :{' '}
									</span>
									{user.gender}
								</div>
							) : null}

							

							<div style={{ width: '100%', margin: '5px 0' }}>
								<span style={{ fontWeight: 'bold' }}>
									{' '}
									Địa chỉ<CiLocationOn className="icon-profile"></CiLocationOn> :
									{user.province ? user.province : null}
									{user.district ? user.district : null}
								</span>
							</div>

							{user.parents !== null ? (
								<div style={{ width: '100%', margin: '5px 0' }}>
									<span
										style={{ fontWeight: 'bold' }}
										onClick={() => {
											navigate(`/profile/${user.parents[0].id}`);
										}}
									>
										Phụ huynh:
										{`${user.parents[0].firstName} ${user.parents[0].lastName}`}
									</span>
								</div>
							) : null}
							{user.children !== null ? (
								<div style={{ width: '100%', margin: '5px 0' }}>
									<span style={{ fontWeight: 'bold' }}>
										Con: {`${user.children[0].firstName} ${user.children[0].lastName}`}
									</span>
								</div>
							) : null}
						</div>
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}
