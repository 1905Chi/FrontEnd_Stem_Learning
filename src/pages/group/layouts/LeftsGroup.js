import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './LeftsGroup.css';
import { useNavigate } from 'react-router-dom';
import LableGroup from '../components/LableGroup';
const { Search } = Input;
const LeftsGroup = () => {
	const [theme, setTheme] = useState('dark');
	const [current, setCurrent] = useState('1');
	const navigate = useNavigate();
	const changeTheme = (value) => {
		setTheme(value ? 'dark' : 'light');
	};
	const onClick = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};
	const create=()=>{
		navigate('/groups/create');
	}


	const mygroup=[
		{
			image:"https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png",
			name:'Nhóm 1',
		},
		{
			image:"https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png",
			name:'Nhóm 2',
		},
		{
			image:"https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png",
			name:'Nhóm 3',
		},
		{
			image:"https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png",
			name:'Nhóm 4',
		},
		{
			image:"https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png",
			name:'Nhóm 5',
		},
		{
			image:"https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png",
			name:'Nhóm 3',
		}



	]
	return (
		<>
    <div className='header-left' >
			<h1 style={{ textAlign: 'start' }}>Nhóm</h1>

			<Search theme={theme} placeholder="Tìm kiếm nhóm" />
      </div>
      <div className='button-add'  onClick={create}>
			<Button type="primary" style={{ width: '100%', marginTop: '10px', height: '50px' }}>
				<span style={{fontSize: '15px', fontWeight:'500'}}>+ Tạo nhóm</span>
			</Button>
      </div>
      <div className='your-group'>
		<div style={{display:"flex" ,justifyContent:'space-around'}}>
        <h4 >Nhóm do bạn quản lý</h4>
		<h4 style={{color:'blue'}}>Xem thêm</h4>
		</div>
		{
			mygroup.map((mygroup,index)=>{
				return(
					<LableGroup
					key={index}
					image={mygroup.image}
					name={mygroup.name}
					/>
				)
			})
		}


      </div>
      <div className='your-group'>
	  <div style={{display:"flex" ,justifyContent:'space-around'}}>
        <h4 >Nhóm do tham gia</h4>
		<h4 style={{color:'blue'}}>Xem thêm</h4>
		</div>
		{
			mygroup.map((mygroup,index)=>{
				return(
					<LableGroup
					key={index}
					image={mygroup.image}
					name={mygroup.name}
					/>
				)
			})
		}

      </div>

		</>
	);
};
export default LeftsGroup;
