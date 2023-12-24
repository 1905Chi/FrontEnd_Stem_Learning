import './LableGroup.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import anh_logo_1 from '../../../assets/images/anh_logo_1.jpg';

export default function LableGroup({ image, name, id, type, infor }) {
	const navigate = useNavigate();
	const location = useLocation();

	const linktogroup = (id) => {
		if (type === true ) {
			navigate(`/classes/${id}`);
		} else {
			navigate(`/groups/${id}`);
		}
	};

	return (
		<div>
			{infor === null || infor=== undefined ? (
				<button className="labelItem" onClick={()=>{linktogroup(id)}}>
					<div className="image-group">
						<img className="img-gr" src={!image ? anh_logo_1 : image} alt="anh" />
					</div>
					<div className="name-group">
						<h4 style={{ margin: '5px 0 0 5px', textAlign: 'start' }}> {name}</h4>
						
					</div>
				</button>
			) : (
				<button className="labelItem" onClick={()=>{linktogroup(infor.id)}}>
					<div className="image-group">
						<img className="img-gr" src={!infor.avatarUrl ? anh_logo_1 : infor.avatarUrl} alt="anh" />
					</div>
					<div className="name-group">
						<h4 style={{ margin: '5px 0 0 5px', textAlign: 'start' }}> {infor.name}</h4>
						<p style={{ margin: '5px 0 0 5px', textAlign: 'start' }}>{infor.description}</p>
						{infor.subject && <p style={{ margin: '5px 0 0 5px', textAlign: 'start' }}>Môn học: {infor.subject}</p>}

					</div>
				</button>
			)}
		</div>
	);
}
