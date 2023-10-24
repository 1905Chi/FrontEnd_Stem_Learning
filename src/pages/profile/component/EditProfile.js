import React,{useState} from 'react';
import './EditProfile.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import { GiCancel } from 'react-icons/gi';
export default function EditProfile({ onCancel }) {
	const [profilePicture, setProfilePicture] = useState(anhlogo1);
	const [coverPhoto, setCoverPhoto] = useState(anhlogo1);


	const handleProfilePictureChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setProfilePicture(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCoverPhotoChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh bìa
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setCoverPhoto(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
    const openProfilePictureDialog = () => {
        document.getElementById('profilePictureInput').click();
      };
    
      const openCoverPhotoDialog = () => {
        document.getElementById('coverPhotoInput').click();
      };
	return (
		<div className="edit-profile">
			<div className="form-edit-profile">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Chỉnh sửa trang cá nhân</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={onCancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
				<div className="anhdaidien">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Ảnh đại diện</h3>
						<button style={{ textAlign: 'end', margin: '0 10px 0 0', color: 'blue' ,backgroundColor:'white'}}  onClick={openProfilePictureDialog}>Thêm</button>
					</div>
					<div className="profile-picture-edit">
						<img src={profilePicture} alt="Profile Picture" />
                        <input type="file" accept="image/*" onChange={handleProfilePictureChange}  id="profilePictureInput"/>
					</div>
				</div>
				<div className="anhdaidien">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Ảnh bìa</h3>
						<button style={{ textAlign: 'end', margin: '0 10px 0 0', color: 'blue',backgroundColor:'white' }} onClick={openCoverPhotoDialog}>Thêm</button>
					</div>
					<div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
						<img src={coverPhoto} alt="Profile Picture" style={{ width: '70%', height: '70%' }} />
                        <input type="file" accept="image/*" onChange={handleCoverPhotoChange}  id="coverPhotoInput"/>
					</div>
				</div>
			</div>
		</div>
	);
}
