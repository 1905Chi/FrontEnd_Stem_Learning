import React from 'react';
import { Avatar } from 'antd';
import { selectselectMessenger, selectMessenger } from '../../../redux/Messenger';
import { useSelector } from 'react-redux';
import './RightMessenger.css';
import {Skeleton} from 'antd';
export default function RightMessenger() {
	const messageItem = useSelector(selectselectMessenger);
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<div>
            {messageItem === undefined  || messageItem=== null ? (
                <Skeleton active />
            ) : (
			<div className="Left-messenger">
				<div className="Left-messenger--left">
					<Avatar src={user.avatarUrl} style={{ width: '75px', height: '75px' }} />
				</div>
				
				<div className='name-user'>
					<h3>{messageItem.name}</h3>
				</div>
			</div>
            )}
		</div>
	);
}
