import React from 'react';
import './LeftMessenger.css';
import { Avatar } from 'antd';
import anh_logo_1 from "../../../assets/images/anh_logo_1.jpg"
import { UseSelector,useDispatch } from 'react-redux';
import{selectMessenger} from '../../../redux/Messenger';
export default function LeftMessenger() {
    const dispatch = useDispatch();
    const listUser = [
        {
            avatar:{anh_logo_1},
            name:"Nguyễn Văn A"
        },
        {
            avatar:{anh_logo_1},
            name:"Nguyễn Văn B"
        },
        {
            avatar:{anh_logo_1},
            name:"Nguyễn Văn C"
        },
        {
            avatar:{anh_logo_1},
            name:"Nguyễn Văn D"
        }
    ]
    const choonse = (item) => (e) => {
        dispatch(selectMessenger(item));
    }
	return (
		<div className="leftMessenger">
			<div className="leftMessenger__header">
				<div className="leftMessenger__header__search">
					<h2>Chats</h2>
					<input type="text" placeholder="Tìm kiếm trên Messenger" />
				</div>
			</div>
            <div className="leftMessenger__body">
                {
                    listUser.map((item,index)=>(
                        <div className="leftMessenger__body__item" onClick={choonse(item)}>
                            <Avatar alt="avatar" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fxaydungso.vn%2Fbai-viet-khac%2Fthiet-ke-logo-truong-dai-hoc-su-pham-tphcm-sang-trong-va-chuyen-nghiep-vi-cb.html&psig=AOvVaw3mlzpD2wAhAEXSI4AEi3YJ&ust=1701797716612000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIDk79So9oIDFQAAAAAdAAAAABAE" ></Avatar>
                            <div className="leftMessenger__body__item__info">
                                <h3>{item.name}</h3>
                                <p>Đây là tin nhắn cuối cùng</p>
                            </div>
                        </div>
                    ))
                }
                </div>
		</div>
	);
}
