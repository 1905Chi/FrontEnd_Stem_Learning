import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmailForm from './EmailForm/EmailForm';
import PasswordForm from './passwordform/PasswordForm';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../constants/Constant';
import Loading from '../../../components/Loading';
export default function ForgotPassword() {
	const { uuid } = useParams();
	const [isVerify, setIsVerify] = useState(false);
	const [loading, setLoading] = useState(false); // Trạng thái loading

	const navigate = useNavigate();
	useEffect(() => {
		if (uuid && uuid.length > 0) {
			setLoading(true);
			axios
				.get(url + `api/auth/reset-password?token=${uuid}`)
				.then((response) => {
					// Xử lý kết quả sau khi gửi thành công
					if (response.data.statusCode === 200) {
						toast.success(response.data.message);
						setIsVerify(true);
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error('Đường dẫn không đúng hoặc đã hết hạn.Nhập email để cấp lại đường dẫn mới');
					//   setTimeout(() => {
					// 	navigate('/forgot-password/');
					//   }, 6000);
				})
				.finally(() => {	
					setLoading(false);
				}
				);
		}
	}, []);

	return (
		<>
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
			<div className="forgotpassword">
				{uuid && uuid.length > 0 && isVerify ? <PasswordForm uuid={uuid} /> : <EmailForm uuid={uuid} />}
			</div>
		</>
	);
}
