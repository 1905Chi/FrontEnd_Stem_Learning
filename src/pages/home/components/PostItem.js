import React from 'react';
import './PostItem.css'; // Import tệp CSS
import { useState } from 'react';
import { Avatar } from 'antd';
import { BiCommentDetail, BiSolidShare, BiLike } from 'react-icons/bi';

function PostItem({ user, content, image, likes }) {
  const [isLiked, setIsLiked] = useState(false); // Trạng thái ban đầu là "không thích"

  function handleLike() {
    setIsLiked(!isLiked); // Đảo ngược trạng thái khi nút "like" được nhấn
  }

  const likeButtonStyle = isLiked ? { color: 'blue' } : {}; // Đổi màu của biểu tượng "like"
  return (
    <div className="post-item">
      <div className="user-info">
        <div className="avatarPost">
          <Avatar src={user.avatar} />{' '}
        </div>{' '}
        <p className="user-name"> {user.name} </p>{' '}
      </div>{' '}
      <p className="post-content"> {content} </p>{' '}
      {image && <img src={image} alt="Post" className="post-image" />}{' '}
      <p className="likes-count">
        {' '}
        {likes}
        likes{' '}
      </p>{' '}
      <div className="post-actions">
        <button
          style={{
            marginRight: '5px',
            fontSize: '22px',
            color: 'black',
            background: 'none',
          }}
          onClick={handleLike}
        >
          {' '}
          <BiLike style={likeButtonStyle} />{' '}
        </button>{' '}
        <button
          style={{
            marginRight: '5px',
            fontSize: '22px',
            color: 'black',
            background: 'none',
          }}
        >
          {' '}
          <BiCommentDetail />{' '}
        </button>{' '}
        <button
          style={{ fontSize: '22px', background: 'none', color: 'black' }}
        >
          {' '}
          <BiSolidShare />{' '}
        </button>{' '}
      </div>{' '}
    </div>
  );
}

export default PostItem;
