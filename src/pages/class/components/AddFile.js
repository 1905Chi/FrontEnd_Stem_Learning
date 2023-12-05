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
import { useParams } from 'react-router-dom';
export default function AddFile(props) {
	const [selectedFile, setSelectedFile] = useState([]);
	const navigate = useNavigate();
	const {uuid} = useParams();

	const handelfileSelect = (event) => {
		// Xử lý khi người dùng chọn hình ảnh đại diện
		const mediaFiles = event.target.files[0];
		if (mediaFiles) {
			const reader = new FileReader();

			reader.onload = () => {
				setSelectedFile([...selectedFile, mediaFiles]);
			};
			reader.readAsDataURL(mediaFiles);
		}
	};
	const getFileExtension = (fileName) => {
		const lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex !== -1) {
			return fileName.substring(lastDotIndex + 1);
		}
		return ''; // Trả về chuỗi rỗng nếu không tìm thấy dấu chấm
	};

	const openAvatarPictureDialog = () => {
		document.getElementById('AvatarPictureInput').click();
	};
	const Save = () => {
		if (selectedFile) {
			const formData = new FormData();
			for (let i = 0; i < selectedFile.length; i++) {
				formData.append('mediaFiles', selectedFile[i]);
			}
			

			formData.append('groupId', uuid);
			
			
			formData.append('TypeCode', 'post');
			formData.append('content', '');
			const data = formData;
			Api.post(url + 'api/v1/posts', data, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					'Content-Type': 'multipart/form-data',
				},
			})
				.then((res) => {
					
						if (res.data.statusCode === 200) {
							toast.success('Thêm thành công');
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
				.finally(() => {
					props.onCancel();
				});
		} else {
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
									<LabelFile
										type={getFileExtension(item.name)}
										filename={item.name}
										onDelete={() => {
											setSelectedFile(selectedFile.filter((file, i) => i !== index));
										}}
									></LabelFile>
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
