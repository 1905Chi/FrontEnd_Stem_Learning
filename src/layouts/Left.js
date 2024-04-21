import { Button, Divider, List, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import UseTheme from './UseTheme';
import { FaUserFriends } from 'react-icons/fa';
import './Left.css';
import { useNavigate } from 'react-router-dom';
import {
	FcAbout,
	FcCustomerSupport,
	FcFeedback,
	FcInfo,
	FcPrivacy,
	FcReading,
	FcRefresh,
	FcSettings,
	FcSportsMode,
} from 'react-icons/fc';
export default function Left() {
	const { theme } = UseTheme();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const openMessager = () => {
		navigate('/messenger');
	};
	const listclassHistory = localStorage.getItem('listclassHistory')
		? JSON.parse(localStorage.getItem('listclassHistory'))
		: [];
		listclassHistory.sort((a, b) => b.count - a.count);

		// Lấy 3 lịch sử đầu tiên
	const top3History =listclassHistory.length>3 ?  listclassHistory.slice(0, 3): listclassHistory
	const divHistory = top3History.map((item, index) => {
		return {
			img: item.avatarUrl ? (
				<div style={{ display: 'flex' ,flexWrap: 'wrap'}}>
					<img src={item.avatarUrl} alt="avatar" style={{ width: 100 }} />
					<strong style={{maxWidth: '60%',textWrap: 'wrap'}}>{item.name}</strong>
				</div>
			) : null,
			title: item.name,
			href: item.isClass ? `/classes/${item.id}` : `/groups/${item.id}`,
		};
	});
	//Đăng xuất
	const logoutHandler = () => {
		localStorage.clear();
		navigate('/login');
	};

	const listAccountAction = [
		{
			title: 'Chuyển tài khoản',
			icon: FcRefresh,
		},
		{
			title: 'Đăng xuất',
			icon: FcSportsMode,
			onClick: logoutHandler,
		},
		user.role === 'PARENT' || localStorage.getItem('role') === 'PARENT' || user.role === 'TEACHER'
			? {
					title: 'Phụ huynh - Học sinh',
					icon: FcCustomerSupport,
					onClick: () => {
						navigate('/parent');
					},
			  }
			: {
					title: 'Cài đặt',
					icon: FcSettings,
					href: '/settings',
			  },
	];

	const listShortCutAction = [
		{
			title: 'Bạn bè',
			icon: FaUserFriends,
			onClick: () => {
				navigate('/friends');
			},
		},
		{
			title: 'Tin nhắn',
			icon: FcFeedback,
			onClick: openMessager,
		},
		{
			title: 'Giới thiệu',
			icon: FcAbout,
			href: '/about',
		},
		{
			title: 'Điều khoản',
			icon: FcReading,
			href: '/terms',
		},
		{
			title: 'Quyền riêng tư',
			icon: FcInfo,
			href: '/privacy',
		},
		{
			title: 'Bảo mật',
			icon: FcPrivacy,
			href: '/security',
		},
	];
	let lists = [];
	listclassHistory && listclassHistory.length > 0
		? (lists = [
				{
					title: 'Tài khoản',
					data: listAccountAction,
				},
				{
					title: 'Lối tắt',
					data: listShortCutAction,
				},
				{
					title: 'Hoạt động gần đây',
					data: divHistory,
				},
		  ])
		: (lists = [
				{
					title: 'Tài khoản',
					data: listAccountAction,
				},
				{
					title: 'Lối tắt',
					data: listShortCutAction,
				},
		  ]);

	return (
		<Space
			className="sidebar"
			direction="vertical"
			style={{ color: theme.foreground, background: theme.background, width: '100%' }}
		>
			{lists.map((list, index) => (
				<List
					key={index}
					header={
						<Divider orientation="left" style={{ margin: 0 }}>
							<Typography.Title level={4} style={{ margin: 0 }}>
								{list.title}
							</Typography.Title>
						</Divider>
					}
					split={false}
					dataSource={list.data}
					renderItem={(item) => (
						<List.Item style={{ padding: '4px 0' }}>
							{item.href ? (
								<Link to={item.href} draggable style={{ width: '100%' }}>
									<Button
										type="text"
										block
										style={{ height: 'auto', padding: '8px' }}
										onClick={item.onClick}
									>
										<Space align="center" style={{ width: '100%' }}>
											{item.icon ? (
												<>
													<item.icon size={20} />
													<Typography.Text strong>{item.title}</Typography.Text>
												</>
											) : (
												item.img
											)}
										</Space>
									</Button>
								</Link>
							) : (
								<Button
									type="text"
									block
									style={{ height: 'auto', padding: '8px' }}
									onClick={item.onClick}
								>
									<Space align="center" style={{ width: '100%' }}>
										{item.icon ? (
											<>
												<item.icon size={20} />
												<Typography.Text strong>{item.title}</Typography.Text>
											</>
										) : (
											item.img
										)}
									</Space>
								</Button>
							)}
						</List.Item>
					)}
				/>
			))}
		</Space>
	);
}
