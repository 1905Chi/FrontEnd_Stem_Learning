import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectOption, selectSelectedOption } from '../../redux/Group';
import './MainFriend.css';
import RequestFriend from './components/RequestFriend';
import Friend from './components/Friend';
import SuggestFriend from './components/SuggestFriend';
export default function MainFriend() {
	const selectedOption = useSelector(selectSelectedOption);
	useEffect(() => {
		console.log(selectedOption);
	}, [selectedOption]);
	return (
		
			<div style={{width:'72vw', marginLeft:'50px'}}>
				
				{selectedOption === 'all_friend' ? <Friend /> : null}
				{selectedOption === 'request_friend' ? <RequestFriend /> : null}
				{selectedOption === 'sent_request' ? <SuggestFriend /> : null}
			</div>
		
	);
}
