import React, { useState, useEffect,useRef  } from 'react';
import PostItem from './components/PostItem';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { selectselectuser, selectuser } from '../../redux/User';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { Skeleton } from 'antd';
import { selectPostHome } from '../../redux/Group';
import { TfiAngleDoubleRight } from "react-icons/tfi";
import Left from '../../layouts/Left';
import {selectlistpostHome,selectselectlistpostHome} from '../../redux/Post';
import './Home.css';
//import { verifyJwtToken } from '../../api/Jwt';
function Home() {
	const [ispost, setIspost] = useState(false);

	const [listpost, setListpost] = useState(null);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(30);
	const [openLeft, setOpenLeft] = useState(false);
	const LeftHomeRef = useRef(null);
	useEffect(() => {
		//console.log(verifyJwtToken(localStorage.getItem('use')));
		if (localStorage.getItem('login')) {
			toast.success('Đăng nhập thành công');
			localStorage.removeItem('login');
		}
	}, []);
	useEffect(() => {
		homePosts();
	}, []);
	useEffect(() => {
		const handleClickOutside = (event) => {
		  if (LeftHomeRef.current && !LeftHomeRef.current.contains(event.target)) {
			setOpenLeft(false);
		  }
		};
	
		document.addEventListener("mousedown", handleClickOutside);
	
		return () => {
		  document.removeEventListener("mousedown", handleClickOutside);
		};
	  }, []);
	  const updatePostList = (updatedPosts) => {
		setListpost(updatedPosts);
	  };
	const homePosts = async () => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
				timeout: 15000,
			};
			const response = await Api.get(url + `api/v1/posts/home-posts?page=${page}&size=${size}`, {
				headers: headers,
			});
			setListpost(response.data.result.posts);	
			if (response.data.statusCode === 200) {
				console.log('data', response.data.result.posts);
			} else {
				console.log(response.error);
			}
		} catch {
			console.log('error');
		}
	};

	return (
		<>
			<div className='Left' >
			<TfiAngleDoubleRight onClick={()=>{setOpenLeft( prev => !prev)}} />
			</div>
			{openLeft ? <div className="LeftHome" ref={LeftHomeRef} style={{ position: 'absolute', top: '37px', left: 0, width: '50%', height: '100%', zIndex: 999 }}>
            <Left />
          </div>: null}
			<div className="home-page">
			
				{listpost === null || listpost.length ===0 ? <Skeleton active /> : null}
				{listpost !== null &&
					listpost.length > 0 &&
					listpost.map((post, index) => {
						
						return (
							<PostItem
								key={index}
								id={post.post.id}
								authorId={post.post.authorId}
								authorFirstName={post.post.authorFirstName}
								authorLastName={post.post.authorLastName}
								authorAvatar={post.post.authorAvatar}
								type={post.post.type}
								refUrls={post.post.refUrls}
								totalReactions={post.post.totalReactions}
								totalComments={post.post.totalComments}
								createdAt={post.post.createdAt}
								updatedAt={post.post.updatedAt}
								content={post.post.content}
								comments={post.post.comments}
								reaction={post.reaction}
								homePosts={homePosts}
								updatePostList={updatePostList}
							/>
						);
					})}
				<ToastContainer />
			</div>
		</>
	);
}

export default Home;
