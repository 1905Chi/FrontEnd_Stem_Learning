import React, { useState } from 'react';
import './EditCover.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import { GiCancel } from 'react-icons/gi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
import RefeshToken from '../../../../src/api/RefeshToken';

export default function EditCover(props) {
	const [CoverPicture, setCoverPicture] = useState(props.coverPhoto);
	const [selectedFile, setSelectedFile] = useState(null);
	const navigate = useNavigate();


	const handleCoverPictureChange = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
          
			reader.onload = () => {
				setCoverPicture(reader.result);
				setSelectedFile(file);
			};
			reader.readAsDataURL(file);
		}
	};

	const openCoverPictureDialog = () => {
		document.getElementById('CoverPictureInput').click();
	};
	const Save = () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append('cover', selectedFile);
			axios
				.put(url + 'api/v1/users/profile/cover', formData, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					if (res.data.statusCode === 200) {
						toast.success(res.data.message);
						localStorage.setItem('user', JSON.stringify(res.data.result));
						props.changeCoverPhoto(selectedFile);					
					} else {
						toast.error(res.data.message);
					}
				})
				.catch((error) => {
					if (error.response) {
						// lỗi khi access token hết hạn
						const status = error.response.status;
						if (status === 401) {
							let a = RefeshToken();
							if (a === 200) {
								Save();
							} else if (a === 401) {
								// lỗi khi refresh token hết hạn
								toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
								setTimeout(() => {
									localStorage.clear();
									navigate('/login');
								}, 5000);
							}
							// token không hợp lệ trả về mã lỗi
							toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
							setTimeout(() => {
								localStorage.clear();
								navigate('/login');
							}, 5000);
						}
					} else if (error.request) {
						// Lỗi không có phản hồi từ máy chủ
						toast.error(error.request.data.message);
						setTimeout(() => {
							localStorage.clear();
							navigate('/login');
						}, 5000);
					} else {
						// Lỗi trong quá trình thiết lập yêu cầu
						toast('Lỗi khi thiết lập yêu cầu.');
					}
				})
				.finally(() => {props.onCancel();});
		
			
		}
		else{
			toast.error('Vui lòng chọn ảnh bìa');
		}
	};

	return (
		<div className="edit-Cover">
			<div className="form-edit-Cover">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Thay đổi ảnh bìa</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={props.onCancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
				<div className="anhdaidien">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Ảnh bìa</h3>
						<button
							style={{ textAlign: 'end', margin: '0 10px 0 0', color: 'blue', backgroundColor: 'white' }}
							onClick={openCoverPictureDialog}
						>
							Thêm
						</button>
					</div>
					<div className="Cover-picture-edit">
						<img src={CoverPicture} alt="Cover Picture" />
						
					</div>
				</div>
				<div>
                <input style={{ display: 'none'}}
							type="file"
							accept="image/*"
							onChange={handleCoverPictureChange}
							id="CoverPictureInput"
						/>
					<button style={{ margin: '30px 30px' ,width:'92%'}} onClick={Save}>
						Lưu
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
