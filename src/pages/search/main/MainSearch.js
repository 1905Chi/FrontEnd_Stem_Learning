import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { selectSelectedOption, selectOption } from '../../../redux/Group';
import {
	selectselectclass,
	selectselectgroup,
	selectselectpost,
	selectselectSearchpeople,
    editSearchPeople
} from '../../../redux/Search';
import PostItem from '../../home/components/PostItem';
import './MainSearch.css';
import LableGroup from '../../group/components/LableGroup';
import { Avatar } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
export default function MainSearch() {
	const selectedOption = useSelector(selectSelectedOption);
	const dispatch = useDispatch();
	const post = useSelector(selectselectpost);
	const group = useSelector(selectselectgroup);
	const classs = useSelector(selectselectclass);
	const people = useSelector(selectselectSearchpeople);
	const user = JSON.parse(localStorage.getItem('user'));
	const Requestfriend = async (id) => {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		};
		try {
			await Api.post(
				url + 'api/v1/friend-requests',
				{
					userId: id,
				},
				{ Headers: headers }
			).then((res) => {
                dispatch(editSearchPeople({ id: id, isFriend: -1 }));
				toast.success('Gửi lời mời kết bạn thành công');
			});
		} catch (err) {
			console.log(err);
		}
	};

	//    const checkFriend = (id) => {
	//         const headers = {
	//             'Content-Type': 'application/json',
	//             Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	//         };
	//         try {
	//             Api.get(url + 'api/v1/friendships/validate?friendId=' + id, {Headers: headers})
	//             .then((res) => {
	//                 console.log(res.data.result);
	//                 if(res.data.result=== true){

	//                     return 1;
	//                 }
	//                 else if(res.data.result=== false){
	//                     return 0;
	//                 }
	//                 else{
	//                     return -1;
	//                 }
	//             })
	//         }
	//         catch (err) {
	//             console.log(err);
	//         }
	//     }
	const requestParent	= async (id) => {
		Api.post(url+'api/v1/relationships/'+id,  {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		})
		.then((res) => {
			toast.success('Đã gửi lời mời');
		})
		.catch((err) => {
			toast.error('Đã xảy ra lỗi');
		});
	}
	return (
		<div className="search-main">
			{selectedOption === 'all' && (
				<div>
					{post && post.length > 0 && (
						<div>
							<h1>Bài viết</h1>
							{post.map((item, index) => (
								<PostItem
									index={item.id}
									content={item.content}
									user={item.author}
									likes={item.reactions}
									type={item.type}
									refUrls={item.refUrls}
								/>
							))}
						</div>
					)}
					{group && group.length > 0 && (
						<div>
							<h1>Nhóm</h1>
							{group.map((item, index) => (
								<LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject} />
							))}
						</div>
					)}
					{classs && classs.length > 0 && (
						<div>
							<h1>Lớp</h1>
							{classs.map((item, index) => (
								<LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject} />
							))}
						</div>
					)}
					{people && people.length > 0 && (
						<div>
							<h1>Mọi người</h1>
							{people &&
								people.map((item, index) => (
									<div className="user-search">
										<Avatar size={64} src={item.avatarUrl} />
										<p>{item.firstName + ' ' + item.lastName}</p>
										{item.isFriend === 1 ? (
											<button
												onClick={() => {
													navigator('/profile/' + item.id);
												}}
											>
												Trang cá nhân{' '}
											</button>
										) : item.isFriend === 0 ? (
											<button onClick={() => Requestfriend(item.id)}>
												Thêm bạn 
											</button>
										) : item.isFriend === -1 ? (
											<button>Đã gửi lời mời</button>
										) : null}
									</div>
								))}
						</div>
					)}
				</div>
			)}
			{selectedOption === 'post' && (
				<div>
					{post && post.length > 0 && (
						<div>
							<h1>Bài viết</h1>
							{post.map((item, index) => (
								<PostItem
									index={item.id}
									content={item.content}
									user={item.author}
									likes={item.reactions}
									type={item.type}
									refUrls={item.refUrls}
								/>
							))}
						</div>
					)}
				</div>
			)}
			{selectedOption === 'people' && (
				<div>
					{people && people.length > 0 ? (
						<div>
							<h1>Mọi người</h1>
							{people &&
								people.map((item, index) => (
									<div className="user-search">
										<Avatar size={64} src={item.avatarUrl} />
										<p>{item.firstName + ' ' + item.lastName}</p>
										{item.isFriend === 1 ? (
											<button
												onClick={() => {
													navigator('/profile/' + item.id);
												}}
											>
												Trang cá nhân{' '}
											</button>
										) : item.isFriend === 0 ? (
											<button onClick={() => Requestfriend(item.id)}>
												Thêm bạn 
											</button>
										) : item.isFriend === -1 ? (
											<button>Đã gửi lời mời</button>
										) : null}
										{item.role==='STUDENT' && user.role==='PARENT' ? <button onClick={() => requestParent(item.id)}>phụ huynh- học sinh</button>: null}
									</div>
								))}
						</div>
					) : (
						<div>
							<h1>Không có kết quả</h1>
						</div>
					)}
				</div>
			)}

			{selectedOption === 'class' && (
				<div>
					{classs && classs.length > 0 ? (
						<div>
							<h1>Lớp</h1>
							{classs.map((item, index) => (
								<LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject} />
							))}
						</div>
					) : (
						<div>
							<h1>Không có kết quả</h1>
						</div>
					)}
				</div>
			)}
			{selectedOption === 'group' && (
				<div>
					{group && group.length > 0 ? (
						<div>
							<h1>Nhóm</h1>
							{group.map((item, index) => (
								<LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject} />
							))}
						</div>
					) : (
						<div>
							<h1>Không có kết quả</h1>
						</div>
					)}
				</div>
			)}
            <ToastContainer />
		</div>
	);
}
