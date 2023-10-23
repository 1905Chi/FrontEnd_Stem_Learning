import React from 'react';
import './Profile.css';
import anhlogo1 from '../../assets/images/anh_logo_1.jpg';
export default function Profile() {
	return (
		<div>
			<div className="cover-photo">
				<img src={anhlogo1} alt="Cover Photo" />
			</div>
			<div>
				<div className="profile-picture">
					<img src={anhlogo1} alt="Profile Picture" />
				</div>
				<div className='usename-button'>
					<span>Quốc Chí</span>
					<div className="profile-picture__button">
						<button style={{height:'30px'}}>Chỉnh sửa</button>
					</div>
				</div>
			</div>
		</div>
	);
}
