import React, { useState } from 'react';
import './Topbar.css';
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';
import {useNavigate} from 'react-router-dom';

const Topbar = () => {
	const [activeIndex, setActiveIndex] = useState(1);
	const navigate = useNavigate();
	const items = [
		{
			label: 'Trang chủ',
			icon: 'pi pi-fw pi-home',
			command: () => {
				navigate('/home');
			},
		},
		{
			label: 'Lớp học',
			icon: 'pi pi-fw pi-users',
			command: () => {
				navigate('/classes');
			},
		},
		{
			label: 'Nhóm',
			icon: 'pi pi-fw pi-users',
			command: () => {
				navigate('/groups');
			},
		},
	];

	const start = () => {
		return (
			<div className="start-topbar">
				<div className="logo-topbar">
					<img
						alt="logo"
						src="https://primefaces.org/cdn/primereact/images/logo.png"
						height="40"
						className="mr-2"
					></img>
				</div>
				<div className="search-topbar">
					<InputText placeholder="Search" type="text" />
				</div>
			</div>
		);
	};

	const end = () => {
		return (
			<div className="end-topbar">
				<div className="avatar-topbar">
					<img
						alt="avatar"
						src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
						height="40"
						className="mr-2"
					></img>
				</div>
			</div>
		);
	};

	return (
		<div className="topbar">
			<MegaMenu model={items} orientation="horizontal" start={start} end={end}/>
		</div>
	);
};

export default Topbar;
