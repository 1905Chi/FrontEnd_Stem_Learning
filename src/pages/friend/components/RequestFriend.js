import './RequestFriend.css';
import { Avatar } from 'antd';
import React, { useEffect } from 'react';
import anh_logo_1 from '../../../assets/images/anh_logo_1.jpg';   
import { selectselectFriend,selectFriend } from "../../../redux/Friend"
import { useSelector,useDispatch } from "react-redux"
import Profile from "../../profile/ProfileUser/Profile" 

export default function RequestFriend() {
	const friend = useSelector(selectselectFriend)
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(selectFriend(null));
	}, []);
	return (
		<div className="">
			 {friend ?  <Profile id= {friend} />: <h4>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</h4>}
		</div>
	);
}
