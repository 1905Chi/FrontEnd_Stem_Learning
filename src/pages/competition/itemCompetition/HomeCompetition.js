import React, { useEffect, useState } from 'react';
import './HomeCompetition.css';
import { useParams } from 'react-router-dom';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { selectrole } from '../../../redux/Exam';
import { selectSelectedListRank } from '../../../redux/Group';
export default function HomeCompetition() {
	const { uuid } = useParams();
	const listRank = useSelector(selectSelectedListRank);
	const user= JSON.parse(localStorage.getItem('user'));
	var count = 0;
	var totalScore = 0;
	listRank && listRank.map(item => {
		
		if(item.id === user.id) {
			count = item.point;	
			totalScore = item.total;	
		} 
	})
    const [group, setGroup] = useState(null);  // Chỉnh sửa state để khởi tạo là null
    const [role, setRole] = useState("");
    const navigate = useNavigate();
	const dispatch = useDispatch();
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
					console.log(response.data.result.user.role)
					dispatch(selectrole(response.data.result.user.role));
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
					getGroup()
				} else if (response.data.statusCode === 201) {				
					getGroup()
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
								<span>Họ và tên</span>: {user.lastName} {user.firstName}.
							</p>
							<p>
								<span>Email</span>: {user.email}
							</p>
							<p>
								<span>Số điện thoại</span>: {user.phone}
							</p>
							<p>
								<span>Tỉnh / TP</span>: {user.province}
							</p>
							<p>
								<span>Trường</span>: {user.school}
							</p>
							<p>
								<span>Lớp</span>: {user.grade}
							</p>
						</div>
						<div className="groupInfo">
							<p>
								<span>Tuần thi</span>: <span className="checked">{count}</span>
							</p>
							<p>
								<span>Tổng điểm </span>: <span className="checked"></span> {totalScore} điểm
							</p>
							<p>
								<span>Thời gian</span>: <span className="checked"></span>
							</p>
							<p>
								<span>Số lần đã thi</span>: <span className="checked">{count}</span>/
							</p>
						</div>
					</div>
					<p></p>
				</div>
			</div>
		</div>
	);
}
