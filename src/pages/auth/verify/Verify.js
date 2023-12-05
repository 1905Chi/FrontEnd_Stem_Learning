import React, { useEffect ,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Verify.css';
import axios from 'axios';
import { url } from '../../../constants/Constant';
import VerifyForm from './components/VerifyForm';
import Loading from '../../../components/Loading';

export default function Verify() {
	const navigate = useNavigate();
	const { uuid } = useParams();
	const [isVerify, setIsVerify] = useState(false);
	const [loading, setLoading] = useState(false); // Trạng thái loading
	let role = '';
	useEffect(() => {
		setLoading(true);
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axios
			.get(url + `api/v1/auth/verify?token=${uuid}`, config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					role = response.data.role;
					setIsVerify(true);
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error('Đường dẫn không đúng hoặc đã hết hạn.');
				setTimeout(() => {
					navigate('/');
				}, 3000);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [uuid]);

	return (
		<>
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
			<div className="verify">{isVerify ? <VerifyForm uuid={uuid}  role={role}/> : <ToastContainer />}</div>
		</>
	);
}
