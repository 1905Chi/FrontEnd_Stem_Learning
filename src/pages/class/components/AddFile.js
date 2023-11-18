import React, { useState } from 'react';
import './AddFile.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import { GiCancel } from 'react-icons/gi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../../../src/api/Api';
import LabelFile from '../../profile/component/LabelFile';
export default function AddFile(props) {
	
	const [selectedFile, setSelectedFile] = useState([]);
	const navigate = useNavigate();
	

	const handelfileSelect = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				
				setSelectedFile([...selectedFile,file]);
			};
			reader.readAsDataURL(file);
		}
	};

	const openAvatarPictureDialog = () => {
		document.getElementById('AvatarPictureInput').click();
	};
	const Save = () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append('avatar', selectedFile);
			Api
				.put(url + 'api/v1/users/profile/avatar', formData, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					if (res.data.statusCode === 200) {
						toast.success(res.data.message);
						localStorage.setItem('user', JSON.stringify(res.data.result));
						props.changeAvatar(selectedFile);					
					} else {
						toast.error(res.data.message);
					}
				})
				.catch((error) => {
					if (error.response) {
						// lỗi khi access token hết hạn
						
								// lỗi khi refresh token hết hạn
								toast.error(error.response.data.message);
								
							
						
					} else if (error.request) {
						// Lỗi không có phản hồi từ máy chủ
						toast.error(error.request.data.message);
						
					} else {
						// Lỗi trong quá trình thiết lập yêu cầu
						toast('Lỗi khi thiết lập yêu cầu.');
					}
				})
				.finally(() => {props.onCancel();});
		
			
		}else
		{
			toast.error('Vui lòng chọn file');
		}
	};

	return (
		<div className="add-file">
			<div className="form-add-file">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Thêm Tài liệu cho lớp học</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={props.onCancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>
				<div className="file">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Tài liệu học học</h3>
						<button
							style={{ textAlign: 'end', margin: '0 10px 0 0', color: 'blue', backgroundColor: 'white' }}
							onClick={openAvatarPictureDialog}
						>
							Thêm
						</button>
					</div>
                    <div className="file-list">
                        {selectedFile.map((item, index) => {
                            return (
                                <div className="file-item" key={index}>
                                   
                                    <p>{item.name}</p>
                                    <p>{item.size}</p>
                                    <p>{item.type}</p>
                                    <GiCancel
                                        style={{ color: 'black', fontSize: '20px' }}
                                        onClick={() => {
                                            setSelectedFile(selectedFile.filter((item, i) => i !== index));
                                        }}
                                    ></GiCancel>
                                </div>
                            );
                        })}		
                        </div>	
				</div>
				<div>
					<input
						style={{ display: 'none' }}
						type="file"
						accept="image/*, application/pdf , .doc, .docx, application/vnd.ms-powerpoint, .ppt, .pptx"
						onChange={handelfileSelect}
						id="AvatarPictureInput"
					/>
					<button style={{ margin: '30px 30px', width: '92%' }} onClick={Save}>
						Lưu
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
