import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { Avatar } from 'antd';
import { GiCancel } from 'react-icons/gi';
import './MemberGroup.css';
import { IoMdAdd } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Api from '../../../api/Api';
import { toast,ToastContainer } from 'react-toastify';
import { url } from '../../../constants/Constant';
import { selectselectGroup } from '../../../redux/GetItemGroup';
import { selectselectMemberGroup } from '../../../redux/MemberGroup';
import { selectselectMemberGroupRequest } from '../../../redux/MemberGroup';
export default function MemberGroup() {
	const inforGroup = useSelector(selectselectGroup);
	const memberGroup = useSelector(selectselectMemberGroup);
	const memberGroupRequest = useSelector(selectselectMemberGroupRequest);
	const accept = (status,id) => () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.post(url + `api/v1/group-member-requests/${id}/response`, { stateCode:status}, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	};


	

	return (
		<div>
			<div className="member-group">
				<div className="member-group-request">
					<h3>Yêu cầu tham gia</h3>
					
						{memberGroupRequest && memberGroupRequest.map((item, index) => (
							<div className="member-group-request__item" key={item.id}>
							<div style={{ display: 'flex', flex: '1' }}>
								<div className="member-group-request__item__avatar">
									<Avatar src={item.user.avatarUrl} alt="" />
								</div>
							</div>
							<div className="member-group-request__item__button">
								<div className="member-group-request__item__name">
									<p>{item.user.firstName +' ' +item.user.lastName}</p>
								</div>
								<div style={{ textAlign: 'start' }}>
									<button className="btn btn-primary" style={{ backgroundColor: '#1677ff' }} onClick={accept('ACCEPT',item.id)}>
										Chấp nhận
									</button>
									<button className="btn btn-danger" onClick={accept('REJECT',item.id)}>Xóa</button>
								</div>
							</div>
						</div>
					))
							}
				</div>
				<div className="member-group__header">
					<h3>Thành viên</h3>
					<div className="member-group__header__search">
						<input type="text" placeholder="Tìm kiếm thành viên" />
						<button style={{ backgroundColor: 'white' }}>
							<FaSearch />
						</button>
					</div>

					{ memberGroup && memberGroup.map((item, index) => (
						<div className="member-group__item" key={index}>
							<div className="member-group__item__avatar">
								<Avatar src={item.user.avatarUrl} alt="" />
							</div>
							<div className="member-group__item__name">
								<p>{item.user.firstName + ' ' + item.user.lastName}</p>
								{item.role === 'GROUP_ADMIN' ? (
									<span className="member-group__item__name__role">(Quản trị viên)</span>
								) : null}
								{item.role === 'GROUP_MEMBER' ? (
									<span className="member-group__item__name__role">(Thành viên)</span>
								) : null}
								{item.role === 'GROUP_OWNER' ? (
									<span className="member-group__item__name__role">(Người sáng lập)</span>
								) : null}
							</div>
						</div>
					))}
				</div>
				<ToastContainer/>
			</div>
		</div>
	);
}
