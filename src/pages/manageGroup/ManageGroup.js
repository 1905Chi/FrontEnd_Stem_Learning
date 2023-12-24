import React, { useEffect, useState } from 'react';
import './ManageGroup.css';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { Button, Collapse, Pagination, Table } from 'antd';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaGlobe, FaLock } from 'react-icons/fa';

const ManageGroup = () => {
	const [group, setGroup] = useState([]);
	const [classGroup, setClassGroup] = useState([]);
	const [groupIdSelected, setGroupIdSelected] = useState(null);
	const [groupMember, setGroupMember] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalElemet, setTotalElemet] = useState(0);
	const [totalpage, setTotalpage] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [keyGroup, setKeyGroup] = useState(0);
	const [keyClass, setKeyClass] = useState(0);
	const [keyMember, setKeyMember] = useState(0);


	useEffect(() => {
		fetchGroup();
		fetchGroupClass();
		fetchAllGroupMember();
	}, []);

	const fetchGroup = async () => {
		try {
			const response = await Api.get(url + 'api/v1/groups/admin/get-all-groups');
			if (response.status === 200) {
				let data = response.data.result.groups;
				data.forEach((item,index) => {
					item.key = index + 1;
				});
				setGroup(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchGroupClass = async () => {
		try {
			const response = await Api.get(url + 'api/v1/groups/admin/get-all-classes');
			if (response.status === 200) {
				let data = response.data.result.groups;
				data.forEach((item,index) => {
					item.key = index + 1;
				});

				setClassGroup(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchGroupById = async (groupId) => {
		try {
			const response = await Api.get(url + `api/v1/group-members/admin/get-group-members?groupId=${groupId}`);
			if (response.status === 200) {
				setGroupMember(response.data.result.groupMembers);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAllGroupMember = async () => {
		try {
			const response = await Api.get(url + `api/v1/group-members/admin/get-group-members`);
			if (response.status === 200) {
				let data= response.data.result.groupMembers;
				data.forEach((item,index) => {
					item.key = index + 1;
				});
				setGroupMember(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const AvatarFullNameTemplate = (rowData) => {
		return (
			<div id="avatar-name-container">
				<img
					src={
						rowData.user.avatarUrl
							? rowData.user.avatarUrl
							: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
					}
					alt={rowData.user.name}
					className="rounded-full w-12 h-12"
				/>
				<span>{rowData.user.firstName + ' ' + rowData.user.lastName}</span>
			</div>
		);
	};

	const formatDate = (rowData) => {
		const d = new Date(rowData.createdAt);
		return d.toLocaleDateString();
	};

	const formatGroupJoined = (rowData) => {
		return (
			<div id="avatar-name-container">
				<img
					src={
						rowData.group.avatarUrl
							? rowData.group.avatarUrl
							: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
					}
					alt={rowData.group.name}
					className="rounded-full w-12 h-12"
				/>
				<span>{rowData.group.name}</span>
			</div>
		);
	};

	const formatRole = (rowData) => {
		if (rowData.role === 'GROUP_OWNER') {
			return 'Chủ nhóm';
		}
		if (rowData.role === 'GROUP_MEMBER') {
			return 'Thành viên';
		}
		if (rowData.role === 'GROUP_ADMIN') {
			return 'Quản trị viên';
		}
		return 'Không xác định';
	};
	/*
"result": {
        "totalPages": 1,
        "totalElements": 1,
        "currentPage": 0,
        "currentElements": 1,
        "groups": [
            {
                "id": 2,
                "name": "Chia sẽ bí kíp học toán 6",
                "description": "",
                "author": {
                    "id": 1,
                    "firstName": "Ung",
                    "lastName": "Van",
                    "avatarUrl": null,
                    "email": "teacher1@gmail.com",
                    "dob": null,
                    "gender": null
                },
                "avatarUrl": null,
                "coverUrl": null,
                "isPublic": true,
                "isAcceptAllRequest": false,
                "subject": "Toán",
                "grade": 5,
                "createdAt": "2023-12-13T11:05:29.000Z",
                "updatedAt": "2023-12-13T11:05:29.000Z"
            }*/
	// 			<Column field="name" header="Name" sortable body={AvatarFullNameTemplate} />
	// 			<Column field="user.email" header="Email" sortable />
	// 			<Column field="group" header="Group joined" sortable body={formatGroupJoined} />
	// 			<Column field="role" header="Role" sortable body={formatRole} />
	// 			<Column field="createdAt" header="Join at" sortable body={formatDate} />
	const columnsMemberGroup = [
		{
			title: 'Thứ tự',
			dataIndex: 'key',
			key: 'key',
			render: (key) =>{
				return Number(key) ;
				
			} ,
			width: '5%',
		},
		{
			title: 'Tên thành viên',
			dataIndex: 'user',
			key: 'user',
			render: (user) => {
				return (
					<div id="avatar-name-container">
						<img
							src={
								user.avatarUrl
									? user.avatarUrl
									: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
							}
							alt={user.firstName + ' ' + user.lastName}
							className="rounded-full w-12 h-12"
						/>
						<span>{user.firstName + ' ' + user.lastName}</span>
					</div>
				);
			},
			width: '20%',
		},
		{
			title: 'Email',
			dataIndex: 'user',
			key: 'user',
			render: (user) => user.email,
			width: '20%',
		},
		// {
		// 	title: 'Nhóm tham gia',
		// 	dataIndex: 'group',
		// 	key: 'group',
		// 	render: (group) => {
		// 		return (
		// 			<div id="avatar-name-container">
		// 				<img
		// 					src={
		// 						group.avatarUrl
		// 							? group.avatarUrl
		// 							: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
		// 					}
		// 					alt={group.name}
		// 					className="rounded-full w-12 h-12"
		// 				/>
		// 				<span>{group.name}</span>
		// 			</div>
		// 		);
		// 	},
		// 	width: '20%',
		// },
		{
			title: 'Vai trò',
			dataIndex: 'role',
			key: 'role',
			render: (role) => {
				if (role === 'GROUP_OWNER') {
					return 'Chủ nhóm';
				}
				if (role === 'GROUP_MEMBER') {
					return 'Thành viên';
				}
				if (role === 'GROUP_ADMIN') {
					return 'Quản trị viên';
				}
				return 'Không xác định';
			},
			width: '10%',
		},
		{
			title: 'Ngày tham gia',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt) => {
				const d = new Date(createdAt);
				return d.toLocaleDateString();
			},
			width: '10%',
		},
	];

	const columns = [
		{
			title: 'Thứ tự',
			dataIndex: 'key',
			key: 'key',
			render: (key) => {
				return Number(key) ;
				
			},
			width: '5%',
		},
		{
			title: 'Tên nhóm',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			render: (description) => (description ? description : 'Không có mô tả'),
			width: '40%',
		},
		{
			title: 'Quản lý',
			dataIndex: 'author',
			key: 'author',
			render: (author) => author.firstName + ' ' + author.lastName,
			width: '15%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'isPublic',
			key: 'isPublic',
			render: (isPublic) =>
				isPublic ? (
					<div id="public-container">
						<FaGlobe />
						<p>Công khai</p>
					</div>
				) : (
					<div id="public-container">
						<FaLock />
						<p>Riêng tư</p>
					</div>
				),
			width: '10%',
		},
		{
			title: 'Thao tác',
			dataIndex: 'id',
			key: 'id',
			render: (id) => (
				<Button
					type="primary"
					onClick={() => {
						fetchGroupById(id);
						setActiveIndex(1);
					}}
				>
					Xem thành viên
				</Button>
			),
			width: '20%',
		},
	];

	const columnsClass = [
		{
			title: 'Thứ tự',
			dataIndex: 'key',
			key: 'key',
			render: (key) => {
				return Number(key) ;
			},
			width: '5%',
		},
		{
			title: 'Tên lớp',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			render: (description) => (description ? description : 'Không có mô tả'),
			width: '40%',
		},
		{
			title: 'Môn học',
			dataIndex: 'subject',
			key: 'subject',
			width: '10%',
		},
		{
			title: 'Lớp',
			dataIndex: 'grade',
			key: 'grade',
			width: '5%',
		},
		{
			title: 'Quản lý',
			dataIndex: 'author',
			key: 'author',
			render: (author) => author.firstName + ' ' + author.lastName,
			width: '15%',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'isPublic',
			key: 'isPublic',
			render: (isPublic) =>
				isPublic ? (
					<div id="public-container">
						<FaGlobe />
						<p>Công khai</p>
					</div>
				) : (
					<div id="public-container">
						<FaLock />
						<p>Riêng tư</p>
					</div>
				),
			width: '10%',
		},
		{
			title: 'Thao tác',
			dataIndex: 'id',
			key: 'id',
			render: (id) => (
				<Button
					type="primary"
					onClick={() => {
						fetchGroupById(id);
						setActiveIndex(2);
					}}
				>
					Xem thành viên
				</Button>
			),
			width: '20%',
		},
	];

	const expandedRowRender = (record) => {
		const columnsUser = [
			{
				title: 'Thứ tự',
				dataIndex: 'id',
				key: 'id',
				render: (id) => Number(id) + 1,
				width: '5%',
			},
			{
				title: 'Tên thành viên',
				dataIndex: 'user',
				key: 'user',
				render: (user) => {
					return (
						<div id="avatar-name-container">
							<img
								src={
									user.avatarUrl
										? user.avatarUrl
										: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
								}
								alt={user.firstName + ' ' + user.lastName}
								className="rounded-full w-12 h-12"
							/>
							<span>{user.firstName + ' ' + user.lastName}</span>
						</div>
					);
				},
				width: '20%',
			},
			{
				title: 'Email',
				dataIndex: 'user',
				key: 'user',
				render: (user) => user.email,
				width: '20%',
			},
			{
				title: 'Vai trò',
				dataIndex: 'role',
				key: 'role',
				render: (role) => {
					if (role === 'GROUP_OWNER') {
						return 'Chủ nhóm';
					}
					if (role === 'GROUP_MEMBER') {
						return 'Thành viên';
					}
					if (role === 'GROUP_ADMIN') {
						return 'Quản trị viên';
					}
					return 'Không xác định';
				},
				width: '10%',
			},
			{
				title: 'Ngày tham gia',
				dataIndex: 'createdAt',
				key: 'createdAt',
				render: (createdAt) => {
					const d = new Date(createdAt);
					return d.toLocaleDateString();
				},
				width: '10%',
			},
		];

		return (
			<div style={{ textAlign: 'center' }}>
				<h3>Danh sách các thành viên của {record.name}</h3>
				<Table
					columns={columnsUser}
					dataSource={groupMember}
					pagination={false}
					size="small"
					align="center"
					width="100%"
				/>
			</div>
		);
	};

	const handlePaginationChange = (current, pageSize) => {
		// Xử lý sự kiện khi chuyển trang
		console.log(`Selected Page: ${current}, PageSize: ${pageSize}`);
	};

	return (
		// <div id="groups-manage-container">
		// 	<div id="manage-group-container">
		// 		<h1>Quản lý nhóm</h1>
		// 		{group.map((item, index) => (
		// 			<div id="manage-group" key={index}>
		// 				<div id="manage-group__info">
		// 					<div id="image-container">
		// 						<img
		// 							src={
		// 								item.avatarUrl
		// 									? item.avatarUrl
		// 									: 'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg'
		// 							}
		// 							alt="avatar"
		// 						/>
		// 					</div>
		// 					<div id="info-container">
		// 						<div id="description-container">
		// 							<p>
		// 								Quản lý:
		// 								{' ' + item.author.firstName + ' ' + item.author.lastName}
		// 							</p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div id="manage-group__action">
		// 					<div id="name-container">
		// 						<h3>{item.name}</h3>
		// 					</div>
		// 					<div id="description-container">
		// 						<p>{item.description}</p>
		// 					</div>
		// 					{item.isPublic ? (
		// 						<div id="public-container">
		// 							<FaGlobe />
		// 							<p>Công khai</p>
		// 						</div>
		// 					) : (
		// 						<div id="public-container">
		// 							<FaLock />
		// 							<p>Riêng tư</p>
		// 						</div>
		// 					)}
		// 					<Button
		// 						type="primary"
		// 						onClick={() => {
		// 							fetchGroupById(item.id);
		// 						}}
		// 					>
		// 						Xem thành viên
		// 					</Button>
		// 				</div>
		// 			</div>
		// 		))}
		// 		<h1>Quản lý lớp</h1>
		// 		{classGroup.map((item, index) => (
		// 			<div id="manage-group" key={index}>
		// 				<div id="manage-group__info">
		// 					<div id="image-container">
		// 						<img
		// 							src={
		// 								item.avatarUrl
		// 									? item.avatarUrl
		// 									: 'https://res.cloudinary.com/djzwxw0ao/image/upload/v1696942528/uqbxidtwcdbqn8glt6we.jpg'
		// 							}
		// 							alt="avatar"
		// 						/>
		// 					</div>
		// 					<div id="info-container">
		// 						<div id="description-container">
		// 							<p>
		// 								Quản lý:
		// 								{' ' + item.author.firstName + ' ' + item.author.lastName}
		// 							</p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div id="manage-group__action">
		// 					<div id="name-container">
		// 						<h3>{item.name}</h3>
		// 					</div>
		// 					<div id="description-container">
		// 						<p>{item.description}</p>
		// 					</div>
		// 					<div id="subject-container">
		// 						<div id="subject">
		// 							<p>Môn học: {item.subject}</p>
		// 						</div>
		// 						<div id="grade">
		// 							<p>Lớp: {item.grade}</p>
		// 						</div>
		// 					</div>
		// 					{item.isPublic ? (
		// 						<div id="public-container">
		// 							<FaGlobe />
		// 							<p>Công khai</p>
		// 						</div>
		// 					) : (
		// 						<div id="public-container">
		// 							<FaLock />
		// 							<p>Riêng tư</p>
		// 						</div>
		// 					)}
		// 					<Button
		// 						type="primary"
		// 						onClick={() => {
		// 							fetchGroupById(item.id);
		// 						}}
		// 					>
		// 						Xem thành viên
		// 					</Button>
		// 				</div>
		// 			</div>
		// 		))}
		// 	</div>
		// 	<div id="manage-member-container">
		// 		<h1>Thành viên</h1>
		// 		<DataTable value={groupMember} tableStyle={{ minWidth: '60rem' }}>
		// 			<Column field="id" header="ID" sortable />
		// 			<Column field="name" header="Name" sortable body={AvatarFullNameTemplate} />
		// 			<Column field="user.email" header="Email" sortable />
		// 			<Column field="group" header="Group joined" sortable body={formatGroupJoined} />
		// 			<Column field="role" header="Role" sortable body={formatRole} />
		// 			<Column field="createdAt" header="Join at" sortable body={formatDate} />
		// 		</DataTable>
		// 	</div>
		// </div>
		<div id="groups-manage-container">
			<div id="groups-container">
				<h1 style={{ textAlign: 'center' }}>Danh sách các thành viên của các nhóm</h1>
				<Table
					columns={columnsMemberGroup}
					dataSource={groupMember}
					size="middle"
					pagination={false}
					style={{ width: '100%'}}
					align="center"
				/>
				<Pagination
					total={Number(totalElemet)}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					defaultPageSize={Number(pageSize)}
					defaultCurrent={1}
					onChange={handlePaginationChange}
				/>
				<h1 style={{ textAlign: 'center' }}>Danh sách các nhóm</h1>
				<Table
					columns={columns}
					dataSource={group}
					size="middle"
					pagination={false}
					style={{ width: '100%'}}
					align="center"
				/>
				<Pagination
					total={Number(totalElemet)}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					defaultPageSize={Number(pageSize)}
					defaultCurrent={1}
					onChange={handlePaginationChange}
				/>
				<h1 style={{ textAlign: 'center' }}>Danh sách các lớp</h1>
				<Table
					columns={columnsClass}
					dataSource={classGroup}
					size="middle"
					pagination={false}
					style={{ width: '100%'}}
					align="center"
				/>
				<Pagination
					total={Number(totalElemet)}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					defaultPageSize={Number(pageSize)}
					defaultCurrent={1}
					onChange={handlePaginationChange}
				/>
			</div>
		</div>
	);
};

export default ManageGroup;
