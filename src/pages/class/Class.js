import { useEffect, useState } from 'react';
import Api from '../../api/Api';
import anh_logo_1 from '../../assets/images/anh_logo_1.jpg';
import { useLocation } from 'react-router-dom';
import './Class.css';
import { toast } from 'react-toastify';
export default function Class() {
	const [classList, setClassList] = useState([]);
	const [avatarUrl, setAvatarUrl] = useState(anh_logo_1);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname.includes('classes')) {
			fetchClass();
		} else if (location.pathname.includes('groups')) {
			fetchgroup();
		}
	}, [location]);

	const fetchClass = async () => {
		try {
			const response = await Api.get('api/v1/groups/suggested-classes');
			console.log('Fetch class successfully: ', response);
			if (response.data.statusCode === 200) {
				setClassList(response.data.result);
			}
		} catch (error) {
			console.log('Failed to fetch class list: ', error);
		}
	};
	const fetchgroup = async () => {
		try {
			const response = await Api.get('api/v1/groups/suggested-groups');
			console.log('Fetch class successfully: ', response);
			if (response.data.statusCode === 200) {
				setClassList(response.data.result);
			}
		} catch (error) {
			console.log('Failed to fetch class list: ', error);
		}
	};

	const handleJoinClass = async (groupId) => {
		try {
			const response = await Api.post('api/v1/group-members/request', {
				groupId: groupId,
			});
			console.log('Join class successfully: ');
			if (response.data.statusCode === 201) {
				if (location.pathname.includes('classes')) {
					fetchClass();
				} else if (location.pathname.includes('groups')) {
					fetchgroup();
				}
				toast.success('Đã tham gia lớp học thành công');
			} else if (response.data.statusCode === 200) {
				toast.success('Đã yêu cầu tham gia lớp học');
			}
		} catch (error) {
			console.log('Failed to join class: ', error);
		}
	};
	return (
		<div className="class">
			{classList.map((item) => (
				<div className="item-class" key={item.id}>
					<img src={item.group.avatarUrl === null ? anh_logo_1 : item.group.avatarUrl} alt="" />
					<div className="info-class">
						<h3> {item.group.name} </h3>
						<p> Khối: {item.group.grade} </p>
						<p> Số thành viên: {item.memberCount}</p>
						<div id="avatar-container">
							<img
								src={item.group.author.avatarUrl === null ? anh_logo_1 : item.group.author.avatarUrl}
								alt=""
							/>
							<p>
								{item.group.author.firstName} {item.group.author.lastName}
							</p>
						</div>
						{item.isMember === true ? (
							<button
								disabled={true}
								onClick={() => {
									handleJoinClass(item.group.id);
								}}
							>
								{' '}
								Đã tham gia{' '}
							</button>
						) : (
							<button
								onClick={() => {
									handleJoinClass(item.group.id);
								}}
							>
								{' '}
								Tham gia{' '}
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
