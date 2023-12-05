import React, { useEffect, useState } from 'react';
import './Profile.css';
import anhlogo1 from '../../../assets/images/anh_logo_1.jpg';
import PostItem from '../../home/components/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptionProfile } from '../../../redux/Group';
import { selectSelectedOptionProfile } from '../../../redux/Group';
import { BsGenderTrans } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { TbBuildingFactory } from 'react-icons/tb';
import { AiFillPhone } from 'react-icons/ai';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectselectUser } from '../../../redux/MemberGroup';
import Api from '../../../../src/api/Api';
import { url } from '../../../constants/Constant';
import { selectselectFriendOfFriend } from '../../../redux/Friend';
export default function Profile(props) {
	const [avatar, setAvatar] = useState();
	const [coverPhoto, setCoverPhoto] = useState();
	const dispatch = useDispatch();
	const selectedOption = useSelector(selectSelectedOptionProfile);
	const navigate = useNavigate();
	const { uuid } = useParams();
	const user = useSelector(selectselectUser);
	const friendOfFriend = useSelector(selectselectFriendOfFriend);

	useEffect(() => {
		
		if (uuid && uuid === JSON.parse(localStorage.getItem('user')).id) {
			navigate('/profile');
		} else if (uuid && uuid !== JSON.parse(localStorage.getItem('user')).id) {
			dispatch(selectOptionProfile('introduce'));
			Api.get(url + 'api/v1/users/' + uuid)
				.then((res) => {
					dispatch(selectUser(res.data));
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			
			dispatch(selectOptionProfile('introduce'));
			Api.get(url + 'api/v1/users/' + props.id)
				.then((res) => {
					dispatch(selectUser(res.data));
					
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const anh = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoon_hT7QiYmBsL0F9ydjogk-wzvXtwp0Ef_1M6E-Kw&s';
	const post = [
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: [anh, anh, anh, anh, anh],
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: [anh, anh, anh, anh, anh],
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: [anh, anh, anh, anh, anh],
			likes: 42,
		},
	];
	return (
		<>
			{' '}
			{ user && 
				<div>
					<div>
						<div className="cover-photo">
							<img src={user.coverUrl === null ? user.coverUrl : anhlogo1} alt="Cover Photo" />
						</div>
					</div>
					<div>
						<div className="profile-picture">
							<img src={user.avatarUrl === null ? user.avatarUrl : anhlogo1} alt="Profile Picture" />
						</div>

						<div className="usename-button">
							<span style={{ fontSize: '35px' }}>{user.firstName + ' ' + user.lastName}</span>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'start',
							position: 'relative',
							top: '118px',
							borderTop: '1px solid #e6e6e6',
							borderBottom: '1px solid #e6e6e6',
						}}
						className="group-menu"
					>
						<button
							style={{ margin: '0px', borderRadius: '0px', backgroundColor: 'white' }}
							onClick={() => {
								dispatch(selectOptionProfile('introduce'));
							}}
						>
							{' '}
							<h3>Giới thiệu</h3>
						</button>
						<button
							style={{ margin: '0px', borderRadius: '0px', backgroundColor: 'white' }}
							onClick={() => {
								dispatch(selectOptionProfile('post'));
							}}
						>
							{' '}
							<h3>Bài Viết</h3>
						</button>
						<button
							style={{ margin: '0px', borderRadius: '0px', backgroundColor: 'white' }}
							onClick={() => {
								dispatch(selectOptionProfile('member'));
							}}
						>
							{' '}
							<h3>Bạn bè</h3>
						</button>
						<button
							style={{ margin: '0px', borderRadius: '0px', backgroundColor: 'white' }}
							onClick={() => {
								dispatch(selectOptionProfile('event'));
							}}
						>
							<h3>Ảnh</h3>
						</button>
					</div>
					{selectedOption === 'introduce' ? (
						<div style={{ margin: '125px 0 0 0' }}>
							<div className="introduce">
								<h3>Giới thiệu</h3>
								{user.phone ? (
									<div style={{ width: '100%', margin: '5px 0' }}>
										<AiFillPhone className="icon-profile"></AiFillPhone>: {user.phone}
									</div>
								) : null}
								{user.dob ? (
									<div style={{ width: '100%', margin: '5px 0' }}>
										<LiaBirthdayCakeSolid className="icon-profile"></LiaBirthdayCakeSolid>:{' '}
										{user.dob}
									</div>
								) : null}

								{user.gender ? (
									<div style={{ width: '100%', margin: '5px 0' }}>
										<BsGenderTrans className="icon-profile"></BsGenderTrans>: {user.gender}
									</div>
								) : null}

								{user.workAt ? (
									<div style={{ width: '100%', margin: '5px 0' }}>
										<TbBuildingFactory className="icon-profile"></TbBuildingFactory>: {user.workAt}
									</div>
								) : null}
								{user.address ? (
									<div style={{ width: '100%', margin: '5px 0' }}>
										<CiLocationOn className="icon-profile"></CiLocationOn>: {user.address}
									</div>
								) : null}
							</div>
						</div>
					) : (
						''
					)}
					{selectedOption === 'member' ? (
						<div style={{ margin: '125px 0 0 0' }}>
							{ friendOfFriend.lenght>0 && friendOfFriend.map((item, index) => {
								return (
									<div key={index} className="friend">
										<div className="friend-avatar">
											<img src={item.avatarUrl === null ? item.avatarUrl : anhlogo1} alt="" />
										</div>
										<div className="friend-name">
											<span>{item.firstName + ' ' + item.lastName}</span>
										</div>
									</div>
								);
							})}
						</div>
					) : null}


					{selectedOption === 'post' ? (
						<div style={{ margin: '125px 0 0 0' }}>
							{post.map((post, index) => {
								return (
									<PostItem
										key={index}
										user={post.user}
										content={post.content}
										image={post.image}
										likes={post.likes}
									/>
								);
							})}
						</div>
					) : null}
				</div>
			}
		</>
	);
}
