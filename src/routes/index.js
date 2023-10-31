import React from 'react';
import Home from '../pages/home/Home';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import ForgotPassword from '../pages/auth/forgotpassword/ForgotPassword';
import Left from '../layouts/Left';
import LeftsGroup from '../pages/group/layouts/LeftsGroup';
import NotFound from '../pages/notFound/NotFound';
import Verify from '../pages/auth/verify/Verify';
import Right from '../layouts/Right';
import LeftCreateGroup from '../pages/group/layouts/LeftCreateGroup';
import CreateGroup from '../pages/group/create/CreateGroup';
import LeftItemGroup from '../pages/group/layouts/LeftItemGroup';
import MainGroup from '../pages/group/itemgroup/MainGroup';
import Profile from '../pages/profile/Profile';
import RightProfile from '../../src/pages/profile/layouts/RightProfile';
import EditPost from '../pages/home/components/EditPost';
const privateRoutes = [
	{ path: '/', component: Home, Left: Left, Right: Right },
	{ path: '/groups', component: Home, Left: LeftsGroup, Right: Right },
	{ path: '/groups/create', component: CreateGroup, Left: LeftCreateGroup, Right: Right },
	{ path: '/groups/:uuid', component: MainGroup, Left: LeftItemGroup, Right: Right },
	{path:'/profile',component:Profile,Left:Left,Right:RightProfile}
];

const publicRoutes = [
	{ path: '/login', component: Login },
	{ path: '/register', component: Register },
	{ path: '/forgot-password/', component: ForgotPassword },
	{ path: '/forgot-password/:uuid', component: ForgotPassword },
	{ path: '/verify/:uuid', component: Verify },
	
];

const notFoundRoute = { path: '*', component: NotFound };
export { privateRoutes, publicRoutes, notFoundRoute };
