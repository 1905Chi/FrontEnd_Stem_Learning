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
import { Dialog } from 'primereact/dialog';
import { selectOption, selectPostGroup } from '../../../redux/Group';
import { useDispatch } from 'react-redux';
export default function AddFile(props) {
	const [selectedFile, setSelectedFile] = useState([]);
	const navigate = useNavigate();
	const {uuid} = useParams();
	const dispatch = useDispatch();
	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'multipart/form-data',
	};
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
			
			
			formData.append('typeName', 'POST');
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
							callPostGroup();
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
	const callPostGroup = () => {
		Api.get(url + 'api/v1/posts?' + 'groupId=' + uuid, { headers: headers })
		.then((response) => {
			if (response.data.statusCode === 200) {
				dispatch(selectPostGroup(response.data.result));
			} else {
				console.log(response.error);
			}
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => {
			dispatch(selectOption('post'));
		});
	}
	const [visible, setVisible] = useState(true);
	return (
		<>
			<Dialog
					header= {<h3 style={{ textAlign: 'center', margin: '0 0 0 10px' }}>Thêm tài liệu</h3>}
					visible={visible}
					style={{ width: '50vw' }}
					onHide={() => {
						setVisible(false)
						props.onCancel();
					}}
				>
				<div className="file">
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3 style={{ textAlign: 'start', margin: '0 0 0 10px' }}>Tài liệu học học</h3>
						<button
							style={{ textAlign: 'end', margin: '0 10px 0 0', color: 'blue', backgroundColor: '#ffebcd' }}
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
			</Dialog>
						<ToastContainer />
		</>
	);
}
