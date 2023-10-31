import React, { useState, useEffect } from 'react';
import anh_logo_1 from '../../../src/assets/images/anh_logo_1.jpg';
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

  let anh=''
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.profileImageUrl) {
    anh=user.profileImageUrl;
  }
  else{
    anh=anh_logo_1;
  }
 

 

  
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
        avatar: anh
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
