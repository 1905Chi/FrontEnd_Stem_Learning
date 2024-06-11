import React, { useEffect, useState } from 'react';
import './HomeCompetition.css';
import { useParams } from 'react-router-dom';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function HomeCompetition() {
	const { uuid } = useParams();
    const [group, setGroup] = useState(null);  // Chỉnh sửa state để khởi tạo là null
    const [role, setRole] = useState("");
    const navigate = useNavigate();
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	};
	useEffect(() => {
        if (uuid) {
            getGroup();
        } else {
            toast.error('Không tìm thấy UUID.');
        }
    }, [uuid]);
	const getGroup = async () => {
       
        try {
            const response = await Api.get(url + 'api/v1/groups/' + uuid, { headers: headers });
            if (response.data.statusCode === 200) {
                if (response.data.result.user) {
                    setRole(response.data.result.user.role);
                }
                setGroup(response.data.result.group);
            } else {
                toast.error(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            toast.error('Không tồn tại cuộc thi này.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };
	const RequestJoinGroup = () => {
		Api.post(url + 'api/v1/group-members/request', { groupId: uuid }, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					window.location.reload();
				} else if (response.data.statusCode === 201) {
					
					window.location.reload();
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
				
			});
	};
	return (
		<div className="home-competition">
			<div className="col-md-10" style={{ margin: '0 auto' }}>
				<div className="result">
					
					<p className="titleHeader">
					{group?.name}
						<br />
						<b>{group?.description}</b>
						<br />
						
					</p>
					{role === null || role === "" ? (
						<button className='btn-join' onClick={RequestJoinGroup}>Tham gia </button>
					): null}
					<div>
						<div className="groupInfo">
							<p>
								<span>Họ và tên</span>: Bùi Đặng Quốc Chí.
							</p>
							<p>
								<span>Email</span>: 20110614@student.hcmute.edu.vn
							</p>
							<p>
								<span>Số điện thoại</span>: 0362858058
							</p>
							<p>
								<span>Tỉnh / TP</span>: Quảng Ngãi
							</p>
							<p>
								<span>Trường</span>: THPT Số 2 Mộ Đức
							</p>
							<p>
								<span>Lớp</span>: 12A1
							</p>
						</div>
						<div className="groupInfo">
							<p>
								<span>Tuần thi</span>: <span className="checked">2</span>
							</p>
							<p>
								<span>Điểm cao nhất</span>: <span className="checked">31</span> điểm
							</p>
							<p>
								<span>Thời gian</span>: <span className="checked">14:52.630</span>
							</p>
							<p>
								<span>Số lần đã thi</span>: <span className="checked">2</span>/2
							</p>
						</div>
					</div>
					<p>Bạn đã dự thi đủ 2 lần.</p>
				</div>
			</div>
		</div>
	);
}
