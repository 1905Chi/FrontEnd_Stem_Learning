import React from 'react';
import './Main.css';
import { selectselectMessenger } from '../../../redux/Messenger';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
export default function Main(){
    const messageItem = useSelector(selectselectMessenger);
    return (
        <div > 
            {messageItem ? (
                <div className="mainMessenger">
                    <div className="mainMessenger__header">
                        <div className="mainMessenger__header__info">
                            <Avatar src={messageItem.avatar} alt="avatar" />
                            <h3>{messageItem.name}</h3>
                        </div>
                        </div>

                    </div>

            ): (<div className='chonse-messs'>
                <h4>Chọn đoạn tin nhắn để tiếp tục</h4>
            </div>)}
        </div>
    )
}