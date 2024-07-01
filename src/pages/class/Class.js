import { useEffect, useState, useRef } from 'react';
import Api from '../../api/Api';
import anh_logo_1 from '../../assets/images/anh_logo_1.jpg';
import { useLocation } from 'react-router-dom';
import './Class.css';
import { toast } from 'react-toastify';
import { TfiAngleDoubleRight } from 'react-icons/tfi';
import RightClass from './layouts/RightClass';
import LeftsGroup from '../group/layouts/LeftsGroup';
import { url } from '../../constants/Constant';
import { useNavigate } from 'react-router-dom';
const headers = {
	Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
	'Content-Type': 'application/json',
};

export default function Class() {
	const [classList, setClassList] = useState([]);
	const [avatarUrl, setAvatarUrl] = useState(anh_logo_1);
	const location = useLocation();
	const [openLeft, setOpenLeft] = useState(false);
	const LeftHomeRef = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (location.pathname.includes('classes')) {
			fetchClass();
		} else if (location.pathname.includes('groups')) {
			fetchgroup();
		}
	}, [location]);

	const fetchClass = async () => {
		try {
			const response = await Api.get(url + 'api/v1/groups/myClasses', { headers });
			console.log('Fetch class successfully: ', response);
			if (response.data.statusCode === 200) {
				setClassList(response.data.result);
			}
		} catch (error) {
			console.log('Failed to fetch class list: ', error);
		}
	};

	const fetchgroup = async () => {
		try {
			setClassList([]);
			Api.get(url + 'api/v1/groups', { headers })
				.then(async (response) => {
					if (response.data.statusCode === 200) {
						response.data.result.GROUP_ADMIN.forEach((element) => {
							if (element.isClass === false) {
								setClassList((classList) => [...classList, element]);
							}
						});
						response.data.result.GROUP_MEMBER.forEach((element) => {
							if (element.isClass === false) {
								setClassList((classList) => [...classList, element]);
							}
						});
						response.data.result.GROUP_OWNER.forEach((element) => {
							if (element.isClass === false) {
								setClassList((classList) => [...classList, element]);
							}
						});
					}
				})
				.catch(async (error) => {
					if (error.response) {
						// lỗi khi access token hết hạn
						toast.error(error.response.data.message);
					} else if (error.request) {
						// Lỗi không có phản hồi từ máy chủ
						toast.error(error.request.data.message);
					} else {
						// Lỗi trong quá trình thiết lập yêu cầu
					}
				})
				.finally(() => {});
		} catch (error) {
			console.log('Failed to fetch class list: ', error);
		}
	};

	const handleJoinClass = async (groupId) => {
		try {
			const response = await Api.post('api/v1/group-members/request', {
				groupId: groupId,
			});
			console.log('Join class successfully: ');
			if (response.data.statusCode === 201) {
				if (location.pathname.includes('classes')) {
					fetchClass();
				} else if (location.pathname.includes('groups')) {
					fetchgroup();
				}
				toast.success('Đã tham gia lớp học thành công');
			} else if (response.data.statusCode === 200) {
				toast.success('Đã yêu cầu tham gia lớp học');
			}
		} catch (error) {
			console.log('Failed to join class: ', error);
		}
	};
	return (
		<div className="class">
			<div className="Left">
				<TfiAngleDoubleRight
					onClick={() => {
						setOpenLeft((prev) => !prev);
					}}
				/>
			</div>
			{openLeft ? (
				<div
					className="LeftHome"
					ref={LeftHomeRef}
					style={{ position: 'absolute', top: '54px', left: 0, width: '50%', height: '100%', zIndex: 999 }}
				>
					<RightClass />
				</div>
			) : null}
			{classList.map((item) => (
				<div
					className="item-class"
					key={item.id}
					onClick={() => {
						if (location.pathname.includes('classes')) {
							let listclassHistory = JSON.parse(localStorage.getItem('listclassHistory'));
							if (listclassHistory === null) {
								listclassHistory = [];
							}
							// Tìm index của phần tử có id tương ứng
							const existingIndex = listclassHistory.findIndex((existitem) => item.id === existitem.id);

							// Nếu tìm thấy phần tử có cùng id
							if (existingIndex !== -1) {
								// Tăng thêm 1 vào số lượng hoặc thuộc tính cần tăng
								listclassHistory[existingIndex].count += 1;
							} else {
								// Nếu không tìm thấy, thêm mới vào listclassHistory
								listclassHistory.push({
									id: item.id,
									name: item.name,
									avatarUrl: item.avatarUrl,
									count: 1, // hoặc thuộc tính cần tăng khác nếu có
									isClass: true,
								});
							}

							// Lưu lại vào localStorage
							localStorage.setItem('listclassHistory', JSON.stringify(listclassHistory));
							navigate(`/classes/${item.id}`);
						} else {
							let listclassHistory = JSON.parse(localStorage.getItem('listclassHistory'));
							if (listclassHistory === null) {
								listclassHistory = [];
							}
							// Tìm index của phần tử có id tương ứng
							const existingIndex = listclassHistory.findIndex((exititem) => exititem.id === item.id);

							// Nếu tìm thấy phần tử có cùng id
							if (existingIndex !== -1) {
								// Tăng thêm 1 vào số lượng hoặc thuộc tính cần tăng
								listclassHistory[existingIndex].count += 1;
							} else {
								// Nếu không tìm thấy, thêm mới vào listclassHistory
								listclassHistory.push({
									id: item.id,
									name: item.name,
									avatarUrl: item.avatarUrl,
									count: 1, // hoặc thuộc tính cần tăng khác nếu có
									isClass: false,
								});
							}

							// Lưu lại vào localStorage
							localStorage.setItem('listclassHistory', JSON.stringify(listclassHistory));
							navigate(`/groups/${item.id}`);
						}
					}}
				>
					<img src={item.avatarUrl === null ||item.avatarUrl === ""  ? anh_logo_1 : item.avatarUrl} alt="" />
					<div className="info-class">
						<h3> {item.name} </h3>
						<p> {item.description} </p>
					</div>
				</div>
			))}
		</div>
	);
}
