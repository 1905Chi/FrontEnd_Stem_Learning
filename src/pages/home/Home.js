import React, { useState, useEffect } from 'react';
import EmojiInput from 'react-input-emoji';

import Post from './components/Post';
import PostItem from './components/PostItem';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  useEffect(() => {
    if (localStorage.getItem('login')) {
      toast.success('Đăng nhập thành công');
      localStorage.removeItem('login');
    }
  }, []);
  const anh =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoon_hT7QiYmBsL0F9ydjogk-wzvXtwp0Ef_1M6E-Kw&s';
  const post = [
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: 'This is a sample post on ReactJS.',
      image: anh,
      likes: 42,
    },
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: 'This is a sample post on ReactJS.',
      image: anh,
      likes: 42,
    },
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: 'This is a sample post on ReactJS.',
      image: anh,
      likes: 42,
    },
  ];
  return (
    <>
      <div className="home-page">
      <Post />
      {post.map((post, index) => {
        return (
          <PostItem
            key={index}
            user={post.user}
            content={post.content}
            image={post.image}
            likes={post.likes}
          />
        );
      })}
      <ToastContainer />
      </div>
    </>
  );
}

export default Home;
