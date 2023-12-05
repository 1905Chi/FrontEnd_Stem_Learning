import React, { useEffect, useState } from 'react';
import { MdOutlineBallot } from 'react-icons/md';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { MdPeopleAlt } from 'react-icons/md';
import { MdClass } from 'react-icons/md';
import { MdGroups3 } from 'react-icons/md';
import './LeftSearch.css';
import { selectOption, selectSelectedOption } from '../../../redux/Group';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../../../api/Api';
import { useHistory } from 'react-router-dom';
import { url } from './../../../constants/Constant';
import { useLocation } from 'react-router-dom';
import {selectSearchpeople,selectclass,selectgroup,selectpost,selectSearch} from '../../../redux/Search';
export default function LeftSearch() {
	const dispatch = useDispatch();
	const [selectedOption, setSelectedOption] = useState('all');
	const location = useLocation();
	
	const searchParams = new URLSearchParams(location.search);
	const searchValue = searchParams.get('search');
	useEffect(() => {
		dispatch(selectOption('all'));

		Api.get(url + 'api/v1/posts/search?query=' + searchValue)
			.then((res) => {
				console.log(res.data);
                dispatch(selectpost(res.data));

			})
			.catch((err) => {
				console.log(err);
			});
        Api.get(url + 'api/v1/groups/search?type=CLASS&query=' + searchValue)
            .then((res) => {
                console.log(res.data);
               dispatch(selectclass(res.data));

            }
            )
            .catch((err) => {
                console.log(err);
            });
        Api.get(url + 'api/v1/groups/search?type=GROUP&?query=' + searchValue)
        .then((res) => {
           
           dispatch(selectgroup(res.data));

        }   
        )
        .catch((err) => {
            console.log(err);
        });
        Api.get(url+'api/v1/users/search?query='+searchValue)
        .then((res) => {
            console.log(res.data);
            dispatch(selectSearchpeople(res.data));
        }
        ).catch((err) => {
            console.log(err);
        });


	}, [location]);


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
				<button
					className={`menu-item ${selectedOption === 'class' ? 'active' : ''}`}
					onClick={() => handleButtonClick('class')}
				>
					<MdClass className="icon-menu" />
					<span>Lớp học</span>
				</button>
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
