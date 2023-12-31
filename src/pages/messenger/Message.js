import { useState } from 'react';
import ChatRoom from './ChatRoom';
import RightbarChat from './RightbarChat';
import { Helmet } from 'react-helmet';
import SidebarChat from './SidebarChat';
import useTheme from '../../context/ThemeContext';
import { useParams } from 'react-router-dom';
const Meessage = () => {
	const params = useParams();
	const currentUser = JSON.parse(localStorage.getItem('user'));
	const [postGroup, setPostGroup] = useState({
		isGroup: false,
		id: params?.userId,
	});
	const [data, setData] = useState({});
	const [isShowRightbar, setIsShowRightbar] = useState(true);
	const onChangeMessage = (group) => {
		setPostGroup(group);
	};
	const dataChatRoom = (data) => {
		setData(data);
	};
	const isShowInfo = (info) => {
		setIsShowRightbar(info);
	};
	const { theme } = useTheme();

	return (
		<div style={{ color: theme.foreground, background: theme.background }}>
			<Helmet title={`Tin nhắn | STEM`} />
			<div className="homeContainer">
				<SidebarChat user={currentUser} onChangeMessage={onChangeMessage} />
				<ChatRoom user={currentUser} data={data} Toggeinfo={isShowInfo} />

				<RightbarChat
					user={currentUser}
					group={postGroup}
					currentData={dataChatRoom}
					showRightbar={isShowRightbar}
				/>
			</div>
		</div>
	);
};
export default Meessage;
