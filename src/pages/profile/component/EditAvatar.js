import React, { useState } from 'react';
import './EditAvatar.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import { GiCancel } from 'react-icons/gi';
export default function EditAvatar({ onCancel }) {
	const [AvatarPicture, setAvatarPicture] = useState(anhlogo1);

	const handleAvatarPictureChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
            console.log('Tên tệp: ', file.name); // In ra tên tệp
			reader.onload = () => {
				setAvatarPicture(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const openAvatarPictureDialog = () => {
		document.getElementById('AvatarPictureInput').click();
	};
	const Save = () => {
		onCancel();
	};

	return (
		<div className="edit-Avatar">
			<div className="form-edit-Avatar">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Thay đổi ảnh đại diện</h2>
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
						<button
							style={{ textAlign: 'end', margin: '0 10px 0 0', color: 'blue', backgroundColor: 'white' }}
							onClick={openAvatarPictureDialog}
						>
							Thêm
						</button>
					</div>
					<div className="Avatar-picture-edit">
						<img src={AvatarPicture} alt="Avatar Picture" />
						
					</div>
				</div>
				<div>
                <input style={{ display: 'none'}}
							type="file"
							accept="image/*"
							onChange={handleAvatarPictureChange}
							id="AvatarPictureInput"
						/>
					<button style={{ margin: '30px 30px' ,width:'92%'}} onClick={Save}>
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
}
