import React from 'react';
import './RightProfile.css';
import { AiFillPhone } from 'react-icons/ai';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { BsGenderTrans } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { TbBuildingFactory } from 'react-icons/tb';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
export default function RightProfile() {
	const profile = JSON.parse(localStorage.getItem('user'));
	

	const image = [anhlogo1, anhlogo1, anhlogo1, anhlogo1, anhlogo1, anhlogo1];
	const friend = [
		{ name: 'Nguyễn Văn A', avatar: anhlogo1 },
		{ name: 'Nguyễn Văn B', avatar: anhlogo1 },
		{ name: 'Nguyễn Văn C', avatar: anhlogo1 },
		{ name: 'Nguyễn Văn D', avatar: anhlogo1 },
		{ name: 'Nguyễn Văn E', avatar: anhlogo1 },
	];

	return (
		<div className="right-profile">
			<div className="gioi-thieu">
				<div>
					<h3 style={{ margin: '5px' }}>Giới thiệu</h3>
				</div>
				<div>
					{profile.phone ? (
						<div style={{ width: '100%', margin: '5px 0' }}>
							<AiFillPhone className="icon-profile"></AiFillPhone>: {profile.phone}
						</div>
					) : null}
					{profile.date ? (
						<div style={{ width: '100%', margin: '5px 0' }}>
							<LiaBirthdayCakeSolid className="icon-profile"></LiaBirthdayCakeSolid>: {profile.date}
						</div>
					) : null}

					{profile.gender ? (
						<div style={{ width: '100%', margin: '5px 0' }}>
							<BsGenderTrans className="icon-profile"></BsGenderTrans>: {profile.gender}
						</div>
					) : null}

					{profile.workAt ? (
						<div style={{ width: '100%', margin: '5px 0' }}>
							<TbBuildingFactory className="icon-profile"></TbBuildingFactory>: {profile.workAt}
						</div>
					) : null}
					{profile.address ? (
						<div style={{ width: '100%', margin: '5px 0' }}>
							<CiLocationOn className="icon-profile"></CiLocationOn>: {profile.address}
						</div>
					) : null}
				</div>
			</div>
			<div className="image">
				<div style={{ display: 'flex' }}>
					<h3 style={{ margin: '5px',padding:'7px' }}>Ảnh</h3>
					<button style={{ textAlign: 'end', background: 'aquamarine' }}>
						<span style={{ color: 'blue', fontSize: '18px' }}>Xem tất cả</span>
					</button>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{image.map((image, index) => {
						return (
							<img
								src={image}
								alt="Ảnh"
								style={{
									width: '40%',
									height: '40%',
									objectFit: 'cover',

									margin: '5px 10px',
								}}
							></img>
						);
					})}
				</div>
			</div>
			<div className="friend">
				<div style={{ display: 'flex' }}>
					<h3 style={{ margin: '5px',padding:'7px' }}>Bạn bè</h3>
					<button style={{ textAlign: 'end', background: 'aquamarine' }}>
						<span style={{ color: 'blue', fontSize: '18px' }}>Xem tất cả</span>
					</button>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{friend.map((friend, index) => {
						return (
							<div style={{ width: '40%', height: '60%',margin: '5px 10px', }}>
								<img
									src={friend.avatar}
									alt="Ảnh"
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
                                        borderRadius:'10px'

										
									}}
								></img>
								<span style={{fontSize: '15px'}}>{friend.name}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
