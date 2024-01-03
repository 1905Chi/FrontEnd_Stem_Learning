import React, { useState, useEffect } from 'react';
import { selectselectMemberGroup } from '../../../redux/MemberGroup';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import { Button, Space, Select } from 'antd';
import { Dialog } from 'primereact/dialog';
import { Input } from 'antd';
import { Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { useDispatch } from 'react-redux';
import { selectMemberGroup } from '../../../redux/MemberGroup';
import { useParams } from 'react-router-dom';
export default function ManagerMemberGroup() {
	const dataMemberGroup = useSelector(selectselectMemberGroup);
	const rolegroup = localStorage.getItem('roleGroup');
	const dispatch = useDispatch();
	const { uuid } = useParams();
	const [dataMember, setDataMember] = useState([]);
	const [visible, setVisible] = useState(false);
	const [reason, setReason] = useState('');
	const [selectedUser, setSelectedUser] = useState();
	const [open, setOpen] = useState(false);
	const [openDeleteBan, setOpenDeleteBan] = useState(false);
	const [openEditRole, setOpenEditRole] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Bạn có chắc muốn cấm tài khoản này khỏi group?');
	const [modalTextDeleteBan, setModalTextDeleteBan] = useState('Bạn có chắc muốn bỏ cấm tài khoản này khỏi group?');

	const [currentRole, setCurrentRole] = useState('');
	const showModalEditRole = () => {
		setOpenEditRole(true);
	};
	const showModalDeleteBan = () => {
		setOpenDeleteBan(true);
	};
	const showModal = () => {
		setOpen(true);
	};
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};
	const handelBanuser = () => {
		Api.put(url + `api/v1/group-members/lock`, { groupMemberId: selectedUser }, { headers: headers })
			.then((res) => {
				toast.success('Cấm tài khoản thành công');
				callmember();
				setOpen(false);
			})
			.catch((err) => {
				toast.error('Cấm tài khoản thất bại');
				setOpen(false);
			});
	};
	const handleDeleteBanUser = (id) => {
		Api.put(url + `api/v1/group-members/unlock`, { groupMemberId: id }, { headers: headers })
			.then((res) => {
				toast.success('Bỏ cấm tài khoản thành công');
				callmember();
				setOpenDeleteBan(false);
			})
			.catch((err) => {
				toast.error('Bỏ cấm tài khoản thất bại');
				setOpen(false);
			});
	};

	const callmember = () => {
		Api.get(url + 'api/v1/group-members?groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectMemberGroup(response.data.result));
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const handleCancel = () => {
		setOpen(false);
		setOpenDeleteBan(false);
	};
	useEffect(() => {
		let data = [];
		dataMemberGroup.forEach((element, index) => {
			let dataSource = {
				key: index + 1,
				name: element.user.firstName + ' ' + element.user.lastName,
				lockedAt: element.lockedAt,
				isLocked: element.isLocked,
				id: element.id,
				idUser: element.user.id,
				emailUser: element.user.email,
				AvatarUser: element.user.avatarUrl,
				role: element.role,
				lockedReason: element.lockedReason,
			};
			data.push(dataSource);
		});
		setDataMember(data);
	}, [dataMemberGroup]);
	const handelban = (id) => {
		setSelectedUser(id);
	};
	const handleDeleteBan = (id) => {
		setSelectedUser(id);
	};
	const handelEditRole = (record) => {
		setSelectedUser(record.id);
		setCurrentRole(record.role);
	};
	const HandelChangrole = (id) => {
		if (currentRole === 'GROUP_ADMIN') {
			Api.put(url + `api/v1/group-members/${id}/role`, { roleCode: 'GROUP_MEMBER' }, { headers: headers })
				.then((res) => {
					toast.success('Thay đổi quyền thành công');
					callmember();
					setOpenEditRole(false);
				})
				.catch((err) => {
					toast.error('Thay đổi quyền thất bại');
					setOpenEditRole(false);
				});
		} else if (currentRole === 'GROUP_MEMBER') {
			Api.put(url + `api/v1/group-members/${id}/role`, { roleCode: 'GROUP_ADMIN' }, { headers: headers })
				.then((res) => {
					toast.success('Thay đổi quyền thành công');
					callmember();
					setOpenEditRole(false);
				})
				.catch((err) => {
					toast.error('Thay đổi quyền thất bại');
					setOpenEditRole(false);
				});
		}
	};

	const columns = [
		{
			label: 'STT',
			dataIndex: 'key',
			key: 'key',
			width: 10,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 20,
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			width: 20,
			render: (role) => (
				<Space size="middle">
					{role === 'GROUP_OWNER'
						? 'Người sáng lập'
						: role === 'GROUP_ADMIN'
						? 'Quản trị viên'
						: 'Thành viên'}
				</Space>
			),
		},
		{
			title: 'Locked At',
			dataIndex: 'lockedAt',
			key: 'lockedAt',
		},
		{
			title: 'Locked Reason',
			dataIndex: 'lockedReason',
			key: 'lockedReason',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record, role) => {
				if (record.role === 'GROUP_OWNER' ) {
					return null; // Không hiển thị button nếu là GROUP_OWNER
				} else if (record.role === 'GROUP_ADMIN' && rolegroup === 'GROUP_OWNER') {
					return (
						<Space size="middle">
							<Button
								type="danger"
								backgroundColor="#1890ff"
								onClick={() => {
									handelEditRole(record);

									showModalEditRole();
								}}
							>
								Thay đổi quyền
							</Button>
						</Space>
					);
				} else if (record.isLocked === false) {
					return (
						<Space size="middle">
							<Button
								type="primary"
								backgroundColor="red"
								onClick={() => {
									handelban(record.id);
									showModal();
								}}
							>
								Cấm
							</Button>
							<Button
								type="danger"
								backgroundColor="#1890ff"
								onClick={() => {
									handelEditRole(record);

									showModalEditRole();
								}}
							>
								Thay đổi quyền
							</Button>
						</Space>
					);
				} else if (record.isLocked === true) {
					return (
						<Space size="middle">
							<Button
								type="primary"
								backgroundColor="red"
								onClick={() => {
									handleDeleteBan(record.id);
									showModalDeleteBan();
								}}
							>
								Bỏ cấm
							</Button>
						</Space>
					);
				}
			},
		},
	];
	return (
		<div className="manager-group-member">
			<Modal
				title="Cấm tài khoản này khỏi group"
				open={open}
				onOk={handelBanuser}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<p>{modalText}</p>
			</Modal>
			<Modal
				title="Bỏ cấm tài khoản này khỏi group"
				open={openDeleteBan}
				onOk={() => handleDeleteBanUser(selectedUser)}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<p>{modalTextDeleteBan}</p>
			</Modal>
			<Modal
				title="Thay đổi quyền của tài khoản này"
				open={openEditRole}
				onOk={() => HandelChangrole(selectedUser)}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				{currentRole === 'GROUP_MEMBER' ? (
					<p>Thay quyền thành viên lên admin</p>
				) : (
					<p>Thay quyền admin xuống thành viên</p>
				)}
			</Modal>
			<Table columns={columns} dataSource={dataMember} />
			<ToastContainer />
		</div>
	);
}
