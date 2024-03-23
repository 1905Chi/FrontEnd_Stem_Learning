import { selectselectFriend,selectFriend } from "../../../redux/Friend"
import { useSelector } from "react-redux"
import Profile from "../../profile/ProfileUser/Profile" 
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';  
export default function Friend(){
    const friend = useSelector(selectselectFriend)
    console.log(friend)
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(selectFriend(null));
    }, []);
    return(
        <div>
            {friend ?  <Profile id= {friend} />: <h4>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</h4>}
           
            
        </div>
    )
}