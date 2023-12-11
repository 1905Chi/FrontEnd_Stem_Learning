import { useEffect, useState } from 'react';
import Api from '../../api/Api';
import anh_logo_1 from '../../assets/images/anh_logo_1.jpg';
import './Class.css';
export default function Class() {
	const [classList, setClassList] = useState([]);
	const [avatarUrl, setAvatarUrl] = useState(anh_logo_1);

	useEffect(() => {
		fetchClass();
	}, []);

	const fetchClass = async () => {
		try {
			const response = await Api.get('class');
			console.log('Fetch class successfully: ', response);
			if (response.data.statusCode === 200) {
				setClassList(response.data.group);
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
			if (response.data.statusCode === 200) {
				fetchClass();
			}
		} catch (error) {
			console.log('Failed to join class: ', error);
		}
	};
	return (
		<div className="class">
			{classList.map((item) => (
				<div className="item-class" key={item.id}>
					<img src={item.class.avatar_url} alt="" />
					<div className="info-class">
						<h3> {item.class.name} </h3>
						<p> Khối: {item.class.grade} </p>
						<p> Số thành viên: {item.class.memberCount}</p>
						<div id="avatar-container">
							<img src={item.author.avatar_url} alt="" />
							<p>
								{item.author.first_name} {item.author.last_name}
							</p>
						</div>
						{item.class.isMember === true ? (
							<button
								disabled={true}
								onClick={() => {
									handleJoinClass(item.id);
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
