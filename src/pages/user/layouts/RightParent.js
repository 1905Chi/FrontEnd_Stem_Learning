import react, { useEffect, useState } from 'react';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function RightParent() {
	const [listChild, setListChild] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		Callrelationships();
	}, []);
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	};
	const Callrelationships = () => {
		Api.get(url + 'api/v1/relationships', { headers: { headers } }).then((response) => {
			if (response.data.statusCode === 200) {
				setListChild(response.data.result.child);
				
			} else {
				console.log(response.error);
			}
		});
	};
	return (
		<div>
			<h3>Học sinh được quản lý</h3>
			<div>
				{listChild && listChild.length > 0
					? listChild.map((child, index) => {
							return (
								<div style={{display:'flex'}} onClick={()=>{navigate(`/profile/${child.id}`)}}>
									<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
										<div className="friend-request__item__avatar">
											<Avatar src={child.avartarUrl} alt="" />
										</div>
									</div>
									<div className="friend-request__item__button">
										<div className="friend-request__item__name">
											<p>{child.firstName + ' ' + child.lastName}</p>
										</div>
									</div>
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
}
