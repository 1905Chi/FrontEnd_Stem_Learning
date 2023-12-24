import React, { useEffect, useState } from 'react';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import './Subject.css';
import { Button, Form, Input } from 'antd';
import { Dialog } from 'primereact/dialog';
import '../../pages/auth/register/Register.css';

const Subject = () => {
	const [subject, setSubject] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(5);
	const [order, setOrder] = useState('');
	const [sortBy, setSortBy] = useState('');

	const [subjectDetail, setSubjectDetail] = useState({});

	const [visible, setVisible] = useState(false);
	const [visibleEdit, setVisibleEdit] = useState(false);
	const [subjectId, setSubjectId] = useState(null);
	const [defaultValues, setDefaultValues] = useState({});

	useEffect(() => {
		fetchSubject();
	}, []);

	const fetchSubject = async () => {
		try {
			const response = await Api.get(
				url + `api/v1/subjects/admin/get-all-subjects?page=${page}&size=${size}&order=${order}&sortBy=${sortBy}`
			);
			if (response.data.statusCode === 200) {
				setSubject(response.data.result.subjects);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchDetailSubject = async (id) => {
		try {
			// const response = await Api.get(url + `api/v1/subjects/admin/get-subject/${id}`);
			// if (response.data.statusCode === 200) {
			// 	setDefaultValues({
			// 		code: response.data.result.code,
			// 		name: response.data.result.name,
			// 		description: response.data.result.description,
			// 	});
			// 	setVisibleEdit(true);
			// }

		setDefaultValues(subject.filter((item) => item.id === id)[0]);
		setVisibleEdit(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = async (values) => {
		try {
			const response = await Api.put(url + `api/v1/subjects/admin/update-subject/${subjectId}`, values);
			if (response.data.statusCode === 200) {
				setVisibleEdit(false);
				setDefaultValues({});
				setSubjectId(null);
				fetchSubject();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await Api.delete(url + `api/v1/subjects/admin/delete-subject/${id}`);
			if (response.data.statusCode === 200) {
				fetchSubject();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleNext = async (values) => {
		try {
			const response = await Api.post(url + `api/v1/subjects/admin/add-subject`, values);
			if (response.data.statusCode === 200) {
				setVisible(false);
				fetchSubject();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const formatDate = (rowData) => {
		const d = new Date(rowData.createdAt);
		return (
			<div id="column-container">
				{d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()} {d.getHours()}:{d.getMinutes()}:{d.getSeconds()}
			</div>
		);
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<div id="actions">
				<Button
					id="button-edit"
					onClick={() => {
						setSubjectId(rowData.id);
						fetchDetailSubject(rowData.id);
					}}
				>
					Edit
				</Button>
				<Button
					id="button-delete"
					onClick={() => {
						handleDelete(rowData.id);
					}}
				>
					Delete
				</Button>
			</div>
		);
	};

	const formatDescription = (rowData) => {
		return <div id="column-container">{rowData.description}</div>;
	};

	const formatName = (rowData) => {
		return <div id="column-container">{rowData.name}</div>;
	};

	const formatCode = (rowData) => {
		return <div id="column-container">{rowData.code}</div>;
	};

	const formatId = (rowData) => {
		return <div id="column-container">{rowData.id}</div>;
	};

	return (
		<div id="manage-subject-container">
			<Dialog header="Thêm môn học" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
				<Form
					name="register"
					onFinish={handleNext}
					scrollToFirstError
					initialValues={{
						code: defaultValues.code,
						name: defaultValues.name,
						description: defaultValues.description,
					}}
				>
					<h3 style={{ color: 'blue' }}>Thông tin môn học:</h3>
					<div className="information-account">
						<Form.Item
							name="code"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập mã môn học!',
								},
							]}
						>
							<Input placeholder="Mã môn học" defaultValue={defaultValues.code} />
						</Form.Item>
						<Form.Item
							name="name"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập tên môn học!',
								},
							]}
						>
							<Input placeholder="Tên môn học" />
						</Form.Item>
						<Form.Item
							name="description"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập mô tả môn học!',
								},
							]}
						>
							<Input placeholder="Mô tả môn học" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: '100%' }}
								className="button-register"
							>
								Thêm môn học
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Dialog>
			<Dialog
				header="Chỉnh sửa môn học"
				visible={visibleEdit}
				style={{ width: '50vw' }}
				onHide={() => {
					setVisibleEdit(false);
					setDefaultValues({});
					setSubjectId(null);
				}}
			>
				<Form
					name="register"
					onFinish={handleEdit}
					scrollToFirstError
					initialValues={{
						code: defaultValues.code,
						name: defaultValues.name,
						description: defaultValues.description,
					}}
				>
					<h3 style={{ color: 'blue' }}>Thông tin môn học:</h3>
					<div className="information-account">
						<Form.Item
							name="code"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập mã môn học!',
								},
							]}
						>
							<Input placeholder="Mã môn học" />
						</Form.Item>
						<Form.Item
							name="name"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập tên môn học!',
								},
							]}
						>
							<Input placeholder="Tên môn học" />
						</Form.Item>
						<Form.Item
							name="description"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập mô tả môn học!',
								},
							]}
						>
							<Input placeholder="Mô tả môn học" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: '100%' }}
								className="button-register"
							>
								Chỉnh sửa môn học
							</Button>
						</Form.Item>
					</div>
				</Form>
				{/* <div id="add-subject">
					<Input placeholder="Mã môn học" defaultValue={defaultValues.code} />
				</div> */}
			</Dialog>
			<h1 style={{ textAlign: 'center' }}>Danh sách môn học</h1>
			<div id="subject-manage-container">
				<Button
					id="add-subject-button"
					type="primary"
					onClick={() => {
						setVisible(true);
					}}
				>
					Thêm môn học
				</Button>
				<DataTable value={subject} tableStyle={{ minWidth: '60rem', marginTop: '2rem' }}>
					<Column field="id" header="ID" sortable body={formatId} />
					<Column field="code" header="Code" sortable body={formatCode} />
					<Column field="name" header="Name" sortable body={formatName} />
					<Column field="description" header="Description" sortable body={formatDescription} />
					<Column field="createdAt" header="Join at" sortable body={formatDate} />
					<Column field="updatedAt" header="Update at" sortable body={formatDate} />
					<Column field="action" header="Action" body={actionBodyTemplate} />
				</DataTable>
			</div>
		</div>
	);
};

export default Subject;
