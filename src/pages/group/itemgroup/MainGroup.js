import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import BannerGroup from '../components/BannerGroup';
import Post from '../../home/components/Post';
import PostItem from '../../home/components/PostItem';

export default function MainGroup() {
	const { uuid } = useParams();
	const anh = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoon_hT7QiYmBsL0F9ydjogk-wzvXtwp0Ef_1M6E-Kw&s';
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
	const [isAdmin1, setisAdmin1] = useState(false);
	const [isMember1, setisMember1] = useState(false);
	const [isprivate1, setisprivate1] = useState(false);

	
	const [loading, setLoading] = useState(true); // Trạng thái loading

	useEffect(() => {
		const apifake1 = localStorage.getItem('apifake');
		if (apifake1) {
			const apifakeparse = JSON.parse(apifake1);
			setisAdmin1(apifakeparse.isAdmin);
			setisMember1(apifakeparse.isMember);
            setisprivate1(apifakeparse.isPrivate);
		}
		setLoading(false);
	}, []);

	return (
		<>
			{loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
			<div>
				
				<BannerGroup></BannerGroup>
                <div>
                    <div style={{margin:'25px',borderRadius:'10px',padding:'5px',background:'aliceblue'}}>   
                    <h3 style={{borderBottom:'0.5px solid black'}}>Giới thiệu về nhóm này</h3>
                    {isprivate1 ?<h4>Đây là nhóm riêng tư</h4> : <h4>Đây là nhóm công khai</h4>}
                    <h4>Thành viên: 100</h4>
                    <h4>Ngày tạo: </h4>
                    </div>
                    <div style={{margin:'25px',borderRadius:'10px',padding:'5px',background:'aliceblue'}}>

                    <h3 style={{borderBottom:'0.5px solid black'}}>Quy tắc của quản trị viên:</h3>
                    <h4>Không được chửi thề</h4>
                    <h4>Không được đăng ảnh</h4>
                    <h4>Không được đăng bài viết</h4>
                    <h4>Không được đăng bình luận</h4>
                    <h4>Không được đăng video</h4>
                    <h4>Không được đăng link</h4>
                    </div>

                </div>
				{isMember1 ? <Post /> : null}
				{isprivate1
					? post.map((post, index) => (
							<PostItem
								key={index}
								user={post.user}
								content={post.content}
								image={post.image}
								likes={post.likes}
							/>
					  ))
					: null}
			</div>
		</>
	);
}
