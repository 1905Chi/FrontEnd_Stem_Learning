import React, { useEffect, useState } from 'react';
import { MdOutlineBallot } from 'react-icons/md';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { MdPeopleAlt } from 'react-icons/md';
import { MdClass } from 'react-icons/md';
import { MdGroups3 } from 'react-icons/md';
import './LeftSearch.css';
import { selectOption, selectSelectedOption, selectOptionSearchGrade,selectOptionSearchSubject, selectOptionSearchPeople } from '../../../redux/Group';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../../../api/Api';
import { useHistory } from 'react-router-dom';
import { url } from './../../../constants/Constant';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Select } from 'antd';
import { selectSearchpeople, selectclass, selectgroup, selectpost, selectSearch } from '../../../redux/Search';

export default function LeftSearch() {
	const dispatch = useDispatch();
	const Option = Select.Option;
	const [selectedOption, setSelectedOption] = useState('all');
	const location = useLocation();
	const [grade, setGrade] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
	const searchParams = new URLSearchParams(location.search);
	const [subjects, setSubjects] = useState([]);
	const searchValue = searchParams.get('query');
	const callSubject = async () => {
		await axios
			.get(url + 'api/v1/subjects')
			.then((response) => {
				setSubjects(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const option = useSelector(selectSelectedOption);

	useEffect(() => {
		dispatch(selectOption('all'));
		callSubject();
		/// bài viết
		Api.get(url + 'api/v1/posts/search?query=' + searchValue)
			.then((res) => {
				dispatch(selectpost(res.data));
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		// lớp học
		Api.get(url + 'api/v1/groups/search?isClass=1&query=' + searchValue)
			.then((res) => {
				console.log(res.data);

				dispatch(selectclass(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
		// nhóm
		Api.get(url + 'api/v1/groups/search?isClass=0&?query=' + searchValue)
			.then((res) => {
				dispatch(selectgroup(res.data));
			})
			.catch((err) => {
				console.log(err);
			});

		searchUsers(searchValue);
	}, [location]);
	const searchUsers = async (searchValue) => {
		try {
			const usersResponse = await Api.get(url + 'api/v1/users/search?query=' + searchValue);

			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			};

			const validateFriendshipPromises = usersResponse.data.map(async (user) => {
				if (localStorage.getItem('user') !== null) {
					try {
						const friendshipResponse = await Api.get(
							url + 'api/v1/friendships/validate?friendId=' + user.id,
							{
								headers,
							}
						);
						const isFriend = friendshipResponse.data.result === true ? 1 : 0; // 1 đã kết bạn , 0 chưa kết bạn
						return { ...user, isFriend };
					} catch (err) {
						console.error(err);
						return { ...user, isFriend: 2 }; // chưa đăng nhập
					}
				} else {
					return { ...user, isFriend: 2 }; // chưa đăng nhập
				}
			});

			const updatedUsers = await Promise.all(validateFriendshipPromises);
			dispatch(selectSearchpeople(updatedUsers));
		} catch (error) {
			console.error(error);
		}
	};

	const handleButtonClick = (option) => {
		dispatch(selectOption(option));
		setSelectedOption(option);
	};

	return (
		<div className="left-search">
			<div className="header-left-search">
				<h1>Kết quả tìm kiếm</h1>
			</div>
			<div className="menu-search">
				<span>Bộ lọc</span>
				<button
					className={`menu-item ${selectedOption === 'all' ? 'active' : ''}`}
					onClick={() => handleButtonClick('all')}
				>
					<MdOutlineBallot className="icon-menu" />
					<span>Tất cả</span>
				</button>
				<button
					className={`menu-item ${selectedOption === 'post' ? 'active' : ''}`}
					onClick={() => handleButtonClick('post')}
				>
					<BsFillPostcardHeartFill className="icon-menu" />
					<span>Bài viết</span>
				</button>
				<button
					className={`menu-item ${selectedOption === 'people' ? 'active' : ''}`}
					onClick={() => handleButtonClick('people')}
				>
					<MdPeopleAlt className="icon-menu" />
					<span>Mọi người</span>
				</button>
				{option === 'people' ? (
					<div style={{marginLeft:'30px'}} className='filter-people'>
						<span>Bộ lọc</span>
						<button onClick={()=>{dispatch(selectOptionSearchPeople('all'))}}><span>Tất cả</span></button>
						<button onClick={()=>{
								dispatch(selectOptionSearchPeople('TEACHER'));
						}}>
							<span>Giáo viên</span>
						</button>
						<button onClick={()=>{
							dispatch(selectOptionSearchPeople('STUDENT'));
						}}>
							<span>Học sinh</span>
						</button>
						<button onClick={()=>{
							dispatch(selectOptionSearchPeople('PARENT'));
						}}>
							<span>Phụ huynh</span>
						</button>
					</div>
					): null}
				<button
					className={`menu-item ${selectedOption === 'class' ? 'active' : ''}`}
					onClick={() => handleButtonClick('class')}
				>
					<MdClass className="icon-menu" />
					<span>Lớp học</span>
				</button>
			
				{option === 'class' ? (
					<div className="grade" style={{marginLeft:'2rem'}}>
						<div style={{marginBottom:'15px'}}>
						<span>Khối: </span>
						<Select
							defaultValue="Tất cả"
							style={{ width: 120, marginLeft: '10px' }}
							onChange={(value) => {
								
								dispatch(selectOptionSearchGrade(value));
								
							}}
						>
							<Option value="all">Tất cả</Option>
							{grade.map((item) => (
								<Option value={item}>{item}</Option>
							))}
						</Select>
						</div>
						<div>
						<span>Môn học: </span>
						<Select
							defaultValue="Tất cả"
							style={{ width: 120, marginLeft: '10px' }}
							onChange={(value) => {
								
								dispatch(selectOptionSearchSubject(value));
							}}
						>
							<Option value="all">Tất cả</Option>
							{subjects.map((item) => (
								<Option value={item.name}>{item.name}</Option>
							))}
						</Select>
						</div>
					</div>
				) : null}

				<button
					className={`menu-item ${selectedOption === 'group' ? 'active' : ''}`}
					onClick={() => handleButtonClick('group')}
				>
					<MdGroups3 className="icon-menu" />
					<span>Nhóm</span>
				</button>
			</div>
		</div>
	);
}
