import './LableGroup.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function LableGroup({ image, name, id, type }) {
	const navigate = useNavigate();
	const location = useLocation();
	const isclass = location.pathname.includes('classes') ? true : false;
	
	const linktogroup = () => {
		if(type!==null || isclass===true ){
			navigate(`/classes/${id}`);
		}
		 else {
			navigate(`/groups/${id}`);
		}
	};

	return (
		<button className="labelItem" onClick={linktogroup}>
			<div className="image-group">
				<img className="img-gr" src={image} alt="anh" />
			</div>
			<div className="name-group">
				<h4 style={{ margin: '5px 0 0 5px', textAlign: 'start' }}> {name}</h4>
			</div>
		</button>
	);
}
