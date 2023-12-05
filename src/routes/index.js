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
import LandingPage from '../pages/landing/LandingPage';
import RegisterParent from '../pages/auth/register/RegisterParent';
import RegisterTeacher from '../pages/auth/register/RegisterTeacher';
import LeftClass from '../pages/class/layouts/LeftClass';
import Class from '../pages/class/Class';
import LeftItemClass from '../pages/class/layouts/LeftItemClass';
import RightClass from '../pages/class/layouts/RightClass';
import MainClass from '../pages/class/itemclass/MainClass';
import CreateQuiz from '../pages/class/exam/CreateQuiz ';
import RightItemGroup from '../pages/group/layouts/RightItemGroup';
import LeftFriend from '../pages/friend/layouts/LeftFriend';
import MainFriend from '../pages/friend/MainFriend';
import  ProfileUser from '../pages/profile/ProfileUser/Profile';
import ExamItem from '../pages/class/exam/ExamItem/ExamItem';
import Submit from '../pages/class/exam/ExamItem/Submit';
import LeftSubmit from '../pages/class/layouts/LeftSubmit';
import LeftMessenger from '../pages/messenger/layouts/LeftMessenger';
import RightMessenger from '../pages/messenger/layouts/RightMessenger';
import Main from '../pages/messenger/main/Main';
import MainSearch from '../pages/search/main/MainSearch';
import LeftSearch from '../pages/search/layout/LeftSearch';
const privateRoutes = [
	{ path: '/home', component: Home, Left: Left, Right: Right },
	
	{ path: '/groups/:uuid', component: MainGroup, Left: LeftItemGroup, Right: RightItemGroup },
	{ path: '/classes/:uuid', component: MainGroup, Left: LeftItemGroup, Right: RightItemGroup },
	{ path: '/messenger', component: Main, Left: LeftMessenger, Right: RightMessenger },

	

	
];

const privateRoutes2page = [
	
	{ path: '/classes/:uuid/exam/createquiz', component: CreateQuiz, Left: LeftItemClass },
	{ path: '/groups/create', component: CreateGroup, Left: LeftCreateGroup },
	{ path: '/classes/create', component: CreateGroup, Left: LeftCreateGroup },
	{path:'/friends',component:MainFriend,Left:LeftFriend},
	{ path: '/profile', component: Profile, Left: Left },
	{ path: '/profile/:uuid', component: ProfileUser, Left: Left },
	{ path: '/classes/:uuid/exam/:id', component: ExamItem, Left: LeftItemClass },
	{ path: '/exam/:id/submit/:submissionId', component: Submit, Left: LeftSubmit },
	{ path: '/classes', component: Class, Left: RightClass  },
	{ path: '/groups', component: Home, Left: LeftsGroup},
	{ path: '/search', component: MainSearch, Left: LeftSearch},

];
const publicRoutes = [
	{ path: '/login', component: Login },
	{ path: '/register', component: RegisterTeacher },
	{ path: '/forgot-password/', component: ForgotPassword },
	{ path: '/forgot-password/:uuid', component: ForgotPassword },
	{ path: '/verify/:uuid', component: Verify },
	{ path: '/', component: LandingPage },
];

const notFoundRoute = { path: '*', component: NotFound };
export { privateRoutes, publicRoutes, notFoundRoute, privateRoutes2page };
