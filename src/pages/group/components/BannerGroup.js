import { useDispatch } from "react-redux";
import { selectOption } from "../../../redux/Group";
import { selectselectGroup } from './../../../redux/GetItemGroup';
import { useSelector } from 'react-redux';
export default function BannerGroup() {
	 const dispatch = useDispatch();
	 const inforGroup = useSelector(selectselectGroup);
	return (
		<>
			<div className="banner-group" style={{margin:'0 0 35px 0'}}>
				<div className="banner-group__image" >
					{inforGroup  && inforGroup.avatarUrl ? (<img src={inforGroup.avatarUrl} alt="" style={{width:'96%',height:'50%'}} />):(<img src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png" alt="" style={{width:'100%',height:'50%'}} />)}	
				</div>
				<div className="banner-group__name">
					<h1 style={{margin:'0 30px'}}>{inforGroup ? (inforGroup.name) :'Nhóm học tập trên Stem'}</h1>
				</div>
				<div>{}</div>
			
			</div>
		</>
	);
}
